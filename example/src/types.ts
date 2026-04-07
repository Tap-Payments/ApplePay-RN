import type { ApplePayConfiguration } from 'applepay-rn';

export type Screen = 'main' | 'simple' | 'settings' | 'success';

export type SettingRow = {
  key: string;
  label: string;
  getValue: (c: ApplePayConfiguration) => string;
  options?: string[];
  multiSelect?: boolean;
};
