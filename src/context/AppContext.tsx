"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, Vehicle, mockVehicles } from "@/data/mockData";

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  vehicles: Vehicle[];
  favorites: string[];
  toggleFavorite: (vehicleId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

interface FilterState {
  type: "all" | "vente" | "location";
  category: string[];
  priceMin: number;
  priceMax: number;
  location: string;
}

const defaultFilters: FilterState = {
  type: "all",
  category: [],
  priceMin: 0,
  priceMax: 100000000,
  location: "",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const toggleFavorite = (vehicleId: string) => {
    setFavorites((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        vehicles,
        favorites,
        toggleFavorite,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
