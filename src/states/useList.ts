import create from "zustand";
import { v4 as uuidv4 } from 'uuid'

export interface List {
  id: string
  title: string
  cards: { cardId: string }[]
}

const useList = create<{
  lists: List[],
  createList: (title: string) => void,
  addCardToList: (listId: string, cardId: string) => void,
  removeCardFromList: (listId: string, cardId: string) => void,
  moveCard: (sourceIndex: number, destinationIndex: number) => void
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
  moveCard: (sourceIndex: number, destinationIndex: number) => {
    let lists = get().lists
    const list = lists.splice(sourceIndex, 1)[0]
    lists.splice(destinationIndex, 0, list)
    set((state) => ({
      ...state
    }))
  }
}))

export default useList

const findIndexOfList = (id: string, arrList: List[]) => {
  return arrList.findIndex((list) => list.id === id)
}

const findListById = (id: string, arrList: List[]) => {
  return arrList.filter((list) => list.id === id)[0]
}