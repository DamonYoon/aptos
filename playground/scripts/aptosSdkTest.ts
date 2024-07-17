import { AptosConfig, Aptos, Network, ProcessorType } from "@aptos-labs/ts-sdk";

// AptosConfig 설정
const noditConfig = new AptosConfig({
	// fullnode: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1", // APTOS 노드를 연결한 프로젝트의 API-KEY를 입력하세요.
	fullnode: "https://aptos-testnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1", // APTOS 노드를 연결한 프로젝트의 API-KEY를 입력하세요.
	// network: Network.MAINNET,
	indexer: "https://aptos-testnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
	network: Network.TESTNET,
});

const aptosConfig = new AptosConfig({
	network: Network.TESTNET,
});

// 테스트용 주소
const testAddress = "0xc94d80003cd324aaef30a5789d6a21a0d8e8fb3e40165e5be2c27eaab033d55f"; // 여기에 확인하고 싶은 실제 Aptos 주소를 입력하세요.
const benAddress = "0x3a8e4a6d4e3d38329012d48f1703b62314070285ee85c06e5a1e29fcce7d8cab";

const noditAptos = new Aptos(noditConfig);
const aptos = new Aptos(aptosConfig);

// 특정 주소의 APT 잔액을 가져오는 함수
async function main() {
	try {
		// const getBlockByHeightResponse = await aptos.getBlockByHeight({
		// 	blockHeight: 160155267,
		// });
		// console.log(`▶️ get block by height response:`, getBlockByHeightResponse);

		// const getAccountModuleResponse = await aptos.getAccountModule({
		// 	accountAddress: "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa",
		// 	moduleName: "asset",
		// });
		// console.log(`▶️ get account module response:`, getAccountModuleResponse);

		// const getEventsResponse = await aptos.getEvents();
		// console.log(`▶️ get events response:`, getEventsResponse);

		// const getLedgerInfoResponse = await aptos.getLedgerInfo();
		// console.log(`▶️ get ledger info response:`, getLedgerInfoResponse);

		// const getProcessorStatusesResponse = await aptos.getProcessorStatus(ProcessorType.DEFAULT);
		// console.log(`▶️ get processor statuses response:`, getProcessorStatusesResponse);

		// const viewResponse = await aptos.view({
		// 	payload: {
		// 		function: "0x1::fungible_asset::store_exists",
		// 		functionArguments: ["0x1"],
		// 	},
		// });
		// console.log(`▶️ view response:`, viewResponse);

		// const getChainIdResponse = await aptos.getChainId();
		// const getAccountAPTAmountResponse = await aptos.getAccountAPTAmount({
		// 	accountAddress: benAddress,
		// });
		// const getLedgerInfo = await aptos.getLedgerInfo();
		// console.log("▶️ Aptos Labs");
		// console.log("ㄴ get chain id response:", getChainIdResponse);
		// console.log(`ㄴ get account APT amount response:`, getAccountAPTAmountResponse);
		// console.log(`ㄴ get ledger info response:`, getLedgerInfo);

		// const getChainIdResponseNodit = await noditAptos.getChainId();
		const getAccountAPTAmountResponseNodit = await noditAptos.getAccountAPTAmount({
			accountAddress: benAddress,
		});
		// const getLedgerInfoNodit = await noditAptos.getLedgerInfo();
		console.log("▶️ Nodit");
		// console.log("ㄴ get chain id response:", getChainIdResponseNodit);
		console.log(`ㄴ get account APT amount response:`, getAccountAPTAmountResponseNodit);
		// console.log(`ㄴ get ledger info response:`, getLedgerInfoNodit);
	} catch (error) {
		console.error("Error fetching APT balance:", error);
		throw error;
	}
}

main();
