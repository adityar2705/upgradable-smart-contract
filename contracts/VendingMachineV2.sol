// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV2 is Initializable{
    uint public numSodas;
    address public owner;

    mapping(address => uint) sodasPurchased;

    //create the initial vending machine with given values and owner
    function intialize(uint _numSodas) public initializer{
        numSodas = _numSodas;
        owner = msg.sender;
    }

    //purchase soda
    function purchaseSoda() public payable{
        require(numSodas > 0,"The vending machine is empty!");
        require(msg.value >= 1000 wei,"You must pay 1000 wei for a soda!");
        numSodas--;
        sodasPurchased[msg.sender] += 1;
    }

    //withdraw Ether from the vending machine
    function withdrawProfits() public onlyOwner{
        require(address(this).balance > 0, "Profits must be greater than 0 to withdraw!");
        (bool s,) = owner.call{
            value:address(this).balance
        }("");
        require(s,"Failed to withdraw the profits!");
    }

    //set new owner
    function setNewOwner(address _owner) public onlyOwner{
        owner = _owner;
    }

    //only owner modifier
    modifier onlyOwner(){
        require(msg.sender == owner,"Only owner can call this function!");
        _;
    }
}