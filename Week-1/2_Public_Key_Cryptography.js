/*
Symmetric Key Encryption :- 
1. It only requires a single key for both encryption and decryption.
2. The encryption process is very fast.
3. Security is less as only one key is used for both encryption and decryption purpose.
4. The length of key used is 128 or 256 bits.
5. The size of cipher text is the same or smaller than the original plain text.
6. The Mathematical Representation is as follows-
      P = D (K, E(P))

      where K –> encryption and decryption key
      P –> plain text
      D –> Decryption 
      E(P) –> Encryption of plain text
      
 7. Examples: 3DES, AES, DES and RC4     
*/

/*
Asymmetric Key Encryption :- 
1. It requires two keys, a public key and a private key, one to encrypt and the other one to decrypt.
2. The encryption process is slow.
3. The size of cipher text is the same or larger than the original plain text.
4. The  length of key used is 2048 or higher
5. It is more secure as two keys are used here- one for encryption and the other for decryption.
6. The Mathematical Representation is as follows-
      P = D(Kd, E (Ke,P))
      where Ke –> encryption key

      Kd –> decryption key
      D –> Decryption
      E(Ke, P) –> Encryption of plain text using encryption key Ke . P –> plain text
      
7. Examples: Diffie-Hellman, ECC, El Gamal, ECDSA and RSA     
*/

/*
Note :- public key cryptography is considered asymmetric encryption in that only one party has access to the private key.
*/

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
Steps:

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


/*
Recover the Public Key :-
                  1.When the signature is passed with all of its components (recovery bit included), the public key can be recovered. 
                  2.This means that blockchain nodes will be able to understand who signed the transaction that was sent to them. 
*/

//recoverKey.js
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    const messageHash=hashMessage(message);
    return secp.recoverPublicKey(messageHash,signature,recoveryBit);
}

module.exports = recoverKey;

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
const recover = require('../recoverKey');
const secp = require("ethereum-cryptography/secp256k1");
const { assert } = require('chai');
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

describe('Recover Key', () => {
    it('should recover the public key from a signed message', async () => {
        const [sig, recoveryBit] = await signMessage('hello world');

        const publicKey = secp.getPublicKey(PRIVATE_KEY);

        const recovered = await recover('hello world', sig, recoveryBit);

        assert.equal(toHex(recovered), toHex(publicKey));
    });
});

/*
Public Key to Address :-
                  1.Bitcoin and Ethereum both have a transformation process to take a public key and turn it into an address.
                  2.For Bitcoin it includes a checksum and Base58 encoding.
                  3.Ethereum's address transformation is quite a bit simpler, its address is the last 20 bytes of the hash of the public key.
                  4.The first byte indicates the format of the key, whether it is in the compressed format or not.
                  5.The publicKey will be a Uint8Array so you can use the slice method to slice off the first byte.
*/

//getAddress.js

const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    // the first byte indicates whether this is in compressed form or not
    return keccak256(publicKey.slice(1)).slice(-20);
}

module.exports = getAddress;

//test.js
const getAddress = require('../getAddress');
const secp = require("ethereum-cryptography/secp256k1");
const { assert } = require('chai');
const { toHex } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
const EXPECTED_ADDRESS = "16bB6031CBF3a12B899aB99D96B64b7bbD719705";

describe('Get Address', () => {
    it('should get the address from a public key', async () => {
        const publicKey = secp.getPublicKey(PRIVATE_KEY);
        
        const address = toHex(getAddress(publicKey));

        assert.equal(address.toLowerCase(), EXPECTED_ADDRESS.toLowerCase());
    });
});
