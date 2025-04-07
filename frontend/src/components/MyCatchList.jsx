export default function MyCatchList({ catches, onDelete }) {
  return (
    <div className="my-catches">
      <h3>Mina fångster</h3>
      {catches.length === 0 ? (
        <p>Inga fångster registrerade ännu.</p>
      ) : (
        <ul>
          {catches.map((catchItem) => (
            <li key={catchItem._id}>
              {catchItem.date} - {catchItem.fish} ({catchItem.length} cm)
              <button onClick={() => onDelete(catchItem._id)}>Ta bort</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
