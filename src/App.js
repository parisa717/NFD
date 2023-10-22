
import { AuthProvider } from './context/authContext'
import Router from './Router/Router'


function App() {

  return (
    <div>
      <AuthProvider>
<Router/>
</AuthProvider>
    </div>
  )
}

export default App
