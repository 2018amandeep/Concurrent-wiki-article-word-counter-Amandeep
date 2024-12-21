import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleWordCounterDto } from './create-article-word-counter.dto';

export class UpdateArticleWordCounterDto extends PartialType(CreateArticleWordCounterDto) {}
