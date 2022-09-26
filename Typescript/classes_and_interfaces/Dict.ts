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
}

class Word {
    constructor(
        public term: string,
        public def: string
    ) {}
}

const kimchi = new Word("kimchi", "한국의 음식")

const dict = new Dict()

// 단어를 추가함
dict.add(kimchi)
console.log(dict.def("kimchi"))