// tsconfig.json에서 "allowJS": true를 추가함으로써 
// 불러온 함수의 타입을 TS가 추론할 수 있게 해줌
import { init, exit } from './myPackage';

init()