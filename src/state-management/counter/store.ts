import { create } from "zustand";

type Counter = {
  counter: number;
  increment: () => void;
  reset: () => void;
};

const useCounter = create<Counter>((set) => ({
  counter: 0,
  increment: () => set((store) => ({ counter: store.counter + 1 })),
  reset: () => set(() => ({ counter: 0 })),
}));

export default useCounter;
