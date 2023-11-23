/*
State Variables:
    State Variables are stored in the contract's persistent memory.
*/

//contract.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    bool public a=true;
    bool public b=false;
}

/*
//test.js
const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should create variable a: true', async () => {
        const a = await contract.callStatic.a();
        assert.equal(a, true);
    });

    it('should create variable b: false', async () => {
        const b = await contract.callStatic.b();
        assert.equal(b, false);
    });
});
*/
