const { Router } = require('express');
const readAndwriteFiles = require('../untils/readAndWriteFiles');
const nameValidation = require('../untils/nameValidation');
const ageValidation = require('../untils/ageValidation');
const talkerInfoValidation = require('../untils/talkerInfoValidation');
const tokenValidation = require('../untils/tokenValidation');
const watchedValidation = require('../untils/WatchedValidation');
const rateValidation = require('../untils/rateValidation');

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

router.post('/talker', nameValidation, talkerInfoValidation, rateValidation, 
  tokenValidation, ageValidation,
  watchedValidation, async (req, res, next) => {
    try {
      const { name, age, talk } = req.body;
      const talker = await readAndwriteFiles.readTalker();
      const newTalker = { name, age, id: talker.length + 1, talk };

      talker.push(newTalker);

      await readAndwriteFiles.writeTalker(newTalker);

      res.status(201).json(newTalker);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;   