import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  token_activities_v2(
    limit: 5
    offset: 0
    order_by: {transaction_version: desc}
    where: {current_token_data: {current_collection: {creator_address: {_in: ["0xf932dcb9835e681b21d2f411ef99f4f5e577e6ac299eebee2272a39fb348f702"]}}}}
  ) {
    current_token_data {
      current_collection {
        collection_id
        collection_name
        creator_address
      }
      token_name
    }
    event_account_address
    event_index
    property_version_v1
    token_data_id
    transaction_timestamp
    type
    transaction_version
    token_standard
    token_amount
    to_address
    from_address
    is_fungible_v2
    entry_function_id_str
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
