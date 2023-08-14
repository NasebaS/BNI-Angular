// Table data
export interface Table {
    name: string;
    position: string;
    office: string;
    status: string;
    price: string;
    date: string;
    salary: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
