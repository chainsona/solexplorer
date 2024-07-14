export async function GET() {
  const response = await fetch("https://tokens.jup.ag/tokens?tags=community");
  const data = await response.json();
  const coins = data
    .filter((coin: any) => !coin.symbol.match(/(SOL|USD)/g))
    .map((coin: any) => ({
      name: coin.name,
      image: ((coin.logoURI as string) || "").startsWith("file://")
        ? ""
        : coin.logoURI,
      url: `https://jup.ag/swap/SOL-${coin.address}`,
    }))
    .slice(0, 10);

  return Response.json({ coins });
}
