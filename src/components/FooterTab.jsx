import { View, Text } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableNativeFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native"

const FooterTab = ({ children, to, icon, styles }) => {

    const navigation = useNavigation()
    const textStyles = [
        styles.text,
    ]
    const logoStyles = [
        styles.logo,
    ]
    return (
        <TouchableNativeFeedback onPress={() => { navigation.navigate(to) }}>
            <View style={styles.footerContainer} >
                <FontAwesomeIcon icon={icon} size={20} style={logoStyles} />
                <Text
                    style={textStyles}
                >
                    {children}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default FooterTab