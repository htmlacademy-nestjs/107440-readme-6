import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FeedResponseMessage } from './feed.constant';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedResponseMessage.FeedIsReady,
  })
  @Get('/')
  getFeed() {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: FeedResponseMessage.Subscribe,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FeedResponseMessage.UserNotFound,
  })
  @Post('/subscribe/:userId')
  subscribeToUser(@Param('postId') postId: string) {
    // Implementation
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: FeedResponseMessage.Unsubscribe,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: FeedResponseMessage.UserNotFound,
  })
  @Delete('/subscribe/:userId')
  unsubscribeFromUser(@Param('userId') userId: string) {
    // Implementation
  }
}
