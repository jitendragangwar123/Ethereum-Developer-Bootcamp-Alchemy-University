//sendEther.js
const ethers = require('ethers');
const { Wallet, utils } = ethers;
const { ganacheProvider, PRIVATE_KEY } = require('./config');
const provider = new ethers.providers.Web3Provider(ganacheProvider);

// create a wallet with a private key and connect it to the ethers provider
const wallet = new Wallet(PRIVATE_KEY, provider);

async function sendEther({ value, to }) {
    // broadcast the transaction to the ethereum network
    return wallet.sendTransaction({ value, to });
}

module.exports = sendEther;

//test.js
const { assert } = require('chai');
const sendEther = require('../sendEther');
const ethers = require('ethers');
const { ganacheProvider } = require('../config');

const provider = new ethers.providers.Web3Provider(ganacheProvider);
describe('sendEther', () => {
    before(async () => {
        const props = {
            value: ethers.utils.parseEther("1.0"),
            to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
        }
        await sendEther(props);
        await sendEther(props);
        await sendEther(props);
    });
    
    it('should have mined three blocks', async () => {
        const blockNumber = await provider.getBlockNumber();
        assert.equal(blockNumber, 3);
    });
});
