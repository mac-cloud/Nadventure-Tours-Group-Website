// ReviewSection.js
const ReviewSection = ({ reviews }) => {
  return (
    <div className="reviews">
      <h4>Reviews</h4>
      {reviews && reviews.length > 0 ? (
        reviews.map((rev, index) => (
          <div key={index} className="review-item">
            <p><strong>{rev.user}</strong> rated: {rev.rating}/5</p>
            <p>{rev.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewSection;
