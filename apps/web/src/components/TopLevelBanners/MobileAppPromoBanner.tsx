import { ReactComponent as UniswapLogo } from 'assets/svg/uniswap_app_logo.svg'
import { useAtomValue } from 'jotai/utils'
import { useState } from 'react'
import { hideMobileAppPromoBannerAtom } from 'state/application/atoms'
import styled from 'styled-components'
import { BREAKPOINTS } from 'theme'
import { Z_INDEX } from 'theme/zIndex'
import { isWebAndroid, isWebIOS } from 'utilities/src/platform'

const Wrapper = styled.div`
  height: 56px;
  width: 100%;
  background-color: ${({ theme }) => theme.accent2};
  padding: 10px 16px 10px 12px;
  z-index: ${Z_INDEX.sticky};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  display: none;
  @media screen and (max-width: ${BREAKPOINTS.sm}px) {
    display: flex;
  }
`

/**
 * We show the mobile app promo banner if:
 * - The user is on a mobile device our app supports
 * - The user is not using Safari (since we don't want to conflict with the Safari-native Smart App Banner)
 * - The user has not dismissed the banner during this session
 */
export function useMobileAppPromoBannerEligible() {
  const hideMobileAppPromoBanner = useAtomValue(hideMobileAppPromoBannerAtom)
  return (isWebIOS || isWebAndroid) && !hideMobileAppPromoBanner
}

// const UNIVERSAL_DOWNLOAD_LINK = 'https://uniswapwallet.onelink.me/8q3y/39b0eeui'

// function getDownloadLink(userAgent: string, peerWalletAgent?: string): string {
//   if (userAgent.includes('MetaMaskMobile')) {
//     return 'https://uniswapwallet.onelink.me/8q3y/ee713xnh'
//   }
//   if (userAgent.includes('Phantom')) {
//     return 'https://uniswapwallet.onelink.me/8q3y/sjdi6xky'
//   }
//   if (userAgent.includes('OKApp')) {
//     return 'https://uniswapwallet.onelink.me/8q3y/7i8g60sb'
//   }
//   if (userAgent.includes('BitKeep')) {
//     return 'https://uniswapwallet.onelink.me/8q3y/93vro3iq'
//   }
//   if (userAgent.includes('DeFiWallet')) {
//     return 'https://uniswapwallet.onelink.me/8q3y/ay1z22ab'
//   }
//   if (userAgent.includes('1inchWallet')) {
//     return 'https://uniswapwallet.onelink.me/8q3y/03e2c5cw'
//   }
//   if (userAgent.includes('RHNCW')) {
//     return 'https://uniswapwallet.onelink.me/8q3y/ipq1dx4n'
//   }
//   if (peerWalletAgent?.includes('CoinbaseWallet CoinbaseBrowser')) {
//     return 'https://uniswapwallet.onelink.me/8q3y/24xpl5zh'
//   }
//   return UNIVERSAL_DOWNLOAD_LINK
// }

export function MobileAppPromoBanner() {
  const [isVisible] = useState(true)
  const mobileAppPromoBannerEligible = useMobileAppPromoBannerEligible()

  if (!mobileAppPromoBannerEligible || !isVisible) {
    return null
  }

  return (
    <Wrapper>
      <UniswapLogo width="32px" height="32px" />
    </Wrapper>
  )
}
