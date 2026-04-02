import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ModalService } from "./modal.service.js";

describe("ModalService", () => {
  let dialog: HTMLDialogElement;

  beforeEach(() => {
    dialog = document.createElement("dialog") as HTMLDialogElement;
    // jsdom does not implement showModal()/close() on <dialog>
    dialog.showModal = vi.fn();
    dialog.close = vi.fn();
    document.body.appendChild(dialog);
  });

  afterEach(() => {
    dialog.remove();
    document.body.style.overflow = "";
  });

  describe("constructor", () => {
    it("creates service without throwing", () => {
      expect(() => new ModalService(dialog)).not.toThrow();
    });
  });

  describe("isShown", () => {
    it("defaults to false", () => {
      const modal = new ModalService(dialog);
      expect(modal.isShown).toBe(false);
    });
  });

  describe("show()", () => {
    it("calls showModal() on the dialog element", () => {
      const modal = new ModalService(dialog);
      modal.show();
      expect(dialog.showModal).toHaveBeenCalledTimes(1);
    });

    it("sets body overflow to hidden", () => {
      const modal = new ModalService(dialog);
      modal.show();
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("sets isShown to true", () => {
      const modal = new ModalService(dialog);
      modal.show();
      expect(modal.isShown).toBe(true);
    });

    it("dispatches tw.modal.show event", () => {
      const modal = new ModalService(dialog);
      const handler = vi.fn();
      dialog.addEventListener("tw.modal.show", handler);
      modal.show();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("dispatches tw.modal.shown event", () => {
      const modal = new ModalService(dialog);
      const handler = vi.fn();
      dialog.addEventListener("tw.modal.shown", handler);
      modal.show();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does nothing when already shown", () => {
      const modal = new ModalService(dialog);
      modal.show();
      (dialog.showModal as ReturnType<typeof vi.fn>).mockClear();
      modal.show();
      expect(dialog.showModal).not.toHaveBeenCalled();
    });
  });

  describe("hide()", () => {
    it("calls close() on the dialog element", () => {
      const modal = new ModalService(dialog);
      modal.show();
      modal.hide();
      expect(dialog.close).toHaveBeenCalledTimes(1);
    });

    it("restores body overflow", () => {
      const modal = new ModalService(dialog);
      modal.show();
      expect(document.body.style.overflow).toBe("hidden");
      modal.hide();
      expect(document.body.style.overflow).toBe("");
    });

    it("sets isShown to false", () => {
      const modal = new ModalService(dialog);
      modal.show();
      modal.hide();
      expect(modal.isShown).toBe(false);
    });

    it("dispatches tw.modal.hide event", () => {
      const modal = new ModalService(dialog);
      modal.show();
      const handler = vi.fn();
      dialog.addEventListener("tw.modal.hide", handler);
      modal.hide();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("dispatches tw.modal.hidden event", () => {
      const modal = new ModalService(dialog);
      modal.show();
      const handler = vi.fn();
      dialog.addEventListener("tw.modal.hidden", handler);
      modal.hide();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does nothing when already hidden", () => {
      const modal = new ModalService(dialog);
      const handler = vi.fn();
      dialog.addEventListener("tw.modal.hide", handler);
      modal.hide();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("toggle()", () => {
    it("shows when currently hidden", () => {
      const modal = new ModalService(dialog);
      modal.toggle();
      expect(modal.isShown).toBe(true);
    });

    it("hides when currently shown", () => {
      const modal = new ModalService(dialog);
      modal.show();
      modal.toggle();
      expect(modal.isShown).toBe(false);
    });

    it("round-trips correctly: hidden -> shown -> hidden", () => {
      const modal = new ModalService(dialog);
      modal.toggle();
      expect(modal.isShown).toBe(true);
      modal.toggle();
      expect(modal.isShown).toBe(false);
    });
  });

  describe("Escape key", () => {
    it("triggers hide when Escape is pressed", () => {
      const modal = new ModalService(dialog);
      modal.show();
      const event = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      dialog.dispatchEvent(event);
      expect(modal.isShown).toBe(false);
    });

    it("does not hide when a different key is pressed", () => {
      const modal = new ModalService(dialog);
      modal.show();
      const event = new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
      });
      dialog.dispatchEvent(event);
      expect(modal.isShown).toBe(true);
    });
  });

  describe("dispose()", () => {
    it("hides the modal if shown", () => {
      const modal = new ModalService(dialog);
      modal.show();
      modal.dispose();
      expect(modal.isShown).toBe(false);
      expect(dialog.close).toHaveBeenCalled();
    });

    it("removes event listeners (Escape no longer triggers hide)", () => {
      const modal = new ModalService(dialog);
      modal.dispose();
      // Re-show manually to test that keydown listener was removed
      // We need to create a new service to show, since dispose called hide
      const modal2 = new ModalService(dialog);
      modal2.show();
      modal2.dispose();
      // After dispose, pressing Escape should not call hide again
      const handler = vi.fn();
      dialog.addEventListener("tw.modal.hide", handler);
      const event = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      dialog.dispatchEvent(event);
      expect(handler).not.toHaveBeenCalled();
    });

    it("does not throw when called on an already-hidden modal", () => {
      const modal = new ModalService(dialog);
      expect(() => modal.dispose()).not.toThrow();
    });
  });
});
