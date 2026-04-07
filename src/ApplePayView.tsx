import React, { useRef, useCallback } from 'react';
import {
  Platform,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import NativeApplePayView from './NativeApplePayView';
import type { ApplePayConfiguration } from './types';

export interface TapApplePayProps {
  configuration: ApplePayConfiguration;
  style?: StyleProp<ViewStyle>;
  onReady?: () => void;
  onClick?: () => void;
  onSuccess?: (data: string) => void;
  onChargeCreated?: (data: string) => void;
  onOrderCreated?: (data: string) => void;
  onCancel?: () => void;
  onError?: (error: string) => void;
  onMerchantValidation?: (data: string) => void;
}

export function TapApplePay({
  configuration,
  style,
  onReady,
  onClick,
  onSuccess,
  onChargeCreated,
  onOrderCreated,
  onCancel,
  onError,
  onMerchantValidation,
}: Readonly<TapApplePayProps>): React.ReactElement | null {
  const inProgress = useRef(false);

  const handleReady = useCallback(() => {
    onReady?.();
  }, [onReady]);

  const handleClick = useCallback(
    (_event: { nativeEvent: object }) => {
      if (inProgress.current) return;
      inProgress.current = true;
      onClick?.();
    },
    [onClick]
  );

  const handleSuccess = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      inProgress.current = false;
      onSuccess?.(event.nativeEvent.data);
    },
    [onSuccess]
  );

  const handleChargeCreated = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      onChargeCreated?.(event.nativeEvent.data);
    },
    [onChargeCreated]
  );

  const handleOrderCreated = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      onOrderCreated?.(event.nativeEvent.data);
    },
    [onOrderCreated]
  );

  const handleCancel = useCallback(
    (_event: { nativeEvent: object }) => {
      inProgress.current = false;
      onCancel?.();
    },
    [onCancel]
  );

  const handleError = useCallback(
    (event: { nativeEvent: { error: string } }) => {
      inProgress.current = false;
      onError?.(event.nativeEvent.error);
    },
    [onError]
  );

  const handleMerchantValidation = useCallback(
    (event: { nativeEvent: { data: string } }) => {
      onMerchantValidation?.(event.nativeEvent.data);
    },
    [onMerchantValidation]
  );

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <NativeApplePayView
      style={[style, styles.minHeight]}
      configuration={JSON.stringify(configuration)}
      onApplePayReady={handleReady}
      onApplePayClick={handleClick}
      onApplePaySuccess={handleSuccess}
      onApplePayChargeCreated={handleChargeCreated}
      onApplePayOrderCreated={handleOrderCreated}
      onApplePayCancel={handleCancel}
      onApplePayError={handleError}
      onApplePayMerchantValidation={handleMerchantValidation}
    />
  );
}

const styles = StyleSheet.create({
  minHeight: { minHeight: 48 },
});
