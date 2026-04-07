import type { ViewProps } from 'react-native';
import { codegenNativeComponent } from 'react-native';
// @ts-ignore – no .d.ts for this path; codegen requires this exact import
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';

export interface NativeApplePayViewProps extends ViewProps {
  configuration: string;
  onApplePayReady?: DirectEventHandler<Readonly<{}>>;
  onApplePayClick?: DirectEventHandler<Readonly<{}>>;
  onApplePaySuccess?: DirectEventHandler<Readonly<{ data: string }>>;
  onApplePayChargeCreated?: DirectEventHandler<Readonly<{ data: string }>>;
  onApplePayOrderCreated?: DirectEventHandler<Readonly<{ data: string }>>;
  onApplePayCancel?: DirectEventHandler<Readonly<{}>>;
  onApplePayError?: DirectEventHandler<Readonly<{ error: string }>>;
  onApplePayMerchantValidation?: DirectEventHandler<Readonly<{ data: string }>>;
}

export default codegenNativeComponent<NativeApplePayViewProps>(
  'NativeApplePayView'
);
