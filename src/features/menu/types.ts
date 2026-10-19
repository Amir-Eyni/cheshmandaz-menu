export type MenuItem = {
  id: string;            // stable, never reused (cart is keyed by it)
  name: string;
  price: number;         // integer, toman
  icon?: string;         // emoji fallback
  image?: string;        // e.g. "/images/menu/tea.webp" (optional, added later)
  description?: string;
  category?: string;     // reserved for future tabs
  available?: boolean;   // default true; false = shown as sold out, cannot be added
  badge?: string;        // e.g. "ویژه"
};
