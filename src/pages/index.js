import React from "react"
import Container from "../components/container"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { Divider } from 'antd';

const IndexPage = ({data}) => {
  console.log(data)
  return <Container>
    <SEO title="Home" />

    {data.allMarkdownRemark.nodes.map(( node ) => (
        <div key={node.id}>
          <h3>
            <Link to={node.fields.slug}>
              {node.frontmatter.title || node.headings[0].value || ''}
            </Link>
          </h3>
          <p>{node.frontmatter.description || node.excerpt}</p>
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
    }
  }
}
`