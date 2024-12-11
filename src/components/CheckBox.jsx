import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { CheckIcon } from 'react-native-heroicons/outline'
import { color } from '../constant/Colors';

const CheckBox = ({isChecked, setIsChecked}) => {

    const { width, height } = useWindowDimensions();

    const checkBox = {
        width: width * 0.05,
        height: width * 0.05,
      };

  return (

    <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => setIsChecked((prev) => !prev)}
    style={[
      styles.checkBox,
      checkBox,
      {
        backgroundColor: isChecked ? color.lightBlack : null,
        borderColor: isChecked ? color.lightBlack : color.lightGray,
      },
    ]}
  >
    {isChecked && (
      <CheckIcon size={14} color={"#fff"} strokeWidth={4} />
    )}
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    checkBox: {
        borderWidth: 2,
        borderRadius: 4,
      },
})

export default CheckBox