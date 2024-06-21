import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const aptosConfig = new AptosConfig({
	network: Network.TESTNET,
});

const aptos = new Aptos(aptosConfig);

(async () => {
	const fund = await aptos.fundAccount({
		accountAddress: "0x3736adcf922eadb6069d481129f471a3ee27699df1fa2e31811b0663873ca253",
		amount: 1000000000000,
	});

	console.log(fund);
})();
