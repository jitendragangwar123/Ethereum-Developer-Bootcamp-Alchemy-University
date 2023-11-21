/*
Types of Nodes:
1. Full Node:-
          A full node keeps a complete copy of the blockchain data, and contributes to the network by receiving transactions 
    and blocks from other full nodes, validating them, and forwarding them to other full nodes.

2. Light Node:-
        A light node stores block header data, such as the preceding block's hash and a timestamp, 
    rather than the complete block data like a full node does.

3. Archive Node:-
        Archive nodes store all of the information that a full node does and creates a history of blockchain states. 
        Even after a client has completed synchronization, archive nodes will save previous data. 
*/


/*
There are four types of tries used to store data in Ethereum:-
1. State Trie:
  - This is the global state of the Ethereum network. 
  - There is only one state trie and it is constantly being updated by transactions when they are mined into the blockchain.
  
2. Storage Trie:
  - Each account has its own storage trie. This keeps track of all persistent variables within a contract account, also known as its storage.
  
3. Transactions Trie:
  - There is one transactions trie per block and it contains all of the transactions in a specific order determined by the miner.
  
4. Receipts Trie:
  - For each transaction, a receipt is stored that contains logs, gas used and post-transaction state. This receipts trie stores all of that data.
*/
