<script>
  let account;
  let connectWalletError;
  let walletConnected = false;
  
  async function connectWallet() {
    walletConnected = false;
    const { ethereum } = window;
    await ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accountList) => {
        const [firstAccount] = accountList;
        account = firstAccount;
        walletConnected = true;
      })
      .catch((error) => {
        walletConnected = false;
        connectWalletError = error;
        console.log('error connecting wallet');
      });
  }
</script>

<div class="walletButtonGroup justifyCenter">
  
  {#if walletConnected}
    <div>
      <span class="dotConnected" />
      Connected Account: {account}
    </div>
    {:else} 
    <button class="button buttonMetaMask" on:click={connectWallet}>
      Connect MetaMask
    </button>
  {/if}

  <div class="network">
    After connecting MetaMask, please switch to the <strong>Rinkeby Test Network</strong>.
  </div>
  <button class="button buttonMetaMask" on:click={connectWallet}>
      Connect MetaMask
    </button>
</div>

<style>
  .walletButtonGroup {
    margin: 10px 0;
    min-height: 46px;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
	margin-bottom: 32px;
  }
  .justifyCenter {
    justify-content: center;
    text-align: center;
  }
  .network {
    margin: 2.5vh 0;
  }
  .buttonMetaMask {
    --button-bg-color: #f6851b;
  }
  .dotConnected {
    display: inline-block;
    margin: 1px 10px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #34d399;
  }
  @media screen and (min-width: 768px) {
    .walletButtonGroup {
      flex-direction: row;
    }
  }
</style>