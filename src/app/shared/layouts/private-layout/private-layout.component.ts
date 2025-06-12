import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from '@app/core/models/User';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  templateUrl: './private-layout.component.html',
  imports: [RouterModule, MatIconModule],
})
export class PrivateLayoutComponent implements OnInit {
  public user: User | null = null;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (e: User | null) => {
        this.user = e;
      },
    });
  }
}
