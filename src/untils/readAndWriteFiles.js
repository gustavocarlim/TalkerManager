const fs = require('fs/promises');

const readTalker = async () => {
  try {
    const talkerContent = await fs.readFile('src/talker.json', 'utf-8');

    return JSON.parse(talkerContent);
  } catch (error) {
    const err = new Error('Error opening file');
    err.statusCode = 500;
    throw err;
  }
}; 

const findTalkerById = async (id) => {
  try {
    console.log(typeof id);
    const arrayFirst = await readTalker();
    console.log('arrayfirst', arrayFirst);
    const finded = arrayFirst.find((item) => item.id === id);
    console.log('finded', finded);
    return finded;
  } catch (error) {
    const err = new Error('Error opening file');
    err.statusCode = 500;
    throw err;
  }
};
module.exports = { readTalker, findTalkerById };