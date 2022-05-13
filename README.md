# The Thief Game Project React Side

This project is a game Dapp where players can mint a THIEF NFT and try to steal from other players.

All players start with one "dagger" and two "steals". Each player can attempt two steals of a single dagger from any player.

Once the two steals have been used, players must wait for steals to be reset.

Steals are reset once a count has been reached that is equal to the total number of players.
Ex: all players steal once, half of the players steal twice, or a mixture of this

When the steals are reset, any players with 3 or more daggers are leveled up. All players start at level 0

Every 100 mints, the NFTs receive a new "class" where the classes start at class 1.

A shield item is also sent on every variable "sendShieldOnNumber" mint. The contract initially sets this variable "sendShieldOnNumber" to 4 on contract creation so this would mean on every 4th mint. However, this number can be updated by the manager at any moment.

## Getting Started

This project uses [git], [node] and [nvm]. Make sure these are all downloaded for your appropriate machine before continuing.

You will also need an Ethereum wallet with some test ether to be able to run through the game. You cam use [metamask] for your wallet.

You can then either port over an ethereum development account you already have or create a new one.

To get test ether to run through the game, you can head here: [rinkebyfaucet.com]

Once you have your ethereum wallet set up and test ether, you can start the project.

To start, run:
```
nvm use
```
so that the appropriate node version is used. In your terminal, you might have errors saying that you need to install the different node version. Follow the instructions on there to use the correct node version.

Next, run:
```
npm install
```
This will install of our project's dependencies. You don't need to run 'npm install' each time you exit your project and start working again but you might need to run 'nvm use' each time if your local machine isn't set up to default to this project's node version.

Once this is done, the project is ready to run.

## Running the website locally
To spin up the project, simply run

```
npm start
```

Make sure you connect your wallet as the alerts indicate and then you are able to mint an NFT to play the game.

## Running and Adding Tests

At the moment there are currently no tests.

## Contributing

If you would like to contribute to this project, branch off from the master branch and name your branches accordingly:

- new features: feature/
- bug fixes: fix/
- simple updates: chore/

Once you make your changes on your new brach, commit and submit a pull request.

Once a review has been submitted and approved, you may merge the pull request.

To have your pull request reviewed, make sure to request a review from the code owner.

## Deploying

This project is served on [vercel].

Any merges to master will automatically deploy to production.


[git]: https://git-scm.com/downloads
[node]: https://nodejs.org/en/download/
[nvm]: https://github.com/nvm-sh/nvm#installation-and-update
[hardhat]: https://hardhat.org/
[rinkebyfaucet.com]: https://rinkebyfaucet.com/
[alchemy]: https://www.alchemy.com/
[etherscan]: https://rinkeby.etherscan.io/
[etherscan.io]: https://etherscan.io/
[thievary_solidity]: https://github.com/mcabrejos24/Thievary-Solidity
[metamask]: https://metamask.io/
[vercel]: https://vercel.com/
