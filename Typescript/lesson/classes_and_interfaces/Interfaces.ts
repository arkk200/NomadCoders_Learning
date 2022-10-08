// 이런 식으로 concrete 타입의 특정 값을 쓸 수도 있다.
type Team = "red" | "blue" | "yellow"
type Health = 1 | 5 | 10

type Player3 = {
    nickname: string,
    team: Team,
    health: Health
}

// interface는 type과 비슷한데 object 모양을 특정해주기 위해 사용한다.
// type과의 차이점은 type은 interface에 비해 좀 더 활용할 수 있는게 많다.
// 또한 interface는 React.js로 작업할 때 많이 사용된다.
interface Player4 {
    nickname: string,
    team: Team,
    health: Health
}
/*
interface Player = string; 불가능
*/

const nico3: Player3 = {
    nickname: "nico",
    team: "red", // "red", "blue", "yellow" 밖에 쓰지 못함
    health: 10 // 1, 5, 10 밖에 못씀
    // 즉, 특정 값을 줄 수가 있다.
}

const nico4: Player4 = {
    nickname: "nico",
    team: "red", // "red", "blue", "yellow" 밖에 쓰지 못함
    health: 10 // 1, 5, 10 밖에 못씀
    // 즉, 특정 값을 줄 수가 있다.
}

// 여러개를 쓰면 하나로 합쳐진다.
interface User2 {
    name: string
}
interface User2 {
    lastName: string
}
interface User2 {
    health: number
}

// interface는 class 처럼 상속받을 수 있다.
interface Player5 extends User2 {

}

const nico1 : Player5 = {
    name: "nico",
    lastName: "colas",
    health: 10
}

// 위 코드를 type으로 쓰면

type User3 = {
    name: string
}
// extends를 &(and) 연산자로 대체할 수 있음
type Player6 = User3 & {}

const nico5: Player6 = {
    name: "nico"
}