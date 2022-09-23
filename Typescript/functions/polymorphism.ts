// poly는 many, several, much, multi라는 뜻이다.
// poly는 많은, 다수라는 의미를 가지고 있다.
// morphos, morphic은 
// form(형식), structure(구조)란 뜻을 가지고 있다.

// 즉 polymorphism은 여러가지 다른 구조들이라는 의미이다.

type SuperPrint = {
    (arr: number[]): void
    (arr: boolean[]): void
    (arr: string[]): void
    (arr: (number|boolean)[]): void
}

const superPrint: SuperPrint = (arr) => {
    arr.forEach(i => console.log(i))
}
superPrint([1, 2, 3])
superPrint([true, false, 3, 4])
superPrint(["a", "b", "c"])
// 그러나 이렇게 새롭게 타입이 정의될 때마다 하나씩 써줘야한다.
/*
superPrint([1, 2, true, "string"])
*/

// 다형성을 활용하면 위 코드를 좀 더 좋게 짤 수 있다.
// 이때 generic이 쓰인다.
type SuperPrint2 = {
    // generic은 다양한 타입의 요소를 갖는 배열 타입을 만들어준다.
    // TypePlaceholder말고도 T, V 같은 다른 글자로도 대체할 수 있다.
    <TypePlaceholder>(arr: TypePlaceholder[]):TypePlaceholder
}

const superPrint2: SuperPrint2 = (arr) => arr[0]
// 배열 내 요소끼리 다른 타입이어도 상관없다.
// any와의 차이점은 any는 타입 정보를 알 수 없지만 generics는 알 수 있다.
const a = superPrint2([1, 2, 3])
const b = superPrint2([true, false, 3, 4])
const c = superPrint2(["a", "b", "c"])
const d = superPrint2([1, 2, true, "string"])

// --- 제너릭 실제 사용 예 ---

// 위에 코드랑 똑같지만 type을 만들지 않고 바로 적용한 것이다.
function superPrint3<T>(a: T[]) {
    return a[0]
}

const a2 = superPrint3([1, 2, 3])
const b2 = superPrint3([true, false, 3, 4])
const c2 = superPrint3(["a", "b", "c"])
const d2 = superPrint3([1, 2, true, "string"])
// 직접적으로 generic을 건들 수도 있다.
// 하지만 typescript가 유추할 수 있게 안적는게 좋음
const e2 = superPrint3<boolean>([false, true])



// generic에 코드를 저장할 수도 있다.
type Player<E> = {
    name: string
    extraInfo: E
}
type NicoExtra = {
    favFood: string
}
// 타입을 생성하고 그 타입을 또다른 타입에 넣어서 쓸 수 있다.
type NicoPlayer = Player<NicoExtra>

const nico: NicoPlayer = {
    name: 'nico',
    extraInfo: {
        favFood: 'kimchi'
    }
}

// extraInfo에 넣을 generic이 null이기에 null로 설정한다.
const lynn: Player<null> = {
    name: 'lynn',
    extraInfo:null
}

// typescript에 기본적인 타입에도 generic이 들어있다.
// Array타입은 Array<T>로 generic이 있음
type A = Array<number>

let a3:A = [1, 2, 3, 4]

// 이런식으로 숫자열 인자를 받을 수도 있지만
function printAllNumbers(arr: number[]) {}
// Array generic 형식으로도 쓸 수 있다.
function printAllNumbers2(arr: Array<number>) {}

/*
또 다른 예로 ReactJS에서 state의 타입을 줄 때 
'useState<타입>()' 형태로 줄 수 있다.
*/