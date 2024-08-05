import { motion } from 'framer-motion'
import { t, Trans } from 'i18n'
import { PillButton } from 'pages/Landing/components/cards/PillButton'
import { Box, H2, H3 } from 'pages/Landing/components/Generics'
import { Token } from 'pages/Landing/components/Icons'
import styled, { css, useTheme } from 'styled-components'
import { opacify } from 'theme/utils'

const SectionLayout = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40px;
  @media (max-width: 768px) {
    padding: 0 48px;
  }
  @media (max-width: 468px) {
    padding: 0 24px;
  }
`
const Layout = styled.div`
  width: 100%;
  max-width: 1280px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
const SectionCol = styled(Box)`
  flex-direction: column;
  max-width: 1328px;
  gap: 24px;
  @media (max-width: 768px) {
    gap: 24px;
  }
`

const CardStyles = css<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  height: 250px;
  border-radius: 20px;
  padding: 32px 28px;
  overflow: hidden;
  text-decoration: none;
  background-color: ${(props) => props.backgroundColor || props.theme.surface2};
  @media (max-width: 1024px) {
    gap: 16px;
    padding: 24px;
  }
  @media (max-width: 768px) {
    gap: 16px;
    padding: 24px;
  }
`

const LinkCard = styled.a<{
  backgroundColor?: string
}>`
  ${CardStyles}
`
const Card = styled.div<{
  backgroundColor?: string
}>`
  ${CardStyles}
`
const SquareLinkCard = motion(styled(LinkCard)``)
const SquareCard = motion(styled(Card)``)
const Title = styled(H2)`
  width: 100%;
  text-align: center;
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

export function NewsletterEtc() {
  const theme = useTheme()

  return (
    <SectionLayout>
      <Box direction="row" maxWidth="1328px" gap="24px" width="100%">
        <SectionCol justify-content="space-between" height="100%">
          <Title>
            <Trans i18nKey="landing.connectWithUs" />
          </Title>
          <Layout>
            <SquareLinkCard
              initial="initial"
              whileHover="hover"
              href="https://t.me/keytrust_support"
              target="_blank"
              rel="noopener noreferrer"
              backgroundColor={opacify(5, theme.white)}
            >
              <PillButton icon={<Token />} label={t('common.helpCenter')} />
              <H3>
                <Trans i18nKey="common.getSupport.button" />
              </H3>
            </SquareLinkCard>
            <SquareLinkCard
              initial="initial"
              whileHover="hover"
              href="https://t.me/keytrust_support"
              target="_blank"
              rel="noopener noreferrer"
              backgroundColor={opacify(5, theme.white)}
            >
              <PillButton icon={<Token />} label={t('common.blog')} />
              <H3>
                <Trans i18nKey="landing.teamInsights" />
              </H3>
            </SquareLinkCard>
            <SquareCard backgroundColor={opacify(5, theme.white)} initial="initial" whileHover="hover">
              <PillButton icon={<Token />} label={t('common.followUs')} />
              <H3>
                <Link href="https://t.me/keytrust_one" target="_blank">
                  Telegram
                </Link>{' '}
                and{' '}
                <Link href="https://x.com/keytrust_one" target="_blank">
                  X.com
                </Link>
              </H3>
            </SquareCard>
          </Layout>
        </SectionCol>
      </Box>
    </SectionLayout>
  )
}
