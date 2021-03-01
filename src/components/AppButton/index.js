import React from 'react'
import {TouchableOpacity, Text, StyleSheet, ImageBackground} from 'react-native'
import {Colors, Fonts} from '../../config'

const AppButton = ({width='80%', text, onPress, disabled = true, height}) => {
    return (
        <TouchableOpacity style={[styles.buttonStyle, {width: width, backgroundColor: disabled ? Colors.DisabledColor : Colors.Secondary,height: height}]} onPress={onPress} disabled = {disabled}>
            <Text style = {styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

export default AppButton;

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'center',
        borderRadius: 50,
    },
    textStyle: {
        color: Colors.White,
        fontFamily: Fonts['Badaboom'],
        fontSize: 25,
        textAlign: 'center'
    }
})

