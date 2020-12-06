import { Component, OnInit, OnDestroy } from '@angular/core';

import { GithubService } from '../../services/github.service';
import { Profile } from '../../models/profile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  username: string;
  profile: Profile;
  showError: boolean = false;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProfile(user: string) {
    if (!user) {
      this.showError = true;
    } else {
      this.subscription = this.githubService.getProfile(user).subscribe(result => {
        if (result) {
          this.showError = false;
          this.profile = result;
        } else {
          this.showError = true;
        }
      });
    }
  }

}
