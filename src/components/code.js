import React from "react"
import _ from 'lodash';
import {CopyBlock, CodeBlock, github} from "react-code-blocks";

const Code = (props) => {
  const code = props.children[0];
  let lang = _.get(props, 'className', '').replace('language-', '');

  // bash / shell is not supported due to below issue.
  // https://github.com/rajinwonderland/react-code-blocks/issues/19
  if (['shell', 'bash', 'sh', 'ksh', 'zsh'].includes(lang)) {
    console.error(
        `Unsupported language: ${lang} for code block, fallback to default language "text"`);
    lang = 'text';
  }

  const lines = code.split(/\r\n|\r|\n/).length;

  if (lines <= 5) {
    return (
        <CodeBlock
            text={code}
            language={lang}
            showLineNumbers={lines > 5}
            theme={github}
            wrapLines
            codeBlock
        />
    );
  } else {
    return (
        <CopyBlock
            text={code}
            language={lang}
            showLineNumbers={lines > 5}
            theme={github}
            wrapLines
            codeBlock
        />
    )
  }
};

export default Code