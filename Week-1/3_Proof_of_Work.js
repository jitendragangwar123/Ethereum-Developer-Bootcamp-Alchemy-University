/*
Consensus Mechanisms :-
:- Consensus means coming to a general agreement. 
:- Blockchain consensus typically means at least 51% of nodes are in agreement over the current global state of the network.
*/

/*
Mining :-
  Mining is process of creating a block of transactions to be added to a blockchain.
  */

/*
proof-of-work mining algorithm :-

1.Take current block’s block header, add mempool transactions
2.Append a nonce, starting at nonce = 0
3.Hash data from #1 and #2
4.Check hash versus target difficulty (provided by protocol)
5.If hash < target, puzzle is solved! Get rewarded.
6.Else, restart process from step #2, but increment nonce
*/

/*
:- In proof-of-work, miners must present a proof (in the form of a hash output on valid input data) that they expended energy 
in order to successfully "mine" a block and have it extend a blockchain.
*/


/*
The Mempool :-
      :-The mempool is a place for miners to keep those transactions before adding them to a block.
      :-the miner will take all the transactions with the highest transaction fees from the mempool. 
      :-Then they'll add them to the block and attempt to find the proof of work.
  */

/*
Mining Blocks :-
       :-Block will be an object with a single property: an id that is equal to the block height prior to it being mined.
       :-In Bitcoin, blocks contain quite a bit of information in their header: the software version, a timestamp, 
         the merkle root of its transactions, the previous block hash, and the difficulty.
         */

/*
Block Hash :-
        :-All the information in the header of the block is hashed together to create a unique hash based on those properties.
*/

/*
Block Size :-
        :-There is a specific block size limit that cannot be exceeded.
        :-The number of transactions that will fit inside of a block varies due to transactions being of all different sizes.
        :-For the purposes of this exercise, we will use the MAX_TRANSACTIONS constant.
      */

/*
Target Difficulty :-
        :- In bitcoin, the difficulty is adjusted every 2016 blocks, which is about every two weeks with the blocks being mined on average every 10 minutes.
        
*/


//index.js
const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;
const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    let transactions=[];
    while(transactions.length<MAX_TRANSACTIONS && mempool.length>0){
        transactions.push(mempool.pop());
    }
    // TODO: mine a block
   const block={id:blocks.length,transactions}
   block.nonce=0;
   let hash;
   while(true){
        hash=SHA256(JSON.stringify(block)).toString();
        if(BigInt(`0x${hash}`)<TARGET_DIFFICULTY){
            break;
        }
        block.nonce++;
    }
    blocks.push({...block,hash});
} 


module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool
};


//test.js
const { assert } = require('chai');
const { mine, blocks, mempool, addTransaction, TARGET_DIFFICULTY } = require('../index');
const SHA256 = require('crypto-js/sha256');

describe('mine', () => {
    describe('with 5 mempool transactions', () => {
        before(() => {
            for (let i = 0; i < 5; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {
                assert.equal(blocks.length, 1);
            });
            it('should store the transactions on the block', () => {
                assert.equal(blocks[blocks.length - 1].transactions.length, 5);
            });
            it('should clear the mempool', () => {
                assert.equal(mempool.length, 0);
            });
            it('should have a nonce', () => {
                assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
            });
            it('should have a hash lower than the target difficulty', () => {
                const actual = blocks[blocks.length - 1].hash.toString();
                const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                assert(isLess, "expected the hash to be less than the target difficulty");
            });
        });
    });
    describe('with 15 mempool transactions', () => {
        before(() => {
            for (let i = 0; i < 15; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {
                assert.equal(blocks.length, 2);
            });
            it('should store the transactions on the block', () => {
                assert.equal(blocks[blocks.length - 1].transactions.length, 10);
            });
            it('should reduce the mempool to 5', () => {
                assert.equal(mempool.length, 5);
            });
            it('should have a nonce', () => {
                assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
            });
            it('should have a hash lower than the target difficulty', () => {
                const actual = blocks[blocks.length - 1].hash.toString();
                const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                assert(isLess, "expected the hash to be less than the target difficulty");
            });
            describe('after mining again', () => {
                before(() => {
                    mine();
                });
                it('should add to the blocks', () => {
                    assert.equal(blocks.length, 3);
                });
                it('should store the transactions on the block', () => {
                    assert.equal(blocks[blocks.length - 1].transactions.length, 5);
                });
                it('should clear the mempool', () => {
                    assert.equal(mempool.length, 0);
                });
                it('should have a nonce', () => {
                    assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
                });
                it('should have a hash lower than the target difficulty', () => {
                    const actual = blocks[blocks.length - 1].hash.toString();
                    const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                    assert(isLess, "expected the hash to be less than the target difficulty");
                });
            });
        });
    });
});
