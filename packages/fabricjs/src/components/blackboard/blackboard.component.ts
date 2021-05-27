import { Component } from "@ribajs/core";
import { fabric } from "../../dependencies/index";

import { debounce } from "@ribajs/utils/src/control";

interface Scope {
  width: number;
  height: number;
  backgroundColor: number[];
  foregroundColor: number[];
  backgroundImage: string | null;
  drawingMode: "crayon" | "sponge" | null;
};

export type FabricJSBlackboardComponentScope = Scope;

export class FabricJSBlackboardComponent extends Component {
  public static tagName = "fabricjs-blackboard";
  public static _canvasID = 0;

  public _debug = false;

  private _canvas: HTMLCanvasElement;
  private _fabricCanvas: fabric.Canvas | null = null;

  private _crayon: fabric.FreeDrawingBrush | null = null;
  private _sponge: fabric.FreeDrawingBrush | null = null;

  private _resizeObserver: ResizeObserver | null = null;

  static get observedAttributes(): string[] {
    return [
      "width",
      "height",
      "background-color",
      "background-image",
      "foreground-color",
      "drawing-mode",
    ];
  }

  public scope: Scope = {
    backgroundImage: null,
    backgroundColor: [0, 0, 0],
    foregroundColor: [255, 255, 255],
    width: 800,
    height: 600,
    drawingMode: null,
  };

  constructor() {
    super();
    console.log("blackboard constructor");
    FabricJSBlackboardComponent._canvasID++;
    this._canvas = document.createElement("canvas");
    this._canvas.setAttribute(
      "id",
      "fabric__canvas_" + FabricJSBlackboardComponent._canvasID
    );
    console.log("blackboard constructed", this._canvas.id);
  }

  protected async connectedCallback() {
    console.log("blackboard connectedCallback", this._canvas.id);
    super.connectedCallback();
    this.addEventListeners();
  }

  protected async beforeBind() {
    console.log("blackboard before bind", this.scope.width, this.scope.height);

    this.appendChild(this._canvas);
    this._fabricCanvas = new fabric.Canvas(
      this._canvas.id,
      {
        isDrawingMode: true /*
          this.scope.drawingMode === "sponge" ||
          this.scope.drawingMode === "crayon",*/,
        hoverCursor: "pointer",
        selection: false,
        backgroundColor: `rgb(${this.scope.backgroundColor[0]}, ${this.scope.backgroundColor[1]}, ${this.scope.backgroundColor[2]})`,
        width: this.scope.width,
        height: this.scope.height
      }
    );
    this._fabricCanvas.on("path:created", opt => {
      console.log("Yo", opt);
      this._fabricCanvas?.renderAll();
    });
    this._fabricCanvas.on("mouse:up", (t) => {
      if (this._fabricCanvas?.isDrawingMode) {
        const c = (fabric.util as any).copyCanvasElement!((this._fabricCanvas as any).upperCanvasEl!);
        const img = new fabric.Image(c);
        (this._fabricCanvas as any).contextTopDirty = true;
        this._fabricCanvas.add(img);
        this._fabricCanvas.isDrawingMode = false;
        this._fabricCanvas.isDrawingMode = true;
        this._fabricCanvas.clearContext((this._fabricCanvas as any).contextTop);
      }
    })
    console.log("fabric canvas created:", this._fabricCanvas);
    this._crayon = new (fabric as any).CrayonBrush(this._fabricCanvas, {
      width: 18,
      opacity: 0.7,
      inkAmount: 5,
      color: `rgb(${this.scope.foregroundColor[0]}, ${this.scope.foregroundColor[1]}, ${this.scope.foregroundColor[2]})`,
    });
    this._sponge = new (fabric as any).InkBrush(this._fabricCanvas, {
      width: 120,
      opacity: 0.66,
      inkAmount: 10,
      color: `#4E4E4E`,
    });
    console.log("sponge and crayon created:", this._sponge, this._crayon);
    await super.init(FabricJSBlackboardComponent.observedAttributes);
    console.log("init done");

    
    this._fabricCanvas!.freeDrawingBrush =
      this.scope.drawingMode === "sponge" ? this._sponge! : this._crayon!;
  }
  protected requiredAttributes(): string[] {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );

