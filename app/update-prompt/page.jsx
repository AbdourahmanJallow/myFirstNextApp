'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

function EditPrompt() {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            });
        };

        if (promptId) getPromptDetails();
    }, [promptId]);
    // const { data: session } = useSession();
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
            type='Edit'
            post={post}
            setPost={setPost}
            handleSubmit={createPrompt}
            submitting={submitting}
        />
    );
}

export default EditPrompt;
