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

/*
Unsigned Integers:
     it is simply 0 to 255
*/

//constract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	uint8 public a = 1;
	uint16 public b = 65534;
	uint public sum = a + b;
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

    it('should create variable a which is less than 256', async () => {
        const a = await contract.callStatic.a();
        assert.isAtMost(a, 255);
    });

    it('should create variable b which is greater than or equal to 256', async () => {
        const b = await contract.callStatic.b();
        assert.isAtLeast(b, 256);
    });

    it('should create variable sum which equals a and b together', async () => {
        const a = await contract.callStatic.a();
        const b = await contract.callStatic.b();
        const sum = await contract.callStatic.sum();
        assert.equal(sum.toNumber(), a + b);
    });
});
*/

/*
Signed Integers:
         A integer is signed, the range covers both negative and positive numbers. Let's compare the range of a uint8 to an int8
*/

//contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    int8 public a=12;
    int8 public b=-29;
    int16 public difference=a-b;
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

    it('should create two variables, one positive and one negative', async () => {
        const a = await contract.callStatic.a();
        const b = await contract.callStatic.b();
        const aPositive = a > 0 && b < 0;
        const bPositive = b > 0 && a < 0;
        assert(aPositive || bPositive, "Declare variables a and b where one is positive (above zero) and the other is negative (below zero)");
    });

    it('should find the absolute difference between the two variables', async () => {
        const a = await contract.callStatic.a();
        const b = await contract.callStatic.b();
        const difference = await contract.callStatic.difference();
        assert.equal(difference, Math.abs(a - b));
    });
});
*/

/*
String Literals:
    1. A string literal can be stored in both the bytes and string types:
        bytes msg1 = "Hello World"; 
        string msg2 = "Hello World";
    2. string and bytes will allocate their memory dynamically depending on the size of the string.
*/

//contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	bytes32 public msg1="hello world";
    string public msg2="hello world how are you? I am jitendra Gangwar";
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

    it('should create a msg1 as bytes32 with hello world', async () => {
        const msg1 = await contract.callStatic.msg1();
        const ascii = ethers.utils.parseBytes32String(msg1);
        assert(/hello world/i.test(ascii), "Could not find 'Hello World' in your msg1!");
    });

    it('should create a msg2 as string which requires more than 32 bytes', async () => {
        const msg2 = await contract.callStatic.msg2();
        assert.isAtLeast(Buffer.byteLength(msg2, 'utf8'), 32);
    });
});
*/

/*
Enum:
  1.enum values are stored as unsigned integers.
      enum Directions = { Up, Left, Down, Right }
        if(player.movement == Directions.Up) {
    
        }
        else if(player.movement == Directions.Left) {
        
        }

        if(player.movement == 0) {
            // player is moving up
        }
        else if(player.movement == 1) {
            // player is moving left
        }
*/

//contract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    enum Foods { Apple, Pizza, Bagel, Banana }

	Foods public food1 = Foods.Apple;
	Foods public food2 = Foods.Pizza;
	Foods public food3 = Foods.Bagel;
	Foods public food4 = Foods.Banana;
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

    it('should create four foods', async () => {
        for(let i = 1; i <= 4; i++) {
            const food = await contract.callStatic[`food${i}`]();
            assert.isAtLeast(food, 0);
        }
    });
});
*/
