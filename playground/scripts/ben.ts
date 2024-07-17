import {
	Account,
	AccountAddress,
	Aptos,
	AptosConfig,
	Ed25519PrivateKey,
	Network,
	NetworkToNetworkName,
} from "@aptos-labs/ts-sdk";

const APTOS_NETWORK: Network = NetworkToNetworkName[process.env.APTOS_NETWORK ?? Network.DEVNET];
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);

function createAnAccountFromPrivateKey(): Account {
	const myPrivateKey = "0x9df636437d08620680f087ece930c87cfa4d960f224d28ea543e75ddd6cef50c";

	const privateKey = new Ed25519PrivateKey(myPrivateKey);
	const account = Account.fromPrivateKey({ privateKey });

	console.log("account1 : ", account);
	console.log("account1 : ", account.accountAddress.toString());

	return account;
}
const myAccount = createAnAccountFromPrivateKey();
// 모듈 주소 변경 필요(새로 배포 예정)
async function mintFA(fromAccount: Account, toAddress: string, amount: number) {
	const myAccount = createAnAccountFromPrivateKey();
	const transaction = await aptos.transaction.build.simple({
		sender: fromAccount.accountAddress.toString(),
		data: {
			function: "0xa7b3219901f0ef3fc21bb05078a858ca1486f4c5259397204ac91f35d4cef75a::fa_coin::mint",
			functionArguments: [toAddress, amount],
		},
	});

	const [simulationTransactionResponse] = await aptos.transaction.simulate.simple({
		signerPublicKey: myAccount.publicKey,
		transaction,
	});
	// checking simulationTransactionResponse
	console.log(simulationTransactionResponse);

	const senderAuthenticator = aptos.transaction.sign({
		signer: fromAccount,
		transaction,
	});

	const submitTransaction = await aptos.transaction.submit.simple({
		transaction,
		senderAuthenticator,
	});

	const executedTransaction = await aptos.waitForTransaction({
		transactionHash: submitTransaction.hash,
	});

	console.log(executedTransaction);
}

// mintFA(myAccount, myAccount.accountAddress.toString(), 100_000_000_000);
// 모듈 주소 변경 필요(새로 배포 예정)

async function transferFA(fromAccount: Account, toAddress: string, amount: number) {
	const transaction = await aptos.transaction.build.simple({
		sender: fromAccount.accountAddress.toString(),
		data: {
			function: "0xa7b3219901f0ef3fc21bb05078a858ca1486f4c5259397204ac91f35d4cef75a::fa_coin::transfer",
			functionArguments: [fromAccount.accountAddress.toString(), toAddress, amount],
		},
	});

	const [simulationTransactionResponse] = await aptos.transaction.simulate.simple({
		signerPublicKey: fromAccount.publicKey,
		transaction,
	});
	// checking simulationTransactionResponse
	console.log(simulationTransactionResponse);

	const senderAuthenticator = aptos.transaction.sign({
		signer: fromAccount,
		transaction,
	});

	const submitTransaction = await aptos.transaction.submit.simple({
		transaction,
		senderAuthenticator,
	});

	const executedTransaction = await aptos.waitForTransaction({
		transactionHash: submitTransaction.hash,
	});

	console.log(executedTransaction);
}

transferFA(
	myAccount,
	"0xa7b3219901f0ef3fc21bb05078a858ca1486f4c5259397204ac91f35d4cef75a",
	//0xa7b3219901f0ef3fc21bb05078a858ca1486f4c5259397204ac91f35d4cef75a
	10_000_000_000
);
