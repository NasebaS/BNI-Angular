// Table data
export interface Table {
    id: string;
    name: string;
    aname: string;
   
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
