import { View, Text, StyleSheet } from "react-native";
import React from "react";

const GlobalStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 18,
  },
});

export default GlobalStyles;
