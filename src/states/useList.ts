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
  addCardToList: (listId: string, cardId: string) => void
}>((set, get) => ({
  lists: [],
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
  }
}))

export default useList

const findIndexOfList = (id: string, arrList: List[]) => {
  return arrList.findIndex((list) => list.id === id)
}

const findListById = (id: string, arrList: List[]) => {
  return arrList.filter((list) => list.id === id)[0]
}