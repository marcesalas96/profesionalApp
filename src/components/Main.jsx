import { View, Text } from "react-native";
import AppBar from "./AppBar.jsx";
import MainView from "../views/MainView.jsx";
import Footer from "./Footer.jsx";
import { Route, Routes } from "react-router-native";
import ViajesView from "../views/ViajesView.jsx";
import LogInPage from "./LogIn.jsx";
import GetGeoLocation from "./GetGeoLocation.jsx";

const Main = () => {
    return (
        <View style={{ backgroundColor: "#262C4E", flex: 1 }}>
            <AppBar />
            <Routes>
                <Route path="/" element={<MainView />} />
                <Route path="/viajes" element={<ViajesView />} />
                <Route path="/login" element={<LogInPage/>} />

            </Routes>
            {/* <GetGeoLocation/> */}
            <Footer />
        </View>
    )
}
export default Main