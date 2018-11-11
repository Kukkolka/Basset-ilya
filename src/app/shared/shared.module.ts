import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { MovieThumbnailComponent } from './movie-thumbnail/movie-thumbnail.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, MovieThumbnailComponent,MovieThumbnailComponent],
  exports: [LoaderComponent,MovieThumbnailComponent]
})
export class SharedModule {}
