import { expect, Page } from "@playwright/test";
import { ProceduresPage } from "../../pages/registries/proceduresPage";
import { DropDownOption } from "../../dataObjects/dropdownOption";

export class ProceduresPageAction {

    private proceduresPage: ProceduresPage

    constructor(page: Page) {
        this.proceduresPage = new ProceduresPage(page);
    }

    async navigateToProcedureTabAndVerifyTheICD10Options(ICD10Options : DropDownOption[]) {
        await this.proceduresPage.clickOnTabFromNavbar('Procedures');
        expect(await this.proceduresPage.isFormDisplayed('Procedures'),'Procedures form is not displayed').toBeTruthy();

        await this.proceduresPage.clickOnBtnOfICD10Procedure('Add');
        expect(await this.proceduresPage.isSpeedScreenDisplayed('Procedures'), 'Procedures Speed screen is not displayed').toBeTruthy();

        for (const option of ICD10Options) {
            await this.proceduresPage.populateICD10ProcedureCodeFieldOfProceduresSpeedScreen(option.code);
            expect(await this.proceduresPage.getTextOfIcd10DescriptionInput(), `ICD10 Description for code ${option.code} is not as expected`).toEqual(`${option.code}, ${option.shortDescription}`);
        }
    }
}