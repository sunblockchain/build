import { ChainId } from "@pancakeswap/chains";
import { ERC20Token } from "@pancakeswap/sdk";

// For StoryBook
export const cakeToken = new ERC20Token(
  ChainId.BSC,
  "0x228e2A0011662AE5A7176B279F590b2A58116DEF",
  18,
  "CBL",
  "Ciberliness",
  "https://ciberliness.com/"
);

export const bscToken = new ERC20Token(
  ChainId.BSC,
  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  18,
  "BNB",
  "BNB",
  "https://www.binance.com/"
);
