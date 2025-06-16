export type PerformancePoint = {
  date: string; 
  value: number;
};

export enum PerformanceCategory {
  CloudInfrastructure = "Cloud Infrastructure",
  Security = "Sécurité",
}

export type PerformanceData = {
  [key in PerformanceCategory]: {
    monthly: PerformancePoint[];
    yearly: PerformancePoint[];
  };
};
export const performanceData: PerformanceData = {
  [PerformanceCategory.CloudInfrastructure]: {
    monthly: [
      { date: "01/01/2024", value: 20 },
      { date: "01/02/2024", value: 32 },
      { date: "01/03/2024", value: 15 },
      { date: "01/04/2024", value: 70 },
      { date: "01/05/2024", value: 65 },
      { date: "01/06/2024", value: 22 },
    ],
    yearly: [
      { date: "15/01/2024", value: 10 },
      { date: "15/02/2024", value: 32 },
      { date: "15/03/2024", value: 15 },
      { date: "15/04/2024", value: 95 },
      { date: "15/05/2024", value: 75 },
      { date: "15/06/2024", value: 20 },
      { date: "15/07/2024", value: 10 },
      { date: "15/08/2024", value: 35 },
      { date: "15/09/2024", value: 60 },
    ],
  },
  [PerformanceCategory.Security]: {
    monthly: [
      { date: "01/01/2024", value: 40 },
      { date: "01/02/2024", value: 45 },
      { date: "01/03/2024", value: 38 },
      { date: "01/04/2024", value: 55 },
      { date: "01/05/2024", value: 65 },
      { date: "01/06/2024", value: 70 },
    ],
    yearly: [
      { date: "15/01/2024", value: 25 },
      { date: "15/02/2024", value: 30 },
      { date: "15/03/2024", value: 50 },
      { date: "15/04/2024", value: 80 },
      { date: "15/05/2024", value: 45 },
      { date: "15/06/2024", value: 30 },
      { date: "15/07/2024", value: 55 },
      { date: "15/08/2024", value: 75 },
      { date: "15/09/2024", value: 90 },
    ],
  },
};
