export const zh = {
  connect: {
    selectingWallet: {
      header: "可用钱包",
      sidebar: {
        heading: "",
        subheading: "连接您的钱包",
        paragraph: "连接钱包就像“登录”Web3。从选项中选择您的钱包即可开始。"
      },
      recommendedWalletsPart1: "{app} 仅支持",
      recommendedWalletsPart2:
        "在这个平台上。请使用或安装一个受支持的钱包以继续",
      installWallet: "您没有安装任何 {app} 支持的钱包，请使用受支持的钱包",
      agreement: {
        agree: "我同意",
        terms: "条款和条件",
        and: "和",
        privacy: "隐私政策"
      }
    },
    connectingWallet: {
      header:
        "{connectionRejected, select, false {正在连接到 {wallet}...} other {连接被拒绝}}",
      sidebar: {
        subheading: "批准连接",
        paragraph: "请批准您钱包中的连接并授权访问以继续。"
      },
      mainText: "连接...",
      paragraph: "确保选择要授予访问权限的所有帐户。",
      previousConnection:
        "{wallet} 已经有一个挂起的连接请求，请打开 {wallet} 应用程序登录并连接。",
      rejectedText: "连接被拒绝！",
      rejectedCTA: "单击此处重试",
      primaryButton: "回到钱包"
    },
    connectedWallet: {
      header: "连接成功",
      sidebar: {
        subheading: "连接成功!",
        paragraph: "您的钱包现在已连接到"
      },
      mainText: "已连接"
    }
  },
  modals: {
    actionRequired: {
      heading: "Action required in {wallet}",
      paragraph: "Please switch the active account in your wallet.",
      linkText: "Learn more.",
      buttonText: "Okay"
    },
    switchChain: {
      heading: "Switch Chain",
      paragraph1:
        "{app} requires that you switch your wallet to the {nextNetworkName} network to continue.",
      paragraph2:
        "*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet."
    },
    confirmDisconnectAll: {
      heading: "Disconnect all Wallets",
      description:
        "Are you sure that you would like to disconnect all your wallets?",
      confirm: "Confirm",
      cancel: "Cancel"
    }
  },
  accountCenter: {
    connectAnotherWallet: "Connect another Wallet",
    disconnectAllWallets: "Disconnect all Wallets",
    currentNetwork: "Current Network",
    appInfo: "App Info",
    learnMore: "Learn More",
    gettingStartedGuide: "Getting Started Guide",
    smartContracts: "Smart Contract(s)",
    explore: "Explore",
    backToApp: "Back to dapp",
    poweredBy: "powered by",
    addAccount: "Add Account",
    setPrimaryAccount: "Set Primary Account",
    disconnectWallet: "Disconnect Wallet",
    copyAddress: "Copy Wallet address"
  },
  notify: {
    transaction: {
      txRequest: "Your transaction is waiting for you to confirm",
      nsfFail: "You have insufficient funds for this transaction",
      txUnderpriced:
        "The gas price for your transaction is too low, try a higher gas price",
      txRepeat: "This could be a repeat transaction",
      txAwaitingApproval:
        "You have a previous transaction waiting for you to confirm",
      txConfirmReminder: "Please confirm your transaction to continue",
      txSendFail: "You rejected the transaction",
      txSent: "Your transaction has been sent to the network",
      txStallPending:
        "Your transaction has stalled before it was sent, please try again",
      txStuck: "Your transaction is stuck due to a nonce gap",
      txPool: "Your transaction has started",
      txStallConfirmed:
        "Your transaction has stalled and hasn't been confirmed",
      txSpeedUp: "Your transaction has been sped up",
      txCancel: "Your transaction is being canceled",
      txFailed: "Your transaction has failed",
      txConfirmed: "Your transaction has succeeded",
      txError: "Oops something went wrong, please try again",
      txReplaceError:
        "There was an error replacing your transaction, please try again"
    },
    watched: {
      txPool:
        "Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
      txSpeedUp:
        "Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been sped up",
      txCancel:
        "Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been canceled",
      txConfirmed:
        "Your account successfully {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
      txFailed:
        "Your account failed to {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}",
      txStuck: "Your transaction is stuck due to a nonce gap"
    },
    time: {
      minutes: "分",
      seconds: "秒"
    }
  }
};
