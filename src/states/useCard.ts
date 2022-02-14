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
  createCard: (title: string) => Card,
  findCardById: (id: string) => Card
}>((set, get) => ({
  cards: [],
  createCard: (title: string) => {
    const newCard: Card = {
      id: uuidv4(),
      title,
      todos: [],
      description: ''
    }
    set((state) => ({
      cards: [
        ...state.cards,
        newCard
      ]
    }))
    return newCard
  },
  findCardById: (id: string) => {
    return get().cards.filter((card) => card.id === id)[0]
  }
}))

export default useCard