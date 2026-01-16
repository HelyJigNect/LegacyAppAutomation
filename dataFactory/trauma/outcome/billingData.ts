import { Billing } from "../../../dataObjects/trauma/outcome/billing";

export class BillingData {
    static getBillingInfoData(): Billing {
        let primaryPayor
        switch (process.env.ENV) {
            case 'il_uat':
            case 'sd_uat':
            case 'md_uat':
                primaryPayor = 'Self Pay'
                break;

            default:
                primaryPayor = 'Self-Pay';
                break;
        }
        return { primaryPayor }
    }
}