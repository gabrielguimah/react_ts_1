export interface InvestmentDetails {
  acccountType: Array<'Personal' | 'Bussiness'>;
  
    fullName: string;
  
    initialInvestment?: number;
  
    investmentRisk: Array<'High' | 'Medium' | 'Low'>;
  
    commentAboutInvestmentRisk: string;
  
    dependents?: number;

    acceptedTermsAndConditions: boolean;
  }