import { ChatProps } from '@/app/assistants/[id]/chat/ChatProps';
import { getImageHash } from '@/app/utils/hash';

export default function ChatTyping(props: ChatProps) {
  return (
    <>
      <div className='flex items-end gap-1 justify-self-start'>
        <img
          className='h-8 w-8 rounded-full'
          src={
            '/images/people/avatar/' + getImageHash(props.assistant.id) + '.jpg'
          }
          alt='Assistant'
        />
        <div className='leading-1.5 flex w-full max-w-[320px] flex-col rounded-br-xl rounded-tl-xl rounded-tr-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700'>
          <div className='flex items-center space-x-2 rtl:space-x-reverse'>
            <span className='text-sm font-semibold text-gray-900 dark:text-white'></span>
          </div>
          <p className='pt-2 text-sm font-normal text-gray-900 dark:text-white'>
            <div className='mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600'></div>
            <div className='h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700'></div>
          </p>
        </div>
      </div>
    </>
  );
}