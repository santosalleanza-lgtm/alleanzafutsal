import type { ReactNode } from "react";

type Base = { name: string; label: string; hint?: ReactNode; className?: string };

export function Text({ name, label, hint, className = "", defaultValue, required, type = "text", placeholder }: Base & { defaultValue?: string | number | null; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue ?? ""} required={required} placeholder={placeholder} className="field" />
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}

export function Area({ name, label, hint, className = "", defaultValue, rows = 4 }: Base & { defaultValue?: string | null; rows?: number }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">{label}</label>
      <textarea id={name} name={name} defaultValue={defaultValue ?? ""} rows={rows} className="field" />
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}

export function Check({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-[#C6F432]" />
      {label}
    </label>
  );
}

export function Select({ name, label, options, defaultValue, className = "" }: Base & { options: { value: string; label: string }[]; defaultValue?: string | null }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="label">{label}</label>
      <select id={name} name={name} defaultValue={defaultValue ?? options[0]?.value} className="field">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function Upload({ label, multiple, hint }: { label: string; multiple?: boolean; hint?: string }) {
  return (
    <div>
      <label htmlFor="upload" className="label">{label}</label>
      <input id="upload" name="upload" type="file" accept="image/png,image/jpeg,image/webp,image/avif" multiple={multiple} className="block w-full text-sm text-chalk-muted file:mr-4 file:rounded-full file:border-0 file:bg-lime file:px-4 file:py-2 file:font-semibold file:text-ink" />
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
}

export const centsToInput = (c: number | null | undefined) => (c === null || c === undefined ? "" : (c / 100).toFixed(2).replace(".", ","));
