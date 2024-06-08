'use client';

import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatMessage from '@/app/assistants/[id]/chat/ChatMessage';
import { Button, TextInput, Tooltip } from 'flowbite-react';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Message } from '@/app/types/message';
import ChatTyping from '@/app/assistants/[id]/chat/ChatTyping';
import ChatMessageStreaming from '@/app/assistants/[id]/chat/ChatMessageStreaming';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import {
  getInputMessageLabel,
  getPrimaryColor,
  getSecondaryColor,
} from '@/app/utils/assistant';
import { useChatContext } from '@/app/assistants/[id]/chat/useChatContext';
import { HiOutlinePencilAlt } from 'react-icons/hi';

export interface ChatPopupProps extends ChatProps {
  hide: boolean;
  setHide: ((minimize: boolean) => void) | null;
}

export default function ChatPopup(props: ChatPopupProps) {
  const { assistant } = useContext(AssistantContext);

  const bottomRef = useRef(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const {
    typedMessage,
    setTypedMessage,
    messageStatus,
    setMessageStatus,
    streamText,
    setStreamText,
    messages,
    setMessages,
    sendMessage,
    createNewThread,
  } = useChatContext();

  useEffect(() => {
    if (messagesRef?.current && 'scrollIntoView' in messagesRef.current) {
      messagesRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // @ts-ignore
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [streamText]);

  return (
    <div className='items-center justify-center self-center'>
      <div className={'flex flex-col space-y-4 p-2'}>
        <div
          className={
            'relative z-10 max-w-md items-center justify-center self-center'
          }
        >
          <div
            className='rounded border-0 border-t-4 text-sm shadow-md'
            style={{
              borderColor: getSecondaryColor(assistant),
            }}
          >
            <div className='flex max-w-sm flex-col rounded-b rounded-t-none border border-t-0'>
              <div
                className={
                  'max-h-[calc(100vh-50vh)] min-h-[calc(100vh-50vh)] max-w-md overflow-y-auto bg-white'
                }
              >
                <div
                  className='flex max-w-md flex-col gap-3 self-center overflow-y-auto px-4 py-4'
                  ref={messagesRef}
                >
                  {messages.map((message: Message, index) => {
                    return <ChatMessage key={index} message={message} />;
                  })}
                  {streamText ? (
                    <>
                      <ChatMessageStreaming
                        message={streamText}
                      ></ChatMessageStreaming>
                      <div ref={bottomRef} />
                    </>
                  ) : (
                    <></>
                  )}
                  {messageStatus === 'in_progress' && !streamText ? (
                    <ChatTyping />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className='z-101 rounded border-0 border-t-4 shadow-md'
            style={{
              borderColor: getSecondaryColor(assistant),
            }}
          >
            {messageStatus === 'in_progress' ? (
              <span className='text-xs font-normal text-gray-500 dark:text-white'>
                {assistant.name} is typing...
              </span>
            ) : (
              <></>
            )}
            <div className='flex items-center justify-center rounded-lg bg-gray-50 px-2 py-2 dark:bg-gray-700'>
              <Tooltip content='New Conversation'>
                <Button
                  as='span'
                  className='inline-flex cursor-pointer justify-center border-transparent bg-transparent'
                  style={{
                    color: getPrimaryColor(assistant),
                  }}
                  onClick={createNewThread}
                >
                  <HiOutlinePencilAlt size='22' />
                </Button>
              </Tooltip>
              <TextInput
                className='block w-full rounded-lg border bg-white text-sm text-gray-900 dark:text-white dark:placeholder-gray-400'
                placeholder={getInputMessageLabel(assistant)}
                readOnly={false}
                disabled={messageStatus === 'in_progress'}
                value={typedMessage}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    sendMessage();
                  }
                  e.stopPropagation();
                }}
                onChange={(event) => {
                  setTypedMessage(event.target.value);
                }}
              ></TextInput>
              {/* // @ts-ignore */}
              <Tooltip content='Send Message'>
                <Button
                  as='span'
                  className='inline-flex cursor-pointer justify-center border-transparent bg-transparent'
                  style={{
                    color: getPrimaryColor(assistant),
                  }}
                  onClick={sendMessage}
                >
                  <svg
                    className='h-5 w-5 rotate-90 rtl:-rotate-90'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 18 20'
                  >
                    <path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
                  </svg>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
