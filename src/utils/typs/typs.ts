export interface VideoData extends CommentsData {
  items: {
    id: {
      videoId: string;
    };
    snippet: {
      kind: string;
      channelId: string;
      channelTitle: string;
      title: string;
      description: string;
      customUrl: string;
      publishTime: string;
      publishedAt: string;
      thumbnails: { high: { url: string }; width: number; height: number };
      localized: {
        title: string;
      };
      topLevelComment: CommentsData;
    };
    statistics: {
      viewCount: number;
      likeCount: number;
      dislikeCount: number;
      subscriberCount: number;
      videoCount: number;
    };
    brandingSettings: {
      channel: {
        title: string;
        description: string;
        keywords: string;
        unsubscribedTrailer: string;
      };
      image: {
        bannerExternalUrl: string;
      };
    };
  }[];
}

export interface VideoID {
  video: string;
}

export interface CommentsData {
  snippet: {
    authorChannelId: { value: string };

    authorChannelUrl: string;

    authorDisplayName: string;

    authorProfileImageUrl: string;
    textOriginal: string;
    textDisplay: string;
    likeCount: number;
  };
}
