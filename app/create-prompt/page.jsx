'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Form from '@components/Form';

function CreatePrompt() {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const { data: session } = useSession();
    const router = useRouter();
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log('Prompt error: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            handleSubmit={createPrompt}
            submitting={submitting}
        />
    );
}

export default CreatePrompt;
