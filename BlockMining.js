const SHA256 = require ('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash = ''   ){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.computehash();
        this.nonce = 0;
    }
    computehash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+ this.nonce).toString();
    }
    Blockmining(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.computehash();
        }
        console.log("Block mined: " + this.hash);
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2; // Bạn có thể tăng lên để "khai thác" lâu hơn
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2022", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.Blockmining(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const curr = this.chain[i];
            const prev = this.chain[i - 1];

            if (curr.hash !== curr.computehash()) {
                return false;
            }
            if (curr.previousHash !== prev.hash) {
                return false;
            }
        }
        return true;
    }
}
