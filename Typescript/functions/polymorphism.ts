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
