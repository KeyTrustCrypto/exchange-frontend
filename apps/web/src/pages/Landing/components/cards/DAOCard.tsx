import { t } from 'i18n'
import { DAO } from 'pages/Landing/components/Icons'
import { PillButton } from 'pages/Landing/components/cards/PillButton'
import ValuePropCard from 'pages/Landing/components/cards/ValuePropCard'

export function DAOCard() {
  return (
    <ValuePropCard
      height="250px"
      minHeight="250px"
      to="https://www.google.com/"
      button={<PillButton label={t('common.dao')} icon={<DAO />} />}
      titleText={t('common.casino.description')}
    />
  )
}
