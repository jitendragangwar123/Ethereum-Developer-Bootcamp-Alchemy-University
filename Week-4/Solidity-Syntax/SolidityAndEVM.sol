/*
1. Solidity is a high-level language that compiles down into bytecode which is run directly on the Ethereum Virtual Machine.
2. Solidity is more low-level than JavaScript, which means it hides less of the underlying machine details.
3. An opcode and its operands combined form an instruction.
4. The two operations that manipulate the programming counter in the EVM are JUMP and JUMPI
5. JUMP and JUMPI are the instructions that make the EVM Turing Complete!
*/

/*
uint i = 0;
uint sum = 0;
while(i < 5) {
    sum += i;
}
*/


/*
tag 7               while(i < 5) ...
  JUMPDEST          while(i < 5) ...
  PUSH 5            5
  DUP3              i
  LT                i < 5
  ISZERO            while(i < 5) ...
  PUSH [tag] 8      while(i < 5) ...
  JUMPI             while(i < 5) ...
  DUP2              i
  DUP2              sum += i
  ADD               sum += i
  SWAP1             sum += i
  POP               sum += i
  PUSH [tag] 7      while(i < 5) ...
  JUMP              while(i < 5) ...
tag 8               while(i < 5) ...
  JUMPDEST          while(i < 5) ...
  DUP1              sum
  SWAP3             return sum
  POP               return sum
*/
