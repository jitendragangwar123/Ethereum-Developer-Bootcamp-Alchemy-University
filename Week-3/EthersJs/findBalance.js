//findMyBalance.js
const { Wallet, providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

function findMyBalance(privateKey) {
    // retrieve the balance, given a private key
    const wallet=new Wallet(privateKey,provider);
    return wallet.getBalance();
}
module.exports = findMyBalance;

//test.js
const { assert } = require('chai');
const findMyBalance = require('../findMyBalance')
const { PRIVATE_KEY, INITIAL_BALANCE } = require('../config');

describe('findMyBalance', () => {
    it('should return an instance of Promise', () => {
        assert(findMyBalance(PRIVATE_KEY) instanceof Promise);
    });
    it('should resolve with the initial balance', async () => {
        const balance = await findMyBalance(PRIVATE_KEY);
        assert(INITIAL_BALANCE.eq(balance));
    });
});
