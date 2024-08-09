import { ConnectingViewWrapper } from 'pages/Swap/Buy/shared'
import { Trans } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ThemedText } from 'theme/components'
import { Flex, Text, useIsDarkMode } from 'ui/src'
import { ServiceProviderLogoStyles } from 'uniswap/src/features/fiatOnRamp/constants'
import { FORServiceProvider } from 'uniswap/src/features/fiatOnRamp/types'
import { getOptionalServiceProviderLogo } from 'uniswap/src/features/fiatOnRamp/utils'

interface ProviderConnectedViewProps {
  closeModal: () => void
  selectedServiceProvider: FORServiceProvider
  url: string
}

const Container = styled.button<{ $selected?: boolean; $disabled?: boolean; $highlighted: boolean }>`
  color: ${({ theme, $selected, $disabled, $highlighted }) => {
    if ($highlighted) {
      return theme.neutral1
    }
    if ($selected && !$disabled) {
      return theme.neutral1
    }
    return theme.neutral2
  }};
  padding: 2px 8px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, $highlighted, $selected }) => {
    if ($highlighted || $selected) {
      return theme.surface3
    }
    return 'unset'
  }};
`

export function ProviderConnectedView({ closeModal, selectedServiceProvider, url }: ProviderConnectedViewProps) {
  const isDarkMode = useIsDarkMode()

  const onClick = (): void => {
    window.open(url, '_blank')
  }
  return (
    <ConnectingViewWrapper closeModal={closeModal}>
      <img
        style={ServiceProviderLogoStyles.uniswapLogoWrapper}
        height={120}
        src={getOptionalServiceProviderLogo(selectedServiceProvider?.logos, isDarkMode)}
        width={120}
      />
      <Flex flexDirection="column" alignItems="center">
        <Text variant="subheading1">
          <Trans
            i18nKey="fiatOnRamp.completeTransactionHeader"
            values={{ serviceProvider: selectedServiceProvider.name }}
          />
        </Text>
        <Text variant="body2" textAlign="center" color="$neutral2">
          <Trans i18nKey="fiatOnRamp.continueInTab" values={{ serviceProvider: selectedServiceProvider.name }} />
        </Text>
        {/* <Row gap="md" justify="center">
          {PREDEFINED_AMOUNTS.map((amount: number) => (
            <PredefinedAmount
              onClick={() => {
                setBuyFormState((state) => ({ ...state, inputAmount: amount.toString() }))
              }}
              key={amount}
              amount={amount}
              currentAmount={inputAmount}
              disabled={disabled}
            />
          ))}
        </Row> */}
        <Container
          $highlighted={false}
          onClick={() => onClick()}
        >
          <ThemedText.BodySecondary fontWeight={535} color="inherit">
            <Trans i18nKey="common.buy.link" />
          </ThemedText.BodySecondary>
        </Container>
      </Flex>
    </ConnectingViewWrapper>
  )
}
