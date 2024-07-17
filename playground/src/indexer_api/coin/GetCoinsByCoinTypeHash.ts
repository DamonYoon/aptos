import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  fungible_asset_metadata(
    order_by: {last_transaction_timestamp: desc}
    where: {asset_type: {_in: ["0x1::aptos_coin::AptosCoin", "0xd50698729b7fdf58d7f0bb793e1e8da4c5b78c89882aeeaccdd71f93aaf81976::aptx_coin::AptxCoin"]}}
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
