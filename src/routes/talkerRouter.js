const { Router } = require('express');
const readAndwriteFiles = require('../untils/readAndWriteFiles');

const router = Router();

router.get('/', async (_req, res) => {
  const talkers = await readAndwriteFiles.readTalker();
  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readAndwriteFiles.readTalker();
  const selectedTalker = talkers.find((talker) => talker.id === Number(id));
  if (!selectedTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(selectedTalker);
});

module.exports = router;    