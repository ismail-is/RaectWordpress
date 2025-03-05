import { useEffect, useState } from "react";
import axios from "axios";

const WordPressPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://public-api.wordpress.com/wp/v2/sites/ismailthalithanooji.wordpress.com/posts?_embed")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <h2>WordPress Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* Featured Image */}
            {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                style={{ width: "200px", height: "auto", borderRadius: "10px" }}
              />
            )}
            {/* Title */}
            <div dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordPressPosts;
