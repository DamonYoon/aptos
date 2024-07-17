import { AptosConfig, Aptos, AccountAddressInput } from "@aptos-labs/ts-sdk";

// AptosConfig 설정
const config = new AptosConfig({
	fullnode: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1", // APTOS 노드를 연결한 프로젝트의 API-KEY를 입력하세요.
});

// 테스트용 주소
const testAddress = "0x8d2d7bcde13b2513617df3f98cdd5d0e4b9f714c6308b9204fe18ad900d92609"; // 여기에 확인하고 싶은 실제 Aptos 주소를 입력하세요.

const aptos = new Aptos(config);

// 특정 주소의 APT 잔액을 가져오는 함수
async function getAptBalance(address: AccountAddressInput) {
	try {
		// 주소의 리소스 정보 가져오기
		const resources = await aptos.getAccountResources({
			accountAddress: address,
		});

		// APT 잔액 정보가 있는 리소스 필터링
		const coinResource = resources.find(
			(resource) => resource.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
		);

		// APT 잔액 반환
		if (coinResource) {
			return coinResource.data;
		} else {
			throw new Error("APT balance not found for the given address.");
		}
	} catch (error) {
		console.error("Error fetching APT balance:", error);
		throw error;
	}
}

// 잔액 확인
getAptBalance(testAddress)
	.then((balance) => {
		console.log(`APT Balance for address ${testAddress}:`, balance);
	})
	.catch((error) => {
		console.error("Failed to fetch APT balance:", error);
	});
