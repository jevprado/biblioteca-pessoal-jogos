require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User, Game, Library } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

// USERS
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [{ model: Game, as: 'games' }],
  });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
});

// GAMES
app.post('/games', async (req, res) => {
  try {
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/games', async (_req, res) => {
  const games = await Game.findAll({ order: [['title', 'ASC']] });
  res.json(games);
});

app.get('/games/:id', async (req, res) => {
  const game = await Game.findByPk(req.params.id);
  if (!game) return res.status(404).json({ error: 'Jogo não encontrado' });
  res.json(game);
});

// LIBRARY (biblioteca de um usuário)
app.post('/users/:userId/library', async (req, res) => {
  try {
    const { userId } = req.params;
    const { gameId, status, hoursPlayed, notes } = req.body;

    const user = await User.findByPk(userId);
    const game = await Game.findByPk(gameId);
    if (!user || !game) return res.status(404).json({ error: 'Usuário ou jogo não encontrado' });

    await user.addGame(game, { through: { status, hoursPlayed, notes } });
    const entry = await Library.findOne({ where: { UserId: userId, GameId: gameId } });
    res.status(201).json(entry);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/users/:userId/library', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId, {
    include: [{
      model: Game,
      as: 'games',
      through: { attributes: ['status', 'hoursPlayed', 'notes', 'createdAt', 'updatedAt'] },
    }],
  });
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user.games);
});

app.delete('/users/:userId/library/:gameId', async (req, res) => {
  const { userId, gameId } = req.params;
  const entry = await Library.findOne({ where: { UserId: userId, GameId: gameId } });
  if (!entry) return res.status(404).json({ error: 'Entrada não encontrada' });
  await entry.destroy();
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
(async () => {
  await sequelize.sync(); // para base inicial; em produção prefira migrações
  app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
})();