import { Directive, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy, HostBinding, Renderer2, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { debounceTime, take, timeout } from 'rxjs/operators';

@Directive({
  selector: '[lcuLimitButtonClick]'
})
export class LimitButtonClickDirective implements OnInit, OnDestroy {

  @HostBinding('class.disabled')
  public IsDisabled: boolean;

  @Input('clicks-allowed')
  public ClicksAllowed: number = 1;

  private _disableButton: boolean;
  @Input('disable-button')
  public set DisableButton(val: boolean) {
    this._disableButton = val;
    this.disable(val);
  }

  public get DisableButton(): boolean {
    return this._disableButton;
  }

  @Output('limit-click')
  public LimitClick: EventEmitter<any>;

  @Output('limit-click-disabled')
  public LimitClickDisabled: EventEmitter<boolean>;

  protected clicks = new Subject();
  protected clickSubscription: Subscription;
  protected disabledIt = new Subject();
  protected disableSubscription: Subscription;
  protected numOfClicks: number;

  constructor(
    protected renderer: Renderer2,
    protected el: ElementRef) {

      this.LimitClick = new EventEmitter<any>();
      this.LimitClickDisabled = new EventEmitter<boolean>();
      this.numOfClicks = 0;
   }

   public ngOnInit(): void {
    this.clickSubscription = this.clicks.pipe(
      take(this.ClicksAllowed)
    ).subscribe((e) => {
      this.numOfClicks += 1;
      if (this.numOfClicks === this.ClicksAllowed) {
        this.disable(true);
      }
      return this.LimitClick.emit(e);
    });
  }

  public ngOnDestroy(): void {
    this.clickSubscription.unsubscribe();
  }

  protected disable(val: boolean): void {
    this.IsDisabled = val;

    if (this.IsDisabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', String(val));
    } else {
        this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }
  }

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
