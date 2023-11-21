//donate.js
const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');
const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} a hex string private key for a wallet with 10 ETH
 * @param   {array} an array of ethereum charity addresses 
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
    // TODO: donate to charity!
    const value= utils.parseEther("1.0");
    const wallet=new Wallet(privateKey,provider);
    for(let i=0;i<charities.length;i++){
        let charity=charities[i];
        await wallet.sendTransaction({
            value:value,
            to:charity
        });
    }
}
module.exports = donate;

//test.js
const { assert } = require('chai');
const donate = require('../donate');
const { PRIVATE_KEY, ganacheProvider } = require('../config');

const ethers = require('ethers');
const provider = new ethers.providers.Web3Provider(ganacheProvider);

const charities = [
    '0xBfB25955691D8751727102A59aA49226C401F8D4',
    '0xd364d1F83827780821697C787A53674DC368eC73',
    '0x0df612209f74E8Aa37432c14F88cb8CD2980edb3',
]

const donationPromise = donate(PRIVATE_KEY, charities);
describe('donate', () => {
    it('should return an instance of Promise', () => {
        assert(donationPromise instanceof Promise);
    });
    it('should increase the balance of each charity', async () => {
        await donationPromise;
        for(let i = 0; i < charities.length; i++) {
            const charity = charities[i];
            const balance = await provider.getBalance(charities[i]);
            assert.isAtLeast(+balance, +ethers.utils.parseEther("1.0"));
        }
    });
});
