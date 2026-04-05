"use client";

import { FormEvent, useState } from "react";

export function AdminLogin() {
  const [username, setUsername] = useState("epyxdermaadmin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error || "Unable to sign in.");
      return;
    }

    window.location.reload();
  }

  return (
    <section className="admin-auth">
      <div className="admin-auth__card">
        <span className="eyebrow">Staff access</span>
        <h2>Sign in to EpyxDerma Admin</h2>
        <p>
          Use an active admin login to enter the role-based workspace. The bootstrap
          environment credentials create the first super user, and that super user can
          create campaign, receptionist, and management logins afterward.
        </p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="button-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
