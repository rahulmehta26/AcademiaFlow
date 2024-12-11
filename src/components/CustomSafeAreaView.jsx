import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native'
import React from 'react'

const CustomSafeAreaView = ({children, customStyle}) => {

  const {width} = useWindowDimensions();

  const customWidth = {
    width: width
  }

  return (
    <SafeAreaView
    style = {[customStyle, styles.container, customWidth]}
    >
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        marginTop:17,
        paddingHorizontal:17
    }
})

export default CustomSafeAreaView