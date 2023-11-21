//getBalance.js
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getBalance(address) {
    const response = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance", 
        params: [address,"latest"],  
    });

    //return the balance of the address
    return response.data.result;
}
module.exports = getBalance;

//test.js
const { assert, util: { inspect } } = require('chai');
const getBalance = require('../getBalance');
describe('getBalance', () => {
    it('should find the balance of the address with 10 ether', async () => {
        const balance = await getBalance("0x3bfc20f0b9afcace800d73d2191166ff16540258");
        const parsed = parseInt(balance);
        assert(!isNaN(parsed), `We expected you to return a balance, here is what you returned: ${inspect(balance)}`);
        assert.isAbove(parsed, 0x40db451e4e74a0311e90);
    });
});
