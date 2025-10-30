import { create } from "zustand";

type Auth = {
  user: string;
  login: (user: string) => void;
  logout: () => void;
};

const useAuth = create<Auth>((set) => ({
  user: "",
  login: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: "" })),
}));

export default useAuth;
