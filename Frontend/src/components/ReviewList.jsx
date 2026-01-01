function ReviewList({ reviews }) {
  return (
    <div style={{ marginTop: 30 }}>
      <h3>Sample Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} style={{ marginBottom: 8 }}>
            {review}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
