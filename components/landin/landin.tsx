import React from 'react';
import { Image , ActivityIndicator,View} from 'react-native';
import styles from '@/app/styles/landin';
const Landin = ()=>{
    return (
        <View style={styles.screen}>
          <Image source={require('../../assets/images/ats.png')} style={styles.img} />
          <ActivityIndicator size="large" color="#0000ff" style={{position:'absolute'}} />
        </View>
      );
}
export default Landin;