import { Component, OnInit, OnDestroy } from '@angular/core';

import { GithubService } from '../../services/github.service';
import { Subscription } from 'rxjs';
import { Profile } from '../../models/profile';
import { Repository } from '../../models/repository';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit, OnDestroy {
  maxRepos: number = environment.repos_count;
  profileSubscription: Subscription;
  repoSubscription: Subscription;
  commitsSubscription: Subscription;
  username: string;
  profile: Profile;
  repos: Repository[];
  showError: boolean = false;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
    this.repoSubscription.unsubscribe();
    this.commitsSubscription.unsubscribe();
  }

  getProfile(user: string) {
    if (!user) {
      this.showError = true;
    } else {
      this.profileSubscription = this.githubService.getProfile(user).subscribe(result => {
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
    this.repoSubscription = this.githubService.getRepos(user).subscribe(result => {
      if (result) {
        this.repos = result;
        this.repos.forEach(repo => {
          this.getCommits(repo.name, repo.id);
        });
      }
    });
  }

  getCommits(repoName: string, id: number) {
    this.commitsSubscription = this.githubService.getCommits(this.profile.login, repoName).subscribe(result => {
      if (result) {
        this.repos.forEach(repo => {
          if (repoName === repo.name && id === repo.id) {
            repo.latestCommit = result[0].sha;
          }
        });
      }
    });
  }

}
