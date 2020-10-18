import React from "react"
import { Typography } from 'antd';
import _ from 'lodash';
const { Title } = Typography;
const crypto = require('crypto');
const hash = (text) => crypto.createHash('sha1').update(text).digest('hex');

const heading = (level) => {
  return (props) => {
    let text = _.get(props, 'children[0]', 'N/A')
    if(typeof text !== 'string') {
      text = _.get(text, 'props.children[0]', 'N/A')
    }
    return <Title id={hash(text)} level={level}>{text}</Title>
  }
};

const headings = {};

for (const i of [1, 2, 3, 4, 5]) {
  headings['Heading' + i] = heading(i)
}

export const { Heading1, Heading2, Heading3, Heading4, Heading5 } = headings;
