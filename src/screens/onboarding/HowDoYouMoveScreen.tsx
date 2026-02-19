import { useState } from 'react';
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

import type { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { FONT } from '../../theme/fonts';

const CONTENT_PADDING = 24;
const PAGE_INDICATOR_COUNT = 5;
const ACTIVE_STEP = 1; // first indicator active

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, 'HowDoYouMove'>;

type LifestyleId = 'student' | 'office' | 'commuter' | 'remote';

const LIFESTYLES: Array<{
  id: LifestyleId;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
}> = [
  {
    id: 'student',
    title: 'Student',
    subtitle: 'Walking between classes, campus life',
    icon: 'school',
    iconBg: '#DBEAFE',
  },
  {
    id: 'office',
    title: 'Office Worker',
    subtitle: 'Desk-based, occasional meetings',
    icon: 'briefcase',
    iconBg: '#E2E8F0',
  },
  {
    id: 'commuter',
    title: 'Daily Commuter',
    subtitle: 'Driving or transit to work daily',
    icon: 'car',
    iconBg: '#FEE2E2',
  },
  {
    id: 'remote',
    title: 'Remote Worker',
    subtitle: 'Working from home, minimal travel',
    icon: 'laptop',
    iconBg: '#EDE9FE',
  },
];

export default function HowDoYouMoveScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;
  const navigation = useNavigation<NavProp>();
  const [selectedId, setSelectedId] = useState<LifestyleId>('office');

  const goBack = () => navigation.goBack();
  const goNext = () => navigation.navigate('SeeYourImpact');

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
          <Text style={[styles.title, { fontFamily: FONT.extraBold }]}>How Do You Move?</Text>
          <Text style={[styles.subtitle, { fontFamily: FONT.thin }]}>
            Select the lifestyle that best describes your daily routine to personalize your impact
            journey.
          </Text>

          <View style={styles.cardsContainer}>
            {LIFESTYLES.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.card, isSelected && styles.cardSelected]}
                  onPress={() => setSelectedId(item.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.cardIconWrap, { backgroundColor: item.iconBg }]}>
                    <Ionicons name={item.icon} size={24} color="#334155" />
                  </View>
                  <View style={styles.cardTextWrap}>
                    <Text style={[styles.cardTitle, { fontFamily: FONT.bold }]}>{item.title}</Text>
                    <Text style={[styles.cardSubtitle, { fontFamily: FONT.medium }]}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                    {isSelected ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.proTipBanner}>
            <Ionicons name="sparkles" size={20} color="#0F9F59" />
            <Text style={[styles.proTipText, { fontFamily: FONT.medium }]}>
              Pro-tip: Choosing 'Remote Worker' can earn you the "Home Hero" badge early on!
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footerSection}>
        <TouchableOpacity style={styles.continueButton} onPress={goNext} activeOpacity={0.8}>
          <Text style={[styles.continueButtonText, { fontFamily: FONT.bold }]}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.stepText, { fontFamily: FONT.medium }]}>
          Step 3 of 5 • You can change this later in settings
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
  title: {
    fontSize: 28,
    color: '#0F172A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
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
  cardSelected: {
    borderColor: '#0F9F59',
  },
  cardIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    backgroundColor: '#0F9F59',
    borderColor: '#0F9F59',
  },
  proTipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 159, 89, 0.15)',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  proTipText: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
  },
  footerSection: {
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F6F8F7',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F9F59',
    borderRadius: 9999,
    paddingVertical: 18,
    gap: 8,
    marginBottom: 12,
  },
  continueButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
