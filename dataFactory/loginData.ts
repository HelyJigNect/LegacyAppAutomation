import { Login } from "../dataObjects/logIn";
import envData from '../data/env.json'

const env = process.env.ENV || "dev";
const data = envData[env as keyof typeof envData];

export class LoginData {
    static getValidLoginData(): Login {
        return {
            userName: data.userName,
            password: data.password,
            facilityID: data.facilityID,
        };
    }

    static getInvalidLoginData(): Login {
        return {
            userName: 'invalidUser',
            password: 'wrongPass',
            facilityID: 'FAC001',
        };
    }

    static getLoginDataForFacility(facilityId: string): Login {
        return {
            userName: 'facilityUser',
            password: 'Facility@123',
            facilityID: facilityId,
        };
    }
}