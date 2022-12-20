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


/*
Sign Message :-
            To sign a message using our private key to prove our intention!
Steps:-
1.When signing a message with secp256k1 we can return the signature along with the recovery bit, 
allowing us to recover the public key from the signature. This will allow a blockchain node to take a signature of a transaction 
and understand which address authenticated this particular transaction.

2.The sign method takes an optional third parameter called options, which you'll see in the documentation. 
Use this parameter to return the recovered bit so that the public key can be recovered from this signature.

*/

//signMessage.js
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hashMessage');

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
    const messageHash=hashMessage(msg);
    return secp.sign(messageHash,PRIVATE_KEY,{recovered:true});
}

module.exports = signMessage;

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
const signMessage = require('../signMessage');
const hashMessage = require('../hashMessage');
const { assert } = require('chai');
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

describe('Sign Message', () => {
    it('should return both a signature and a recovery bit', async () => {
        const response = await signMessage('hello world');

        const errMessage = "expected signMessage to return both a signature and recovery bit!";
        assert(response.length, errMessage);
        assert(response.length === 2, errMessage);

        const [signature, recoveryBit] = response;
        assert(signature.length, "expected signature to be a Uint8Array");
        assert(typeof recoveryBit === "number", "expected the recovery bit to be a number");
    });

    it('should have been signed by the same private key', async () => {
        const [sig, recoveryBit] = await signMessage('hello world');
        const messageHash = hashMessage('hello world');
        const recovered = secp.recoverPublicKey(messageHash, sig, recoveryBit);

        const publicKey = secp.getPublicKey(PRIVATE_KEY);
        assert.equal(toHex(recovered), toHex(publicKey));
    });
});
