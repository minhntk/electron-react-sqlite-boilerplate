import path from 'path';
import { remote } from 'electron';
import fs from 'fs';
import TodoModel from './Todo';


/**
 * TODO:
 * We try to create folder database and empty database file when first initialize our application
 * Maybe there is a better way to handle it
 *
 */

const dbPath = path.join(remote.app.getPath('userData'), 'databases', 'electron.db');
console.log(dbPath);
let dirName = path.dirname(dbPath);
if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName);
}
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
}

export let Sequelize = require('sequelize');
export let sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: dbPath,
  operatorsAliases: false,
  logging: false
});


sequelize.sync({force: false})
  .then(() => {
    console.log('Database & tables created!');
  });

  export const Todo = TodoModel(sequelize, Sequelize);