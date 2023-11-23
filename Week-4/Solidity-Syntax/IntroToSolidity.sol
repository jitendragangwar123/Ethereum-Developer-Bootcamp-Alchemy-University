/*
1. Solidity is an object-oriented, high-level language for implementing smart contracts.
Here are some important properties of the Solidity language:
1. statically-typed (fancy term meaning variables must be defined at compile time)
2. supports inheritance: (specifically, smart contract inheritance chains)
3. libraries
4. complex user-defined types, among other features
*/

/*
Smart Contracts:
      1. A smart contract is a collection of code (functions) and data (state) that resides on a specific address on the Ethereum blockchain.
      2. These are written in Solidity which means they must be compiled into bytecode first in order to be EVM-compatible.
*/

/*
Smart Contracts - Properties:
      1. Permissionless: anyone can deploy a smart contract to the Ethereum computer.
      2. Composable: smart contracts are globally available via Ethereum, so they can be thought of as open APIs for anyone to use.
*/

/*
Solidity - Data Types
The following are all data types available on Solidity:
  boolean: declared as bool
  string: declared as string
  integers: declared as either uint or int
  bytes: decalred as bytes
  enums
  arrays
  mappings
  structs
*/

/*
Smart Contract Context:
  1. Message Context (msg)
  msg.sender - returns the current transaction sender address
  msg.value - returns the value property of the current transaction
  
  2. Transaction Context (tx)
  tx.gasLimit - returns the gasLimit property of the current tx
  
  3. Block Context (block)
  block.number - returns the current block number
  block.timestamp - returns the current block timestamp
*/
