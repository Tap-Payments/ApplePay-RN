import { useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TapApplePay, type ApplePayConfiguration } from 'applepay-rn';
import { DEFAULT_CONFIG } from './constants';
import { simpleScreenStyles } from './SimpleScreenStyles';

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface SimpleScreenProps {
  config?: ApplePayConfiguration;
  onSuccess: (data: string) => void;
  onBack: () => void;
}

export function SimpleScreen({
  config = DEFAULT_CONFIG,
  onSuccess,
  onBack,
}: SimpleScreenProps) {
  const configJSON = useMemo(() => {
    try {
      return JSON.stringify(config, null, 2);
    } catch {
      return JSON.stringify(config);
    }
  }, [config]);

  const handleReady = useCallback(() => {
    console.log('SimpleScreen: onReady');
  }, []);

  const handleClick = useCallback(() => {
    console.log('SimpleScreen: onClick');
  }, []);

  const handleSuccess = useCallback(
    (data: string) => {
      console.log('SimpleScreen: onSuccess', data);
      onSuccess(data);
    },
    [onSuccess]
  );

  const handleChargeCreated = useCallback((data: string) => {
    console.log('SimpleScreen: onChargeCreated', data);
  }, []);

  const handleOrderCreated = useCallback((data: string) => {
    console.log('SimpleScreen: onOrderCreated', data);
  }, []);

  const handleCancel = useCallback(() => {
    console.log('SimpleScreen: onCancel');
  }, []);

  const handleError = useCallback((err: any) => {
    console.log('SimpleScreen: onError', err);
  }, []);

  const handleMerchantValidation = useCallback((data: string) => {
    console.log('SimpleScreen: onMerchantValidation', data);
  }, []);

  return (
    <SafeAreaView style={simpleScreenStyles.safeArea}>
      <View style={simpleScreenStyles.navBar}>
        <TouchableOpacity onPress={onBack} style={simpleScreenStyles.navButton}>
          <Text style={simpleScreenStyles.navButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={simpleScreenStyles.navTitle}>Simple Integration</Text>
        <View style={simpleScreenStyles.navButton} />
      </View>

      <ScrollView
        contentContainerStyle={simpleScreenStyles.mainContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={simpleScreenStyles.infoText}>
          This is a simple integration example. Check console logs for all
          events.
        </Text>

        {/* App Configuration */}
        <View style={simpleScreenStyles.configBox}>
          <Text style={simpleScreenStyles.configTitle}>CONFIGURATION</Text>
          <Text style={simpleScreenStyles.configJSON}>{configJSON}</Text>
        </View>

        <TapApplePay
          configuration={config}
          style={simpleScreenStyles.applePayButton}
          onReady={handleReady}
          onClick={handleClick}
          onSuccess={handleSuccess}
          onChargeCreated={handleChargeCreated}
          onOrderCreated={handleOrderCreated}
          onCancel={handleCancel}
          onError={handleError}
          onMerchantValidation={handleMerchantValidation}
        />

        <Text style={simpleScreenStyles.hintText}>
          Open the console (Xcode Debugger or React Native Debugger) to see
          event logs.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
