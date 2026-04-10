export interface GroceryItem {
  name: string;
  unit: string;
  dmart: number;
  blinkit: number;
  zepto: number;
  local: number;
  best: string;
}

export const sampleGroceryItems: GroceryItem[] = [
  { name: "Basmati Rice (5kg)", unit: "5 kg", dmart: 385, blinkit: 420, zepto: 415, local: 375, best: "Local Shop" },
  { name: "Aashirvaad Atta (10kg)", unit: "10 kg", dmart: 445, blinkit: 475, zepto: 469, local: 460, best: "DMart" },
  { name: "Fortune Sunflower Oil (5L)", unit: "5 L", dmart: 710, blinkit: 745, zepto: 735, local: 725, best: "DMart" },
  { name: "Amul Taaza Milk (1L)", unit: "1 L", dmart: 58, blinkit: 62, zepto: 60, local: 56, best: "Local Shop" },
  { name: "Toor Dal (1kg)", unit: "1 kg", dmart: 165, blinkit: 180, zepto: 175, local: 170, best: "DMart" },
  { name: "Sugar (5kg)", unit: "5 kg", dmart: 225, blinkit: 240, zepto: 235, local: 220, best: "Local Shop" },
  { name: "Surf Excel (2kg)", unit: "2 kg", dmart: 385, blinkit: 410, zepto: 399, local: 395, best: "DMart" },
  { name: "Parle-G Biscuits (800g)", unit: "800 g", dmart: 80, blinkit: 85, zepto: 82, local: 78, best: "Local Shop" },
];

export const platformFees = {
  dmart: { delivery: 0, platform: 0, handling: 0 },
  blinkit: { delivery: 25, platform: 5, handling: 9 },
  zepto: { delivery: 15, platform: 3, handling: 7 },
  local: { delivery: 0, platform: 0, handling: 0 },
};

export const defaultGroceryList = [
  "Rice 5kg",
  "Atta 10kg",
  "Oil 5L",
  "Milk 1L",
  "Dal 1kg",
  "Sugar 5kg",
];

export const faqs = [
  {
    q: "Does this include delivery and platform charges?",
    a: "Yes! BasketSaver shows you the final payable amount including delivery charges, platform fees, handling fees, and applicable taxes. No hidden costs."
  },
  {
    q: "Can local kirana stores be compared?",
    a: "Absolutely. Local stores can join our platform and update prices via a simple dashboard or WhatsApp. We include them in every comparison."
  },
  {
    q: "Is GST included in the final total?",
    a: "Yes. All prices shown are inclusive of GST and other applicable taxes so you see exactly what you'll pay."
  },
  {
    q: "Can I compare a full monthly grocery list?",
    a: "Yes! You can enter your entire monthly list and we'll optimize the whole basket — telling you which items to buy where for maximum savings."
  },
  {
    q: "Is the service free for users?",
    a: "Yes, BasketSaver is completely free for consumers. We earn through merchant partnerships and platform affiliations."
  },
];
