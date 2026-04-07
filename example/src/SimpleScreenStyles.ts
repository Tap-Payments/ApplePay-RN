import { StyleSheet } from 'react-native';

// ─────────────────────────────────────────────────────────────────────────────
// Simple Screen Styles - Easy to copy to other projects
// ─────────────────────────────────────────────────────────────────────────────

export const simpleScreenStyles = StyleSheet.create({
  // Container
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Navigation Bar
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
  // Content
  mainContent: {
    padding: 16,
    gap: 16,
  },
  applePayButton: {
    width: '100%',
    height: 100,
  },
  infoText: {
    marginBottom: 16,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  configBox: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  configTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  configJSON: {
    fontFamily: 'Menlo',
    fontSize: 10,
    color: '#333',
    lineHeight: 14,
  },
  hintText: {
    marginTop: 16,
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
});
