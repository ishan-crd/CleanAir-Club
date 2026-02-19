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
import Svg, { Path, Circle } from 'react-native-svg';

import { FONT } from '../../theme/fonts';

const CONTENT_PADDING = 24;
const GREEN = '#0F9F59';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#64748B';
const CARD_BG = '#FFFFFF';
const BORDER_LIGHT = '#E2E8F0';
const BG_LIGHT = '#F1F5F9';
const PILL_GREEN_BG = '#DCFCE7';

// Bar heights (0–1) for WEEK 1–4, then line connects tops
const BAR_DATA = [0.45, 0.38, 0.62, 0.85];
const BAR_LABELS = ['WEEK 1', 'WEEK 2', 'WEEK 3', 'CURRENT'];
const CHART_HEIGHT = 120;
const CHART_BAR_WIDTH = 36;
const CHART_GAP = 24;
const CHART_BAR_MAX_H = CHART_HEIGHT - 36;

// Donut: 42% EV USE
const DONUT_SIZE = 140;
const DONUT_STROKE = 20;

// Action density grid: 4 cols x 5 rows. Soho (1,2) lighter, Shoreditch (3,4) darker.
const DOT_SIZE = 30;
const DOT_GRID = [
  [0.35, 0.4, 0.45, 0.5, 0.4, 0.45, 0.5,  0.4],
  [0.4, 0.5, 0.45, 0.55, 0.4, 0.45, 0.5,  0.4],
  [0.45, 0.4, 0.5, 0.6, 0.45, 0.5, 0.6,  0.4],
  [0.5, 0.55, 0.6, 0.7, 0.5, 0.55, 0.6,  0.4],
  [0.55, 0.6, 0.65, 1, 0.55, 0.6, 0.65,  0.4],
].flatMap((row, ri) => row.map((intensity, ci) => ({ id: `dot-${ri}-${ci}`, intensity, ri, ci })));

