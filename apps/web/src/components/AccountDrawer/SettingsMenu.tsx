import { GitVersionRow } from 'components/AccountDrawer/GitVersionRow'
import { LanguageMenuItems } from 'components/AccountDrawer/LanguageMenu'
import { SlideOutMenu } from 'components/AccountDrawer/SlideOutMenu'
import Column from 'components/Column'
import Row from 'components/Row'
import { LOCALE_LABEL } from 'constants/locales'
import { useActiveLocalCurrency } from 'hooks/useActiveLocalCurrency'
import { useActiveLocale } from 'hooks/useActiveLocale'
import { Trans } from 'i18n'
import { ReactNode } from 'react'
import { ChevronRight } from 'react-feather'
import styled from 'styled-components'
import { ClickableStyle, ThemedText } from 'theme/components'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks'

const Container = styled(Column)`
  height: 100%;
  justify-content: space-between;
`

const SectionTitle = styled(ThemedText.SubHeader)`
  color: ${({ theme }) => theme.neutral2};
  padding-bottom: 24px;
`

const SettingsButtonWrapper = styled(Row)`
  ${ClickableStyle}
  padding: 16px 0px;
`

const StyledChevron = styled(ChevronRight)`
  color: ${({ theme }) => theme.neutral2};
`

const LanguageLabel = styled(Row)`
  white-space: nowrap;
`

const SettingsButton = ({
  title,
  currentState,
  onClick,
  testId,
}: {
  title: ReactNode
  currentState: ReactNode
  onClick: () => void
  testId?: string
}) => (
  <SettingsButtonWrapper data-testid={testId} align="center" justify="space-between" onClick={onClick}>
    <ThemedText.SubHeaderSmall color="textPrimary">{title}</ThemedText.SubHeaderSmall>
    <LanguageLabel gap="xs" align="center" width="min-content">
      <ThemedText.LabelSmall color="textPrimary">{currentState}</ThemedText.LabelSmall>
      <StyledChevron size={20} />
    </LanguageLabel>
  </SettingsButtonWrapper>
)

export default function SettingsMenu({
  onClose,
  openLanguageSettings,
  openLocalCurrencySettings,
}: {
  onClose: () => void
  openLanguageSettings: () => void
  openLocalCurrencySettings: () => void
}) {
  const currencyConversionEnabled = useFeatureFlag(FeatureFlags.CurrencyConversion)
  const activeLocale = useActiveLocale()
  const activeLocalCurrency = useActiveLocalCurrency()

  return (
    <SlideOutMenu title={<Trans i18nKey="common.settings" />} onClose={onClose}>
      <Container>
        <div>
          {currencyConversionEnabled ? (
            <Column>
              <SettingsButton
                title={<Trans i18nKey="common.language" />}
                currentState={LOCALE_LABEL[activeLocale]}
                onClick={openLanguageSettings}
                testId="language-settings-button"
              />
              <SettingsButton
                title={<Trans i18nKey="common.currency" />}
                currentState={activeLocalCurrency}
                onClick={openLocalCurrencySettings}
                testId="local-currency-settings-button"
              />
            </Column>
          ) : (
            <>
              <SectionTitle data-testid="wallet-header">
                <Trans i18nKey="common.language" />
              </SectionTitle>
              <LanguageMenuItems />
            </>
          )}
        </div>
        <GitVersionRow />
      </Container>
    </SlideOutMenu>
  )
}
