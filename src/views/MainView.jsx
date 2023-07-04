import { View, StyleSheet} from 'react-native'
import ActualState from '../components/ActualState'
import ButtonChangeState from '../components/ButtonChangeState'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1010",
        paddingTop: 20,
        flex: 1
    }
})

const MainView = () => {
    return (
        <View style={styles.container}>
            <ActualState/>
            <ButtonChangeState/>
        </View>
    )
}
export default MainView