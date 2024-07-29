import { approvedERC20, approvedERC721, InteractiveProject, InteractiveToken } from 'pages/Landing/assets/approvedTokens'
import { Token } from 'pages/Landing/components/TokenCloud/Token'
import { mixArrays, randomFloat, randomInt } from 'pages/Landing/components/TokenCloud/utils'
import { XCube } from 'ui/src/components/icons'
import PoissonDiskSampling from 'poisson-disk-sampling'
import { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  top: 0;
`
const Inner = styled.div`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  position: relative;
  overflow: visible;
`
export enum TickerPosition {
  RIGHT,
  LEFT,
}
export type TokenPoint = InteractiveToken & {
  x: number
  y: number
  blur: number
  size: number
  color: string
  logoUrl: string
  opacity: number
  rotation: number
  delay: number
  floatDuration: number
  ticker: string
  tickerPosition: TickerPosition
}
export type ProjectPoint = InteractiveProject & {
  x: number
  y: number
  blur: number
  size: number
  color: string
  logoUrl: string
  opacity: number
  rotation: number
  delay: number
  floatDuration: number
  description: string
  ticker: string
  tickerPosition: TickerPosition
}

export function TokenCloud({ transition }: { transition?: boolean }) {
  const pts = useMemo(() => {
    // const tokenList: InteractiveToken[] = mixArrays(approvedERC20, approvedERC721, 0.33)
    // console.log('token list', tokenList)
    const projectList: InteractiveProject[] = [
      {
        "name": "XCube",
        "symbol": "XCube",
        "url": "https://xcube.club",
        "color": "#2775CA",
        "description": "Best NFT collection ever",
        "logoUrl": "https://pbs.twimg.com/profile_images/1750420558318329856/bf-LoyZr_400x400.jpg"
      },
    ]

    const w = window.innerWidth
    const h = window.innerHeight - 72
    const leftThreshold = w / 2 - 240
    const rightThreshold = w / 2 + 240
    const poissonConfig = {
      shape: [w, h],
      minDistance: 250,
      maxDistance: 375,
      tries: 10,
    }
    const poissonDiskSampling = new PoissonDiskSampling(poissonConfig)
    const points = poissonDiskSampling
      .fill()
      // Order by distance from center, ie idx = 0 is closest to center
      .sort((a, b) => Math.abs(a[0] - w / 2) - Math.abs(b[0] - w / 2))
      .map(([x, y], idx: number) => {
        const project: InteractiveProject = projectList[idx % projectList.length]
        const size = randomInt(50, 96)
        return {
          x,
          y,
          blur: (1 / size) * 500 * ((x > leftThreshold && x < rightThreshold) || y < 100 ? 5 : 1), // make blur bigger for smaller icons
          size,
          color: project.color,
          logoUrl: project.logoUrl,
          opacity: randomFloat(0.5, 1.0) * ((x > leftThreshold && x < rightThreshold) || y < 100 ? 0.75 : 1),
          rotation: randomInt(-20, 20),
          delay: Math.abs(x - w / 2) / 800,
          floatDuration: randomFloat(3, 6),
          ticker: project.symbol,
          tickerPosition:
            (x < leftThreshold && x + 100 > leftThreshold) || x + 200 > w ? TickerPosition.LEFT : TickerPosition.RIGHT,
          // standard: token.standard,
          description: project.description,
          url: project.url
          // address: token.address,
          // chain: token.chain,
        }
      })
      .map((p) => {
        return {
          ...p,
          y: p.y - 0.5 * p.size,
          x: p.x - 0.5 * p.size,
        }
      })

    return points as ProjectPoint[]
  }, [])

  const constraintsRef = useRef(null)
  const [cursor, setCursor] = useState(-1)

  return (
    <Container ref={constraintsRef}>
      <Inner>
        {pts.map((point: ProjectPoint, idx) => {
          return (
            <Token
              key={`token-${idx}`}
              point={point}
              idx={idx}
              cursor={cursor}
              setCursor={setCursor}
              transition={transition}
            />
          )
        })}
      </Inner>
    </Container>
  )
}
