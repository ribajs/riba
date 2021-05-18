import { Component } from "@ribajs/core";
import { fabric } from "../../dependencies/index";

export class FabricJSBlackboardComponent extends Component {
  public static tagName = "fabricjs-blackboard";
  public static _canvasID = 0;

  public _debug = false;

  private _backgroundColor = [0, 0, 0];
  private _foregroundColor = [255, 255, 255];
  private _canvas: HTMLCanvasElement;
  private _backgroundImage: string | null = null;
  private _fabricCanvas: fabric.Canvas | null = null;

  static get observedAttributes(): string[] {
    return ["width", "height", "background-color", "background-image", "foreground-color"];
  }

  public scope: any;

  constructor() {
    super();
    this._canvas = document.createElement("canvas");
    this._canvas.setAttribute("id", "fabric__canvas_"+FabricJSBlackboardComponent._canvasID);
    this.scope = ((self) => ({
      get backgroundColor() {
        return self._backgroundColor;
      },
      set backgroundColor(val) {
        console.log("Set background color", val);
        self._backgroundColor = val;
        if (self._fabricCanvas) {
          self._fabricCanvas.setBackgroundColor(`rgb(${val[0]}, ${val[1]}, ${val[2]})}`, self._fabricCanvas!.renderAll.bind(self._fabricCanvas))
        }
      },
      get foregroundColor() {
        return self._foregroundColor;
      },
      set foregroundColor(val) {
        console.log("Set foreground color", val);
        self._foregroundColor = val;
        if (self._fabricCanvas) {
          self._fabricCanvas.freeDrawingBrush.color = `(rgb(${val[0]}, ${val[1]}, ${val[2]}))`;
        }
      },
      get backgroundImage() {
        return self._backgroundImage;
      },
      set backgroundImage(val: string | null) {
        console.log("Set background image", val);
        self._backgroundImage = val;
        if (val && self._fabricCanvas) {
          console.log("Load image", val);
          fabric.util.loadImage(val, (img, ...args) => {
            if (!img) {
              console.error(`Could not load image: '${val}' -`, ...args);
            } else {
              console.log("Image loaded:", img);
              const fabricImg = new fabric.Image(img);
              console.log("fabricImg", fabricImg);
              self._fabricCanvas!.setBackgroundImage(
                fabricImg,
                self._fabricCanvas!.renderAll.bind(self._fabricCanvas),
                {
                  scaleX: self._fabricCanvas!.width! / fabricImg.width!,
                  scaleY: self._fabricCanvas!.height! / fabricImg.height!
                }
              );
            }
          });
        }
      },
      get width() {
        return self._canvas.width;
      },
      set width(val) {
        console.log("Set width", val);
        self._canvas.width = val;
        this.backgroundColor = this.backgroundColor;
      },
      get height() {
        return self._canvas.height;
      },
      set height(val) {
        console.log("Set height", val);
        self._canvas.height = val;
        this.backgroundColor = this.backgroundColor;
      },
    }))(this);
  }

  protected async connectedCallback() {
    super.connectedCallback();
    this.appendChild(this._canvas);
    this._fabricCanvas = new fabric.Canvas(
      "fabric__canvas_"+FabricJSBlackboardComponent._canvasID,
      {
        isDrawingMode: true,
        hoverCursor: "pointer",
        selection: false,
        backgroundColor: `rgb(${this._backgroundColor[0]}, ${this._backgroundColor[1]}, ${this._backgroundColor[2]})`,
      });
    await super.init(FabricJSBlackboardComponent.observedAttributes);
    this._fabricCanvas.freeDrawingBrush = new ((fabric as any).CrayonBrush)(
      this._fabricCanvas,
      {
        width: 30,
        opacity: 1,
        inkAmount: 5,
        color: `rgb(${this._foregroundColor[0]}, ${this._foregroundColor[1]}, ${this._foregroundColor[2]})`,
      }
    );
    // console.log(fabric);
    // console.log(this._fabricCanvas);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template() {
    return null;
  }
}
