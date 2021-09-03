import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthModule } from '../../auth/auth.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, UiModule, AuthModule, RouterModule],
  exports: [ToolbarComponent],
})
export class LayoutModule {}
