'use client';

import { Button, Modal, Table } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { deleteAssistant } from '@/app/assistants/[id]/client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import EditAssistant from '@/app/assistants/[id]/settings/EditAssistant';
import AssistantContext from '@/app/assistants/[id]/AssistantContext';

export default function Settings() {
  const [openModal, setOpenModal] = useState(false);
  const { assistant } = useContext(AssistantContext);

  const { push } = useRouter();

  const handleAssistantDelete = async () => {
    if (assistant && assistant.id) {
      let [status, response] = await deleteAssistant(assistant.id);
      if (status === 200) {
        toast.success(
          'Assistant ' + assistant.name + ' deleted successfully.',
          {
            duration: 4000,
          }
        );
        setOpenModal(false);
        push('/assistants');
      } else {
        toast.error('Assistant ' + assistant.name + ' could not be deleted.', {
          duration: 4000,
        });
      }
    }
  };

  return (
    <div className='stack items-center justify-center'>
      <h3 className='pb-4 text-3xl font-bold dark:text-white'>Settings</h3>
      <p className={'pb-4 text-sm text-gray-400'}>
        Adjust the original configuration of your assistant here
      </p>
      <div>
        <Table className='flex-auto self-center'>
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <EditAssistant assistant={assistant} />
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <td className='flex max-w-3xl flex-col gap-4'>
                <h1 className='p-2 pl-5 text-2xl font-bold'>Danger Zone</h1>
              </td>
            </Table.Row>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell className='flex flex-row p-5 font-medium text-gray-900 dark:text-white'>
                <div>
                  <h2 className='p2 text-lg text-gray-800'>
                    Delete this assistant
                  </h2>
                  <h3 className='p2 text-gray-400'>
                    Once you delete this assistant, there is no going back.
                    Please be certain.
                  </h3>
                </div>
                <Button
                  className='ml-auto'
                  outline
                  gradientDuoTone='pinkToOrange'
                  onClick={() => setOpenModal(true)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <Modal
        show={openModal}
        size='md'
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this assistant{' '}
              <a className='font-bold'>{assistant.name}</a>?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleAssistantDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color='gray' onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
