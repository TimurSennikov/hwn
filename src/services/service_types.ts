export interface Service {
    getAllPosts: (category: string | undefined, take: number | undefined) => Promise<any>,
    getPostById: (id: number) => Promise<any>,
    addNewPost: (title: string, content: string, author : number | undefined, category: string | undefined) => Promise<string>
};