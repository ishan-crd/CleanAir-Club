import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { FONT } from '../../theme/fonts';
import { ACHIEVEMENTS, type AchievementId } from '../../data/achievements';

const GREEN = '#0F9F59';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#64748B';
const CARD_BG = '#FFFFFF';
const PADDING = 24;

export default function AchievementsScreen() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as { highlightId?: AchievementId } | undefined;
  const highlightId = params?.highlightId;
  const contentWidth = width - PADDING * 2;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 280, useNativeDriver: true }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (highlightId && scrollRef.current) {
      const index = ACHIEVEMENTS.findIndex((a) => a.id === highlightId);
      if (index >= 0) {
        const cardHeight = 220;
        setTimeout(() => {
          scrollRef.current?.scrollTo({ y: index * cardHeight, animated: true });
        }, 320);
      }
    }
  }, [highlightId]);

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={goBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color={TEXT_DARK} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontFamily: FONT.extraBold }]}>Achievements</Text>
          <View style={styles.placeholder} />
        </View>

        <Text style={[styles.subtitle, { fontFamily: FONT.medium }]}>
          What your badges mean and how you earned them
        </Text>

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {ACHIEVEMENTS.map((a) => {
            const isHighlighted = highlightId === a.id;
            return (
              <View
                key={a.id}
                style={[
                  styles.card,
                  { width: contentWidth },
                  isHighlighted && styles.cardHighlighted,
                ]}
              >
                <View style={styles.cardTop}>
                  <View style={[styles.iconWrap, { backgroundColor: a.bg }]}>
                    <Ionicons name={a.icon} size={40} color={a.iconColor} />
                  </View>
                  <View style={styles.cardTitleWrap}>
                    <Text style={[styles.cardTitle, { fontFamily: FONT.extraBold }]}>{a.title}</Text>
                    <View style={styles.badgePill}>
                      <Ionicons name="medal" size={14} color={GREEN} />
                      <Text style={[styles.badgePillText, { fontFamily: FONT.semiBold }]}>Unlocked</Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.description, { fontFamily: FONT.medium }]}>{a.description}</Text>
                <View style={styles.howToGetWrap}>
                  <View style={styles.howToGetLabelRow}>
                    <Ionicons name="information-circle" size={18} color={GREEN} />
                    <Text style={[styles.howToGetLabel, { fontFamily: FONT.bold }]}>How you got it</Text>
                  </View>
                  <Text style={[styles.howToGetText, { fontFamily: FONT.medium }]}>{a.howToGet}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1 },
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
  placeholder: { width: 44 },
  subtitle: {
    fontSize: 14,
    color: TEXT_MUTED,
    paddingHorizontal: PADDING,
    marginBottom: 20,
    lineHeight: 20,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: PADDING, paddingBottom: 40 },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10 },
      android: { elevation: 4 },
    }),
  },
  cardHighlighted: {
    borderColor: GREEN,
    backgroundColor: '#F0FDF4',
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTitleWrap: { flex: 1 },
  cardTitle: { fontSize: 20, color: TEXT_DARK, marginBottom: 6 },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    gap: 4,
  },
  badgePillText: { fontSize: 12, color: GREEN },
  description: {
    fontSize: 15,
    color: TEXT_MUTED,
    lineHeight: 22,
    marginBottom: 16,
  },
  howToGetWrap: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: GREEN,
  },
  howToGetLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  howToGetLabel: { fontSize: 13, color: TEXT_DARK },
  howToGetText: { fontSize: 14, color: TEXT_MUTED, lineHeight: 20 },
  bottomSpacer: { height: 24 },
});
