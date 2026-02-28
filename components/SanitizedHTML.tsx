import DOMPurify from "isomorphic-dompurify";

interface Props {
  html: string;
  className?: string;
}

export const SanitizedHTML = ({ html, className }: Props) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
};
