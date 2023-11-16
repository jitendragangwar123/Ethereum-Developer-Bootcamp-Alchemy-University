/*
const tree = new Tree();
console.log(tree.root); // null
*/

//Node.js
class Node {
    constructor(data) {
        this.data=data;
        this.left=null;;
        this.right=null;;
    }
}
module.exports = Node;

//Tree.js
class Tree {
    constructor() {
        this.root=null;
    }
}
module.exports = Tree;

//test.js
const Tree = require('../Tree');
const { assert } = require('chai');

describe('tree', () => {
    const tree = new Tree();
    
    it('should have a null root', () => {
        assert.strictEqual(tree.root, null);
    });
});
