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
import { Ionicons } from '@expo/vector-icons';

import { FONT } from '../../theme/fonts';

const CONTENT_PADDING = 24;
const GREEN = '#0F9F59';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#64748B';
const CARD_BG = '#FFFFFF';
const BORDER_LIGHT = '#E2E8F0';
const AVATAR_BG = '#F5E6E0';
const BADGE_BG = '#DCFCE7';
const BADGE_TEXT = '#166534';
const STAT_GREEN = '#0F9F59';
const STAT_BLUE = '#2563EB';
const STAT_PURPLE = '#7C3AED';
const LOGOUT_RED = '#DC2626';

const ACHIEVEMENTS = [
  { id: 'earlybird', title: 'Early Bird', icon: 'sunny' as const, bg: 'rgba(254, 240, 138, 0.5)', iconColor: '#CA8A04' },
  { id: 'pedal', title: 'Pedal Master', icon: 'bicycle' as const, bg: 'rgba(191, 219, 254, 0.5)', iconColor: '#2563EB' },
  { id: 'tree', title: 'Tree Planter', icon: 'leaf' as const, bg: 'rgba(167, 243, 208, 0.5)', iconColor: '#059669' },
  { id: 'top1', title: 'Top 1%', icon: 'star' as const, bg: 'rgba(233, 213, 255, 0.5)', iconColor: '#9333EA' },
];

const SETTINGS_ROWS = [
  { id: 'edit', label: 'Edit Account', icon: 'person-outline' as const, color: TEXT_DARK },
  { id: 'settings', label: 'App Settings', icon: 'settings-outline' as const, color: TEXT_DARK },
  { id: 'logout', label: 'Logout', icon: 'log-out-outline' as const, color: LOGOUT_RED },
];

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: CONTENT_PADDING }]}>
        <Text style={[styles.headerTitle, { fontFamily: FONT.bold }]}>Profile</Text>
        <TouchableOpacity style={styles.notifButton} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={22} color={TEXT_DARK} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User section - centered */}
        <View style={[styles.userSection, { width: contentWidth }]}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color="#D4B5A9" />
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
          </View>
          <Text style={[styles.userName, { fontFamily: FONT.bold }]}>Alex Rivers</Text>
          <View style={styles.levelBadge}>
            <Ionicons name="leaf" size={14} color={BADGE_TEXT} />
            <Text style={[styles.levelBadgeText, { fontFamily: FONT.bold }]}>LEVEL 4 CLIMATE HERO</Text>
          </View>
        </View>

        {/* Stats - 3 cards */}
        <View style={[styles.statsSection, { width: contentWidth }]}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: STAT_GREEN }, { fontFamily: FONT.extraBold }]}>124k</Text>
            <Text style={[styles.statLabel, { fontFamily: FONT.medium }]}>g{'\u2082'} SAVED</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: STAT_BLUE }, { fontFamily: FONT.extraBold }]}>12</Text>
            <Text style={[styles.statLabel, { fontFamily: FONT.medium }]}>CHALLENGES</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: STAT_PURPLE }, { fontFamily: FONT.extraBold }]}>14d</Text>
            <Text style={[styles.statLabel, { fontFamily: FONT.medium }]}>STREAK</Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={[styles.section, { width: contentWidth }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { fontFamily: FONT.bold }]}>Achievements</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={[styles.viewAllLink, { fontFamily: FONT.semiBold }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.achievementsRow}>
            {ACHIEVEMENTS.map((a) => (
              <View key={a.id} style={styles.achievementCard}>
                <View style={[styles.achievementIconWrap, { backgroundColor: a.bg }]}>
                  <Ionicons name={a.icon} size={38} color={a.iconColor} />
                </View>
                <Text style={[styles.achievementTitle, { fontFamily: FONT.semiBold }]} numberOfLines={1}>
                  {a.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Account settings card */}
        <View style={[styles.settingsCard, { width: contentWidth }]}>
          {SETTINGS_ROWS.map((row, index) => (
            <TouchableOpacity
              key={row.id}
              style={[styles.settingsRow, index < SETTINGS_ROWS.length - 1 && styles.settingsRowBorder]}
              activeOpacity={0.7}
            >
              <Ionicons name={row.icon} size={22} color={row.color} />
              <Text style={[styles.settingsRowLabel, { fontFamily: FONT.medium, color: row.color }]}>
                {row.label}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={TEXT_MUTED} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
  },
  headerTitle: {
    fontSize: 24,
    color: TEXT_DARK,
  },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 8,
    paddingBottom: 32,
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AVATAR_BG,
    borderWidth: 3,
    borderColor: CARD_BG,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },
  verifiedBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: CARD_BG,
  },
  userName: {
    fontSize: 22,
    color: TEXT_DARK,
    marginBottom: 8,
    textAlign: 'center',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BADGE_BG,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  levelBadgeText: {
    fontSize: 12,
    color: BADGE_TEXT,
    letterSpacing: 0.5,
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
  },
  statValue: {
    fontSize: 22,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: TEXT_MUTED,
    letterSpacing: 0.3,
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
  viewAllLink: {
    fontSize: 14,
    color: GREEN,
  },
  achievementsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  achievementCard: {
    flex: 1,
    alignItems: 'center',
  },
  achievementIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 11,
    color: TEXT_DARK,
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingsRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  settingsRowLabel: {
    flex: 1,
    fontSize: 15,
  },
  bottomSpacer: {
    height: 24,
  },
});
