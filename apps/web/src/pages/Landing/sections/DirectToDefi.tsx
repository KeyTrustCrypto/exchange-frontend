import { Trans } from 'i18n'
import { Box, H2, H3 } from 'pages/Landing/components/Generics'
import { CasinoCard } from 'pages/Landing/components/cards/CasinoCard'
import { DAOCard } from 'pages/Landing/components/cards/DAOCard'
import { TokenCard } from 'pages/Landing/components/cards/TokenCard'
import { VirtualCard } from 'pages/Landing/components/cards/VirtualCard'
import { WebappCard } from 'pages/Landing/components/cards/WebappCard'
import { XcubeCard } from 'pages/Landing/components/cards/XcudeCard'
import styled from 'styled-components'

const SectionLayout = styled.div`
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
const RowToCol = styled(Box)`
  height: auto;
  flex-shrink: 1;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const SectionCol = styled(Box)`
  flex-direction: column;
  max-width: 1280px;
  gap: 32px;
  @media (max-width: 768px) {
    gap: 24px;
  }
`

const Title = styled(H2)`
  width: 100%;
  text-align: center;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 50px;
`
export function DirectToDefi() {
  return (
    <SectionLayout>
      <SectionCol direction="column" gap="40px" maxWidth="1280px">
        <Title>
          <Trans i18nKey="landing.exploreOurProducts" />
        </Title>
        <Box direction="column" gap="16px" marginBottom="50px">
          <RowToCol direction="row" gap="16px">
            <WebappCard />
            <VirtualCard />
          </RowToCol>
        </Box>
        <RowToCol direction="row" gap="16px">
          <H3>Entertainment</H3>
        </RowToCol>
        <Row>
          <CasinoCard />
          <XcubeCard />
        </Row>
        <RowToCol direction="row" gap="16px">
          <H3>Upcoming products</H3>
        </RowToCol>
        <Row>
          <TokenCard />
          <DAOCard />
        </Row>
      </SectionCol>
    </SectionLayout>
  )
}
