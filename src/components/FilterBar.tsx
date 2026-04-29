import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Props {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar: React.FC<Props> = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { label: 'Todas', value: 'all' },
    { label: 'Pendentes', value: 'pendente' },
    { label: 'Em Andamento', value: 'em_andamento' },
    { label: 'Concluídas', value: 'concluida' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {filters.map((filter) => (
          <TouchableOpacity 
            key={filter.value}
            style={[
              styles.item, 
              selectedFilter === filter.value && styles.itemSelected
            ]}
            onPress={() => onFilterChange(filter.value)}
          >
            <Text style={[
              styles.text,
              selectedFilter === filter.value && styles.textSelected
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 10,
  },
  itemSelected: {
    backgroundColor: '#FF3B30',
  },
  text: {
    fontSize: 14,
    color: '#8E8E93',
  },
  textSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
