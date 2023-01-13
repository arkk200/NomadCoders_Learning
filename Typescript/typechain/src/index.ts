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
    }
}