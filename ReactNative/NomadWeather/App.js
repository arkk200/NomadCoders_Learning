import { View } from 'react-native';

export default function App() {
  return (
    // React Native에서
    // 1. 기본적으로 모든 View 컴포넌트는 Flex Container다.
    // 2. (모바일에서) Flex Direction의 기본값은 column이다. (그러나 웹에서 Flex Direction의 기본값은 row이다.)
    <View style={{ flex:1 }}>
      {/* 반응형 웹을 생각해서 너비와 높이에 기반한 레이아웃은 안만드는게 좋다.
      아이콘 / 아바타 등에는 width, height를 줄 수 있으나 레이아웃에선 width나 height를 사용하지 않는다. */}
      <View style={{ /* (X) width: 200, height: 200, */ flex:1, backgroundColor:"tomato" }}></View>
      <View style={{ /* (X) width: 200, height: 200, */ flex:1, backgroundColor:"teal" }}></View>
      <View style={{ /* (X) width: 200, height: 200, */ flex:1, backgroundColor:"orange" }}></View>
      {/* flex에 들어가는 값은 비율이다. flex:비율 (레이아웃이 하나일 때 숫자가 아무 영향을 끼치지 않는다.)
      부모 요소에도 flex를 추가해야 자식요소의 flex가 무엇을 기준점으로 잡을 지 알 수 있다. */}
    </View>
  );
}