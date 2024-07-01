package main

import "github.com/bbaktaeho/evmc"

func main() {
    client, err := evmc.New("https://ethereum-mainnet.nodit.io/2vuwVWC9mbbLvjz62todRS08YUDzHzf_")
	if err != nil {
		panic(err)
	}

    latest, err := client.Eth()
    if err != nil {
		panic(err)
	}

    println(latest)
}