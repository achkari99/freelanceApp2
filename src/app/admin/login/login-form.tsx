"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

const initialState: LoginState = { error: undefined };

export function LoginForm() {
  const [state, formAction] = useFormState<LoginState, FormData>(login, initialState);

  useEffect(() => {
    if (state?.error) {
      // eslint-disable-next-line no-console -- Surface auth errors to the console in dev for debugging.
      console.warn(state.error);
    }
  }, [state?.error]);

  return (
    <form className="space-y-6" action={formAction}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-400">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
          placeholder="you@rightmind-labs.online"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-medium text-slate-400">
          <label htmlFor="password">Password</label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
          placeholder="••••••••"
        />
      </div>
      {state?.error ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      ) : null}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_-30px_rgba(56,189,248,0.9)] transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Signing in…" : "Enter the console"}
    </button>
  );
}
