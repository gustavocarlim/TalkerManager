const { Router } = require('express');
const readAndwriteFiles = require('../untils/readAndWriteFiles');

const router = Router();

router.get('/talker', async (_req, res) => {
  const talkers = await readAndwriteFiles.readTalker();
  res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readAndwriteFiles.findTalkerById(Number(id)); 
  if (talker) return res.status(200).json(talker);
  return res.status(404).json(
    { message: 'Pessoa palestrante não encontrada' },
  );
});

module.exports = router;   