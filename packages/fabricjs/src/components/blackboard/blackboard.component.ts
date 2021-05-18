import { Component } from "@ribajs/core";
import { fabric } from "../../dependencies/index";

export class FabricJSBlackboardComponent extends Component {
  public static tagName = "fabricjs-blackboard";
  public static _canvasID = 0;

  public _debug = false;

  private _canvas: HTMLCanvasElement;
  private _fabricCanvas: fabric.Canvas | null = null;

  static get observedAttributes(): string[] {
    return [
      "width",
      "height",
      "background-color",
      "background-image",
      "foreground-color",
    ];
  }

  public scope = {
    backgroundImage: null,
    backgroundColor: [0, 0, 0],
    foregroundColor: [255, 255, 255],
    width: 800,
    height: 600,
  };

  constructor() {
    super();
    this._canvas = document.createElement("canvas");
    this._canvas.setAttribute(
      "id",
      "fabric__canvas_" + FabricJSBlackboardComponent._canvasID
    );
  }

  protected async connectedCallback() {
    super.connectedCallback();
    this.appendChild(this._canvas);
    this._fabricCanvas = new fabric.Canvas(
      "fabric__canvas_" + FabricJSBlackboardComponent._canvasID,
      {
        isDrawingMode: true,
        hoverCursor: "pointer",
        selection: false,
        backgroundColor: `rgb(${this.scope.backgroundColor[0]}, ${this.scope.backgroundColor[1]}, ${this.scope.backgroundColor[2]})`,
      }
    );
    await super.init(FabricJSBlackboardComponent.observedAttributes);
    this._fabricCanvas.freeDrawingBrush = new (fabric as any).CrayonBrush(
      this._fabricCanvas,
      {
        width: 30,
        opacity: 1,
        inkAmount: 5,
        color: `rgb(${this.scope.foregroundColor[0]}, ${this.scope.foregroundColor[1]}, ${this.scope.foregroundColor[2]})`,
      }
    );
    // console.log(fabric);
    // console.log(this._fabricCanvas);
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

    // console.log("attributeName", attributeName, oldValue, newValue);
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
    }
  }

  protected onForegroundColorChanged(val: number[]) {
    console.log("Set foreground color boi", val);
    if (this._fabricCanvas) {
      console.log(this._fabricCanvas.freeDrawingBrush.color);
      this._fabricCanvas.freeDrawingBrush.color = `rgb(${val[0]}, ${val[1]}, ${val[2]})`;
      console.log(this._fabricCanvas.freeDrawingBrush.color);
    }
  }

  protected onBackgroundColorChanged(val: number[]) {
    console.log("Set background color boi", val);
    if (this._fabricCanvas) {
      this._fabricCanvas.setBackgroundColor(
        `rgb(${val[0]}, ${val[1]}, ${val[2]})}`,
        this._fabricCanvas.renderAll.bind(this._fabricCanvas)
      );
    }
  }

  protected onBackgroundImageChanged(val: string) {
    console.log("Set background image", val);
    if (val && this._fabricCanvas) {
      console.log("Load image", val);
      fabric.util.loadImage(val, (img, ...args) => {
        if (!img) {
          console.error(`Could not load image: '${val}' -`, ...args);
        } else {
          console.log("Image loaded:", img);
          const fabricImg = new fabric.Image(img);
          console.log("fabricImg", fabricImg);
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
    console.log("Set height", val);
    this._canvas.height = val;
  }
  protected onWidthChanged(val: number) {
    console.log("Set width", val);
    this._canvas.width = val;
  }
  protected template() {
    return null;
  }
}
