// unknown은 변수의 타입을 미리 알지 못 할 때
// unknown을 사용한다.
let a2: unknown;

if(typeof a === 'number') {
    let b = a + 1;
}

// void는 리턴하지 않는 함수를 대상으로 쓰인다.
// return값을 안써줘도 자동으로 void를 반환하므로 
// 굳이 쓸 필요없다.
function hello():void{
    console.log('x')
}
const a3 = hello()

// never는 함수가 절대 return하지 않을 때 발생한다.
function hello2() {
    // 함수에서 예외가 발생했을 때도 never가 발생한다.
    throw new Error("xxx")
}

// 또한 never는 타입이 두가지 일 수도 있는 
// 상황에 발생할 수 있어
function hello3(name:string|number) {
    if(typeof name === "string") {
        name = "str"
    } else if(typeof name === "number") {
        name = 10
    } else {
        name // never
    }
}