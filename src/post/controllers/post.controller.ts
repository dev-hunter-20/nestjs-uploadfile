import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPost() {
    return this.postService.getAllPosts();
  }

  @Post()
  async createPost(@Req() req: any, @Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }
}
