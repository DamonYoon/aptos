import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  current_fungible_asset_balances(
    limit: 5
    offset: 0
    where: {asset_type: {_eq: "0x1::aptos_coin::AptosCoin"}}
    order_by: {amount: desc}
  ) {
    amount
    asset_type
    owner_address
    last_transaction_timestamp
    last_transaction_version
  }
}
      `,
		},
	};

	try {
		const response = await axios(options);
		console.log(JSON.stringify(response.data, null, 2));
	} catch (error) {
		console.error(error);
	}
}

graphqlQuery();
