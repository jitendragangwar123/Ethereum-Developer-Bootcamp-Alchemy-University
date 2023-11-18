/*
EIP-1559:
  An EIP proposed to improve the calculation of gas prices on Ethereum, known as EIP-1559.
*/

/*
  1. Every block has the capacity to use 30 million gas but has a target of 15 million gas total.
  2. The network first sets a base fee.
  3. The base fee actually gets burned.
  4. When you are sending a transaction, you’re not actually setting the base fee value.
  5. You are setting the max fee which represents the maximum amount that you're willing to pay to get your transaction included.
  6. The value (max fee - base fee) will be return to you.
  7. The tip was originally set as 1 gwei.
  8. maxPriorityFee=(max fee + the miner tip)
  9. Gas Fees = Gas units (limit) x (Base fee + Tip)
*/
