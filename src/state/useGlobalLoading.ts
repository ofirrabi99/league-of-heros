import { create } from "zustand";

interface State {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const useGlobalLoading = create<State>()((set) => ({
  isLoading: false,
  startLoading: () => set(() => ({ isLoading: true })),
  stopLoading: () => set(() => ({ isLoading: false })),
}));

export default useGlobalLoading;
