import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import type { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { FONT } from '../../theme/fonts';

const CONTENT_PADDING = 24;
const PAGE_INDICATOR_COUNT = 3;
const ACTIVE_STEP = 2; // middle indicator active
const CIRCLE_SIZE = 200;
const SCORE_PERCENT = 84;

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, 'SeeYourImpact'>;

export default function SeeYourImpactScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;
  const navigation = useNavigation<NavProp>();

  const goBack = () => navigation.goBack();
  const goNext = () => navigation.navigate('LetsMakeItSmarter');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.contentWrapper}>
        <View style={[styles.topBar, { paddingHorizontal: CONTENT_PADDING }]}>
          <TouchableOpacity style={styles.backButton} onPress={goBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.pageIndicators}>
            {Array.from({ length: PAGE_INDICATOR_COUNT }, (_, i) => (
              <View
                key={`step-${i + 1}`}
                style={[
                  styles.pageDot,
                  i + 1 === ACTIVE_STEP ? styles.pageDotActive : styles.pageDotInactive,
                ]}
              />
            ))}
          </View>
          <View style={styles.backSpacer} />
        </View>

        <View style={[styles.mainContent, { width: contentWidth }]}>
          <Text style={[styles.previewLabel, { fontFamily: FONT.bold }]}>YOUR PREVIEW</Text>
          <Text style={[styles.title, styles.titleLine1, { fontFamily: FONT.extraBold }]}>
            See Your Potential
          </Text>
          <Text style={[styles.title, styles.titleLine2, { fontFamily: FONT.extraBold }]}>
            Impact
          </Text>

          {/* Circular impact metric */}
          <View style={styles.circleWrapper}>
            <View style={styles.circleOuter}>
              <View style={styles.circleInner}>
                <View style={styles.circleNumberRow}>
                  <Text style={[styles.circleNumber, { fontFamily: FONT.extraBold }]}>12</Text>
                  <Text style={[styles.circleUnit, { fontFamily: FONT.extraBold }]}> kg</Text>
                </View>
                <Text style={[styles.circleLabel, { fontFamily: FONT.thin }]}>
                  CO2 per month
                </Text>
              </View>
            </View>
          </View>

          {/* Tree comparison */}
          <View style={styles.treeBox}>
            <Text style={styles.treeEmoji}>🌳</Text>
            <Text style={[styles.treeText, { fontFamily: FONT.medium }]}>
              It's like planting{' '}
              <Text style={[styles.treeHighlight, { fontFamily: FONT.bold }]}>5 trees</Text> every
              month
            </Text>
          </View>

          <Text style={[styles.paragraph, { fontFamily: FONT.medium }]}>
            By making small shifts in your daily commute and diet, you can significantly lower your
            urban.
          </Text>

          {/* Potential Score */}
          <View style={styles.scoreCard}>
            <View style={styles.scoreRow}>
              <Text style={[styles.scoreLabel, { fontFamily: FONT.bold }]}>Potential Score</Text>
              <Text style={[styles.scoreValue, { fontFamily: FONT.bold }]}>84/100</Text>
            </View>
            <View style={styles.progressBarBg}>
              <LinearGradient
                colors={['#0F9F59', '#22C55E', '#3B82F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${SCORE_PERCENT}%` }]}
              />
            </View>
            {/* <View style={styles.opportunityRow}>
              <Ionicons name="checkmark-circle" size={18} color="#0F9F59" />
              <Text style={[styles.opportunityText, { fontFamily: FONT.medium }]}>
                High Impact Opportunity Identified
              </Text>
            </View> */}
          </View>
        </View>
      </View>

      <View style={styles.footerSection}>
        <TouchableOpacity style={styles.ctaButton} onPress={goNext} activeOpacity={0.8}>
          <Text style={[styles.ctaButtonText, { fontFamily: FONT.bold }]}>
            Activate My Eco Score
          </Text>
        </TouchableOpacity>
        <Text style={[styles.footerText, { fontFamily: FONT.medium }]}>
          No credit card required. Start for free.
        </Text>
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
    paddingHorizontal: CONTENT_PADDING,
    paddingBottom: 16,
  },
  topBar: {
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
  },
  pageIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  pageDotActive: {
    backgroundColor: '#0F9F59',
  },
  pageDotInactive: {
    backgroundColor: '#CBD5E1',
  },
  backSpacer: {
    width: 40,
  },
  mainContent: {
    flex: 1,
    alignSelf: 'center',
  },
  previewLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
    color: '#0F9F59',
    marginBottom: 6,
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    color: '#0F172A',
    textAlign: 'center',
  },
  titleLine1: {
    marginBottom: 2,
  },
  titleLine2: {
    marginBottom: 28,
  },
  circleWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  circleOuter: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 6,
    borderColor: '#0F9F59',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 159, 89, 0.12)',
  },
  circleInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleNumberRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  circleNumber: {
    fontSize: 50,
    color: '#0F172A',
    lineHeight: 60,
  },
  circleUnit: {
    fontSize: 22,
    color: '#0F172A',
    marginLeft: 2,
  },
  circleLabel: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  treeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  treeEmoji: {
    fontSize: 28,
  },
  treeText: {
    flex: 1,
    fontSize: 15,
    color: '#334155',
    lineHeight: 22,
  },
  treeHighlight: {
    color: '#0F9F59',
  },
  paragraph: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    borderRadius: 16,
    padding: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreLabel: {
    fontSize: 15,
    color: '#0F172A',
  },
  scoreValue: {
    fontSize: 13,
    color: '#0F9F59',
  },
  progressBarBg: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  opportunityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  opportunityText: {
    fontSize: 13,
    color: '#64748B',
  },
  footerSection: {
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F6F8F7',
  },
  ctaButton: {
    backgroundColor: '#0F9F59',
    borderRadius: 9999,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  ctaButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
