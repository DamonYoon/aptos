import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  fungible_asset_metadata(
    where: {creator_address: {_in: ["0xbd35135844473187163ca197ca93b2ab014370587bb0ed3befff9e902d6bb541", "0x61d2c22a6cb7831bee0f48363b0eec92369357aece0d1142062f7d5d85c7bef8"]}}
    limit: 5
    offset: 0
    order_by: {creator_address: asc}
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
