import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  current_collections_v2(
    limit: 5
    offset: 0
    order_by: {last_transaction_version: asc}
    where: {creator_address: {_eq: "0xf932dcb9835e681b21d2f411ef99f4f5e577e6ac299eebee2272a39fb348f702"}}
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
