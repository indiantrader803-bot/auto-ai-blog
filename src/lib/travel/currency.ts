export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateAgainstUSD: number; // 1 USD = rate units
  decimals: number;
  formatPrefix: boolean;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyInfo> = {
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    flag: '🇮🇳',
    rateAgainstUSD: 86.50,
    decimals: 0,
    formatPrefix: true,
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    rateAgainstUSD: 1.0,
    decimals: 0,
    formatPrefix: true,
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    rateAgainstUSD: 0.92,
    decimals: 0,
    formatPrefix: true,
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    rateAgainstUSD: 0.79,
    decimals: 0,
    formatPrefix: true,
  },
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'AED ',
    flag: '🇦🇪',
    rateAgainstUSD: 3.67,
    decimals: 0,
    formatPrefix: true,
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    flag: '🇯🇵',
    rateAgainstUSD: 152.0,
    decimals: 0,
    formatPrefix: true,
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    flag: '🇦🇺',
    rateAgainstUSD: 1.55,
    decimals: 0,
    formatPrefix: true,
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    flag: '🇨🇦',
    rateAgainstUSD: 1.40,
    decimals: 0,
    formatPrefix: true,
  },
  SGD: {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    flag: '🇸🇬',
    rateAgainstUSD: 1.35,
    decimals: 0,
    formatPrefix: true,
  },
  THB: {
    code: 'THB',
    name: 'Thai Baht',
    symbol: '฿',
    flag: '🇹🇭',
    rateAgainstUSD: 35.0,
    decimals: 0,
    formatPrefix: true,
  },
  CHF: {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF ',
    flag: '🇨🇭',
    rateAgainstUSD: 0.90,
    decimals: 0,
    formatPrefix: true,
  },
  MYR: {
    code: 'MYR',
    name: 'Malaysian Ringgit',
    symbol: 'RM ',
    flag: '🇲🇾',
    rateAgainstUSD: 4.45,
    decimals: 0,
    formatPrefix: true,
  },
  IDR: {
    code: 'IDR',
    name: 'Indonesian Rupiah',
    symbol: 'Rp ',
    flag: '🇮🇩',
    rateAgainstUSD: 16000.0,
    decimals: 0,
    formatPrefix: true,
  },
  SAR: {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'SAR ',
    flag: '🇸🇦',
    rateAgainstUSD: 3.75,
    decimals: 0,
    formatPrefix: true,
  }
};

export const CURRENCY_LIST = Object.values(SUPPORTED_CURRENCIES);

/**
 * Intelligent country & timezone detector to select the default currency
 */
export function detectUserCurrency(): string {
  if (typeof window === 'undefined') return 'USD';

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = (navigator.language || navigator.languages?.[0] || '').toLowerCase();

    // India & South Asia
    if (
      tz.includes('Calcutta') ||
      tz.includes('Kolkata') ||
      tz.includes('Colombo') ||
      lang.includes('hi') ||
      lang.includes('en-in')
    ) {
      return 'INR';
    }

    // United Kingdom
    if (tz.includes('London') || lang.includes('en-gb')) {
      return 'GBP';
    }

    // Eurozone
    if (
      tz.includes('Paris') ||
      tz.includes('Berlin') ||
      tz.includes('Rome') ||
      tz.includes('Madrid') ||
      tz.includes('Amsterdam') ||
      tz.includes('Brussels') ||
      tz.includes('Vienna') ||
      tz.includes('Athens') ||
      tz.includes('Lisbon') ||
      tz.includes('Helsinki') ||
      tz.includes('Dublin') ||
      lang.includes('fr') ||
      lang.includes('de') ||
      lang.includes('es') ||
      lang.includes('it')
    ) {
      return 'EUR';
    }

    // UAE & Gulf
    if (tz.includes('Dubai') || tz.includes('Muscat') || tz.includes('Abu_Dhabi')) {
      return 'AED';
    }

    // Saudi Arabia
    if (tz.includes('Riyadh')) {
      return 'SAR';
    }

    // Japan
    if (tz.includes('Tokyo') || lang.includes('ja')) {
      return 'JPY';
    }

    // Australia
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane') || tz.includes('Perth') || lang.includes('en-au')) {
      return 'AUD';
    }

    // Canada
    if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal') || lang.includes('en-ca')) {
      return 'CAD';
    }

    // Singapore
    if (tz.includes('Singapore')) {
      return 'SGD';
    }

    // Thailand
    if (tz.includes('Bangkok') || lang.includes('th')) {
      return 'THB';
    }

    // Switzerland
    if (tz.includes('Zurich') || tz.includes('Geneva')) {
      return 'CHF';
    }

    // Malaysia
    if (tz.includes('Kuala_Lumpur') || lang.includes('ms')) {
      return 'MYR';
    }

    // Indonesia
    if (tz.includes('Jakarta') || tz.includes('Makassar') || tz.includes('Jayapura') || lang.includes('id')) {
      return 'IDR';
    }

    // Default to USD for US and international visitors
    return 'USD';
  } catch (_) {
    return 'USD';
  }
}

/**
 * Converts price from one currency to another
 */
export function convertCurrency(
  amount: number,
  fromCode: string = 'INR',
  toCode: string = 'USD'
): number {
  if (fromCode === toCode) return amount;
  if (!amount || isNaN(amount)) return 0;

  const fromInfo = SUPPORTED_CURRENCIES[fromCode] || SUPPORTED_CURRENCIES.INR;
  const toInfo = SUPPORTED_CURRENCIES[toCode] || SUPPORTED_CURRENCIES.USD;

  // Convert from origin to USD base
  const amountInUSD = amount / fromInfo.rateAgainstUSD;

  // Convert from USD to destination currency
  const converted = amountInUSD * toInfo.rateAgainstUSD;

  // Round intelligently
  if (toCode === 'JPY' || toCode === 'IDR') {
    return Math.round(converted / 10) * 10;
  }
  if (toCode === 'INR') {
    return Math.round(converted / 50) * 50;
  }
  return Math.round(converted);
}

/**
 * Formats amount into given currency string (e.g. ₹30,000, $345, €320, 1,250 AED)
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = 'USD',
  showCode: boolean = false
): string {
  const info = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const safeAmount = Math.max(0, Math.round(amount));

  // Determine locale for number formatting
  let locale = 'en-US';
  if (currencyCode === 'INR') locale = 'en-IN';
  else if (currencyCode === 'EUR') locale = 'de-DE';
  else if (currencyCode === 'GBP') locale = 'en-GB';
  else if (currencyCode === 'JPY') locale = 'ja-JP';

  const formattedNumber = safeAmount.toLocaleString(locale);

  if (info.formatPrefix) {
    return `${info.symbol}${formattedNumber}${showCode ? ` ${info.code}` : ''}`;
  } else {
    return `${formattedNumber} ${info.symbol}${showCode ? ` (${info.code})` : ''}`;
  }
}
