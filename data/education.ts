export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  status: "cursando" | "concluido";
  /** Ex.: "previsão dez/2027" ou "dez/2022". */
  period: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    id: "ads-estacio",
    degree: "Análise e Desenvolvimento de Sistemas (ADS)",
    institution: "Centro Universitário Estácio de Santa Catarina",
    status: "cursando",
    period: "previsão dez/2027",
  },
];
