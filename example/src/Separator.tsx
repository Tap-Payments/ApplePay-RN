import { View, StyleSheet } from 'react-native';
import type { FC } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e5ea',
    marginLeft: 16,
  },
});

export const Separator: FC = () => <View style={styles.separator} />;
