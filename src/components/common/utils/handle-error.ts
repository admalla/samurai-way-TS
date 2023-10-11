import axios from "axios";

export const handleError = (e: unknown) => {
  let errorMessage = "";
  if (axios.isAxiosError<ErrorMessage>(e)) {
    errorMessage = e.response
      ? e.response.data.errorMessages[0].message
      : e.message;
  } else {
    errorMessage = (e as Error).message;
  }
  return errorMessage;
};

type ErrorMessage = {
  errorMessages: Array<{
    message: string;
    field: string;
  }>;
};
