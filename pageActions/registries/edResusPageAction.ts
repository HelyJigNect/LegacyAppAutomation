import { expect, Page } from "@playwright/test";
import { ArrivalInformationMandatoryFields } from "../../data/enum/edResus/arrival";
import { InitialAssessmentMandatoryField, VitalsMandatoryField } from "../../data/enum/edResus/initialAssessment";
import { AlcoholMandatoryField } from "../../data/enum/edResus/labsToxicology";
import { EdResusTab } from "../../data/enum/tabNames";
import { Arrival } from "../../dataObjects/trauma/edResus/arrival";
import { InitialAssessment, Vitals } from "../../dataObjects/trauma/edResus/initialAssessment";
import { Alcohol } from "../../dataObjects/trauma/edResus/labsToxicology";
import { EdResusPage } from "../../pages/registries/edResusPage";

export class EdResusPageAction {

    private edResusPage: EdResusPage

    constructor(page: Page) {
        this.edResusPage = new EdResusPage(page);
    }

    // Populate forms of the ED/Resus tab
    async populateTheEdResusTab(arrivalData: Arrival, initialAssessmentData: InitialAssessment, vitalsData: Vitals, alcoholData: Alcohol) {
        await this.edResusPage.clickOnTabFromNavbar(EdResusTab.EDResus);
        expect(await this.edResusPage.isFormDisplayed('Arrival/Admission Information'), 'Arrival/Admission Information form is not displayed').toBeTruthy();
        await this.edResusPage.populateFieldOfArrivalForm(arrivalData);

        await this.edResusPage.clickOnTabFromNavbar(EdResusTab.InitialAssessment);
        expect(await this.edResusPage.isFormDisplayed('At Time Vitals Taken'), 'At Time Vitals Taken form is not displayed').toBeTruthy();
        await this.edResusPage.populateFieldOfInitialAssessment(initialAssessmentData);
        await this.edResusPage.populateFieldOfVitalsForm(vitalsData);

        //Vitals tab
        await this.edResusPage.clickOnTabFromNavbar(EdResusTab.Vitals);
        expect(await this.edResusPage.isFormDisplayed('Vitals Information'), 'Vitals Information form is not displayed').toBeTruthy();
        await this.edResusPage.populateFieldOfVitalsTab(vitalsData);

        if (process.env.ENV === 'dev') {
            await this.edResusPage.clickOnTabFromNavbar('Labs/Toxicology/Screenings');
        } else { await this.edResusPage.clickOnTabFromNavbar(EdResusTab.LabsToxicology); }

        expect(await this.edResusPage.isFormDisplayed('Alcohol'), 'Alcohol form is not displayed').toBeTruthy();
        await this.edResusPage.populateFieldOfAlcoholForm(alcoholData);
    }

