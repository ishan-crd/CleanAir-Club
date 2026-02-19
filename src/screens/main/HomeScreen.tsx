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
import Svg, { Path } from 'react-native-svg';

import { FONT } from '../../theme/fonts';

const CONTENT_PADDING = 24;

const AQI_BAR_COLORS = ['#E2E8F0', '#94A3B8', '#FDE047', '#FFB300', '#EA580C'];

const SQUAD_MEMBERS = [
  { id: '1', name: 'You', rank: 3, avatar: 'person' },
  { id: '2', name: 'Sarah', rank: 1, avatar: 'person' },
  { id: '3', name: 'James', rank: 2, avatar: 'person' },
];

function CircularProgress({ percent, size = 56 }: { percent: number; size?: number }) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;
  const circlePath = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`;
  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Path
        d={circlePath}
        stroke="#FFFFFF"
        strokeWidth={stroke}
        fill="none"
        strokeOpacity={0.3}
      />
      <Path
        d={circlePath}
        stroke="#FFFFFF"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcomeText, { fontFamily: FONT.medium }]}>Welcome back,</Text>
            <View style={styles.greetingRow}>
              <Text style={[styles.greetingTitle, { fontFamily: FONT.extraBold }]}>
                Good Morning
              </Text>
              <Ionicons name="leaf" size={20} color="#0F9F59" style={styles.leafIcon} />
            </View>
          </View>
          <View style={styles.levelBadge}>
            <Ionicons name="star" size={16} color="#0F9F59" />
            <Text style={[styles.levelText, { fontFamily: FONT.bold }]}>Level 12</Text>
          </View>
        </View>

        {/* AQI Card */}
        <View style={[styles.card, styles.aqiCard, { width: contentWidth }]}>
          <View style={styles.aqiWarningIcon}>
            <Ionicons name="warning" size={20} color="#FFB300" />
          </View>
          <Text style={[styles.aqiLabel, { fontFamily: FONT.bold }]}>AQ AIR QUALITY INDEX</Text>
          <Text style={[styles.aqiValue, { fontFamily: FONT.extraBold }]}>
            150 — Unhealthy
          </Text>
          <Text style={[styles.aqiRecommendation, { fontFamily: FONT.medium }]}>
            Sensitive groups should stay indoors
          </Text>
          <View style={styles.aqiBars}>
            {AQI_BAR_COLORS.map((color) => (
              <View key={color} style={[styles.aqiBar, { backgroundColor: color }]} />
            ))}
          </View>
        </View>

        {/* Monthly Goal Card */}
        <View style={[styles.card, styles.goalCard, { width: contentWidth }]}>
          <Text style={[styles.goalLabel, { fontFamily: FONT.bold }]}>MONTHLY GOAL IMPACT</Text>
          <View style={styles.goalRow}>
            <View>
              <Text style={[styles.goalValue, { fontFamily: FONT.extraBold }]}>12.4 kg <Text style={[styles.goalUnit, { fontFamily: FONT.medium }]}>CO₂ saved</Text></Text>
              
            </View>
            <View style={styles.goalProgressWrap}>
              <CircularProgress percent={82} size={64} />
              <Text style={[styles.goalPercent, { fontFamily: FONT.bold }]}>82%</Text>
            </View>
          </View>
          <Text style={[styles.goalTarget, { fontFamily: FONT.medium }]}>
            82% of your monthly target
          </Text>
        </View>

        {/* Today's Challenge Card */}
        <View style={[styles.card, styles.challengeCard, { width: contentWidth }]}>
          <View style={styles.challengeHeader}>
            <Text style={[styles.challengeTitle, { fontFamily: FONT.bold }]}>
              Today's Challenge
            </Text>
            <View style={styles.xpBadge}>
              <Text style={[styles.xpText, { fontFamily: FONT.bold }]}>+50 XP</Text>
            </View>
          </View>
          <View style={styles.challengeGreyDiv}>
            <View style={styles.challengeIconWrap}>
              <Ionicons name="bus" size={24} color="#0F9F59" />
            </View>
            <View style={styles.challengeTextWrap}>
              <Text style={[styles.challengeAction, { fontFamily: FONT.bold }]}>
                Use public transport
              </Text>
              <Text style={[styles.challengeDesc, { fontFamily: FONT.medium }]}>
                Opt for the bus or metro instead of driving.
              </Text>
            </View>
            <TouchableOpacity style={styles.challengeAddButton}>
              <Ionicons name="add" size={20} color="#0F9F59" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Squad Standings */}
        <View style={[styles.squadSection, { width: contentWidth }]}>
          <View style={styles.squadHeader}>
            <Text style={[styles.squadTitle, { fontFamily: FONT.extraBold }]}>Squad Standings</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { fontFamily: FONT.bold }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.squadScroll}
          >
            {SQUAD_MEMBERS.map((member) => (
              <View key={member.id} style={styles.squadCard}>
                <View style={styles.avatarWrap}>
                  <Ionicons name="person-circle" size={56} color="#CBD5E1" />
                </View>
                <Text style={[styles.squadName, { fontFamily: FONT.bold }]}>{member.name}</Text>
                <Text style={[styles.squadRank, { fontFamily: FONT.medium }]}>#{member.rank}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8F7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingTitle: {
    fontSize: 24,
    color: '#0F172A',
  },
  leafIcon: {
    marginLeft: 6,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 9999,
    gap: 6,
  },
  levelText: {
    fontSize: 14,
    color: '#0F9F59',
  },
  card: {
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  aqiCard: {
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  aqiWarningIcon: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 179, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aqiLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: '#FFB300',
    marginBottom: 6,
  },
  aqiValue: {
    fontSize: 26,
    color: '#0F172A',
    marginBottom: 4,
  },
  aqiRecommendation: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  aqiBars: {
    flexDirection: 'row',
    gap: 6,
    height: 24,
  },
  aqiBar: {
    flex: 1,
    borderRadius: 6,
  },
  goalCard: {
    backgroundColor: '#0F9F59',
  },
  goalLabel: {
    fontSize: 11,
    letterSpacing: 1,
    color: '#FFFFFF',
    opacity: 0.95,
    marginBottom: -8,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -5,
  },
  goalValue: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  goalUnit: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.95,
  },
  goalProgressWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalPercent: {
    position: 'absolute',
    fontSize: 14,
    color: '#FFFFFF',
  },
  goalTarget: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeTitle: {
    fontSize: 20,
    color: '#28303F',
  },
  xpBadge: {
    backgroundColor: 'rgba(15, 159, 89, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  xpText: {
    fontSize: 12,
    color: '#0F9F59',
  },
  challengeGreyDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
  },
  challengeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  challengeTextWrap: {
    flex: 1,
  },
  challengeAction: {
    fontSize: 16,
    color: '#28303F',
    marginBottom: 2,
  },
  challengeDesc: {
    fontSize: 13,
    color: '#6B7788',
  },
  challengeAddButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(15, 159, 89, 0.2)',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squadSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  squadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  squadTitle: {
    fontSize: 20,
    color: '#0F172A',
  },
  viewAllText: {
    fontSize: 14,
    color: '#0F9F59',
  },
  squadScroll: {
    gap: 12,
    paddingRight: CONTENT_PADDING,
  },
  squadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  avatarWrap: {
    marginBottom: 8,
  },
  squadName: {
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 2,
  },
  squadRank: {
    fontSize: 12,
    color: '#64748B',
  },
});
