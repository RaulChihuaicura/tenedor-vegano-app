import * as firebase from "firebase";

export function reauthenticate(password) {
  const user = firebase.auth().currentUser; //obtenemos el usuario actual
  //obtenemos las credenciales del usuario
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateWithCredential(credentials);
}
