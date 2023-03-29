import Web3 from "web3";

/**
 * 格式化Token
 * @returns token
 */
export function toChecksumAddress(token) {
  return Web3.utils.toChecksumAddress(token);
}

/**
 * 检查Token
 * @returns token
 */
export function checkAddressChecksum(token) {
  return Web3.utils.checkAddressChecksum(token);
}

/**
 * 获取合约
 * @returns contract
 */
export function getContract(contractJson, token, web3) {
  return getContractByABI(contractJson.abi, token, web3);
}

/**
 * 获取合约
 * @returns contract
 */
export function getContractByABI(contractABI, token, web3) {
  if (!token) {
    return new web3.eth.Contract(contractABI);
  } else {
    return new web3.eth.Contract(contractABI, toChecksumAddress(token));
  }
}

/**
 * 格式化Wei To Ether
 * @returns etherValue
 */
export function weiToEther(amount, web3) {
  return web3.utils.fromWei(amount, "ether");
}

/**
 * 格式化Ether To Wei
 * @returns weiValue
 */
export function etherToWei(amount, web3) {
  return web3.utils.toWei(amount.toString(), "ether");
}
