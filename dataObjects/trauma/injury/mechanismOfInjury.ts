export interface MechanismOfInjury {
    primaryICD10Mechanism: string;
    // secondaryICD10Mechanism: string;
    // tertiaryICD10Mechanism: string;
    injuryTypeCode?: string;
    injuryTypeDescription?: string;
}

export interface InjuryTypeOptions{
    code: string;
    description: string;
}