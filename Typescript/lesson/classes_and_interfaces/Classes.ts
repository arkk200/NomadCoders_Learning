/*
class Player{
    constructor (
        private firstName: string, // JS에선 private가 존재하지 않는다.
        private secondName: string
    ) {}
}
// 위 코드는 아래의 JS코드로 컴파일 된다.

class Player2 {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
// constructor의 괄호에 들어가는 값과 this.firstName = firstName처럼 
// 멤버 변수를 설정할 필요가 없다.
*/

class Player{
    constructor (
        private firstName: string, // JS에선 private가 존재하지 않는다.
        private secondName: string,
        public nickname: string
    ) {}
}

const nico = new Player("nico", "las", "니꼬")

// Player 클래스에서 firstName과 secondName은 private이므로 접근할 수 없다.
/*
nico.firstName = "asdf"
nico.secondName = "asdf"
*/
nico.nickname = "asdf"

// TS로 추상클래스를 만들 수 있다.
abstract class User {
    constructor (
        /*
        구분　　　선언한 클래스 내　상속받은 클래스 내　인스턴스
        private          ⭕　　　　　　　❌　　　　　❌
        protected        ⭕　　　　　　　⭕　　　　　❌
        public           ⭕　　　　　　　⭕　　　　　⭕
        */
        private firstName: string,
        private lastName: string,
        // protect는 외부에선 쓸 수 없지만 상속받는 자식 클래스에선 쓸 수 있게 해준다.
        protected nickname: string
    ) {}
    getFullName() { // 메서드에도 private, public을 적용할 수 있다.
        return `${this.firstName} ${this.lastName}`
    }
    // 추상 클래스 내에 추상 메소드를 만들 수 있다.
    // 그러기 위해선 메소드의 call signature만 적어둬야 한다.
    // 추상 메소드는 추상 클래스를 상속받는 모든 클래스들이 구현해야하는 
    // 메서드를 의미한다.
    abstract getNickName(): void
}

// 그렇기에 상속받는 Player2클래스는 getNickName()메서드를 구현해야한다.
class Player2 extends User {
    getNickName(): void {

    }
}

// 추상 클래스로는 개체를 만들 수 없다.
// 추상 클래스는 다른 곳에서 상속받을 수만 있는 클래스다.
/*
const nico2 = new User("nico", "las", "니꼬")
*/

const nico2 = new Player2("nico", "las", "니꼬")
nico2.getFullName()