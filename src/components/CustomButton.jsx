import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { color } from "../constant/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { UserPlusIcon } from "react-native-heroicons/outline";

const CustomButton = ({ title, buttonText, buttonStyle, onPress, isIcon }) => {
  const { width, height } = useWindowDimensions();

  const buttonStyles = {
    width: buttonStyle?.width || width * 0.9,
    borderRadius: 10,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[buttonStyles, styles.container, buttonStyle]}
    >

      {
        isIcon &&

        <UserPlusIcon
        style={{ flex: 1 }}
        size={22}
        color={color.lightBlack}
        strokeWidth={2}
      />
      }

      <Text style={[buttonText, color, styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.darkGray,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  text: {
    fontWeight: "900",
    fontSize: RFValue(16),
    color: color.lightBlack,
  },
});

export default CustomButton;
