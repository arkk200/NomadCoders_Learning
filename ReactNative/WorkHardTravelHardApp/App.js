import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Pressable } from 'react-native';
import { theme } from './colors';
import { Fontisto } from '@expo/vector-icons';

const STORAGE_KEY = '@toDos';
const Clicked_WORK_KEY = '@clickedWork'

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  useEffect(() => {loadData();}, []); // AsyncStorage에 저장된 데이터를 가져옴
  const travel = async () => {
    setWorking(false);
    await AsyncStorage.setItem(Clicked_WORK_KEY, "false");
  } // Travel을 누르면 working state를 false로 만듦
  const work = async () => {
    setWorking(true);
    await AsyncStorage.setItem(Clicked_WORK_KEY, "true");
  } // Work을 누르면 working state를 true로 만듦
  const onChangeText = payload => setText(payload);
  
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  };
  const loadData = async () => { // AsyncStorage에 저장된 데이터를 가져오는 함수
    const isToDoLeft = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY))
    setToDos(isToDoLeft !== null ? isToDoLeft : {});
    const isClicked = JSON.parse(await AsyncStorage.getItem(Clicked_WORK_KEY));
    setWorking(isClicked !== null ? isClicked : true);
  }
  const addToDo = async () => {
    if(text === '') return;
    const newToDos = {...toDos, [Date.now()] : {text, working, check : false}}
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText('');
  };
  const deleteToDo = async (key) => {
    Alert.alert(
      "Delete to do?",
      "Are you sure?",
      [
        {text:"Cancel"},
        {test:"I'm Sure", onPress: async () => {
          const newToDos = {...toDos};
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        }},
      ]);
  };
  const checkToDo = async (key) => {
    const newToDos = {...toDos};
    newToDos[key].check = newToDos[key].check ? false : true;
    setToDos(newToDos);
    await saveToDos(newToDos);
  };
  const fixToDo = async (key) => {
    const newToDos = {...toDos};
    newToDos[key].check = newToDos[key].check ? false : true;
    setToDos(newToDos);
    await saveToDos(newToDos);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={text}
        returnKeyType="done"
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => 
          toDos[key].working === working ? (
          <Pressable style={styles.toDo} key={key} onPress={() => checkToDo(key)}>
            <Text style={{...styles.toDoText, color: toDos[key].check ? "#999999" : "white"}}>{toDos[key].text}</Text>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => deleteToDo(key)} style={{marginRight: 30}}>
                <Fontisto name="trash" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </Pressable>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    padding: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 15,
    fontSize: 18
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    fontSize: 18,
    fontWeight:"500"
  },
});
