import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { FONT } from '../../theme/fonts';

const CONTENT_PADDING = 24;
const GREEN = '#0F9F59';
const GREEN_BORDER = '#00A389';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#64748B';
const CARD_BG = '#FFFFFF';
const BORDER_LIGHT = '#E2E8F0';
const BG_LIGHT = '#F1F5F9';
const TOP_SECTION_BG = '#E8F5E9';
const BOTTOM_CARD_BG = '#E0F7FA';
const ORANGE = '#FF9800';
const YELLOW_BG = '#FEF9C3';

const TABS = ['Friends', 'City', 'Society'] as const;

const TOP_THREE = [
  { rank: 2, name: 'Arjun V.', pts: '2,840', ptsColor: GREEN, barH: 0.5, barBg: '#B2DFDB', borderColor: BORDER_LIGHT },
  { rank: 1, name: 'Ananya R.', pts: '3,120', ptsColor: GREEN, barH: 0.85, barBg: '#B2DFDB', borderColor: GREEN_BORDER, isFirst: true },
  { rank: 3, name: 'Ishaan K.', pts: '2,610', ptsColor: ORANGE, barH: 0.35, barBg: '#FFE0B2', borderColor: BORDER_LIGHT },
];

const RANKINGS_LIST = [
  { id: '4', rank: 4, name: 'Zoya Khan', pts: '2,450 pts', initial: 'O' },
  { id: '5', rank: 5, name: 'Rahul S.', pts: '2,320 pts', initial: 'J' },
  { id: '6', rank: 6, name: 'Meera J.', pts: '2,190 pts', initial: 'J' },
  { id: '7', rank: 7, name: 'Devansh P.', pts: '2,050 pts', initial: 'J' },
];

function RankBadge({ rank, isFirst }: { rank: number; isFirst?: boolean }) {
  return (
    <View style={[styles.rankPill, isFirst && styles.rankPillYellow, rank === 2 && styles.rankPillGray, rank === 3 && styles.rankPillOrange]}>
      <Text style={[styles.rankPillText, { fontFamily: FONT.bold }, rank === 2 && styles.rankPillTextWhite]}>
        {rank}
      </Text>
    </View>
  );
}

function TopThreeItem({
  rank,
  name,
  pts,
  ptsColor,
  barH,
  barBg,
  borderColor,
  isFirst,
}: {
  rank: number;
  name: string;
  pts: string;
  ptsColor: string;
  barH: number;
  barBg: string;
  borderColor: string;
  isFirst?: boolean;
}) {
  return (
    <View style={styles.podiumItem}>
      <RankBadge rank={rank} isFirst={isFirst} />
      <View style={[styles.podiumAvatar, { borderColor }, isFirst && styles.podiumAvatarFirst]}>
        <Ionicons name="person" size={isFirst ? 48 : 36} color="#D4B5A9" />
      </View>
      <Text style={[styles.podiumName, { fontFamily: FONT.bold }]} numberOfLines={1}>
        {name}
      </Text>
      <Text style={[styles.podiumPts, { fontFamily: FONT.semiBold }, { color: ptsColor }]}>{pts} pts</Text>
      <View style={[styles.podiumBar, { height: 24 + barH * 48, backgroundColor: barBg }]} />
    </View>
  );
}

function RankingListItem({ item }: { item: (typeof RANKINGS_LIST)[0] }) {
  return (
    <View style={styles.listRow}>
      <Text style={[styles.listRank, { fontFamily: FONT.medium }]}>{item.rank}</Text>
      <View style={styles.listAvatar}>
        <Text style={[styles.listInitial, { fontFamily: FONT.bold }]}>{item.initial}</Text>
      </View>
      <Text style={[styles.listName, { fontFamily: FONT.semiBold }]} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={[styles.listPts, { fontFamily: FONT.medium }]}>{item.pts}</Text>
    </View>
  );
}

