/*
1. The account nonce is simply a counter of all the transactions sent by an address. 
2. Every time you send a transaction from your account the counter goes up by 1.
*/

//getNonce.js
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;
async function getNonce(address) {
    const response = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getTransactionCount", 
        params: [address,"latest"], 
    });
    // return the nonce for the address
    return response.data.result;
}
module.exports = getNonce;

//test.js
const { assert, util: { inspect } } = require('chai');
const getNonce = require('../getNonce');
describe('getNonce', () => {
    it('should get the nonce for the zero address', async () => {
        const nonce = await getNonce("0x0000000000000000000000000000000000000000");
        const parsed = parseInt(nonce);
        assert(!isNaN(parsed), `We expected you to return a nonce, here is what you returned: ${inspect(nonce)}`);
        assert.equal(parsed, 0);
    });

    it('should get the nonce for vitalik.eth', async () => {
        const nonce = await getNonce("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
        const parsed = parseInt(nonce);
        assert(!isNaN(parsed), `We expected you to return a nonce, here is what you returned: ${inspect(nonce)}`);
        assert.isAbove(parsed, 1015);
    });
});
