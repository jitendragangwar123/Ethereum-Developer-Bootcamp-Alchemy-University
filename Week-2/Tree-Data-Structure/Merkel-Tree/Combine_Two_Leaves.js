/*
Combine Two Leaves:
   1. A merkle tree will take an array of leaf nodes, combining them together two at a time, layer-by-layer, 
  until they are reduced to a single root node. This forms a tree-like structure of hashing.
*/

/*
Combination Function:
  1. This function will take two arguments: a left leaf node and a right leaf node and will return the resulting combination.
   Root   
    / \    
   AB  CD  
  / \  / \ 
  A B  C D
  
  2. Hash(Hash(A + B) + Hash(C + D))
*/

//index.js
class MerkleTree {
    //leaves -->An array of leaf nodes
    //concat -->A combination function used to concatenate and hash two leaves together
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot() {
        return this.concat(this.leaves[0], this.leaves[1]);
    }
}

module.exports = MerkleTree;

//test.js
const {assert} = require('chai');
const MerkleTree = require('../index');

describe('merkle', function() {
  it('should create a root from two leaves: [A,B]', function() {
    const leaves = ['A', 'B'];
    const concat = (a, b) => `Hash(${a} + ${b})`;

    const merkleTree = new MerkleTree(leaves, concat);

    assert.equal(merkleTree.getRoot(), "Hash(A + B)");
  });
});
