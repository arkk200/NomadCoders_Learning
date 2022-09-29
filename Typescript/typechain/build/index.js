const hello = () => "world";
class Block {
    constructor(data) {
        this.data = data;
    }
    static hello() {
        return "world";
    }
}
// tsconfig.json에 lib에 DOM을 설정해주면 
// document.createElement()
// 등 웹에서 쓰이는 코드를 타입스크립트가 인지한다.
