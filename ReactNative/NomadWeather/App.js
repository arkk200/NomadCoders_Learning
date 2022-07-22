import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import { View,
  Text,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';

const { width:SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = "af0683e259023bb9d61100a182be41f1";

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
    console.log(json.daily)
    // setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  })
  return <View style={styles.container}>
    <View style={styles.city}>
      <Text style={styles.cityName}>{region}</Text>
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
        <View key={index} style={styles.day}>
          <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
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
  city: {
    flex: 1.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 68,
  },
  weather: {
  },
  day: {
    width:SCREEN_WIDTH,
    alignItems:'center',
  },
  temp: {
    marginTop: 30,
    fontSize: 108
  },
  description: {
    marginTop: -30,
    fontSize: 60
  },
  tinyText: {
    fontSize: 20
  }
})