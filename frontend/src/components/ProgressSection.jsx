export default function ProgressSection({ catches }) {
  // Summera längder per person och fisk
  const totals = {};

  catches.forEach(({ fisherman, fish, length }) => {
    if (!totals[fisherman]) {
      totals[fisherman] = { Abborre: 0, Gädda: 0 };
    }
    totals[fisherman][fish] += length;
  });

  const maxLength = { Abborre: 1000, Gädda: 1500 };

  return (
    <div className="progress-container">
      <h2>Sammanställning av Fångster</h2>
      {Object.entries(totals).map(([name, fishData]) => (
        <div className="progress-box" key={name}>
          <h3>{name}</h3>

          {["Abborre", "Gädda"].map((fish) => {
            const length = fishData[fish];
            const percent = Math.min((length / maxLength[fish]) * 100, 100);

            return (
              <div key={fish}>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div>
                  {length} / {maxLength[fish]} cm {fish}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
