window.userWalletAddress = null;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/48a9edb0fb9143a5a0558f62f687c8d3"
  )
);

const showBalance = document.getElementById("showBalance");
const loginbutton = document.getElementById("loginButton");
const userWallet = document.getElementById("userWallet");
const balance = document.getElementById('balance');
const amount = document.getElementById('amount');
const send = document.getElementById('send');
const statusE = document.getElementById('statusE');
const progress = document.getElementById('progress')

let accounts = [];

const emreAbiAddress = "0x7E84ABC4eBE676681c7f077FcFF36487fa79ebD7";


function toggleButton() {
  if (!window.ethereum) {
    loginbutton.innerText = "MetamMask is not installed";
    loginbutton.classList.remove("bg-purple-500", "text-white");
    loginbutton.classList.add(
      "bg-gray-500",
      "text-gray-100",
      "cursor-not-allowed"
    );
    return false;
  }
  loginbutton.addEventListener("click", loginWithMetaMask);
  showBalance.addEventListener('click', showBalanceMetaMask);
  send.addEventListener('click', sendMetaMask);
}

async function loginWithMetaMask() {
  accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    .catch((e) => {
      console.error(e.message);
      return;
    });
  if (!accounts) {
    return;
  }
  window.userWalletAddress = accounts[0];
  userWallet.innerText = window.userWalletAddress;
  loginbutton.innerText = "Sign out of MetaMask";

  loginbutton.removeEventListener("click", loginWithMetaMask);
  setTimeout(() => {
    loginbutton.addEventListener("click", signOutOfMetaMask);
  }, 200);
}

function signOutOfMetaMask() {
  window.userWalletAddress = null;
  userWallet.innerText = "";
  loginButton.innerText = "Sign in with MetaMask";

  loginButton.removeEventListener("click", signOutOfMetaMask);
  setTimeout(() => {
    loginButton.addEventListener("click", loginWithMetaMask);
  }, 200);
}

async function showBalanceMetaMask() {
  accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    .catch((e) => {
      console.error(e.message);
      return;
    });
  web3.eth.getBalance(
    accounts[0],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        balance.innerHTML = (web3.utils.fromWei(result, "ether") + " ETH");
      }
    }
  );
}


function sendMetaMask() {
  const amount = document.getElementById('amount').value
  const value = web3.utils.toWei(amount, 'ether');

  statusE.innerText = '';
  progress.innerText = '';
  

  console.log(value);

  if (amount > balance) return console.error('not enough balance');

  ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
    from: accounts[0].toLowerCase(),
    to: emreAbiAddress.toLowerCase(),
    value: "0x" + (amount * 10 ** 18).toString(16),
    },]
  })
    .on('transactionHash', (hash) => {
   statusE.innerText = 'on transactionHash' + hash;
    
    })
    .on('receipt', receipt => {
        console.log(receipt);
    })
    .on('confirmation', (confirmationNumber,) => {
    console.log('on confirmation', confirmationNumber, receipt);
    if(web3.eth.transactionConfirmationBlocks - confirmationNumber === 0 ){
        statusE.innerText =  'perfect';
    }

    progress.innerText = `${transactionConfirmationBlocks}/${confirmationNumber}`;
    })
    .on('error', err, receipt =>{
        console.log(receipt);
    }); 
}


window.addEventListener("DOMContentLoaded", () => {
  toggleButton();
});