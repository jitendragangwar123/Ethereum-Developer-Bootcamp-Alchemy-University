//Tree.js
class Tree {
    constructor() {
        this.root=null;
    }
    addNode(node){
        if(!this.root){
            this.root=node;
            return 
        }
        let ptr=this.root;
        while(true){
            if(node.data<ptr.data){
                if(!ptr.left){
                    ptr.left=node;
                    break;
                }
                else{
                    ptr=ptr.left;
                }
            }
            if(node.data>ptr.data){
                if(!ptr.right){
                    ptr.right=node;
                    break;
                }
                else{
                    ptr=ptr.right;
                }
            }
        }
    }
}
module.exports = Tree;

//Node.js
class Node {
    constructor(data) {
        this.data=data;
        this.left=null;;
        this.right=null;;
    }
}
module.exports = Node;

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

            describe('after adding another lesser node', () => {
                before(() => {
                    tree.addNode(new Node(2));
                });

                it('should have add to the left node', () => {
                    assert(tree.root.left.left, "did not find a second left node on the root!");
                    assert.equal(tree.root.left.left.data, 2);
                });
            });

            describe('after adding another lesser node', () => {
                before(() => {
                    tree.addNode(new Node(4));
                });

                it('should have add to the left node', () => {
                    assert(tree.root.left.right, "did not find a right on the left node on the root!");
                    assert.equal(tree.root.left.right.data, 4);
                });
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

            describe('after adding another lesser node', () => {
                before(() => {
                    tree.addNode(new Node(6));
                });

                it('should have add to the left node', () => {
                    assert(tree.root.right.left, "did not find a left on the right node on the root!");
                    assert.equal(tree.root.right.left.data, 6);
                });
            });

            describe('after adding another lesser node', () => {
                before(() => {
                    tree.addNode(new Node(8));
                });

                it('should have add to the left node', () => {
                    assert(tree.root.right.right, "did not find a second right node on the root!");
                    assert.equal(tree.root.right.right.data, 8);
                });
            });
        });
    });
});
