const {
  Model,
  DataTypes
} = require('sequelize');

const sequelize = require('../config/connection');
const Category = require('./Category');

class ProductTag extends Model {}

ProductTag.init({
  // define columns
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  tag_id: {
    type: DataTypes.INTEGER,
  },
}, {
  // add Category model association 
  include: [
   { model: Category},
  ]
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'product_tag',
});

module.exports = ProductTag;