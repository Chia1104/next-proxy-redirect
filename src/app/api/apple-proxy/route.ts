import { type NextRequest, NextResponse } from "next/server";
import { errorGenerator } from "@/server/error.helper";
import setSearchParams from "@/utils/set-search-params";
import { z } from "zod";
import handleZodError from "@/utils/handle-zod-error";

const appleFormPostRequestSchema = z.object({
  state: z.string(),
  code: z.string(),
  id_token: z.string(),
});

type AppleFormPostRequest = z.infer<typeof appleFormPostRequestSchema>;

export const runtime = "edge";

export const POST = async (req: NextRequest) => {
  try {
    const payload: AppleFormPostRequest = await req.json();
    const { isError, issues } = handleZodError({
      data: payload,
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
            state: payload.state,
            code: payload.code,
            id_token: payload.id_token,
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
