/*
There are two types of accounts in Ethereum:
    1. Externally owned accounts(EOA):
              The EOA can be controlled by a private key.
    2. Contract Account :
              The contract account cannot be controlled by a private key.
*/

/*
    1. The nonce keeps a count of all transactions sent from that particular address.
       {
        to: BOBS_ADDRESS,
        value: 100000000000000000, // 1 ether
        nonce: 0x0 // this is the first transaction, nonce is zero!
      }
    2. Once the first transaction is successfully mined the miners enforce the rule that the nonce of your next transaction should be 0x1.
    3. Each time a transaction is sent, the nonce is incremented.
*/
