// src/articles/articles.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }
  findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  findNotesByEmail(user: string) {
    const email = this.authService.validateUser(user);

    if (!email)
      throw new NotFoundException('You do not have access to these articles');

    return this.prisma.article.findMany({ where: { userEmail: user } });
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
