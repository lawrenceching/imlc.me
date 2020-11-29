import React from "react"
import _ from 'lodash';
import {CopyBlock, CodeBlock, github} from "react-code-blocks";

const styles = {
  backgroundColor: 'rgb(245, 247, 249)',
  borderRadius: '3px',
  fontFamily: '"Source Code Pro", Consolas, Menlo, monospace',
  padding: '3px 6px',
  margin: '0px 1px'
}

const InlineCode = (props) => {
  console.log('InlineCode: ', props);
  const text = props.children[0];
  return <code style={styles}>{text}</code>
};

export default InlineCode