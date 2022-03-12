<script>
  import { ethers } from 'ethers';
  import WavePortal from './artifacts/contracts/WavePortal.sol/WavePortal.json'
  import Header from './components/Header.svelte';
  import Bio from './components/Bio.svelte';
  import Wallet from './components/Wallet.svelte';
  import SendWave from './components/SendWave.svelte';
  import WaveList from './components/WaveList.svelte';
  import "./index.css";
  import "./tailwind.css";
  import { onMount } from 'svelte';
    let waveList = [];
  
	const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	const name = "Mike";
  
	async function getAllWaves() {
		if (!window.ethereum) {
		  return;
		}
		
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const wavePortalContract = new ethers.Contract(
		  CONTRACT_ADDRESS,
		  WavePortal.abi,
		  provider
		);
		const recievedWaves = await wavePortalContract.getAllWaves();
		
		if (!recievedWaves) {
		  waveList = [];
		  return;
		}
		
		const normalizeWave = (wave) => ({
		  reaction: wave.reaction,
		  message: wave.message,
		  waver: wave.waver,
		  timestamp: new Date(wave.timestamp * 1000),
		});
		
		waveList = recievedWaves
		  .map(normalizeWave)
		  .sort((a, b) => b.timestamp - a.timestamp);
		console.log('waveList: ', waveList);
		return;
  }

  onMount(getAllWaves);
</script>
<main>
  <Header />
  <Bio />
  <Wallet />
  <SendWave {CONTRACT_ADDRESS} fetchWaves={getAllWaves} />
  <WaveList {waveList} />
  <h1 class="py-8 px-4 border border-indigo-900 text-red shadow-lg">Hello {name}!</h1>
</main>

<style>
</style>
