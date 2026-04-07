import type { ApplePayConfiguration } from 'applepay-rn';
import type { SettingRow } from './types';

export const DEFAULT_CONFIG: ApplePayConfiguration = {
  scope: 'AppleToken',
  publicKey: 'pk_test_Vlk842B1EA7tDN5QbrfGjYzh',
  merchant: { id: '1124340' },
  interface: { locale: 'en', theme: 'dark', edges: 'curved', type: 'buy' },
  customer: {
    name: [{ lang: 'en', first: 'John', last: 'Smith', middle: 'David' }],
    contact: {
      email: 'john.smith@example.com',
      phone: { countryCode: '+1', number: '5551234567' },
    },
  },
  acceptance: {
    supportedBrands: ['visa', 'masterCard'],
    supportedCards: ['debit'],
    supportedRegions: ['LOCAL', 'REGIONAL', 'GLOBAL'],
    supportedCountries: ['AE', 'KW', 'SA', 'QA', 'BH', 'OM', 'EG', 'JO', 'LB'],
  },
  transaction: {
    amount: '20.0',
    currency: 'KWD',
  },
  features: {},
};

export const SETTING_ROWS: SettingRow[] = [
  {
    key: 'publicKey',
    label: 'Public Key',
    getValue: (c) => c.publicKey,
  },
  {
    key: 'merchantId',
    label: 'Merchant ID',
    getValue: (c) => c.merchant?.id ?? '',
  },
  {
    key: 'amount',
    label: 'Amount',
    getValue: (c) => String(c.transaction?.amount ?? ''),
  },
  {
    key: 'currency',
    label: 'Currency',
    getValue: (c) => c.transaction?.currency ?? '',
  },
  {
    key: 'customerEmail',
    label: 'Customer Email',
    getValue: (c) => c.customer?.contact?.email ?? '',
  },
  {
    key: 'locale',
    label: 'Locale',
    getValue: (c) => c.interface?.locale ?? 'en',
    options: ['en', 'ar'],
  },
  {
    key: 'theme',
    label: 'Theme',
    getValue: (c) => c.interface?.theme ?? 'dark',
    options: ['dark', 'light'],
  },
  {
    key: 'edges',
    label: 'Edges',
    getValue: (c) => c.interface?.edges ?? 'curved',
    options: ['curved', 'straight'],
  },
  {
    key: 'type',
    label: 'Button Type',
    getValue: (c) => c.interface?.type ?? 'buy',
    options: ['book', 'buy', 'check-out', 'pay', 'plain', 'subscribe'],
  },
  {
    key: 'scope',
    label: 'Scope',
    getValue: (c) => c.scope,
    options: ['AppleToken', 'TapToken'],
  },
  {
    key: 'supportedBrands',
    label: 'Supported Brands',
    getValue: (c) => (c.acceptance?.supportedBrands ?? []).join(', '),
    options: [
      'amex',
      'mada',
      'masterCard',
      'visa',
      'chinaUnionPay',
      'discover',
      'electron',
      'jcb',
      'maestro',
    ],
    multiSelect: true,
  },
  {
    key: 'supportedCards',
    label: 'Supported Cards',
    getValue: (c) => (c.acceptance?.supportedCards ?? []).join(', '),
    options: ['credit', 'debit'],
    multiSelect: true,
  },
  {
    key: 'supportedRegions',
    label: 'Supported Regions',
    getValue: (c) => (c.acceptance?.supportedRegions ?? []).join(', '),
    options: ['LOCAL', 'REGIONAL', 'GLOBAL'],
    multiSelect: true,
  },
];
