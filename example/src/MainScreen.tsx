import { useCallback, useState } from 'react';
import {
  ActionSheetIOS,
  Alert,
  Clipboard,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TapApplePay, type ApplePayConfiguration } from 'applepay-rn';
import { styles } from './styles';
import { prettyJSON } from './helpers';

interface MainScreenProps {
  config: ApplePayConfiguration;
  onSuccess: (data: string) => void;
  onOpenSettings: () => void;
  onOpenSimple?: () => void;
}

export function MainScreen({
  config,
  onSuccess,
  onOpenSettings,
  onOpenSimple,
}: MainScreenProps) {
  const [events, setEvents] = useState('');
  const [showReload, setShowReload] = useState(false);
  const [configKey, setConfigKey] = useState(0);

  const log = useCallback((event: string) => {
    setEvents((prev) => `\n\n========\n\n${event}${prev}`);
  }, []);

  const reload = useCallback(() => {
    setShowReload(false);
    setEvents('');
    setConfigKey((k) => k + 1);
  }, []);

  const showOptions = useCallback(() => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            'Copy logs',
            'Clear logs',
            'Simple Example',
            'Settings',
            'Cancel',
          ],
          cancelButtonIndex: 4,
        },
        (index) => {
          if (index === 0) Clipboard.setString(events);
          if (index === 1) setEvents('');
          if (index === 2) onOpenSimple?.();
          if (index === 3) onOpenSettings();
        }
      );
    } else {
      Alert.alert('Options', undefined, [
        { text: 'Copy logs', onPress: () => Clipboard.setString(events) },
        { text: 'Clear logs', onPress: () => setEvents('') },
        { text: 'Simple Example', onPress: onOpenSimple },
        { text: 'Settings', onPress: onOpenSettings },
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  }, [events, onOpenSettings, onOpenSimple]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Tap Apple Pay</Text>
        <TouchableOpacity onPress={showOptions} style={styles.navButton}>
          <Text style={styles.navButtonText}>Options</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.mainContent}
        keyboardShouldPersistTaps="handled"
      >
        <TapApplePay
          key={configKey}
          configuration={config}
          style={styles.applePayButton}
          onReady={() => log('onReady')}
          onClick={() => log('onClick')}
          onSuccess={(data) => {
            log(`onSuccess:\n${prettyJSON(data)}`);
            setShowReload(true);
            onSuccess(data);
          }}
          onChargeCreated={(data) => log(`onChargeCreated: ${data}`)}
          onOrderCreated={(data) => log(`onOrderCreated: ${data}`)}
          onCancel={() => {
            log('onCanceled');
            setShowReload(true);
          }}
          onError={(err) => {
            log(`onError:\n${prettyJSON(err)}`);
            setShowReload(true);
          }}
          onMerchantValidation={(data) =>
            log(`onMerchantValidation:\n${prettyJSON(data)}`)
          }
        />

        <Text style={styles.eventsBox}>
          {events || 'Events will appear here...'}
        </Text>

        {showReload && (
          <TouchableOpacity style={styles.reloadButton} onPress={reload}>
            <Text style={styles.reloadButtonText}>Reload Button</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
