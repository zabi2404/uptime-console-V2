import { RouterProvider } from "react-router-dom"
import router from "./Router"
import { NavbarProvider } from "./context/NavbarContext"
import { ModalProvider } from "./context/ModalContext"
import { ToastContainer } from "react-toastify"
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {


  return (
    <>
      <NavbarProvider>
        <ModalProvider>
          <Provider store={store}>
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
          </Provider>
        </ModalProvider>
      </NavbarProvider>
    </>
  )
}

export default App;
