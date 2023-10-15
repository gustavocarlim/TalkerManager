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

const writeTalker = async (newTalker) => {
  try {
    const oldTalkers = await readTalker();
    oldTalkers.push(newTalker);

    return await fs.writeFile('src/talker.json', JSON.stringify(oldTalkers));
  } catch (error) {
    const err = new Error('Error writing file');
    err.statusCode = 500;
    throw err;
  }
};

const findTalkerById = async (id) => {
  try {
    const arrayFirst = await readTalker();
    const finded = arrayFirst.find((item) => item.id === id);
    return finded;
  } catch (error) {
    const err = new Error('Error opening file');
    err.statusCode = 500;
    throw err;
  }
};
module.exports = { readTalker, findTalkerById, writeTalker };