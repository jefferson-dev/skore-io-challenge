import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum Types {
  video = 'video',
  pdf = 'pdf',
  image = 'image',
}

registerEnumType(Types, {
  name: 'Types',
});

@ObjectType()
export class Content {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Types)
  type: Types;

  @Field(() => Number)
  views: number;
}
