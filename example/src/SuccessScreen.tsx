import { useCallback, useState } from 'react';
import {
  Clipboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';

interface SuccessScreenProps {
  result: string;
  onBack: () => void;
}

export function SuccessScreen({ result, onBack }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    Clipboard.setString(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onBack} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Payment Success</Text>
        <View style={styles.navButton} />
      </View>

      <ScrollView contentContainerStyle={styles.successContent}>
        <Text style={styles.resultText}>{result}</Text>
      </ScrollView>

      <View style={styles.successFooter}>
        <TouchableOpacity style={styles.copyButton} onPress={copy}>
          <Text style={styles.copyButtonText}>
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
