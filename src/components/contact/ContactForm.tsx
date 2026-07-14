import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/MkButton";
import { useLocale } from "@/lib/locale";
import { getDict } from "@/content/i18n";
import { whatsappUrl, mailtoUrl, siteConfig } from "@/config/site";

const buildSchema = (msgs: { required: string; invalidEmail: string }) =>
  z.object({
    name: z.string().trim().min(1, msgs.required).max(120),
    company: z.string().trim().max(160).optional().default(""),
    whatsapp: z.string().trim().min(1, msgs.required).max(40),
    email: z.string().trim().email(msgs.invalidEmail).max(200),
    need: z.string().trim().min(1, msgs.required).max(2000),
    stage: z.string().trim().min(1, msgs.required),
    budget: z.string().trim().max(120).optional().default(""),
    date: z.string().trim().max(120).optional().default(""),
  });

type Values = z.infer<ReturnType<typeof buildSchema>>;

export function ContactForm() {
  const locale = useLocale();
  const dict = getDict(locale);
  const c = dict.contact;
  const f = c.fields;

  const [values, setValues] = useState<Values>({
    name: "",
    company: "",
    whatsapp: "",
    email: "",
    need: "",
    stage: "",
    budget: "",
    date: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof Values>(key: K, v: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const schema = buildSchema({ required: f.required, invalidEmail: f.invalidEmail });
    const result = schema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof Values;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const brief = buildBrief(result.data, c.briefLabel, f);
    window.open(whatsappUrl(brief), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={f.name} error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputCls}
            autoComplete="name"
            required
          />
        </Field>
        <Field label={f.company}>
          <input
            type="text"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputCls}
            autoComplete="organization"
          />
        </Field>
        <Field label={f.whatsapp} error={errors.whatsapp}>
          <input
            type="tel"
            value={values.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            className={inputCls}
            autoComplete="tel"
            required
          />
        </Field>
        <Field label={f.email} error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
            autoComplete="email"
            required
          />
        </Field>
      </div>

      <Field label={f.need} error={errors.need}>
        <textarea
          value={values.need}
          onChange={(e) => update("need", e.target.value)}
          rows={4}
          className={inputCls + " min-h-[110px] resize-y"}
          required
        />
      </Field>

      <Field label={f.stage} error={errors.stage}>
        <select
          value={values.stage}
          onChange={(e) => update("stage", e.target.value)}
          className={inputCls + " cursor-pointer"}
          required
        >
          <option value="">{f.stagePlaceholder}</option>
          {c.stages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={f.budget}>
          <input
            type="text"
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={f.date}>
          <input
            type="text"
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" variant="primary" size="lg">
          {f.submit}
        </Button>
        <span className="font-mono text-[11px] tracking-[0.18em] text-ink-3">
          {c.fallback}
        </span>
      </div>

      {submitted ? (
        <div className="mt-4 rounded-md border border-line-2 bg-surface/60 p-5">
          <div className="mk-eyebrow">{c.successTitle}</div>
          <p className="mt-2 text-sm text-ink-2">{c.successBody}</p>
          <a
            href={mailtoUrl(c.briefLabel, buildBrief(values, c.briefLabel, f))}
            className="mt-3 inline-block font-mono text-[11px] tracking-[0.2em] text-cyan hover:underline"
          >
            {siteConfig.email}
          </a>
        </div>
      ) : null}
    </form>
  );
}

const inputCls =
  "w-full rounded-md border border-line bg-bg-2/80 px-4 py-3 text-[15px] text-ink placeholder-ink-3 outline-none transition-colors focus:border-cyan focus:bg-bg-2";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10.5px] tracking-[0.2em] text-ink-3 uppercase">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block font-mono text-[11px] text-py-red">{error}</span>
      ) : null}
    </label>
  );
}

function buildBrief(
  v: Values,
  title: string,
  labels: { name: string; company: string; whatsapp: string; email: string; need: string; stage: string; budget: string; date: string },
): string {
  const lines = [
    `— ${title} —`,
    "",
    `${labels.name}: ${v.name}`,
    v.company ? `${labels.company}: ${v.company}` : "",
    `${labels.whatsapp}: ${v.whatsapp}`,
    `${labels.email}: ${v.email}`,
    "",
    `${labels.need}:`,
    v.need,
    "",
    `${labels.stage}: ${v.stage}`,
    v.budget ? `${labels.budget}: ${v.budget}` : "",
    v.date ? `${labels.date}: ${v.date}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}
