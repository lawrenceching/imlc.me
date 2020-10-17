import React from "react"
import {graphql} from "gatsby"
import {Typography, Menu, Layout, Image} from 'antd';
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
    return (
        <div>
          <Helmet>
            <meta charSet="utf-8"/>
            <title>{title}{" | IMLC.ME"}</title>
            <link rel="canonical" href="http://mysite.com/example"/>
          </Helmet>
          <Layout>
            <Sider width={300} className="site-layout-background">
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
              <Footer>Footer</Footer>
            </Layout>
          </Layout>


        </div>
    )

  }
}

export default Post;
// export default function BlogPost() {
//   const post = data.markdownRemark
//   return (
//         <div>
//           <Menu
//               onClick={this.handleClick}
//               style={{ width: 256 }}
//               defaultSelectedKeys={['1']}
//               defaultOpenKeys={['sub1']}
//               mode="inline"
//           >
//             <SubMenu
//                 key="sub1"
//                 title={
//                   <span>
//               <span>Navigation One</span>
//             </span>
//                 }
//             >
//               <Menu.ItemGroup key="g1" title="Item 1">
//                 <Menu.Item key="1">Option 1</Menu.Item>
//                 <Menu.Item key="2">Option 2</Menu.Item>
//               </Menu.ItemGroup>
//               <Menu.ItemGroup key="g2" title="Item 2">
//                 <Menu.Item key="3">Option 3</Menu.Item>
//                 <Menu.Item key="4">Option 4</Menu.Item>
//               </Menu.ItemGroup>
//             </SubMenu>
//             <SubMenu key="sub2"  title="Navigation Two">
//               <Menu.Item key="5">Option 5</Menu.Item>
//               <Menu.Item key="6">Option 6</Menu.Item>
//               <SubMenu key="sub3" title="Submenu">
//                 <Menu.Item key="7">Option 7</Menu.Item>
//                 <Menu.Item key="8">Option 8</Menu.Item>
//               </SubMenu>
//             </SubMenu>
//             <SubMenu
//                 key="sub4"
//                 title={
//                   <span>
//               <span>Navigation Three</span>
//             </span>
//                 }
//             >
//               <Menu.Item key="9">Option 9</Menu.Item>
//               <Menu.Item key="10">Option 10</Menu.Item>
//               <Menu.Item key="11">Option 11</Menu.Item>
//               <Menu.Item key="12">Option 12</Menu.Item>
//             </SubMenu>
//           </Menu>
//           <h1>{post.frontmatter.title}</h1>
//           {
//             renderAst(post.htmlAst)
//           }
//         </div>
//   )
// }

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
  }
`