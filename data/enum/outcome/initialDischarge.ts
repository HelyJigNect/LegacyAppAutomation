let DischargeInformationMandatoryField: { field: string; message: string }[] = [
  {
    field: 'Discharge/Death Date',
    message: 'Discharge Date should not be blank'
  },
  {
    field: 'Discharge/Death Time',
    message: 'Discharge Time should not be blank'
  },
  {
    field: 'ICU Days',
    message: 'ICU Days should not be blank or unknown'
  },
  {
    field: 'Ventilator Days',
    message: 'Total Ventilator Days should not be blank or unknown'
  },
  {
    field: 'Discharged To',
    message: 'Discharged To should not be blank'
  }
];

switch (process.env.ENV) {
  case 'al_uat':
    DischargeInformationMandatoryField.push(
      {
        field: 'Discharge Order Date',
        message: 'Discharge Order Date should not be blank'
      },
      {
        field: 'Discharge Order Time',
        message: 'Discharge Order Time should not be blank'
      }
    );
    break;

  case 'il_uat':
    DischargeInformationMandatoryField.push(
      {
        field: 'Discharge Order Date',
        message: 'Discharge Order Date should be blank'
      },
      {
        field: 'Discharge Order Time',
        message: 'Discharge Order Time should be blank'
      }
    );
    break;
}

export { DischargeInformationMandatoryField }