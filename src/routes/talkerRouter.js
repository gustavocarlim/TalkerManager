const { Router } = require('express');
const readAndwriteFiles = require('../untils/readAndWriteFiles');

const router = Router();

router.get('/', async (_req, res) => {
  const talkers = await readAndwriteFiles.readTalker();
  res.status(200).json(talkers);
});

module.exports = router;    