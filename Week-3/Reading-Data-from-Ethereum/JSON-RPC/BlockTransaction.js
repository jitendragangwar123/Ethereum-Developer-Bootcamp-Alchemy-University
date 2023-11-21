/*
1. Ethereum blocks contain a list of transactions.
2. A transfer costs 21000 gas.
*/

//getTotalTransactions.js
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;
async function getTotalTransactions(blockNumber) {
    const response = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockByNumber",
        params: [ 
            blockNumber, 
            false
        ],
    });
    
    return response.data.result.transactions.length;
}
module.exports = getTotalTransactions;

//test.js
const { assert, util: { inspect } } = require('chai');
const getTotalTransactions = require('../getTotalTransactions');
describe('getTotalTransactions', () => {
    it('should work for an empty block', async () => {
        const numTx = await getTotalTransactions('0x' + (12379).toString(16));
        const parsed = parseInt(numTx);
        assert(!isNaN(parsed), `We expected you to return a transactions count, here is what you returned: ${inspect(numTx)}`);
        assert.equal(parsed, 0);
    });

    it('should work for a recent block', async () => {
        const numTx = await getTotalTransactions('0x' + (16642379).toString(16));
        const parsed = parseInt(numTx);
        assert(!isNaN(parsed), `We expected you to return a transactions count, here is what you returned: ${inspect(numTx)}`);
        assert.equal(parsed, 206);
    });
});
