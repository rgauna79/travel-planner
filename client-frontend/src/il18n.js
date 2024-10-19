import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Welcome: "Welcome",
        Login: "Login",
        Register: "Register",
      },
    },
    es: {
      translation: {
        Welcome: "Bienvenido",
        Login: "Iniciar sesión",
        Register: "Registrarse",
      },
    },
  },
  lng: "en", // idioma por defecto
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
