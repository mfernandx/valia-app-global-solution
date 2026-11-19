export interface LaborRightSection {
    title: string;
    content: string;
}

export interface LaborRightCategory {
    id: string;
    title: string;
    description: string;
    icon: string;
    sections: LaborRightSection[];
    legalReferences: string[];
}
