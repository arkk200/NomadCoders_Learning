type Player2 = {
    readonly name: string, // readonly는 값을 바꿀 수 없게 만들어준다.
    age?: number
}

// 함수에서 반환할 값도 변수처럼 '함수() : 타입' 형태로 타입을 정해준다.
function playerMaker1(name:string, age?:number) : Player2{
    return {
        name
    }
}

const nico2 = playerMaker1("nico")
nico2.age = 12

/*
nico2.name = "10"
*/

const numbers: readonly number[] = [1, 2, 3, 4]
/*
numbers.push(5) // readonly가 적용된 배열 또한 변수처럼 요소를 추가하거나 바꿀 수 없다.
*/

// Tuple은 array을 생성할 수 있게 해준다.
// array는 최소한의 길이를 가져야 하고 특정 위치에 특정 타입이 있어야 한다.
// Tuple과 readonly를 같이 쓸 수 있다.
const player3: readonly [string, number, boolean] = ["nico", 1, false]
/*
player3[1] = 0 요소의 타입에 맞춰주지 않으면 에러가 일어난다.
player3[0] = "hi" readonly가 적용된 튜플 타입도 요소를 바꿀 수 없다.
*/

let a5 : undefined = undefined
let b5 : null = null

type Player4 = {
    age?:number
}

// any타입은 Typescript에 타입 안정성을 무시한다.
const a1 : any[] = [1, 2, 3]
const b1 : any = true;

// 그래서 타입이 달라도 더하는 연산이 가능함
a1 + b1