'use client';

import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import ChatHeader from '@/app/assistants/[id]/chat/ChatHeader';
import React, { useContext } from 'react';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';
import {
  getPrimaryColor,
} from '@/app/utils/assistant';
import ChatPopup from '@/app/assistants/[id]/chat/ChatPopup';

export interface ChatPopupFrameProps extends ChatProps {
  hide: boolean;
  setHide: ((minimize: boolean) => void) | null;
}

export default function ChatPopupFrame(props: ChatPopupFrameProps) {
  const { assistant } = useContext(AssistantContext);

  return (
    <>
      <div
        className={
          'relative m-2 flex max-h-full max-w-md flex-auto rounded-lg border-2 bg-white border-[' + getPrimaryColor(assistant) + ']'
        }
      >
        <div
          className={'absolute h-48 w-full rounded-t-lg'}
          style={{
            backgroundColor: getPrimaryColor(assistant),
          }}
        ></div>
        <div
          className={
            'flex min-w-[calc(100vw-5rem)] flex-col space-y-4 p-2 md:min-w-max bg-white'
          }
        >
          <ChatHeader
            minimize={props.hide}
            setMinimize={props.setHide}
            close={() => {
              // TODO: remove this
            }}
          />
          <ChatPopup hide={props.hide} setHide={props.setHide} />
        </div>
      </div>
    </>
  );
}
