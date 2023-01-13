import crypto from 'crypto';

interface BlockShape {
    // 블록체인에선 4가지의 속성이 필요하다.
    hash: string; // 나만의 해쉬
    prevHash: string; // 이전 블록의 해쉬
    height: number; // 내 블록의 위치
    data: string; // 내 블록에 저장되는 데이터
}

class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        // 나만의 해쉬는 이전 블록의 해쉬, 내 블록의 위치, 내 블록에 저장되는 데이터를 조합하여
        // 만든다.
        this.hash = Block.calculateHash(prevHash, height, data);
    }

    static calculateHash(prevHash: string, height: number, data: string): string {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class Blockchain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    private getPrevHash() {
        if(this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string) {
        const newBlock = new Block(
            this.getPrevHash(),
            this.blocks.length,
            data
        );
        this.blocks.push(newBlock);
    }
    public getBlocks() {
        // 스프레드 연산자를 이용하여
        // blockchain.getBlocks().push() 핵을
        // 막을 수 있다.
        return [...this.blocks];
    }
}

const blockchain = new Blockchain();

blockchain.addBlock("First one");
blockchain.addBlock("Second one");
blockchain.addBlock("Third one");
blockchain.addBlock("Fourth one");

// getBlocks()가 새로운 배열을 리턴하기에
// private인 blocks엔 영향을 끼치지 않음
blockchain.getBlocks().push(new Block("xxxxxx", 11111, "HACKEDDDDDD"));

console.log(blockchain.getBlocks());