/*
Proof of Stake:
  1. September 15th, 2022 Ethereum transitioned from Proof of Work to Proof of Stake (POS).
  2. Validators are required to stake 32ETH by depositing it into a contract to have the ability to validate blocks.
  3. The network randomly selects a validator to propose a block every 12 seconds, all the other validators verify 
  that the proposed block is correct, and the cycle repeats.
  4. The energy requirements to mine any given block are significantly lower than that of PoW.
*/

/*
To remember the differences between the block tags you can think of them in the order of oldest to newest block numbers: 
earliest ≤ finalized ≤ safe ≤ latest ≤ pending
*/
