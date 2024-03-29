import { View, StyleSheet } from 'react-native'
import ButtonChangeState from '../components/ButtonChangeState'
import AppBar from '../components/AppBar'
import Footer from '../components/Footer'
import React, { useEffect } from 'react';


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1010",
        // paddingTop: 20,
        flex: 1
    }
})

const MainView = ({navigation}) => {
    // useEffect(()=> {
    //     navigation.addListener("beforeRemove", (e) => {
    //         e.preventDefault()
    //     })
    // }, [])
    return (
        <>
            <AppBar navigation={navigation} section={"ESTADO"}/>
            <View style={styles.container}>
                <ButtonChangeState />
            </View>
            <Footer navigation={navigation}/>
        </>
    )
}
export default MainView