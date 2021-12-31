import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { TagsService } from './tags.service';

@Controller('tags')
@UseGuards(AuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAllTags() {
    return this.tagsService.findAllTags();
  }
}
