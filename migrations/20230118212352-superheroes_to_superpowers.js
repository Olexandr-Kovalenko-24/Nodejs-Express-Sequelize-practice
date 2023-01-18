'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('superheroes_to_superpowers', { 
      id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      superheroId: {
        field: 'superhero_id',
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'superheroes',
          key: 'id'
        }
      },
      superpowerId: {
        field: 'superpower_id',
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'superpowers',
          key: 'id'
        }
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('superheroes_to_superpowers');
  }
};
