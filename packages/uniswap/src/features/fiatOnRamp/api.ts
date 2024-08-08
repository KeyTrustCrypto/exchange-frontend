import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MoonpayEventName } from '@uniswap/analytics-events'
import { config } from 'uniswap/src/config'
import { uniswapUrls } from 'uniswap/src/constants/urls'
import { createSignedHeaders, objectToQueryString, serializeQueryParams } from 'uniswap/src/data/utils'
import { FOR_API_HEADERS } from 'uniswap/src/features/fiatOnRamp/constants'
import {
  ChangellyCountryAvailableResponse,
  ChangellyListCurrenciesResponse,
  ChangellyOffersResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  FORGetCountryResponse,
  FORQuoteRequest,
  FORQuoteResponse,
  FORServiceProvidersRequest,
  FORServiceProvidersResponse,
  FORSupportedCountriesResponse,
  FORSupportedFiatCurrenciesRequest,
  FORSupportedFiatCurrenciesResponse,
  FORSupportedTokensRequest,
  FORSupportedTokensResponse,
  FORTransactionRequest,
  FORTransactionResponse,
  FORTransferWidgetUrlRequest,
  FORWidgetUrlRequest,
  FORWidgetUrlResponse,
} from 'uniswap/src/features/fiatOnRamp/types'
import { transformPaymentMethods } from 'uniswap/src/features/fiatOnRamp/utils'
import { sendAnalyticsEvent } from '../telemetry/send.native'

export const fiatOnRampAggregatorApi = createApi({
  reducerPath: 'fiatOnRampAggregatorApi-uniswap',
  baseQuery: fetchBaseQuery({
    baseUrl: uniswapUrls.fiatOnRampApiUrl,
    headers: FOR_API_HEADERS,
  }),
  endpoints: (builder) => ({
    fiatOnRampAggregatorCountryList: builder.query<FORSupportedCountriesResponse, void>({
      query: () => `/supported-countries`,
    }),
    fiatOnRampAggregatorGetCountry: builder.query<FORGetCountryResponse, void>({
      query: () => `/get-country`,
    }),
    fiatOnRampAggregatorCryptoQuote: builder.query<FORQuoteResponse, FORQuoteRequest>({
      query: (request) => ({
        url: '/quote',
        body: request,
        method: 'POST',
      }),
      keepUnusedDataFor: 0,
    }),
    fiatOnRampAggregatorServiceProviders: builder.query<FORServiceProvidersResponse, FORServiceProvidersRequest>({
      query: (request) => `/service-providers?${new URLSearchParams(request).toString()}`,
      transformResponse: (response: FORServiceProvidersResponse) => ({
        serviceProviders: response.serviceProviders.map((sp) => ({
          ...sp,
          paymentMethods: transformPaymentMethods(sp.paymentMethods),
        })),
      }),
    }),
    fiatOnRampAggregatorTransferServiceProviders: builder.query<FORServiceProvidersResponse, void>({
      query: () => '/transfer-service-providers',
      keepUnusedDataFor: 60 * 60, // 1 hour
    }),
    fiatOnRampAggregatorSupportedTokens: builder.query<FORSupportedTokensResponse, FORSupportedTokensRequest>({
      query: (request) => `/supported-tokens?${new URLSearchParams(request).toString()}`,
    }),
    fiatOnRampAggregatorSupportedFiatCurrencies: builder.query<
      FORSupportedFiatCurrenciesResponse,
      FORSupportedFiatCurrenciesRequest
    >({
      query: (request) => `/supported-fiat-currencies?${new URLSearchParams(request).toString()}`,
    }),
    fiatOnRampAggregatorWidget: builder.query<FORWidgetUrlResponse, FORWidgetUrlRequest>({
      query: (request) => ({
        url: '/widget-url',
        body: request,
        method: 'POST',
      }),
    }),
    fiatOnRampAggregatorTransferWidget: builder.query<FORWidgetUrlResponse, FORTransferWidgetUrlRequest>({
      query: (request) => ({
        url: '/transfer-widget-url',
        body: request,
        method: 'POST',
      }),
    }),
    /**
     * Fetches a fiat onramp transaction by its ID, with no signature authentication.
     */
    fiatOnRampAggregatorTransaction: builder.query<
      FORTransactionResponse,
      // TODO: make sessionId required in FORTransactionRequest after backend is updated
      Omit<FORTransactionRequest, 'sessionId'> & { sessionId: string }
    >({
      query: (request) => `/transaction?${objectToQueryString(request)}`,
    }),
  }),
})

