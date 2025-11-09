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

  it("should abort previous controller when creating new one", () => {
    const { result } = renderHook(() => useAbortController());

    const { newAbortController } = result.current;
    const firstController = newAbortController();

    expect(firstController.signal.aborted).toBe(false);

    const secondController = newAbortController();

    expect(firstController.signal.aborted).toBe(true);
    expect(secondController.signal.aborted).toBe(false);
  });

  it("should cleanup and abort current controller", () => {
    const { result } = renderHook(() => useAbortController());

    const { newAbortController, cleanup } = result.current;
    const controller = newAbortController();

    expect(controller.signal.aborted).toBe(false);

    cleanup();

    expect(controller.signal.aborted).toBe(true);
  });

  it("should handle cleanup when no controller exists", () => {
    const { result } = renderHook(() => useAbortController());

    const { cleanup } = result.current;

    expect(() => cleanup()).not.toThrow();
  });

  it("should handle cleanup when controller is already null", () => {
    const { result } = renderHook(() => useAbortController());

    const { newAbortController, cleanup } = result.current;
    newAbortController();
    cleanup();

    expect(() => cleanup()).not.toThrow();
  });
});
