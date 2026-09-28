const CodePanel = ({ activeLines, code, language }) => (
  <section className="visualizer-card">
    <div className="panel-heading">
      <div>
        <p className="panel-kicker">Code Panel</p>
        <h2>{language}</h2>
      </div>
      <span className="panel-badge">Highlighted execution</span>
    </div>

    <div className="code-panel">
      {code.map((line, index) => {
        const lineNumber = index + 1;
        const isActive = activeLines.includes(lineNumber);
        return (
          <div key={lineNumber} className={`code-line ${isActive ? "active" : ""}`}>
            <span className="code-line-number">{lineNumber}</span>
            <code>{line}</code>
          </div>
        );
      })}
    </div>
  </section>
);

export default CodePanel;
