const rpcEndpoint =
  process.env.NEXT_PUBLIC_RPC_ENDPOINT || "http://localhost:8899";
const rpcEndpointWs =
  process.env.NEXT_PUBLIC_RPC_ENDPOINT_WS || "ws://localhost:8899";

export const config = {
  rpcEndpoint,
    rpcEndpointWs,
};
