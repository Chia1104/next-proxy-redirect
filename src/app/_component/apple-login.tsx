"use client";

import { useMutation } from "@tanstack/react-query";
import { type HTTPError, post } from "@/utils/request";
import { toast } from "sonner";
import { z } from "zod";

const appleFormPostRequestSchema = z.object({
  state: z.string(),
  code: z.string(),
  id_token: z.string(),
});

type AppleFormPostRequest = z.infer<typeof appleFormPostRequestSchema>;

const AppleLogin = () => {
  const { mutate, isPending } = useMutation<
    void,
    HTTPError,
    AppleFormPostRequest
  >({
    mutationFn: (data) => post("/api/apple-proxy", data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Success");
    },
  });

  return (
    <button
      className="rounded bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
      disabled={isPending}
      onClick={() => {
        mutate({
          state: "state",
          code: "code",
          id_token: "id_token",
        });
      }}>
      Apple Login
    </button>
  );
};

export default AppleLogin;
