import React from "react"
import Container from "../components/container"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { Divider } from 'antd';
import _ from 'lodash';
import moment from 'moment';

import 'antd/dist/antd.css';

const IndexPage = ({data}) => {

  data.allMarkdownRemark.nodes.sort((n1, n2) => {
    return Date.parse(n2.parent.modifiedTime) - Date.parse(
        n1.parent.modifiedTime)
  });

  return <Container>
    <SEO title="HOME" />

    {data.allMarkdownRemark.nodes
        .filter(node => {
          return _.get(node, 'headings[0].value') !== 'Table of contents'
        })
        .map(( node ) => (
        <div key={node.id}>
          <h3>
            <Link to={node.fields.slug}>
              {node.frontmatter.title || _.get(node, 'headings[0].value', null) || 'N/A'}
            </Link>
          </h3>
          <p>{node.frontmatter.description || node.excerpt}</p>
          <p>{moment(node.parent.modifiedTime).fromNow()}</p>
          <Divider/>
        </div>
    ))}

  </Container>
}

export default IndexPage

export const query = graphql`
query MyQuery {
  allMarkdownRemark {
    nodes {
      id
      frontmatter {
        description
        title
      }
      fileAbsolutePath
      headings(depth: h1) {
        value
      }
      fields {
        slug
      }
      excerpt(format: PLAIN, pruneLength: 100)
      parent {
        ... on File {
          modifiedTime(fromNow: false)
        }
      }
    }
  }
}
`