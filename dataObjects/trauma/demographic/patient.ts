export interface PatientInfo {
    dob: string;
    age?: string;
    in?: string;
    gender: string;
    genderId: string;
    genderAHT: string;
    race: string;
    raceDescription: string;
    ethnicity: string;
    ssn: string;
}

export interface PatientAddressInfo {
    zip: string;
    homeless: string;
    state: string;
    county: string;
    country: string;
}

export interface RaceOptions{
    code: string;
    description: string;
}