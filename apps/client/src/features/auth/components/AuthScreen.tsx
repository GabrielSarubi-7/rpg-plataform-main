import { useState } from "react";

import { useAuthStore } from "../store/authStore";

import styles from "./AuthScreen.module.css";

type AuthMode = "login" | "register";

type IconProps = {
  className?: string;
};

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const clearError = useAuthStore((state) => state.clearError);

  const isRegister = mode === "register";

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isRegister) {
      await register({
        name,
        email,
        password,
      });
      return;
    }

    await login({
      email,
      password,
    });
  };

  const changeMode = (nextMode: AuthMode) => {
    clearError();
    setMode(nextMode);
  };

  return (
    <main className={styles.screen}>
      <section className={styles.card} aria-label="Acesso da mesa">
        <div className={styles.seal} aria-hidden="true">
          <DiceIcon className={styles.sealIcon} />
        </div>

        <div className={styles.header}>
          <h1>{isRegister ? "Crie sua conta" : "Entre na sua mesa"}</h1>
          <p>
            {isRegister
              ? "Prepare sua campanha e comece uma nova aventura."
              : "Continue sua campanha e volte para a aventura."}
          </p>
        </div>

        <form className={styles.form} onSubmit={submit}>
          {isRegister && (
            <label className={styles.inputFrame}>
              <UserIcon className={styles.inputIcon} />
              <input
                className={styles.input}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nome"
                autoComplete="name"
              />
            </label>
          )}

          <label className={styles.inputFrame}>
            <MailIcon className={styles.inputIcon} />
            <input
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              type="email"
              autoComplete="email"
            />
          </label>

          <label className={styles.inputFrame}>
            <LockIcon className={styles.inputIcon} />
            <input
              className={styles.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
            <button
              type="button"
              className={styles.visibilityButton}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? (
                <EyeOffIcon className={styles.visibilityIcon} />
              ) : (
                <EyeIcon className={styles.visibilityIcon} />
              )}
            </button>
          </label>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.primaryButton}
            disabled={loading}
          >
            <SparkIcon className={styles.buttonSpark} />
            <span>
              {loading
                ? "Carregando..."
                : isRegister
                  ? "Criar conta"
                  : "Entrar"}
            </span>
            <SparkIcon className={styles.buttonSpark} />
          </button>
        </form>

        <div className={styles.divider} aria-hidden="true">
          <span />
        </div>

        <div className={styles.secondaryActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => changeMode(isRegister ? "login" : "register")}
          >
            <UserPlusIcon className={styles.secondaryIcon} />
            <span>{isRegister ? "Já tenho conta" : "Criar nova conta"}</span>
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={clearError}
          >
            <SteamIcon className={styles.secondaryIcon} />
            <span>Entrar com Steam</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function DiceIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M32 8 54 21v22L32 56 10 43V21L32 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M10 21h44M32 8v48M10 43l44-22M54 43 10 21M20 28l12-20 12 20-12 28-12-28Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <circle cx="40" cy="24" r="2" fill="currentColor" />
      <circle cx="25" cy="42" r="2" fill="currentColor" />
      <circle cx="39" cy="42" r="2" fill="currentColor" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 5h16v14H4V5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 10h14v10H5V10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 14v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function EyeOffIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 3l18 18M9.6 5.9A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.2 4.1M6.4 7.7A17 17 0 0 0 2.5 12S6 18.5 12 18.5a9.5 9.5 0 0 0 4-.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6 10.6a3 3 0 0 0 4.2 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="8"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 21c1.4-4 4-6 8-6s6.6 2 8 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserPlusIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="10"
        cy="8"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M2.5 21c1.2-4 3.7-6 7.5-6 2.2 0 4 .7 5.3 2M18 10v8M14 14h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SteamIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="15.8" cy="8.2" r="2.3" fill="currentColor" />
      <circle
        cx="15.8"
        cy="8.2"
        r="3.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="8.4" cy="15.7" r="2.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10.1 14.2 13.4 11M6.3 14.8 3.8 13.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SparkIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5 14.8 9 21.5 12l-6.7 3L12 21.5 9.2 15 2.5 12l6.7-3L12 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
