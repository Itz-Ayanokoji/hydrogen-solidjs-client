import { createStore } from "solid-js/store";
import axios from "axios";
export default function useLogin() {
  const [form, setForm] = createStore({
    fields: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
    hasError: false,

    serverError: "",
  });

  const handleInput = (ev) => {
    setForm("hasError", false);
    setForm("serverError", "");
    setForm("errors", [ev.currentTarget.name], "");
    setForm("fields", [ev.currentTarget.name], ev.currentTarget.value);
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();
    if (form.fields.email.trim().length === 0) {
      setForm("errors", "email", "Email must not be empty");
      setForm("hasError", true);
    }
    if (form.fields.password.trim().length === 0) {
      setForm("errors", "password", "Password must not be empty");
      setForm("hasError", true);
    }

    if (form.hasError) {
      return;
    }
    try {
      const { data } = await axios.post("/auth/login", form.fields);
      console.log(data);
    } catch (error) {
      console.log(error);
      setForm("serverError", error.response.data.message);
    }
  };
  return {
    form,
    handleLogin,
    handleInput,
  };
}
