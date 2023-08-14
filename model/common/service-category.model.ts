export class ServiceCategory {
    serviceId: number;
    categoryName: string;
    categoryNameArabic: string;
    isActive: number;

    static getLabServiceCategories(responseData): ServiceCategory[] {
        var labCategories: Array<ServiceCategory> = [];
        let categories = responseData["labTestCategories"];
        categories.forEach(category => {
            let serviceCategory = new ServiceCategory();
            serviceCategory.serviceId = category["labTestCategoryId"];
            serviceCategory.categoryName = category["labTestCategoryName"]
            serviceCategory.categoryNameArabic = category["labTestCategoryNameArabic"]
            serviceCategory.isActive = category["isActive"]
            labCategories.push(serviceCategory);
        });
        return labCategories;
    }

    static getServicePackageCategories(responseData): ServiceCategory[] {
        var servicePackages: Array<ServiceCategory> = [];
        let categories = responseData["servicePackageCategories"];
        categories.forEach(category => {
            let serviceCategory = new ServiceCategory();
            serviceCategory.serviceId = category["servicePackageCategoryId"];
            serviceCategory.categoryName = category["pacakgeCategoryName"]
            serviceCategory.categoryNameArabic = category["packageCategoryNameArabic"]
            serviceCategory.isActive = category["isActive"]
            servicePackages.push(serviceCategory);
        });
        return servicePackages;
    }
}
