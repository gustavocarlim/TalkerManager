const express = require('express');
const talkerRouter = require('./routes/talkerRouter');
const readAndwriteFiles = require('./untils/readAndWriteFiles');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.use('/talker', talkerRouter);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readAndwriteFiles.readTalker();
  const selectedTalker = talkers.find((talker) => talker.id === Number(id));
  if (!selectedTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(selectedTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
