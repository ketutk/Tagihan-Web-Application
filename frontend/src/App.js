import Login from "./components/login";
import Daftar from "./components/daftar";

import ForgotPass from "./components/forgotpass";
import ResetPassword from "./components/resetpassword";

import Main from "./components/MainFrame/main";
import Template from "./components/MainFrame/template";
import Tagihan from "./components/SubFrame/tagihan";
import Dashboard from "./components/SubFrame/dashboard";
import Newbook from "./components/SubFrame/newbook";
import Listbook from "./components/SubFrame/listbook";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main page={Dashboard} />} />
        <Route path="/newbook" element={<Main page={Newbook} />} />
        <Route path="/listbook" element={<Main page={Listbook} />} />
        <Route path="/tagihan/:bookid" element={<Template page={Tagihan} prev="listbook" />} />
      </Routes>
    </div>
  );
}

export default App;
