export interface InitialAssessment {
    temperature: string
    temperatureUnit: string
    weight: string
    weightUnit: string
    height: string
    heightUnit: string
    paralyticAgents: string
    sedated: string
    eyeObstruction: string
    intubated: string
    respirationAssisted: string
}

export interface Vitals {
    sbp: string
    dbp: string
    pulseRate: string
    unassistedRespRate: string
    o2Saturation: string
    supplementalO2: string
    eye: string
    verbal: string
    motor: string,
    warmingMeasuresCode: string
    warmingMeasuresDescription: string
}