import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'

function AppBar() {
  return (
    <Box sx={{
      background: 'primary.light',
      height: (theme) => theme.trello.AppBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      <ModeSelect />
    </Box>
  )
}

export default AppBar