    //validation
    async verifyEdResusTab(arrivalData: Arrival, initialAssessment: InitialAssessment, vitals: Vitals, alcoholData: Alcohol) {
        // ---------------------- ARRIVAL / ADMISSION ----------------------
        await this.edResusPage.clickOnTabFromNavbar(EdResusTab.EDResus);
        const actualArrival: Arrival = {
            primaryMedicalEvent: await this.edResusPage.getPrimaryMedicalEvent(),
            edDepartureOrderDate: await this.edResusPage.getEdDepartureOrderDate(),
            edDepartureOrderTime: await this.edResusPage.getEdDepartureOrderTime(),
            edDepartureDate: await this.edResusPage.getEdDepartureDate(),
            edDepartureTime: await this.edResusPage.getEdDepartureTime(),
            signsOfLife: await this.edResusPage.getSignsOfLife(),
            intubationPriorToArrival: await this.edResusPage.getIntubationPriorToArrival(),
            postEdDisposition: await this.edResusPage.getPostEdDisposition(),
            primaryTraumaServiceType: await this.edResusPage.getPrimaryTraumaServiceType(),
        };

        if (process.env.ENV === 'sd_uat') {
            actualArrival.modeOfArrivalCode = await this.edResusPage.getModeOfArrivalCode();
            actualArrival.modeOfArrivalDescription = await this.edResusPage.getModeOfArrivalDescription();
            actualArrival.responseLevelCode = await this.edResusPage.getResponseLevelCode();
            actualArrival.responseLevelDescription = await this.edResusPage.getResponseLevelDescription();
            actualArrival.responseActivationDate = await this.edResusPage.getResponseActivationDate();
            actualArrival.responseActivationTime = await this.edResusPage.getResponseActivationTime();
        }
        expect(actualArrival).toEqual(arrivalData);

        // ---------------------- INITIAL ASSESSMENT ----------------------
        await this.edResusPage.clickOnTabFromNavbar(EdResusTab.InitialAssessment);
        const actualInitialAssessment: InitialAssessment = {
            temperature: await this.edResusPage.getTemperature(),
            temperatureUnit: await this.edResusPage.getTemperatureUnit(),
            weight: await this.edResusPage.getWeight(),
            weightUnit: await this.edResusPage.getWeightUnit(),
            height: await this.edResusPage.getHeight(),
            heightUnit: await this.edResusPage.getHeightUnit(),
            paralyticAgents: await this.edResusPage.getParalyticAgents(),
            intubated: await this.edResusPage.getIntubated(),
            sedated: await this.edResusPage.getSedated(),
            respirationAssisted: await this.edResusPage.getRespirationAssisted(),
            eyeObstruction: await this.edResusPage.getEyeObstruction()
        };
        expect(actualInitialAssessment).toEqual(initialAssessment);

        // ---------------------- VITALS ----------------------
        await this.edResusPage.clickOnTabFromNavbar(EdResusTab.Vitals);
        const actualVitals: Vitals = {
            sbp: await this.edResusPage.getSbp(),
            dbp: await this.edResusPage.getDbp(),
            pulseRate: await this.edResusPage.getPulseRate(),
            unassistedRespRate: await this.edResusPage.getUnassistedRespRate(),
            o2Saturation: await this.edResusPage.getO2Saturation(),
            supplementalO2: await this.edResusPage.getSupplementalO2(),
            eye: await this.edResusPage.getGcsEye(),
            verbal: await this.edResusPage.getGcsVerbal(),
            motor: await this.edResusPage.getGcsMotor(),
        };

        if (process.env.ENV === 'sd_uat') {
            actualVitals.warmingMeasuresCode = await this.edResusPage.getWarmingMeasuresCode();
            actualVitals.warmingMeasuresDescription = await this.edResusPage.getWarmingMeasuresDescription();
        }
        expect(actualVitals).toEqual(vitals);

        // ---------------------- LABS / ALCOHOL ----------------------
        if (process.env.ENV === 'dev') {
            await this.edResusPage.clickOnTabFromNavbar('Labs/Toxicology/Screenings');
        } else { await this.edResusPage.clickOnTabFromNavbar(EdResusTab.LabsToxicology); }
        const actualAlcohol: Alcohol = {
            alcoholUseIndicator: await this.edResusPage.getAlcoholUseIndicator(),
            clinicianAdministered: await this.edResusPage.getClinicianAdministered()
        };
        expect(actualAlcohol).toEqual(alcoholData);
    }

    async verifyEdResusMandatoryFields(availableFieldValidation: { field: string; message: string }[]) {
        expect(await this.edResusPage.verifyFieldValidationIsNotPresent(availableFieldValidation, ArrivalInformationMandatoryFields)).toBeTruthy();
        expect(await this.edResusPage.verifyFieldValidationIsNotPresent(availableFieldValidation, InitialAssessmentMandatoryField)).toBeTruthy();
        expect(await this.edResusPage.verifyFieldValidationIsNotPresent(availableFieldValidation, VitalsMandatoryField)).toBeTruthy();
        expect(await this.edResusPage.verifyFieldValidationIsNotPresent(availableFieldValidation, AlcoholMandatoryField)).toBeTruthy();
    }
}