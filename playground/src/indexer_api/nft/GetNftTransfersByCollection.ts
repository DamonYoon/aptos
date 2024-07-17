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
    where: {current_token_data: {collection_id: {_eq: "0x7ac8cecb76edbbd5da40d719bbb9795fc5744e4098ee0ce1be4bb86c90f42301"}}}
  ) {
    transaction_version
    type
    transaction_timestamp
    token_standard
    token_data_id
    token_amount
    to_address
    from_address
    event_index
    event_account_address
    entry_function_id_str
    before_value
    is_fungible_v2
    property_version_v1
    after_value
    current_token_data {
      collection_id
      decimals
      description
      is_deleted_v2
      is_fungible_v2
      largest_property_version_v1
      last_transaction_version
      token_data_id
      token_name
      token_standard
      token_uri
      token_properties
      supply
      maximum
      last_transaction_timestamp
    }
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
