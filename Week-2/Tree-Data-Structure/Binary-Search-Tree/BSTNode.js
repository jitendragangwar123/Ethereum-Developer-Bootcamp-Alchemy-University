/*
const node = new Node(5);
console.log(node.data); // 5
console.log(node.left); // null
console.log(node.right); // null
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

//test.js
const Node = require('../Node');
const { assert } = require('chai');

describe('node', () => {
    const data = 3;
    const node = new Node(data);

    it('should store data', () => {
        assert.equal(node.data, 3);
    });

    it('should have a null left', () => {
        assert.strictEqual(node.left, null);
    });

    it('should have a null right', () => {
        assert.strictEqual(node.right, null);
    });
});
