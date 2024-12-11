import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {ArrowLeftIcon as ArrowLeftIconOutline} from 'react-native-heroicons/outline'
import { color } from '../constant/Colors'

const BackButton = () => {
  return (
    <TouchableOpacity
    activeOpacity={0.5}
    >
      <ArrowLeftIconOutline size={22} strokeWidth={2} color={color.lightBlack} />
    </TouchableOpacity>
  )
}

export default BackButton