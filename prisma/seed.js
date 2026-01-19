const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  const categoriesData = [
    {
      name: 'Vision Personnelle',
      description: 'Définissez qui vous voulez être',
      order: 1,
      questions: [
        {
          text: 'Dans 10 ans, quelle personne voulez-vous être devenue ?',
          placeholder: 'Décrivez votre moi idéal...',
          order: 1
        },
        {
          text: 'Quelles sont les 3 valeurs les plus importantes dans votre vie ?',
          placeholder: 'Ex: famille, créativité, liberté...',
          order: 2
        },
        {
          text: 'Comment voulez-vous qu\'on se souvienne de vous ?',
          placeholder: 'Votre héritage...',
          order: 3
        }
      ]
    },
    {
      name: 'Carrière & Impact',
      description: 'Votre contribution au monde',
      order: 2,
      questions: [
        {
          text: 'Quel impact voulez-vous avoir dans votre domaine professionnel ?',
          placeholder: 'Votre contribution unique...',
          order: 1
        },
        {
          text: 'Quelle compétence voulez-vous maîtriser parfaitement ?',
          placeholder: 'Un domaine d\'expertise...',
          order: 2
        },
        {
          text: 'Quel problème dans le monde aimeriez-vous résoudre ?',
          placeholder: 'Une cause qui vous tient à cœur...',
          order: 3
        }
      ]
    },
    {
      name: 'Vie & Relations',
      description: 'Vos connexions humaines',
      order: 3,
      questions: [
        {
          text: 'Comment décririez-vous votre vie sociale idéale ?',
          placeholder: 'Entourage, fréquence, qualité...',
          order: 1
        },
        {
          text: 'Quel type de relation voulez-vous construire avec votre famille ?',
          placeholder: 'Lien familial souhaité...',
          order: 2
        },
        {
          text: 'Comment voulez-vous passer votre temps libre ?',
          placeholder: 'Loisirs, passions, hobbies...',
          order: 3
        }
      ]
    },
    {
      name: 'Santé & Bien-être',
      description: 'Votre équilibre de vie',
      order: 4,
      questions: [
        {
          text: 'Comment voulez-vous vous sentir au quotidien ?',
          placeholder: 'État physique et mental...',
          order: 1
        },
        {
          text: 'Quelles habitudes voulez-vous développer ?',
          placeholder: 'Routines positives...',
          order: 2
        },
        {
          text: 'Qu\'est-ce que le bien-être signifie pour vous ?',
          placeholder: 'Votre définition personnelle...',
          order: 3
        }
      ]
    },
    {
      name: 'Accomplissement',
      description: 'Vos réalisations futures',
      order: 5,
      questions: [
        {
          text: 'Quel est votre plus grand rêve à réaliser ?',
          placeholder: 'Votre objectif ultime...',
          order: 1
        },
        {
          text: 'Qu\'êtes-vous prêt à sacrifier pour atteindre vos objectifs ?',
          placeholder: 'Compromis acceptables...',
          order: 2
        },
        {
          text: 'Comment mesurerez-vous votre réussite ?',
          placeholder: 'Vos critères personnels...',
          order: 3
        }
      ]
    }
  ];

  for (const categoryData of categoriesData) {
    const { questions, ...categoryInfo } = categoryData;
    
    await prisma.category.create({
      data: {
        ...categoryInfo,
        questions: {
          create: questions
        }
      }
    });
    
    console.log(`✅ Catégorie "${categoryInfo.name}" créée avec ${questions.length} questions`);
  }

  console.log('✨ Seeding terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });