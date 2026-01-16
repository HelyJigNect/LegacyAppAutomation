let ArrivalInformationMandatoryFields: { field: string; message: string }[] = [
    {
        field: 'Primary Medical Event',
        message: 'Primary Medical Event should not be blank'
    },
    {
        field: 'ED Departure Order Date',
        message: 'ED Departure Order Date should not be blank'
    },
    {
        field: 'ED Departure Order Time',
        message: 'ED Departure Order Time should not be blank'
    },
    {
        field: 'ED Departure/Admitted Date',
        message: 'ED Departure/Admitted Date should not be blank'
    },
    {
        field: 'ED Departure/Admitted Time',
        message: 'ED Departure/Admitted Time should not be blank'
    },
    {
        field: 'Intubation Prior To Arrival',
        message: 'Intubation Prior To Arrival should not be blank'
    },
    {
        field: 'Signs of Life',
        message: 'Signs of Life should not be blank'
    },
    {
        field: 'Post ED Disposition',
        message: 'Post ED Disposition should not be blank or unknown'
    }];

switch (process.env.ENV) {
    case 'dev':
        ArrivalInformationMandatoryFields = [
            {
                field: 'Primary Medical Event',
                message: 'Primary Medical Event should not be blank'
            },
            {
                field: 'Intubation Prior To Arrival',
                message: 'Intubation Prior To Arrival should not be blank'
            },
            {
                field: 'Primary Trauma Service Type',
                message: 'Primary Trauma Service Type should not be blank'
            },
        ]
        break;
}
export { ArrivalInformationMandatoryFields };