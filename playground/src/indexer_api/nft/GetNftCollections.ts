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
    where: {collection_id: {_eq: "0x7ac8cecb76edbbd5da40d719bbb9795fc5744e4098ee0ce1be4bb86c90f42301"}}
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
    current_collection {
      creator_address
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
