import { PulseToken } from "@/components/pulse/types";

const VOLATILITY_PERCENT = 0.02; // 2% variance

function getPercentageDelta(value: number) {
  const change = (Math.random() - 0.5) * 2 * VOLATILITY_PERCENT;
  return value * change;
}

function randomTxIncrement(): number {
  return Math.floor(Math.random() * 5) + 1; // +1 to +5
}

export function updateTokens(tokens: PulseToken[]) {
  return tokens.map(token => {
    // Apply changes ensuring values stay positive
    const marketCapChange = Math.max(0, token.marketCap + getPercentageDelta(token.marketCap));
    const liquidityChange = Math.max(0, token.liquidity + getPercentageDelta(token.liquidity));
    const volumeChange = Math.max(0, token.volume + getPercentageDelta(token.volume));

    const txIncrement = token.txCount + randomTxIncrement();

    return {
      ...token,
      marketCap: marketCapChange,
      liquidity: liquidityChange,
      volume: volumeChange,
      txCount: txIncrement,
      ageSeconds: token.ageSeconds + 1,
    }
  })
}