export const {
  useFiatOnRampAggregatorCountryListQuery,
  useFiatOnRampAggregatorGetCountryQuery,
  useFiatOnRampAggregatorCryptoQuoteQuery,
  useFiatOnRampAggregatorServiceProvidersQuery,
  useFiatOnRampAggregatorTransferServiceProvidersQuery,
  useFiatOnRampAggregatorSupportedTokensQuery,
  useFiatOnRampAggregatorSupportedFiatCurrenciesQuery,
  useFiatOnRampAggregatorWidgetQuery,
  useFiatOnRampAggregatorTransferWidgetQuery,
} = fiatOnRampAggregatorApi


export const fiatOnRampApiChangelly = createApi({
  reducerPath: 'fiatOnRampApiChangelly',
  baseQuery: fetchBaseQuery({ 
    baseUrl: config.changellyApiProxyUrl, 
   }),
  endpoints: (builder) => ({
    changellyOnRampCountryAvailable: builder.query<ChangellyCountryAvailableResponse, {
      providerCode?: string
      supportedFlow?: string
    }>({
      queryFn: ({providerCode, supportedFlow}) =>
        // TODO: [MOB-223] consider a reverse proxy for privacy reasons
        fetch(`${config.changellyApiProxyUrl}/v1/available-countries${serializeQueryParams({
          providerCode,
          supportedFlow,
        })}`, createSignedHeaders())
          .then((response) => response.json())
          .then((response: ChangellyCountryAvailableResponse) => {
            // sendAnalyticsEvent(MoonpayEventName.MOONPAY_GEOCHECK_COMPLETED, {
            //   success: true,
            //   networkError: false,
            // })
            return { data: response }
          })
          .catch((e) => {
            // sendAnalyticsEvent(MoonpayEventName.MOONPAY_GEOCHECK_COMPLETED, {
            //   success: false,
            //   networkError: true,
            // })

            return { data: undefined, error: e }
          }),
    }),
    changellyOnRampSupportedCurrencies: builder.query<
      ChangellyListCurrenciesResponse,
      {
        type?: string
        providerCode?: string
        supportedFlow?: string 
      }
    >({
      queryFn: ({ type, providerCode, supportedFlow }) =>
        fetch(`${config.changellyApiProxyUrl}/v1/currencies?${serializeQueryParams({type, providerCode, supportedFlow})}`, createSignedHeaders())
          .then((response) => response.json())
          .then((response: ChangellyListCurrenciesResponse) => {
            return { data: response }
          })
          .catch((e) => {
            return { data: undefined, error: e }
          }),
    }),
    changellyOnRampBuyQuote: builder.query<
      ChangellyOffersResponse,
      {
        providerCode: string
        currencyTo: string
        currencyFrom: string
        amountFrom: string
        externalUserId?: string
        country?: string
        state?: string
        ip?: string
      }
    >({
      queryFn: ({ providerCode, currencyTo, currencyFrom, amountFrom, externalUserId, country, state, ip }) =>
        fetch(
          `${config.changellyApiProxyUrl}/v1/offers?${serializeQueryParams({
            providerCode,
            currencyTo,
            currencyFrom,
            amountFrom,
            externalUserId,
            country,
            state,
            ip
          })}`,
        )
          .then((response) => response.json())
          .then((response: ChangellyOffersResponse) => {
            return { data: response }
          })
          .catch((e) => {
            return { data: undefined, error: e }
          }),
    }),

    changellyOnRampWidgetUrl: builder.query<string, CreateOrderRequest>({
      queryFn: async (data) => {
        try {
          console.log('request start', data)
          // const { headers } = createSignedHeaders(data);
          // console.log('headers', headers)
          const response = await fetch(`${config.changellyApiProxyUrl}`, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // 'x-api-key': headers['x-api-key'],
              // 'x-api-signature': headers['x-api-signature'],
            },
          });
          console.log('response text', response)

          if (!response.ok) {
            const errorText = await response.text();
            return { error: { status: 'FETCH_ERROR', error: errorText } };
          }

          const responseData: CreateOrderResponse = await response.json();

          return { data: responseData.redirectUrl as string };
        } catch (error) {
          console.log('error fetch', error)
          return { error: { status: 'FETCH_ERROR', error: String(error) } };
        }
      },
    })
  })
})

export const {
  useChangellyOnRampCountryAvailableQuery,
  useChangellyOnRampSupportedCurrenciesQuery,
  useChangellyOnRampWidgetUrlQuery,
  useChangellyOnRampBuyQuoteQuery,
} = fiatOnRampApiChangelly