import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
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
  navButton: {
    minWidth: 60,
  },
  navButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  navButtonApply: {
    fontWeight: '600',
    textAlign: 'right',
  },
  // Main
  mainContent: {
    padding: 16,
    gap: 16,
  },
  applePayButton: {
    width: '100%',
    height: 100,
  },
  eventsBox: {
    minHeight: 250,
    backgroundColor: '#f2f2f7',
    borderRadius: 8,
    padding: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#333',
  },
  reloadButton: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  reloadButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  // Settings
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  settingsLabel: {
    flex: 1,
    fontSize: 16,
  },
  settingsValue: {
    flex: 1,
    fontSize: 16,
    color: '#8e8e93',
    textAlign: 'right',
    marginRight: 8,
  },
  settingsChevron: {
    fontSize: 18,
    color: '#c7c7cc',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e5ea',
    marginLeft: 16,
  },
  checkmark: {
    fontSize: 18,
    color: '#007AFF',
  },
  // Success
  successContent: {
    padding: 16,
    flexGrow: 1,
  },
  resultText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 13,
    backgroundColor: '#f2f2f7',
    borderRadius: 8,
    padding: 12,
    color: '#333',
  },
  successFooter: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  copyButton: {
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#f2f2f7',
    borderRadius: 10,
  },
  copyButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
});
