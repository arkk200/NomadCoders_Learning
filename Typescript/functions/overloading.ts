// 오버로딩은 이런식으로 쓰는데 
// call signatures를 여러개 가지고 있을 때 발생시킨다.
type Add1 = {
    (a: number, b: number) : number
    (a: number, b: string) : number
}

// 위에 여러개의 call signatures를 가진 Add1을 보면
// b가 string일 수 있으므로 b가 string일 경우를 
// 조건으로 넣어준다.
const add4:Add1 = (a, b) => {
    if(typeof b == 'string') return a
    return a + b
}

// 오버로딩 실생활 예
// Nextjs에서 home페이지로 이동할 때 
/*
Router.push({
    path: '/home',
    state: 1
})
과
Router.push('/home')
을 쓸 수 있다.
즉, 오브젝트 또는 문자열을 안에 쓴다.
두 개의 타입이 쓰이므로 오버로딩이 발생한다.
*/

// 그러므로 다음과 코드를 짤 수 있다.
type Config = {
    path: string,
    state: object
}
type Push = {
    (path:string): void
    (config: Config): void
}

const push:Push = (config) => {
    // string일 땐 if를, 아닐 땐 else를 실행한다.
    if(typeof config === 'string') { console.log(config) }
    else {
        console.log(config.path, config.state)
    }
}

type Add2 = {
    (a:number, b:number): number
    // c는 추가적으로 들어온 옵션이므로
    (a:number, b:number, c:number): number
}

// 매개변수에 ?:타입으로 옵션이라는 것을 알려준다.
const add5: Add2 = (a, b, c?:number) => {
    if(c) return a+b+c
    return a + b
}

add5(1, 2)
add5(1, 2, 3)