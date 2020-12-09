import { BoulderService } from './../../service/boulder/boulder.service';
import { IBoulder } from './../../interface/IBoulder';
import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {
  private boulders: IBoulder[];
  private boulderListBackup: IBoulder[];
  constructor(private boulderService: BoulderService, private router: Router) {
  }

  async ngOnInit() {
    this.boulders = await this.initializeItems();
  }
  
  async initializeItems(): Promise<any> {
    var bouldersAll = [];
    await this.boulderService.getAllBoulder().subscribe(boulders => {
      boulders.forEach((boulder) => {
        let boul: IBoulder = {};
        boul.id = boulder.id;
        boul.name = boulder.data().name;
        boul.position = boulder.data().position;
        boul.follower = boulder.data().follower;
        bouldersAll.push(boul);
      });
    });
    this.boulderListBackup = bouldersAll;
    return bouldersAll;
  }


  async filterList(evt) {
    this.boulders = this.boulderListBackup;
    const searchBoulder = evt.srcElement.value;
  
    if (!searchBoulder) {
      return;
    }
    this.boulders = this.boulders.filter(boulder => {
      if (boulder.name && searchBoulder) {
        return (boulder.name.toLowerCase().indexOf(searchBoulder.toLowerCase()) > -1 || boulder.id.toLowerCase().indexOf(searchBoulder.toLowerCase()) > -1);
      }
    });
  }
  private openBoulder(boulder){
    this.boulderService.data= boulder
    this.router.navigate(['/tabs/boulder'])
  }
}

