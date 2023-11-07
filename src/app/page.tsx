import AppleLogin from "./_component/apple-login";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppleLogin />
    </main>
  );
}
