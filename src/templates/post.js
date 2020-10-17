import React from "react"
import {graphql } from "gatsby"
import {Typography, Menu, Layout, Image, Divider, BackTop } from 'antd';
import { CodeOutlined, MenuOutlined } from '@ant-design/icons';
import {Helmet} from "react-helmet"
import rehypeReact from "rehype-react"
import Code from '../components/code'

import 'antd/dist/antd.css';
import _ from "lodash";

const {Title} = Typography;

const {SubMenu} = Menu;
const {Footer, Sider, Content} = Layout;

function AntdImage ({src}) {
  return (<Image
      width={'80%'}
      src={src}
  />);
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: Title,
    code: Code,
    img: AntdImage
  },
}).Compiler

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: 'menu'
    }
  }

  onMenuItemClick = (e) => {
    const {key} = e;
    if(key!=='home') {
      this.setState({
        selectedMenu: key
      })
    }
  }

  render() {
    const {data} = this.props;
    const post = data.markdownRemark;
    const title = post.frontmatter.title || _.get(post, 'headings[0].value',
        null) || '';
    const headers = post.headings.filter(h => h.depth > 1);

    let menuId = 0;

    const beian = data.site.siteMetadata.beian;

    return (
        <div>
          <Helmet>
            <meta charSet="utf-8"/>
            <title>{title}{" | IMLC.ME"}</title>
            <link rel="canonical" href="http://mysite.com/example"/>
          </Helmet>
          <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                width={300} className="site-layout-background">
              <Menu
                  onClick={this.onMenuItemClick}
                  defaultSelectedKeys={['menu']}
                  defaultOpenKeys={['menu']}
                  mode="inline"
                  disabled={true}
                  selectedKeys={[this.state.selectedMenu]}
                  style={{height: '100%', borderRight: 0}}
              >
                <Menu.Item key="home">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <span><CodeOutlined /><span>IMLC.ME</span></span>
                  </a>
                </Menu.Item>
                <SubMenu
                    key="menu"
                    title={<span><MenuOutlined /><span>Menu</span></span>}>
                  {headers.map( h => (<Menu.Item key={menuId++}>{h.value}</Menu.Item>))}
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{padding: '20px'}}>
              {/*<Header></Header>*/}
              <Content>
                {
                  renderAst(post.htmlAst)
                }
              </Content>
              <Footer>
                <Divider/>
                <p>Updated at ${'1994-123'}</p>
                <a href="http://www.miitbeian.gov.cn" target="_blank">{beian}</a>
                <BackTop />
              </Footer>
            </Layout>
          </Layout>


        </div>
    )

  }
}

export default Post;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      frontmatter {
        title
      }
      headings {
        value
        depth
      }
    }
    site {
        siteMetadata {
          beian
        }
      }
  }
`