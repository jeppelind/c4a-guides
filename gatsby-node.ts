import path from 'path';
import { GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

const postTemplate = path.resolve('./src/templates/Post.tsx');

type Post = {
  id: string,
  fields: {
    slug: string,
  },
}

type ResultData = {
  errors?: any,
  data?: {
    allMarkdownRemark: {
      nodes: Post[],
    },
  },
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result: ResultData = await graphql(`
    query AllPosts {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading blog posts', result.errors);
    return;
  }

  const posts = result.data ? result.data.allMarkdownRemark.nodes : [];
  reporter.log(`Number of posts: ${posts.length}`);
  if (posts.length > 0) {
    posts.forEach((post) => {
      createPage({
        path: post.fields.slug,
        component: postTemplate,
        context: {
          id: post.id,
        },
      });
    });
  }
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      node,
      value,
      name: 'slug',
    });
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions,
}) => {
  const { createTypes } = actions;

  createTypes(`
    type Frontmatter {
      title: String!
      description: String
      date: Date @dateformat
      order: Int
    }

    type Fields {
      slug: String!
    }
  
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
      fields: Fields!
      html: String!
    }
  `);
}
