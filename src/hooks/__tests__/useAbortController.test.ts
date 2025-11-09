import { renderHook } from "@testing-library/react";
import { useAbortController } from "../useAbortController";

describe("useAbortController", () => {
  it("should return new controller and cleanup function", () => {
    const { result } = renderHook(() => useAbortController());

    const { newAbortController, cleanup } = result.current;

    expect(typeof newAbortController).toBe("function");
    expect(typeof cleanup).toBe("function");

    const controller = newAbortController();
    expect(controller).toBeInstanceOf(AbortController);
    expect(controller.signal).toBeDefined();
  });

  it("should provide a signal that can be aborted", () => {
    const { result } = renderHook(() => useAbortController());

    const { newAbortController } = result.current;
    const controller = newAbortController();

    expect(controller.signal.aborted).toBe(false);

    controller.abort();

    expect(controller.signal.aborted).toBe(true);
  });

  it("should create new controller on each render", () => {
    const { result, rerender } = renderHook(() => useAbortController());

    const { newAbortController } = result.current;
    const firstController = newAbortController();

    rerender();

    const secondController = newAbortController();

    expect(firstController).not.toBe(secondController);
    expect(firstController).toBeInstanceOf(AbortController);
    expect(secondController).toBeInstanceOf(AbortController);
  });
});
