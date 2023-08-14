export class Lab {
    labId: string;
    labName: string;

    
    static getLabList(response): Lab[] {
        let labResponse = response.serviceProviderList;
        var labs: Lab[] = [];

        labResponse.forEach(labData => {
            let lab = new Lab();
            lab.labId = labData.serviceProvicerId;
            lab.labName = labData.providerName;
            labs.push(lab);
        });
        return labs;
    }
}
