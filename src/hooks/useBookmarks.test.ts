import { act, renderHook } from "@testing-library/react";
import useBookmarks from "./useBookmarks";
import { beforeEach, describe, expect, it } from "vitest";

const STORAGE_KEY = "Filman_bookmarks";
const SAMPLE_MOVIE = { id: 1, mediaType: "movie" };
const SAMPLE_TV = { id: 2, mediaType: "tv" };

beforeEach(() => localStorage.clear());

describe("useBookmarks", () => {
  it("should start with an empty array when localStorage is empty", () => {
    const { result } = renderHook(() => useBookmarks());

    expect(result.current.bookmarks).toEqual([]);
  });

  it("should load bookmarks from localStorage on initial render", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([SAMPLE_MOVIE]));
    const { result } = renderHook(() => useBookmarks());

    expect(result.current.bookmarks).toEqual([SAMPLE_MOVIE]);
  });

  it('should add a new item to bookmarks when "toggleBookmark" is called with an unbookmarked item', () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark(SAMPLE_TV);
    });

    expect(result.current.bookmarks).toHaveLength(1);
    expect(result.current.bookmarks).toEqual([SAMPLE_TV]);
  });

  it("should remove an item when toggleBookmark is called for an existing bookmarked item", () => {
    const { result } = renderHook(() => useBookmarks());

    act(() => {
      result.current.toggleBookmark(SAMPLE_TV);
    });
    expect(result.current.bookmarks).toEqual([SAMPLE_TV]);

    act(() => {
      result.current.toggleBookmark(SAMPLE_TV);
    });
    expect(result.current.bookmarks).toEqual([]);
    expect(result.current.bookmarks).toHaveLength(0);
  });
});
