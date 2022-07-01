import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { Content } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';
import { GqlAuthGuard } from '../../infra/auth/jwt-auth.guard';
import { AuthUser, CurrentUser } from '../../infra/auth/current-user';

@Resolver(() => Content)
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}

  @Mutation(() => Content)
  @UseGuards(GqlAuthGuard)
  createContent(
    @CurrentUser() authUser: AuthUser,
    @Args('createContentInput') createContentInput: CreateContentInput,
  ) {
    return this.contentService.create(authUser, createContentInput);
  }

  @Query(() => [Content])
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.contentService.findAll();
  }

  @Query(() => Content)
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.contentService.findOne(id);
  }

  @Mutation(() => Content)
  @UseGuards(GqlAuthGuard)
  updateContent(
    @CurrentUser() authUser: AuthUser,
    @Args('updateContentInput') updateContentInput: UpdateContentInput,
  ) {
    return this.contentService.update(
      authUser,
      updateContentInput.id,
      updateContentInput,
    );
  }

  @Mutation(() => Content)
  @UseGuards(GqlAuthGuard)
  removeContent(
    @CurrentUser() authUser: AuthUser,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.contentService.remove(authUser, id);
  }
}
