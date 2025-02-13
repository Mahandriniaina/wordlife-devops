import styles from "@/app/styles/starting";
import React from "react";
import { TextInput, View } from "react-native";

const Textinput = ({ title }: { title: string }) => {
    return (
        <View style={styles.center}>
            <TextInput
            
                style={styles.textInput}
                placeholder={title}
                underlineColorAndroid="transparent"
            />
        </View>
    );
};

export default Textinput;
