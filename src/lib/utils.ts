import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

export const dateIsLessThan = (date: Date, timeMS: number): boolean => {
  if (Date.now() - new Date(date).getTime() <= timeMS) return true;
  else return false;
};

export const dateToShortDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const stringDateToShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const convertToMonthDayYear = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  // Options for formatting the date
  const options = {
    month: "long" as const, // Display full month name (e.g., "March")
    day: "numeric" as const, // Display day of the month (e.g., "8")
    year: "numeric" as const, // Specify 'numeric' as the type of the year property
  };

  // Format the date using the options
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const convertToShortDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const year = date.getFullYear() % 100; // Get last two digits of the year

  return `${month}/${day}/${year}`;
};

const currencySymbols: Record<string, string> = {
  USD: "$",
  AED: "د.إ", // United Arab Emirates Dirham
  AFN: "؋", // Afghan Afghani
  ALL: "L", // Albanian Lek
  AMD: "֏", // Armenian Dram
  ANG: "ƒ", // Netherlands Antillean Guilder
  AOA: "Kz", // Angolan Kwanza
  ARS: "ARS$", // Argentine Peso
  AUD: "A$", // Australian Dollar
  AWG: "Afl.", // Aruban Florin
  AZN: "₼", // Azerbaijani Manat
  BAM: "КМ", // Bosnia-Herzegovina Convertible Mark
  BBD: "Bds$", // Barbadian Dollar
  BDT: "৳", // Bangladeshi Taka
  BGN: "лв", // Bulgarian Lev
  BHD: "ب.د", // Bahraini Dinar
  BIF: "FBu", // Burundian Franc
  BMD: "BD$", // Bermudian Dollar
  BND: "B$", // Brunei Dollar
  BOB: "Bs", // Bolivian Boliviano
  BRL: "R$", // Brazilian Real
  BSD: "BS$", // Bahamian Dollar
  BTN: "Nu.", // Bhutanese Ngultrum
  BWP: "P", // Botswanan Pula
  BYN: "Br", // Belarusian Ruble
  BZD: "BZ$", // Belize Dollar
  CAD: "C$", // Canadian Dollar
  CDF: "FC", // Congolese Franc
  CHF: "Fr", // Swiss Franc
  CLP: "CLP$", // Chilean Peso
  CNY: "¥", // Chinese Yuan
  COP: "COL$", // Colombian Peso
  CRC: "₡", // Costa Rican Colón
  CVE: "Esc", // Cape Verdean Escudo
  CZK: "Kč", // Czech Koruna
  DJF: "Fdj", // Djiboutian Franc
  DKK: "kr", // Danish Krone
  DOP: "RD$", // Dominican Peso
  DZD: "د.ج", // Algerian Dinar
  EGP: "E£", // Egyptian Pound
  ERN: "Nfk", // Eritrean Nakfa
  ETB: "Br", // Ethiopian Birr
  EUR: "€", // Euro
  FJD: "FJ$", // Fijian Dollar
  FKP: "FK£", // Falkland Islands Pound
  FOK: "CFP", // CFP Franc
  GBP: "£", // British Pound Sterling
  GEL: "₾", // Georgian Lari
  GGP: "GGP", // Guernsey Pound
  GHS: "GH₵", // Ghanaian Cedi
  GIP: "GIP£", // Gibraltar Pound
  GMD: "D", // Gambian Dalasi
  GNF: "FG", // Guinean Franc
  GTQ: "Q", // Guatemalan Quetzal
  GYD: "G$", // Guyanaese Dollar
  HKD: "HK$", // Hong Kong Dollar
  HNL: "L", // Honduran Lempira
  HRK: "kn", // Croatian Kuna
  HTG: "G", // Haitian Gourde
  HUF: "Ft", // Hungarian Forint
  IDR: "Rp", // Indonesian Rupiah
  ILS: "₪", // Israeli New Sheqel
  IMP: "IMP", // Isle of Man Pound
  INR: "₹", // Indian Rupee
  IQD: "ع.د", // Iraqi Dinar
  IRR: "﷼", // Iranian Rial
  ISK: "Íkr", // Icelandic Króna
  JEP: "JEP", // Jersey Pound
  JMD: "J$", // Jamaican Dollar
  JOD: "د.ا", // Jordanian Dinar
  JPY: "¥", // Japanese Yen
  KES: "Ksh", // Kenyan Shilling
  KGS: "сом", // Kyrgystani Som
  KHR: "៛", // Cambodian Riel
  KID: "E", // Kiribati Dollar
  KMF: "CF", // Comorian Franc
  KRW: "₩", // South Korean Won
  KWD: "د.ك", // Kuwaiti Dinar
  KYD: "KY$", // Cayman Islands Dollar
  KZT: "₸", // Kazakhstani Tenge
  LAK: "₭", // Laotian Kip
  LBP: "ل.ل", // Lebanese Pound
  LKR: "රු", // Sri Lankan Rupee
  LRD: "L$", // Liberian Dollar
  LSL: "M", // Lesotho Loti
  LYD: "ل.د", // Libyan Dinar
  MAD: "د.م.", // Moroccan Dirham
  MDL: "MDL", // Moldovan Leu
  MGA: "Ar", // Malagasy Ariary
  MKD: "ден", // Macedonian Denar
  MMK: "K", // Myanma Kyat
  MNT: "₮", // Mongolian Tugrik
  MOP: "MOP$", // Macanese Pataca
  MRU: "UM", // Mauritanian Ouguiya
  MUR: "₨", // Mauritian Rupee
  MVR: "MVR", // Maldivian Rufiyaa
  MWK: "MK", // Malawian Kwacha
  MXN: "MX$", // Mexican Peso
  MYR: "RM", // Malaysian Ringgit
  MZN: "MT", // Mozambican Metical
  NAD: "N$", // Namibian Dollar
  NGN: "₦", // Nigerian Naira
  NIO: "C$", // Nicaraguan Córdoba
  NOK: "kr", // Norwegian Krone
  NPR: "₨", // Nepalese Rupee
  NZD: "NZ$", // New Zealand Dollar
  OMR: "ر.ع.", // Omani Rial
  PAB: "B/.", // Panamanian Balboa
  PEN: "S/.", // Peruvian Nuevo Sol
  PGK: "K", // Papua New Guinean Kina
  PHP: "₱", // Philippine Peso
  PKR: "₨", // Pakistani Rupee
  PLN: "zł", // Polish Zloty
  PYG: "₲", // Paraguayan Guarani
  QAR: "ر.ق", // Qatari Rial
  RON: "RON", // Romanian Leu
  RSD: "дин", // Serbian Dinar
  RUB: "₽", // Russian Ruble
  RWF: "RF", // Rwandan Franc
  SAR: "ر.س", // Saudi Riyal
  SBD: "SI$", // Solomon Islands Dollar
  SCR: "₨", // Seychellois Rupee
  SDG: "ج.س.", // Sudanese Pound
  SEK: "kr", // Swedish Krona
  SGD: "S$", // Singapore Dollar
  SHP: "£", // Saint Helena Pound
  SLL: "Le", // Sierra Leonean Leone
  SOS: "Sh", // Somali Shilling
  SPL: "₠", // Seborga Luigino
  SRD: "$", // Surinamese Dollar
  STN: "Db", // São Tomé & Príncipe Dobra
  SVC: "₡", // Salvadoran Colón
  SYP: "£S", // Syrian Pound
  SZL: "E", // Swazi Lilangeni
  THB: "฿", // Thai Baht
  TJS: "SM", // Tajikistani Somoni
  TMT: "T", // Turkmenistani Manat
  TND: "د.ت", // Tunisian Dinar
  TOP: "T$", // Tongan Pa'anga
  TRY: "₺", // Turkish Lira
  TTD: "TT$", // Trinidad & Tobago Dollar
  TVD: "$", // Tuvaluan Dollar
  TWD: "NT$", // New Taiwan Dollar
  TZS: "TSh", // Tanzanian Shilling
  UAH: "₴", // Ukrainian Hryvnia
  UGX: "USh", // Ugandan Shilling
  UYU: "$U", // Uruguayan Peso
  UZS: "UZS", // Uzbekistani Som
  VES: "Bs.", // Venezuelan Bolívar
  VND: "₫", // Vietnamese Dong
  VUV: "VT", // Vanuatu Vatu
  WST: "WS$", // Samoan Tala
  XAF: "FCFA", // Central African CFA Franc
  XCD: "EC$", // East Caribbean Dollar
  XDR: "SDR", // Special Drawing Rights
  XOF: "CFA", // West African CFA Franc
  XPF: "₣", // CFP Franc
  YER: "﷼", // Yemeni Rial
  ZAR: "R", // South African Rand
  ZMW: "ZK", // Zambian Kwacha
  ZWL: "Z$", // Zimbabwean Dollar
};

export const getCurrencySymbol = (currencyCode: string): string | undefined => {
  return currencySymbols[currencyCode];
};
