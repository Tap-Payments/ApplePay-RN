import { useState, useCallback } from 'react';
import type { ApplePayConfiguration } from 'applepay-rn';
import { MainScreen } from './MainScreen';
import { SimpleScreen } from './SimpleScreen';
import { SuccessScreen } from './SuccessScreen';
import { SettingsScreen } from './SettingsScreen';
import { DEFAULT_CONFIG } from './constants';
import { prettyJSON } from './helpers';
import type { Screen } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('main');
  const [config, setConfig] = useState<ApplePayConfiguration>(DEFAULT_CONFIG);
  const [successResult, setSuccessResult] = useState('');

  const handleSuccess = useCallback((data: string) => {
    setSuccessResult(prettyJSON(data));
    setScreen('success');
  }, []);

  if (screen === 'simple') {
    return (
      <SimpleScreen
        config={config}
        onSuccess={handleSuccess}
        onBack={() => setScreen('main')}
      />
    );
  }

  if (screen === 'settings') {
    return (
      <SettingsScreen
        config={config}
        onApply={(updated) => {
          setConfig(updated);
          setScreen('main');
        }}
        onBack={() => setScreen('main')}
      />
    );
  }

  if (screen === 'success') {
    return (
      <SuccessScreen result={successResult} onBack={() => setScreen('main')} />
    );
  }

  return (
    <MainScreen
      config={config}
      onSuccess={handleSuccess}
      onOpenSettings={() => setScreen('settings')}
      onOpenSimple={() => setScreen('simple')}
    />
  );
}
