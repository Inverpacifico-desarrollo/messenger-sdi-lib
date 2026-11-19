"use client";
var sa = Object.defineProperty;
var ia = (t, r, n) => r in t ? sa(t, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[r] = n;
var je = (t, r, n) => ia(t, typeof r != "symbol" ? r + "" : r, n);
import { jsx as e, jsxs as i, Fragment as Fe } from "react/jsx-runtime";
import la, { forwardRef as ur, useState as k, useMemo as Ge, createContext as Pt, useEffect as re, useRef as W, useContext as Rt, useCallback as Y, useSyncExternalStore as gn, useLayoutEffect as oa } from "react";
import ca from "axios";
import { Bot as Dr, Users as mr, X as et, Loader2 as Je, Ticket as Pr, MapPin as da, Clock as zt, MicOff as Rr, Mic as jr, BookOpen as vn, CheckCircle2 as yt, Sparkles as Lr, ChevronsDown as Er, ImagePlus as ua, Camera as wn, Monitor as ma, WifiOff as yn, Send as Nn, Minimize2 as ha, PhoneOff as Br, ShieldCheck as hr, Star as Ir, AlertCircle as Vt, ThumbsUp as fa, ThumbsDown as pa, SendHorizontal as Gt, ArrowDown as ba, ArrowUp as xa, Maximize2 as ga, FlipHorizontal2 as va, SwitchCamera as wa, RotateCcw as kn, Upload as rn, RefreshCw as Fr, Lock as _t, ArrowLeft as $r, Phone as ya, Info as Na, ExternalLink as Cn, Check as Ur, Copy as ka, FileText as Ca, Download as Sa, CheckCheck as za, Paperclip as nn, Bold as _a, Italic as Aa, Underline as Ea, Strikethrough as Ia, List as Ta, ListOrdered as Ma, Code as Da, Link2 as Pa, EyeOff as Ra, Eye as ja, Type as La, ArrowRight as Ba, Headset as Fa, UploadCloud as $a, MessagesSquare as Hr, MessageSquarePlus as Ut, User as rr, Search as Sn, AlertTriangle as Wr, MessageCircleMore as Ua, LifeBuoy as Tr, ChevronRight as an, Tag as Ha, MessageSquare as Wa, Inbox as qa, CalendarDays as Oa } from "lucide-react";
import { twMerge as Va } from "tailwind-merge";
import { createPortal as qr } from "react-dom";
import { toast as Te } from "sonner";
import { parseISO as Or, isValid as Ga, isToday as Ka, isYesterday as Ja, isThisWeek as Xa, format as nr } from "date-fns";
import Ya from "pusher-js";
typeof globalThis < "u" && typeof globalThis.self > "u" && (globalThis.self = globalThis);
let Ze = null;
const Qa = (t) => {
  Ze = t;
}, Za = () => Ze != null && Ze.authToken ? { Authorization: `Bearer ${Ze.authToken}` } : {}, es = (t) => Object.entries(t).reduce((r, [n, a]) => (r[n] = typeof a == "boolean" ? Number(a) : a, r), {}), tt = (t, r) => {
  if (!Ze)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  return `${Ze.apiBaseUrl.replace(/\/+$/, "")}/${t}/api/${r}`;
}, ts = (t) => {
  try {
    const r = new URL(t.includes("://") ? t : `http://${t}`).hostname;
    return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(r) && r.split(".").every((a) => Number(a) <= 255);
  } catch {
    return !1;
  }
}, At = (t, r) => {
  if (!Ze)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const n = Ze.apiHelpdeskBaseUrl ? Ze.apiHelpdeskBaseUrl.replace(/\/+$/, "") : Ze.apiBaseUrl.replace(/\/+$/, "");
  return ts(n) ? `${n}/${t}/api/${r}` : `${n}/api/${r}`;
}, Ke = async ({
  data: t,
  url: r,
  params: n,
  method: a,
  headers: s,
  ...l
}) => {
  if (!Ze)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const o = {
    ...l,
    url: r,
    method: a,
    data: t,
    params: n ? es(n) : void 0,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...Ze.authToken ? { Authorization: `Bearer ${Ze.authToken}` } : {},
      ...s
    }
  };
  return ca.request(o);
}, rs = (t) => Ke({
  url: `${tt("messenger", "v1")}/users`,
  method: "GET",
  params: t
}), ns = (t) => Ke({
  url: `${tt("messenger", "v1")}/users/${t}/user`,
  method: "GET"
}), as = ({
  applicationId: t,
  userId: r
}) => Ke({
  url: `${tt("auth", "v1")}/users/${r}/permissions`,
  method: "GET",
  params: {
    application_id: t
  }
}), ss = () => Ke({
  url: `${tt("auth", "v1")}/me`,
  method: "GET"
});
function M(...t) {
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
  return t.forEach(n), Va(r.join(" "));
}
const ge = ur(
  ({ className: t, variant: r = "default", size: n = "default", type: a = "button", disabled: s, children: l, ...o }, d) => {
    const u = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer", m = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-xs",
      primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-xs",
      outline: "border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300",
      secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
    }, c = {
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
        className: M(u, m[r], c[n], t),
        ...o,
        children: l
      }
    );
  }
);
ge.displayName = "ChatButton";
const Vr = ur(
  ({ className: t, type: r = "text", disabled: n, ...a }, s) => /* @__PURE__ */ e(
    "input",
    {
      ref: s,
      type: r,
      disabled: n,
      className: M(
        "flex h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        t
      ),
      ...a
    }
  )
);
Vr.displayName = "ChatInput";
const Kt = ur(
  ({ className: t, disabled: r, ...n }, a) => /* @__PURE__ */ e(
    "textarea",
    {
      ref: a,
      disabled: r,
      className: M(
        "flex min-h-15 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        t
      ),
      ...n
    }
  )
);
Kt.displayName = "ChatTextarea";
function vt({ className: t, variant: r = "default", children: n, ...a }) {
  return /* @__PURE__ */ e("span", { className: M("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
  }[r], t), ...a, children: n });
}
function is(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].substring(0, 2).toUpperCase() : (r[0][0] + r[r.length - 1][0]).toUpperCase();
}
const sn = [
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
function ls(t) {
  if (!t) return "#62748e";
  let r = 0;
  for (let n = 0; n < (t || "").length; n++)
    r = (r << 5) - r + (t || "").charCodeAt(n), r |= 0;
  return sn[Math.abs(r) % sn.length];
}
function nt({
  src: t,
  name: r = "",
  size: n = "md",
  isGroup: a = !1,
  isBot: s = !1,
  status: l,
  className: o,
  ...d
}) {
  const [u, m] = k(!1), c = {
    xs: { box: "size-6", text: "text-[10px]", icon: "size-3.5", statusDot: "size-1.5" },
    sm: { box: "size-8", text: "text-xs", icon: "size-4", statusDot: "size-2" },
    md: { box: "size-10", text: "text-sm", icon: "size-5", statusDot: "size-2.5" },
    lg: { box: "size-12", text: "text-base", icon: "size-6", statusDot: "size-3" },
    xl: { box: "size-16", text: "text-xl", icon: "size-8", statusDot: "size-3.5" }
  }, { box: h, text: f, icon: p, statusDot: x } = c[n], w = is(r), g = Ge(() => ls(r), [r]), v = !!t && !u;
  return /* @__PURE__ */ i("div", { className: M("relative inline-block shrink-0", h, o), ...d, children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: M(
          "flex size-full items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          s && !v ? "bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-600 text-white shadow-violet-500/25 ring-1 ring-violet-400/30" : !v && (a ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "font-semibold text-xs")
        ),
        style: !v && !a && !s ? {
          backgroundColor: `${g}33`,
          color: `${g}FF`,
          fontWeight: "bold"
        } : void 0,
        children: v ? /* @__PURE__ */ e(
          "img",
          {
            src: t,
            alt: r || "Avatar",
            onError: () => m(!0),
            className: "size-full object-cover",
            loading: "lazy"
          }
        ) : s ? /* @__PURE__ */ e(Dr, { className: p }) : a ? /* @__PURE__ */ e(mr, { className: p }) : /* @__PURE__ */ e("span", { className: M("font-bold tracking-tight", f), children: w })
      }
    ),
    l && /* @__PURE__ */ e(
      "span",
      {
        className: M(
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
const zn = Pt(null);
function os() {
  const t = Rt(zn);
  if (!t)
    throw new Error("Los subcomponentes de Dialog deben usarse dentro de <Dialog>");
  return t;
}
function fr({ open: t, onOpenChange: r, children: n }) {
  return re(() => {
    if (!t) return;
    const a = (l) => {
      l.key === "Escape" && r(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", a), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", a);
    };
  }, [t, r]), /* @__PURE__ */ e(zn.Provider, { value: { open: t, onOpenChange: r }, children: n });
}
function pr({ className: t, children: r, showClose: n = !0, ...a }) {
  const { open: s, onOpenChange: l } = os(), o = W(null);
  return !s || typeof window > "u" ? null : qr(
    /* @__PURE__ */ e(
      "div",
      {
        ref: o,
        onClick: (u) => {
          u.target === o.current && l(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ i(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            className: M(
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
                  children: /* @__PURE__ */ e(et, { className: "size-4" })
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
function ar({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: M("flex flex-col gap-1.5 text-left p-5 pb-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", t), ...r });
}
function sr({ className: t, ...r }) {
  return /* @__PURE__ */ e("h3", { className: M("text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100", t), ...r });
}
function ir({ className: t, ...r }) {
  return /* @__PURE__ */ e("p", { className: M("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", t), ...r });
}
function lr({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: M("flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", t), ...r });
}
const _n = Pt(null);
function An() {
  const t = Rt(_n);
  if (!t)
    throw new Error("Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>");
  return t;
}
function cs({ open: t, onOpenChange: r, children: n }) {
  return re(() => {
    if (!t) return;
    const a = (l) => {
      l.key === "Escape" && r(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", a), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", a);
    };
  }, [t, r]), /* @__PURE__ */ e(_n.Provider, { value: { open: t, onOpenChange: r }, children: n });
}
function ds({ className: t, children: r, ...n }) {
  const { open: a, onOpenChange: s } = An(), l = W(null);
  return !a || typeof window > "u" ? null : qr(
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
            className: M(
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
function us({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: M("flex flex-col gap-2 text-left", t), ...r });
}
function ms({ className: t, ...r }) {
  return /* @__PURE__ */ e("h3", { className: M("text-sm font-bold text-neutral-900 dark:text-neutral-100", t), ...r });
}
function hs({ className: t, ...r }) {
  return /* @__PURE__ */ e("p", { className: M("text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", t), ...r });
}
function fs({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: M("flex items-center justify-end gap-2 mt-4", t), ...r });
}
function ps({
  className: t,
  onClick: r,
  children: n,
  ...a
}) {
  const { onOpenChange: s } = An();
  return /* @__PURE__ */ e(
    ge,
    {
      variant: "outline",
      size: "sm",
      onClick: (l) => {
        s(!1), r == null || r(l);
      },
      className: M("text-xs", t),
      ...a,
      children: n || "Cancelar"
    }
  );
}
function bs({
  className: t,
  variant: r = "danger",
  size: n = "sm",
  ...a
}) {
  return /* @__PURE__ */ e(ge, { variant: r, size: n, className: M("text-xs font-semibold", t), ...a });
}
Pt(null);
const En = Pt(null);
function xs() {
  const t = Rt(En);
  if (!t)
    throw new Error("Los subcomponentes de Tabs deben usarse dentro de <Tabs>");
  return t;
}
function In({
  value: t,
  defaultValue: r = "",
  onValueChange: n,
  className: a,
  children: s,
  ...l
}) {
  const [o, d] = k(r), u = t !== void 0, m = u ? t : o, c = u ? n : d;
  return /* @__PURE__ */ e(En.Provider, { value: { value: m, onValueChange: c }, children: /* @__PURE__ */ e("div", { className: M("flex flex-col gap-2 w-full", a), ...l, children: s }) });
}
function Tn({ className: t, children: r, ...n }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: M(
        "flex w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 text-neutral-500 dark:text-neutral-400 gap-1",
        t
      ),
      ...n,
      children: r
    }
  );
}
function or({ value: t, className: r, children: n, ...a }) {
  const { value: s, onValueChange: l } = xs(), o = s === t;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": o,
      onClick: () => l(t),
      className: M(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none cursor-pointer",
        o ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5",
        r
      ),
      ...a,
      children: n
    }
  );
}
const Jt = ur(
  ({ className: t, children: r, ...n }, a) => /* @__PURE__ */ e(
    "div",
    {
      ref: a,
      className: M(
        "relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]",
        t
      ),
      ...n,
      children: r
    }
  )
);
Jt.displayName = "ChatScrollArea";
function gs({
  orientation: t = "horizontal",
  className: r,
  ...n
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      role: "separator",
      "aria-orientation": t,
      className: M(
        "shrink-0 bg-neutral-200 dark:bg-neutral-800",
        t === "horizontal" ? "h-px w-full" : "h-full w-px",
        r
      ),
      ...n
    }
  );
}
function vs({ className: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: M(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100",
        t
      ),
      ...r
    }
  );
}
function me({ className: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: M(
        "animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80",
        t
      ),
      ...r
    }
  );
}
function ws({
  wsUrl: t,
  apiBaseUrl: r,
  host: n = "172.16.30.114",
  port: a,
  sessionId: s,
  userId: l,
  userAuthId: o,
  conversationId: d,
  senderMessengerId: u
}) {
  let m = "";
  if (t != null && t.trim()) {
    const f = t.trim().replace(/\/+$/, "");
    f.startsWith("http://") ? m = `ws://${f.slice(7)}` : f.startsWith("https://") ? m = `wss://${f.slice(8)}` : f.startsWith("ws://") || f.startsWith("wss://") ? m = f : m = `${typeof window < "u" && window.location.protocol === "https:" ? "wss://" : "ws://"}${f}`;
  } else if (r != null && r.trim())
    m = `${r.trim().replace(/\/+$/, "").replace(/^https:\/\//i, "wss://").replace(/^http:\/\//i, "ws://")}/messenger_voice/ws/voice/call`;
  else {
    const p = typeof window < "u" && window.location.protocol === "https:" ? "wss:" : "ws:", w = `:${a || 8095}`, g = n.replace(/^https?:\/\//i, "").replace(/^wss?:\/\//i, "").replace(/\/+$/, "");
    m = `${p}//${g}${w}/ws/voice/call`;
  }
  const c = new URLSearchParams();
  s && c.set("session_id", String(s)), o != null && String(o) !== "" && c.set("user_auth_id", String(o)), d != null && String(d) !== "" && c.set("conversation_id", String(d)), l != null && String(l) !== "" && c.set("user_id", String(l)), u != null && String(u) !== "" && c.set("sender_messenger_id", String(u));
  const h = c.toString();
  return h ? `${m}?${h}` : m;
}
const ys = `
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
function Ns() {
  const t = new Blob([ys], {
    type: "application/javascript; charset=utf-8"
  });
  return URL.createObjectURL(t);
}
class ks {
  constructor(r = {}) {
    je(this, "inputAudioCtx", null);
    je(this, "outputAudioCtx", null);
    je(this, "mediaStream", null);
    je(this, "analyserNode", null);
    je(this, "outputAnalyserNode", null);
    je(this, "workletNode", null);
    je(this, "scriptProcessor", null);
    je(this, "silentGain", null);
    je(this, "activeSources", /* @__PURE__ */ new Set());
    je(this, "nextPlayTime", 0);
    je(this, "isDisposed", !1);
    je(this, "isMuted", !1);
    je(this, "isDrainingFarewell", !1);
    je(this, "latestUserRms", 0);
    je(this, "latestBotRms", 0);
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
    var d, u, m;
    if (this.isDisposed) return;
    if (this.stopMicrophoneImmediate(), this.inputAudioCtx && this.inputAudioCtx.state !== "closed") {
      try {
        await this.inputAudioCtx.close();
      } catch {
      }
      this.inputAudioCtx = null;
    }
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
    let a;
    try {
      a = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: !0,
          noiseSuppression: !0,
          autoGainControl: !0
        }
      });
    } catch (c) {
      const h = c == null ? void 0 : c.name;
      if (h === "NotAllowedError" || h === "PermissionDeniedError")
        throw c;
      a = await navigator.mediaDevices.getUserMedia({ audio: !0 });
    }
    if (this.isDisposed || !this.inputAudioCtx || this.inputAudioCtx.state === "closed") {
      a.getTracks().forEach((c) => c.stop()), this.mediaStream = null;
      return;
    }
    this.mediaStream = a, a.getAudioTracks().forEach((c) => {
      c.enabled = !this.isMuted;
    });
    const s = this.inputAudioCtx.createMediaStreamSource(this.mediaStream), l = this.inputAudioCtx.createAnalyser();
    l.fftSize = 64, l.smoothingTimeConstant = 0.65, s.connect(l), this.analyserNode = l, (m = (u = this.options).onAnalyserReady) == null || m.call(u, l), this.silentGain = this.inputAudioCtx.createGain(), this.silentGain.gain.value = 0, this.silentGain.connect(this.inputAudioCtx.destination);
    let o = null;
    try {
      if (o = Ns(), await this.inputAudioCtx.audioWorklet.addModule(o), URL.revokeObjectURL(o), o = null, this.isDisposed || !this.inputAudioCtx || this.inputAudioCtx.state === "closed")
        return;
      this.workletNode = new AudioWorkletNode(this.inputAudioCtx, "pcm-capture-processor"), this.workletNode.port.onmessage = (c) => {
        var h, f, p;
        if (((h = c.data) == null ? void 0 : h.type) === "pcm_chunk") {
          const x = c.data.rms || 0, w = Math.min(1, x / 4e3);
          this.latestUserRms = this.isMuted ? 0 : w, !this.isMuted && !this.isDrainingFarewell && ((p = (f = this.options).onPcmChunk) == null || p.call(f, c.data.buffer, w));
        }
      }, s.connect(this.workletNode), this.workletNode.connect(this.silentGain);
    } catch (c) {
      if (o && URL.revokeObjectURL(o), this.isDisposed || !this.inputAudioCtx || this.inputAudioCtx.state === "closed")
        return;
      console.warn("[VoiceAudioEngine] AudioWorklet falló, usando ScriptProcessor fallback:", c), this.initScriptProcessorFallback(s);
    }
  }
  initScriptProcessorFallback(r) {
    if (!this.inputAudioCtx || !this.silentGain) return;
    const n = 4096;
    this.scriptProcessor = this.inputAudioCtx.createScriptProcessor(n, 1, 1);
    const l = this.inputAudioCtx.sampleRate / 16e3, o = 1600, d = new Int16Array(o);
    let u = 0;
    this.scriptProcessor.onaudioprocess = (m) => {
      var f, p;
      const c = m.inputBuffer.getChannelData(0), h = Math.floor(c.length / l);
      for (let x = 0; x < h; x++) {
        const w = c[Math.floor(x * l)], g = Math.max(-1, Math.min(1, w)), v = g < 0 ? g * 32768 : g * 32767;
        if (d[u++] = v, u >= o) {
          let b = 0;
          for (let S = 0; S < o; S++)
            b += d[S] * d[S];
          const y = Math.min(1, Math.sqrt(b / o) / 4e3);
          if (this.latestUserRms = this.isMuted ? 0 : y, !this.isMuted && !this.isDrainingFarewell) {
            const S = new Int16Array(d);
            (p = (f = this.options).onPcmChunk) == null || p.call(f, S.buffer, y);
          }
          u = 0;
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
    for (let m = 0; m < n.length; m++)
      a += n[m] * n[m];
    this.latestBotRms = Math.min(1, Math.sqrt(a / n.length) / 8e3);
    const s = new Float32Array(n.length);
    for (let m = 0; m < n.length; m++)
      s[m] = n[m] / 32768;
    const l = this.outputAudioCtx.createBuffer(1, s.length, 24e3);
    l.copyToChannel(s, 0);
    const o = this.outputAudioCtx.createBufferSource();
    o.buffer = l, this.outputAnalyserNode ? o.connect(this.outputAnalyserNode) : o.connect(this.outputAudioCtx.destination);
    const d = this.outputAudioCtx.currentTime, u = Math.max(d, this.nextPlayTime);
    o.start(u), this.nextPlayTime = u + l.duration, this.activeSources.add(o), o.onended = () => {
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
        var m;
        const o = Date.now(), d = ((m = this.outputAudioCtx) == null ? void 0 : m.currentTime) || 0;
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
class Cs {
  constructor(r, n = {}, a = {}) {
    je(this, "ws", null);
    je(this, "audioEngine");
    je(this, "connected", !1);
    je(this, "wasEverConnected", !1);
    je(this, "isDisposed", !1);
    je(this, "isCallFinalized", !1);
    je(this, "isSimulatingMicroCut", !1);
    je(this, "levelIntervalId", null);
    je(this, "heartbeatIntervalId", null);
    je(this, "microCutTimerId", null);
    je(this, "reconnectTimerId", null);
    this.config = r, this.callbacks = n, this.audioEngine = new ks({
      onAnalyserReady: a.onAnalyserReady,
      onOutputAnalyserReady: a.onOutputAnalyserReady,
      onPcmChunk: (s) => {
        var l;
        this.connected && !this.isSimulatingMicroCut && ((l = this.ws) == null ? void 0 : l.readyState) === WebSocket.OPEN && this.ws.send(s);
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
    var l, o, d, u;
    this.isDisposed = !1, this.isCallFinalized = !1, this.wasEverConnected = !1, this.isSimulatingMicroCut = !1;
    const r = ws(this.config);
    if (await this.audioEngine.initOutput(), this.isDisposed) {
      this.cleanup();
      return;
    }
    try {
      await this.audioEngine.initMicrophone(), this.isDisposed || (o = (l = this.callbacks).onPermissionChange) == null || o.call(l, !0);
    } catch (m) {
      if (this.isDisposed) return;
      const c = this.formatMicrophoneError(m);
      (u = (d = this.callbacks).onPermissionChange) == null || u.call(d, !1, c);
    }
    if (this.isDisposed) {
      this.cleanup();
      return;
    }
    let n = 0;
    const a = 3, s = () => {
      if (this.isDisposed || this.isCallFinalized) return;
      const m = new WebSocket(r);
      this.ws = m, m.binaryType = "arraybuffer";
      const c = () => {
        var h, f;
        return this.isDisposed || this.isCallFinalized ? !1 : this.reconnectTimerId ? !0 : n >= a ? !1 : (this.connected = !1, this.heartbeatIntervalId && (clearInterval(this.heartbeatIntervalId), this.heartbeatIntervalId = null), n++, (f = (h = this.callbacks).onReconnecting) == null || f.call(h, {
          message: "Estabilizando conexión de voz..."
        }), this.reconnectTimerId = setTimeout(() => {
          this.reconnectTimerId = null, !this.isDisposed && !this.isCallFinalized && s();
        }, 1500), !0);
      };
      m.onopen = () => {
        var f, p;
        if (this.ws !== m) return;
        const h = this.wasEverConnected;
        this.connected = !0, this.wasEverConnected = !0, n = 0, this.reconnectTimerId && (clearTimeout(this.reconnectTimerId), this.reconnectTimerId = null), this.heartbeatIntervalId && clearInterval(this.heartbeatIntervalId), this.heartbeatIntervalId = setInterval(() => {
          var x;
          this.connected && ((x = this.ws) == null ? void 0 : x.readyState) === WebSocket.OPEN && this.ws.send(JSON.stringify({ type: "ping" }));
        }, 2e4), h && ((p = (f = this.callbacks).onReconnected) == null || p.call(f, {
          message: "Conexión restablecida. Puedes continuar hablando."
        }));
      }, m.onmessage = (h) => {
        if (typeof h.data == "string")
          try {
            const f = JSON.parse(h.data);
            this.handleJsonEvent(f);
          } catch (f) {
            console.warn("[VoiceCallClient] Error parseando evento JSON:", f);
          }
        else h.data instanceof ArrayBuffer && this.audioEngine.playAudioChunk(h.data);
      }, m.onerror = () => {
        var h, f;
        this.ws === m && (c() || (f = (h = this.callbacks).onError) == null || f.call(h, new Error("Error de conexión con el servidor de voz.")));
      }, m.onclose = () => {
        var h, f;
        this.ws === m && (c() || (this.connected = !1, this.cleanup(), (f = (h = this.callbacks).onClose) == null || f.call(h)));
      };
    };
    s(), this.levelIntervalId = setInterval(() => {
      var h, f;
      const { userRms: m, botRms: c } = this.audioEngine.getLevelsAndDecay();
      (f = (h = this.callbacks).onLevels) == null || f.call(h, m, c);
    }, 33);
  }
  handleJsonEvent(r) {
    var a, s, l, o, d, u, m, c, h, f, p, x, w, g, v, b, y, S, $, z, I, J, U, T, B, A, P, D, j, q, Z, X, de, N, C, V, E, H;
    switch (r.type) {
      case "session.ready":
        (s = (a = this.callbacks).onReady) == null || s.call(a, r), r.caller_context && ((o = (l = this.callbacks).onCallerContext) == null || o.call(l, r.caller_context));
        break;
      case "transcript.user":
        (u = (d = this.callbacks).onTranscriptUser) == null || u.call(d, r.text || "", r.is_final);
        break;
      case "transcript.bot":
        (c = (m = this.callbacks).onTranscriptBot) == null || c.call(m, r.text || "", r.is_final);
        break;
      case "assistant.transcript":
        r.role === "user" ? (f = (h = this.callbacks).onTranscriptUser) == null || f.call(h, r.text || "", r.is_final) : (x = (p = this.callbacks).onTranscriptBot) == null || x.call(p, r.text || "", r.is_final);
        break;
      case "assistant.speaking":
        (g = (w = this.callbacks).onAssistantSpeaking) == null || g.call(w);
        break;
      case "assistant.turn_complete":
        (b = (v = this.callbacks).onTurnComplete) == null || b.call(v);
        break;
      case "article.matched":
        (S = (y = this.callbacks).onArticleMatched) == null || S.call(y, r.article || null);
        break;
      case "tool.state":
        (z = ($ = this.callbacks).onToolState) == null || z.call($, r);
        break;
      case "assistant.image_received":
        (J = (I = this.callbacks).onImageReceived) == null || J.call(I, r);
        break;
      case "guide.sent":
        (T = (U = this.callbacks).onGuideSent) == null || T.call(U, r);
        break;
      case "barge_in":
      case "assistant.interrupted":
        this.audioEngine.stopPlaybackImmediately(), (A = (B = this.callbacks).onBargeIn) == null || A.call(B);
        break;
      case "call.outcome":
        (D = (P = this.callbacks).onOutcome) == null || D.call(P, r);
        break;
      case "session.reconnecting":
        (q = (j = this.callbacks).onReconnecting) == null || q.call(j, r);
        break;
      case "session.reconnected":
        (X = (Z = this.callbacks).onReconnected) == null || X.call(Z, r);
        break;
      case "call.closing":
        (N = (de = this.callbacks).onClosing) == null || N.call(de, r), this.audioEngine.waitForAudioPlaybackDrain().then(() => {
          var F;
          if (((F = this.ws) == null ? void 0 : F.readyState) === WebSocket.OPEN)
            return this.hangup({ autoHangup: !0 });
        }).catch((F) => {
          console.warn("[VoiceCallClient] Error en drenado de audio de cierre:", F);
        });
        break;
      case "call.finalized":
        this.isCallFinalized = !0, (V = (C = this.callbacks).onFinalized) == null || V.call(C, r);
        break;
      case "call.timeout":
      case "call.idle_timeout":
        (H = (E = this.callbacks).onError) == null || H.call(
          E,
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
          var u;
          if (typeof d.data == "string")
            try {
              JSON.parse(d.data).type === "call.finalized" && ((u = this.ws) == null || u.removeEventListener("message", l), s());
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
  formatMicrophoneError(r) {
    const n = r == null ? void 0 : r.name;
    return n === "NotAllowedError" || n === "PermissionDeniedError" ? "Permiso de micrófono denegado. Por favor habilita el acceso al micrófono en tu navegador." : `Error al acceder al micrófono: ${r instanceof Error ? r.message : String(r)}`;
  }
  async retryMicrophone() {
    var r, n, a, s;
    if (this.isDisposed) return !1;
    try {
      return await this.audioEngine.initMicrophone(), this.isDisposed ? !1 : ((n = (r = this.callbacks).onPermissionChange) == null || n.call(r, !0), !0);
    } catch (l) {
      if (this.isDisposed) return !1;
      const o = this.formatMicrophoneError(l);
      return (s = (a = this.callbacks).onPermissionChange) == null || s.call(a, !1, o), !1;
    }
  }
  /**
   * Simula un micro-corte de red temporal (p.ej. 2s) pausando tramas PCM
   * y emitiendo la secuencia session.reconnecting -> session.reconnected
   * sin cortar AudioEngine ni finalizar la sesión.
   */
  simulateMicroCut(r = 2e3) {
    this.isDisposed || this.isCallFinalized || this.isSimulatingMicroCut || (this.isSimulatingMicroCut = !0, this.handleJsonEvent({
      type: "session.reconnecting",
      message: "Estabilizando conexión de voz..."
    }), this.microCutTimerId = setTimeout(() => {
      if (this.microCutTimerId = null, this.isDisposed || this.isCallFinalized) {
        this.isSimulatingMicroCut = !1;
        return;
      }
      this.isSimulatingMicroCut = !1, this.handleJsonEvent({
        type: "session.reconnected",
        message: "Conexión restablecida. Puedes continuar hablando."
      });
    }, r));
  }
  cleanup() {
    if (this.isDisposed = !0, this.connected = !1, this.isSimulatingMicroCut = !1, this.levelIntervalId && (clearInterval(this.levelIntervalId), this.levelIntervalId = null), this.heartbeatIntervalId && (clearInterval(this.heartbeatIntervalId), this.heartbeatIntervalId = null), this.microCutTimerId && (clearTimeout(this.microCutTimerId), this.microCutTimerId = null), this.reconnectTimerId && (clearTimeout(this.reconnectTimerId), this.reconnectTimerId = null), this.audioEngine.dispose(), this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      const r = this.ws;
      this.ws = null, r.close();
    }
  }
}
const kr = 200 * 1024;
function tr(t) {
  const r = t.indexOf(","), n = r !== -1 ? t.slice(r + 1) : t;
  return Math.ceil(n.length * 3 / 4);
}
function Cr(t, r, n) {
  const a = document.createElement("canvas"), s = 1024;
  let l = r || 1280, o = n || 720;
  if (l > s || o > s) {
    const m = Math.min(s / l, s / o);
    l = Math.max(1, Math.round(l * m)), o = Math.max(1, Math.round(o * m));
  }
  const d = (m, c, h) => {
    a.width = m, a.height = c;
    const f = a.getContext("2d");
    return f == null || f.drawImage(t, 0, 0, m, c), a.toDataURL("image/jpeg", h);
  };
  let u = d(l, o, 0.8);
  if (tr(u) < kr)
    return u;
  for (const m of [0.65, 0.5, 0.38])
    if (u = d(l, o, m), tr(u) < kr)
      return u;
  for (let m = 0; m < 3; m++) {
    l = Math.max(160, Math.round(l * 0.8)), o = Math.max(120, Math.round(o * 0.8));
    for (const c of [0.65, 0.5, 0.38])
      if (u = d(l, o, c), tr(u) < kr)
        return u;
  }
  return u;
}
function Ss({
  open: t,
  sessionId: r,
  conversationId: n,
  userId: a,
  userAuthId: s,
  senderMessengerId: l,
  wsUrl: o,
  onOpenChange: d,
  onCallEnded: u
}) {
  var en, tn;
  const m = Kr(), [c, h] = k("idle"), [f, p] = k("Conectando con el Asistente de Voz..."), [x, w] = k(!1), [g, v] = k(!1), [b, y] = k(0), [S, $] = k(null), [z, I] = k(null), [J, U] = k(null), [T, B] = k(null), [A, P] = k(0), [D, j] = k(0), [q, Z] = k([]), [X, de] = k(null), [N, C] = k(null), [V, E] = k(null), [H, F] = k(null), [ce, xe] = k(null), [te, we] = k(!1), [pe, ue] = k(null), [Ve, Le] = k("completed"), [Ce, Me] = k(null), [We, Re] = k(!1), [Ue, Xe] = k(!1), [bt, st] = k(null), [ut, it] = k(null), [R, be] = k("environment"), [he, se] = k(null), [ee, De] = k(""), [Ie, rt] = k(0), ye = W(null), mt = W(null), Q = W("idle"), lt = W(null), xt = W(null), L = W(!1), Ne = W("completed"), Se = W(null), _e = W(d), Ae = W(u), Pe = W(null), G = W(null), ie = W(null), ne = W(!1);
  re(() => {
    Q.current = c;
  }, [c]), re(() => {
    _e.current = d, Ae.current = u, Ne.current = Ve, Se.current = pe;
  });
  const fe = Ge(() => t ? `${r || "call"}_${Date.now()}` : r || "call", [t, r, Ie]), ve = Y((O, oe = 4500) => {
    F(O), xt.current && clearTimeout(xt.current), xt.current = setTimeout(() => {
      F(null);
    }, oe);
  }, []), He = Y(() => {
    lt.current && (clearInterval(lt.current), lt.current = null);
  }, []), K = Y(() => {
    mt.current && (mt.current.getTracks().forEach((O) => O.stop()), mt.current = null), st(null), it(null), Xe(!1);
  }, []), qe = Y((O = !1) => {
    if (ie.current && (clearInterval(ie.current), ie.current = null), G.current) {
      const oe = G.current;
      O && Z((Ee) => {
        const ae = Ee.findIndex((_) => _.id === oe.id);
        if (ae !== -1) {
          const _ = [...Ee];
          return _[ae] = {
            ..._[ae],
            text: oe.fullTargetText,
            isFinal: !0
          }, _;
        }
        return Ee;
      });
    }
    G.current = null, ne.current = !1;
  }, []), ke = Y((O, oe) => {
    const Ee = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    if (ne.current && (qe(!0), ne.current = !1), Pe.current = null, G.current)
      G.current.fullTargetText += O, oe && (G.current.isFinal = !0);
    else {
      const ae = `bot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      G.current = {
        id: ae,
        fullTargetText: O,
        displayedLength: 0,
        timestamp: Ee,
        isFinal: !!oe
      }, Z((_) => [
        ..._,
        {
          id: ae,
          sender: "assistant",
          text: "",
          timestamp: Ee,
          isFinal: !1
        }
      ]);
    }
    ie.current || (ie.current = setInterval(() => {
      const ae = G.current;
      if (!ae) {
        ie.current && (clearInterval(ie.current), ie.current = null);
        return;
      }
      const _ = ae.fullTargetText.length;
      if (ae.displayedLength < _) {
        const le = _ - ae.displayedLength, Be = le > 100 ? 3 : le > 45 ? 2 : 1;
        ae.displayedLength = Math.min(_, ae.displayedLength + Be);
        const $e = ae.fullTargetText.slice(0, ae.displayedLength), ht = ae.displayedLength >= _ && ae.isFinal;
        Z((Ct) => {
          const gt = Ct.findIndex((aa) => aa.id === ae.id);
          if (gt === -1) return Ct;
          const Nr = [...Ct];
          return Nr[gt] = {
            ...Nr[gt],
            text: $e,
            isFinal: ht
          }, Nr;
        }), ht && (ie.current && (clearInterval(ie.current), ie.current = null), G.current = null, ne.current = !1);
      } else ae.isFinal && (Z((le) => {
        const Be = le.findIndex(($e) => $e.id === ae.id);
        if (Be !== -1 && !le[Be].isFinal) {
          const $e = [...le];
          return $e[Be] = { ...$e[Be], isFinal: !0 }, $e;
        }
        return le;
      }), ie.current && (clearInterval(ie.current), ie.current = null), G.current = null, ne.current = !1);
    }, 32));
  }, [qe]), Oe = Y(
    (O, oe) => {
      var _, le, Be;
      if (L.current) return;
      L.current = !0, He(), qe(!1), K(), (_ = ye.current) == null || _.cleanup(), ye.current = null;
      const Ee = O || Ne.current || "completed", ae = oe !== void 0 ? oe : Se.current;
      (le = Ae.current) == null || le.call(Ae, {
        outcome: Ee,
        data: ae
      }), (Be = _e.current) == null || Be.call(_e, !1);
    },
    [He, qe, K]
  );
  re(() => {
    var oe, Ee, ae;
    if (!t) {
      (oe = ye.current) == null || oe.cleanup(), ye.current = null, He(), qe(!1), K(), Pe.current = null, ne.current = !1, h("idle"), v(!1), xe(null), we(!1), U(null), B(null), P(0), j(0), se(null);
      return;
    }
    L.current = !1, h("connecting"), Q.current = "connecting", p("Conectando con el Asistente de Voz..."), y(0), Z([]), qe(!1), K(), Pe.current = null, ne.current = !1, de(null), C(null), E(null), F(null), xe(null), we(!1), ue(null), Se.current = null, se(null), Le("completed"), Ne.current = "completed", Me(null), Re(!1), w(!1), v(!1), $(null), I(null);
    const O = new Cs(
      {
        wsUrl: o || ((Ee = m == null ? void 0 : m.config) == null ? void 0 : Ee.voiceWsUrl),
        apiBaseUrl: (ae = m == null ? void 0 : m.config) == null ? void 0 : ae.apiBaseUrl,
        sessionId: fe,
        conversationId: n,
        userId: a,
        userAuthId: s,
        senderMessengerId: l
      },
      {
        onReady: (_) => {
          _.session_id && se(_.session_id), xe(null), we(!1), h("listening"), Q.current = "listening", p("Te escucho... Habla con naturalidad."), _.caller_context && de(_.caller_context), lt.current || (lt.current = setInterval(() => {
            y((le) => le + 1);
          }, 1e3));
        },
        onCallerContext: (_) => {
          de(_);
        },
        onPermissionChange: (_, le) => {
          $(_), I(_ ? null : le || "Permiso de micrófono no otorgado");
        },
        onTranscriptUser: (_, le) => {
          Q.current !== "escalating" && Q.current !== "resolved" && (h("thinking"), Q.current = "thinking", p("Procesando consulta...")), qe(!0), ne.current = !1;
          const Be = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          if (Pe.current) {
            const $e = Pe.current;
            Z((ht) => {
              const Ct = ht.findIndex((gt) => gt.id === $e);
              if (Ct !== -1) {
                const gt = [...ht];
                return gt[Ct] = {
                  ...gt[Ct],
                  text: _,
                  isFinal: le ?? !0
                }, gt;
              }
              return [
                ...ht,
                {
                  id: $e,
                  sender: "user",
                  text: _,
                  timestamp: Be,
                  isFinal: le ?? !0
                }
              ];
            });
          } else {
            const $e = `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
            Pe.current = $e, Z((ht) => [
              ...ht,
              {
                id: $e,
                sender: "user",
                text: _,
                timestamp: Be,
                isFinal: le ?? !0
              }
            ]);
          }
          le && (Pe.current = null);
        },
        onTranscriptBot: (_, le) => {
          Q.current !== "escalating" && Q.current !== "resolved" && (h("speaking"), Q.current = "speaking", p("Asistente respondiendo...")), ke(_, le);
        },
        onAssistantSpeaking: () => {
          Q.current !== "escalating" && Q.current !== "resolved" && (h("speaking"), Q.current = "speaking", p("Asistente respondiendo..."));
        },
        onTurnComplete: () => {
          ne.current = !0, G.current && (G.current.isFinal = !0, G.current.displayedLength >= G.current.fullTargetText.length && qe(!0)), Q.current !== "ended" && Q.current !== "escalating" && Q.current !== "resolved" && (h("listening"), Q.current = "listening", p("Te escucho..."));
        },
        onArticleMatched: (_) => {
          C(_);
        },
        onToolState: (_) => {
          E(_.status === "running" ? _ : null), _.status === "running" ? _.tool === "search_knowledge_base" ? p("Consultando Base de Conocimiento...") : _.tool === "send_steps_to_chat" ? p("Enviando guía visual al chat...") : _.tool === "append_ticket_note" ? p("Actualizando nota en ticket...") : _.tool === "escalate_to_human" ? (h("escalating"), Q.current = "escalating", p("Registrando expediente y escalando a técnico...")) : _.tool === "resolve_voice_session" && (h("resolved"), Q.current = "resolved", p("Registrando solución exitosa...")) : _.status === "done" && Q.current !== "escalating" && Q.current !== "resolved" && (h("speaking"), Q.current = "speaking", p("Asistente respondiendo..."));
        },
        onImageReceived: (_) => {
          const le = "Captura recibida y analizada por el asistente", Be = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          Z(($e) => [
            ...$e,
            {
              id: `bot-img-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
              sender: "assistant",
              text: le,
              timestamp: Be,
              isFinal: !0
            }
          ]), ve((_ == null ? void 0 : _.message) || le);
        },
        onGuideSent: () => {
          ve("Guía con pasos enviada al chat de Messenger", 5e3);
        },
        onBargeIn: () => {
          if (G.current) {
            const _ = G.current;
            ie.current && (clearInterval(ie.current), ie.current = null), Z((le) => {
              const Be = le.findIndex(($e) => $e.id === _.id);
              if (Be !== -1) {
                const $e = [...le];
                return $e[Be] = {
                  ...$e[Be],
                  text: _.fullTargetText.slice(0, _.displayedLength),
                  isFinal: !0
                }, $e;
              }
              return le;
            }), G.current = null;
          }
          ne.current = !1, Pe.current = null, h("listening"), Q.current = "listening", p("Te escucho...");
        },
        onOutcome: (_) => {
          Le(_.outcome), Ne.current = _.outcome, _.data && (ue(_.data), Se.current = _.data), _.outcome.startsWith("escalated") ? (h("escalating"), Q.current = "escalating", p("Solicitud transferida. El asistente se está despidiendo...")) : _.outcome === "resolved" && (h("resolved"), Q.current = "resolved", p("¡Problema resuelto! El asistente se está despidiendo..."));
        },
        onClosing: () => {
          p("Despidiéndose y finalizando llamada...");
        },
        onReconnecting: (_) => {
          if (Q.current === "ended") return;
          const le = (_ == null ? void 0 : _.message) || "Estabilizando conexión de voz...";
          h("reconnecting"), Q.current = "reconnecting", p(le), xe(le);
        },
        onReconnected: (_) => {
          if (Q.current === "ended") return;
          we(!1), xe(null), h("listening"), Q.current = "listening";
          const le = (_ == null ? void 0 : _.message) || "Conexión restablecida. Puedes continuar hablando.";
          p(le), ve(le, 4500);
        },
        onFinalized: (_) => {
          He(), qe(!0), K(), xe(null), we(!1), Me(_), _.outcome && (Le(_.outcome), Ne.current = _.outcome), _.finalize && (ue(_.finalize), Se.current = _.finalize), h("ended"), Q.current = "ended", v(!1), p(_.message || "Llamada finalizada.");
        },
        onError: (_) => {
          Q.current !== "ended" && (p(_.message), Q.current === "connecting" && (h("error"), Q.current = "error"));
        },
        onClose: () => {
          Q.current !== "ended" && (He(), qe(!0), K(), xe(null), we(!1), h("ended"), Q.current = "ended", v(!1), p("Llamada terminada"));
        },
        onLevels: (_, le) => {
          P(_), j(le);
        }
      },
      {
        onAnalyserReady: (_) => U(_),
        onOutputAnalyserReady: (_) => B(_)
      }
    );
    return ye.current = O, O.start().catch((_) => {
      ye.current === O && (console.error("[useVoiceCall] Error al iniciar cliente:", _), p("No se pudo iniciar la llamada. Verifica el micrófono y la conexión."));
    }), () => {
      O.cleanup(), ye.current === O && (ye.current = null), He(), qe(!1), K(), xt.current && clearTimeout(xt.current);
    };
  }, [
    t,
    fe,
    n,
    a,
    s,
    l,
    o,
    (en = m == null ? void 0 : m.config) == null ? void 0 : en.voiceWsUrl,
    (tn = m == null ? void 0 : m.config) == null ? void 0 : tn.apiBaseUrl,
    He,
    qe,
    K,
    ke,
    ve
  ]);
  const ze = Y(() => {
    var oe;
    const O = !x;
    w(O), (oe = ye.current) == null || oe.setMuted(O);
  }, [x]), Nt = Y(() => {
    if (ye.current) {
      ye.current.retryMicrophone();
      return;
    }
    rt((O) => O + 1);
  }, []), ot = Y(() => {
    if (S === !1) {
      Nt();
      return;
    }
    ze();
  }, [S, Nt, ze]), kt = Y(async () => {
    if (L.current) return;
    if (Q.current === "ended") {
      Oe();
      return;
    }
    He(), h("ended"), Q.current = "ended", v(!1), p("Llamada finalizada");
    const O = ye.current;
    ye.current = null;
    try {
      O && await O.hangup({ autoHangup: !1 });
    } catch (oe) {
      console.warn("[useVoiceCall] Error durante hangup:", oe);
    }
  }, [Oe, He]), Vn = Y(
    (O, oe) => {
      Oe(O, oe);
    },
    [Oe]
  ), Gn = Y(
    (O) => {
      if (!O) {
        if (Q.current === "ended") {
          Oe();
          return;
        }
        if (Q.current === "connecting" || Q.current === "error") {
          Oe();
          return;
        }
        v(!0);
        return;
      }
      d(O);
    },
    [Oe, d]
  ), Kn = Y(
    (O) => {
      O == null || O.preventDefault();
      const oe = ee.trim();
      if (!oe || !ye.current) return;
      qe(!0), Pe.current = null, ne.current = !1, ye.current.sendTextPrompt(oe);
      const Ee = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      Z((ae) => [
        ...ae,
        {
          id: `user-txt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          sender: "user",
          text: oe,
          timestamp: Ee,
          isFinal: !0
        }
      ]), De("");
    },
    [ee, qe]
  ), Jn = Y(async () => {
    if (!(We || !ye.current))
      try {
        Re(!0);
        const O = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: "always" },
          audio: !1
        }), oe = O.getVideoTracks()[0], Ee = document.createElement("video");
        Ee.srcObject = O, await Ee.play();
        const ae = Cr(
          Ee,
          Ee.videoWidth || 1280,
          Ee.videoHeight || 720
        );
        oe.stop(), O.getTracks().forEach((_) => _.stop()), ye.current.sendImage(ae, "image/jpeg"), ve("Captura de pantalla enviada al asistente");
      } catch (O) {
        (O == null ? void 0 : O.name) !== "NotAllowedError" && console.warn("[useVoiceCall] Error en captura de pantalla:", O);
      } finally {
        Re(!1);
      }
  }, [We, ve]), br = Y(
    async (O) => {
      var Ee;
      if (!ye.current) return;
      const oe = O === "user" || O === "environment" ? O : R;
      if (K(), !((Ee = navigator.mediaDevices) != null && Ee.getUserMedia)) {
        it(
          "Tu navegador no permite acceso directo a la cámara. Puedes subir una foto desde tu equipo."
        ), Xe(!0);
        return;
      }
      try {
        let ae;
        try {
          ae = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: oe },
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: !1
          });
        } catch (_) {
          const le = _ == null ? void 0 : _.name;
          if (le === "NotAllowedError" || le === "PermissionDeniedError")
            throw _;
          ae = await navigator.mediaDevices.getUserMedia({ video: !0, audio: !1 });
        }
        mt.current = ae, st(ae), it(null), Xe(!0);
      } catch (ae) {
        const _ = ae == null ? void 0 : ae.name, le = _ === "NotAllowedError" || _ === "PermissionDeniedError" ? "Permiso de cámara denegado en el navegador. Habilita la cámara o sube una foto desde tu equipo." : "No se detectó cámara activa. Puedes subir una foto desde tu equipo.";
        st(null), it(le), Xe(!0), console.warn("[useVoiceCall] Error al abrir cámara:", ae);
      }
    },
    [R, K]
  ), Xn = Y(() => {
    const O = R === "environment" ? "user" : "environment";
    be(O), br(O);
  }, [R, br]), Yn = Y(() => {
    K();
  }, [K]), xr = Y(
    (O) => {
      if (!O) return null;
      const oe = Cr(
        O,
        O.videoWidth || 1280,
        O.videoHeight || 720
      ), Ee = Math.max(1, Math.round(tr(oe) / 1024));
      return { dataUrl: oe, sizeKb: Ee };
    },
    []
  ), gr = Y(
    (O) => {
      !O || !ye.current || (ye.current.sendImage(O, "image/jpeg"), K(), ve("Foto enviada al asistente"));
    },
    [K, ve]
  ), Qn = Y(
    (O) => {
      const oe = xr(O);
      oe && gr(oe.dataUrl);
    },
    [xr, gr]
  ), Zn = Y(
    (O) => {
      var ae;
      const oe = (ae = O.target.files) == null ? void 0 : ae[0];
      if (!oe || !ye.current) return;
      const Ee = new FileReader();
      Ee.onload = (_) => {
        var $e;
        const le = ($e = _.target) == null ? void 0 : $e.result;
        if (!le || !ye.current) return;
        const Be = new Image();
        Be.onload = () => {
          if (!ye.current) return;
          const ht = Cr(
            Be,
            Be.naturalWidth || Be.width || 1280,
            Be.naturalHeight || Be.height || 720
          );
          ye.current.sendImage(ht, "image/jpeg"), K(), ve("Foto enviada al asistente");
        }, Be.src = le;
      }, Ee.readAsDataURL(oe), O.target.value = "";
    },
    [K, ve]
  ), ea = Y(() => {
    !ye.current || Q.current === "ended" || Q.current === "connecting" || (we(!0), ye.current.simulateMicroCut(2e3));
  }, []), ta = Ge(() => {
    const O = Math.floor(b / 60), oe = b % 60;
    return `${String(O).padStart(2, "0")}:${String(oe).padStart(2, "0")}`;
  }, [b]), vr = Ge(() => {
    var oe, Ee, ae, _;
    const O = ((oe = pe == null ? void 0 : pe.ticket) == null ? void 0 : oe.number) || (pe == null ? void 0 : pe.ticket_number) || ((Ee = Ce == null ? void 0 : Ce.finalize) == null ? void 0 : Ee.ticket_number) || (X == null ? void 0 : X.ticket_number) || null;
    return {
      sessionId: he || fe,
      terminalId: (X == null ? void 0 : X.terminal_id) || null,
      ticketNumber: O,
      serviceName: (X == null ? void 0 : X.service_name) || null,
      posLocation: ((ae = X == null ? void 0 : X.user) == null ? void 0 : ae.place_name) || null,
      openTicketsCount: ((_ = X == null ? void 0 : X.recent_open_tickets) == null ? void 0 : _.length) || 0
    };
  }, [he, fe, X, pe, Ce]), ra = Ge(() => he || vr.sessionId || fe || r, [he, vr.sessionId, fe, r]), wr = c === "ended", yr = c === "connecting" || c === "requesting_permission" || c === "idle", na = Ge(() => x || yr || wr || S === !1 ? 0 : A < 0.02 ? 1 : Math.min(8, Math.max(1, Math.round(A * 10) + 1)), [x, yr, wr, S, A]);
  return {
    callState: c,
    statusText: f,
    isMuted: x,
    isMinimized: g,
    setIsMinimized: v,
    isEnded: wr,
    isConnecting: yr,
    durationSeconds: b,
    formattedDuration: ta,
    hasPermission: S,
    micError: z,
    activeSessionId: ra,
    closeModalSafely: Oe,
    analyserNode: J,
    outputAnalyserNode: T,
    userRms: A,
    botRms: D,
    activeVUSegments: na,
    transcripts: q,
    contextBadges: vr,
    callerContext: X,
    matchedArticle: N,
    activeTool: V,
    noticeBanner: H,
    reconnectingBanner: ce,
    isSimulatingMicroCut: te,
    outcomeType: Ve,
    outcomeData: pe,
    finalizedData: Ce,
    isCapturingScreen: We,
    isCameraOpen: Ue,
    cameraStream: bt,
    cameraError: ut,
    cameraFacingMode: R,
    textInput: ee,
    setTextInput: De,
    handleToggleMute: ze,
    handleHeroMicClick: ot,
    handleHangup: kt,
    handleDismissEndedCall: Vn,
    handleDialogCloseAttempt: Gn,
    handleSendTextPrompt: Kn,
    handleCaptureScreen: Jn,
    handleOpenCamera: br,
    handleSwitchCamera: Xn,
    handleCaptureCameraPreview: xr,
    handleSendCapturedDataUrl: gr,
    handleTakeCameraPhoto: Qn,
    handleCloseCamera: Yn,
    handlePhotoUpload: Zn,
    handleSimulateMicroCut: ea,
    requestMicrophone: Nt
  };
}
function zs({
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
        /* @__PURE__ */ e(nt, { name: "Asistente de Voz SDi", isBot: !0, size: "md" }),
        /* @__PURE__ */ e(
          "span",
          {
            className: M(
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
            /* @__PURE__ */ e(Je, { className: "size-2.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "CONECTANDO..." })
          ] }) : l ? /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80", children: [
            /* @__PURE__ */ e(Je, { className: "size-2.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "RECONECTANDO..." })
          ] }) : /* @__PURE__ */ e("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/80", children: "EN VIVO" }),
          s.ticketNumber && !r && !n && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80", children: [
            /* @__PURE__ */ e(Pr, { className: "size-2.5 text-amber-500" }),
            /* @__PURE__ */ i("span", { children: [
              "Ticket #",
              s.ticketNumber
            ] })
          ] }),
          s.posLocation && !r && !n && /* @__PURE__ */ i("span", { className: "hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200/80 max-w-44 truncate", children: [
            /* @__PURE__ */ e(da, { className: "size-2.5 text-blue-500 shrink-0" }),
            /* @__PURE__ */ e("span", { className: "truncate", children: s.posLocation })
          ] })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-xs text-neutral-400 mt-0.5 truncate", children: n ? "Resumen de atención completada" : r ? "Estableciendo canal telefónico interactivo..." : "Canal telefónico full-duplex de baja latencia" })
      ] })
    ] }),
    !r && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-neutral-50/80 px-3 py-1.5 text-xs font-mono font-semibold text-neutral-700 shadow-2xs", children: [
      /* @__PURE__ */ e(zt, { className: "size-3.5 text-neutral-500" }),
      /* @__PURE__ */ e("span", { children: a })
    ] }) })
  ] });
}
function _s({
  state: t,
  isMuted: r = !1,
  className: n = "",
  height: a = 72,
  analyserNode: s = null,
  outputAnalyserNode: l = null,
  botRms: o = 0,
  hasPermission: d = null
}) {
  const u = W(null), m = W(null), c = W(0), h = W(null), f = W(null), p = W(null), x = W(o);
  re(() => {
    x.current = o;
  }, [o]), re(() => {
    const g = u.current;
    if (!g) return;
    const v = g.getContext("2d");
    if (!v) return;
    const b = window.devicePixelRatio || 1, y = g.getBoundingClientRect();
    g.width = y.width * b, g.height = y.height * b, v.scale(b, b);
    const S = y.width, $ = y.height, z = $ / 2, I = 38, J = 2.5, U = 3, T = I * J + (I - 1) * U, B = Math.max(0, (S - T) / 2);
    (!p.current || p.current.length !== I) && (p.current = new Float32Array(I), p.current.fill(2.5));
    const A = (D, j, q, Z) => {
      v.fillStyle = Z, v.beginPath(), typeof v.roundRect == "function" ? v.roundRect(D, j, J, q, J / 2) : v.rect(D, j, J, q), v.fill();
    }, P = () => {
      v.clearRect(0, 0, S, $);
      const D = p.current;
      if (t === "muted" || r || d === !1) {
        const j = "rgba(209, 213, 219, 0.65)";
        for (let q = 0; q < I; q++) {
          D[q] = 2.5;
          const Z = B + q * (J + U);
          A(Z, z - 1.25, 2.5, j);
        }
      } else if (t === "speaking") {
        const j = x.current;
        let q = 0, Z = !1;
        if (l) {
          (!f.current || f.current.length !== l.frequencyBinCount) && (f.current = new Uint8Array(l.frequencyBinCount));
          const C = f.current;
          l.getByteFrequencyData(C);
          let V = 0;
          for (let E = 0; E < C.length; E++)
            V += C[E];
          q = V / (C.length * 255), Z = q > 0.015;
        }
        const X = Math.max(Z ? q * 1.6 : 0, j);
        c.current += 0.09 + X * 0.14;
        const de = Math.max(12, X * 32), N = X > 0.02 ? "rgba(16, 185, 129, 0.95)" : "rgba(16, 185, 129, 0.70)";
        for (let C = 0; C < I; C++) {
          const V = B + C * (J + U), E = C / (I - 1) * 2 - 1, H = Math.max(0.22, 1 - Math.pow(E, 2)), F = Math.abs(E);
          let ce = 0;
          if (Z && f.current) {
            const pe = f.current, ue = Math.min(
              pe.length - 1,
              Math.floor((1 - F * 0.7) * (pe.length * 0.65))
            );
            ce = pe[ue] / 255 * 1.5;
          }
          const xe = Math.sin(C * 0.44 + c.current) * 0.45 + Math.cos(C * 0.32 - c.current * 0.75) * 0.35 + Math.sin(C * 0.72 + c.current * 1.1) * 0.2 + 0.5, te = Math.max(
            4,
            de * (0.6 + ce * 0.8) * H * Math.abs(xe)
          );
          D[C] += (te - D[C]) * 0.38;
          const we = Math.max(3.5, Math.min($ - 4, D[C]));
          A(V, z - we / 2, we, N);
        }
      } else if ((t === "listening" || t === "connected") && s) {
        (!h.current || h.current.length !== s.frequencyBinCount) && (h.current = new Uint8Array(s.frequencyBinCount));
        const j = h.current;
        s.getByteFrequencyData(j);
        let q = 0;
        for (let N = 0; N < j.length; N++)
          q += j[N];
        const Z = q / (j.length * 255), X = Z > 0.025, de = X ? "rgba(16, 185, 129, 0.95)" : "rgba(16, 185, 129, 0.45)";
        for (let N = 0; N < I; N++) {
          const C = B + N * (J + U), V = N / (I - 1) * 2 - 1, E = Math.max(0.18, 1 - Math.pow(V, 2)), H = Math.abs(V), F = Math.min(
            j.length - 1,
            Math.floor((1 - H * 0.75) * (j.length * 0.6))
          ), ce = j[F] / 255, xe = X ? Math.max(2.5, (ce * 26 + Z * 10) * E * 1.6) : 2.5;
          D[N] += (xe - D[N]) * 0.35;
          const te = Math.max(2.5, Math.min($ - 4, D[N]));
          A(C, z - te / 2, te, de);
        }
      } else {
        const j = t === "connecting" || t === "thinking" || t === "reconnecting" ? "rgba(16, 185, 129, 0.4)" : "rgba(209, 213, 219, 0.65)";
        for (let q = 0; q < I; q++) {
          D[q] = 2.5;
          const Z = B + q * (J + U);
          A(Z, z - 1.25, 2.5, j);
        }
      }
      m.current = requestAnimationFrame(P);
    };
    return P(), () => {
      m.current && cancelAnimationFrame(m.current);
    };
  }, [t, r, s, l, d]);
  const w = typeof a == "number" ? `${a}px` : a;
  return /* @__PURE__ */ e(
    "canvas",
    {
      ref: u,
      className: `w-full block pointer-events-none ${n}`,
      style: { width: "100%", height: w }
    }
  );
}
function As({
  callState: t,
  statusText: r,
  isMuted: n,
  hasPermission: a,
  analyserNode: s,
  outputAnalyserNode: l = null,
  userRms: o,
  botRms: d,
  activeVUSegments: u,
  activeTool: m,
  onRequestMicrophone: c
}) {
  const h = a === !1, f = t === "reconnecting", p = t === "speaking", x = t === "thinking" || t === "escalating" || t === "resolved" || (m == null ? void 0 : m.status) === "running", w = h ? "Micrófono bloqueado" : f ? "Estabilizando conexión de voz..." : n ? "Micrófono en silencio" : p ? "Asistente hablando..." : x ? "Procesando solicitud..." : o > 0.08 ? "Escuchando tu voz..." : "Te escucho...", g = h ? "Permiso requerido" : f ? r || "Reanudando sesión en caliente..." : n ? "Pulsa para reactivar" : p || x ? r : o > 0.08 ? "Voz detectada en vivo" : "Habla con naturalidad";
  return /* @__PURE__ */ i("div", { className: "mx-5 mt-3 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: M("flex flex-col max-w-[145px] sm:max-w-[175px] shrink-0", h && "cursor-pointer"),
        onClick: h ? c : void 0,
        title: h ? "Haz clic para permitir acceso al micrófono" : void 0,
        children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-bold truncate text-neutral-900", children: w }),
          /* @__PURE__ */ e("span", { className: "text-xs text-neutral-500 truncate", children: g })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 max-w-[180px] sm:max-w-[240px] h-10 flex items-center justify-center", children: /* @__PURE__ */ e(
      _s,
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
      h ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: c,
          title: "Permiso de micrófono no otorgado. Haz clic para permitir",
          className: "flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all cursor-pointer",
          children: [
            /* @__PURE__ */ e(Rr, { className: "size-3 text-amber-600" }),
            /* @__PURE__ */ e("span", { children: "Sin permiso" })
          ]
        }
      ) : /* @__PURE__ */ i("div", { className: "flex items-center gap-1 text-[11px] font-semibold text-emerald-600", children: [
        /* @__PURE__ */ e(jr, { className: "size-3" }),
        /* @__PURE__ */ e("span", { children: n ? "Micrófono silenciado" : "Micrófono activo" })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-0.5", children: [...Array(8)].map((v, b) => /* @__PURE__ */ e(
        "span",
        {
          className: M(
            "w-1.5 h-2.5 rounded-xs transition-colors duration-75",
            !h && !n && b < u ? "bg-emerald-500" : "bg-neutral-200"
          )
        },
        b
      )) })
    ] })
  ] });
}
function Es({
  transcripts: t,
  matchedArticle: r,
  noticeBanner: n
}) {
  const a = W(null), s = W(!0), l = W(0), [o, d] = k(!0), [u, m] = k(0), c = Y((f = "smooth") => {
    const p = a.current;
    p && (p.scrollTo({
      top: p.scrollHeight,
      behavior: f
    }), s.current = !0, d(!0), m(0));
  }, []), h = Y(() => {
    const f = a.current;
    if (!f) return;
    const x = f.scrollHeight - f.scrollTop - f.clientHeight < 40;
    s.current = x, d(x), x && m(0);
  }, []);
  return re(() => {
    const f = l.current, p = t.length;
    if (l.current = p, p === 0) {
      m(0), s.current = !0, d(!0);
      return;
    }
    if (s.current) {
      const x = a.current;
      x && (x.scrollTop = x.scrollHeight);
    } else if (p > f)
      m((x) => x + (p - f));
    else {
      const x = t[p - 1];
      x && !x.isFinal && m((w) => w === 0 ? 1 : w);
    }
  }, [t, r, n]), /* @__PURE__ */ i("div", { className: "flex flex-col flex-1 min-h-0", children: [
    (r || n) && /* @__PURE__ */ i("div", { className: "mx-5 mt-2.5 space-y-1.5 shrink-0", children: [
      r && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-2 text-xs text-blue-900", children: [
        /* @__PURE__ */ e(vn, { className: "size-3.5 text-blue-600 shrink-0" }),
        /* @__PURE__ */ i("span", { className: "truncate", children: [
          /* @__PURE__ */ e("strong", { className: "font-semibold", children: "Guía aplicada:" }),
          " ",
          r.title
        ] })
      ] }),
      n && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs text-emerald-800 animate-in fade-in duration-200", children: [
        /* @__PURE__ */ e(yt, { className: "size-3.5 text-emerald-600 shrink-0" }),
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
          onScroll: h,
          className: "flex-1 overflow-y-auto px-5 pb-3 space-y-3 font-sans scroll-smooth",
          children: t.length === 0 ? /* @__PURE__ */ i("div", { className: "flex flex-col items-center justify-center h-full min-h-[150px] text-center py-4 text-neutral-400", children: [
            /* @__PURE__ */ e("p", { className: "text-xs font-medium text-neutral-500", children: "Habla normalmente al micrófono..." }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-400 mt-1 max-w-xs", children: "“Hola, la impresora POS tiene luz roja y no imprime el recibo”" })
          ] }) : t.map((f) => {
            const p = f.sender === "assistant";
            return /* @__PURE__ */ i(
              "div",
              {
                className: p ? "flex items-start gap-2.5 max-w-[90%] animate-in fade-in slide-in-from-bottom-1 duration-200" : "flex items-start justify-end gap-2.5 ml-auto max-w-[85%] animate-in fade-in slide-in-from-bottom-1 duration-200",
                children: [
                  p && /* @__PURE__ */ e(
                    nt,
                    {
                      name: "Asistente SDi",
                      isBot: !0,
                      size: "sm",
                      className: "mt-0.5 shrink-0"
                    }
                  ),
                  /* @__PURE__ */ i("div", { className: p ? "flex min-w-0 flex-col gap-1" : "flex min-w-0 flex-col gap-1 items-end", children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: p ? "text-xs font-bold text-violet-700 truncate" : "text-xs font-semibold text-neutral-800 truncate",
                          children: p ? "Asistente SDi" : "Tú"
                        }
                      ),
                      p && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-violet-100 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 border border-violet-200/60 shadow-2xs", children: [
                        /* @__PURE__ */ e(Lr, { className: "size-2.5 text-violet-600" }),
                        /* @__PURE__ */ e("span", { children: "IA" })
                      ] })
                    ] }),
                    /* @__PURE__ */ i(
                      "div",
                      {
                        className: p ? "rounded-2xl rounded-tl-xs bg-gradient-to-b from-violet-50/70 to-white px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed text-neutral-900 border border-violet-200/70 shadow-xs ring-1 ring-violet-500/10" : "rounded-2xl rounded-tr-xs bg-blue-600 px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed text-white shadow-xs",
                        children: [
                          /* @__PURE__ */ i("p", { className: "whitespace-pre-wrap break-words", children: [
                            f.text,
                            p && !f.isFinal && /* @__PURE__ */ e("span", { className: "inline-block w-1.5 h-3 ml-1 bg-violet-500/70 align-middle animate-pulse rounded-xs" })
                          ] }),
                          /* @__PURE__ */ e(
                            "div",
                            {
                              className: p ? "mt-1 flex items-center justify-end text-[10px] leading-none text-neutral-400" : "mt-1 flex items-center justify-end text-[10px] leading-none text-blue-100/80",
                              children: /* @__PURE__ */ e("span", { children: f.timestamp })
                            }
                          )
                        ]
                      }
                    )
                  ] })
                ]
              },
              f.id
            );
          })
        }
      ),
      !o && t.length > 0 && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200", children: u > 0 ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => c("smooth"),
          "aria-label": `${u} mensaje${u > 1 ? "s" : ""} nuevo${u > 1 ? "s" : ""}, ir al final`,
          className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-[11px] font-semibold shadow-lg ring-2 ring-white transition-all active:scale-95 cursor-pointer",
          children: [
            /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-emerald-300 animate-ping" }),
            /* @__PURE__ */ e("span", { children: u === 1 ? "Nuevo mensaje" : `${u > 99 ? "99+" : u} mensajes nuevos` }),
            /* @__PURE__ */ e(Er, { className: "size-3.5 animate-bounce" })
          ]
        }
      ) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => c("smooth"),
          title: "Ir a los mensajes recientes",
          "aria-label": "Ir a los mensajes recientes",
          className: "pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 hover:bg-neutral-50 text-blue-600 border border-blue-200/80 px-3 py-1.5 text-[11px] font-semibold shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer",
          children: [
            /* @__PURE__ */ e(Er, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Bajar" })
          ]
        }
      ) })
    ] })
  ] });
}
function Is({
  isMuted: t,
  hasPermission: r,
  userRms: n,
  textInput: a,
  isCapturingScreen: s = !1,
  isSimulatingMicroCut: l = !1,
  onTextInputChange: o,
  onSendTextPrompt: d,
  onCaptureScreen: u,
  onOpenCamera: m,
  onPhotoUpload: c,
  onTriggerFileUpload: h,
  onSimulateMicroCut: f,
  onHeroMicClick: p,
  onMinimize: x,
  onHangup: w
}) {
  const g = W(null), v = r === !1;
  return /* @__PURE__ */ i("div", { className: "mt-6 flex flex-col bg-white shrink-0", children: [
    /* @__PURE__ */ i(
      "form",
      {
        onSubmit: d,
        className: "mx-5 mb-2 flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white px-2.5 py-2 shadow-2xs focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all",
        children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                var b;
                return h ? h() : (b = g.current) == null ? void 0 : b.click();
              },
              title: "Adjuntar imagen o foto desde tu equipo",
              "aria-label": "Adjuntar imagen",
              className: "flex size-8 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-violet-600 transition-colors shrink-0 cursor-pointer",
              children: /* @__PURE__ */ e(ua, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => {
                var b;
                return m ? m() : h ? h() : (b = g.current) == null ? void 0 : b.click();
              },
              title: "Tomar Foto con cámara (Snap-to-Diagnose)",
              "aria-label": "Tomar Foto",
              className: "flex size-8 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-violet-600 transition-colors shrink-0 cursor-pointer",
              children: /* @__PURE__ */ e(wn, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: u,
              disabled: s,
              title: "Compartir Pantalla (Snap-to-Diagnose)",
              "aria-label": "Compartir Pantalla",
              className: "flex size-8 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-violet-600 transition-colors shrink-0 cursor-pointer disabled:opacity-50",
              children: s ? /* @__PURE__ */ e(Je, { className: "size-4 animate-spin text-violet-600" }) : /* @__PURE__ */ e(ma, { className: "size-4" })
            }
          ),
          f && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: f,
              disabled: l,
              title: "Simular micro-corte de red (2s)",
              "aria-label": "Test Micro-corte",
              className: M(
                "flex items-center gap-1 h-8 px-2 rounded-xl text-[11px] font-medium transition-colors shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
                l ? "bg-amber-50 text-amber-700 border border-amber-200" : "text-neutral-500 hover:bg-amber-50 hover:text-amber-700"
              ),
              children: [
                /* @__PURE__ */ e(yn, { className: M("size-3.5", l && "animate-pulse") }),
                /* @__PURE__ */ e("span", { children: "Micro-corte" })
              ]
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              ref: g,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: c
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: a,
              onChange: (b) => o(b.target.value),
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
              children: /* @__PURE__ */ e(Nn, { className: "size-3.5" })
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
            onClick: x,
            title: "Minimizar llamada",
            "aria-label": "Minimizar llamada",
            className: "flex size-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer active:scale-95",
            children: /* @__PURE__ */ e(ha, { className: "size-4.5" })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[10px] font-medium leading-none text-neutral-400", children: "Minimizar" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: p,
            title: v ? "Permiso de micrófono no otorgado. Haz clic para solicitar permiso" : t ? "Micrófono silenciado (clic para activar)" : "Micrófono activo (clic para silenciar)",
            "aria-label": v ? "Sin permiso" : t ? "Micrófono silenciado" : "Micrófono activo",
            className: M(
              "flex size-13 items-center justify-center rounded-full border transition-all cursor-pointer active:scale-95",
              v ? "bg-neutral-100 text-amber-600 border-amber-200 hover:bg-neutral-200/60" : t ? "bg-neutral-100 text-neutral-400 border-neutral-200 hover:bg-neutral-200/70 hover:text-neutral-600" : n > 0.08 ? "bg-neutral-900 text-white border-neutral-900 scale-[1.03]" : "bg-neutral-800 text-white border-neutral-800 hover:bg-neutral-900"
            ),
            children: v || t ? /* @__PURE__ */ e(Rr, { className: "size-5.5" }) : /* @__PURE__ */ e(jr, { className: "size-5.5" })
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: M(
              "text-[10px] font-medium leading-none",
              v ? "text-amber-600" : t ? "text-neutral-400" : "text-neutral-600"
            ),
            children: v ? "Sin permiso" : t ? "Silenciado" : "Activo"
          }
        )
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-1.5 shrink-0", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: w,
            title: "Finalizar llamada",
            "aria-label": "Finalizar llamada",
            className: "flex size-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer active:scale-95",
            children: /* @__PURE__ */ e(Br, { className: "size-4.5" })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[10px] font-medium leading-none text-neutral-400", children: "Finalizar" })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "pb-3.5 pt-0.5 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium", children: [
      /* @__PURE__ */ e(hr, { className: "size-3.5 text-neutral-400" }),
      /* @__PURE__ */ e("span", { children: "Conversación segura y encriptada" })
    ] })
  ] });
}
function Ts({ statusText: t, onCancel: r }) {
  return /* @__PURE__ */ i("div", { className: "flex flex-col flex-1", children: [
    /* @__PURE__ */ i("div", { className: "flex flex-1 flex-col items-center justify-center text-center p-8 min-h-[300px]", children: [
      /* @__PURE__ */ i("div", { className: "relative mb-5", children: [
        /* @__PURE__ */ e(nt, { name: "Asistente SDi", isBot: !0, size: "xl" }),
        /* @__PURE__ */ e("span", { className: "absolute inset-0 rounded-full bg-blue-500/15 animate-ping" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 text-sm font-bold text-neutral-800", children: [
        /* @__PURE__ */ e(Je, { className: "size-4 animate-spin text-blue-600" }),
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
          /* @__PURE__ */ e(Br, { className: "size-3.5" }),
          /* @__PURE__ */ e("span", { children: "Cancelar llamada" })
        ]
      }
    ) })
  ] });
}
function pt(t, r) {
  const [n, a] = k(void 0), [s, l] = k(null), [o, d] = k(!1), [u, m] = k(!1), [c, h] = k(!1), f = Y(() => {
    a(void 0), l(null), d(!1), m(!1), h(!1);
  }, []), p = Y(
    async (w) => {
      var g, v, b, y;
      d(!0), m(!1), h(!1), l(null);
      try {
        const S = await t(w);
        return a(S), m(!0), d(!1), await ((g = r == null ? void 0 : r.onSuccess) == null ? void 0 : g.call(r, S, w)), await ((v = r == null ? void 0 : r.onSettled) == null ? void 0 : v.call(r, S, null, w)), S;
      } catch (S) {
        const $ = S;
        throw l($), h(!0), d(!1), await ((b = r == null ? void 0 : r.onError) == null ? void 0 : b.call(r, $, w)), await ((y = r == null ? void 0 : r.onSettled) == null ? void 0 : y.call(r, void 0, $, w)), S;
      }
    },
    [t, r]
  ), x = Y(
    (w, g) => {
      p(w).then(async (v) => {
        var b, y;
        await ((b = g == null ? void 0 : g.onSuccess) == null ? void 0 : b.call(g, v, w)), await ((y = g == null ? void 0 : g.onSettled) == null ? void 0 : y.call(g, v, null, w));
      }).catch(async (v) => {
        var b, y;
        await ((b = g == null ? void 0 : g.onError) == null ? void 0 : b.call(g, v, w)), await ((y = g == null ? void 0 : g.onSettled) == null ? void 0 : y.call(g, void 0, v, w));
      });
    },
    [p]
  );
  return {
    data: n,
    error: s,
    isPending: o,
    isLoading: o,
    isSuccess: u,
    isError: c,
    reset: f,
    mutate: x,
    mutateAsync: p
  };
}
const Ms = (t) => Ke({
  url: `${At("helpdesk", "v1")}/requests/chat-support`,
  method: "POST",
  data: t
}), Ds = (t) => Ke({
  url: `${At("helpdesk", "v1")}/chat-bot/escalate`,
  method: "POST",
  data: t
}), Ps = (t) => Ke({
  url: `${At("helpdesk", "v1")}/chat-bot/resolve`,
  method: "POST",
  data: t
}), Rs = (t) => Ke({
  url: `${At("helpdesk", "v1")}/chat-bot/queue-status`,
  method: "GET",
  params: {
    session_id: t
  }
}), js = (t) => Ke({
  url: `${At("helpdesk", "v1")}/chat-bot/queue-to-ticket`,
  method: "POST",
  params: {
    session_id: t.session_id
  },
  data: t
}), Mn = () => {
  const t = Y(async (r) => {
    var s;
    const n = await Ps(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
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
  return pt(t);
}, Mr = "sdi_messenger_conversation_sessions";
function Xt() {
  if (typeof window > "u" || !window.localStorage)
    return {};
  try {
    const t = window.localStorage.getItem(Mr);
    if (!t) return {};
    const r = JSON.parse(t);
    return r && typeof r == "object" ? r : {};
  } catch {
    return {};
  }
}
function Dn(t) {
  if (!(typeof window > "u" || !window.localStorage))
    try {
      Object.keys(t).length === 0 ? window.localStorage.removeItem(Mr) : window.localStorage.setItem(Mr, JSON.stringify(t));
    } catch {
    }
}
function Mt(t, r) {
  const n = String(t).trim(), a = String(r).trim();
  if (!n || !a) return;
  const s = Xt();
  s[n] !== a && (s[n] = a, Dn(s));
}
function Ht(t) {
  const r = String(t).trim();
  return r ? Xt()[r] ?? null : null;
}
function Ls() {
  return Xt();
}
function Bs(t) {
  const r = Xt();
  if (t != null) {
    const a = String(t).trim();
    if (a && r[a])
      return r[a];
  }
  const n = Object.keys(r);
  return n.length > 0 ? r[n[n.length - 1]] : null;
}
function wt(t) {
  const r = String(t).trim();
  if (!r) return;
  const n = Xt();
  r in n && (delete n[r], Dn(n));
}
const ln = {
  1: "Muy insatisfecho",
  2: "Insatisfecho",
  3: "Neutral",
  4: "Satisfecho",
  5: "¡Excelente atención!"
};
function Fs({
  formattedDuration: t,
  transcriptsCount: r,
  outcomeType: n,
  contextBadges: a,
  sessionId: s,
  conversationId: l,
  onClose: o,
  onSubmitRating: d
}) {
  var q, Z;
  const u = n.startsWith("escalated"), m = n === "resolved", [c, h] = k(5), [f, p] = k(0), [x, w] = k(!0), [g, v] = k(""), [b, y] = k(null), [S, $] = k(!1), [z, I] = k(null), {
    mutateAsync: J,
    isLoading: U,
    error: T
  } = Mn(), [B, A] = k(!1), P = U || B, D = f || c, j = async (X) => {
    var C, V;
    if (X.preventDefault(), y(null), I(null), c < 1 || c > 5) {
      y("Por favor selecciona una calificación de 1 a 5 estrellas.");
      return;
    }
    const de = (l ? Ht(l) : null) || Bs(l) || (s ? Ht(s) : null), N = de || s || (a == null ? void 0 : a.sessionId) || (l ? String(l) : "voice-session");
    try {
      if (d)
        A(!0), await d({
          rating: c,
          comment: g.trim(),
          helpful: x
        });
      else {
        const E = await J({
          session_id: N,
          helpful: x,
          comment: g.trim(),
          rating: c
        });
        if (l && wt(l), de) {
          const H = Ls();
          for (const [F, ce] of Object.entries(H))
            ce === de && wt(F);
        }
        Te.success(
          (E == null ? void 0 : E.message) || "¡Gracias por tu calificación! La atención ha sido marcada como resuelta.",
          E != null && E.ticket ? { description: `Ticket #${E.ticket.number || E.ticket.id}` } : void 0
        );
      }
      $(!0);
    } catch (E) {
      const H = ((V = (C = E == null ? void 0 : E.response) == null ? void 0 : C.data) == null ? void 0 : V.message) || (E == null ? void 0 : E.message) || "Error al registrar la calificación de la atención";
      I(H), Te.error(H);
    } finally {
      A(!1);
    }
  };
  return S ? /* @__PURE__ */ i("div", { className: "flex flex-1 flex-col items-center justify-center text-center p-6 sm:p-8 min-h-[380px] animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ i("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ e("div", { className: "flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-md", children: /* @__PURE__ */ e(yt, { className: "size-8 text-emerald-600" }) }),
      /* @__PURE__ */ e("span", { className: "absolute inset-0 rounded-full bg-emerald-500/15 animate-ping" })
    ] }),
    /* @__PURE__ */ e("h3", { className: "text-lg font-bold text-neutral-900 dark:text-neutral-100", children: "¡Gracias por tu calificación!" }),
    /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm leading-relaxed", children: "Tu retroalimentación ha sido enviada exitosamente. La atención ha quedado registrada y resuelta en el sistema." }),
    /* @__PURE__ */ i("div", { className: "mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-200 shadow-2xs", children: [
      /* @__PURE__ */ e("div", { className: "flex items-center gap-1", children: [1, 2, 3, 4, 5].map((X) => /* @__PURE__ */ e(
        Ir,
        {
          className: M(
            "size-4",
            X <= c ? "fill-amber-400 text-amber-400" : "fill-transparent text-neutral-300 dark:text-neutral-600"
          )
        },
        X
      )) }),
      /* @__PURE__ */ e("span", { className: "ml-1 text-amber-600 dark:text-amber-400 font-medium", children: ln[c] })
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-6", children: /* @__PURE__ */ e(
      ge,
      {
        type: "button",
        variant: "primary",
        onClick: () => o(!0),
        className: "h-10 px-6 text-xs sm:text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer",
        children: "Aceptar y cerrar"
      }
    ) })
  ] }) : /* @__PURE__ */ i("div", { className: "flex flex-1 flex-col text-center p-4 sm:p-6 max-h-[calc(90vh-70px)] overflow-y-auto animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ i("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ e("div", { className: "relative mb-2.5", children: /* @__PURE__ */ e("div", { className: "flex size-12 sm:size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-xs", children: /* @__PURE__ */ e(yt, { className: "size-6 sm:size-7 text-emerald-600" }) }) }),
      /* @__PURE__ */ e("h3", { className: "text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100", children: "Llamada finalizada" }),
      /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 max-w-sm leading-relaxed", children: u ? "Tu caso ha sido escalado con un especialista. La transcripción y el ticket han quedado registrados." : m ? "¡Caso resuelto con éxito! Por favor califica la atención recibida." : "Gracias por comunicarte. Por favor califica la atención brindada por el asistente." }),
      /* @__PURE__ */ i("div", { className: "mt-3 flex items-center justify-center gap-2 flex-wrap max-w-sm", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/60 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-200 shadow-2xs font-medium", children: [
          /* @__PURE__ */ e(zt, { className: "size-3.5 text-neutral-500" }),
          /* @__PURE__ */ i("span", { children: [
            "Duración: ",
            /* @__PURE__ */ e("strong", { className: "font-mono text-neutral-900 dark:text-neutral-100", children: t })
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/60 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-200 shadow-2xs font-medium", children: [
          /* @__PURE__ */ e(Dr, { className: "size-3.5 text-violet-600 dark:text-violet-400" }),
          /* @__PURE__ */ i("span", { children: [
            /* @__PURE__ */ e("strong", { className: "text-neutral-900 dark:text-neutral-100", children: r }),
            " intervenciones"
          ] })
        ] }),
        a.ticketNumber && /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-amber-50/80 dark:bg-amber-950/40 px-2.5 py-1 text-xs text-amber-700 dark:text-amber-300 shadow-2xs font-medium", children: [
          /* @__PURE__ */ e(Pr, { className: "size-3.5 text-amber-600" }),
          /* @__PURE__ */ i("span", { children: [
            "Ticket ",
            /* @__PURE__ */ i("strong", { className: "text-amber-800 dark:text-amber-200", children: [
              "#",
              a.ticketNumber
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i("form", { onSubmit: j, className: "mt-4 sm:mt-5 flex flex-col text-left space-y-3.5 max-w-md mx-auto w-full", children: [
      (b || z || T) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/40 p-2.5 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(Vt, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ e("span", { className: "leading-snug", children: b || z || ((Z = (q = T == null ? void 0 : T.response) == null ? void 0 : q.data) == null ? void 0 : Z.message) || (T == null ? void 0 : T.message) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center justify-center rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3.5 space-y-2 text-center", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200", children: "¿Qué tan útil fue la atención recibida?" }),
        /* @__PURE__ */ e(
          "div",
          {
            className: "flex items-center gap-2",
            onMouseLeave: () => p(0),
            children: [1, 2, 3, 4, 5].map((X) => {
              const de = X <= D;
              return /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  disabled: P,
                  onMouseEnter: () => p(X),
                  onClick: () => {
                    h(X), X <= 2 ? w(!1) : w(!0), b && y(null);
                  },
                  "aria-label": `Calificar con ${X} ${X === 1 ? "estrella" : "estrellas"}`,
                  className: "p-1 rounded-lg transition-transform hover:scale-115 active:scale-95 focus:outline-none cursor-pointer disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ e(
                    Ir,
                    {
                      className: M(
                        "size-7 sm:size-8 transition-colors",
                        de ? "fill-amber-400 text-amber-400 drop-shadow-2xs" : "fill-transparent text-neutral-300 dark:text-neutral-600 hover:text-amber-300"
                      )
                    }
                  )
                },
                X
              );
            })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-amber-600 dark:text-amber-400 min-h-4", children: ln[D] || "" }),
        /* @__PURE__ */ i("div", { className: "pt-1 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              disabled: P,
              onClick: () => w(!0),
              className: M(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer",
                x ? "bg-emerald-600 text-white border-emerald-600 shadow-2xs" : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-emerald-500"
              ),
              children: [
                /* @__PURE__ */ e(fa, { className: "size-3.5" }),
                /* @__PURE__ */ e("span", { children: "Resolvió mi duda" })
              ]
            }
          ),
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              disabled: P,
              onClick: () => w(!1),
              className: M(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer",
                x ? "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-amber-500" : "bg-amber-600 text-white border-amber-600 shadow-2xs"
              ),
              children: [
                /* @__PURE__ */ e(pa, { className: "size-3.5" }),
                /* @__PURE__ */ e("span", { children: "No resolvió" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between", children: [
          /* @__PURE__ */ i("span", { children: [
            "Comentarios adicionales ",
            /* @__PURE__ */ e("span", { className: "text-neutral-400 font-normal", children: "(opcional)" })
          ] }),
          /* @__PURE__ */ i("span", { className: "text-[10px] text-neutral-400 font-mono", children: [
            g.length,
            "/500"
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 focus-within:bg-white dark:bg-neutral-900/60 dark:focus-within:bg-neutral-900 focus-within:border-emerald-500 transition-colors", children: /* @__PURE__ */ e(
          Kt,
          {
            value: g,
            onChange: (X) => v(X.target.value),
            placeholder: "Cuéntanos brevemente tu experiencia o detalles que podamos mejorar...",
            rows: 2,
            maxLength: 500,
            disabled: P,
            className: "min-h-16 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none"
          }
        ) })
      ] }),
      /* @__PURE__ */ i("div", { className: "pt-1.5 flex items-center justify-end gap-2.5", children: [
        /* @__PURE__ */ e(
          ge,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => o(!1),
            disabled: P,
            className: "text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer",
            children: "Omitir"
          }
        ),
        /* @__PURE__ */ e(
          ge,
          {
            type: "submit",
            variant: "primary",
            size: "sm",
            disabled: P || c < 1,
            className: "gap-2 h-9 px-4.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50",
            children: P ? /* @__PURE__ */ i(Fe, { children: [
              /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin" }),
              /* @__PURE__ */ e("span", { children: "Enviando..." })
            ] }) : /* @__PURE__ */ i(Fe, { children: [
              /* @__PURE__ */ e("span", { children: "Enviar calificación" }),
              /* @__PURE__ */ e(Gt, { className: "size-3.5" })
            ] })
          }
        )
      ] })
    ] })
  ] });
}
function $s({
  visible: t,
  callState: r,
  formattedDuration: n,
  isMuted: a,
  hasPermission: s,
  position: l,
  onPositionChange: o,
  onToggleMute: d,
  onMaximize: u,
  onHangup: m
}) {
  const [c, h] = k(() => {
    if (l) return l;
    if (typeof window < "u") {
      const p = localStorage.getItem("sdi_voice_island_pos");
      if (p === "top" || p === "bottom") return p;
    }
    return "top";
  }), f = () => {
    const p = c === "top" ? "bottom" : "top";
    if (h(p), typeof window < "u")
      try {
        localStorage.setItem("sdi_voice_island_pos", p);
      } catch {
      }
    o == null || o(p);
  };
  return !t || typeof window > "u" ? null : qr(
    /* @__PURE__ */ i(
      "div",
      {
        className: M(
          "sdi-messenger-root fixed left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2 pl-3 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-2xl transition-all duration-300 ease-out max-w-[95vw]",
          c === "top" ? "top-5 animate-in slide-in-from-top-4" : "bottom-5 animate-in slide-in-from-bottom-4"
        ),
        children: [
          /* @__PURE__ */ i("div", { className: "relative shrink-0", children: [
            /* @__PURE__ */ e(nt, { name: "Asistente de Voz SDi", isBot: !0, size: "sm" }),
            /* @__PURE__ */ e(
              "span",
              {
                className: M(
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
                className: M(
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
                className: M(
                  "size-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs",
                  a ? "bg-amber-500 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                ),
                children: a ? /* @__PURE__ */ e(Rr, { className: "size-3.5" }) : /* @__PURE__ */ e(jr, { className: "size-3.5" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: f,
                title: c === "top" ? "Mover isla abajo" : "Mover isla arriba",
                "aria-label": c === "top" ? "Mover isla abajo" : "Mover isla arriba",
                className: "size-8 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all cursor-pointer shadow-2xs active:scale-95",
                children: c === "top" ? /* @__PURE__ */ e(ba, { className: "size-3.5 text-neutral-600" }) : /* @__PURE__ */ e(xa, { className: "size-3.5 text-neutral-600" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: u,
                title: "Maximizar llamada",
                className: "size-8 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all cursor-pointer shadow-2xs",
                children: /* @__PURE__ */ e(ga, { className: "size-3.5" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                onClick: m,
                title: "Finalizar llamada",
                className: "size-8 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer active:scale-95 transition-all",
                children: /* @__PURE__ */ e(Br, { className: "size-3.5" })
              }
            )
          ] })
        ]
      }
    ),
    document.body
  );
}
const ct = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400";
function Us({
  stream: t,
  cameraError: r,
  facingMode: n,
  onCapturePreview: a,
  onSendCaptured: s,
  onPhotoUpload: l,
  onSwitchCamera: o,
  onRetryCamera: d,
  onCancel: u
}) {
  const m = W(null), c = W(null), h = W(null), [f, p] = k(!1), [x, w] = k(!1), [g, v] = k(null), b = !!t && !r;
  re(() => {
    v(null);
  }, [t]), re(() => () => {
    h.current && clearTimeout(h.current);
  }, []), re(() => {
    const S = m.current;
    if (!(!S || !b || g))
      return S.srcObject = t, S.play().catch(() => {
      }), () => {
        S.srcObject = null;
      };
  }, [t, b, g]);
  const y = () => {
    const S = a(m.current);
    S && (w(!0), h.current && clearTimeout(h.current), h.current = setTimeout(() => {
      w(!1), v(S);
    }, 120));
  };
  return /* @__PURE__ */ i("div", { className: "mx-5 mt-3 rounded-2xl border border-neutral-800 bg-neutral-950 p-3 shadow-xl animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2 mb-2.5", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
        g ? /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 rounded-full bg-violet-500/20 border border-violet-400/30 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-violet-200 shrink-0", children: [
          /* @__PURE__ */ e("span", { children: "VISTA PREVIA" }),
          /* @__PURE__ */ e("span", { "aria-hidden": "true", children: "•" }),
          /* @__PURE__ */ i("span", { children: [
            g.sizeKb,
            " KB JPEG"
          ] })
        ] }) : b ? /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-300 shrink-0", children: [
          /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-emerald-400 animate-pulse", "aria-hidden": "true" }),
          /* @__PURE__ */ e("span", { children: "EN VIVO" })
        ] }) : /* @__PURE__ */ e("span", { className: "inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-amber-300 shrink-0", children: /* @__PURE__ */ e("span", { children: "SIN CÁMARA" }) }),
        /* @__PURE__ */ e("span", { className: "text-xs font-medium text-neutral-200 truncate min-w-0", children: g ? "Verifica que el texto sea legible" : b ? "Cámara de diagnóstico" : "Enviar imagen de la impresora o error" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-1 shrink-0", children: [
        b && !g && /* @__PURE__ */ i(Fe, { children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => p((S) => !S),
              "aria-label": "Espejar vista",
              "aria-pressed": f,
              title: "Espejar vista horizontalmente",
              className: M(
                "flex min-h-8 min-w-8 items-center justify-center rounded-lg p-1.5 transition-colors cursor-pointer",
                ct,
                f ? "bg-violet-600/30 text-violet-200" : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
              ),
              children: /* @__PURE__ */ e(va, { className: "size-4", "aria-hidden": "true" })
            }
          ),
          o && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: o,
              "aria-label": n === "environment" ? "Cambiar a cámara frontal" : "Cambiar a cámara trasera",
              title: n === "environment" ? "Cambiar a cámara frontal" : "Cambiar a cámara trasera",
              className: M(
                "flex min-h-8 min-w-8 items-center justify-center rounded-lg p-1.5 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer",
                ct
              ),
              children: /* @__PURE__ */ e(wa, { className: "size-4", "aria-hidden": "true" })
            }
          )
        ] }),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: u,
            "aria-label": "Cerrar cámara",
            title: "Cerrar cámara",
            className: M(
              "flex min-h-8 min-w-8 items-center justify-center rounded-lg p-1.5 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer",
              ct
            ),
            children: /* @__PURE__ */ e(et, { className: "size-4", "aria-hidden": "true" })
          }
        )
      ] })
    ] }),
    g ? /* @__PURE__ */ e("div", { className: "relative overflow-clip rounded-xl border border-violet-500/30 bg-black aspect-video max-h-52 w-full", children: /* @__PURE__ */ e(
      "img",
      {
        src: g.dataUrl,
        alt: "Vista previa de la fotografía capturada para diagnóstico",
        className: "block h-full w-full aspect-video object-contain bg-black"
      }
    ) }) : b ? /* @__PURE__ */ i("div", { className: "relative overflow-clip rounded-xl border border-neutral-800 bg-black aspect-video max-h-52 w-full", children: [
      /* @__PURE__ */ e(
        "video",
        {
          ref: m,
          autoPlay: !0,
          playsInline: !0,
          muted: !0,
          className: M(
            "block h-full w-full aspect-video object-cover transition-transform duration-200",
            f && "-scale-x-100"
          )
        }
      ),
      /* @__PURE__ */ i(
        "div",
        {
          "aria-hidden": "true",
          className: "pointer-events-none absolute inset-0 flex flex-col justify-between p-3",
          children: [
            /* @__PURE__ */ i("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ e("span", { className: "size-5 border-t-2 border-l-2 border-white/75 rounded-tl-md" }),
              /* @__PURE__ */ e("span", { className: "size-5 border-t-2 border-r-2 border-white/75 rounded-tr-md" })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-end justify-between gap-2", children: [
              /* @__PURE__ */ e("span", { className: "size-5 border-b-2 border-l-2 border-white/75 rounded-bl-md shrink-0" }),
              /* @__PURE__ */ e("span", { className: "rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-medium text-white/90 border border-white/10 truncate", children: "Encuadra el código de error o ticket POS" }),
              /* @__PURE__ */ e("span", { className: "size-5 border-b-2 border-r-2 border-white/75 rounded-br-md shrink-0" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          "aria-hidden": "true",
          className: M(
            "pointer-events-none absolute inset-0 bg-white transition-opacity duration-150",
            x ? "opacity-80" : "opacity-0"
          )
        }
      )
    ] }) : /* @__PURE__ */ i(
      "div",
      {
        role: "alert",
        className: "rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-6 text-center flex flex-col items-center justify-center gap-2.5 aspect-video max-h-52 w-full",
        children: [
          /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-full bg-amber-500/15 text-amber-400", children: /* @__PURE__ */ e(Vt, { className: "size-4.5", "aria-hidden": "true" }) }),
          /* @__PURE__ */ e("p", { className: "text-xs text-neutral-300 max-w-sm leading-relaxed", children: r || "No se pudo acceder a la cámara en vivo." })
        ]
      }
    ),
    /* @__PURE__ */ e(
      "input",
      {
        ref: c,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: l
      }
    ),
    /* @__PURE__ */ e("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-2", children: g ? /* @__PURE__ */ i(Fe, { children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => v(null),
          className: M(
            "inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer",
            ct
          ),
          children: [
            /* @__PURE__ */ e(kn, { className: "size-3.5", "aria-hidden": "true" }),
            /* @__PURE__ */ e("span", { children: "Repetir" })
          ]
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => s(g.dataUrl),
          className: M(
            "inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer active:scale-95",
            ct
          ),
          children: [
            /* @__PURE__ */ e(Nn, { className: "size-3.5", "aria-hidden": "true" }),
            /* @__PURE__ */ e("span", { children: "Enviar al Asistente" })
          ]
        }
      )
    ] }) : b ? /* @__PURE__ */ i(Fe, { children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            var S;
            return (S = c.current) == null ? void 0 : S.click();
          },
          className: M(
            "inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer",
            ct
          ),
          children: [
            /* @__PURE__ */ e(rn, { className: "size-3.5", "aria-hidden": "true" }),
            /* @__PURE__ */ e("span", { children: "Subir archivo" })
          ]
        }
      ),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: u,
            className: M(
              "min-h-9 rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800 transition-colors cursor-pointer",
              ct
            ),
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: y,
            className: M(
              "inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer active:scale-95",
              ct
            ),
            children: [
              /* @__PURE__ */ e(wn, { className: "size-3.5", "aria-hidden": "true" }),
              /* @__PURE__ */ e("span", { children: "Capturar Foto" })
            ]
          }
        )
      ] })
    ] }) : /* @__PURE__ */ i(Fe, { children: [
      /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: u,
          className: M(
            "min-h-9 rounded-xl px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-800 transition-colors cursor-pointer",
            ct
          ),
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-2", children: [
        d && /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: d,
            className: M(
              "inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-800 transition-colors cursor-pointer",
              ct
            ),
            children: [
              /* @__PURE__ */ e(Fr, { className: "size-3.5", "aria-hidden": "true" }),
              /* @__PURE__ */ e("span", { children: "Reintentar cámara" })
            ]
          }
        ),
        /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => {
              var S;
              return (S = c.current) == null ? void 0 : S.click();
            },
            className: M(
              "inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer active:scale-95",
              ct
            ),
            children: [
              /* @__PURE__ */ e(rn, { className: "size-3.5", "aria-hidden": "true" }),
              /* @__PURE__ */ e("span", { children: "Subir archivo" })
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function Pn({
  open: t,
  onOpenChange: r,
  sessionId: n,
  conversationId: a,
  userId: s,
  userAuthId: l,
  senderMessengerId: o,
  wsUrl: d,
  onCallEnded: u,
  onResolveSubmit: m
}) {
  const c = Ss({
    open: t,
    sessionId: n,
    conversationId: a,
    userId: s,
    userAuthId: l,
    senderMessengerId: o,
    wsUrl: d,
    onOpenChange: r,
    onCallEnded: u
  });
  return t ? /* @__PURE__ */ i(Fe, { children: [
    /* @__PURE__ */ e(fr, { open: t && !c.isMinimized, onOpenChange: c.handleDialogCloseAttempt, children: /* @__PURE__ */ i(
      pr,
      {
        showClose: !1,
        className: "sm:max-w-xl w-full p-0 flex flex-col overflow-hidden bg-white text-neutral-900 border border-neutral-200 shadow-2xl rounded-3xl",
        children: [
          /* @__PURE__ */ e(
            zs,
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
            Fs,
            {
              formattedDuration: c.formattedDuration,
              transcriptsCount: c.transcripts.length,
              outcomeType: c.outcomeType,
              contextBadges: c.contextBadges,
              sessionId: c.activeSessionId || n,
              conversationId: a,
              onClose: (h) => {
                h ? c.handleDismissEndedCall("resolved") : c.handleDismissEndedCall();
              },
              onSubmitRating: m
            }
          ) : c.isConnecting ? /* @__PURE__ */ e(
            Ts,
            {
              statusText: c.statusText,
              onCancel: c.handleHangup
            }
          ) : /* @__PURE__ */ i("div", { className: "relative flex flex-col flex-1 min-h-0", children: [
            (c.reconnectingBanner || c.callState === "reconnecting") && /* @__PURE__ */ i(
              "div",
              {
                role: "status",
                "aria-live": "polite",
                className: "pointer-events-none absolute top-2.5 left-5 right-5 z-30 flex items-center gap-2.5 rounded-2xl border border-amber-300/90 bg-amber-50/95 px-3.5 py-2.5 text-xs font-semibold text-amber-900 shadow-lg backdrop-blur-xs animate-in fade-in slide-in-from-top-2 duration-200",
                children: [
                  /* @__PURE__ */ e(Je, { className: "size-4 animate-spin text-amber-600 shrink-0" }),
                  /* @__PURE__ */ e("span", { children: c.reconnectingBanner || "Estabilizando conexión de voz..." })
                ]
              }
            ),
            c.isCameraOpen ? /* @__PURE__ */ e(
              Us,
              {
                stream: c.cameraStream,
                cameraError: c.cameraError,
                facingMode: c.cameraFacingMode,
                onCapturePreview: c.handleCaptureCameraPreview,
                onSendCaptured: c.handleSendCapturedDataUrl,
                onPhotoUpload: c.handlePhotoUpload,
                onSwitchCamera: c.handleSwitchCamera,
                onRetryCamera: () => void c.handleOpenCamera(),
                onCancel: c.handleCloseCamera
              }
            ) : /* @__PURE__ */ e(
              As,
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
              Es,
              {
                transcripts: c.transcripts,
                matchedArticle: c.matchedArticle,
                noticeBanner: c.noticeBanner
              }
            ),
            /* @__PURE__ */ e(
              Is,
              {
                isMuted: c.isMuted,
                hasPermission: c.hasPermission,
                userRms: c.userRms,
                textInput: c.textInput,
                isCapturingScreen: c.isCapturingScreen,
                isSimulatingMicroCut: c.isSimulatingMicroCut,
                onTextInputChange: c.setTextInput,
                onSendTextPrompt: c.handleSendTextPrompt,
                onCaptureScreen: c.handleCaptureScreen,
                onOpenCamera: c.handleOpenCamera,
                onPhotoUpload: c.handlePhotoUpload,
                onSimulateMicroCut: c.handleSimulateMicroCut,
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
      $s,
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
let Qt = null;
const Zt = /* @__PURE__ */ new Set(), Wt = {
  get: () => Qt,
  start: (t) => {
    Qt = t, Zt.forEach((r) => r(Qt));
  },
  stop: () => {
    Qt = null, Zt.forEach((t) => t(null));
  },
  subscribe: (t) => (Zt.add(t), () => {
    Zt.delete(t);
  })
};
function Hs() {
  return gn(
    Wt.subscribe,
    Wt.get,
    () => null
  );
}
const Gr = Pt(null);
function Ws(t) {
  var n, a, s, l;
  const r = [];
  return (n = t.apiBaseUrl) != null && n.trim() || r.push("apiBaseUrl"), (t.applicationId === void 0 || t.applicationId === null) && r.push("applicationId"), t.reverb ? ((a = t.reverb.key) != null && a.trim() || r.push("reverb.key"), (s = t.reverb.host) != null && s.trim() || r.push("reverb.host"), (!Number.isFinite(t.reverb.port) || t.reverb.port <= 0) && r.push("reverb.port"), (l = t.reverb.wsPath) != null && l.trim() || r.push("reverb.wsPath"), t.reverb.scheme !== "http" && t.reverb.scheme !== "https" && r.push("reverb.scheme")) : r.push("reverb"), r.length > 0 ? new Error(`Configuración incompleta del chat: ${r.join(", ")}`) : null;
}
function Xl({ config: t, children: r }) {
  const { authToken: n, apiBaseUrl: a, applicationId: s, reverb: l, apiHelpdeskBaseUrl: o } = t, d = Ge(
    () => Ws(t),
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
  ), [u, m] = k(null), [c, h] = k([]), [f, p] = k(null), [x, w] = k(null), [g, v] = k(null), b = JSON.stringify([a, s, n]);
  re(() => {
    d && console.error(`[Chat] ${d.message}`);
  }, [d]), re(() => {
    let T = !0;
    return d || !n ? () => {
      T = !1;
    } : (Qa({
      apiBaseUrl: a,
      authToken: n,
      apiHelpdeskBaseUrl: o
    }), (async () => {
      var A;
      try {
        const P = await ss(), j = (await ns(P.data.data.id)).data.data;
        if (!(j != null && j.id))
          throw new Error("La respuesta no contiene un usuario válido para el chat");
        const Z = ((A = (await as({
          userId: j.attributes.user_auth_id,
          applicationId: s
        })).data.data) == null ? void 0 : A.map((X) => X.attributes.name)) ?? [];
        T && (m(j), h(Z), p(b), w(null), v(null));
      } catch (P) {
        T && (console.error("Error al cargar el usuario en ChatProvider:", P), w(P instanceof Error ? P : new Error("Error al inicializar el chat")), v(b));
      }
    })(), () => {
      T = !1;
    });
  }, [d, n, a, s, b]);
  const y = (T) => {
    m(T);
  }, S = Ge(() => u != null && u.id ? String(u.id) : "", [u]), $ = !!(u != null && u.id) && f === b, z = g === b && x !== null, U = {
    currentUser: u,
    currentUserId: S,
    permissions: c,
    isLoadingUser: !d && !!n && !$ && !z,
    hasError: !!d || z,
    error: d ?? (z ? x : null),
    config: t,
    setCurrentUser: y
  };
  return /* @__PURE__ */ i(Gr.Provider, { value: U, children: [
    r,
    /* @__PURE__ */ e(qs, {})
  ] });
}
function qs() {
  const t = Hs();
  return t ? /* @__PURE__ */ e(
    Pn,
    {
      open: !!t,
      onOpenChange: (r) => {
        r || Wt.stop();
      },
      conversationId: t.conversationId,
      userId: t.userId,
      userAuthId: t.userAuthId,
      senderMessengerId: t.senderMessengerId,
      sessionId: t.sessionId || String(t.conversationId),
      wsUrl: t.wsUrl,
      onCallEnded: (r) => {
        var n;
        (n = t.onCallEnded) == null || n.call(t, r), Wt.stop();
      }
    }
  ) : null;
}
function Kr() {
  return Rt(Gr);
}
function at() {
  const t = Rt(Gr);
  if (!t)
    throw new Error("useChatContext debe usarse dentro de un ChatProvider");
  return t;
}
const Os = (t) => Ke({
  url: `${tt("messenger", "v1")}/conversations`,
  method: "GET",
  params: t
}), Vs = (t) => Ke({
  url: `${tt("messenger", "v1")}/conversations`,
  method: "POST",
  data: t
}), Gs = (t) => Ke({
  url: `${tt("messenger", "v1")}/conversations/${t}`,
  method: "GET"
}), Ks = ({
  conversationId: t,
  read_until: r,
  user_id: n
}) => Ke({
  url: `${tt("messenger", "v1")}/conversations/${t}/read`,
  method: "POST",
  data: { read_until: r, user_id: n }
}), Js = ({
  conversationId: t,
  user_id: r,
  is_typing: n
}) => Ke({
  url: `${tt("messenger", "v1")}/conversations/${t}/typing`,
  method: "POST",
  data: { user_id: r, is_typing: n }
}), Rn = async (t) => {
  const r = await Ke({
    url: `${tt("messenger", "v1")}/conversations/${t}/close`,
    method: "POST"
  });
  return wt(t), r;
}, jn = Pt(null);
let Lt = null;
const Sr = /* @__PURE__ */ new Set(), Dt = {
  get: () => Lt,
  set: (t) => {
    (Lt == null ? void 0 : Lt.id) !== (t == null ? void 0 : t.id) && (Lt = t, Sr.forEach((r) => r(t)));
  },
  subscribe: (t) => (Sr.add(t), () => {
    Sr.delete(t);
  })
};
function Xs({
  value: t,
  children: r
}) {
  return /* @__PURE__ */ e(jn.Provider, { value: t, children: r });
}
function Ys() {
  var n;
  const t = Rt(jn), r = gn(
    Dt.subscribe,
    Dt.get,
    () => null
  );
  return t || (r ? {
    conversation: r,
    isClosed: !!((n = r.attributes) != null && n.closed_at),
    isClosing: !1,
    handleCloseConversation: async () => {
      await Rn(r.id), typeof window < "u" && window.dispatchEvent(
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
function Yl() {
  const t = Ys();
  if (!t)
    throw new Error("useRequiredActiveConversation debe utilizarse cuando haya una conversación activa");
  return t;
}
const qt = (t) => t ? t.toLowerCase().split(" ").filter(Boolean).map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ") : "", Yt = (t) => !!t.attributes.is_group, Et = (t, r) => {
  var s;
  const n = ((s = t.relationships) == null ? void 0 : s.users) || [];
  if (!r)
    return n[0];
  const a = String(r);
  return n.find((l) => String(l.id) !== a) || n[0];
}, jt = (t, r) => {
  var s;
  if (Yt(t))
    return t.attributes.name || "Grupo";
  const n = Et(t, r), a = ((s = n == null ? void 0 : n.attributes) == null ? void 0 : s.name) || t.attributes.name || "Usuario";
  return qt(a);
}, Ot = (t) => t != null && t.attributes ? Number(t.attributes.user_auth_id) === 0 : !1, Jr = (t, r) => {
  var a;
  if ((a = t.attributes) != null && a.is_group) return !1;
  const n = Et(t, r);
  return Ot(n);
};
function zr(t) {
  return (r = {}) => {
    const n = r.width ? String(r.width) : t.defaultWidth;
    return t.formats[n] || t.formats[t.defaultWidth];
  };
}
function Bt(t) {
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
function Ft(t) {
  return (r, n = {}) => {
    const a = n.width, s = a && t.matchPatterns[a] || t.matchPatterns[t.defaultMatchWidth], l = r.match(s);
    if (!l)
      return null;
    const o = l[0], d = a && t.parsePatterns[a] || t.parsePatterns[t.defaultParseWidth], u = Array.isArray(d) ? Zs(d, (h) => h.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      Qs(d, (h) => h.test(o))
    );
    let m;
    m = t.valueCallback ? t.valueCallback(u) : u, m = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(m)
    ) : m;
    const c = r.slice(o.length);
    return { value: m, rest: c };
  };
}
function Qs(t, r) {
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && r(t[n]))
      return n;
}
function Zs(t, r) {
  for (let n = 0; n < t.length; n++)
    if (r(t[n]))
      return n;
}
function ei(t) {
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
const ti = {
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
}, ri = (t, r, n) => {
  let a;
  const s = ti[t];
  return typeof s == "string" ? a = s : r === 1 ? a = s.one : a = s.other.replace("{{count}}", r.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "en " + a : "hace " + a : a;
}, ni = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, ai = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, si = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ii = {
  date: zr({
    formats: ni,
    defaultWidth: "full"
  }),
  time: zr({
    formats: ai,
    defaultWidth: "full"
  }),
  dateTime: zr({
    formats: si,
    defaultWidth: "full"
  })
}, li = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, oi = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, ci = (t, r, n, a) => r.getHours() !== 1 ? oi[t] : li[t], di = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, ui = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, mi = {
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
}, hi = {
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
}, fi = {
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
}, pi = {
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
}, bi = (t, r) => Number(t) + "º", xi = {
  ordinalNumber: bi,
  era: Bt({
    values: di,
    defaultWidth: "wide"
  }),
  quarter: Bt({
    values: ui,
    defaultWidth: "wide",
    argumentCallback: (t) => Number(t) - 1
  }),
  month: Bt({
    values: mi,
    defaultWidth: "wide"
  }),
  day: Bt({
    values: hi,
    defaultWidth: "wide"
  }),
  dayPeriod: Bt({
    values: fi,
    defaultWidth: "wide",
    formattingValues: pi,
    defaultFormattingWidth: "wide"
  })
}, gi = /^(\d+)(º)?/i, vi = /\d+/i, wi = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, yi = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, Ni = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, ki = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ci = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, Si = {
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
}, zi = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, _i = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, Ai = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, Ei = {
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
}, Ii = {
  ordinalNumber: ei({
    matchPattern: gi,
    parsePattern: vi,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: Ft({
    matchPatterns: wi,
    defaultMatchWidth: "wide",
    parsePatterns: yi,
    defaultParseWidth: "any"
  }),
  quarter: Ft({
    matchPatterns: Ni,
    defaultMatchWidth: "wide",
    parsePatterns: ki,
    defaultParseWidth: "any",
    valueCallback: (t) => t + 1
  }),
  month: Ft({
    matchPatterns: Ci,
    defaultMatchWidth: "wide",
    parsePatterns: Si,
    defaultParseWidth: "any"
  }),
  day: Ft({
    matchPatterns: zi,
    defaultMatchWidth: "wide",
    parsePatterns: _i,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ft({
    matchPatterns: Ai,
    defaultMatchWidth: "any",
    parsePatterns: Ei,
    defaultParseWidth: "any"
  })
}, on = {
  code: "es",
  formatDistance: ri,
  formatLong: ii,
  formatRelative: ci,
  localize: xi,
  match: Ii,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, Ti = ({
  conversationId: t,
  sender: r,
  body: n,
  file: a
}) => {
  const s = `optimistic-${Date.now()}`, l = (/* @__PURE__ */ new Date()).toISOString(), o = Number(r.id), d = r.attributes || {}, u = d.name || d.username || "Usuario", m = d.avatar_url ?? d.avatar ?? null, c = {
    id: String(r.id),
    type: "user",
    attributes: {
      user_auth_id: d.user_auth_id ?? r.id,
      name: u,
      avatar_url: m,
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
      sender: c,
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
function Mi(t) {
  return t.slice(0, 10);
}
function cn(t, r) {
  if (r.attributes.sender_id == null) return t;
  const n = Mi(r.attributes.created_at || ""), a = t[0];
  return a && a.date === n ? a.messages.some((s) => s.id === r.id) ? t : [{ ...a, messages: [r, ...a.messages] }, ...t.slice(1)] : [{ date: n, messages: [r] }, ...t];
}
function Di(t, r) {
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
function er(t) {
  if (!t) return "Hoy";
  const r = t.trim().toLowerCase();
  if (r === "hoy" || r === "today") return "Hoy";
  if (r === "ayer" || r === "yesterday") return "Ayer";
  const n = Or(t);
  return Ga(n) ? Ka(n) ? "Hoy" : Ja(n) ? "Ayer" : Xa(n, { weekStartsOn: 1 }) ? nr(n, "EEEE", { locale: on }) : nr(n, "d 'de' MMMM 'de' yyyy", { locale: on }) : t;
}
function dn(t, r, n) {
  var d, u, m;
  if (!t.trim()) return;
  let a = "message";
  const s = [];
  for (const c of t.split(`
`)) {
    const h = c.trimEnd();
    !h || h.startsWith(":") || (h.startsWith("event:") ? a = h.slice(6).trim() : h.startsWith("data:") && s.push(h.slice(5).trimStart()));
  }
  const l = s.join(`
`).trim();
  if (!l || l === "[DONE]") return;
  const o = JSON.parse(l);
  if (a === "meta")
    (d = r.onMeta) == null || d.call(r, o);
  else if (a === "delta") {
    n.hasReceivedDelta = !0;
    const c = typeof o.text == "string" ? o.text : "";
    (u = r.onDelta) == null || u.call(r, c);
  } else if (a === "done")
    n.hasCompleted = !0, (m = r.onDone) == null || m.call(r, o);
  else if (a === "error") {
    const c = typeof o.message == "string" && o.message ? o.message : "Error recibido en el stream del asistente";
    throw new Error(c);
  }
}
async function Pi(t) {
  const n = (await Ke({
    url: `${At("helpdesk", "v1")}/chat-bot/message`,
    method: "POST",
    data: t
  })).data;
  return (n && typeof n == "object" && "data" in n && n.data && typeof n.data == "object" ? n.data : n) || {};
}
async function Ri(t, r, n) {
  var h, f, p, x, w, g;
  const a = (n == null ? void 0 : n.openTimeoutMs) ?? 3e3, s = `${At("helpdesk", "v1")}/chat-bot/message/stream`, l = new AbortController();
  let o = !1, d = !1;
  const u = () => {
    d = !0, l.abort();
  };
  n != null && n.signal && (n.signal.aborted ? (d = !0, l.abort()) : n.signal.addEventListener("abort", u, { once: !0 }));
  const m = setTimeout(() => {
    o = !0, l.abort();
  }, a), c = {
    hasReceivedDelta: !1,
    hasCompleted: !1
  };
  try {
    const v = await fetch(s, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        ...Za()
      },
      body: JSON.stringify(t),
      signal: l.signal
    });
    if (clearTimeout(m), !v.ok || !v.body)
      throw new Error(`HTTP ${v.status}: Error al conectar stream SSE`);
    const b = v.body.getReader(), y = new TextDecoder("utf-8");
    let S = "";
    for (; ; ) {
      const { done: z, value: I } = await b.read();
      if (z) break;
      S = (S + y.decode(I, { stream: !0 })).replace(/\r\n/g, `
`);
      const J = S.split(`

`);
      S = J.pop() || "";
      for (const U of J)
        dn(U, r, c);
    }
    const $ = (S + y.decode()).replace(/\r\n/g, `
`).trim();
    if ($)
      for (const z of $.split(`

`))
        dn(z, r, c);
    if (!c.hasCompleted && !c.hasReceivedDelta)
      throw new Error("El stream SSE finalizó sin emitir deltas");
  } catch (v) {
    if (clearTimeout(m), d || (h = n == null ? void 0 : n.signal) != null && h.aborted)
      return;
    if (!c.hasReceivedDelta && !c.hasCompleted)
      try {
        const y = await Pi(t);
        (y.article || y.session_uuid || y.state) && ((f = r.onMeta) == null || f.call(r, {
          session_uuid: y.session_uuid,
          state: y.state,
          article: y.article
        })), (p = r.onDone) == null || p.call(r, {
          ...y,
          reply: y.reply || y.message || ""
        });
        return;
      } catch (y) {
        const S = y instanceof Error ? y : new Error("Error al enviar mensaje al asistente");
        throw (x = r.onError) == null || x.call(r, S), S;
      }
    const b = o ? new Error("Tiempo de espera agotado al abrir el stream del asistente") : v instanceof Error ? v : new Error("Error en la conexión de streaming del asistente");
    throw (w = r.onError) == null || w.call(r, b), b;
  } finally {
    clearTimeout(m), (g = n == null ? void 0 : n.signal) == null || g.removeEventListener("abort", u);
  }
}
const _r = async ({
  conversation: t,
  ...r
}) => await Ke({
  url: `${tt("messenger", "v1")}/conversations/${t}/messages`,
  method: "GET",
  params: r
}), ji = (t, r) => Ke({
  url: `${tt("messenger", "v1")}/conversations/${t}/messages`,
  method: "POST",
  data: r
}), Li = (t, r) => {
  const n = new FormData();
  return n.append("file", r.file), n.append("sender_id", r.sender_id.toString()), r.caption && n.append("caption", r.caption), Ke({
    url: `${tt("messenger", "v1")}/conversations/${t}/file`,
    method: "POST",
    data: n,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
function Bi(t, r) {
  var o, d, u, m;
  if (!t) return;
  const n = ((o = t.data) == null ? void 0 : o.data) ?? [];
  if (!Array.isArray(n) || n.length === 0 || n.reduce(
    (c, h) => c + (Array.isArray(h == null ? void 0 : h.messages) ? h.messages.length : 0),
    0
  ) === 0)
    return;
  const s = (d = t.data) == null ? void 0 : d.meta;
  if ((s == null ? void 0 : s.has_more) === !1)
    return;
  let l = s == null ? void 0 : s.next_cursor;
  if (!l) {
    const c = (m = (u = t.data) == null ? void 0 : u.links) == null ? void 0 : m.next;
    if (c)
      try {
        const h = new URL(c, "http://localhost");
        l = h.searchParams.get("page[cursor]") || h.searchParams.get("cursor") || void 0;
      } catch {
      }
  }
  if (!(!l || l === "null" || l === "undefined" || l.trim() === "") && !r.includes(l))
    return l;
}
const Fi = ({ params: t, enabled: r = !0 }) => {
  var U, T;
  const n = r && !!(t != null && t.conversation), [a, s] = k([]), [l, o] = k([]), [d, u] = k(n), [m, c] = k(n), [h, f] = k(!1), [p, x] = k({}), w = W(t);
  w.current = t;
  const g = W(!1), v = t == null ? void 0 : t.conversation, b = a[a.length - 1], y = Bi(b, l), S = !!y, $ = Y(async () => {
    var B, A, P;
    if ((B = w.current) != null && B.conversation) {
      u(!0), c(!0), g.current = !0, x({});
      try {
        const D = await _r({
          ...w.current,
          page: {
            ...(A = w.current) == null ? void 0 : A.page
          }
        });
        s([D]), o([]);
      } catch (D) {
        x(((P = D == null ? void 0 : D.response) == null ? void 0 : P.data) ?? (D == null ? void 0 : D.data) ?? {});
      } finally {
        u(!1), c(!1), g.current = !1;
      }
    }
  }, []), z = Y(async () => {
    var B, A, P;
    if (!(!S || !y || g.current || !((B = w.current) != null && B.conversation))) {
      f(!0), c(!0), g.current = !0;
      try {
        const D = await _r({
          ...w.current,
          cursor: y,
          page: {
            ...(A = w.current) == null ? void 0 : A.page,
            cursor: y
          }
        });
        s((j) => [...j, D]), o((j) => [...j, y]);
      } catch (D) {
        x(((P = D == null ? void 0 : D.response) == null ? void 0 : P.data) ?? (D == null ? void 0 : D.data) ?? {});
      } finally {
        f(!1), c(!1), g.current = !1;
      }
    }
  }, [S, y]), I = Y((B) => {
    s((A) => {
      var q;
      if (!A || A.length === 0)
        return [
          {
            data: {
              data: cn([], B)
            }
          }
        ];
      const P = A[0], D = ((q = P.data) == null ? void 0 : q.data) ?? [], j = cn(D, B);
      return [
        {
          ...P,
          data: {
            ...P.data,
            data: j
          }
        },
        ...A.slice(1)
      ];
    });
  }, []);
  return re(() => {
    if (!n || !v) {
      s([]), o([]), u(!1), c(!1);
      return;
    }
    let B = !0;
    return (async () => {
      var P;
      u(!0), c(!0), g.current = !0, x({});
      try {
        const D = await _r({
          ...t,
          page: {
            ...t == null ? void 0 : t.page
          }
        });
        B && (s([D]), o([]));
      } catch (D) {
        B && x(((P = D == null ? void 0 : D.response) == null ? void 0 : P.data) ?? (D == null ? void 0 : D.data) ?? {});
      } finally {
        B && (u(!1), c(!1), g.current = !1);
      }
    })(), () => {
      B = !1;
    };
  }, [v, n]), {
    data: Ge(() => !a || a.length === 0 ? [] : a.reduce((B, A) => {
      var D;
      const P = ((D = A == null ? void 0 : A.data) == null ? void 0 : D.data) ?? [];
      return Di(B, P);
    }, []), [a]),
    rawPages: a,
    isLoading: d,
    isPending: d,
    isFetching: m,
    isFetchingNextPage: h,
    hasNextPage: S,
    fetchNextPage: z,
    errors: p,
    refetch: $,
    prependIncomingMessage: I,
    meta: (T = (U = a[0]) == null ? void 0 : U.data) == null ? void 0 : T.meta
  };
}, $i = () => pt(
  ({ conversationId: t, body: r, sender_id: n }) => ji(t, { body: r, sender_id: n }).then(
    (a) => a.data.data
  )
), Ui = () => pt(
  ({ conversationId: t, file: r, sender_id: n, caption: a }) => Li(t, { file: r, sender_id: n, caption: a }).then(
    (s) => s.data.data
  )
), Ln = () => {
  const t = Y(async (r) => (await Ks(r)).data.data, []);
  return pt(
    t
  );
}, Hi = () => pt(
  (t) => Js(t).then(() => {
  })
), Wi = () => {
  const t = Y(async (r) => {
    const n = await Rn(r);
    wt(r);
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
  return pt(
    t
  );
};
function Xr(t) {
  return t != null && typeof t == "object" && "attributes" in t;
}
function Qe(t) {
  return t == null ? "" : String(t);
}
function qi(t) {
  if (t == null || typeof t != "object") return;
  if (Xr(t)) return t;
  const r = t;
  return {
    id: Qe(r.id),
    type: "user",
    attributes: {
      user_auth_id: Number(r.user_auth_id),
      name: Qe(r.name),
      avatar_url: Qe(r.avatar_url),
      created_at: Qe(r.created_at),
      updated_at: Qe(r.updated_at)
    },
    relationships: []
  };
}
function Oi(t) {
  if (t == null || typeof t != "object") return;
  if (Xr(t)) return t;
  const r = t;
  return {
    id: Qe(r.id),
    type: "messageAttachment",
    attributes: {
      file_url: Qe(r.file_url),
      file_name: Qe(r.file_name),
      file_mime_type: Qe(r.file_mime_type),
      file_size: Number(r.file_size),
      created_at: Qe(r.created_at)
    },
    relationships: []
  };
}
function Vi(t) {
  return typeof t == "string" ? { id: 0, name: t, icon: "" } : t != null && typeof t == "object" ? t : null;
}
function Gi(t) {
  if (t == null || typeof t != "object")
    return {
      id: "",
      type: "message",
      attributes: {},
      relationships: { sender: void 0, attachments: [] }
    };
  if (Xr(t)) return t;
  const r = t, n = Array.isArray(r.attachments) ? r.attachments.map(Oi).filter((a) => a != null) : [];
  return {
    id: Qe(r.id),
    type: "message",
    attributes: {
      conversation_id: Number(r.conversation_id),
      sender_id: Number(r.sender_id),
      body: Qe(r.body),
      type: Vi(r.type),
      metadata: r.metadata ?? void 0,
      created_at: Qe(r.created_at),
      updated_at: Qe(r.updated_at)
    },
    relationships: {
      sender: qi(r.sender),
      attachments: n
    }
  };
}
let It = null, un = null;
function Bn(t) {
  if (typeof window > "u")
    return null;
  const r = JSON.stringify(t);
  return It && un !== r && (It.disconnect(), It = null), It || (It = new Ya(
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
  ), un = r), It;
}
function Fn(t, r, n, a) {
  if (typeof window > "u")
    return () => {
    };
  const s = Bn(t);
  if (!s) return () => {
  };
  const l = s.subscribe(`conversation.${r}`);
  if (l.bind("MessageSent", (o) => {
    var c;
    const d = Gi(o), u = (c = d.attributes.metadata) == null ? void 0 : c.session_uuid, m = d.attributes.conversation_id || r;
    u && m && Mt(m, String(u)), n(d);
  }), a) {
    const o = (d) => a(d);
    l.bind("UserTyping", o), l.bind("client-UserTyping", o);
  }
  return () => {
    l.unbind_all(), s.unsubscribe(`conversation.${r}`);
  };
}
function $n(t, r, n, a) {
  if (typeof window > "u")
    return () => {
    };
  const s = Bn(t);
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
let mn = 0;
const Ki = 1e3;
let Tt = null;
function Ji() {
  if (typeof window > "u") return null;
  try {
    const t = window.AudioContext || window.webkitAudioContext;
    return t ? ((!Tt || Tt.state === "closed") && (Tt = new t()), Tt.state === "suspended" && Tt.resume(), Tt) : null;
  } catch {
    return null;
  }
}
function $t(t, r, n, a, s) {
  const l = t.createOscillator(), o = t.createGain();
  l.type = "sine", l.frequency.setValueAtTime(r, n), o.gain.setValueAtTime(1e-4, n), o.gain.exponentialRampToValueAtTime(s, n + 0.015), o.gain.exponentialRampToValueAtTime(1e-4, n + a), l.connect(o), o.connect(t.destination), l.start(n), l.stop(n + a + 0.05);
}
function cr(t = "focused", r = {}) {
  if (typeof window > "u") return !1;
  const n = r.throttleMs ?? Ki, a = Date.now();
  if (!r.force && a - mn < n)
    return !1;
  mn = a;
  const s = Ji();
  if (!s) return !1;
  const l = Math.max(0, Math.min(1, r.volume ?? 1));
  try {
    const o = s.currentTime;
    return t === "focused" ? ($t(s, 587.33, o, 0.08, 0.12 * l), $t(s, 880, o + 0.06, 0.14, 0.1 * l)) : ($t(s, 523.25, o, 0.1, 0.15 * l), $t(s, 659.25, o + 0.08, 0.1, 0.14 * l), $t(s, 783.99, o + 0.16, 0.22, 0.16 * l)), !0;
  } catch {
    return !1;
  }
}
function Xi(t, r) {
  var a, s, l, o, d;
  const n = [];
  for (let u = t.length - 1; u >= 0; u--) {
    const m = (a = t[u]) == null ? void 0 : a.messages;
    if (Array.isArray(m))
      for (let c = m.length - 1; c >= 0; c--) {
        const h = m[c], f = (((s = h == null ? void 0 : h.attributes) == null ? void 0 : s.body) || "").trim();
        if (!f) continue;
        const p = ((o = (l = h == null ? void 0 : h.relationships) == null ? void 0 : l.sender) == null ? void 0 : o.id) ?? ((d = h == null ? void 0 : h.attributes) == null ? void 0 : d.sender_id), x = r && String(p) === String(r) ? "user" : "assistant";
        n.push({ role: x, content: f });
      }
  }
  return n.slice(-20);
}
function Yi(t, r) {
  var a, s, l, o;
  const n = Ht(t);
  if (n) return n;
  for (let d = 0; d < r.length; d++) {
    const u = (a = r[d]) == null ? void 0 : a.messages;
    if (Array.isArray(u))
      for (let m = 0; m < u.length; m++) {
        const c = (o = (l = (s = u[m]) == null ? void 0 : s.attributes) == null ? void 0 : l.metadata) == null ? void 0 : o.session_uuid;
        if (c) return String(c);
      }
  }
  return `conv_${t}`;
}
function Ar(t, r, n) {
  var l, o, d, u;
  const a = ((l = t.attributes) == null ? void 0 : l.metadata) || {}, s = {
    ...a,
    ...r ? {
      session_uuid: r.session_uuid ?? a.session_uuid,
      state: r.state ?? a.state,
      intent: r.intent ?? a.intent,
      confidence: r.confidence ?? a.confidence,
      solution_id: r.solution_id ?? a.solution_id,
      article: r.article ?? a.article,
      tickets: r.tickets ?? a.tickets,
      ttft_ms: r.ttft_ms ?? a.ttft_ms,
      total_ms: r.total_ms ?? a.total_ms,
      action_buttons: r.action_buttons && r.action_buttons.length > 0 ? r.action_buttons : a.action_buttons
    } : {}
  };
  return {
    ...t,
    isStreaming: !1,
    attributes: {
      ...t.attributes,
      body: (d = (o = t.attributes) == null ? void 0 : o.body) != null && d.trim() ? t.attributes.body : n || ((u = t.attributes) == null ? void 0 : u.body) || "",
      metadata: s
    }
  };
}
const Qi = (t, r) => {
  const { config: n, currentUser: a, currentUserId: s } = at(), l = Ge(
    () => ({ conversation: t.id, page: { size: "20" } }),
    [t.id]
  ), {
    data: o,
    refetch: d,
    fetchNextPage: u,
    hasNextPage: m,
    isFetchingNextPage: c,
    isLoading: h,
    prependIncomingMessage: f
  } = Fi({
    params: l,
    enabled: !!t.id
  }), { mutateAsync: p, isLoading: x } = $i(), { mutateAsync: w, isLoading: g } = Ui(), { mutateAsync: v } = Ln(), { mutate: b } = Hi(), { mutateAsync: y, isLoading: S } = Wi(), [$, z] = k(""), [I, J] = k(null), U = !!t.attributes.closed_at, [T, B] = k([]), [A, P] = k(!1), [D, j] = k(!0), [q, Z] = k(0), [X, de] = k("Hoy"), [N, C] = k(null), V = W(null), E = W(!1), H = W(!1), F = W(!0), ce = W(0), xe = W(0), te = W(!1), we = W(m), pe = W(t.id), ue = W(o), Ve = W([]), Le = W(null), Ce = W(null), Me = W(null), We = W(null), Re = W(null), Ue = W(null), Xe = W(!1), bt = W(b), st = Et(t, s), ut = Jr(t, s) || Ot(st), it = jt(t, s);
  ue.current = o;
  const R = Y(
    (L) => {
      B((Ne) => {
        const Se = typeof L == "function" ? L(Ne) : L;
        return Ve.current = Se, Se;
      });
    },
    []
  );
  re(() => {
    bt.current = b;
  }, [b]), re(() => {
    te.current = c;
  }, [c]), re(() => {
    we.current = m;
  }, [m]);
  const be = Y(() => {
    const L = V.current;
    L && (L.scrollTo({
      top: L.scrollHeight,
      behavior: "smooth"
    }), Z(0), F.current = !0, j(!0));
  }, []), he = Y(() => {
    const L = V.current;
    if (!L) return;
    const Se = L.scrollHeight - L.scrollTop - L.clientHeight < 140;
    F.current = Se, j(Se), Se && Z(0);
    const _e = L.querySelectorAll("[data-message-date]");
    if (_e.length === 0) {
      de("Hoy");
      return;
    }
    const Ae = L.getBoundingClientRect(), Pe = Ae.top, G = Ae.bottom;
    let ie = null;
    for (let ne = 0; ne < _e.length; ne++) {
      const fe = _e[ne], ve = fe.getBoundingClientRect();
      if (ve.bottom > Pe && ve.top < G) {
        ie = fe.getAttribute("data-message-date");
        break;
      }
    }
    de(ie || _e[_e.length - 1].getAttribute("data-message-date") || "Hoy");
  }, []);
  re(() => {
    var L;
    pe.current !== t.id && (pe.current = t.id, (L = Me.current) == null || L.abort(), Me.current = null, Le.current = null, Ce.current = null, E.current = !1, H.current = !1, F.current = !0, ce.current = 0, xe.current = 0, R([]), P(!1), j(!0), Z(0), de("Hoy"));
  }, [t.id, R]), re(() => {
    if (E.current || h || o.length === 0) return;
    const L = V.current;
    L && (L.scrollTop = L.scrollHeight, E.current = !0, j(!0), he());
  }, [t.id, h, o.length, he]), oa(() => {
    const L = V.current;
    if (L && ce.current > 0) {
      const Se = L.scrollHeight - ce.current;
      Se > 0 && (L.scrollTop = xe.current + Se), ce.current = 0, xe.current = 0;
    }
  }, [o]), re(() => {
    if (T.length > 0) {
      const L = V.current;
      if (L) {
        H.current = !0, L.scrollTo({
          top: L.scrollHeight,
          behavior: "smooth"
        });
        const Ne = setTimeout(() => {
          H.current = !1;
        }, 500);
        return () => clearTimeout(Ne);
      }
    }
  }, [T.length]), re(() => {
    const L = V.current;
    if (!L) return;
    const Ne = () => {
      he(), !(H.current || !E.current) && L.scrollTop < 80 && we.current && !te.current && !h && (te.current = !0, ce.current = L.scrollHeight, xe.current = L.scrollTop, u().finally(() => {
        te.current = !1;
      }));
    };
    return L.addEventListener("scroll", Ne, { passive: !0 }), () => {
      L.removeEventListener("scroll", Ne);
    };
  }, [u, h, he]);
  const se = Y(() => {
    !t.id || !s || (We.current && clearTimeout(We.current), We.current = setTimeout(() => {
      We.current = null, v({
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
  }, [t.id, s, v]);
  re(() => () => {
    var L;
    (L = Me.current) == null || L.abort(), Me.current = null, We.current && (clearTimeout(We.current), We.current = null), Re.current && (clearTimeout(Re.current), Re.current = null), Ue.current && (clearTimeout(Ue.current), Ue.current = null), C(null);
  }, [t.id]);
  const ee = Y(
    (L) => {
      var ie, ne;
      const Ne = (L.attributes.body || "").trim(), Se = !!(s && String(L.attributes.sender_id) === String(s)), _e = Ot((ie = L.relationships) == null ? void 0 : ie.sender) || !Se && ut;
      let Ae = L;
      if (Se) {
        const fe = Ve.current.find(
          (ve) => !ve.id.startsWith("temp_bot_") && (ve.attributes.body || "").trim() === Ne
        );
        fe && R(
          (ve) => ve.filter((He) => He.id !== fe.id)
        );
      } else if (_e) {
        const fe = Ve.current.find(
          (ve) => ve.id.startsWith("temp_bot_")
        );
        if (fe) {
          if (fe.isStreaming) {
            Le.current = L, Re.current && (clearTimeout(Re.current), Re.current = null), C(null), se();
            return;
          }
          Ae = Ar(
            L,
            fe.attributes.metadata || ((ne = Ce.current) == null ? void 0 : ne.meta)
          ), R(
            (ve) => ve.filter((He) => He.id !== fe.id)
          ), Ce.current = null;
        } else Ce.current && (!Ne || Ce.current.text.trim() === Ne) && (Ae = Ar(L, Ce.current.meta), Ce.current = null);
      }
      f(Ae);
      const Pe = V.current;
      Pe && (Pe.scrollHeight - Pe.scrollTop - Pe.clientHeight < 160 ? setTimeout(() => {
        Pe.scrollTo({
          top: Pe.scrollHeight,
          behavior: "smooth"
        });
      }, 50) : Z((ve) => ve + 1)), s && String(L.attributes.sender_id) !== String(s) && (cr("focused"), Re.current && (clearTimeout(Re.current), Re.current = null), C(null)), se();
    },
    [s, ut, f, se, R]
  ), De = Y(
    (L) => {
      if (String(L.user_id) !== String(s)) {
        if (Re.current && (clearTimeout(Re.current), Re.current = null), !L.is_typing) {
          C(null);
          return;
        }
        C(L.user.name), Re.current = setTimeout(() => {
          Re.current = null, C(null);
        }, 6e4);
      }
    },
    [s]
  ), Ie = Y(
    (L) => {
      !t.id || !s || Xe.current === L || (Xe.current = L, bt.current({
        conversationId: t.id,
        user_id: Number(s),
        is_typing: L
      }));
    },
    [t.id, s]
  ), rt = Y(() => {
    Ue.current && clearTimeout(Ue.current), Ue.current = setTimeout(() => {
      Ue.current = null, Ie(!1);
    }, 2500);
  }, [Ie]), ye = Y(
    (L) => {
      if (!U) {
        if (z(L), !L.trim()) {
          Ue.current && (clearTimeout(Ue.current), Ue.current = null), Ie(!1);
          return;
        }
        Ie(!0), rt();
      }
    },
    [U, rt, Ie]
  );
  re(() => () => {
    Ue.current && (clearTimeout(Ue.current), Ue.current = null), Ie(!1);
  }, [t.id, Ie]);
  const mt = () => {
    t.attributes.unread_count && se();
  };
  re(() => {
    mt();
  }, [t, o, se]), re(() => {
    var L, Ne, Se;
    if (t.id) {
      if (U) {
        wt(t.id);
        return;
      }
      if (!Ht(t.id))
        for (let _e = o.length - 1; _e >= 0; _e--) {
          const Ae = o[_e];
          if (Array.isArray(Ae == null ? void 0 : Ae.messages))
            for (let Pe = Ae.messages.length - 1; Pe >= 0; Pe--) {
              const G = (Se = (Ne = (L = Ae.messages[Pe]) == null ? void 0 : L.attributes) == null ? void 0 : Ne.metadata) == null ? void 0 : Se.session_uuid;
              if (G) {
                Mt(t.id, String(G));
                return;
              }
            }
        }
    }
  }, [t.id, U, o]), re(() => {
    if (!t.id) return;
    const L = Fn(
      n.reverb,
      Number(t.id),
      ee,
      De
    );
    return () => {
      L();
    };
  }, [n.reverb, t.id, ee, De]);
  const Q = Y(
    (L) => {
      U || J(L);
    },
    [U]
  ), lt = async (L) => {
    var Pe;
    if (U) return;
    const Ne = (typeof L == "string" ? L : $).trim();
    if (!Ne && !I || !a) return;
    const Se = typeof L == "string" ? null : I, _e = Ti({
      conversationId: t.id,
      sender: a,
      body: Ne,
      file: Se
    }), Ae = _e.id;
    if (typeof L != "string" && z(""), Ue.current && (clearTimeout(Ue.current), Ue.current = null), Ie(!1), ut && !Se && Ne) {
      const G = Yi(t.id, ue.current);
      Mt(t.id, G);
      const ie = Xi(ue.current, s), ne = st || {
        id: "1",
        type: "user",
        attributes: {
          user_auth_id: 0,
          name: "Asistente Virtual IA",
          avatar_url: null,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        relationships: []
      }, fe = `temp_bot_${Date.now()}`, ve = {
        id: fe,
        type: "message",
        attributes: {
          conversation_id: Number(t.id),
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          sender_id: Number(ne.id || 1),
          body: "",
          type: { id: 0, name: "message", icon: "" },
          metadata: {
            session_uuid: G
          }
        },
        relationships: {
          sender: ne,
          attachments: []
        },
        isStreaming: !0
      };
      Le.current = null, Ce.current = null, (Pe = Me.current) == null || Pe.abort();
      const He = new AbortController();
      Me.current = He;
      let K = { session_uuid: G }, qe = "";
      R((ke) => [
        ...ke,
        _e,
        ve
      ]), P(!0);
      try {
        await Ri(
          {
            session_id: G,
            message: Ne,
            user_id: Number(a.id),
            conversation_id: Number(t.id),
            history: ie
          },
          {
            onMeta: (ke) => {
              ke.session_uuid && Mt(t.id, ke.session_uuid), K = {
                ...K,
                session_uuid: ke.session_uuid ?? K.session_uuid,
                state: ke.state ?? K.state,
                intent: ke.intent ?? K.intent,
                confidence: ke.confidence ?? K.confidence,
                article: ke.article ?? K.article,
                tickets: ke.tickets ?? K.tickets,
                ttft_ms: ke.ttft_ms ?? K.ttft_ms
              }, R(
                (Oe) => Oe.map((ze) => ze.id === Ae ? { ...ze, local_status: "sent" } : ze.id === fe ? {
                  ...ze,
                  attributes: {
                    ...ze.attributes,
                    metadata: {
                      ...ze.attributes.metadata || {},
                      ...K
                    }
                  }
                } : ze)
              );
            },
            onDelta: (ke) => {
              qe += ke, R(
                (Oe) => Oe.map((ze) => ze.id === Ae ? { ...ze, local_status: "sent" } : ze.id === fe ? {
                  ...ze,
                  isStreaming: !0,
                  attributes: {
                    ...ze.attributes,
                    body: (ze.attributes.body || "") + ke
                  }
                } : ze)
              ), F.current && V.current && requestAnimationFrame(() => {
                V.current && (V.current.scrollTop = V.current.scrollHeight);
              });
            },
            onDone: (ke) => {
              ke.session_uuid && Mt(t.id, ke.session_uuid);
              const Oe = ke.reply || ke.message || qe;
              K = {
                ...K,
                session_uuid: ke.session_uuid ?? K.session_uuid,
                state: ke.state ?? K.state,
                solution_id: ke.solution_id ?? K.solution_id,
                article: ke.article ?? K.article,
                action_buttons: ke.action_buttons ?? K.action_buttons,
                total_ms: ke.total_ms ?? K.total_ms
              };
              const ze = Le.current;
              if (ze) {
                Le.current = null, Ce.current = null;
                const Nt = Ar(
                  ze,
                  K,
                  Oe
                );
                R(
                  (ot) => ot.map(
                    (kt) => kt.id === Ae ? { ...kt, local_status: "sent" } : kt
                  ).filter((kt) => kt.id !== fe)
                ), f(Nt), cr("focused"), F.current && V.current && requestAnimationFrame(() => {
                  V.current && (V.current.scrollTop = V.current.scrollHeight);
                });
                return;
              }
              Ce.current = {
                text: Oe,
                meta: K
              }, R(
                (Nt) => Nt.map((ot) => ot.id === Ae ? { ...ot, local_status: "sent" } : ot.id === fe ? {
                  ...ot,
                  isStreaming: !1,
                  attributes: {
                    ...ot.attributes,
                    body: Oe,
                    metadata: {
                      ...ot.attributes.metadata || {},
                      ...K
                    }
                  }
                } : ot)
              );
            },
            onError: (ke) => {
              Te.error(ke.message || "Error al obtener respuesta del asistente"), R(
                (Oe) => Oe.map((ze) => ze.id === Ae ? { ...ze, local_status: "error" } : ze.id === fe ? { ...ze, isStreaming: !1 } : ze).filter((ze) => !(ze.id === fe && !(ze.attributes.body || "").trim()))
              );
            }
          },
          { signal: He.signal }
        );
      } catch {
      } finally {
        Me.current === He && (Me.current = null), P(!1);
      }
      return;
    }
    R((G) => [...G, _e]);
    try {
      await (Se ? w({
        conversationId: t.id,
        file: Se,
        sender_id: Number(a.id),
        caption: Ne || void 0
      }) : p({
        body: Ne,
        conversationId: t.id,
        sender_id: a.id
      })), J(null), await d(), R((G) => G.filter((ie) => ie.id !== Ae));
    } catch {
      R(
        (G) => G.map(
          (ie) => ie.id === Ae ? { ...ie, local_status: "error" } : ie
        )
      );
    }
  }, xt = Y(async () => {
    var L, Ne, Se;
    try {
      await y(t.id), Te.success("Conversación cerrada exitosamente"), (L = r == null ? void 0 : r.onCloseSuccess) == null || L.call(r);
    } catch (_e) {
      const Ae = ((Se = (Ne = _e == null ? void 0 : _e.response) == null ? void 0 : Ne.data) == null ? void 0 : Se.message) || (_e == null ? void 0 : _e.message) || "Error al cerrar la conversación";
      Te.error(Ae);
    }
  }, [y, t.id, r]);
  return {
    messages: o,
    optimisticMessages: T,
    scrollRef: V,
    conversationName: it,
    inputText: $,
    pendingFile: I,
    isClosed: U,
    isClosing: S,
    isSending: x || A,
    isBotStreaming: A,
    isUploading: g,
    isFetchingNextPage: c,
    hasNextPage: m,
    isLoading: h,
    isNearBottom: D,
    newMessagesCount: q,
    typingUser: N,
    visibleDate: X,
    currentUser: a,
    currentUserId: s,
    scrollToBottom: be,
    setInputText: ye,
    setPendingFile: J,
    handleSendMessage: lt,
    handleSelectFile: Q,
    handleCloseConversation: xt,
    refetchMessages: d
  };
};
function Un(t) {
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
const Zi = () => {
  const t = Y(async (r) => {
    var s;
    const n = await Ds(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    if (typeof window < "u" && (a != null && a.conversation_id)) {
      const l = Un(a);
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
  return pt(
    t
  );
}, el = ({
  sessionId: t,
  enabled: r = !1,
  intervalMs: n = 5e3,
  onStatusUpdate: a,
  onAssigned: s,
  onError: l
} = {}) => {
  const [o, d] = k(null), [u, m] = k(!1), [c, h] = k(null), f = W(!1), p = W(a), x = W(s), w = W(l);
  p.current = a, x.current = s, w.current = l;
  const g = Y(async () => {
    var v, b, y, S;
    if (!t || f.current) return null;
    try {
      m(!0);
      const $ = await Rs(t), z = ((v = $.data) == null ? void 0 : v.data) ?? $.data;
      if (d(z), h(null), (b = p.current) == null || b.call(p, z), ((z == null ? void 0 : z.status) === "escalated_live" || (z == null ? void 0 : z.mode) === "live_chat" || !!(z != null && z.conversation_id)) && !f.current) {
        if (f.current = !0, typeof window < "u" && (z != null && z.conversation_id)) {
          const J = Un(z);
          window.dispatchEvent(
            new CustomEvent("messenger:conversation-created", {
              detail: {
                conversationId: String(z.conversation_id),
                conversation: J,
                focus: !0
              }
            })
          );
        }
        (y = x.current) == null || y.call(x, z);
      }
      return z;
    } catch ($) {
      const z = $;
      return h(z), (S = w.current) == null || S.call(w, z), null;
    } finally {
      m(!1);
    }
  }, [t]);
  return re(() => {
    f.current = !1;
  }, [t]), re(() => {
    if (!r || !t)
      return;
    g();
    const v = setInterval(() => {
      if (f.current) {
        clearInterval(v);
        return;
      }
      g();
    }, n);
    return () => {
      clearInterval(v);
    };
  }, [g, r, n, t]), {
    data: o,
    isPolling: u,
    error: c,
    checkStatus: g,
    isAssigned: f.current
  };
}, tl = () => {
  const t = Y(async (r) => {
    var s;
    const n = await js(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
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
  return pt(t);
};
function rl(t, r, n = "OR") {
  const a = Array.isArray(r) ? r : [r];
  return a.length === 0 ? !0 : n === "AND" ? a.every((s) => t.includes(s)) : a.some((s) => t.includes(s));
}
function dt({
  permission: t,
  operator: r = "OR"
}) {
  const n = Kr(), a = (n == null ? void 0 : n.permissions) ?? [];
  return rl(a, t, r);
}
function nl({
  conversation: t,
  isClosed: r = !!t.attributes.closed_at,
  isClosing: n = !1,
  onCloseConversation: a,
  showResolvedBadge: s = !1,
  className: l,
  ...o
}) {
  const [d, u] = k(!1), { currentUserId: m } = at(), c = dt({
    permission: ["messenger_chat_support.provide_support"]
  }), h = jt(t, m);
  return r && s ? /* @__PURE__ */ i(
    "div",
    {
      className: M(
        "inline-flex h-8 items-center gap-1.5 rounded-lg border-none dark:border-neutral-700/80 bg-neutral-100/60 dark:bg-neutral-800/60 px-2.5 sm:px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 select-none ",
        l
      ),
      children: [
        /* @__PURE__ */ e(yt, { className: "size-3.5 text-emerald-500" }),
        /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Resuelta" })
      ]
    }
  ) : r && !s || !c ? null : /* @__PURE__ */ i(Fe, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        disabled: n,
        onClick: () => u(!0),
        title: "Cerrar y marcar conversación como resuelta",
        "aria-label": "Cerrar conversación",
        className: M(
          "group inline-flex h-8 items-center gap-1.5 rounded-lg border-none dark:border-neutral-700/80 bg-white dark:bg-neutral-800/90 px-2.5 sm:px-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-all hover:border-emerald-300 dark:hover:border-emerald-700/70 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 dark:hover:text-emerald-300 active:scale-[0.98] cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          l
        ),
        ...o,
        children: n ? /* @__PURE__ */ i(Fe, { children: [
          /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin text-neutral-500" }),
          /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Cerrando..." })
        ] }) : /* @__PURE__ */ i(Fe, { children: [
          /* @__PURE__ */ e(yt, { className: "size-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover:scale-110" }),
          /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Cerrar chat" })
        ] })
      }
    ),
    /* @__PURE__ */ e(cs, { open: d, onOpenChange: u, children: /* @__PURE__ */ i(ds, { className: "sm:max-w-md p-5", children: [
      /* @__PURE__ */ i(us, { className: "gap-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ e("div", { className: "flex size-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20", children: /* @__PURE__ */ e(_t, { className: "size-4" }) }),
          /* @__PURE__ */ e(ms, { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "¿Cerrar conversación?" })
        ] }),
        /* @__PURE__ */ i(hs, { className: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: [
          "¿Estás seguro de que deseas marcar como resuelta y cerrar la conversación con",
          " ",
          /* @__PURE__ */ e("strong", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children: h }),
          "? Esta acción finalizará la atención en tiempo real."
        ] })
      ] }),
      /* @__PURE__ */ i(fs, { className: "gap-2 sm:gap-0 mt-3", children: [
        /* @__PURE__ */ e(ps, { disabled: n, className: "text-xs h-8 cursor-pointer", children: "Cancelar" }),
        /* @__PURE__ */ e(
          bs,
          {
            disabled: n,
            onClick: () => {
              u(!1), a == null || a();
            },
            className: "text-xs ms-2 h-8 bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer",
            children: "Sí, cerrar conversación"
          }
        )
      ] })
    ] }) })
  ] });
}
function al({
  conversation: t,
  isClosed: r,
  isClosing: n = !1,
  onCloseConversation: a,
  isContextPanelOpen: s = !0,
  onToggleContextPanel: l,
  onBack: o,
  alwaysShowBackButton: d = !1,
  renderOptions: u,
  onStartVoiceCall: m
}) {
  var w, g;
  const { currentUserId: c } = at(), h = Yt(t), f = jt(t, c), p = Et(t, c), x = Jr(t, c) || Ot(p);
  return /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 p-2 sm:p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs min-w-0", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden", children: [
      o && /* @__PURE__ */ e(
        ge,
        {
          variant: "ghost",
          size: "sm",
          onClick: o,
          title: "Volver a la lista de chats",
          "aria-label": "Volver a la lista de chats",
          className: M(
            "size-8 p-0 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
            d ? "flex" : "flex md:hidden"
          ),
          children: /* @__PURE__ */ e($r, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ e(
        nt,
        {
          src: p == null ? void 0 : p.attributes.avatar_url,
          name: f,
          isGroup: h,
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
              title: f,
              children: f
            }
          ),
          x && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 rounded-full bg-violet-100 dark:bg-violet-950/70 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40 shrink-0 shadow-2xs", children: [
            /* @__PURE__ */ e(Lr, { className: "size-2.5 text-violet-600 dark:text-violet-400" }),
            /* @__PURE__ */ e("span", { children: "Asistente IA" })
          ] }),
          r && /* @__PURE__ */ i(
            vt,
            {
              variant: "destructive",
              className: "inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium shrink-0 py-0 h-4.5 px-1.5",
              children: [
                /* @__PURE__ */ e(_t, { className: "size-2.5" }),
                /* @__PURE__ */ e("span", { children: "Cerrada" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 min-w-0", children: /* @__PURE__ */ e("span", { className: "truncate", children: h ? `${((g = (w = t.relationships) == null ? void 0 : w.users) == null ? void 0 : g.length) || 0} participantes` : x ? "Asistente virtual automatizado" : "Conversación individual" }) })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 shrink-0", children: [
      x && !r && m && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: m,
          title: "Llamar al Asistente de Voz (Interactivo)",
          "aria-label": "Llamar al Asistente de Voz",
          className: "group inline-flex h-8 items-center gap-1.5 rounded-lg border-none dark:border-neutral-700/80 bg-white dark:bg-neutral-800/90 px-2.5 sm:px-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-all hover:border-emerald-300 dark:hover:border-emerald-700/70 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 dark:hover:text-emerald-300 active:scale-[0.98] cursor-pointer",
          children: [
            /* @__PURE__ */ e(ya, { className: "size-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover:scale-110" }),
            /* @__PURE__ */ e("span", { className: "tracking-tight", children: "Llamar" })
          ]
        }
      ),
      (u == null ? void 0 : u.customHeaderButtons) !== void 0 ? u.customHeaderButtons : /* @__PURE__ */ e(
        nl,
        {
          conversation: t,
          isClosed: r,
          isClosing: n,
          onCloseConversation: a,
          showResolvedBadge: !1
        }
      ),
      l && /* @__PURE__ */ e(
        ge,
        {
          variant: "outline",
          size: "icon",
          onClick: l,
          className: M(
            "size-8 p-0",
            s ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" : ""
          ),
          children: /* @__PURE__ */ e(Na, { className: "size-4" })
        }
      )
    ] })
  ] });
}
const sl = /* @__PURE__ */ new Set(["http:", "https:", "mailto:"]);
function Yr(t) {
  const r = t.trim();
  if (!r) return null;
  try {
    const n = new URL(r);
    return sl.has(n.protocol.toLowerCase()) ? n.href : null;
  } catch {
    return null;
  }
}
function St(t) {
  return t ? t.replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&amp;/gi, "&") : "";
}
function il({
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
      className: M(
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
              children: a ? /* @__PURE__ */ i(Fe, { children: [
                /* @__PURE__ */ e(Ur, { className: "size-3 text-emerald-400" }),
                /* @__PURE__ */ e("span", { className: "text-emerald-400", children: "Copiado" })
              ] }) : /* @__PURE__ */ i(Fe, { children: [
                /* @__PURE__ */ e(ka, { className: "size-3" }),
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
function Ye(t) {
  if (!t) return [];
  const r = [];
  let n = t;
  const a = /^`([^`]+)`/, s = /^\*\*([^*]+)\*\*/, l = /^__([^_]+)__/, o = /^\*([^*]+)\*/, d = /^_([^_]+)_/, u = /^~~([^~]+)~~/, m = /^\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/, c = /^((?:https?:\/\/|mailto:)[^\s<]+[^<.,:;"')\]\s])/, h = /^<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/i, f = /^<(?:i|em)>([\s\S]*?)<\/(?:i|em)>/i, p = /^<u>([\s\S]*?)<\/u>/i, x = /^<(?:s|strike|del)>([\s\S]*?)<\/(?:s|strike|del)>/i, w = /^<code>([\s\S]*?)<\/code>/i, g = /^<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/i, v = /^<br\s*\/?>/i;
  for (; n.length > 0; ) {
    let b = n.match(v);
    if (b) {
      r.push({ type: "br" }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(a), b) {
      r.push({ type: "inlineCode", value: b[1] }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(w), b) {
      r.push({ type: "inlineCode", value: St(b[1]) }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(m), b) {
      r.push({
        type: "link",
        label: b[1],
        href: b[2]
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(g), b) {
      r.push({
        type: "link",
        href: b[1],
        label: St(b[2].replace(/<[^>]*>/g, ""))
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(s) || n.match(l), b) {
      r.push({
        type: "bold",
        children: Ye(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(h), b) {
      r.push({
        type: "bold",
        children: Ye(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(o) || n.match(d), b) {
      r.push({
        type: "italic",
        children: Ye(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(f), b) {
      r.push({
        type: "italic",
        children: Ye(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(u), b) {
      r.push({
        type: "strike",
        children: Ye(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(x), b) {
      r.push({
        type: "strike",
        children: Ye(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(p), b) {
      r.push({
        type: "underline",
        children: Ye(b[1])
      }), n = n.slice(b[0].length);
      continue;
    }
    if (b = n.match(c), b) {
      r.push({
        type: "link",
        href: b[1],
        label: b[1],
        isAuto: !0
      }), n = n.slice(b[0].length);
      continue;
    }
    const y = n.search(/[`*~_\[<]|https?:\/\/|mailto:/);
    if (y === -1) {
      r.push({ type: "text", value: St(n) });
      break;
    } else y === 0 ? (r.push({ type: "text", value: St(n[0]) }), n = n.slice(1)) : (r.push({
      type: "text",
      value: St(n.slice(0, y))
    }), n = n.slice(y));
  }
  return r;
}
function hn(t) {
  const r = t.trim();
  if (!r.includes("|")) return !1;
  const n = r.split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  return n.length === 0 ? !1 : n.every((a) => /^:?-+:?$/.test(a));
}
function fn(t) {
  let r = t.trim();
  return r.startsWith("|") && (r = r.slice(1)), r.endsWith("|") && (r = r.slice(0, -1)), r.split("|").map((n) => n.trim());
}
function ll(t) {
  if (!t) return [];
  const n = t.replace(/\r\n/g, `
`).replace(
    /<pre[^>]*>\s*<code(?:\s+class=["'][^"']*language-([a-zA-Z0-9_-]+)[^"']*["'])?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (l, o, d) => {
      const u = St(d.replace(/<br\s*\/?>/gi, `
`));
      return `
\`\`\`${o || ""}
${u}
\`\`\`
`;
    }
  ).replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (l, o) => `
\`\`\`
${St(o.replace(/<br\s*\/?>/gi, `
`).replace(/<\/?code[^>]*>/gi, ""))}
\`\`\`
`).split(`
`), a = [];
  let s = 0;
  for (; s < n.length; ) {
    const l = n[s], o = l.match(/^```\s*([a-zA-Z0-9_-]*)/);
    if (o) {
      const f = o[1] || void 0, p = [];
      for (s++; s < n.length && !n[s].startsWith("```"); )
        p.push(n[s]), s++;
      s < n.length && n[s].startsWith("```") && s++, a.push({
        type: "code",
        language: f,
        code: p.join(`
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
      const f = d[1].length;
      a.push({
        type: "heading",
        level: f,
        children: Ye(d[2].trim())
      }), s++;
      continue;
    }
    if (/^>\s?/.test(l)) {
      const f = [];
      for (; s < n.length && /^>\s?/.test(n[s]); )
        f.push(n[s].replace(/^>\s?/, "")), s++;
      a.push({
        type: "quote",
        lines: f
      });
      continue;
    }
    if (l.trim().startsWith("|") && s + 1 < n.length && hn(n[s + 1])) {
      const p = fn(l).map((w) => Ye(w));
      s += 2;
      const x = [];
      for (; s < n.length && n[s].trim().includes("|"); ) {
        const w = fn(n[s]);
        x.push(w.map((g) => Ye(g))), s++;
      }
      a.push({
        type: "table",
        headers: p,
        rows: x
      });
      continue;
    }
    if (l.match(/^(\s*)([-*+])\s+(.+)$/)) {
      const f = [];
      for (; s < n.length; ) {
        const p = n[s].match(/^(\s*)([-*+])\s+(.+)$/);
        if (!p) break;
        f.push(Ye(p[3])), s++;
      }
      a.push({
        type: "list",
        ordered: !1,
        items: f
      });
      continue;
    }
    const m = l.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (m) {
      const f = parseInt(m[2], 10), p = [];
      for (; s < n.length; ) {
        const x = n[s].match(/^(\s*)(\d+)\.\s+(.+)$/);
        if (!x) break;
        p.push(Ye(x[3])), s++;
      }
      a.push({
        type: "list",
        ordered: !0,
        start: f,
        items: p
      });
      continue;
    }
    const c = [];
    for (; s < n.length && !n[s].startsWith("```") && !n[s].match(/^(#{1,6})\s+/) && !/^(?:-{3,}|\*{3,}|_{3,})$/.test(n[s].trim()) && !/^>\s?/.test(n[s]) && !(n[s].trim().startsWith("|") && s + 1 < n.length && hn(n[s + 1])) && !n[s].match(/^(\s*)(?:[-*+]|\d+\.)\s+/) && (c.push(n[s]), s++, c[c.length - 1].trim() !== ""); )
      ;
    const h = c.join(`
`).replace(/^\n+|\n+$/g, "");
    if (h) {
      const f = [];
      h.split(`
`).forEach((x, w) => {
        w > 0 && f.push({ type: "br" }), x && f.push(...Ye(x));
      }), a.push({
        type: "paragraph",
        children: f
      });
    }
  }
  return a;
}
function ft(t, r, n = "inline") {
  return t.map((a, s) => {
    const l = `${n}-${s}`;
    switch (a.type) {
      case "text":
        return /* @__PURE__ */ e(la.Fragment, { children: a.value }, l);
      case "br":
        return /* @__PURE__ */ e("br", {}, l);
      case "bold":
        return /* @__PURE__ */ e("strong", { className: "font-bold", children: ft(a.children, r, l) }, l);
      case "italic":
        return /* @__PURE__ */ e("em", { className: "italic", children: ft(a.children, r, l) }, l);
      case "underline":
        return /* @__PURE__ */ e("u", { className: "underline underline-offset-2", children: ft(a.children, r, l) }, l);
      case "strike":
        return /* @__PURE__ */ e("del", { className: "line-through opacity-85", children: ft(a.children, r, l) }, l);
      case "inlineCode":
        return /* @__PURE__ */ e(
          "code",
          {
            className: M(
              "inline-block rounded-md px-1.5 py-0.5 font-mono text-[11.5px]",
              r ? "bg-blue-700/80 text-blue-100 border border-blue-400/40" : "bg-slate-900 dark:bg-slate-950 text-emerald-300 dark:text-emerald-400 border border-slate-700/50"
            ),
            children: a.value
          },
          l
        );
      case "link": {
        const o = Yr(a.href);
        return o ? /* @__PURE__ */ i(
          "a",
          {
            href: o,
            target: "_blank",
            rel: "noopener noreferrer",
            className: M(
              "inline-flex items-center gap-0.5 font-semibold underline underline-offset-2 transition-opacity hover:opacity-85 break-all",
              r ? "text-white decoration-blue-200" : "text-blue-600 dark:text-blue-400 decoration-blue-400/60"
            ),
            children: [
              /* @__PURE__ */ e("span", { children: a.label }),
              /* @__PURE__ */ e(Cn, { className: "size-3 shrink-0 inline" })
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
function ol(t, r) {
  return t.map((n, a) => {
    const s = `block-${a}`;
    switch (n.type) {
      case "code":
        return /* @__PURE__ */ e(
          il,
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
        }[n.level], children: ft(n.children, r, s) }, s);
      case "quote":
        return /* @__PURE__ */ e(
          "blockquote",
          {
            className: M(
              "my-1.5 border-l-2 pl-3 italic",
              r ? "border-blue-200 text-blue-50" : "border-violet-400 dark:border-violet-500 text-neutral-600 dark:text-neutral-300"
            ),
            children: n.lines.map((l, o) => /* @__PURE__ */ e("div", { children: ft(Ye(l), r, `${s}-${o}`) }, `${s}-line-${o}`))
          },
          s
        );
      case "list": {
        const l = n.ordered ? "ol" : "ul", o = n.ordered ? "my-1.5 list-decimal pl-5 space-y-1 marker:font-semibold" : "my-1.5 list-disc pl-5 space-y-1";
        return /* @__PURE__ */ e(l, { start: n.start, className: o, children: n.items.map((d, u) => /* @__PURE__ */ e("li", { className: "leading-relaxed", children: ft(d, r, `${s}-${u}`) }, `${s}-item-${u}`)) }, s);
      }
      case "table":
        return /* @__PURE__ */ e(
          "div",
          {
            className: M(
              "my-2 overflow-x-auto rounded-xl border",
              r ? "border-blue-400/40 bg-blue-700/40" : "border-neutral-200 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/60"
            ),
            children: /* @__PURE__ */ i("table", { className: "w-full border-collapse text-left text-xs", children: [
              n.headers.length > 0 && /* @__PURE__ */ e(
                "thead",
                {
                  className: M(
                    "border-b font-semibold",
                    r ? "border-blue-400/40 bg-blue-800/50 text-white" : "border-neutral-200 dark:border-neutral-700/80 bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-100"
                  ),
                  children: /* @__PURE__ */ e("tr", { children: n.headers.map((l, o) => /* @__PURE__ */ e("th", { className: "px-2.5 py-1.5 font-semibold whitespace-nowrap", children: ft(l, r, `${s}-th-${o}`) }, `${s}-th-${o}`)) })
                }
              ),
              /* @__PURE__ */ e("tbody", { className: "divide-y divide-neutral-200/60 dark:divide-neutral-800/60", children: n.rows.map((l, o) => /* @__PURE__ */ e(
                "tr",
                {
                  className: M(
                    "border-b last:border-b-0",
                    r ? "border-blue-400/30 hover:bg-blue-700/30" : "border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40"
                  ),
                  children: l.map((d, u) => /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 align-top", children: ft(d, r, `${s}-td-${o}-${u}`) }, `${s}-td-${o}-${u}`))
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
            className: M(
              "my-2 border-t",
              r ? "border-blue-400/40" : "border-neutral-200 dark:border-neutral-700"
            )
          },
          s
        );
      case "paragraph":
      default:
        return /* @__PURE__ */ e("div", { className: "whitespace-pre-wrap break-words leading-relaxed", children: ft(n.children, r, s) }, s);
    }
  });
}
function dr({
  content: t,
  isOwnMessage: r = !1,
  className: n
}) {
  const a = ll(t);
  return /* @__PURE__ */ e("div", { className: M("space-y-1 whitespace-pre-wrap break-words leading-relaxed", n), children: ol(a, r) });
}
function cl({ article: t }) {
  const r = t.url ? Yr(t.url) : null;
  return /* @__PURE__ */ e("div", { className: "mb-2.5 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 bg-indigo-50/75 dark:bg-indigo-950/40 p-2.5 shadow-2xs animate-in fade-in duration-200 min-w-0", children: /* @__PURE__ */ i("div", { className: "flex items-start gap-2 min-w-0", children: [
    /* @__PURE__ */ e("div", { className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400", children: /* @__PURE__ */ e(vn, { className: "size-3.5", "aria-hidden": "true" }) }),
    /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2 min-w-0", children: [
        /* @__PURE__ */ e("span", { className: "text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 truncate", children: "Solución sugerida • Wiki SDI" }),
        r && /* @__PURE__ */ i(
          "a",
          {
            href: r,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 hover:underline shrink-0",
            children: [
              /* @__PURE__ */ e("span", { children: "Abrir" }),
              /* @__PURE__ */ e(Cn, { className: "size-2.5", "aria-hidden": "true" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ e("p", { className: "mt-0.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100 leading-snug break-words", children: t.title }),
      t.excerpt && /* @__PURE__ */ e("p", { className: "mt-0.5 text-[11px] text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed break-words", children: t.excerpt })
    ] })
  ] }) });
}
function dl({
  actions: t,
  disabled: r = !1,
  onActionClick: n
}) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ e("div", { className: "mt-2.5 pt-2 border-t border-violet-200/60 dark:border-violet-800/40 flex flex-wrap gap-1.5 animate-in fade-in duration-200", children: t.map((a) => /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      disabled: r,
      onClick: () => {
        r || n == null || n(a);
      },
      className: M(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold shadow-2xs transition-all",
        r ? "border-neutral-200 dark:border-neutral-700/50 bg-neutral-100/80 dark:bg-neutral-800/50 text-neutral-400 dark:text-neutral-500 cursor-not-allowed opacity-60" : "border-violet-200 dark:border-violet-700/60 bg-white/95 dark:bg-neutral-800/90 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:border-violet-600 dark:hover:border-violet-600 text-violet-700 dark:text-violet-300 active:scale-95 cursor-pointer"
      ),
      children: /* @__PURE__ */ e("span", { children: a.label })
    },
    a.id
  )) });
}
function ul(t) {
  if (!t) return "";
  try {
    const r = new Date(t);
    return isNaN(r.getTime()) ? "" : r.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: !1 });
  } catch {
    return "";
  }
}
function pn({
  message: t,
  isOwnMessage: r,
  isGroup: n,
  conversationName: a,
  conversationAvatarUrl: s,
  isBot: l = !1,
  disableActions: o = !1,
  onActionClick: d
}) {
  var g, v, b, y, S, $, z, I, J, U, T, B, A, P;
  const u = !!l || Number((b = (v = (g = t.relationships) == null ? void 0 : g.sender) == null ? void 0 : v.attributes) == null ? void 0 : b.user_auth_id) === 0, m = ((S = (y = t.attributes) == null ? void 0 : y.metadata) == null ? void 0 : S.action_buttons) ?? [], c = (z = ($ = t.attributes) == null ? void 0 : $.metadata) == null ? void 0 : z.article, h = !!t.isStreaming, f = qt(((U = (J = (I = t.relationships) == null ? void 0 : I.sender) == null ? void 0 : J.attributes) == null ? void 0 : U.name) || a), p = ((A = (B = (T = t.relationships) == null ? void 0 : T.sender) == null ? void 0 : B.attributes) == null ? void 0 : A.avatar_url) || void 0, x = ul(t.attributes.created_at), w = ((P = t.relationships) == null ? void 0 : P.attachments) ?? [];
  return /* @__PURE__ */ i(
    "div",
    {
      className: M(
        "flex items-start gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0",
        r && "ml-auto flex-row-reverse"
      ),
      children: [
        n && !r ? /* @__PURE__ */ e(
          nt,
          {
            name: f,
            src: p,
            isBot: u,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ) : r ? null : /* @__PURE__ */ e(
          nt,
          {
            name: a,
            src: s,
            isBot: u,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ i("div", { className: M("flex min-w-0 flex-col gap-1", r && "items-end"), children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: M(
                  "text-xs font-semibold truncate",
                  u && !r ? "text-violet-700 dark:text-violet-300 font-bold" : "text-neutral-800 dark:text-neutral-200"
                ),
                children: r ? "Tú" : f
              }
            ),
            u && !r && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-violet-100 dark:bg-violet-950/80 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/50 shadow-2xs", children: [
              /* @__PURE__ */ e(Lr, { className: "size-2.5 text-violet-600 dark:text-violet-400" }),
              /* @__PURE__ */ e("span", { children: "IA" })
            ] })
          ] }),
          /* @__PURE__ */ i(
            "div",
            {
              className: M(
                "rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words",
                r ? "rounded-tr-xs bg-blue-600 text-white shadow-xs" : u ? "rounded-tl-xs bg-gradient-to-b from-violet-50/70 to-white dark:from-neutral-800/90 dark:to-neutral-900/90 text-neutral-900 dark:text-neutral-100 border border-violet-200/70 dark:border-violet-800/50 shadow-xs ring-1 ring-violet-500/10" : "rounded-tl-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs"
              ),
              children: [
                u && !r && c && /* @__PURE__ */ e(cl, { article: c }),
                w.map((D) => D.attributes.file_mime_type.startsWith("image/") ? /* @__PURE__ */ e(
                  "a",
                  {
                    href: D.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10",
                    children: /* @__PURE__ */ e(
                      "img",
                      {
                        src: D.attributes.file_url,
                        alt: D.attributes.file_name,
                        className: "max-h-64 max-w-full object-contain rounded-xl",
                        loading: "lazy"
                      }
                    )
                  },
                  D.id
                ) : /* @__PURE__ */ i(
                  "a",
                  {
                    href: D.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    download: D.attributes.file_name,
                    className: "mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                    children: [
                      /* @__PURE__ */ e(Ca, { className: "size-4 shrink-0" }),
                      /* @__PURE__ */ e("span", { className: "min-w-0 flex-1 truncate font-medium", children: D.attributes.file_name }),
                      /* @__PURE__ */ e(Sa, { className: "size-3.5 shrink-0" })
                    ]
                  },
                  D.id
                )),
                h && !t.attributes.body && w.length === 0 ? /* @__PURE__ */ i("div", { className: "flex items-center gap-1 text-neutral-500 dark:text-neutral-400", children: [
                  /* @__PURE__ */ e("span", { children: "Escribiendo" }),
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "inline-block text-violet-600 dark:text-violet-400 font-bold animate-pulse select-none",
                      "aria-hidden": "true",
                      children: "▍"
                    }
                  )
                ] }) : /* @__PURE__ */ i(Fe, { children: [
                  t.attributes.body && w.length === 0 && /* @__PURE__ */ i("div", { className: M(h && "[&>div]:inline [&>div>div:last-child]:inline"), children: [
                    /* @__PURE__ */ e(
                      dr,
                      {
                        content: t.attributes.body,
                        isOwnMessage: r,
                        isBot: u
                      }
                    ),
                    h && /* @__PURE__ */ e(
                      "span",
                      {
                        className: "inline-block ml-0.5 text-violet-600 dark:text-violet-400 font-bold animate-pulse select-none align-baseline",
                        "aria-hidden": "true",
                        children: "▍"
                      }
                    )
                  ] }),
                  t.attributes.body && w.length > 0 && t.attributes.body !== "Archivo adjunto" && /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
                    dr,
                    {
                      content: t.attributes.body,
                      isOwnMessage: r,
                      isBot: u
                    }
                  ) })
                ] }),
                u && !r && !h && m.length > 0 && /* @__PURE__ */ e(
                  dl,
                  {
                    actions: m,
                    disabled: o,
                    onActionClick: d
                  }
                ),
                /* @__PURE__ */ i("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none", children: [
                  /* @__PURE__ */ e(
                    "time",
                    {
                      dateTime: t.attributes.created_at,
                      className: r ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400",
                      children: x
                    }
                  ),
                  r && t.local_status === "sending" && /* @__PURE__ */ e(
                    zt,
                    {
                      className: "size-3 text-blue-200 animate-spin",
                      "aria-label": "Pendiente de envío"
                    }
                  ),
                  r && t.local_status === "sent" && /* @__PURE__ */ e(za, { className: "size-3 text-blue-200", "aria-label": "Enviado" }),
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
function ml({
  conversation: t,
  messages: r,
  optimisticMessages: n = [],
  scrollRef: a,
  isFetchingNextPage: s = !1,
  hasNextPage: l = !1,
  isLoading: o = !1,
  isNearBottom: d = !0,
  newMessagesCount: u = 0,
  visibleDate: m = "Hoy",
  disableActions: c = !1,
  onScrollToBottom: h,
  onActionClick: f
}) {
  var J, U, T, B;
  const { currentUserId: p } = at(), x = Yt(t), w = jt(t, p), g = Et(t, p), v = Jr(t, p) || Ot(g), b = !!t.attributes.closed_at, y = new Set(
    r.flatMap((A) => A.messages.map((P) => P.id))
  ), S = n.filter(
    (A) => !y.has(A.id)
  ), $ = r.some(
    (A) => er(A.date) === "Hoy"
  ), z = S.length > 0 ? (J = S[S.length - 1]) == null ? void 0 : J.id : (B = (T = (U = r[0]) == null ? void 0 : U.messages) == null ? void 0 : T[0]) == null ? void 0 : B.id, I = m.toLowerCase() === "hoy" || m.toLowerCase() === "today" || er(m) === "Hoy";
  return /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 relative w-full overflow-hidden", children: /* @__PURE__ */ e(Jt, { ref: a, className: "relative z-10 h-full w-full", children: /* @__PURE__ */ i("div", { className: "space-y-4 p-3 sm:p-4 text-sm w-full min-w-0", children: [
    s && /* @__PURE__ */ i("div", { className: "flex items-center justify-center py-2 gap-2 text-xs text-neutral-500 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin text-blue-600" }),
      /* @__PURE__ */ e("span", { children: "Cargando mensajes anteriores..." })
    ] }),
    !l && r.length > 0 && /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400", children: "Inicio de la conversación" }) }),
    o && r.length === 0 && /* @__PURE__ */ i("div", { className: "space-y-4 py-2 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ i("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ e(me, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(me, { className: "h-3 w-20 rounded" }),
          /* @__PURE__ */ e(me, { className: "h-12 w-48 sm:w-64 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ e(me, { className: "h-14 w-52 sm:w-64 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) }),
      /* @__PURE__ */ i("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ e(me, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(me, { className: "h-3 w-16 rounded" }),
          /* @__PURE__ */ e(me, { className: "h-16 w-56 sm:w-72 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ e(me, { className: "h-10 w-36 sm:w-44 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ e("div", { className: "sticky top-1 z-20 flex justify-center pointer-events-none mb-2 transition-all duration-200", children: /* @__PURE__ */ e("div", { className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs", children: /* @__PURE__ */ e("span", { children: I ? "Hoy" : er(m) }) }) }),
    [...r ?? []].reverse().map((A) => /* @__PURE__ */ i(
      "div",
      {
        "data-date-group": A.date,
        className: "space-y-4",
        children: [
          /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: er(A.date) }) }),
          [...A.messages].reverse().map((P) => {
            var q, Z;
            const D = String((Z = (q = P == null ? void 0 : P.relationships) == null ? void 0 : q.sender) == null ? void 0 : Z.id) === String(p), j = P.id === z;
            return /* @__PURE__ */ e(
              "div",
              {
                "data-message-date": A.date,
                className: "w-full",
                children: /* @__PURE__ */ e(
                  pn,
                  {
                    message: D ? { ...P, local_status: "sent" } : P,
                    isOwnMessage: D,
                    isGroup: x,
                    conversationName: w,
                    conversationAvatarUrl: (g == null ? void 0 : g.attributes.avatar_url) || void 0,
                    isBot: v,
                    disableActions: c || b || !j,
                    onActionClick: f
                  }
                )
              },
              P.id
            );
          })
        ]
      },
      A.date
    )),
    S.length > 0 && /* @__PURE__ */ i("div", { "data-date-group": "Hoy", className: "space-y-4", children: [
      !$ && /* @__PURE__ */ e("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: "Hoy" }) }),
      [...S].map((A) => {
        var j, q, Z, X;
        const P = A.id === z, D = !A.id.startsWith("temp_bot_") && String(((q = (j = A == null ? void 0 : A.relationships) == null ? void 0 : j.sender) == null ? void 0 : q.id) ?? ((Z = A == null ? void 0 : A.attributes) == null ? void 0 : Z.sender_id)) === String(p);
        return /* @__PURE__ */ e(
          "div",
          {
            "data-message-date": ((X = A.attributes.created_at) == null ? void 0 : X.slice(0, 10)) || "Hoy",
            className: "w-full",
            children: /* @__PURE__ */ e(
              pn,
              {
                message: A,
                isOwnMessage: D,
                isGroup: x,
                conversationName: w,
                conversationAvatarUrl: (g == null ? void 0 : g.attributes.avatar_url) || void 0,
                isBot: v,
                disableActions: c || b || !P,
                onActionClick: f
              }
            )
          },
          A.id
        );
      })
    ] }),
    !d && h && /* @__PURE__ */ e("div", { className: "sticky bottom-2 z-30 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200", children: /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: h,
        className: "pointer-events-auto relative flex size-9 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95 cursor-pointer",
        "aria-label": "Desplazar a mensajes recientes",
        title: "Desplazar a mensajes recientes",
        children: [
          /* @__PURE__ */ e(Er, { className: "size-4" }),
          u > 0 && /* @__PURE__ */ e(
            "span",
            {
              className: "absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-4 text-white",
              "aria-label": `${u} mensajes nuevos`,
              children: u > 99 ? "99+" : u
            }
          )
        ]
      }
    ) })
  ] }) }) });
}
function hl({
  inputText: t,
  setInputText: r,
  onSendMessage: n,
  onSelectFile: a,
  pendingFile: s,
  onRemoveFile: l,
  isSending: o,
  isUploading: d,
  conversationName: u,
  isClosed: m = !1,
  readOnly: c = !1,
  readOnlyMessage: h
}) {
  const f = W(null), [p, x] = k(!1), [w, g] = k(!1), [v, b] = k(!1), [y, S] = k("https://"), [$, z] = k(""), I = Ge(
    () => s && s.type.startsWith("image/") ? URL.createObjectURL(s) : void 0,
    [s]
  );
  re(() => () => {
    I && URL.revokeObjectURL(I);
  }, [I]);
  const J = Y(() => {
    const N = f.current;
    if (!N) return;
    N.style.height = "auto";
    const C = Math.min(Math.max(N.scrollHeight, 28), 120);
    N.style.height = `${C}px`;
  }, []);
  re(() => {
    J();
  }, [t, J]), re(() => {
    t.trim() || g(!1);
  }, [t]);
  const U = W(!1);
  if (re(() => {
    var N;
    U.current && !o && !d && ((N = f.current) == null || N.focus()), U.current = o || d;
  }, [o, d]), m || c)
    return /* @__PURE__ */ e("div", { className: "shrink-0 px-3 pb-3 pt-1 text-center sm:px-4 sm:pb-4", children: /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-white/85 dark:border-neutral-800/80 dark:bg-neutral-900/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 shadow-xs dark:text-neutral-400", children: [
      /* @__PURE__ */ e(_t, { className: "size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" }),
      /* @__PURE__ */ e("span", { children: h || (m ? "Esta conversación ha sido finalizada y no admite nuevos mensajes." : "No se permite enviar mensajes en esta conversación.") })
    ] }) });
  const T = (N, C, V = "texto") => {
    const E = f.current;
    if (!E) return;
    const H = E.selectionStart ?? 0, F = E.selectionEnd ?? 0, ce = t;
    if (H !== F) {
      const xe = ce.substring(H, F), te = `${N}${xe}${C}`, we = ce.substring(0, H) + te + ce.substring(F);
      r(we), requestAnimationFrame(() => {
        E.focus(), E.setSelectionRange(H + N.length, F + N.length);
      });
    } else {
      const xe = `${N}${V}${C}`, te = ce.substring(0, H) + xe + ce.substring(F);
      r(te), requestAnimationFrame(() => {
        E.focus(), E.setSelectionRange(H + N.length, H + N.length + V.length);
      });
    }
  }, B = (N, C = !1) => {
    const V = f.current;
    if (!V) return;
    const E = V.selectionStart ?? 0, H = V.selectionEnd ?? 0, F = t, ce = F.lastIndexOf(`
`, E - 1) + 1, xe = F.indexOf(`
`, H), te = xe === -1 ? F.length : xe, ue = F.substring(ce, te).split(`
`).map((Le, Ce) => {
      const Me = C ? `${Ce + 1}. ` : N;
      return Le.startsWith(Me) ? Le.slice(Me.length) : `${Me}${Le}`;
    }).join(`
`), Ve = F.substring(0, ce) + ue + F.substring(te);
    r(Ve), requestAnimationFrame(() => {
      V.focus(), V.setSelectionRange(ce, ce + ue.length);
    });
  }, A = () => {
    const N = f.current;
    if (!N) return;
    const C = N.selectionStart ?? 0, V = N.selectionEnd ?? 0, E = t, H = E.substring(C, V);
    if (H.includes(`
`)) {
      const F = `\`\`\`
${H}
\`\`\``, ce = E.substring(0, C) + F + E.substring(V);
      r(ce), requestAnimationFrame(() => {
        N.focus(), N.setSelectionRange(C + 4, C + 4 + H.length);
      });
    } else
      T("`", "`", "código");
  }, P = () => {
    const N = f.current;
    if (N) {
      const C = N.selectionStart ?? 0, V = N.selectionEnd ?? 0, E = t.substring(C, V).trim();
      E && z(E);
    }
    S("https://"), x(!0), b((C) => !C);
  }, D = () => {
    const N = f.current, C = Yr(y);
    if (!C) return;
    const E = `[${($ || C).trim()}](${C})`;
    if (N) {
      const H = N.selectionStart ?? 0, F = N.selectionEnd ?? 0, ce = t, xe = ce.substring(0, H) + E + ce.substring(F);
      r(xe), requestAnimationFrame(() => {
        N.focus();
        const te = H + E.length;
        N.setSelectionRange(te, te);
      });
    } else
      r(t ? `${t} ${E}` : E);
    b(!1), S("https://"), z("");
  }, j = (N) => {
    const C = N.ctrlKey || N.metaKey;
    if (C && N.key.toLowerCase() === "b") {
      N.preventDefault(), T("**", "**", "negrita");
      return;
    }
    if (C && N.key.toLowerCase() === "i") {
      N.preventDefault(), T("*", "*", "cursiva");
      return;
    }
    if (C && N.key.toLowerCase() === "u") {
      N.preventDefault(), T("<u>", "</u>", "subrayado");
      return;
    }
    if (C && N.key.toLowerCase() === "k") {
      N.preventDefault(), P();
      return;
    }
    if (C && N.key.toLowerCase() === "e") {
      N.preventDefault(), A();
      return;
    }
    if (C && N.shiftKey && N.key.toLowerCase() === "x") {
      N.preventDefault(), T("~~", "~~", "tachado");
      return;
    }
    N.key === "Enter" && !N.shiftKey && (N.preventDefault(), (t.trim() || s) && (b(!1), g(!1), n(), requestAnimationFrame(() => {
      var V;
      (V = f.current) == null || V.focus();
    })));
  }, q = (N) => {
    var V;
    const C = (V = N.target.files) == null ? void 0 : V[0];
    C && a(C), N.target.value = "";
  }, Z = (N) => {
    var V;
    if (o || d) return;
    const C = (V = N.clipboardData) == null ? void 0 : V.items;
    if (C)
      for (let E = 0; E < C.length; E++) {
        const H = C[E];
        if (H.kind === "file" && H.type.startsWith("image/")) {
          const F = H.getAsFile();
          if (F) {
            N.preventDefault(), a(F);
            return;
          }
        }
      }
  }, X = !t.trim(), de = (N = !1) => M(
    "flex size-6.5 items-center justify-center rounded-lg transition-all cursor-pointer",
    N ? "bg-blue-100 text-blue-700 ring-1 ring-blue-500/30 shadow-2xs dark:bg-blue-950/90 dark:text-blue-300 dark:ring-blue-400/40" : "hover:bg-neutral-100 dark:hover:bg-neutral-700/70 hover:text-neutral-900 dark:hover:text-white"
  );
  return /* @__PURE__ */ e("div", { className: "shrink-0 px-3 pb-3 pt-1 sm:px-4 sm:pb-4", children: /* @__PURE__ */ i("div", { className: "relative", children: [
    s && /* @__PURE__ */ i("div", { className: "mb-2 flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xs dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      s.type.startsWith("image/") ? /* @__PURE__ */ e(
        "img",
        {
          src: I || "",
          alt: "Archivo seleccionado",
          className: "size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
        }
      ) : /* @__PURE__ */ e("div", { className: "flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ e(nn, { className: "size-5" }) }),
      /* @__PURE__ */ e("span", { className: "min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-300 font-medium", children: s.name || "Archivo listo para enviar" }),
      /* @__PURE__ */ e(
        ge,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: l,
          className: "size-7 shrink-0 p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          "aria-label": "Quitar archivo",
          children: /* @__PURE__ */ e(et, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "flex flex-col rounded-2xl border border-neutral-200/80 bg-white/95 backdrop-blur-md shadow-sm transition-all focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:shadow-md dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      p && /* @__PURE__ */ i("div", { className: "flex flex-col border-b border-neutral-200/70 dark:border-neutral-700/70", children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-between gap-1 px-2.5 py-1 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-0.5 overflow-x-auto scrollbar-none", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: () => T("**", "**", "negrita"),
              disabled: o || d,
              title: "Negrita (Ctrl+B)",
              "aria-label": "Negrita",
              className: de(),
              children: /* @__PURE__ */ e(_a, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: () => T("*", "*", "cursiva"),
              disabled: o || d,
              title: "Cursiva (Ctrl+I)",
              "aria-label": "Cursiva",
              className: de(),
              children: /* @__PURE__ */ e(Aa, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: () => T("<u>", "</u>", "subrayado"),
              disabled: o || d,
              title: "Subrayado (Ctrl+U)",
              "aria-label": "Subrayado",
              className: de(),
              children: /* @__PURE__ */ e(Ea, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: () => T("~~", "~~", "tachado"),
              disabled: o || d,
              title: "Tachado (Ctrl+Shift+X)",
              "aria-label": "Tachado",
              className: de(),
              children: /* @__PURE__ */ e(Ia, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: () => B("- "),
              disabled: o || d,
              title: "Lista de viñetas",
              "aria-label": "Lista de viñetas",
              className: de(),
              children: /* @__PURE__ */ e(Ta, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: () => B("", !0),
              disabled: o || d,
              title: "Lista numerada",
              "aria-label": "Lista numerada",
              className: de(),
              children: /* @__PURE__ */ e(Ma, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: A,
              disabled: o || d,
              title: "Insertar código (Ctrl+E)",
              "aria-label": "Código",
              className: de(),
              children: /* @__PURE__ */ e(Da, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: P,
              disabled: o || d,
              "aria-pressed": v,
              title: "Insertar enlace Markdown (Ctrl+K)",
              "aria-label": "Insertar enlace",
              className: de(v),
              children: /* @__PURE__ */ e(Pa, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: () => g((N) => !N),
              disabled: X || o || d,
              "aria-pressed": w,
              title: w ? "Ocultar vista previa" : "Vista previa de Markdown",
              "aria-label": "Vista previa",
              className: de(w),
              children: w ? /* @__PURE__ */ e(Ra, { className: "size-3.5" }) : /* @__PURE__ */ e(ja, { className: "size-3.5" })
            }
          )
        ] }) }),
        v && /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-1.5 border-t border-neutral-200/60 dark:border-neutral-700/60 bg-neutral-50/80 dark:bg-neutral-900/50 px-2.5 py-1.5", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: $,
              onChange: (N) => z(N.target.value),
              placeholder: "Texto del enlace",
              className: "h-6.5 w-28 sm:w-36 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 text-xs text-neutral-800 dark:text-neutral-100 outline-none focus:border-blue-500"
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "url",
              value: y,
              onChange: (N) => S(N.target.value),
              onKeyDown: (N) => {
                N.key === "Enter" && (N.preventDefault(), D());
              },
              placeholder: "https://...",
              className: "h-6.5 min-w-0 flex-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 text-xs text-neutral-800 dark:text-neutral-100 outline-none focus:border-blue-500"
            }
          ),
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: D,
              className: "inline-flex h-6.5 items-center gap-1 rounded-lg bg-blue-600 px-2 text-[11px] font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer",
              children: [
                /* @__PURE__ */ e(Ur, { className: "size-3" }),
                /* @__PURE__ */ e("span", { children: "Insertar" })
              ]
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (N) => N.preventDefault(),
              onClick: () => b(!1),
              className: "inline-flex size-6.5 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              "aria-label": "Cancelar enlace",
              children: /* @__PURE__ */ e(et, { className: "size-3.5" })
            }
          )
        ] })
      ] }),
      w && !X && /* @__PURE__ */ i("div", { className: "border-b border-neutral-200/70 dark:border-neutral-700/70 bg-neutral-50/70 dark:bg-neutral-900/40 px-3 py-2", children: [
        /* @__PURE__ */ i("div", { className: "mb-1 flex items-center justify-between text-[10px] font-medium text-neutral-400 uppercase tracking-wider", children: [
          /* @__PURE__ */ e("span", { children: "Vista previa Markdown" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => g(!1),
              className: "hover:text-neutral-600 dark:hover:text-neutral-200",
              children: "Cerrar"
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "max-h-28 overflow-y-auto text-xs", children: /* @__PURE__ */ e(dr, { content: t }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-1 px-2.5 py-1.5", children: [
        /* @__PURE__ */ i(
          "label",
          {
            className: "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200",
            title: "Adjuntar archivo",
            children: [
              /* @__PURE__ */ e(nn, { className: "size-4" }),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "file",
                  className: "sr-only",
                  onChange: q,
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
            onMouseDown: (N) => N.preventDefault(),
            onClick: () => x((N) => !N),
            disabled: o || d,
            title: "Formato de texto enriquecido (Markdown)",
            "aria-label": "Formato de texto enriquecido",
            className: M(
              "relative flex size-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer",
              p ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            ),
            children: /* @__PURE__ */ e(La, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ e("div", { className: "relative min-w-0 flex-1", children: /* @__PURE__ */ e(
          "textarea",
          {
            ref: f,
            value: t,
            onChange: (N) => r(N.target.value),
            onKeyDown: j,
            onPaste: Z,
            placeholder: `Responder a ${u}...`,
            disabled: d,
            rows: 1,
            "aria-label": `Responder a ${u}`,
            className: "max-h-30 min-h-7 w-full resize-none overflow-y-auto rounded-xl bg-transparent px-2 py-1 text-xs leading-5 text-neutral-800 outline-none placeholder:text-neutral-400 sm:text-sm dark:text-neutral-100 break-words"
          }
        ) }),
        /* @__PURE__ */ e(
          ge,
          {
            size: "icon",
            variant: "primary",
            onMouseDown: (N) => N.preventDefault(),
            onClick: () => {
              b(!1), g(!1), n(), requestAnimationFrame(() => {
                var N;
                (N = f.current) == null || N.focus();
              });
            },
            disabled: X && !s || o || d,
            className: "size-8 shrink-0 rounded-full p-0 cursor-pointer",
            "aria-label": "Enviar mensaje",
            title: "Enviar mensaje",
            children: /* @__PURE__ */ e(Gt, { className: "size-4" })
          }
        )
      ] })
    ] })
  ] }) });
}
function fl({ className: t }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "aria-hidden": "true",
      className: M(
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
function pl({
  open: t,
  onOpenChange: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null,
  queueData: l = null,
  onActionSelect: o,
  isPollingQueue: d = !1,
  onConvertToTicket: u,
  isConvertingToTicket: m = !1
}) {
  const [c, h] = k(""), [f, p] = k(null), x = (v) => {
    !v && (a || m) || (v || (h(""), p(null)), r(v));
  }, w = async (v) => {
    v.preventDefault(), p(null);
    const b = c.trim();
    if (!b) {
      p("Por favor describe el motivo de tu solicitud.");
      return;
    }
    if (b.length < 5) {
      p("Por favor ingresa al menos 5 caracteres para mayor claridad.");
      return;
    }
    await n(b);
  }, g = (l == null ? void 0 : l.action_buttons) ?? [];
  return /* @__PURE__ */ e(fr, { open: t, onOpenChange: x, children: /* @__PURE__ */ e(pr, { className: "sm:max-w-md p-0 overflow-hidden", children: l ? /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ e(ar, { className: "p-4.5 pb-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(zt, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(sr, { className: "text-sm font-bold text-white", children: "En fila de espera" }),
        /* @__PURE__ */ e(ir, { className: "text-[11px] text-amber-100 mt-0.5", children: "Todos nuestros técnicos se encuentran ocupados en este momento" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-3.5 bg-white dark:bg-neutral-900", children: [
      (l.queue_position != null || l.estimated_wait_minutes != null) && /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-2", children: [
        l.queue_position != null && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 px-3 py-2", children: [
          /* @__PURE__ */ e(mr, { className: "size-4 text-amber-600 dark:text-amber-400 shrink-0" }),
          /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ e("p", { className: "text-[10px] text-neutral-500 dark:text-neutral-400 leading-none", children: "Posición en fila" }),
            /* @__PURE__ */ i("p", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5", children: [
              "#",
              l.queue_position
            ] })
          ] })
        ] }),
        l.estimated_wait_minutes != null && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 px-3 py-2", children: [
          /* @__PURE__ */ e(zt, { className: "size-4 text-amber-600 dark:text-amber-400 shrink-0" }),
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
      l.message && /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/50 p-3 text-xs leading-relaxed text-neutral-700 dark:text-neutral-200", children: /* @__PURE__ */ e(dr, { content: l.message }) }),
      d && /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-[11px] font-medium text-amber-700 dark:text-amber-300", children: [
        /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin text-amber-600 dark:text-amber-400 shrink-0" }),
        /* @__PURE__ */ e("span", { children: "Esperando en vivo... verificando disponibilidad cada 5s" })
      ] }),
      g.length > 0 ? /* @__PURE__ */ i("div", { className: "space-y-2 pt-1", children: [
        /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold text-neutral-600 dark:text-neutral-400", children: "Selecciona una opción para continuar:" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: g.map((v) => {
          var y;
          const b = v.action === "convert_ticket" || v.id === "convert_ticket" || ((y = v.label) == null ? void 0 : y.toLowerCase().includes("crear ticket"));
          return /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              disabled: m,
              onClick: () => {
                if (b && u) {
                  u();
                  return;
                }
                h(""), p(null), o == null || o(v);
              },
              className: "flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 dark:border-violet-800/70 bg-violet-50/60 dark:bg-violet-950/40 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:border-violet-600 px-3.5 py-2.5 text-xs font-semibold text-violet-700 dark:text-violet-300 shadow-2xs transition-all active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
              children: b && m ? /* @__PURE__ */ i(Fe, { children: [
                /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin" }),
                /* @__PURE__ */ e("span", { children: "Creando ticket y cerrando..." })
              ] }) : /* @__PURE__ */ e("span", { children: v.label })
            },
            v.id
          );
        }) })
      ] }) : u ? /* @__PURE__ */ e("div", { className: "pt-1", children: /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          disabled: m,
          onClick: () => {
            u();
          },
          className: "flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 px-3.5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-2xs transition-all active:scale-98 cursor-pointer disabled:opacity-50",
          children: m ? /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Creando ticket..." })
          ] }) : /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e("span", { children: "📝 Dejar como ticket y cerrar chat" }),
            /* @__PURE__ */ e(Ba, { className: "size-3.5" })
          ] })
        }
      ) }) : null
    ] }),
    /* @__PURE__ */ i(lr, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between", children: [
      /* @__PURE__ */ e("span", { className: "text-[10px] text-neutral-400", children: d ? "Sondeo activo" : "Cola de atención" }),
      /* @__PURE__ */ e(
        ge,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          disabled: m,
          onClick: () => x(!1),
          className: "text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer",
          children: "Cerrar"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ i("form", { onSubmit: w, className: "flex flex-col", children: [
    /* @__PURE__ */ e(ar, { className: "p-4.5 pb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(Fa, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(sr, { className: "text-sm font-bold text-white", children: "Hablar con un técnico" }),
        /* @__PURE__ */ e(ir, { className: "text-[11px] text-blue-100 mt-0.5", children: "Indica el motivo por el cual requieres asistencia especializada" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-3 bg-white dark:bg-neutral-900", children: [
      (f || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/40 p-2.5 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(Vt, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ e("span", { className: "leading-snug", children: f || s })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200", children: [
          "Motivo de la solicitud ",
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 focus-within:bg-white dark:bg-neutral-900 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ e(
            Kt,
            {
              value: c,
              onChange: (v) => {
                h(v.target.value), f && p(null);
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
              c.length,
              "/500"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i(lr, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ e(
        ge,
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
        ge,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || !c.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50",
          children: a ? /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Escalando..." })
          ] }) : /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e("span", { children: "Solicitar técnico" }),
            /* @__PURE__ */ e(Gt, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const bl = {
  1: "Muy insatisfecho",
  2: "Insatisfecho",
  3: "Neutral",
  4: "Satisfecho",
  5: "¡Excelente atención!"
};
function xl({
  open: t,
  onOpenChange: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null
}) {
  const [l, o] = k(5), [d, u] = k(0), [m, c] = k(""), [h, f] = k(null), p = (g) => {
    !g && !a && (o(5), u(0), c(""), f(null)), r(g);
  }, x = async (g) => {
    if (g.preventDefault(), f(null), l < 1 || l > 5) {
      f("Por favor selecciona una calificación de 1 a 5 estrellas.");
      return;
    }
    await n({
      rating: l,
      comment: m.trim(),
      helpful: !0
    });
  }, w = d || l;
  return /* @__PURE__ */ e(fr, { open: t, onOpenChange: p, children: /* @__PURE__ */ e(pr, { className: "sm:max-w-md p-0 overflow-hidden", children: /* @__PURE__ */ i("form", { onSubmit: x, className: "flex flex-col", children: [
    /* @__PURE__ */ e(ar, { className: "p-4.5 pb-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(yt, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(sr, { className: "text-sm font-bold text-white", children: "¡Nos alegra haberte ayudado!" }),
        /* @__PURE__ */ e(ir, { className: "text-[11px] text-emerald-100 mt-0.5", children: "Califica la solución entregada por el asistente para finalizar el caso" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-4 bg-white dark:bg-neutral-900", children: [
      (h || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/40 p-2.5 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(Vt, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ e("span", { className: "leading-snug", children: h || s })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center justify-center rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 p-3.5 space-y-2", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-neutral-700 dark:text-neutral-200", children: "¿Qué tan útil fue la solución?" }),
        /* @__PURE__ */ e(
          "div",
          {
            className: "flex items-center gap-1.5",
            onMouseLeave: () => u(0),
            children: [1, 2, 3, 4, 5].map((g) => {
              const v = g <= w;
              return /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  disabled: a,
                  onMouseEnter: () => u(g),
                  onClick: () => {
                    o(g), h && f(null);
                  },
                  "aria-label": `Calificar con ${g} ${g === 1 ? "estrella" : "estrellas"}`,
                  className: "p-1 rounded-lg transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ e(
                    Ir,
                    {
                      className: M(
                        "size-7 transition-colors",
                        v ? "fill-amber-400 text-amber-400 drop-shadow-2xs" : "fill-transparent text-neutral-300 dark:text-neutral-600"
                      )
                    }
                  )
                },
                g
              );
            })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-amber-600 dark:text-amber-400 min-h-4", children: bl[w] || "" })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200", children: [
          "Comentarios adicionales ",
          /* @__PURE__ */ e("span", { className: "text-neutral-400 font-normal", children: "(opcional)" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 focus-within:bg-white dark:bg-neutral-900 dark:focus-within:bg-neutral-900 focus-within:border-emerald-500 transition-colors", children: [
          /* @__PURE__ */ e(
            Kt,
            {
              value: m,
              onChange: (g) => c(g.target.value),
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
              m.length,
              "/500"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i(lr, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ e(
        ge,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => p(!1),
          disabled: a,
          className: "text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        ge,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || l < 1,
          className: "gap-2 h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50",
          children: a ? /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Finalizando..." })
          ] }) : /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e("span", { children: "Enviar y resolver" }),
            /* @__PURE__ */ e(Gt, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
function gl({
  conversation: t,
  onToggleContextPanel: r,
  isContextPanelOpen: n = !0,
  onBack: a,
  alwaysShowBackButton: s = !1,
  onCloseSuccess: l,
  onEscalateSuccess: o,
  onResolveSuccess: d,
  showHeader: u = !0,
  showWallpaper: m = !0,
  readOnly: c = !1,
  readOnlyMessage: h,
  showComposer: f = !0,
  renderOptions: p
}) {
  var Ue, Xe, bt, st, ut, it;
  const [x, w] = k(!1), [g, v] = k(!1), [b, y] = k(!1), [S, $] = k(null), [z, I] = k(!1), [J, U] = k(!1), T = Kr(), {
    mutateAsync: B,
    isLoading: A,
    error: P
  } = Zi(), {
    mutateAsync: D,
    isLoading: j,
    error: q
  } = Mn(), {
    mutateAsync: Z,
    isLoading: X
  } = tl(), de = () => {
    var be, he, se;
    let R = Ht(t.id);
    if (!R)
      for (let ee = C.messages.length - 1; ee >= 0; ee--) {
        const De = C.messages[ee];
        if (Array.isArray(De == null ? void 0 : De.messages)) {
          for (let Ie = De.messages.length - 1; Ie >= 0; Ie--) {
            const rt = (se = (he = (be = De.messages[Ie]) == null ? void 0 : be.attributes) == null ? void 0 : he.metadata) == null ? void 0 : se.session_uuid;
            if (rt) {
              R = String(rt);
              break;
            }
          }
          if (R) break;
        }
      }
    return R || "";
  }, N = Ge(() => x && z ? String((S == null ? void 0 : S.session_uuid) || de()) : null, [x, z, S == null ? void 0 : S.session_uuid]);
  el({
    sessionId: N,
    enabled: !!N,
    intervalMs: 5e3,
    onStatusUpdate: (R) => {
      $((be) => ({
        ...be,
        ...R
      }));
    },
    onAssigned: (R) => {
      I(!1), w(!1), $(null), Te.success(
        R.message || (R.technician ? `Asignado con ${R.technician.name}` : "Asignación completada")
      ), o == null || o(R);
    }
  });
  const C = Qi(t, {
    onCloseSuccess: () => {
      y(!0), l == null || l(), a == null || a();
    }
  });
  re(() => {
    y(!1);
  }, [t.id]);
  const [V, E] = k(!1), H = W(0), F = C.isClosed || b, ce = c || F || C.isSending || C.isUploading, xe = (R) => {
    if (R.preventDefault(), R.stopPropagation(), ce) return;
    R.dataTransfer.types && Array.from(R.dataTransfer.types).includes("Files") && (H.current += 1, E(!0));
  }, te = (R) => {
    R.preventDefault(), R.stopPropagation(), !ce && (R.dataTransfer.dropEffect = "copy");
  }, we = (R) => {
    R.preventDefault(), R.stopPropagation(), H.current -= 1, H.current <= 0 && (H.current = 0, E(!1));
  }, pe = (R) => {
    if (R.preventDefault(), R.stopPropagation(), H.current = 0, E(!1), ce) return;
    const be = R.dataTransfer.files;
    if (be && be.length > 0) {
      const he = be[0];
      he.type.startsWith("image/") && C.handleSelectFile(he);
    }
  }, ue = (R) => {
    var he;
    if (ce) return;
    const be = (he = R.clipboardData) == null ? void 0 : he.items;
    if (be)
      for (let se = 0; se < be.length; se++) {
        const ee = be[se];
        if (ee.kind === "file" && ee.type.startsWith("image/")) {
          const De = ee.getAsFile();
          if (De) {
            R.preventDefault(), C.handleSelectFile(De);
            return;
          }
        }
      }
  }, Ve = Ge(
    () => ({
      conversation: t,
      isClosed: F,
      isClosing: C.isClosing,
      handleCloseConversation: C.handleCloseConversation
    }),
    [t, F, C.isClosing, C.handleCloseConversation]
  );
  re(() => (Dt.set(t), () => {
    Dt.set(null);
  }), [t]);
  const Le = (R) => {
    if (R.action === "escalate" || R.id === "escalate") {
      $(null), I(!1), w(!0);
      return;
    }
    if (R.action === "poll_queue" || R.id === "poll_queue") {
      I(!0), Te.info("Consultando disponibilidad en vivo cada 5 segundos...");
      return;
    }
    if (R.action === "convert_ticket" || R.id === "convert_ticket") {
      Me();
      return;
    }
    const be = (R.label || "").toLowerCase();
    if (R.action === "resolve" || R.id === "resolve" || R.action === "resolved" || R.id === "resolved" || R.action === "confirm_solution" || R.id === "confirm_solution" || be.includes("solucionó mi problema") || be.includes("soluciono mi problema")) {
      v(!0);
      return;
    }
    C.handleSendMessage(R.label || R.action);
  }, Ce = async (R) => {
    var be, he;
    try {
      const se = de(), ee = await B({
        session_id: se,
        reason: R
      });
      ee != null && ee.session_uuid && Mt(t.id, String(ee.session_uuid)), ee != null && ee.conversation_id ? (w(!1), $(null), I(!1), Te.success(
        ee.message || (ee.technician ? `Asistencia iniciada con ${ee.technician.name}` : "Conversación con técnico iniciada"),
        ee.ticket ? {
          description: `Ticket #${ee.ticket.number || ee.ticket.id}`
        } : void 0
      )) : (ee == null ? void 0 : ee.status) === "in_queue" || ee != null && ee.message && !(ee != null && ee.ticket) ? ($(ee), I(!0)) : (w(!1), $(null), I(!1), ee != null && ee.ticket && Te.info(ee.message || "Ticket de soporte registrado", {
        description: `Ticket #${ee.ticket.number || ee.ticket.id}`
      })), o == null || o(ee);
    } catch (se) {
      const ee = ((he = (be = se == null ? void 0 : se.response) == null ? void 0 : be.data) == null ? void 0 : he.message) || (se == null ? void 0 : se.message) || "Error al procesar la solicitud con el técnico";
      Te.error(ee);
    }
  }, Me = async () => {
    var R, be;
    try {
      const he = de(), se = await Z({
        session_id: he
      });
      wt(t.id), w(!1), $(null), I(!1), y(!0), Te.success(
        (se == null ? void 0 : se.message) || "Se ha creado el ticket de soporte y se ha cerrado el chat.",
        se != null && se.ticket ? {
          description: `Ticket #${se.ticket.number || se.ticket.id}`
        } : void 0
      );
    } catch (he) {
      const se = ((be = (R = he == null ? void 0 : he.response) == null ? void 0 : R.data) == null ? void 0 : be.message) || (he == null ? void 0 : he.message) || "Error al convertir en ticket";
      Te.error(se);
    }
  }, We = () => {
    var R, be;
    T ? Wt.start({
      sessionId: `${t.id}`,
      conversationId: t.id,
      userId: C.currentUserId || "",
      userAuthId: ((be = (R = C.currentUser) == null ? void 0 : R.attributes) == null ? void 0 : be.user_auth_id) || "",
      senderMessengerId: C.currentUserId || "",
      onCallEnded: (he) => {
        var se;
        he.outcome === "escalated_live" && ((se = he.data) != null && se.conversation_id) && Te.success("Tu llamada ha sido transferida a un técnico de soporte."), C.refetchMessages();
      }
    }) : U(!0);
  }, Re = async ({
    rating: R,
    comment: be,
    helpful: he
  }) => {
    var se, ee;
    try {
      const De = de(), Ie = await D({
        session_id: De,
        helpful: he,
        comment: be,
        rating: R
      });
      wt(t.id), v(!1), y(!0), Te.success(
        (Ie == null ? void 0 : Ie.message) || "¡Gracias por tu calificación! El caso ha sido marcado como resuelto.",
        Ie != null && Ie.ticket ? {
          description: `Ticket #${Ie.ticket.number || Ie.ticket.id}`
        } : void 0
      ), d == null || d(Ie);
    } catch (De) {
      const Ie = ((ee = (se = De == null ? void 0 : De.response) == null ? void 0 : se.data) == null ? void 0 : ee.message) || (De == null ? void 0 : De.message) || "Error al finalizar y calificar la atención";
      Te.error(Ie);
    }
  };
  return /* @__PURE__ */ i(Xs, { value: Ve, children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "sdi-messenger-root relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        onDragEnter: xe,
        onDragOver: te,
        onDragLeave: we,
        onDrop: pe,
        onPaste: ue,
        children: [
          u && /* @__PURE__ */ e(
            al,
            {
              conversation: t,
              isClosed: F,
              isClosing: C.isClosing,
              onCloseConversation: C.handleCloseConversation,
              isContextPanelOpen: n,
              onToggleContextPanel: r,
              onBack: a,
              alwaysShowBackButton: s,
              renderOptions: p,
              onStartVoiceCall: We
            }
          ),
          /* @__PURE__ */ i("div", { className: "relative flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[#f4f6f8]/70 dark:bg-[#0a0f1d]", children: [
            m && /* @__PURE__ */ e(fl, {}),
            V && /* @__PURE__ */ e("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xs border-2 border-dashed border-blue-500/70 dark:border-blue-400/70 rounded-2xl m-2 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95", children: /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-xl border border-blue-500/20 text-center max-w-xs mx-4", children: [
              /* @__PURE__ */ e("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-inner", children: /* @__PURE__ */ e($a, { className: "size-7 animate-bounce" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("p", { className: "text-sm font-semibold text-neutral-800 dark:text-neutral-100", children: "Suelta tu imagen aquí" }),
                /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Se adjuntará para que puedas enviarla" })
              ] })
            ] }) }),
            /* @__PURE__ */ e(
              ml,
              {
                conversation: t,
                messages: C.messages,
                optimisticMessages: C.optimisticMessages,
                scrollRef: C.scrollRef,
                isFetchingNextPage: C.isFetchingNextPage,
                hasNextPage: C.hasNextPage,
                isLoading: C.isLoading,
                isNearBottom: C.isNearBottom,
                newMessagesCount: C.newMessagesCount,
                visibleDate: C.visibleDate,
                disableActions: ce || A || j,
                onScrollToBottom: C.scrollToBottom,
                onActionClick: Le
              }
            ),
            C.typingUser && !c && /* @__PURE__ */ i("div", { className: "relative z-10 flex shrink-0 items-center gap-1.5 px-4 py-1 text-xs text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-150", children: [
              /* @__PURE__ */ i("span", { className: "font-medium", children: [
                C.typingUser,
                " está escribiendo"
              ] }),
              /* @__PURE__ */ i("span", { className: "inline-flex gap-0.5", "aria-hidden": "true", children: [
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse" }),
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-75" }),
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-150" })
              ] })
            ] }),
            f && /* @__PURE__ */ e("div", { className: "relative z-10 w-full", children: /* @__PURE__ */ e(
              hl,
              {
                inputText: C.inputText,
                setInputText: C.setInputText,
                onSendMessage: C.handleSendMessage,
                onSelectFile: C.handleSelectFile,
                pendingFile: C.pendingFile,
                onRemoveFile: () => C.setPendingFile(null),
                isSending: C.isSending,
                isUploading: C.isUploading,
                conversationName: C.conversationName,
                isClosed: F,
                readOnly: c,
                readOnlyMessage: h
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e(
      pl,
      {
        open: x,
        onOpenChange: (R) => {
          w(R), R || ($(null), I(!1));
        },
        onSubmit: Ce,
        isSubmitting: A,
        queueData: S,
        isPollingQueue: z,
        onConvertToTicket: Me,
        isConvertingToTicket: X,
        onActionSelect: (R) => {
          w(!1), $(null), Le(R);
        },
        error: ((Xe = (Ue = P == null ? void 0 : P.response) == null ? void 0 : Ue.data) == null ? void 0 : Xe.message) || (P == null ? void 0 : P.message)
      }
    ),
    /* @__PURE__ */ e(
      xl,
      {
        open: g,
        onOpenChange: v,
        onSubmit: Re,
        isSubmitting: j,
        error: ((st = (bt = q == null ? void 0 : q.response) == null ? void 0 : bt.data) == null ? void 0 : st.message) || (q == null ? void 0 : q.message)
      }
    ),
    !T && /* @__PURE__ */ e(
      Pn,
      {
        open: J,
        onOpenChange: U,
        sessionId: de() || `${t.id}`,
        conversationId: t.id,
        userId: C.currentUserId || "",
        userAuthId: ((it = (ut = C.currentUser) == null ? void 0 : ut.attributes) == null ? void 0 : it.user_auth_id) || "",
        senderMessengerId: C.currentUserId || "",
        onCallEnded: (R) => {
          var be;
          R.outcome === "escalated_live" && ((be = R.data) != null && be.conversation_id) && Te.success("Tu llamada ha sido transferida a un técnico de soporte."), R.outcome === "resolved" && (wt(t.id), y(!0)), C.refetchMessages();
        }
      }
    )
  ] });
}
function vl({
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
        /* @__PURE__ */ e(hr, { className: "size-4 text-emerald-600 dark:text-emerald-400" }),
        /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-800 dark:text-neutral-200", children: "Solicitud Registrada" })
      ] }),
      s && /* @__PURE__ */ e(
        ge,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: s,
          className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          children: /* @__PURE__ */ e(et, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4", children: [
      /* @__PURE__ */ i("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ e("div", { className: "size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(zt, { className: "size-7" }) }),
        /* @__PURE__ */ e("div", { className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ e(yt, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "Ticket de Soporte Creado" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed", children: t })
      ] }),
      r && /* @__PURE__ */ i("div", { className: "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200", children: [
            /* @__PURE__ */ e(Pr, { className: "size-3.5 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ i("span", { children: [
              "Ticket #",
              o
            ] })
          ] }),
          /* @__PURE__ */ e(vt, { variant: "outline", className: "text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", children: r.status === "created" ? "Registrado" : r.status })
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
        ge,
        {
          type: "button",
          variant: "secondary",
          size: "sm",
          onClick: n,
          className: "flex-1 gap-1.5 text-xs font-medium cursor-pointer",
          children: [
            /* @__PURE__ */ e(kn, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Nueva Consulta" })
          ]
        }
      ),
      l && a && /* @__PURE__ */ i(
        ge,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: a,
          className: "flex-1 gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
          children: [
            /* @__PURE__ */ e(Hr, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Ver mis chats" })
          ]
        }
      )
    ] })
  ] });
}
function Hn(t, r = 300) {
  const [n, a] = k(t);
  return re(() => {
    const s = setTimeout(() => {
      a(t);
    }, r);
    return () => {
      clearTimeout(s);
    };
  }, [t, r]), n;
}
function Qr(t) {
  var A;
  const {
    queryKey: r,
    queryFn: n,
    enabled: a = !0,
    initialData: s,
    placeholderData: l,
    keepPreviousData: o = !1,
    onSuccess: d,
    onError: u
  } = t, [m, c] = k(() => s !== void 0 ? s : typeof l == "function" ? l(void 0) : l), [h, f] = k(null), [p, x] = k(() => a && m === void 0), [w, g] = k(() => m !== void 0), [v, b] = k(!1), y = W(n);
  y.current = n;
  const S = W(d);
  S.current = d;
  const $ = W(u);
  $.current = u;
  const z = W(0), I = W(!0), J = JSON.stringify(r), U = Y(async () => {
    var D, j;
    const P = ++z.current;
    x(!0), b(!1), f(null);
    try {
      const q = await y.current();
      return P === z.current && (c(q), g(!0), b(!1), f(null), x(!1), (D = S.current) == null || D.call(S, q)), q;
    } catch (q) {
      if (P === z.current) {
        const Z = q;
        f(Z), b(!0), g(!1), x(!1), (j = $.current) == null || j.call($, Z);
      }
      return;
    }
  }, []);
  re(() => {
    if (!a) {
      x(!1);
      return;
    }
    I.current || (l !== void 0 ? c(
      typeof l == "function" ? (P) => l(P) : l
    ) : o || c(void 0)), I.current = !1, U();
  }, [a, J, o]);
  const T = ((A = h == null ? void 0 : h.response) == null ? void 0 : A.data) ?? (h == null ? void 0 : h.data) ?? {}, B = a && p && m === void 0;
  return {
    data: m,
    error: h,
    errors: T,
    isLoading: B,
    isPending: B,
    isFetching: p,
    isSuccess: w,
    isError: v,
    refetch: U,
    setData: c
  };
}
const wl = (t) => {
  var a, s, l, o, d;
  const r = (t == null ? void 0 : t.params) ?? {}, n = Qr({
    queryKey: ["list-chat-users", r],
    queryFn: () => rs(r),
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
}, Wn = () => {
  const t = Y(async (r) => {
    var s;
    const n = await Vs(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    return typeof window < "u" && a && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversation: a }
      })
    ), a;
  }, []);
  return pt(
    t
  );
};
function yl({
  open: t,
  onOpenChange: r,
  onSuccess: n
}) {
  const { currentUserId: a } = at(), [s, l] = k("direct"), [o, d] = k(""), u = Hn(o, 300), [m, c] = k(null), [h, f] = k([]), [p, x] = k(""), { data: w, isLoading: g } = wl({
    enable: t,
    params: {
      sort: "name",
      paginate: "false",
      ...u.trim() ? { filter: { name: u.trim() } } : {}
    }
  }), { mutateAsync: v, isLoading: b } = Wn(), y = Ge(() => (w || []).filter((T) => String(T.id) !== String(a)), [w, a]), S = (T) => {
    f((B) => B.some((P) => P.id === T.id) ? B.filter((P) => P.id !== T.id) : [...B, T]);
  }, $ = (T) => {
    f((B) => B.filter((A) => A.id !== T));
  }, z = () => {
    c(null), f([]), x(""), d(""), l("direct");
  }, I = (T) => {
    T || z(), r(T);
  }, J = async (T) => {
    var B, A, P, D;
    if (T.preventDefault(), s === "direct") {
      if (!m) {
        Te.warning("Por favor, selecciona un usuario para iniciar la conversación.");
        return;
      }
      try {
        const j = await v({
          type: "direct",
          user_id: Number(m),
          sender_id: Number(a)
        });
        Te.success("Conversación iniciada correctamente"), I(!1), n && j && n(j);
      } catch (j) {
        const q = ((A = (B = j == null ? void 0 : j.response) == null ? void 0 : B.data) == null ? void 0 : A.message) || (j == null ? void 0 : j.message) || "Error al iniciar la conversación";
        Te.error(q);
      }
    } else {
      if (!p.trim()) {
        Te.warning("Por favor, ingresa el nombre del grupo.");
        return;
      }
      if (h.length === 0) {
        Te.warning("Por favor, selecciona al menos un participante para el grupo.");
        return;
      }
      try {
        const j = await v({
          type: "group",
          name: p.trim(),
          user_ids: h.map((q) => Number(q.id)),
          sender_id: Number(a)
        });
        Te.success("Grupo creado correctamente"), I(!1), n && j && n(j);
      } catch (j) {
        const q = ((D = (P = j == null ? void 0 : j.response) == null ? void 0 : P.data) == null ? void 0 : D.message) || (j == null ? void 0 : j.message) || "Error al crear el grupo";
        Te.error(q);
      }
    }
  }, U = b || s === "direct" && !m || s === "group" && (!p.trim() || h.length === 0);
  return /* @__PURE__ */ e(fr, { open: t, onOpenChange: I, children: /* @__PURE__ */ e(pr, { className: "sm:max-w-[480px]", children: /* @__PURE__ */ i("form", { onSubmit: J, className: "flex flex-col", children: [
    /* @__PURE__ */ i(ar, { children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ e(Ut, { className: "size-5" }) }),
        /* @__PURE__ */ i("div", { className: "text-left pr-6", children: [
          /* @__PURE__ */ e(sr, { children: "Nueva Conversación" }),
          /* @__PURE__ */ e(ir, { children: "Inicia un chat directo o crea un grupo de conversación" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3.5", children: /* @__PURE__ */ e(
        In,
        {
          value: s,
          onValueChange: (T) => l(T),
          className: "w-full",
          children: /* @__PURE__ */ i(Tn, { className: "w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ i(
              or,
              {
                value: "direct",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ e(rr, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Directo (1 a 1)" })
                ]
              }
            ),
            /* @__PURE__ */ i(
              or,
              {
                value: "group",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ e(mr, { className: "size-3.5" }),
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
          Vr,
          {
            placeholder: "Ej. Soporte Técnico L2, Equipo Infraestructura...",
            value: p,
            onChange: (T) => x(T.target.value),
            className: "h-9 text-xs",
            required: !0
          }
        )
      ] }),
      s === "group" && h.length > 0 && /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400", children: [
          /* @__PURE__ */ i("span", { children: [
            "Participantes seleccionados (",
            h.length,
            ")"
          ] }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => f([]),
              className: "text-[10px] text-red-500 hover:underline cursor-pointer",
              children: "Quitar todos"
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800", children: h.map((T) => {
          const B = qt(T.attributes.name);
          return /* @__PURE__ */ i(
            vt,
            {
              variant: "secondary",
              className: "gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
              children: [
                /* @__PURE__ */ e(
                  nt,
                  {
                    name: B,
                    src: T.attributes.avatar_url,
                    size: "xs"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "max-w-28 truncate font-medium capitalize", children: B }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: () => $(T.id),
                    className: "rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
                    children: /* @__PURE__ */ e(et, { className: "size-3" })
                  }
                )
              ]
            },
            T.id
          );
        }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between", children: [
          /* @__PURE__ */ e("span", { children: s === "direct" ? "Selecciona un usuario" : "Añadir participantes" }),
          /* @__PURE__ */ i("span", { className: "text-[10px] font-normal text-neutral-400", children: [
            y.length,
            " disponibles"
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
          /* @__PURE__ */ e(Sn, { className: "size-3.5 shrink-0 text-neutral-400" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              placeholder: "Buscar por nombre...",
              value: o,
              onChange: (T) => d(T.target.value),
              className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
            }
          ),
          o && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => d(""),
              className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer",
              children: /* @__PURE__ */ e(et, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden", children: /* @__PURE__ */ e(Jt, { className: "h-56 sm:h-64 w-full", children: g ? /* @__PURE__ */ i("div", { className: "flex h-56 items-center justify-center gap-2 text-xs text-neutral-500", children: [
        /* @__PURE__ */ e(Je, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ e("span", { children: "Cargando usuarios..." })
      ] }) : y.length === 0 ? /* @__PURE__ */ i("div", { className: "flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500", children: [
        /* @__PURE__ */ e("p", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: "No se encontraron usuarios" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] mt-1", children: "Prueba con otro término de búsqueda" })
      ] }) : /* @__PURE__ */ e("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5", children: y.map((T) => {
        const B = m === T.id, A = h.some((j) => j.id === T.id), P = s === "direct" ? B : A, D = qt(T.attributes.name);
        return /* @__PURE__ */ i(
          "div",
          {
            onClick: () => {
              s === "direct" ? c(T.id) : S(T);
            },
            className: M(
              "flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors",
              P ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium" : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200"
            ),
            children: [
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
                /* @__PURE__ */ e(
                  nt,
                  {
                    name: D,
                    src: T.attributes.avatar_url,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ e("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ e("p", { className: "truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize", children: D }) })
              ] }),
              /* @__PURE__ */ e("div", { className: "shrink-0 pl-1", children: /* @__PURE__ */ e(
                "div",
                {
                  className: M(
                    "flex size-5 items-center justify-center rounded-full border transition-all",
                    P ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent"
                  ),
                  children: /* @__PURE__ */ e(Ur, { className: "size-3 stroke-[2.5]" })
                }
              ) })
            ]
          },
          T.id
        );
      }) }) }) })
    ] }),
    /* @__PURE__ */ i(lr, { children: [
      /* @__PURE__ */ e(
        ge,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => I(!1),
          disabled: b,
          className: "text-xs h-8 px-3.5 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        ge,
        {
          type: "submit",
          size: "sm",
          variant: "primary",
          disabled: U,
          className: "text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer",
          children: b ? /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Creando..." })
          ] }) : /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e(Ut, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: s === "direct" ? "Iniciar Chat" : "Crear Grupo" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const Nl = (t) => {
  var a, s, l, o;
  const r = (t == null ? void 0 : t.params) ?? {}, n = Qr({
    queryKey: ["list-conversations", r],
    queryFn: () => Os(r),
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
}, kl = ({
  showToastOnUnread: t = !0,
  isActive: r = !0
} = {}) => {
  const { config: n, currentUser: a, currentUserId: s } = at(), { mutateAsync: l } = Ln(), o = dt({
    permission: ["messenger_chat.read"]
  }), [d, u] = k("0"), [m, c] = k("all"), [h, f] = k(""), p = Hn(h, 300), x = Ge(() => {
    const E = {
      closed: d
    };
    return m !== "all" && (E.type = m), p.trim() && (E.name = p.trim()), {
      user_id: s,
      paginate: "false",
      ...Object.keys(E).length > 0 ? { filter: E } : {}
    };
  }, [d, m, p, s]), {
    data: w,
    isLoading: g,
    isFetching: v,
    errors: b,
    refetch: y,
    setData: S
  } = Nl({
    params: x,
    enable: !!s && o
  }), [$, z] = k(""), [I, J] = k(null), [U, T] = k(!1), [B, A] = k(!1), [P, D] = k(!1), j = Ge(() => {
    let E = w;
    return I && !w.some((H) => String(H.id) === String(I.id)) && (E = [I, ...w]), !r || !$ ? E : E.map((H) => String(H.id) === String($) && H.attributes.unread_count > 0 ? {
      ...H,
      attributes: {
        ...H.attributes,
        unread_count: 0
      }
    } : H);
  }, [I, r, w, $]), q = Y(
    (E) => {
      const H = s && String(E.message.sender_id) !== String(s), F = r && String(E.conversation_id) === String($);
      H && (cr(F ? "focused" : "unfocused"), t && !F && Te.info("Nuevo mensaje", {
        id: `conversation-message-${E.message.id}`,
        description: E.message.body || "Tienes un mensaje nuevo",
        action: {
          label: "Abrir",
          onClick: () => {
            z(String(E.conversation_id)), A(!0);
          }
        }
      }), y());
    },
    [s, r, y, $, t]
  ), Z = Y(() => {
    y();
  }, [y]);
  re(() => {
    if (typeof window > "u") return;
    const E = () => {
      y();
    }, H = (xe) => {
      const te = xe.detail, we = te != null && te.conversationId ? String(te.conversationId) : null;
      we && S && S((pe) => {
        var ue;
        return (ue = pe == null ? void 0 : pe.data) != null && ue.data ? {
          ...pe,
          data: {
            ...pe.data,
            data: pe.data.data.map(
              (Ve) => String(Ve.id) === we ? {
                ...Ve,
                attributes: {
                  ...Ve.attributes,
                  unread_count: 0
                }
              } : Ve
            )
          }
        } : pe;
      });
    }, F = (xe) => {
      const te = xe.detail, we = te != null && te.conversationId ? String(te.conversationId) : null, pe = (te == null ? void 0 : te.closed_at) || (/* @__PURE__ */ new Date()).toISOString();
      we && (z((ue) => ue === we ? "" : ue), A(!1)), J((ue) => !ue || !we || String(ue.id) !== we ? ue : d === "0" ? null : {
        ...ue,
        attributes: {
          ...ue.attributes,
          closed_at: pe
        }
      }), we && S && S((ue) => {
        var Le;
        if (!((Le = ue == null ? void 0 : ue.data) != null && Le.data)) return ue;
        const Ve = ue.data.data;
        return d === "0" ? {
          ...ue,
          data: {
            ...ue.data,
            data: Ve.filter((Ce) => String(Ce.id) !== we)
          }
        } : {
          ...ue,
          data: {
            ...ue.data,
            data: Ve.map(
              (Ce) => String(Ce.id) === we ? {
                ...Ce,
                attributes: {
                  ...Ce.attributes,
                  closed_at: pe
                }
              } : Ce
            )
          }
        };
      }), y();
    }, ce = (xe) => {
      const te = xe.detail;
      if (te != null && te.conversationId) {
        const we = String(te.conversationId);
        te.conversation && J(te.conversation), u("0"), c((pe) => pe === "all" || pe === "direct" ? pe : "all"), f(""), z(we), A(!0);
      }
      y();
    };
    return window.addEventListener("messenger:conversation-read", H), window.addEventListener("messenger:conversation-closed", F), window.addEventListener("messenger:conversation-created", ce), window.addEventListener("messenger:conversation-updated", E), () => {
      window.removeEventListener("messenger:conversation-read", H), window.removeEventListener("messenger:conversation-closed", F), window.removeEventListener("messenger:conversation-created", ce), window.removeEventListener("messenger:conversation-updated", E);
    };
  }, [y, d, S]), re(() => {
    if (s)
      return $n(
        n.reverb,
        s,
        q,
        Z
      );
  }, [n.reverb, Z, q, s]);
  const X = Ge(
    () => j.find((E) => String(E.id) === String($)) ?? (I && String(I.id) === String($) ? I : void 0),
    [j, I, $]
  ), de = Y(
    (E) => {
      const H = String(E);
      z(H), A(!0), H && s && l({
        conversationId: H,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: s
      }).then(() => {
        y();
      }).catch(console.error);
    },
    [s, l, y]
  );
  return {
    conversations: j,
    selectedId: $,
    setSelectedId: z,
    selectedConversation: X,
    closedFilter: d,
    setClosedFilter: u,
    typeFilter: m,
    setTypeFilter: c,
    searchQuery: h,
    setSearchQuery: f,
    isContextPanelOpen: U,
    isMobileChatOpen: B,
    isNewConversationOpen: P,
    isLoading: g,
    isFetching: v,
    errors: b,
    hasReadPermission: o,
    currentUser: a,
    currentUserId: s,
    selectConversation: de,
    unselectConversation: () => {
      z(""), A(!1);
    },
    refetchConversations: y,
    setIsContextPanelOpen: T,
    setIsNewConversationOpen: D,
    goBackToConversationList: () => A(!1),
    handleConversationCreated: (E) => {
      J(E), z(String(E.id)), A(!0), D(!1), y();
    }
  };
}, Cl = () => {
  const t = Y(async (r) => {
    var s;
    const n = await Ms(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    return typeof window < "u" && (a != null && a.conversation_id) && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversationId: a.conversation_id }
      })
    ), a;
  }, []);
  return pt(
    t
  );
}, qn = ["/messenger"];
function bn(t, r) {
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
function Sl({
  hiddenPaths: t = qn,
  showOnlyPaths: r,
  hideCondition: n,
  hidden: a = !1,
  currentPath: s
}) {
  const [l, o] = k(() => s !== void 0 ? s : typeof window < "u" ? window.location.pathname : "");
  return re(() => {
    if (s !== void 0) {
      o(s);
      return;
    }
    if (typeof window > "u") return;
    const u = () => {
      const c = window.location.pathname;
      o((h) => h !== c ? c : h);
    };
    u(), window.addEventListener("popstate", u), window.addEventListener("pushstate", u), window.addEventListener("replacestate", u), window.addEventListener("locationchange", u);
    const m = window.setInterval(u, 150);
    return () => {
      window.removeEventListener("popstate", u), window.removeEventListener("pushstate", u), window.removeEventListener("replacestate", u), window.removeEventListener("locationchange", u), window.clearInterval(m);
    };
  }, [s]), { shouldHide: Ge(() => a ? !0 : l ? !!(n && n(l) || r && r.length > 0 && !r.some((m) => bn(l, m)) || t && t.length > 0 && t.some((m) => bn(l, m))) : !1, [l, a, n, r, t]), pathname: l };
}
const xn = "sdi_floating_chat_corner";
function zl(t = "bottom-right") {
  const r = W(null), [n, a] = k(t), [s, l] = k(!1), [o, d] = k(null), u = W({ startX: 0, startY: 0, rect: new DOMRect(), moved: !1 }), m = W(!1), c = W(null);
  re(() => {
    try {
      const v = localStorage.getItem(xn);
      v && ["bottom-right", "bottom-left", "top-right", "top-left"].includes(v) && a(v);
    } catch {
    }
  }, []);
  const h = (v) => {
    a(v);
    try {
      localStorage.setItem(xn, v);
    } catch {
    }
  }, f = (v) => {
    if (v.button !== 0 && v.pointerType === "mouse") return;
    const b = r.current;
    if (!b) return;
    const y = b.getBoundingClientRect();
    u.current = {
      startX: v.clientX,
      startY: v.clientY,
      rect: y,
      moved: !1
    };
    const S = v.clientX - y.left, $ = v.clientY - y.top, z = (J) => {
      Math.hypot(
        J.clientX - u.current.startX,
        J.clientY - u.current.startY
      ) > 5 && (u.current.moved || (u.current.moved = !0, l(!0)), c.current && cancelAnimationFrame(c.current), c.current = requestAnimationFrame(() => {
        const T = Math.max(
          12,
          Math.min(window.innerWidth - y.width - 12, J.clientX - S)
        ), B = Math.max(
          12,
          Math.min(window.innerHeight - y.height - 12, J.clientY - $)
        );
        d({ x: T, y: B });
      }));
    }, I = (J) => {
      if (window.removeEventListener("pointermove", z), window.removeEventListener("pointerup", I), window.removeEventListener("pointercancel", I), c.current && cancelAnimationFrame(c.current), u.current.moved) {
        m.current = !0, setTimeout(() => {
          m.current = !1;
        }, 100);
        const U = J.clientX > window.innerWidth / 2, B = J.clientY > window.innerHeight / 2 ? U ? "bottom-right" : "bottom-left" : U ? "top-right" : "top-left";
        h(B), l(!1), d(null);
      }
    };
    window.addEventListener("pointermove", z), window.addEventListener("pointerup", I), window.addEventListener("pointercancel", I);
  }, p = n.startsWith("top"), x = n.endsWith("left");
  return {
    containerRef: r,
    corner: n,
    isDragging: s,
    dragPos: o,
    wasDraggedRef: m,
    isTop: p,
    isLeft: x,
    cornerContainerClass: p ? x ? "top-6 left-6 items-start flex-col-reverse" : "top-6 right-6 items-end flex-col-reverse" : x ? "bottom-6 left-6 items-start flex-col" : "bottom-6 right-6 items-end flex-col",
    cardOriginClass: p ? x ? "origin-top-left" : "origin-top-right" : x ? "origin-bottom-left" : "origin-bottom-right",
    startDrag: f,
    changeCorner: h
  };
}
function _l({
  isOpen: t,
  totalUnreadCount: r,
  isLeft: n,
  isLoading: a = !1,
  hasError: s = !1,
  onToggleOpen: l,
  onPointerDown: o
}) {
  const d = () => t ? "bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rotate-90 shadow-2xl" : s ? "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/40 shadow-rose-500/30" : a ? "bg-blue-600/90 text-white" : "bg-blue-600 hover:bg-blue-700 text-white", u = () => t ? "Cerrar chat de soporte" : s ? "Error de conexión en el chat (Haz clic para ver detalles o reintentar)" : a ? "Conectando al chat de soporte..." : r > 0 ? `Abrir chat de soporte (${r} mensaje${r === 1 ? "" : "s"} sin leer)` : "Abrir chat de soporte";
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
            className: M(
              "flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40",
              d()
            ),
            "aria-label": u(),
            title: u(),
            children: t ? /* @__PURE__ */ e(et, { className: "size-6 transition-transform duration-200 text-white" }) : s ? /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center animate-in zoom-in-75 duration-200", children: /* @__PURE__ */ e(Wr, { className: "size-6 transition-transform duration-200 text-white" }) }) : a ? /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ e(Je, { className: "size-6 animate-spin text-white" }) }) : /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ e(Ua, { className: "size-6 transition-transform duration-200" }) })
          }
        ),
        !t && s && /* @__PURE__ */ i(
          "span",
          {
            className: M(
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
            className: M(
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
const Al = "1.4.0", El = {
  version: Al
}, On = El.version;
function Zr({
  onNewConversation: t,
  showNewButton: r = !0,
  className: n
}) {
  var m, c;
  const { currentUser: a, isLoadingUser: s, hasError: l } = at(), o = dt({
    permission: ["messenger_chat_support.provide_support"]
  }), d = qt((m = a == null ? void 0 : a.attributes) == null ? void 0 : m.name) || "Usuario", u = ((c = a == null ? void 0 : a.attributes) == null ? void 0 : c.email) || "Mi cuenta";
  return l ? /* @__PURE__ */ i(
    "div",
    {
      className: M(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        n
      ),
      children: [
        /* @__PURE__ */ e(yn, { className: "size-3.5 shrink-0 text-red-500" }),
        /* @__PURE__ */ e("span", { className: "truncate text-[11px] font-medium", children: "Sin conexión • No disponible" })
      ]
    }
  ) : s ? /* @__PURE__ */ i(
    "div",
    {
      className: M(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(me, { className: "size-8 rounded-full" }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
            /* @__PURE__ */ e(me, { className: "h-3 w-20" }),
            /* @__PURE__ */ e(me, { className: "h-2.5 w-32" })
          ] })
        ] }),
        r && /* @__PURE__ */ e(me, { className: "size-8 rounded-lg shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      className: M(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(nt, { src: a == null ? void 0 : a.attributes.avatar_url, name: d, size: "sm" }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("p", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: d }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400 mt-0.5", children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: u }),
              /* @__PURE__ */ e("span", { className: "text-neutral-300 dark:text-neutral-700 select-none", children: "•" }),
              /* @__PURE__ */ i("span", { className: "font-mono text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0", children: [
                "v",
                On
              ] })
            ] })
          ] })
        ] }),
        r && t && o && /* @__PURE__ */ e(
          ge,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: t,
            className: "h-8 gap-1.5 px-3 text-xs font-semibold shrink-0 shadow-xs cursor-pointer",
            title: "Iniciar nueva conversación",
            children: /* @__PURE__ */ e(Ut, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function Il({
  title: t,
  canRequestSupport: r,
  canViewChatList: n,
  supportWithBot: a = !0,
  isStartingBot: s = !1,
  totalUnreadCount: l,
  conversationsCount: o,
  onRequestSupport: d,
  onViewChatList: u,
  onClose: m,
  onNewConversation: c,
  onDragStart: h
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ i(
      "div",
      {
        onPointerDown: h,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md", children: /* @__PURE__ */ e(Tr, { className: "size-5 text-white" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("h3", { className: "text-sm font-bold leading-none text-white", children: t }),
                /* @__PURE__ */ i("p", { className: "text-[11px] text-blue-100 mt-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }),
                  "Soporte técnico SDI"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e(
              ge,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (f) => f.stopPropagation(),
                onClick: m,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ e(et, { className: "size-4" })
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
              /* @__PURE__ */ e("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: s ? /* @__PURE__ */ e(Je, { className: "size-5 animate-spin" }) : /* @__PURE__ */ e(Tr, { className: "size-5" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Solicitar Asistencia" }),
                /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: s ? "Iniciando conversación..." : a ? "Inicia atención inmediata con nuestro asistente" : "Ingresa asunto y mensaje para iniciar soporte" })
              ] })
            ] }),
            /* @__PURE__ */ e(an, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      n && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: u,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer",
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ i("div", { className: "relative flex size-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: [
                /* @__PURE__ */ e(Hr, { className: "size-5" }),
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
            /* @__PURE__ */ e(an, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ i("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30 p-3 mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs", children: [
            /* @__PURE__ */ e(hr, { className: "size-3.5 text-emerald-600" }),
            /* @__PURE__ */ e("span", { children: "Mesa de Ayuda SDI" })
          ] }),
          /* @__PURE__ */ i("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500", children: [
            "v",
            On
          ] })
        ] }),
        /* @__PURE__ */ e("p", { className: "leading-relaxed", children: "Tus solicitudes quedan registradas con trazabilidad y número de ticket en la plataforma de Helpdesk." })
      ] })
    ] }),
    /* @__PURE__ */ e(Zr, { onNewConversation: c })
  ] });
}
function Tl({
  userId: t,
  userName: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null,
  onCancel: l
}) {
  const [o, d] = k(""), [u, m] = k(""), [c, h] = k(null);
  return /* @__PURE__ */ i("form", { onSubmit: (p) => {
    p.preventDefault(), h(null);
    const x = o.trim(), w = u.trim();
    if (!x) {
      h("Por favor ingresa el asunto de tu solicitud.");
      return;
    }
    if (!w) {
      h("Por favor describe el detalle de tu consulta.");
      return;
    }
    if (!t) {
      h("No se pudo identificar el usuario actual para la solicitud.");
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
        /* @__PURE__ */ e("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ e(Tr, { className: "size-4.5" }) }),
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
      (c || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(Vt, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ i("div", { className: "flex-1 leading-snug", children: [
          /* @__PURE__ */ e("span", { className: "font-medium", children: "Error en el formulario:" }),
          " ",
          c || s
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ e(Ha, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ e("span", { children: "Asunto de la consulta" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ e("div", { className: "relative", children: /* @__PURE__ */ e(
          Vr,
          {
            value: o,
            onChange: (p) => {
              d(p.target.value), c && h(null);
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
          /* @__PURE__ */ e(Wa, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ e("span", { children: "Detalle o descripción" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ e(
            Kt,
            {
              value: u,
              onChange: (p) => {
                m(p.target.value), c && h(null);
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
              u.length,
              "/1000"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 p-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: [
        /* @__PURE__ */ e(hr, { className: "size-4 shrink-0 text-neutral-400 mt-0.5" }),
        /* @__PURE__ */ e("span", { children: "Tu solicitud creará automáticamente una conversación y se notificará al equipo de asistencia." })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900/80 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e("div", { children: l && /* @__PURE__ */ e(
        ge,
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
        ge,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || !o.trim() || !u.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          children: a ? /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e(Je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Enviando solicitud..." })
          ] }) : /* @__PURE__ */ i(Fe, { children: [
            /* @__PURE__ */ e("span", { children: "Iniciar soporte" }),
            /* @__PURE__ */ e(Gt, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] });
}
function Ml({
  userId: t,
  userName: r,
  canViewChatList: n,
  totalUnreadCount: a,
  isSubmitting: s,
  error: l,
  onHome: o,
  onViewChats: d,
  onClose: u,
  onSubmit: m,
  onNewConversation: c,
  onDragStart: h
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ e(
      "div",
      {
        onPointerDown: h,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-3.5 py-4 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ i(
              ge,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (f) => f.stopPropagation(),
                onClick: o,
                className: "h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ e($r, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Inicio" })
                ]
              }
            ),
            /* @__PURE__ */ e("span", { className: "text-xs font-bold text-white", children: "Solicitar Asistencia" })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
            n && /* @__PURE__ */ i(
              ge,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (f) => f.stopPropagation(),
                onClick: d,
                title: "Ver mis chats",
                className: "relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1",
                children: [
                  /* @__PURE__ */ e(Hr, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { className: "hidden sm:inline text-[11px] font-medium", children: "Mis chats" }),
                  a > 0 && /* @__PURE__ */ e("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs", children: a > 99 ? "99+" : a })
                ]
              }
            ),
            /* @__PURE__ */ e(
              ge,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (f) => f.stopPropagation(),
                onClick: u,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ e(et, { className: "size-4" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-hidden flex flex-col", children: t && /* @__PURE__ */ e(
      Tl,
      {
        userId: t,
        userName: r,
        onSubmit: m,
        isSubmitting: s,
        error: l,
        onCancel: o
      }
    ) }),
    /* @__PURE__ */ e(Zr, { onNewConversation: c })
  ] });
}
const Dl = [
  { id: "all", label: "Todos", icon: null },
  { id: "direct", label: "Directos", icon: rr },
  { id: "group", label: "Grupos", icon: mr },
  { id: "bot", label: "Bots", icon: Dr }
], Pl = () => /* @__PURE__ */ i("div", { className: "flex w-full min-w-0 items-center gap-2.5 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-800/20", children: [
  /* @__PURE__ */ e(me, { className: "size-9.5 rounded-full shrink-0" }),
  /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 space-y-2", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e(me, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ e(me, { className: "h-2.5 w-10" })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e(me, { className: "h-2.5 w-36" }),
      /* @__PURE__ */ e(me, { className: "h-3.5 w-6 rounded-full" })
    ] })
  ] })
] }), Rl = ({
  conversation: t,
  selectedId: r,
  currentUserId: n,
  onSelectConversation: a
}) => {
  var p, x, w, g;
  const s = Yt(t), l = Et(t, n), o = t.type === "bot" || ((p = t.attributes) == null ? void 0 : p.type) === "bot" || Number((x = l == null ? void 0 : l.attributes) == null ? void 0 : x.user_auth_id) === 0, d = !!t.attributes.closed_at, u = jt(t, n), m = ((g = (w = t.relationships) == null ? void 0 : w.users) == null ? void 0 : g.length) || 0, c = s ? "Grupo" : o ? "Bot de Asistencia" : "Conversación directa";
  let h = "";
  try {
    h = nr(
      Or(t.attributes.updated_at || t.attributes.created_at),
      "dd/MM HH:mm"
    );
  } catch {
    h = "";
  }
  const f = String(r) === String(t.id);
  return /* @__PURE__ */ e(
    "div",
    {
      onClick: () => a(String(t.id)),
      "aria-current": f ? "true" : void 0,
      className: M(
        "group relative flex w-full min-w-0 cursor-pointer select-none flex-col gap-1.5 overflow-hidden rounded-xl p-3 transition-all",
        f ? "bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900" : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent"
      ),
      children: /* @__PURE__ */ i("div", { className: "flex items-start gap-2.5 min-w-0", children: [
        /* @__PURE__ */ e(
          nt,
          {
            src: l == null ? void 0 : l.attributes.avatar_url,
            name: u,
            isGroup: s,
            isBot: o,
            size: "md",
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("h4", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: u }),
              o && /* @__PURE__ */ e("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-violet-100 dark:bg-violet-950/70 px-1 py-0.2 text-[9px] font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40 shrink-0 shadow-2xs", children: "IA" }),
              s && /* @__PURE__ */ i("span", { className: "text-[10px] text-neutral-400 font-normal shrink-0", children: [
                "(",
                m,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ e("span", { className: "shrink-0 text-[10px] text-neutral-400 font-mono", children: h })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("p", { className: "truncate text-[11px] text-neutral-500 dark:text-neutral-400", children: c }),
              d && /* @__PURE__ */ i(
                vt,
                {
                  variant: "outline",
                  className: "h-4 px-1 text-[9px] gap-0.5 border-amber-300 text-amber-700 dark:text-amber-400 font-medium",
                  children: [
                    /* @__PURE__ */ e(_t, { className: "size-2" }),
                    /* @__PURE__ */ e("span", { children: "Cerrado" })
                  ]
                }
              )
            ] }),
            t.attributes.unread_count > 0 && /* @__PURE__ */ e(vt, { className: "bg-blue-700", children: t.attributes.unread_count })
          ] })
        ] })
      ] })
    }
  );
};
function jl({
  conversations: t,
  selectedId: r,
  onSelectConversation: n,
  searchQuery: a,
  onSearchChange: s,
  closedFilter: l,
  onClosedFilterChange: o,
  typeFilter: d,
  onTypeFilterChange: u,
  onNewConversation: m,
  isLoading: c = !1
}) {
  const { currentUser: h, currentUserId: f, isLoadingUser: p, hasError: x, error: w } = at(), g = dt({
    permission: ["messenger_chat.read"]
  }), v = c || p;
  return /* @__PURE__ */ i("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ i("div", { className: "flex shrink-0 flex-col gap-2.5 border-b border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900", children: [
      /* @__PURE__ */ i("div", { className: "group/search relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
        /* @__PURE__ */ e(Sn, { className: "size-3.5 shrink-0 text-neutral-400 transition-colors group-focus-within/search:text-blue-600" }),
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
          ge,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => s(""),
            className: "size-5 shrink-0 rounded-full p-0 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
            children: /* @__PURE__ */ e(et, { className: "size-3" })
          }
        ) : /* @__PURE__ */ e("span", { className: "hidden shrink-0 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-400 sm:inline-block", children: "Buscar" })
      ] }),
      /* @__PURE__ */ e(
        In,
        {
          value: l,
          onValueChange: (b) => o(b),
          className: "w-full",
          children: /* @__PURE__ */ i(Tn, { className: "h-8 w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ e(or, { value: "0", className: "text-[11px] font-medium", children: "Activos" }),
            /* @__PURE__ */ e(or, { value: "1", className: "text-[11px] font-medium", children: "Cerrados" })
          ] })
        }
      ),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none", children: Dl.map((b) => {
        const y = d === b.id, S = b.icon;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => u(b.id),
            className: M(
              "flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              y ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 border border-transparent"
            ),
            children: [
              S && /* @__PURE__ */ e(S, { className: "size-3" }),
              /* @__PURE__ */ e("span", { children: b.label })
            ]
          },
          b.id
        );
      }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ e(Jt, { className: "h-full w-full", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 p-1.5 w-full min-w-0", children: x ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(Wr, { className: "size-6" }) }),
      /* @__PURE__ */ i("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Error al cargar chats" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: (w == null ? void 0 : w.message) || "No se pudo conectar al servidor de mensajería." })
      ] }),
      /* @__PURE__ */ i(
        ge,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: () => window.location.reload(),
          className: "h-7.5 gap-1.5 px-3 text-xs font-semibold cursor-pointer",
          children: [
            /* @__PURE__ */ e(Fr, { className: "size-3" }),
            /* @__PURE__ */ e("span", { children: "Reintentar" })
          ]
        }
      )
    ] }) : !g && !p ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(_t, { className: "size-6" }) }),
      /* @__PURE__ */ i("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Sin permiso de lectura" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: "No tienes permisos para ver el listado de conversaciones." })
      ] })
    ] }) : v ? /* @__PURE__ */ e("div", { className: "space-y-1.5 p-1", children: Array.from({ length: 5 }).map((b, y) => /* @__PURE__ */ e(Pl, {}, y)) }) : t.length === 0 ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ e("div", { className: "mb-3 flex size-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400", children: /* @__PURE__ */ e(qa, { className: "size-5 stroke-[1.5]" }) }),
      /* @__PURE__ */ e("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100", children: a ? "No se encontraron resultados" : l === "1" ? "No hay conversaciones cerradas" : "No hay conversaciones activas" }),
      /* @__PURE__ */ e("p", { className: "mt-1 max-w-48 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400", children: a ? "Intenta con otro término de búsqueda o cambia los filtros." : "Las conversaciones iniciadas aparecerán aquí." }),
      l !== "0" && /* @__PURE__ */ e(
        ge,
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
      Rl,
      {
        conversation: b,
        selectedId: r,
        currentUserId: f,
        onSelectConversation: n
      },
      b.id
    )) }) }) }),
    /* @__PURE__ */ e(Zr, { onNewConversation: m })
  ] });
}
function Ll({
  conversations: t,
  selectedId: r,
  searchQuery: n,
  closedFilter: a,
  typeFilter: s,
  isLoading: l,
  onHome: o,
  onClose: d,
  onSelectConversation: u,
  onSearchChange: m,
  onClosedFilterChange: c,
  onTypeFilterChange: h,
  onNewConversation: f,
  onDragStart: p
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: [
    /* @__PURE__ */ i(
      "div",
      {
        onPointerDown: p,
        className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900 cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ i(
            ge,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (x) => x.stopPropagation(),
              onClick: o,
              className: "h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100",
              children: [
                /* @__PURE__ */ e($r, { className: "size-3.5" }),
                /* @__PURE__ */ e("span", { children: "Inicio" })
              ]
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Mis Conversaciones" }),
          /* @__PURE__ */ e(
            ge,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (x) => x.stopPropagation(),
              onClick: d,
              className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ e(et, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ e(
      jl,
      {
        conversations: t,
        selectedId: r,
        onSelectConversation: u,
        searchQuery: n,
        onSearchChange: m,
        closedFilter: a,
        onClosedFilterChange: c,
        typeFilter: s,
        onTypeFilterChange: h,
        onNewConversation: f,
        isLoading: l
      }
    ) })
  ] });
}
function Bl({
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
              /* @__PURE__ */ e(me, { className: "size-9 rounded-xl bg-white/20" }),
              /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ e(me, { className: "h-3.5 w-32 bg-white/30" }),
                /* @__PURE__ */ e(me, { className: "h-2.5 w-24 bg-white/20" })
              ] })
            ] }),
            /* @__PURE__ */ e(me, { className: "size-7 rounded-full bg-white/20" })
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-4 space-y-1.5", children: [
            /* @__PURE__ */ e(me, { className: "h-3 w-48 bg-white/30" }),
            /* @__PURE__ */ e(me, { className: "h-2.5 w-64 bg-white/20" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      /* @__PURE__ */ i("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e(me, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ e(me, { className: "h-3.5 w-28" }),
            /* @__PURE__ */ e(me, { className: "h-2.5 w-44" })
          ] })
        ] }),
        /* @__PURE__ */ e(me, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e(me, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ e(me, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ e(me, { className: "h-2.5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ e(me, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ i("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(me, { className: "size-3.5 rounded-full" }),
          /* @__PURE__ */ e(me, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ e(me, { className: "h-2.5 w-full" }),
        /* @__PURE__ */ e(me, { className: "h-2.5 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ e(me, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(me, { className: "h-3 w-24" }),
          /* @__PURE__ */ e(me, { className: "h-2.5 w-36" })
        ] })
      ] }),
      /* @__PURE__ */ e(me, { className: "size-8 rounded-lg" })
    ] })
  ] });
}
function Ql({
  canViewChatList: t = !0,
  canRequestSupport: r = !0,
  supportWithBot: n,
  defaultView: a = "home",
  defaultCorner: s = "bottom-right",
  initialConversation: l,
  title: o = "Centro de Ayuda SDI",
  hiddenPaths: d = qn,
  showOnlyPaths: u,
  hideCondition: m,
  hidden: c = !1,
  currentPath: h,
  showToastOnUnread: f = !1,
  renderOptions: p,
  onActiveConversationChange: x
}) {
  var _e, Ae, Pe;
  const w = dt({
    permission: ["messenger_chat.read"]
  }), g = dt({
    permission: ["messenger_chat_support.request_support"]
  });
  dt({
    permission: ["messenger_chat_support.provide_support"]
  });
  const v = dt({
    permission: [
      "messenger_chat.read",
      "messenger_chat_support.request_support",
      "messenger_chat_support.provide_support"
    ],
    operator: "OR"
  }), { currentUser: b, isLoadingUser: y, hasError: S, error: $, config: z } = at(), I = b == null ? void 0 : b.id, J = ((_e = b == null ? void 0 : b.attributes) == null ? void 0 : _e.name) || "Usuario", U = t && w, T = r && g, B = n ?? z.supportWithBot ?? !0, { shouldHide: A } = Sl({
    hiddenPaths: d,
    showOnlyPaths: u,
    hideCondition: m,
    hidden: c,
    currentPath: h
  }), {
    containerRef: P,
    isDragging: D,
    dragPos: j,
    wasDraggedRef: q,
    isTop: Z,
    isLeft: X,
    cornerContainerClass: de,
    cardOriginClass: N,
    startDrag: C
  } = zl(s), [V, E] = k(!1), [H, F] = k(() => !U && !T ? "chat" : a === "list" && !U || a === "support-form" && (!T || B) ? "home" : a), {
    mutateAsync: ce,
    isLoading: xe,
    error: te
  } = Cl(), {
    mutateAsync: we,
    isLoading: pe
  } = Wn(), ue = async () => {
    var G, ie;
    try {
      const ne = await we({
        type: "bot",
        sender_id: I ? Number(I) : void 0,
        user_id: I ? Number(I) : void 0
      });
      ne && (We(ne), ye(ne), Te.success("Conversación iniciada con el Asistente Virtual"), F("chat"));
    } catch (ne) {
      const fe = ((ie = (G = ne == null ? void 0 : ne.response) == null ? void 0 : G.data) == null ? void 0 : ie.message) || (ne == null ? void 0 : ne.message) || "Error al iniciar conversación con el bot";
      Te.error(fe);
    }
  }, Ve = () => {
    B ? ue() : F("support-form");
  }, [Le, Ce] = k(null), [Me, We] = k(
    null
  ), {
    conversations: Re,
    selectedId: Ue,
    selectedConversation: Xe,
    closedFilter: bt,
    setClosedFilter: st,
    typeFilter: ut,
    setTypeFilter: it,
    searchQuery: R,
    setSearchQuery: be,
    isNewConversationOpen: he,
    isLoading: se,
    selectConversation: ee,
    unselectConversation: De,
    refetchConversations: Ie,
    setIsNewConversationOpen: rt,
    handleConversationCreated: ye
  } = kl({
    showToastOnUnread: f,
    isActive: V && H === "chat"
  }), mt = Ge(() => !Re || !Array.isArray(Re) ? 0 : Re.reduce((G, ie) => {
    var ne;
    return G + (((ne = ie.attributes) == null ? void 0 : ne.unread_count) || 0);
  }, 0), [Re]), Q = (Me ? Xe && String(Xe.id) === String(Me.id) ? Xe : Me : null) || l || Xe || null, lt = V && H === "chat" ? Q : null;
  re(() => {
    Dt.set(lt), x == null || x(lt);
  }, [lt, x]), re(() => () => {
    Dt.set(null);
  }, []), re(() => {
    if (typeof window > "u") return;
    const G = (ie) => {
      const ne = ie.detail, fe = ne != null && ne.conversationId ? String(ne.conversationId) : null, ve = Q != null && Q.id ? String(Q.id) : null;
      fe && (ve === fe || String(Me == null ? void 0 : Me.id) === fe) && (We(null), De(), H === "chat" && F(U ? "list" : "home")), Ie();
    };
    return window.addEventListener("messenger:conversation-closed", G), () => {
      window.removeEventListener("messenger:conversation-closed", G);
    };
  }, [
    Q == null ? void 0 : Q.id,
    Me == null ? void 0 : Me.id,
    H,
    U,
    De,
    Ie
  ]), re(() => {
    H === "chat" && !Q && F(U ? "list" : "home");
  }, [H, Q, U]);
  const xt = () => {
    q.current || D || (V ? E(!1) : (E(!0), F(
      a === "list" && !U ? T && !B ? "support-form" : "home" : a === "support-form" && (!T || B) ? U ? "list" : "home" : a || "home"
    )));
  };
  if (A || !y && !S && !v)
    return null;
  const L = (G) => {
    We(null), ee(G), F("chat");
  }, Ne = async (G) => {
    var ie, ne, fe, ve, He;
    try {
      const K = await ce({ ...G, direct_technician: !1 });
      if (K != null && K.conversation_id && (K != null && K.technician)) {
        const qe = String(K.conversation_id), ke = {
          id: String(K.technician.id),
          type: "user",
          attributes: {
            user_auth_id: Number(K.technician.user_auth_id),
            name: K.technician.name,
            avatar_url: null,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: []
        }, Oe = {
          id: qe,
          type: "conversation",
          attributes: {
            is_group: !1,
            name: K.technician.name || ((ie = K.ticket) == null ? void 0 : ie.subject) || "Soporte SDI",
            closed_at: null,
            unread_count: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: {
            users: [ke]
          }
        };
        We(Oe), ye(Oe), Te.success(`Asistencia iniciada con ${K.technician.name}`, {
          description: `Ticket #${((ne = K.ticket) == null ? void 0 : ne.number) || ((fe = K.ticket) == null ? void 0 : fe.id)}`
        }), F("chat");
      } else
        Ce(K), F("no-technician");
    } catch (K) {
      const qe = ((He = (ve = K == null ? void 0 : K.response) == null ? void 0 : ve.data) == null ? void 0 : He.message) || (K == null ? void 0 : K.message) || "Error al procesar la solicitud de asistencia";
      Te.error(qe);
    }
  }, Se = (G) => {
    var ie, ne;
    if (G != null && G.conversation_id) {
      const fe = String(G.conversation_id), ve = G.technician ? {
        id: String(G.technician.id),
        type: "user",
        attributes: {
          user_auth_id: Number(G.technician.user_auth_id ?? G.technician.id ?? 1),
          name: G.technician.name,
          avatar_url: null,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        relationships: []
      } : void 0, He = {
        id: fe,
        type: "conversation",
        attributes: {
          is_group: !1,
          name: ((ie = G.technician) == null ? void 0 : ie.name) || ((ne = G.ticket) == null ? void 0 : ne.subject) || "Soporte SDI",
          closed_at: null,
          unread_count: 0,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        relationships: {
          users: ve ? [ve] : []
        }
      };
      We(He), ye(He), F("chat");
    } else G != null && G.ticket && (Ce(G), F("no-technician"));
  };
  if (A)
    return null;
  if (!S)
    return /* @__PURE__ */ i(
      "div",
      {
        ref: P,
        style: D && j ? {
          position: "fixed",
          left: `${j.x}px`,
          top: `${j.y}px`,
          bottom: "auto",
          right: "auto",
          zIndex: 50,
          touchAction: "none",
          transition: "none"
        } : void 0,
        className: M(
          "sdi-messenger-root z-50 flex pointer-events-none select-none",
          D ? "fixed cursor-grabbing" : M("fixed duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all", de)
        ),
        children: [
          V && /* @__PURE__ */ e(
            vs,
            {
              className: M(
                "pointer-events-auto h-[590px] max-h-[calc(100vh-120px)] w-[385px] sm:w-[425px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-2xl transition-all duration-300 flex flex-col",
                Z ? "mt-3.5" : "mb-3.5",
                N
              ),
              children: y ? /* @__PURE__ */ e(Bl, { onDragStart: C }) : /* @__PURE__ */ i(Fe, { children: [
                H === "home" && /* @__PURE__ */ e(
                  Il,
                  {
                    title: o,
                    canRequestSupport: T,
                    canViewChatList: U,
                    supportWithBot: B,
                    isStartingBot: pe,
                    totalUnreadCount: mt,
                    conversationsCount: Re.length,
                    onRequestSupport: Ve,
                    onViewChatList: () => F("list"),
                    onClose: () => E(!1),
                    onNewConversation: () => rt(!0),
                    onDragStart: C
                  }
                ),
                H === "support-form" && /* @__PURE__ */ e(
                  Ml,
                  {
                    userId: I,
                    userName: J,
                    canViewChatList: U,
                    totalUnreadCount: mt,
                    isSubmitting: xe,
                    error: ((Pe = (Ae = te == null ? void 0 : te.response) == null ? void 0 : Ae.data) == null ? void 0 : Pe.message) || (te == null ? void 0 : te.message),
                    onHome: () => F("home"),
                    onViewChats: () => F("list"),
                    onClose: () => E(!1),
                    onSubmit: Ne,
                    onNewConversation: () => rt(!0),
                    onDragStart: C
                  }
                ),
                H === "no-technician" && /* @__PURE__ */ e(
                  vl,
                  {
                    message: Le == null ? void 0 : Le.message,
                    ticket: Le == null ? void 0 : Le.ticket,
                    onNewRequest: () => {
                      Ce(null), B ? (F("home"), ue()) : F("support-form");
                    },
                    onViewChats: () => F("list"),
                    onClose: () => E(!1),
                    canViewChatList: U
                  }
                ),
                H === "list" && /* @__PURE__ */ e(
                  Ll,
                  {
                    conversations: Re,
                    selectedId: Ue,
                    searchQuery: R,
                    closedFilter: bt,
                    typeFilter: ut,
                    isLoading: se,
                    onHome: () => F("home"),
                    onClose: () => E(!1),
                    onSelectConversation: L,
                    onSearchChange: be,
                    onClosedFilterChange: st,
                    onTypeFilterChange: it,
                    onNewConversation: () => rt(!0),
                    onDragStart: C
                  }
                ),
                H === "chat" && Q && /* @__PURE__ */ e("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: /* @__PURE__ */ e(
                  gl,
                  {
                    conversation: Q,
                    isContextPanelOpen: !1,
                    alwaysShowBackButton: !0,
                    renderOptions: p,
                    onEscalateSuccess: Se,
                    onCloseSuccess: () => {
                      We(null), De(), F(U ? "list" : "home");
                    },
                    onBack: () => {
                      We(null), De(), F(U ? "list" : "home");
                    }
                  }
                ) })
              ] })
            }
          ),
          /* @__PURE__ */ e(
            _l,
            {
              isOpen: V,
              totalUnreadCount: mt,
              isLeft: X,
              isLoading: y,
              hasError: S,
              onToggleOpen: xt,
              onPointerDown: C
            }
          ),
          /* @__PURE__ */ e(
            yl,
            {
              open: he,
              onOpenChange: rt,
              onSuccess: (G) => {
                We(G), ye(G), F("chat");
              }
            }
          )
        ]
      }
    );
}
function Zl({ onNewConversation: t }) {
  const { hasError: r, error: n, isLoadingUser: a } = at(), s = dt({
    permission: ["messenger_chat.read"]
  }), l = dt({
    permission: ["messenger_chat_support.provide_support"]
  });
  return r ? /* @__PURE__ */ i("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ e("div", { className: "absolute inset-x-0 top-0 h-1 bg-red-500/30" }),
    /* @__PURE__ */ i("div", { className: "flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200", children: [
      /* @__PURE__ */ e("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs", children: /* @__PURE__ */ e(Wr, { className: "size-8" }) }),
      /* @__PURE__ */ e("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400", children: "Servicio no disponible" }),
      /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Error de conexión" }),
      /* @__PURE__ */ e("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: (n == null ? void 0 : n.message) || "No fue posible conectar con el servidor de chat. Las funciones de mensajería están temporalmente deshabilitadas." }),
      /* @__PURE__ */ i(
        ge,
        {
          type: "button",
          variant: "primary",
          className: "mt-6 gap-1.5 cursor-pointer shadow-xs",
          onClick: () => window.location.reload(),
          children: [
            /* @__PURE__ */ e(Fr, { className: "size-4" }),
            "Reintentar conexión"
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ e("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0f1d] shadow-xs", children: /* @__PURE__ */ i("div", { className: "relative z-10 flex max-w-md flex-col items-center px-6 text-center", children: [
    /* @__PURE__ */ e("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs", children: /* @__PURE__ */ e(Ut, { className: "size-8" }) }),
    /* @__PURE__ */ e("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400", children: "Bandeja de conversaciones" }),
    /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Selecciona una conversación" }),
    /* @__PURE__ */ e("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: s ? "Elige una conversación del panel lateral para ver sus mensajes o inicia una nueva cuando estés listo." : "No cuentas con permisos para ver la lista de conversaciones." }),
    t && !a && l && /* @__PURE__ */ i(
      ge,
      {
        type: "button",
        variant: "outline",
        className: "mt-6 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors",
        onClick: t,
        children: [
          /* @__PURE__ */ e(Ut, { className: "size-4" }),
          "Nueva conversación"
        ]
      }
    )
  ] }) });
}
function eo({
  conversation: t,
  onClose: r,
  className: n
}) {
  var h, f, p;
  const { currentUserId: a } = at(), s = Yt(t), l = Et(t, a), o = Number((h = l == null ? void 0 : l.attributes) == null ? void 0 : h.user_auth_id) === 0 || t.type === "bot", d = jt(t, a), u = ((p = (f = t.relationships) == null ? void 0 : f.users) == null ? void 0 : p.length) || 0, m = !!t.attributes.closed_at, c = (x) => {
    if (!x) return "-";
    try {
      return nr(Or(x), "dd/MM/yyyy HH:mm");
    } catch {
      return x;
    }
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: M(
        "sdi-messenger-root flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-3 px-4 bg-white dark:bg-neutral-900", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(rr, { className: "size-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ e("h3", { className: "text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100", children: "Información de Contacto" })
          ] }),
          r && /* @__PURE__ */ e(
            ge,
            {
              variant: "ghost",
              size: "icon",
              onClick: r,
              className: " p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              children: /* @__PURE__ */ e(et, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(Jt, { className: "h-full", children: /* @__PURE__ */ i("div", { className: "space-y-4 p-4", children: [
          /* @__PURE__ */ i("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ e("div", { className: "relative mb-2", children: /* @__PURE__ */ e(
              nt,
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
            /* @__PURE__ */ e("p", { className: "text-xs font-medium text-neutral-500 dark:text-neutral-400", children: s ? `${u} participantes` : o ? "Asistente virtual inteligente" : "Conversación individual" }),
            /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-1.5 mt-2", children: [
              /* @__PURE__ */ e(vt, { variant: o ? "default" : "secondary", className: M("text-[10px]", o && "bg-violet-600 text-white"), children: s ? "Grupo" : o ? "Asistente IA" : "Usuario" }),
              m ? /* @__PURE__ */ i(
                vt,
                {
                  variant: "outline",
                  className: "text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ e(_t, { className: "size-2.5" }),
                    /* @__PURE__ */ e("span", { children: "Cerrada" })
                  ]
                }
              ) : /* @__PURE__ */ i(
                vt,
                {
                  variant: "outline",
                  className: "text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ e(yt, { className: "size-2.5" }),
                    /* @__PURE__ */ e("span", { children: "Activa" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ e(gs, {}),
          /* @__PURE__ */ i("div", { className: "space-y-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(rr, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ e("span", { className: "truncate text-neutral-900 dark:text-neutral-100 font-medium", children: s ? `${u} participantes` : d })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(Oa, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Creada: ",
                c(t.attributes.created_at)
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(zt, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Actualizada: ",
                c(t.attributes.updated_at)
              ] })
            ] }),
            t.attributes.closed_at && /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(_t, { className: "size-3.5 shrink-0 text-amber-500" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Cerrada: ",
                c(t.attributes.closed_at)
              ] })
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
}
const Fl = ({ conversationId: t, enabled: r = !0 } = {}) => {
  var s, l;
  const a = Qr({
    queryKey: ["conversation", t],
    queryFn: () => Gs(t),
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
}, to = (t, r) => {
  const n = typeof t == "object" && t !== null ? t : { conversationId: t, ...r }, {
    conversationId: a,
    enabled: s = !0,
    showToastOnUnread: l = !1,
    onMessage: o,
    onUnread: d
  } = n, { config: u, currentUser: m, currentUserId: c } = at(), h = dt({
    permission: ["messenger_chat.read"]
  }), f = a != null ? String(a) : void 0, p = a != null ? Number(a) : void 0, x = s && !!f && h, {
    data: w,
    isLoading: g,
    isError: v,
    errors: b,
    refetch: y
  } = Fl({
    conversationId: f,
    enabled: x
  }), S = Y(
    (z) => {
      if (c && String(z.attributes.sender_id) !== String(c)) {
        const J = typeof document < "u" && document.hasFocus() && !document.hidden;
        cr(J ? "focused" : "unfocused");
      }
      y(), o == null || o(z);
    },
    [c, o, y]
  ), $ = Y(
    (z) => {
      l && String(z.conversation_id) !== f && Te.info("Nuevo mensaje", {
        id: `conversation-message-${z.message.id}`,
        description: z.message.body || "Tienes un mensaje nuevo"
      }), String(z.conversation_id) === f && y(), d == null || d(z);
    },
    [f, d, y, l]
  );
  return re(() => {
    if (!(!p || !x))
      return Fn(
        u.reverb,
        p,
        S
      );
  }, [u.reverb, p, S, x]), re(() => {
    if (!(!c || !x))
      return $n(
        u.reverb,
        c,
        $
      );
  }, [u.reverb, c, $, x]), re(() => {
    if (typeof window > "u") return;
    const z = () => {
      y();
    };
    return window.addEventListener("messenger:conversation-closed", z), window.addEventListener("messenger:conversation-updated", z), () => {
      window.removeEventListener("messenger:conversation-closed", z), window.removeEventListener("messenger:conversation-updated", z);
    };
  }, [y]), {
    conversation: w ?? null,
    isLoading: g,
    isError: v,
    errors: b,
    refetch: y,
    hasReadPermission: h,
    currentUser: m,
    currentUserId: c
  };
};
function ro({
  enabled: t = !0,
  isMuted: r = !1,
  fftSize: n = 64,
  levelUpdateInterval: a = 50
} = {}) {
  const [s, l] = k(null), [o, d] = k(0), [u, m] = k(!1), [c, h] = k(null), [f, p] = k(null), x = W(null), w = W(null), g = W(null), v = W(null), b = W(null), y = W(0), S = Y(() => {
    if (b.current && (clearInterval(b.current), b.current = null), v.current) {
      try {
        v.current.disconnect();
      } catch {
      }
      v.current = null;
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
    g.current = null, l(null), m(!1), d(0), y.current = 0;
  }, []), $ = Y(async () => {
    var z;
    if (!(typeof window > "u") && !(x.current && x.current.active && g.current)) {
      if (!((z = navigator.mediaDevices) != null && z.getUserMedia)) {
        p("La API de micrófono no está disponible en este navegador o entorno"), h(!1);
        return;
      }
      try {
        const I = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: !0,
            noiseSuppression: !0,
            autoGainControl: !0
          }
        });
        x.current = I;
        const J = window.AudioContext || window.webkitAudioContext, U = new J();
        w.current = U, U.state === "suspended" && await U.resume();
        const T = U.createMediaStreamSource(I);
        v.current = T;
        const B = U.createAnalyser();
        B.fftSize = n, B.smoothingTimeConstant = 0.65, g.current = B, T.connect(B), I.getAudioTracks().forEach((P) => {
          P.enabled = !r;
        }), l(B), m(!0), h(!0), p(null);
        const A = new Uint8Array(B.frequencyBinCount);
        b.current && clearInterval(b.current), b.current = setInterval(() => {
          if (!g.current || r) {
            y.current = 0, d(0);
            return;
          }
          g.current.getByteFrequencyData(A);
          let P = 0;
          for (let q = 0; q < A.length; q++)
            P += A[q];
          const D = P / (A.length || 1), j = Math.min(1, Math.max(0, D / 128));
          y.current = y.current * 0.7 + j * 0.3, d(Number(y.current.toFixed(3)));
        }, a);
      } catch (I) {
        const U = (I == null ? void 0 : I.name) === "NotAllowedError" || (I == null ? void 0 : I.name) === "PermissionDeniedError" ? "El acceso al micrófono fue denegado en el navegador. Por favor habilita los permisos para continuar." : I instanceof Error ? I.message : "Error al acceder al micrófono";
        p(U), h(!1), S();
      }
    }
  }, [n, r, a, S]);
  return re(() => {
    var z;
    if (!(typeof window > "u" || !((z = navigator.permissions) != null && z.query)))
      try {
        navigator.permissions.query({ name: "microphone" }).then((I) => {
          I.state === "denied" ? (h(!1), p("El acceso al micrófono fue denegado en el navegador")) : I.state === "granted" && h(!0), I.onchange = () => {
            I.state === "denied" ? (h(!1), p("El acceso al micrófono fue denegado en el navegador")) : I.state === "granted" && (h(!0), p(null));
          };
        }).catch(() => {
        });
      } catch {
      }
  }, []), re(() => {
    x.current && x.current.getAudioTracks().forEach((z) => {
      z.enabled = !r;
    }), r && (y.current = 0, d(0));
  }, [r]), re(() => (t ? $() : S(), () => {
    S();
  }), [t, $, S]), {
    analyserNode: s,
    audioLevel: o,
    isRecording: u,
    hasPermission: c,
    error: f,
    start: $,
    stop: S
  };
}
export {
  Xs as ActiveConversationProvider,
  dl as BotActionButtons,
  cl as BotWikiCard,
  Xl as ChatProvider,
  al as ConversationChatHeader,
  gl as ConversationChatPanel,
  eo as ConversationContextPanel,
  Zl as ConversationEmptyState,
  jl as ConversationsSidebarList,
  pl as EscalateSupportDialog,
  Ql as FloatingChat,
  On as LIB_VERSION,
  dr as MessageRichText,
  yl as NewConversationDialog,
  Tl as RequestSupportForm,
  xl as ResolveSupportDialog,
  ks as VoiceAudioEngine,
  As as VoiceAudioVisualizerCard,
  Cs as VoiceCallClient,
  Ts as VoiceCallConnecting,
  Is as VoiceCallControls,
  Pn as VoiceCallDialog,
  Fs as VoiceCallEndedSummary,
  zs as VoiceCallHeader,
  $s as VoiceMinimizedIsland,
  Es as VoiceTranscriptList,
  _s as VoiceWaveformCanvas,
  Dt as activeConversationStore,
  ws as buildVoiceWebSocketUrl,
  Rs as chatBotQueueStatusService,
  js as chatBotQueueToTicketService,
  Rn as closeConversationService,
  Ds as escalateChatSupportService,
  Ls as getAllConversationSessions,
  Ht as getConversationSessionId,
  Bs as getStoredConversationSession,
  rl as hasMessengerPermission,
  cr as playNotificationSound,
  wt as removeConversationSessionId,
  Ms as requestChatSupportService,
  Ps as resolveChatSupportService,
  Yr as sanitizeUrl,
  Mt as saveConversationSessionId,
  Ri as sendBotMessageStream,
  Pi as sendBotMessageSync,
  Ys as useActiveConversation,
  Hs as useActiveVoiceCall,
  el as useChatBotQueuePolling,
  tl as useChatBotQueueToTicket,
  at as useChatContext,
  dt as useCheckHasPermissionMessenger,
  Wi as useCloseConversation,
  Qi as useConversationChat,
  kl as useConversationsPage,
  Zi as useEscalateChatSupport,
  Kr as useOptionalChatContext,
  Yl as useRequiredActiveConversation,
  Mn as useResolveChatSupport,
  to as useShowConversation,
  Ss as useVoiceCall,
  ro as useVoiceMicrophone,
  Wt as voiceCallStore
};
//# sourceMappingURL=index.js.map
