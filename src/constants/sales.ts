export const CURRENCIES = [
  { key: 'EUR', label: 'EUR (€)' },
  { key: 'USD', label: 'USD ($)' },
  { key: 'GBP', label: 'GBP (£)' },
] as const;

export const SALE_TYPES = [
  { key: 'RETAIL', label: 'Retail' },
  { key: 'CREW', label: 'Crew' },
  { key: 'HAPPY_HOUR', label: 'Happy Hour' },
  { key: 'BUSINESS', label: 'Invitación Business' },
  { key: 'TOURIST', label: 'Invitación Turista' },
] as const;

export const RATES = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
};
