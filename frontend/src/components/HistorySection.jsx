export default function HistorySection({ catches }) {
  return (
    <div className="history-container">
      <h2>Historik</h2>
      <ul>
        {catches.map((item, index) => (
          <li key={index}>
            {item.date?.slice(0, 10) || "okänt datum"} – {item.fish} –{" "}
            {item.length} cm ({item.fisherman})
          </li>
        ))}
      </ul>
    </div>
  );
}
