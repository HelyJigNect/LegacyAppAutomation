export const InitialAssessmentMandatoryField: { field: string; message: string }[] = [
    {
        field: 'Initial ED Vitals Temperature Value',
        message: 'Temperature 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals Weight Value',
        message: 'Weight 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals Height Value',
        message: 'Height 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals Paralytic Agents',
        message: 'Paralytic Agents 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals Sedated',
        message: 'Sedated 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals Eye Obstruction',
        message: 'Eye Obstruction 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals Intubated',
        message: 'Intubated 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals Respiration Assisted',
        message: 'Respiration Assisted 1 should not be blank'
    }];

let VitalsMandatoryField: { field: string; message: string }[] = [
    {
        field: 'Initial ED Vitals SBP',
        message: 'SBP 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals Unassisted Resp Rate',
        message: 'Unassisted Resp Rate 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals O2 Saturation',
        message: 'O2 Saturation 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals GCS Eye',
        message: 'GCS Eye 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals GCS Verbal',
        message: 'GCS Verbal 1 should not be blank'
    },
    {
        field: 'Initial ED Vitals GCS Motor',
        message: 'GCS Motor 1 should not be blank'
    }];

switch (process.env.ENV) {
    case 'al_uat':
        VitalsMandatoryField.push(
            {
                field: 'Initial ED Vitals DBP',
                message: 'DBP 1 should not be blank'
            },
            {
                field: 'Initial ED Vitals Pulse Rate',
                message: 'Pulse Rate 1 should not be blank'
            },
        );
        break;
    case 'il_uat':
        VitalsMandatoryField.push(
            {
                field: 'Initial ED Vitals DBP',
                message: 'Item 1: DBP should not be blank'
            },
            {
                field: 'Initial ED Vitals Pulse Rate',
                message: 'Pulse Rate should not be blank'
            },
        );
        break;
}

export { VitalsMandatoryField }