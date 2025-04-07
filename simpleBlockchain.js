const SHA256 = require ('crypto-js/sha256');
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.computehash();
    }
    computehash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.creategenesisblock()];
    }
    creategenesisblock(){
        return new Block(0, "01/01/2022", "Genesis block", "0");
    }
    getrecentBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getrecentBlock().hash;
        newBlock.hash = newBlock.computehash();
        this.chain.push(newBlock);
    }
}
let Coin = new Blockchain();
Coin.addBlock(new Block(1, "10/01/2022", {amount : 4}));
Coin.addBlock(new Block(2, "10/01/2022", {amount : 8}));
console.log(JSON.stringify(Coin, null, 4));
