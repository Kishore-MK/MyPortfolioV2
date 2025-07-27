import { CardContent } from "@/components/ui/card";
import { Tweet as TweetType } from "@/lib/portfolio-data";
import { Tweet as TweetEmbed } from 'react-tweet';

export function TweetsSection({ tweet }: { tweet: TweetType }) {
  if (!tweet || !tweet.tweetId) {
    return null; 
  }

  return (
    <div className="p-2 md:p-4 min-h-[300px] flex items-center justify-center">
      <CardContent className="p-0 w-full max-w-xl">
        <div className="w-full [&>div]:mx-auto">
          <TweetEmbed id={tweet.tweetId} />
        </div>
      </CardContent>
    </div>
  );
}
