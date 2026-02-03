'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  ImageIcon,
  Minus
} from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = 'Start writing your blog post...' }: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false, // Fix SSR hydration issues
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-secondary hover:text-accent underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="border-2 border-secondary/20 rounded-xl overflow-hidden bg-surface/30">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-secondary/20 bg-surface/50">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r border-secondary/10">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('bold') ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('italic') ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('strike') ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('code') ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 pr-2 border-r border-secondary/10">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 pr-2 border-r border-secondary/10">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('bulletList') ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('orderedList') ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        {/* Block Elements */}
        <div className="flex items-center gap-1 pr-2 border-r border-secondary/10">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('blockquote') ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded hover:bg-secondary/10 transition-colors text-text-secondary"
            title="Horizontal Line"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Link & Image */}
        <div className="flex items-center gap-1 pr-2 border-r border-secondary/10">
          <button
            onClick={addLink}
            className={`p-2 rounded hover:bg-secondary/10 transition-colors ${
              editor.isActive('link') ? 'bg-secondary/20 text-secondary' : 'text-text-secondary'
            }`}
            title="Add Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-secondary/10 transition-colors text-text-secondary"
            title="Add Image"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-secondary/10 transition-colors text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-secondary/10 transition-colors text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
