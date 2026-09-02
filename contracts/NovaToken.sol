// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Nova
/// @notice Fixed-supply ERC-20 token. The entire supply is minted once,
///         to the deployer, at construction time. There is no owner,
///         no mint function, no pause function, and no admin privilege
///         of any kind — once deployed, the contract's behavior cannot
///         be changed by anyone, including the deployer.
contract NovaToken is ERC20 {
    /// @dev Total supply is fixed at 1,000,000 NOVA (with 18 decimals,
    ///      the ERC-20 standard default), minted entirely to whoever
    ///      deploys the contract.
    constructor() ERC20("Nova", "NOVA") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
