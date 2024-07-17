// account.ts
import { Account, Secp256k1PrivateKey, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";

const myPrivateKey = "0x9df636437d08620680f087ece930c87cfa4d960f224d28ea543e75ddd6cef50c"; // key 값 예제 0x1234..
const privateKey = new Ed25519PrivateKey(myPrivateKey);
const account1 = Account.fromPrivateKey({ privateKey });

const secp256K1PrivateKey = new Secp256k1PrivateKey(myPrivateKey);
const account2 = Account.fromPrivateKey({ privateKey: secp256K1PrivateKey });

// get account address
console.log("account address1:", account1.accountAddress.toString());
console.log("account address2:", account2.accountAddress.toString());
