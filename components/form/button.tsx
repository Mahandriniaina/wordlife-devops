import React from "react";
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from "@/app/styles/starting";

const ButtonIcon = ({ title, icon }: { title: string; icon: string }) => {
    return (
        <View style={[styles.center, styles.iconContent, { marginLeft: 20 }]}>
            <Text style={styles.center}>
                <Icon name={icon} size={20} color="black" /> {/* Correction de la couleur */}
                <Text style={{ marginLeft: 20 }}>{title}</Text>
            </Text>
        </View>
    );
};
const SubmitButton = ({ title , background }: { title: string , background:string }) => {
    return <>
        <View style={styles.center}>
            <View
                style={[styles.center, styles.button, { backgroundColor: background }]}>
                <Text style={{ color: 'white' }}>{title}</Text>
            </View>
        </View>
    </>
}

export default {
    ButtonIcon,
    SubmitButton
}
