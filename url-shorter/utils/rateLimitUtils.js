const currentDate = Date.now();
const defaultData = {
  requests: 1,
  firstRequestDate: currentDate,
  createdDate: currentDate };

function stringify (obj) { return JSON.stringify(obj) }

function getUser(req){
  const auth = req.header("Authorization");
  if (auth?.startsWith("Basic ")) {
    const [name,] = auth.substring(6, auth.length).split(":");

    return name;
  }
}

export { stringify, defaultData, currentDate, getUser}