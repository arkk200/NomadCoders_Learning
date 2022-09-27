// Storage inteface는 이미 JS의 웹 스토리지 API를 위해서 선언돼 있음
interface SStorage<T> {
    [key:string]: T
}

// 타입에 따른 로컬스토리지를 만들 수 있다.
class LocalStorage<T> {
    // class의 제네릭을 interface로 전달해줌
    private storage: SStorage<T> = {}
    set(key:string, value:T) { // 단어를 설정함
        this.storage[key] = value;
    }
    remove(key:string) { // 단어를 삭제함
        delete this.storage[key];
    }
    get(key:string):T { // 단어의 정의를 가져옴
        return this.storage[key];
    }
    clear() { // 깨끗하게 비움
        this.storage = {}
    }
}

// <> 안에 타입을 정의 따로 정할 수 있다.
const stringsStorage = new LocalStorage<string>()

console.log(stringsStorage.get('cat'))
stringsStorage.set('hello', 'how r u?')
console.log(stringsStorage.get('hello'))

const booleansStorage = new LocalStorage<boolean>();

console.log(booleansStorage.get('xxxx'))
booleansStorage.set('hello', true)
console.log(booleansStorage.get('hello'))