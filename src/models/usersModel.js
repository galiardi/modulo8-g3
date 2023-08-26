import { promisePool } from '../db.js';

const usersModel = {
  async create({ name, email, phone }) {
    try {
      const [result] = await promisePool.execute(
        'INSERT INTO users (name, email, phone) VALUES (?, ?, ?);',
        [name, email, phone]
      );

      return result;
    } catch (error) {
      console.log(error);
      if (error.code === 'ER_DUP_ENTRY') return 'Email already exists';
      return null;
    }
  },
};

export { usersModel };
