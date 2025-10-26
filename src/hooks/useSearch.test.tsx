import useSearch from "./useSearch";
import { tmdbFetch } from "../utils/tmdbApi";
import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

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

describe("useSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not trigger a query when the search term is less than 3 characters", async () => {
    renderHook(() => useSearch("ab"), { wrapper: createWrapper() });
    expect(tmdbFetch).not.toHaveBeenCalled();
  });

  it("should triggera query after the debounce time for a valid search term", async () => {
    // @ts-expect-error: Mocking the tmdbFetch function
    (tmdbFetch as vi.Mock).mockResolvedValueOnce({ results: [] });
    renderHook(() => useSearch("The Walking Dead"), { wrapper: createWrapper() });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(tmdbFetch).toHaveBeenCalledOnce();
    expect(tmdbFetch).toHaveBeenCalledWith("/search/multi", { query: "The Walking Dead" });
  });

  it("should only trigger a query for the latest search term after rapid changes", async () => {
    // @ts-expect-error: Mocking the tmdbFetch function
    (tmdbFetch as vi.Mock).mockResolvedValueOnce({ results: [] });
    const { rerender } = renderHook(({ query }) => useSearch(query), {
      initialProps: { query: "" },
      wrapper: createWrapper(),
    });

    rerender({ query: "spi" });
    rerender({ query: "spider" });

    expect(tmdbFetch).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({ query: "spider-man" });
    expect(tmdbFetch).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(tmdbFetch).toHaveBeenCalledOnce();
    expect(tmdbFetch).toHaveBeenCalledWith("/search/multi", { query: "spider-man" });
  });
});
