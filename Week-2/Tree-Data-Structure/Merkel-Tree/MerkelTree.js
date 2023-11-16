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
