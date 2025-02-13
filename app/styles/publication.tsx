import { StyleSheet } from "react-native";
const Style = StyleSheet.create({
    content : {
        height: 'auto',
        width : '100%',
        paddingRight: 15 , 
        paddingLeft: 15 ,
        paddingTop: 20,
        paddingBottom: 20,
        borderWidth:0.5,
        borderColor:'whitesmoke',
        backgroundColor:'white',
        display: 'flex',
        justifyContent: 'center',
    },
    header : {
        display: 'flex',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Pour répartir l'espace entre les boutons
        alignItems: 'center', // Pour centrer verticalement les boutons dans le conteneur
        marginHorizontal: 10, // Marge horizontale pour donner de l'espace autour du conteneur
        marginTop: 20, // Marge supérieure pour positionner le conteneur plus bas sur l'écran
        textAlign:'center', //
        borderTopColor:'gray'
        
      },

})
export default Style;