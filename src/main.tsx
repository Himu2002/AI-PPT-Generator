import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Workspace from './workspace/index.tsx'
import Outline from './workspace/project/outline/index.tsx'
import { ClerkProvider } from '@clerk/react'
import { UserDetailContext } from './../context/UserDetailContext.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/workspace",
    element: <Workspace />,
    children: [
      {
        path: "project/:projectId/outline",
        element: <Outline />,
      }
    ]

  }
]);

function Root() {
  const [userDetails, setUserDetails] = useState();
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <UserDetailContext.Provider value={[userDetails, setUserDetails]}>
        <RouterProvider router={router} />
      </UserDetailContext.Provider>
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
