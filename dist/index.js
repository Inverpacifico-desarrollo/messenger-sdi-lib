"use client";
var vn = Object.defineProperty;
var wn = (t, r, n) => r in t ? vn(t, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[r] = n;
var Ie = (t, r, n) => wn(t, typeof r != "symbol" ? r + "" : r, n);
import { jsx as e, jsxs as i, Fragment as Me } from "react/jsx-runtime";
import yn, { forwardRef as Xt, useState as k, useMemo as Pe, createContext as bt, useEffect as Z, useRef as O, useContext as xt, useCallback as Q, useSyncExternalStore as Or, useLayoutEffect as Nn } from "react";
import kn from "axios";
import { twMerge as Cn } from "tailwind-merge";
import { Bot as ur, Users as Yt, X as Xe, Loader2 as je, Ticket as mr, MapPin as Sn, Clock as dt, MicOff as hr, Mic as fr, BookOpen as zn, CheckCircle2 as ut, Sparkles as pr, ChevronsDown as or, Camera as _n, Monitor as An, Send as In, Minimize2 as En, PhoneOff as br, ShieldCheck as Jt, ArrowDown as Tn, ArrowUp as Dn, Maximize2 as Mn, Lock as mt, ArrowLeft as xr, Phone as Pn, Info as Rn, ExternalLink as Ln, Check as gr, Copy as jn, FileText as Fn, Download as Bn, CheckCheck as $n, Paperclip as Pr, Bold as Un, Italic as Hn, Underline as Wn, Strikethrough as qn, List as Vn, ListOrdered as On, Code as Gn, Link2 as Kn, EyeOff as Xn, Eye as Yn, Type as Jn, SendHorizontal as Qt, ArrowRight as Qn, Headset as Zn, AlertCircle as vr, Star as ea, UploadCloud as ta, RotateCcw as ra, MessagesSquare as wr, MessageSquarePlus as At, User as Ut, Search as Gr, AlertTriangle as yr, MessageCircleMore as na, WifiOff as aa, LifeBuoy as cr, ChevronRight as Rr, Tag as sa, MessageSquare as ia, RefreshCw as Kr, Inbox as la, CalendarDays as oa } from "lucide-react";
import { createPortal as Nr } from "react-dom";
import { toast as Ne } from "sonner";
import { parseISO as kr, isValid as ca, isToday as da, isYesterday as ua, isThisWeek as ma, format as Ht } from "date-fns";
import ha from "pusher-js";
typeof globalThis < "u" && typeof globalThis.self > "u" && (globalThis.self = globalThis);
let rt = null;
const fa = (t) => {
  rt = t;
}, pa = (t) => Object.entries(t).reduce((r, [n, a]) => (r[n] = typeof a == "boolean" ? Number(a) : a, r), {}), We = (t, r) => {
  if (!rt)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  return `${rt.apiBaseUrl.replace(/\/+$/, "")}/${t}/api/${r}`;
}, ba = (t) => {
  try {
    const r = new URL(t.includes("://") ? t : `http://${t}`).hostname;
    return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(r) && r.split(".").every((a) => Number(a) <= 255);
  } catch {
    return !1;
  }
}, Dt = (t, r) => {
  if (!rt)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const n = rt.apiHelpdeskBaseUrl ? rt.apiHelpdeskBaseUrl.replace(/\/+$/, "") : rt.apiBaseUrl.replace(/\/+$/, "");
  return ba(n) ? `${n}/${t}/api/${r}` : `${n}/api/${r}`;
}, Re = async ({
  data: t,
  url: r,
  params: n,
  method: a,
  headers: s,
  ...l
}) => {
  if (!rt)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const o = {
    ...l,
    url: r,
    method: a,
    data: t,
    params: n ? pa(n) : void 0,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...rt.authToken ? { Authorization: `Bearer ${rt.authToken}` } : {},
      ...s
    }
  };
  return kn.request(o);
}, xa = (t) => Re({
  url: `${We("messenger", "v1")}/users`,
  method: "GET",
  params: t
}), ga = (t) => Re({
  url: `${We("messenger", "v1")}/users/${t}/user`,
  method: "GET"
}), va = ({
  applicationId: t,
  userId: r
}) => Re({
  url: `${We("auth", "v1")}/users/${r}/permissions`,
  method: "GET",
  params: {
    application_id: t
  }
}), wa = () => Re({
  url: `${We("auth", "v1")}/me`,
  method: "GET"
});
function $(...t) {
  const r = [], n = (a) => {
    if (a) {
      if (typeof a == "string" || typeof a == "number")
        r.push(String(a));
      else if (Array.isArray(a))
        a.forEach(n);
      else if (typeof a == "object")
        for (const [s, l] of Object.entries(a))
          l && r.push(s);
    }
  };
  return t.forEach(n), Cn(r.join(" "));
}
const fe = Xt(
  ({ className: t, variant: r = "default", size: n = "default", type: a = "button", disabled: s, children: l, ...o }, d) => {
    const m = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer", c = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-xs",
      primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-xs",
      outline: "border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300",
      secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
    }, p = {
      default: "h-9 px-4 py-2 text-sm rounded-lg gap-2",
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      lg: "h-10 px-6 text-base rounded-xl gap-2.5",
      icon: "size-9 p-0 rounded-lg",
      "icon-sm": "size-8 p-0 rounded-lg"
    };
    return /* @__PURE__ */ e(
      "button",
      {
        ref: d,
        type: a,
        disabled: s,
        className: $(m, c[r], p[n], t),
        ...o,
        children: l
      }
    );
  }
);
fe.displayName = "ChatButton";
const Cr = Xt(
  ({ className: t, type: r = "text", disabled: n, ...a }, s) => /* @__PURE__ */ e(
    "input",
    {
      ref: s,
      type: r,
      disabled: n,
      className: $(
        "flex h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        t
      ),
      ...a
    }
  )
);
Cr.displayName = "ChatInput";
const Zt = Xt(
  ({ className: t, disabled: r, ...n }, a) => /* @__PURE__ */ e(
    "textarea",
    {
      ref: a,
      disabled: r,
      className: $(
        "flex min-h-15 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        t
      ),
      ...n
    }
  )
);
Zt.displayName = "ChatTextarea";
function ot({ className: t, variant: r = "default", children: n, ...a }) {
  return /* @__PURE__ */ e("span", { className: $("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
  }[r], t), ...a, children: n });
}
function ya(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].substring(0, 2).toUpperCase() : (r[0][0] + r[r.length - 1][0]).toUpperCase();
}
const Lr = [
  "#2563EB",
  "#0EA5E9",
  "#38BDF8",
  "#3B82F6",
  "#1D4ED8",
  "#60A5FA",
  "#10B981",
  "#22C55E",
  "#4ADE80",
  "#16A34A",
  "#86EFAC",
  "#65A30D",
  "#8B5CF6",
  "#A855F7",
  "#C084FC",
  "#9333EA",
  "#818CF8",
  "#6366F1",
  "#F43F5E",
  "#E11D48",
  "#FB7185",
  "#DC2626",
  "#F87171",
  "#BE123C",
  "#F97316",
  "#FB923C",
  "#EA580C",
  "#F59E0B",
  "#D97706",
  "#FBBF24",
  "#E879F9",
  "#D946EF",
  "#EC4899",
  "#F472B6",
  "#DB2777",
  "#3F3F46",
  "#6B7280",
  "#9CA3AF",
  "#111827"
];
function Na(t) {
  if (!t) return "#62748e";
  let r = 0;
  for (let n = 0; n < (t || "").length; n++)
    r = (r << 5) - r + (t || "").charCodeAt(n), r |= 0;
  return Lr[Math.abs(r) % Lr.length];
}
function Ye({
  src: t,
  name: r = "",
  size: n = "md",
  isGroup: a = !1,
  isBot: s = !1,
  status: l,
  className: o,
  ...d
}) {
  const [m, c] = k(!1), p = {
    xs: { box: "size-6", text: "text-[10px]", icon: "size-3.5", statusDot: "size-1.5" },
    sm: { box: "size-8", text: "text-xs", icon: "size-4", statusDot: "size-2" },
    md: { box: "size-10", text: "text-sm", icon: "size-5", statusDot: "size-2.5" },
    lg: { box: "size-12", text: "text-base", icon: "size-6", statusDot: "size-3" },
    xl: { box: "size-16", text: "text-xl", icon: "size-8", statusDot: "size-3.5" }
  }, { box: f, text: h, icon: u, statusDot: x } = p[n], w = ya(r), v = Pe(() => Na(r), [r]), y = !!t && !m;
  return /* @__PURE__ */ i("div", { className: $("relative inline-block shrink-0", f, o), ...d, children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: $(
          "flex size-full items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          s && !y ? "bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-600 text-white shadow-violet-500/25 ring-1 ring-violet-400/30" : !y && (a ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "font-semibold text-xs")
        ),
        style: !y && !a && !s ? {
          backgroundColor: `${v}33`,
          color: `${v}FF`,
          fontWeight: "bold"
        } : void 0,
        children: y ? /* @__PURE__ */ e(
          "img",
          {
            src: t,
            alt: r || "Avatar",
            onError: () => c(!0),
            className: "size-full object-cover",
            loading: "lazy"
          }
        ) : s ? /* @__PURE__ */ e(ur, { className: u }) : a ? /* @__PURE__ */ e(Yt, { className: u }) : /* @__PURE__ */ e("span", { className: $("font-bold tracking-tight", h), children: w })
      }
    ),
    l && /* @__PURE__ */ e(
      "span",
      {
        className: $(
          "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-900",
          x,
          l === "online" && "bg-emerald-500",
          l === "offline" && "bg-neutral-400",
          l === "busy" && "bg-amber-500"
        )
      }
    )
  ] });
}
const Xr = bt(null);
function ka() {
  const t = xt(Xr);
  if (!t)
    throw new Error("Los subcomponentes de Dialog deben usarse dentro de <Dialog>");
  return t;
}
function er({ open: t, onOpenChange: r, children: n }) {
  return Z(() => {
    if (!t) return;
    const a = (l) => {
      l.key === "Escape" && r(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", a), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", a);
    };
  }, [t, r]), /* @__PURE__ */ e(Xr.Provider, { value: { open: t, onOpenChange: r }, children: n });
}
function tr({ className: t, children: r, showClose: n = !0, ...a }) {
  const { open: s, onOpenChange: l } = ka(), o = O(null);
  return !s || typeof window > "u" ? null : Nr(
    /* @__PURE__ */ e(
      "div",
      {
        ref: o,
        onClick: (m) => {
          m.target === o.current && l(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ i(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            className: $(
              "relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden transition-all animate-in zoom-in-95 duration-150 text-neutral-900 dark:text-neutral-100",
              t
            ),
            ...a,
            children: [
              n && /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: () => l(!1),
                  "aria-label": "Cerrar",
                  className: "absolute right-3.5 top-3.5 z-20 rounded-lg p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                  children: /* @__PURE__ */ e(Xe, { className: "size-4" })
                }
              ),
              r
            ]
          }
        )
      }
    ),
    document.body
  );
}
function Wt({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: $("flex flex-col gap-1.5 text-left p-5 pb-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", t), ...r });
}
function qt({ className: t, ...r }) {
  return /* @__PURE__ */ e("h3", { className: $("text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100", t), ...r });
}
function Vt({ className: t, ...r }) {
  return /* @__PURE__ */ e("p", { className: $("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", t), ...r });
}
function Ot({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: $("flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", t), ...r });
}
const Yr = bt(null);
function Jr() {
  const t = xt(Yr);
  if (!t)
    throw new Error("Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>");
  return t;
}
function Ca({ open: t, onOpenChange: r, children: n }) {
  return Z(() => {
    if (!t) return;
    const a = (l) => {
      l.key === "Escape" && r(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", a), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", a);
    };
  }, [t, r]), /* @__PURE__ */ e(Yr.Provider, { value: { open: t, onOpenChange: r }, children: n });
}
function Sa({ className: t, children: r, ...n }) {
  const { open: a, onOpenChange: s } = Jr(), l = O(null);
  return !a || typeof window > "u" ? null : Nr(
    /* @__PURE__ */ e(
      "div",
      {
        ref: l,
        onClick: (d) => {
          d.target === l.current && s(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ e(
          "div",
          {
            role: "alertdialog",
            "aria-modal": "true",
            className: $(
              "relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-5 text-neutral-900 dark:text-neutral-100 transition-all animate-in zoom-in-95 duration-150",
              t
            ),
            ...n,
            children: r
          }
        )
      }
    ),
    document.body
  );
}
function za({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: $("flex flex-col gap-2 text-left", t), ...r });
}
function _a({ className: t, ...r }) {
  return /* @__PURE__ */ e("h3", { className: $("text-sm font-bold text-neutral-900 dark:text-neutral-100", t), ...r });
}
function Aa({ className: t, ...r }) {
  return /* @__PURE__ */ e("p", { className: $("text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", t), ...r });
}
function Ia({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: $("flex items-center justify-end gap-2 mt-4", t), ...r });
}
function Ea({
  className: t,
  onClick: r,
  children: n,
  ...a
}) {
  const { onOpenChange: s } = Jr();
  return /* @__PURE__ */ e(
    fe,
    {
      variant: "outline",
      size: "sm",
      onClick: (l) => {
        s(!1), r == null || r(l);
      },
      className: $("text-xs", t),
      ...a,
      children: n || "Cancelar"
    }
  );
}
function Ta({
  className: t,
  variant: r = "danger",
  size: n = "sm",
  ...a
}) {
  return /* @__PURE__ */ e(fe, { variant: r, size: n, className: $("text-xs font-semibold", t), ...a });
}
bt(null);
const Qr = bt(null);
function Da() {
  const t = xt(Qr);
  if (!t)
    throw new Error("Los subcomponentes de Tabs deben usarse dentro de <Tabs>");
  return t;
}
function Zr({
  value: t,
  defaultValue: r = "",
  onValueChange: n,
  className: a,
  children: s,
  ...l
}) {
  const [o, d] = k(r), m = t !== void 0, c = m ? t : o, p = m ? n : d;
  return /* @__PURE__ */ e(Qr.Provider, { value: { value: c, onValueChange: p }, children: /* @__PURE__ */ e("div", { className: $("flex flex-col gap-2 w-full", a), ...l, children: s }) });
}
function en({ className: t, children: r, ...n }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: $(
        "flex w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 text-neutral-500 dark:text-neutral-400 gap-1",
        t
      ),
      ...n,
      children: r
    }
  );
}
function Gt({ value: t, className: r, children: n, ...a }) {
  const { value: s, onValueChange: l } = Da(), o = s === t;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": o,
      onClick: () => l(t),
      className: $(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none cursor-pointer",
        o ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5",
        r
      ),
      ...a,
      children: n
    }
  );
}
const Mt = Xt(
  ({ className: t, children: r, ...n }, a) => /* @__PURE__ */ e(
    "div",
    {
      ref: a,
      className: $(
        "relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]",
        t
      ),
      ...n,
      children: r
    }
  )
);
Mt.displayName = "ChatScrollArea";
function Ma({
  orientation: t = "horizontal",
  className: r,
  ...n
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      role: "separator",
      "aria-orientation": t,
      className: $(
        "shrink-0 bg-neutral-200 dark:bg-neutral-800",
        t === "horizontal" ? "h-px w-full" : "h-full w-px",
        r
      ),
      ...n
    }
  );
}
function Pa({ className: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: $(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100",
        t
      ),
      ...r
    }
  );
}
function le({ className: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: $(
        "animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80",
        t
      ),
      ...r
    }
  );
}
function Ra({
  wsUrl: t,
  apiBaseUrl: r,
  host: n = "172.16.30.114",
  port: a,
  sessionId: s,
  userId: l,
  userAuthId: o,
  conversationId: d,
  senderMessengerId: m
}) {
  let c = "";
  if (t != null && t.trim()) {
    const h = t.trim().replace(/\/+$/, "");
    h.startsWith("http://") ? c = `ws://${h.slice(7)}` : h.startsWith("https://") ? c = `wss://${h.slice(8)}` : h.startsWith("ws://") || h.startsWith("wss://") ? c = h : c = `${typeof window < "u" && window.location.protocol === "https:" ? "wss://" : "ws://"}${h}`;
  } else if (r != null && r.trim())
    c = `${r.trim().replace(/\/+$/, "").replace(/^https:\/\//i, "wss://").replace(/^http:\/\//i, "ws://")}/messenger_voice/ws/voice/call`;
  else {
    const u = typeof window < "u" && window.location.protocol === "https:" ? "wss:" : "ws:", w = `:${a || 8095}`, v = n.replace(/^https?:\/\//i, "").replace(/^wss?:\/\//i, "").replace(/\/+$/, "");
    c = `${u}//${v}${w}/ws/voice/call`;
  }
  const p = new URLSearchParams();
  s && p.set("session_id", String(s)), o != null && String(o) !== "" && p.set("user_auth_id", String(o)), d != null && String(d) !== "" && p.set("conversation_id", String(d)), l != null && String(l) !== "" && p.set("user_id", String(l)), m != null && String(m) !== "" && p.set("sender_messenger_id", String(m));
  const f = p.toString();
  return f ? `${c}?${f}` : c;
}
const La = `
class PcmCaptureProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.targetSampleRate = 16000;
    this.bufferSize = 1600; // 100 ms @ 16 kHz = 3,200 bytes
    this.pcmBuffer = new Int16Array(this.bufferSize);
    this.bufferIndex = 0;
  }

  process(inputs) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const channelData = input[0];
    if (!channelData || channelData.length === 0) return true;

    const inputSampleRate = sampleRate;
    const ratio = inputSampleRate / this.targetSampleRate;

    let inIdx = 0;
    while (inIdx < channelData.length) {
      const sample = channelData[Math.floor(inIdx)];
      const clamped = Math.max(-1.0, Math.min(1.0, sample));
      const int16Sample = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;

      this.pcmBuffer[this.bufferIndex++] = int16Sample;

      if (this.bufferIndex >= this.bufferSize) {
        let sumSquares = 0;
        for (let i = 0; i < this.bufferSize; i++) {
          sumSquares += this.pcmBuffer[i] * this.pcmBuffer[i];
        }
        const rms = Math.sqrt(sumSquares / this.bufferSize);

        const transfer = new Int16Array(this.pcmBuffer);
        this.port.postMessage(
          {
            type: "pcm_chunk",
            buffer: transfer.buffer,
            rms: rms
          },
          [transfer.buffer]
        );

        this.bufferIndex = 0;
      }

      inIdx += ratio;
    }

    return true;
  }
}

registerProcessor("pcm-capture-processor", PcmCaptureProcessor);
`;
function ja() {
  const t = new Blob([La], {
    type: "application/javascript; charset=utf-8"
  });
  return URL.createObjectURL(t);
}
class Fa {
  constructor(r = {}) {
    Ie(this, "inputAudioCtx", null);
    Ie(this, "outputAudioCtx", null);
    Ie(this, "mediaStream", null);
    Ie(this, "analyserNode", null);
    Ie(this, "outputAnalyserNode", null);
    Ie(this, "workletNode", null);
    Ie(this, "scriptProcessor", null);
    Ie(this, "silentGain", null);
    Ie(this, "activeSources", /* @__PURE__ */ new Set());
    Ie(this, "nextPlayTime", 0);
    Ie(this, "isDisposed", !1);
    Ie(this, "isMuted", !1);
    Ie(this, "isDrainingFarewell", !1);
    Ie(this, "latestUserRms", 0);
    Ie(this, "latestBotRms", 0);
    this.options = r;
  }
  getAnalyserNode() {
    return this.analyserNode;
  }
  getOutputAnalyserNode() {
    return this.outputAnalyserNode;
  }
  getLevelsAndDecay() {
    const r = this.isMuted ? 0 : this.latestUserRms;
    let n = this.latestBotRms;
    if (this.outputAnalyserNode) {
      const a = new Uint8Array(this.outputAnalyserNode.frequencyBinCount);
      this.outputAnalyserNode.getByteFrequencyData(a);
      let s = 0;
      for (let o = 0; o < a.length; o++)
        s += a[o];
      const l = s / (a.length * 255);
      n = Math.max(n, l);
    }
    return this.latestUserRms *= 0.85, this.latestBotRms *= 0.9, { userRms: r, botRms: n };
  }
  setMuted(r) {
    this.isMuted = r, r && (this.latestUserRms = 0), this.mediaStream && !this.isDrainingFarewell && this.mediaStream.getAudioTracks().forEach((n) => {
      n.enabled = !r;
    });
  }
  /**
   * Inicializa el contexto de reproducción de salida a 24,000 Hz dentro del gesto del usuario.
   */
  async initOutput() {
    var a, s;
    this.isDisposed = !1;
    const r = window.AudioContext || window.webkitAudioContext;
    if (!r)
      throw new Error("Web Audio API no soportada en este navegador.");
    if (this.outputAudioCtx = new r({ sampleRate: 24e3 }), this.outputAudioCtx.state === "suspended")
      try {
        await this.outputAudioCtx.resume();
      } catch {
      }
    if (this.isDisposed) {
      this.dispose();
      return;
    }
    const n = this.outputAudioCtx.createAnalyser();
    n.fftSize = 64, n.smoothingTimeConstant = 0.65, n.connect(this.outputAudioCtx.destination), this.outputAnalyserNode = n, (s = (a = this.options).onOutputAnalyserReady) == null || s.call(a, n), this.outputAudioCtx && (this.nextPlayTime = this.outputAudioCtx.currentTime);
  }
  /**
   * Inicializa la captura del micrófono a 16,000 Hz Mono Int16 con AnalyserNode para el ecualizador.
   */
  async initMicrophone() {
    var d, m, c;
    if (this.isDisposed) return;
    const r = window.AudioContext || window.webkitAudioContext;
    if (!r)
      throw new Error("Web Audio API no soportada en este navegador.");
    const n = new r();
    if (this.inputAudioCtx = n, n.state === "suspended")
      try {
        await n.resume();
      } catch {
      }
    if (this.isDisposed) {
      try {
        await n.close();
      } catch {
      }
      this.inputAudioCtx = null;
      return;
    }
    if (!((d = navigator == null ? void 0 : navigator.mediaDevices) != null && d.getUserMedia))
      throw new Error("El navegador no soporta captura de micrófono.");
    const a = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: !0,
        noiseSuppression: !0,
        autoGainControl: !0
      }
    });
    if (this.isDisposed || !this.inputAudioCtx || this.inputAudioCtx.state === "closed") {
      a.getTracks().forEach((p) => p.stop()), this.mediaStream = null;
      return;
    }
    this.mediaStream = a, a.getAudioTracks().forEach((p) => {
      p.enabled = !this.isMuted;
    });
    const s = this.inputAudioCtx.createMediaStreamSource(this.mediaStream), l = this.inputAudioCtx.createAnalyser();
    l.fftSize = 64, l.smoothingTimeConstant = 0.65, s.connect(l), this.analyserNode = l, (c = (m = this.options).onAnalyserReady) == null || c.call(m, l), this.silentGain = this.inputAudioCtx.createGain(), this.silentGain.gain.value = 0, this.silentGain.connect(this.inputAudioCtx.destination);
    let o = null;
    try {
      if (o = ja(), await this.inputAudioCtx.audioWorklet.addModule(o), URL.revokeObjectURL(o), o = null, this.isDisposed || !this.inputAudioCtx || this.inputAudioCtx.state === "closed")
        return;
      this.workletNode = new AudioWorkletNode(this.inputAudioCtx, "pcm-capture-processor"), this.workletNode.port.onmessage = (p) => {
        var f, h, u;
        if (((f = p.data) == null ? void 0 : f.type) === "pcm_chunk") {
          const x = p.data.rms || 0, w = Math.min(1, x / 4e3);
          this.latestUserRms = this.isMuted ? 0 : w, !this.isMuted && !this.isDrainingFarewell && ((u = (h = this.options).onPcmChunk) == null || u.call(h, p.data.buffer, w));
        }
      }, s.connect(this.workletNode), this.workletNode.connect(this.silentGain);
    } catch (p) {
      if (o && URL.revokeObjectURL(o), this.isDisposed || !this.inputAudioCtx || this.inputAudioCtx.state === "closed")
        return;
      console.warn("[VoiceAudioEngine] AudioWorklet falló, usando ScriptProcessor fallback:", p), this.initScriptProcessorFallback(s);
    }
  }
  initScriptProcessorFallback(r) {
    if (!this.inputAudioCtx || !this.silentGain) return;
    const n = 4096;
    this.scriptProcessor = this.inputAudioCtx.createScriptProcessor(n, 1, 1);
    const l = this.inputAudioCtx.sampleRate / 16e3, o = 1600, d = new Int16Array(o);
    let m = 0;
    this.scriptProcessor.onaudioprocess = (c) => {
      var h, u;
      const p = c.inputBuffer.getChannelData(0), f = Math.floor(p.length / l);
      for (let x = 0; x < f; x++) {
        const w = p[Math.floor(x * l)], v = Math.max(-1, Math.min(1, w)), y = v < 0 ? v * 32768 : v * 32767;
        if (d[m++] = y, m >= o) {
          let b = 0;
          for (let E = 0; E < o; E++)
            b += d[E] * d[E];
          const C = Math.min(1, Math.sqrt(b / o) / 4e3);
          if (this.latestUserRms = this.isMuted ? 0 : C, !this.isMuted && !this.isDrainingFarewell) {
            const E = new Int16Array(d);
            (u = (h = this.options).onPcmChunk) == null || u.call(h, E.buffer, C);
          }
          m = 0;
        }
      }
    }, r.connect(this.scriptProcessor), this.scriptProcessor.connect(this.silentGain);
  }
  /**
   * Reproduce un chunk binario PCM 16-bit little-endian a 24,000 Hz secuencialmente.
   */
  playAudioChunk(r) {
    if (!this.outputAudioCtx || this.outputAudioCtx.state === "closed") return;
    const n = new Int16Array(r);
    if (n.length === 0) return;
    let a = 0;
    for (let c = 0; c < n.length; c++)
      a += n[c] * n[c];
    this.latestBotRms = Math.min(1, Math.sqrt(a / n.length) / 8e3);
    const s = new Float32Array(n.length);
    for (let c = 0; c < n.length; c++)
      s[c] = n[c] / 32768;
    const l = this.outputAudioCtx.createBuffer(1, s.length, 24e3);
    l.copyToChannel(s, 0);
    const o = this.outputAudioCtx.createBufferSource();
    o.buffer = l, this.outputAnalyserNode ? o.connect(this.outputAnalyserNode) : o.connect(this.outputAudioCtx.destination);
    const d = this.outputAudioCtx.currentTime, m = Math.max(d, this.nextPlayTime);
    o.start(m), this.nextPlayTime = m + l.duration, this.activeSources.add(o), o.onended = () => {
      this.activeSources.delete(o);
    };
  }
  /**
   * Interrupción instantánea (Barge-in): purga la cola de reproducción en < 20 ms.
   */
  stopPlaybackImmediately() {
    this.activeSources.forEach((r) => {
      try {
        r.stop(), r.disconnect();
      } catch {
      }
    }), this.activeSources.clear(), this.outputAudioCtx && this.outputAudioCtx.state !== "closed" && (this.nextPlayTime = this.outputAudioCtx.currentTime), this.latestBotRms = 0;
  }
  /**
   * Espera a que la locución programada en el AudioContext termine por completo
   * antes de cerrar la conexión WebSocket, evitando cortes en la despedida.
   */
  async waitForAudioPlaybackDrain() {
    this.isDrainingFarewell = !0, this.mediaStream && this.mediaStream.getAudioTracks().forEach((s) => {
      s.enabled = !1;
    });
    const r = 80, n = Date.now(), a = 2e4;
    await new Promise((s) => {
      const l = setInterval(() => {
        var c;
        const o = Date.now(), d = ((c = this.outputAudioCtx) == null ? void 0 : c.currentTime) || 0;
        Math.max(0, this.nextPlayTime - d) <= 0.05 && this.activeSources.size === 0 ? (clearInterval(l), setTimeout(s, 450)) : o - n > a && (clearInterval(l), s());
      }, r);
    });
  }
  stopMicrophoneImmediate() {
    var r, n;
    this.mediaStream && (this.mediaStream.getTracks().forEach((a) => {
      try {
        a.stop();
      } catch {
      }
    }), this.mediaStream = null), this.analyserNode = null, (n = (r = this.options).onAnalyserReady) == null || n.call(r, null);
  }
  dispose() {
    var r, n;
    if (this.isDisposed = !0, this.stopPlaybackImmediately(), this.stopMicrophoneImmediate(), this.workletNode) {
      try {
        this.workletNode.disconnect();
      } catch {
      }
      this.workletNode = null;
    }
    if (this.scriptProcessor) {
      try {
        this.scriptProcessor.disconnect();
      } catch {
      }
      this.scriptProcessor = null;
    }
    if (this.silentGain) {
      try {
        this.silentGain.disconnect();
      } catch {
      }
      this.silentGain = null;
    }
    if (this.inputAudioCtx && this.inputAudioCtx.state !== "closed" && (this.inputAudioCtx.close().catch(() => {
    }), this.inputAudioCtx = null), this.outputAnalyserNode) {
      try {
        this.outputAnalyserNode.disconnect();
      } catch {
      }
      this.outputAnalyserNode = null, (n = (r = this.options).onOutputAnalyserReady) == null || n.call(r, null);
    }
    this.outputAudioCtx && this.outputAudioCtx.state !== "closed" && (this.outputAudioCtx.close().catch(() => {
    }), this.outputAudioCtx = null);
  }
}
class Ba {
  constructor(r, n = {}, a = {}) {
    Ie(this, "ws", null);
    Ie(this, "audioEngine");
    Ie(this, "connected", !1);
    Ie(this, "isDisposed", !1);
    Ie(this, "levelIntervalId", null);
    Ie(this, "heartbeatIntervalId", null);
    this.config = r, this.callbacks = n, this.audioEngine = new Fa({
      onAnalyserReady: a.onAnalyserReady,
      onOutputAnalyserReady: a.onOutputAnalyserReady,
      onPcmChunk: (s) => {
        var l;
        this.connected && ((l = this.ws) == null ? void 0 : l.readyState) === WebSocket.OPEN && this.ws.send(s);
      }
    });
  }
  isConnected() {
    var r;
    return this.connected && ((r = this.ws) == null ? void 0 : r.readyState) === WebSocket.OPEN;
  }
  getAnalyserNode() {
    return this.audioEngine.getAnalyserNode();
  }
  getOutputAnalyserNode() {
    return this.audioEngine.getOutputAnalyserNode();
  }
  async start() {
    var l, o, d, m, c, p;
    this.isDisposed = !1;
    const r = Ra(this.config);
    if (await this.audioEngine.initOutput(), this.isDisposed) {
      this.cleanup();
      return;
    }
    try {
      await this.audioEngine.initMicrophone(), (o = (l = this.callbacks).onPermissionChange) == null || o.call(l, !0);
    } catch (f) {
      if (this.isDisposed) return;
      const h = f == null ? void 0 : f.name, x = h === "NotAllowedError" || h === "PermissionDeniedError" ? "Permiso de micrófono denegado. Por favor habilita el acceso al micrófono en tu navegador." : `Error al acceder al micrófono: ${f instanceof Error ? f.message : String(f)}`;
      (m = (d = this.callbacks).onPermissionChange) == null || m.call(d, !1, x), (p = (c = this.callbacks).onError) == null || p.call(c, new Error(x));
      return;
    }
    if (this.isDisposed) {
      this.cleanup();
      return;
    }
    let n = 0;
    const a = 2, s = () => {
      if (this.isDisposed) return;
      const f = new WebSocket(r);
      this.ws = f, f.binaryType = "arraybuffer", f.onopen = () => {
        this.connected = !0, n = 0, this.heartbeatIntervalId && clearInterval(this.heartbeatIntervalId), this.heartbeatIntervalId = setInterval(() => {
          var h;
          this.connected && ((h = this.ws) == null ? void 0 : h.readyState) === WebSocket.OPEN && this.ws.send(JSON.stringify({ type: "ping" }));
        }, 2e4);
      }, f.onmessage = (h) => {
        if (typeof h.data == "string")
          try {
            const u = JSON.parse(h.data);
            this.handleJsonEvent(u);
          } catch (u) {
            console.warn("[VoiceCallClient] Error parseando evento JSON:", u);
          }
        else h.data instanceof ArrayBuffer && this.audioEngine.playAudioChunk(h.data);
      }, f.onerror = () => {
        var h, u, x, w;
        if (!this.connected && n < a && !this.isDisposed) {
          n++, (u = (h = this.callbacks).onReconnecting) == null || u.call(h, {
            message: `Reintentando conexión con el gateway de voz (intento ${n}/${a})...`
          }), setTimeout(() => {
            !this.isDisposed && !this.connected && s();
          }, 1500);
          return;
        }
        (w = (x = this.callbacks).onError) == null || w.call(x, new Error("Error de conexión con el servidor de voz."));
      }, f.onclose = () => {
        var h, u;
        !this.connected && n < a && !this.isDisposed || (this.connected = !1, this.cleanup(), (u = (h = this.callbacks).onClose) == null || u.call(h));
      };
    };
    s(), this.levelIntervalId = setInterval(() => {
      var u, x;
      const { userRms: f, botRms: h } = this.audioEngine.getLevelsAndDecay();
      (x = (u = this.callbacks).onLevels) == null || x.call(u, f, h);
    }, 33);
  }
  handleJsonEvent(r) {
    var a, s, l, o, d, m, c, p, f, h, u, x, w, v, y, b, C, E, U, z, _, X, H, S, T, R, F, L, D, V, ae, se, me, g, N, J, M, W;
    switch (r.type) {
      case "session.ready":
        (s = (a = this.callbacks).onReady) == null || s.call(a, r), r.caller_context && ((o = (l = this.callbacks).onCallerContext) == null || o.call(l, r.caller_context));
        break;
      case "transcript.user":
        (m = (d = this.callbacks).onTranscriptUser) == null || m.call(d, r.text || "", r.is_final);
        break;
      case "transcript.bot":
        (p = (c = this.callbacks).onTranscriptBot) == null || p.call(c, r.text || "", r.is_final);
        break;
      case "assistant.transcript":
        r.role === "user" ? (h = (f = this.callbacks).onTranscriptUser) == null || h.call(f, r.text || "", r.is_final) : (x = (u = this.callbacks).onTranscriptBot) == null || x.call(u, r.text || "", r.is_final);
        break;
      case "assistant.speaking":
        (v = (w = this.callbacks).onAssistantSpeaking) == null || v.call(w);
        break;
      case "assistant.turn_complete":
        (b = (y = this.callbacks).onTurnComplete) == null || b.call(y);
        break;
      case "article.matched":
        (E = (C = this.callbacks).onArticleMatched) == null || E.call(C, r.article || null);
        break;
      case "tool.state":
        (z = (U = this.callbacks).onToolState) == null || z.call(U, r);
        break;
      case "assistant.image_received":
        (X = (_ = this.callbacks).onImageReceived) == null || X.call(_, r);
        break;
      case "guide.sent":
        (S = (H = this.callbacks).onGuideSent) == null || S.call(H, r);
        break;
      case "barge_in":
      case "assistant.interrupted":
        this.audioEngine.stopPlaybackImmediately(), (R = (T = this.callbacks).onBargeIn) == null || R.call(T);
        break;
      case "call.outcome":
        (L = (F = this.callbacks).onOutcome) == null || L.call(F, r);
        break;
      case "session.reconnecting":
        (V = (D = this.callbacks).onReconnecting) == null || V.call(D, r);
        break;
      case "session.reconnected":
        (se = (ae = this.callbacks).onReconnected) == null || se.call(ae, r);
        break;
      case "call.closing":
        (g = (me = this.callbacks).onClosing) == null || g.call(me, r), this.audioEngine.waitForAudioPlaybackDrain().then(() => {
          var j;
          if (((j = this.ws) == null ? void 0 : j.readyState) === WebSocket.OPEN)
            return this.hangup({ autoHangup: !0 });
        }).catch((j) => {
          console.warn("[VoiceCallClient] Error en drenado de audio de cierre:", j);
        });
        break;
      case "call.finalized":
        (J = (N = this.callbacks).onFinalized) == null || J.call(N, r);
        break;
      case "call.timeout":
      case "call.idle_timeout":
        (W = (M = this.callbacks).onError) == null || W.call(
          M,
          new Error(r.message || "Llamada finalizada por tiempo límite.")
        ), this.hangup().catch(() => {
        });
        break;
    }
  }
  setMuted(r) {
    var n;
    this.audioEngine.setMuted(r), ((n = this.ws) == null ? void 0 : n.readyState) === WebSocket.OPEN && this.ws.send(JSON.stringify({ type: "mute", muted: r }));
  }
  sendImage(r, n = "image/jpeg") {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    const a = r.includes(",") ? r.split(",")[1] : r;
    this.ws.send(
      JSON.stringify({
        type: "client.image",
        data: a,
        mime_type: n
      })
    );
  }
  sendTextPrompt(r) {
    const n = r.trim();
    !n || !this.ws || this.ws.readyState !== WebSocket.OPEN || this.ws.send(
      JSON.stringify({
        type: "text_prompt",
        text: n
      })
    );
  }
  async hangup(r) {
    var n;
    if (this.isDisposed = !0, this.audioEngine.stopMicrophoneImmediate(), r != null && r.autoHangup || this.audioEngine.stopPlaybackImmediately(), ((n = this.ws) == null ? void 0 : n.readyState) === WebSocket.OPEN) {
      const a = new Promise((s) => {
        var o;
        const l = (d) => {
          var m;
          if (typeof d.data == "string")
            try {
              JSON.parse(d.data).type === "call.finalized" && ((m = this.ws) == null || m.removeEventListener("message", l), s());
            } catch {
            }
        };
        (o = this.ws) == null || o.addEventListener("message", l), setTimeout(() => {
          var d;
          (d = this.ws) == null || d.removeEventListener("message", l), s();
        }, 3200);
      });
      this.ws.send(
        JSON.stringify({
          type: "hangup",
          auto_hangup: !!(r != null && r.autoHangup)
        })
      ), await a;
    }
    this.cleanup();
  }
  cleanup() {
    this.isDisposed = !0, this.connected = !1, this.levelIntervalId && (clearInterval(this.levelIntervalId), this.levelIntervalId = null), this.heartbeatIntervalId && (clearInterval(this.heartbeatIntervalId), this.heartbeatIntervalId = null), this.audioEngine.dispose(), this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) && (this.ws.close(), this.ws = null);
  }
}
function $a({
  open: t,
  sessionId: r,
  conversationId: n,
  userId: a,
  userAuthId: s,
  senderMessengerId: l,
  wsUrl: o,
  onOpenChange: d,
  onCallEnded: m
}) {
  var Ft, kt;
  const c = zr(), [p, f] = k("idle"), [h, u] = k("Conectando con el Asistente de Voz..."), [x, w] = k(!1), [v, y] = k(!1), [b, C] = k(0), [E, U] = k(null), [z, _] = k(null), [X, H] = k(null), [S, T] = k(null), [R, F] = k(0), [L, D] = k(0), [V, ae] = k([]), [se, me] = k(null), [g, N] = k(null), [J, M] = k(null), [W, j] = k(null), [ne, xe] = k(null), [Y, oe] = k("completed"), [te, de] = k(null), [Ee, Ae] = k(!1), [Te, Ce] = k(""), [Le, He] = k(0), ve = O(null), K = O("idle"), qe = O(null), Ve = O(null), Qe = O(!1), Oe = O("completed"), B = O(null), ie = O(d), A = O(m), q = O(null), P = O(null), G = O(null), re = O(!1);
  Z(() => {
    K.current = p;
  }, [p]), Z(() => {
    ie.current = d, A.current = m, Oe.current = Y, B.current = ne;
  });
  const Se = Pe(() => t ? `${r || "call"}_${Date.now()}` : r || "call", [t, r, Le]), ze = Q((ee, he = 4500) => {
    j(ee), Ve.current && clearTimeout(Ve.current), Ve.current = setTimeout(() => {
      j(null);
    }, he);
  }, []), De = Q(() => {
    qe.current && (clearInterval(qe.current), qe.current = null);
  }, []), be = Q((ee = !1) => {
    if (G.current && (clearInterval(G.current), G.current = null), P.current) {
      const he = P.current;
      ee && ae((ke) => {
        const ce = ke.findIndex((I) => I.id === he.id);
        if (ce !== -1) {
          const I = [...ke];
          return I[ce] = {
            ...I[ce],
            text: he.fullTargetText,
            isFinal: !0
          }, I;
        }
        return ke;
      });
    }
    P.current = null, re.current = !1;
  }, []), at = Q((ee, he) => {
    const ke = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    if (re.current && (be(!0), re.current = !1), q.current = null, P.current)
      P.current.fullTargetText += ee, he && (P.current.isFinal = !0);
    else {
      const ce = `bot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      P.current = {
        id: ce,
        fullTargetText: ee,
        displayedLength: 0,
        timestamp: ke,
        isFinal: !!he
      }, ae((I) => [
        ...I,
        {
          id: ce,
          sender: "assistant",
          text: "",
          timestamp: ke,
          isFinal: !1
        }
      ]);
    }
    G.current || (G.current = setInterval(() => {
      const ce = P.current;
      if (!ce) {
        G.current && (clearInterval(G.current), G.current = null);
        return;
      }
      const I = ce.fullTargetText.length;
      if (ce.displayedLength < I) {
        const ue = I - ce.displayedLength, ye = ue > 100 ? 3 : ue > 45 ? 2 : 1;
        ce.displayedLength = Math.min(I, ce.displayedLength + ye);
        const _e = ce.fullTargetText.slice(0, ce.displayedLength), et = ce.displayedLength >= I && ce.isFinal;
        ae((Ke) => {
          const lt = Ke.findIndex((gn) => gn.id === ce.id);
          if (lt === -1) return Ke;
          const nr = [...Ke];
          return nr[lt] = {
            ...nr[lt],
            text: _e,
            isFinal: et
          }, nr;
        }), et && (G.current && (clearInterval(G.current), G.current = null), P.current = null, re.current = !1);
      } else ce.isFinal && (ae((ue) => {
        const ye = ue.findIndex((_e) => _e.id === ce.id);
        if (ye !== -1 && !ue[ye].isFinal) {
          const _e = [...ue];
          return _e[ye] = { ..._e[ye], isFinal: !0 }, _e;
        }
        return ue;
      }), G.current && (clearInterval(G.current), G.current = null), P.current = null, re.current = !1);
    }, 32));
  }, [be]), Fe = Q(
    (ee, he) => {
      var I, ue, ye;
      if (Qe.current) return;
      Qe.current = !0, De(), be(!1), (I = ve.current) == null || I.cleanup(), ve.current = null;
      const ke = ee || Oe.current || "completed", ce = he !== void 0 ? he : B.current;
      (ue = A.current) == null || ue.call(A, {
        outcome: ke,
        data: ce
      }), (ye = ie.current) == null || ye.call(ie, !1);
    },
    [De, be]
  );
  Z(() => {
    var he, ke, ce;
    if (!t) {
      (he = ve.current) == null || he.cleanup(), ve.current = null, De(), be(!1), q.current = null, re.current = !1, f("idle"), y(!1), H(null), T(null), F(0), D(0);
      return;
    }
    Qe.current = !1, f("connecting"), K.current = "connecting", u("Conectando con el Asistente de Voz..."), C(0), ae([]), be(!1), q.current = null, re.current = !1, me(null), N(null), M(null), j(null), xe(null), B.current = null, oe("completed"), Oe.current = "completed", de(null), Ae(!1), w(!1), y(!1), U(null), _(null);
    const ee = new Ba(
      {
        wsUrl: o || ((ke = c == null ? void 0 : c.config) == null ? void 0 : ke.voiceWsUrl),
        apiBaseUrl: (ce = c == null ? void 0 : c.config) == null ? void 0 : ce.apiBaseUrl,
        sessionId: Se,
        conversationId: n,
        userId: a,
        userAuthId: s,
        senderMessengerId: l
      },
      {
        onReady: (I) => {
          f("listening"), K.current = "listening", u("Te escucho... Habla con naturalidad."), I.caller_context && me(I.caller_context), De(), qe.current = setInterval(() => {
            C((ue) => ue + 1);
          }, 1e3);
        },
        onCallerContext: (I) => {
          me(I);
        },
        onPermissionChange: (I, ue) => {
          U(I), _(I ? null : ue || "Permiso de micrófono no otorgado");
        },
        onTranscriptUser: (I, ue) => {
          K.current !== "escalating" && K.current !== "resolved" && (f("thinking"), K.current = "thinking", u("Procesando consulta...")), be(!0), re.current = !1;
          const ye = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          if (q.current) {
            const _e = q.current;
            ae((et) => {
              const Ke = et.findIndex((lt) => lt.id === _e);
              if (Ke !== -1) {
                const lt = [...et];
                return lt[Ke] = {
                  ...lt[Ke],
                  text: I,
                  isFinal: ue ?? !0
                }, lt;
              }
              return [
                ...et,
                {
                  id: _e,
                  sender: "user",
                  text: I,
                  timestamp: ye,
                  isFinal: ue ?? !0
                }
              ];
            });
          } else {
            const _e = `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
            q.current = _e, ae((et) => [
              ...et,
              {
                id: _e,
                sender: "user",
                text: I,
                timestamp: ye,
                isFinal: ue ?? !0
              }
            ]);
          }
          ue && (q.current = null);
        },
        onTranscriptBot: (I, ue) => {
          K.current !== "escalating" && K.current !== "resolved" && (f("speaking"), K.current = "speaking", u("Asistente respondiendo...")), at(I, ue);
        },
        onAssistantSpeaking: () => {
          K.current !== "escalating" && K.current !== "resolved" && (f("speaking"), K.current = "speaking", u("Asistente respondiendo..."));
        },
        onTurnComplete: () => {
          re.current = !0, P.current && (P.current.isFinal = !0, P.current.displayedLength >= P.current.fullTargetText.length && be(!0)), K.current !== "ended" && K.current !== "escalating" && K.current !== "resolved" && (f("listening"), K.current = "listening", u("Te escucho..."));
        },
        onArticleMatched: (I) => {
          N(I);
        },
        onToolState: (I) => {
          M(I.status === "running" ? I : null), I.status === "running" ? I.tool === "search_knowledge_base" ? u("Consultando Base de Conocimiento...") : I.tool === "send_steps_to_chat" ? u("Enviando guía visual al chat...") : I.tool === "append_ticket_note" ? u("Actualizando nota en ticket...") : I.tool === "escalate_to_human" ? (f("escalating"), K.current = "escalating", u("Registrando expediente y escalando a técnico...")) : I.tool === "resolve_voice_session" && (f("resolved"), K.current = "resolved", u("Registrando solución exitosa...")) : I.status === "done" && K.current !== "escalating" && K.current !== "resolved" && (f("speaking"), K.current = "speaking", u("Asistente respondiendo..."));
        },
        onImageReceived: (I) => {
          ze(I.message || "Captura analizada por el asistente");
        },
        onGuideSent: () => {
          ze("Guía con pasos enviada al chat de Messenger", 5e3);
        },
        onBargeIn: () => {
          if (P.current) {
            const I = P.current;
            G.current && (clearInterval(G.current), G.current = null), ae((ue) => {
              const ye = ue.findIndex((_e) => _e.id === I.id);
              if (ye !== -1) {
                const _e = [...ue];
                return _e[ye] = {
                  ..._e[ye],
                  text: I.fullTargetText.slice(0, I.displayedLength),
                  isFinal: !0
                }, _e;
              }
              return ue;
            }), P.current = null;
          }
          re.current = !1, q.current = null, f("listening"), K.current = "listening", u("Te escucho...");
        },
        onOutcome: (I) => {
          oe(I.outcome), Oe.current = I.outcome, I.data && (xe(I.data), B.current = I.data), I.outcome.startsWith("escalated") ? (f("escalating"), K.current = "escalating", u("Solicitud transferida. El asistente se está despidiendo...")) : I.outcome === "resolved" && (f("resolved"), K.current = "resolved", u("¡Problema resuelto! El asistente se está despidiendo..."));
        },
        onClosing: () => {
          u("Despidiéndose y finalizando llamada...");
        },
        onReconnecting: (I) => {
          K.current !== "ended" && (f("reconnecting"), K.current = "reconnecting", u((I == null ? void 0 : I.message) || "Estabilizando conexión..."));
        },
        onReconnected: (I) => {
          K.current !== "ended" && (f("listening"), K.current = "listening", u((I == null ? void 0 : I.message) || "Conexión restablecida. Puedes continuar."));
        },
        onFinalized: (I) => {
          De(), be(!0), de(I), I.outcome && (oe(I.outcome), Oe.current = I.outcome), I.finalize && (xe(I.finalize), B.current = I.finalize), f("ended"), K.current = "ended", y(!1), u(I.message || "Llamada finalizada.");
        },
        onError: (I) => {
          K.current !== "ended" && (u(I.message), K.current === "connecting" && (f("error"), K.current = "error"));
        },
        onClose: () => {
          K.current !== "ended" && (De(), be(!0), f("ended"), K.current = "ended", y(!1), u("Llamada terminada"));
        },
        onLevels: (I, ue) => {
          F(I), D(ue);
        }
      },
      {
        onAnalyserReady: (I) => H(I),
        onOutputAnalyserReady: (I) => T(I)
      }
    );
    return ve.current = ee, ee.start().catch((I) => {
      ve.current === ee && (console.error("[useVoiceCall] Error al iniciar cliente:", I), u("No se pudo iniciar la llamada. Verifica el micrófono y la conexión."));
    }), () => {
      ee.cleanup(), ve.current === ee && (ve.current = null), De(), be(!1), Ve.current && clearTimeout(Ve.current);
    };
  }, [
    t,
    Se,
    n,
    a,
    s,
    l,
    o,
    (Ft = c == null ? void 0 : c.config) == null ? void 0 : Ft.voiceWsUrl,
    (kt = c == null ? void 0 : c.config) == null ? void 0 : kt.apiBaseUrl,
    De,
    be,
    at,
    ze
  ]);
  const wt = Q(() => {
    var he;
    const ee = !x;
    w(ee), (he = ve.current) == null || he.setMuted(ee);
  }, [x]), yt = Q(() => {
    He((ee) => ee + 1);
  }, []), rr = Q(() => {
    if (E === !1) {
      yt();
      return;
    }
    wt();
  }, [E, yt, wt]), Rt = Q(async () => {
    if (Qe.current) return;
    if (K.current === "ended") {
      Fe();
      return;
    }
    De(), f("ended"), K.current = "ended", y(!1), u("Llamada finalizada");
    const ee = ve.current;
    ve.current = null;
    try {
      ee && await ee.hangup({ autoHangup: !1 });
    } catch (he) {
      console.warn("[useVoiceCall] Error durante hangup:", he);
    }
  }, [Fe, De]), Lt = Q(() => {
    Fe();
  }, [Fe]);
  Z(() => {
    if (p === "ended") {
      const ee = setTimeout(() => {
        Fe();
      }, 4500);
      return () => clearTimeout(ee);
    }
  }, [p, Fe]);
  const jt = Q(
    (ee) => {
      if (!ee) {
        if (K.current === "ended") {
          Fe();
          return;
        }
        if (K.current === "connecting" || K.current === "error") {
          Fe();
          return;
        }
        y(!0);
        return;
      }
      d(ee);
    },
    [Fe, d]
  ), pe = Q(
    (ee) => {
      ee == null || ee.preventDefault();
      const he = Te.trim();
      if (!he || !ve.current) return;
      be(!0), q.current = null, re.current = !1, ve.current.sendTextPrompt(he);
      const ke = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      ae((ce) => [
        ...ce,
        {
          id: `user-txt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          sender: "user",
          text: he,
          timestamp: ke,
          isFinal: !0
        }
      ]), Ce("");
    },
    [Te, be]
  ), Be = Q(async () => {
    if (!(Ee || !ve.current))
      try {
        Ae(!0);
        const ee = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: "always" },
          audio: !1
        }), he = ee.getVideoTracks()[0], ke = document.createElement("video");
        ke.srcObject = ee, await ke.play();
        const ce = document.createElement("canvas"), I = 1024;
        let ue = ke.videoWidth || 1280, ye = ke.videoHeight || 720;
        if (ue > I || ye > I) {
          const Ke = Math.min(I / ue, I / ye);
          ue = Math.round(ue * Ke), ye = Math.round(ye * Ke);
        }
        ce.width = ue, ce.height = ye;
        const _e = ce.getContext("2d");
        _e == null || _e.drawImage(ke, 0, 0, ue, ye);
        const et = ce.toDataURL("image/jpeg", 0.82);
        he.stop(), ee.getTracks().forEach((Ke) => Ke.stop()), ve.current.sendImage(et, "image/jpeg"), ze("Captura de pantalla enviada al asistente");
      } catch (ee) {
        (ee == null ? void 0 : ee.name) !== "NotAllowedError" && console.warn("[useVoiceCall] Error en captura de pantalla:", ee);
      } finally {
        Ae(!1);
      }
  }, [Ee, ze]), we = Q(
    (ee) => {
      var ce;
      const he = (ce = ee.target.files) == null ? void 0 : ce[0];
      if (!he || !ve.current) return;
      const ke = new FileReader();
      ke.onload = (I) => {
        var ye;
        const ue = (ye = I.target) == null ? void 0 : ye.result;
        ue && ve.current && (ve.current.sendImage(ue, he.type || "image/jpeg"), ze("Foto enviada al asistente"));
      }, ke.readAsDataURL(he), ee.target.value = "";
    },
    [ze]
  ), Ge = Pe(() => {
    const ee = Math.floor(b / 60), he = b % 60;
    return `${String(ee).padStart(2, "0")}:${String(he).padStart(2, "0")}`;
  }, [b]), st = Pe(() => {
    var he, ke, ce, I;
    const ee = ((he = ne == null ? void 0 : ne.ticket) == null ? void 0 : he.number) || (ne == null ? void 0 : ne.ticket_number) || ((ke = te == null ? void 0 : te.finalize) == null ? void 0 : ke.ticket_number) || (se == null ? void 0 : se.ticket_number) || null;
    return {
      sessionId: Se,
      terminalId: (se == null ? void 0 : se.terminal_id) || null,
      ticketNumber: ee,
      serviceName: (se == null ? void 0 : se.service_name) || null,
      posLocation: ((ce = se == null ? void 0 : se.user) == null ? void 0 : ce.place_name) || null,
      openTicketsCount: ((I = se == null ? void 0 : se.recent_open_tickets) == null ? void 0 : I.length) || 0
    };
  }, [Se, se, ne, te]), it = p === "ended", ge = p === "connecting" || p === "requesting_permission" || p === "idle", Nt = Pe(() => x || ge || it || E === !1 ? 0 : R < 0.02 ? 1 : Math.min(8, Math.max(1, Math.round(R * 10) + 1)), [x, ge, it, E, R]);
  return {
    callState: p,
    statusText: h,
    isMuted: x,
    isMinimized: v,
    setIsMinimized: y,
    isEnded: it,
    isConnecting: ge,
    durationSeconds: b,
    formattedDuration: Ge,
    hasPermission: E,
    micError: z,
    analyserNode: X,
    outputAnalyserNode: S,
    userRms: R,
    botRms: L,
    activeVUSegments: Nt,
    transcripts: V,
    contextBadges: st,
    callerContext: se,
    matchedArticle: g,
    activeTool: J,
    noticeBanner: W,
    outcomeType: Y,
    outcomeData: ne,
    finalizedData: te,
    isCapturingScreen: Ee,
    textInput: Te,
    setTextInput: Ce,
    handleToggleMute: wt,
    handleHeroMicClick: rr,
    handleHangup: Rt,
    handleDismissEndedCall: Lt,
    handleDialogCloseAttempt: jt,
    handleSendTextPrompt: pe,
    handleCaptureScreen: Be,
    handlePhotoUpload: we,
    requestMicrophone: yt
  };
}
function Ua({
  callState: t,
  isConnecting: r,
  isEnded: n,
  formattedDuration: a,
  contextBadges: s
}) {
  const l = t === "reconnecting";
  return /* @__PURE__ */ i("div", { className: "flex items-center justify-between p-5 pb-3 border-b border-neutral-100 bg-white", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-3 min-w-0", children: [
      /* @__PURE__ */ i("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ e(Ye, { name: "Asistente de Voz SDi", isBot: !0, size: "md" }),
        /* @__PURE__ */ e(
          "span",
          {
            className: $(
              "absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-white",
              r ? "bg-blue-500 animate-ping" : l ? "bg-amber-500 animate-ping" : n ? "bg-neutral-400" : "bg-emerald-500 animate-pulse"
            )
          }
        )
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col min-w-0", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 leading-tight", children: "Asistente de Voz SDi" }),
          n ? /* @__PURE__ */ e("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200", children: "FINALIZADA" }) : r ? /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-200/80", children: [
            /* @__PURE__ */ e(je, { className: "size-2.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "CONECTANDO..." })
          ] }) : l ? /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80", children: [
            /* @__PURE__ */ e(je, { className: "size-2.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "RECONECTANDO..." })
          ] }) : /* @__PURE__ */ e("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/80", children: "EN VIVO" }),
          s.ticketNumber && !r && !n && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80", children: [
            /* @__PURE__ */ e(mr, { className: "size-2.5 text-amber-500" }),
            /* @__PURE__ */ i("span", { children: [
              "Ticket #",
              s.ticketNumber
            ] })
          ] }),
          s.posLocation && !r && !n && /* @__PURE__ */ i("span", { className: "hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200/80 max-w-44 truncate", children: [
            /* @__PURE__ */ e(Sn, { className: "size-2.5 text-blue-500 shrink-0" }),
            /* @__PURE__ */ e("span", { className: "truncate", children: s.posLocation })
          ] })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-xs text-neutral-400 mt-0.5 truncate", children: n ? "Resumen de atención completada" : r ? "Estableciendo canal telefónico interactivo..." : "Canal telefónico full-duplex de baja latencia" })
      ] })
    ] }),
    !r && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-neutral-50/80 px-3 py-1.5 text-xs font-mono font-semibold text-neutral-700 shadow-2xs", children: [
      /* @__PURE__ */ e(dt, { className: "size-3.5 text-neutral-500" }),
      /* @__PURE__ */ e("span", { children: a })
    ] }) })
  ] });
}
function Ha({
  state: t,
  isMuted: r = !1,
  className: n = "",
  height: a = 72,
  analyserNode: s = null,
  outputAnalyserNode: l = null,
  botRms: o = 0,
  hasPermission: d = null
}) {
  const m = O(null), c = O(null), p = O(0), f = O(null), h = O(null), u = O(null), x = O(o);
  Z(() => {
    x.current = o;
  }, [o]), Z(() => {
    const v = m.current;
    if (!v) return;
    const y = v.getContext("2d");
    if (!y) return;
    const b = window.devicePixelRatio || 1, C = v.getBoundingClientRect();
    v.width = C.width * b, v.height = C.height * b, y.scale(b, b);
    const E = C.width, U = C.height, z = U / 2, _ = 38, X = 2.5, H = 3, S = _ * X + (_ - 1) * H, T = Math.max(0, (E - S) / 2);
    (!u.current || u.current.length !== _) && (u.current = new Float32Array(_), u.current.fill(2.5));
    const R = (L, D, V, ae) => {
      y.fillStyle = ae, y.beginPath(), typeof y.roundRect == "function" ? y.roundRect(L, D, X, V, X / 2) : y.rect(L, D, X, V), y.fill();
    }, F = () => {
      y.clearRect(0, 0, E, U);
      const L = u.current;
      if (t === "muted" || r || d === !1) {
        const D = "rgba(209, 213, 219, 0.65)";
        for (let V = 0; V < _; V++) {
          L[V] = 2.5;
          const ae = T + V * (X + H);
          R(ae, z - 1.25, 2.5, D);
        }
      } else if (t === "speaking") {
        const D = x.current;
        let V = 0, ae = !1;
        if (l) {
          (!h.current || h.current.length !== l.frequencyBinCount) && (h.current = new Uint8Array(l.frequencyBinCount));
          const N = h.current;
          l.getByteFrequencyData(N);
          let J = 0;
          for (let M = 0; M < N.length; M++)
            J += N[M];
          V = J / (N.length * 255), ae = V > 0.015;
        }
        const se = Math.max(ae ? V * 1.6 : 0, D);
        p.current += 0.09 + se * 0.14;
        const me = Math.max(12, se * 32), g = se > 0.02 ? "rgba(16, 185, 129, 0.95)" : "rgba(16, 185, 129, 0.70)";
        for (let N = 0; N < _; N++) {
          const J = T + N * (X + H), M = N / (_ - 1) * 2 - 1, W = Math.max(0.22, 1 - Math.pow(M, 2)), j = Math.abs(M);
          let ne = 0;
          if (ae && h.current) {
            const te = h.current, de = Math.min(
              te.length - 1,
              Math.floor((1 - j * 0.7) * (te.length * 0.65))
            );
            ne = te[de] / 255 * 1.5;
          }
          const xe = Math.sin(N * 0.44 + p.current) * 0.45 + Math.cos(N * 0.32 - p.current * 0.75) * 0.35 + Math.sin(N * 0.72 + p.current * 1.1) * 0.2 + 0.5, Y = Math.max(
            4,
            me * (0.6 + ne * 0.8) * W * Math.abs(xe)
          );
          L[N] += (Y - L[N]) * 0.38;
          const oe = Math.max(3.5, Math.min(U - 4, L[N]));
          R(J, z - oe / 2, oe, g);
        }
      } else if ((t === "listening" || t === "connected") && s) {
        (!f.current || f.current.length !== s.frequencyBinCount) && (f.current = new Uint8Array(s.frequencyBinCount));
        const D = f.current;
        s.getByteFrequencyData(D);
        let V = 0;
        for (let g = 0; g < D.length; g++)
          V += D[g];
        const ae = V / (D.length * 255), se = ae > 0.025, me = se ? "rgba(16, 185, 129, 0.95)" : "rgba(16, 185, 129, 0.45)";
        for (let g = 0; g < _; g++) {
          const N = T + g * (X + H), J = g / (_ - 1) * 2 - 1, M = Math.max(0.18, 1 - Math.pow(J, 2)), W = Math.abs(J), j = Math.min(
            D.length - 1,
            Math.floor((1 - W * 0.75) * (D.length * 0.6))
          ), ne = D[j] / 255, xe = se ? Math.max(2.5, (ne * 26 + ae * 10) * M * 1.6) : 2.5;
          L[g] += (xe - L[g]) * 0.35;
          const Y = Math.max(2.5, Math.min(U - 4, L[g]));
          R(N, z - Y / 2, Y, me);
        }
      } else {
        const D = t === "connecting" || t === "thinking" || t === "reconnecting" ? "rgba(16, 185, 129, 0.4)" : "rgba(209, 213, 219, 0.65)";
        for (let V = 0; V < _; V++) {
          L[V] = 2.5;
          const ae = T + V * (X + H);
          R(ae, z - 1.25, 2.5, D);
        }
      }
      c.current = requestAnimationFrame(F);
    };
    return F(), () => {
      c.current && cancelAnimationFrame(c.current);
    };
  }, [t, r, s, l, d]);
  const w = typeof a == "number" ? `${a}px` : a;
  return /* @__PURE__ */ e(
    "canvas",
    {
      ref: m,
      className: `w-full block pointer-events-none ${n}`,
      style: { width: "100%", height: w }
    }
  );
}
function Wa({
  callState: t,
  statusText: r,
  isMuted: n,
  hasPermission: a,
  analyserNode: s,
  outputAnalyserNode: l = null,
  userRms: o,
  botRms: d,
  activeVUSegments: m,
  activeTool: c,
  onRequestMicrophone: p
}) {
  const f = a === !1, h = t === "speaking", u = t === "thinking" || t === "escalating" || t === "resolved" || (c == null ? void 0 : c.status) === "running", x = f ? "Micrófono bloqueado" : n ? "Micrófono en silencio" : h ? "Asistente hablando..." : u ? "Procesando solicitud..." : o > 0.08 ? "Escuchando tu voz..." : "Te escucho...", w = f ? "Permiso requerido" : n ? "Pulsa para reactivar" : h || u ? r : o > 0.08 ? "Voz detectada en vivo" : "Habla con naturalidad";
  return /* @__PURE__ */ i("div", { className: "mx-5 mt-3 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: $("flex flex-col max-w-[145px] sm:max-w-[175px] shrink-0", f && "cursor-pointer"),
        onClick: f ? p : void 0,
        title: f ? "Haz clic para permitir acceso al micrófono" : void 0,
        children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-bold truncate text-neutral-900", children: x }),
          /* @__PURE__ */ e("span", { className: "text-xs text-neutral-500 truncate", children: w })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 max-w-[180px] sm:max-w-[240px] h-10 flex items-center justify-center", children: /* @__PURE__ */ e(
      Ha,
      {
        state: t,
        isMuted: n,
        height: 36,
        analyserNode: s,
        outputAnalyserNode: l,
        botRms: d,
        hasPermission: a
      }
    ) }),
    /* @__PURE__ */ i("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
      f ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: p,
          title: "Permiso de micrófono no otorgado. Haz clic para permitir",
          className: "flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all cursor-pointer",
          children: [
            /* @__PURE__ */ e(hr, { className: "size-3 text-amber-600" }),
            /* @__PURE__ */ e("span", { children: "Sin permiso" })
          ]
        }
      ) : /* @__PURE__ */ i("div", { className: "flex items-center gap-1 text-[11px] font-semibold text-emerald-600", children: [
        /* @__PURE__ */ e(fr, { className: "size-3" }),
        /* @__PURE__ */ e("span", { children: n ? "Micrófono silenciado" : "Micrófono activo" })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-0.5", children: [...Array(8)].map((v, y) => /* @__PURE__ */ e(
        "span",
        {
          className: $(
            "w-1.5 h-2.5 rounded-xs transition-colors duration-75",
            !f && !n && y < m ? "bg-emerald-500" : "bg-neutral-200"
          )
        },
        y
      )) })
    ] })
  ] });
}
function qa({
  transcripts: t,
  matchedArticle: r,
  noticeBanner: n
}) {
  const a = O(null), s = O(!0), l = O(0), [o, d] = k(!0), [m, c] = k(0), p = Q((h = "smooth") => {
    const u = a.current;
    u && (u.scrollTo({
      top: u.scrollHeight,
      behavior: h
    }), s.current = !0, d(!0), c(0));
  }, []), f = Q(() => {
    const h = a.current;
    if (!h) return;
    const x = h.scrollHeight - h.scrollTop - h.clientHeight < 40;
    s.current = x, d(x), x && c(0);
  }, []);
  return Z(() => {
    const h = l.current, u = t.length;
    if (l.current = u, u === 0) {
      c(0), s.current = !0, d(!0);
      return;
    }
    if (s.current) {
      const x = a.current;
      x && (x.scrollTop = x.scrollHeight);
    } else if (u > h)
      c((x) => x + (u - h));
    else {
      const x = t[u - 1];
      x && !x.isFinal && c((w) => w === 0 ? 1 : w);
    }
  }, [t, r, n]), /* @__PURE__ */ i("div", { className: "flex flex-col flex-1 min-h-0", children: [
    (r || n) && /* @__PURE__ */ i("div", { className: "mx-5 mt-2.5 space-y-1.5 shrink-0", children: [
      r && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-2 text-xs text-blue-900", children: [
        /* @__PURE__ */ e(zn, { className: "size-3.5 text-blue-600 shrink-0" }),
        /* @__PURE__ */ i("span", { className: "truncate", children: [
          /* @__PURE__ */ e("strong", { className: "font-semibold", children: "Guía aplicada:" }),
          " ",
          r.title
        ] })
      ] }),
      n && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs text-emerald-800 animate-in fade-in duration-200", children: [
        /* @__PURE__ */ e(ut, { className: "size-3.5 text-emerald-600 shrink-0" }),
        /* @__PURE__ */ e("span", { className: "truncate font-medium", children: n })
      ] })
    ] }),
    t.length > 0 && /* @__PURE__ */ i("div", { className: "relative mx-5 my-3 flex items-center justify-center shrink-0", children: [
      /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ e("div", { className: "w-full border-t border-neutral-100" }) }),
      /* @__PURE__ */ e("span", { className: "relative bg-white px-3 text-[11px] font-medium text-neutral-400", children: "Hoy" })
    ] }),
    /* @__PURE__ */ i("div", { className: "relative flex-1 min-h-[160px] max-h-[290px] flex flex-col", children: [
      /* @__PURE__ */ e(
        "div",
        {
          ref: a,
          onScroll: f,
          className: "flex-1 overflow-y-auto px-5 pb-3 space-y-3 font-sans scroll-smooth",
          children: t.length === 0 ? /* @__PURE__ */ i("div", { className: "flex flex-col items-center justify-center h-full min-h-[150px] text-center py-4 text-neutral-400", children: [
            /* @__PURE__ */ e("p", { className: "text-xs font-medium text-neutral-500", children: "Habla normalmente al micrófono..." }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-400 mt-1 max-w-xs", children: "“Hola, la impresora POS tiene luz roja y no imprime el recibo”" })
          ] }) : t.map((h) => {
            const u = h.sender === "assistant";
            return /* @__PURE__ */ i(
              "div",
              {
                className: u ? "flex items-start gap-2.5 max-w-[90%] animate-in fade-in slide-in-from-bottom-1 duration-200" : "flex items-start justify-end gap-2.5 ml-auto max-w-[85%] animate-in fade-in slide-in-from-bottom-1 duration-200",
                children: [
                  u && /* @__PURE__ */ e(
                    Ye,
                    {
                      name: "Asistente SDi",
                      isBot: !0,
                      size: "sm",
                      className: "mt-0.5 shrink-0"
                    }
                  ),
                  /* @__PURE__ */ i("div", { className: u ? "flex min-w-0 flex-col gap-1" : "flex min-w-0 flex-col gap-1 items-end", children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: u ? "text-xs font-bold text-violet-700 truncate" : "text-xs font-semibold text-neutral-800 truncate",
                          children: u ? "Asistente SDi" : "Tú"
                        }
                      ),
                      u && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-violet-100 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 border border-violet-200/60 shadow-2xs", children: [
                        /* @__PURE__ */ e(pr, { className: "size-2.5 text-violet-600" }),
                        /* @__PURE__ */ e("span", { children: "IA" })
                      ] })
                    ] }),
                    /* @__PURE__ */ i(
                      "div",
                      {
                        className: u ? "rounded-2xl rounded-tl-xs bg-gradient-to-b from-violet-50/70 to-white px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed text-neutral-900 border border-violet-200/70 shadow-xs ring-1 ring-violet-500/10" : "rounded-2xl rounded-tr-xs bg-blue-600 px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed text-white shadow-xs",
                        children: [
                          /* @__PURE__ */ i("p", { className: "whitespace-pre-wrap break-words", children: [
                            h.text,
                            u && !h.isFinal && /* @__PURE__ */ e("span", { className: "inline-block w-1.5 h-3 ml-1 bg-violet-500/70 align-middle animate-pulse rounded-xs" })
                          ] }),
                          /* @__PURE__ */ e(
                            "div",
                            {
                              className: u ? "mt-1 flex items-center justify-end text-[10px] leading-none text-neutral-400" : "mt-1 flex items-center justify-end text-[10px] leading-none text-blue-100/80",
                              children: /* @__PURE__ */ e("span", { children: h.timestamp })
                            }
                          )
                        ]
                      }
                    )
                  ] })
                ]
              },
              h.id
            );
          })
        }
      ),
      !o && t.length > 0 && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200", children: m > 0 ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => p("smooth"),
          "aria-label": `${m} mensaje${m > 1 ? "s" : ""} nuevo${m > 1 ? "s" : ""}, ir al final`,
          className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-[11px] font-semibold shadow-lg ring-2 ring-white transition-all active:scale-95 cursor-pointer",
          children: [
            /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-emerald-300 animate-ping" }),
            /* @__PURE__ */ e("span", { children: m === 1 ? "Nuevo mensaje" : `${m > 99 ? "99+" : m} mensajes nuevos` }),
            /* @__PURE__ */ e(or, { className: "size-3.5 animate-bounce" })
          ]
        }
      ) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => p("smooth"),
          title: "Ir a los mensajes recientes",
          "aria-label": "Ir a los mensajes recientes",
          className: "pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 hover:bg-neutral-50 text-blue-600 border border-blue-200/80 px-3 py-1.5 text-[11px] font-semibold shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer",
          children: [
            /* @__PURE__ */ e(or, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Bajar" })
          ]
        }
      ) })
    ] })
  ] });
}
function Va({
  isMuted: t,
  hasPermission: r,
  userRms: n,
  textInput: a,
  isCapturingScreen: s = !1,
  onTextInputChange: l,
  onSendTextPrompt: o,
  onCaptureScreen: d,
  onPhotoUpload: m,
  onHeroMicClick: c,
  onMinimize: p,
  onHangup: f
}) {
  const h = O(null), u = r === !1;
  return /* @__PURE__ */ i("div", { className: "mt-6 flex flex-col bg-white shrink-0", children: [
    /* @__PURE__ */ i(
      "form",
      {
        onSubmit: o,
        className: "mx-5 mb-2 flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white px-2.5 py-2 shadow-2xs focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all",
        children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                var x;
                return (x = h.current) == null ? void 0 : x.click();
              },
              title: "Subir foto de la terminal o error",
              "aria-label": "Subir foto",
              className: "flex size-8 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-violet-600 transition-colors shrink-0 cursor-pointer",
              children: /* @__PURE__ */ e(_n, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: d,
              disabled: s,
              title: "Compartir captura de pantalla (Snap-to-Diagnose)",
              "aria-label": "Compartir captura de pantalla",
              className: "flex size-8 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-violet-600 transition-colors shrink-0 cursor-pointer disabled:opacity-50",
              children: s ? /* @__PURE__ */ e(je, { className: "size-4 animate-spin text-violet-600" }) : /* @__PURE__ */ e(An, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              ref: h,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: m
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: a,
              onChange: (x) => l(x.target.value),
              placeholder: "Escribe tu mensaje o deja que el asistente te escuche...",
              className: "flex-1 bg-transparent text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none min-w-0 px-1"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "submit",
              disabled: !a.trim(),
              title: "Enviar mensaje de texto al asistente",
              className: "flex size-8 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all shadow-xs shrink-0 cursor-pointer active:scale-95",
              children: /* @__PURE__ */ e(In, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "px-5 pt-2 pb-2 bg-white flex items-center justify-center gap-8 sm:gap-10", children: [
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: p,
            title: "Minimizar llamada",
            "aria-label": "Minimizar llamada",
            className: "flex size-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer active:scale-95",
            children: /* @__PURE__ */ e(En, { className: "size-4.5" })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[10px] font-medium leading-none text-neutral-400", children: "Minimizar" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: c,
            title: u ? "Permiso de micrófono no otorgado. Haz clic para solicitar permiso" : t ? "Micrófono silenciado (clic para activar)" : "Micrófono activo (clic para silenciar)",
            "aria-label": u ? "Sin permiso" : t ? "Micrófono silenciado" : "Micrófono activo",
            className: $(
              "flex size-13 items-center justify-center rounded-full border transition-all cursor-pointer active:scale-95",
              u ? "bg-neutral-100 text-amber-600 border-amber-200 hover:bg-neutral-200/60" : t ? "bg-neutral-100 text-neutral-400 border-neutral-200 hover:bg-neutral-200/70 hover:text-neutral-600" : n > 0.08 ? "bg-neutral-900 text-white border-neutral-900 scale-[1.03]" : "bg-neutral-800 text-white border-neutral-800 hover:bg-neutral-900"
            ),
            children: u || t ? /* @__PURE__ */ e(hr, { className: "size-5.5" }) : /* @__PURE__ */ e(fr, { className: "size-5.5" })
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: $(
              "text-[10px] font-medium leading-none",
              u ? "text-amber-600" : t ? "text-neutral-400" : "text-neutral-600"
            ),
            children: u ? "Sin permiso" : t ? "Silenciado" : "Activo"
          }
        )
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: f,
            title: "Finalizar llamada",
            "aria-label": "Finalizar llamada",
            className: "flex size-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer active:scale-95",
            children: /* @__PURE__ */ e(br, { className: "size-4.5" })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[10px] font-medium leading-none text-neutral-400", children: "Finalizar" })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "pb-3.5 pt-0.5 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium", children: [
      /* @__PURE__ */ e(Jt, { className: "size-3.5 text-neutral-400" }),
      /* @__PURE__ */ e("span", { children: "Conversación segura y encriptada" })
    ] })
  ] });
}
function Oa({ statusText: t, onCancel: r }) {
  return /* @__PURE__ */ i("div", { className: "flex flex-col flex-1", children: [
    /* @__PURE__ */ i("div", { className: "flex flex-1 flex-col items-center justify-center text-center p-8 min-h-[300px]", children: [
      /* @__PURE__ */ i("div", { className: "relative mb-5", children: [
        /* @__PURE__ */ e(Ye, { name: "Asistente SDi", isBot: !0, size: "xl" }),
        /* @__PURE__ */ e("span", { className: "absolute inset-0 rounded-full bg-blue-500/15 animate-ping" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 text-sm font-bold text-neutral-800", children: [
        /* @__PURE__ */ e(je, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ e("span", { children: t || "Conectando con el Asistente Virtual..." })
      ] }),
      /* @__PURE__ */ e("p", { className: "text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed", children: "Estableciendo canal telefónico interactivo full-duplex. El asistente te atenderá en unos segundos." })
    ] }),
    /* @__PURE__ */ e("div", { className: "px-5 py-4 bg-white border-t border-neutral-100 flex items-center justify-center", children: /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: r,
        className: "flex items-center gap-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-100 px-5 py-2 text-xs font-semibold text-red-600 shadow-2xs cursor-pointer active:scale-95 transition-all",
        children: [
          /* @__PURE__ */ e(br, { className: "size-3.5" }),
          /* @__PURE__ */ e("span", { children: "Cancelar llamada" })
        ]
      }
    ) })
  ] });
}
function Ga({
  formattedDuration: t,
  transcriptsCount: r,
  outcomeType: n,
  contextBadges: a,
  onClose: s
}) {
  const l = n.startsWith("escalated");
  return /* @__PURE__ */ i("div", { className: "flex flex-1 flex-col items-center justify-center text-center p-8 min-h-[350px] animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ i("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ e("div", { className: "flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-md", children: /* @__PURE__ */ e(ut, { className: "size-8 text-emerald-600" }) }),
      /* @__PURE__ */ e("span", { className: "absolute inset-0 rounded-full bg-emerald-500/15 animate-ping" })
    ] }),
    /* @__PURE__ */ e("h3", { className: "text-lg font-bold text-neutral-900", children: "Llamada finalizada" }),
    /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed", children: l ? "Tu caso ha sido escalado con un especialista. La transcripción y el ticket han quedado registrados." : n === "resolved" ? "¡Caso resuelto con éxito! La atención con el Asistente Virtual SDi ha concluido." : "Gracias por comunicarte. La atención con el Asistente Virtual SDi ha concluido con éxito." }),
    /* @__PURE__ */ i("div", { className: "mt-5 flex items-center justify-center gap-2 flex-wrap max-w-sm", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-neutral-700 shadow-2xs font-medium", children: [
        /* @__PURE__ */ e(dt, { className: "size-3.5 text-neutral-500" }),
        /* @__PURE__ */ i("span", { children: [
          "Duración: ",
          /* @__PURE__ */ e("strong", { className: "font-mono text-neutral-900", children: t })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-neutral-700 shadow-2xs font-medium", children: [
        /* @__PURE__ */ e(ur, { className: "size-3.5 text-violet-600" }),
        /* @__PURE__ */ i("span", { children: [
          /* @__PURE__ */ e("strong", { className: "text-neutral-900", children: r }),
          " intervenciones"
        ] })
      ] }),
      a.ticketNumber && /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-1.5 text-xs text-amber-700 shadow-2xs font-medium", children: [
        /* @__PURE__ */ e(mr, { className: "size-3.5 text-amber-600" }),
        /* @__PURE__ */ i("span", { children: [
          "Ticket ",
          /* @__PURE__ */ i("strong", { className: "text-amber-800", children: [
            "#",
            a.ticketNumber
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-400 mt-3", children: "El registro de la llamada se encuentra disponible en tu conversación." }),
    /* @__PURE__ */ e("div", { className: "mt-5", children: /* @__PURE__ */ e(
      fe,
      {
        type: "button",
        variant: "primary",
        onClick: s,
        className: "h-10 px-6 text-xs sm:text-sm font-semibold rounded-xl shadow-xs cursor-pointer",
        children: "Aceptar y cerrar"
      }
    ) })
  ] });
}
function Ka({
  visible: t,
  callState: r,
  formattedDuration: n,
  isMuted: a,
  hasPermission: s,
  position: l,
  onPositionChange: o,
  onToggleMute: d,
  onMaximize: m,
  onHangup: c
}) {
  const [p, f] = k(() => {
    if (l) return l;
    if (typeof window < "u") {
      const u = localStorage.getItem("sdi_voice_island_pos");
      if (u === "top" || u === "bottom") return u;
    }
    return "top";
  }), h = () => {
    const u = p === "top" ? "bottom" : "top";
    if (f(u), typeof window < "u")
      try {
        localStorage.setItem("sdi_voice_island_pos", u);
      } catch {
      }
    o == null || o(u);
  };
  return !t || typeof window > "u" ? null : Nr(
    /* @__PURE__ */ i(
      "div",
      {
        className: $(
          "sdi-messenger-root fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2 pl-3 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-2xl transition-all duration-300 ease-out max-w-[95vw]",
          p === "top" ? "top-5 animate-in slide-in-from-top-4" : "bottom-5 animate-in slide-in-from-bottom-4"
        ),
        children: [
          /* @__PURE__ */ i("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ e(Ye, { name: "Asistente de Voz SDi", isBot: !0, size: "sm" }),
            /* @__PURE__ */ e(
              "span",
              {
                className: $(
                  "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white animate-pulse",
                  s === !1 ? "bg-amber-500" : r === "speaking" ? "bg-blue-500" : r === "listening" ? "bg-emerald-500" : a ? "bg-amber-500" : "bg-neutral-400"
                )
              }
            )
          ] }),
          /* @__PURE__ */ i("div", { className: "flex flex-col min-w-0 pr-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-900", children: "Asistente de Voz SDi" }),
              /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-neutral-600 font-semibold bg-neutral-100 px-1.5 py-0.2 rounded-md", children: n })
            ] }),
            /* @__PURE__ */ e(
              "span",
              {
                className: $(
                  "text-[11px] font-medium truncate max-w-44 sm:max-w-64",
                  s === !1 ? "text-amber-700 font-semibold" : "text-emerald-600"
                ),
                children: s === !1 ? "Micrófono sin permiso" : r === "speaking" ? "Asistente hablando..." : r === "listening" ? "Te escucho..." : a ? "Micrófono en silencio" : "En llamada activa"
              }
            )
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 pl-2 border-l border-neutral-200", children: [
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: d,
                title: a ? "Activar micrófono" : "Silenciar micrófono",
                className: $(
                  "size-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs",
                  a ? "bg-amber-500 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                ),
                children: a ? /* @__PURE__ */ e(hr, { className: "size-3.5" }) : /* @__PURE__ */ e(fr, { className: "size-3.5" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: h,
                title: p === "top" ? "Mover isla abajo" : "Mover isla arriba",
                "aria-label": p === "top" ? "Mover isla abajo" : "Mover isla arriba",
                className: "size-8 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all cursor-pointer shadow-2xs active:scale-95",
                children: p === "top" ? /* @__PURE__ */ e(Tn, { className: "size-3.5 text-neutral-600" }) : /* @__PURE__ */ e(Dn, { className: "size-3.5 text-neutral-600" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: m,
                title: "Maximizar llamada",
                className: "size-8 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all cursor-pointer shadow-2xs",
                children: /* @__PURE__ */ e(Mn, { className: "size-3.5" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: c,
                title: "Finalizar llamada",
                className: "size-8 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer active:scale-95 transition-all",
                children: /* @__PURE__ */ e(br, { className: "size-3.5" })
              }
            )
          ] })
        ]
      }
    ),
    document.body
  );
}
function tn({
  open: t,
  onOpenChange: r,
  sessionId: n,
  conversationId: a,
  userId: s,
  userAuthId: l,
  senderMessengerId: o,
  wsUrl: d,
  onCallEnded: m
}) {
  const c = $a({
    open: t,
    sessionId: n,
    conversationId: a,
    userId: s,
    userAuthId: l,
    senderMessengerId: o,
    wsUrl: d,
    onOpenChange: r,
    onCallEnded: m
  });
  return t ? /* @__PURE__ */ i(Me, { children: [
    /* @__PURE__ */ e(er, { open: t && !c.isMinimized, onOpenChange: c.handleDialogCloseAttempt, children: /* @__PURE__ */ i(
      tr,
      {
        showClose: !1,
        className: "sm:max-w-xl w-full p-0 flex flex-col overflow-hidden bg-white text-neutral-900 border border-neutral-200 shadow-2xl rounded-3xl",
        children: [
          /* @__PURE__ */ e(
            Ua,
            {
              callState: c.callState,
              isConnecting: c.isConnecting,
              isEnded: c.isEnded,
              formattedDuration: c.formattedDuration,
              contextBadges: c.contextBadges,
              onMinimize: () => c.setIsMinimized(!0)
            }
          ),
          c.isEnded ? /* @__PURE__ */ e(
            Ga,
            {
              formattedDuration: c.formattedDuration,
              transcriptsCount: c.transcripts.length,
              outcomeType: c.outcomeType,
              contextBadges: c.contextBadges,
              onClose: c.handleDismissEndedCall
            }
          ) : c.isConnecting ? /* @__PURE__ */ e(
            Oa,
            {
              statusText: c.statusText,
              onCancel: c.handleHangup
            }
          ) : /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e(
              Wa,
              {
                callState: c.callState,
                statusText: c.statusText,
                isMuted: c.isMuted,
                hasPermission: c.hasPermission,
                analyserNode: c.analyserNode,
                outputAnalyserNode: c.outputAnalyserNode,
                userRms: c.userRms,
                botRms: c.botRms,
                activeVUSegments: c.activeVUSegments,
                activeTool: c.activeTool,
                onRequestMicrophone: c.requestMicrophone
              }
            ),
            /* @__PURE__ */ e(
              qa,
              {
                transcripts: c.transcripts,
                matchedArticle: c.matchedArticle,
                noticeBanner: c.noticeBanner
              }
            ),
            /* @__PURE__ */ e(
              Va,
              {
                isMuted: c.isMuted,
                hasPermission: c.hasPermission,
                userRms: c.userRms,
                textInput: c.textInput,
                isCapturingScreen: c.isCapturingScreen,
                onTextInputChange: c.setTextInput,
                onSendTextPrompt: c.handleSendTextPrompt,
                onCaptureScreen: c.handleCaptureScreen,
                onPhotoUpload: c.handlePhotoUpload,
                onToggleMute: c.handleToggleMute,
                onHeroMicClick: c.handleHeroMicClick,
                onRequestMicrophone: c.requestMicrophone,
                onMinimize: () => c.setIsMinimized(!0),
                onHangup: c.handleHangup
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ e(
      Ka,
      {
        visible: t && c.isMinimized,
        callState: c.callState,
        formattedDuration: c.formattedDuration,
        isMuted: c.isMuted,
        hasPermission: c.hasPermission,
        onToggleMute: c.handleToggleMute,
        onMaximize: () => c.setIsMinimized(!1),
        onHangup: c.handleHangup
      }
    )
  ] }) : null;
}
let Bt = null;
const $t = /* @__PURE__ */ new Set(), It = {
  get: () => Bt,
  start: (t) => {
    Bt = t, $t.forEach((r) => r(Bt));
  },
  stop: () => {
    Bt = null, $t.forEach((t) => t(null));
  },
  subscribe: (t) => ($t.add(t), () => {
    $t.delete(t);
  })
};
function Xa() {
  return Or(
    It.subscribe,
    It.get,
    () => null
  );
}
const Sr = bt(null);
function Ya(t) {
  var n, a, s, l;
  const r = [];
  return (n = t.apiBaseUrl) != null && n.trim() || r.push("apiBaseUrl"), (t.applicationId === void 0 || t.applicationId === null) && r.push("applicationId"), t.reverb ? ((a = t.reverb.key) != null && a.trim() || r.push("reverb.key"), (s = t.reverb.host) != null && s.trim() || r.push("reverb.host"), (!Number.isFinite(t.reverb.port) || t.reverb.port <= 0) && r.push("reverb.port"), (l = t.reverb.wsPath) != null && l.trim() || r.push("reverb.wsPath"), t.reverb.scheme !== "http" && t.reverb.scheme !== "https" && r.push("reverb.scheme")) : r.push("reverb"), r.length > 0 ? new Error(`Configuración incompleta del chat: ${r.join(", ")}`) : null;
}
function nl({ config: t, children: r }) {
  const { authToken: n, apiBaseUrl: a, applicationId: s, reverb: l, apiHelpdeskBaseUrl: o } = t, d = Pe(
    () => Ya(t),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      a,
      s,
      l == null ? void 0 : l.key,
      l == null ? void 0 : l.host,
      l == null ? void 0 : l.port,
      l == null ? void 0 : l.wsPath,
      l == null ? void 0 : l.scheme,
      o
    ]
  ), [m, c] = k(null), [p, f] = k([]), [h, u] = k(null), [x, w] = k(null), [v, y] = k(null), b = JSON.stringify([a, s, n]);
  Z(() => {
    d && console.error(`[Chat] ${d.message}`);
  }, [d]), Z(() => {
    let S = !0;
    return d || !n ? () => {
      S = !1;
    } : (fa({
      apiBaseUrl: a,
      authToken: n,
      apiHelpdeskBaseUrl: o
    }), (async () => {
      var R;
      try {
        const F = await wa(), D = (await ga(F.data.data.id)).data.data;
        if (!(D != null && D.id))
          throw new Error("La respuesta no contiene un usuario válido para el chat");
        const ae = ((R = (await va({
          userId: D.attributes.user_auth_id,
          applicationId: s
        })).data.data) == null ? void 0 : R.map((se) => se.attributes.name)) ?? [];
        S && (c(D), f(ae), u(b), w(null), y(null));
      } catch (F) {
        S && (console.error("Error al cargar el usuario en ChatProvider:", F), w(F instanceof Error ? F : new Error("Error al inicializar el chat")), y(b));
      }
    })(), () => {
      S = !1;
    });
  }, [d, n, a, s, b]);
  const C = (S) => {
    c(S);
  }, E = Pe(() => m != null && m.id ? String(m.id) : "", [m]), U = !!(m != null && m.id) && h === b, z = v === b && x !== null, H = {
    currentUser: m,
    currentUserId: E,
    permissions: p,
    isLoadingUser: !d && !!n && !U && !z,
    hasError: !!d || z,
    error: d ?? (z ? x : null),
    config: t,
    setCurrentUser: C
  };
  return /* @__PURE__ */ i(Sr.Provider, { value: H, children: [
    r,
    /* @__PURE__ */ e(Ja, {})
  ] });
}
function Ja() {
  const t = Xa();
  return t ? /* @__PURE__ */ e(
    tn,
    {
      open: !!t,
      onOpenChange: (r) => {
        r || It.stop();
      },
      conversationId: t.conversationId,
      userId: t.userId,
      userAuthId: t.userAuthId,
      senderMessengerId: t.senderMessengerId,
      sessionId: t.sessionId || String(t.conversationId),
      wsUrl: t.wsUrl,
      onCallEnded: (r) => {
        var n;
        (n = t.onCallEnded) == null || n.call(t, r), It.stop();
      }
    }
  ) : null;
}
function zr() {
  return xt(Sr);
}
function Je() {
  const t = xt(Sr);
  if (!t)
    throw new Error("useChatContext debe usarse dentro de un ChatProvider");
  return t;
}
const dr = "sdi_messenger_conversation_sessions";
function _r() {
  if (typeof window > "u" || !window.localStorage)
    return {};
  try {
    const t = window.localStorage.getItem(dr);
    if (!t) return {};
    const r = JSON.parse(t);
    return r && typeof r == "object" ? r : {};
  } catch {
    return {};
  }
}
function rn(t) {
  if (!(typeof window > "u" || !window.localStorage))
    try {
      Object.keys(t).length === 0 ? window.localStorage.removeItem(dr) : window.localStorage.setItem(dr, JSON.stringify(t));
    } catch {
    }
}
function Ar(t, r) {
  const n = String(t).trim(), a = String(r).trim();
  if (!n || !a) return;
  const s = _r();
  s[n] !== a && (s[n] = a, rn(s));
}
function nn(t) {
  const r = String(t).trim();
  return r ? _r()[r] ?? null : null;
}
function Et(t) {
  const r = String(t).trim();
  if (!r) return;
  const n = _r();
  r in n && (delete n[r], rn(n));
}
const Qa = (t) => Re({
  url: `${We("messenger", "v1")}/conversations`,
  method: "GET",
  params: t
}), Za = (t) => Re({
  url: `${We("messenger", "v1")}/conversations`,
  method: "POST",
  data: t
}), es = (t) => Re({
  url: `${We("messenger", "v1")}/conversations/${t}`,
  method: "GET"
}), ts = ({
  conversationId: t,
  read_until: r,
  user_id: n
}) => Re({
  url: `${We("messenger", "v1")}/conversations/${t}/read`,
  method: "POST",
  data: { read_until: r, user_id: n }
}), rs = ({
  conversationId: t,
  user_id: r,
  is_typing: n
}) => Re({
  url: `${We("messenger", "v1")}/conversations/${t}/typing`,
  method: "POST",
  data: { user_id: r, is_typing: n }
}), an = async (t) => {
  const r = await Re({
    url: `${We("messenger", "v1")}/conversations/${t}/close`,
    method: "POST"
  });
  return Et(t), r;
}, sn = bt(null);
let Ct = null;
const ar = /* @__PURE__ */ new Set(), pt = {
  get: () => Ct,
  set: (t) => {
    (Ct == null ? void 0 : Ct.id) !== (t == null ? void 0 : t.id) && (Ct = t, ar.forEach((r) => r(t)));
  },
  subscribe: (t) => (ar.add(t), () => {
    ar.delete(t);
  })
};
function ns({
  value: t,
  children: r
}) {
  return /* @__PURE__ */ e(sn.Provider, { value: t, children: r });
}
function as() {
  var n;
  const t = xt(sn), r = Or(
    pt.subscribe,
    pt.get,
    () => null
  );
  return t || (r ? {
    conversation: r,
    isClosed: !!((n = r.attributes) != null && n.closed_at),
    isClosing: !1,
    handleCloseConversation: async () => {
      await an(r.id), typeof window < "u" && window.dispatchEvent(
        new CustomEvent("messenger:conversation-closed", {
          detail: {
            conversationId: String(r.id),
            closed_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        })
      );
    }
  } : null);
}
function al() {
  const t = as();
  if (!t)
    throw new Error("useRequiredActiveConversation debe utilizarse cuando haya una conversación activa");
  return t;
}
const Tt = (t) => t ? t.toLowerCase().split(" ").filter(Boolean).map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ") : "", Pt = (t) => !!t.attributes.is_group, gt = (t, r) => {
  var s;
  const n = ((s = t.relationships) == null ? void 0 : s.users) || [];
  if (!r)
    return n[0];
  const a = String(r);
  return n.find((l) => String(l.id) !== a) || n[0];
}, vt = (t, r) => {
  var s;
  if (Pt(t))
    return t.attributes.name || "Grupo";
  const n = gt(t, r), a = ((s = n == null ? void 0 : n.attributes) == null ? void 0 : s.name) || t.attributes.name || "Usuario";
  return Tt(a);
}, Ir = (t) => t != null && t.attributes ? Number(t.attributes.user_auth_id) === 0 : !1, ln = (t, r) => {
  var a;
  if ((a = t.attributes) != null && a.is_group) return !1;
  const n = gt(t, r);
  return Ir(n);
};
function sr(t) {
  return (r = {}) => {
    const n = r.width ? String(r.width) : t.defaultWidth;
    return t.formats[n] || t.formats[t.defaultWidth];
  };
}
function St(t) {
  return (r, n) => {
    const a = n != null && n.context ? String(n.context) : "standalone";
    let s;
    if (a === "formatting" && t.formattingValues) {
      const o = t.defaultFormattingWidth || t.defaultWidth, d = n != null && n.width ? String(n.width) : o;
      s = t.formattingValues[d] || t.formattingValues[o];
    } else {
      const o = t.defaultWidth, d = n != null && n.width ? String(n.width) : t.defaultWidth;
      s = t.values[d] || t.values[o];
    }
    const l = t.argumentCallback ? t.argumentCallback(r) : r;
    return s[l];
  };
}
function zt(t) {
  return (r, n = {}) => {
    const a = n.width, s = a && t.matchPatterns[a] || t.matchPatterns[t.defaultMatchWidth], l = r.match(s);
    if (!l)
      return null;
    const o = l[0], d = a && t.parsePatterns[a] || t.parsePatterns[t.defaultParseWidth], m = Array.isArray(d) ? is(d, (f) => f.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      ss(d, (f) => f.test(o))
    );
    let c;
    c = t.valueCallback ? t.valueCallback(m) : m, c = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(c)
    ) : c;
    const p = r.slice(o.length);
    return { value: c, rest: p };
  };
}
function ss(t, r) {
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && r(t[n]))
      return n;
}
function is(t, r) {
  for (let n = 0; n < t.length; n++)
    if (r(t[n]))
      return n;
}
function ls(t) {
  return (r, n = {}) => {
    const a = r.match(t.matchPattern);
    if (!a) return null;
    const s = a[0], l = r.match(t.parsePattern);
    if (!l) return null;
    let o = t.valueCallback ? t.valueCallback(l[0]) : l[0];
    o = n.valueCallback ? n.valueCallback(o) : o;
    const d = r.slice(s.length);
    return { value: o, rest: d };
  };
}
const os = {
  lessThanXSeconds: {
    one: "menos de un segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "medio minuto",
  lessThanXMinutes: {
    one: "menos de un minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "alrededor de 1 hora",
    other: "alrededor de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 día",
    other: "{{count}} días"
  },
  aboutXWeeks: {
    one: "alrededor de 1 semana",
    other: "alrededor de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "alrededor de 1 mes",
    other: "alrededor de {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "alrededor de 1 año",
    other: "alrededor de {{count}} años"
  },
  xYears: {
    one: "1 año",
    other: "{{count}} años"
  },
  overXYears: {
    one: "más de 1 año",
    other: "más de {{count}} años"
  },
  almostXYears: {
    one: "casi 1 año",
    other: "casi {{count}} años"
  }
}, cs = (t, r, n) => {
  let a;
  const s = os[t];
  return typeof s == "string" ? a = s : r === 1 ? a = s.one : a = s.other.replace("{{count}}", r.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "en " + a : "hace " + a : a;
}, ds = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, us = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, ms = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, hs = {
  date: sr({
    formats: ds,
    defaultWidth: "full"
  }),
  time: sr({
    formats: us,
    defaultWidth: "full"
  }),
  dateTime: sr({
    formats: ms,
    defaultWidth: "full"
  })
}, fs = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, ps = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, bs = (t, r, n, a) => r.getHours() !== 1 ? ps[t] : fs[t], xs = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, gs = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, vs = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic"
  ],
  wide: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
  ]
}, ws = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  abbreviated: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  wide: [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado"
  ]
}, ys = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  }
}, Ns = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  }
}, ks = (t, r) => Number(t) + "º", Cs = {
  ordinalNumber: ks,
  era: St({
    values: xs,
    defaultWidth: "wide"
  }),
  quarter: St({
    values: gs,
    defaultWidth: "wide",
    argumentCallback: (t) => Number(t) - 1
  }),
  month: St({
    values: vs,
    defaultWidth: "wide"
  }),
  day: St({
    values: ws,
    defaultWidth: "wide"
  }),
  dayPeriod: St({
    values: ys,
    defaultWidth: "wide",
    formattingValues: Ns,
    defaultFormattingWidth: "wide"
  })
}, Ss = /^(\d+)(º)?/i, zs = /\d+/i, _s = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, As = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, Is = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Es = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ts = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, Ds = {
  narrow: [
    /^e/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^en/i,
    /^feb/i,
    /^mar/i,
    /^abr/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^ago/i,
    /^sep/i,
    /^oct/i,
    /^nov/i,
    /^dic/i
  ]
}, Ms = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, Ps = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, Rs = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, Ls = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañana/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noche/i
  }
}, js = {
  ordinalNumber: ls({
    matchPattern: Ss,
    parsePattern: zs,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: zt({
    matchPatterns: _s,
    defaultMatchWidth: "wide",
    parsePatterns: As,
    defaultParseWidth: "any"
  }),
  quarter: zt({
    matchPatterns: Is,
    defaultMatchWidth: "wide",
    parsePatterns: Es,
    defaultParseWidth: "any",
    valueCallback: (t) => t + 1
  }),
  month: zt({
    matchPatterns: Ts,
    defaultMatchWidth: "wide",
    parsePatterns: Ds,
    defaultParseWidth: "any"
  }),
  day: zt({
    matchPatterns: Ms,
    defaultMatchWidth: "wide",
    parsePatterns: Ps,
    defaultParseWidth: "any"
  }),
  dayPeriod: zt({
    matchPatterns: Rs,
    defaultMatchWidth: "any",
    parsePatterns: Ls,
    defaultParseWidth: "any"
  })
}, jr = {
  code: "es",
  formatDistance: cs,
  formatLong: hs,
  formatRelative: bs,
  localize: Cs,
  match: js,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, Fs = ({
  conversationId: t,
  sender: r,
  body: n,
  file: a
}) => {
  const s = `optimistic-${Date.now()}`, l = (/* @__PURE__ */ new Date()).toISOString(), o = Number(r.id), d = r.attributes || {}, m = d.name || d.username || "Usuario", c = d.avatar_url ?? d.avatar ?? null, p = {
    id: String(r.id),
    type: "user",
    attributes: {
      user_auth_id: d.user_auth_id ?? r.id,
      name: m,
      avatar_url: c,
      created_at: l,
      updated_at: l
    },
    relationships: []
  };
  return {
    id: s,
    type: "message",
    attributes: {
      conversation_id: Number(t),
      created_at: l,
      sender_id: o,
      body: n || "Archivo adjunto",
      type: { id: 0, name: "message", icon: "" }
    },
    relationships: {
      sender: p,
      attachments: a ? [
        {
          id: `${s}-attachment`,
          type: "messageAttachment",
          attributes: {
            file_url: URL.createObjectURL(a),
            file_name: a.name,
            file_mime_type: a.type,
            file_size: a.size,
            created_at: l
          },
          relationships: []
        }
      ] : []
    },
    local_status: "sending"
  };
};
function Bs(t) {
  return t.slice(0, 10);
}
function Fr(t, r) {
  if (r.attributes.sender_id == null) return t;
  const n = Bs(r.attributes.created_at || ""), a = t[0];
  return a && a.date === n ? a.messages.some((s) => s.id === r.id) ? t : [{ ...a, messages: [r, ...a.messages] }, ...t.slice(1)] : [{ date: n, messages: [r] }, ...t];
}
function $s(t, r) {
  if (t.length === 0) return r;
  if (r.length === 0) return t;
  const n = t[t.length - 1], a = r[0];
  if (a.date === n.date) {
    const s = new Set(n.messages.map((o) => o.id)), l = a.messages.filter((o) => !s.has(o.id));
    return [
      ...t.slice(0, -1),
      { date: n.date, messages: [...n.messages, ...l] },
      ...r.slice(1)
    ];
  }
  return [...t, ...r];
}
function ir(t) {
  if (!t) return "Hoy";
  const r = t.trim().toLowerCase();
  if (r === "hoy" || r === "today") return "Hoy";
  if (r === "ayer" || r === "yesterday") return "Ayer";
  const n = kr(t);
  return ca(n) ? da(n) ? "Hoy" : ua(n) ? "Ayer" : ma(n, { weekStartsOn: 1 }) ? Ht(n, "EEEE", { locale: jr }) : Ht(n, "d 'de' MMMM 'de' yyyy", { locale: jr }) : t;
}
const lr = async ({
  conversation: t,
  ...r
}) => await Re({
  url: `${We("messenger", "v1")}/conversations/${t}/messages`,
  method: "GET",
  params: r
}), Us = (t, r) => Re({
  url: `${We("messenger", "v1")}/conversations/${t}/messages`,
  method: "POST",
  data: r
}), Hs = (t, r) => {
  const n = new FormData();
  return n.append("file", r.file), n.append("sender_id", r.sender_id.toString()), r.caption && n.append("caption", r.caption), Re({
    url: `${We("messenger", "v1")}/conversations/${t}/file`,
    method: "POST",
    data: n,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
function Ws(t, r) {
  var o, d, m, c;
  if (!t) return;
  const n = ((o = t.data) == null ? void 0 : o.data) ?? [];
  if (!Array.isArray(n) || n.length === 0 || n.reduce(
    (p, f) => p + (Array.isArray(f == null ? void 0 : f.messages) ? f.messages.length : 0),
    0
  ) === 0)
    return;
  const s = (d = t.data) == null ? void 0 : d.meta;
  if ((s == null ? void 0 : s.has_more) === !1)
    return;
  let l = s == null ? void 0 : s.next_cursor;
  if (!l) {
    const p = (c = (m = t.data) == null ? void 0 : m.links) == null ? void 0 : c.next;
    if (p)
      try {
        const f = new URL(p, "http://localhost");
        l = f.searchParams.get("page[cursor]") || f.searchParams.get("cursor") || void 0;
      } catch {
      }
  }
  if (!(!l || l === "null" || l === "undefined" || l.trim() === "") && !r.includes(l))
    return l;
}
const qs = ({ params: t, enabled: r = !0 }) => {
  var H, S;
  const n = r && !!(t != null && t.conversation), [a, s] = k([]), [l, o] = k([]), [d, m] = k(n), [c, p] = k(n), [f, h] = k(!1), [u, x] = k({}), w = O(t);
  w.current = t;
  const v = O(!1), y = t == null ? void 0 : t.conversation, b = a[a.length - 1], C = Ws(b, l), E = !!C, U = Q(async () => {
    var T, R, F;
    if ((T = w.current) != null && T.conversation) {
      m(!0), p(!0), v.current = !0, x({});
      try {
        const L = await lr({
          ...w.current,
          page: {
            ...(R = w.current) == null ? void 0 : R.page
          }
        });
        s([L]), o([]);
      } catch (L) {
        x(((F = L == null ? void 0 : L.response) == null ? void 0 : F.data) ?? (L == null ? void 0 : L.data) ?? {});
      } finally {
        m(!1), p(!1), v.current = !1;
      }
    }
  }, []), z = Q(async () => {
    var T, R, F;
    if (!(!E || !C || v.current || !((T = w.current) != null && T.conversation))) {
      h(!0), p(!0), v.current = !0;
      try {
        const L = await lr({
          ...w.current,
          cursor: C,
          page: {
            ...(R = w.current) == null ? void 0 : R.page,
            cursor: C
          }
        });
        s((D) => [...D, L]), o((D) => [...D, C]);
      } catch (L) {
        x(((F = L == null ? void 0 : L.response) == null ? void 0 : F.data) ?? (L == null ? void 0 : L.data) ?? {});
      } finally {
        h(!1), p(!1), v.current = !1;
      }
    }
  }, [E, C]), _ = Q((T) => {
    s((R) => {
      var V;
      if (!R || R.length === 0)
        return [
          {
            data: {
              data: Fr([], T)
            }
          }
        ];
      const F = R[0], L = ((V = F.data) == null ? void 0 : V.data) ?? [], D = Fr(L, T);
      return [
        {
          ...F,
          data: {
            ...F.data,
            data: D
          }
        },
        ...R.slice(1)
      ];
    });
  }, []);
  return Z(() => {
    if (!n || !y) {
      s([]), o([]), m(!1), p(!1);
      return;
    }
    let T = !0;
    return (async () => {
      var F;
      m(!0), p(!0), v.current = !0, x({});
      try {
        const L = await lr({
          ...t,
          page: {
            ...t == null ? void 0 : t.page
          }
        });
        T && (s([L]), o([]));
      } catch (L) {
        T && x(((F = L == null ? void 0 : L.response) == null ? void 0 : F.data) ?? (L == null ? void 0 : L.data) ?? {});
      } finally {
        T && (m(!1), p(!1), v.current = !1);
      }
    })(), () => {
      T = !1;
    };
  }, [y, n]), {
    data: Pe(() => !a || a.length === 0 ? [] : a.reduce((T, R) => {
      var L;
      const F = ((L = R == null ? void 0 : R.data) == null ? void 0 : L.data) ?? [];
      return $s(T, F);
    }, []), [a]),
    rawPages: a,
    isLoading: d,
    isPending: d,
    isFetching: c,
    isFetchingNextPage: f,
    hasNextPage: E,
    fetchNextPage: z,
    errors: u,
    refetch: U,
    prependIncomingMessage: _,
    meta: (S = (H = a[0]) == null ? void 0 : H.data) == null ? void 0 : S.meta
  };
};
function nt(t, r) {
  const [n, a] = k(void 0), [s, l] = k(null), [o, d] = k(!1), [m, c] = k(!1), [p, f] = k(!1), h = Q(() => {
    a(void 0), l(null), d(!1), c(!1), f(!1);
  }, []), u = Q(
    async (w) => {
      var v, y, b, C;
      d(!0), c(!1), f(!1), l(null);
      try {
        const E = await t(w);
        return a(E), c(!0), d(!1), await ((v = r == null ? void 0 : r.onSuccess) == null ? void 0 : v.call(r, E, w)), await ((y = r == null ? void 0 : r.onSettled) == null ? void 0 : y.call(r, E, null, w)), E;
      } catch (E) {
        const U = E;
        throw l(U), f(!0), d(!1), await ((b = r == null ? void 0 : r.onError) == null ? void 0 : b.call(r, U, w)), await ((C = r == null ? void 0 : r.onSettled) == null ? void 0 : C.call(r, void 0, U, w)), E;
      }
    },
    [t, r]
  ), x = Q(
    (w, v) => {
      u(w).then(async (y) => {
        var b, C;
        await ((b = v == null ? void 0 : v.onSuccess) == null ? void 0 : b.call(v, y, w)), await ((C = v == null ? void 0 : v.onSettled) == null ? void 0 : C.call(v, y, null, w));
      }).catch(async (y) => {
        var b, C;
        await ((b = v == null ? void 0 : v.onError) == null ? void 0 : b.call(v, y, w)), await ((C = v == null ? void 0 : v.onSettled) == null ? void 0 : C.call(v, void 0, y, w));
      });
    },
    [u]
  );
  return {
    data: n,
    error: s,
    isPending: o,
    isLoading: o,
    isSuccess: m,
    isError: p,
    reset: h,
    mutate: x,
    mutateAsync: u
  };
}
const Vs = () => nt(
  ({ conversationId: t, body: r, sender_id: n }) => Us(t, { body: r, sender_id: n }).then(
    (a) => a.data.data
  )
), Os = () => nt(
  ({ conversationId: t, file: r, sender_id: n, caption: a }) => Hs(t, { file: r, sender_id: n, caption: a }).then(
    (s) => s.data.data
  )
), on = () => {
  const t = Q(async (r) => (await ts(r)).data.data, []);
  return nt(
    t
  );
}, Gs = () => nt(
  (t) => rs(t).then(() => {
  })
), Ks = () => {
  const t = Q(async (r) => {
    const n = await an(r);
    Et(r);
    const a = (/* @__PURE__ */ new Date()).toISOString();
    return typeof window < "u" && window.dispatchEvent(
      new CustomEvent("messenger:conversation-closed", {
        detail: {
          conversationId: String(r),
          closed_at: a,
          conversation: n.data.data
        }
      })
    ), n.data.data;
  }, []);
  return nt(
    t
  );
};
function Er(t) {
  return t != null && typeof t == "object" && "attributes" in t;
}
function Ue(t) {
  return t == null ? "" : String(t);
}
function Xs(t) {
  if (t == null || typeof t != "object") return;
  if (Er(t)) return t;
  const r = t;
  return {
    id: Ue(r.id),
    type: "user",
    attributes: {
      user_auth_id: Number(r.user_auth_id),
      name: Ue(r.name),
      avatar_url: Ue(r.avatar_url),
      created_at: Ue(r.created_at),
      updated_at: Ue(r.updated_at)
    },
    relationships: []
  };
}
function Ys(t) {
  if (t == null || typeof t != "object") return;
  if (Er(t)) return t;
  const r = t;
  return {
    id: Ue(r.id),
    type: "messageAttachment",
    attributes: {
      file_url: Ue(r.file_url),
      file_name: Ue(r.file_name),
      file_mime_type: Ue(r.file_mime_type),
      file_size: Number(r.file_size),
      created_at: Ue(r.created_at)
    },
    relationships: []
  };
}
function Js(t) {
  return typeof t == "string" ? { id: 0, name: t, icon: "" } : t != null && typeof t == "object" ? t : null;
}
function Qs(t) {
  if (t == null || typeof t != "object")
    return {
      id: "",
      type: "message",
      attributes: {},
      relationships: { sender: void 0, attachments: [] }
    };
  if (Er(t)) return t;
  const r = t, n = Array.isArray(r.attachments) ? r.attachments.map(Ys).filter((a) => a != null) : [];
  return {
    id: Ue(r.id),
    type: "message",
    attributes: {
      conversation_id: Number(r.conversation_id),
      sender_id: Number(r.sender_id),
      body: Ue(r.body),
      type: Js(r.type),
      metadata: r.metadata ?? void 0,
      created_at: Ue(r.created_at),
      updated_at: Ue(r.updated_at)
    },
    relationships: {
      sender: Xs(r.sender),
      attachments: n
    }
  };
}
let ht = null, Br = null;
function cn(t) {
  if (typeof window > "u")
    return null;
  const r = JSON.stringify(t);
  return ht && Br !== r && (ht.disconnect(), ht = null), ht || (ht = new ha(
    t.key,
    {
      wsHost: t.host,
      wsPort: t.port,
      wssPort: t.port,
      wsPath: t.wsPath,
      forceTLS: t.scheme === "https",
      enabledTransports: ["ws", "wss"],
      cluster: "mt1"
    }
  ), Br = r), ht;
}
function dn(t, r, n, a) {
  if (typeof window > "u")
    return () => {
    };
  const s = cn(t);
  if (!s) return () => {
  };
  const l = s.subscribe(`conversation.${r}`);
  if (l.bind("MessageSent", (o) => {
    var p;
    const d = Qs(o), m = (p = d.attributes.metadata) == null ? void 0 : p.session_uuid, c = d.attributes.conversation_id || r;
    m && c && Ar(c, String(m)), n(d);
  }), a) {
    const o = (d) => a(d);
    l.bind("UserTyping", o), l.bind("client-UserTyping", o);
  }
  return () => {
    l.unbind_all(), s.unsubscribe(`conversation.${r}`);
  };
}
function un(t, r, n, a) {
  if (typeof window > "u")
    return () => {
    };
  const s = cn(t);
  if (!s) return () => {
  };
  const l = s.subscribe(`user.${r}`);
  return l.bind("ConversationUnreadUpdated", (o) => {
    n(o);
  }), a && (l.bind("ConversationCreated", (o) => {
    a(o);
  }), l.bind("conversation.created", (o) => {
    a(o);
  }), l.bind("NewConversation", (o) => {
    a(o);
  })), () => {
    l.unbind_all(), s.unsubscribe(`user.${r}`);
  };
}
let $r = 0;
const Zs = 1e3;
let ft = null;
function ei() {
  if (typeof window > "u") return null;
  try {
    const t = window.AudioContext || window.webkitAudioContext;
    return t ? ((!ft || ft.state === "closed") && (ft = new t()), ft.state === "suspended" && ft.resume(), ft) : null;
  } catch {
    return null;
  }
}
function _t(t, r, n, a, s) {
  const l = t.createOscillator(), o = t.createGain();
  l.type = "sine", l.frequency.setValueAtTime(r, n), o.gain.setValueAtTime(1e-4, n), o.gain.exponentialRampToValueAtTime(s, n + 0.015), o.gain.exponentialRampToValueAtTime(1e-4, n + a), l.connect(o), o.connect(t.destination), l.start(n), l.stop(n + a + 0.05);
}
function Tr(t = "focused", r = {}) {
  if (typeof window > "u") return !1;
  const n = r.throttleMs ?? Zs, a = Date.now();
  if (!r.force && a - $r < n)
    return !1;
  $r = a;
  const s = ei();
  if (!s) return !1;
  const l = Math.max(0, Math.min(1, r.volume ?? 1));
  try {
    const o = s.currentTime;
    return t === "focused" ? (_t(s, 587.33, o, 0.08, 0.12 * l), _t(s, 880, o + 0.06, 0.14, 0.1 * l)) : (_t(s, 523.25, o, 0.1, 0.15 * l), _t(s, 659.25, o + 0.08, 0.1, 0.14 * l), _t(s, 783.99, o + 0.16, 0.22, 0.16 * l)), !0;
  } catch {
    return !1;
  }
}
const ti = (t, r) => {
  const { config: n, currentUser: a, currentUserId: s } = Je(), l = Pe(
    () => ({ conversation: t.id, page: { size: "20" } }),
    [t.id]
  ), {
    data: o,
    refetch: d,
    fetchNextPage: m,
    hasNextPage: c,
    isFetchingNextPage: p,
    isLoading: f,
    prependIncomingMessage: h
  } = qs({
    params: l,
    enabled: !!t.id
  }), { mutateAsync: u, isLoading: x } = Vs(), { mutateAsync: w, isLoading: v } = Os(), { mutateAsync: y } = on(), { mutate: b } = Gs(), { mutateAsync: C, isLoading: E } = Ks(), [U, z] = k(""), [_, X] = k(null), H = !!t.attributes.closed_at, [S, T] = k([]), [R, F] = k(!0), [L, D] = k(0), [V, ae] = k("Hoy"), [se, me] = k(null), g = O(null), N = O(!1), J = O(!1), M = O(0), W = O(0), j = O(!1), ne = O(c), xe = O(t.id), Y = O(null), oe = O(null), te = O(null), de = O(!1), Ee = O(b), Ae = vt(t, s);
  Z(() => {
    Ee.current = b;
  }, [b]), Z(() => {
    j.current = p;
  }, [p]), Z(() => {
    ne.current = c;
  }, [c]);
  const Te = Q(() => {
    const A = g.current;
    A && (A.scrollTo({
      top: A.scrollHeight,
      behavior: "smooth"
    }), D(0), F(!0));
  }, []), Ce = Q(() => {
    const A = g.current;
    if (!A) return;
    const P = A.scrollHeight - A.scrollTop - A.clientHeight < 140;
    F(P), P && D(0);
    const G = A.querySelectorAll("[data-message-date]");
    if (G.length === 0) {
      ae("Hoy");
      return;
    }
    const re = A.getBoundingClientRect(), Se = re.top, ze = re.bottom;
    let De = null;
    for (let be = 0; be < G.length; be++) {
      const at = G[be], Fe = at.getBoundingClientRect();
      if (Fe.bottom > Se && Fe.top < ze) {
        De = at.getAttribute("data-message-date");
        break;
      }
    }
    ae(De || G[G.length - 1].getAttribute("data-message-date") || "Hoy");
  }, []);
  Z(() => {
    xe.current !== t.id && (xe.current = t.id, N.current = !1, J.current = !1, M.current = 0, W.current = 0, T([]), F(!0), D(0), ae("Hoy"));
  }, [t.id]), Z(() => {
    if (N.current || f || o.length === 0) return;
    const A = g.current;
    A && (A.scrollTop = A.scrollHeight, N.current = !0, F(!0), Ce());
  }, [t.id, f, o.length, Ce]), Nn(() => {
    const A = g.current;
    if (A && M.current > 0) {
      const P = A.scrollHeight - M.current;
      P > 0 && (A.scrollTop = W.current + P), M.current = 0, W.current = 0;
    }
  }, [o]), Z(() => {
    if (S.length > 0) {
      const A = g.current;
      if (A) {
        J.current = !0, A.scrollTo({
          top: A.scrollHeight,
          behavior: "smooth"
        });
        const q = setTimeout(() => {
          J.current = !1;
        }, 500);
        return () => clearTimeout(q);
      }
    }
  }, [S.length]), Z(() => {
    const A = g.current;
    if (!A) return;
    const q = () => {
      Ce(), !(J.current || !N.current) && A.scrollTop < 80 && ne.current && !j.current && !f && (j.current = !0, M.current = A.scrollHeight, W.current = A.scrollTop, m().finally(() => {
        j.current = !1;
      }));
    };
    return A.addEventListener("scroll", q, { passive: !0 }), () => {
      A.removeEventListener("scroll", q);
    };
  }, [m, f, Ce]);
  const Le = Q(() => {
    !t.id || !s || (Y.current && clearTimeout(Y.current), Y.current = setTimeout(() => {
      Y.current = null, y({
        conversationId: t.id,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: s
      }).then(() => {
        typeof window < "u" && window.dispatchEvent(
          new CustomEvent("messenger:conversation-read", {
            detail: { conversationId: t.id }
          })
        );
      }).catch(console.error);
    }, 200));
  }, [t.id, s, y]);
  Z(() => () => {
    Y.current && (clearTimeout(Y.current), Y.current = null), oe.current && (clearTimeout(oe.current), oe.current = null), te.current && (clearTimeout(te.current), te.current = null), me(null);
  }, [t.id]);
  const He = Q(
    (A) => {
      h(A);
      const q = g.current;
      q && (q.scrollHeight - q.scrollTop - q.clientHeight < 160 ? setTimeout(() => {
        q.scrollTo({
          top: q.scrollHeight,
          behavior: "smooth"
        });
      }, 50) : D((re) => re + 1)), s && String(A.attributes.sender_id) !== String(s) && (Tr("focused"), oe.current && (clearTimeout(oe.current), oe.current = null), me(null)), Le();
    },
    [s, h, Le]
  ), ve = Q(
    (A) => {
      if (String(A.user_id) !== String(s)) {
        if (oe.current && (clearTimeout(oe.current), oe.current = null), !A.is_typing) {
          me(null);
          return;
        }
        me(A.user.name), oe.current = setTimeout(() => {
          oe.current = null, me(null);
        }, 6e4);
      }
    },
    [s]
  ), K = Q(
    (A) => {
      !t.id || !s || de.current === A || (de.current = A, Ee.current({
        conversationId: t.id,
        user_id: Number(s),
        is_typing: A
      }));
    },
    [t.id, s]
  ), qe = Q(() => {
    te.current && clearTimeout(te.current), te.current = setTimeout(() => {
      te.current = null, K(!1);
    }, 2500);
  }, [K]), Ve = Q(
    (A) => {
      if (!H) {
        if (z(A), !A.trim()) {
          te.current && (clearTimeout(te.current), te.current = null), K(!1);
          return;
        }
        K(!0), qe();
      }
    },
    [H, qe, K]
  );
  Z(() => () => {
    te.current && (clearTimeout(te.current), te.current = null), K(!1);
  }, [t.id, K]);
  const Qe = () => {
    t.attributes.unread_count && Le();
  };
  Z(() => {
    Qe();
  }, [t, o, Le]), Z(() => {
    var A, q, P;
    if (t.id) {
      if (H) {
        Et(t.id);
        return;
      }
      if (!nn(t.id))
        for (let G = o.length - 1; G >= 0; G--) {
          const re = o[G];
          if (Array.isArray(re == null ? void 0 : re.messages))
            for (let Se = re.messages.length - 1; Se >= 0; Se--) {
              const ze = (P = (q = (A = re.messages[Se]) == null ? void 0 : A.attributes) == null ? void 0 : q.metadata) == null ? void 0 : P.session_uuid;
              if (ze) {
                Ar(t.id, String(ze));
                return;
              }
            }
        }
    }
  }, [t.id, H, o]), Z(() => {
    if (!t.id) return;
    const A = dn(
      n.reverb,
      Number(t.id),
      He,
      ve
    );
    return () => {
      A();
    };
  }, [n.reverb, t.id, He, ve]);
  const Oe = Q(
    (A) => {
      H || X(A);
    },
    [H]
  ), B = async (A) => {
    if (H) return;
    const q = (typeof A == "string" ? A : U).trim();
    if (!q && !_ || !a) return;
    const P = typeof A == "string" ? null : _, G = Fs({
      conversationId: t.id,
      sender: a,
      body: q,
      file: P
    }), re = G.id;
    T((Se) => [...Se, G]), typeof A != "string" && z(""), te.current && (clearTimeout(te.current), te.current = null), K(!1);
    try {
      const Se = P ? await w({
        conversationId: t.id,
        file: P,
        sender_id: Number(a.id),
        caption: q || void 0
      }) : await u({
        body: q,
        conversationId: t.id,
        sender_id: a.id
      });
      X(null), await d(), T((ze) => ze.filter((De) => De.id !== re));
    } catch {
      T(
        (Se) => Se.map(
          (ze) => ze.id === re ? { ...ze, local_status: "error" } : ze
        )
      );
    }
  }, ie = Q(async () => {
    var A, q, P;
    try {
      await C(t.id), Ne.success("Conversación cerrada exitosamente"), (A = r == null ? void 0 : r.onCloseSuccess) == null || A.call(r);
    } catch (G) {
      const re = ((P = (q = G == null ? void 0 : G.response) == null ? void 0 : q.data) == null ? void 0 : P.message) || (G == null ? void 0 : G.message) || "Error al cerrar la conversación";
      Ne.error(re);
    }
  }, [C, t.id, r]);
  return {
    messages: o,
    optimisticMessages: S,
    scrollRef: g,
    conversationName: Ae,
    inputText: U,
    pendingFile: _,
    isClosed: H,
    isClosing: E,
    isSending: x,
    isUploading: v,
    isFetchingNextPage: p,
    hasNextPage: c,
    isLoading: f,
    isNearBottom: R,
    newMessagesCount: L,
    typingUser: se,
    visibleDate: V,
    currentUser: a,
    currentUserId: s,
    scrollToBottom: Te,
    setInputText: Ve,
    setPendingFile: X,
    handleSendMessage: B,
    handleSelectFile: Oe,
    handleCloseConversation: ie,
    refetchMessages: d
  };
}, ri = (t) => Re({
  url: `${Dt("helpdesk", "v1")}/requests/chat-support`,
  method: "POST",
  data: t
}), ni = (t) => Re({
  url: `${Dt("helpdesk", "v1")}/chat-bot/escalate`,
  method: "POST",
  data: t
}), ai = (t) => Re({
  url: `${Dt("helpdesk", "v1")}/chat-bot/resolve`,
  method: "POST",
  data: t
}), si = (t) => Re({
  url: `${Dt("helpdesk", "v1")}/chat-bot/queue-status`,
  method: "GET",
  params: {
    session_id: t
  }
}), ii = (t) => Re({
  url: `${Dt("helpdesk", "v1")}/chat-bot/queue-to-ticket`,
  method: "POST",
  params: {
    session_id: t.session_id
  },
  data: t
});
function mn(t) {
  var a, s;
  if (!(t != null && t.conversation_id)) return null;
  const r = String(t.conversation_id), n = t.technician ? [
    {
      id: String(t.technician.id),
      type: "user",
      attributes: {
        user_auth_id: Number(t.technician.user_auth_id ?? t.technician.id ?? 1),
        name: t.technician.name,
        avatar_url: null,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      },
      relationships: []
    }
  ] : [];
  return {
    id: r,
    type: "conversation",
    attributes: {
      is_group: !1,
      name: ((a = t.technician) == null ? void 0 : a.name) || ((s = t.ticket) == null ? void 0 : s.subject) || "Soporte SDI",
      closed_at: null,
      unread_count: 0,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    },
    relationships: {
      users: n
    }
  };
}
const li = () => {
  const t = Q(async (r) => {
    var s;
    const n = await ni(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    if (typeof window < "u" && (a != null && a.conversation_id)) {
      const l = mn(a);
      window.dispatchEvent(
        new CustomEvent("messenger:conversation-created", {
          detail: {
            conversationId: String(a.conversation_id),
            conversation: l,
            focus: !0
          }
        })
      );
    }
    return a;
  }, []);
  return nt(
    t
  );
}, oi = () => {
  const t = Q(async (r) => {
    var s;
    const n = await ai(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    if (typeof window < "u") {
      const l = a != null && a.conversation_id ? String(a.conversation_id) : void 0;
      window.dispatchEvent(
        new CustomEvent("messenger:conversation-closed", {
          detail: {
            conversationId: l,
            closed_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        })
      ), window.dispatchEvent(new CustomEvent("messenger:conversation-updated"));
    }
    return a;
  }, []);
  return nt(t);
}, ci = ({
  sessionId: t,
  enabled: r = !1,
  intervalMs: n = 5e3,
  onStatusUpdate: a,
  onAssigned: s,
  onError: l
} = {}) => {
  const [o, d] = k(null), [m, c] = k(!1), [p, f] = k(null), h = O(!1), u = O(a), x = O(s), w = O(l);
  u.current = a, x.current = s, w.current = l;
  const v = Q(async () => {
    var y, b, C, E;
    if (!t || h.current) return null;
    try {
      c(!0);
      const U = await si(t), z = ((y = U.data) == null ? void 0 : y.data) ?? U.data;
      if (d(z), f(null), (b = u.current) == null || b.call(u, z), ((z == null ? void 0 : z.status) === "escalated_live" || (z == null ? void 0 : z.mode) === "live_chat" || !!(z != null && z.conversation_id)) && !h.current) {
        if (h.current = !0, typeof window < "u" && (z != null && z.conversation_id)) {
          const X = mn(z);
          window.dispatchEvent(
            new CustomEvent("messenger:conversation-created", {
              detail: {
                conversationId: String(z.conversation_id),
                conversation: X,
                focus: !0
              }
            })
          );
        }
        (C = x.current) == null || C.call(x, z);
      }
      return z;
    } catch (U) {
      const z = U;
      return f(z), (E = w.current) == null || E.call(w, z), null;
    } finally {
      c(!1);
    }
  }, [t]);
  return Z(() => {
    h.current = !1;
  }, [t]), Z(() => {
    if (!r || !t)
      return;
    v();
    const y = setInterval(() => {
      if (h.current) {
        clearInterval(y);
        return;
      }
      v();
    }, n);
    return () => {
      clearInterval(y);
    };
  }, [v, r, n, t]), {
    data: o,
    isPolling: m,
    error: p,
    checkStatus: v,
    isAssigned: h.current
  };
}, di = () => {
  const t = Q(async (r) => {
    var s;
    const n = await ii(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    if (typeof window < "u") {
      const l = a != null && a.conversation_id ? String(a.conversation_id) : void 0;
      window.dispatchEvent(
        new CustomEvent("messenger:conversation-closed", {
          detail: {
            conversationId: l,
            closed_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        })
      ), window.dispatchEvent(new CustomEvent("messenger:conversation-updated"));
    }
    return a;
  }, []);
  return nt(t);
};
function ui(t, r, n = "OR") {
  const a = Array.isArray(r) ? r : [r];
  return a.length === 0 ? !0 : n === "AND" ? a.every((s) => t.includes(s)) : a.some((s) => t.includes(s));
}
function Ze({
  permission: t,
  operator: r = "OR"
}) {
  const n = zr(), a = (n == null ? void 0 : n.permissions) ?? [];
  return ui(a, t, r);
}
function mi({
  conversation: t,
  isClosed: r = !!t.attributes.closed_at,
  isClosing: n = !1,
  onCloseConversation: a,
  showResolvedBadge: s = !1,
  className: l,
  ...o
}) {
  const [d, m] = k(!1), { currentUserId: c } = Je(), p = Ze({
    permission: ["messenger_chat_support.provide_support"]
  }), f = vt(t, c);
  return r && s ? /* @__PURE__ */ i(
    "div",
    {
      className: $(
        "inline-flex h-8 items-center gap-1.5 rounded-lg border-none dark:border-neutral-700/80 bg-neutral-100/60 dark:bg-neutral-800/60 px-2.5 sm:px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 select-none ",
        l
      ),
      children: [
        /* @__PURE__ */ e(ut, { className: "size-3.5 text-emerald-500" }),
        /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Resuelta" })
      ]
    }
  ) : r && !s || !p ? null : /* @__PURE__ */ i(Me, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        disabled: n,
        onClick: () => m(!0),
        title: "Cerrar y marcar conversación como resuelta",
        "aria-label": "Cerrar conversación",
        className: $(
          "group inline-flex h-8 items-center gap-1.5 rounded-lg border-none dark:border-neutral-700/80 bg-white dark:bg-neutral-800/90 px-2.5 sm:px-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-all hover:border-emerald-300 dark:hover:border-emerald-700/70 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 dark:hover:text-emerald-300 active:scale-[0.98] cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          l
        ),
        ...o,
        children: n ? /* @__PURE__ */ i(Me, { children: [
          /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin text-neutral-500" }),
          /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Cerrando..." })
        ] }) : /* @__PURE__ */ i(Me, { children: [
          /* @__PURE__ */ e(ut, { className: "size-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover:scale-110" }),
          /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Cerrar chat" })
        ] })
      }
    ),
    /* @__PURE__ */ e(Ca, { open: d, onOpenChange: m, children: /* @__PURE__ */ i(Sa, { className: "sm:max-w-md p-5", children: [
      /* @__PURE__ */ i(za, { className: "gap-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ e("div", { className: "flex size-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20", children: /* @__PURE__ */ e(mt, { className: "size-4" }) }),
          /* @__PURE__ */ e(_a, { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "¿Cerrar conversación?" })
        ] }),
        /* @__PURE__ */ i(Aa, { className: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: [
          "¿Estás seguro de que deseas marcar como resuelta y cerrar la conversación con",
          " ",
          /* @__PURE__ */ e("strong", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children: f }),
          "? Esta acción finalizará la atención en tiempo real."
        ] })
      ] }),
      /* @__PURE__ */ i(Ia, { className: "gap-2 sm:gap-0 mt-3", children: [
        /* @__PURE__ */ e(Ea, { disabled: n, className: "text-xs h-8 cursor-pointer", children: "Cancelar" }),
        /* @__PURE__ */ e(
          Ta,
          {
            disabled: n,
            onClick: () => {
              m(!1), a == null || a();
            },
            className: "text-xs ms-2 h-8 bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer",
            children: "Sí, cerrar conversación"
          }
        )
      ] })
    ] }) })
  ] });
}
function hi({
  conversation: t,
  isClosed: r,
  isClosing: n = !1,
  onCloseConversation: a,
  isContextPanelOpen: s = !0,
  onToggleContextPanel: l,
  onBack: o,
  alwaysShowBackButton: d = !1,
  renderOptions: m,
  onStartVoiceCall: c
}) {
  var w, v;
  const { currentUserId: p } = Je(), f = Pt(t), h = vt(t, p), u = gt(t, p), x = ln(t, p) || Ir(u);
  return /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 p-2 sm:p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs min-w-0", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden", children: [
      o && /* @__PURE__ */ e(
        fe,
        {
          variant: "ghost",
          size: "sm",
          onClick: o,
          title: "Volver a la lista de chats",
          "aria-label": "Volver a la lista de chats",
          className: $(
            "size-8 p-0 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
            d ? "flex" : "flex md:hidden"
          ),
          children: /* @__PURE__ */ e(xr, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ e(
        Ye,
        {
          src: u == null ? void 0 : u.attributes.avatar_url,
          name: h,
          isGroup: f,
          isBot: x,
          size: "md",
          className: "shrink-0"
        }
      ),
      /* @__PURE__ */ i("div", { className: "min-w-0 flex-1 overflow-hidden", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
          /* @__PURE__ */ e(
            "h3",
            {
              className: "truncate text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 min-w-0",
              title: h,
              children: h
            }
          ),
          x && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 rounded-full bg-violet-100 dark:bg-violet-950/70 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40 shrink-0 shadow-2xs", children: [
            /* @__PURE__ */ e(pr, { className: "size-2.5 text-violet-600 dark:text-violet-400" }),
            /* @__PURE__ */ e("span", { children: "Asistente IA" })
          ] }),
          r && /* @__PURE__ */ i(
            ot,
            {
              variant: "destructive",
              className: "inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium shrink-0 py-0 h-4.5 px-1.5",
              children: [
                /* @__PURE__ */ e(mt, { className: "size-2.5" }),
                /* @__PURE__ */ e("span", { children: "Cerrada" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 min-w-0", children: /* @__PURE__ */ e("span", { className: "truncate", children: f ? `${((v = (w = t.relationships) == null ? void 0 : w.users) == null ? void 0 : v.length) || 0} participantes` : x ? "Asistente virtual automatizado" : "Conversación individual" }) })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 shrink-0", children: [
      x && !r && c && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: c,
          title: "Llamar al Asistente de Voz (Interactivo)",
          "aria-label": "Llamar al Asistente de Voz",
          className: "group inline-flex h-8 items-center gap-1.5 rounded-lg border-none dark:border-neutral-700/80 bg-white dark:bg-neutral-800/90 px-2.5 sm:px-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-all hover:border-emerald-300 dark:hover:border-emerald-700/70 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 dark:hover:text-emerald-300 active:scale-[0.98] cursor-pointer",
          children: [
            /* @__PURE__ */ e(Pn, { className: "size-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover:scale-110" }),
            /* @__PURE__ */ e("span", { className: "tracking-tight", children: "Llamar" })
          ]
        }
      ),
      (m == null ? void 0 : m.customHeaderButtons) !== void 0 ? m.customHeaderButtons : /* @__PURE__ */ e(
        mi,
        {
          conversation: t,
          isClosed: r,
          isClosing: n,
          onCloseConversation: a,
          showResolvedBadge: !1
        }
      ),
      l && /* @__PURE__ */ e(
        fe,
        {
          variant: "outline",
          size: "icon",
          onClick: l,
          className: $(
            "size-8 p-0",
            s ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" : ""
          ),
          children: /* @__PURE__ */ e(Rn, { className: "size-4" })
        }
      )
    ] })
  ] });
}
const fi = /* @__PURE__ */ new Set(["http:", "https:", "mailto:"]);
function hn(t) {
  const r = t.trim();
  if (!r) return null;
  try {
    const n = new URL(r);
    return fi.has(n.protocol.toLowerCase()) ? n.href : null;
  } catch {
    return null;
  }
}
function ct(t) {
  return t ? t.replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&amp;/gi, "&") : "";
}
function pi({
  language: t,
  code: r,
  isOwnMessage: n
}) {
  const [a, s] = k(!1), l = async () => {
    try {
      await navigator.clipboard.writeText(r), s(!0), setTimeout(() => s(!1), 1800);
    } catch {
    }
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: $(
        "my-2 overflow-hidden rounded-xl border text-xs",
        n ? "border-blue-400/40 bg-slate-950/90 text-slate-100" : "border-neutral-200 dark:border-neutral-700/80 bg-slate-900 dark:bg-slate-950 text-slate-100"
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-3 py-1.5 text-[10px] text-slate-400", children: [
          /* @__PURE__ */ e("span", { className: "font-mono uppercase tracking-wider", children: t || "código" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: l,
              className: "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer",
              title: "Copiar código",
              children: a ? /* @__PURE__ */ i(Me, { children: [
                /* @__PURE__ */ e(gr, { className: "size-3 text-emerald-400" }),
                /* @__PURE__ */ e("span", { className: "text-emerald-400", children: "Copiado" })
              ] }) : /* @__PURE__ */ i(Me, { children: [
                /* @__PURE__ */ e(jn, { className: "size-3" }),
                /* @__PURE__ */ e("span", { children: "Copiar" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ e("pre", { className: "overflow-x-auto p-3 font-mono text-[11.5px] leading-relaxed whitespace-pre", children: /* @__PURE__ */ e("code", { children: r }) })
      ]
    }
  );
}
function $e(t) {
  if (!t) return [];
  const r = [];
  let n = t;
  const a = /^`([^`]+)`/, s = /^\*\*([^*]+)\*\*/, l = /^__([^_]+)__/, o = /^\*([^*]+)\*/, d = /^_([^_]+)_/, m = /^~~([^~]+)~~/, c = /^\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/, p = /^((?:https?:\/\/|mailto:)[^\s<]+[^<.,:;"')\]\s])/, f = /^<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/i, h = /^<(?:i|em)>([\s\S]*?)<\/(?:i|em)>/i, u = /^<u>([\s\S]*?)<\/u>/i, x = /^<(?:s|strike|del)>([\s\S]*?)<\/(?:s|strike|del)>/i, w = /^<code>([\s\S]*?)<\/code>/i, v = /^<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/i, y = /^<br\s*\/?>/i;
  for (; n.length > 0; ) {
    let b = n.match(y);
    if (b) {
      r.push({ type: "br" }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(a), b) {
      r.push({ type: "inlineCode", value: b[1] }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(w), b) {
      r.push({ type: "inlineCode", value: ct(b[1]) }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(c), b) {
      r.push({
        type: "link",
        label: b[1],
        href: b[2]
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(v), b) {
      r.push({
        type: "link",
        href: b[1],
        label: ct(b[2].replace(/<[^>]*>/g, ""))
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(s) || n.match(l), b) {
      r.push({
        type: "bold",
        children: $e(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(f), b) {
      r.push({
        type: "bold",
        children: $e(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(o) || n.match(d), b) {
      r.push({
        type: "italic",
        children: $e(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(h), b) {
      r.push({
        type: "italic",
        children: $e(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(m), b) {
      r.push({
        type: "strike",
        children: $e(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(x), b) {
      r.push({
        type: "strike",
        children: $e(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(u), b) {
      r.push({
        type: "underline",
        children: $e(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(p), b) {
      r.push({
        type: "link",
        href: b[1],
        label: b[1],
        isAuto: !0
      }), n = n.slice(b[0].length);
      continue;
    }
    const C = n.search(/[`*~_\[<]|https?:\/\/|mailto:/);
    if (C === -1) {
      r.push({ type: "text", value: ct(n) });
      break;
    } else C === 0 ? (r.push({ type: "text", value: ct(n[0]) }), n = n.slice(1)) : (r.push({
      type: "text",
      value: ct(n.slice(0, C))
    }), n = n.slice(C));
  }
  return r;
}
function Ur(t) {
  const r = t.trim();
  if (!r.includes("|")) return !1;
  const n = r.split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  return n.length === 0 ? !1 : n.every((a) => /^:?-+:?$/.test(a));
}
function Hr(t) {
  let r = t.trim();
  return r.startsWith("|") && (r = r.slice(1)), r.endsWith("|") && (r = r.slice(0, -1)), r.split("|").map((n) => n.trim());
}
function bi(t) {
  if (!t) return [];
  const n = t.replace(/\r\n/g, `
`).replace(
    /<pre[^>]*>\s*<code(?:\s+class=["'][^"']*language-([a-zA-Z0-9_-]+)[^"']*["'])?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (l, o, d) => {
      const m = ct(d.replace(/<br\s*\/?>/gi, `
`));
      return `
\`\`\`${o || ""}
${m}
\`\`\`
`;
    }
  ).replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (l, o) => `
\`\`\`
${ct(o.replace(/<br\s*\/?>/gi, `
`).replace(/<\/?code[^>]*>/gi, ""))}
\`\`\`
`).split(`
`), a = [];
  let s = 0;
  for (; s < n.length; ) {
    const l = n[s], o = l.match(/^```\s*([a-zA-Z0-9_-]*)/);
    if (o) {
      const h = o[1] || void 0, u = [];
      for (s++; s < n.length && !n[s].startsWith("```"); )
        u.push(n[s]), s++;
      s < n.length && n[s].startsWith("```") && s++, a.push({
        type: "code",
        language: h,
        code: u.join(`
`)
      });
      continue;
    }
    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(l.trim())) {
      a.push({ type: "hr" }), s++;
      continue;
    }
    const d = l.match(/^(#{1,6})\s+(.+)$/);
    if (d) {
      const h = d[1].length;
      a.push({
        type: "heading",
        level: h,
        children: $e(d[2].trim())
      }), s++;
      continue;
    }
    if (/^>\s?/.test(l)) {
      const h = [];
      for (; s < n.length && /^>\s?/.test(n[s]); )
        h.push(n[s].replace(/^>\s?/, "")), s++;
      a.push({
        type: "quote",
        lines: h
      });
      continue;
    }
    if (l.trim().startsWith("|") && s + 1 < n.length && Ur(n[s + 1])) {
      const u = Hr(l).map((w) => $e(w));
      s += 2;
      const x = [];
      for (; s < n.length && n[s].trim().includes("|"); ) {
        const w = Hr(n[s]);
        x.push(w.map((v) => $e(v))), s++;
      }
      a.push({
        type: "table",
        headers: u,
        rows: x
      });
      continue;
    }
    if (l.match(/^(\s*)([-*+])\s+(.+)$/)) {
      const h = [];
      for (; s < n.length; ) {
        const u = n[s].match(/^(\s*)([-*+])\s+(.+)$/);
        if (!u) break;
        h.push($e(u[3])), s++;
      }
      a.push({
        type: "list",
        ordered: !1,
        items: h
      });
      continue;
    }
    const c = l.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (c) {
      const h = parseInt(c[2], 10), u = [];
      for (; s < n.length; ) {
        const x = n[s].match(/^(\s*)(\d+)\.\s+(.+)$/);
        if (!x) break;
        u.push($e(x[3])), s++;
      }
      a.push({
        type: "list",
        ordered: !0,
        start: h,
        items: u
      });
      continue;
    }
    const p = [];
    for (; s < n.length && !n[s].startsWith("```") && !n[s].match(/^(#{1,6})\s+/) && !/^(?:-{3,}|\*{3,}|_{3,})$/.test(n[s].trim()) && !/^>\s?/.test(n[s]) && !(n[s].trim().startsWith("|") && s + 1 < n.length && Ur(n[s + 1])) && !n[s].match(/^(\s*)(?:[-*+]|\d+\.)\s+/) && (p.push(n[s]), s++, p[p.length - 1].trim() !== ""); )
      ;
    const f = p.join(`
`).replace(/^\n+|\n+$/g, "");
    if (f) {
      const h = [];
      f.split(`
`).forEach((x, w) => {
        w > 0 && h.push({ type: "br" }), x && h.push(...$e(x));
      }), a.push({
        type: "paragraph",
        children: h
      });
    }
  }
  return a;
}
function tt(t, r, n = "inline") {
  return t.map((a, s) => {
    const l = `${n}-${s}`;
    switch (a.type) {
      case "text":
        return /* @__PURE__ */ e(yn.Fragment, { children: a.value }, l);
      case "br":
        return /* @__PURE__ */ e("br", {}, l);
      case "bold":
        return /* @__PURE__ */ e("strong", { className: "font-bold", children: tt(a.children, r, l) }, l);
      case "italic":
        return /* @__PURE__ */ e("em", { className: "italic", children: tt(a.children, r, l) }, l);
      case "underline":
        return /* @__PURE__ */ e("u", { className: "underline underline-offset-2", children: tt(a.children, r, l) }, l);
      case "strike":
        return /* @__PURE__ */ e("del", { className: "line-through opacity-85", children: tt(a.children, r, l) }, l);
      case "inlineCode":
        return /* @__PURE__ */ e(
          "code",
          {
            className: $(
              "inline-block rounded-md px-1.5 py-0.5 font-mono text-[11.5px]",
              r ? "bg-blue-700/80 text-blue-100 border border-blue-400/40" : "bg-slate-900 dark:bg-slate-950 text-emerald-300 dark:text-emerald-400 border border-slate-700/50"
            ),
            children: a.value
          },
          l
        );
      case "link": {
        const o = hn(a.href);
        return o ? /* @__PURE__ */ i(
          "a",
          {
            href: o,
            target: "_blank",
            rel: "noopener noreferrer",
            className: $(
              "inline-flex items-center gap-0.5 font-semibold underline underline-offset-2 transition-opacity hover:opacity-85 break-all",
              r ? "text-white decoration-blue-200" : "text-blue-600 dark:text-blue-400 decoration-blue-400/60"
            ),
            children: [
              /* @__PURE__ */ e("span", { children: a.label }),
              /* @__PURE__ */ e(Ln, { className: "size-3 shrink-0 inline" })
            ]
          },
          l
        ) : /* @__PURE__ */ e("span", { children: a.label }, l);
      }
      default:
        return null;
    }
  });
}
function xi(t, r) {
  return t.map((n, a) => {
    const s = `block-${a}`;
    switch (n.type) {
      case "code":
        return /* @__PURE__ */ e(
          pi,
          {
            language: n.language,
            code: n.code,
            isOwnMessage: r
          },
          s
        );
      case "heading":
        return /* @__PURE__ */ e("div", { className: {
          1: "text-sm sm:text-base font-bold mt-2 mb-1",
          2: "text-xs sm:text-sm font-bold mt-1.5 mb-1",
          3: "text-xs font-bold mt-1 mb-0.5",
          4: "text-xs font-semibold mt-1 mb-0.5",
          5: "text-xs font-semibold mt-0.5 mb-0.5",
          6: "text-xs font-medium mt-0.5 mb-0.5"
        }[n.level], children: tt(n.children, r, s) }, s);
      case "quote":
        return /* @__PURE__ */ e(
          "blockquote",
          {
            className: $(
              "my-1.5 border-l-2 pl-3 italic",
              r ? "border-blue-200 text-blue-50" : "border-violet-400 dark:border-violet-500 text-neutral-600 dark:text-neutral-300"
            ),
            children: n.lines.map((l, o) => /* @__PURE__ */ e("div", { children: tt($e(l), r, `${s}-${o}`) }, `${s}-line-${o}`))
          },
          s
        );
      case "list": {
        const l = n.ordered ? "ol" : "ul", o = n.ordered ? "my-1.5 list-decimal pl-5 space-y-1 marker:font-semibold" : "my-1.5 list-disc pl-5 space-y-1";
        return /* @__PURE__ */ e(l, { start: n.start, className: o, children: n.items.map((d, m) => /* @__PURE__ */ e("li", { className: "leading-relaxed", children: tt(d, r, `${s}-${m}`) }, `${s}-item-${m}`)) }, s);
      }
      case "table":
        return /* @__PURE__ */ e(
          "div",
          {
            className: $(
              "my-2 overflow-x-auto rounded-xl border",
              r ? "border-blue-400/40 bg-blue-700/40" : "border-neutral-200 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/60"
            ),
            children: /* @__PURE__ */ i("table", { className: "w-full border-collapse text-left text-xs", children: [
              n.headers.length > 0 && /* @__PURE__ */ e(
                "thead",
                {
                  className: $(
                    "border-b font-semibold",
                    r ? "border-blue-400/40 bg-blue-800/50 text-white" : "border-neutral-200 dark:border-neutral-700/80 bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-100"
                  ),
                  children: /* @__PURE__ */ e("tr", { children: n.headers.map((l, o) => /* @__PURE__ */ e("th", { className: "px-2.5 py-1.5 font-semibold whitespace-nowrap", children: tt(l, r, `${s}-th-${o}`) }, `${s}-th-${o}`)) })
                }
              ),
              /* @__PURE__ */ e("tbody", { className: "divide-y divide-neutral-200/60 dark:divide-neutral-800/60", children: n.rows.map((l, o) => /* @__PURE__ */ e(
                "tr",
                {
                  className: $(
                    "border-b last:border-b-0",
                    r ? "border-blue-400/30 hover:bg-blue-700/30" : "border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40"
                  ),
                  children: l.map((d, m) => /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 align-top", children: tt(d, r, `${s}-td-${o}-${m}`) }, `${s}-td-${o}-${m}`))
                },
                `${s}-tr-${o}`
              )) })
            ] })
          },
          s
        );
      case "hr":
        return /* @__PURE__ */ e(
          "hr",
          {
            className: $(
              "my-2 border-t",
              r ? "border-blue-400/40" : "border-neutral-200 dark:border-neutral-700"
            )
          },
          s
        );
      case "paragraph":
      default:
        return /* @__PURE__ */ e("div", { className: "whitespace-pre-wrap break-words leading-relaxed", children: tt(n.children, r, s) }, s);
    }
  });
}
function Kt({
  content: t,
  isOwnMessage: r = !1,
  className: n
}) {
  const a = bi(t);
  return /* @__PURE__ */ e("div", { className: $("space-y-1 whitespace-pre-wrap break-words leading-relaxed", n), children: xi(a, r) });
}
function gi(t) {
  if (!t) return "";
  try {
    const r = new Date(t);
    return isNaN(r.getTime()) ? "" : r.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: !1 });
  } catch {
    return "";
  }
}
function Wr({
  message: t,
  isOwnMessage: r,
  isGroup: n,
  conversationName: a,
  conversationAvatarUrl: s,
  isBot: l = !1,
  disableActions: o = !1,
  onActionClick: d
}) {
  var x, w, v, y, b, C, E, U, z, _, X, H;
  const m = !!l || Number((v = (w = (x = t.relationships) == null ? void 0 : x.sender) == null ? void 0 : w.attributes) == null ? void 0 : v.user_auth_id) === 0, c = ((b = (y = t.attributes) == null ? void 0 : y.metadata) == null ? void 0 : b.action_buttons) ?? [], p = Tt(((U = (E = (C = t.relationships) == null ? void 0 : C.sender) == null ? void 0 : E.attributes) == null ? void 0 : U.name) || a), f = ((X = (_ = (z = t.relationships) == null ? void 0 : z.sender) == null ? void 0 : _.attributes) == null ? void 0 : X.avatar_url) || void 0, h = gi(t.attributes.created_at), u = ((H = t.relationships) == null ? void 0 : H.attachments) ?? [];
  return /* @__PURE__ */ i(
    "div",
    {
      className: $(
        "flex items-start gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0",
        r && "ml-auto flex-row-reverse"
      ),
      children: [
        n && !r ? /* @__PURE__ */ e(
          Ye,
          {
            name: p,
            src: f,
            isBot: m,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ) : r ? null : /* @__PURE__ */ e(
          Ye,
          {
            name: a,
            src: s,
            isBot: m,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ i("div", { className: $("flex min-w-0 flex-col gap-1", r && "items-end"), children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: $(
                  "text-xs font-semibold truncate",
                  m && !r ? "text-violet-700 dark:text-violet-300 font-bold" : "text-neutral-800 dark:text-neutral-200"
                ),
                children: r ? "Tú" : p
              }
            ),
            m && !r && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-violet-100 dark:bg-violet-950/80 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/50 shadow-2xs", children: [
              /* @__PURE__ */ e(pr, { className: "size-2.5 text-violet-600 dark:text-violet-400" }),
              /* @__PURE__ */ e("span", { children: "IA" })
            ] })
          ] }),
          /* @__PURE__ */ i(
            "div",
            {
              className: $(
                "rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words",
                r ? "rounded-tr-xs bg-blue-600 text-white shadow-xs" : m ? "rounded-tl-xs bg-gradient-to-b from-violet-50/70 to-white dark:from-neutral-800/90 dark:to-neutral-900/90 text-neutral-900 dark:text-neutral-100 border border-violet-200/70 dark:border-violet-800/50 shadow-xs ring-1 ring-violet-500/10" : "rounded-tl-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs"
              ),
              children: [
                u.map((S) => S.attributes.file_mime_type.startsWith("image/") ? /* @__PURE__ */ e(
                  "a",
                  {
                    href: S.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10",
                    children: /* @__PURE__ */ e(
                      "img",
                      {
                        src: S.attributes.file_url,
                        alt: S.attributes.file_name,
                        className: "max-h-64 max-w-full object-contain rounded-xl",
                        loading: "lazy"
                      }
                    )
                  },
                  S.id
                ) : /* @__PURE__ */ i(
                  "a",
                  {
                    href: S.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    download: S.attributes.file_name,
                    className: "mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                    children: [
                      /* @__PURE__ */ e(Fn, { className: "size-4 shrink-0" }),
                      /* @__PURE__ */ e("span", { className: "min-w-0 flex-1 truncate font-medium", children: S.attributes.file_name }),
                      /* @__PURE__ */ e(Bn, { className: "size-3.5 shrink-0" })
                    ]
                  },
                  S.id
                )),
                t.attributes.body && u.length === 0 && /* @__PURE__ */ e(
                  Kt,
                  {
                    content: t.attributes.body,
                    isOwnMessage: r,
                    isBot: m
                  }
                ),
                t.attributes.body && u.length > 0 && t.attributes.body !== "Archivo adjunto" && /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
                  Kt,
                  {
                    content: t.attributes.body,
                    isOwnMessage: r,
                    isBot: m
                  }
                ) }),
                m && !r && c.length > 0 && /* @__PURE__ */ e("div", { className: "mt-2.5 pt-2 border-t border-violet-200/60 dark:border-violet-800/40 flex flex-wrap gap-1.5", children: c.map((S) => /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    disabled: o,
                    onClick: () => {
                      o || d == null || d(S);
                    },
                    className: $(
                      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold shadow-2xs transition-all",
                      o ? "border-neutral-200 dark:border-neutral-700/50 bg-neutral-100/80 dark:bg-neutral-800/50 text-neutral-400 dark:text-neutral-500 cursor-not-allowed opacity-60" : "border-violet-200 dark:border-violet-700/60 bg-white/95 dark:bg-neutral-800/90 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:border-violet-600 dark:hover:border-violet-600 text-violet-700 dark:text-violet-300 active:scale-95 cursor-pointer"
                    ),
                    children: /* @__PURE__ */ e("span", { children: S.label })
                  },
                  S.id
                )) }),
                /* @__PURE__ */ i("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none", children: [
                  /* @__PURE__ */ e(
                    "time",
                    {
                      dateTime: t.attributes.created_at,
                      className: r ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400",
                      children: h
                    }
                  ),
                  r && t.local_status === "sending" && /* @__PURE__ */ e(
                    dt,
                    {
                      className: "size-3 text-blue-200 animate-spin",
                      "aria-label": "Pendiente de envío"
                    }
                  ),
                  r && t.local_status === "sent" && /* @__PURE__ */ e($n, { className: "size-3 text-blue-200", "aria-label": "Enviado" }),
                  r && t.local_status === "error" && /* @__PURE__ */ e("span", { className: "text-red-200 font-medium", children: "No enviado" })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function vi({
  conversation: t,
  messages: r,
  optimisticMessages: n = [],
  scrollRef: a,
  isFetchingNextPage: s = !1,
  hasNextPage: l = !1,
  isLoading: o = !1,
  isNearBottom: d = !0,
  newMessagesCount: m = 0,
  visibleDate: c = "Hoy",
  disableActions: p = !1,
  onScrollToBottom: f,
  onActionClick: h
}) {
  var _, X, H, S;
  const { currentUserId: u } = Je(), x = Pt(t), w = vt(t, u), v = gt(t, u), y = ln(t, u) || Ir(v), b = !!t.attributes.closed_at, C = new Set(
    r.flatMap((T) => T.messages.map((R) => R.id))
  ), E = n.filter(
    (T) => !C.has(T.id)
  ), U = E.length > 0 ? (_ = E[E.length - 1]) == null ? void 0 : _.id : (S = (H = (X = r[0]) == null ? void 0 : X.messages) == null ? void 0 : H[0]) == null ? void 0 : S.id, z = c.toLowerCase() === "hoy" || c.toLowerCase() === "today" || ir(c) === "Hoy";
  return /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 relative w-full overflow-hidden", children: /* @__PURE__ */ e(Mt, { ref: a, className: "relative z-10 h-full w-full", children: /* @__PURE__ */ i("div", { className: "space-y-4 p-3 sm:p-4 text-sm w-full min-w-0", children: [
    s && /* @__PURE__ */ i("div", { className: "flex items-center justify-center py-2 gap-2 text-xs text-neutral-500 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin text-blue-600" }),
      /* @__PURE__ */ e("span", { children: "Cargando mensajes anteriores..." })
    ] }),
    !l && r.length > 0 && /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400", children: "Inicio de la conversación" }) }),
    o && r.length === 0 && /* @__PURE__ */ i("div", { className: "space-y-4 py-2 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ i("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ e(le, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(le, { className: "h-3 w-20 rounded" }),
          /* @__PURE__ */ e(le, { className: "h-12 w-48 sm:w-64 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ e(le, { className: "h-14 w-52 sm:w-64 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) }),
      /* @__PURE__ */ i("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ e(le, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(le, { className: "h-3 w-16 rounded" }),
          /* @__PURE__ */ e(le, { className: "h-16 w-56 sm:w-72 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ e(le, { className: "h-10 w-36 sm:w-44 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ e("div", { className: "sticky top-1 z-20 flex justify-center pointer-events-none mb-2 transition-all duration-200", children: /* @__PURE__ */ e("div", { className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs", children: /* @__PURE__ */ e("span", { children: z ? "Hoy" : ir(c) }) }) }),
    [...r ?? []].reverse().map((T) => /* @__PURE__ */ i(
      "div",
      {
        "data-date-group": T.date,
        className: "space-y-4",
        children: [
          /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: ir(T.date) }) }),
          [...T.messages].reverse().map((R) => {
            var D, V;
            const F = String((V = (D = R == null ? void 0 : R.relationships) == null ? void 0 : D.sender) == null ? void 0 : V.id) === String(u), L = R.id === U;
            return /* @__PURE__ */ e(
              "div",
              {
                "data-message-date": T.date,
                className: "w-full",
                children: /* @__PURE__ */ e(
                  Wr,
                  {
                    message: F ? { ...R, local_status: "sent" } : R,
                    isOwnMessage: F,
                    isGroup: x,
                    conversationName: w,
                    conversationAvatarUrl: (v == null ? void 0 : v.attributes.avatar_url) || void 0,
                    isBot: y,
                    disableActions: p || b || !L,
                    onActionClick: h
                  }
                )
              },
              R.id
            );
          })
        ]
      },
      T.date
    )),
    E.length > 0 && /* @__PURE__ */ i("div", { "data-date-group": "Hoy", className: "space-y-4", children: [
      /* @__PURE__ */ e("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: "Hoy" }) }),
      [...E].map((T) => {
        var F;
        const R = T.id === U;
        return /* @__PURE__ */ e(
          "div",
          {
            "data-message-date": ((F = T.attributes.created_at) == null ? void 0 : F.slice(0, 10)) || "Hoy",
            className: "w-full",
            children: /* @__PURE__ */ e(
              Wr,
              {
                message: T,
                isOwnMessage: !0,
                isGroup: x,
                conversationName: w,
                conversationAvatarUrl: (v == null ? void 0 : v.attributes.avatar_url) || void 0,
                isBot: y,
                disableActions: p || b || !R,
                onActionClick: h
              }
            )
          },
          T.id
        );
      })
    ] }),
    !d && f && /* @__PURE__ */ e("div", { className: "sticky bottom-2 z-30 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200", children: /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: f,
        className: "pointer-events-auto relative flex size-9 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95 cursor-pointer",
        "aria-label": "Desplazar a mensajes recientes",
        title: "Desplazar a mensajes recientes",
        children: [
          /* @__PURE__ */ e(or, { className: "size-4" }),
          m > 0 && /* @__PURE__ */ e(
            "span",
            {
              className: "absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-4 text-white",
              "aria-label": `${m} mensajes nuevos`,
              children: m > 99 ? "99+" : m
            }
          )
        ]
      }
    ) })
  ] }) }) });
}
function wi({
  inputText: t,
  setInputText: r,
  onSendMessage: n,
  onSelectFile: a,
  pendingFile: s,
  onRemoveFile: l,
  isSending: o,
  isUploading: d,
  conversationName: m,
  isClosed: c = !1,
  readOnly: p = !1,
  readOnlyMessage: f
}) {
  const h = O(null), [u, x] = k(!1), [w, v] = k(!1), [y, b] = k(!1), [C, E] = k("https://"), [U, z] = k(""), _ = Pe(
    () => s && s.type.startsWith("image/") ? URL.createObjectURL(s) : void 0,
    [s]
  );
  Z(() => () => {
    _ && URL.revokeObjectURL(_);
  }, [_]);
  const X = Q(() => {
    const g = h.current;
    if (!g) return;
    g.style.height = "auto";
    const N = Math.min(Math.max(g.scrollHeight, 28), 120);
    g.style.height = `${N}px`;
  }, []);
  Z(() => {
    X();
  }, [t, X]), Z(() => {
    t.trim() || v(!1);
  }, [t]);
  const H = O(!1);
  if (Z(() => {
    var g;
    H.current && !o && !d && ((g = h.current) == null || g.focus()), H.current = o || d;
  }, [o, d]), c || p)
    return /* @__PURE__ */ e("div", { className: "shrink-0 px-3 pb-3 pt-1 text-center sm:px-4 sm:pb-4", children: /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-white/85 dark:border-neutral-800/80 dark:bg-neutral-900/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 shadow-xs dark:text-neutral-400", children: [
      /* @__PURE__ */ e(mt, { className: "size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" }),
      /* @__PURE__ */ e("span", { children: f || (c ? "Esta conversación ha sido finalizada y no admite nuevos mensajes." : "No se permite enviar mensajes en esta conversación.") })
    ] }) });
  const S = (g, N, J = "texto") => {
    const M = h.current;
    if (!M) return;
    const W = M.selectionStart ?? 0, j = M.selectionEnd ?? 0, ne = t;
    if (W !== j) {
      const xe = ne.substring(W, j), Y = `${g}${xe}${N}`, oe = ne.substring(0, W) + Y + ne.substring(j);
      r(oe), requestAnimationFrame(() => {
        M.focus(), M.setSelectionRange(W + g.length, j + g.length);
      });
    } else {
      const xe = `${g}${J}${N}`, Y = ne.substring(0, W) + xe + ne.substring(j);
      r(Y), requestAnimationFrame(() => {
        M.focus(), M.setSelectionRange(W + g.length, W + g.length + J.length);
      });
    }
  }, T = (g, N = !1) => {
    const J = h.current;
    if (!J) return;
    const M = J.selectionStart ?? 0, W = J.selectionEnd ?? 0, j = t, ne = j.lastIndexOf(`
`, M - 1) + 1, xe = j.indexOf(`
`, W), Y = xe === -1 ? j.length : xe, de = j.substring(ne, Y).split(`
`).map((Ae, Te) => {
      const Ce = N ? `${Te + 1}. ` : g;
      return Ae.startsWith(Ce) ? Ae.slice(Ce.length) : `${Ce}${Ae}`;
    }).join(`
`), Ee = j.substring(0, ne) + de + j.substring(Y);
    r(Ee), requestAnimationFrame(() => {
      J.focus(), J.setSelectionRange(ne, ne + de.length);
    });
  }, R = () => {
    const g = h.current;
    if (!g) return;
    const N = g.selectionStart ?? 0, J = g.selectionEnd ?? 0, M = t, W = M.substring(N, J);
    if (W.includes(`
`)) {
      const j = `\`\`\`
${W}
\`\`\``, ne = M.substring(0, N) + j + M.substring(J);
      r(ne), requestAnimationFrame(() => {
        g.focus(), g.setSelectionRange(N + 4, N + 4 + W.length);
      });
    } else
      S("`", "`", "código");
  }, F = () => {
    const g = h.current;
    if (g) {
      const N = g.selectionStart ?? 0, J = g.selectionEnd ?? 0, M = t.substring(N, J).trim();
      M && z(M);
    }
    E("https://"), x(!0), b((N) => !N);
  }, L = () => {
    const g = h.current, N = hn(C);
    if (!N) return;
    const M = `[${(U || N).trim()}](${N})`;
    if (g) {
      const W = g.selectionStart ?? 0, j = g.selectionEnd ?? 0, ne = t, xe = ne.substring(0, W) + M + ne.substring(j);
      r(xe), requestAnimationFrame(() => {
        g.focus();
        const Y = W + M.length;
        g.setSelectionRange(Y, Y);
      });
    } else
      r(t ? `${t} ${M}` : M);
    b(!1), E("https://"), z("");
  }, D = (g) => {
    const N = g.ctrlKey || g.metaKey;
    if (N && g.key.toLowerCase() === "b") {
      g.preventDefault(), S("**", "**", "negrita");
      return;
    }
    if (N && g.key.toLowerCase() === "i") {
      g.preventDefault(), S("*", "*", "cursiva");
      return;
    }
    if (N && g.key.toLowerCase() === "u") {
      g.preventDefault(), S("<u>", "</u>", "subrayado");
      return;
    }
    if (N && g.key.toLowerCase() === "k") {
      g.preventDefault(), F();
      return;
    }
    if (N && g.key.toLowerCase() === "e") {
      g.preventDefault(), R();
      return;
    }
    if (N && g.shiftKey && g.key.toLowerCase() === "x") {
      g.preventDefault(), S("~~", "~~", "tachado");
      return;
    }
    g.key === "Enter" && !g.shiftKey && (g.preventDefault(), (t.trim() || s) && (b(!1), v(!1), n(), requestAnimationFrame(() => {
      var J;
      (J = h.current) == null || J.focus();
    })));
  }, V = (g) => {
    var J;
    const N = (J = g.target.files) == null ? void 0 : J[0];
    N && a(N), g.target.value = "";
  }, ae = (g) => {
    var J;
    if (o || d) return;
    const N = (J = g.clipboardData) == null ? void 0 : J.items;
    if (N)
      for (let M = 0; M < N.length; M++) {
        const W = N[M];
        if (W.kind === "file" && W.type.startsWith("image/")) {
          const j = W.getAsFile();
          if (j) {
            g.preventDefault(), a(j);
            return;
          }
        }
      }
  }, se = !t.trim(), me = (g = !1) => $(
    "flex size-6.5 items-center justify-center rounded-lg transition-all cursor-pointer",
    g ? "bg-blue-100 text-blue-700 ring-1 ring-blue-500/30 shadow-2xs dark:bg-blue-950/90 dark:text-blue-300 dark:ring-blue-400/40" : "hover:bg-neutral-100 dark:hover:bg-neutral-700/70 hover:text-neutral-900 dark:hover:text-white"
  );
  return /* @__PURE__ */ e("div", { className: "shrink-0 px-3 pb-3 pt-1 sm:px-4 sm:pb-4", children: /* @__PURE__ */ i("div", { className: "relative", children: [
    s && /* @__PURE__ */ i("div", { className: "mb-2 flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xs dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      s.type.startsWith("image/") ? /* @__PURE__ */ e(
        "img",
        {
          src: _ || "",
          alt: "Archivo seleccionado",
          className: "size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
        }
      ) : /* @__PURE__ */ e("div", { className: "flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ e(Pr, { className: "size-5" }) }),
      /* @__PURE__ */ e("span", { className: "min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-300 font-medium", children: s.name || "Archivo listo para enviar" }),
      /* @__PURE__ */ e(
        fe,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: l,
          className: "size-7 shrink-0 p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          "aria-label": "Quitar archivo",
          children: /* @__PURE__ */ e(Xe, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "flex flex-col rounded-2xl border border-neutral-200/80 bg-white/95 backdrop-blur-md shadow-sm transition-all focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:shadow-md dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      u && /* @__PURE__ */ i("div", { className: "flex flex-col border-b border-neutral-200/70 dark:border-neutral-700/70", children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-between gap-1 px-2.5 py-1 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-0.5 overflow-x-auto scrollbar-none", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: () => S("**", "**", "negrita"),
              disabled: o || d,
              title: "Negrita (Ctrl+B)",
              "aria-label": "Negrita",
              className: me(),
              children: /* @__PURE__ */ e(Un, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: () => S("*", "*", "cursiva"),
              disabled: o || d,
              title: "Cursiva (Ctrl+I)",
              "aria-label": "Cursiva",
              className: me(),
              children: /* @__PURE__ */ e(Hn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: () => S("<u>", "</u>", "subrayado"),
              disabled: o || d,
              title: "Subrayado (Ctrl+U)",
              "aria-label": "Subrayado",
              className: me(),
              children: /* @__PURE__ */ e(Wn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: () => S("~~", "~~", "tachado"),
              disabled: o || d,
              title: "Tachado (Ctrl+Shift+X)",
              "aria-label": "Tachado",
              className: me(),
              children: /* @__PURE__ */ e(qn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: () => T("- "),
              disabled: o || d,
              title: "Lista de viñetas",
              "aria-label": "Lista de viñetas",
              className: me(),
              children: /* @__PURE__ */ e(Vn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: () => T("", !0),
              disabled: o || d,
              title: "Lista numerada",
              "aria-label": "Lista numerada",
              className: me(),
              children: /* @__PURE__ */ e(On, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: R,
              disabled: o || d,
              title: "Insertar código (Ctrl+E)",
              "aria-label": "Código",
              className: me(),
              children: /* @__PURE__ */ e(Gn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: F,
              disabled: o || d,
              "aria-pressed": y,
              title: "Insertar enlace Markdown (Ctrl+K)",
              "aria-label": "Insertar enlace",
              className: me(y),
              children: /* @__PURE__ */ e(Kn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: () => v((g) => !g),
              disabled: se || o || d,
              "aria-pressed": w,
              title: w ? "Ocultar vista previa" : "Vista previa de Markdown",
              "aria-label": "Vista previa",
              className: me(w),
              children: w ? /* @__PURE__ */ e(Xn, { className: "size-3.5" }) : /* @__PURE__ */ e(Yn, { className: "size-3.5" })
            }
          )
        ] }) }),
        y && /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-1.5 border-t border-neutral-200/60 dark:border-neutral-700/60 bg-neutral-50/80 dark:bg-neutral-900/50 px-2.5 py-1.5", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: U,
              onChange: (g) => z(g.target.value),
              placeholder: "Texto del enlace",
              className: "h-6.5 w-28 sm:w-36 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 text-xs text-neutral-800 dark:text-neutral-100 outline-none focus:border-blue-500"
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "url",
              value: C,
              onChange: (g) => E(g.target.value),
              onKeyDown: (g) => {
                g.key === "Enter" && (g.preventDefault(), L());
              },
              placeholder: "https://...",
              className: "h-6.5 min-w-0 flex-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 text-xs text-neutral-800 dark:text-neutral-100 outline-none focus:border-blue-500"
            }
          ),
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: L,
              className: "inline-flex h-6.5 items-center gap-1 rounded-lg bg-blue-600 px-2 text-[11px] font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer",
              children: [
                /* @__PURE__ */ e(gr, { className: "size-3" }),
                /* @__PURE__ */ e("span", { children: "Insertar" })
              ]
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (g) => g.preventDefault(),
              onClick: () => b(!1),
              className: "inline-flex size-6.5 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              "aria-label": "Cancelar enlace",
              children: /* @__PURE__ */ e(Xe, { className: "size-3.5" })
            }
          )
        ] })
      ] }),
      w && !se && /* @__PURE__ */ i("div", { className: "border-b border-neutral-200/70 dark:border-neutral-700/70 bg-neutral-50/70 dark:bg-neutral-900/40 px-3 py-2", children: [
        /* @__PURE__ */ i("div", { className: "mb-1 flex items-center justify-between text-[10px] font-medium text-neutral-400 uppercase tracking-wider", children: [
          /* @__PURE__ */ e("span", { children: "Vista previa Markdown" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => v(!1),
              className: "hover:text-neutral-600 dark:hover:text-neutral-200",
              children: "Cerrar"
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "max-h-28 overflow-y-auto text-xs", children: /* @__PURE__ */ e(Kt, { content: t }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-1 px-2.5 py-1.5", children: [
        /* @__PURE__ */ i(
          "label",
          {
            className: "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200",
            title: "Adjuntar archivo",
            children: [
              /* @__PURE__ */ e(Pr, { className: "size-4" }),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "file",
                  className: "sr-only",
                  onChange: V,
                  disabled: o || d
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onMouseDown: (g) => g.preventDefault(),
            onClick: () => x((g) => !g),
            disabled: o || d,
            title: "Formato de texto enriquecido (Markdown)",
            "aria-label": "Formato de texto enriquecido",
            className: $(
              "relative flex size-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer",
              u ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            ),
            children: /* @__PURE__ */ e(Jn, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ e("div", { className: "relative min-w-0 flex-1", children: /* @__PURE__ */ e(
          "textarea",
          {
            ref: h,
            value: t,
            onChange: (g) => r(g.target.value),
            onKeyDown: D,
            onPaste: ae,
            placeholder: `Responder a ${m}...`,
            disabled: d,
            rows: 1,
            "aria-label": `Responder a ${m}`,
            className: "max-h-30 min-h-7 w-full resize-none overflow-y-auto rounded-xl bg-transparent px-2 py-1 text-xs leading-5 text-neutral-800 outline-none placeholder:text-neutral-400 sm:text-sm dark:text-neutral-100 break-words"
          }
        ) }),
        /* @__PURE__ */ e(
          fe,
          {
            size: "icon",
            variant: "primary",
            onMouseDown: (g) => g.preventDefault(),
            onClick: () => {
              b(!1), v(!1), n(), requestAnimationFrame(() => {
                var g;
                (g = h.current) == null || g.focus();
              });
            },
            disabled: se && !s || o || d,
            className: "size-8 shrink-0 rounded-full p-0 cursor-pointer",
            "aria-label": "Enviar mensaje",
            title: "Enviar mensaje",
            children: /* @__PURE__ */ e(Qt, { className: "size-4" })
          }
        )
      ] })
    ] })
  ] }) });
}
function yi({ className: t }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "aria-hidden": "true",
      className: $(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        t
      ),
      children: /* @__PURE__ */ i(
        "svg",
        {
          className: "absolute inset-0 h-full w-full opacity-[0.055] dark:opacity-[0.04] text-slate-800 dark:text-slate-100",
          xmlns: "http://www.w3.org/2000/svg",
          width: "100%",
          height: "100%",
          children: [
            /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ e(
              "pattern",
              {
                id: "sdi-enterprise-chat-pattern",
                width: "360",
                height: "360",
                patternUnits: "userSpaceOnUse",
                children: /* @__PURE__ */ i(
                  "g",
                  {
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      /* @__PURE__ */ i("g", { transform: "translate(24, 24)", children: [
                        /* @__PURE__ */ e("rect", { x: "0", y: "0", width: "44", height: "20", rx: "5", strokeWidth: "1.2" }),
                        /* @__PURE__ */ e(
                          "text",
                          {
                            x: "22",
                            y: "14",
                            textAnchor: "middle",
                            fill: "currentColor",
                            stroke: "none",
                            fontSize: "10.5",
                            fontWeight: "800",
                            letterSpacing: "1.2",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            children: "SDI"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ e("g", { transform: "translate(120, 26)", children: /* @__PURE__ */ e("path", { d: "M0 0l22 11-22 11 5-10 11-1-11-1z" }) }),
                      /* @__PURE__ */ i("g", { transform: "translate(210, 24)", children: [
                        /* @__PURE__ */ e("path", { d: "M10 0s-7 2-10 3v8c0 6 7 11 10 13 3-2 10-7 10-13V3c-3-1-10-3-10-3z" }),
                        /* @__PURE__ */ e("path", { d: "M6 11l3 3 6-6", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(294, 28)", children: [
                        /* @__PURE__ */ e("rect", { x: "0", y: "0", width: "28", height: "19", rx: "4" }),
                        /* @__PURE__ */ e("path", { d: "M6 9l3 3-3 3M14 15h6" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(30, 96)", children: [
                        /* @__PURE__ */ e("path", { d: "M0 0h24a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-12l-6 5v-5h-2a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" }),
                        /* @__PURE__ */ e("path", { d: "M6 6h12M6 10h8" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(126, 96)", children: [
                        /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "10" }),
                        /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "4.5" }),
                        /* @__PURE__ */ e("path", { d: "M4 4l3.5 3.5M14.5 14.5l3.5 3.5M18 4l-3.5 3.5M7.5 14.5L4 18" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(214, 96)", children: [
                        /* @__PURE__ */ e("circle", { cx: "12", cy: "12", r: "12", strokeWidth: "1.2", strokeDasharray: "2 2" }),
                        /* @__PURE__ */ e(
                          "text",
                          {
                            x: "12",
                            y: "15.5",
                            textAnchor: "middle",
                            fill: "currentColor",
                            stroke: "none",
                            fontSize: "8.5",
                            fontWeight: "800",
                            letterSpacing: "0.8",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            children: "SDI"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(298, 98)", children: [
                        /* @__PURE__ */ e("ellipse", { cx: "10", cy: "4", rx: "9", ry: "3" }),
                        /* @__PURE__ */ e("path", { d: "M1 4v5c0 1.66 4.03 3 9 3s9-1.34 9-3V4" }),
                        /* @__PURE__ */ e("path", { d: "M1 9v5c0 1.66 4.03 3 9 3s9-1.34 9-3V9" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(32, 172)", children: [
                        /* @__PURE__ */ e("path", { d: "M0 6l4 4 9-9" }),
                        /* @__PURE__ */ e("path", { d: "M7 6l4 4 9-9" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(124, 168)", children: [
                        /* @__PURE__ */ e("rect", { x: "0", y: "7", width: "18", height: "13", rx: "3" }),
                        /* @__PURE__ */ e("path", { d: "M4 7V4a5 5 0 0 1 10 0v3" }),
                        /* @__PURE__ */ e("circle", { cx: "9", cy: "13.5", r: "1.5", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ e("g", { transform: "translate(210, 174)", children: /* @__PURE__ */ e("path", { d: "M0 6h6l3-6 5 12 4-8 3 4h7" }) }),
                      /* @__PURE__ */ i("g", { transform: "translate(298, 168)", children: [
                        /* @__PURE__ */ e("path", { d: "M0 0h13l6 6v13a3 3 0 0 1-3 3H0a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ e("path", { d: "M13 0v6h6" }),
                        /* @__PURE__ */ e("path", { d: "M4 12l2.5 2.5 5-5", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(28, 244)", children: [
                        /* @__PURE__ */ e("circle", { cx: "4", cy: "4", r: "3" }),
                        /* @__PURE__ */ e("circle", { cx: "20", cy: "4", r: "3" }),
                        /* @__PURE__ */ e("circle", { cx: "12", cy: "18", r: "3" }),
                        /* @__PURE__ */ e("path", { d: "M6.5 5.5l3.5 10M17.5 5.5l-3.5 10M7 4h10" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(114, 246)", children: [
                        /* @__PURE__ */ e("rect", { x: "0", y: "0", width: "38", height: "18", rx: "4", strokeWidth: "1" }),
                        /* @__PURE__ */ e(
                          "text",
                          {
                            x: "19",
                            y: "12.5",
                            textAnchor: "middle",
                            fill: "currentColor",
                            stroke: "none",
                            fontSize: "9",
                            fontWeight: "800",
                            letterSpacing: "1",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            children: "SDI"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ e("g", { transform: "translate(218, 244)", children: /* @__PURE__ */ e("path", { d: "M7 0L0 11h7l-2 9 10-12h-7l2-8z" }) }),
                      /* @__PURE__ */ i("g", { transform: "translate(300, 246)", children: [
                        /* @__PURE__ */ e("circle", { cx: "10", cy: "10", r: "9" }),
                        /* @__PURE__ */ e("path", { d: "M10 5v5l3.5 2" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(30, 316)", children: [
                        /* @__PURE__ */ e("path", { d: "M0 0h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6l-5 4v-4h-2a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ e("circle", { cx: "5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "9.5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "14", cy: "7", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(128, 320)", children: [
                        /* @__PURE__ */ e("circle", { cx: "2", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "10", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "18", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "2", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "10", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "18", cy: "10", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ e("g", { transform: "translate(216, 318)", children: /* @__PURE__ */ e("path", { d: "M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5z" }) }),
                      /* @__PURE__ */ i("g", { transform: "translate(292, 318)", children: [
                        /* @__PURE__ */ e("rect", { x: "0", y: "0", width: "36", height: "16", rx: "3", strokeWidth: "1" }),
                        /* @__PURE__ */ e(
                          "text",
                          {
                            x: "18",
                            y: "11.5",
                            textAnchor: "middle",
                            fill: "currentColor",
                            stroke: "none",
                            fontSize: "8.5",
                            fontWeight: "800",
                            letterSpacing: "1",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            children: "SDI"
                          }
                        )
                      ] })
                    ]
                  }
                )
              }
            ) }),
            /* @__PURE__ */ e("rect", { width: "100%", height: "100%", fill: "url(#sdi-enterprise-chat-pattern)" })
          ]
        }
      )
    }
  );
}
function Ni({
  open: t,
  onOpenChange: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null,
  queueData: l = null,
  onActionSelect: o,
  isPollingQueue: d = !1,
  onConvertToTicket: m,
  isConvertingToTicket: c = !1
}) {
  const [p, f] = k(""), [h, u] = k(null), x = (y) => {
    !y && (a || c) || (y || (f(""), u(null)), r(y));
  }, w = async (y) => {
    y.preventDefault(), u(null);
    const b = p.trim();
    if (!b) {
      u("Por favor describe el motivo de tu solicitud.");
      return;
    }
    if (b.length < 5) {
      u("Por favor ingresa al menos 5 caracteres para mayor claridad.");
      return;
    }
    await n(b);
  }, v = (l == null ? void 0 : l.action_buttons) ?? [];
  return /* @__PURE__ */ e(er, { open: t, onOpenChange: x, children: /* @__PURE__ */ e(tr, { className: "sm:max-w-md p-0 overflow-hidden", children: l ? /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ e(Wt, { className: "p-4.5 pb-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(dt, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(qt, { className: "text-sm font-bold text-white", children: "En fila de espera" }),
        /* @__PURE__ */ e(Vt, { className: "text-[11px] text-amber-100 mt-0.5", children: "Todos nuestros técnicos se encuentran ocupados en este momento" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-3.5 bg-white dark:bg-neutral-900", children: [
      (l.queue_position != null || l.estimated_wait_minutes != null) && /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-2", children: [
        l.queue_position != null && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 px-3 py-2", children: [
          /* @__PURE__ */ e(Yt, { className: "size-4 text-amber-600 dark:text-amber-400 shrink-0" }),
          /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ e("p", { className: "text-[10px] text-neutral-500 dark:text-neutral-400 leading-none", children: "Posición en fila" }),
            /* @__PURE__ */ i("p", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5", children: [
              "#",
              l.queue_position
            ] })
          ] })
        ] }),
        l.estimated_wait_minutes != null && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 px-3 py-2", children: [
          /* @__PURE__ */ e(dt, { className: "size-4 text-amber-600 dark:text-amber-400 shrink-0" }),
          /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ e("p", { className: "text-[10px] text-neutral-500 dark:text-neutral-400 leading-none", children: "Tiempo estimado" }),
            /* @__PURE__ */ i("p", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5", children: [
              "~",
              l.estimated_wait_minutes,
              " min"
            ] })
          ] })
        ] })
      ] }),
      l.message && /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/50 p-3 text-xs leading-relaxed text-neutral-700 dark:text-neutral-200", children: /* @__PURE__ */ e(Kt, { content: l.message }) }),
      d && /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-[11px] font-medium text-amber-700 dark:text-amber-300", children: [
        /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin text-amber-600 dark:text-amber-400 shrink-0" }),
        /* @__PURE__ */ e("span", { children: "Esperando en vivo... verificando disponibilidad cada 5s" })
      ] }),
      v.length > 0 ? /* @__PURE__ */ i("div", { className: "space-y-2 pt-1", children: [
        /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold text-neutral-600 dark:text-neutral-400", children: "Selecciona una opción para continuar:" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: v.map((y) => {
          var C;
          const b = y.action === "convert_ticket" || y.id === "convert_ticket" || ((C = y.label) == null ? void 0 : C.toLowerCase().includes("crear ticket"));
          return /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              disabled: c,
              onClick: () => {
                if (b && m) {
                  m();
                  return;
                }
                f(""), u(null), o == null || o(y);
              },
              className: "flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 dark:border-violet-800/70 bg-violet-50/60 dark:bg-violet-950/40 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:border-violet-600 px-3.5 py-2.5 text-xs font-semibold text-violet-700 dark:text-violet-300 shadow-2xs transition-all active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
              children: b && c ? /* @__PURE__ */ i(Me, { children: [
                /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
                /* @__PURE__ */ e("span", { children: "Creando ticket y cerrando..." })
              ] }) : /* @__PURE__ */ e("span", { children: y.label })
            },
            y.id
          );
        }) })
      ] }) : m ? /* @__PURE__ */ e("div", { className: "pt-1", children: /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          disabled: c,
          onClick: () => {
            m();
          },
          className: "flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 px-3.5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-2xs transition-all active:scale-98 cursor-pointer disabled:opacity-50",
          children: c ? /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Creando ticket..." })
          ] }) : /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e("span", { children: "📝 Dejar como ticket y cerrar chat" }),
            /* @__PURE__ */ e(Qn, { className: "size-3.5" })
          ] })
        }
      ) }) : null
    ] }),
    /* @__PURE__ */ i(Ot, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between", children: [
      /* @__PURE__ */ e("span", { className: "text-[10px] text-neutral-400", children: d ? "Sondeo activo" : "Cola de atención" }),
      /* @__PURE__ */ e(
        fe,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          disabled: c,
          onClick: () => x(!1),
          className: "text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer",
          children: "Cerrar"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ i("form", { onSubmit: w, className: "flex flex-col", children: [
    /* @__PURE__ */ e(Wt, { className: "p-4.5 pb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(Zn, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(qt, { className: "text-sm font-bold text-white", children: "Hablar con un técnico" }),
        /* @__PURE__ */ e(Vt, { className: "text-[11px] text-blue-100 mt-0.5", children: "Indica el motivo por el cual requieres asistencia especializada" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-3 bg-white dark:bg-neutral-900", children: [
      (h || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/40 p-2.5 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(vr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ e("span", { className: "leading-snug", children: h || s })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200", children: [
          "Motivo de la solicitud ",
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 focus-within:bg-white dark:bg-neutral-900 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ e(
            Zt,
            {
              value: p,
              onChange: (y) => {
                f(y.target.value), h && u(null);
              },
              placeholder: "Ej: Necesito ayuda especializada con la configuración del terminal o reporte de error que el bot no resolvió...",
              rows: 4,
              maxLength: 500,
              disabled: a,
              className: "min-h-24 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none"
            }
          ),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400", children: [
            /* @__PURE__ */ e("span", { children: "Sé lo más específico posible" }),
            /* @__PURE__ */ i("span", { className: "font-mono", children: [
              p.length,
              "/500"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i(Ot, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ e(
        fe,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => x(!1),
          disabled: a,
          className: "text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        fe,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || !p.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50",
          children: a ? /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Escalando..." })
          ] }) : /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e("span", { children: "Solicitar técnico" }),
            /* @__PURE__ */ e(Qt, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const ki = {
  1: "Muy insatisfecho",
  2: "Insatisfecho",
  3: "Neutral",
  4: "Satisfecho",
  5: "¡Excelente atención!"
};
function Ci({
  open: t,
  onOpenChange: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null
}) {
  const [l, o] = k(5), [d, m] = k(0), [c, p] = k(""), [f, h] = k(null), u = (v) => {
    !v && !a && (o(5), m(0), p(""), h(null)), r(v);
  }, x = async (v) => {
    if (v.preventDefault(), h(null), l < 1 || l > 5) {
      h("Por favor selecciona una calificación de 1 a 5 estrellas.");
      return;
    }
    await n({
      rating: l,
      comment: c.trim(),
      helpful: !0
    });
  }, w = d || l;
  return /* @__PURE__ */ e(er, { open: t, onOpenChange: u, children: /* @__PURE__ */ e(tr, { className: "sm:max-w-md p-0 overflow-hidden", children: /* @__PURE__ */ i("form", { onSubmit: x, className: "flex flex-col", children: [
    /* @__PURE__ */ e(Wt, { className: "p-4.5 pb-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(ut, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(qt, { className: "text-sm font-bold text-white", children: "¡Nos alegra haberte ayudado!" }),
        /* @__PURE__ */ e(Vt, { className: "text-[11px] text-emerald-100 mt-0.5", children: "Califica la solución entregada por el asistente para finalizar el caso" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-4 bg-white dark:bg-neutral-900", children: [
      (f || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/40 p-2.5 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(vr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ e("span", { className: "leading-snug", children: f || s })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center justify-center rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 p-3.5 space-y-2", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-neutral-700 dark:text-neutral-200", children: "¿Qué tan útil fue la solución?" }),
        /* @__PURE__ */ e(
          "div",
          {
            className: "flex items-center gap-1.5",
            onMouseLeave: () => m(0),
            children: [1, 2, 3, 4, 5].map((v) => {
              const y = v <= w;
              return /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  disabled: a,
                  onMouseEnter: () => m(v),
                  onClick: () => {
                    o(v), f && h(null);
                  },
                  "aria-label": `Calificar con ${v} ${v === 1 ? "estrella" : "estrellas"}`,
                  className: "p-1 rounded-lg transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ e(
                    ea,
                    {
                      className: $(
                        "size-7 transition-colors",
                        y ? "fill-amber-400 text-amber-400 drop-shadow-2xs" : "fill-transparent text-neutral-300 dark:text-neutral-600"
                      )
                    }
                  )
                },
                v
              );
            })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-amber-600 dark:text-amber-400 min-h-4", children: ki[w] || "" })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200", children: [
          "Comentarios adicionales ",
          /* @__PURE__ */ e("span", { className: "text-neutral-400 font-normal", children: "(opcional)" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 focus-within:bg-white dark:bg-neutral-900 dark:focus-within:bg-neutral-900 focus-within:border-emerald-500 transition-colors", children: [
          /* @__PURE__ */ e(
            Zt,
            {
              value: c,
              onChange: (v) => p(v.target.value),
              placeholder: "Cuéntanos brevemente tu experiencia o algún comentario sobre la solución...",
              rows: 3,
              maxLength: 500,
              disabled: a,
              className: "min-h-20 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none"
            }
          ),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400", children: [
            /* @__PURE__ */ e("span", { children: "Tu opinión nos ayuda a mejorar" }),
            /* @__PURE__ */ i("span", { className: "font-mono", children: [
              c.length,
              "/500"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i(Ot, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ e(
        fe,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => u(!1),
          disabled: a,
          className: "text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        fe,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || l < 1,
          className: "gap-2 h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50",
          children: a ? /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Finalizando..." })
          ] }) : /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e("span", { children: "Enviar y resolver" }),
            /* @__PURE__ */ e(Qt, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
function Si({
  conversation: t,
  onToggleContextPanel: r,
  isContextPanelOpen: n = !0,
  onBack: a,
  alwaysShowBackButton: s = !1,
  onCloseSuccess: l,
  onEscalateSuccess: o,
  onResolveSuccess: d,
  showHeader: m = !0,
  showWallpaper: c = !0,
  readOnly: p = !1,
  readOnlyMessage: f,
  showComposer: h = !0,
  renderOptions: u
}) {
  var ve, K, qe, Ve, Qe, Oe;
  const [x, w] = k(!1), [v, y] = k(!1), [b, C] = k(!1), [E, U] = k(null), [z, _] = k(!1), [X, H] = k(!1), S = zr(), {
    mutateAsync: T,
    isLoading: R,
    error: F
  } = li(), {
    mutateAsync: L,
    isLoading: D,
    error: V
  } = oi(), {
    mutateAsync: ae,
    isLoading: se
  } = di(), me = () => {
    var ie, A, q;
    let B = nn(t.id);
    if (!B)
      for (let P = N.messages.length - 1; P >= 0; P--) {
        const G = N.messages[P];
        if (Array.isArray(G == null ? void 0 : G.messages)) {
          for (let re = G.messages.length - 1; re >= 0; re--) {
            const Se = (q = (A = (ie = G.messages[re]) == null ? void 0 : ie.attributes) == null ? void 0 : A.metadata) == null ? void 0 : q.session_uuid;
            if (Se) {
              B = String(Se);
              break;
            }
          }
          if (B) break;
        }
      }
    return B || "";
  }, g = Pe(() => x && z ? String((E == null ? void 0 : E.session_uuid) || me()) : null, [x, z, E == null ? void 0 : E.session_uuid]);
  ci({
    sessionId: g,
    enabled: !!g,
    intervalMs: 5e3,
    onStatusUpdate: (B) => {
      U((ie) => ({
        ...ie,
        ...B
      }));
    },
    onAssigned: (B) => {
      _(!1), w(!1), U(null), Ne.success(
        B.message || (B.technician ? `Asignado con ${B.technician.name}` : "Asignación completada")
      ), o == null || o(B);
    }
  });
  const N = ti(t, {
    onCloseSuccess: () => {
      C(!0), l == null || l(), a == null || a();
    }
  });
  Z(() => {
    C(!1);
  }, [t.id]);
  const [J, M] = k(!1), W = O(0), j = N.isClosed || b, ne = p || j || N.isSending || N.isUploading, xe = (B) => {
    if (B.preventDefault(), B.stopPropagation(), ne) return;
    B.dataTransfer.types && Array.from(B.dataTransfer.types).includes("Files") && (W.current += 1, M(!0));
  }, Y = (B) => {
    B.preventDefault(), B.stopPropagation(), !ne && (B.dataTransfer.dropEffect = "copy");
  }, oe = (B) => {
    B.preventDefault(), B.stopPropagation(), W.current -= 1, W.current <= 0 && (W.current = 0, M(!1));
  }, te = (B) => {
    if (B.preventDefault(), B.stopPropagation(), W.current = 0, M(!1), ne) return;
    const ie = B.dataTransfer.files;
    if (ie && ie.length > 0) {
      const A = ie[0];
      A.type.startsWith("image/") && N.handleSelectFile(A);
    }
  }, de = (B) => {
    var A;
    if (ne) return;
    const ie = (A = B.clipboardData) == null ? void 0 : A.items;
    if (ie)
      for (let q = 0; q < ie.length; q++) {
        const P = ie[q];
        if (P.kind === "file" && P.type.startsWith("image/")) {
          const G = P.getAsFile();
          if (G) {
            B.preventDefault(), N.handleSelectFile(G);
            return;
          }
        }
      }
  }, Ee = Pe(
    () => ({
      conversation: t,
      isClosed: j,
      isClosing: N.isClosing,
      handleCloseConversation: N.handleCloseConversation
    }),
    [t, j, N.isClosing, N.handleCloseConversation]
  );
  Z(() => (pt.set(t), () => {
    pt.set(null);
  }), [t]);
  const Ae = (B) => {
    if (B.action === "escalate" || B.id === "escalate") {
      U(null), _(!1), w(!0);
      return;
    }
    if (B.action === "poll_queue" || B.id === "poll_queue") {
      _(!0), Ne.info("Consultando disponibilidad en vivo cada 5 segundos...");
      return;
    }
    if (B.action === "convert_ticket" || B.id === "convert_ticket") {
      Ce();
      return;
    }
    const ie = (B.label || "").toLowerCase();
    if (B.action === "resolve" || B.id === "resolve" || B.action === "resolved" || B.id === "resolved" || B.action === "confirm_solution" || B.id === "confirm_solution" || ie.includes("solucionó mi problema") || ie.includes("soluciono mi problema")) {
      y(!0);
      return;
    }
    N.handleSendMessage(B.label || B.action);
  }, Te = async (B) => {
    var ie, A;
    try {
      const q = me(), P = await T({
        session_id: q,
        reason: B
      });
      P != null && P.session_uuid && Ar(t.id, String(P.session_uuid)), P != null && P.conversation_id ? (w(!1), U(null), _(!1), Ne.success(
        P.message || (P.technician ? `Asistencia iniciada con ${P.technician.name}` : "Conversación con técnico iniciada"),
        P.ticket ? {
          description: `Ticket #${P.ticket.number || P.ticket.id}`
        } : void 0
      )) : (P == null ? void 0 : P.status) === "in_queue" || P != null && P.message && !(P != null && P.ticket) ? (U(P), _(!0)) : (w(!1), U(null), _(!1), P != null && P.ticket && Ne.info(P.message || "Ticket de soporte registrado", {
        description: `Ticket #${P.ticket.number || P.ticket.id}`
      })), o == null || o(P);
    } catch (q) {
      const P = ((A = (ie = q == null ? void 0 : q.response) == null ? void 0 : ie.data) == null ? void 0 : A.message) || (q == null ? void 0 : q.message) || "Error al procesar la solicitud con el técnico";
      Ne.error(P);
    }
  }, Ce = async () => {
    var B, ie;
    try {
      const A = me(), q = await ae({
        session_id: A
      });
      Et(t.id), w(!1), U(null), _(!1), C(!0), Ne.success(
        (q == null ? void 0 : q.message) || "Se ha creado el ticket de soporte y se ha cerrado el chat.",
        q != null && q.ticket ? {
          description: `Ticket #${q.ticket.number || q.ticket.id}`
        } : void 0
      );
    } catch (A) {
      const q = ((ie = (B = A == null ? void 0 : A.response) == null ? void 0 : B.data) == null ? void 0 : ie.message) || (A == null ? void 0 : A.message) || "Error al convertir en ticket";
      Ne.error(q);
    }
  }, Le = () => {
    var B, ie;
    S ? It.start({
      sessionId: `${t.id}`,
      conversationId: t.id,
      userId: N.currentUserId || "",
      userAuthId: ((ie = (B = N.currentUser) == null ? void 0 : B.attributes) == null ? void 0 : ie.user_auth_id) || "",
      senderMessengerId: N.currentUserId || "",
      onCallEnded: (A) => {
        var q;
        A.outcome === "escalated_live" && ((q = A.data) != null && q.conversation_id) && Ne.success("Tu llamada ha sido transferida a un técnico de soporte."), N.refetchMessages();
      }
    }) : H(!0);
  }, He = async ({
    rating: B,
    comment: ie,
    helpful: A
  }) => {
    var q, P;
    try {
      const G = me(), re = await L({
        session_id: G,
        helpful: A,
        comment: ie,
        rating: B
      });
      Et(t.id), y(!1), C(!0), Ne.success(
        (re == null ? void 0 : re.message) || "¡Gracias por tu calificación! El caso ha sido marcado como resuelto.",
        re != null && re.ticket ? {
          description: `Ticket #${re.ticket.number || re.ticket.id}`
        } : void 0
      ), d == null || d(re);
    } catch (G) {
      const re = ((P = (q = G == null ? void 0 : G.response) == null ? void 0 : q.data) == null ? void 0 : P.message) || (G == null ? void 0 : G.message) || "Error al finalizar y calificar la atención";
      Ne.error(re);
    }
  };
  return /* @__PURE__ */ i(ns, { value: Ee, children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "sdi-messenger-root relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        onDragEnter: xe,
        onDragOver: Y,
        onDragLeave: oe,
        onDrop: te,
        onPaste: de,
        children: [
          m && /* @__PURE__ */ e(
            hi,
            {
              conversation: t,
              isClosed: j,
              isClosing: N.isClosing,
              onCloseConversation: N.handleCloseConversation,
              isContextPanelOpen: n,
              onToggleContextPanel: r,
              onBack: a,
              alwaysShowBackButton: s,
              renderOptions: u,
              onStartVoiceCall: Le
            }
          ),
          /* @__PURE__ */ i("div", { className: "relative flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[#f4f6f8]/70 dark:bg-[#0a0f1d]", children: [
            c && /* @__PURE__ */ e(yi, {}),
            J && /* @__PURE__ */ e("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xs border-2 border-dashed border-blue-500/70 dark:border-blue-400/70 rounded-2xl m-2 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95", children: /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-xl border border-blue-500/20 text-center max-w-xs mx-4", children: [
              /* @__PURE__ */ e("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-inner", children: /* @__PURE__ */ e(ta, { className: "size-7 animate-bounce" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("p", { className: "text-sm font-semibold text-neutral-800 dark:text-neutral-100", children: "Suelta tu imagen aquí" }),
                /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Se adjuntará para que puedas enviarla" })
              ] })
            ] }) }),
            /* @__PURE__ */ e(
              vi,
              {
                conversation: t,
                messages: N.messages,
                optimisticMessages: N.optimisticMessages,
                scrollRef: N.scrollRef,
                isFetchingNextPage: N.isFetchingNextPage,
                hasNextPage: N.hasNextPage,
                isLoading: N.isLoading,
                isNearBottom: N.isNearBottom,
                newMessagesCount: N.newMessagesCount,
                visibleDate: N.visibleDate,
                disableActions: ne || R || D,
                onScrollToBottom: N.scrollToBottom,
                onActionClick: Ae
              }
            ),
            N.typingUser && !p && /* @__PURE__ */ i("div", { className: "relative z-10 flex shrink-0 items-center gap-1.5 px-4 py-1 text-xs text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-150", children: [
              /* @__PURE__ */ i("span", { className: "font-medium", children: [
                N.typingUser,
                " está escribiendo"
              ] }),
              /* @__PURE__ */ i("span", { className: "inline-flex gap-0.5", "aria-hidden": "true", children: [
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse" }),
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-75" }),
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-150" })
              ] })
            ] }),
            h && /* @__PURE__ */ e("div", { className: "relative z-10 w-full", children: /* @__PURE__ */ e(
              wi,
              {
                inputText: N.inputText,
                setInputText: N.setInputText,
                onSendMessage: N.handleSendMessage,
                onSelectFile: N.handleSelectFile,
                pendingFile: N.pendingFile,
                onRemoveFile: () => N.setPendingFile(null),
                isSending: N.isSending,
                isUploading: N.isUploading,
                conversationName: N.conversationName,
                isClosed: j,
                readOnly: p,
                readOnlyMessage: f
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e(
      Ni,
      {
        open: x,
        onOpenChange: (B) => {
          w(B), B || (U(null), _(!1));
        },
        onSubmit: Te,
        isSubmitting: R,
        queueData: E,
        isPollingQueue: z,
        onConvertToTicket: Ce,
        isConvertingToTicket: se,
        onActionSelect: (B) => {
          w(!1), U(null), Ae(B);
        },
        error: ((K = (ve = F == null ? void 0 : F.response) == null ? void 0 : ve.data) == null ? void 0 : K.message) || (F == null ? void 0 : F.message)
      }
    ),
    /* @__PURE__ */ e(
      Ci,
      {
        open: v,
        onOpenChange: y,
        onSubmit: He,
        isSubmitting: D,
        error: ((Ve = (qe = V == null ? void 0 : V.response) == null ? void 0 : qe.data) == null ? void 0 : Ve.message) || (V == null ? void 0 : V.message)
      }
    ),
    !S && /* @__PURE__ */ e(
      tn,
      {
        open: X,
        onOpenChange: H,
        sessionId: `${t.id}`,
        conversationId: t.id,
        userId: N.currentUserId || "",
        userAuthId: ((Oe = (Qe = N.currentUser) == null ? void 0 : Qe.attributes) == null ? void 0 : Oe.user_auth_id) || "",
        senderMessengerId: N.currentUserId || "",
        onCallEnded: (B) => {
          var ie;
          B.outcome === "escalated_live" && ((ie = B.data) != null && ie.conversation_id) && Ne.success("Tu llamada ha sido transferida a un técnico de soporte."), N.refetchMessages();
        }
      }
    )
  ] });
}
function zi({
  message: t = "Tu solicitud de soporte ha sido registrada exitosamente. En este momento no hay técnicos disponibles en línea; un técnico atenderá tu requerimiento a la brevedad.",
  ticket: r,
  onNewRequest: n,
  onViewChats: a,
  onClose: s,
  canViewChatList: l = !1
}) {
  const o = (r == null ? void 0 : r.number) ?? (r == null ? void 0 : r.id) ?? "N/A";
  return /* @__PURE__ */ i("div", { className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 bg-neutral-50/70 dark:bg-neutral-900", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(Jt, { className: "size-4 text-emerald-600 dark:text-emerald-400" }),
        /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-800 dark:text-neutral-200", children: "Solicitud Registrada" })
      ] }),
      s && /* @__PURE__ */ e(
        fe,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: s,
          className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          children: /* @__PURE__ */ e(Xe, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4", children: [
      /* @__PURE__ */ i("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ e("div", { className: "size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(dt, { className: "size-7" }) }),
        /* @__PURE__ */ e("div", { className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ e(ut, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "Ticket de Soporte Creado" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed", children: t })
      ] }),
      r && /* @__PURE__ */ i("div", { className: "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200", children: [
            /* @__PURE__ */ e(mr, { className: "size-3.5 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ i("span", { children: [
              "Ticket #",
              o
            ] })
          ] }),
          /* @__PURE__ */ e(ot, { variant: "outline", className: "text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", children: r.status === "created" ? "Registrado" : r.status })
        ] }),
        r.subject && /* @__PURE__ */ i("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ e("span", { className: "text-[10.5px] font-medium text-neutral-400", children: "Asunto:" }),
          /* @__PURE__ */ e("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2", children: r.subject })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between text-[11px] text-neutral-500 pt-1", children: [
          /* @__PURE__ */ i("span", { children: [
            "Canal: ",
            /* @__PURE__ */ e("strong", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: r.request_source || "Chat" })
          ] }),
          /* @__PURE__ */ i("span", { className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-medium", children: [
            /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            "En cola de atención"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-2.5 text-[11px] text-blue-900/80 dark:text-blue-300/80 text-left w-full", children: /* @__PURE__ */ e("p", { children: "Te notificaremos en cuanto un técnico tome tu ticket. Puedes consultar el estado en cualquier momento." }) })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900 flex items-center gap-2", children: [
      /* @__PURE__ */ i(
        fe,
        {
          type: "button",
          variant: "secondary",
          size: "sm",
          onClick: n,
          className: "flex-1 gap-1.5 text-xs font-medium cursor-pointer",
          children: [
            /* @__PURE__ */ e(ra, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Nueva Consulta" })
          ]
        }
      ),
      l && a && /* @__PURE__ */ i(
        fe,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: a,
          className: "flex-1 gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
          children: [
            /* @__PURE__ */ e(wr, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Ver mis chats" })
          ]
        }
      )
    ] })
  ] });
}
function fn(t, r = 300) {
  const [n, a] = k(t);
  return Z(() => {
    const s = setTimeout(() => {
      a(t);
    }, r);
    return () => {
      clearTimeout(s);
    };
  }, [t, r]), n;
}
function Dr(t) {
  var R;
  const {
    queryKey: r,
    queryFn: n,
    enabled: a = !0,
    initialData: s,
    placeholderData: l,
    keepPreviousData: o = !1,
    onSuccess: d,
    onError: m
  } = t, [c, p] = k(() => s !== void 0 ? s : typeof l == "function" ? l(void 0) : l), [f, h] = k(null), [u, x] = k(() => a && c === void 0), [w, v] = k(() => c !== void 0), [y, b] = k(!1), C = O(n);
  C.current = n;
  const E = O(d);
  E.current = d;
  const U = O(m);
  U.current = m;
  const z = O(0), _ = O(!0), X = JSON.stringify(r), H = Q(async () => {
    var L, D;
    const F = ++z.current;
    x(!0), b(!1), h(null);
    try {
      const V = await C.current();
      return F === z.current && (p(V), v(!0), b(!1), h(null), x(!1), (L = E.current) == null || L.call(E, V)), V;
    } catch (V) {
      if (F === z.current) {
        const ae = V;
        h(ae), b(!0), v(!1), x(!1), (D = U.current) == null || D.call(U, ae);
      }
      return;
    }
  }, []);
  Z(() => {
    if (!a) {
      x(!1);
      return;
    }
    _.current || (l !== void 0 ? p(
      typeof l == "function" ? (F) => l(F) : l
    ) : o || p(void 0)), _.current = !1, H();
  }, [a, X, o]);
  const S = ((R = f == null ? void 0 : f.response) == null ? void 0 : R.data) ?? (f == null ? void 0 : f.data) ?? {}, T = a && u && c === void 0;
  return {
    data: c,
    error: f,
    errors: S,
    isLoading: T,
    isPending: T,
    isFetching: u,
    isSuccess: w,
    isError: y,
    refetch: H,
    setData: p
  };
}
const _i = (t) => {
  var a, s, l, o, d;
  const r = (t == null ? void 0 : t.params) ?? {}, n = Dr({
    queryKey: ["list-chat-users", r],
    queryFn: () => xa(r),
    enabled: (t == null ? void 0 : t.enable) !== !1,
    keepPreviousData: !0
  });
  return {
    data: ((a = n.data) == null ? void 0 : a.data.data) ?? [],
    meta: (l = (s = n.data) == null ? void 0 : s.data) == null ? void 0 : l.meta,
    links: (d = (o = n.data) == null ? void 0 : o.data) == null ? void 0 : d.links,
    isLoading: n.isLoading,
    isFetching: n.isFetching,
    errors: n.errors,
    refetch: n.refetch
  };
}, pn = () => {
  const t = Q(async (r) => {
    var s;
    const n = await Za(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    return typeof window < "u" && a && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversation: a }
      })
    ), a;
  }, []);
  return nt(
    t
  );
};
function Ai({
  open: t,
  onOpenChange: r,
  onSuccess: n
}) {
  const { currentUserId: a } = Je(), [s, l] = k("direct"), [o, d] = k(""), m = fn(o, 300), [c, p] = k(null), [f, h] = k([]), [u, x] = k(""), { data: w, isLoading: v } = _i({
    enable: t,
    params: {
      sort: "name",
      paginate: "false",
      ...m.trim() ? { filter: { name: m.trim() } } : {}
    }
  }), { mutateAsync: y, isLoading: b } = pn(), C = Pe(() => (w || []).filter((S) => String(S.id) !== String(a)), [w, a]), E = (S) => {
    h((T) => T.some((F) => F.id === S.id) ? T.filter((F) => F.id !== S.id) : [...T, S]);
  }, U = (S) => {
    h((T) => T.filter((R) => R.id !== S));
  }, z = () => {
    p(null), h([]), x(""), d(""), l("direct");
  }, _ = (S) => {
    S || z(), r(S);
  }, X = async (S) => {
    var T, R, F, L;
    if (S.preventDefault(), s === "direct") {
      if (!c) {
        Ne.warning("Por favor, selecciona un usuario para iniciar la conversación.");
        return;
      }
      try {
        const D = await y({
          type: "direct",
          user_id: Number(c),
          sender_id: Number(a)
        });
        Ne.success("Conversación iniciada correctamente"), _(!1), n && D && n(D);
      } catch (D) {
        const V = ((R = (T = D == null ? void 0 : D.response) == null ? void 0 : T.data) == null ? void 0 : R.message) || (D == null ? void 0 : D.message) || "Error al iniciar la conversación";
        Ne.error(V);
      }
    } else {
      if (!u.trim()) {
        Ne.warning("Por favor, ingresa el nombre del grupo.");
        return;
      }
      if (f.length === 0) {
        Ne.warning("Por favor, selecciona al menos un participante para el grupo.");
        return;
      }
      try {
        const D = await y({
          type: "group",
          name: u.trim(),
          user_ids: f.map((V) => Number(V.id)),
          sender_id: Number(a)
        });
        Ne.success("Grupo creado correctamente"), _(!1), n && D && n(D);
      } catch (D) {
        const V = ((L = (F = D == null ? void 0 : D.response) == null ? void 0 : F.data) == null ? void 0 : L.message) || (D == null ? void 0 : D.message) || "Error al crear el grupo";
        Ne.error(V);
      }
    }
  }, H = b || s === "direct" && !c || s === "group" && (!u.trim() || f.length === 0);
  return /* @__PURE__ */ e(er, { open: t, onOpenChange: _, children: /* @__PURE__ */ e(tr, { className: "sm:max-w-[480px]", children: /* @__PURE__ */ i("form", { onSubmit: X, className: "flex flex-col", children: [
    /* @__PURE__ */ i(Wt, { children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ e(At, { className: "size-5" }) }),
        /* @__PURE__ */ i("div", { className: "text-left pr-6", children: [
          /* @__PURE__ */ e(qt, { children: "Nueva Conversación" }),
          /* @__PURE__ */ e(Vt, { children: "Inicia un chat directo o crea un grupo de conversación" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3.5", children: /* @__PURE__ */ e(
        Zr,
        {
          value: s,
          onValueChange: (S) => l(S),
          className: "w-full",
          children: /* @__PURE__ */ i(en, { className: "w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ i(
              Gt,
              {
                value: "direct",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ e(Ut, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Directo (1 a 1)" })
                ]
              }
            ),
            /* @__PURE__ */ i(
              Gt,
              {
                value: "group",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ e(Yt, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Grupo" })
                ]
              }
            )
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ i("div", { className: "p-5 space-y-4", children: [
      s === "group" && /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5", children: [
          /* @__PURE__ */ e("span", { children: "Nombre del Grupo" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ e(
          Cr,
          {
            placeholder: "Ej. Soporte Técnico L2, Equipo Infraestructura...",
            value: u,
            onChange: (S) => x(S.target.value),
            className: "h-9 text-xs",
            required: !0
          }
        )
      ] }),
      s === "group" && f.length > 0 && /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400", children: [
          /* @__PURE__ */ i("span", { children: [
            "Participantes seleccionados (",
            f.length,
            ")"
          ] }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => h([]),
              className: "text-[10px] text-red-500 hover:underline cursor-pointer",
              children: "Quitar todos"
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800", children: f.map((S) => {
          const T = Tt(S.attributes.name);
          return /* @__PURE__ */ i(
            ot,
            {
              variant: "secondary",
              className: "gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
              children: [
                /* @__PURE__ */ e(
                  Ye,
                  {
                    name: T,
                    src: S.attributes.avatar_url,
                    size: "xs"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "max-w-28 truncate font-medium capitalize", children: T }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: () => U(S.id),
                    className: "rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
                    children: /* @__PURE__ */ e(Xe, { className: "size-3" })
                  }
                )
              ]
            },
            S.id
          );
        }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between", children: [
          /* @__PURE__ */ e("span", { children: s === "direct" ? "Selecciona un usuario" : "Añadir participantes" }),
          /* @__PURE__ */ i("span", { className: "text-[10px] font-normal text-neutral-400", children: [
            C.length,
            " disponibles"
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
          /* @__PURE__ */ e(Gr, { className: "size-3.5 shrink-0 text-neutral-400" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              placeholder: "Buscar por nombre...",
              value: o,
              onChange: (S) => d(S.target.value),
              className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
            }
          ),
          o && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => d(""),
              className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer",
              children: /* @__PURE__ */ e(Xe, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden", children: /* @__PURE__ */ e(Mt, { className: "h-56 sm:h-64 w-full", children: v ? /* @__PURE__ */ i("div", { className: "flex h-56 items-center justify-center gap-2 text-xs text-neutral-500", children: [
        /* @__PURE__ */ e(je, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ e("span", { children: "Cargando usuarios..." })
      ] }) : C.length === 0 ? /* @__PURE__ */ i("div", { className: "flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500", children: [
        /* @__PURE__ */ e("p", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: "No se encontraron usuarios" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] mt-1", children: "Prueba con otro término de búsqueda" })
      ] }) : /* @__PURE__ */ e("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5", children: C.map((S) => {
        const T = c === S.id, R = f.some((D) => D.id === S.id), F = s === "direct" ? T : R, L = Tt(S.attributes.name);
        return /* @__PURE__ */ i(
          "div",
          {
            onClick: () => {
              s === "direct" ? p(S.id) : E(S);
            },
            className: $(
              "flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors",
              F ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium" : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200"
            ),
            children: [
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
                /* @__PURE__ */ e(
                  Ye,
                  {
                    name: L,
                    src: S.attributes.avatar_url,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ e("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ e("p", { className: "truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize", children: L }) })
              ] }),
              /* @__PURE__ */ e("div", { className: "shrink-0 pl-1", children: /* @__PURE__ */ e(
                "div",
                {
                  className: $(
                    "flex size-5 items-center justify-center rounded-full border transition-all",
                    F ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent"
                  ),
                  children: /* @__PURE__ */ e(gr, { className: "size-3 stroke-[2.5]" })
                }
              ) })
            ]
          },
          S.id
        );
      }) }) }) })
    ] }),
    /* @__PURE__ */ i(Ot, { children: [
      /* @__PURE__ */ e(
        fe,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => _(!1),
          disabled: b,
          className: "text-xs h-8 px-3.5 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        fe,
        {
          type: "submit",
          size: "sm",
          variant: "primary",
          disabled: H,
          className: "text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer",
          children: b ? /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Creando..." })
          ] }) : /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e(At, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: s === "direct" ? "Iniciar Chat" : "Crear Grupo" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const Ii = (t) => {
  var a, s, l, o;
  const r = (t == null ? void 0 : t.params) ?? {}, n = Dr({
    queryKey: ["list-conversations", r],
    queryFn: () => Qa(r),
    enabled: (t == null ? void 0 : t.enable) !== !1,
    keepPreviousData: !0
  });
  return {
    data: ((a = n.data) == null ? void 0 : a.data.data) ?? [],
    meta: (l = (s = n.data) == null ? void 0 : s.data) == null ? void 0 : l.meta,
    links: (o = n.data) == null ? void 0 : o.data.links,
    isLoading: n.isLoading,
    isFetching: n.isFetching,
    errors: n.errors,
    refetch: n.refetch,
    setData: n.setData
  };
}, Ei = ({
  showToastOnUnread: t = !0,
  isActive: r = !0
} = {}) => {
  const { config: n, currentUser: a, currentUserId: s } = Je(), { mutateAsync: l } = on(), o = Ze({
    permission: ["messenger_chat.read"]
  }), [d, m] = k("0"), [c, p] = k("all"), [f, h] = k(""), u = fn(f, 300), x = Pe(() => {
    const M = {
      closed: d
    };
    return c !== "all" && (M.type = c), u.trim() && (M.name = u.trim()), {
      user_id: s,
      paginate: "false",
      ...Object.keys(M).length > 0 ? { filter: M } : {}
    };
  }, [d, c, u, s]), {
    data: w,
    isLoading: v,
    isFetching: y,
    errors: b,
    refetch: C,
    setData: E
  } = Ii({
    params: x,
    enable: !!s && o
  }), [U, z] = k(""), [_, X] = k(null), [H, S] = k(!1), [T, R] = k(!1), [F, L] = k(!1), D = Pe(() => {
    let M = w;
    return _ && !w.some((W) => String(W.id) === String(_.id)) && (M = [_, ...w]), !r || !U ? M : M.map((W) => String(W.id) === String(U) && W.attributes.unread_count > 0 ? {
      ...W,
      attributes: {
        ...W.attributes,
        unread_count: 0
      }
    } : W);
  }, [_, r, w, U]), V = Q(
    (M) => {
      const W = s && String(M.message.sender_id) !== String(s), j = r && String(M.conversation_id) === String(U);
      W && (Tr(j ? "focused" : "unfocused"), t && !j && Ne.info("Nuevo mensaje", {
        id: `conversation-message-${M.message.id}`,
        description: M.message.body || "Tienes un mensaje nuevo",
        action: {
          label: "Abrir",
          onClick: () => {
            z(String(M.conversation_id)), R(!0);
          }
        }
      }), C());
    },
    [s, r, C, U, t]
  ), ae = Q(() => {
    C();
  }, [C]);
  Z(() => {
    if (typeof window > "u") return;
    const M = () => {
      C();
    }, W = (xe) => {
      const Y = xe.detail, oe = Y != null && Y.conversationId ? String(Y.conversationId) : null;
      oe && E && E((te) => {
        var de;
        return (de = te == null ? void 0 : te.data) != null && de.data ? {
          ...te,
          data: {
            ...te.data,
            data: te.data.data.map(
              (Ee) => String(Ee.id) === oe ? {
                ...Ee,
                attributes: {
                  ...Ee.attributes,
                  unread_count: 0
                }
              } : Ee
            )
          }
        } : te;
      });
    }, j = (xe) => {
      const Y = xe.detail, oe = Y != null && Y.conversationId ? String(Y.conversationId) : null, te = (Y == null ? void 0 : Y.closed_at) || (/* @__PURE__ */ new Date()).toISOString();
      oe && (z((de) => de === oe ? "" : de), R(!1)), X((de) => !de || !oe || String(de.id) !== oe ? de : d === "0" ? null : {
        ...de,
        attributes: {
          ...de.attributes,
          closed_at: te
        }
      }), oe && E && E((de) => {
        var Ae;
        if (!((Ae = de == null ? void 0 : de.data) != null && Ae.data)) return de;
        const Ee = de.data.data;
        return d === "0" ? {
          ...de,
          data: {
            ...de.data,
            data: Ee.filter((Te) => String(Te.id) !== oe)
          }
        } : {
          ...de,
          data: {
            ...de.data,
            data: Ee.map(
              (Te) => String(Te.id) === oe ? {
                ...Te,
                attributes: {
                  ...Te.attributes,
                  closed_at: te
                }
              } : Te
            )
          }
        };
      }), C();
    }, ne = (xe) => {
      const Y = xe.detail;
      if (Y != null && Y.conversationId) {
        const oe = String(Y.conversationId);
        Y.conversation && X(Y.conversation), m("0"), p((te) => te === "all" || te === "direct" ? te : "all"), h(""), z(oe), R(!0);
      }
      C();
    };
    return window.addEventListener("messenger:conversation-read", W), window.addEventListener("messenger:conversation-closed", j), window.addEventListener("messenger:conversation-created", ne), window.addEventListener("messenger:conversation-updated", M), () => {
      window.removeEventListener("messenger:conversation-read", W), window.removeEventListener("messenger:conversation-closed", j), window.removeEventListener("messenger:conversation-created", ne), window.removeEventListener("messenger:conversation-updated", M);
    };
  }, [C, d, E]), Z(() => {
    if (s)
      return un(
        n.reverb,
        s,
        V,
        ae
      );
  }, [n.reverb, ae, V, s]);
  const se = Pe(
    () => D.find((M) => String(M.id) === String(U)) ?? (_ && String(_.id) === String(U) ? _ : void 0),
    [D, _, U]
  ), me = Q(
    (M) => {
      const W = String(M);
      z(W), R(!0), W && s && l({
        conversationId: W,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: s
      }).then(() => {
        C();
      }).catch(console.error);
    },
    [s, l, C]
  );
  return {
    conversations: D,
    selectedId: U,
    setSelectedId: z,
    selectedConversation: se,
    closedFilter: d,
    setClosedFilter: m,
    typeFilter: c,
    setTypeFilter: p,
    searchQuery: f,
    setSearchQuery: h,
    isContextPanelOpen: H,
    isMobileChatOpen: T,
    isNewConversationOpen: F,
    isLoading: v,
    isFetching: y,
    errors: b,
    hasReadPermission: o,
    currentUser: a,
    currentUserId: s,
    selectConversation: me,
    unselectConversation: () => {
      z(""), R(!1);
    },
    refetchConversations: C,
    setIsContextPanelOpen: S,
    setIsNewConversationOpen: L,
    goBackToConversationList: () => R(!1),
    handleConversationCreated: (M) => {
      X(M), z(String(M.id)), R(!0), L(!1), C();
    }
  };
}, Ti = () => {
  const t = Q(async (r) => {
    var s;
    const n = await ri(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    return typeof window < "u" && (a != null && a.conversation_id) && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversationId: a.conversation_id }
      })
    ), a;
  }, []);
  return nt(
    t
  );
}, bn = ["/messenger"];
function qr(t, r) {
  if (!t || !r) return !1;
  const n = (t.startsWith("/") ? t : `/${t}`).toLowerCase().replace(/\/+$/, "") || "/", a = (r.startsWith("/") ? r : `/${r}`).toLowerCase().trim();
  if (a.endsWith("/*")) {
    const l = a.slice(0, -2).replace(/\/+$/, "") || "/";
    return n === l || n.startsWith(l === "/" ? "/" : `${l}/`);
  }
  if (a.endsWith("*")) {
    const l = a.slice(0, -1).replace(/\/+$/, "") || "/";
    return n === l || n.startsWith(l);
  }
  const s = a.replace(/\/+$/, "") || "/";
  return n === s || n.startsWith(`${s}/`);
}
if (typeof window < "u") {
  const t = window;
  if (!t.__sdi_messenger_history_patched__) {
    t.__sdi_messenger_history_patched__ = !0;
    const r = window.history.pushState;
    window.history.pushState = function(...a) {
      const s = r.apply(this, a);
      return window.setTimeout(() => {
        window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange"));
      }, 0), s;
    };
    const n = window.history.replaceState;
    window.history.replaceState = function(...a) {
      const s = n.apply(this, a);
      return window.setTimeout(() => {
        window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange"));
      }, 0), s;
    };
  }
}
function Di({
  hiddenPaths: t = bn,
  showOnlyPaths: r,
  hideCondition: n,
  hidden: a = !1,
  currentPath: s
}) {
  const [l, o] = k(() => s !== void 0 ? s : typeof window < "u" ? window.location.pathname : "");
  return Z(() => {
    if (s !== void 0) {
      o(s);
      return;
    }
    if (typeof window > "u") return;
    const m = () => {
      const p = window.location.pathname;
      o((f) => f !== p ? p : f);
    };
    m(), window.addEventListener("popstate", m), window.addEventListener("pushstate", m), window.addEventListener("replacestate", m), window.addEventListener("locationchange", m);
    const c = window.setInterval(m, 150);
    return () => {
      window.removeEventListener("popstate", m), window.removeEventListener("pushstate", m), window.removeEventListener("replacestate", m), window.removeEventListener("locationchange", m), window.clearInterval(c);
    };
  }, [s]), { shouldHide: Pe(() => a ? !0 : l ? !!(n && n(l) || r && r.length > 0 && !r.some((c) => qr(l, c)) || t && t.length > 0 && t.some((c) => qr(l, c))) : !1, [l, a, n, r, t]), pathname: l };
}
const Vr = "sdi_floating_chat_corner";
function Mi(t = "bottom-right") {
  const r = O(null), [n, a] = k(t), [s, l] = k(!1), [o, d] = k(null), m = O({ startX: 0, startY: 0, rect: new DOMRect(), moved: !1 }), c = O(!1), p = O(null);
  Z(() => {
    try {
      const y = localStorage.getItem(Vr);
      y && ["bottom-right", "bottom-left", "top-right", "top-left"].includes(y) && a(y);
    } catch {
    }
  }, []);
  const f = (y) => {
    a(y);
    try {
      localStorage.setItem(Vr, y);
    } catch {
    }
  }, h = (y) => {
    if (y.button !== 0 && y.pointerType === "mouse") return;
    const b = r.current;
    if (!b) return;
    const C = b.getBoundingClientRect();
    m.current = {
      startX: y.clientX,
      startY: y.clientY,
      rect: C,
      moved: !1
    };
    const E = y.clientX - C.left, U = y.clientY - C.top, z = (X) => {
      Math.hypot(
        X.clientX - m.current.startX,
        X.clientY - m.current.startY
      ) > 5 && (m.current.moved || (m.current.moved = !0, l(!0)), p.current && cancelAnimationFrame(p.current), p.current = requestAnimationFrame(() => {
        const S = Math.max(
          12,
          Math.min(window.innerWidth - C.width - 12, X.clientX - E)
        ), T = Math.max(
          12,
          Math.min(window.innerHeight - C.height - 12, X.clientY - U)
        );
        d({ x: S, y: T });
      }));
    }, _ = (X) => {
      if (window.removeEventListener("pointermove", z), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), p.current && cancelAnimationFrame(p.current), m.current.moved) {
        c.current = !0, setTimeout(() => {
          c.current = !1;
        }, 100);
        const H = X.clientX > window.innerWidth / 2, T = X.clientY > window.innerHeight / 2 ? H ? "bottom-right" : "bottom-left" : H ? "top-right" : "top-left";
        f(T), l(!1), d(null);
      }
    };
    window.addEventListener("pointermove", z), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
  }, u = n.startsWith("top"), x = n.endsWith("left");
  return {
    containerRef: r,
    corner: n,
    isDragging: s,
    dragPos: o,
    wasDraggedRef: c,
    isTop: u,
    isLeft: x,
    cornerContainerClass: u ? x ? "top-6 left-6 items-start flex-col-reverse" : "top-6 right-6 items-end flex-col-reverse" : x ? "bottom-6 left-6 items-start flex-col" : "bottom-6 right-6 items-end flex-col",
    cardOriginClass: u ? x ? "origin-top-left" : "origin-top-right" : x ? "origin-bottom-left" : "origin-bottom-right",
    startDrag: h,
    changeCorner: f
  };
}
function Pi({
  isOpen: t,
  totalUnreadCount: r,
  isLeft: n,
  isLoading: a = !1,
  hasError: s = !1,
  onToggleOpen: l,
  onPointerDown: o
}) {
  const d = () => t ? "bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rotate-90 shadow-2xl" : s ? "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/40 shadow-rose-500/30" : a ? "bg-blue-600/90 text-white" : "bg-blue-600 hover:bg-blue-700 text-white", m = () => t ? "Cerrar chat de soporte" : s ? "Error de conexión en el chat (Haz clic para ver detalles o reintentar)" : a ? "Conectando al chat de soporte..." : r > 0 ? `Abrir chat de soporte (${r} mensaje${r === 1 ? "" : "s"} sin leer)` : "Abrir chat de soporte";
  return /* @__PURE__ */ i(
    "div",
    {
      onPointerDown: o,
      className: "pointer-events-auto relative touch-none",
      children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: l,
            className: $(
              "flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40",
              d()
            ),
            "aria-label": m(),
            title: m(),
            children: t ? /* @__PURE__ */ e(Xe, { className: "size-6 transition-transform duration-200 text-white" }) : s ? /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center animate-in zoom-in-75 duration-200", children: /* @__PURE__ */ e(yr, { className: "size-6 transition-transform duration-200 text-white" }) }) : a ? /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ e(je, { className: "size-6 animate-spin text-white" }) }) : /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ e(na, { className: "size-6 transition-transform duration-200" }) })
          }
        ),
        !t && s && /* @__PURE__ */ i(
          "span",
          {
            className: $(
              "absolute -top-1 flex size-5 items-center justify-center rounded-full bg-rose-700 text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200",
              n ? "-left-1" : "-right-1"
            ),
            title: "Error de conexión",
            children: [
              /* @__PURE__ */ e("span", { className: "absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-rose-500/50 animate-ping pointer-events-none" }),
              /* @__PURE__ */ e("span", { className: "text-[10px] font-bold", children: "!" })
            ]
          }
        ),
        !t && !s && r > 0 && /* @__PURE__ */ i(
          "span",
          {
            className: $(
              "absolute -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200",
              n ? "-left-1" : "-right-1"
            ),
            title: `${r} mensaje${r === 1 ? "" : "s"} sin leer`,
            children: [
              /* @__PURE__ */ e("span", { className: "absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-red-500/40 animate-ping pointer-events-none" }),
              /* @__PURE__ */ e("span", { className: "relative z-10", children: r > 99 ? "99+" : r })
            ]
          }
        )
      ]
    }
  );
}
const Ri = "1.4.0", Li = {
  version: Ri
}, xn = Li.version;
function Mr({
  onNewConversation: t,
  showNewButton: r = !0,
  className: n
}) {
  var c, p;
  const { currentUser: a, isLoadingUser: s, hasError: l } = Je(), o = Ze({
    permission: ["messenger_chat_support.provide_support"]
  }), d = Tt((c = a == null ? void 0 : a.attributes) == null ? void 0 : c.name) || "Usuario", m = ((p = a == null ? void 0 : a.attributes) == null ? void 0 : p.email) || "Mi cuenta";
  return l ? /* @__PURE__ */ i(
    "div",
    {
      className: $(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        n
      ),
      children: [
        /* @__PURE__ */ e(aa, { className: "size-3.5 shrink-0 text-red-500" }),
        /* @__PURE__ */ e("span", { className: "truncate text-[11px] font-medium", children: "Sin conexión • No disponible" })
      ]
    }
  ) : s ? /* @__PURE__ */ i(
    "div",
    {
      className: $(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(le, { className: "size-8 rounded-full" }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
            /* @__PURE__ */ e(le, { className: "h-3 w-20" }),
            /* @__PURE__ */ e(le, { className: "h-2.5 w-32" })
          ] })
        ] }),
        r && /* @__PURE__ */ e(le, { className: "size-8 rounded-lg shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      className: $(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(Ye, { src: a == null ? void 0 : a.attributes.avatar_url, name: d, size: "sm" }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("p", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: d }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400 mt-0.5", children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: m }),
              /* @__PURE__ */ e("span", { className: "text-neutral-300 dark:text-neutral-700 select-none", children: "•" }),
              /* @__PURE__ */ i("span", { className: "font-mono text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0", children: [
                "v",
                xn
              ] })
            ] })
          ] })
        ] }),
        r && t && o && /* @__PURE__ */ e(
          fe,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: t,
            className: "h-8 gap-1.5 px-3 text-xs font-semibold shrink-0 shadow-xs cursor-pointer",
            title: "Iniciar nueva conversación",
            children: /* @__PURE__ */ e(At, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function ji({
  title: t,
  canRequestSupport: r,
  canViewChatList: n,
  supportWithBot: a = !0,
  isStartingBot: s = !1,
  totalUnreadCount: l,
  conversationsCount: o,
  onRequestSupport: d,
  onViewChatList: m,
  onClose: c,
  onNewConversation: p,
  onDragStart: f
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ i(
      "div",
      {
        onPointerDown: f,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md", children: /* @__PURE__ */ e(cr, { className: "size-5 text-white" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("h3", { className: "text-sm font-bold leading-none text-white", children: t }),
                /* @__PURE__ */ i("p", { className: "text-[11px] text-blue-100 mt-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }),
                  "Soporte técnico SDI"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e(
              fe,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (h) => h.stopPropagation(),
                onClick: c,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ e(Xe, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-4", children: [
            /* @__PURE__ */ e("p", { className: "text-xs font-semibold text-white", children: "¿En qué podemos ayudarte hoy?" }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-blue-100/90 mt-0.5", children: "Selecciona una opción para iniciar asistencia o revisar tu historial." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      r && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: d,
          disabled: s,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: s ? /* @__PURE__ */ e(je, { className: "size-5 animate-spin" }) : /* @__PURE__ */ e(cr, { className: "size-5" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Solicitar Asistencia" }),
                /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: s ? "Iniciando conversación..." : a ? "Inicia atención inmediata con nuestro asistente" : "Ingresa asunto y mensaje para iniciar soporte" })
              ] })
            ] }),
            /* @__PURE__ */ e(Rr, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      n && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: m,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer",
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ i("div", { className: "relative flex size-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: [
                /* @__PURE__ */ e(wr, { className: "size-5" }),
                l > 0 && /* @__PURE__ */ e("span", { className: "absolute -top-1 -right-1 size-3 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" })
              ] }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Ver mis chats" }),
                  l > 0 ? /* @__PURE__ */ i("span", { className: "rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs animate-pulse", children: [
                    l > 99 ? "99+" : l,
                    " ",
                    "sin leer"
                  ] }) : o > 0 ? /* @__PURE__ */ e("span", { className: "rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-blue-600 dark:text-blue-400", children: o }) : null
                ] }),
                /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Revisa tus conversaciones y requerimientos" })
              ] })
            ] }),
            /* @__PURE__ */ e(Rr, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ i("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30 p-3 mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs", children: [
            /* @__PURE__ */ e(Jt, { className: "size-3.5 text-emerald-600" }),
            /* @__PURE__ */ e("span", { children: "Mesa de Ayuda SDI" })
          ] }),
          /* @__PURE__ */ i("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500", children: [
            "v",
            xn
          ] })
        ] }),
        /* @__PURE__ */ e("p", { className: "leading-relaxed", children: "Tus solicitudes quedan registradas con trazabilidad y número de ticket en la plataforma de Helpdesk." })
      ] })
    ] }),
    /* @__PURE__ */ e(Mr, { onNewConversation: p })
  ] });
}
function Fi({
  userId: t,
  userName: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null,
  onCancel: l
}) {
  const [o, d] = k(""), [m, c] = k(""), [p, f] = k(null);
  return /* @__PURE__ */ i("form", { onSubmit: (u) => {
    u.preventDefault(), f(null);
    const x = o.trim(), w = m.trim();
    if (!x) {
      f("Por favor ingresa el asunto de tu solicitud.");
      return;
    }
    if (!w) {
      f("Por favor describe el detalle de tu consulta.");
      return;
    }
    if (!t) {
      f("No se pudo identificar el usuario actual para la solicitud.");
      return;
    }
    n({
      subject: x,
      message: w,
      user_id: t
    });
  }, className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ i("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100", children: [
      /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/90 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 p-3.5 shadow-2xs space-y-2", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ e(cr, { className: "size-4.5" }) }),
        /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ e("h4", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate", children: r ? `Hola, ${r}` : "Nueva solicitud de soporte" }),
            /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40", children: [
              /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
              "En línea"
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug", children: "Completa los datos para asignarte un técnico de soporte." })
        ] })
      ] }) }),
      (p || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(vr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ i("div", { className: "flex-1 leading-snug", children: [
          /* @__PURE__ */ e("span", { className: "font-medium", children: "Error en el formulario:" }),
          " ",
          p || s
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ e(sa, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ e("span", { children: "Asunto de la consulta" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ e("div", { className: "relative", children: /* @__PURE__ */ e(
          Cr,
          {
            value: o,
            onChange: (u) => {
              d(u.target.value), p && f(null);
            },
            placeholder: "Ej: Consulta sobre configuración o reporte de falla",
            disabled: a,
            maxLength: 150,
            className: "h-9.5 bg-neutral-50/60 hover:bg-white focus:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus:border-blue-500 rounded-lg text-xs transition-colors"
          }
        ) })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ e(ia, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ e("span", { children: "Detalle o descripción" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ e(
            Zt,
            {
              value: m,
              onChange: (u) => {
                c(u.target.value), p && f(null);
              },
              placeholder: "Describe lo más claro posible tu duda o problema...",
              rows: 4,
              disabled: a,
              maxLength: 1e3,
              className: "min-h-24 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none"
            }
          ),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400 dark:text-neutral-500", children: [
            /* @__PURE__ */ e("span", { children: "Proporciona detalles específicos" }),
            /* @__PURE__ */ i("span", { className: "font-mono", children: [
              m.length,
              "/1000"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 p-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: [
        /* @__PURE__ */ e(Jt, { className: "size-4 shrink-0 text-neutral-400 mt-0.5" }),
        /* @__PURE__ */ e("span", { children: "Tu solicitud creará automáticamente una conversación y se notificará al equipo de asistencia." })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900/80 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e("div", { children: l && /* @__PURE__ */ e(
        fe,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: l,
          disabled: a,
          className: "text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 cursor-pointer",
          children: "Cancelar"
        }
      ) }),
      /* @__PURE__ */ e(
        fe,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || !o.trim() || !m.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          children: a ? /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Enviando solicitud..." })
          ] }) : /* @__PURE__ */ i(Me, { children: [
            /* @__PURE__ */ e("span", { children: "Iniciar soporte" }),
            /* @__PURE__ */ e(Qt, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] });
}
function Bi({
  userId: t,
  userName: r,
  canViewChatList: n,
  totalUnreadCount: a,
  isSubmitting: s,
  error: l,
  onHome: o,
  onViewChats: d,
  onClose: m,
  onSubmit: c,
  onNewConversation: p,
  onDragStart: f
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ e(
      "div",
      {
        onPointerDown: f,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-3.5 py-4 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ i(
              fe,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (h) => h.stopPropagation(),
                onClick: o,
                className: "h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ e(xr, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Inicio" })
                ]
              }
            ),
            /* @__PURE__ */ e("span", { className: "text-xs font-bold text-white", children: "Solicitar Asistencia" })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
            n && /* @__PURE__ */ i(
              fe,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (h) => h.stopPropagation(),
                onClick: d,
                title: "Ver mis chats",
                className: "relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1",
                children: [
                  /* @__PURE__ */ e(wr, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { className: "hidden sm:inline text-[11px] font-medium", children: "Mis chats" }),
                  a > 0 && /* @__PURE__ */ e("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs", children: a > 99 ? "99+" : a })
                ]
              }
            ),
            /* @__PURE__ */ e(
              fe,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (h) => h.stopPropagation(),
                onClick: m,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ e(Xe, { className: "size-4" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-hidden flex flex-col", children: t && /* @__PURE__ */ e(
      Fi,
      {
        userId: t,
        userName: r,
        onSubmit: c,
        isSubmitting: s,
        error: l,
        onCancel: o
      }
    ) }),
    /* @__PURE__ */ e(Mr, { onNewConversation: p })
  ] });
}
const $i = [
  { id: "all", label: "Todos", icon: null },
  { id: "direct", label: "Directos", icon: Ut },
  { id: "group", label: "Grupos", icon: Yt },
  { id: "bot", label: "Bots", icon: ur }
], Ui = () => /* @__PURE__ */ i("div", { className: "flex w-full min-w-0 items-center gap-2.5 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-800/20", children: [
  /* @__PURE__ */ e(le, { className: "size-9.5 rounded-full shrink-0" }),
  /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 space-y-2", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e(le, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ e(le, { className: "h-2.5 w-10" })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e(le, { className: "h-2.5 w-36" }),
      /* @__PURE__ */ e(le, { className: "h-3.5 w-6 rounded-full" })
    ] })
  ] })
] }), Hi = ({
  conversation: t,
  selectedId: r,
  currentUserId: n,
  onSelectConversation: a
}) => {
  var u, x, w, v;
  const s = Pt(t), l = gt(t, n), o = t.type === "bot" || ((u = t.attributes) == null ? void 0 : u.type) === "bot" || Number((x = l == null ? void 0 : l.attributes) == null ? void 0 : x.user_auth_id) === 0, d = !!t.attributes.closed_at, m = vt(t, n), c = ((v = (w = t.relationships) == null ? void 0 : w.users) == null ? void 0 : v.length) || 0, p = s ? "Grupo" : o ? "Bot de Asistencia" : "Conversación directa";
  let f = "";
  try {
    f = Ht(
      kr(t.attributes.updated_at || t.attributes.created_at),
      "dd/MM HH:mm"
    );
  } catch {
    f = "";
  }
  const h = String(r) === String(t.id);
  return /* @__PURE__ */ e(
    "div",
    {
      onClick: () => a(String(t.id)),
      "aria-current": h ? "true" : void 0,
      className: $(
        "group relative flex w-full min-w-0 cursor-pointer select-none flex-col gap-1.5 overflow-hidden rounded-xl p-3 transition-all",
        h ? "bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900" : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent"
      ),
      children: /* @__PURE__ */ i("div", { className: "flex items-start gap-2.5 min-w-0", children: [
        /* @__PURE__ */ e(
          Ye,
          {
            src: l == null ? void 0 : l.attributes.avatar_url,
            name: m,
            isGroup: s,
            isBot: o,
            size: "md",
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("h4", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: m }),
              o && /* @__PURE__ */ e("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-violet-100 dark:bg-violet-950/70 px-1 py-0.2 text-[9px] font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40 shrink-0 shadow-2xs", children: "IA" }),
              s && /* @__PURE__ */ i("span", { className: "text-[10px] text-neutral-400 font-normal shrink-0", children: [
                "(",
                c,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ e("span", { className: "shrink-0 text-[10px] text-neutral-400 font-mono", children: f })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("p", { className: "truncate text-[11px] text-neutral-500 dark:text-neutral-400", children: p }),
              d && /* @__PURE__ */ i(
                ot,
                {
                  variant: "outline",
                  className: "h-4 px-1 text-[9px] gap-0.5 border-amber-300 text-amber-700 dark:text-amber-400 font-medium",
                  children: [
                    /* @__PURE__ */ e(mt, { className: "size-2" }),
                    /* @__PURE__ */ e("span", { children: "Cerrado" })
                  ]
                }
              )
            ] }),
            t.attributes.unread_count > 0 && /* @__PURE__ */ e(ot, { className: "bg-blue-700", children: t.attributes.unread_count })
          ] })
        ] })
      ] })
    }
  );
};
function Wi({
  conversations: t,
  selectedId: r,
  onSelectConversation: n,
  searchQuery: a,
  onSearchChange: s,
  closedFilter: l,
  onClosedFilterChange: o,
  typeFilter: d,
  onTypeFilterChange: m,
  onNewConversation: c,
  isLoading: p = !1
}) {
  const { currentUser: f, currentUserId: h, isLoadingUser: u, hasError: x, error: w } = Je(), v = Ze({
    permission: ["messenger_chat.read"]
  }), y = p || u;
  return /* @__PURE__ */ i("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ i("div", { className: "flex shrink-0 flex-col gap-2.5 border-b border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900", children: [
      /* @__PURE__ */ i("div", { className: "group/search relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
        /* @__PURE__ */ e(Gr, { className: "size-3.5 shrink-0 text-neutral-400 transition-colors group-focus-within/search:text-blue-600" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Buscar por nombre...",
            value: a,
            onChange: (b) => s(b.target.value),
            className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          }
        ),
        a ? /* @__PURE__ */ e(
          fe,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => s(""),
            className: "size-5 shrink-0 rounded-full p-0 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
            children: /* @__PURE__ */ e(Xe, { className: "size-3" })
          }
        ) : /* @__PURE__ */ e("span", { className: "hidden shrink-0 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-400 sm:inline-block", children: "Buscar" })
      ] }),
      /* @__PURE__ */ e(
        Zr,
        {
          value: l,
          onValueChange: (b) => o(b),
          className: "w-full",
          children: /* @__PURE__ */ i(en, { className: "h-8 w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ e(Gt, { value: "0", className: "text-[11px] font-medium", children: "Activos" }),
            /* @__PURE__ */ e(Gt, { value: "1", className: "text-[11px] font-medium", children: "Cerrados" })
          ] })
        }
      ),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none", children: $i.map((b) => {
        const C = d === b.id, E = b.icon;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => m(b.id),
            className: $(
              "flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              C ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 border border-transparent"
            ),
            children: [
              E && /* @__PURE__ */ e(E, { className: "size-3" }),
              /* @__PURE__ */ e("span", { children: b.label })
            ]
          },
          b.id
        );
      }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ e(Mt, { className: "h-full w-full", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 p-1.5 w-full min-w-0", children: x ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(yr, { className: "size-6" }) }),
      /* @__PURE__ */ i("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Error al cargar chats" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: (w == null ? void 0 : w.message) || "No se pudo conectar al servidor de mensajería." })
      ] }),
      /* @__PURE__ */ i(
        fe,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: () => window.location.reload(),
          className: "h-7.5 gap-1.5 px-3 text-xs font-semibold cursor-pointer",
          children: [
            /* @__PURE__ */ e(Kr, { className: "size-3" }),
            /* @__PURE__ */ e("span", { children: "Reintentar" })
          ]
        }
      )
    ] }) : !v && !u ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(mt, { className: "size-6" }) }),
      /* @__PURE__ */ i("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Sin permiso de lectura" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: "No tienes permisos para ver el listado de conversaciones." })
      ] })
    ] }) : y ? /* @__PURE__ */ e("div", { className: "space-y-1.5 p-1", children: Array.from({ length: 5 }).map((b, C) => /* @__PURE__ */ e(Ui, {}, C)) }) : t.length === 0 ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ e("div", { className: "mb-3 flex size-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400", children: /* @__PURE__ */ e(la, { className: "size-5 stroke-[1.5]" }) }),
      /* @__PURE__ */ e("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100", children: a ? "No se encontraron resultados" : l === "1" ? "No hay conversaciones cerradas" : "No hay conversaciones activas" }),
      /* @__PURE__ */ e("p", { className: "mt-1 max-w-48 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400", children: a ? "Intenta con otro término de búsqueda o cambia los filtros." : "Las conversaciones iniciadas aparecerán aquí." }),
      l !== "0" && /* @__PURE__ */ e(
        fe,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => o("0"),
          className: "mt-3 text-[11px] h-7 text-blue-600 dark:text-blue-400 cursor-pointer",
          children: "Ver activas"
        }
      )
    ] }) : t.map((b) => /* @__PURE__ */ e(
      Hi,
      {
        conversation: b,
        selectedId: r,
        currentUserId: h,
        onSelectConversation: n
      },
      b.id
    )) }) }) }),
    /* @__PURE__ */ e(Mr, { onNewConversation: c })
  ] });
}
function qi({
  conversations: t,
  selectedId: r,
  searchQuery: n,
  closedFilter: a,
  typeFilter: s,
  isLoading: l,
  onHome: o,
  onClose: d,
  onSelectConversation: m,
  onSearchChange: c,
  onClosedFilterChange: p,
  onTypeFilterChange: f,
  onNewConversation: h,
  onDragStart: u
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: [
    /* @__PURE__ */ i(
      "div",
      {
        onPointerDown: u,
        className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900 cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ i(
            fe,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (x) => x.stopPropagation(),
              onClick: o,
              className: "h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100",
              children: [
                /* @__PURE__ */ e(xr, { className: "size-3.5" }),
                /* @__PURE__ */ e("span", { children: "Inicio" })
              ]
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Mis Conversaciones" }),
          /* @__PURE__ */ e(
            fe,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (x) => x.stopPropagation(),
              onClick: d,
              className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ e(Xe, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ e(
      Wi,
      {
        conversations: t,
        selectedId: r,
        onSelectConversation: m,
        searchQuery: n,
        onSearchChange: c,
        closedFilter: a,
        onClosedFilterChange: p,
        typeFilter: s,
        onTypeFilterChange: f,
        onNewConversation: h,
        isLoading: l
      }
    ) })
  ] });
}
function Vi({
  onDragStart: t
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ i(
      "div",
      {
        onPointerDown: t,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ e(le, { className: "size-9 rounded-xl bg-white/20" }),
              /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ e(le, { className: "h-3.5 w-32 bg-white/30" }),
                /* @__PURE__ */ e(le, { className: "h-2.5 w-24 bg-white/20" })
              ] })
            ] }),
            /* @__PURE__ */ e(le, { className: "size-7 rounded-full bg-white/20" })
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-4 space-y-1.5", children: [
            /* @__PURE__ */ e(le, { className: "h-3 w-48 bg-white/30" }),
            /* @__PURE__ */ e(le, { className: "h-2.5 w-64 bg-white/20" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      /* @__PURE__ */ i("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e(le, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ e(le, { className: "h-3.5 w-28" }),
            /* @__PURE__ */ e(le, { className: "h-2.5 w-44" })
          ] })
        ] }),
        /* @__PURE__ */ e(le, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e(le, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ e(le, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ e(le, { className: "h-2.5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ e(le, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ i("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(le, { className: "size-3.5 rounded-full" }),
          /* @__PURE__ */ e(le, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ e(le, { className: "h-2.5 w-full" }),
        /* @__PURE__ */ e(le, { className: "h-2.5 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ e(le, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(le, { className: "h-3 w-24" }),
          /* @__PURE__ */ e(le, { className: "h-2.5 w-36" })
        ] })
      ] }),
      /* @__PURE__ */ e(le, { className: "size-8 rounded-lg" })
    ] })
  ] });
}
function sl({
  canViewChatList: t = !0,
  canRequestSupport: r = !0,
  supportWithBot: n,
  defaultView: a = "home",
  defaultCorner: s = "bottom-right",
  initialConversation: l,
  title: o = "Centro de Ayuda SDI",
  hiddenPaths: d = bn,
  showOnlyPaths: m,
  hideCondition: c,
  hidden: p = !1,
  currentPath: f,
  showToastOnUnread: h = !1,
  renderOptions: u,
  onActiveConversationChange: x
}) {
  var Rt, Lt, jt;
  const w = Ze({
    permission: ["messenger_chat.read"]
  }), v = Ze({
    permission: ["messenger_chat_support.request_support"]
  });
  Ze({
    permission: ["messenger_chat_support.provide_support"]
  });
  const y = Ze({
    permission: [
      "messenger_chat.read",
      "messenger_chat_support.request_support",
      "messenger_chat_support.provide_support"
    ],
    operator: "OR"
  }), { currentUser: b, isLoadingUser: C, hasError: E, error: U, config: z } = Je(), _ = b == null ? void 0 : b.id, X = ((Rt = b == null ? void 0 : b.attributes) == null ? void 0 : Rt.name) || "Usuario", H = t && w, S = r && v, T = n ?? z.supportWithBot ?? !0, { shouldHide: R } = Di({
    hiddenPaths: d,
    showOnlyPaths: m,
    hideCondition: c,
    hidden: p,
    currentPath: f
  }), {
    containerRef: F,
    isDragging: L,
    dragPos: D,
    wasDraggedRef: V,
    isTop: ae,
    isLeft: se,
    cornerContainerClass: me,
    cardOriginClass: g,
    startDrag: N
  } = Mi(s), [J, M] = k(!1), [W, j] = k(() => !H && !S ? "chat" : a === "list" && !H || a === "support-form" && (!S || T) ? "home" : a), {
    mutateAsync: ne,
    isLoading: xe,
    error: Y
  } = Ti(), {
    mutateAsync: oe,
    isLoading: te
  } = pn(), de = async () => {
    var pe, Be;
    try {
      const we = await oe({
        type: "bot",
        sender_id: _ ? Number(_) : void 0,
        user_id: _ ? Number(_) : void 0
      });
      we && (Le(we), ze(we), Ne.success("Conversación iniciada con el Asistente Virtual"), j("chat"));
    } catch (we) {
      const Ge = ((Be = (pe = we == null ? void 0 : we.response) == null ? void 0 : pe.data) == null ? void 0 : Be.message) || (we == null ? void 0 : we.message) || "Error al iniciar conversación con el bot";
      Ne.error(Ge);
    }
  }, Ee = () => {
    T ? de() : j("support-form");
  }, [Ae, Te] = k(null), [Ce, Le] = k(
    null
  ), {
    conversations: He,
    selectedId: ve,
    selectedConversation: K,
    closedFilter: qe,
    setClosedFilter: Ve,
    typeFilter: Qe,
    setTypeFilter: Oe,
    searchQuery: B,
    setSearchQuery: ie,
    isNewConversationOpen: A,
    isLoading: q,
    selectConversation: P,
    unselectConversation: G,
    refetchConversations: re,
    setIsNewConversationOpen: Se,
    handleConversationCreated: ze
  } = Ei({
    showToastOnUnread: h,
    isActive: J && W === "chat"
  }), De = Pe(() => !He || !Array.isArray(He) ? 0 : He.reduce((pe, Be) => {
    var we;
    return pe + (((we = Be.attributes) == null ? void 0 : we.unread_count) || 0);
  }, 0), [He]), be = (Ce ? K && String(K.id) === String(Ce.id) ? K : Ce : null) || l || K || null, at = J && W === "chat" ? be : null;
  Z(() => {
    pt.set(at), x == null || x(at);
  }, [at, x]), Z(() => () => {
    pt.set(null);
  }, []), Z(() => {
    if (typeof window > "u") return;
    const pe = (Be) => {
      const we = Be.detail, Ge = we != null && we.conversationId ? String(we.conversationId) : null, st = be != null && be.id ? String(be.id) : null;
      Ge && (st === Ge || String(Ce == null ? void 0 : Ce.id) === Ge) && (Le(null), G(), W === "chat" && j(H ? "list" : "home")), re();
    };
    return window.addEventListener("messenger:conversation-closed", pe), () => {
      window.removeEventListener("messenger:conversation-closed", pe);
    };
  }, [
    be == null ? void 0 : be.id,
    Ce == null ? void 0 : Ce.id,
    W,
    H,
    G,
    re
  ]), Z(() => {
    W === "chat" && !be && j(H ? "list" : "home");
  }, [W, be, H]);
  const Fe = () => {
    V.current || L || (J ? M(!1) : (M(!0), j(
      a === "list" && !H ? S && !T ? "support-form" : "home" : a === "support-form" && (!S || T) ? H ? "list" : "home" : a || "home"
    )));
  };
  if (R || !C && !E && !y)
    return null;
  const wt = (pe) => {
    Le(null), P(pe), j("chat");
  }, yt = async (pe) => {
    var Be, we, Ge, st, it;
    try {
      const ge = await ne({ ...pe, direct_technician: !1 });
      if (ge != null && ge.conversation_id && (ge != null && ge.technician)) {
        const Nt = String(ge.conversation_id), Ft = {
          id: String(ge.technician.id),
          type: "user",
          attributes: {
            user_auth_id: Number(ge.technician.user_auth_id),
            name: ge.technician.name,
            avatar_url: null,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: []
        }, kt = {
          id: Nt,
          type: "conversation",
          attributes: {
            is_group: !1,
            name: ge.technician.name || ((Be = ge.ticket) == null ? void 0 : Be.subject) || "Soporte SDI",
            closed_at: null,
            unread_count: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: {
            users: [Ft]
          }
        };
        Le(kt), ze(kt), Ne.success(`Asistencia iniciada con ${ge.technician.name}`, {
          description: `Ticket #${((we = ge.ticket) == null ? void 0 : we.number) || ((Ge = ge.ticket) == null ? void 0 : Ge.id)}`
        }), j("chat");
      } else
        Te(ge), j("no-technician");
    } catch (ge) {
      const Nt = ((it = (st = ge == null ? void 0 : ge.response) == null ? void 0 : st.data) == null ? void 0 : it.message) || (ge == null ? void 0 : ge.message) || "Error al procesar la solicitud de asistencia";
      Ne.error(Nt);
    }
  }, rr = (pe) => {
    var Be, we;
    if (pe != null && pe.conversation_id) {
      const Ge = String(pe.conversation_id), st = pe.technician ? {
        id: String(pe.technician.id),
        type: "user",
        attributes: {
          user_auth_id: Number(pe.technician.user_auth_id ?? pe.technician.id ?? 1),
          name: pe.technician.name,
          avatar_url: null,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        relationships: []
      } : void 0, it = {
        id: Ge,
        type: "conversation",
        attributes: {
          is_group: !1,
          name: ((Be = pe.technician) == null ? void 0 : Be.name) || ((we = pe.ticket) == null ? void 0 : we.subject) || "Soporte SDI",
          closed_at: null,
          unread_count: 0,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        relationships: {
          users: st ? [st] : []
        }
      };
      Le(it), ze(it), j("chat");
    } else pe != null && pe.ticket && (Te(pe), j("no-technician"));
  };
  if (R)
    return null;
  if (!E)
    return /* @__PURE__ */ i(
      "div",
      {
        ref: F,
        style: L && D ? {
          position: "fixed",
          left: `${D.x}px`,
          top: `${D.y}px`,
          bottom: "auto",
          right: "auto",
          zIndex: 50,
          touchAction: "none",
          transition: "none"
        } : void 0,
        className: $(
          "sdi-messenger-root z-50 flex pointer-events-none select-none",
          L ? "fixed cursor-grabbing" : $("fixed duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all", me)
        ),
        children: [
          J && /* @__PURE__ */ e(
            Pa,
            {
              className: $(
                "pointer-events-auto h-[590px] max-h-[calc(100vh-120px)] w-[385px] sm:w-[425px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-2xl transition-all duration-300 flex flex-col",
                ae ? "mt-3.5" : "mb-3.5",
                g
              ),
              children: C ? /* @__PURE__ */ e(Vi, { onDragStart: N }) : /* @__PURE__ */ i(Me, { children: [
                W === "home" && /* @__PURE__ */ e(
                  ji,
                  {
                    title: o,
                    canRequestSupport: S,
                    canViewChatList: H,
                    supportWithBot: T,
                    isStartingBot: te,
                    totalUnreadCount: De,
                    conversationsCount: He.length,
                    onRequestSupport: Ee,
                    onViewChatList: () => j("list"),
                    onClose: () => M(!1),
                    onNewConversation: () => Se(!0),
                    onDragStart: N
                  }
                ),
                W === "support-form" && /* @__PURE__ */ e(
                  Bi,
                  {
                    userId: _,
                    userName: X,
                    canViewChatList: H,
                    totalUnreadCount: De,
                    isSubmitting: xe,
                    error: ((jt = (Lt = Y == null ? void 0 : Y.response) == null ? void 0 : Lt.data) == null ? void 0 : jt.message) || (Y == null ? void 0 : Y.message),
                    onHome: () => j("home"),
                    onViewChats: () => j("list"),
                    onClose: () => M(!1),
                    onSubmit: yt,
                    onNewConversation: () => Se(!0),
                    onDragStart: N
                  }
                ),
                W === "no-technician" && /* @__PURE__ */ e(
                  zi,
                  {
                    message: Ae == null ? void 0 : Ae.message,
                    ticket: Ae == null ? void 0 : Ae.ticket,
                    onNewRequest: () => {
                      Te(null), T ? (j("home"), de()) : j("support-form");
                    },
                    onViewChats: () => j("list"),
                    onClose: () => M(!1),
                    canViewChatList: H
                  }
                ),
                W === "list" && /* @__PURE__ */ e(
                  qi,
                  {
                    conversations: He,
                    selectedId: ve,
                    searchQuery: B,
                    closedFilter: qe,
                    typeFilter: Qe,
                    isLoading: q,
                    onHome: () => j("home"),
                    onClose: () => M(!1),
                    onSelectConversation: wt,
                    onSearchChange: ie,
                    onClosedFilterChange: Ve,
                    onTypeFilterChange: Oe,
                    onNewConversation: () => Se(!0),
                    onDragStart: N
                  }
                ),
                W === "chat" && be && /* @__PURE__ */ e("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: /* @__PURE__ */ e(
                  Si,
                  {
                    conversation: be,
                    isContextPanelOpen: !1,
                    alwaysShowBackButton: !0,
                    renderOptions: u,
                    onEscalateSuccess: rr,
                    onCloseSuccess: () => {
                      Le(null), G(), j(H ? "list" : "home");
                    },
                    onBack: () => {
                      Le(null), G(), j(H ? "list" : "home");
                    }
                  }
                ) })
              ] })
            }
          ),
          /* @__PURE__ */ e(
            Pi,
            {
              isOpen: J,
              totalUnreadCount: De,
              isLeft: se,
              isLoading: C,
              hasError: E,
              onToggleOpen: Fe,
              onPointerDown: N
            }
          ),
          /* @__PURE__ */ e(
            Ai,
            {
              open: A,
              onOpenChange: Se,
              onSuccess: (pe) => {
                Le(pe), ze(pe), j("chat");
              }
            }
          )
        ]
      }
    );
}
function il({ onNewConversation: t }) {
  const { hasError: r, error: n, isLoadingUser: a } = Je(), s = Ze({
    permission: ["messenger_chat.read"]
  }), l = Ze({
    permission: ["messenger_chat_support.provide_support"]
  });
  return r ? /* @__PURE__ */ i("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ e("div", { className: "absolute inset-x-0 top-0 h-1 bg-red-500/30" }),
    /* @__PURE__ */ i("div", { className: "flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200", children: [
      /* @__PURE__ */ e("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs", children: /* @__PURE__ */ e(yr, { className: "size-8" }) }),
      /* @__PURE__ */ e("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400", children: "Servicio no disponible" }),
      /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Error de conexión" }),
      /* @__PURE__ */ e("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: (n == null ? void 0 : n.message) || "No fue posible conectar con el servidor de chat. Las funciones de mensajería están temporalmente deshabilitadas." }),
      /* @__PURE__ */ i(
        fe,
        {
          type: "button",
          variant: "primary",
          className: "mt-6 gap-1.5 cursor-pointer shadow-xs",
          onClick: () => window.location.reload(),
          children: [
            /* @__PURE__ */ e(Kr, { className: "size-4" }),
            "Reintentar conexión"
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ e("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0f1d] shadow-xs", children: /* @__PURE__ */ i("div", { className: "relative z-10 flex max-w-md flex-col items-center px-6 text-center", children: [
    /* @__PURE__ */ e("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs", children: /* @__PURE__ */ e(At, { className: "size-8" }) }),
    /* @__PURE__ */ e("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400", children: "Bandeja de conversaciones" }),
    /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Selecciona una conversación" }),
    /* @__PURE__ */ e("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: s ? "Elige una conversación del panel lateral para ver sus mensajes o inicia una nueva cuando estés listo." : "No cuentas con permisos para ver la lista de conversaciones." }),
    t && !a && l && /* @__PURE__ */ i(
      fe,
      {
        type: "button",
        variant: "outline",
        className: "mt-6 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors",
        onClick: t,
        children: [
          /* @__PURE__ */ e(At, { className: "size-4" }),
          "Nueva conversación"
        ]
      }
    )
  ] }) });
}
function ll({
  conversation: t,
  onClose: r,
  className: n
}) {
  var f, h, u;
  const { currentUserId: a } = Je(), s = Pt(t), l = gt(t, a), o = Number((f = l == null ? void 0 : l.attributes) == null ? void 0 : f.user_auth_id) === 0 || t.type === "bot", d = vt(t, a), m = ((u = (h = t.relationships) == null ? void 0 : h.users) == null ? void 0 : u.length) || 0, c = !!t.attributes.closed_at, p = (x) => {
    if (!x) return "-";
    try {
      return Ht(kr(x), "dd/MM/yyyy HH:mm");
    } catch {
      return x;
    }
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: $(
        "sdi-messenger-root flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-3 px-4 bg-white dark:bg-neutral-900", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(Ut, { className: "size-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ e("h3", { className: "text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100", children: "Información de Contacto" })
          ] }),
          r && /* @__PURE__ */ e(
            fe,
            {
              variant: "ghost",
              size: "icon",
              onClick: r,
              className: " p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              children: /* @__PURE__ */ e(Xe, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(Mt, { className: "h-full", children: /* @__PURE__ */ i("div", { className: "space-y-4 p-4", children: [
          /* @__PURE__ */ i("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ e("div", { className: "relative mb-2", children: /* @__PURE__ */ e(
              Ye,
              {
                src: l == null ? void 0 : l.attributes.avatar_url,
                name: d,
                isGroup: s,
                isBot: o,
                size: "xl",
                status: !s && !o && l ? "online" : void 0
              }
            ) }),
            /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: d }),
            /* @__PURE__ */ e("p", { className: "text-xs font-medium text-neutral-500 dark:text-neutral-400", children: s ? `${m} participantes` : o ? "Asistente virtual inteligente" : "Conversación individual" }),
            /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-1.5 mt-2", children: [
              /* @__PURE__ */ e(ot, { variant: o ? "default" : "secondary", className: $("text-[10px]", o && "bg-violet-600 text-white"), children: s ? "Grupo" : o ? "Asistente IA" : "Usuario" }),
              c ? /* @__PURE__ */ i(
                ot,
                {
                  variant: "outline",
                  className: "text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ e(mt, { className: "size-2.5" }),
                    /* @__PURE__ */ e("span", { children: "Cerrada" })
                  ]
                }
              ) : /* @__PURE__ */ i(
                ot,
                {
                  variant: "outline",
                  className: "text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ e(ut, { className: "size-2.5" }),
                    /* @__PURE__ */ e("span", { children: "Activa" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ e(Ma, {}),
          /* @__PURE__ */ i("div", { className: "space-y-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(Ut, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ e("span", { className: "truncate text-neutral-900 dark:text-neutral-100 font-medium", children: s ? `${m} participantes` : d })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(oa, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Creada: ",
                p(t.attributes.created_at)
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(dt, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Actualizada: ",
                p(t.attributes.updated_at)
              ] })
            ] }),
            t.attributes.closed_at && /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(mt, { className: "size-3.5 shrink-0 text-amber-500" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Cerrada: ",
                p(t.attributes.closed_at)
              ] })
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
}
const Oi = ({ conversationId: t, enabled: r = !0 } = {}) => {
  var s, l;
  const a = Dr({
    queryKey: ["conversation", t],
    queryFn: () => es(t),
    enabled: r && !!t,
    keepPreviousData: !0
  });
  return {
    data: ((l = (s = a.data) == null ? void 0 : s.data) == null ? void 0 : l.data) ?? null,
    isLoading: a.isLoading,
    isFetching: a.isFetching,
    isError: a.isError,
    errors: a.errors,
    refetch: a.refetch
  };
}, ol = (t, r) => {
  const n = typeof t == "object" && t !== null ? t : { conversationId: t, ...r }, {
    conversationId: a,
    enabled: s = !0,
    showToastOnUnread: l = !1,
    onMessage: o,
    onUnread: d
  } = n, { config: m, currentUser: c, currentUserId: p } = Je(), f = Ze({
    permission: ["messenger_chat.read"]
  }), h = a != null ? String(a) : void 0, u = a != null ? Number(a) : void 0, x = s && !!h && f, {
    data: w,
    isLoading: v,
    isError: y,
    errors: b,
    refetch: C
  } = Oi({
    conversationId: h,
    enabled: x
  }), E = Q(
    (z) => {
      if (p && String(z.attributes.sender_id) !== String(p)) {
        const X = typeof document < "u" && document.hasFocus() && !document.hidden;
        Tr(X ? "focused" : "unfocused");
      }
      C(), o == null || o(z);
    },
    [p, o, C]
  ), U = Q(
    (z) => {
      l && String(z.conversation_id) !== h && Ne.info("Nuevo mensaje", {
        id: `conversation-message-${z.message.id}`,
        description: z.message.body || "Tienes un mensaje nuevo"
      }), String(z.conversation_id) === h && C(), d == null || d(z);
    },
    [h, d, C, l]
  );
  return Z(() => {
    if (!(!u || !x))
      return dn(
        m.reverb,
        u,
        E
      );
  }, [m.reverb, u, E, x]), Z(() => {
    if (!(!p || !x))
      return un(
        m.reverb,
        p,
        U
      );
  }, [m.reverb, p, U, x]), Z(() => {
    if (typeof window > "u") return;
    const z = () => {
      C();
    };
    return window.addEventListener("messenger:conversation-closed", z), window.addEventListener("messenger:conversation-updated", z), () => {
      window.removeEventListener("messenger:conversation-closed", z), window.removeEventListener("messenger:conversation-updated", z);
    };
  }, [C]), {
    conversation: w ?? null,
    isLoading: v,
    isError: y,
    errors: b,
    refetch: C,
    hasReadPermission: f,
    currentUser: c,
    currentUserId: p
  };
};
function cl({
  enabled: t = !0,
  isMuted: r = !1,
  fftSize: n = 64,
  levelUpdateInterval: a = 50
} = {}) {
  const [s, l] = k(null), [o, d] = k(0), [m, c] = k(!1), [p, f] = k(null), [h, u] = k(null), x = O(null), w = O(null), v = O(null), y = O(null), b = O(null), C = O(0), E = Q(() => {
    if (b.current && (clearInterval(b.current), b.current = null), y.current) {
      try {
        y.current.disconnect();
      } catch {
      }
      y.current = null;
    }
    if (x.current && (x.current.getTracks().forEach((z) => {
      try {
        z.stop();
      } catch {
      }
    }), x.current = null), w.current && w.current.state !== "closed") {
      try {
        w.current.close().catch(() => {
        });
      } catch {
      }
      w.current = null;
    }
    v.current = null, l(null), c(!1), d(0), C.current = 0;
  }, []), U = Q(async () => {
    var z;
    if (!(typeof window > "u") && !(x.current && x.current.active && v.current)) {
      if (!((z = navigator.mediaDevices) != null && z.getUserMedia)) {
        u("La API de micrófono no está disponible en este navegador o entorno"), f(!1);
        return;
      }
      try {
        const _ = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: !0,
            noiseSuppression: !0,
            autoGainControl: !0
          }
        });
        x.current = _;
        const X = window.AudioContext || window.webkitAudioContext, H = new X();
        w.current = H, H.state === "suspended" && await H.resume();
        const S = H.createMediaStreamSource(_);
        y.current = S;
        const T = H.createAnalyser();
        T.fftSize = n, T.smoothingTimeConstant = 0.65, v.current = T, S.connect(T), _.getAudioTracks().forEach((F) => {
          F.enabled = !r;
        }), l(T), c(!0), f(!0), u(null);
        const R = new Uint8Array(T.frequencyBinCount);
        b.current && clearInterval(b.current), b.current = setInterval(() => {
          if (!v.current || r) {
            C.current = 0, d(0);
            return;
          }
          v.current.getByteFrequencyData(R);
          let F = 0;
          for (let V = 0; V < R.length; V++)
            F += R[V];
          const L = F / (R.length || 1), D = Math.min(1, Math.max(0, L / 128));
          C.current = C.current * 0.7 + D * 0.3, d(Number(C.current.toFixed(3)));
        }, a);
      } catch (_) {
        const H = (_ == null ? void 0 : _.name) === "NotAllowedError" || (_ == null ? void 0 : _.name) === "PermissionDeniedError" ? "El acceso al micrófono fue denegado en el navegador. Por favor habilita los permisos para continuar." : _ instanceof Error ? _.message : "Error al acceder al micrófono";
        u(H), f(!1), E();
      }
    }
  }, [n, r, a, E]);
  return Z(() => {
    var z;
    if (!(typeof window > "u" || !((z = navigator.permissions) != null && z.query)))
      try {
        navigator.permissions.query({ name: "microphone" }).then((_) => {
          _.state === "denied" ? (f(!1), u("El acceso al micrófono fue denegado en el navegador")) : _.state === "granted" && f(!0), _.onchange = () => {
            _.state === "denied" ? (f(!1), u("El acceso al micrófono fue denegado en el navegador")) : _.state === "granted" && (f(!0), u(null));
          };
        }).catch(() => {
        });
      } catch {
      }
  }, []), Z(() => {
    x.current && x.current.getAudioTracks().forEach((z) => {
      z.enabled = !r;
    }), r && (C.current = 0, d(0));
  }, [r]), Z(() => (t ? U() : E(), () => {
    E();
  }), [t, U, E]), {
    analyserNode: s,
    audioLevel: o,
    isRecording: m,
    hasPermission: p,
    error: h,
    start: U,
    stop: E
  };
}
export {
  ns as ActiveConversationProvider,
  nl as ChatProvider,
  hi as ConversationChatHeader,
  Si as ConversationChatPanel,
  ll as ConversationContextPanel,
  il as ConversationEmptyState,
  Wi as ConversationsSidebarList,
  Ni as EscalateSupportDialog,
  sl as FloatingChat,
  xn as LIB_VERSION,
  Kt as MessageRichText,
  Ai as NewConversationDialog,
  Fi as RequestSupportForm,
  Ci as ResolveSupportDialog,
  Fa as VoiceAudioEngine,
  Wa as VoiceAudioVisualizerCard,
  Ba as VoiceCallClient,
  Oa as VoiceCallConnecting,
  Va as VoiceCallControls,
  tn as VoiceCallDialog,
  Ga as VoiceCallEndedSummary,
  Ua as VoiceCallHeader,
  Ka as VoiceMinimizedIsland,
  qa as VoiceTranscriptList,
  Ha as VoiceWaveformCanvas,
  pt as activeConversationStore,
  Ra as buildVoiceWebSocketUrl,
  si as chatBotQueueStatusService,
  ii as chatBotQueueToTicketService,
  an as closeConversationService,
  ni as escalateChatSupportService,
  nn as getConversationSessionId,
  ui as hasMessengerPermission,
  Tr as playNotificationSound,
  Et as removeConversationSessionId,
  ri as requestChatSupportService,
  ai as resolveChatSupportService,
  hn as sanitizeUrl,
  Ar as saveConversationSessionId,
  as as useActiveConversation,
  Xa as useActiveVoiceCall,
  ci as useChatBotQueuePolling,
  di as useChatBotQueueToTicket,
  Je as useChatContext,
  Ze as useCheckHasPermissionMessenger,
  Ks as useCloseConversation,
  ti as useConversationChat,
  Ei as useConversationsPage,
  li as useEscalateChatSupport,
  zr as useOptionalChatContext,
  al as useRequiredActiveConversation,
  oi as useResolveChatSupport,
  ol as useShowConversation,
  $a as useVoiceCall,
  cl as useVoiceMicrophone,
  It as voiceCallStore
};
//# sourceMappingURL=index.js.map
