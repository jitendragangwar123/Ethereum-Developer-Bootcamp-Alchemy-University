/*
Introduction:
    1. Ethereum makes use a data structure called a radix trie, also referred to as a Patricia trie or a radix tree and combines this data structure 
    with a Merkle tree to create a Patricia Merkle Trie.
    2. Patricia Trie + Merkle Tree = Patricia Merkle Trie
*/
/*
Radix Trie:
    A radix trie is a tree-like data structure that is used to retrieve a string value by traversing down a branch of nodes 
    that store associated references (keys) that together lead to the end value that can be returned:
*/

/*
 Merkle Patricia trie:
    1. A Merkle Patricia trie is a data structure that stores key-value pairs, just like a hash table. 
    2. In addition to that, it also allows us to verify data integrity and the inclusion of a key-value pair.
    3. Merkle Patricia trie groups similar-value nodes together in the tree. 
*/

/*
There are typically two different types of data:
    1. Permanent
        - Once a transaction occurs, that record is sealed forever.
        - This means that once you locate a transaction in a block’s transaction trie, 
          you can return to the same path over and over to retrieve the same result.

    2. Ephemeral
        - In the case of Ethereum, account states change all the time! (ie. A user receives some ether, interacts with a contract, etc)
        - nonce, balance, storageRoot, codeHash.
*/

/*
Note: 
    1. It makes sense that permanent data, like mined transactions, and ephemeral data, like Ethereum accounts (balance, nonce, etc), should be stored separately.
    2. Merkle trees, again, are perfect for permanent data. 
    3. PMTs are perfect for ephemeral data, which Ethereum is in plenty supply of.
*/

/*
Ethereum Block Header:
  Main Components:-
    1. State Root: the root hash of the state trie.
    2. Transactions Root: the root hash of the block's transactions.
    3. Receipts Root: the root hash of the receipts trie.
*/


/*
Article: https://medium.com/shyft-network/understanding-trie-databases-in-ethereum-9f03d2c3325d
*/
