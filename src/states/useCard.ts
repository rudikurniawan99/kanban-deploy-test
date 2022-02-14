import create from "zustand";
import { v4 as uuidv4 } from 'uuid'

export interface Card {
  id: string
  title: string
  todos?: []
  description?: string
}

const useCard = create<{
  cards: Card[],
  createCard: (title: string) => void
}>((set, get) => ({
  cards: [],
  createCard: (title: string) => {
    set((state) => ({
      cards: [
        ...state.cards,
        {
          id: uuidv4(),
          title,
          todos: [],
          description: ''
        }
      ]
    }))
  }
}))

export default useCard