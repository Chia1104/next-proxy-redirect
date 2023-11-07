"use client";

import { useMutation } from "@tanstack/react-query";
import { type HTTPError, post } from "@/utils/request";
import { toast } from "sonner";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import submit from "./redirect.action";

const appleFormPostRequestSchema = z.object({
  state: z.string(),
  code: z.string(),
  id_token: z.string(),
});

type AppleFormPostRequest = z.infer<typeof appleFormPostRequestSchema>;

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      className="rounded bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
      disabled={pending}
      type="submit">
      Apple Login
    </button>
  );
}

const AppleLogin = () => {
  // const { mutate, isPending } = useMutation<
  //   void,
  //   HTTPError,
  //   AppleFormPostRequest
  // >({
  //   mutationFn: (data) => post("/api/apple-proxy", data),
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  //   onSuccess: () => {
  //     toast.success("Success");
  //   },
  // });

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
