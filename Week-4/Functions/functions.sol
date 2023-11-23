/*
Solidity Arguments:
  bool public isOpen;
  constructor(bool _isOpen) {
    isOpen = _isOpen;
  }
*/

/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	uint public x;

	constructor(uint _x) {
		x = _x;
	}
}

//test.js
/*
const { assert } = require('chai');
const num = Math.floor(Math.random() * 1000); 
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy(num);
        await contract.deployed();
    });

    it('should create variable x with the number stored in it', async () => {
        const x = await contract.callStatic.x();
        assert.equal(x, num);
    });
});
*/


