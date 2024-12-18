import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// icon
import { IconModule } from 'src/app/shared/icon/icon.module';

import { UserAccountSettingsComponent } from './user-account-settings';
import { ProfileComponent } from './profile';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormModule } from '../forms/form.module';

const routes: Routes = [
    {
        path: 'users/profile',
        component: UserAccountSettingsComponent,
        title: 'Account Setting | VRISTO - Multipurpose Tailwind Dashboard Template',
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, IconModule, FormsModule, ReactiveFormsModule],
    declarations: [UserAccountSettingsComponent, ProfileComponent],
})
export class UsersModule {}
