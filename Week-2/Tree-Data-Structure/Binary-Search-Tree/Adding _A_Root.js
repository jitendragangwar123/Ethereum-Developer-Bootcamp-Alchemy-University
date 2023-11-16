/*
// create a new tree and new node
const tree = new Tree();
const node = new Node(5);

// add the node to the tree using addNode
tree.addNode(node);

// the new node becomes the tree's root
console.log(tree.root.data); // 5
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
    addNode(node){
        if(!this.root){
            this.root=node;
        }
    }
}

module.exports = Tree;

//test.js
const Tree = require('../Tree');
const Node = require('../Node');
const { assert } = require('chai');

describe('tree', () => {
    const tree = new Tree();

    it('should have a null root', () => {
        assert.strictEqual(tree.root, null);
    });

    describe('after adding a node', () => {
        before(() => {
            tree.addNode(new Node(2));
        });

        it('should have a root', () => {
            assert(tree.root, "did not find a root on the tree");
            assert.equal(tree.root.data, 2);
        });
    });
}); 
