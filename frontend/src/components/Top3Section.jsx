export default function Top3Section({ top3Abborre, top3Gadda }) {
  return (
    <div className="top3-container">
      <div className="top3-box">
        <h2>Top 3 Största Abborre</h2>
        <ul>
          {top3Abborre.map((item, index) => (
            <li key={index}>
              {item.fisherman}: {item.length} cm
            </li>
          ))}
        </ul>
      </div>
      <div className="top3-box">
        <h2>Top 3 Största Gädda</h2>
        <ul>
          {top3Gadda.map((item, index) => (
            <li key={index}>
              {item.fisherman}: {item.length} cm
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
