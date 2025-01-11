'use client';

import { CheckCheck, Copy } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';

interface CodeBlockProps {
  className?: string;
  children: string;
}

export const CodeBlock = ({
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, '');
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="bg-[#282c34] text-sm font-mono text-zinc-100 font-medium px-4 py-2 rounded-t-xl border border-b-0 border-zinc-700 flex justify-between items-center">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          {copied ? <CheckCheck size={14} color='lightgreen' /> : <Copy size={14} />}
        </button>
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
