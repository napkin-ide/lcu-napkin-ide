import { Directive, ElementRef, Renderer2, AfterContentInit, RendererStyleFlags2 } from '@angular/core';
import { Constants } from '../../utils/constants';

/**
 * A Directive that will append the text 'Low-Code Unit™' to a text element.
 *
 * The Trademark Directive is needed to ensure Fathym's trademark registration of the term 'Low-Code Unit'.
 */
@Directive({
  selector: '[lcuTrademark]'
})
export class LcuTrademarkDirective implements AfterContentInit {
  private lcuText: string;
  private parentEl: any;
  private tmText: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.lcuText = Constants.LCU_TEXT;
    this.parentEl = this.el.nativeElement;
    this.tmText = 'TM';
  }

  public ngAfterContentInit(): void {
    const innerText = this.createLCUText();
    const tmSymbol = this.createTrademarkSymbol();

    this.renderer.appendChild(innerText, tmSymbol);
    this.renderer.appendChild(this.parentEl, innerText);
  }

  /**
   * Creates and styles the text: 'Low-Code Unit'
   *
   * @returns a span element containing the text: 'Low-Code Unit'
   */
  private createLCUText() {
    const innerSpan = this.renderer.createElement('span');

    this.renderer.appendChild(innerSpan, this.renderer.createText(this.lcuText));

    this.renderer.setStyle(innerSpan, 'font-style', 'italic', RendererStyleFlags2.Important);
    return innerSpan;
  }

  /**
   * Creates and styles the trademark symbol: ™
   *
   * @returns a span element containing the text: ™
   */
  private createTrademarkSymbol(): any {
    const tmSpan = this.renderer.createElement('span');

    this.renderer.appendChild(tmSpan, this.renderer.createText(this.tmText));

    this.renderer.setStyle(tmSpan, 'font-size', '0.5em');
    this.renderer.setStyle(tmSpan, 'font-style', 'normal');
    this.renderer.setStyle(tmSpan, 'margin-left', '0.3em');
    this.renderer.setStyle(tmSpan, 'vertical-align', 'super');
    return tmSpan;
  }
}
