export default function SentimentCards({ sentiment }) {
  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      {Object.entries(sentiment).map(([key, value]) => (
        <div key={key} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <h4>{key.toUpperCase()}</h4>
          <h2>{value}</h2>
        </div>
      ))}
    </div>
  );
}
