import * as React from 'react';
import { PageProps, Link, graphql } from 'gatsby';

const IndexSWE: React.FC<PageProps<Queries.SwedishPostsQuery>> = ({
  data
}) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <div>
      {
        posts.map((post) => (
          <h2 key={post.id}>
            <Link to={post.fields.slug} itemProp='url'>
              <span>{post.frontmatter.title}</span>
            </Link>
          </h2>
        ))
      }
    </div>
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
          date(formatString: "MMMM DD, YYYY")
          description
        }
        html
        fields {
          slug
        }
      }
    }
  }
`