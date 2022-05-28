// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Cookies {
    uint8 val;
    string web;

    constructor (uint8 _val, string memory _s) { 
        val=_val;
        web=_s;
    } 

    function whichWeb() external view returns(string memory){
        return web;
    }
    function whichPreference() external view returns(uint8){
        return val;
    }
}