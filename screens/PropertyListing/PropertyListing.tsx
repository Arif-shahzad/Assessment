import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';
import PropertyListingStyle from './PropertyListingStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';

const PropertyListing = ({navigation}:any) =>{

  const [search, setSearch] = useState("");
  const [data, setData] = useState({});

  const getData = async () => {
    const options = {
      method: 'POST',
      url: 'https://realtor.p.rapidapi.com/properties/v3/list',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '5db0b6e5f0msh1065807fa3aa5e4p19f22fjsn717300f8437e',
        'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
      },
      data: {
        limit: 200,
        offset: 0,
        postal_code: '90004',
        status: [
          'for_sale',
          'ready_to_build'
        ],
        sort: {
          direction: 'desc',
          field: 'list_date'
        }
      }
    };
    try {
      const response = await axios.request(options);
      const data1 = response.data.data.home_search;
      const results:Array<Object> = [];
      data1.results.forEach((item: any) => {
        const result = {
          "primary_photo":item.primary_photo,
          "status":item.status,
          "list_price":item.list_price,
          "description":item.description,
          "location":item.location,
          "property_id":item.property_id
        };
        results.push(result);
      });
      data1.results = results;
      setData(data1);
    } catch (error) {
      console.error(error);
    }
  }

  const Res = ({item}: any)=>(
    <TouchableOpacity style={PropertyListingStyle.subcontainer} onPress={()=>{navigation.navigate("Property Details", {property_id:item.property_id})}}>
      <Image style={PropertyListingStyle.image} source={{uri: item.primary_photo.href}}/>
      <View style={PropertyListingStyle.status}>
        <MaterialCommunityIcons name="circle" size={15} color="green"/>
        <Text style={{fontSize:17, color:"black", marginLeft:"2%"}}>{item.status.split("_").map((e:any)=>{return (e.charAt(0).toUpperCase() + e.slice(1))+" "})}</Text>
      </View>
      <Text style={PropertyListingStyle.price}>${item.list_price.toLocaleString("en-US")}</Text>
      <View style={PropertyListingStyle.details}>
        <Text style={PropertyListingStyle.detailsText}>{item.description.beds} bd</Text>
        <Text style={PropertyListingStyle.detailsText}>{item.description.baths} ba</Text>
        <Text style={PropertyListingStyle.detailsText}>{item.description.sqft} sqft</Text>
        <Text style={PropertyListingStyle.detailsText}>{(item.description.sqft/43560).toFixed(2)} acres</Text>
      </View>
      <View style={PropertyListingStyle.address}>
        <View style={PropertyListingStyle.addressLeft}>
          {/* <Text style={PropertyListingStyle.addressText}></Text> */}
          <Text style={PropertyListingStyle.addressText}>{item.location.address.line} {item.location.address.city}, {item.location.address.state_code} {item.location.address.postal_code}</Text>
        </View>
        <View style={PropertyListingStyle.addressRight}>
          <TouchableOpacity style={PropertyListingStyle.addressButton}>
            <Text style={PropertyListingStyle.addressButtonText}>Contact an Agent</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  const filterData = (string: string) => {
    setSearch(string);
    // filter the data according to the states
    const data1 = data;
    if(data1 !== null){
      const filteredData = data.results.filter((item: any) => {
        return item.location.address.state.toLowerCase().includes(string.toLowerCase());
      });
      data1.results = filteredData;
      setData(data1);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if(data === null)
    return "";
  else
  return(
    <View style={PropertyListingStyle.container}>
      <View style={PropertyListingStyle.search}>
        <MaterialCommunityIcons name="magnify" size={35} color="black" style={PropertyListingStyle.searchIcon}/>
        <TextInput style={PropertyListingStyle.searchInput} value={search} placeholder='Enter State' onChangeText={(e)=>filterData(e)}/>
      </View>
      <View style={PropertyListingStyle.list}>
        <Text style={PropertyListingStyle.resultText}>{data.count} results</Text>
        <Animatable.View style={{width: '100%'}} animation="fadeInRightBig" duration={1500}>
          <FlatList 
          data={data.results} 
          renderItem={({item}) => <Res item={item}/>} 
          keyExtractor={(item)=>item.property_id}/>
        </Animatable.View>
      </View>
    </View>
  );
}

export default PropertyListing;