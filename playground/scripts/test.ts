import { Account, AccountAddress, Aptos, AptosConfig, Ed25519PrivateKey, Network } from "@aptos-labs/ts-sdk";

async function test() {
	const privateKey = new Ed25519PrivateKey("0x9df636437d08620680f087ece930c87cfa4d960f224d28ea543e75ddd6cef50c");
	const account = Account.fromPrivateKey({
		privateKey,
	});

	console.log(account.accountAddress.toString());
}

test();
