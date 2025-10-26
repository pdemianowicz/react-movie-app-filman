import useGenres from "./useGenres";
import { tmdbFetch } from "../utils/tmdbApi";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("../utils/tmdbApi", () => ({
  tmdbFetch: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe("useGenres", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch data successfully and return processed genres", async () => {
    const mockApiResponse = {
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "Comedy" },
      ],
    };

    // @ts-expect-error: Mocking the tmdbFetch function
    (tmdbFetch as vi.Mock).mockResolvedValueOnce(mockApiResponse);

    const { result } = renderHook(() => useGenres("movie"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([
      { id: 1, name: "Action" },
      { id: 2, name: "Comedy" },
    ]);
  });

  it("should handle API errors", async () => {
    const mockError = new Error("API Error");

    // @ts-expect-error: Mocking the tmdbFetch function
    (tmdbFetch as vi.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useGenres("tv"), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(mockError);
  });
});
