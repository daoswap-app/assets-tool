import {
  EventFromBlock,
  EventMaxQueryNumber,
  EventNameList
} from "@/config/constants";
import { compare } from "@/utils/array";
import { parseTime } from "@/utils/date";

// 获取日志数据
export async function getEventsList(
  contract: any,
  chainId: any,
  web3: any,
  filter: any
) {
  // 初始化数据
  const fromBlock = EventFromBlock[chainId];
  const latestBlock = await web3.eth.getBlockNumber();
  const blockMod = Math.ceil((latestBlock - fromBlock) / EventMaxQueryNumber);
  // 获取event数据
  const allEvents = [];
  if (EventNameList.length > 0) {
    for (let index = 0; index < blockMod; index++) {
      const fromBlockValue = fromBlock + EventMaxQueryNumber * index;
      const toBlockCalc = fromBlockValue + EventMaxQueryNumber - 1;
      const toBlockValue =
        latestBlock > toBlockCalc ? toBlockCalc : latestBlock;
      // console.info(fromBlockValue + "-------------------" + toBlockValue);
      // console.info(fromBlockValue >= latestBlock);
      if (fromBlockValue >= latestBlock) {
        break;
      }
      const options = {
        filter: filter,
        fromBlock: fromBlockValue,
        toBlock: toBlockValue
      };
      // 按日志名查询日志数据
      const getResultForEvent = EventNameList.map(async (eventName: string) => {
        const tempAllEvents = await contract.getPastEvents(eventName, options);
        if (tempAllEvents.length > 0) {
          const getResultForTempEvent = tempAllEvents.map(
            async (event: any) => {
              const txDetail = await web3.eth.getTransaction(
                event.transactionHash
              );
              const eventItem = {
                eventName: event.event,
                ...event.returnValues,
                ...{
                  transactionHash: event.transactionHash,
                  blockNumber: event.blockNumber,
                  from: txDetail.from,
                  createTime: parseTime(event.returnValues.createTime)
                }
              };
              allEvents.push(eventItem);
            }
          );
          await Promise.all(getResultForTempEvent);
        }
      });
      await Promise.all(getResultForEvent);
    }
    allEvents.sort(compare("blockNumber"));
  }
  return allEvents;
}
