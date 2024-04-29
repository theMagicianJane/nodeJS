import UserRepository from '../repository/userRepository.js';


export default class UserService{
  constructor() {
    this.userRepository = new UserRepository()
  }

  create(id, login, email, user_type, user_name, password){
    this.userRepository.save(id, login, email, user_type, user_name, password);
  }

  getUsersPublicData() {
    return this.userRepository.getAll();
  }

  async checkPassword(user_name, password) {
    if(!user_name || !password){
      return false;
    }

    const user = await this.userRepository.getUserByName(user_name)

    return user?.password === password;
  }

  async getUser(userId){
    return await this.userRepository.get(userId);
  }

  async getUserByName(name){
    return await this.userRepository.getUserByName(name);
  }
}