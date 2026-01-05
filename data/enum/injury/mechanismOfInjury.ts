
let ECodesMandatoryField: { field: string; message: string }[] = [
  {
    field: 'Injury Type',
    message: 'Injury Type 1 should not be blank'
  }];

switch (process.env.ENV) {
  case 'al_uat':
    ECodesMandatoryField.push(
      {
        field: 'Primary Mechanism of Injury',
        message: 'Primary ICD 10 Mechanism should not be blank'
      });
    break;

  case 'il_uat':
    ECodesMandatoryField.push(
      {
        field: 'Primary ICD 10 Mechanism',
        message: 'Primary ICD 10 Mechanism should not be blank'
      });
    break;
}

export { ECodesMandatoryField }