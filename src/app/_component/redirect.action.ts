"use server";

import { redirect } from "next/navigation";
import setSearchParams from "@/utils/set-search-params";

export default async function submit(formData: FormData) {
  redirect(
    setSearchParams(
      {
        state: formData.get("state")?.toString(),
        code: formData.get("code")?.toString(),
        id_token: formData.get("id_token")?.toString(),
      },
      {
        baseUrl: "/callback/apple",
      }
    )
  );
}
