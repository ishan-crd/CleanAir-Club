import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Animated,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { FONT } from '../../theme/fonts';
import { useImpact } from '../../contexts/ImpactContext';
import { useCommuteLog } from '../../contexts/CommuteLogContext';

const CONTENT_PADDING = 24;
const GREEN = '#0F9F59';
const GREEN_BORDER = 'rgba(15, 159, 89, 0.2)';
const CARD_BG = '#FFFFFF';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#64748B';
const XP_ORANGE = '#EA580C';
const ICON_BG_LIGHT = '#F1F5F9';
const PILL_BG_LIGHT = '#E8F5E9';

const TRANSPORT_ITEMS = [
  { id: 'metro', label: 'Metro', icon: 'train' as const, co2: '-2.4kg CO₂', co2Kg: 2.4, xp: 45, iconBg: '#DCFCE7' },
  { id: 'bicycle', label: 'Bicycle', icon: 'bicycle' as const, co2: '-3.1kg CO₂', co2Kg: 3.1, xp: 60, iconBg: ICON_BG_LIGHT },
  { id: 'bus', label: 'Bus', icon: 'bus' as const, co2: '-1.8kg CO₂', co2Kg: 1.8, xp: 30, iconBg: ICON_BG_LIGHT },
  { id: 'walk', label: 'Walk', icon: 'walk' as const, co2: '-3.8kg CO₂', co2Kg: 3.8, xp: 80, iconBg: ICON_BG_LIGHT },
];

const LIFESTYLE_ITEMS = [
  { id: 'bottle', title: 'Reusable Bottle', desc: 'Zero plastic waste today', co2: '-0.2kg', xp: 15, icon: 'heart' as const, iconBg: '#DBEAFE', iconColor: '#2563EB' },
  { id: 'meal', title: 'Meat-free Meal', desc: 'Plant-based breakfast', co2: '-1.5kg', xp: 50, icon: 'restaurant' as const, iconBg: '#FFEDD5', iconColor: '#EA580C' },
];

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function runSuccessAnimation(
  scaleAnim: Animated.Value,
  opacityAnim: Animated.Value,
  checkOpacity: Animated.Value,
) {
  scaleAnim.setValue(0);
  opacityAnim.setValue(0);
  checkOpacity.setValue(0);
  Animated.sequence([
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 8, tension: 80 }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 280, useNativeDriver: true }),
    ]),
    Animated.timing(checkOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
  ]).start();
}

