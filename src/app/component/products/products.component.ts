import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any;
  searchKey: string = '';

  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res => {
      this.productList = res;
      this.filterCategory = res;

      this.productList.forEach((a: any) => {
        if (a.category.includes("clothing"))
          a.category = "clothing";
        a.fav = false;
        Object.assign(a, { quantity: 1, total: a.price, });
      });

    });

    this.cartService.search.subscribe((val: any) => this.searchKey = val);
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => a.category == category || category == '');
  }

  toggleFav(item: any) {
    let index = this.productList.indexOf(item);
    this.productList[index].fav = !(this.productList[index].fav);
    this.cartService.productList.next(this.productList);
  }
}
