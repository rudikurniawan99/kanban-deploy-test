import React, { useState } from 'react'

const ListInput = () => {

  const [listInput, seListInput] = useState('')

  return (
    <div>
      <input 
        className="px-2 py-1.5 focus:outline-none bg-gray-300 text-gray-700"
        type="text" 
        value={listInput || ''}
        placeholder="input list title" 
        onChange={(e) => {
          seListInput(e.target.value)
        }}
      />
      <button
        className="px-3 py-1.5 ml-5 bg-blue-500 text-white" 
        onClick={() => {
          seListInput('')
        }}
      >Create Input</button>
    </div>
  )
}

export default ListInput