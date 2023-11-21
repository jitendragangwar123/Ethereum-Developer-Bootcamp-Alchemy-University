/*
In ethers.js you can create a new wallet by invoking its constructor with a private key, or by using the .fromMnemonic method.
*/

//wallets.js
const ethers = require('ethers');
const { Wallet } = ethers;
// create a wallet with a private key
const wallet1 = new Wallet( "0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d");

// create a wallet from mnemonic
const wallet2 = Wallet.fromMnemonic( "plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice");

module.exports = {
    wallet1,
    wallet2,
}

//test.js
const { assert } = require('chai');
const { wallet1, wallet2 } = require('../wallets');
const { Wallet } = require('ethers');
describe('wallets', () => {
    describe('wallet 1', () => {
        it('should be an instance of wallet', () => {
            assert(wallet1 instanceof Wallet);
        });

        it('should unlock the expected address', () => {
            assert.equal(wallet1.address, "0x5409ED021D9299bf6814279A6A1411A7e866A631");
        });
    });
    describe('wallet 2', () => {
        it('should be an instance of wallet', () => {
            assert(wallet2 instanceof Wallet);
        });

        it('should unlock the expected address', () => {
            assert.equal(wallet2.address, "0x88E9DD325BA8329dDD9825c1d24e8470b25575C1");
        });
    });
});
