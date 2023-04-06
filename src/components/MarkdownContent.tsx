import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypePrism]}
      className="mdx-content"
    />
  );
};

export default MarkdownContent;
