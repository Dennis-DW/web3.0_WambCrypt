// https://eth-goerli.g.alchemy.com/v2/rHNF1B2dGj3dTUl0ciAvoEh3HNmO3wYL
// 0xE8E41C27dBD6a2747089C66D9F44211921f18EAd

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/rHNF1B2dGj3dTUl0ciAvoEh3HNmO3wYL',
      accounts: ['388e62eb164c20a8b0a8eb403b87c6094e861f1d9b359e3a2e566183f81be493'],
    },
  },
};