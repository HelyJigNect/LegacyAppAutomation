import { Page } from "@playwright/test";
import { Arrival } from "../../dataObjects/trauma/edResus/arrival";
import { InitialAssessment, Vitals } from "../../dataObjects/trauma/edResus/initialAssessment";
import { Alcohol } from "../../dataObjects/trauma/edResus/labsToxicology";
import { RegistriesPage } from "./registriesPage";

export class EdResusPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    //Locator of ED/Resus > Arrival/Admission Form
    private edDepartureDateInput = `//di-date-input[@field-information-name="Trauma.EdDepartureDate"]//input`
    private edDepartureTimeInput = `//di-time-input[@field-information-name="Trauma.EdDepartureTime"]//input`
    private edDepartureOrderDateInput = `//di-date-input[@field-information-name="Trauma.EdDepartureOrderDate"]//input`
    private edDepartureOrderTimeInput = `//di-time-input[@field-information-name="Trauma.EdDepartureOrderTime"]//input`

    private primaryMedicalEventDropdown = `//di-code-and-description-field[@field-information-name="Trauma.PrimaryMedicalEvent"]//div[@uib-dropdown]`
    private optionOfPrimaryMedicalEventDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.PrimaryMedicalEvent"]//span[contains(text(),', ${optionValue}')]`
    private signsOfLifeDropdown = `//di-code-and-description-field[@field-information-name="Trauma.SignsOfLife"]//div[@uib-dropdown]`
    private optionOfSignsOfLifeDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.SignsOfLife"]//span[contains(text(),', ${optionValue}')]`
    private intubationPriorToArrivalDropdown = `//di-code-and-description-field[@field-information-name="Trauma.IntubationPriorToArrival"]//div[@uib-dropdown]`
    private optionOfIntubationPriorToArrivalDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.IntubationPriorToArrival"]//span[contains(text(),', ${optionValue}')]`
    private postEdDispositionDropdown = `//di-code-and-description-field[@field-information-name="Trauma.PostEdDisposition"]//div[@uib-dropdown]`
    private optionOfPostEdDispositionDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.PostEdDisposition"]//span[contains(text(),', ${optionValue}')]`
    private primaryTraumaServiceTypeDropdown = `//di-code-and-description-field[@field-information-name="Trauma.PrimaryTraumaServiceType"]//div[@uib-dropdown]`
    private optionOfPrimaryTraumaServiceTypeDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.PrimaryTraumaServiceType"]//span[contains(text(),', ${optionValue}')]`
    private modeOfArrivalDropdown = `//di-code-and-description-field[@field-information-name="Trauma.FacilityArrivalMode"]//div[@uib-dropdown]/input`
    private optionOfModeOfArrivalDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.FacilityArrivalMode"]//span[contains(text(),', ${optionValue}')]`
    private responseLevelTypeDropdown = `//di-code-and-description-field[@field-information-name="Trauma.ActivationType"]//div[@uib-dropdown]/input`
    private optionOfResponseLevelDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.ActivationType"]//span[contains(text(),', ${optionValue}')]`

    private responseActivationDateInput = `//di-date-input[@field-information-name="Trauma.TraumaActivationDate"]//input`
    private responseActivationTimeInput = `//di-time-input[@field-information-name="Trauma.TraumaActivationTime"]//input`

    //Locator of ED/Resus > Initial Assessment Form
    private weightInput = `//di-float-input[@field-information-name="Trauma.EdAssessments.0.Weight.Value"]//input`
    private weightUnitDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdAssessments.0.Weight.Unit"]//div[@uib-dropdown]`
    private optionOfWeightUnitDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.EdAssessments.0.Weight.Unit"]//span[contains(text(),', ${optionValue}')]`
    private heightInput = `//di-float-input[@field-information-name="Trauma.EdAssessments.0.Height.Value"]//input`
    private heightUnitDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdAssessments.0.Height.Unit"]//div[@uib-dropdown]`
    private optionOfHeightUnitDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.EdAssessments.0.Height.Unit"]//span[contains(text(),', ${optionValue}')]`
    private temperatureInput = `//di-float-input[@field-information-name="Trauma.EdAssessments.0.Temperature.Value"]//input`
    private temperatureUnitDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdAssessments.0.Temperature.Unit"]//div[@uib-dropdown]`
    private optionOfTemperatureUnitDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.EdAssessments.0.Temperature.Unit"]//span[contains(text(),', ${optionValue}')]`

    private paralyticAgentsCheckbox = `//di-state-button-input[@field-information-name="Trauma.EdAssessments.0.Paralyzed"]`
    private intubatedCheckbox = `//di-state-button-input[@field-information-name="Trauma.EdAssessments.0.Intubated"]`
    private sedatedCheckbox = `//di-state-button-input[@field-information-name="Trauma.EdAssessments.0.Sedated"]`
    private respirationAssistedCheckbox = `//di-state-button-input[@field-information-name="Trauma.EdAssessments.0.AssistedResp"]`
    private eyeObstructionCheckbox = `//di-state-button-input[@field-information-name="Trauma.EdAssessments.0.EyeObstruction"]`

    private sbpInput = `//di-int-input[@field-information-name="Trauma.EdAssessments.0.Sbp"]//input`
    private dbpInput = `//di-int-input[@field-information-name="Trauma.EdAssessments.0.Dbp"]//input`
    private pulseRateInput = `//di-int-input[@field-information-name="Trauma.EdAssessments.0.PulseRate"]//input`
    private unassistedRespRateInput = `//di-int-input[@field-information-name="Trauma.EdAssessments.0.UnassistedRespRate"]//input`
    private o2Saturation = `//di-int-input[@field-information-name="Trauma.EdAssessments.0.SaO2"]//input`
    private assistedRespRateInput = `//di-int-input[@field-information-name="Trauma.EdAssessments.0.AssistedRespRate"]//input`
    private supplementalO2Checkbox = `//di-state-button-input[@field-information-name="Trauma.EdAssessments.0.SupplementalO2Bool"]//button`
    private supplementalO2CheckboxValue = `//di-state-button-input[@field-information-name="Trauma.EdAssessments.0.SupplementalO2Bool"]`
    private eyeDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdAssessments.0.Gcs.Eye"]//div[@uib-dropdown]`
    private optionOfEyeDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.EdAssessments.0.Gcs.Eye"]//span[contains(text(),', ${optionValue}')]`
    private verbalDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdAssessments.0.Gcs.Verbal"]//div[@uib-dropdown]`
    private optionOfVerbalDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.EdAssessments.0.Gcs.Verbal"]//span[contains(text(),', ${optionValue}')]`
    private motorDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdAssessments.0.Gcs.Motor"]//div[@uib-dropdown]`
    private optionOfMotorDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.EdAssessments.0.Gcs.Motor"]//span[contains(text(),', ${optionValue}')]`

    //Locator of ED/Resus > Vitals Form
    private warmingMeasuresDropdown = `//di-code-and-description-field[@field-information-name="Trauma.WarmingMeasure"]//div[@uib-dropdown]/input`
    private optionOfWarmingMeasuresDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.WarmingMeasure"]//span[contains(text(),', ${optionValue}')]`

    //Locator of ED/Resus > Labs/Toxicology
    private alcoholUseIndicatorDropdown = `//di-code-and-description-field[@field-information-name="Trauma.AlcoholUseIndicator"]//div[@uib-dropdown]`
    private optionOfAlcoholUseIndicatorDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.AlcoholUseIndicator"]//span[contains(text(),', ${optionValue}')]`
    private clinicianAdministeredDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdDrugScreens.0.DrugCode"]//div[@uib-dropdown]`
    private optionOFClinicianAdministeredDropdown = (optionValue: string) => `//ul[@di-append-to-body="Trauma.EdDrugScreens.0.DrugCode"]//span[contains(text(),', ${optionValue}')]`

    async populateFieldOfArrivalForm(arrivalData: Arrival): Promise<void> {
        await this.scrollAndSelectDropdownOption(this.primaryMedicalEventDropdown, this.optionOfPrimaryMedicalEventDropdown(arrivalData.primaryMedicalEvent))
        await this.fillInput(this.edDepartureDateInput, arrivalData.edDepartureDate)
        await this.fillInput(this.edDepartureTimeInput, arrivalData.edDepartureTime)
        await this.fillInput(this.edDepartureOrderDateInput, arrivalData.edDepartureOrderDate)
        await this.fillInput(this.edDepartureOrderTimeInput, arrivalData.edDepartureOrderTime)
        await this.scrollAndSelectDropdownOption(this.signsOfLifeDropdown, this.optionOfSignsOfLifeDropdown(arrivalData.signsOfLife))
        await this.scrollAndSelectDropdownOption(this.intubationPriorToArrivalDropdown, this.optionOfIntubationPriorToArrivalDropdown(arrivalData.intubationPriorToArrival))
        await this.scrollAndSelectDropdownOption(this.postEdDispositionDropdown, this.optionOfPostEdDispositionDropdown(arrivalData.postEdDisposition))
        switch (process.env.ENV) {
            case 'sd_uat':
                await this.scrollAndSelectDropdownOption(this.modeOfArrivalDropdown, this.optionOfModeOfArrivalDropdown(arrivalData.modeOfArrivalDescription!))
                await this.scrollAndSelectDropdownOption(this.responseLevelTypeDropdown, this.optionOfResponseLevelDropdown(arrivalData.responseLevelDescription!))
                await this.fillInput(this.responseActivationDateInput, arrivalData.responseActivationDate!)
                await this.fillInput(this.responseActivationTimeInput, arrivalData.responseActivationTime!)
                break;
        }
        await this.scrollAndSelectDropdownOption(this.primaryTraumaServiceTypeDropdown, this.optionOfPrimaryTraumaServiceTypeDropdown(arrivalData.primaryTraumaServiceType))
    }

    async populateFieldOfInitialAssessment(initialAssessmentData: InitialAssessment): Promise<void> {
        await this.fillInput(this.temperatureInput, initialAssessmentData.temperature)
        await this.scrollAndSelectDropdownOption(this.temperatureUnitDropdown, this.optionOfTemperatureUnitDropdown(initialAssessmentData.temperatureUnit))
        await this.fillInput(this.weightInput, initialAssessmentData.weight)
        await this.scrollAndSelectDropdownOption(this.weightUnitDropdown, this.optionOfWeightUnitDropdown(initialAssessmentData.weightUnit))
        await this.fillInput(this.heightInput, initialAssessmentData.height)
        await this.scrollAndSelectDropdownOption(this.heightUnitDropdown, this.optionOfHeightUnitDropdown(initialAssessmentData.heightUnit))

        await this.clickAndSelectCheckbox(this.paralyticAgentsCheckbox, initialAssessmentData.paralyticAgents)
        await this.clickAndSelectCheckbox(this.intubatedCheckbox, initialAssessmentData.intubated)
        await this.clickAndSelectCheckbox(this.sedatedCheckbox, initialAssessmentData.sedated)
        await this.clickAndSelectCheckbox(this.respirationAssistedCheckbox, initialAssessmentData.respirationAssisted)
        await this.clickAndSelectCheckbox(this.eyeObstructionCheckbox, initialAssessmentData.eyeObstruction)
    }

    async populateFieldOfVitalsForm(vitalsData: Vitals): Promise<void> {
        await this.fillInput(this.sbpInput, vitalsData.sbp)
        await this.fillInput(this.dbpInput, vitalsData.dbp)
        await this.fillInput(this.pulseRateInput, vitalsData.pulseRate)
        await this.fillInput(this.unassistedRespRateInput, vitalsData.unassistedRespRate)
        await this.fillInput(this.o2Saturation, vitalsData.o2Saturation)
        await this.clickAndSelectCheckbox(this.supplementalO2Checkbox, vitalsData.supplementalO2, this.supplementalO2CheckboxValue)
        await this.scrollAndSelectDropdownOption(this.eyeDropdown, this.optionOfEyeDropdown(vitalsData.eye))
        await this.scrollAndSelectDropdownOption(this.verbalDropdown, this.optionOfVerbalDropdown(vitalsData.verbal))
        await this.scrollAndSelectDropdownOption(this.motorDropdown, this.optionOfMotorDropdown(vitalsData.motor))
    }

    async populateFieldOfVitalsTab(vitalsData: Vitals): Promise<void> {
        switch (process.env.ENV) {
            case 'sd_uat':
                await this.scrollAndSelectDropdownOption(this.warmingMeasuresDropdown, this.optionOfWarmingMeasuresDropdown(vitalsData.warmingMeasuresDescription!))
                break;
        }
    }

    async populateFieldOfAlcoholForm(alcoholData: Alcohol): Promise<void> {
        await this.scrollAndSelectDropdownOption(this.alcoholUseIndicatorDropdown, this.optionOfAlcoholUseIndicatorDropdown(alcoholData.alcoholUseIndicator))
        await this.scrollAndSelectDropdownOption(this.clinicianAdministeredDropdown, this.optionOFClinicianAdministeredDropdown(alcoholData.clinicianAdministered))
    }

    //getter methods
    // ARRIVAL / ADMISSION
    async getPrimaryMedicalEvent() {
        return this.getValue('dropdown', 'PrimaryMedicalEventRow');
    }

    async getEdDepartureOrderDate() {
        return this.getValue('text', this.edDepartureOrderDateInput);
    }

    async getEdDepartureOrderTime() {
        return this.getValue('text', this.edDepartureOrderTimeInput);
    }

    async getEdDepartureDate() {
        return this.getValue('text', this.edDepartureDateInput);
    }

    async getEdDepartureTime() {
        return this.getValue('text', this.edDepartureTimeInput);
    }

    async getSignsOfLife() {
        return this.getValue('after', this.signsOfLifeDropdown);
    }

    async getIntubationPriorToArrival() {
        return this.getValue('dropdown', 'IntubationPriorToArrivalRow');
    }

    async getPostEdDisposition() {
        return this.getValue('dropdown', 'PostEDDispositionRow');
    }

    async getModeOfArrivalCode() {
        return this.getValue('text', this.modeOfArrivalDropdown);
    }

    async getModeOfArrivalDescription() {
        return this.getValue('dropdown', 'ModeofArrivalRow');
    }

    async getResponseLevelCode() {
        return this.getValue('text', this.responseLevelTypeDropdown);
    }

    async getResponseLevelDescription() {
        return this.getValue('dropdown', 'ResponseActivationLevelRow');
    }

    async getPrimaryTraumaServiceType() {
        const field = process.env.ENV === 'dev' ? 'TertiaryExamRow' : 'PrimaryTraumaServiceTypeRow';
        return this.getValue('dropdown', field);
    }

    async getWarmingMeasuresCode() {
        return this.getValue('text', this.warmingMeasuresDropdown);
    }

    async getWarmingMeasuresDescription() {
        return this.getValue('dropdown', 'EdMedicationRow');
    }

    async getResponseActivationDate() {
        return this.getValue('text', this.responseActivationDateInput);
    }

    async getResponseActivationTime() {
        return this.getValue('text', this.responseActivationTimeInput);
    }

    // INITIAL ASSESSMENT
    async getTemperature() {
        return this.getValue('text', this.temperatureInput);
    }

    async getTemperatureUnit() {
        return this.getValue('after', this.temperatureUnitDropdown);
    }

    async getWeight() {
        return this.getValue('text', this.weightInput);
    }

    async getWeightUnit() {
        return this.getValue('after', this.weightUnitDropdown);
    }

    async getHeight() {
        return this.getValue('text', this.heightInput);
    }

    async getHeightUnit() {
        return this.getValue('after', this.heightUnitDropdown);
    }

    async getParalyticAgents() {
        return this.getValue('state', this.paralyticAgentsCheckbox);
    }

    async getIntubated() {
        return this.getValue('state', this.intubatedCheckbox);
    }

    async getSedated() {
        return this.getValue('state', this.sedatedCheckbox);
    }

    async getRespirationAssisted() {
        return this.getValue('state', this.respirationAssistedCheckbox);
    }

    async getEyeObstruction() {
        return this.getValue('state', this.eyeObstructionCheckbox);
    }

    //vitals
    // VITALS
    async getSbp() {
        return this.getValue('text', this.sbpInput);
    }

    async getDbp() {
        return this.getValue('text', this.dbpInput);
    }

    async getPulseRate() {
        return this.getValue('text', this.pulseRateInput);
    }

    async getUnassistedRespRate() {
        return this.getValue('text', this.unassistedRespRateInput);
    }

    async getO2Saturation() {
        return this.getValue('text', this.o2Saturation);
    }

    async getSupplementalO2() {
        return this.getValue('state', this.supplementalO2CheckboxValue);
    }

    async getGcsEye() {
        return this.getValue('after', this.eyeDropdown);
    }

    async getGcsVerbal() {
        return this.getValue('after', this.verbalDropdown);
    }

    async getGcsMotor() {
        return this.getValue('after', this.motorDropdown);
    }

    // LABS / ALCOHOL
    async getAlcoholUseIndicator() {
        return this.getValue('dropdown', 'AlcoholRow');
    }

    async getClinicianAdministered() {
        return this.getValue('dropdown', 'EDDrugScreen1Row');
    }
}