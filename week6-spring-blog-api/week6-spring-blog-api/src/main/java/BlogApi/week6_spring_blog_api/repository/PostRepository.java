
package BlogApi.week6_spring_blog_api.repository;

import BlogApi.week6_spring_blog_api.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
