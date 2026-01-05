export interface DischargeInformation {
    dischargeDate: string;
    dischargeTime: string;
    dischargeOrderDate: string;
    dischargeOrderTime: string;
    icuDay?: string;
    ventilatorDays?: string;
    dischargedTo: string;
    dischargeStatus: string;
    dischargeStatusDescription: string;
}