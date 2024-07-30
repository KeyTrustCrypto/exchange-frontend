import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 76px;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 48px;
  }
  @media (max-width: 468px) {
    padding: 0 24px;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.accent1};
`

const Description = styled.div`
  font-size: 20px;
`

export function Stats() {
  return (
    <Container>
      <Card title="180" subtitle="Countries" />
      <Card title="50+" subtitle="Crypto assets" />
      <Card title="$6B+" subtitle="Crypto delivered" />
      <Card title="20M+" subtitle="Accounts created" />
    </Container>
  )
}

function Card(props: { title: string; subtitle: string }) {
  const { title, subtitle } = props

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{subtitle}</Description>
    </Wrapper>
  )
}
