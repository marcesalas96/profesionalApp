import { Link, useLocation } from "react-router-native"
import { View, Text, TouchableHighlightComponent } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { TouchableNativeFeedback } from "react-native"

const FooterTab = ({ children, to, icon, styles, navigation }) => {

    // const {pathname} = useLocation()
    // const active = pathname === to
    const textStyles = [
        styles.text,
        // active && styles.active
    ]
    const logoStyles = [
        styles.logo,
        // active && styles.active
    ]
    return (
        // <Link to={to} >
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
        // </Link>
    )
}

export default FooterTab