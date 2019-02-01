pragma solidity ^0.4.17;
import "./Oraclize.sol";
import "./JsmnSolLib.sol";

contract User is usingOraclize{
    address public userAddress;
    bytes16 public userName;
    string public ipfsHash;
    bytes32[] public registeredWebsites;
    string public userData;

    struct websitePermissions {
        bool username;
        bool firstName;
        bool dob;
        bool passportNumber;
        bool adhaarNumber;
    }

    mapping(bytes32 => websitePermissions) permissions;
    //websitePermi ssions[] permissions;

    constructor() public {
        userAddress = msg.sender;
        userName = "self";
        ipfsHash = "not-available";
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
    }

    function registerUser(bytes16 _username, string _ipfshash) public returns (bool success) {
        userName = _username;
        ipfsHash = _ipfshash;
        return true;
    }

    function registerWebsite(bytes32 _website, bool[] _permissions) public returns (bool success){
        registeredWebsites.push(_website);
        websitePermissions temp;

        temp.username = _permissions[0];
        temp.firstName = _permissions[1];
        temp.dob = _permissions[2];
        temp.passportNumber = _permissions[3];
        temp.adhaarNumber = _permissions[4];

        permissions[_website] = temp;
        return true;
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) revert();
        userData = result;
    }

    function fetchUserDetails() payable {
            // OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
        oraclize_query("IPFS", ipfsHash);
    }

    function getUserData(bytes32 _website) public view returns (string _username, string _name, string _dob, string _passportNo, string _adhaarNo){
        
        //fetchUserDetails();
        
        uint returnCode;
        JsmnSolLib.Token[] memory Tokens;
        uint actualNumber;
        (returnCode, Tokens, actualNumber) = JsmnSolLib.parse (userData, 11);

        JsmnSolLib.Token memory t;
        t = Tokens[2];
        if(permissions[_website].username) _username = (JsmnSolLib.getBytes(userData, t.start, t.end));
        else _username = "Permission denied for this field";

        t = Tokens[4];
        if(permissions[_website].firstName) _name = (JsmnSolLib.getBytes(userData, t.start, t.end));
        else _name = "Permission denied for this field";


        t = Tokens[6];
        if(permissions[_website].dob) _dob = (JsmnSolLib.getBytes(userData, t.start, t.end));
        else _dob = "Permission denied for this field";

        t = Tokens[8];
        if(permissions[_website].passportNumber) _passportNo = (JsmnSolLib.getBytes(userData, t.start, t.end));
        else _passportNo = "Permission denied for this field";

        t = Tokens[10];
        if(permissions[_website].adhaarNumber) _adhaarNo = (JsmnSolLib.getBytes(userData, t.start, t.end));
        else _adhaarNo = "Permission denied for this field";
        
        return (_username, _name, _dob, _passportNo, _adhaarNo);
    }
}