// Table data
export interface Table {
    corpEmpId: string;
    firstName: string;
    emailId: string;
    mobile: string;
    gender: string;
    dob: string;
    claims: string;
    address:string;
    doj:string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
