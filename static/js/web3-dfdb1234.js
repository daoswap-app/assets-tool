import{W as n}from"./web3.min-16c48c0e.js";function o(t){return n.utils.toChecksumAddress(t)}function s(t,e,r){return e?new r.eth.Contract(t,o(e)):new r.eth.Contract(t)}function u(t,e){return e.utils.fromWei(t,"ether")}function h(t,e){return e.utils.toWei(t.toString(),"ether")}export{h as e,s as g,u as w};