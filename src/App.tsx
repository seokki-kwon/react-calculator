import { useState } from 'react'
import Calculator from './components/calculator/Calculator';
import StackViewer from './components/StackViewer';
import DescriptionPanel from './components/DescriptionPanel';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
       <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto flex h-[90vh] max-w-7xl gap-6">
    
        <section className="flex flex-1 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Calculator />
        </section>

        <section className="flex flex-1 flex-col gap-6">
          <div className="flex-2 rounded-2xl bg-white shadow-sm">
            <StackViewer />
          </div>

          <div className="flex-1 rounded-2xl bg-white shadow-sm">
            <DescriptionPanel />
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
