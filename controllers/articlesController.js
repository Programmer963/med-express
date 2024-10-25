const pool = require('../db/db');

// Получение связанных статей
const getRelatedArticles = async (req, res) => {
  try {
    const [articles] = await pool.query('SELECT * FROM articles ORDER BY RAND() LIMIT 5');
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Получение популярных статей
const getPopularArticles = async (req, res) => {
  try {
    const [articles] = await pool.query(`
      SELECT a.*, p.views 
      FROM articles a
      JOIN articles_popularity p ON a.id = p.article_id
      ORDER BY p.views DESC
      LIMIT 5
    `);
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRelatedArticles,
  getPopularArticles,
};
