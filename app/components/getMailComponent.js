"use client";

import React, { useEffect, useState } from 'react';
import Loading from '../loading';
import { useSession } from 'next-auth/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import dompurify from 'dompurify';

function GetMailComponent() {
  const { data: session} = useSession();
  const [mail, setMail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedMail, setSelectedMail] = useState(null);
  const [maxNumberOfMails, setMaxNumberOfMails] = useState(5)

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const googleAccessToken = localStorage.getItem("accessToken");

      const res = await fetch(`https://gmailloader.onrender.com/mail/${maxNumberOfMails}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${googleAccessToken}`,
          'OpenAI-API-Key': openAiKey,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }

      const mails = await res.json();
      setMail(mails);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const classifyData = async () => {
    try {
      setLoading(true);
      setError(null);

      const openAiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      const googleAccessToken = localStorage.getItem("accessToken");

      const res = await fetch('https://gmailloader.onrender.com/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${googleAccessToken}`,
          'OpenAI-API-Key': openAiKey,
        },
        body: JSON.stringify(mail),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }
      const mails = await res.json();
      setMail(mails);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem("accessToken", session.accessToken);
      fetchData();
    }
  }, [session]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className='flex justify-center items-center'>
        <p className='max-w-lg'>Error:{error}</p>
      </div>
    )
  }

  const sanitizeContent = (content) => {
    return dompurify.sanitize(content, { USE_PROFILES: { html: true } });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <div className="mx-auto w-[70%] flex justify-between">
        <div className='flex gap-2'>
          <Input 
            value={maxNumberOfMails}
            onChange={(e)=>{
              e.preventDefault()
              setMaxNumberOfMails(e.target.value)
            } }
            label="Number of mail"
            size='sm'
            radius='sm'
          />
          <Button 
          disabled={maxNumberOfMails < 0 }
          onClick={fetchData}
          className='text-white text-center bg-gray-900 text-sm px-5 py-2.5 inline-flex items-center me-2 mb-2 w-full h-full'
          size='sm'> Refresh</Button>
        </div>
        <p className=" font-light text-xl text-gray-900 hover:cursor-pointer hover:underline" onClick={classifyData}>Classify</p>
      </div>
      <div className="mx-auto max-w-[75%] lg:max-w-[60%]  space-y-4">
        {mail.length > 0 ? (
          mail.map((m) => (
            <div
              key={m.id}
              className="w-full max-h-fit p-4 border border-gray-800 rounded-md cursor-pointer shadow-sm"
              onClick={() => { setSelectedMail(m); onOpen(); }}
            >
              <div className="flex justify-between">
                <p className="font-bold text-gray-900 text-lg mb-1">{m.subject}</p>
                {m.class && (<p className={`${m.class === "important" ? "text-green-500" : m.class === "social" ? "text-blue-500" : "text-red-500"}`}>{m.class}</p>)}
              </div>
              {m.snippet && <p className="font-light text-left ">{m.snippet}</p>}
            </div>
          ))
        ) : (
          <div>No emails found</div>
        )}
      </div>
      {selectedMail && (
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          size="2xl"
          onOpenChange={onOpenChange}
          radius="lg"
          classNames={{
            body: "py-6",
            backdrop: "bg-[#111827]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[#9CA3AF] dark:bg-[#9CA3AF] text-gray-900",
            header: "border-b-[1px] border-[#292f46]",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <div>
                <ModalHeader className="flex flex-col gap-1">{selectedMail.subject}</ModalHeader>
                <ModalBody>
                  <p className='break-words'>{sanitizeContent(selectedMail.body).slice(0, 1000)}...</p>
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-gray-900 text-white" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default GetMailComponent;
