import React, { useState, useEffect } from 'react';
import { BlogPost } from '../data/blog';
import { Save, Eye, Trash2, Image as ImageIcon, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getPosts, createPost, deletePost as apiDeletePost } from '../utils/api';

const Admin: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

    // Form State
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState('');
    const [readTime, setReadTime] = useState(5);

    // Load posts from API
    useEffect(() => {
        fetchPostsData();
    }, []);

    const fetchPostsData = async () => {
        try {
            const data = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleSave = async () => {
        const newPost = {
            title,
            excerpt,
            content,
            image: imageUrl || 'https://images.unsplash.com/photo-1499750310159-52f8f6f324e1?auto=format&fit=crop&q=80&w=1000',
            readTime,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        };

        try {
            await createPost(newPost);
            // eslint-disable-next-line no-alert
            alert('Post published successfully!');
            clearForm();
            fetchPostsData(); // Refresh list
        } catch (error) {
            console.error('Error saving post:', error);
            // eslint-disable-next-line no-alert
            alert('Failed to save post.');
        }
    };

    const deletePost = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await apiDeletePost(id);
            fetchPostsData(); // Refresh list
        } catch (error) {
            console.error('Error deleting post:', error);
            // eslint-disable-next-line no-alert
            alert('Failed to delete post.');
        }
    };

    const clearForm = () => {
        setTitle('');
        setExcerpt('');
        setContent('');
        setImageUrl('');
        setTags('');
        setReadTime(5);
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Admin Panel</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setActiveTab('editor')}
                            className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'editor' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Editor
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'preview' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                        >
                            <Eye className="w-4 h-4 mr-2" /> Manage Posts ({posts.length})
                        </button>
                    </div>
                </div>

                {activeTab === 'editor' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Create New Post</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                        placeholder="Enter post title..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                            placeholder="https://..."
                                        />
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                            {imageUrl ? <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-gray-400" />}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                        placeholder="React, CSS, Tutorial"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Read Time (min)</label>
                                        <input
                                            type="number"
                                            value={readTime}
                                            onChange={(e) => setReadTime(Number(e.target.value))}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt (Short Summary)</label>
                                    <textarea
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                                        placeholder="Brief description needed for the card view..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content (Markdown)</label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={15}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                                        placeholder="# Heading\n\nWrite your blog content here using Markdown..."
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={handleSave}
                                        disabled={!title || !content}
                                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save className="w-5 h-5 mr-2" />
                                        Publish Post
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg overflow-y-auto max-h-[90vh]">
                            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white border-b pb-2">Live Preview</h2>
                            <article className="prose dark:prose-invert max-w-none">
                                <h1>{title || 'Your Title Here'}</h1>
                                {imageUrl && <img src={imageUrl} alt="Cover" className="w-full h-64 object-cover rounded-xl my-4" />}
                                <div className="flex gap-2 mb-4">
                                    {tags.split(',').filter(Boolean).map((t, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">{t}</span>
                                    ))}
                                </div>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {content || '*Content preview will appear here...*'}
                                </ReactMarkdown>
                            </article>
                        </div>
                    </div>
                )}

                {activeTab === 'preview' && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">All Published Posts</h2>
                        {posts.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No posts found. Go to Editor to create one.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {posts.map(post => (
                                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                                                <p className="text-sm text-gray-500">{post.date}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deletePost(post.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete post"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
