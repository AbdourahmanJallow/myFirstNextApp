'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

function Nav() {
    return (
        <nav className='flex-between pt-3 mb-16 w-full'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src='/assets/images/logo.svg'
                    alt='Promptopia logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>
        </nav>
    );
}

export default Nav;
