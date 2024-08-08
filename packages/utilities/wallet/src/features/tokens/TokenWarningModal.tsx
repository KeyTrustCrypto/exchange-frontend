import { useTranslation } from 'react-i18next'
import { Button, Flex, Text, isWeb, useSporeColors } from 'ui/src'
import { AppTFunction } from 'ui/src/i18n/types'
import { ThemeNames, imageSizes, opacify } from 'ui/src/theme'
import { TokenLogo } from 'uniswap/src/components/CurrencyLogo/TokenLogo'
import WarningIcon from 'uniswap/src/components/icons/WarningIcon'
import { BottomSheetModal } from 'uniswap/src/components/modals/BottomSheetModal'
import { uniswapUrls } from 'uniswap/src/constants/urls'
import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { ModalName } from 'uniswap/src/features/telemetry/constants'
import { useTokenSafetyLevelColors } from 'uniswap/src/features/tokens/safetyHooks'
import { TestID } from 'uniswap/src/test/fixtures/testIDs'
import { LearnMoreLink } from 'wallet/src/components/text/LearnMoreLink'
import { getTokenSafetyHeaderText } from 'wallet/src/features/tokens/utils'

function getTokenSafetyBodyText(safetyLevel: Maybe<SafetyLevel>, t: AppTFunction): string {
  switch (safetyLevel) {
    case SafetyLevel.MediumWarning:
      return t('token.safetyLevel.medium.message')
    case SafetyLevel.StrongWarning:
      return t('token.safetyLevel.strong.message')
    case SafetyLevel.Blocked:
      return t('token.safetyLevel.blocked.message')
    default:
      return ''
  }
}

interface Props {
  isVisible: boolean
  currencyId: string
  safetyLevel: Maybe<SafetyLevel>
  disableAccept?: boolean // only show message and close button
  tokenLogoUrl: Maybe<string>
  onClose: () => void
  onAccept: () => void
}

/**
 * Warning speedbump for selecting certain tokens.
 */
export default function TokenWarningModal({
  isVisible,
  safetyLevel,
  disableAccept,
  tokenLogoUrl,
  onClose,
  onAccept,
}: Props): JSX.Element | null {
  const { t } = useTranslation()
  const colors = useSporeColors()
  const warningColor = useTokenSafetyLevelColors(safetyLevel)

  // always hide accept button if blocked token
  const hideAcceptButton = disableAccept || safetyLevel === SafetyLevel.Blocked

  const closeButtonText = hideAcceptButton ? t('common.button.close') : t('common.button.back')

  const showWarningIcon = safetyLevel === SafetyLevel.StrongWarning || safetyLevel === SafetyLevel.Blocked

  if (!isVisible) {
    return null
  }

  return (
    <BottomSheetModal name={ModalName.TokenWarningModal} onClose={onClose}>
      <Flex
        centered
        gap="$spacing16"
        pb={isWeb ? '$none' : '$spacing12'}
        pt="$spacing12"
        px={isWeb ? '$none' : '$spacing24'}
      >
        {showWarningIcon ? (
          <Flex centered gap="$spacing16">
            <Flex
              centered
              borderRadius="$rounded12"
              p="$spacing12"
              style={{
                backgroundColor: opacify(12, colors[warningColor].val),
              }}
            >
              <WarningIcon safetyLevel={safetyLevel} size="$icon.24" />
            </Flex>
            <Text variant="subheading1">{getTokenSafetyHeaderText(safetyLevel, t)}</Text>
          </Flex>
        ) : (
          <TokenLogo size={imageSizes.image48} url={tokenLogoUrl} />
        )}
        <Flex centered gap="$spacing12" width="90%">
          <Text color="$neutral2" textAlign="center" variant="body2">
            {getTokenSafetyBodyText(safetyLevel, t)}{' '}
          </Text>
          <LearnMoreLink url={uniswapUrls.helpArticleUrls.tokenWarning} />
        </Flex>
        <Flex centered row gap="$spacing12" mt="$spacing16" width="100%">
          <Button flex={1} flexBasis={1} testID={TestID.Cancel} theme="tertiary" onPress={onClose}>
            {closeButtonText}
          </Button>
          {!hideAcceptButton && (
            <Button
              flex={1}
              flexBasis={1}
              testID={TestID.TokenWarningAccept}
              theme={getButtonTheme(safetyLevel)}
              onPress={onAccept}
            >
              {showWarningIcon ? t('common.button.understand') : t('common.button.continue')}
            </Button>
          )}
        </Flex>
      </Flex>
    </BottomSheetModal>
  )
}

function getButtonTheme(safetyLevel: Maybe<SafetyLevel>): ThemeNames | undefined {
  switch (safetyLevel) {
    case SafetyLevel.MediumWarning:
      return 'secondary'
    case SafetyLevel.StrongWarning:
      return 'detrimental'
    default:
      return undefined
  }
}
