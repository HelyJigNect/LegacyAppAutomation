import { Page } from "@playwright/test";
import { RegistriesPage } from "./registriesPage";

export class ProvidersPage extends RegistriesPage {
    constructor(page: Page) {
        super(page);
    }

    // Providers - Resus Team
    private providerInput = `//di-code-and-description-field[@field-information-name="Trauma.EdProviders.0.Physician.Link"]//input[@di-input-field="false"]`
    private calledDateInput = `//di-date-input[@field-information-name="Trauma.EdProviders.0.CalledDate"]//input`
    private calledTimeInput = `//input[@di-time-control="Trauma.EdProviders.0.CalledTime"]`
    private respondedDateInput = `//di-date-input[@field-information-name="Trauma.EdProviders.0.RespondedDate"]//input`
    private respondedTimeInput = `//input[@di-time-control="Trauma.EdProviders.0.RespondedTime"]`
    private arrivedDateInput = `//di-date-input[@field-information-name="Trauma.EdProviders.0.ArrivedDate"]//input`
    private arrivedTimeInput = `//input[@di-time-control="Trauma.EdProviders.0.ArrivedTime"]`
    private timelinessDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdProviders.0.TimelyDetail"]//div[@uib-dropdown]`
    private optionOfTimelinessDropdown =(optionValue : string)=> `//ul[@di-append-to-body="Trauma.EdProviders.0.TimelyDetail"]//span[contains(text(),'${optionValue}')]`
    private typeDropdown = `//di-code-and-description-field[@field-information-name="Trauma.EdProviders.5.Type"]//div[@uib-dropdown]`
    private optionOfTypeDropdown =(optionValue : string)=> `//ul[@di-append-to-body="Trauma.EdProviders.5.Type"]//span[contains(text(),'${optionValue}')]`

    // Providers - In-House Consults
    private inhouseTypeDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Consults.0.Type"]//div[@uib-dropdown]`
    private optionOfInhouseTypeDropdown =(optionValue : string)=> `//ul[@di-append-to-body="Trauma.Consults.0.Type"]//span[contains(text(),'${optionValue}')]`
    private emergentConsultCheckbox = `//di-state-button-input[@field-information-name="Trauma.Consults.0.Emergent"]`
    private inhouseProviderInput = `//di-code-and-description-field[@field-information-name="Trauma.Consults.0.Physician.Link"]//input[@di-input-field="false"]`
    private consultDateInput = `//di-date-input[@field-information-name="Trauma.Consults.0.OrderWrittenDate"]//input`
    private consultTimeInput = `//input[@di-time-control="Trauma.Consults.0.OrderWrittenTime"]`
    private inhouseCalledDateInput = `//di-date-input[@field-information-name="Trauma.Consults.0.CalledDate"]//input`
    private inhouseArrivedDateInput = `//di-date-input[@field-information-name="Trauma.Consults.0.ConsultDate"]//input`
    private inhouseArrivedTimeInput = `//input[@di-time-control="Trauma.Consults.0.ConsultTime"]`
    private inhouseTimelinessDropdown = `//di-code-and-description-field[@field-information-name="Trauma.Consults.0.TimelyDetail"]//div[@uib-dropdown]`
    private optionOfInhouseTimelinessDropdown =(optionValue : string)=> `//ul[@di-append-to-body="Trauma.Consults.0.TimelyDetail"]//span[contains(text(),'${optionValue}')]`
}