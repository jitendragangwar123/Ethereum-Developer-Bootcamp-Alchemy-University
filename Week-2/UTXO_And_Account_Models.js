/*
  1. UTXO stands for "Unspent Transaction Output".
  2. Bitcoin uses the UTXO model to keep track of user balances. 
  3. Ethereum and other EVM chains use the account model to keep track of user balances.
*/

/*
Account-based Model:
   It tracks the balances of users based on their overall account state, without any tracking on what constitutes the actual balance itself.
UTXO-based Model:
   1. All UTXOs are non-fungible.
   2. "I own 3 bitcoins", they should really be saying: "I own some UTXOs that allow me to spend 3 bitcoins."
   3. UTXOs are stateless, which complicates state-heavy designs.
*/

