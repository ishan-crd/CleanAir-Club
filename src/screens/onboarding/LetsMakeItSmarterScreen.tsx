import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import type { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { FONT } from '../../theme/fonts';

const CONTENT_PADDING = 24;
const PAGE_INDICATOR_COUNT = 3;
const ACTIVE_STEP = 3;

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, 'LetsMakeItSmarter'>;

export default function LetsMakeItSmarterScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;
  const navigation = useNavigation<NavProp>();
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [activityEnabled, setActivityEnabled] = useState(true);

  const goBack = () => navigation.goBack();

  const goToMain = () => {
    const rootNav = navigation.getParent()?.getParent();
    if (rootNav) {
      rootNav.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] }));
    } else {
      navigation.dispatch(CommonActions.navigate({ name: 'Main' }));
    }
  };
  const enableAndStart = goToMain;
  const maybeLater = goToMain;

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
          <Text style={[styles.titleLine1, { fontFamily: FONT.extraBold }]}>Let's Make It</Text>
          <Text style={[styles.titleLine2, { fontFamily: FONT.extraBold }]}>Smarter</Text>
          <Text style={[styles.subtitle, { fontFamily: FONT.medium }]}>
            To track your impact accurately, we need a few permissions.
          </Text>

          <View style={styles.cardsContainer}>
            <View style={styles.permissionCard}>
              <View style={styles.permissionIconWrap}>
                <Ionicons name="location" size={22} color="#0F9F59" />
              </View>
              <View style={styles.permissionTextWrap}>
                <Text style={[styles.permissionTitle, { fontFamily: FONT.bold }]}>
                  Location access
                </Text>
                <Text style={[styles.permissionDesc, { fontFamily: FONT.medium }]}>
                  We use this to identify local air quality and suggest cleaner commuting routes.
                </Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: '#E2E8F0', true: '#0F9F59' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.permissionCard}>
              <View style={styles.permissionIconWrap}>
                <Ionicons name="walk" size={22} color="#0F9F59" />
              </View>
              <View style={styles.permissionTextWrap}>
                <Text style={[styles.permissionTitle, { fontFamily: FONT.bold }]}>
                  Activity tracking
                </Text>
                <Text style={[styles.permissionDesc, { fontFamily: FONT.medium }]}>
                  This helps us calculate the carbon you save by walking or cycling instead of
                  driving.
                </Text>
              </View>
              <Switch
                value={activityEnabled}
                onValueChange={setActivityEnabled}
                trackColor={{ false: '#E2E8F0', true: '#0F9F59' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>

          <View style={styles.privacyRow}>
            <Ionicons name="lock-closed" size={14} color="#94A3B8" />
            <Text style={[styles.privacyText, { fontFamily: FONT.medium }]}>
              END-TO-END ENCRYPTED DATA
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footerSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={enableAndStart} activeOpacity={0.8}>
          <Text style={[styles.primaryButtonText, { fontFamily: FONT.bold }]}>Enable & Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={maybeLater} activeOpacity={0.7}>
          <Text style={[styles.secondaryButtonText, { fontFamily: FONT.medium }]}>Maybe later</Text>
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
  titleLine1: {
    fontSize: 28,
    color: '#0F172A',
    marginBottom: 2,
  },
  titleLine2: {
    fontSize: 28,
    color: '#0F9F59',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  permissionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAF9',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  permissionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 159, 89, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  permissionTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  permissionTitle: {
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  permissionDesc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  privacyText: {
    fontSize: 11,
    letterSpacing: 1,
    color: '#94A3B8',
  },
  footerSection: {
    paddingHorizontal: CONTENT_PADDING,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#F6F8F7',
  },
  primaryButton: {
    backgroundColor: '#0F9F59',
    borderRadius: 9999,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  secondaryButtonText: {
    fontSize: 15,
    color: '#64748B',
  },
});
