import * as React from 'react';
import { PageProps, graphql } from 'gatsby';
import Container from 'react-bootstrap/Container';

const Post: React.FC<PageProps<Queries.PostByIdQuery>> = ({
  data: { markdownRemark: post },
}) => (
  <Container className='px-3'>
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
  </Container>
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
