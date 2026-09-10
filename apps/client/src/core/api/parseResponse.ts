type ApiErrorResponse = {
  ok?: boolean;
  error?: string;
};

export async function parseApiResponse<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & ApiErrorResponse;

  if (!response.ok || data.ok === false) {
    throw new Error(data.error ?? "Erro na requisicao.");
  }

  return data;
}
