import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const MaxWidthWrapper = styled(Box)(() => ({
  height: '100vh',
  maxWidth: '1280px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid black',
  margin: '0 auto'
}))

const MaxWidth = ({children}) => {
  return (
    <MaxWidthWrapper>
      {children}
    </MaxWidthWrapper>
  )
}

export default MaxWidth
