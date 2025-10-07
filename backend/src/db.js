const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'data', 'database.sqlite'),
  logging: false,
});

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
});

//banco de dados do campo de adição de jogos
const Game = sequelize.define('Game', {
  title: { type: DataTypes.STRING, allowNull: false }, //o false é para ser obrigatório
  platform: { type: DataTypes.STRING, allowNull: false }, //o false é para ser obrigatório || ex: PC, PS5, Switch, steam
  developer: { type: DataTypes.STRING },
  releaseYear: { type: DataTypes.INTEGER },
});

const Library = sequelize.define('Library', {
  status: { type: DataTypes.STRING, defaultValue: 'backlog' }, // backlog, jogando, concluido
  hoursPlayed: { type: DataTypes.INTEGER, defaultValue: 0 },
  notes: { type: DataTypes.TEXT },
});

User.belongsToMany(Game, { through: Library, as: 'games' });
Game.belongsToMany(User, { through: Library, as: 'owners' });

module.exports = { sequelize, User, Game, Library };