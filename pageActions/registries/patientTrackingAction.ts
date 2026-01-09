import { PatientTrackingPage } from "../../pages/registries/patientTrackingPage";
import { LocationService } from "../../dataObjects/trauma/patientTracking/locationService";
import { expect, Page } from "@playwright/test";
import { LocationServiceMandatoryField } from "../../data/enum/patientTracking/locationService";
import { PatientTrackingTab } from "../../data/enum/tabNames";

export class PatientTrackingPageAction {
    private patientTrackingPage: PatientTrackingPage

    constructor(page: Page) {
        this.patientTrackingPage = new PatientTrackingPage(page);
    }

    async populateThePatientTrackingTab(locationServiceData: LocationService) {
        if (process.env.ENV !== 'sd_uat') {
            await this.patientTrackingPage.clickOnTabFromNavbar(PatientTrackingTab.PatientTracking);
            expect(await this.patientTrackingPage.isFormDisplayed('Location Tracking'), 'Patient Tracking form is not displayed').toBeTruthy();
            await this.patientTrackingPage.populateFieldOfLocationServiceForm(locationServiceData)
        }
    }

    //validation
    async verifyPatientTrackingTab(locationService: Partial<LocationService>) {
        if (process.env.ENV !== 'sd_uat') {
            await this.patientTrackingPage.clickOnTabFromNavbar(PatientTrackingTab.PatientTracking);
            const actualLocationService: Partial<LocationService> = {
                locationCode: '?',
                locationDescription: await this.patientTrackingPage.getLocationDescription(),
                icuDays: await this.patientTrackingPage.getIcuDays()
            };
            expect(actualLocationService).toEqual(locationService);
        }
    }

    async verifyPatientTrackingMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.patientTrackingPage.verifyFieldValidationIsNotPresent(availableFieldValidation, LocationServiceMandatoryField)).toBeTruthy();
    }

}