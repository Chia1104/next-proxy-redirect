export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>code: {searchParams.code}</p>
      <p>state: {searchParams.state}</p>
      <p>id_token: {searchParams.id_token}</p>
    </main>
  );
}
