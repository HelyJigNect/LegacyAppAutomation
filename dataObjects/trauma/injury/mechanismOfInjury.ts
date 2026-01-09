export interface MechanismOfInjury {
    primaryICD10Mechanism: string;
    // secondaryICD10Mechanism: string;
    // tertiaryICD10Mechanism: string;
    injuryTypeCode?: string;
    injuryTypeDescription?: string;
    injuryMechanismCode?: string;
    injuryMechanismDescription?: string;
    disasterCasualtyCode?: string;
    disasterCasualtyDescription?: string;

}

export interface InjuryTypeOptions{
    code: string;
    description: string;
}

export interface DisasterCasualtyOptions{
    code: string;
    description: string;
}

export interface InjuryMechanismOptions{
    code: string;
    description: string;
}