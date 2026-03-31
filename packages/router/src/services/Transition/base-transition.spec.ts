import { describe, it, expect, beforeEach } from "vitest";
import { BaseTransition } from "./BaseTransition.js";

/**
 * Minimal transition used only to exercise BaseTransition.init() + done().
 */
class TestTransition extends BaseTransition {
  public async start() {
    await this.newContainerLoading;
    await this.done();
  }
}

function clearBody() {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}

describe("BaseTransition (replace)", () => {
  beforeEach(() => {
    clearBody();
  });

  it("removes all previous router-view children when the new container is appended (multi-child outlet)", async () => {
    const wrapper = document.createElement("div");
    wrapper.id = "router-view";
    const oldA = document.createElement("div");
    oldA.id = "old-a";
    const oldB = document.createElement("div");
    oldB.id = "old-b";
    wrapper.appendChild(oldA);
    wrapper.appendChild(oldB);
    document.body.appendChild(wrapper);

    const newPage = document.createElement("div");
    newPage.id = "new-page";
    // Same as Dom.putContainer: new fragment is appended after existing children.
    wrapper.appendChild(newPage);

    const transition = new TestTransition("replace");
    await transition.init(oldA, Promise.resolve(newPage));

    expect(wrapper.childNodes.length).toBe(1);
    expect(wrapper.firstElementChild).toBe(newPage);
    expect(document.getElementById("old-a")).toBeNull();
    expect(document.getElementById("old-b")).toBeNull();
  });

  it("still replaces a single-child outlet when the new page is appended", async () => {
    const wrapper = document.createElement("div");
    const oldOnly = document.createElement("div");
    oldOnly.id = "old-only";
    wrapper.appendChild(oldOnly);
    document.body.appendChild(wrapper);

    const newPage = document.createElement("div");
    newPage.id = "new-only";
    wrapper.appendChild(newPage);

    const transition = new TestTransition("replace");
    await transition.init(oldOnly, Promise.resolve(newPage));

    expect(wrapper.childNodes.length).toBe(1);
    expect(wrapper.firstElementChild).toBe(newPage);
  });

  it("does not remove siblings when action is append", async () => {
    const wrapper = document.createElement("div");
    const oldA = document.createElement("div");
    oldA.id = "stay-a";
    const oldB = document.createElement("div");
    oldB.id = "stay-b";
    wrapper.appendChild(oldA);
    wrapper.appendChild(oldB);
    document.body.appendChild(wrapper);

    const newPage = document.createElement("div");
    newPage.id = "appended";
    wrapper.appendChild(newPage);

    const transition = new TestTransition("append");
    await transition.init(oldA, Promise.resolve(newPage));

    expect(wrapper.querySelector("#stay-a")).not.toBeNull();
    expect(wrapper.querySelector("#stay-b")).not.toBeNull();
    expect(wrapper.querySelector("#appended")).not.toBeNull();
    expect(wrapper.childElementCount).toBe(3);
  });
});
