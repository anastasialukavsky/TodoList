const Sequelize = require('sequelize');
const conn = require('./conn');

const Todo = conn.define('todos', {
  taskName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  assignee: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Todo;
