import { Button, Text, TextInput } from "react-native-paper"
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConfig"
import * as React from "react"

const Login = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  return <>
    <Text>Sign up</Text>
    <TextInput
      placeholder="Email"
      autoCapitalize="none"
      textContentType="emailAddress"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
    />

    <TextInput
      placeholder="Password"
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={true}
      textContentType="password"
      value={password}
      onChangeText={setPassword}
    />

    <TextInput
      placeholder="Confirm password"
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={true}
      textContentType="password"
      value={confirmPassword}
      onChangeText={setConfirmPassword}
    />

    <Button mode="contained" onPress={() => {
      if (password !== confirmPassword) {
        // TODO
        alert("Passwords do not match")
        return
      }

      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user
        }).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          // TODO
        })
    }}>
      Sign up
    </Button>
  </>
}

export { Login }