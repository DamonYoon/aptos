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
    where: {
      owner_address: {
        _eq: "0x274c398a921b8e2ba345feac3039e1c8b196a7eb1395cdd3584af3a85eb9ec50"
      }
    }
    order_by: { transaction_version: desc }
  ) {
    amount
    asset_type
    block_height
    owner_address
    entry_function_id_str
    event_index
    gas_fee_payer_address
    is_frozen
    is_gas_fee
    is_transaction_success
    storage_id
    storage_refund_amount
    token_standard
    transaction_timestamp
    transaction_version
    type
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
