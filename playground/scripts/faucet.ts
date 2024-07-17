import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const aptosConfig = new AptosConfig({
	network: Network.TESTNET,
});

const aptos = new Aptos(aptosConfig);
const ACCOUNT_ADDRESS = "0x3a8e4a6d4e3d38329012d48f1703b62314070285ee85c06e5a1e29fcce7d8cab";

async function faucet() {
	const fund = await aptos.fundAccount({
		accountAddress: ACCOUNT_ADDRESS,
		amount: 1_000_000_000, // Aptos Decimals: 8, 100_000_000 = 1 Aptos
	});
	console.log(fund);
	console.log("Faucet complete");
}

let iteration = 1;
for (let i = 0; i < iteration; i++) {
	faucet();
}

// import { AptosFaucetClient, FundRequest } from "@aptos-labs/aptos-faucet-client";

// async function callFaucet(amount: number, address: string): Promise<string[]> {
// 	const faucetClient = new AptosFaucetClient({
// 		BASE: "https://faucet.testnet.aptoslabs.com",
// 	});
// 	const request: FundRequest = {
// 		amount,
// 		address,
// 	};
// 	const response = await faucetClient.fund.fund({ requestBody: request });
// 	return response.txn_hashes;
// }

// callFaucet(1_000_000_000, "0x3736adcf922eadb6069d481129f471a3ee27699df1fa2e31811b0663873ca253")
// 	.then((res) => {
// 		console.log("Faucet complete: ", res);
// 	})
// 	.catch((err) => {
// 		console.error("Faucet failed: ", err);
// 	});
