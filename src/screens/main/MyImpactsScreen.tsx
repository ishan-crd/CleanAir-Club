import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { FONT } from '../../theme/fonts';
import { useImpact } from '../../contexts/ImpactContext';

const CONTENT_PADDING = 24;
const GREEN = '#0F9F59';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#64748B';
const CARD_BG = '#FFFFFF';
const XP_ORANGE = '#EA580C';

function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return `Today, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MyImpactsScreen() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { logs, totalPoints, co2SavedKg } = useImpact();
  const contentWidth = width - CONTENT_PADDING * 2;

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={TEXT_DARK} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: FONT.extraBold }]}>My Impact</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.summaryCard, { width: contentWidth }]}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={[styles.summaryLabel, { fontFamily: FONT.medium }]}>Total XP</Text>
            <Text style={[styles.summaryValue, { fontFamily: FONT.extraBold }]}>{totalPoints}</Text>
          </View>
          <View>
            <Text style={[styles.summaryLabel, { fontFamily: FONT.medium }]}>CO₂ saved</Text>
            <Text style={[styles.summaryValue, { fontFamily: FONT.extraBold }]}>
              {co2SavedKg.toFixed(1)} kg
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { fontFamily: FONT.bold }]}>Past logs</Text>

      {logs.length === 0 ? (
        <View style={[styles.emptyWrap, { width: contentWidth }]}>
          <Ionicons name="leaf-outline" size={48} color={TEXT_MUTED} />
          <Text style={[styles.emptyText, { fontFamily: FONT.medium }]}>
            No impact logs yet. Log a commute or lifestyle action to see them here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContent, { paddingHorizontal: CONTENT_PADDING }]}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.logCard, { width: contentWidth }]}>
              <View style={styles.logLeft}>
                <Text style={[styles.logLabel, { fontFamily: FONT.bold }]}>{item.label}</Text>
                <Text style={[styles.logDate, { fontFamily: FONT.medium }]}>
                  {formatDate(item.timestamp)}
                </Text>
              </View>
              <View style={styles.logRight}>
                <Text style={[styles.logXp, { fontFamily: FONT.bold }]}>+{item.xp} XP</Text>
                <Text style={[styles.logCo2, { fontFamily: FONT.medium }]}>
                  {item.co2Kg.toFixed(1)} kg CO₂
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CONTENT_PADDING,
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
  summaryCard: {
    alignSelf: 'center',
    backgroundColor: GREEN,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryLabel: { fontSize: 12, color: 'rgba(255,255,255,0.9)', marginBottom: 4 },
  summaryValue: { fontSize: 22, color: '#FFFFFF' },
  sectionTitle: {
    fontSize: 16,
    color: TEXT_DARK,
    paddingHorizontal: CONTENT_PADDING,
    marginBottom: 12,
  },
  emptyWrap: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 15,
    color: TEXT_MUTED,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
  },
  listContent: { paddingBottom: 40 },
  logCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  logLeft: { flex: 1 },
  logLabel: { fontSize: 16, color: TEXT_DARK, marginBottom: 4 },
  logDate: { fontSize: 13, color: TEXT_MUTED },
  logRight: { alignItems: 'flex-end' },
  logXp: { fontSize: 15, color: XP_ORANGE, marginBottom: 2 },
  logCo2: { fontSize: 13, color: GREEN },
});
