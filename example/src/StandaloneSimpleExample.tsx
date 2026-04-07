/*
 * Standalone TapApplePay Simple Example
 *
 * Complete, self-contained component. Copy and paste to your project.
 * Includes all configuration, styles, and logic.
 *
 * Usage:
 *   import { StandaloneSimpleExample } from './StandaloneSimpleExample';
 *   <StandaloneSimpleExample />
 */

import { useCallback, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TapApplePay, type ApplePayConfiguration } from 'applepay-rn';

// ─────────────────────────────────────────────────────────────────────────────
// Configuration - Complete ApplePay Configuration
// ─────────────────────────────────────────────────────────────────────────────

const EXAMPLE_CONFIG: ApplePayConfiguration = {
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
  },
  transaction: {
    amount: '20.0',
    currency: 'KWD',
  },
  features: {},
};

// ─────────────────────────────────────────────────────────────────────────────
// Styles - All styles defined locally
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  navTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  configBox: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  configJSON: {
    fontFamily: 'Menlo',
    fontSize: 9,
    color: '#333',
    lineHeight: 12,
  },
  applePayButton: {
    width: '100%',
    height: 100,
  },
  logBox: {
    minHeight: 120,
    padding: 12,
    backgroundColor: '#f2f2f7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e5ea',
  },
  logTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  logText: {
    fontFamily: 'Menlo',
    fontSize: 10,
    color: '#333',
    lineHeight: 14,
  },
  hintText: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearButton: {
    fontSize: 12,
    color: '#007AFF',
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function StandaloneSimpleExample() {
  // State for event logging
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = useCallback((message: string) => {
    setEvents((prev) => {
      const timestamp = `[${new Date().toLocaleTimeString()}]`;
      const updated = [`${timestamp} ${message}`, ...prev];
      return updated.length > 10 ? updated.slice(0, 10) : updated;
    });
  }, []);

  const clearLogs = useCallback(() => {
    setEvents([]);
  }, []);

  // Event handlers - All logged to console and to event list
  const handleReady = useCallback(() => {
    const msg = '✅ onReady';
    console.log(msg);
    addEvent(msg);
  }, [addEvent]);

  const handleClick = useCallback(() => {
    const msg = '👆 onClick';
    console.log(msg);
    addEvent(msg);
  }, [addEvent]);

  const handleSuccess = useCallback(
    (data: string) => {
      const msg = `🎉 onSuccess: ${data.substring(0, 50)}...`;
      console.log('🎉 onSuccess:', data);
      addEvent(msg);
    },
    [addEvent]
  );

  const handleChargeCreated = useCallback(
    (data: string) => {
      const msg = `💳 onChargeCreated: ${data}`;
      console.log(msg);
      addEvent(msg);
    },
    [addEvent]
  );

  const handleOrderCreated = useCallback(
    (data: string) => {
      const msg = `📋 onOrderCreated: ${data}`;
      console.log(msg);
      addEvent(msg);
    },
    [addEvent]
  );

  const handleCancel = useCallback(() => {
    const msg = '❌ onCancel';
    console.log(msg);
    addEvent(msg);
  }, [addEvent]);

  const handleError = useCallback(
    (err: any) => {
      const msg = `⚠️ onError: ${err?.message || 'Unknown error'}`;
      console.log('⚠️ onError:', err);
      addEvent(msg);
    },
    [addEvent]
  );

  const handleMerchantValidation = useCallback(
    (data: string) => {
      const msg = `🔐 onMerchantValidation: ${data.substring(0, 50)}...`;
      console.log('🔐 onMerchantValidation:', data);
      addEvent(msg);
    },
    [addEvent]
  );

  const configJSON = useMemo(() => JSON.stringify(EXAMPLE_CONFIG, null, 2), []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Simple Example</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.infoText}>
            This is a complete, standalone example. Copy this component to your
            project and it will work immediately. All configuration, styles, and
            event handlers are included.
          </Text>
        </View>

        {/* Configuration Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuration</Text>
          <View style={styles.configBox}>
            <Text style={styles.configJSON}>{configJSON}</Text>
          </View>
        </View>

        {/* Apple Pay Button */}
        <TapApplePay
          configuration={EXAMPLE_CONFIG}
          style={styles.applePayButton}
          onReady={handleReady}
          onClick={handleClick}
          onSuccess={handleSuccess}
          onChargeCreated={handleChargeCreated}
          onOrderCreated={handleOrderCreated}
          onCancel={handleCancel}
          onError={handleError}
          onMerchantValidation={handleMerchantValidation}
        />

        {/* Events Log Section */}
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Console Events</Text>
            <TouchableOpacity onPress={clearLogs}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logBox}>
            <Text style={styles.logText}>
              {events.length > 0
                ? events.join('\n')
                : 'Events will appear here...\nCheck console for logs'}
            </Text>
          </View>
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use</Text>
          <Text style={styles.hintText}>
            {`1. Open Xcode console or React Native Debugger
2. Tap the Apple Pay button
3. Watch console for event logs
4. Check the configuration above for current settings`}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
