'use strict'
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('123456', 6)
    const createdAt = new Date()
    const updatedAt = createdAt
    
    // https://unsplash.com/photos/ZHvM3XIOHoE
    // https://unsplash.com/photos/b1Hg7QI-zcc
    // https://unsplash.com/photos/RiDxDgHg7pw
    
    await queryInterface.bulkInsert('users', [
      {
        username: 'john',
        email: 'john@email.com',
        password: password,
        charts: '',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1661329835271-c130b1ea3f28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        createdAt,
        updatedAt,
      },
      {
        username: 'jane',
        email: 'jane@email.com',
        password: password,
        charts: '',
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1664373622147-d610c247a11b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        createdAt,
        updatedAt,
      },
      {
        username: 'boss',
        email: 'boss@email.com',
        password: password,
        charts: '',
        imageUrl:
          'https://images.unsplash.com/photo-1665057669499-2cb221f7a075?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        createdAt,
        updatedAt,
      },
    ])
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}