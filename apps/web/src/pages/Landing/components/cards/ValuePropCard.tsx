import { motion } from 'framer-motion'
import { Box, BoxProps, H3 } from 'pages/Landing/components/Generics'
import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { colors } from 'theme/colors'
import { opacify } from 'theme/utils'

type ValuePropCardProps = {
  backgroundColor?: string
  textColor?: string
  height?: string
  minHeight?: string
  tagText?: string
  titleText?: string
  titleWidth?: string
  alignTextToBottom?: boolean
  children?: React.ReactNode
  button?: React.ReactNode
  href?: string
  to?: string
}

const Container = motion(styled(Box)<ValuePropCardProps & BoxProps>`
  position: relative;
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height || '609px'};
  background: ${(props) => props.backgroundColor};
  overflow: hidden;
  text-decoration: none;
  @media (max-width: 1024px) {
    height: ${(props) => props.height || '516px'};
    min-height: ${(props) => props.minHeight || '240px'};
  }
  @media (max-width: 768px) {
    height: auto;
    min-height: ${(props) => props.minHeight || '240px'};
  }
`)

const Inner = styled.div<{ alignTextToBottom?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${({ alignTextToBottom }) =>
    alignTextToBottom
      ? css`
          height: 100%;
          justify-content: space-between;
        `
      : 'height: unset;'}
  z-index: 5;
  gap: 24px;
  padding: 32px;
  @media (max-width: 1024px) {
    gap: 16px;
    padding: 24px;
  }
  @media (max-width: 396px) {
    padding: 20px;
  }
`
const Title = styled(H3)`
  color: ${(props) => props.color};
  font-family: Basel, Space, sans-serif;
  white-space: pre-line;
  text-wrap: pretty;
  @media (max-width: 1024px) {
    font-size: 28px;
    line-height: 32px;
  }
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
`
export default function ValuePropCard(props: ValuePropCardProps & BoxProps) {
  const {
    backgroundColor = opacify(5, colors.white),
    height,
    textColor = colors.white,
    minHeight,
    alignTextToBottom,
    href,
    to,
  } = props
  const navigate = useNavigate()
  const handleClick = () => {
    if (to) {
      navigate(to)
    }
  }
  return (
    <Container
      initial="initial"
      whileHover="hover"
      backgroundColor={backgroundColor}
      height={height}
      minHeight={minHeight}
      as="a"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={handleClick}
      {...props}
    >
      <Inner alignTextToBottom={alignTextToBottom}>
        {props.button}
        <Title color={textColor}>{props.titleText}</Title>
      </Inner>
      {props.children}
    </Container>
  )
}
