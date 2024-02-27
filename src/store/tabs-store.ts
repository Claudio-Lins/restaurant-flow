import { create } from "zustand";

interface ModalEventProps {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  productTab: string;
  setProductTab: (productTab: string) => void;
  categoryTab: string;
  setCategoryTab: (categoryTab: string) => void;
  ingredintTab: string;
  setIngredintTab: (ingredintTab: string) => void;
}

export const UseTabsStore = create<ModalEventProps>((set) => ({
  activeTab: "product",
  setActiveTab: (activeTab) => set({ activeTab }),
  productTab: "product",
  setProductTab: (productTab) => set({ productTab }),
  categoryTab: "category",
  setCategoryTab: (categoryTab) => set({ categoryTab }),
  ingredintTab: "ingredients",
  setIngredintTab: (ingredintTab) => set({ ingredintTab }),
}));
