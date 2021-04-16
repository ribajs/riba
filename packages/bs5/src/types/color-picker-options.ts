export interface ColorPickerOptions {
  /**
   * Whether to enable adjusting the alpha channel.
   */
  alpha: boolean;
  /**
   * Whether to show a text field for color value editing.
   */
  editor: boolean;
  /**
   * How to display the selected color in the text field (the text field still supports *input* in any format).
   */
  editorFormat: "hex" | "hsl" | "rgb";
  /**
   * Whether to have a "Cancel" button
   */
  cancelButton: boolean;
  /**
   * Whether to have a "Okay" button to accept the color
   */
  okayButton: boolean;
  /**
   * Initial color for the picker.
   */
  color: string;
}
