import { Page } from "@playwright/test";
import { LocationService } from "../../dataObjects/trauma/patientTracking/locationService";
import { RegistriesPage } from "./registriesPage";

export class PatientTrackingPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }
    //Locator of Patient Tracking > Location/Service
    private locationService = `//di-skippable="Trauma.IcuDays"`;
    private btnForLocationTracking = (btnName: string) => `//di-panel-field[@field-information-name="LocationTrackingPanel"]//button[@di-grid-button="${btnName}"]`;
    private locationCode = (optionValue: string) => `//ul[@di-append-to-body="Trauma.LocationTransfers.CURRENT.Code"]//span[contains(normalize-space(.), '${optionValue}')]`;
    private okButtonFromLocationTrackingPopup = `//button[contains(normalize-space(.), 'OK')]`;
    private icuDaysInput = `//tr[@field-information-name="ICUDaysRow"]//di-int-input[@field-information-name="Trauma.IcuDays"]//input`;
    private locationDescritionSpan = `//di-grid-field[@field-information-name="Trauma.LocationTransfers"]//div[@ref="gridPanel"]//div[@ref="eCenterColsClipper"]//div[@row-index="0"]`;

    //Locators of the Location Tracking speed screen
    private locationCodeInputOfLocationTrackingSpeedScreen = `//di-code-and-description-field[@field-information-name="Trauma.LocationTransfers.CURRENT.Code"]//input[@di-code-input-element]`

    //Locator of Patient Tracking > Ventilator/Blood
    private ventilatorBlood = `//di-skippable="Trauma.VentilatorDays"`

    //methods

    async clickOnTheBtnOfLocationTracking(btnName: string) {
        await this.clickElement(this.btnForLocationTracking(btnName));
    }

    async populateFieldOfLocationTrackingSpeedScreen(locationServiceData: LocationService) {
        await this.clickElement(this.locationCodeInputOfLocationTrackingSpeedScreen);
        await this.typeUsingKeyboard(locationServiceData.locationCode);
    }

    //getter
    async getIcuDays() {
        return this.getValue('text', this.icuDaysInput);
    }

    async getLocationDescription() {
        return this.getValue('text', this.locationDescritionSpan);
    }
}
