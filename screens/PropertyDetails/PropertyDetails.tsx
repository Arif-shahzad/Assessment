import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  FlatList,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';
import PropertyDetailsStyle from './PropertyDetailsStyle';
import { SliderBox } from 'react-native-image-slider-box';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const PropertyDetails = ({navigation, route}:any) => {

  const { property_id } = route.params;
  const [data, setData]:any = useState();
  const [images, setImages]:any = useState([]);
  const [images2, setImages2]:any = useState([{count:0, label:"", href:""}]);
  const [modalVisible, setModalVisible] = useState(false);
  const [href, setHref] = useState("");


  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/v3/detail',
      params: {
        property_id: property_id,
      },
      headers: {
        'X-RapidAPI-Key': '5db0b6e5f0msh1065807fa3aa5e4p19f22fjsn717300f8437e',
        'X-RapidAPI-Host': 'realtor.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setData(response.data.data.home);
      const images1:Array<String> = [];
      response.data.data.home.photos.map((photo:any) => {
        images1.push(photo.href);
      });
      setImages(images1);
      const output:Array<Object> = [];
      const labelMap = new Map();      
      response.data.data.home.photos.forEach(item => {
        item.tags.forEach(tag => {
          const label = tag.label;
          const href = item.href;
          if(label!=="unknown")
            if (!labelMap.has(label)) {
              labelMap.set(label, { count: 1, href });
            } else {
              labelMap.get(label).count++;
            }
        });
      });
      labelMap.forEach((value, label) => {
        output.push({ label, count: value.count, href: value.href });
      });
      setImages2(output);
    } catch (error) {
      console.error(error);
    }
  }

  const createdate = () => {
    const specificDate = new Date(data.create_date);
    const currentDate = new Date();
    const timeDifferenceMillis = currentDate - specificDate;
    const daysPassed = Math.floor(timeDifferenceMillis / (1000 * 60 * 60 * 24));
    const hoursPassed = Math.floor((timeDifferenceMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesPassed = Math.floor((timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60));
    if(daysPassed === 0)
      if(hoursPassed === 0)
        return `${minutesPassed} mins`;
      else
        return `${hoursPassed} hours`;
    else
      if(daysPassed === 1)
        return `${daysPassed} day`;
      else
      return `${daysPassed} days`;
  }

  const displayHistory = (item:any) => (
    <View style={PropertyDetailsStyle.tableContent}>
      <Text style={[PropertyDetailsStyle.tableContentText, {marginRight:"5%"}]}>{item.date}</Text>
      <Text style={PropertyDetailsStyle.tableContentText}>{item.event_name}</Text>
      <Text style={[PropertyDetailsStyle.tableContentText, {textAlign:"right"}]}>${item.price.toLocaleString("en-US")}</Text>
    </View>
  )

  const getEstimate = () => {
    let minDate = data.property_history[0].date;
    let minPrice = data.property_history[0].price;
    for (let i = 1; i < data.property_history.length; i++) {
      if (data.property_history[i].date < minDate) {
        minDate = data.property_history[i].date;
        minPrice = data.property_history[i].price;
      }
    }
    const minYear = new Date(minDate).getFullYear();
    let currentPrice = data.list_price;
    let gainorloss = currentPrice - minPrice;
    const percentageChange = (((currentPrice - minPrice) / minPrice) * 100).toFixed(0);
    if(gainorloss < 0)
      return `${gainorloss.toLocaleString("en-US")} (${-percentageChange}%) since ${minYear}`;
    else
      return `${gainorloss.toLocaleString("en-US")} (+${percentageChange}%) `;
  }

  const getyear = () => {
    let minDate = data.property_history[0].date;
    for (let i = 1; i < data.property_history.length; i++) {
      if (data.property_history[i].date < minDate)
        minDate = data.property_history[i].date;
    }
    const minYear = new Date(minDate).getFullYear();
    return `${minYear}`;
  }

  const getfee = ()=>{
    if(data.hoa === null)
      return "None";
    else
      return `$${data.hoa.fee}/mo`;
  }

  useEffect(() => {
    getData();
  }, []);

  if(data === undefined)
    return "";
  else
  return (
    <ScrollView style={{width:"100%", height:"100%"}}>
      <View style={PropertyDetailsStyle.container}>
        <View style={PropertyDetailsStyle.imageContainer}>
          <SliderBox 
            images={images}
            sliderBoxHeight={250}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={10}
            circleLoop
            autoplay
            dotStyle={{
              width: 0,
            }}
          />
          <TouchableOpacity style={PropertyDetailsStyle.counterImage} onPress={()=>{navigation.navigate('Property Listing')}}>
            <MaterialCommunityIcons name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={PropertyDetailsStyle.collegeimage}>
          {images2.map((image:any) => (
            <TouchableOpacity style={{marginRight:20}} onPress={()=>{
              setModalVisible(true);
              setHref(image.href);
            }}>
              <Image  style={PropertyDetailsStyle.image} source={{uri: image.href}}/>
              <Text style={PropertyDetailsStyle.collegeimagetext}>{image.label.split("_").map((e:any)=>{return (e.charAt(0).toUpperCase() + e.slice(1))+" "})}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View>
          <Modal animationType={"slide"} transparent={false}
            visible={modalVisible}>
            <View style={PropertyDetailsStyle.modalView}>
              <Image
                style={{ width: '100%', height: 200, resizeMode: 'stretch' }}
                source={{ uri: href }}
              />
              <TouchableHighlight style={PropertyDetailsStyle.modalbutton}
                onPress={() => { setModalVisible(!modalVisible) }}>
                <Text style={PropertyDetailsStyle.modaltext}>Close</Text>
              </TouchableHighlight>
            </View>
          </Modal>
        </View>
        <View style={PropertyDetailsStyle.content}>
          <View style={PropertyDetailsStyle.status}>
            <MaterialCommunityIcons name="circle" size={15} color="green"/>
            <Text style={{fontSize:17, color:"black", marginLeft:"2%"}}>{data.status.split("_").map((e:any)=>{return (e.charAt(0).toUpperCase() + e.slice(1))+" "})}</Text>
          </View>
          <Text style={PropertyDetailsStyle.price}>${data.list_price.toLocaleString("en-US")}</Text>
          <View style={PropertyDetailsStyle.details}>
            <Text style={PropertyDetailsStyle.detailsText}>{data.description.beds} bd</Text>
            <Text style={PropertyDetailsStyle.detailsText}>{data.description.baths} ba</Text>
            <Text style={PropertyDetailsStyle.detailsText}>{data.description.sqft} sqft</Text>
            <Text style={PropertyDetailsStyle.detailsText}>{(data.description.lot_sqft/43560).toFixed(2)} acres</Text>
          </View>
          <View style={PropertyDetailsStyle.address}>
            <Text style={PropertyDetailsStyle.addressText}>{data.location.address.line} {data.location.address.city}, {data.location.address.state_code} {data.location.address.postal_code}</Text>
          </View>
          <View style={PropertyDetailsStyle.buildDetails}>
            <View style={PropertyDetailsStyle.buildDetailsItem}>
              <Ionicons name="hammer" size={30} color="black" style={PropertyDetailsStyle.icons}/>
              <View>
                <Text style={PropertyDetailsStyle.buildDetailsItemheading}>Built in {data.description.year_built}</Text>
                <Text style={PropertyDetailsStyle.buildDetailsItemText}>Year Built</Text>
              </View>
            </View>
            <View style={PropertyDetailsStyle.buildDetailsItem}>
              <MaterialCommunityIcons name="calendar-minus" size={30} color="black" style={PropertyDetailsStyle.icons}/>
              <View>
                <Text style={PropertyDetailsStyle.buildDetailsItemheading}>{createdate()}</Text>
                <Text style={PropertyDetailsStyle.buildDetailsItemText}>Time on market</Text>
              </View>
            </View>    
          </View>
          <View style={PropertyDetailsStyle.buildDetails}>
            <View style={PropertyDetailsStyle.buildDetailsItem}>
              <Text style={[PropertyDetailsStyle.hoa, PropertyDetailsStyle.icons]}>HOA</Text>
              <View>
                <Text style={PropertyDetailsStyle.buildDetailsItemheading}>{getfee()}</Text>
                <Text style={PropertyDetailsStyle.buildDetailsItemText}>HOA Fee</Text>
              </View>
            </View>
            <View style={PropertyDetailsStyle.buildDetailsItem}>
            <Image source={require('../../public/images/combined_ruler.png')} style={[PropertyDetailsStyle.iconimage, PropertyDetailsStyle.icons]}/>
              <View>
                <Text style={PropertyDetailsStyle.buildDetailsItemheading}>${data.price_per_sqft.toLocaleString("en-US")}</Text>
                <Text style={PropertyDetailsStyle.buildDetailsItemText}>Price per sqft</Text>
              </View>
            </View>    
          </View>
          <View style={PropertyDetailsStyle.description}>
            <Text style={PropertyDetailsStyle.descriptionText}>{data.description.text}</Text>
          </View>
          <View style={PropertyDetailsStyle.propertyHistory}>
            <Text style={PropertyDetailsStyle.propertyHistoryHeading}>Property History</Text>
            <View style={{display:"flex", flexDirection:"row"}}>
              <Text style={[PropertyDetailsStyle.estimate, {color:"green"}]}>${getEstimate()}</Text>
              <Text style={[PropertyDetailsStyle.estimate, {color:"black"}]}>since {getyear()}</Text>
            </View>
            <Text style={{fontSize:16, color:"black"}}>Price history</Text>
            <View style={PropertyDetailsStyle.tableHeader}>
              <Text style={PropertyDetailsStyle.tableHeaderText}>Date</Text>
              <Text style={PropertyDetailsStyle.tableHeaderText}>Event</Text>
              <Text style={PropertyDetailsStyle.tableHeaderText}>Price(change)</Text>
            </View>
            <FlatList
              data={data.property_history}
              renderItem={({item}) => displayHistory(item)}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default PropertyDetails;