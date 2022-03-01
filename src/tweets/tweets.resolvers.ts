import { getTweetById } from './functions/getTweetById.function';
import { getTweets } from './functions/getTweets.function';
import { editTweet } from './functions/editTweet.function';
import { addTweet } from './functions/addTweet.function';
import { deleteTweet } from './functions/deleteTweet.function';

export default {
  Query: {
    tweets: getTweets,
    tweet: getTweetById,
  },
  Mutation: {
    addTweet,
    editTweet,
    deleteTweet,
  },
};
