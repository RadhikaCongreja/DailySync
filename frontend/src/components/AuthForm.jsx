const AuthForm = ({ children, title, onSubmit, error }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{title}</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={onSubmit} autoComplete="on">
          {children}
        </form>
      </div>
    </div>
  );
};
export default AuthForm;
