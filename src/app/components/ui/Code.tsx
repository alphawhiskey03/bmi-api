"use client";
import { FC, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animated?: boolean;
  animationDelay?: number;
}

const Code: FC<CodeProps> = ({
  code,
  language,
  show,
  animated,
  animationDelay,
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalid = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalid);
          }
        }, 15);
        return () => clearInterval(intervalid);
      }, animationDelay || 150);
    }
  }, [animated, animationDelay, code, show]);

  // no. of lines
  const lines = text.split(/\r\n|\r|\n/).length;

  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"
          }
          style={{
            maxHeight: show ? 24 * lines : 0,
            opacity: show ? 1 : 0,
          }}
        >
          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i });
            return (
              <div key={`line-${i}`} style={{ position: "relative" }} {...rest}>
                {line.map((token, index) => {
                  const { key, ...props } = getTokenProps({ token, i });

                  return <span key={index} {...props}></span>;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
