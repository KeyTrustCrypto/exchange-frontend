import keytrustVirtualCard from 'assets/images/keytrustVirtualCard.gif'
import { t } from 'i18n'
import { CreditCard } from 'pages/Landing/components/Icons'
import { PillButton } from 'pages/Landing/components/cards/PillButton'
import ValuePropCard from 'pages/Landing/components/cards/ValuePropCard'
import styled, { useTheme } from 'styled-components'
import { Image } from 'ui/src'

const Contents = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CardImg = styled(Image)`
  width: 150%;
  max-width: 700px;
  height: 300px;
`

export function VirtualCard() {
  const theme = useTheme()

  return (
    <ValuePropCard
      href="https://www.google.com/"
      height="540px"
      minHeight="540px"
      button={<PillButton color={theme.white} label={t('common.virtual_cards')} icon={<CreditCard />} />}
      titleText={t('common.virtual.cards.description')}
    >
      <Contents>
        <CardImg src={keytrustVirtualCard} alt="Virtual Card" />
      </Contents>
    </ValuePropCard>
  )
}
