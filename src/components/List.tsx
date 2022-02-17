import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import useList from '../states/useList'
import ListItem from './ListItem'

const List = () => {

  const { lists } = useList((state) => state)

  return (
    <Droppable
      droppableId='lists'
      direction='horizontal'
      type="LIST"
    >
      {(provided) => (
        <div 
          className="mt-10 flex space-x-5"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {lists.map((list, index) => (
            <div 
              className=""
              key={list.id}
            >
              <ListItem
                list={list} 
                index={index}
              />
              
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
      
    </Droppable>
  )

  // return (
  //   <div className="mt-10 flex space-x-5">
  //     {lists.map((list, index) => (
  //       <div
  //         key={list.id} 
  //       >
  //         <Droppable
  //           droppableId={list.id} 
  //           direction='horizontal'
  //         >
  //           {(provided) => (
  //             <div
  //               ref={provided.innerRef} 
  //               {...provided.droppableProps}
  //             >
  //               <ListItem
  //                 list={list}
  //                 index={index}
  //               />
  //               {provided.placeholder}
  //             </div>
  //           )}

  //         </Droppable>
          
  //       </div> 
  //     ))}
  //   </div>
  // )
}

export default List