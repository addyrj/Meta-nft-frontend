import { RPC_URL } from "src/constants";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [
    1, 3, 4, 5, 42, 56, 97, 43113, 9731, 9732, 43114, 137, 10, 42161, 25, 250, 1285,
    1284, 321, 592,
  ],
});

export const SUPPORTED_WALLETS = [
  {
    name: "METAMASK",
    data: {
      connector: injected,
      name: "MetaMask",
      iconName: "/images/metamask.webp",
      description: "Easy-to-use browser extension.",
      href: null,
      color: "#E8831D",
    },
  },
];
