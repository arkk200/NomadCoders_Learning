import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';

const { width:SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
  const [region, setRegion] = useState("Loading...");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async() => {
    const {granted} =  await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setRegion(location[0].region);
  }
  useEffect(() => {
    ask();
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
      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temp}>27</Text>
        <Text style={styles.description}>Sunny</Text>
      </View>
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
    fontSize: 178
  },
  description: {
    marginTop: -30,
    fontSize: 60
  }
})