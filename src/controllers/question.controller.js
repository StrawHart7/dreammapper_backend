const prisma = require('../config/database');

async function getAllQuestions(req, res, next) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    });

    res.json({ categories });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllQuestions };