'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data?.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

function Feed() {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            // console.log(data);
            const filtered = data.filter(
                (item) =>
                    item.prompt.includes(searchText) ||
                    item.tag.includes(searchText) ||
                    item.creator.username.includes(searchText)
            );
            setPosts(filtered);
        };

        fetchPosts();
    }, [searchText]);

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList data={posts} handleTagClick={handleSearchChange} />
        </section>
    );
}

export default Feed;
