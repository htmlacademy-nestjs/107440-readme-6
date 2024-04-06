import { Controller, Post, Delete, Param, Get } from '@nestjs/common';

@Controller('feed')
export class FeedController {
  @Get('/')
  getFeed() {
    // Implementation
  }

  @Post('/subscribe/:userId')
  subscribeToUser(@Param('postId') postId: string) {
    // Implementation
  }

  @Delete('/subscribe/:userId')
  unsubscribeFromUser(@Param('userId') userId: string) {
    // Implementation
  }
}
