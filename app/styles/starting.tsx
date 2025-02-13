import { StyleSheet } from "react-native";
const styles = StyleSheet.create(
    {
        screen: {
            height: '100%',
            width: '100%',
            backgroundColor: 'white',

        },
        header: {
            height: 100,
            width: '100%',
            // position : 'relative',
            backgroundColor: '#cf85c4',
            opacity: 0.3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
        },
        content: {
            backgroundColor: '#cf85c4',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            
        },
        textcenter: {
            fontSize: 15,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white'
        },
        texttitle: {
            fontSize: 25,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        textInput: {

            borderRadius: 5,
            padding: 10,
            marginBottom: 20,
            fontSize: 16,
            width: '80%',
            backgroundColor: 'white',
            alignSelf: 'center'

        },
        button: {
            height: 50,
            borderRadius: 10,
            width: '70%'
        },
        boxIcon: {
            flexDirection: 'row',
            marginTop: 20,
            width: '100%',
            paddingBottom: 100
        },
        iconContent: {
            height: 50,
            width: '35%',
            borderRadius: 5,
            backgroundColor: 'white'
        }


    },

)
export default styles;