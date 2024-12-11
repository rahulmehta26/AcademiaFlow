import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerExample = () => {
  const [date, setDate] = useState(new Date()); // Initial state for the current date
  const [show, setShow] = useState(false); // To control when to show the picker

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    
    // Format the date to DD/MM/YYYY
    const formattedDate = formatDate(currentDate);
    setDate(formattedDate);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>Selected Date: {date}</Text>

      <Button title="Select Date" onPress={() => setShow(true)} />

      {show && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default DatePickerExample;
