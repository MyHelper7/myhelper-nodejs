'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      confirmation_hash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      confirmation_sent_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reset_password_hash: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      reset_password_sent_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      current_ip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      current_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_ip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      public_key: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      public_key: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deactivated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      invite_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};