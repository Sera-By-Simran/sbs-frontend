'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TrayItem {
  product: {
    id: string;
    slug: string;
    name: string;
    sku: string;
    price_paise: number;
    compare_at_paise?: number | null;
    image_url?: string | null;
    badge?: string;
  };
  quantity: number;
  note?: string;
}

interface TrayContextType {
  trayItems: TrayItem[];
  wishlist: string[];
  isTrayOpen: boolean;
  openTray: () => void;
  closeTray: () => void;
  addToTray: (product: TrayItem['product'], quantity?: number) => void;
  removeFromTray: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearTray: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  totalTrayCount: number;
  totalTrayPaise: number;
}

const TrayContext = createContext<TrayContextType>({
  trayItems: [],
  wishlist: [],
  isTrayOpen: false,
  openTray: () => {},
  closeTray: () => {},
  addToTray: () => {},
  removeFromTray: () => {},
  updateQuantity: () => {},
  clearTray: () => {},
  toggleWishlist: () => {},
  isWishlisted: () => false,
  totalTrayCount: 0,
  totalTrayPaise: 0,
});

export const TrayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedTray = localStorage.getItem('sera_enquiry_tray');
      if (storedTray) {
        setTrayItems(JSON.parse(storedTray));
      }
      const storedWish = localStorage.getItem('sera_wishlist');
      if (storedWish) {
        setWishlist(JSON.parse(storedWish));
      }
    } catch (e) {
      console.warn('Failed loading persisted tray state:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('sera_enquiry_tray', JSON.stringify(trayItems));
    } catch (e) {
      console.warn('Failed saving tray state:', e);
    }
  }, [trayItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('sera_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed saving wishlist state:', e);
    }
  }, [wishlist, isHydrated]);

  const openTray = () => setIsTrayOpen(true);
  const closeTray = () => setIsTrayOpen(false);

  const addToTray = (product: TrayItem['product'], quantity = 1) => {
    setTrayItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity }];
    });
    setIsTrayOpen(true);
  };

  const removeFromTray = (productId: string) => {
    setTrayItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromTray(productId);
      return;
    }
    setTrayItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearTray = () => setTrayItems([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const totalTrayCount = trayItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalTrayPaise = trayItems.reduce(
    (acc, curr) => acc + curr.product.price_paise * curr.quantity,
    0
  );

  return (
    <TrayContext.Provider
      value={{
        trayItems,
        wishlist,
        isTrayOpen,
        openTray,
        closeTray,
        addToTray,
        removeFromTray,
        updateQuantity,
        clearTray,
        toggleWishlist,
        isWishlisted,
        totalTrayCount,
        totalTrayPaise,
      }}
    >
      {children}
    </TrayContext.Provider>
  );
};

export const useTray = () => useContext(TrayContext);
