import * as React from 'react';
import { PageProps, graphql } from 'gatsby';
import Container from 'react-bootstrap/Container';
import PostPreview from '../components/PostPreview';

const IndexSWE: React.FC<PageProps<Queries.SwedishPostsQuery>> = ({
  data
}) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Container>
      {
        posts.map((post) => (
          <PostPreview key={post.id} slug={post.fields.slug} frontmatter={post.frontmatter} />
        ))
      }
    </Container>
  );
}

export default IndexSWE;

export const query = graphql`
  query SwedishPosts {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "//blog/swe//"}},
      sort: {frontmatter: {order: ASC}}
    ) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          description
        }
        fields {
          slug
        }
      }
    }
  }
`