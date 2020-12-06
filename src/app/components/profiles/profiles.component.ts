import { Component, OnInit, OnDestroy } from '@angular/core';

import { GithubService } from '../../services/github.service';
import { Subscription } from 'rxjs';
import { Profile } from '../../models/profile';
import { Repository } from '../../models/repository';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  username: string;
  profile: Profile;
  repos: Repository[];
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
          this.getRepos(user);
        } else {
          this.showError = true;
        }
      });
    }
  }

  getRepos(user: string) {
    this.subscription = this.githubService.getRepos(user).subscribe(result => {
      if (result) {
        this.repos = result;
      }
    });
  }

}
