import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  fungible_asset_metadata(
    order_by: {name: asc}
    where: {name: {_gte: "A", _lte: "B"}}
    limit: 5
    offset: 0
  ) {
    asset_type
    name
    creator_address
    decimals
    symbol
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
