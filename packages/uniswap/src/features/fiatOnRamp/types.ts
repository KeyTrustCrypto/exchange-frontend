import { CurrencyInfo } from 'uniswap/src/features/dataApi/types'
import { FiatCurrencyComponents } from 'utilities/src/format/localeBased'

export type FORCountry = {
  countryCode: string
  displayName: string
  state: string | undefined
}

// /get-country

export type FORGetCountryResponse = FORCountry

// /supported-countries

export type FORSupportedCountriesResponse = {
  supportedCountries: FORCountry[]
}

// /quote

export type FORQuoteRequest = {
  countryCode: string
  destinationCurrencyCode: string
  sourceAmount: number
  sourceCurrencyCode: string
  walletAddress: string
  state?: string
}

export type FORQuote = {
  countryCode: string | null
  sourceAmount: number
  sourceCurrencyCode: string
  destinationAmount: number
  destinationCurrencyCode: string
  serviceProvider: string
  serviceProviderDetails: FORServiceProvider
  totalFee: number
}

export type FORQuoteResponse = {
  quotes: Maybe<FORQuote[]>
  message: string | null
  error: string | null
}

// /service-providers

export type FORLogo = {
  darkLogo: string
  lightLogo: string
}

export type FORServiceProvider = {
  serviceProvider: string
  name: string
  url: string
  logos: FORLogo
  paymentMethods: string[]
}

export type FORServiceProvidersRequest = {
  countryCode: string
}

export type FORServiceProvidersResponse = {
  serviceProviders: FORServiceProvider[]
}

// /supported-tokens

export type FORSupportedTokensRequest = {
  fiatCurrency: string
  countryCode: string
}

export type FORSupportedToken = {
  cryptoCurrencyCode: string
  displayName: string
  address: string
  cryptoCurrencyChain: string
  chainId: string
  symbol: string
}

export type FORSupportedTokensResponse = {
  supportedTokens: FORSupportedToken[]
}

// /supported-fiat-currencies

export type FORSupportedFiatCurrenciesRequest = {
  countryCode: string
}

export type FORSupportedFiatCurrency = {
  fiatCurrencyCode: string
  displayName: string
  symbol: string
}

export type FORSupportedFiatCurrenciesResponse = {
  fiatCurrencies: FORSupportedFiatCurrency[]
}

// /widget-url

export type FORWidgetUrlRequest = {
  sourceAmount: number
  sourceCurrencyCode: string
  destinationCurrencyCode: string
  countryCode: string
  serviceProvider: string
  walletAddress: string
  externalSessionId: string
  redirectUrl?: string
}

export type FORWidgetUrlResponse = {
  id: string
  widgetUrl: string
}

// /transfer-widget-url

export type FORTransferWidgetUrlRequest = {
  serviceProvider: string
  walletAddress: string
  externalSessionId: string
  redirectUrl: string
}

// /transactions

export type FORCryptoDetails = {
  walletAddress: string
  networkFee: number
  transactionFee: number
  totalFee: number
  blockchainTransactionId: string
  chainId: string
}

export type FORTransaction = {
  id: string
  status: string
  sourceAmount: number
  sourceCurrencyCode: string
  destinationAmount: number
  destinationCurrencyCode: string
  destinationContractAddress: string
  serviceProvider: string
  cryptoDetails: FORCryptoDetails
  createdAt: string
  updatedAt: string
  externalSessionId: string
}

export type FORTransactionRequest = {
  sessionId?: string
  forceFetch?: boolean
}

export type FORTransactionResponse = {
  transaction?: FORTransaction
}

export type FiatOnRampCurrency = {
  currencyInfo: Maybe<CurrencyInfo>
  moonpayCurrencyCode?: string
  meldCurrencyCode?: string
}

export enum InitialQuoteSelection {
  MostRecent,
  Best,
}

export type FiatCurrencyInfo = {
  name: string
  shortName: string
  code: string
} & FiatCurrencyComponents

// CHANGELLY

export enum ChangellyEventName {
  CHANGELLY_GEOCHECK_COMPLETED = "Changelly Geocheck Completed",
  CHANGELLY_TRANSACTION_CREATED = "Changelly Transaction Created",
  CHANGELLY_TRANSACTION_FAILED = "Changelly Transaction Failed",
  CHANGELLY_TRANSACTION_UPDATED = "Changelly Transaction Updated"
}

type PaymentMethodOffer = {
  amountExpectedTo: string;
  method: string;
  methodName: string;
  rate: string;
  invertedRate: string;
  fee: string;
}

export type ChangellyCountryAvailableData = {
  providerCode: string;
  rate: string;
  invertedRate: string;
  fee: string;
  amountFrom: string;
  amountExpectedTo: string;
  paymentMethodOffers: PaymentMethodOffer[];
}

export type ChangellyCountryAvailableResponse = ChangellyCountryAvailableData[]

export type ChangellyCurrency = {
  ticker: string;
  name: string;
  type: string;
  extraIdName: string | null;
  iconUrl: string;
  precision: string;
}
export type ChangellyListCurrenciesResponse = ChangellyCurrency[]

interface ChangellyOffer {
  providerCode: string;
  rate: string;
  invertedRate: string;
  fee: string;
  amountFrom: string;
  amountExpectedTo: string;
  paymentMethodOffers: PaymentMethodOffer[];
}

export type ChangellyOffersResponse = ChangellyOffer[]

export type CreateOrderResponse = {
  redirectUrl: string;
  orderId: string;
  externalUserId: string;
  externalOrderId: string;
  providerCode: string;
  currencyFrom: string;
  currencyTo: string;
  amountFrom: string;
  country: string;
  state: string | null;
  ip: string | null;
  walletAddress: string;
  walletExtraId: string | null;
  paymentMethod: string;
  userAgent: string | null;
  metadata: any | null;
  createdAt: string;
}

export enum ProviderCode {
  MOONPAY = 'moonpay',
  BANXA = 'banxa',
  WERT = 'wert',
  SIMPLEX = 'simplex',
  TRANSAK = 'transak',
  SWITCHERE = 'switchere'
}

export type CreateOrderRequest = {
  externalOrderId: string; // Order ID provided by you
  externalUserId: string;  // User ID provided by you
  providerCode: ProviderCode
  currencyFrom: string;    // Ticker of the pay-in currency in uppercase
  currencyTo: string;      // Ticker of the payout currency in uppercase
  amountFrom: string;      // Amount of currency the user is going to pay
  country: string;         // Country ISO 3166-1 code (Alpha-2)
  state?: string;          // State ISO 3166-2 code, required if country is US
  ip?: string;             // User's IP address
  walletAddress: string;   // Recipient wallet address
  walletExtraId?: string;  // Required for wallet addresses of certain currencies
  paymentMethod?: 'card' | 'IDEAL' | 'gbp_bank_transfer' | 'sepa_bank_transfer' | 'apple_pay' | 'yellow_card_bank_transfer' | 'pix' | 'pay_id' | 'pay_pal'; // Payment method code
  userAgent?: string;      // User Agent
  metadata?: Record<string, any>;
}
