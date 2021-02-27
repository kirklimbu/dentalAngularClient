import { Directive, ElementRef, HostListener, Input } from "@angular/core";
interface NumberOnlyDirectiveInput {
  maxDigits?: number;
  maxNumber?: number;
}
@Directive({
  selector: "[numberOnly]",
})
export class OnlynumbersDirective {
  @Input() numberOnly: NumberOnlyDirectiveInput;
  constructor(private _el: ElementRef) {}
  @HostListener("paste", ["$event"])
  onPaste(e: ClipboardEvent) {
    let pasteData = e.clipboardData.getData("text");
    if (!Number(pasteData)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (
      (this.numberOnly &&
        this.numberOnly.maxDigits &&
        pasteData.length > this.numberOnly.maxDigits) ||
      (this.numberOnly &&
        this.numberOnly.maxNumber &&
        parseInt(pasteData, 10) > this.numberOnly.maxNumber)
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  @HostListener("keydown", ["$event"])
  onKeyDown(e: KeyboardEvent) {
    if (
      // Allow: Delete, Backspace, Tab, Escape, Enter
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
      (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
      (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
      (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
      (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
    ) {
      return; // let it happen, don't do anything
    }
    // Ensure that it is a number and stop the keypress
    if (
      ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)) ||
      (this.numberOnly &&
        this.numberOnly.maxDigits &&
        ((e as any).target.value + "" + e.key).length >
          this.numberOnly.maxDigits) ||
      (this.numberOnly &&
        this.numberOnly.maxNumber &&
        parseInt((e as any).target.value + "" + e.key, 10) >
          this.numberOnly.maxNumber)
    ) {
      e.preventDefault();
    }
  }
}
