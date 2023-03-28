declare global {
  interface Window {
    isDesktop?: boolean;
    ethereum?: {
      autoRefreshOnNetworkChange: boolean;
      isMetaMask: boolean;
      _metamask: {
        isUnlocked: () => Promise<boolean>;
      };
    };
    Cypress?;
  }
}

export {};
