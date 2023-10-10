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

module.exports = { readTalker };