import { create } from "zustand";

interface State {
  isOpen: boolean;
  onClose: () => void;
  fire: () => void;
}

const useUnexpectedErrorDialog = create<State>()((set) => ({
  isOpen: false,
  onClose: () =>
    set(() => ({
      isOpen: false,
      title: "",
      description: "",
      onApprove: () => {},
    })),
  fire: () => set(() => ({ isOpen: true })),
}));

export default useUnexpectedErrorDialog;
