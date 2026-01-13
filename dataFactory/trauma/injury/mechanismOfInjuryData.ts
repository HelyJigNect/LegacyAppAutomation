import { DropDownOption } from "../../../dataObjects/dropdownOption";
import { DisasterCasualtyOptions, InjuryMechanismOptions, InjuryTypeOptions, MechanismOfInjury } from "../../../dataObjects/trauma/injury/mechanismOfInjury";
import { DropDownOptionData } from "../../dropdownOptionData";

export class MechanismOfInjuryData {
    static getECodesData(): MechanismOfInjury {
        const injuryTypes = this.getInjuryTypeOption();
        const injuryMechanism = this.getInjuryMechanismOptions();
        const disasterCasualty = this.getDisasterCasualtyOptions();
        const randomInjuryType = injuryTypes[Math.floor(Math.random() * injuryTypes.length)];
        const randomInjuryMechanism = injuryMechanism[Math.floor(Math.random() * injuryMechanism.length)];
        const randomDisasterCasualty = disasterCasualty[Math.floor(Math.random() * disasterCasualty.length)];
        return {
            primaryICD10Mechanism: "Unknown",
            // secondaryICD10Mechanism: "Unknown",
            // tertiaryICD10Mechanism: "Unknown",
            injuryTypeCode: randomInjuryType.code,
            injuryTypeDescription: randomInjuryType.description,
            injuryMechanismCode: randomInjuryMechanism.code,
            injuryMechanismDescription: randomInjuryMechanism.description,
            disasterCasualtyCode: randomDisasterCasualty.code,
            disasterCasualtyDescription: randomDisasterCasualty.description,
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

    static getDisasterCasualtyOptions(): DisasterCasualtyOptions[] {
        const disasterCasualtyOptions: DisasterCasualtyOptions[] = [];
        disasterCasualtyOptions.push(
            { code: '1', description: 'Not Multiple or Mass' },
            { code: '2', description: 'Multiple' },
            { code: '3', description: 'Mass' },
            { code: '/', description: 'Not Applicable' },
            { code: '?', description: 'Unknown' },
        );
        return disasterCasualtyOptions;
    }

    static getInjuryMechanismOptions(): InjuryMechanismOptions[] {
        const injuryMechanismOptions: InjuryMechanismOptions[] = [];
        injuryMechanismOptions.push(
            { code: '1', description: 'MVC' },
            { code: '2', description: 'Fall Under 1m (3.3 ft)' },
            { code: '3', description: 'Fall 1m - 6m (3.3 - 19.7 ft)' },
            { code: '4', description: 'Fall Over 6m (19.7 ft)' },
            { code: '5', description: 'Fall - NFS' },
            { code: '6', description: 'Assault' },
            { code: '7', description: 'Motorcycle' },
            { code: '8', description: 'Pedestrian' },
            { code: '9', description: 'Bicycle' },
            { code: '10', description: 'Other Blunt Mechanism' },
            { code: '11', description: 'Knife' },
            { code: '12', description: 'Handgun' },
            { code: '13', description: 'Shotgun' },
            { code: '14', description: 'Other Gun' },
            { code: '15', description: 'Glass' },
            { code: '16', description: 'Biting' },
            { code: '17', description: 'Other Penetrating Mechanism' },
            { code: '18', description: 'Chemical Burn' },
            { code: '19', description: 'Inhalation Burn' },
            { code: '20', description: 'Thermal Burn' },
            { code: '21', description: 'Electrical Burn' },
            { code: '22', description: 'Other Burn Mechanism' },
            { code: '/', description: 'Not Applicable' },
            { code: '?', description: 'Unknown' },
        );
        return injuryMechanismOptions;
    }

    static getICD10MechanismOptionData(count: number = 1, desc?: string): DropDownOption[] {
        return DropDownOptionData.getDropDownOptionData('data/Book1.xlsx', 'injury classification crosswalk', count, desc);
    }
}