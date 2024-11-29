// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private _value;

    event ValueChanged(uint256 newValue);

    function setValue(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    function getValue() public view returns (uint256) {
        return _value;
    }
}
