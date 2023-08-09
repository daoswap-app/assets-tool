import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";
import ERC20_ABI from "@/assets/abi/ERC20_abi.json";

import InputDataDecoder from "ethereum-input-data-decoder";
const decoderForERC20 = new InputDataDecoder(ERC20_ABI);
const decoderForWallet = new InputDataDecoder(MultiSigWallet_ABI);

import { TOKEN_LIST, type TokenListType } from "@/config/constants";
import { weiToEther } from "@/utils/web3";

/**
 * 处理转账交易数据
 * @param transaction
 * @param web3
 * @returns
 */
export function decodeParamsForTransfer(transaction, chainInfo, web3) {
  const returnData = {
    destination: transaction.to,
    tokenSymbol: "",
    value: null,
    data: null,
    type: 1, // 处理交易数据，1-转账，2-操作
    methodName: "transfer"
  };

  const transactionData = transaction.data
    ? decoderForERC20.decodeData(transaction.data)
    : null;
  returnData.tokenSymbol = chainInfo.token;
  returnData.value = weiToEther(transaction.value, web3);
  if (transactionData) {
    const tokenList = TOKEN_LIST[chainInfo.chainId].filter(
      (item: TokenListType) =>
        item.token.toLowerCase() === transaction.to.toLowerCase()
    );
    returnData.tokenSymbol =
      tokenList.length > 0 ? tokenList[0].symbol : chainInfo.token;
    returnData.destination = transactionData.inputs[0];
    returnData.value = weiToEther(
      new web3.utils.toBN(transactionData.inputs[1].toString()),
      web3
    );
    returnData.data = {
      to: transactionData.inputs[0],
      value: weiToEther(
        new web3.utils.toBN(transactionData.inputs[1].toString()),
        web3
      )
    };
  }
  return returnData;
}

/**
 * 处理其它类型交易数据
 * @param transaction
 * @param web3
 * @returns
 */
export function decodeParamsForOperation(transaction) {
  const returnData = {
    destination: transaction.to,
    tokenSymbol: "",
    value: null,
    data: null,
    type: 2, // 处理交易数据，1-转账，2-操作
    methodName: ""
  };
  const transactionData = transaction.data
    ? decoderForWallet.decodeData(transaction.data)
    : null;
  if (transactionData) {
    returnData.methodName = transactionData.method;
  }
  if (transactionData.method == "addOwnerWithThreshold") {
    returnData.data = [
      {
        name: "ParamsAddOwner",
        value: transactionData.inputs[0]
      },
      {
        name: "ParamsThreshold",
        value: transactionData.inputs[1].toString()
      }
    ];
  } else if (transactionData.method == "changeThreshold") {
    returnData.data = [
      {
        name: "ParamsThreshold",
        value: transactionData.inputs[0].toString()
      }
    ];
  } else if (transactionData.method == "swapOwner") {
    returnData.data = [
      {
        name: "ParamsOldOwner",
        value: transactionData.inputs[1]
      },
      {
        name: "ParamsNewOwner",
        value: transactionData.inputs[2]
      }
    ];
  } else if (transactionData.method == "removeOwner") {
    returnData.data = [
      {
        name: "ParamsRemoveOwner",
        value: transactionData.inputs[1]
      },
      {
        name: "ParamsThreshold",
        value: transactionData.inputs[2].toString()
      }
    ];
  }
  return returnData;
}
