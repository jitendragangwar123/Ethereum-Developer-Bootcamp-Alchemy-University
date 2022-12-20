/*
RSA and ECDSA are two popularly used algorithms for public key cryptography.

RSA:- The RSA algorithm is based on the idea that it's very easy to find the product of two prime numbers, 
      yet extremely difficult to factor out those two prime numbers if you have the product.
ECDSA:-The ECDSA algorithm uses elliptic curves. It can provide the same level security as other public key algorithms with smaller key sizes, 
       which is the reason it's become quite popular. It is the Digital Signing Algorithm used by Bitcoin, specifically the secp256k1 curve. 
*/

/*
:- The first step in ECDSA is to hash the message before applying the signature algorithm.
// turn this into an array of bytes, the expected format for the hash algorithm
const bytes = utf8ToBytes("Vote Yes on Proposal 327");
// hash the message using keccak256
const hash = keccak256(bytes); 
console.log(toHex(hash)); // 928c3f25193b338b89d5646bebbfa2436c5daa1d189f9c565079dcae379a43be
*/

//hashMessage.js
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    const bytes=utf8ToBytes(message);
    const hash=keccak256(bytes);
    return hash;
    
}

module.exports = hashMessage;

//test.js
const hashMessage = require('../hashMessage');
const { assert } = require('chai');
const { toHex } = require("ethereum-cryptography/utils");

const helloWorldHex = '47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad';

describe('Hash Message', () => {
    it('should return the keccak256 hash of hello world', () => {
        const messageHash = hashMessage('hello world');

        assert.equal(toHex(messageHash), helloWorldHex);
    });
});
