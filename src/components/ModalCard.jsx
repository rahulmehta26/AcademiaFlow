import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "./CustomText";
import { PlusIcon, TrashIcon, XMarkIcon } from "react-native-heroicons/outline";
import { color } from "../constant/Colors";
import GlobalStyles from "../constant/GlobalStyles";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { isValidEmail, isValidPhoneNumber } from "../utils/validation";
import { pickFamilyMemberImage, pickStudentImage } from "../utils/imagePicker";
import { calculateAge } from "../utils/ageCalculator";

const ModalCard = ({
  modalVisible,
  setModalVisible,
  studentData,
  onSaveChanges,
}) => {
  const { width, height } = useWindowDimensions();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parentPhoneNumber, setParentPhoneNumber] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [parentProfileImage, setParentProfileImage] = useState(null);

  const [tempData, setTempData] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  console.log(studentData?.parentDetails);

  const saveDetails = () => {
    const newTempData = {
      parentEmail,
      parentPhoneNumber,
      parentFirstName,
      parentLastName,
      parentProfileImage,
    };

    setTempData((prevTempData) => [...prevTempData, newTempData]);

    setParentEmail("");
    setParentPhoneNumber("");
    setParentFirstName("");
    setParentLastName("");
    setParentProfileImage("");
  };

  const mergedData = [
    ...(Array.isArray(studentData?.parentDetails)
      ? studentData?.parentDetails
      : []),
    ...(Array.isArray(tempData) ? tempData : []),
  ];

  useEffect(() => {
    if (studentData) {
      setFirstName(studentData.firstName);
      setLastName(studentData.lastName);
      setPhoneNumber(studentData.mobileNumber);
      setEmailAddress(studentData.email);
      setProfileImage(studentData.profilePicture);

      if (studentData.parentDetails) {
        setParentEmail(studentData.parentDetails.emailAddress);
        setParentPhoneNumber(studentData.parentDetails.phoneNumber);
        setParentFirstName(studentData.parentDetails.firstName);
        setParentLastName(studentData.parentDetails.lastName);
        setParentProfileImage(studentData.parentDetails.profilePicture);
      }
    }

    if (studentData?.parentDetails?.firstName !== "") {
      return setIsAdded(true);
    }
  }, [studentData]);

  const handleSave = () => {
    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (parentEmail && !isValidEmail(parentEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const newParent = {
      firstName: parentFirstName,
      lastName: parentLastName,
      phoneNumber: parentPhoneNumber,
      emailAddress: parentEmail,
      profilePicture: parentProfileImage,
    };

    const updatedParent = [
      ...tempData,
      ...studentData.parentDetails,
      newParent,
    ];

    const updatedStudent = {
      ...studentData,
      firstName,
      lastName,
      mobileNumber: phoneNumber,
      email: emailAddress,
      age,
      profilePicture: profileImage,
      parentDetails: updatedParent,
    };
    onSaveChanges(updatedStudent);

    setTempData([]);

    setModalVisible(false);
  };

  const customCircle = {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width / 0.0325,
  };

  const customImageStyle = {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width / 0.1,
  };

  const imageStyle = {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
  };

  const handleDateChange = (text) => {
    setBirthDate(text);

    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (regex.test(text)) {
      const calculatedAge = calculateAge(text);
      setAge(calculatedAge);
    } else {
      setAge("");
    }
  };

  const studentProfilePicture = async () => {

    const imgUri = await pickStudentImage();

    if(imgUri){
      setProfileImage(imgUri);
    }
  }

  const parentProfilePicture = async () => {

    const imgUri = await pickFamilyMemberImage();

    if(imgUri){
      setParentProfileImage(imgUri);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginVertical: 20,
            width: "100%",
          }}
        >
          <View style={styles.modalView}>
            <View style={GlobalStyles.headerContainer}>
              <CustomText
                variants="h6"
                customTextStyle={{
                  fontWeight: "900",
                }}
              >
                Edit School Details
              </CustomText>

              <TouchableOpacity
                style={[customCircle, styles.iconContainer]}
                activeOpacity={0.8}
                onPress={() => setModalVisible(false)}
              >
                <XMarkIcon size={14} strokeWidth={4} color={color.red} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: "relative",
              }}
            >
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : { uri: studentData?.profilePicture }
                }
                style={customImageStyle}
              />

              <TouchableOpacity
                onPress={studentProfilePicture}
                style={[
                  customCircle,
                  styles.iconContainer,
                  {
                    borderColor: color.black,
                    borderWidth: 2,
                    position: "absolute",
                    bottom: 0,
                    left: "16%",
                  },
                ]}
                activeOpacity={0.5}
              >
                <PlusIcon size={14} strokeWidth={4} color={color.black} />
              </TouchableOpacity>
            </View>

            <CustomInput
              label="First Name"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />

            <CustomInput
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />

            <CustomInput
              label="Phone Number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <CustomInput
              label="Email"
              placeholder="Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              keyboardType="email-address"
            />

            <CustomInput
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={birthDate ? birthDate?.split("-").reverse().join("/") : ""}
              onChangeText={handleDateChange}
            />

            <CustomInput label="Select Class" placeholder="Select Class" />

            <View style={styles.thinLine}></View>

            <View style={{ rowGap: 18 }}>
              <CustomText
                variants="h6"
                customTextStyle={{
                  fontWeight: "900",
                }}
              >
                Family Members
              </CustomText>

              {mergedData &&
                mergedData?.map((item, index) => (
                  <>
                    <View key={index} style={GlobalStyles.subHeaderContainer}>
                      <View
                        style={[
                          GlobalStyles.subHeaderContainer,
                          { columnGap: 5, flex: 1 },
                        ]}
                      >
                        <Image
                          source={{ uri: item?.parentProfileImage }}
                          style={[{ resizeMode: "cover" }, imageStyle]}
                        />

                        <View>
                          <CustomText
                            variants="h7"
                            customTextStyle={{
                              fontWeight: "900",
                              color: color.lightBlack,
                            }}
                          >
                            {item.parentFirstName || item.firstName}{" "}
                            {item.parentLastName || item.lirstName}
                          </CustomText>

                          <CustomText
                            variants="h7"
                            customTextStyle={{
                              fontWeight: "700",
                              color: color.lightGray,
                            }}
                          >
                            {item.parentEmail || item.emailAddress}
                          </CustomText>
                        </View>
                      </View>

                      <TouchableOpacity activeOpacity={0.5}>
                        <TrashIcon
                          style={{ flex: 1 }}
                          size={22}
                          color={color.lightBlack}
                          strokeWidth={2}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                ))}

              {!isAdded && (
                <>
                  <View
                    style={{
                      position: "relative",
                    }}
                  >
                    <Image
                      source={require("../assets/images/profile.jpg")}
                      style={customImageStyle}
                    />

                    <TouchableOpacity
                      onPress={parentProfilePicture}
                      style={[
                        customCircle,
                        styles.iconContainer,
                        {
                          borderColor: color.black,
                          borderWidth: 2,
                          position: "absolute",
                          bottom: 0,
                          left: "16%",
                        },
                      ]}
                      activeOpacity={0.5}
                    >
                      <PlusIcon size={14} strokeWidth={4} color={color.black} />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={[GlobalStyles.headerContainer, { columnGap: 5 }]}
                  >
                    <View style={{ flex: 1 }}>
                      <CustomInput
                        label=" First Name"
                        placeholder="First Name"
                        value={parentFirstName}
                        onChangeText={setParentFirstName}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <CustomInput
                        label="Last Name"
                        placeholder="Last Name"
                        value={parentLastName}
                        onChangeText={setParentLastName}
                      />
                    </View>
                  </View>

                  <CustomInput
                    label="Phone Number"
                    placeholder="Phone Number"
                    value={parentPhoneNumber}
                    onChangeText={setParentPhoneNumber}
                    keyboardType="phone-pad"
                  />

                  <CustomInput
                    label="Email Address"
                    placeholder="Email Address"
                    value={parentEmail}
                    onChangeText={setParentEmail}
                    keyboardType="email-address"
                  />
                </>
              )}

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {!isAdded ? (
                  <View
                    style={{
                      alignItems: "flex-end",
                      flex: 1,
                    }}
                  >
                    <CustomButton
                      title="Save Details"
                      onPress={() => {
                        saveDetails();
                        setIsAdded(true);
                      }}
                      buttonStyle={{
                        width: "50%",
                        padding: 12,
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    <CustomButton
                      onPress={() => setIsAdded(false)}
                      isIcon={true}
                      title="Add More"
                      buttonStyle={{
                        width: "50%",
                        padding: 12,
                        flexDirection: "row",
                        columnGap: 10,
                      }}
                    />
                  </View>
                )}
              </View>

              <View style={[GlobalStyles.headerContainer, { columnGap: 5 }]}>
                <CustomButton
                  onPress={() => setModalVisible(false)}
                  title="Cancel"
                  buttonStyle={{
                    width: "40%",
                  }}
                />

                <CustomButton
                  title="Save Changes"
                  onPress={handleSave}
                  buttonStyle={{
                    width: "55%",
                    backgroundColor: color.lightBlack,
                    color: "#fff",
                  }}
                  buttonText={{
                    color: "#fff",
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    rowGap: 18,
    marginBottom: 30,
  },

  iconContainer: {
    borderColor: color.red,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  thinLine: {
    borderBottomColor: color.gray,
    borderBottomWidth: 1.5,
  },
});

export default ModalCard;
