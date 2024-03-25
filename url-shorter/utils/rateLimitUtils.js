const currentDate = Date.now();
const defaultData = {
  requests: 1,
  firstRequestDate: currentDate,
  createdDate: currentDate };
function stringify (obj) { return JSON.stringify(obj) }

export { stringify, defaultData, currentDate}