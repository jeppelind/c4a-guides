import * as React from 'react';
import { Link } from 'gatsby';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './PostPreview.scss';

type PostProps = {
  frontmatter: {
    title: string,
    description?: string | null,
  },
  slug: string,
}

const PostPreview: React.FC<PostProps> = ({
  frontmatter,
  slug,
}) => (
  <Col className='preview'>
    <Link to={slug} itemProp='url'>
      <Card>
        <Card.Body>
          <Card.Title as='h4'>{frontmatter.title}</Card.Title>
          <Card.Text>{frontmatter.description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  </Col>
);

export default PostPreview;