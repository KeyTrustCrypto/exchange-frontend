import { Body1, H2 } from 'pages/Landing/components/Generics'
import styled from 'styled-components'
import { opacify } from 'theme/utils'

const License = styled.span`
  font-size: 16px;
  text-decoration: underline;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 0 40px;
  max-width: 1360px;

  @media (max-width: 768px) {
    padding: 0 48px;
    grid-template-columns: 1fr;
  }
  @media (max-width: 468px) {
    padding: 0 24px;
  }
`

const Card = styled.div`
  background-color: ${({ theme }) => opacify(5, theme.white)};
  border-radius: 20px;
`

export const Security = () => {
  return (
    <Wrapper>
      <Card />
      <TextWrapper>
        <H2>Security & Transparency</H2>
        <Body1>
          KeyTrust is a platform operated by a company domiciled in Italy, subject to European Union laws and
          regulations.
        </Body1>
        <License>License PSV147 issued 16/02/2024</License>
      </TextWrapper>
    </Wrapper>
  )
}
