/*
1. The Ethereum Blockchain adds a new block about every 12 seconds.
2. The first Ethereum block was block #0 mined on July 30th, 2015. 
*/

//getBlockNumber.js
const axios = require('axios');
// grab the API key from the .env
require('dotenv').config();
const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`;

async function getBlockNumber() {
    const response = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber", 
    });
    // return the block number
    return response.data.result;
}
module.exports = getBlockNumber;

//test.js
const { assert, util: { inspect }} = require('chai');
const getBlockNumber = require('../getBlockNumber');
describe('getBlockNumber', function () {
    it('should get the current block number', async () => {
        const blockNumber = await getBlockNumber();
        const parsed = parseInt(blockNumber);
        assert(!isNaN(parsed), `We expected you to return a block number, here is what you returned: ${inspect(blockNumber)}`);
        assert.isAbove(parseInt(blockNumber), 0xfde2cf);
    });
});
