'use client';

import { CardContent } from "@/components/ui/card";
import { Tweet as TweetType } from "@/lib/portfolio-data";
import { useTweet, EmbeddedTweet, TweetNotFound, TweetSkeleton } from 'react-tweet';

// react-tweet's addEntities() does `for (const entity of entities)` with no null guard.
// If the Twitter API returns null (not undefined) for any entity array, it throws.
// We patch before passing to EmbeddedTweet.
function patchTweetEntities(tweet: any): any {
  if (!tweet) return tweet;
  return {
    ...tweet,
    entities: {
      hashtags: [],
      user_mentions: [],
      urls: [],
      symbols: [],
      ...tweet.entities,
      // Override any null values back to empty arrays
      ...(tweet.entities && {
        hashtags: tweet.entities.hashtags ?? [],
        user_mentions: tweet.entities.user_mentions ?? [],
        urls: tweet.entities.urls ?? [],
        symbols: tweet.entities.symbols ?? [],
      }),
    },
    quoted_tweet: tweet.quoted_tweet
      ? patchTweetEntities(tweet.quoted_tweet)
      : tweet.quoted_tweet,
  };
}

function SafeTweetEmbed({ id }: { id: string }) {
  const { data, error, isLoading } = useTweet(id);

  if (isLoading) return <TweetSkeleton />;
  if (error || !data) return <TweetNotFound />;

  return <EmbeddedTweet tweet={patchTweetEntities(data)} />;
}

export function TweetsSection({ tweet }: { tweet: TweetType }) {
  if (!tweet || !tweet.tweetId) return null;

  return (
    <div className="p-2 md:p-4 min-h-[300px] flex items-center justify-center">
      <CardContent className="p-0 w-full max-w-xl">
        <div className="w-full [&>div]:mx-auto">
          <SafeTweetEmbed id={tweet.tweetId} />
        </div>
      </CardContent>
    </div>
  );
}
