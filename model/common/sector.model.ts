
import { Service } from "./service.model";
export class Sector {
    sectorId: number;
    sectorName: string;
    sectorNameArabic: string;
    sectorIconPath: string;
    noOfTestsIncluded: number;
    testsIncluded: string;
    servicePrice:number;
    tests:Service[];

    static getSectorList(response): Sector[] {
        let sectorResponse = response.corpPackageList;
        var sectors: Sector[] = [];

        sectorResponse.forEach(sectorData => {
            let sector = new Sector();
            sector.sectorId = sectorData.serviceId;
            sector.sectorName = sectorData.serviceName;
            sector.noOfTestsIncluded = sectorData.noOfTestsIncluded;
            sector.testsIncluded = sectorData.testsIncluded;
            sector.servicePrice = sectorData.servicePrice;
            sector.tests = this.getService(sectorData.tests);
            sectors.push(sector);
        });
        return sectors;
    }

    static getService(response): Service[] {
        let serviceResponse = response;
        var services: Service[] = [];

        serviceResponse.forEach(sectorData => {
            let service = new Service();
            service.serviceId = sectorData.testId;
            service.serviceName = sectorData.testName;
            service.serviceDescription=sectorData.serviceDescription;
            services.push(service);
        });
        return services;
    }
}



