import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const CustomTextInput = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(20),
  },
  label: {
    fontSize: moderateScale(16),
    color: '#444',
    marginBottom: moderateScale(5),
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    fontSize: moderateScale(16),
    color: '#444',
  },
  error: {
    fontSize: moderateScale(14),
    color: 'red',
    marginTop: moderateScale(5),
  },
});

export default CustomTextInput;