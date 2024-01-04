import { Stack, Redirect } from 'expo-router';
import { useAuthentication } from '../../hooks/useAuthentication';

export default function AuthLayout() {
  const { user, isLoading } = useAuthentication();

  if (user && !isLoading) {
    return <Redirect href="/" />;
  }
  return <Stack>
    <Stack.Screen name="signup" options={{ title: 'Sign Up', headerShown: false }} />
    <Stack.Screen name="signin" options={{ title: 'Sign In' }} />
  </Stack>
}