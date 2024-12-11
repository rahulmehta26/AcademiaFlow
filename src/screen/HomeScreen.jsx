import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import CustomText from "../components/CustomText";
import { PlusIcon, TrashIcon } from "react-native-heroicons/outline";
import { color } from "../constant/Colors";
import DetailCards from "../components/DetailCards";
import CheckBox from "../components/CheckBox";
import GlobalStyles from "../constant/GlobalStyles";
import ModalCard from "../components/ModalCard";
import Header from "../components/Header";
import { clearAndAddData, getStudentData, saveStudentData } from "../utils/asyncStorageHelpers";
import studentDetails from "../constant/studentData";

const HomeScreen = () => {
  const { width, height } = useWindowDimensions();
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const storedStudents = await getStudentData();
      setStudents(storedStudents || []);
    };
    fetchStudents();
  }, []);

  const handleSaveChanges = (updatedStudent) => {
    const updatedStudents = students.map((student) =>
      student.registrationNumber === updatedStudent.registrationNumber
        ? updatedStudent
        : student
    );
    setStudents(updatedStudents); 
    saveStudentData(updatedStudents);
  };
  
  console.log(students)

  const customCircle = {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width / 0.75,
    backgroundColor: color.lightBlack,
  };

  return (
    <CustomSafeAreaView>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />

      <View
        style={{
          flex: 1,
          rowGap: 22,
          position: "relative",
        }}
      >
        <Header />

        <View style={GlobalStyles.headerContainer}>
          <View>
            <CustomText variants="h4" customTextStyle={{ fontWeight: "900" }}>
              All Students
            </CustomText>
          </View>

          <View style={[GlobalStyles.subHeaderContainer, { columnGap: 16 }]}>
            {isChecked && (
              <CustomText
                variants="h7"
                customTextStyle={{ color: color.linkBlue, fontWeight: "900" }}
              >
                Invite
              </CustomText>
            )}

            <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />

            {isChecked && (
              <TouchableOpacity activeOpacity={0.5}
              onPress={() => {} }
              >
                <TrashIcon size={22} color={color.lightBlack} strokeWidth={2} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingBottom: 60,
            rowGap: 20,
          }}
        >
          {students?.map((info, index) => (
            <TouchableOpacity
              key={`${info.registrationNumber}-${info.firstName}`}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedStudent(info);
                setModalVisible(true);
              }}
            >
              <DetailCards items={info} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[customCircle, styles.addButton]}
          onPress={() => setModalVisible(true)}
        >
          <PlusIcon size={40} strokeWidth={2} color={"#fff"} />
        </TouchableOpacity>
      </View>

      <ModalCard
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        studentData={selectedStudent}
        onSaveChanges={handleSaveChanges}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 15,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
