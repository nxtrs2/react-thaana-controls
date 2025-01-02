import { keyMap } from '../keymaps/thaana';

class ThaanaKeyboard {
  className: string;
  char: string = '';
  latinChar: string = '';
  oldValue: string = '';
  onUpdate: (value: string) => void; // Callback to update React state

  constructor(
    className = '.thaana-keyboard',
    autoStart = true,
    onUpdate: (value: string) => void
  ) {
    this.className = className;
    this.onUpdate = onUpdate;

    if (autoStart) {
      this.run();
    }
  }

  run() {
    const inputs = document.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >(this.className);
    inputs.forEach(input =>
      input.addEventListener('beforeinput', e => this.beforeInputEvent(e))
    );
    inputs.forEach(input =>
      input.addEventListener('input', e => this.inputEvent(e))
    );
    document.addEventListener('selectionchange', this.selectionChange);
  }

  beforeInputEvent(event: Event) {
    const e = event as InputEvent;
    const t = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (
      e.data &&
      ['insertCompositionText', 'insertText'].includes(e.inputType)
    ) {
      this.latinChar = e.data.charAt(e.data.length - 1);
      this.char = this.getChar(this.latinChar);
      this.oldValue = t.value;
    }
  }

  selectionChange = () => {
    const activeElement = document.activeElement as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (activeElement) {
      activeElement.dataset.start = String(activeElement.selectionStart ?? 0);
      activeElement.dataset.end = String(activeElement.selectionEnd ?? 0);
    }
  };

  inputEvent(event: Event) {
    const e = event as InputEvent;
    const t = e.target as HTMLInputElement | HTMLTextAreaElement;

    if (
      e.inputType === 'deleteContentBackward' || // Backspace
      e.data === ' ' || // Spacebar
      (e.inputType === 'insertText' && e.data === ' ') || // Space via insertText
      e.inputType === 'insertParagraph' || // Enter/Return in textarea
      e.inputType === 'insertLineBreak' // Alternate Enter/Return behavior
    ) {
      this.onUpdate(t.value);
      return;
    }

    if (!['insertCompositionText', 'insertText'].includes(e.inputType)) return;

    if (this.char === this.latinChar) return;

    const cursorStart = t.selectionStart ?? 0;
    const cursorEnd = t.selectionEnd ?? 0;

    const selectionStart = Number(t.dataset.start ?? 0);
    const selectionEnd = Number(t.dataset.end ?? 0);

    t.value = '';
    t.value = this.oldValue.split(this.latinChar).join('');

    if (selectionEnd - selectionStart > 0) {
      t.value =
        t.value.substring(0, selectionStart) + t.value.substring(selectionEnd);
    }

    let newValue = t.value.substring(0, cursorStart - 1);
    newValue += this.char;
    newValue += t.value.substring(cursorStart - 1);

    t.value = newValue;

    this.onUpdate(newValue); // Update React state

    t.selectionStart = cursorStart;
    t.selectionEnd = cursorEnd;
  }

  getChar(char: string): string {
    return keyMap[char] || char;
  }
}

export default ThaanaKeyboard;
