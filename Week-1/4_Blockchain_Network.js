/*Blockchain Architecture:-

  A blockchain is a distributed database of a list of validated blocks. 
  Each block contains data in the form of transactions and each block is cryptographically tied to its predecessor, producing a "chain".
  */
  
  /*
  Go to this link: https://blockchaindemo.io/. Feel free to go through this excellent demo by yourself, we will also break down a lot of the same info below!
  A blockchain has a list of blocks. It starts with a single block, called the genesis block.
  
  index: the position of the block in the chain.
  timestamp: a record of when the block was created. 
  hash: this is commonly referred to as the block hash or block header. As opposed to what the demo says, this piece of data is NOT stored in the block but is actually a digital fingerprint representing the block's contents.
  previous hash: the hash of the previous block.
  data: each block can store data against it.
  nonce: the nonce is the number used to find a valid hash.
  */
  
  /*
  A valid hash for a blockchain is a hash that meets certain requirements. 
  For the blockchain in the demo, having three zeros at the beginning of the hash is the requirement for a valid hash.
  A hashing function takes data as input, and returns a unique hash.
  
  
  f ( index + previous hash + timestamp + data + nonce ) = hash
  f ( 0 + "0" + 1508270000000 + "Welcome to Blockchain Demo 2.0!" + 604 ) = 000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf
  */
  
  /*
  if you see a string of characters "0x123abc", the "0x" is denoting the use of hexadecimals and the string's value is actually just "123abc".
  The hash of the block is being tested by the regular expression (regex) /^[0-9A-F]{64}$/i
  hash it to a 256 bit array. If we call toString() on that returned object we'll receive a 64 character hexadecimal string.
  */
  
  /*
  const hash = SHA256("Dan");
  console.log( hash.toString() );
  */
  
//Block.js
const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(data) {
        this.data = data;
    }
    
    toHash() {
        return SHA256(this.data + this.previousHash);
    }
}

module.exports = Block;

//Blockchain.js
const Block = require('./Block');
class Blockchain {
    constructor() {
        this.chain = [new Block()];
    }

    addBlock(block) {
        block.previousHash = this.chain[this.chain.length - 1].toHash();
        this.chain.push(block);
    }

    isValid(){
        for(let i=this.chain.length-1;i>0;i--){
            const block=this.chain[i];
            const pre=this.chain[i-1];
            if(block.previousHash.toString()!==pre.toHash().toString()){
                return false;
            }
            
        }
        return true;
    }
}

module.exports = Blockchain;
  
//test.js
const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

describe('Blockchain', function() {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain.addBlock(new Block("Dan"));
    blockchain.addBlock(new Block("Peter"));
    blockchain.addBlock(new Block("James"));
  });
  
  it('should be considered valid', function() {
    assert(blockchain.isValid());
  });

  describe('tampering with a previousHash', function() {
    beforeEach(() => {
      blockchain.chain[1].previousHash = SHA256("gibberish");
    });

    it('should not be considered valid', function() {
      assert(!blockchain.isValid());
    });
  });
  
  describe('tampering with data', function() {
    beforeEach(() => {
      blockchain.chain[0].data = "Something Else";
    });

    it('should not be considered valid', function() {
      assert(!blockchain.isValid());
    });
  });
});

