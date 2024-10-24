import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast';
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    <Toaster  position='bottom-center'/>
    </QueryClientProvider>
)
