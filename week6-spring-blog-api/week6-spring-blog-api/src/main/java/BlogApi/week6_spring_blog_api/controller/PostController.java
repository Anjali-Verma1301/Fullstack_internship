
package BlogApi.week6_spring_blog_api.controller;

import BlogApi.week6_spring_blog_api.entity.Post;
import BlogApi.week6_spring_blog_api.service.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // CREATE
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@Valid @RequestBody Post post) {
        return postService.createPost(post);
    }

    // READ ALL
    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Post updatePost(
            @PathVariable Long id,
            @Valid @RequestBody Post post) {
        return postService.updatePost(id, post);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}

