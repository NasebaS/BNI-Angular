
import { Service } from "./service.model";
export class District {
    districtId: number;
    districtName: string;

    static getDistrictList(response): District[] {
        let districtResponse = response.data;
        var districts: District[] = [];

        districtResponse.forEach(districtData => {
            let district = new District();
            district.districtId = districtData.id;
            district.districtName = districtData.name;
            districts.push(district);
        });
        return districts;
    }
}



