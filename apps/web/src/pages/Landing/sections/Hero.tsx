import mainPageLines from 'assets/images/mainPageLines.png'
import { ButtonPrimary } from 'components/Button'
import { ColumnCenter } from 'components/Column'
import { useScroll } from 'hooks/useScroll'
import { Trans } from 'i18n'
import { Box, H2 } from 'pages/Landing/components/Generics'
import { LogoBig } from 'pages/Landing/components/Icons'
import { TokenCloud } from 'pages/Landing/components/TokenCloud'
import { Hover, RiseIn } from 'pages/Landing/components/animations'
import { ChevronDown } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { BREAKPOINTS } from 'theme'
import { Text } from 'ui/src'
import { heightBreakpoints } from 'ui/src/theme'

const LearnMoreContainer = styled(Box)`
  bottom: 48px;
  @media (max-width: ${BREAKPOINTS.md}px) {
    bottom: 64px;
  }

  // Prevent overlap of Hero text and Learn More button on short screens
  @media (max-height: ${heightBreakpoints.short + 30}px) {
    display: none;
  }
`

const Container = styled(Box)`
  min-width: 100%;
  padding-top: ${({ theme }) => theme.navHeight}px;
  //background-size: cover;
  //background-position: center;
  // background-image: url(${mainPageLines}), ${({ theme }) => theme.brandedGradient};
  //background: ${({ theme }) => theme.surface1};
  border-radius: 0 0 24px 24px;
  align-items: center;
`

const Title = styled(H2)`
  text-align: center;
  line-height: 30px;
  font-weight: 700;

  * {
    font-family: Montserrat, sans-serif;
    font-weight: 700;
  }

  @media (max-height: 668px) {
    font-size: 28px;
  }
`
const shrinkAndFade = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
`
const Center = styled(Box)<{ transition?: boolean }>`
  width: unset;
  pointer-events: none;
  align-items: center;
  gap: 24px;

  @media (max-height: 800px) {
    gap: 16px;
  }
  ${({ transition }) =>
    transition &&
    css`
      animation: ${shrinkAndFade} 1s ease-in-out forwards;
    `};
`

const ButtonsWrapper = styled.div`
  pointer-events: auto;
  position: relative;
  display: flex;
  align-items: center;
  max-width: 300px;
  flex-direction: column;
  gap: 16px;
`

const TelegramButton = styled(ButtonPrimary)`
  border: 1px solid ${({ theme }) => theme.white};
  background: transparent;
  text-transform: uppercase;
  font-size: 15px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.white};
    background: transparent;
  }
  &:active {
    border: 1px solid ${({ theme }) => theme.white};
    background: transparent;
  }
  &:disabled {
    border: 1px solid ${({ theme }) => theme.white};
    background: transparent;
  }
`

interface HeroProps {
  scrollToRef: () => void
  transition?: boolean
}

export function Hero({ scrollToRef, transition }: HeroProps) {
  const { height: scrollPosition } = useScroll()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const translateY = -scrollPosition / 7
  const opacityY = 1 - scrollPosition / 1000

  const handleExchange = () => {
    navigate('/buy')
  }

  const handleTelegram = () => {
    window.open('https://t.me/KeyTrustBot', '_blank')
  }

  return (
    <Container
      position="relative"
      height="100vh"
      justify="center"
      style={{ transform: `translate(0px, ${translateY}px)`, opacity: opacityY }}
    >
      <TokenCloud transition={transition} />
      <Center
        direction="column"
        align="center"
        transition={transition}
        style={{ transform: `translate(0px, ${translateY - 100}px)`, opacity: opacityY }}
      >
        <RiseIn delay={0.1}>
          <ButtonsWrapper>
            <LogoBig />
            <Box
              maxWidth="920px"
              direction="column"
              align="center"
              style={{ pointerEvents: 'none' }}
              marginBottom="30px"
            >
              <Title>{t('hero.swap.title')}</Title>
            </Box>

            <ButtonPrimary
              onClick={handleExchange}
              style={{
                textTransform: 'uppercase',
                fontSize: 15,
              }}
            >
              {t('common.launchExchange')}
            </ButtonPrimary>
            <TelegramButton onClick={handleTelegram}>{t('common.openInTelegram')}</TelegramButton>
          </ButtonsWrapper>
        </RiseIn>
      </Center>
      <LearnMoreContainer
        position="absolute"
        width="100%"
        align="center"
        justify="center"
        pointerEvents="none"
        style={{ transform: `translate(0px, ${translateY}px)`, opacity: opacityY }}
      >
        <RiseIn delay={0.3}>
          <Box
            direction="column"
            align="center"
            justify="flex-start"
            onClick={() => scrollToRef()}
            style={{ cursor: 'pointer' }}
            width="500px"
          >
            <Hover>
              <ColumnCenter>
                <Text variant="body2">
                  <Trans i18nKey="hero.scroll" />
                </Text>
                <ChevronDown />
              </ColumnCenter>
            </Hover>
          </Box>
        </RiseIn>
      </LearnMoreContainer>
    </Container>
  )
}
