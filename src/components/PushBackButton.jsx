"use client"
import React from 'react'
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PushBackButton = () => {
    const router = useRouter()

  return (
    <Button variant={"outline"}
    onClick={()=>router.back()}
      href={"/results"}
      size={"sm"}
      className=" text-center flex justify-between items-center rounded border"
    >
      <ArrowLeft className="mx-auto size-5" />
    </Button>
  );
}

export default PushBackButton
