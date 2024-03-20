const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const getRandomCharacter = () => characters.charAt(Math.floor(Math.random() * characters.length));
const generateHash = () => Array(5).fill(null).map(_ => getRandomCharacter()).join('');

const generateUrl = () => `http://127.0.0.1/${generateHash()}`;
export { generateHash, generateUrl };