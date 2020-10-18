import React from "react"
import {graphql } from "gatsby"
import {Typography, Menu, Layout, Image, Divider, BackTop, Affix, Anchor } from 'antd';
import { CodeOutlined, MenuOutlined } from '@ant-design/icons';
import {Helmet} from "react-helmet"
import rehypeReact from "rehype-react"
import Code from '../components/code'
import Avatar  from "../components/image"
import Table  from "../components/table"
import {Heading2, Heading3, Heading4,Heading5}  from "../components/heading"
import 'antd/dist/antd.css';
import _ from "lodash";
const crypto = require('crypto');

const {Title} = Typography;
const { Link } = Anchor;

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
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    table: Table,
    code: Code,
    img: AntdImage
  },
}).Compiler

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: 'menu',
      isSiderBroken: false
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

  onBreakPoint = (broken) => {
    this.setState({
      isSiderBroken: broken
    });
  }

  render() {
    const {data} = this.props;
    const post = data.markdownRemark;
    const title = post.frontmatter.title || _.get(post, 'headings[0].value',
        null) || '';
    const headers = post.headings.filter(h => h.depth > 1);

    let menuId = 0;

    const beian = data.site.siteMetadata.beian;
    const lastModifiedTime = post.parent.modifiedTime;
    const contentMarginLeft = this.state.isSiderBroken ? '0' : '300px';
    return (
        <div>
          <Helmet>
            <meta charSet="utf-8"/>
            <title>{title}{" | IMLC.ME"}</title>
            <link rel="canonical" href="http://mysite.com/example"/>
          </Helmet>
          <Affix style={{ position: 'fixed', bottom: 10, left: 10, zIndex: 1 }}>
            <Avatar />
          </Affix>
          <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                width={300} className="site-layout-background"
                onBreakpoint={this.onBreakPoint}
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  position: 'fixed',
                  left: 0,
                }}
            >
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
                  {headers.map( h => (<Menu.Item key={menuId++}>
                    <a href={'#' + crypto.createHash('sha1').update(h.value).digest('hex')}>{h.value}</a></Menu.Item>))}
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{padding: '20px', marginLeft: contentMarginLeft}}>
              {/*<Header></Header>*/}
              <Content>
                {
                  renderAst(post.htmlAst)
                }
              </Content>
              <Footer>
                <Divider/>
                <p>Last modified at {lastModifiedTime}</p>
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
      parent {
      ... on File {
        id
        name
        modifiedTime(fromNow: true)
      }
    }
    }
    site {
        siteMetadata {
          beian
        }
      }
  }
`