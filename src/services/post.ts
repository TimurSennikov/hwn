import { NewPost } from "../repositories/post.js";
import { Repository } from "../domain/post/repository.js";
import { Service } from "./service_types.js"
;
export function createService(repository: Repository): Service {
    function getAllPosts(category: string | undefined, take: number | undefined) {
        return repository.getAll(category, take);
    }

    function getPostById(id: number) {
        return repository.getById(id);
    }

    function addNewPost(title: string, content: string, author: string | undefined, category: string | undefined) {
        let post: NewPost = {
            title: title,
            content: content,
            author: author,
            category: category
        };

        return repository.addPost(post);
    }

    return {
        getAllPosts,
        getPostById,
        addNewPost
    }
}