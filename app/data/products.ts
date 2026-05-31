export interface Product {
  id: number
  name: string
  price: number
  category: string
  color: string
  badge?: string
  rating: number
}

export const categories = [
  { id: 'electronics', label: 'Electronics', icon: '⌁', color: '#6366f1' },
  { id: 'fashion', label: 'Fashion', icon: '✦', color: '#f472b6' },
  { id: 'home', label: 'Home & Living', icon: '⌂', color: '#34d399' },
  { id: 'sports', label: 'Sports', icon: '◉', color: '#fbbf24' },
]

export const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Neo Wireless Headphones',
    price: 249,
    category: 'Electronics',
    color: '#6366f1',
    badge: 'Best Seller',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Lumen Smart Watch Pro',
    price: 399,
    category: 'Electronics',
    color: '#22d3ee',
    badge: 'New',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Velvet Studio Sneakers',
    price: 189,
    category: 'Fashion',
    color: '#f472b6',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Aura Ceramic Lamp',
    price: 129,
    category: 'Home & Living',
    color: '#fbbf24',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Pulse Fitness Band',
    price: 79,
    category: 'Sports',
    color: '#34d399',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Orbit Travel Backpack',
    price: 159,
    category: 'Fashion',
    color: '#a78bfa',
    badge: 'Trending',
    rating: 4.8,
  },
]
