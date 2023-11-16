//index.js
class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot(leaves = this.leaves) {
        if (leaves.length === 1) {
            return leaves[0];
        }
        const layer = [];
        for (let i = 0; i < leaves.length; i += 2) {
            const left = leaves[i];
            const right = leaves[i + 1];
            if (right) {
                layer.push(this.concat(left, right));
            }
            else {
                layer.push(left);
            }
        }
        return this.getRoot(layer);
    }
    getProof(index, layer = this.leaves, proof = []) {
        if (layer.length === 1) return proof;
        const newLayer = [];
        for (let i = 0; i < layer.length; i += 2) {
            let left = layer[i];
            let right = layer[i + 1];
            if (!right) {
                newLayer.push(left);
            }
            else {
                newLayer.push(this.concat(left, right));

                if (i === index || i === index - 1) {
                    let isLeft = !(index % 2);
                    proof.push({
                        data: isLeft ? right : left,
                        left: !isLeft
                    });
                }
            }
        }
        return this.getProof(Math.floor(index / 2), newLayer, proof);
    }
}

module.exports = MerkleTree;



//testUtil.js
const crypto = require("crypto");
const {assert} = require("chai");
// use the crypto module to create a sha256 hash from the data passed in
function sha256(data) {
    return crypto.createHash('sha256').update(data).digest();
}
// the concat function we use to hash together merkle leaves
function concatHash(left, right) { 
    if (!left) throw new Error("The concat function expects two hash arguments, the first was not received.");
    if (!right) throw new Error("The concat function expects two hash arguments, the second was not received.");
    return sha256(Buffer.concat([left, right]));
}
// the concat function we use to show the merkle root calculation
function concatLetters(left, right) {
    return `Hash(${left} + ${right})`;
}
// given a proof, finds the merkle root
function hashProof(node, proof) {
    let data = sha256(node);
    for (let i = 0; i < proof.length; i++) {
        const buffers = (proof[i].left) ? [proof[i].data, data] : [data, proof[i].data];
        data = sha256(Buffer.concat(buffers));
    }
    return data;
}
module.exports = {concatHash, concatLetters, hashProof, sha256}



//testProof.js
const {assert} = require("chai");
const {hashProof, sha256, concatHash, concatLetters} = require('./testUtil');
const MerkleTree = require('../index');

describe('merkle proof', function() {
  const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const root = 'eb100814abc896ab18bcf6c37b6550eeadeae0c312532286a4cf4be132ace526';
  const hashTree = new MerkleTree(leaves.map(sha256), concatHash);
  const lettersTree = new MerkleTree(leaves, concatLetters);

  describe('for each leaf', function() {
    leaves.forEach((leaf, i) => {
      it(`should return a proof that calculates the root from leaf ${leaves[i]}`, function() {
        const proof = hashTree.getProof(i);
        const hashedProof = hashProof(leaf, proof).toString('hex');
        if(hashedProof !== root) {
          const lettersProof = lettersTree.getProof(i);
          console.log(
            "The resulting hash of your proof is wrong. \n" +
            `We were expecting: ${root} \n` +
            `We received: ${hashedProof} \n` +
            `In ${leaves.join('')} Merkle tree, the proof of ${leaves[i]} you gave us is: \n` +
            `${JSON.stringify(lettersProof, null, 2)}`
          );
        }
        assert.equal(hashedProof, root);
      });
    });
  });
});

