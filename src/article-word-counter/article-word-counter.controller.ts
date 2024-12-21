import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArticleWordCounterService } from './article-word-counter.service';
import { CreateArticleWordCounterDto } from './dto/create-article-word-counter.dto';
import { UpdateArticleWordCounterDto } from './dto/update-article-word-counter.dto';

@Controller('article-word-counter')
export class ArticleWordCounterController {
  constructor(private readonly articleWordCounterService: ArticleWordCounterService) {}

  @Get()
  getList(@Query() query: { num?: number}) {
    return this.articleWordCounterService.getList(query);
  }

}
