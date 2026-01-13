// Mock data for vehicles
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carCompact from "@/assets/car-compact.jpg";
import carPickup from "@/assets/car-pickup.jpg";

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  pricePerDay?: number;
  type: "vente" | "location" | "both";
  category: "sedan" | "suv" | "compact" | "pickup" | "luxe";
  image: string;
  images: string[];
  km: number;
  fuel: "essence" | "diesel" | "hybride" | "electrique";
  transmission: "manuelle" | "automatique";
  location: string;
  agency: Agency;
  features: string[];
  description: string;
  views: number;
  interests: number;
  available: boolean;
  createdAt: string;
}

export interface Agency {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  verified: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: "client" | "agency" | "admin";
  avatar?: string;
  favorites: string[];
  reservations: Reservation[];
}

export interface Reservation {
  id: string;
  vehicleId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalPrice: number;
  paymentMethod: "orange_money" | "airtel_money" | "card";
}

// Mock agencies
export const mockAgencies: Agency[] = [
  {
    id: "1",
    name: "Libreville Auto",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=LA",
    rating: 4.8,
    reviews: 156,
    location: "Libreville, Estuaire",
    phone: "+241 77 00 00 00",
    verified: true,
  },
  {
    id: "2",
    name: "Gabon Motors",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=GM",
    rating: 4.5,
    reviews: 89,
    location: "Port-Gentil, Ogooué-Maritime",
    phone: "+241 66 00 00 00",
    verified: true,
  },
  {
    id: "3",
    name: "AutoPro Gabon",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=AP",
    rating: 4.2,
    reviews: 45,
    location: "Franceville, Haut-Ogooué",
    phone: "+241 74 00 00 00",
    verified: false,
  },
];

// Mock vehicles
export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    title: "Toyota Land Cruiser 2023",
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2023,
    price: 45000000,
    pricePerDay: 150000,
    type: "both",
    category: "suv",
    image: carSuv,
    images: [carSuv, carSuv, carSuv],
    km: 15000,
    fuel: "diesel",
    transmission: "automatique",
    location: "Libreville",
    agency: mockAgencies[0],
    features: ["Climatisation", "GPS", "Cuir", "Caméra de recul", "4x4"],
    description: "Véhicule tout-terrain parfait pour les routes gabonaises. Excellent état, entretien régulier chez le concessionnaire.",
    views: 245,
    interests: 18,
    available: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Hyundai Accent 2022",
    brand: "Hyundai",
    model: "Accent",
    year: 2022,
    price: 12000000,
    pricePerDay: 45000,
    type: "location",
    category: "sedan",
    image: carSedan,
    images: [carSedan, carSedan],
    km: 35000,
    fuel: "essence",
    transmission: "automatique",
    location: "Libreville",
    agency: mockAgencies[0],
    features: ["Climatisation", "Bluetooth", "Régulateur de vitesse"],
    description: "Berline économique idéale pour la ville. Faible consommation de carburant.",
    views: 189,
    interests: 12,
    available: true,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Smart Fortwo 2021",
    brand: "Smart",
    model: "Fortwo",
    year: 2021,
    price: 8500000,
    type: "vente",
    category: "compact",
    image: carCompact,
    images: [carCompact],
    km: 28000,
    fuel: "essence",
    transmission: "automatique",
    location: "Port-Gentil",
    agency: mockAgencies[1],
    features: ["Climatisation", "Bluetooth", "Parking facile"],
    description: "Citadine parfaite pour se faufiler dans le trafic de Libreville. Économique et pratique.",
    views: 78,
    interests: 5,
    available: true,
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    title: "Chevrolet Colorado 2023",
    brand: "Chevrolet",
    model: "Colorado",
    year: 2023,
    price: 35000000,
    pricePerDay: 120000,
    type: "both",
    category: "pickup",
    image: carPickup,
    images: [carPickup, carPickup],
    km: 8000,
    fuel: "diesel",
    transmission: "automatique",
    location: "Franceville",
    agency: mockAgencies[2],
    features: ["4x4", "Climatisation", "Benne", "Bluetooth"],
    description: "Pick-up robuste pour tous vos besoins professionnels et personnels. Idéal pour les zones rurales.",
    views: 156,
    interests: 9,
    available: true,
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    title: "Toyota Corolla 2023",
    brand: "Toyota",
    model: "Corolla",
    year: 2023,
    price: 18000000,
    pricePerDay: 65000,
    type: "both",
    category: "sedan",
    image: carSedan,
    images: [carSedan],
    km: 12000,
    fuel: "hybride",
    transmission: "automatique",
    location: "Libreville",
    agency: mockAgencies[0],
    features: ["Hybride", "Climatisation", "GPS", "Caméra de recul"],
    description: "Berline hybride économique et écologique. Parfaite pour les longs trajets.",
    views: 312,
    interests: 24,
    available: true,
    createdAt: "2024-02-15",
  },
];

// Format price in XAF
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Format number with spaces
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("fr-FR").format(num);
};
