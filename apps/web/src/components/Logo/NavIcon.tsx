import { SVGProps } from 'components/Logo/UniIcon'
import { Logo } from 'pages/Landing/components/Icons'
import styled from 'styled-components'

const Container = styled.div<{ clickable?: boolean }>`
  position: relative;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
`

type NavIconProps = SVGProps & {
  clickable?: boolean
  onClick?: () => void
}

export const NavIcon = ({ clickable, onClick }: NavIconProps) => (
  <Container clickable={clickable}>
    <Logo onClick={onClick} cursor="pointer" />
  </Container>
)
