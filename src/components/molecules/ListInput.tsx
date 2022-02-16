import React, { useState } from 'react'
import useList from '../../states/useList'

const ListInput = () => {

  const [listInput, seListInput] = useState('')
  const { createList}  = useList((state) => state)

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
          if(listInput){
            createList(listInput)
            seListInput('')
          }
        }}
      >Create Input</button>
    </div>
  )
}

export default ListInput