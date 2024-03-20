export default class InfoModel{
  code;
  name;
  url;
  visits;
  created_time;
  user;


  constructor(code, name, url, visits, created_time, user) {
    this.code = code;
    this.name = name;
    this.url = url;
    this.visits = visits;
    this.created_time = created_time;
    this.user = user
  }
}