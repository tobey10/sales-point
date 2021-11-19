import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shops: Shop[] = [];
  shop!: Shop;
  isView: Boolean = false;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getShops();
  }

  getShops() {
    this.shopService.getShops().subscribe((data) => {
      this.shops = data.data
      console.log(this.shops)
    }, error => {
      console.log(error)
    })
  }

  deleteShop(id: any){
    this.shopService.deleteShop(id).subscribe((data) => {
      console.log(data.msg)
      this.getShops()
    }, error => {
      console.log(error);
    })
  }

  onView(id: any) {
    this.shopService.getShopById(id).subscribe((data) => {
      this.shop = data.data;
      console.log(this.shop)
    }, error => {
      console.log(error)
    })
  }

  onApprove(id: any) {
    let body = {
      approvalStatus: true
    }

    this.shopService.approveShop(id, body).subscribe((data) => {
      console.log(data.msg)
      this.getShops()
    },error => {
      console.log(error)
    })
  }
}
