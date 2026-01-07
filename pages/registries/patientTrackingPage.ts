import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";
import { LocationService } from "../../dataObjects/trauma/patientTracking/locationService";

export class PatientTrackingPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }
    //Locator of Patient Tracking > Location/Service
    private locationService = `//di-skippable="Trauma.IcuDays"`;
    private addButtonFromLocationTracking = `//di-grid-field[@field-information-name="Trauma.LocationTransfers"]//button[@di-grid-button="Add"]`;
    private locationCode = (optionValue: string) => `//ul[@di-append-to-body="Trauma.LocationTransfers.CURRENT.Code"]//span[contains(normalize-space(.), '${optionValue}')]`;
    private okButtonFromLocationTrackingPopup = `//button[contains(normalize-space(.), 'OK')]`;
    private icuDaysInput = `//tr[@field-information-name="ICUDaysRow"]//di-int-input[@field-information-name="Trauma.IcuDays"]//input`;
    private locationDescritionSpan = `//di-grid-field[@field-information-name="Trauma.LocationTransfers"]//div[@ref="gridPanel"]//div[@ref="eCenterColsClipper"]//div[@row-index="0"]`;

    //Locator of Patient Tracking > Ventilator/Blood
    private ventilatorBlood = `//di-skippable="Trauma.VentilatorDays"`

    //methods
    async populateFieldOfLocationServiceForm(locationServiceData: LocationService) {
        await this.clickElement(this.addButtonFromLocationTracking);
        await this.page.waitForTimeout(5000);
        await this.typeUsingKeyboard(locationServiceData.locationCode);
        await this.page.waitForTimeout(5000);
        await this.clickElement(this.okButtonFromLocationTrackingPopup);
        await this.page.waitForTimeout(2000);
    }

    //getter
    async getIcuDays() { 
        return this.getValue('text', this.icuDaysInput);
    }

    async getLocationDescription() {
        return this.getValue('text', this.locationDescritionSpan);
    }
}
