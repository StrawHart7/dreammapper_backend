const prisma = require('../config/database');

async function upsertAnswer(req, res, next) {
  try {
    const { questionId, content } = req.body;
    const userId = req.user.userId;

    if (!questionId || !content) {
      return res.status(400).json({ error: 'Question ID et contenu requis' });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId }
    });

    if (!question) {
      return res.status(404).json({ error: 'Question introuvable' });
    }

    const answer = await prisma.answer.upsert({
      where: {
        userId_questionId: {
          userId,
          questionId
        }
      },
      update: {
        content,
        updatedAt: new Date()
      },
      create: {
        userId,
        questionId,
        content
      },
      include: {
        question: {
          include: {
            category: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Réponse enregistrée',
      answer
    });

  } catch (error) {
    next(error);
  }
}

async function getUserAnswers(req, res, next) {
  try {
    const userId = req.user.userId;

    const answers = await prisma.answer.findMany({
      where: { userId },
      include: {
        question: {
          include: {
            category: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    res.json({ answers });

  } catch (error) {
    next(error);
  }
}

async function getDreamSummary(req, res, next) {
  try {
    const userId = req.user.userId;

    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: {
            answers: {
              where: { userId }
            }
          }
        }
      }
    });

    const summary = categories.map(category => ({
      category: category.name,
      description: category.description,
      questions: category.questions.map(q => ({
        question: q.text,
        answer: q.answers[0]?.content || null,
        lastUpdated: q.answers[0]?.updatedAt || null
      }))
    }));

    const totalQuestions = categories.reduce((acc, cat) => acc + cat.questions.length, 0);
    const answeredQuestions = summary.reduce(
      (acc, cat) => acc + cat.questions.filter(q => q.answer).length, 
      0
    );

    res.json({
      summary,
      stats: {
        totalQuestions,
        answeredQuestions,
        completionRate: totalQuestions > 0 
          ? Math.round((answeredQuestions / totalQuestions) * 100) 
          : 0
      }
    });

  } catch (error) {
    next(error);
  }
}

async function deleteAnswer(req, res, next) {
  try {
    const { questionId } = req.params;
    const userId = req.user.userId;

    await prisma.answer.delete({
      where: {
        userId_questionId: {
          userId,
          questionId
        }
      }
    });

    res.json({ message: 'Réponse supprimée' });

  } catch (error) {
    next(error);
  }
}

module.exports = { 
  upsertAnswer, 
  getUserAnswers, 
  getDreamSummary, 
  deleteAnswer 
};