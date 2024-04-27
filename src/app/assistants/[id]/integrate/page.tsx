'use client';

import Markdown from 'marked-react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import React, { useContext, useEffect } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import ChatAgentContextWrapper from '@/app/assistants/[id]/chat/ChatAgentContextWrapper';
import { Table } from 'flowbite-react';
import AvatarCropUpload from '@/app/assistants/[id]/customize/AvatarCropUpload';
import ChatWindowContextWrapper from '@/app/assistants/[id]/chat/ChatWindowContextWrapper';
import ChatPopupContextWrapper from '@/app/assistants/[id]/chat/ChatPopupContextWrapper';

export default function Customize() {
  const { assistant } = useContext(AssistantContext);

  useEffect(() => {
    hljs.highlightAll();
  });

  return assistant.id ? (
    <div className='max-w-screen flex flex-col gap-4'>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Integrate</h3>
      <div className='max-w-screen items-center justify-center'>
        <p className='self-center pb-2 text-sm font-normal text-gray-500 dark:text-gray-400 lg:text-lg'>
          Please use the below embed code in integrate your assistant to any web
          page
        </p>
        <Table className='max-w-3xl flex-auto'>
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                <div>
                  Floating assistant icon on the bottom right corner of the page
                </div>
                <div className='max-w-screen overflow-hidden text-sm'>
                  <Markdown>{`\`\`\`xml
<iframe 
  src="${window.location.origin}/embed/${assistant.id}"
  style="right: 0;
         position: fixed;
         overflow: hidden;
         height: 100vh;
         border: 0 none;
         width: 480px;
         bottom: -30px;"
  allowFullScreen 
  allowTransparency></iframe>`}</Markdown>
                </div>
              </Table.Cell>
              <Table.Cell className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <div className='bg-white'>
                  <ChatAgentContextWrapper />
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                <div>Fixed chat window</div>
                <div className='max-w-screen overflow-hidden text-sm'>
                  <Markdown>{`\`\`\`xml
<iframe 
  src="${window.location.origin}/embed/${assistant.id}?style=window"
  style="right: 0;
         position: fixed;
         overflow: hidden;
         height: 100vh;
         border: 0 none;
         width: 480px;
         bottom: -30px;"
  allowFullScreen 
  allowTransparency></iframe>`}</Markdown>
                </div>
              </Table.Cell>
              <Table.Cell className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <div className='bg-white'>
                  <ChatWindowContextWrapper />
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                <div>Fixed chat window, without the outer frame</div>
                <div className='max-w-screen overflow-hidden text-sm'>
                  <Markdown>{`\`\`\`xml
<iframe 
  src="${window.location.origin}/embed/${assistant.id}?style=window-frameless"
  style="right: 0;
         position: fixed;
         overflow: hidden;
         height: 100vh;
         border: 0 none;
         width: 480px;
         bottom: -30px;"
  allowFullScreen 
  allowTransparency></iframe>`}</Markdown>
                </div>
              </Table.Cell>
              <Table.Cell className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <div className='bg-white'>
                  <ChatPopupContextWrapper />
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div></div>
    </div>
  ) : (
    <></>
  );
}
