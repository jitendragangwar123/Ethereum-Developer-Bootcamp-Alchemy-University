/*
The average case for verification of tree is log2(n) where n is the number of nodes in the tree. So for a tree of size 128, 
it would take only 7 hashes to determine the root.
*/

//index.js
class MerkleTree {
    //leaves -->An array of leaf nodes
    //concat -->A combination function used to concatenate and hash two leaves together
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot(leaves=this.leaves) {
        if(leaves.length===1){
            return leaves[0];
        } 

        const layer=[];  
        for(let i=0;i<leaves.length;i+=2){
            const left=leaves[i];
            const right=leaves[i+1];
            layer.push(this.concat(left,right));
            
        }
        return this.getRoot(layer);
    }
    
}
module.exports = MerkleTree;

//test.js
const MerkleTree = require('../index');
const { assert } = require('chai');

const concat = (a, b) => `Hash(${a} + ${b})`;

describe('merkle', function () {
  it('should handle the base case: [A]', function () {
    const leaves = ['A'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "A");
  });

  it('should create a root from two leaves: [A,B]', function () {
    const leaves = ['A', 'B'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(A + B)");
  });

  it('should create a root from four leaves: [A,B,C,D]', function () {
    const leaves = ['A', 'B', 'C', 'D'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(A + B) + Hash(C + D))");
  });

  it('should create a root from eight leaves: [A,B,C,D,E,F,G,H]', function () {
    const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H)))");
  });
});
