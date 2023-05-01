import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        minHeight: 1500,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        backgroundColor: 'rgba(250, 250, 250, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 6,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        width: '17%',
        aspectRatio: 1,
        margin: '0.5%',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,
        elevation: 6,
    },
    buttonImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    subFooterText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
    },
    loadingBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 2,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 2,
    },
    loadingBarNotch: {
        flex: 1,
        height: 10,
        backgroundColor: 'transparent',
        borderColor: 'darkgray', // Set the border color of the notches
        borderWidth: 1, // Set the border width of the notches
        borderRadius: 2,
        marginHorizontal: 1,
    },
});

export default styles;