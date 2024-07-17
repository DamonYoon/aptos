import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  current_token_ownerships_v2(
    limit: 5
    offset: 0
    where: {current_token_data: {collection_id: {_eq: "0x7ac8cecb76edbbd5da40d719bbb9795fc5744e4098ee0ce1be4bb86c90f42301"}}}
    order_by: {owner_address: asc}
    distinct_on: owner_address
  ) {
    owner_address
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
