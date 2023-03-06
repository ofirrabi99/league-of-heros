import { create } from "zustand";

interface State {
  isOpen: boolean;
  onClose: () => void;
  fire: (
    { title, description }: { title: string; description: string },
    onApprove: () => void
  ) => void;
  title: string;
  description: string;
  onApprove: () => void;
}

const useAreYouSureDialog = create<State>()((set) => ({
  isOpen: false,
  onClose: () =>
    set(() => ({
      isOpen: false,
      title: "",
      description: "",
      onApprove: () => {},
    })),
  fire: ({ title, description }, onApprove) =>
    set(() => ({ isOpen: true, title, description, onApprove })),
  title: "",
  description: "",
  onApprove: () => {},
}));

export default useAreYouSureDialog;
