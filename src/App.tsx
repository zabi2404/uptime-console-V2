import { RouterProvider } from "react-router-dom"
import router from "./Router"
import { NavbarProvider } from "./context/NavbarContext"
import { ModalProvider } from "./context/ModalContext"
import { ToastContainer } from "react-toastify"


function App() {


  return (
    <>
      <NavbarProvider>
        <ModalProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
          <RouterProvider router={router} />
        </ModalProvider>
      </NavbarProvider>
    </>
  )
}

export default App;
