import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const SplashScreen = ({navigation}:any) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Property Listing');
        }, 2000);
    }, []);

  return (
    <View style={styles.container}>
        <View style={styles.subcontainer}>
            <Image source={require('../../public/images/Logo.png')} style={styles.logo}/>
            <Text style={styles.text}>realtor.com</Text>
        </View>
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#d92227',
        justifyContent: 'center',
    },
    subcontainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    text:{
        fontSize: 35,
        color: '#fff',
        marginLeft: "2%",
    },
});