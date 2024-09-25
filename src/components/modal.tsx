import React from 'react'
import { createPortal } from 'react-dom'

function Modal({ onClose, children }) {
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {children}
        <button
          className="mt-4 text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  )
}

export default Modal
