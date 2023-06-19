import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

function CloseModal({closeModal}) {
  return (
    <button
        type="button"
        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
        <XMarkIcon onClick={closeModal} className="w-6 h-6"></XMarkIcon>
        <span className="sr-only">Close modal</span>
    </button>
  )
}

export default CloseModal