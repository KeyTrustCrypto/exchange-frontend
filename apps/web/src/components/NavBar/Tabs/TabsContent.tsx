import { CreditCardIcon } from 'components/Icons/CreditCard'
import { Send } from 'components/Icons/Send'
import { SwapV2 } from 'components/Icons/SwapV2'
import { MenuItem } from 'components/NavBar/CompanyMenu/Content'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks'

export type TabsSection = {
  title: string
  href: string
  isActive?: boolean
  internal?: boolean
  target?: string
  items?: TabsItem[]
  closeMenu?: () => void
}

export type TabsItem = MenuItem & {
  icon?: JSX.Element
  quickKey: string
}

export const useTabsContent = (): TabsSection[] => {
  const { t } = useTranslation()
  const isLegacyNav = !useFeatureFlag(FeatureFlags.NavRefresh)
  const { pathname } = useLocation()
  const theme = useTheme()

  return isLegacyNav
    ? [
        {
          title: t('common.swap'),
          href: '/swap',
        },
        {
          title: t('common.products'),
          href: '/explore',
        },
      ]
    : [
        {
          title: t('common.exchange'),
          href: '/buy',
          isActive: pathname.startsWith('/swap') || pathname.startsWith('/send') || pathname.startsWith('/buy'),
          items: [
            {
              label: t('common.buy.label'),
              icon: <CreditCardIcon fill={theme.neutral2} />,
              quickKey: t`B`,
              href: '/buy',
              internal: true,
            },
            {
              label: t('common.send.button'),
              icon: <Send fill={theme.neutral2} />,
              quickKey: t`E`,
              href: '/send',
              internal: true,
            },
            {
              label: t('common.swap'),
              icon: <SwapV2 fill={theme.neutral2} />,
              quickKey: t`U`,
              href: '/swap',
              internal: true,
            },
          ],
        },
        {
          title: t('common.products'),
          href: 'https://www.google.com/',
          isActive: pathname.startsWith('/explore') || pathname.startsWith('/nfts'),
          target: '_blank',
          internal: false,
          items: [
            {
              label: t('common.virtual_cards'),
              quickKey: t`T`,
              href: 'https://www.google.com/',
              target: '_blank',
              internal: false,
            },
            {
              label: t('common.casino'),
              quickKey: t`P`,
              href: 'https://www.google.com/',
              target: '_blank',
              internal: false,
            },
            {
              label: t('common.xcube'),
              quickKey: t`X`,
              href: 'https://xcube.club/',
              target: '_blank',
              internal: false,
            },
          ],
        },
      ]
}
