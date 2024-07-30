import { useAccountDrawer } from 'components/AccountDrawer/MiniPortfolio/hooks'
import { UniIcon } from 'components/Logo/UniIcon'
import { Bag } from 'components/NavBar/Bag'
import { ChainSelector } from 'components/NavBar/ChainSelector'
import Blur from 'components/NavBar/LEGACY/Blur'
import { More } from 'components/NavBar/LEGACY/Menu'
import * as styles from 'components/NavBar/LEGACY/style.css'
import Web3Status from 'components/Web3Status'
import { chainIdToBackendChain } from 'constants/chains'
import { useAccount } from 'hooks/useAccount'
import { useIsNftPage } from 'hooks/useIsNftPage'
import { useIsSendPage } from 'hooks/useIsSendPage'
import { useIsSwapPage } from 'hooks/useIsSwapPage'
import { Trans } from 'i18n'
import { Box } from 'nft/components/Box'
import { Row } from 'nft/components/Flex'
import { useProfilePageState } from 'nft/hooks'
import { ProfilePageStateType } from 'nft/types'
import { ReactNode, useCallback } from 'react'
import { NavLink, NavLinkProps, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Z_INDEX } from 'theme/zIndex'
import { Chain } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks'

const Nav = styled.nav`
  position: relative;
  padding: ${({ theme }) => `${theme.navVerticalPad}px 12px`};
  width: 100%;
  height: ${({ theme }) => theme.navHeight}px;
  z-index: ${Z_INDEX.sticky};
`

interface MenuItemProps {
  href: string
  id?: NavLinkProps['id']
  isActive?: boolean
  children: ReactNode
  dataTestId?: string
}

const MenuItem = ({ href, dataTestId, id, isActive, children }: MenuItemProps) => {
  return (
    <NavLink
      to={href}
      className={isActive ? styles.activeMenuItem : styles.menuItem}
      id={id}
      style={{ textDecoration: 'none' }}
      data-testid={dataTestId}
    >
      {children}
    </NavLink>
  )
}

export const PageTabs = () => {
  const { pathname } = useLocation()
  const account = useAccount()
  const chainName = chainIdToBackendChain({ chainId: account.chainId, withFallback: true })

  return (
    <>
      <MenuItem href="/swap" isActive={pathname.startsWith('/swap')}>
        <Trans i18nKey="common.swap" />
      </MenuItem>
      <MenuItem
        href={'/explore' + (chainName !== Chain.Ethereum ? `/${chainName.toLowerCase()}` : '')}
        isActive={pathname.startsWith('/explore')}
      >
        <Trans i18nKey="common.products" />
      </MenuItem>

      <More />
    </>
  )
}

const LegacyNavbar = ({ blur }: { blur: boolean }) => {
  const isNftPage = useIsNftPage()
  const isSwapPage = useIsSwapPage()
  const isSendPage = useIsSendPage()
  const sellPageState = useProfilePageState((state) => state.state)
  const navigate = useNavigate()
  const multichainUXEnabled = useFeatureFlag(FeatureFlags.MultichainUX)

  const account = useAccount()
  const accountDrawer = useAccountDrawer()

  const hideChainSelector = multichainUXEnabled ? isSendPage || isSwapPage || isNftPage : isNftPage

  const handleUniIconClick = useCallback(() => {
    if (account.isConnected) {
      return
    }
    accountDrawer.close()
    navigate({
      pathname: '/',
      search: '?intro=true',
    })
  }, [account.isConnected, accountDrawer, navigate])

  return (
    <>
      {blur && <Blur />}
      <Nav>
        <Box display="flex" height="full" flexWrap="nowrap">
          <Box className={styles.leftSideContainer}>
            <Box className={styles.logoContainer}>
              <UniIcon
                width="48"
                height="48"
                data-testid="uniswap-logo"
                className={styles.logo}
                clickable={!account}
                onClick={handleUniIconClick}
              />
            </Box>
            {hideChainSelector ? null : (
              <Box display={{ sm: 'flex', lg: 'none' }}>
                <ChainSelector leftAlign={true} />
              </Box>
            )}
            <Row display={{ sm: 'none', lg: 'flex' }}>
              <PageTabs />
            </Row>
          </Box>

          <Box className={styles.rightSideContainer}>
            <Row gap="12">
              {isNftPage && sellPageState !== ProfilePageStateType.LISTING && <Bag />}
              {hideChainSelector ? null : (
                <Box display={{ sm: 'none', lg: 'flex' }}>
                  <ChainSelector />
                </Box>
              )}
              <Web3Status />
            </Row>
          </Box>
        </Box>
      </Nav>
    </>
  )
}

export default LegacyNavbar
