import React from "react"
import { CopyBlock, github } from "react-code-blocks";


const Code = (props) => {
  const code = props.children[0];
  const lang = props.className.replace('language-', '');
  // props.languages = 'text';
  // props.showLineNumbers = true;
  return (
      <CopyBlock
          text={code}
          language={lang}
          showLineNumbers={true}
          theme={github}
          wrapLines
          codeBlock
      />
  );
};

export default Code