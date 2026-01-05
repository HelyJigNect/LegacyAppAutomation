import { LocationService } from "../../../dataObjects/trauma/patientTracking/locationService";

export class LocationServiceData {
    static getLocationServiceData(): LocationService {
        return {
            locationCode: "?",
            locationDescription: "Unknown"
        }
    }
}