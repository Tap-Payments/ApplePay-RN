import { useCallback, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './styles';
import { Separator } from './Separator';

interface MultiSelectScreenProps {
  title: string;
  options: string[];
  selected: string[];
  onDone: (values: string[]) => void;
  onBack: () => void;
}

export function MultiSelectScreen({
  title,
  options,
  selected,
  onDone,
  onBack,
}: MultiSelectScreenProps) {
  const [current, setCurrent] = useState<string[]>(selected);

  const toggle = useCallback((option: string) => {
    setCurrent((prev) =>
      prev.includes(option)
        ? prev.filter((v) => v !== option)
        : [...prev, option]
    );
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onBack} style={styles.navButton}>
          <Text style={styles.navButtonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>{title}</Text>
        <TouchableOpacity
          onPress={() => onDone(current)}
          style={styles.navButton}
        >
          <Text style={[styles.navButtonText, styles.navButtonApply]}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => toggle(item)}
          >
            <Text style={styles.settingsLabel}>{item}</Text>
            {current.includes(item) && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={Separator}
      />
    </SafeAreaView>
  );
}
