import { t } from 'i18n'
import { Xcube } from 'pages/Landing/components/Icons'
import { PillButton } from 'pages/Landing/components/cards/PillButton'
import ValuePropCard from 'pages/Landing/components/cards/ValuePropCard'

export function XcubeCard() {
  return (
    <ValuePropCard
      height="250px"
      minHeight="250px"
      to="https://xcube.club/"
      button={<PillButton label={t('common.xcube')} icon={<Xcube />} />}
      titleText={t('common.casino.description')}
    />
  )
}
