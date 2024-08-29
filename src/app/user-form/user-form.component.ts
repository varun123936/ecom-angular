import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  user: any = {
    name: '',
    email: '',
    password: '',
    status: 'active',
    accessLevel: 'user'
  };
  isEditing: boolean = false;
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isEditing = true;
      this.userService.getUser(this.userId).subscribe(data => {
        this.user = data;
      });
    }
  }

  saveUser(): void {
    if (this.isEditing) {
      this.userService.updateUser(this.userId!, this.user).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.userService.addUser(this.user).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
