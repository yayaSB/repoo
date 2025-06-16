export const categories = [
  "Sécurité IT",
  "Gouvernance IT",
  "Infrastructure",
  "Applications",
  "Données",
  "Innovation"
]

export const governanceQuestions = [
  {
    id: 1,
    question: "Existe-t-il un schéma directeur des SI formalisé et aligné avec la stratégie de l'entreprise ?",
    options: [
      "Inexistant",
      "Informel",
      "Formalisé mais partiel",
      "Formalisé et aligné",
      "Optimisé et régulièrement mis à jour",
    ],
  },
  {
    id: 2,
    question: "Les processus ITIL sont-ils implémentés et suivis ?",
    options: [
      "Aucun processus ITIL",
      "Quelques processus informels",
      "Processus partiellement formalisés",
      "Processus ITIL majoritairement implémentés",
      "Processus ITIL optimisés avec amélioration continue",
    ],
  },
  {
    id: 3,
    question: "Comment est organisé le pilotage budgétaire des projets IT ?",
    options: [
      "Pas de suivi budgétaire",
      "Suivi basique des dépenses",
      "Budgets formalisés mais dépassements fréquents",
      "Processus de pilotage rigoureux",
      "Optimisation budgétaire avec analyse de la valeur",
    ],
  },
  {
    id: 4,
    question: "Comment est géré le cycle de développement logiciel ? (Optionnel)",
    options: [],
    isTextArea: true,
  },
]

export const innovationQuestions = [
  {
    id: 1,
    question: "Comment sont évaluées et intégrées les nouvelles technologies ?",
    options: [
      "Aucun processus d'évaluation",
      "Évaluations ad hoc sans méthodologie",
      "Processus de veille informel",
      "Programme de veille et POC structuré",
      "Lab d'innovation avec budget dédié",
    ],
  },
  {
    id: 2,
    question: "Quelle est la capacité à déployer rapidement de nouvelles solutions ?",
    options: [
      "Déploiements lents et complexes",
      "Déploiements avec nombreuses contraintes",
      "Déploiements possibles mais longs",
      "Capacité de déploiement agile",
      "Innovation continue avec time-to-market court",
    ],
  },
]

export const questionsMap = {
  "Gouvernance IT": governanceQuestions,
  Innovation: innovationQuestions,
  "Sécurité IT": [],
  Infrastructure: [],
  Applications: [],
  Données: [],
}

// Mock assessments with questions
export const ASSESSMENTS = [
  {
    id: "1",
    title: "Évaluation de la Maturité IT",
    questions: governanceQuestions, 
  },
  {
    id: "2",
    title: "Audit Cybersécurité Printemps",
    questions: [], 
  },
  {
    id: "3",
    title: "Diagnostic Numérique pour PME",
    questions: innovationQuestions, 
  },
]

export const defaultAnswers = {
  "Gouvernance IT": {
    1: null,
    2: null,
    3: null,
    4: null,
  },
  Innovation: {
    1: null,
    2: null,
  },
  "Sécurité IT": {},
  Infrastructure: {},
  Applications: {},
  Données: {},
}

export const mockCompletedAnswers = {
  Innovation: {
    1: "Évaluations ad hoc sans méthodologie",
    2: "Déploiements possibles mais longs",
  },
}
