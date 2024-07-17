import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  current_token_datas_v2(
    limit: 5
    offset: 0
    where: {token_data_id: {_eq: "0x9a47523002a8940afaae60cb01d13ccea0408b17e958ebf1940a9f687785d6da"}}
  ) {
    decimals
    is_deleted_v2
    is_fungible_v2
    largest_property_version_v1
    maximum
    supply
    description
    last_transaction_timestamp
    last_transaction_version
    token_data_id
    token_name
    token_properties
    token_standard
    token_uri
    collection_id
    current_token_ownerships(where: {amount: {_eq: "1"}}) {
      owner_address
      token_data_id
      table_type_v1
      storage_id
      property_version_v1
      token_standard
      token_properties_mutated_v1
      amount
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
