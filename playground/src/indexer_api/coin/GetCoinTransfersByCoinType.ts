import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  fungible_asset_activities(
    limit: 5
    offset: 0
    where: {asset_type: {_eq: "0x1::aptos_coin::AptosCoin"}}
    order_by: {transaction_version: desc}
  ) {
    type
    amount
    block_height
    asset_type
    event_index
    is_gas_fee
    entry_function_id_str
    is_transaction_success
    owner_address
    transaction_timestamp
    transaction_version
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
