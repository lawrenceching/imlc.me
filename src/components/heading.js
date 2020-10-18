import React from "react"
import { Typography } from 'antd';
import _ from 'lodash';
const { Title } = Typography;
const crypto = require('crypto');
const hash = (text) => crypto.createHash('sha1').update(text).digest('hex');

const heading = (level) => {
  return (props) => {
    let text = _.get(props, 'children[0]', 'N/A')
    if(!(text instanceof String)) {
      text = `Unsupported heading type: ${typeof text}`
    }
    return <Title id={hash(text)} level={level}>{text}</Title>
  }
};

const headings = {};

for (const i in [1, 2, 3, 4, 5]) {
  headings['Heading' + i] = heading(i)
}

export const { Heading1, Heading2, Heading3, Heading4, Heading5 } = headings;
