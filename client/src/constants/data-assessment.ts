export interface Assessment {
    id: string;
    title: string;
    duration: number; 
    questionsCount: number;
  }
  
  export const assessmentsData: Assessment[] = [
    {
      id: 'it-maturity',
      title: 'Évaluation de Maturité IT',
      duration: 45,
      questionsCount: 15
    },
    {
      id: 'cybersecurity-readiness',
      title: 'Préparation à la Cybersécurité',
      duration: 30,
      questionsCount: 10
    },
    {
      id: 'digital-skills',
      title: 'Compétences Numériques de Base',
      duration: 25,
      questionsCount: 12
    },
    {
      id: 'cloud-adoption',
      title: 'Évaluation de l’Adoption Cloud',
      duration: 35,
      questionsCount: 14
    },
    {
      id: 'data-governance',
      title: 'Gouvernance des Données',
      duration: 40,
      questionsCount: 18
    }
  ];
  