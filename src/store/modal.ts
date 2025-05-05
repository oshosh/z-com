import { Post } from '@/model/Post';
import { create } from 'zustand';

interface ModalState {
  mode: 'new' | 'comment';
  data: Post | null;
  setMode: (mode: 'new' | 'comment') => void;
  setData: (data: Post | null) => void;
  reset: () => void;
}
export const useModalStore = create<ModalState>((set) => ({
  mode: 'new',
  data: null,
  setMode: (mode: 'new' | 'comment') => set({ mode }),
  setData: (data: Post | null) => set({ data }),
  reset: () => set({ mode: 'new', data: null }),
}));
