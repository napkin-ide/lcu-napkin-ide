import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lcu-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class MarketplaceProductViewComponent implements OnInit {

  public Product: any; // will be product model

  constructor(
    protected activatedRoute: ActivatedRoute
  ) {
    // Get the product info from the state instead of hard-coding it here:
    this.Product = {Title: this.activatedRoute.snapshot.paramMap.get('product_title')};
    this.Product.Description = 'More description things yay! This is an API; spend the moneys and you can use it, because capitalism.';
  }

  ngOnInit() {
  }

}
