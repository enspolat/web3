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
const miktar = document.getElementById('miktar');
const send = document.getElementById('send');


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
  const accounts = await window.ethereum
    .request({ method: "eth_requestAccounts" })
    .catch((e) => {
      console.error(e.message);
      return;
    });
  if (!accounts) {
    return;
  }
  window.userWalletAddress = accounts[0];
  userWallet.innerText = window.userWalletAddress;
  loginButton.innerText = "Sign out of MetaMask";

  loginButton.removeEventListener("click", loginWithMetaMask);
  setTimeout(() => {
    loginButton.addEventListener("click", signOutOfMetaMask);
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

async function showBalanceMetaMask(){
   web3.eth.getBalance(
   accounts,
  function (err, result) {
    if (err) {
      console.log(err);
    } else {
      balance.innerHTML = (web3.utils.fromWei(result, "ether") + " ETH");
    }
  }
); 
}

function sendMetaMask(){

}

window.addEventListener("DOMContentLoaded", () => {
  toggleButton();
});