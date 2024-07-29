import Row from 'components/Row'
import { useScreenSize } from 'hooks/screenSize'
import { Trans } from 'i18n'
import { Body1, Box, H3 } from 'pages/Landing/components/Generics'
import { Telegram, Twitter } from 'pages/Landing/components/Icons'
import { Wiggle } from 'pages/Landing/components/animations'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { ExternalLink } from 'theme/components'

const SocialIcon = styled(Wiggle)`
  flex: 0;
  fill: ${(props) => props.theme.neutral1};
  cursor: pointer;
  transition: fill;
  transition-duration: 0.2s;
  &:hover {
    fill: ${(props) => props.$hoverColor};
  }
`
const RowToCol = styled(Box)`
  height: auto;
  flex-shrink: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const HideWhenSmall = styled(Box)`
  @media (max-width: 768px) {
    display: none;
  }
`
const HideWhenLarge = styled(Box)`
  @media (min-width: 768px) {
    display: none;
  }
`
const MenuItemStyles = css`
  padding: 0;
  margin: 0;
  text-align: left;
  font-family: Basel;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: ${({ theme }) => theme.neutral2};
  stroke: none;
  transition: color 0.1s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.neutral1};
    opacity: 1;
  }
`
const StyledInternalLink = styled(Link)`
  ${MenuItemStyles}
`
const StyledExternalLink = styled(ExternalLink)`
  ${MenuItemStyles}
`

export function Socials({ iconSize }: { iconSize?: string }) {
  return (
    <Row gap="24px" maxHeight={iconSize} align="flex-start">
      <SocialIcon $hoverColor="#20BAFF">
        <StyledExternalLink href="https://twitter.com/Uniswap">
          <Twitter size={iconSize} fill="inherit" />
        </StyledExternalLink>
      </SocialIcon>
      <SocialIcon $hoverColor="#20BAFF">
        <StyledExternalLink href="https://t.me">
          <Telegram size={iconSize} fill="inherit" />
        </StyledExternalLink>
      </SocialIcon>
    </Row>
  )
}

export function Footer() {
  const screenIsLarge = useScreenSize()['lg']

  return (
    <Box as="footer" direction="column" align="center" padding={screenIsLarge ? '0 40px' : '0 48px'}>
      <Box direction="row" maxWidth="1280px" gap="24px">
        <RowToCol direction="row" justify-content="space-between" gap="32px">
          <Box direction="column" height="100%" gap="64px">
            <Box direction="column" gap="10px">
              <H3>© 2024</H3>
              <H3>KeyTrust Ecosystem</H3>
            </Box>
            <HideWhenSmall>
              <Socials />
            </HideWhenSmall>
          </Box>
          <Box direction="row" gap="16px">
            <Box direction="column" gap="10px">
              <Body1>App</Body1>
              <StyledInternalLink to="/swap">
                <Trans i18nKey="common.swap" />
              </StyledInternalLink>
              <StyledInternalLink to="/tokens/ethereum">
                <Trans i18nKey="common.tokens" />
              </StyledInternalLink>
            </Box>
            <Box direction="column" gap="10px">
              <Body1>
                <Trans i18nKey="common.ecosystem" />
              </Body1>
              <StyledExternalLink href="https://uniswap.org/developers">
                <Trans i18nKey="common.developers" />
              </StyledExternalLink>
            </Box>
            <Box direction="column" gap="10px">
              <Body1>
                <Trans i18nKey="common.needHelp" />
              </Body1>
              <StyledExternalLink href="https://support.uniswap.org/hc/en-us/requests/new">
                <Trans i18nKey="common.contactUs.button" />
              </StyledExternalLink>
              <StyledExternalLink href="https://support.uniswap.org/hc/en-us">
                <Trans i18nKey="common.helpCenter" />
              </StyledExternalLink>
            </Box>
          </Box>
          <HideWhenLarge>
            <Socials />
          </HideWhenLarge>
        </RowToCol>
      </Box>
    </Box>
  )
}
