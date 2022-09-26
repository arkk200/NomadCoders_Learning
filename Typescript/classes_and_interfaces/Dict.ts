type Words = {
    // string만을 property로 가지는 오브젝트라는 뜻이다.
    [key: string]: string
}

// ex)
let test: Words = {
    // 위에서 정의한데로 string: string으로 키, 값을 넣어야 함
    "potato": "food"
}

class Dict {
    private words: Words
    constructor() {
        // 직접 멤버변수를 정의함
        this.words = {}
    }
    add(word:Word) {
        // 단어가 존재하지 않다면
        if(this.words[word.term] === undefined) {
            // 단어를 추가함
            this.words[word.term] = word.def;
        }
    }
    def(term: string) {
        return this.words[term] // 단어의 정의를 반환함
    }
    // static은 객체를 만들지 않더라도 사용가능한 변수나 메소드다.
    static hello() {
        return "hello"
    }
}
Dict.hello() // 바로 사용 가능

class Word {
    constructor(
        // 수정이 안되게 readonly속성을 추가함
        public readonly term: string,
        public readonly def: string
    ) {}
}

const kimchi = new Word("kimchi", "한국의 음식")

const dict = new Dict()

/*
kimchi.def = "xxx"
*/

// 단어를 추가함
dict.add(kimchi)
console.log(dict.def("kimchi"))