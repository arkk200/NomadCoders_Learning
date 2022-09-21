function add(a:number, b:number) {
    return a + b
}
// 위 코드와 아래 코드는 같음
const add2 = (a:number, b:number) => a+b

// 이런식으로 함수의 call signature 타입을 만들 수 있다.
type Add = (a: number, b:number) => number;
// call signature를 만들면 굳이 매개변수에 타입을 줄 필요가 없다.
// 코드를 작성하기 전에 타입을 먼저 생각한다는 특징이 있다.
const add3:Add = (a, b) => a + b;