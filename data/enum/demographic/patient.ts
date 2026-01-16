let PatientInformationMandatoryField: { field: string; message: string }[] = [
  {
    field: 'Date of Birth',
    message: 'Date of Birth should not be blank'
  },
  { field: 'Age', message: 'Age should not be blank, unknown, or n/a' },
  {
    field: 'Age Unit',
    message: 'Age Unit should not be blank, unknown, or n/a'
  },
  { field: 'Gender', message: 'Gender should not be blank' },
  {
    field: 'Gender Identity',
    message: 'Gender Identity should not be blank'
  },
  {
    field: 'Gender-Affirming Hormone Therapy',
    message: 'Gender-Affirming Hormone Therapy should not be blank'
  },
  { field: 'Ethnicity', message: 'Ethnicity should not be blank' },
];

switch (process.env.ENV) {
  case 'al_uat':
    PatientInformationMandatoryField.push(
      { field: 'SSN', message: 'SSN should not be blank' }
    );
    break;
  case 'dev':
    PatientInformationMandatoryField = [{
      field: 'Gender-Affirming Hormone Therapy',
      message: 'Gender-Affirming Hormone Therapy should not be blank'
    },];
    break;
}

export const PatientAddressInformationMandatoryField: { field: string; message: string }[] = [
  {
    field: 'Patient Address Zip',
    message: 'Patient Address Zip should not be blank'
  },
  {
    field: 'Patient Address Country',
    message: 'Patient Address Country should not be blank'
  }];

export { PatientInformationMandatoryField };
