import { expect, Page } from "@playwright/test";
import { BillingMandatoryField } from "../../data/enum/outcome/billing";
import { DischargeInformationMandatoryField } from "../../data/enum/outcome/initialDischarge";
import { OutcomeTab } from "../../data/enum/tabNames";
import { Billing } from "../../dataObjects/trauma/outcome/billing";
import { DischargeInformation } from "../../dataObjects/trauma/outcome/initialDischarge";
import { OutcomePage } from "../../pages/registries/outcomePage";

export class OutcomePageAction {

    private outcomePage: OutcomePage

    constructor(page: Page) {
        this.outcomePage = new OutcomePage(page);
    }

    async populateTheFormOfOutcomeTab(dischargeInfoData: DischargeInformation, billingData: Billing): Promise<string> {
        await this.outcomePage.clickOnTabFromNavbar(OutcomeTab.Outcome);
        expect(await this.outcomePage.isFormDisplayed('Discharge Information'), 'Discharge Information form is not displayed').toBeTruthy();
        const hospitalDays = await this.outcomePage.populateFieldOfDischargeInformationForm(dischargeInfoData);

        await this.outcomePage.clickOnTabFromNavbar(OutcomeTab.Billing);
        expect(await this.outcomePage.isFormDisplayed('Billing'), 'Billing form is not displayed').toBeTruthy();
        await this.outcomePage.populateFieldOfBillingForm(billingData)
        return hospitalDays;
    }

    //validation
    async verifyOutcomeTab(dischargeInfo: DischargeInformation, billing: Billing) {
        await this.outcomePage.clickOnTabFromNavbar(OutcomeTab.Outcome);
        const actualDischargeInfo: DischargeInformation = {
            dischargeOrderDate: dischargeInfo.dischargeOrderDate,
            dischargeOrderTime: dischargeInfo.dischargeOrderTime,
            dischargeDate: await this.outcomePage.getDischargeDate(),
            dischargeTime: await this.outcomePage.getDischargeTime(),
            icuDay: await this.outcomePage.getIcuDays(),
            ventilatorDays: await this.outcomePage.getVentilatorDays(),
            dischargedTo: await this.outcomePage.getDischargedTo(),
            dischargeStatus: await this.outcomePage.getDischargeStatus(),
            dischargeStatusDescription: await this.outcomePage.getDischargeStatusDescription(),
        };

        if (process.env.ENV === 'sd_uat') {
            actualDischargeInfo.ImpedimentsToDischargeCode = await this.outcomePage.getImpedimentsToDischargeCode();
            actualDischargeInfo.ImpedimentsToDischargeDescription = await this.outcomePage.getImpedimentsToDischargeDescription();
        }
        expect(actualDischargeInfo).toEqual(dischargeInfo);

        // Billing
        await this.outcomePage.clickOnTabFromNavbar(OutcomeTab.Billing);
        const actualBilling: Billing = {
            primaryPayor: await this.outcomePage.getPrimaryPayor()
        };
        expect(actualBilling).toEqual(billing);
    }

    async verifyOutcomeMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.outcomePage.verifyFieldValidationIsNotPresent(availableFieldValidation, DischargeInformationMandatoryField)).toBeTruthy();
        expect(await this.outcomePage.verifyFieldValidationIsNotPresent(availableFieldValidation, BillingMandatoryField)).toBeTruthy();
    }

}