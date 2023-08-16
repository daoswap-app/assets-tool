import { compare } from "@/utils/array";
import { parseTime } from "@/utils/date";

// 根据交易信息获取日志数据
export async function getEventListByTransaction(
  contract: any,
  transaction: any
) {
  // 初始化数据
  const allEvents = [];
  let allEventsList = [];
  const blockArray = Array.from(new Set(transaction.blockArray));
  const getResultForBlock = blockArray.map(async (block: number) => {
    const options = {
      filter: {
        transactionId: transaction.id
      },
      fromBlock: block,
      toBlock: block
    };
    const allEventsTemp = await contract.getPastEvents("allEvents", options);
    allEventsList = allEventsList.concat(allEventsTemp);
  });
  await Promise.all(getResultForBlock);

  // 过滤日志
  const events = allEventsList.filter((item: any) => {
    if (
      item.returnValues.transactionId &&
      item.returnValues.transactionId == transaction.id
    ) {
      return item;
    }
  });
  if (events.length > 0) {
    const getResultForEvent = events.map(async (event: any) => {
      const eventItem = {
        eventName: event.event,
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        from: event.returnValues.owner,
        createTime: parseTime(event.returnValues.createTime)
      };
      allEvents.push(eventItem);
    });
    await Promise.all(getResultForEvent);
  }
  allEvents.sort(compare("blockNumber"));

  return allEvents;
}
