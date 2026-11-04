
package BlogApi.week6_spring_blog_api.service;
import BlogApi.week6_spring_blog_api.exception.ResourceNotFoundException;
import BlogApi.week6_spring_blog_api.entity.Post;
import BlogApi.week6_spring_blog_api.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // CREATE
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    // READ ALL
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // READ ONE
    public Post getPostById(Long id) {
    return postRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Post not found with id: " + id));
}

    // UPDATE
    public Post updatePost(Long id, Post updatedPost) {
        Post existingPost = getPostById(id);

        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setContent(updatedPost.getContent());
        existingPost.setAuthor(updatedPost.getAuthor());

        return postRepository.save(existingPost);
    }

    // DELETE
    public void deletePost(Long id) {
        Post post = getPostById(id);
        postRepository.delete(post);
    }
}
