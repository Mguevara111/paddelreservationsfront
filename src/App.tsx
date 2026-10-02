import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { Login } from "./components/login"
import { Newreservation } from "./components/newreservation"
import { Reservations } from "./components/reservations"
import { Layout } from "./components/layout"
import { E404 } from "./components/e404"
import { Advice } from "./components/advice"

function App() {
  

  return (
    <>
      <Advice></Advice>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/reservations" element={<Layout></Layout>}>
          <Route index element={<Reservations></Reservations>}></Route>
          <Route path="/reservations/newreservation" element={<Newreservation></Newreservation>}></Route>
        </Route>
        <Route path="*" element={<E404></E404>}></Route>
      </Routes>
    </>
  )
}

export default App
