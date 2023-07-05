'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

function MyProfile() {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user.id}/posts`
            );
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    const handleEdit = async (post) => {
        // router.push(`update-prompt/id={${post.id}}`);
        router.push(`/update-prompt?id=${post._id}`);
    };
    const handleDelete = async (post) => {};
    return (
        <Profile
            name={`My`}
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
}

export default MyProfile;
