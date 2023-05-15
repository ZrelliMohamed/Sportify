import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = props => {
  return (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={props.onPress}
      activeOpacity={0.6}
    >
      <Ionicons name={props.iconName} size={23} color="white" />
    </TouchableOpacity>
  );
};

export default CustomHeaderButton;