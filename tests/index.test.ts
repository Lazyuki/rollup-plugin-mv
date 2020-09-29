import { move } from "fs-extra";
import plugin from "../src/index";

jest.mock("fs-extra", () => ({
  __esModule: true,
  move: jest.fn(),
}));

const fakeCallArgs = [{} as any, {} as any, {} as any] as const;

describe("correctly calls move()", () => {
  afterEach(() => {
    (move as jest.Mock).mockClear();
  });
  test("simple option", async () => {
    const p = plugin({ src: "source", dest: "destination" });
    await p.writeBundle?.call(...fakeCallArgs);
    expect(move).toBeCalledWith("source", "destination", {
      overwrite: undefined,
    });
  });
  test("multiple files", async () => {
    const p = plugin([
      { src: "source", dest: "destination" },
      { src: "source2", dest: "destination2" },
    ]);
    await p.writeBundle?.call(...fakeCallArgs);
    expect(move).toHaveBeenNthCalledWith(1, "source", "destination", {
      overwrite: undefined,
    });
    expect(move).toHaveBeenNthCalledWith(2, "source2", "destination2", {
      overwrite: undefined,
    });
  });
  test("overwrite option", async () => {
    const p = plugin(
      { src: "source", dest: "destination" },
      { overwrite: true }
    );
    await p.writeBundle?.call(...fakeCallArgs);
    expect(move).toBeCalledWith("source", "destination", {
      overwrite: true,
    });
  });
  test("overwrite option for target", async () => {
    const p = plugin(
      { src: "source", dest: "destination", overwrite: false },
      { overwrite: true }
    );
    await p.writeBundle?.call(...fakeCallArgs);
    expect(move).toBeCalledWith("source", "destination", {
      overwrite: false,
    });
  });
  test("with once option = false", async () => {
    const p = plugin(
      { src: "source", dest: "destination", overwrite: false },
      { once: false }
    );
    await p.writeBundle?.call(...fakeCallArgs);
    await p.writeBundle?.call(...fakeCallArgs);
    expect(move).toBeCalledTimes(2);
  });
  test("with once option = true", async () => {
    const p = plugin(
      { src: "source", dest: "destination", overwrite: false },
      { once: true }
    );
    await p.writeBundle?.call(...fakeCallArgs);
    await p.writeBundle?.call(...fakeCallArgs);
    expect(move).toBeCalledTimes(1);
  });
});
