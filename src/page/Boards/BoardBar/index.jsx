import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      background: 'primary.main',
      height: (theme) => theme.trello.BoardBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    }}>
      boardbar
    </Box>
  )
}

export default BoardBar