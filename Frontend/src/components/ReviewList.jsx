export default function ReviewList({ reviews }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Sample Reviews</h3>

      {Object.entries(reviews).map(([type, list]) => (
        <div key={type}>
          <h4>{type.toUpperCase()}</h4>
          {list.map((review, index) => (
            <p key={index} style={{ borderBottom: "1px solid #ddd" }}>
              {review}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
