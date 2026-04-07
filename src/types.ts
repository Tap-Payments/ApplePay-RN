export interface ApplePayPhone {
  countryCode: string;
  number: string;
}

export interface ApplePayContact {
  email?: string;
  phone?: ApplePayPhone;
}

export interface ApplePayName {
  lang: string;
  first: string;
  last: string;
  middle?: string;
}

export interface ApplePayCustomer {
  id?: string;
  name?: ApplePayName[];
  contact?: ApplePayContact;
}

export interface ApplePayMerchant {
  id?: string;
  identifier?: string;
}

export interface ApplePayInterface {
  locale?: 'en' | 'ar';
  theme?: 'dark' | 'light';
  edges?: 'curved' | 'straight';
  type?: 'book' | 'buy' | 'check-out' | 'pay' | 'plain' | 'subscribe';
}

export interface ApplePayShippingMethod {
  label: string;
  detail: string;
  amount: string;
  identifier: string;
}

export interface ApplePayItem {
  type?: 'final' | 'pending';
  label: string;
  amount: string;
  paymentTiming?: 'immediate' | 'recurring' | 'deferred' | 'automaticReload';
}

export interface ApplePayTransaction {
  amount: string;
  currency: string;
  couponCode?: string;
  shipping?: ApplePayShippingMethod[];
  items?: ApplePayItem[];
}

export interface ApplePayAcceptance {
  supportedBrands?: (
    | 'amex'
    | 'mada'
    | 'masterCard'
    | 'visa'
    | 'chinaUnionPay'
    | 'discover'
    | 'electron'
    | 'jcb'
    | 'maestro'
  )[];
  supportedCards?: ('credit' | 'debit')[];
  supportedRegions?: ('LOCAL' | 'REGIONAL' | 'GLOBAL')[];
  supportedCountries?: string[];
}

export interface ApplePayFeatures {
  supportsCouponCode?: boolean;
  shippingContactFields?: ('name' | 'phone' | 'email')[];
}

export interface ApplePayConfiguration {
  /** Tap Payments public key */
  publicKey: string;
  /** Type of token to generate */
  scope: 'AppleToken' | 'TapToken';
  merchant: ApplePayMerchant;
  customer: ApplePayCustomer;
  interface?: ApplePayInterface;
  acceptance?: ApplePayAcceptance;
  transaction?: ApplePayTransaction;
  features?: ApplePayFeatures;
}