export default function SocialScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('City');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: CONTENT_PADDING }]}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={TEXT_DARK} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: FONT.bold }]}>Leaderboard</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={20} color={TEXT_DARK} />
        </TouchableOpacity>
      </View>

      {/* Tabs - full width segmented control */}
      <View style={[styles.tabWrapper, { paddingHorizontal: CONTENT_PADDING }]}>
        <View style={[styles.tabOuter, { width: contentWidth }]}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabSegment, activeTab === tab && styles.tabSegmentActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabSegmentText,
                  { fontFamily: FONT.bold},
                  activeTab === tab ? styles.tabSegmentTextActive : styles.tabSegmentTextInactive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top 3 - green section */}
        <View style={[styles.topSection, { width }]}>
          <View style={[styles.podium, { width: contentWidth }]}>
            {TOP_THREE.map((p) => (
              <TopThreeItem
                key={p.rank}
                rank={p.rank}
                name={p.name}
                pts={p.pts}
                ptsColor={p.ptsColor}
                barH={p.barH}
                barBg={p.barBg}
                borderColor={p.borderColor}
                isFirst={p.isFirst}
              />
            ))}
          </View>
        </View>

        {/* White container: You rank + other ranks */}
        <View style={[styles.whiteRanksContainer, { width: contentWidth }]}>
          {/* You (Kabir) card */}
          <View style={styles.youCard}>
            <Text style={[styles.youRank, { fontFamily: FONT.extraBold }]}>12</Text>
            <View style={styles.youCenter}>
              <View style={styles.youAvatar}>
                <Ionicons name="person" size={20} color="#D4B5A9" />
              </View>
              <View>
                <Text style={[styles.youName, { fontFamily: FONT.bold }]}>You (Kabir)</Text>
                <Text style={[styles.youDistrict, { fontFamily: FONT.medium }]}>NOIDA DISTRICT</Text>
              </View>
            </View>
            <View style={styles.youRight}>
              <Text style={[styles.youPts, { fontFamily: FONT.bold }]}>1,842 pts</Text>
              <View style={styles.youSpotsRow}>
                {/* <Ionicons name="arrow-up" size={12} color={GREEN} /> */}
                {/* <Text style={[styles.youSpots, { fontFamily: FONT.medium }]}>2 spots this week</Text> */}
              </View>
            </View>
          </View>

          {/* Rankings list */}
          <View style={styles.listSection}>
            {RANKINGS_LIST.map((item) => (
              <RankingListItem key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Bottom message card */}
        <View style={[styles.bottomCard, { width: contentWidth }]}>
          <Text style={[styles.bottomCardText, { fontFamily: FONT.medium }]}>
            You're in the top 5% of Noida's greenest citizens this month! 🌱
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CARD_BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: CARD_BG,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BG_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
  },
  headerTitle: {
    fontSize: 18,
    color: TEXT_DARK,
  },
  tabWrapper: {
    marginBottom: 16,
  },
  tabOuter: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 24,
    padding: 4,
    alignSelf: 'stretch',
  },
  tabSegment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  tabSegmentActive: {
    backgroundColor: CARD_BG,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 2 },
      android: { elevation: 2 },
    }),
  },
  tabSegmentText: {
    fontSize: 14,
  },
  tabSegmentTextActive: {
    color: GREEN,
  },
  tabSegmentTextInactive: {
    color: '#6C757D',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: CONTENT_PADDING,
    paddingBottom: 32,
  },
  topSection: {
    backgroundColor: TOP_SECTION_BG,
    paddingTop: 20,
    paddingBottom: 28,
    marginHorizontal: -CONTENT_PADDING,
    paddingHorizontal: CONTENT_PADDING,
    marginBottom: 0,
    alignItems: 'center',
  },
  whiteRanksContainer: {
    backgroundColor: CARD_BG,
    paddingTop: 24,
    paddingBottom: 0,
  },
  podium: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
    maxWidth: 110,
  },
  rankPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
    marginBottom: 8,
  },
  rankPillGray: {
    backgroundColor: TEXT_MUTED,
  },
  rankPillOrange: {
    backgroundColor: ORANGE,
  },
  rankPillText: {
    fontSize: 12,
    color: TEXT_DARK,
  },
  rankPillTextWhite: {
    color: CARD_BG,
  },
  rankPillYellow: {
    backgroundColor: YELLOW_BG,
  },
  podiumAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5E6E0',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  podiumAvatarFirst: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
  },
  podiumName: {
    fontSize: 14,
    color: TEXT_DARK,
    marginBottom: 2,
  },
  podiumPts: {
    fontSize: 13,
    marginBottom: 8,
  },
  podiumBar: {
    width: 56,
    borderRadius: 8,
    minHeight: 24,
  },
  youCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 159, 89, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(15, 159, 89, 0.2)',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  youRank: {
    fontSize: 28,
    color: GREEN,
    marginRight: 12,
    minWidth: 32,
    textAlign: 'center',
  },
  youCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  youAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5E6E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  youName: {
    fontSize: 15,
    color: TEXT_DARK,
  },
  youDistrict: {
    fontSize: 11,
    color: GREEN,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  youRight: {
    alignItems: 'flex-end',
  },
  youPts: {
    fontSize: 15,
    color: GREEN,
  },
  youSpotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  youSpots: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  listSection: {
    marginBottom: 16,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  listRank: {
    fontSize: 15,
    color: TEXT_MUTED,
    width: 28,
    textAlign: 'center',
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5E6E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listInitial: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  listName: {
    flex: 1,
    fontSize: 15,
    color: TEXT_DARK,
  },
  listPts: {
    fontSize: 14,
    color: TEXT_DARK,
  },
  bottomCard: {
    backgroundColor: BOTTOM_CARD_BG,
    borderRadius: 16,
    padding: 16,
  },
  bottomCardText: {
    fontSize: 14,
    color: GREEN,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 24,
  },
});
