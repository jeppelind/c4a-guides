import * as React from 'react';
import { PageProps, graphql } from 'gatsby';

const Post: React.FC<PageProps<Queries.PostByIdQuery>> = ({
  data: { markdownRemark: post },
}) => (
  <div>
    <article>
      <header>
        <h1>{post?.frontmatter.title}</h1>
      </header>
      {post?.html &&
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp='articleBody'
        />
      }
    </article>
  </div>
);

export default Post;

export const query = graphql`
  query PostById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
