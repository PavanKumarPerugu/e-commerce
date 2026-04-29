export type UserReview = {
  id: string;          // ✅ change to string
  productId: string;   // ✅ change to string
  userName: string;
  userImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: Date;
};

export type AddReviewParams = Pick<UserReview, 'title' | 'comment' | 'rating'>;