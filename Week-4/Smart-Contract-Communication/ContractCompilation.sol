/*
Contract Compilation Produces Two Artifacts: 
  1.The contract's ABI:
        We keep the ABI for front-end libraries to be able to communicate with the contract
  2.The contract's bytecode
        We deploy the bytecode directly to the blockchain, in which case it is stored directly in the contract account's state trie
*/
