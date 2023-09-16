// https://eth-goerli.g.alchemy.com/v2/rHNF1B2dGj3dTUl0ciAvoEh3HNmO3wYL
// 0xE8E41C27dBD6a2747089C66D9F44211921f18EAd

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/rHNF1B2dGj3dTUl0ciAvoEh3HNmO3wYL',
      accounts: ['7d385b69d089a0cb4d8c434d798e2f8e4a0d1ef3dcfb8bcf8614ed9f92e557e9'],
    },
  },
};


