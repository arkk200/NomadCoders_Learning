import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import { View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Fontisto } from '@expo/vector-icons'

const { width:SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = "af0683e259023bb9d61100a182be41f1";

const icons = {
  "Clouds": "cloudy",
  "Clear": "day-sunny",
  "Atmosphere": "cloudy-gusts",
  "Snow": "snow",
  "Rain": "rains",
  "Drizzle": "rain",
  "Thunderstorm": "lightning",
}

export default function App() {
  const [region, setRegion] = useState("Loading...");
  const [days, setDays] = useState([])
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const {granted} =  await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setRegion(location[0].region);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    // setDays(json.daily);
    console.log(json.daily);
  };
  useEffect(() => {
    getWeather();
  })
  return <View style={styles.container}>
    <View style={styles.region}>
      <Text style={styles.regionName}>{region}</Text>
    </View>
    <ScrollView
    pagingEnabled
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.weather}
    >
      {days.length === 0 ? (
        <View style={styles.day}>
          <ActivityIndicator color="white" style={{marginTop:10}} size="large" />
        </View>
      ) : (
      days.map((day, index) => 
        <View key={index} style={{width:SCREEN_WIDTH}}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent:"space-between", width:"100%"}}>
            <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
            <Fontisto name={icons[day.weather[0].main]} size={68} color="black" style={{marginRight: 50}} />
          </View>
          <Text style={styles.description}>{day.weather[0].main}</Text>
          <Text style={styles.tinyText}>{day.weather[0].description}</Text>
        </View>
        )
      )}
    </ScrollView>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"skyblue"
  },
  region: {
    flex: 1.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  regionName: {
    fontSize: 68,
    color: 'white'
  },
  weather: {
  },
  day: {
    width:SCREEN_WIDTH,
    marginLeft: 20
  },
  temp: {
    marginTop: 30,
    fontSize: 98,
    color: 'white'
  },
  description: {
    marginTop: -30,
    fontSize: 40,
    color: 'white'
  },
  tinyText: {
    fontSize: 25,
    color: 'white'
  },
})