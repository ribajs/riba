import { Component } from "@ribajs/core";
import { fabric } from "../../dependencies/index";

export class FabricJSBlackboardComponent extends Component {
  public static tagName = "fabricjs-blackboard";
  public static _canvasID = 0;

  public _debug = true;

  private _canvas: HTMLCanvasElement;
  private _fabricCanvas: fabric.Canvas | null = null;

  private _crayon: fabric.FreeDrawingBrush | null = null;
  private _sponge: fabric.FreeDrawingBrush | null = null;

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

  public scope = {
    backgroundImage: null,
    backgroundColor: [0, 0, 0],
    foregroundColor: [255, 255, 255],
    width: 800,
    height: 600,
    drawingMode: null,
  };

  constructor() {
    super();
    FabricJSBlackboardComponent._canvasID++;
    this._canvas = document.createElement("canvas");
    this._canvas.setAttribute(
      "id",
      "fabric__canvas_" + FabricJSBlackboardComponent._canvasID
    );
  }

  protected async connectedCallback() {
    this.debug("connectedCallback");
    super.connectedCallback();
    this.appendChild(this._canvas);
    this._fabricCanvas = new fabric.Canvas(
      "fabric__canvas_" + FabricJSBlackboardComponent._canvasID,
      {
        isDrawingMode: true /*
          this.scope.drawingMode === "sponge" ||
          this.scope.drawingMode === "crayon",*/,
        hoverCursor: "pointer",
        selection: false,
        backgroundColor: `rgb(${this.scope.backgroundColor[0]}, ${this.scope.backgroundColor[1]}, ${this.scope.backgroundColor[2]})`,
      }
    );
    this.debug("fabric canvas created:", this._fabricCanvas);
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
    this.debug("sponge and crayon created:", this._sponge, this._crayon);
    await super.init(FabricJSBlackboardComponent.observedAttributes);
    this.debug("init done");
  }

  protected async beforeBind() {
    this.debug("befor bind");
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

    this.debug("attributeChanged", attributeName, oldValue, newValue);
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
        this.debug(`Unknown attribute changed: '${attributeName}'`, {
          oldValue,
          newValue,
        });
    }
  }

  protected onForegroundColorChanged(val: number[]) {
    this.debug("onForegroundColorChanged", val);
    if (this._fabricCanvas) {
      if (this._crayon) {
        this._crayon.color = `rgb(${val[0]}, ${val[1]}, ${val[2]})`;
      } else {
        this.debug("No crayon yet");
      }
    } else {
      this.debug("No Fabric Canvas yet");
    }
  }

  protected onBackgroundColorChanged(val: number[]) {
    this.debug("onBackgroundColorChanged", val);
    if (this._fabricCanvas) {
      this._fabricCanvas.setBackgroundColor(
        `rgb(${val[0]}, ${val[1]}, ${val[2]})}`,
        this._fabricCanvas.renderAll.bind(this._fabricCanvas)
      );
    } else {
      this.debug("onBackgroundColorChanged: No Fabric canvas yet");
    }
  }

  protected onBackgroundImageChanged(val: string) {
    this.debug("onBackgroundImageChanged", val);
    if (val && this._fabricCanvas) {
      fabric.util.loadImage(val, (img, ...args) => {
        if (!img) {
          console.error(
            `onBackgroundImageChanged: Could not load image '${val}' -`,
            ...args
          );
        } else {
          this.debug("onBackgroundImageChanged: Image loaded:", img);
          const fabricImg = new fabric.Image(img);
          this.debug("onBackgroundImageChanged: fabricImg", fabricImg);
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
    this.debug("onHeightChanged", val);
    this._canvas.height = val;
  }
  protected onWidthChanged(val: number) {
    this.debug("onWidthChanged", val);
    this._canvas.width = val;
  }
  protected onDrawingModeChanged(val: string) {
    this.debug("onDrawingModeChanged", val);
    if (val === "crayon" && this._crayon) {
      this.debug("Ye", this._crayon);
      this._fabricCanvas!.isDrawingMode = true;
      this._fabricCanvas!.freeDrawingBrush = this._crayon;
      console.log(this._fabricCanvas);
      console.log(this._crayon, this._fabricCanvas!.freeDrawingBrush);
    } else if (val === "sponge" && this._sponge) {
      this.debug("Ne", this._sponge);
      this._fabricCanvas!.isDrawingMode = true;
      this._fabricCanvas!.freeDrawingBrush = this._sponge;
      console.log(this._fabricCanvas);
    } else if (this._fabricCanvas) {
      this.debug("wtf");
      //this._fabricCanvas.isDrawingMode = false;
    }
  }
  protected template() {
    return null;
  }
}
