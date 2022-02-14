import create from "zustand/react";
import { v4 as uuidv4 } from 'uuid'

export interface List {
  id: string
  title: string
  cards: []
}

const useList = create<{
  lists: List[]
}>((set, get) => ({
  lists: [],
  createList: (title: string) => {
    set((state)=>({
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
  }
}))

export default useList