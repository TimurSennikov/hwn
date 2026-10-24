export interface Service {
    getAllCategories: (take: number) => Promise<any>,
    getCategoryById: (id: number) => Promise<any>,
    addNewCategory: (title: string) => Promise<string>
};