import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import Footer from "../../components/footer/Footer";
import RegisterForm from "../../components/Register/RegisterForm";
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}
