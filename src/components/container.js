import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import { Layout, Menu } from "antd"
import { CodeOutlined } from '@ant-design/icons';
const { Header, Footer, Content } = Layout


const Container = ({ defKey, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          beian
        }
      }
    }
  `)

  let headerColor = "white"

  const {title, beian} = data.site.siteMetadata;
  return (
    <Layout style={{backgroundColor: headerColor}}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: headerColor,
          borderBottomStyle: 'solid',
          borderBottomColor: 'rgba(0, 0, 0, 0.06)',
          borderBottomWidth: '1px'
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto"}}>
          <h1>
            <Link to="/" >
              <CodeOutlined/> <span>{title}</span>
            </Link>
          </h1>
          <Menu
            style={{ backgroundColor: headerColor, float: "right" }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={defKey}
          >
            {/*<Menu.Item key="1">*/}
            {/*  <Link to="/page-2/">Page 2</Link>*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="2">*/}
            {/*  <Link to="/404/">Secret page</Link>*/}
            {/*</Menu.Item>*/}
          </Menu>
        </div>
      </Header>
      <Content
        style={{
          padding: "24px 50px",
          marginTop: 64,
          background: `#fff`,
          minHeight: "100vh", //edit this to change minimum page height
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <p>Powered by <a target="_blank" rel="noreferrer" href={"https://www.gatsbyjs.com/"}>Gatsby</a> and <a target="_blank" rel="noreferrer" href={"gatsby-antd-starter"}>gatsby-antd-starter</a></p>
        <p><a href="http://www.miitbeian.gov.cn" rel="noreferrer" target="_blank">{beian}</a></p>
      </Footer>
    </Layout>
  )
}
Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
