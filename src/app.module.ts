import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleWordCounterModule } from './article-word-counter/article-word-counter.module';

@Module({
  imports: [ArticleWordCounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
