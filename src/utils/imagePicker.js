import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickStudentImage = async (options = {}) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "You need to allow access to the photo library to change the student's profile picture."
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    ...options
  });

  return !result.canceled ? result.assets[0].uri : null;
};

export const pickFamilyMemberImage = async (options = {}) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "You need to allow access to the photo library to change the family member's profile picture."
    );
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    ...options 
  });

  return !result.canceled ? result.assets[0].uri : null;
};