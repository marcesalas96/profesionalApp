import { Link, useLocation } from "react-router-native"
import { View, Text } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

const FooterTab = ({ children, to, icon, styles }) => {

    const {pathname} = useLocation()
    const active = pathname === to
        const textStyles = [
            styles.text,
            active && styles.active
        ]
        const logoStyles = [
            styles.logo,
            active && styles.active
        ]
    return (
        <Link to={to} >
            <View style={styles.footerContainer}>
                <FontAwesomeIcon icon={icon} size={20} style={logoStyles} />
                <Text style={textStyles}>
                    {children}
                </Text>
            </View>
        </Link>
    )
}

export default FooterTab