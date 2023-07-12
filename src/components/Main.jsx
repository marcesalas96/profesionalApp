import { View, Text } from "react-native";
import ProfesionalRoutes from "../routes/ProfesionalRoutes.jsx";

const Main = () => {
    return (
        <View style={{ backgroundColor: "#262C4E", flex: 1 }}>
            <ProfesionalRoutes/>
            {/* <GetGeoLocation/> */}
        </View>
    )
}
export default Main