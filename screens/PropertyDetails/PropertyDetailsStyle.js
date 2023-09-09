import { StyleSheet } from 'react-native';

const PropertyDetailsStyle = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    imageContainer:{
        width: '100%',
        height: 250,
    },
    counterImage:{
        position: 'absolute',
        backgroundColor: 'white',
        left: 5,
        top: 10,
        justifyContent: 'center',
        borderRadius: 50,
    },
    image:{
        width: 170,
        height: 110,
        borderRadius: 20,
        opacity: 0.6,
    },
    collegeimage:{
        marginLeft:20,
        marginTop:"5%"
    },
    collegeimagetext:{
        position:"absolute", 
        bottom:2,
        left:50,
        color:"black", 
        fontWeight:"bold"
    },
    content:{
        width: '95%',
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
    },
    addressLeft:{
        width: '50%',
        marginRight: '1%',
    },
    addressText:{
        fontSize: 15,
    },
    buildDetails:{
        marginTop: '4%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buildDetailsItem:{
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '3%',
        marginRight: '3%',
    },
    buildDetailsItemheading:{
        fontSize: 18,
        fontWeight: 'bold',
        color: "black"
    },
    buildDetailsItemText:{
        fontSize: 16,
    },
    icons:{
        marginRight:"6%",
    },
    iconimage:{
        width: 30,
        height: 30,
    },
    hoa:{
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: 'black',
        textAlign: 'center', 
        color:"black", 
        fontWeight:"bold",
    },
    description:{
        marginTop: '4%',
        marginBottom: '4%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    descriptionText:{
        fontSize: 17,
    },
    propertyHistory:{
        marginTop: '4%',
        marginBottom: '4%',
        width: '100%',
    },
    propertyHistoryHeading:{
        fontSize: 27,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: '4%',
    },
    tableHeader:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '4%',
        marginBottom: '4%',
        paddingBottom: '3%',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    tableHeaderText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    },
    tableContent:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: '4%',
        paddingBottom: '4%',
        borderBottomWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
    },
    tableContentText:{
        width: '31%',
        fontSize: 17,
        color: '#000',
    },
    seemore:{
        marginBottom: '5%',
        marginTop: '5%',
    },
    seemoreText:{
        fontSize: 16,
        color: 'blue',
    },
    estimate:{
        marginBottom:"4%", 
        fontSize:18, 
        fontWeight:"bold",
    },
    modalView:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding : 10,
    },
    modalbutton:{
        width: '70%',
        padding: 10,
        backgroundColor: 'lightgrey',
        marginBottom: 10,
        marginTop: 30,
    },
    modaltext:{
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default PropertyDetailsStyle;