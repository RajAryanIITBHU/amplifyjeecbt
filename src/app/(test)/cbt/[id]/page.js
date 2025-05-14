
import { auth } from '@/auth';
import TestContainer from '@/components/cbt/TestContainer';
import React from 'react'

export default async function CBTTestPage () {
  const session =await auth()

  console.log(session.user)
  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      <TestContainer user={session.user}/>
    </div>
  );
}


