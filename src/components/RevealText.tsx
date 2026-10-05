import type { ElementType } from 'react';

interface Props { text: string; as?: ElementType; className?: string; delay?: number }

 export function RevealText({ text, as: Tag = 'span', className = '', delay = 0 }: Props) {
  const words = text.split(' ');
  return (
    <Tag className={className} data-split data-reveal-delay={delay}>
      {words.map((w, i) => (
        <span key={i} className="split-word">
          <span className="split-word-inner">{w}{i < words.length - 1 ? '\u00A0' : ''}</span>
        </span>
      ))}
    </Tag>
  );
}
