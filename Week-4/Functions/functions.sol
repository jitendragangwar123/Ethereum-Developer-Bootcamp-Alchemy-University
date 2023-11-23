/*
Solidity Arguments:
  bool public isOpen;
  constructor(bool _isOpen) {
    isOpen = _isOpen;
  }
*/

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

/*
Increment:
*/

//contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
  uint public x;
  constructor(uint _x) {		
     x = _x; 
  }
  function increment() external {
     x++;
  }
}

//test.js
/*
const { assert } = require('chai');
const num = 0;
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy(num);
        await contract.deployed();
    });

    it('should set the initial value to 0', async () => {
        const x = await contract.callStatic.x();
        assert.equal(x.toNumber(), 0);
    });

    describe('after one increment call', () => {
        before(async () => {
            await contract.increment();
        });

        it('should increase the value to 1', async () => {
            const x = await contract.callStatic.x();
            assert.equal(x.toNumber(), 1);
        });
    });

    describe('after a second increment call', () => {
        before(async () => {
            await contract.increment();
        });

        it('should increase the value to 2', async () => {
            const x = await contract.callStatic.x();
            assert.equal(x.toNumber(), 2);
        });
    });
});
*/

/*
View Addition:
*/

//contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
   uint public x;
   constructor(uint _x) {
	x = _x;
   }
   function increment() external {
	x++;
   }
   function add(uint y) external view returns(uint) {
	return x + y;
   }
}

//test.js
/*
const { assert } = require('chai');
describe('Contract: add function', function () {
    [[1, 3], [2, 4], [3, 7]].forEach(([x, y]) => {
        const expectedSum = x + y;
        describe(`when the contract is deployed with ${x}`, () => {
            let contract;
            before(async () => {
                const Contract = await ethers.getContractFactory("Contract");
                contract = await Contract.deploy(x);
                await contract.deployed();
            });
            it(`it should add ${y} to get ${expectedSum}`, async () => { 
                const sum = await contract.callStatic.add(y);
                assert.equal(sum.toNumber(), expectedSum);
            });
        });
    });
});
*/

/*
Pure Double:
*/

//contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    function double(uint x) public pure returns(uint) {
	return x * 2;
    }
}

//test.js
/*
const { assert } = require('chai');
describe('Contract: double function', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    [1, 4, 7].forEach((x) => {
        const expected = x * 2;
        describe(`when the number is ${x}`, () => {
            it(`should double it to get ${expected}`, async () => {
                const doubled = await contract.callStatic.double(x);
                assert.equal(doubled.toNumber(), expected);
            });
        });
    });
});
*/

/*
Double Overload:
*/

//contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
   function double(uint x) public pure returns(uint) {
	return x * 2;
   }
	
   function double(uint a, uint b) external pure returns(uint, uint) {
	return (double(a), double(b));
   }
}

//test.js
/*
const { assert } = require('chai');
describe('Contract: double function', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    [[1, 3], [2, 4], [3, 7]].forEach(([x, y]) => {
        const [x2, y2] = [x * 2, y * 2];
        describe(`when the numbers are ${x} and ${y}`, () => {
            it(`should double them to get ${x2} and ${y2}`, async () => {
                const result = await contract.callStatic["double(uint256,uint256)"](x,y);
                assert.equal(result[0], x2);
                assert.equal(result[1], y2);
            });
        });
    });
});
*/
