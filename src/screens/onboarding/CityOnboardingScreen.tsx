import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import type { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { FONT } from '../../theme/fonts';
import Logo2Icon from '../../../assets/images/logo2.svg';

const CONTENT_PADDING = 24;

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, 'CityOnboarding'>;

const CAROUSEL_ITEMS = [
  {
    id: '1',
    icon: 'bus',
    text: 'If 10% of your city switches to public transport twice a week..',
    highlightStart: '10% of your city',
    highlightEnd: 'public transport twice a week',
    impact: '-30%',
    impactLabel: 'CO2 EMISSIONS',
  },
  {
    id: '2',
    icon: 'bicycle',
    text: 'If 15% of your city cycles for short trips, we cut traffic and pollution.',
    highlightStart: '15% of your city',
    highlightEnd: 'cycles for short trips',
    impact: '-25%',
    impactLabel: 'CO2 EMISSIONS',
  },
  {
    id: '3',
    icon: 'car',
    text: 'If 20% of your city carpooled once a week, road emissions fall.',
    highlightStart: '20% of your city',
    highlightEnd: 'carpooled once a week',
    impact: '-20%',
    impactLabel: 'CO2 EMISSIONS',
  },
  {
    id: '4',
    icon: 'leaf',
    text: 'If 25% of your city reduced idling at lights, we save fuel and clean the air.',
    highlightStart: '25% of your city',
    highlightEnd: 'reduced idling at lights',
    impact: '-15%',
    impactLabel: 'CO2 EMISSIONS',
  },
];

const IONICON_NAMES: Record<string, keyof typeof Ionicons.glyphMap> = {
  bus: 'bus',
  bicycle: 'bicycle',
  car: 'car',
  leaf: 'leaf',
};

function AQITransformIcon({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 12H4M4 12L7 9M4 12L7 15"
        stroke="#0F9F59"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 12H20M20 12L17 9M20 12L17 15"
        stroke="#0F9F59"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CarouselCard({
  item,
  width,
}: {
  item: (typeof CAROUSEL_ITEMS)[0];
  width: number;
}) {
  const before1 = item.text.substring(0, item.text.indexOf(item.highlightStart));
  const mid = item.text.substring(
    item.text.indexOf(item.highlightStart) + item.highlightStart.length,
    item.text.indexOf(item.highlightEnd)
  );
  const after2 = item.text.substring(
    item.text.indexOf(item.highlightEnd) + item.highlightEnd.length
  );
  const iconName = IONICON_NAMES[item.icon] ?? 'leaf';
  return (
    <View style={[styles.carouselCard, { width }]}>
      <View style={styles.carouselCardInner}>
        <View style={styles.carouselIconWrap}>
          <Ionicons name={iconName} size={28} color="#0F9F59" />
        </View>
        <Text style={[styles.carouselText, { fontFamily: FONT.medium }]}>
          {before1}
          <Text style={{ fontFamily: FONT.bold, color: '#0F9F59' }}>{item.highlightStart}</Text>
          {mid}
          <Text style={{ fontFamily: FONT.bold, color: '#0F9F59' }}>{item.highlightEnd}</Text>
          {after2}
        </Text>
      </View>
      <Text style={[styles.carouselImpact, { fontFamily: FONT.medium }]}>
        <Text style={[styles.carouselImpactValue, { fontFamily: FONT.bold }]}>{item.impact}</Text>{' '}
        {item.impactLabel}
      </Text>
    </View>
  );
}

export default function CityOnboardingScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;
  const cardWidth = contentWidth;
  const navigation = useNavigation<NavProp>();
  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.contentWrapper}>
        <View style={styles.scrollContent}>
          {/* 1. Top Header: back left, logo + name center */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Logo2Icon width={24} height={24} />
            <Text style={[styles.brandName, { fontFamily: FONT.medium }]}>CleanAir Club</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* 2. Title */}
        <View style={styles.titleBlock}>
          <Text style={[styles.titleLine1, { fontFamily: FONT.extraBold }]}>Your City</Text>
          <Text style={[styles.titleLine2, { fontFamily: FONT.extraBold }]}>Needs You.</Text>
        </View>

        {/* 3. AQI transform card (current vs target + copy) */}
        <View style={[styles.aqiCard, { width: contentWidth }]}>
          <View style={styles.aqiTopRow}>
            <View style={styles.aqiHalfLeft}>
              <Text style={[styles.aqiLabel, { fontFamily: FONT.bold }]}>CURRENT</Text>
              <Text style={[styles.aqiValueCurrent, { fontFamily: FONT.bold }]}>AQI 150</Text>
              <View style={styles.aqiPillUnhealthy}>
                <Text style={[styles.aqiPillTextUnhealthy, { fontFamily: FONT.medium }]}>
                  UNHEALTHY
                </Text>
              </View>
            </View>
            <View style={styles.aqiCenterCircleWrap} pointerEvents="none">
              <View style={styles.aqiCenterCircle}>
                <AQITransformIcon size={22} />
              </View>
            </View>
            <View style={styles.aqiHalfRight}>
              <Text style={[styles.aqiLabelTarget, { fontFamily: FONT.bold }]}>TARGET</Text>
              <Text style={[styles.aqiValueTarget, { fontFamily: FONT.bold }]}>AQI 45</Text>
              <View style={styles.aqiPillHealthy}>
                <Text style={[styles.aqiPillTextHealthy, { fontFamily: FONT.medium }]}>HEALTHY</Text>
              </View>
            </View>
          </View>
          <View style={styles.aqiBottom}>
            <Text style={[styles.aqiHeadline, { fontFamily: FONT.extraBold }]}>
              Breathe the difference.
            </Text>
            <Text style={[styles.aqiParagraph, { fontFamily: FONT.thin }]}>
              Our urban centers are currently at high risk levels. By tracking your daily habits, we
              can collectively lower the AQI by 60%.
            </Text>
          </View>
        </View>

        {/* 4. Carousel */}
          <View style={styles.carouselWrapper}>
            <FlatList
              data={CAROUSEL_ITEMS}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + 16}
              snapToAlignment="start"
              decelerationRate="fast"
              contentContainerStyle={styles.carouselContent}
              style={styles.carouselList}
              renderItem={({ item }) => <CarouselCard item={item} width={cardWidth} />}
            />
          </View>
        </View>
      </View>

      {/* CTA Button - fixed at bottom */}
      <View style={styles.ctaButtonContainer}>
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('HowDoYouMove')}
        >
          <Text style={[styles.ctaButtonText, { fontFamily: FONT.bold }]}>I'm In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8F7',
  },
  contentWrapper: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: CONTENT_PADDING,
    paddingBottom: 16,
  },
  ctaButtonContainer: {
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F6F8F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    minHeight: 44,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  brandName: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: '#0F172A',
  },
  titleBlock: {
    marginBottom: 20,
  },
  titleLine1: {
    fontSize: 36,
    letterSpacing: -0.9,
    color: '#0F172A',
  },
  titleLine2: {
    fontSize: 36,
    letterSpacing: -0.9,
    color: '#0F172A',
  },
  aqiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: { elevation: 6 },
    }),
  },
  aqiTopRow: {
    flexDirection: 'row',
    minHeight: 180,
  },
  aqiHalfLeft: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    borderTopLeftRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
    paddingRight: 20,
  },
  aqiHalfRight: {
    flex: 1,
    backgroundColor: 'rgba(15, 159, 89, 0.2)',
    borderTopRightRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
    paddingLeft: 20,
  },
  aqiLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
    color: '#64748B',
    marginBottom: 6,
  },
  aqiValueCurrent: {
    fontSize: 30,
    letterSpacing: -0.5,
    color: '#334155',
    marginBottom: 10,
  },
  aqiPillUnhealthy: {
    backgroundColor: '#CBD5E1',
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  aqiPillTextUnhealthy: {
    fontSize: 10,
    letterSpacing: 0.5,
    color: '#334155',
  },
  aqiCenterCircleWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  aqiCenterCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: { elevation: 4 },
    }),
  },
  aqiLabelTarget: {
    fontSize: 12,
    letterSpacing: 1.2,
    color: '#0F9F59',
    marginBottom: 6,
  },
  aqiValueTarget: {
    fontSize: 30,
    letterSpacing: -0.5,
    color: '#0F9F59',
    marginBottom: 10,
  },
  aqiPillHealthy: {
    backgroundColor: '#0F9F59',
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  aqiPillTextHealthy: {
    fontSize: 10,
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
  aqiBottom: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  aqiHeadline: {
    fontSize: 24,
    color: '#2D3748',
    marginBottom: 10,
  },
  aqiParagraph: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  carouselWrapper: {
    height: 220,
    marginBottom: 8,
  },
  carouselList: {
    flexGrow: 0,
  },
  carouselContent: {
    paddingBottom: 24,
    paddingRight: CONTENT_PADDING,
  },
  carouselCard: {
    marginRight: 16,
  },
  carouselCardInner: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    gap: 12,
  },
  carouselIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(15, 159, 89, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselText: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    lineHeight: 22,
  },
  carouselImpact: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#475569',
  },
  carouselImpactValue: {
    color: '#0F9F59',
    fontSize: 14,
  },
  ctaButton: {
    backgroundColor: '#0F9F59',
    borderRadius: 9999,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
});
