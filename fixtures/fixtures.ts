import { test as baseTest, TestInfo, expect } from '@playwright/test';
import { TestRailHelper } from '../utils/testRailHelper';

// ------------------- Pages -------------------
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { RegistriesPage } from '../pages/registries/registriesPage';
import { DemographicPage } from '../pages/registries/demographicPage';
import { InjuryPage } from '../pages/registries/injuryPage';
import { PrehospitalPage } from '../pages/registries/prehospitalPage';
import { ReferringFacilityPage } from '../pages/registries/referringFacilityPage';
import { OutcomePage } from '../pages/registries/outcomePage';
import { DiagnosisPage } from '../pages/registries/diagnosisPage';
import { EdResusPage } from '../pages/registries/edResusPage';
import { PatientTrackingPage } from '../pages/registries/patientTrackingPage';
import { QaTrackingPage } from '../pages/registries/qaTrackingPage';
import { TDPPage } from '../pages/registries/tdpPage';

// ------------------- Page Actions -------------------
import { LoginPageAction } from '../pageActions/loginPageAction';
import { HomePageAction } from '../pageActions/homePageAction';
import { RegistriesPageAction } from '../pageActions/registries/registriesPageAction';
import { DemographicPageAction } from '../pageActions/registries/demographicPageAction';
import { InjuryPageAction } from '../pageActions/registries/injuryPageAction';
import { PrehospitalPageAction } from '../pageActions/registries/prehospitalPageAction';
import { ReferringFacilityPageAction } from '../pageActions/registries/referringFacilityPageAction';
import { OutcomePageAction } from '../pageActions/registries/outcomePageAction';
import { DiagnosisPageAction } from '../pageActions/registries/diagnosisPageAction';
import { EdResusPageAction } from '../pageActions/registries/edResusPageAction';
import { TdpPageAction } from '../pageActions/registries/tdpPageAction';
import { QaTrackingPageAction } from '../pageActions/registries/qaTrackingPageAction';
import { PatientTrackingPageAction } from '../pageActions/registries/patientTrackingAction';

// ------------------- Data -------------------
import { LoginData } from '../dataFactory/loginData';

// ------------------- Environment -------------------
const environment = process.env.TEST_ENV || 'dev';

// ------------------- Fixture Definition -------------------
export const test = baseTest.extend<{
  // Pages
  loginPage: LoginPage;
  homePage: HomePage;
  registriesPage: RegistriesPage;
  demographicPage: DemographicPage;
  injuryPage: InjuryPage;
  prehospitalPage: PrehospitalPage;
  referringFacilityPage: ReferringFacilityPage;
  outcomePage: OutcomePage;
  diagnosisPage: DiagnosisPage;
  edResusPage: EdResusPage;
  patientTrackingPage: PatientTrackingPage;
  qaTrackingPage: QaTrackingPage;
  tdpPage: TDPPage;

  // Page Actions
  loginPageAction: LoginPageAction;
  homePageAction: HomePageAction;
  registriesPageAction: RegistriesPageAction;
  demographicPageAction: DemographicPageAction;
  injuryPageAction: InjuryPageAction;
  prehospitalPageAction: PrehospitalPageAction;
  referringFacilityPageAction: ReferringFacilityPageAction;
  outcomePageAction: OutcomePageAction;
  diagnosisPageAction: DiagnosisPageAction;
  edResusPageAction: EdResusPageAction;
  tdpPageAction: TdpPageAction;
  qaTrackingPageAction: QaTrackingPageAction;
  patientTrackingPageAction: PatientTrackingPageAction;

  // TestRail Helper
  testRail: TestRailHelper;
}>({

  // ------------------- Page Fixtures -------------------
  page: async ({ page }, use) => {
    console.log('Logging in...');
    await page.goto('/');
    const loginAction = new LoginPageAction(page);
    await loginAction.loginSuccessfully(LoginData.getValidLoginData());
    await use(page);
  },

  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  homePage: async ({ page }, use) => await use(new HomePage(page)),
  registriesPage: async ({ page }, use) => await use(new RegistriesPage(page)),
  demographicPage: async ({ page }, use) => await use(new DemographicPage(page)),
  injuryPage: async ({ page }, use) => await use(new InjuryPage(page)),
  prehospitalPage: async ({ page }, use) => await use(new PrehospitalPage(page)),
  referringFacilityPage: async ({ page }, use) => await use(new ReferringFacilityPage(page)),
  outcomePage: async ({ page }, use) => await use(new OutcomePage(page)),
  diagnosisPage: async ({ page }, use) => await use(new DiagnosisPage(page)),
  edResusPage: async ({ page }, use) => await use(new EdResusPage(page)),
  patientTrackingPage: async ({ page }, use) => await use(new PatientTrackingPage(page)),
  qaTrackingPage: async ({ page }, use) => await use(new QaTrackingPage(page)),
  tdpPage: async ({ page }, use) => await use(new TDPPage(page)),

  // ------------------- Page Action Fixtures -------------------
  loginPageAction: async ({ page }, use) => await use(new LoginPageAction(page)),
  homePageAction: async ({ page }, use) => await use(new HomePageAction(page)),
  registriesPageAction: async ({ page }, use) => await use(new RegistriesPageAction(page)),
  demographicPageAction: async ({ page }, use) => await use(new DemographicPageAction(page)),
  injuryPageAction: async ({ page }, use) => await use(new InjuryPageAction(page)),
  prehospitalPageAction: async ({ page }, use) => await use(new PrehospitalPageAction(page)),
  referringFacilityPageAction: async ({ page }, use) => await use(new ReferringFacilityPageAction(page)),
  outcomePageAction: async ({ page }, use) => await use(new OutcomePageAction(page)),
  diagnosisPageAction: async ({ page }, use) => await use(new DiagnosisPageAction(page)),
  edResusPageAction: async ({ page }, use) => await use(new EdResusPageAction(page)),
  tdpPageAction: async ({ page }, use) => await use(new TdpPageAction(page)),
  qaTrackingPageAction: async ({ page }, use) => await use(new QaTrackingPageAction(page)),
  patientTrackingPageAction: async ({ page }, use) => await use(new PatientTrackingPageAction(page)),

  // ------------------- TestRail Fixture -------------------
  testRail: async ({}, use) => {
    const environment = process.env.ENV || 'dev';
    const testRail = new TestRailHelper({
      user: 'hely.patel@eso.com',
      apiKey: 'K35qu9wys3sgZysWVhbd-AUkfrIYVKP7lCI1Lz6UH',
      baseUrl: 'https://esosolutions.testrail.io',
      projectId: 20,
      suiteId: 5184,
      environment,
    });

    await use(testRail);
  },
});

// ----------------- Push results after each test -----------------
test.afterEach(async ({ testRail }, testInfo: TestInfo) => {
  const caseIds = testInfo.annotations
    .filter(a => a.type === 'testrail' && a.description)
    .map(a => Number(a.description!.replace('C', '')));

  if (caseIds.length) {
    const statusId = testInfo.status === 'passed' ? 1 : 5;
    for (const caseId of caseIds) {
      await testRail.addResult(caseId, statusId, `Automated execution (${environment})`);
    }
  }
});

export { expect };

