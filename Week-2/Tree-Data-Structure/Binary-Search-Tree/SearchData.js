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
        this.root = null;
    }

    hasNode(data) {
        return this.searchRoot(this.root, data)
    }

    searchRoot(root, data) {
        if(!root) {
            return false;
        }
        if(root.data === data) {
            return true;
        }
        if(root.data > data) {
            return this.searchRoot(root.left, data);
        }
        if(root.data < data) {
            return this.searchRoot(root.right, data);
        }
    }

    addNode(node) {
        if(!this.root) {
            this.root = node;
        }
        this.addToRoot(this.root, node);
    }

    addToRoot(root, node) {
        if (node.data < root.data) {
            if (!root.left) {
                root.left = node;
            }
            else {
                this.addToRoot(root.left, node);
            }
        }

        if (node.data > root.data) {
            if (!root.right) {
                root.right = node;
            }
            else {
                this.addToRoot(root.right, node);
            }
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

    describe('after adding 5', () => {
        before(() => {
            tree.addNode(new Node(5));
        });

        it('should have a root', () => {
            assert(tree.root, "did not find a root on the tree");
            assert.equal(tree.root.data, 5);
        });

        it('should find 5', () => {
            assert(tree.hasNode(5), "did not find a node with data 5");
        });

        it('should not find 4', () => {
            assert.isNotTrue(tree.hasNode(4));
        });

        describe('after adding 3', () => {
            before(() => {
                tree.addNode(new Node(3));
            });

            it('should have add a left to the root', () => {
                assert(tree.root.left, "did not find a left node on the root!");
                assert.equal(tree.root.left.data, 3);
            });

            it('should find 3', () => {
                assert(tree.hasNode(3), "did not find a node with data 3");
            });

            it('should not find 4', () => {
                assert.isNotTrue(tree.hasNode(4));
            });

            describe('after adding 4', () => {
                before(() => {
                    tree.addNode(new Node(4));
                });

                it('should have add to the left node', () => {
                    assert(tree.root.left.right, "did not find a right on the left node on the root!");
                    assert.equal(tree.root.left.right.data, 4);
                });

                it('should find 4', () => {
                    assert(tree.hasNode(4), "did not find a node with data 4");
                });
            });
        });

        describe('after adding 7', () => {
            before(() => {
                tree.addNode(new Node(7));
            });

            it('should have add a right to the root', () => {
                assert(tree.root.right, "did not find a right node on the root!");
                assert.equal(tree.root.right.data, 7);
            });

            it('should find 7', () => {
                assert(tree.hasNode(7), "did not find a node with data 7");
            });
        });
    });
});
