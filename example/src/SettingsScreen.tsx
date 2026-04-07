import { useCallback, useState } from 'react';
import {
  ActionSheetIOS,
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ApplePayConfiguration } from 'applepay-rn';
import { styles } from './styles';
import { Separator } from './Separator';
import { SETTING_ROWS } from './constants';
import { MultiSelectScreen } from './MultiSelectScreen';
import type { SettingRow } from './types';

interface SettingsScreenProps {
  config: ApplePayConfiguration;
  onApply: (config: ApplePayConfiguration) => void;
  onBack: () => void;
}

export function SettingsScreen({
  config,
  onApply,
  onBack,
}: SettingsScreenProps) {
  const [draft, setDraft] = useState<ApplePayConfiguration>(config);
  const [multiSelectRow, setMultiSelectRow] = useState<SettingRow | null>(null);

  const apply = useCallback(() => onApply(draft), [draft, onApply]);

  const handleRowPress = useCallback(
    (row: SettingRow) => {
      if (row.multiSelect) {
        setMultiSelectRow(row);
        return;
      }
      if (row.options) {
        const options = row.options;
        const key = row.key;
        if (Platform.OS === 'ios') {
          ActionSheetIOS.showActionSheetWithOptions(
            {
              options: [...options, 'Cancel'],
              cancelButtonIndex: options.length,
            },
            (i) => {
              if (i != null && i < options.length) {
                const selectedOption = options[i];
                if (selectedOption) applyValue(key, selectedOption);
              }
            }
          );
        } else {
          Alert.alert(
            row.label,
            undefined,
            options.map((opt) => ({
              text: opt,
              onPress: () => applyValue(key, opt),
            }))
          );
        }
        return;
      }
      Alert.prompt(
        row.label,
        undefined,
        (text) => applyValue(row.key, text ?? row.getValue(draft)),
        'plain-text',
        row.getValue(draft)
      );
    },
    [draft] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const applyValue = useCallback((key: string, value: string) => {
    setDraft((prev) => {
      const next = { ...prev };
      switch (key) {
        case 'publicKey':
          next.publicKey = value;
          break;
        case 'merchantId':
          next.merchant = { ...next.merchant, id: value };
          break;
        case 'amount':
          next.transaction = {
            ...next.transaction,
            amount: value,
            currency: next.transaction?.currency || 'KWD',
          };
          break;
        case 'currency':
          next.transaction = {
            ...next.transaction,
            currency: value,
            amount: next.transaction?.amount || '20.0',
          };
          break;
        case 'customerEmail':
          next.customer = {
            ...next.customer,
            contact: { ...next.customer?.contact, email: value },
          };
          break;
        case 'locale':
          next.interface = { ...next.interface, locale: value as 'en' | 'ar' };
          break;
        case 'theme':
          next.interface = {
            ...next.interface,
            theme: value as 'dark' | 'light',
          };
          break;
        case 'edges':
          next.interface = {
            ...next.interface,
            edges: value as 'curved' | 'straight',
          };
          break;
        case 'type':
          next.interface = {
            ...next.interface,
            type: value as NonNullable<
              ApplePayConfiguration['interface']
            >['type'],
          };
          break;
        case 'scope':
          next.scope = value as 'AppleToken' | 'TapToken';
          break;
      }
      return next;
    });
  }, []);

  const applyMultiSelect = useCallback((key: string, values: string[]) => {
    setDraft((prev) => {
      const next = { ...prev };
      const acceptance = next.acceptance || {};
      switch (key) {
        case 'supportedBrands':
          next.acceptance = {
            ...acceptance,
            supportedBrands: values as any,
          };
          break;
        case 'supportedCards':
          next.acceptance = {
            ...acceptance,
            supportedCards: values as ('credit' | 'debit')[],
          };
          break;
        case 'supportedRegions':
          next.acceptance = {
            ...acceptance,
            supportedRegions: values as ('LOCAL' | 'REGIONAL' | 'GLOBAL')[],
          };
          break;
      }
      return next;
    });
    setMultiSelectRow(null);
  }, []);

  if (multiSelectRow) {
    const current = multiSelectRow.getValue(draft).split(', ').filter(Boolean);
    return (
      <MultiSelectScreen
        title={multiSelectRow.label}
        options={multiSelectRow.options ?? []}
        selected={current}
        onDone={(values) => applyMultiSelect(multiSelectRow.key, values)}
        onBack={() => setMultiSelectRow(null)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onBack} style={styles.navButton}>
          <Text style={styles.navButtonText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Settings</Text>
        <TouchableOpacity onPress={apply} style={styles.navButton}>
          <Text style={[styles.navButtonText, styles.navButtonApply]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={SETTING_ROWS}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => handleRowPress(item)}
          >
            <Text style={styles.settingsLabel}>{item.label}</Text>
            <Text style={styles.settingsValue} numberOfLines={1}>
              {item.getValue(draft)}
            </Text>
            <Text style={styles.settingsChevron}>›</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
}
