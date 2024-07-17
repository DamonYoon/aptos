import { ethers } from "ethers";
import axios from "axios";

// ERC20 토큰 전송 함수
async function sendERC20TokenWithDcContract(
	rpcUrl: string,
	contractAddress: string,
	fromAddress: string,
	privateKey: string,
	toAddress: string,
	dcContract: string,
	nonce: number
) {
	// JSON-RPC 프로바이더와 지갑 설정
	const provider = new ethers.JsonRpcProvider(rpcUrl);
	const wallet = new ethers.Wallet(privateKey, provider);

	const transferFunctionSignature = "0xa9059cbb";
	const paddedToAddress = `${toAddress.slice(2).padStart(64, "0")}`;
	const amount = "000000000000000000000000000000000000000000000000000000000000000a"; // amount: 10
	const useDcContract = `111100001111${dcContract.slice(2)}`;
	const dataUsingDcContract = transferFunctionSignature + paddedToAddress + amount + useDcContract;

	// erc20 transfer tx object 생성
	const transferTxObject = {
		from: fromAddress,
		to: contractAddress,
		gasLimit: "100000",
		gasPrice: "300000000000",
		data: dataUsingDcContract,
		chainId: 256,
		value: 0,
		nonce,
	};

	// 트랜잭션 서명
	const signedTx = await wallet.signTransaction(transferTxObject);

	// 서명된 트랜잭션을 이더리움 네트워크로 전송
	const response = await axios.post(rpcUrl, {
		jsonrpc: "2.0",
		id: 1,
		method: "eth_sendRawTransaction",
		params: [signedTx],
	});

	console.log(JSON.stringify(response.data));

	await new Promise((resolve) => setTimeout(resolve, 2000));
	// 트랜잭션 해시 반환
	return response.data.result;
}

(async () => {
	const rpcUrl = ""; // RPC endpoint
	const dcContract = "DC_Contract_Address"; // 개인계정
	const contractAddress = "ERC20_Contract_Address"; // ERC20 contract 주소

	/** EOA */
	const fromAddress = "From_Address"; // 보내는 주소
	const privateKey = "Your_Private_Key"; // 개인 키
	const toAddress = "To_Address"; // 받는 주소
	const provider = new ethers.JsonRpcProvider(rpcUrl);
	const wallet = new ethers.Wallet(privateKey, provider);
	const nonce = await wallet.getNonce();
	const nextNonce = nonce + 1;

	sendERC20TokenWithDcContract(rpcUrl, contractAddress, fromAddress, privateKey, toAddress, dcContract, nextNonce)
		.then((txHash) => {
			console.log(`Transaction hash: ${txHash}`);
		})
		.catch((error) => {
			console.error(error);
		});
})();
