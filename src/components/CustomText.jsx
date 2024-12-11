import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { color } from "../constant/Colors";

const CustomText = ({ children, variants = "h6", customTextStyle }) => {
  const fontSizes = {
    h1: 28,
    h2: 24,
    h3: 22,
    h4: 20,
    h5: 18,
    h6: 16,
    h7: 14,
    h8: 12,
  };

  return <Text style={[customTextStyle, {
    fontSize: RFValue(fontSizes[variants]) || RFValue(16),
    color: customTextStyle?.color || color.black,
    flexShrink: 1,
    numberOfLines:1
  }]}>{children}</Text>;
};

const styles = StyleSheet.create({
});

export default CustomText;
