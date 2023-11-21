/*
Goal:
   The findEther function is passed an address which has sent ether to several addresses. 
   The goal of this function is to find every address that has received ether and return it in an array of addresses.
*/

//config.js
const { utils } = require('ethers');
const Ganache = require("ganache-core");
const PRIVATE_KEY = "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d";
const INITIAL_BALANCE = utils.parseEther('10');

// create our test account from the private key, initialize it with 10 ether
const accounts = [].concat([{
    balance: INITIAL_BALANCE.toHexString(),
    secretKey: PRIVATE_KEY,
}]);

const ganacheProvider = Ganache.provider({ accounts });

module.exports = {
    INITIAL_BALANCE,
    PRIVATE_KEY,
    ganacheProvider,
}


//findEther.js
const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexadecimal address for the sender
 * @async
 * @returns {Array} all the addresses that received ether
 */
async function findEther(address) {
    const addresses=[];
    const blockNumber=await provider.getBlockNumber();
    for(let i=0;i<=blockNumber;i++){
        const block=await provider.getBlockWithTransactions(i);
        block.transactions.forEach((tx)=>{
            if(tx.from===address){
                addresses.push(tx.to);
            }
        });
        
    }
    return addresses;
}

module.exports = findEther;

//test.js
const { assert } = require('chai');
const { PRIVATE_KEY, ganacheProvider } = require('../config');
const { utils, Wallet, providers } = require('ethers');
const findEther = require('../findEther');

const FROM_ADDRESS = "0x5409ED021D9299bf6814279A6A1411A7e866A631";
const provider = new providers.Web3Provider(ganacheProvider);
const wallet = new Wallet(PRIVATE_KEY, provider);

function rpc(method) {
    return new Promise((resolve, reject) => {
        ganacheProvider.send({ id: 1, jsonrpc: "2.0", method }, () => {
            resolve();
        });
    });
}

const stopMiner = () => rpc('miner_stop');
const mineBlock = () => rpc('evm_mine');

describe('findEther', () => {
    const expected = [];

    const sendEther = async (i) => {
        const address = Wallet.createRandom().address;
        await wallet.sendTransaction({
            value: utils.parseEther(".5"),
            to: address,
            nonce: i,
        });
        expected.push(address);
    }

    before(async () => {
        stopMiner();
        let i = 0; 
        // block 1
        for (; i < 3; i++) await sendEther(i);
        await mineBlock();
        // block 2
        for (; i < 7; i++) await sendEther(i);
        await mineBlock();
        // block 3
        for (; i < 10; i++) await sendEther(i);
        await mineBlock();
    });

    it('should find all the addresses', async () => {
        const actual = await findEther(FROM_ADDRESS);
        const err = `Sent ether to ${expected.length} addresses, you returned ${actual.length}`;
        assert.equal(actual.length, expected.length, err);
        assert.sameMembers(actual, expected);
    });
});
