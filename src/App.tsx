import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ThemeToggle from './components/rachanaUI/theme/ThemeToggle'
import Button from './components/rachanaUI/ui/Button'
import Spinner from './components/rachanaUI/ui/Spinner'
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
        <Button loading={true}  size={'md'} onClick={()=>handleClick()}>Button </Button>
        <ThemeToggle />
      </div>
    </>
  )
}

export default App
