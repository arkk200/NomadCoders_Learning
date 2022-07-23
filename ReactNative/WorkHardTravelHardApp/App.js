import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { theme } from './colors';

export default function App() {
  const [working, setWorking] = useState(true);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
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
      <View>
        <TextInput
        // keyboardType='number-pad' // 키보드 타입을 변경해주는 prop (default, number-pad, decimal-pad, numeric, email-address, phone-pad)
        // keyboardType='email-address'
        // keyboardType='phone-pad'
        // keyboardType='visible-password' // 안드로이드 전용
        // returnKeyType='search' // 완료 표시(오른쪽 아래 버튼)를 변경해주는 prop (done, go, next, search, send)
        returnKeyType='next'
        // returnKeyType='go'
        secureTextEntry // 비밀번호 입력시 사용
        multiline // 입력을 여러 줄로 표시해줌
        // placeholderTextColor="skyblue" // placeholder 색상 변경
        placeholder={working ? "Add a To Do" : "Where do you want to go?"} style={styles.input} />
      </View>
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
    marginTop: 15,
    fontSize: 18
  }
});
