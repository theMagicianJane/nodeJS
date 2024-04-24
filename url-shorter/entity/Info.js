import {Model} from 'objection';

export default class Info extends Model {
  static get tableName(){
    return 'info'
  }
}