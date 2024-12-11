import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import CustomText from "./CustomText";
import { color } from "../constant/Colors";
import CheckBox from "./CheckBox";
import GlobalStyles from "../constant/GlobalStyles";

const DetailCards = ({ items }) => {
  const { width, height } = useWindowDimensions();
  const [isChecked, setIsChecked] = useState(false);

  const cardStyle = {
    width: width,
  };

  const imageStyle = {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
  };

  const FamilyImageStyle = {
    width: width * 0.075,
    height: width * 0.075,
    borderRadius: width * 0.04,
  };

  return (
    <View style={[styles.container]}>
      <View style={GlobalStyles.headerContainer}>
        <View style={[GlobalStyles.subHeaderContainer, { columnGap: 5 }]}>
          <Image
            source={{ uri: items?.profilePicture }}
            style={[{ resizeMode: "cover" }, imageStyle]}
          />
          <CustomText
            variants="h6"
            customTextStyle={{ fontWeight: "900", color: color.lightBlack }}
          >
            {items?.firstName} {''} {items?.lastName} 
          </CustomText>
        </View>

        <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
      </View>

      {items?.registrationNumber || items?.age ? (
        <View style={GlobalStyles.headerContainer}>
          {items?.registrationNumber && (
            <View>
              <CustomText
                variants="h7"
                customTextStyle={{
                  color: color.darkGray,
                  fontWeight: "400",
                }}
              >
                Registration Number
              </CustomText>

              <CustomText
                variants="h7"
                customTextStyle={{
                  fontWeight: "900",
                }}
              >
                {items?.registrationNumber}
              </CustomText>
            </View>
          )}

          {items?.age && (
            <View>
              <CustomText
                variants="h7"
                customTextStyle={{
                  color: color.darkGray,
                  fontWeight: "400",
                }}
              >
                Age
              </CustomText>

              <CustomText
                variants="h7"
                customTextStyle={{
                  fontWeight: "900",
                }}
              >
                {items?.age}
              </CustomText>
            </View>
          )}

          <View>
            <CustomText
              variants="h7"
              customTextStyle={{
                color: color.darkGray,
                fontWeight: "400",
              }}
            >
              Classes
            </CustomText>

            <CustomText
              variants="h7"
              customTextStyle={{
                fontWeight: "900",
              }}
            >
              {items?.class}
            </CustomText>
          </View>
        </View>
      ) : (
        <View style={GlobalStyles.headerContainer}>
          <CustomText
            variants="h7"
            customTextStyle={{
              color: color.darkGray,
              fontWeight: "400",
            }}
          >
            Classes
          </CustomText>

          <CustomText
            variants="h7"
            customTextStyle={{
              fontWeight: "900",
            }}
          >
            {items?.class}
          </CustomText>
        </View>
      )}

      {items?.parentDetails && items?.parentDetails?.firstName && (
        <View
          style={{
            rowGap: 8,
          }}
        >
          <CustomText
            variants="h7"
            customTextStyle={{
              color: color.darkGray,
              fontWeight: "400",
            }}
          >
            Family Members
          </CustomText>

          <View
            style={[
              GlobalStyles.headerContainer,
              { justifyContent: "flex-start", columnGap: 8 },
            ]}
          >
            <Image
              source={require("../assets/images/profile.jpg")}
              style={[{ resizeMode: "cover" }, FamilyImageStyle]}
            />

            <Image
              source={require("../assets/images/profile.jpg")}
              style={[{ resizeMode: "cover" }, FamilyImageStyle]}
            />

            <Image
              source={require("../assets/images/profile.jpg")}
              style={[{ resizeMode: "cover" }, FamilyImageStyle]}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.thinGray,
    borderRadius: 4,
    padding: 12,
    paddingVertical: 18,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    rowGap: 20,
  },
});

export default DetailCards;
