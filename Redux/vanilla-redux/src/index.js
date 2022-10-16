import { createStore } from "redux";

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

number.innerText = 0;
// 변수로 action.type을 정의하면 에러를 볼 수 있다.
const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
  switch(action.type) { // if else 대신 switch문을 쓰는게 편하다.
    case ADD:
      return count + 1
    case MINUS:
      return count - 1
    default:
      return count
  }
};
const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
}

// subscribe는 state가 변할 때마다 작동한다.
countStore.subscribe(onChange)

console.log(countStore.getState());

add.addEventListener("click", () => countStore.dispatch({ type: ADD }))
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }))