import { toast } from "react-toastify";

export default function AlertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      toast.warning("La Contraseña es invalida.");
      break;
    case "auth/email-already-in-use":
      toast.error("El correo ingresado ya esta registrado");
      break;

    default:
      toast.warning("Error del servidor, intentelo mas tarde.");
      break;
  }
}
