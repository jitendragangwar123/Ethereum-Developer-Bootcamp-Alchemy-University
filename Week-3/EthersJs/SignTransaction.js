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

//sign.js
const ethers = require('ethers');
const { Wallet, utils } = ethers;
const { wallet1 } = require('./wallets');
const signaturePromise = wallet1.signTransaction({
    value: utils.parseEther('1.0'),
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92", 
    gasLimit: 0x5208,
});
module.exports = signaturePromise;

//test.js
const { assert } = require('chai');
const signaturePromise = require('../sign');
const { utils } = require('ethers');
describe('signaturePromise', () => {
    it('should be an instance of Promise', () => {
        assert(signaturePromise instanceof Promise);
    });

    it('should resolve with a hexadecimal representation of the transaction', async () => {
        const hex = await signaturePromise;
        const matches = /^0x[0-9A-Fa-f]*$/.test(hex);
        if(!matches) console.log(hex);
        assert(matches, 'did not match the expect hash output');
    });

    describe('parsed properties', () => {
        let parsed;
        before(async () => {
            const hex = await signaturePromise;
            parsed = utils.parseTransaction(hex);
        });

        it('should contain the to address', () => {
            assert.equal(parsed.to, "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92");
        });

        it('should contain the value', () => {
            assert.equal(parsed.value.toString(), "1000000000000000000");
        });

        it('should have the appropriate gas limit for transfers', () => {
            assert(parsed.gasLimit.eq(21000), "The gas limit should be 21000");
        });

        it('should derive the from address', () => {
            assert.equal(parsed.from, "0x5409ED021D9299bf6814279A6A1411A7e866A631");
        });
    });
});
