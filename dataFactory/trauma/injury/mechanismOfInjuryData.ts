import { InjuryTypeOptions, MechanismOfInjury } from "../../../dataObjects/trauma/injury/mechanismOfInjury";

export class MechanismOfInjuryData {
    static getECodesData(): MechanismOfInjury {
        const injuryTypes = this.getInjuryTypeOption();
        const randomInjuryType =
            injuryTypes[Math.floor(Math.random() * injuryTypes.length)];
        return {
            primaryICD10Mechanism: "Unknown",
            // secondaryICD10Mechanism: "Unknown",
            // tertiaryICD10Mechanism: "Unknown",
            injuryTypeCode: randomInjuryType.code,
            injuryTypeDescription: randomInjuryType.description
        }
    }

    static getInjuryTypeOption(): InjuryTypeOptions[] {
            const injuryTypeOptions: InjuryTypeOptions[] = [];
            injuryTypeOptions.push(
                { code: '1', description: 'Blunt' },
                { code: '2', description: 'Penetrating' },
                { code: '3', description: 'Burn' },
                { code: '4', description: 'Other' },
                { code: '/', description: 'Not Applicable' },
                { code: '?', description: 'Unknown' },
            );
            return injuryTypeOptions;
        }
}