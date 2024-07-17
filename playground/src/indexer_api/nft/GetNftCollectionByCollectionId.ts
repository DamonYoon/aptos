import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  current_collections_v2(
    where: {collection_id: {_eq: "0x7ac8cecb76edbbd5da40d719bbb9795fc5744e4098ee0ce1be4bb86c90f42301"}}
  ) {
    collection_id
    collection_name
    creator_address
    description
    current_supply
    last_transaction_version
    last_transaction_timestamp
    max_supply
    mutable_description
    mutable_uri
    token_standard
    total_minted_v2
    uri
    table_handle_v1
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
