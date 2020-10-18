import React from "react"
import { Typography } from 'antd';
const { Title } = Typography;

const crypto = require('crypto');
const hash = (text) => crypto.createHash('sha1').update(text).digest('hex');


const Heading1 = (props) => {
  const text = props.children[0];
  return <Title id={hash(text)} level={1}>{text}</Title>
};

const Heading2 = (props) => {
  const text = props.children[0];
  return <Title id={hash(text)} level={2}>{text}</Title>
};

const Heading3 = (props) => {
  const text = props.children[0];
  return <Title id={hash(text)} level={3}>{text}</Title>
};

const Heading4 = (props) => {
  const text = props.children[0];
  return <Title id={hash(text)} level={4}>{text}</Title>
};

const Heading5 = (props) => {
  const text = props.children[0];
  return <Title id={hash(text)} level={5}>{text}</Title>
};

export {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
}