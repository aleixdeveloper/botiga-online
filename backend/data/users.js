import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Administrador',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },

  {
    name: 'Aleix Clemente',
    email: 'aleix@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Miriam',
    email: 'miriam@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Prova',
    email: 'prova@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
