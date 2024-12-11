import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStudentData = async () => {
  try {
    const storedData = await AsyncStorage.getItem("studentData");
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null; 
  } catch (error) {
    console.error("Error fetching student data:", error);
    return null;
  }
};

export const saveStudentData = async (data) => {
  try {
    await AsyncStorage.setItem("studentData", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving student data:", error);
  }
};

export const clearAndAddData = async (newData) => {
  try {

    await AsyncStorage.clear();


    const formattedData = JSON.stringify(newData);
    await AsyncStorage.setItem('studentData', formattedData);

    console.log("Data cleared and new data added successfully.");
  } catch (error) {
    console.error("Error clearing and adding data:", error);
  }
};