function DonutChart({ percent, size }: { percent: number; size: number }) {
  const r = (size - DONUT_STROKE) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const strokeDash = (percent / 100) * circumference;
  return (
    <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle cx={cx} cy={cy} r={r} stroke={BORDER_LIGHT} strokeWidth={DONUT_STROKE} fill="none" />
      <Circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={GREEN}
        strokeWidth={DONUT_STROKE}
        fill="none"
        strokeDasharray={`${strokeDash} ${circumference}`}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function StatsScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;
  const navigation = useNavigation();

  const chartWidth = BAR_LABELS.length * (CHART_BAR_WIDTH + CHART_GAP) - CHART_GAP;

  // Line path over bar tops (x,y in chart coords)
  const points = BAR_DATA.map((h, i) => {
    const x = i * (CHART_BAR_WIDTH + CHART_GAP) + CHART_BAR_WIDTH / 2;
    const y = CHART_HEIGHT - 16 - h * (CHART_BAR_MAX_H - 16);
    return { x, y };
  });
  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`)).join('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: CONTENT_PADDING }]}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={TEXT_DARK} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: FONT.bold }]}>Impact Analytics</Text>
        <TouchableOpacity style={styles.headerBtn} activeOpacity={0.7}>
          <Ionicons name="share-social-outline" size={20} color={TEXT_DARK} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Your Climate Footprint */}
        <View style={[styles.section, { width: contentWidth }]}>
          <View style={styles.footprintRow}>
            <View>
              <Text style={[styles.sectionLabel, { fontFamily: FONT.thin }]}>YOUR CLIMATE FOOTPRINT</Text>
              <View style={styles.footprintValueRow}>
                <Text style={[styles.footprintValue, { fontFamily: FONT.extraBold }]}>142.4</Text>
                <Text style={[styles.footprintUnit, { fontFamily: FONT.medium }]}>kg CO₂e</Text>
              </View>
            </View>
            <View style={styles.pill}>
              <Text style={[styles.pillText, { fontFamily: FONT.semiBold }]}>Weekly -12%</Text>
            </View>
          </View>
        </View>

        {/* CO₂ Reduction Card */}
        <View style={[styles.card, { width: contentWidth }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { fontFamily: FONT.bold }]}>CO₂ Reduction</Text>
              <Text style={[styles.cardSubtitle, { fontFamily: FONT.medium }]}>Last 30 days progress</Text>
            </View>
            <View style={styles.trendIconWrap}>
              <Ionicons name="trending-down" size={18} color={GREEN} />
            </View>
          </View>
          <View style={[styles.chartWrap, { width: chartWidth, height: CHART_HEIGHT }]}>
            <Svg width={chartWidth} height={CHART_HEIGHT} style={StyleSheet.absoluteFill}>
              <Path d={linePath} stroke={GREEN} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <View style={styles.barsRow}>
              {BAR_DATA.map((h, i) => (
                <View
                  key={`bar-${BAR_LABELS[i]}`}
                  style={[
                    styles.bar,
                    {
                      width: CHART_BAR_WIDTH,
                      height: 16 + h * (CHART_BAR_MAX_H - 16),
                      marginLeft: i === 0 ? 0 : CHART_GAP,
                      backgroundColor: i < 2 ? '#E2E8F0' : GREEN,
                    },
                  ]}
                />
              ))}
            </View>
            <View style={[styles.barLabels, { width: chartWidth }]}>
              {BAR_LABELS.map((l) => (
                <Text key={l} style={[styles.barLabel, { fontFamily: FONT.medium }]} numberOfLines={1}>
                  {l}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Transport Breakdown Card */}
        <View style={[styles.card, { width: contentWidth }]}>
          <View style={styles.transportRow}>
            <View style={styles.donutWrap}>
              <DonutChart percent={42} size={DONUT_SIZE} />
              <View style={styles.donutCenter}>
                <Text style={[styles.donutValue, { fontFamily: FONT.bold }]}>42%</Text>
                <Text style={[styles.donutLabel, { fontFamily: FONT.medium }]}>EV USE</Text>
              </View>
            </View>
            <View style={styles.legendWrap}>
              <Text style={[styles.cardTitle, { fontFamily: FONT.bold }]}>Transport Breakdown</Text>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#166534' }]} />
                <Text style={[styles.legendText, { fontFamily: FONT.medium }]}>Public Transit</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#0D9488' }]} />
                <Text style={[styles.legendText, { fontFamily: FONT.medium }]}>Cycling</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#94A3B8' }]} />
                <Text style={[styles.legendText, { fontFamily: FONT.medium }]}>Other</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Community Impact */}
        <View style={[styles.section, { width: contentWidth }]}>
          <View style={styles.communityHeader}>
            <Text style={[styles.sectionLabel, { fontFamily: FONT.bold }]}>COMMUNITY IMPACT: LONDON</Text>
            <View style={styles.activeWrap}>
              <Ionicons name="people" size={18} color={GREEN} />
              <Text style={[styles.activeText, { fontFamily: FONT.semiBold }]}>12k Active</Text>
            </View>
          </View>
        </View>

        {/* Action Density Card */}
        <View style={[styles.card, { width: contentWidth }]}>
          <Text style={[styles.cardTitle, { fontFamily: FONT.bold }]}>Action Density</Text>
          <Text style={[styles.cardSubtitle, { fontFamily: FONT.medium }]}>Live neighborhood contributions</Text>
          <View style={styles.dotGrid}>
            {[0, 1, 2, 3, 4].map((ri) => (
              <View key={`row-${ri}`} style={styles.dotRow}>
                {DOT_GRID.filter((d) => d.ri === ri).map((d) => (
                  <View key={d.id} style={styles.dotCell}>
                    {d.ci === 1 && d.ri === 2 ? (
                      <View style={styles.dotLabelWrap}>
                        <View style={[styles.dot, { backgroundColor: GREEN, opacity: 0.5 }]} />
                        <View style={styles.labelPill}>
                          {/* <Text style={[styles.labelPillText, { fontFamily: FONT.semiBold }]}>Soho</Text> */}
                        </View>
                      </View>
                    ) : d.ci === 3 && d.ri === 4 ? (
                      <View style={styles.dotLabelWrap}>
                        <View style={[styles.dot, { backgroundColor: GREEN }]} />
                        <View style={styles.labelPill}>
                          {/* <Text style={[styles.labelPillText, { fontFamily: FONT.semiBold }]}>Shoreditch</Text> */}
                        </View>
                      </View>
                    ) : (
                      <View style={[styles.dot, { backgroundColor: GREEN, opacity: d.intensity }]} />
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.actionFooter}>
            <Text style={[styles.topDistrict, { fontFamily: FONT.bold }]}>TOP DISTRICT: Noida</Text>
            <Text style={[styles.co2Saved, { fontFamily: FONT.medium }]}>+1.2t CO2 Saved</Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_LIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: BG_LIGHT,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CARD_BG,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
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
    paddingBottom: 32,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 0.5,
    color: TEXT_DARK,
    marginBottom: 4,
  },
  footprintRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  footprintValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  footprintValue: {
    fontSize: 32,
    color: TEXT_DARK,
  },
  footprintUnit: {
    fontSize: 16,
    color: TEXT_MUTED
  },
  pill: {
    backgroundColor: PILL_GREEN_BG,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 13,
    color: GREEN,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
      android: { elevation: 3 },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    color: TEXT_DARK,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginBottom: 12,
  },
  trendIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PILL_GREEN_BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartWrap: {
    paddingBottom: 28,
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: CHART_BAR_MAX_H + 16,
  },
  bar: {
    borderRadius: 6,
  },
  barLabels: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barLabel: {
    fontSize: 10,
    color: TEXT_MUTED,
    width: CHART_BAR_WIDTH + CHART_GAP,
    textAlign: 'center',
  },
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donutWrap: {
    width: DONUT_SIZE,
    height: DONUT_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutValue: {
    fontSize: 20,
    color: TEXT_DARK,
  },
  donutLabel: {
    fontSize: 11,
    color: TEXT_MUTED,
    letterSpacing: 0.5,
  },
  legendWrap: {
    flex: 1,
    paddingLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    color: TEXT_DARK,
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeText: {
    fontSize: 14,
    color: GREEN,
  },
  dotGrid: {
    marginTop: 12,
    marginBottom: 16,
  },
  dotRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dotCell: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  dotLabelWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelPill: {
    backgroundColor: CARD_BG,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: BORDER_LIGHT,
  },
  labelPillText: {
    fontSize: 11,
    color: TEXT_DARK,
  },
  actionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topDistrict: {
    fontSize: 12,
    color: GREEN,
    letterSpacing: 0.3,
  },
  co2Saved: {
    fontSize: 13,
    color: GREEN,
  },
  bottomSpacer: {
    height: 24,
  },
});
