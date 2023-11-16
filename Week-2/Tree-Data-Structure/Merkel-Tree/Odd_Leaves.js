/*
      Root
     /    \
    ABCD   E
    / \    |
   AB  CD  E
  / \  / \ |
  A B  C D E
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
            if(right){
                layer.push(this.concat(left,right));
            }
            else{
                layer.push(left);
            }
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

  it('should create a root from three leaves: [A,B,C]', function() {
    const leaves = ['A', 'B', 'C'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(A + B) + C)");
  });
  
  it('should create a root from five leaves: [A,B,C,D,E]', function () {
    const leaves = ['A', 'B', 'C', 'D', 'E'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(Hash(A + B) + Hash(C + D)) + E)");
  });

  it('should create a root from seven leaves: [A,B,C,D,E,F,G]', function () {
    const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const merkleTree = new MerkleTree(leaves, concat);
    assert.equal(merkleTree.getRoot(), "Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + G))");
  });
});
