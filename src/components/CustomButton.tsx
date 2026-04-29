import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, Platform } from 'react-native';

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
      case 'primary': return '#FF3B30'; // Nexus Red
      case 'secondary': return '#E53935'; // Darker Red
      case 'danger': return '#B71C1C'; // Deep Red
      default: return '#FF3B30';
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      style={[
        styles.button, 
        { backgroundColor: getBackgroundColor() },
        styles.shadow,
        style
      ]} 
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
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#FF3B30',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
