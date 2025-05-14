import { auth } from '@/auth'
import SettingsLayout from '@/components/SettingLayout';
import { supabaseAdmin } from '@/superbase/superbaseConfig';
import { SessionProvider } from 'next-auth/react';
import React from 'react'

 export default async function SettingsPage() {
  const session = await auth()

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("name, phone, dob")
    .eq("id", session.user.id)
    .single();

    if(error){
      return (
        <div className="">Error while Loading Data ... </div>
      )
    }

    console.log(data)

  return (
    <SessionProvider>

    <div className='min-h-[calc(100vh-4rem)]'>
      <SettingsLayout data={data}/>
    </div>
    </SessionProvider>
  )
}


