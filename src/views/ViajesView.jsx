import { Text, View } from "react-native";
import Footer from "../components/Footer";

const ViajesView = ({navigation}) => {
    return(
        <>
        <View>
            <Text>
                Viajes en progreso!!
            </Text>
        </View>
        <Footer navigation={navigation} />
        </>

    )
}

export default ViajesView