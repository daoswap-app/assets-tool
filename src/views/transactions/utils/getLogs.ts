import {
  EventFromBlock,
  EventMaxQueryNumber,
  TransactionType
} from "@/config/constants";
import { compare } from "@/utils/array";
import { parseTime } from "@/utils/date";
// import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";

// TODO: delete 根据合约获取事件数据
function getJsonInterface(contract: any) {
  const EventNameList = [];
  const EventList = [];
  Object.entries(TransactionType).forEach(([eventName]) => {
    EventNameList.push(eventName);
  });
  const jsonInterface = contract.options.jsonInterface;
  Object.entries(TransactionType).forEach(([typeName]) => {
    const eventObj = jsonInterface.find(function (json: any) {
      return (
        json.type === "event" &&
        (json.name === typeName ||
          json.signature === "0x" + typeName.replace("0x", ""))
      );
    });
    EventList.push(eventObj);
  });
  return EventList;
}

// TODO: delete 获取日志数据
export async function getLogsList(
  contract: any,
  chainId: number,
  address: string,
  web3: any
) {
  // 初始化数据
  const fromBlock = EventFromBlock[chainId];
  const allLogs = [];
  const jsonInterface = contract.options.jsonInterface;
  Object.entries(TransactionType).forEach(async ([typeName]) => {
    const eventString = jsonInterface.find(function (json: any) {
      return (
        json.type === "event" &&
        (json.name === typeName ||
          json.signature === "0x" + typeName.replace("0x", ""))
      );
    });
    const filter = {
      fromBlock: fromBlock,
      toBlock: "latest",
      address: address,
      topics: [eventString.signature]
    };
    const allLogsTemp = await web3.eth.getPastLogs(filter);
    if (allLogsTemp.length > 0) {
      const getResultForTempEvent = allLogsTemp.map(async (log: any) => {
        const txDetail = await web3.eth.getTransactionReceipt(
          log.transactionHash
        );
        console.info(txDetail);
        const blockDetail = await web3.eth.getBlock(log.blockHash);
        const logItem = {
          transactionHash: log.transactionHash,
          blockNumber: log.blockNumber,
          from: txDetail.from,
          eventName: typeName,
          ...{
            from: txDetail.from,
            createTime: parseTime(blockDetail.timestamp)
          }
        };
        allLogs.push(logItem);
      });
      await Promise.all(getResultForTempEvent);
    }
  });

  allLogs.sort(compare("blockNumber"));

  return allLogs;
}

// TODO: delete 获取日志数据
export async function getEventsList(
  contract: any,
  chainId: any,
  web3: any,
  filter: any
) {
  const EventList = getJsonInterface(contract);
  // 初始化数据
  const fromBlock = EventFromBlock[chainId];
  const latestBlock = await web3.eth.getBlockNumber();
  const blockMod = Math.ceil((latestBlock - fromBlock) / EventMaxQueryNumber);
  // 获取event数据
  const allEvents = [];
  for (let index = 0; index < blockMod; index++) {
    const fromBlockValue = fromBlock + EventMaxQueryNumber * index;
    const toBlockCalc = fromBlockValue + EventMaxQueryNumber - 1;
    const toBlockValue = latestBlock > toBlockCalc ? toBlockCalc : latestBlock;
    console.info(blockMod + "-" + index);
    if (fromBlockValue >= latestBlock) {
      break;
    }
    const options = {
      filter: filter,
      fromBlock: fromBlockValue,
      toBlock: toBlockValue
    };
    // 按日志名查询日志数据
    const getResultForEvent = EventList.map(async eventObj => {
      const tempAllEvents = await contract.getPastEvents(
        eventObj.name,
        options
      );
      if (tempAllEvents.length > 0) {
        const getResultForTempEvent = tempAllEvents.map(async (event: any) => {
          const eventItem = {
            eventName: event.event,
            blockNumber: event.blockNumber,
            transactionHash: event.transactionHash,
            from: event.returnValues.owner,
            createTime: parseTime(event.returnValues.createTime)
          };
          allEvents.push(eventItem);
        });
        await Promise.all(getResultForTempEvent);
      }
    });
    await Promise.all(getResultForEvent);
  }
  allEvents.sort(compare("blockNumber"));

  return allEvents;
}

