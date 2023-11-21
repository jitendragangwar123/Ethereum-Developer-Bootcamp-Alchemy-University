/*
Intro to Ethereum Transactions:
    1. An Ethereum transaction refers to an action initiated by an EOA (externally-owned account), 
       in other words an account managed by a human, not a contract.
    2. Ethereum = A Transaction-Based State Machine.
    3. Transactions are collected into blocks. 
    4. A block is a package of data.
*/

/*
EOA: 
    1. This is an account directly controlled by a private key
    2. An EOA cannot contain EVM code
Contract account: 
    1. This is an account that does NOT have a private key.
    2. storage hash: contains the root hash of a Merkle patricia trie that holds any state relevant to this smart contract account (ie. variable values, owners, etc)
    3. code hash: bytecode representation of skeleton code.
*/

/*
1 byte = 2 hexadecimal characters = 8 bits!
   1. 160 bits representing the Ethereum public address.
   2. Ethereum public addresses described as 20 bytes long with a 0x appended in front.
   3. Ethereum addresses are 40-characters long, or 42 with the 0x appended in front.
*/

/*
Two Types of Transactions in Ethereum:
1. Contract creation: 
        A special type of transaction that deploys a brand new smart contract.
        This transaction essentially creates a brand new entry in the Ethereum world state.
2. Message call: 
       A transaction initiated by an EOA that interacts with either another EOA or a smart contract
       This transaction does NOT create a new entry in the world state, it just updates an existing entry in the Ethereum world state.
*/

/*
1. nonce: index, gets incremented every time transaction gets mined
2. recipient: the receiving address (if an externally-owned account, the transaction will transfer value. If a contract account, the transaction will execute the contract code)
3. value: amount of ETH to transfer from sender to recipient (in WEI, a denomination of ETH)
4. yParity, r, s (aka: digital signature): signature components
5. init or data: typically referred to as “calldata”, 0 if just a typical ETH transfer
6. gasLimit: maximum amount of gas units that can be consumed
7. type: type 0 for legacy (pre-EIP-1559) or type 2 for EIP-1559-compatible txs
8. maxPriorityFeePerGas (aka: minerTip): the maximum amount of gas to be included as a tip to the validator
9. maxFeePerGas: the maximum amount of gas willing to be paid for the transaction (inclusive of baseFeePerGas and maxPriorityFeePerGas)
10.chainId: in order to protect against replay attacks on other EVM chains, each transaction must now include a specific id per chain. Mainnet is 0. Göerli is 5.
*/

/*
Blockchain = Globally Shared Transaction Database
*/

/*
you have three routes to interact with the Ethereum computer via a connection to an Ethereum node:
1. Contract creation: As an EOA, you deploy a new smart contract to the Ethereum computer via a special transaction (signed JSON-RPC request)
2. Message call: As an EOA, you either send some ETH to another EOA or interact with a smart contract in some way via a transaction (signed JSON-RPC request)
3. Inspection: Any user can make read queries to any Ethereum nodes, no account needed. Try out the eth_getBalance method in the Alchemy 
   Composer if you don't believe us! (non-signed JSON-RPC request)
*/

/*
{
  to: "0x2c8645BFE28BEEb6E19843eE9573b7539DD5B530", // Bob
  gasLimit: "21000",
  maxFeePerGas: "30", // 28 (base) + 2 (priorityFee)
  maxPriorityFeePerGas: "2", // minerTip
  nonce: "0",
  value: "100000000000000000", // 1 ether worth of wei
  data: '0x', // no data, we are not interacting with a contract
  type: 2, // this is not a legacy tx
  chainId: 4, // this is AU, we deal only in test networks! (Göerli)    
}
*/

/*
{
  to: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8", // smart contract address
  gasLimit: "36000",
  maxFeePerGas: "30", // 28 (base) + 2 (priorityFee)
  maxPriorityFeePerGas: "2", // minerTip
  nonce: "1", // this is Alice's second transaction, so the nonce has increased!
  value: "100000000000000000", // 1 ether worth of wei
  data: '0x7362377b0000000000000000000000000000000000000000000000000000000000000000', // this calldata tells the EVM what function to 
                                                                                      // execute on the contract, contains parameter values here as well
  type: 2, // this is not a legacy tx
  chainId: 4, // this is AU, we deal only in test networks! (Göerli)    
}
*/

/*
How To Manually Construct Calldata:
1. Say Alice wants to call the withdrawEther() function of a faucet smart contract.
2. Alice must take the keccak256 hash of that function signature.
3. The resulting output is: 7362377b8e2cc272f16ab5d5441f976bd53fd78ccd01e3c67a1f6b2efdae09e0
4. Take the first 4 bytes (8 characters) of the hash output, which is just: 7362377b
5. This function takes no arguments, so no need to append any parameter data.
6. Final calldata construction, padded out to 32 bytes: 0x7362377b0000000000000000000000000000000000000000000000000000000000000000
*/
