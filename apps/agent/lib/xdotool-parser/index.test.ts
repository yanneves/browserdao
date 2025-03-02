import {
  afterEach,
  describe,
  expect,
  expectTypeOf,
  test as it,
  vi,
} from "vitest";
import xdotoolParse from "./index.ts";

// Mock the console.warn
vi.spyOn(console, "warn").mockImplementation(() => {});

describe("xdotoolParse()", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return an object with expected properties", () => {
    const result = xdotoolParse("");
    expectTypeOf(result).toHaveProperty("modifier");
    expectTypeOf(result).toHaveProperty("key");
  });

  it("should pass through alphanumeric keys", () => {
    expect(xdotoolParse("a")).toEqual({ modifier: null, key: "a" });
    expect(xdotoolParse("T")).toEqual({ modifier: null, key: "T" });
    expect(xdotoolParse("Z")).toEqual({ modifier: null, key: "Z" });
    expect(xdotoolParse("0")).toEqual({ modifier: null, key: "0" });
    expect(xdotoolParse("5")).toEqual({ modifier: null, key: "5" });
  });

  it("should handle F keys", () => {
    expect(xdotoolParse("F1")).toEqual({ modifier: null, key: "F1" });
    expect(xdotoolParse("F12")).toEqual({ modifier: null, key: "F12" });
    expect(xdotoolParse("F20")).toEqual({ modifier: null, key: "F20" });
  });

  it("should map x11 key syms to Web API values", () => {
    expect(xdotoolParse("BackSpace")).toEqual({
      modifier: null,
      key: "Backspace",
    });
    expect(xdotoolParse("Return")).toEqual({ modifier: null, key: "Enter" });
    expect(xdotoolParse("Tab")).toEqual({ modifier: null, key: "Tab" });
  });

  it("should pass through Web API key values (bidirectional lookup)", () => {
    expect(xdotoolParse("Control")).toEqual({ modifier: null, key: "Control" });
    expect(xdotoolParse("Shift")).toEqual({ modifier: null, key: "Shift" });
    expect(xdotoolParse("Enter")).toEqual({ modifier: null, key: "Enter" });
  });

  it("should handle modifier + key combinations", () => {
    expect(xdotoolParse("Control+a")).toEqual({
      modifier: "Control",
      key: "a",
    });
    expect(xdotoolParse("Shift+Tab")).toEqual({
      modifier: "Shift",
      key: "Tab",
    });
    expect(xdotoolParse("Alt+Control")).toEqual({
      modifier: "Alt",
      key: "Control",
    });
  });

  it("should handle bidirectional lookup for modifiers", () => {
    expect(xdotoolParse("Control_L+a")).toEqual({
      modifier: "Control",
      key: "a",
    });
    expect(xdotoolParse("Shift_L+BackSpace")).toEqual({
      modifier: "Shift",
      key: "Backspace",
    });
  });

  it("should return null for unmapped keys not in either direction", () => {
    expect(xdotoolParse("UFO")).toEqual({ modifier: null, key: null });
    expect(console.warn).toHaveBeenCalledWith(
      'Failed to parse xdotool key "UFO"',
    );
  });

  it("should handle empty input", () => {
    expect(xdotoolParse("")).toEqual({ modifier: null, key: null });
    expect(console.warn).toHaveBeenCalledWith('Failed to parse xdotool key ""');
  });

  it("should ignore additional modifiers", () => {
    expect(xdotoolParse("Control+Shift+a")).toEqual({
      modifier: "Control",
      key: "Shift",
    });
    expect(console.warn).toHaveBeenCalledWith(
      'Additional modifiers ignored by xdotool parser "Control+Shift+a"',
    );
  });
});
