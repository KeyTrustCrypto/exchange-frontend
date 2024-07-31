import { useTranslation } from 'react-i18next'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks'

export interface MenuItem {
  label: string
  href: string
  internal?: boolean
  target?: string
  overflow?: boolean
  closeMenu?: () => void
}

export interface MenuSection {
  title: string
  items: MenuItem[]
  closeMenu?: () => void
}

export const useMenuContent = (): MenuSection[] => {
  const { t } = useTranslation()
  const isLegacyNav = !useFeatureFlag(FeatureFlags.NavRefresh)

  const legacyAppLinks = {
    title: t('common.app'),
    key: 'App',
    items: [
      { label: t('common.vote'), href: 'https://vote.uniswapfoundation.org/' },
      { label: t('common.analytics'), href: '/explore', internal: true },
    ],
  }

  const protocolLinks = {
    title: t('common.ecosystem'),
    key: 'Protocol',
    items: [{ label: t('common.developers'), href: 'https://www.google.com/' }],
  }
  const helpLinks = {
    title: t('common.needHelp'),
    key: 'Help',
    items: [
      { label: t('common.helpCenter'), href: 'https://support.uniswap.org/hc/en-us' },
      { label: t('common.contactUs.button'), href: 'https://support.uniswap.org/hc/en-us/requests/new' },
    ],
  }

  return [...(isLegacyNav ? [legacyAppLinks] : []), protocolLinks, helpLinks]
}
