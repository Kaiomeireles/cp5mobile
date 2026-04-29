import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  type?: 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
}

export const CustomButton: React.FC<Props> = ({ title, onPress, loading, type = 'primary', style }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'primary': return '#007AFF';
      case 'secondary': return '#5856D6';
      case 'danger': return '#FF3B30';
      default: return '#007AFF';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: getBackgroundColor() }, style]} 
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
