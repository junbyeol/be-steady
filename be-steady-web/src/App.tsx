import ProjectPage from './page/Project'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './hooks/queryClient'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectPage projectId="000000" />
    </QueryClientProvider>
  )
};

export default App
