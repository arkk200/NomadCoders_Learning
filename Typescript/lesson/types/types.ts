// 변수 : 타입
// 형태로 타입을 줄 수가 있다.

// 기본적인 타입들
let a : number = 1; // 숫자
let b : string = "i1"; // 문자열
let c : boolean = true; // 부울형

let arr_a : number[] = [1, 2]; // 숫자 배열
let arr_b : string[] = ["i1", "i2"]; // 문자열 배열
let arr_c : boolean[] = [true, false]; // 부울형 배열

// 근데 꼭 굳이 명시적으로 타입을 줄 필요 없이 Typescript가 타입을 추론하게 만드는게 좋다.

// Optional 타입
const player : { // 객체 내 변수에 타입을 줄려면 변수 : { 변수:타입 } 형태로 써주면 된다.
    name: string,
    age?: number // 객체 내 변수를 '변수 ?: 타입' 형태로 쓰면 변수를 꼭 쓸 필요 없도록 선택적으로 바뀌게 된다.
} = {
    name: 'name',

}

// player.age가 undefined가 될 수 있기에 오류가 난다.
/*
if(player.age < 10) {

}
*/

// player.age,가 undefined일 때 조건문에서 빠져나가게 만들면 에러가 사라진다.
if(player.age && player.age < 10) {

}

// 별칭을 이용해서 반복적으로 나오는 타입 묶음을 묶어줄 수 있다.
// 별칭의 첫글자는 대문자로 쓴다.
type Player = {
    name: string,
    age?: number
}

const player1 : Player = {
    name: 'name1'
}

const player2 : Player = {
    name: 'name2',
    age: 12
}

// Function Return 타입

// 함수에서 반환할 값도 변수처럼 '함수() : 타입' 형태로 타입을 정해준다.
function playerMaker(name:string, age?:number) : Player{
    return {
        name
    }
}

const nico = playerMaker("nico")
nico.age = 12

// 화살표 함수에서의 Return 타입

// 화살표 함수도 매개변수가 들어있는 소괄호 옆에 리턴할 타입을 적어준다.
const anotherPlayerMaker = (name:string) : Player => ({name})

// : 타입(콜론 타입)으로 타입을 정해줄 수 있다.