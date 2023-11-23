/** Here we specify the solidity versions
 * Any version greater than or equal to 0.6.2
 * or less than 0.7.0 will compile this contract 
*/

pragma solidity ^0.8.20;

contract OnOffSwitch {
    // the switch is on if true
    bool private isOn;

    constructor() {
        // we'll default to being on
        isOn = true;
    }

    // a publicly accessible function to "flip" the switch
    function toggle() public returns(bool) {
        // flip isOn from true->false or false->true
        isOn = !isOn;
        // return the new value
        return isOn;
    }
}

/*
Compiler Version Control:
    pragma solidity ^0.6.2;
    The major version: x.0.0
    The minor version: 0.x.0
    The patch version: 0.0.x
*/

/*
Control Structures:
    function getValues() public pure returns (int, bool) {
        return (49, true);
    }
*/

/*
Destructure:
    (bool x, bool y) = (true, false);
*/
