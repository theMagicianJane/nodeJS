const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const getRandomCharacter = () => characters.charAt(Math.floor(Math.random() * characters.length));
const generateHash = () => Array(5).fill(null).map(_ => getRandomCharacter()).join('');

export default generateHash;