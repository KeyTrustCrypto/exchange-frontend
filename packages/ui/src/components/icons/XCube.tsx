import { Path, Svg } from 'react-native-svg'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { createIcon } from '../factories/createIcon'

export const [XCube, AnimatedXCube] = createIcon({
  name: 'XCube',
  getIcon: (props) => (
    <Svg width="45" height="32" viewBox="0 0 45 32" fill="none" {...props}><Path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 32L22.5 22.1538L12.5 32H0L16.25 16L0 0H12.5L22.5 9.84612L28.75 16L45 32H32.5ZM39 0H26V12.8H39V0Z" fill="white"></Path></Svg>
  ),
})
