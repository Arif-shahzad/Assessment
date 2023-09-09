import { StyleSheet } from 'react-native';

const PropertyListingStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    search:{
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#f2f2f2',
        marginTop: '2%',
        marginLeft: '2%',
        borderRadius: 20,
        padding: '1%',
        alignItems: 'center',
    },
    searchInput:{
        width: '80%',
        paddingLeft: '5%',
        fontSize: 17,
        color: '#000',
    },
    searchIcon:{
        marginLeft: '3%',
    },
    list:{
        marginTop: '2%',
        marginLeft: '4%',
        marginRight: '4%',
        width: '92%',
        height: '90%',
    },
    resultText:{
        fontSize: 15,
        color: '#000',
    },
    // List Item Styles
    subcontainer:{
        width: '100%',
        marginTop: '3%',
        marginBottom: '3%',
    },
    image:{
        width: "100%",
        height: 250,
        borderRadius: 35,
    },
    status:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:"2%",
        marginBottom:"2%"
    },
    price:{
        fontSize: 27,
        fontWeight: 'bold',
        color: '#000',
    },
    details:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '2%',
        marginBottom: '2%',
    },
    detailsText:{
        fontSize: 16,
        color: '#000',
        marginRight: '3%',
    },
    address:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addressLeft:{
        width: '50%',
        marginRight: '1%',
    },
    addressRight:{
        width: '50%',
        marginLeft: '1%',
        alignItems: 'center',
    },
    addressText:{
        fontSize: 15,
    },
    addressButton:{
        width: '90%',
        height: 50,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressButtonText:{
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000',
    },
});

export default PropertyListingStyle;