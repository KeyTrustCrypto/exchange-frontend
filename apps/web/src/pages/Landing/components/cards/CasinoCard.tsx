import { t } from 'i18n'
import { Casino } from 'pages/Landing/components/Icons'
import { PillButton } from 'pages/Landing/components/cards/PillButton'
import ValuePropCard from 'pages/Landing/components/cards/ValuePropCard'

export function CasinoCard() {
  return (
    <ValuePropCard
      height="250px"
      minHeight="250px"
      to="https://www.google.com/"
      button={<PillButton label={t('common.casino')} icon={<Casino />} />}
      titleText={t('common.casino.description')}
    />
  )
}
