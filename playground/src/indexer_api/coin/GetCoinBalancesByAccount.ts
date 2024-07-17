import axios from "axios";

async function graphqlQuery() {
	const options = {
		url: "https://aptos-mainnet.nodit.io/ySlJhVem4Ajmx5F6WesnWhG0IEko6IPE/v1/graphql",
		method: "POST",
		data: {
			query: `
query MyQuery {
  current_fungible_asset_balances(
    where: {owner_address: {_eq: "0x274c398a921b8e2ba345feac3039e1c8b196a7eb1395cdd3584af3a85eb9ec50"}}
  ) {
    owner_address
    amount
    asset_type
    storage_id
    token_standard
    last_transaction_version
    is_primary
    last_transaction_timestamp
    is_frozen
    metadata {
      asset_type
      creator_address
      decimals
      icon_uri
      last_transaction_timestamp
      last_transaction_version
      name
      project_uri
      symbol
      token_standard
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
