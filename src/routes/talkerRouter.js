const { Router } = require('express');
const readAndwriteFiles = require('../untils/readAndWriteFiles');
const nameValidation = require('../untils/nameValidation');
const ageValidation = require('../untils/ageValidation');
const talkerInfoValidation = require('../untils/talkerInfoValidation');
const tokenValidation = require('../untils/tokenValidation');
const watchedValidation = require('../untils/WatchedValidation');
const rateValidation = require('../untils/rateValidation');
const idValidation = require('../untils/idValidation');

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

router.put('/talker/:id', tokenValidation, nameValidation, ageValidation, 
  talkerInfoValidation, rateValidation, 
  watchedValidation, idValidation, async (req, res, next) => {
    try {
      const { id } = req.params;

      await readAndwriteFiles.editTalker(id, req.body);

      const updatedTalker = { id: Number(id), ...req.body };

      res.status(200).json(updatedTalker);
    } catch (error) {
      next(error);
    }
  });

router.delete('/talker/:id', idValidation, tokenValidation, async (req, res, next) => {
  try {
    const { id } = req.params;
    await readAndwriteFiles.deleteTalker(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
module.exports = router;   