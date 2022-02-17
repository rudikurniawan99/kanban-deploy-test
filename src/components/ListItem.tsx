import React, { useRef } from 'react'
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd'
import useList, { List } from '../states/useList'
import Card from './Card'
import CardInput from './molecules/CardInput'

const ListItem = ({ list, index }: { list: List, index: number }) => {

  const reff = useRef<HTMLDivElement>(null)
  const { moveCard }  = useList((state) => state)

  interface DragItem {
    id: string
    index: number
  }

  const [{ canDrop } , drop] = useDrop(({
    accept: 'List',
    drop: (item: DragItem) => {
      moveCard(item.index, index) 
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop()
    })
  }))

  const [{ isDragging } ,drag] = useDrag(({
    type: 'List',
    item: {
      id: list.id,
      index
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    })
  }))

  drag(drop(reff))

  return (
    <div>
      <div 
        className={`w-64 p-3  rounded-sm text-gray-800 ${isDragging ? 'bg-gray-300': 'bg-gray-100'}`}
        ref={reff}
      >
        <div className="">
          <h5
            className="font-medium mb-3"
          >{list.title}</h5>
        </div>
        {list.cards.map((card) => (
          <Card 
            key={card.cardId}
            cardId={card.cardId} 
            listId={list.id}
          />
        ))}
        <CardInput
          listId={list.id} 
        />
      </div>
    </div>
  )
}

export default ListItem