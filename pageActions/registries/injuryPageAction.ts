import { expect, Page } from "@playwright/test";
import { InjuryPage } from "../../pages/registries/injuryPage";
import { InjuryInformation } from "../../dataObjects/trauma/injury/injuryInformation";
import { InjuryTypeOptions, MechanismOfInjury } from "../../dataObjects/trauma/injury/mechanismOfInjury";
import { InjuryInformationMandatoryField } from "../../data/enum/injury/injuryInformation";
import { ECodesMandatoryField } from "../../data/enum/injury/mechanismOfInjury";
import { InjuryTab } from "../../data/enum/tabNames";
import { DropDownOption } from "../../dataObjects/dropdownOption";

export class InjuryPageAction {

    private injuryPage: InjuryPage

    constructor(page: Page) {
        this.injuryPage = new InjuryPage(page);
    }

    async populateTheFormOfInjuryTab(injuryInfoData: InjuryInformation, eCodesData: MechanismOfInjury) {
        await this.injuryPage.clickOnTabFromNavbar(InjuryTab.Injury);
        expect(await this.injuryPage.isFormDisplayed('Injury Information'), 'Injury Information form is not displayed').toBeTruthy();
        await this.injuryPage.populateFieldOfInjuryInformationForm(injuryInfoData);

        await this.injuryPage.clickOnTabFromNavbar(InjuryTab.MechanismOfInjury);
        expect(await this.injuryPage.isFormDisplayed('E-Codes'), 'E-Codes form is not displayed').toBeTruthy();
        await this.injuryPage.populateFieldOfECodesForm(eCodesData)
    }

    //validation
    async verifyInjuryTab(injuryInfo: InjuryInformation, eCodes: MechanismOfInjury) {
        await this.injuryPage.clickOnTabFromNavbar(InjuryTab.Injury);
        const actualInjuryInfo: InjuryInformation = {
            injuryDate: await this.injuryPage.getInjuryDate(),
            injuryTime: await this.injuryPage.getInjuryTime(),
            ICD10LocationCode: await this.injuryPage.getICD10LocationCode(),
            restraints: await this.injuryPage.getRestraints(),
            airbags: await this.injuryPage.getAirbags(),
            equipment: await this.injuryPage.getEquipment(),
            workRelated: await this.injuryPage.getWorkRelated(),
            domesticViolence: await this.injuryPage.getDomesticViolence(),
            reportOfPhysicalAbuse: await this.injuryPage.getReportOfPhysicalAbuse()
        };
        expect(actualInjuryInfo).toEqual(injuryInfo);

        await this.injuryPage.clickOnTabFromNavbar(InjuryTab.MechanismOfInjury);
        const actualECodes: MechanismOfInjury = {
            primaryICD10Mechanism: await this.injuryPage.getPrimaryICD10Mechanism(),
            // secondaryICD10Mechanism: await this.injuryPage.getSecondaryICD10Mechanism(),
            // tertiaryICD10Mechanism: await this.injuryPage.getTertiaryICD10Mechanism(),
            injuryTypeCode: await this.injuryPage.getInjuryTypeCode(),
            injuryTypeDescription: await this.injuryPage.getInjuryTypeDescription(),
            injuryMechanismCode: await this.injuryPage.getInjuryMechanismCode(),
            injuryMechanismDescription: await this.injuryPage.getInjuryMechanismDescription(),
            disasterCasualtyCode: await this.injuryPage.getDisasterCasualtyCode(),
            disasterCasualtyDescription: await this.injuryPage.getDisasterCasualtyDescription()
        };
        expect(actualECodes).toEqual(eCodes);
    }

    async verifyInjuryMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.injuryPage.verifyFieldValidationIsNotPresent(availableFieldValidation, InjuryInformationMandatoryField)).toBeTruthy();
        expect(await this.injuryPage.verifyFieldValidationIsNotPresent(availableFieldValidation, ECodesMandatoryField)).toBeTruthy();
    }

    async navigateToMechanismOfInjuryAndVerifyTheOptionCode(icd10MechanismOption: DropDownOption[], activityCodeICD10Option: { code: string, description: string }) {
        await this.injuryPage.clickOnTabFromNavbar(InjuryTab.Injury);
        expect(await this.injuryPage.isFormDisplayed('Injury Information'), 'Injury Information form is not displayed').toBeTruthy();
        await this.injuryPage.clickOnTabFromNavbar(InjuryTab.MechanismOfInjury);
        expect(await this.injuryPage.isFormDisplayed('E-Codes'), 'E-Codes form is not displayed').toBeTruthy();
        await this.injuryPage.populateICD10MechanismField(icd10MechanismOption);

        expect(await this.injuryPage.getPrimaryICD10Mechanism()).toEqual(`${icd10MechanismOption[0].code}, ${icd10MechanismOption[0].shortDescription}`);
        expect(await this.injuryPage.getSecondaryICD10Mechanism()).toEqual(`${icd10MechanismOption[1].code}, ${icd10MechanismOption[1].shortDescription}`);
        expect(await this.injuryPage.getTertiaryICD10Mechanism()).toEqual(`${icd10MechanismOption[2].code}, ${icd10MechanismOption[2].shortDescription}`);

        await this.injuryPage.populateActivityCodeICD10CodeField(activityCodeICD10Option.code);
        expect(await this.injuryPage.getActivityCodeICD10Code()).toEqual(`${activityCodeICD10Option.code}, ${activityCodeICD10Option.description}`);
    }

}