import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Animated,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { FONT } from '../../theme/fonts';
import { useImpact } from '../../contexts/ImpactContext';
import {
  getLevelFromTotalXP,
  xpToReachLevel,
  getProgressInLevel,
  getLevelTitle,
} from '../../utils/levels';

const XP_ORANGE = '#EA580C';

const GREEN = '#0F9F59';
const GREEN_LIGHT = '#DCFCE7';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#64748B';
const CARD_BG = '#FFFFFF';
const PADDING = 24;

function LevelCard({
  level,
  totalXP,
  isCurrent,
  onPress,
}: {
  level: number;
  totalXP: number;
  isCurrent: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(isCurrent ? 1.02 : 0.98)).current;
  const { progress, xpInLevel, xpNeededForNext } = getProgressInLevel(totalXP);
  const currentLvl = getLevelFromTotalXP(totalXP);
  const isPast = level < currentLvl;
  const isLocked = level > currentLvl + 1;
  const isNext = level === currentLvl + 1;
  const showProgress = isCurrent && level < 50;
  const xpToReach = isNext ? xpToReachLevel(level) - totalXP : 0;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isCurrent ? 1.02 : 0.98,
      useNativeDriver: true,
      friction: 8,
      tension: 80,
    }).start();
  }, [isCurrent, scaleAnim]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.cardWrap}
    >
      <Animated.View
        style={[
          styles.card,
          isCurrent && styles.cardCurrent,
          isPast && styles.cardPast,
          isLocked && styles.cardLocked,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {isLocked && (
          <View style={styles.lockWrap}>
            <Ionicons name="lock-closed" size={20} color={TEXT_MUTED} />
          </View>
        )}
        <View style={[styles.levelNumberWrap, isCurrent && styles.levelNumberWrapCurrent]}>
          <Text style={[styles.levelNumber, { fontFamily: FONT.extraBold }, isCurrent && styles.levelNumberCurrent]}>
            {level}
          </Text>
        </View>
        <Text style={[styles.levelTitle, { fontFamily: FONT.bold }, isLocked && styles.textMuted]} numberOfLines={1}>
          {getLevelTitle(level)}
        </Text>
        {showProgress && (
          <View style={styles.progressWrap}>
            <View style={styles.progressBg}>
              <Animated.View style={[styles.progressFill, { width: `${Math.min(100, progress * 100)}%` }]} />
            </View>
            <Text style={[styles.progressText, { fontFamily: FONT.medium }]}>
              {xpInLevel} / {xpNeededForNext} XP
            </Text>
          </View>
        )}
        {isPast && (
          <View style={styles.checkWrap}>
            <Ionicons name="checkmark-circle" size={22} color={GREEN} />
          </View>
        )}
        {isNext && xpToReach > 0 && (
          <Text style={[styles.xpToUnlock, { fontFamily: FONT.medium }]}>
            {xpToReach} XP to next level
          </Text>
        )}
        {isLocked && (
          <Text style={[styles.xpToUnlock, { fontFamily: FONT.medium }]}>
            {(xpToReachLevel(level) - totalXP).toLocaleString()} XP to unlock
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function LevelScreen() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { totalPoints } = useImpact();
  const currentLevel = getLevelFromTotalXP(totalPoints);
  const flatListRef = useRef<FlatList>(null);
  const cardWidth = 280;
  const cardMargin = 12;
  const itemWidth = cardWidth + cardMargin * 2;
  const levels = Array.from({ length: 30 }, (_, i) => i + 1);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 320, useNativeDriver: true }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const index = Math.max(0, currentLevel - 2);
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: index * itemWidth, animated: true });
    }, 100);
  }, [currentLevel, itemWidth]);

  const goBack = () => navigation.goBack();
  const { xpInLevel, xpNeededForNext, progress } = getProgressInLevel(totalPoints);
  const xpToNextLevel = currentLevel >= 50 ? 0 : xpNeededForNext - xpInLevel;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontFamily: FONT.extraBold }]}>Levels</Text>
          <View style={styles.xpPill}>
            <Text style={[styles.xpPillText, { fontFamily: FONT.bold }]}>{totalPoints} XP</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.currentSummary}>
            <View style={styles.currentBadge}>
              <Ionicons name="star" size={20} color={GREEN} />
              <Text style={[styles.currentLabel, { fontFamily: FONT.semiBold }]}>
                You're Level {currentLevel}
              </Text>
            </View>
            <Text style={[styles.currentTitle, { fontFamily: FONT.extraBold }]}>
              {getLevelTitle(currentLevel)}
            </Text>
            <Text style={[styles.nextLevelHint, { fontFamily: FONT.medium }]}>
              Swipe to see next levels & XP needed
            </Text>
          </View>

          {currentLevel < 50 && xpToNextLevel > 0 && (
            <View style={[styles.nextLevelCard, { width: width - PADDING * 2 }]}>
              <View style={styles.nextLevelLeft}>
                <Ionicons name="trophy" size={22} color={XP_ORANGE} />
                <View>
                  <Text style={[styles.nextLevelLabel, { fontFamily: FONT.medium }]}>Next level</Text>
                  <Text style={[styles.nextLevelValue, { fontFamily: FONT.bold }]}>
                    {xpToNextLevel} XP to Level {currentLevel + 1}
                  </Text>
                </View>
              </View>
              <View style={styles.nextLevelBarBg}>
                <View style={[styles.nextLevelBarFill, { width: `${Math.min(100, progress * 100)}%` }]} />
              </View>
            </View>
          )}

          <View style={styles.flatListWrap}>
            <FlatList
              ref={flatListRef}
              data={levels}
              keyExtractor={(item) => String(item)}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={itemWidth}
              snapToAlignment="start"
              decelerationRate="fast"
              scrollEventThrottle={16}
              contentContainerStyle={[styles.listContent, { paddingHorizontal: (width - itemWidth) / 2 }]}
              renderItem={({ item }) => (
                <View style={{ width: itemWidth, alignItems: 'center' }}>
                  <LevelCard
                    level={item}
                    totalXP={totalPoints}
                    isCurrent={item === currentLevel}
                    onPress={() => {}}
                  />
                </View>
              )}
            />
          </View>

          <View style={[styles.howItWorks, { width: width - PADDING * 2 }]}>
            <Text style={[styles.howItWorksTitle, { fontFamily: FONT.bold }]}>How leveling works</Text>
            <View style={styles.howItWorksRow}>
              <View style={styles.howItWorksBullet} />
              <Text style={[styles.howItWorksText, { fontFamily: FONT.medium }]}>
                Log eco actions (transport, lifestyle) to earn XP on the Add screen.
              </Text>
            </View>
            <View style={styles.howItWorksRow}>
              <View style={styles.howItWorksBullet} />
              <Text style={[styles.howItWorksText, { fontFamily: FONT.medium }]}>
                More XP unlocks higher levels and titles like Climate Hero and Planet Protector.
              </Text>
            </View>
            <View style={styles.howItWorksRow}>
              <View style={styles.howItWorksBullet} />
              <Text style={[styles.howItWorksText, { fontFamily: FONT.medium }]}>
                Each level needs more XP than the last — keep logging to climb the ranks.
              </Text>
            </View>
          </View>

          <View style={[styles.tipCard, { width: width - PADDING * 2 }]}>
            <Ionicons name="bulb" size={20} color={GREEN} />
            <Text style={[styles.tipText, { fontFamily: FONT.medium }]}>
              Tip: Walking and cycling give the most XP per trip. Try a short walk instead of driving to level up faster.
            </Text>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F6F8F7' },
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PADDING,
    paddingVertical: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CARD_BG,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  headerTitle: { fontSize: 20, color: TEXT_DARK },
  xpPill: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  xpPillText: { fontSize: 14, color: '#EA580C' },
  currentSummary: {
    paddingHorizontal: PADDING,
    marginBottom: 16,
    alignItems: 'center',
  },
  currentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GREEN_LIGHT,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    gap: 8,
    marginBottom: 8,
  },
  currentLabel: { fontSize: 14, color: GREEN },
  currentTitle: { fontSize: 22, color: TEXT_DARK, marginBottom: 4 },
  nextLevelHint: { fontSize: 13, color: TEXT_MUTED },
  nextLevelCard: {
    alignSelf: 'center',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: PADDING,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  nextLevelLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  nextLevelLabel: { fontSize: 12, color: TEXT_MUTED, marginBottom: 2 },
  nextLevelValue: { fontSize: 15, color: TEXT_DARK },
  nextLevelBarBg: { height: 6, borderRadius: 3, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  nextLevelBarFill: { height: '100%', borderRadius: 3, backgroundColor: GREEN },
  flatListWrap: { height: 240, marginBottom: 8 },
  listContent: { paddingVertical: 8 },
  howItWorks: {
    alignSelf: 'center',
    marginTop: 24,
    marginHorizontal: PADDING,
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  howItWorksTitle: { fontSize: 16, color: TEXT_DARK, marginBottom: 12 },
  howItWorksRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  howItWorksBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN,
    marginTop: 7,
    marginRight: 10,
  },
  howItWorksText: { fontSize: 14, color: TEXT_MUTED, flex: 1, lineHeight: 20 },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: GREEN_LIGHT,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: PADDING,
    marginTop: 12,
    gap: 12,
  },
  tipText: { fontSize: 14, color: TEXT_DARK, flex: 1, lineHeight: 20 },
  bottomSpacer: { height: 40 },
  cardWrap: {
    width: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: CARD_BG,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    minHeight: 200,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
      android: { elevation: 6 },
    }),
  },
  cardCurrent: {
    borderColor: GREEN,
    backgroundColor: '#F0FDF4',
  },
  cardPast: {
    borderColor: '#E2E8F0',
    opacity: 0.95,
  },
  cardLocked: {
    opacity: 0.85,
    backgroundColor: '#F8FAFC',
  },
  lockWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  levelNumberWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelNumberWrapCurrent: {
    backgroundColor: GREEN,
  },
  levelNumber: { fontSize: 24, color: TEXT_DARK },
  levelNumberCurrent: { fontSize: 24, color: '#FFFFFF' },
  levelTitle: { fontSize: 16, color: TEXT_DARK, textAlign: 'center', marginBottom: 12 },
  textMuted: { color: TEXT_MUTED },
  progressWrap: { width: '100%', marginTop: 4 },
  progressBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: GREEN,
  },
  progressText: { fontSize: 12, color: TEXT_MUTED, textAlign: 'center' },
  checkWrap: { marginTop: 8 },
  xpToUnlock: { fontSize: 12, color: TEXT_MUTED, marginTop: 8, textAlign: 'center' },
});
