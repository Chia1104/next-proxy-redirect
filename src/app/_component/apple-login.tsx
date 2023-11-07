"use client";

import { useFormStatus } from "react-dom";
import submit from "./redirect.action";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      className="rounded bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800"
      disabled={pending}
      type="submit">
      Apple Login via Server Action
    </button>
  );
}

const AppleLogin = () => {
  return (
    <form method="post" action={submit}>
      <input type="hidden" name="state" value="state" />
      <input type="hidden" name="code" value="code" />
      <input type="hidden" name="id_token" value="id_token" />
      <Submit />
    </form>
  );
};

export default AppleLogin;
