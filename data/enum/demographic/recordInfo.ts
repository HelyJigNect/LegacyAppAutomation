let IdentifiersMandatoryField: { field: string; message: string }[] = [
    {
        field: 'Patient Arrival Time',
        message: 'Patient Arrival Time should not be blank',
    },
];

switch (process.env.ENV) {
    case 'al_uat':
        IdentifiersMandatoryField.push(
            {
                field: 'Patient Last Name',
                message: 'Patient Name Last should not be blank'
            },
            {
                field: 'Patient First Name',
                message: 'Patient Name First should not be blank'
            },
        );
        break;
}

export { IdentifiersMandatoryField };