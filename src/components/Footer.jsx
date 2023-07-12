import { faToggleOn, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { View, StyleSheet, Text } from 'react-native'
import FooterTab from './FooterTab'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#20232a",
        padding: 15,
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    text: {
        color: "#fafafa",
        fontSize: 15
    },
    footerContainer: {
        justifyContent: "flex-end"

    },
    logo: {
        alignSelf: "center",
        color: "#ffffff"
    },
    active: {
        color: "#0d6efd",
    }

})

const Footer = ({navigation}) => {
    return (
        <View style={styles.container}>
            <FooterTab to={"home"} icon={faToggleOn} styles={styles} navigation={navigation}>Estado</FooterTab>
            <FooterTab to={"viajes"} icon={faCommentDots} styles={styles} navigation={navigation}>Notificaciones</FooterTab>
        </View>
    )
}

export default Footer