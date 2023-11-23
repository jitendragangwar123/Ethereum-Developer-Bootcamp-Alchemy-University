/*
Functions are where actual logic is contained on a smart contract.

Syntax:
// function_keyword + function_name(paramter_list) + visibility {}
function helloWorld(bool _saysHello) public {
    // statements
}
*/
//Example:
pragma solidity 0.8.4;
contract MyContract {
    uint x = 5;
    uint y = 10;
    
    function sum() external view returns(uint) {
        return x + y;
    }
}

/*
Solidity Functions - Declarations:
    view: This function promises that** NO state will be changed, only read**
    pure: This function promises that NO state will be changed nor read.
*/
//Example:
pragma solidity 0.8.4;
contract MyContract {
    uint x = 5;
    uint y = 10;
    
    function sum() external view returns(uint) {
        return x + y;
    }
}

/*
Solidity Functions - Returns:   
*/
//Example:
contract MyContract {
    function add(uint x, uint y) external pure returns(uint) {
        return x + y;
    }
}

//Example:
contract MyContract {
    function add(uint x, uint y) external pure returns(uint z) {
        z = x + y;
    }
}

//Example:
contract MyContract {
    function mathTime(uint sum, uint product) external pure returns(uint sum, uint product) {
        sum = x + y;
        product = x * y;
    }
}

//Example:
contract MyContract {
    function mathTime(uint sum, uint product) external pure returns(uint, uint) {
        uint sum = x + y;
        uint product = x * y;
        
        return (sum, product);
    }
}

/*
Solidity Functions - Visibility:
  1. public - any contract or EOA can call into this function
  2. external - only other contracts (external to the current contract) and EOAs can call, no internal calling
  3. internal - only this contract along with its inheritance chain can call
  4. private - only this contract can call
*/
