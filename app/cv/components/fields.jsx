"use client";

// Small form primitives shared by all builder panels — dark theme matching the site.

export function Field({ label, hint, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">{label}</span>
      {children}
      {hint ? <span className="block text-[11px] text-gray-500 mt-1">{hint}</span> : null}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg bg-[#0c1a2e] border border-[#1a3a5c] px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#00d4ff] transition-colors";

export function Input(props) {
  return <input {...props} className={inputCls} />;
}

export function TextArea({ rows = 3, ...props }) {
  return <textarea rows={rows} {...props} className={`${inputCls} resize-y leading-relaxed`} />;
}

export function Row({ children }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

export function SmallBtn({ onClick, children, danger, title, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`px-2 py-1 rounded-md text-xs border transition-colors disabled:opacity-30 ${
        danger
          ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
          : "border-[#1a3a5c] text-gray-300 hover:border-[#00d4ff] hover:text-[#00d4ff]"
      }`}
    >
      {children}
    </button>
  );
}

export function AddBtn({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full mt-1 py-2 rounded-lg border border-dashed border-[#1a3a5c] text-sm text-gray-400 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
    >
      + {children}
    </button>
  );
}

// Collapsible editor card for one list item (experience, project, …).
export function ItemCard({ title, subtitle, onRemove, onUp, onDown, isFirst, isLast, removeLabel, children }) {
  return (
    <details className="group rounded-xl border border-[#1a3a5c] bg-[#081222] mb-2 open:border-[#00d4ff]/40">
      <summary className="flex items-center justify-between gap-2 px-3 py-2.5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <p className="text-sm text-white font-medium truncate">{title || "—"}</p>
          {subtitle ? <p className="text-xs text-gray-500 truncate">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.preventDefault()}>
          <SmallBtn onClick={onUp} disabled={isFirst} title="↑">↑</SmallBtn>
          <SmallBtn onClick={onDown} disabled={isLast} title="↓">↓</SmallBtn>
          <SmallBtn onClick={onRemove} danger title={removeLabel}>✕</SmallBtn>
          <span className="text-gray-500 text-xs ml-1 transition-transform group-open:rotate-180">▾</span>
        </div>
      </summary>
      <div className="px-3 pb-3 pt-1 border-t border-[#1a3a5c]/50">{children}</div>
    </details>
  );
}

export function PanelTitle({ children }) {
  return <h3 className="text-sm font-bold text-white uppercase tracking-wider mt-5 mb-3 first:mt-0">{children}</h3>;
}

export function Seg({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-[#1a3a5c] overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            value === opt.value ? "bg-[#00d4ff]/15 text-[#00d4ff]" : "text-gray-400 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full py-2 text-sm text-gray-300"
    >
      <span>{label}</span>
      <span
        className={`relative inline-block w-9 h-5 rounded-full transition-colors ${
          checked ? "bg-[#00d4ff]" : "bg-[#1a3a5c]"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${checked ? "left-[18px]" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}
