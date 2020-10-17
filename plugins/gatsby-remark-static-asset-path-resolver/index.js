const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

module.exports = async ({ markdownAST }, pluginOptions) => {
  const {basePath} = pluginOptions;
  // Manipulate AST

  visit(markdownAST, "image", node => {
    let {url} = node
    node.url = basePath + url;
  });

  // visit(markdownAST, "heading", node => {
  //   let {depth} = node
  //   // Skip if not an h1
  //   if (depth !== 1) {
  //     return
  //   }
  //
  //   console.log(JSON.stringify(node, null, 4))
  //
  //   // Grab the innerText of the heading node
  //   let text = toString(node)
  //   const html = `
  //       <h1 style="color: rebeccapurple">
  //         ${text}
  //       </h1>
  //     `
  //
  //   console.log(`text: ${text}`);
  //   node.type = "html"
  //   node.children = undefined
  //   node.value = html
  // });

  return markdownAST
}