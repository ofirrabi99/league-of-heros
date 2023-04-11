import { create } from "zustand";

interface State {
  loadings: number;
  isLoading: () => boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const useGlobalLoading = create<State>()((set, get) => ({
  loadings: 0,
  isLoading: () => get().loadings > 0,
  startLoading: () => set(() => ({ loadings: get().loadings + 1 })),
  stopLoading: () =>
    set(() => ({
      loadings: get().loadings - 1,
    })),
}));

export default useGlobalLoading;