// TODO: delete 获取日志数据
export async function getEventsAllList(
  contract: any,
  chainId: any,
  web3: any,
  filter: any
) {
  // const EventList = getJsonInterface(contract);
  // 初始化数据
  const fromBlock = EventFromBlock[chainId];
  const allEvents = [];
  const allEventsTemp = await contract.getPastEvents("allEvents", {
    filter: filter,
    fromBlock: fromBlock,
    toBlock: "latest"
  });

  // 过滤日志
  const events = await allEventsTemp.filter((item: any) => {
    if (
      item.returnValues.transactionId &&
      item.returnValues.transactionId == filter.transactionId
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

// TODO: delete 根据日志名称获取日志数据
export async function getEventListByName(
  contract: any,
  chainId: any,
  web3: any,
  filter: any
) {
  const EventList = getJsonInterface(contract);
  // 初始化数据
  const fromBlock = EventFromBlock[chainId];
  const allEvents = [];
  // 按日志名查询日志数据
  const getResultForEvent = EventList.map(async eventObj => {
    const options = {
      filter: filter,
      fromBlock: fromBlock,
      toBlock: "latest",
      topics: []
    };
    const transactionIdEncode = web3.eth.abi.encodeParameter(
      "uint256",
      filter.transactionId
    );
    // 处理topics
    options.topics[0] = eventObj.signature;
    const getResultForOptionsTopics = await eventObj.inputs.map(
      (item: any, index: number) => {
        if (item.name === "transactionId") {
          const topicsIndex = index <= 3 ? index + 1 : 3;
          // 处理 transactionId
          options.topics[topicsIndex] = transactionIdEncode;
          return item;
        }
      }
    );
    await Promise.all(getResultForOptionsTopics);
    const tempAllEvents = await contract.getPastEvents(eventObj.name, options);
    if (tempAllEvents.length > 0) {
      const getResultForTempEvent = tempAllEvents.map(async (event: any) => {
        const eventItem = {
          eventName: event.event,
          blockNumber: event.blockNumber,
          transactionHash: event.transactionHash,
          from: event.returnValues.owner,
          createTime: parseTime(event.returnValues.createTime)
        };
        allEvents.push(eventItem);
      });
      await Promise.all(getResultForTempEvent);
    }
  });
  await Promise.all(getResultForEvent);

  // Object.entries(TransactionType).forEach(async ([typeName]) => {
  //   contract.events?.[typeName]({
  //     filter: filter,
  //     fromBlock: fromBlock
  //   })
  //     .on("data", function (event) {
  //       // console.log(event); // 与上述可选的回调结果相同
  //       const logItem = {
  //         transactionHash: event.transactionHash,
  //         blockNumber: event.blockNumber,
  //         eventName: typeName,
  //         ...{
  //           from: event.returnValues.owner,
  //           createTime: parseTime(event.returnValues.createTime)
  //         }
  //       };
  //       allEvents.push(logItem);
  //     })
  //     .on("error", function (error, receipt) {
  //       // 如果交易被网络拒绝并带有交易收据，第二个参数将是交易收据。
  //       console.log(error);
  //       console.log(receipt);
  //     });
  // });

  allEvents.sort(compare("blockNumber"));

  return allEvents;
}

// 根据交易信息获取日志数据
export async function getEventListByTransaction(
  contract: any,
  transaction: any
) {
  // 初始化数据
  const allEvents = [];
  let allEventsList = [];

  const getResultForBlock = transaction.blockArray.map(
    async (block: number) => {
      const options = {
        filter: {
          transactionId: transaction.id
        },
        fromBlock: block,
        toBlock: block
      };
      const allEventsTemp = await contract.getPastEvents("allEvents", options);
      allEventsList = allEventsList.concat(allEventsTemp);
    }
  );
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
