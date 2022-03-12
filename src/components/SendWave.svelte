<script>
  export let fetchWaves;
  export let CONTRACT_ADDRESS;
  import { ethers } from 'ethers';
  import WavePortal from '../artifacts/contracts/WavePortal.sol/WavePortal.json';
  let message = '';
  let loading = false;
  
  async function sendWaveReaction(reaction, message) {
    loading = true;
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        WavePortal.abi,
        signer
      );
      const transaction = await wavePortalContract.wave(reaction, message, {
        gasLimit: 400000,
      });
      await transaction.wait();
      message = '';
      fetchWaves();
      loading = false;
    } catch (error) {
      alert('Error while sending wave', error);
      loading = false;
    }
  }
</script>

<div>
  <div class="textWrapper">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label for="message">Write your message below:</label>
    <textarea
      disabled={loading}
      id="message"
      class="textBox text-black"
      value={message}
      on:change={(e) => (message = e.target.value)}
    />
    <section class="buttonGroup">
      <button disabled={loading} class="button buttonWave" on:click={() => sendWaveReaction(0, message)}>
        Wave at me
      </button>
      <button disabled={loading} class="button buttonCake" on:click={() => sendWaveReaction(1, message)}>
        Send me cake
      </button>
      <button disabled={loading} class="button buttonFire" on:click={() => sendWaveReaction(2, message)}>
        Share some hype
      </button>
    </section>
  </div>
</div>

<style>
  .textWrapper {
    margin-bottom: 20px;
  }
  .textWrapper label {
    display: block;
    margin-bottom: 8px;
  }
  .textBox {
    display: block;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    height: 80px;
    border: none;
    border-radius: 5px;
    font-family: inherit;
    font-size: 1rem;
  }
  .buttonWave {
    --button-bg-color: #fde68a;
    --text-100: #1f2937;
  }
  .buttonCake {
    --button-bg-color: #f472b6;
  }
  .buttonFire {
    --button-bg-color: #3b82f6;
  }
</style>