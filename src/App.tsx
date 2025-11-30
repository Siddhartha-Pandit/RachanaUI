import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ThemeToggle from './components/rachanaUI/theme/ThemeToggle'
import Button from './components/rachanaUI/ui/Button'
import Spinner from './components/rachanaUI/ui/Spinner'
import Resizable from './components/rachanaUI/ui/Resizable'
function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const handleClick=()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },20000);
  }
  return (
    <>
      <div style={{margin:'10px'}}>
        <Spinner variant={'primary'}/>
        <Resizable disabledHandles={{left:false, right:false,top:false, bottom:false,"top-left":false,"top-right":false,"bottom-left":false,"bottom-right":false}}>
          <div style={{padding:20}}>
            <h3>Resizable Box</h3>
            <p>Please drag any edge or conrner to resize me.</p>
          </div>
        </Resizable>
        <Button loading={true}  size={'md'} onClick={()=>handleClick()}>This is button </Button>
        <ThemeToggle />
      </div>
    </>
  )
}

export default App
