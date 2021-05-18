import { Component } from "@ribajs/core";
import { fabric } from "../../dependencies/index";

export class FabricJSBlackboardComponent extends Component {
  public static tagName = "fabricjs-blackboard";
  public static _canvasID = 0;

  public _debug = false;

  private _backgroundColor = [0, 0, 0];
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;
  private _backgroundImage: string | null = null;

  private _fabricCanvas: fabric.Canvas | null = null;

  static get observedAttributes(): string[] {
    return ["width", "height", "background-color"];
  }

  public scope: any;

  constructor() {
    super();
    this._canvas = document.createElement("canvas");
    this._canvas.setAttribute("id", "fabric__canvas_"+FabricJSBlackboardComponent._canvasID);
    this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
    this.scope = ((self) => ({
      get backgroundColor() {
        return self._backgroundColor;
      },
      set backgroundColor(val) {
        self._backgroundColor = val;
        self._ctx.fillStyle = `rgba(${val[0]}, ${val[1]}, ${val[2]}${val[3] ? ', '+val[3] : ''})`;
        self._ctx.fillRect(0, 0, self._canvas.width, self._canvas.height);
      },
      get backgroundImage() {
        return self._backgroundImage;
      },
      set backgroundImage(val: string | null) {
        self._backgroundImage = val;
        if (val) {
          console.log("Load image");
          fabric.Image.fromURL(val, img => {
            console.log("Image loaded:", img);
            self._fabricCanvas!.backgroundImage = img;
          });
        }
      },
      get width() {
        return self._canvas.width;
      },
      set width(val) {
        self._canvas.width = val;
        this.backgroundColor = this.backgroundColor;
      },
      get height() {
        return self._canvas.height;
      },
      set height(val) {
        self._canvas.height = val;
        this.backgroundColor = this.backgroundColor;
      },
    }))(this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.appendChild(this._canvas);
    this.init(FabricJSBlackboardComponent.observedAttributes);
    this._fabricCanvas = new fabric.Canvas("fabric__canvas_"+FabricJSBlackboardComponent._canvasID, {
      isDrawingMode: true, hoverCursor: "pointer", selection: false
    });
    this._fabricCanvas.freeDrawingBrush = new ((fabric as any).CrayonBrush)(this._fabricCanvas, { width: 30, opacity: 1, inkAmount: 5});
    this.scope.backgroundImage = "./assets/mathe.png";
    console.log(fabric);
    console.log(this._fabricCanvas);
  }

  protected async init(observedAttributes: string[]) {
    await super.init(observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected template() {
    return null;
  }
}
