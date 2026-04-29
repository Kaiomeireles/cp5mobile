import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, Platform, ViewStyle } from 'react-native';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const CustomInput: React.FC<Props> = ({ label, error, containerStyle, style, ...rest }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[
        styles.inputContainer, 
        rest.multiline && styles.inputContainerMultiline,
        error ? styles.inputError : null,
      ]}>
        <TextInput 
          style={[
            styles.input, 
            rest.multiline && styles.inputMultiline,
            style
          ]}
          placeholderTextColor="#A0A0A0"
          {...rest}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 8,
    fontWeight: '600',
    marginLeft: 4,
  },
  inputContainer: {
    height: 56,
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E1E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputContainerMultiline: {
    height: 120, // Altura maior para descrições
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  input: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  inputMultiline: {
    height: '100%',
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF2F2',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
});
