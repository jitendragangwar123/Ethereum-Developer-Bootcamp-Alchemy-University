/*
const tree = new Tree();
const node1 = new Node(5);
const node2 = new Node(3);
const node3 = new Node(7);
tree.addNode(node1);
tree.addNode(node2);
tree.addNode(node3);
console.log(tree.root.left.data); // 3
console.log(tree.root.right.data); // 7
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
        if(node.data<this.root.data){
            this.root.left=node;
        }
        if(node.data>this.root.data){
            this.root.right=node;
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
            tree.addNode(new Node(5));
        });

        it('should have a root', () => {
            assert(tree.root, "did not find a root on the tree");
            assert.equal(tree.root.data, 5);
        });

        describe('after adding a lesser node', () => {
            before(() => {
                tree.addNode(new Node(3));
            });

            it('should have add a left to the root', () => {
                assert(tree.root.left, "did not find a left node on the root!");
                assert.equal(tree.root.left.data, 3);
            });
        });

        describe('after adding a greater node', () => {
            before(() => {
                tree.addNode(new Node(7));
            });

            it('should have add a right to the root', () => {
                assert(tree.root.right, "did not find a right node on the root!");
                assert.equal(tree.root.right.data, 7);
            });
        });
    });
});
