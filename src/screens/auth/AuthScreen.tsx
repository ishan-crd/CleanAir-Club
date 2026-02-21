import { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuth } from '../../contexts/AuthContext';
import { FONT } from '../../theme/fonts';

const CONTENT_PADDING = 24;
const GREEN = '#0F9F59';

export default function AuthScreen() {
  const { login } = useAuth();
  const signInWithPhone = useMutation(api.auth.signInWithPhone);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    setError(null);
    setLoading(true);
    try {
      const userId = await signInWithPhone({ phone: phone.trim() });
      await login(userId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={20}
      >
        <Text style={[styles.title, { fontFamily: FONT.extraBold }]}>Welcome</Text>
        <Text style={[styles.subtitle, { fontFamily: FONT.medium }]}>
          Enter your mobile number to continue
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile number"
          placeholderTextColor="#94A3B8"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={!loading}
          maxLength={16}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={loading || !phone.trim()}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={[styles.buttonText, { fontFamily: FONT.bold }]}>Continue</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1, padding: CONTENT_PADDING, justifyContent: 'center' },
  title: { fontSize: 28, color: '#0F172A', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#64748B', marginBottom: 32 },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 12,
  },
  error: { color: '#DC2626', marginBottom: 12, fontSize: 14 },
  button: {
    backgroundColor: GREEN,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#FFF', fontSize: 16 },
});
