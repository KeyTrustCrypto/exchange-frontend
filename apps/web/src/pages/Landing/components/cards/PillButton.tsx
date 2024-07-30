import { motion, MotionProps } from 'framer-motion'
import { Box } from 'pages/Landing/components/Generics'
import { ArrowRight } from 'pages/Landing/components/Icons'
import styled from 'styled-components'
import { colors } from 'theme/colors'
import { opacify } from 'theme/utils'

const Button = styled(motion.button)<{ cursor?: string; bg?: string }>`
  display: flex;
  padding: 10px 16px;
  border-radius: 24px;
  gap: 8px;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: ${({ bg }) => bg || opacify(10, colors.gray650)};
  overflow: hidden;
  cursor: ${({ cursor }) => cursor ?? 'pointer'};
  flex: none;
`
const Slider = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`
const Label = styled.span`
  color: ${(props) => props.color};
  font-family: Basel, Space, sans-serif;
  font-size: 20px;
  @media (max-width: 1024px) {
    font-size: 18px;
  }
  font-style: normal;
  font-weight: 535;
  line-height: 24px; /* 120% */
  flex: none;
`
type OpacityProps = {
  opacity: number
}
const Opacity = styled(motion.div)<OpacityProps & MotionProps>`
  flex: 0;
  display: flex;
  overflow: visible;
  opacity: ${(props) => props.opacity};
`

type PillButtonProps = {
  label: string
  icon: React.ReactNode
  color?: string
  bg?: string
  cursor?: string
  onClick?: () => void
}

export function PillButton(props: PillButtonProps) {
  const { color = colors.white } = props
  const variants = {
    intial: {
      x: 0,
    },
    hover: {
      x: -24,
    },
  }
  const icnVars = {
    intial: {
      opacity: 1,
    },
    hover: {
      opacity: 0,
    },
  }

  const arrowVars = {
    intial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
    },
  }

  return (
    <Button transition={{ delayChildren: 0 }} bg={props.bg} cursor={props.cursor}>
      <Slider variants={variants}>
        <Opacity opacity={1} variants={icnVars}>
          {props.icon}
        </Opacity>
        <Label color={color}>{props.label}</Label>
        <Opacity opacity={0} variants={arrowVars}>
          <Box width="0px" overflow="visible">
            <ArrowRight size="24px" fill={color} />
          </Box>
        </Opacity>
      </Slider>
    </Button>
  )
}
