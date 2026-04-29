export type UserReview = {
  id: number;
  productId: number;
  userName: string;
  userImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: Date;
};

export type AddReviewParams = Pick<UserReview, 'title' | 'comment' | 'rating'>;