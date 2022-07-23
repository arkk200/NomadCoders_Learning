import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Pressable
} from 'react-native';
import { theme } from './colors';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.5}>
          {/* 투명도를 줌 */}
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>
        <TouchableHighlight underlayColor="#DDDDDD" onPress={() => console.log('pressed')}>
          {/* 배경 색을 바꿈 */}
          <Text style={styles.btnText}>W</Text>
        </TouchableHighlight>
        <TouchableWithoutFeedback>
          {/* UI 변화를 안 줌 */}
        <Text style={styles.btnText}>T</Text>
        </TouchableWithoutFeedback>
        <Pressable>
          {/* 클릭에 대해 세부적인 기능을 가지고 있음 (길게 누르기 감지, 글게 누르는 시간 설정 등) */}
          <Text style={styles.btnText}>Travel</Text>
        </Pressable>
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
    color: "white",
  },
});
