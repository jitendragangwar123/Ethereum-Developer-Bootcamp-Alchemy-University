
/*
Hash Function :-
            A hash function is a function which takes an input of any size and turns it into a fixed size output. 
            Let's imagine a hash function that takes an input of any size and returns a fixed 32 byte output.
*/
            

/*
Rainbow Table :-
          A rainbow table is simply a table which maps common inputs to their hash output.
COMMON PASSWORDS	SHA256 HASH
password	0x5e8848...1542d8
qwerty	0x65e84b...2337c5
111111	0xbcb15f...09802a
12345678	0xef797c...98a64f
abc123	0x6ca13d...118090

*/

/*
How to create and compare SHA256 hashes using ethereum-crypto (a library we’ll make quite a bit of use of throughout this course):-

:-To take the hash of a color, first use utf8ToBytes to translate the string to bytes. Then, use sha256 to hash it.
:-When you want to compare two hashes, first use toHex to turn each hash from a Uint8Array to a string of hexadecimal characters.

const a = "apple";
const b = "banana";

const aBytes = utf8ToBytes(a);
const bBytes = utf8ToBytes(b);

const aHash = sha256(aBytes);
const bHash = sha256(bBytes);

console.log(toHex(aHash) === toHex(aHash)); // true
console.log(toHex(aHash) === toHex(bHash)); // false
*/

//index.js
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
    return COLORS.find((color)=>
        toHex(sha256(utf8ToBytes(color)))===toHex(hash)
    );
}

module.exports = findColor;

//test.js
const {assert} = require('chai');
const findColor = require('../index');
const { sha256 } = require("ethereum-cryptography/sha256");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

describe('findColor', () => {
    COLORS.forEach((color) => {
        it(`should work for ${color}`, () => {
            assert.equal(findColor(sha256(utf8ToBytes(color))), color);
        });
    });
});