    console.log("attributeChanged", attributeName, oldValue, newValue);
    switch (attributeName) {
      case "foregroundColor":
        this.onForegroundColorChanged(newValue);
        break;
      case "backgroundColor":
        this.onBackgroundColorChanged(newValue);
        break;
      case "backgroundImage":
        this.onBackgroundImageChanged(newValue);
        break;
      case "width":
        this.onWidthChanged(newValue);
        break;
      case "height":
        this.onHeightChanged(newValue);
        break;
      case "drawingMode":
        this.onDrawingModeChanged(newValue);
        break;
      default:
        console.log(`Unknown attribute changed: '${attributeName}'`, {
          oldValue,
          newValue,
        });
    }
  }

  protected onForegroundColorChanged(val: number[]) {
    console.log("onForegroundColorChanged", val);
    if (this._fabricCanvas) {
      if (this._crayon) {
        this._crayon.color = `rgb(${val[0]}, ${val[1]}, ${val[2]})`;
      } else {
        console.log("No crayon yet");
      }
    } else {
      console.log("No Fabric Canvas yet");
    }
  }

  protected onBackgroundColorChanged(val: number[]) {
    console.log("onBackgroundColorChanged", val);
    if (this._fabricCanvas) {
      this._fabricCanvas.setBackgroundColor(
        `rgb(${val[0]}, ${val[1]}, ${val[2]})}`,
        this._fabricCanvas.renderAll.bind(this._fabricCanvas)
      );
    } else {
      console.log("onBackgroundColorChanged: No Fabric canvas yet");
    }
  }

  protected onBackgroundImageChanged(val: string) {
    console.log("onBackgroundImageChanged", val);
    if (val && this._fabricCanvas) {
      fabric.util.loadImage(val, (img, ...args) => {
        if (!img) {
          console.error(
            `onBackgroundImageChanged: Could not load image '${val}' -`,
            ...args
          );
        } else {
          console.log("onBackgroundImageChanged: Image loaded:", img);
          const fabricImg = new fabric.Image(img);
          console.log("onBackgroundImageChanged: fabricImg", fabricImg);
          this._fabricCanvas!.setBackgroundImage(
            fabricImg,
            this._fabricCanvas!.renderAll.bind(this._fabricCanvas),
            {
              scaleX: this._fabricCanvas!.width! / fabricImg.width!,
              scaleY: this._fabricCanvas!.height! / fabricImg.height!,
            }
          );
        }
      });
    }
  }
  protected onHeightChanged(val: number) {
    console.log("onHeightChanged", val);
    this._fabricCanvas?.setHeight(val);
  }
  protected onWidthChanged(val: number) {
    console.log("onWidthChanged", val);
    this._fabricCanvas?.setWidth(val);
  }
  protected onDrawingModeChanged(val: string) {
    console.log("onDrawingModeChanged", val);
    if (val === "crayon" && this._crayon) {
      console.log("Ye", this._crayon);
      this._fabricCanvas!.isDrawingMode = true;
      this._fabricCanvas!.freeDrawingBrush = this._crayon;
      console.log(this._fabricCanvas);
      console.log(this._crayon, this._fabricCanvas!.freeDrawingBrush);
    } else if (val === "sponge" && this._sponge) {
      console.log("Ne", this._sponge);
      this._fabricCanvas!.isDrawingMode = true;
      this._fabricCanvas!.freeDrawingBrush = this._sponge;
      console.log(this._fabricCanvas);
    } else if (this._fabricCanvas) {
      console.log("wtf");
      //this._fabricCanvas.isDrawingMode = false;
    }
  }

  protected onViewChanges(event: any) {
    this.debug("onViewChanges:", event);
    if (!this._fabricCanvas) {
      this.debug("onViewChanges", "No fabric canvas yet");
      return;
    }
    this.debug(this.clientWidth, this.clientHeight, this.scope.width, this.scope.height);
    if (this.scope.width !== this.clientWidth || this.scope.height !== this.clientHeight) {
      this.scope.width = this.clientWidth;
      this.scope.height = this.clientHeight;
      this._fabricCanvas?.setDimensions({ width: this.clientWidth, height: this.clientHeight });
      /*
      const rgb = this.scope.backgroundColor;
      this._fabricCanvas?.setBackgroundColor(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})}`, () => {
        if (this.scope.backgroundImage) {
          this.onBackgroundImageChanged(this.scope.backgroundImage);
        } else {
          this._fabricCanvas?.renderAll();
        }
      })*/
    }
  }

  protected addEventListeners() {
    console.log("lISTEN, BOI");
    window.addEventListener("resize", debounce(this.onViewChanges.bind(this)));
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.unobserve(this);
    }
  }

  protected template() {
    return null;
  }
}
