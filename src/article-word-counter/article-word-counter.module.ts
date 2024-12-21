import { Module } from '@nestjs/common';
import { ArticleWordCounterService } from './article-word-counter.service';
import { ArticleWordCounterController } from './article-word-counter.controller';

@Module({
  controllers: [ArticleWordCounterController],
  providers: [ArticleWordCounterService],
})
export class ArticleWordCounterModule {}
