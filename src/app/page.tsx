import AppleLogin from "./_component/apple-login";
import AppleLoginMutate from "./_component/apple-login-mutation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppleLogin />
      <AppleLoginMutate />
    </main>
  );
}
