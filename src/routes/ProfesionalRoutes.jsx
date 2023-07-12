import ViajesView from "../views/ViajesView.jsx";
import LogInPage from "../components/LogIn.jsx";
import MainView from "../views/MainView.jsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



const ProfesionalRoutes = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="login"
                component={LogInPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="home"
                component={MainView}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="viajes"
                component={ViajesView}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
export default ProfesionalRoutes