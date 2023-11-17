/*
const trie = new Trie();
trie.insert('happy');
trie.insert('healthy');

console.log( trie.contains('happy') ); // true
console.log( trie.contains('healthy') ); // true
*/

//TrieNode.js
class TrieNode {
    constructor(key) {
        this.key=key;
        this.children={};
        this.isWord=false;
    }
}
module.exports = TrieNode;

//Trie.js
const TrieNode = require('./TrieNode');
class Trie {
    constructor() {
        this.root=new TrieNode(null);
    }
    insert(word){
        let node=this.root;
        for(let i=0;i<=word.length-1;i++){
            if (!node.children[word[i]]){
                node.children[word[i]]=new TrieNode(word[i]);
            }
            node=node.children[word[i]];
            if(i == word.length-1){
                node.isWord=true;
            }
        }
    }

    contains(word){
        let node = this.root;
        for (let i = 0; i <= word.length - 1; i++) {
            if (node.children[word[i]]){
                node=node.children[word[i]];
            }
            else{
                return false;
            } 
        }
        return node.isWord;
    }
}
module.exports = Trie;

//test.js
const { assert } = require('chai');
const Trie = require('../Trie');
const TrieNode = require('../TrieNode');

describe('Trie', () => {
    describe('with a single word', () => {
        let trie;
        beforeEach(() => {
            trie = new Trie();
            trie.insert('hey');
        });

        it('should properly detect words that are contained', () => {
            assert(trie.contains('hey'), "Expected the trie to contain `hey`!");
        });

        it('should properly detect words that are not contained', () => {
            assert(!trie.contains('hello'), "Expected the trie to not contain `hello`!");
            assert(!trie.contains('he'), "Expected the trie to not contain `he`!");
            assert(!trie.contains('hi'), "Expected the trie to not contain `hi`!");
            assert(!trie.contains('heya'), "Expected the trie to not contain `heya`!");
        });
    });
});
