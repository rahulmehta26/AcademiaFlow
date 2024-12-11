import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { color } from "../constant/Colors";
import CustomText from "./CustomText";

const CustomInput = ({ label, placeholder, value, onChangeText, keyboardType = "default" }) => {
  return (
    <KeyboardAvoidingView
      style={{
        rowGap: 10,
      }}
    >
      <CustomText
        variants="h6"
        customTextStyle={{
          fontWeight: "900",
          color: color.lightBlack,
        }}
      >
        {label}
      </CustomText>
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={{
            width: "100%",
            fontWeight: "900",
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderWidth: 0.5,
    borderColor: color.lightGray,
    borderRadius: 10,
  },
});

export default CustomInput;