export default function LogYourActionScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;
  const navigation = useNavigation();
  const { addImpact, totalPoints, co2SavedKg } = useImpact();
  const commute = useCommuteLog();

  const [selectedTransport, setSelectedTransport] = useState<string | null>('metro');
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [earnedCo2, setEarnedCo2] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { state: commuteState, getElapsedMs, startLog, pauseLog, continueLog, stopLog } = commute;
  const logPhase = commuteState.logPhase;
  const activeTransportId = commuteState.selectedTransportId;

  const selectedTransportItem = selectedTransport
    ? TRANSPORT_ITEMS.find((t) => t.id === selectedTransport)
    : null;
  const activeTransportItem =
    activeTransportId != null ? TRANSPORT_ITEMS.find((t) => t.id === activeTransportId) : null;
  const isTransportSelected =
    selectedTransport != null && TRANSPORT_ITEMS.some((t) => t.id === selectedTransport);
  const isLogActive = logPhase === 'tracking' || logPhase === 'paused';

  useEffect(() => {
    if (logPhase === 'paused') {
      setElapsedMs(getElapsedMs());
      return;
    }
    if (logPhase !== 'tracking') return;
    const tick = () => setElapsedMs(getElapsedMs());
    tick();
    timerRef.current = setInterval(tick, 200);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [logPhase, getElapsedMs]);

  const goBack = () => navigation.goBack();

  const handleStartLog = () => {
    if (!isTransportSelected || !selectedTransport) return;
    startLog(selectedTransport);
    setElapsedMs(0);
  };

  const handlePause = () => pauseLog();
  const handleContinue = () => continueLog();

  const handleStopLog = () => {
    const item = activeTransportItem;
    if (!item) return;
    const { xp, co2Kg } = stopLog(item.co2Kg);
    addImpact({ xp, co2Kg });
    setEarnedXp(xp);
    setEarnedCo2(co2Kg);
    setShowSuccess(true);
    runSuccessAnimation(scaleAnim, opacityAnim, checkOpacity);
  };

  const handleAddToImpact = () => {
    const item = TRANSPORT_ITEMS.find((t) => t.id === selectedTransport) ?? selectedTransportItem;
    if (!item) return;
    addImpact({ xp: item.xp, co2Kg: item.co2Kg });
    setEarnedXp(item.xp);
    setEarnedCo2(item.co2Kg);
    setShowSuccess(true);
    runSuccessAnimation(scaleAnim, opacityAnim, checkOpacity);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: CONTENT_PADDING }]}>
        <TouchableOpacity style={styles.headerBtn} onPress={goBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color="#475569" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: FONT.bold }]}>Log Your Action</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <View style={styles.starBadge}>
            <Ionicons name="star" size={18} color={GREEN} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Transport */}
        <View style={[styles.section, { width: contentWidth }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { fontFamily: FONT.bold }]}>Transport</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={[styles.recentLink, { fontFamily: FONT.semiBold }]}>Recent</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transportGrid}>
            {TRANSPORT_ITEMS.map((item) => {
              const isSelected = selectedTransport === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.transportCard, isSelected && styles.transportCardSelected]}
                  onPress={() => setSelectedTransport(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.transportIconWrap, { backgroundColor: item.iconBg }]}>
                    <Ionicons
                      name={item.icon}
                      size={24}
                      color={isSelected ? GREEN : '#64748B'}
                    />
                  </View>
                  <Text style={[styles.transportLabel, { fontFamily: FONT.bold }]}>{item.label}</Text>
                  <View style={[styles.co2Pill, isSelected && styles.co2PillSelected]}>
                    <Text style={[styles.co2PillText, { fontFamily: FONT.medium }, isSelected && styles.co2PillTextSelected]}>
                      {item.co2}
                    </Text>
                  </View>
                  <Text style={[styles.xpText, { fontFamily: FONT.semiBold }]}>+{item.xp} XP</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Lifestyle */}
        <View style={[styles.section, { width: contentWidth }]}>
          <Text style={[styles.sectionTitle, styles.sectionTitleStandalone, { fontFamily: FONT.bold }]}>Lifestyle</Text>
          {LIFESTYLE_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.lifestyleCard} activeOpacity={0.8}>
              <View style={[styles.lifestyleIconWrap, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon} size={22} color={item.iconColor} />
              </View>
              <View style={styles.lifestyleContent}>
                <Text style={[styles.lifestyleTitle, { fontFamily: FONT.bold }]}>{item.title}</Text>
                <Text style={[styles.lifestyleDesc, { fontFamily: FONT.medium }]}>{item.desc}</Text>
              </View>
              <View style={styles.lifestyleRight}>
                <Text style={[styles.lifestyleCo2, { fontFamily: FONT.bold }]}>{item.co2}</Text>
                <Text style={[styles.lifestyleXp, { fontFamily: FONT.semiBold }]}>+{item.xp} XP</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Commute tracking card - shown when a log is active (persists across back navigation) */}
        {isLogActive && activeTransportItem && (
          <View style={[styles.trackingCard, { width: contentWidth }]}>
            <View style={styles.trackingHeader}>
              <View style={[styles.trackingIconWrap, { backgroundColor: activeTransportItem.iconBg }]}>
                <Ionicons name={activeTransportItem.icon} size={28} color={GREEN} />
              </View>
              <Text style={[styles.trackingLabel, { fontFamily: FONT.semiBold }]}>
                Logging {activeTransportItem.label} commute
              </Text>
            </View>
            <Text style={[styles.timerDisplay, { fontFamily: FONT.extraBold }]}>
              {formatDuration(elapsedMs)}
            </Text>
            <Text style={[styles.timerHint, { fontFamily: FONT.medium }]}>
              {logPhase === 'paused' ? 'Paused' : 'Tap Pause to pause, Stop when done'}
            </Text>
            <View style={styles.trackingButtons}>
              <TouchableOpacity
                style={[styles.trackingBtnSecondary, logPhase === 'paused' && styles.trackingBtnPrimary]}
                onPress={logPhase === 'tracking' ? handlePause : handleContinue}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={logPhase === 'tracking' ? 'pause' : 'play'}
                  size={22}
                  color={logPhase === 'paused' ? '#FFFFFF' : TEXT_DARK}
                />
                <Text
                  style={[
                    styles.trackingBtnText,
                    { fontFamily: FONT.bold },
                    logPhase === 'paused' && styles.trackingBtnTextPrimary,
                  ]}
                >
                  {logPhase === 'tracking' ? 'Pause' : 'Continue'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.trackingBtnStop} onPress={handleStopLog} activeOpacity={0.85}>
                <Ionicons name="stop" size={22} color="#FFFFFF" />
                <Text style={[styles.trackingBtnText, styles.trackingBtnTextPrimary, { fontFamily: FONT.bold }]}>
                  Stop log
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={[styles.bottomSpacer, { width: contentWidth }]} />
      </ScrollView>

      {/* Footer: Start Log (transport, no active log) | Add to My Impact (lifestyle only) */}
      <View style={[styles.footer, { paddingHorizontal: CONTENT_PADDING }]}>
        {isTransportSelected && !isLogActive && (
          <TouchableOpacity style={styles.ctaButton} onPress={handleStartLog} activeOpacity={0.85}>
            <Text style={[styles.ctaText, { fontFamily: FONT.bold }]}>Start Log</Text>
          </TouchableOpacity>
        )}
        {!isTransportSelected && (
          <TouchableOpacity style={styles.ctaButton} onPress={handleAddToImpact} activeOpacity={0.85}>
            <Text style={[styles.ctaText, { fontFamily: FONT.bold }]}>Add to My Impact</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Success overlay — "Added to Impact!" (shown after Stop log or lifestyle add) */}
      <Modal visible={showSuccess} transparent animationType="none">
        <Pressable style={styles.successOverlay} onPress={closeSuccess}>
          <Animated.View
            style={[
              styles.successBackdrop,
              { opacity: opacityAnim },
            ]}
          />
          <Animated.View
            style={[
              styles.successCard,
              {
                width: contentWidth,
                transform: [{ scale: scaleAnim }],
              },
            ]}
            onStartShouldSetResponder={() => true}
          >
            <Animated.View style={[styles.successCheckWrap, { opacity: checkOpacity }]}>
              <Ionicons name="checkmark-circle" size={72} color={GREEN} />
            </Animated.View>
            <Text style={[styles.successTitle, { fontFamily: FONT.extraBold }]}>Added to Impact!</Text>
            <Text style={[styles.successSubtitle, { fontFamily: FONT.medium }]}>
              You earned
            </Text>
            <View style={styles.successStatsRow}>
              <View style={styles.successStat}>
                <Text style={[styles.successStatValue, { fontFamily: FONT.extraBold }]}>+{earnedXp}</Text>
                <Text style={[styles.successStatLabel, { fontFamily: FONT.medium }]}>XP</Text>
              </View>
              <View style={styles.successStatDivider} />
              <View style={styles.successStat}>
                <Text style={[styles.successStatValue, { fontFamily: FONT.extraBold }]}>{earnedCo2} kg</Text>
                <Text style={[styles.successStatLabel, { fontFamily: FONT.medium }]}>CO₂ saved</Text>
              </View>
            </View>
            <View style={styles.successTotalsWrap}>
              <Text style={[styles.successTotalsLabel, { fontFamily: FONT.medium }]}>Your new totals</Text>
              <View style={styles.successTotalsRow}>
                <Text style={[styles.successTotalsValue, { fontFamily: FONT.bold }]}>{totalPoints} XP</Text>
                <Text style={[styles.successTotalsValue, { fontFamily: FONT.bold }]}>{co2SavedKg.toFixed(1)} kg CO₂</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.successCta} onPress={closeSuccess} activeOpacity={0.85}>
              <Text style={[styles.successCtaText, { fontFamily: FONT.bold }]}>View my impact</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F9F4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#F0F9F4',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CARD_BG,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  starBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CARD_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GREEN_BORDER,
  },
  headerTitle: {
    fontSize: 18,
    color: TEXT_DARK,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 8,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: TEXT_DARK,
  },
  sectionTitleStandalone: {
    marginBottom: 12,
  },
  recentLink: {
    fontSize: 14,
    color: GREEN,
  },
  transportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  transportCard: {
    width: '47%',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  transportCardSelected: {
    borderColor: GREEN,
  },
  transportIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  transportLabel: {
    fontSize: 15,
    color: TEXT_DARK,
    marginBottom: 8,
    textAlign: 'center',
  },
  co2Pill: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: ICON_BG_LIGHT,
    marginBottom: 6,
  },
  co2PillSelected: {
    backgroundColor: PILL_BG_LIGHT,
  },
  co2PillText: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  co2PillTextSelected: {
    color: GREEN,
  },
  xpText: {
    fontSize: 13,
    color: XP_ORANGE,
    textAlign: 'center',
  },
  lifestyleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  lifestyleIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  lifestyleContent: {
    flex: 1,
  },
  lifestyleTitle: {
    fontSize: 15,
    color: TEXT_DARK,
    marginBottom: 2,
  },
  lifestyleDesc: {
    fontSize: 13,
    color: TEXT_MUTED,
  },
  lifestyleRight: {
    alignItems: 'flex-end',
  },
  lifestyleCo2: {
    fontSize: 14,
    color: TEXT_DARK,
    marginBottom: 2,
  },
  lifestyleXp: {
    fontSize: 13,
    color: XP_ORANGE,
  },
  bottomSpacer: {
    height: 20,
  },
  trackingCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: GREEN,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 4 },
    }),
  },
  trackingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  trackingIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingLabel: { fontSize: 16, color: TEXT_DARK },
  timerDisplay: {
    fontSize: 44,
    color: GREEN,
    letterSpacing: 2,
    marginBottom: 4,
  },
  timerHint: { fontSize: 13, color: TEXT_MUTED, marginBottom: 20 },
  trackingButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  trackingBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: ICON_BG_LIGHT,
  },
  trackingBtnPrimary: {
    backgroundColor: GREEN,
  },
  trackingBtnText: { fontSize: 16, color: TEXT_DARK },
  trackingBtnTextPrimary: { color: '#FFFFFF' },
  trackingBtnStop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#DC2626',
  },
  footer: {
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: '#F0F9F4',
  },
  ctaButton: {
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  successOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: CONTENT_PADDING,
  },
  successBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  successCard: {
    backgroundColor: CARD_BG,
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24 },
      android: { elevation: 12 },
    }),
  },
  successCheckWrap: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 22,
    color: TEXT_DARK,
    marginBottom: 6,
  },
  successSubtitle: {
    fontSize: 15,
    color: TEXT_MUTED,
    marginBottom: 16,
  },
  successStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
  },
  successStat: {
    flex: 1,
    alignItems: 'center',
  },
  successStatValue: {
    fontSize: 24,
    color: GREEN,
    marginBottom: 2,
  },
  successStatLabel: {
    fontSize: 13,
    color: TEXT_MUTED,
  },
  successStatDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E2E8F0',
  },
  successTotalsWrap: {
    width: '100%',
    marginBottom: 20,
  },
  successTotalsLabel: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginBottom: 8,
    textAlign: 'center',
  },
  successTotalsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  successTotalsValue: {
    fontSize: 16,
    color: TEXT_DARK,
  },
  successCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GREEN,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
  },
  successCtaText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
