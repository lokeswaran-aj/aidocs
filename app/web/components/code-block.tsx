'use client';

import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  className?: string;
  children: string;
}

export const CodeBlock = ({
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const code = String(children).replace(/\n$/, '');
  
  // Check if this is an inline code (no language specified and single line)
  const isInlineCode = !className && !code.includes('\n') && code.length < 50;
  if (isInlineCode) {
    return (
      <code
        className="text-sm py-0.5 px-1 font-mono"
        {...props}
      >
        {code}
      </code>
    );
  }

  // Handle code blocks
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';

  return (
    <div className="not-prose flex flex-col my-1">
      <div className="bg-[#282c34] text-sm font-mono text-zinc-100 font-medium px-4 py-2 rounded-t-xl border border-b-0 border-zinc-700">
        {language}
      </div>
      <Highlight 
        theme={themes.oneDark} 
        code={code} 
        language={language}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre
            {...props}
            className="text-sm w-full overflow-x-auto bg-[#282c34] p-4 border border-zinc-700 rounded-b-xl"
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
