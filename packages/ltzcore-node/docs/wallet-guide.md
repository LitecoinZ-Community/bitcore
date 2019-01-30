## Set up Alias config

Go to the root directory of your computer

```
cd ~
```

Create a .profile file if missing

OR

Create a .bashrc if configuring for interactive Bash usage

```
touch .profile

OR

touch .bashrc
```

Edit the .profile file to insert:
> *Make sure to replace username*

```
alias mainnet='/Applications/LitecoinZ-Qt.app/Contents/MacOS/LitecoinZ-Qt -datadir=/Users/username/blockchains/litecoinz-core/networks/mainnet/'

alias regtest='/Applications/LitecoinZ-Qt.app/Contents/MacOS/LitecoinZ-Qt -datadir=/Users/username/blockchains/litecoinz-core/networks/regtest/'
```

Ensure Mongod is running

```
mongod
```

Start the Ltzcore node in the /ltzcore/ project root directory

```
npm run node
```

To run RegTest LitecoinZ Core RegTest Client

```
. ~/.profile
regtest
```

> If successful Ltzcore logo should be blue and syncing blocks on mongod in the background

## How to Generate Blocks

Go to Help -> Debug Window -> console tab

Input generate command in the line to create 5000 LTZ

```
generate 5000
```

To find RegTest account address
```
getaccountaddress ""
```

Test transactions by sending to account address in the send tab

Check transaction results in the Transactions tab
