// SPDX-License-Identifier : MIT
pragma solidity ^0.8.9;

contract Dao {
    uint256 totalProposals;
    uint256 balance;

    uint256 immutable COLLABORATOR_MIN_CONTRIBUTION = 1 ether;
    uint256 immutable MIN_VOTE_PERIOD = 2 minutes;
    bytes32 private immutable COLLABORATOR_ROLE = keccak256("collaborator");  
    bytes32 private immutable STAKEHOLDER_ROLE = keccak256("stakeholder");    

    mapping(uint256 => Proposals) private raisedProposals;
    mapping(address => uint256[]) private stakeholderVotes;
    mapping(uint256 => Voted[]) private votedOn;
    mapping(address => uint256) private contributors;
    mapping(address => uint256) private stakeholders;

    struct Proposals {
        uint256 id;
        uint256 amount;
        uint256 upVote;
        uint256 downVotes;
        uint256 duration;
        string title;
        string description;
        bool paid;
        bool passed;
        address payable beneficiary;
        address propoper;
        address executor;
    }

    struct Voted {
        address voter;
        uint256 timestamp;
        bool chosen;
    }

    modifier stakeholderOnly(string memory message) {
        require(hasRole(STAKEHOLDER_ROLE,msg.sender),message)
    }

    function createProposal (
        string calldata title,
        string calldata description,
        address beneficiary,
        uint256 amount
    )external stakeholderOnly("Only stakeholders are allowed to create Proposals") returns(Proposals memory){
        uint256 currentID = totalProposals++;
        Proposals storage StakeholderProposal = raisedProposals
        StakeholderProposal.id = currentID;
        StakeholderProposal.amount = amount;
        StakeholderProposal.title = title;
        StakeholderProposal.description = description;
        StakeholderProposal.beneficiary = payable(beneficiary);
        StakeholderProposal.duration = block.timestamp + MIN_VOTE_DURATION;
    }
}
