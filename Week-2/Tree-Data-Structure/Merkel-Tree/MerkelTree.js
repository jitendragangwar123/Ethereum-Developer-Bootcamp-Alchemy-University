/*
Merkel Tree:
  1. Merkle Tree is a data structure that allows us to make efficient verifications that data belongs in a larger set of data.
  2. They are commonly used in Peer to Peer networks where efficient proofs of this nature will help increase the scalability of the network.
  3. A Merkle Tree is a collection of hashes reduced to a single hash.
  
      ABCDEFGH <-- Merkle Root
       /    \
    ABCD     EFGH
    / \      / \
   AB  CD   EF  GH
  / \  / \  / \ / \
  A B  C D  E F G H
*/


/*
Merkle Trees In Bitcoin:
   1. In Bitcoin, Merkle trees are used to store every transaction mined on the Bitcoin network in an efficient way.
   2. Merkle trees, there is an efficient way to verify that some data exists in a root hash. 
   
Merkle Proofs:
   1. A Merkle proof confirms specific transactions represented by a leaf or branch hash within a Merkle hash root.
   2. Merkle tree design -- a recursive hashing-based algorithm.
*/

/*
Merkle Trees Use Cases:
   1. space and computationally efficient
   2. good for scalability and decentralization
   3. no need to pack a block full of transactions… just commit a Merkle root hash to it and keep transactions in  
   other places that can handle them In deeper terms, they:

   4. They significantly reduce the memory needed to verify that data has maintained its integrity and hasn’t been altered.
   5. They require less data to be broadcast across the blockchain network to verify data and transactions. This improves the efficiency of a blockchain.
   6. They allow for Simple Payment Verification (SPV), which helps you to verify a transaction without downloading an entire block or blockchain. 
   7. This allows you to send and receive transactions using a light-client node — more commonly known as a crypto wallet.
*/

/*
When verifying data using a Merkle tree, there is a Prover and a Verifier:
  1. A Prover: Does all the calculation to create the merkle root (just a hash!)
  2. A Verifier: Does not need to know all the values to know for certain one value is in the tree
*/

/*
Final terminology for Merkle trees:
   1. Merkle tree: a structure used in computer science to validate data
   2. Merkle root: the hash contained in the block header, which is derived from the hashes of all other transactions in the block
   3. Merkle path: represents the information which the user needs to calculate the expected value for the Merkle root for a block, 
                from their own transaction hash contained in that block. The Merkle path is used as part of of the Merkle proof
   4. Merkle proof: proves the existence of a specific transaction in a specific block (without the user needing to examine all the 
                transactions in the block). It includes the Merkle root and the Merkle path
*/
