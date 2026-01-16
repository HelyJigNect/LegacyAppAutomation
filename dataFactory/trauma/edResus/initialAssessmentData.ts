import { faker } from "@faker-js/faker";
import { InitialAssessment, Vitals } from "../../../dataObjects/trauma/edResus/initialAssessment";

export class InitialAssessmentData {

    static getInitialAssessmentData(): InitialAssessment {
        return {
            temperature: (faker.number.int({ min: 10, max: 50 })).toString(),
            temperatureUnit: "C",
            weight: (faker.number.int({ min: 10, max: 100 })).toString(),
            weightUnit: "kg",
            height: (faker.number.int({ min: 70, max: 170 })).toString(),
            heightUnit: "cm",
            paralyticAgents: "No",
            sedated: "No",
            eyeObstruction: "No",
            intubated: "No",
            respirationAssisted: "No"
        }
    }

    static getVitalsData(): Vitals {
        let vitalsData: Vitals = {
            sbp: (faker.number.int({ min: 50, max: 120 })).toString(),
            dbp: (faker.number.int({ min: 50, max: 120 })).toString(),
            pulseRate: (faker.number.int({ min: 50, max: 120 })).toString(),
            unassistedRespRate: (faker.number.int({ min: 12, max: 30 })).toString(),
            o2Saturation: (faker.number.int({ min: 85, max: 100 })).toString(),
            supplementalO2: "No",
            eye: "Opens Eyes Spontaneously",
            verbal: "Oriented (Pediatric (<= 2yrs): Smiles, Oriented to Sounds, Follows Objects, Interacts)",
            motor: "Localizing Pain",
        }

        if (process.env.ENV === 'sd_uat') {
            vitalsData.warmingMeasuresCode = "0";
            vitalsData.warmingMeasuresDescription = "No Warming Measures";
        }

        return vitalsData
    }
}