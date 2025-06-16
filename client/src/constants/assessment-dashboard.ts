export interface Assessment {
  id: string;
  name: string;
  evaluator: number;
  evaluatorCount: number;
  date: string;
  score: number;
  status: string;
}

export function getAssessments(): Assessment[] {
  return [
    {
      name: 'Cloud Security Audit',
      evaluator: 2,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 84,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'IT Gouvernance Review',
      evaluator: 1,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 34,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Performance Benchmark',
      evaluator: 2,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 34,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Cloud Security Audit',
      evaluator: 5,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 80,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Cloud Infrastructure',
      evaluator: 4,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 10,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'IT Gouvernance Review',
      evaluator: 7,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 18,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Performance Benchmark',
      evaluator: 6,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 84,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Cloud Infrastructure',
      evaluator: 5,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 84,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Security Compliance Audit',
      evaluator: 3,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 64,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Network Performance Analysis',
      evaluator: 4,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 72,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'User Access Review',
      evaluator: 2,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 91,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Business Continuity Assessment',
      evaluator: 3,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 45,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Vendor Risk Assessment',
      evaluator: 4,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 58,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Disaster Recovery Testing',
      evaluator: 5,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 76,
      status: 'Terminé',
      id: ""
    },
    {
      name: 'Data Governance Review',
      evaluator: 3,
      evaluatorCount: 1,
      date: '15 jan 2025',
      score: 41,
      status: 'Terminé',
      id: ""
    },
  ];
}