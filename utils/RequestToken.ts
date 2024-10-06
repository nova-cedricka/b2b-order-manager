import jwt from "jsonwebtoken";

export const RequestToken = {
  getData: (
    request: Request,
  ): {
    error?: {
      message: string;
      status: number;
    };
    success?: {
      message: string;
      data: jwt.JwtPayload;
    };
  } => {
    const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;

    const getTokenError = (message: string) => {
      return {
        error: { message: message, status: 401 },
      };
    };

    if (!SHOPIFY_API_SECRET) {
      return getTokenError("ENV variable SHOPIFY_API_SECRET is missing");
    }

    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return getTokenError("Unauthorized");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decodedToken = jwt.verify(token, SHOPIFY_API_SECRET);

      if (
        typeof decodedToken !== "string" &&
        decodedToken &&
        decodedToken.dest &&
        decodedToken.exp
      ) {
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          return getTokenError("Token expired");
        }

        return {
          success: { message: "Session token valid", data: decodedToken },
        };
      }

      return getTokenError("Invalid token");
    } catch (error) {
      return getTokenError("Invalid session token");
    }
  },
} as const;
