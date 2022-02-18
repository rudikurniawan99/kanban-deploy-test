import create from "zustand";
import { v4 as uuidv4 } from 'uuid'

export interface List {
  id: string
  title: string
  cards: { cardId: string }[]
}

interface DraggableProps{
  droppableId: string
  index: number
}

const useList = create<{
  lists: List[],
  createList: (title: string) => void,
  addCardToList: (listId: string, cardId: string) => void,
  removeCardFromList: (listId: string, cardId: string) => void,
  moveListPosition: (sourceIndex: number, destinationIndex: number) => void,
  moveCardPosition: (source: DraggableProps, destination: DraggableProps ) => void
}>((set, get) => ({
  lists: [
    {
      id: '1',
      title: 'List 1',
      cards: []
    },
    {
      id: '2',
      title: 'List 2',
      cards: []
    },
    {
      id: '3',
      title: 'List 3',
      cards: []
    }
  ],
  createList: (title: string) => {
    set(state => ({
      ...state,
      lists: [
        ...state.lists,
        {
          id: uuidv4(),
          title,
          cards: []
        }
      ]
    }))
  },
  addCardToList: (listId: string, cardId: string) => {
    const listIndex = findIndexOfList(listId, get().lists)
    const list = findListById(listId, get().lists)
    let lists = get().lists
    const newList = {
      id: list.id,
        title: list.title,
        cards: [
          ...list.cards,
          {
            cardId
          }
        ]
    }
    
    lists.splice(listIndex, 1, newList)
    set((state) => ({
      ...state
    }))
  },
  removeCardFromList: (listId: string, cardId: string) => {
    const listIndex = findIndexOfList(listId, get().lists)
    let list = findListById(listId, get().lists)
    let cards = get().lists[listIndex].cards.filter((card) => card.cardId !== cardId)
    const lists = get().lists

    const newList: List = {
      id: list.id,
      title: list.title,
      cards
    }

    lists.splice(listIndex, 1, newList) 
    set((state) => ({
      ...state
    }))
  },
  moveListPosition: (sourceIndex: number, destinationIndex: number) => {
    let lists = get().lists
    movePosition(sourceIndex, destinationIndex, lists)

    set((state) => ({
      ...state
    }))
  },
  moveCardPosition: (source: DraggableProps, destination: DraggableProps ) => {
    if(source.droppableId === destination.droppableId && source.index !== destination.index){
      let cards = findListById(source.droppableId, get().lists).cards
      movePosition(source.index, destination.index, cards)
    }else if(source.droppableId !== destination.droppableId){
      let lists = get().lists

      const sourceCards = findListById(source.droppableId, lists).cards
      const destinationCards = findListById(destination.droppableId, lists).cards
      const card = sourceCards.splice(source.index, 1)[0]
      destinationCards.splice(destination.index, 0, card)
    }
  }
}))

export default useList

const findIndexOfList = (id: string, arrList: List[]) => {
  return arrList.findIndex((list) => list.id === id)
}

const findListById = (id: string, arrList: List[]) => {
  return arrList.filter((list) => list.id === id)[0]
}

const movePosition = <T>(sourceIdx: number, destIdx: number, arr: T[]) => {
  const item = arr.splice(sourceIdx, 1)[0]
  arr.splice(destIdx, 0, item)
}