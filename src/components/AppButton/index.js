import React from 'react'
import {TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView} from 'react-native'
import {Colors, Fonts, Responsive} from '../../config'

const AppButton = ({width='80%', text, onPress, height, disabled}) => {
    
    return (
        <TouchableOpacity style={[styles.buttonStyle, {width: width, backgroundColor: disabled ? Colors.DisabledColor : Colors.Secondary,height: height}]} onPress={onPress} disabled = {disabled}>
            <KeyboardAvoidingView>
            <Text style = {styles.textStyle}>{text}</Text>
            </KeyboardAvoidingView>
        </TouchableOpacity>
    )
}

export default AppButton;

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'center',
        borderRadius: Responsive.VerticalSize(50),
    },
    textStyle: {
        color: Colors.White,
        fontFamily: Fonts['Badaboom'],
        fontSize: Responsive.FontSmall,
        textAlign: 'center'
    }
})

