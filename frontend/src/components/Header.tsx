import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <div className="header__logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h1 className="header__title">Security Alert Dashboard</h1>
            <p className="header__subtitle">Real-time monitoring and incident visibility</p>
          </div>
        </div>
        <div className="header__status">
          <span className="header__status-dot" />
          Systems operational
        </div>
      </div>
    </header>
  );
}
