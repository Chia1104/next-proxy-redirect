import { type NextRequest, NextResponse } from "next/server";
import { errorGenerator } from "@/server/error.helper";
import setSearchParams from "@/utils/set-search-params";
import { z } from "zod";
import handleZodError from "@/utils/handle-zod-error";

const appleFormPostRequestSchema = z.object({
  state: z.string().min(1),
  code: z.string().min(1),
  id_token: z.string().min(1),
});

type AppleFormPostRequest = z.infer<typeof appleFormPostRequestSchema>;

export const runtime = "edge";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const { isError, issues } = handleZodError<Partial<AppleFormPostRequest>>({
      data: {
        state: formData.get("state")?.toString(),
        code: formData.get("code")?.toString(),
        id_token: formData.get("id_token")?.toString(),
      },
      schema: appleFormPostRequestSchema,
    });
    if (isError) {
      return NextResponse.json(
        errorGenerator(
          400,
          issues?.map((issue) => {
            return {
              field: issue.path.join("."),
              message: issue.message,
            };
          })
        ),
        { status: 400 }
      );
    }
    return NextResponse.redirect(
      new URL(
        setSearchParams(
          {
            state: formData.get("state")?.toString(),
            code: formData.get("code")?.toString(),
            id_token: formData.get("id_token")?.toString(),
          },
          {
            baseUrl: "/callback/apple",
          }
        ),
        req.url
      )
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(errorGenerator(500), {
      status: 500,
    });
  }
};
