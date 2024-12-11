import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React from "react";
import BackButton from "./BackButton";
import GlobalStyles from "../constant/GlobalStyles";
import CustomText from "./CustomText";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { color } from "../constant/Colors";

const Header = () => {
  const { width, height } = useWindowDimensions();

  const profileIcon = {
    width: width * 0.0475,
    height: width * 0.0475,
  };

  return (
    <View style={GlobalStyles.headerContainer}>
      <View style={GlobalStyles.subHeaderContainer}>
        <BackButton />

        <View style={[GlobalStyles.subHeaderContainer, { columnGap: 3 }]}>
          <Image
            source={require("../assets/images/profile_header.png")}
            style={[styles.profileIcon, profileIcon]}
          />

          <CustomText variants="h6" customTextStyle={{ fontWeight: "700" }}>
            Student List
          </CustomText>
        </View>
      </View>

      <View style={GlobalStyles.subHeaderContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <MagnifyingGlassIcon
            size={22}
            color={color.lightBlack}
            strokeWidth={2}
          />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <FunnelIcon size={22} color={color.lightBlack} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    resizeMode: "cover",
  },
});

export default Header;
