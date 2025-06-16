// types/form.type.ts

export interface FormSettings {
  id: string;
  primaryColor: string;
  backgroundColor: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormResponse {
  id: string;
  jsonReponse: string;
  formId: string;
  createdAt: Date;
}

export interface FormType {
  id: string;
  formId: string;
  userId: string;
  name: string;
  description: string;
  jsonBlocks: string;
  views: number;
  responses: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorName: string;
  settingsId: string;
  settings: FormSettings;
  formResponses: FormResponse[];
}

// Utilisé pour les statistiques de tableau de bord
export interface FormStats {
  views: number;
  totalForms: number;
  totalResponses: number;
  conversionRate: number;
  engagementRate: number;
}
