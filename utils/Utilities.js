async function randStr(lengthOfStr) {
  let strGen = "";
  let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let randInt = 0;
  for (let i = 0; i < lengthOfStr; i++) {
    if (i == 0) {
      do {
        randInt = await randNum(chars.length);
      } while (await isNumber(chars.charAt(randInt)));
      strGen = chars.charAt(randInt);
    } else {
      strGen += chars.charAt(await randNum(chars.length));
    }
  }
  return strGen;
}
export { randStr };

async function isNumber(char) {
  return typeof char === "string" && /^\d$/.test(char);
}

async function randNum(charsLenght) {
  let randInt = 0;
  for (let i = 0; i < charsLenght; i++) {
    randInt = Math.floor(Math.random(i) * charsLenght);
    break;
  }
  return randInt;
}
