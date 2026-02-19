import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { FONT } from '../../theme/fonts';
import LogoIcon from '../../../assets/images/logo.svg';
import InfoIcon from '../../../assets/images/info.svg';

const HERO_SIZE = 340;
const CONTENT_PADDING = 24;

type WelcomeNavProp = NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const { width } = useWindowDimensions();
  const contentWidth = width - CONTENT_PADDING * 2;
  const heroSize = Math.min(contentWidth, HERO_SIZE); // 340x340 max
  const navigation = useNavigation<WelcomeNavProp>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        {/* 1. Top Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <View style={styles.logoCircle}>
              <LogoIcon width={40} height={40} />
            </View>
            <Text style={[styles.brandName, { fontFamily: FONT.medium }]}>
              CleanAir Club
            </Text>
          </View>
          <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
            <InfoIcon width={17} height={17} />
          </TouchableOpacity>
        </View>

        {/* 2. Hero Image Section - 340x340 */}
        <View style={[styles.heroContainer, { width: heroSize, height: HERO_SIZE }]}>
          <Image
            source={require('../../../assets/images/image.png')}
            style={[styles.heroImage, { width: heroSize, height: HERO_SIZE }]}
            resizeMode="cover"
          />
          <View style={styles.badgeWrapper}>
            <Image
              source={require('../../../assets/images/stats.png')}
              style={styles.badgeImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* 3. Title Section */}
        <View style={styles.titleSection}>
          <Text style={[styles.titleLine1, { fontFamily: FONT.extraBold }]}>
            Make Clean Air
          </Text>
          <Text style={[styles.titleLine2, { fontFamily: FONT.extraBold }]}>
            Cool 🌍
          </Text>
        </View>

        {/* 4. Subtitle */}
        <Text style={[styles.subtitle, { fontFamily: FONT.medium }]}>
          Join the elite league of climate heroes.{'\n'}
          Track your impact, challenge friends, and{'\n'}
          breathe better.
        </Text>

        {/* 5. Primary Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CityOnboarding')}
        >
          <Text style={[styles.primaryButtonText, { fontFamily: FONT.bold }]}>
            Start Saving the Planet
          </Text>
        </TouchableOpacity>

        {/* 6. Bottom Tagline */}
        <Text style={[styles.tagline, { fontFamily: FONT.bold }]}>
          TRACK · COMPETE · REDUCE
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
  content: {
    flex: 1,
    paddingHorizontal: CONTENT_PADDING,
    paddingBottom: 48,
    paddingTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 18,
    letterSpacing: -0.45,
    color: '#0F172A',
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    position: 'relative',
    borderRadius: 24,
    overflow: 'visible',
    marginBottom: 32,
  },
  heroImage: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  badgeWrapper: {
    position: 'absolute',
    bottom: -12,
    right: -8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  badgeImage: {
    width: 190,
    height: 86,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleLine1: {
    fontSize: 36,
    letterSpacing: -0.9,
    color: '#0F172A',
    textAlign: 'center',
  },
  titleLine2: {
    fontSize: 36,
    letterSpacing: -0.9,
    color: '#0F9F59',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    letterSpacing: 0,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    paddingHorizontal: 8,
  },
  primaryButton: {
    backgroundColor: '#0F9F59',
    borderRadius: 9999,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    fontSize: 18,
    letterSpacing: 0,
    color: '#FFFFFF',
  },
  tagline: {
    fontSize: 14,
    letterSpacing: 2.8,
    color: '#0F9F59',
    textAlign: 'center',
  },
});
