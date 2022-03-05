import { getTweetById } from './functions/getTweetById.function';
import { getTweets } from './functions/getTweets.function';
import { editTweet } from './functions/editTweet.function';
import { addTweet } from './functions/addTweet.function';
import { deleteTweet } from './functions/deleteTweet.function';
import { toggleLikeTweet } from './functions/likeTweet.function';

export default {
  Query: {
    tweets: getTweets,
    tweet: getTweetById,
  },
  Mutation: {
    addTweet,
    editTweet,
    deleteTweet,
    toggleLikeTweet,
  },
};
