/*
To run an Ethereum node, you must run one of the various Ethereum client implementations.
    1. geth: Ethereum client written in Go
    2. erigon: Ethereum client also written in Go
    3. nethermind: Ethereum client written in .NET
*/

/*
Intro to JSON-RPC:
    1. JSON-RPC is a remote procedure call (RPC) protocol that uses JSON to encode messages.
    {
      "jsonrpc":"2.0",
      "method":"eth_getBalance",
      "params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],
      "id":0
    }
    2. JSON stands for Java Script Object Notation RPC stands for Remote Procedure Call.
    Query:
    curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}' https://eth-mainnet.alchemyapi.io/v2/gZgOOh1X3cpVWXeVR9EL51zC1vpbggIF
    Response:
    {
      "jsonrpc": "2.0",
      "id": 83, 
      "result": "0xc30ba7" // block number in hex format, 12782503
    } 
*/
