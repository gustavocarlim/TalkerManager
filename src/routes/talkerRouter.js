const { Router } = require('express');
const readAndwriteFiles = require('../untils/readAndWriteFiles');

const router = Router();

router.get('/talker', async (_req, res) => {
  console.log('penis');
  const talkers = await readAndwriteFiles.readTalker();
  res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const talker = await readAndwriteFiles.findTalkerById(Number(id));
  console.log(talker); 
  if (talker) return res.status(200).json(talker);
  return res.status(404).json(
    { message: 'Pessoa palestrante não encontrada' },
  );
});

module.exports = router;   