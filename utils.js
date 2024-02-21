const generateHash = stringLength => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const getItem = () => characters.charAt(Math.floor(Math.random() * characters.length));
  const generatedString = Array(stringLength).fill(null).map(_ => getItem()).join('');

  if (!stringLength || typeof stringLength !== 'number') return 'string length must be type number';
  if (stringLength <= 0) return 'string length must be more then 0';

  return generatedString;
}

module.exports = {
  generateHash,
}