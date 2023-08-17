import { Text, View, StyleSheet } from "react-native";
import Footer from "../components/Footer";
import AppBar from "../components/AppBar";
import DireccionesList from "../components/DireccionesList";
import { useState } from "react";

const ViajesView = ({navigation}) => {
    
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#1a1010",
            flex: 1
        }
    })

    return(
        
        <>
       <AppBar navigation={navigation} section={"NOTIFICACIONES"}/>
        <View style={styles.container}>
            <DireccionesList/>
        </View>
        <Footer navigation={navigation} />
        </>

    )
}

export default ViajesView