"use client";
var tn = Object.defineProperty;
var rn = (t, r, n) => r in t ? tn(t, r, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[r] = n;
var Ne = (t, r, n) => rn(t, typeof r != "symbol" ? r + "" : r, n);
import { jsx as e, jsxs as i, Fragment as Ce } from "react/jsx-runtime";
import nn, { createContext as mt, useMemo as ze, useState as k, useEffect as Q, useContext as ht, useSyncExternalStore as an, forwardRef as jt, useRef as q, useCallback as Y, useLayoutEffect as sn } from "react";
import ln from "axios";
import { twMerge as on } from "tailwind-merge";
import { Bot as Qt, Users as Lt, X as qe, CheckCircle2 as rt, Loader2 as Pe, Lock as nt, ArrowLeft as Jt, Sparkles as Zt, Phone as cn, Info as dn, ExternalLink as un, Check as er, Copy as mn, FileText as hn, Download as fn, Clock as at, CheckCheck as pn, ChevronsDown as Kt, Paperclip as vr, Bold as bn, Italic as xn, Underline as gn, Strikethrough as vn, List as wn, ListOrdered as yn, Code as Nn, Link2 as kn, EyeOff as Cn, Eye as Sn, Type as zn, SendHorizontal as Ft, ArrowRight as _n, Headset as An, AlertCircle as tr, Star as En, Ticket as rr, MapPin as Pn, MicOff as nr, Mic as ar, BookOpen as Tn, Camera as Dn, Monitor as Mn, Send as In, Minimize2 as Rn, PhoneOff as sr, ShieldCheck as Bt, Maximize2 as jn, UploadCloud as Ln, RotateCcw as Fn, MessagesSquare as ir, MessageSquarePlus as wt, User as At, Search as Tr, AlertTriangle as lr, MessageCircleMore as Bn, WifiOff as $n, LifeBuoy as Xt, ChevronRight as wr, Tag as Wn, MessageSquare as Un, RefreshCw as Dr, Inbox as Hn, CalendarDays as Vn } from "lucide-react";
import { createPortal as or } from "react-dom";
import { toast as fe } from "sonner";
import { parseISO as cr, isValid as qn, isToday as On, isYesterday as Gn, isThisWeek as Kn, format as Et } from "date-fns";
import Xn from "pusher-js";
typeof globalThis < "u" && typeof globalThis.self > "u" && (globalThis.self = globalThis);
let dt = null;
const Yn = (t) => {
  dt = t;
}, Qn = (t) => Object.entries(t).reduce((r, [n, a]) => (r[n] = typeof a == "boolean" ? Number(a) : a, r), {}), Fe = (t, r) => {
  if (!dt)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  return `${dt.apiBaseUrl.replace(/\/+$/, "")}/${t}/api/${r}`;
}, _e = async ({
  data: t,
  url: r,
  params: n,
  method: a,
  headers: s,
  ...l
}) => {
  if (!dt)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const o = {
    ...l,
    url: r,
    method: a,
    data: t,
    params: n ? Qn(n) : void 0,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...dt.authToken ? { Authorization: `Bearer ${dt.authToken}` } : {},
      ...s
    }
  };
  return ln.request(o);
}, Jn = (t) => _e({
  url: `${Fe("messenger", "v1")}/users`,
  method: "GET",
  params: t
}), Zn = (t) => _e({
  url: `${Fe("messenger", "v1")}/users/${t}/user`,
  method: "GET"
}), ea = ({
  applicationId: t,
  userId: r
}) => _e({
  url: `${Fe("auth", "v1")}/users/${r}/permissions`,
  method: "GET",
  params: {
    application_id: t
  }
}), ta = () => _e({
  url: `${Fe("auth", "v1")}/me`,
  method: "GET"
}), dr = mt(null);
function ra(t) {
  var n, a, s, l;
  const r = [];
  return (n = t.apiBaseUrl) != null && n.trim() || r.push("apiBaseUrl"), (t.applicationId === void 0 || t.applicationId === null) && r.push("applicationId"), t.reverb ? ((a = t.reverb.key) != null && a.trim() || r.push("reverb.key"), (s = t.reverb.host) != null && s.trim() || r.push("reverb.host"), (!Number.isFinite(t.reverb.port) || t.reverb.port <= 0) && r.push("reverb.port"), (l = t.reverb.wsPath) != null && l.trim() || r.push("reverb.wsPath"), t.reverb.scheme !== "http" && t.reverb.scheme !== "https" && r.push("reverb.scheme")) : r.push("reverb"), r.length > 0 ? new Error(`Configuración incompleta del chat: ${r.join(", ")}`) : null;
}
function Wi({ config: t, children: r }) {
  const { authToken: n, apiBaseUrl: a, applicationId: s, reverb: l } = t, o = ze(
    () => ra(t),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      a,
      s,
      l == null ? void 0 : l.key,
      l == null ? void 0 : l.host,
      l == null ? void 0 : l.port,
      l == null ? void 0 : l.wsPath,
      l == null ? void 0 : l.scheme
    ]
  ), [d, u] = k(null), [c, h] = k([]), [f, p] = k(null), [m, b] = k(null), [v, g] = k(null), w = JSON.stringify([a, s, n]);
  Q(() => {
    o && console.error(`[Chat] ${o.message}`);
  }, [o]), Q(() => {
    let R = !0;
    return o || !n ? () => {
      R = !1;
    } : (Yn({
      apiBaseUrl: a,
      authToken: n
    }), (async () => {
      var _;
      try {
        const T = await ta(), P = (await Zn(T.data.data.id)).data.data;
        if (!(P != null && P.id))
          throw new Error("La respuesta no contiene un usuario válido para el chat");
        const U = ((_ = (await ea({
          userId: P.attributes.user_auth_id,
          applicationId: s
        })).data.data) == null ? void 0 : _.map((me) => me.attributes.name)) ?? [];
        R && (u(P), h(U), p(w), b(null), g(null));
      } catch (T) {
        R && (console.error("Error al cargar el usuario en ChatProvider:", T), b(T instanceof Error ? T : new Error("Error al inicializar el chat")), g(w));
      }
    })(), () => {
      R = !1;
    });
  }, [o, n, a, s, w]);
  const x = (R) => {
    u(R);
  }, C = ze(() => d != null && d.id ? String(d.id) : "", [d]), z = !!(d != null && d.id) && f === w, L = v === w && m !== null, X = {
    currentUser: d,
    currentUserId: C,
    permissions: c,
    isLoadingUser: !o && !!n && !z && !L,
    hasError: !!o || L,
    error: o ?? (L ? m : null),
    config: t,
    setCurrentUser: x
  };
  return /* @__PURE__ */ e(dr.Provider, { value: X, children: r });
}
function Mr() {
  return ht(dr);
}
function Ge() {
  const t = ht(dr);
  if (!t)
    throw new Error("useChatContext debe usarse dentro de un ChatProvider");
  return t;
}
const Yt = "sdi_messenger_conversation_sessions";
function ur() {
  if (typeof window > "u" || !window.localStorage)
    return {};
  try {
    const t = window.localStorage.getItem(Yt);
    if (!t) return {};
    const r = JSON.parse(t);
    return r && typeof r == "object" ? r : {};
  } catch {
    return {};
  }
}
function Ir(t) {
  if (!(typeof window > "u" || !window.localStorage))
    try {
      Object.keys(t).length === 0 ? window.localStorage.removeItem(Yt) : window.localStorage.setItem(Yt, JSON.stringify(t));
    } catch {
    }
}
function mr(t, r) {
  const n = String(t).trim(), a = String(r).trim();
  if (!n || !a) return;
  const s = ur();
  s[n] !== a && (s[n] = a, Ir(s));
}
function Rr(t) {
  const r = String(t).trim();
  return r ? ur()[r] ?? null : null;
}
function yt(t) {
  const r = String(t).trim();
  if (!r) return;
  const n = ur();
  r in n && (delete n[r], Ir(n));
}
const na = (t) => _e({
  url: `${Fe("messenger", "v1")}/conversations`,
  method: "GET",
  params: t
}), aa = (t) => _e({
  url: `${Fe("messenger", "v1")}/conversations`,
  method: "POST",
  data: t
}), sa = (t) => _e({
  url: `${Fe("messenger", "v1")}/conversations/${t}`,
  method: "GET"
}), ia = ({
  conversationId: t,
  read_until: r,
  user_id: n
}) => _e({
  url: `${Fe("messenger", "v1")}/conversations/${t}/read`,
  method: "POST",
  data: { read_until: r, user_id: n }
}), la = ({
  conversationId: t,
  user_id: r,
  is_typing: n
}) => _e({
  url: `${Fe("messenger", "v1")}/conversations/${t}/typing`,
  method: "POST",
  data: { user_id: r, is_typing: n }
}), jr = async (t) => {
  const r = await _e({
    url: `${Fe("messenger", "v1")}/conversations/${t}/close`,
    method: "POST"
  });
  return yt(t), r;
}, Lr = mt(null);
let bt = null;
const Vt = /* @__PURE__ */ new Set(), ut = {
  get: () => bt,
  set: (t) => {
    (bt == null ? void 0 : bt.id) !== (t == null ? void 0 : t.id) && (bt = t, Vt.forEach((r) => r(t)));
  },
  subscribe: (t) => (Vt.add(t), () => {
    Vt.delete(t);
  })
};
function oa({
  value: t,
  children: r
}) {
  return /* @__PURE__ */ e(Lr.Provider, { value: t, children: r });
}
function ca() {
  var n;
  const t = ht(Lr), r = an(
    ut.subscribe,
    ut.get,
    () => null
  );
  return t || (r ? {
    conversation: r,
    isClosed: !!((n = r.attributes) != null && n.closed_at),
    isClosing: !1,
    handleCloseConversation: async () => {
      await jr(r.id), typeof window < "u" && window.dispatchEvent(
        new CustomEvent("messenger:conversation-closed", {
          detail: { conversationId: r.id }
        })
      );
    }
  } : null);
}
function Ui() {
  const t = ca();
  if (!t)
    throw new Error("useRequiredActiveConversation debe utilizarse cuando haya una conversación activa");
  return t;
}
function B(...t) {
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
  return t.forEach(n), on(r.join(" "));
}
const le = jt(
  ({ className: t, variant: r = "default", size: n = "default", type: a = "button", disabled: s, children: l, ...o }, d) => {
    const u = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer", c = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-xs",
      primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-xs",
      outline: "border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300",
      secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
    }, h = {
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
        className: B(u, c[r], h[n], t),
        ...o,
        children: l
      }
    );
  }
);
le.displayName = "ChatButton";
const hr = jt(
  ({ className: t, type: r = "text", disabled: n, ...a }, s) => /* @__PURE__ */ e(
    "input",
    {
      ref: s,
      type: r,
      disabled: n,
      className: B(
        "flex h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        t
      ),
      ...a
    }
  )
);
hr.displayName = "ChatInput";
const $t = jt(
  ({ className: t, disabled: r, ...n }, a) => /* @__PURE__ */ e(
    "textarea",
    {
      ref: a,
      disabled: r,
      className: B(
        "flex min-h-15 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        t
      ),
      ...n
    }
  )
);
$t.displayName = "ChatTextarea";
function Ze({ className: t, variant: r = "default", children: n, ...a }) {
  return /* @__PURE__ */ e("span", { className: B("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
  }[r], t), ...a, children: n });
}
function da(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].substring(0, 2).toUpperCase() : (r[0][0] + r[r.length - 1][0]).toUpperCase();
}
const yr = [
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
function ua(t) {
  if (!t) return "#62748e";
  let r = 0;
  for (let n = 0; n < (t || "").length; n++)
    r = (r << 5) - r + (t || "").charCodeAt(n), r |= 0;
  return yr[Math.abs(r) % yr.length];
}
function Oe({
  src: t,
  name: r = "",
  size: n = "md",
  isGroup: a = !1,
  isBot: s = !1,
  status: l,
  className: o,
  ...d
}) {
  const [u, c] = k(!1), h = {
    xs: { box: "size-6", text: "text-[10px]", icon: "size-3.5", statusDot: "size-1.5" },
    sm: { box: "size-8", text: "text-xs", icon: "size-4", statusDot: "size-2" },
    md: { box: "size-10", text: "text-sm", icon: "size-5", statusDot: "size-2.5" },
    lg: { box: "size-12", text: "text-base", icon: "size-6", statusDot: "size-3" },
    xl: { box: "size-16", text: "text-xl", icon: "size-8", statusDot: "size-3.5" }
  }, { box: f, text: p, icon: m, statusDot: b } = h[n], v = da(r), g = ze(() => ua(r), [r]), w = !!t && !u;
  return /* @__PURE__ */ i("div", { className: B("relative inline-block shrink-0", f, o), ...d, children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: B(
          "flex size-full items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          s && !w ? "bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-600 text-white shadow-violet-500/25 ring-1 ring-violet-400/30" : !w && (a ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "font-semibold text-xs")
        ),
        style: !w && !a && !s ? {
          backgroundColor: `${g}33`,
          color: `${g}FF`,
          fontWeight: "bold"
        } : void 0,
        children: w ? /* @__PURE__ */ e(
          "img",
          {
            src: t,
            alt: r || "Avatar",
            onError: () => c(!0),
            className: "size-full object-cover",
            loading: "lazy"
          }
        ) : s ? /* @__PURE__ */ e(Qt, { className: m }) : a ? /* @__PURE__ */ e(Lt, { className: m }) : /* @__PURE__ */ e("span", { className: B("font-bold tracking-tight", p), children: v })
      }
    ),
    l && /* @__PURE__ */ e(
      "span",
      {
        className: B(
          "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-900",
          b,
          l === "online" && "bg-emerald-500",
          l === "offline" && "bg-neutral-400",
          l === "busy" && "bg-amber-500"
        )
      }
    )
  ] });
}
const Fr = mt(null);
function ma() {
  const t = ht(Fr);
  if (!t)
    throw new Error("Los subcomponentes de Dialog deben usarse dentro de <Dialog>");
  return t;
}
function Wt({ open: t, onOpenChange: r, children: n }) {
  return Q(() => {
    if (!t) return;
    const a = (l) => {
      l.key === "Escape" && r(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", a), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", a);
    };
  }, [t, r]), /* @__PURE__ */ e(Fr.Provider, { value: { open: t, onOpenChange: r }, children: n });
}
function Ut({ className: t, children: r, showClose: n = !0, ...a }) {
  const { open: s, onOpenChange: l } = ma(), o = q(null);
  return !s || typeof window > "u" ? null : or(
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
            className: B(
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
                  children: /* @__PURE__ */ e(qe, { className: "size-4" })
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
function Pt({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: B("flex flex-col gap-1.5 text-left p-5 pb-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", t), ...r });
}
function Tt({ className: t, ...r }) {
  return /* @__PURE__ */ e("h3", { className: B("text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100", t), ...r });
}
function Dt({ className: t, ...r }) {
  return /* @__PURE__ */ e("p", { className: B("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", t), ...r });
}
function Mt({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: B("flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", t), ...r });
}
const Br = mt(null);
function $r() {
  const t = ht(Br);
  if (!t)
    throw new Error("Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>");
  return t;
}
function ha({ open: t, onOpenChange: r, children: n }) {
  return Q(() => {
    if (!t) return;
    const a = (l) => {
      l.key === "Escape" && r(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", a), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", a);
    };
  }, [t, r]), /* @__PURE__ */ e(Br.Provider, { value: { open: t, onOpenChange: r }, children: n });
}
function fa({ className: t, children: r, ...n }) {
  const { open: a, onOpenChange: s } = $r(), l = q(null);
  return !a || typeof window > "u" ? null : or(
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
            className: B(
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
function pa({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: B("flex flex-col gap-2 text-left", t), ...r });
}
function ba({ className: t, ...r }) {
  return /* @__PURE__ */ e("h3", { className: B("text-sm font-bold text-neutral-900 dark:text-neutral-100", t), ...r });
}
function xa({ className: t, ...r }) {
  return /* @__PURE__ */ e("p", { className: B("text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", t), ...r });
}
function ga({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: B("flex items-center justify-end gap-2 mt-4", t), ...r });
}
function va({
  className: t,
  onClick: r,
  children: n,
  ...a
}) {
  const { onOpenChange: s } = $r();
  return /* @__PURE__ */ e(
    le,
    {
      variant: "outline",
      size: "sm",
      onClick: (l) => {
        s(!1), r == null || r(l);
      },
      className: B("text-xs", t),
      ...a,
      children: n || "Cancelar"
    }
  );
}
function wa({
  className: t,
  variant: r = "danger",
  size: n = "sm",
  ...a
}) {
  return /* @__PURE__ */ e(le, { variant: r, size: n, className: B("text-xs font-semibold", t), ...a });
}
mt(null);
const Wr = mt(null);
function ya() {
  const t = ht(Wr);
  if (!t)
    throw new Error("Los subcomponentes de Tabs deben usarse dentro de <Tabs>");
  return t;
}
function Ur({
  value: t,
  defaultValue: r = "",
  onValueChange: n,
  className: a,
  children: s,
  ...l
}) {
  const [o, d] = k(r), u = t !== void 0, c = u ? t : o, h = u ? n : d;
  return /* @__PURE__ */ e(Wr.Provider, { value: { value: c, onValueChange: h }, children: /* @__PURE__ */ e("div", { className: B("flex flex-col gap-2 w-full", a), ...l, children: s }) });
}
function Hr({ className: t, children: r, ...n }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: B(
        "flex w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 text-neutral-500 dark:text-neutral-400 gap-1",
        t
      ),
      ...n,
      children: r
    }
  );
}
function It({ value: t, className: r, children: n, ...a }) {
  const { value: s, onValueChange: l } = ya(), o = s === t;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": o,
      onClick: () => l(t),
      className: B(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none cursor-pointer",
        o ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5",
        r
      ),
      ...a,
      children: n
    }
  );
}
const kt = jt(
  ({ className: t, children: r, ...n }, a) => /* @__PURE__ */ e(
    "div",
    {
      ref: a,
      className: B(
        "relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]",
        t
      ),
      ...n,
      children: r
    }
  )
);
kt.displayName = "ChatScrollArea";
function Na({
  orientation: t = "horizontal",
  className: r,
  ...n
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      role: "separator",
      "aria-orientation": t,
      className: B(
        "shrink-0 bg-neutral-200 dark:bg-neutral-800",
        t === "horizontal" ? "h-px w-full" : "h-full w-px",
        r
      ),
      ...n
    }
  );
}
function ka({ className: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: B(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100",
        t
      ),
      ...r
    }
  );
}
function re({ className: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: B(
        "animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80",
        t
      ),
      ...r
    }
  );
}
const Nt = (t) => t ? t.toLowerCase().split(" ").filter(Boolean).map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ") : "", Ct = (t) => !!t.attributes.is_group, ft = (t, r) => {
  var s;
  const n = ((s = t.relationships) == null ? void 0 : s.users) || [];
  if (!r)
    return n[0];
  const a = String(r);
  return n.find((l) => String(l.id) !== a) || n[0];
}, pt = (t, r) => {
  var s;
  if (Ct(t))
    return t.attributes.name || "Grupo";
  const n = ft(t, r), a = ((s = n == null ? void 0 : n.attributes) == null ? void 0 : s.name) || t.attributes.name || "Usuario";
  return Nt(a);
}, fr = (t) => t != null && t.attributes ? Number(t.attributes.user_auth_id) === 0 : !1, Vr = (t, r) => {
  var a;
  if ((a = t.attributes) != null && a.is_group) return !1;
  const n = ft(t, r);
  return fr(n);
};
function qt(t) {
  return (r = {}) => {
    const n = r.width ? String(r.width) : t.defaultWidth;
    return t.formats[n] || t.formats[t.defaultWidth];
  };
}
function xt(t) {
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
function gt(t) {
  return (r, n = {}) => {
    const a = n.width, s = a && t.matchPatterns[a] || t.matchPatterns[t.defaultMatchWidth], l = r.match(s);
    if (!l)
      return null;
    const o = l[0], d = a && t.parsePatterns[a] || t.parsePatterns[t.defaultParseWidth], u = Array.isArray(d) ? Sa(d, (f) => f.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      Ca(d, (f) => f.test(o))
    );
    let c;
    c = t.valueCallback ? t.valueCallback(u) : u, c = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(c)
    ) : c;
    const h = r.slice(o.length);
    return { value: c, rest: h };
  };
}
function Ca(t, r) {
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && r(t[n]))
      return n;
}
function Sa(t, r) {
  for (let n = 0; n < t.length; n++)
    if (r(t[n]))
      return n;
}
function za(t) {
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
const _a = {
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
}, Aa = (t, r, n) => {
  let a;
  const s = _a[t];
  return typeof s == "string" ? a = s : r === 1 ? a = s.one : a = s.other.replace("{{count}}", r.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "en " + a : "hace " + a : a;
}, Ea = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, Pa = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Ta = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Da = {
  date: qt({
    formats: Ea,
    defaultWidth: "full"
  }),
  time: qt({
    formats: Pa,
    defaultWidth: "full"
  }),
  dateTime: qt({
    formats: Ta,
    defaultWidth: "full"
  })
}, Ma = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Ia = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, Ra = (t, r, n, a) => r.getHours() !== 1 ? Ia[t] : Ma[t], ja = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, La = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, Fa = {
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
}, Ba = {
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
}, $a = {
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
}, Wa = {
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
}, Ua = (t, r) => Number(t) + "º", Ha = {
  ordinalNumber: Ua,
  era: xt({
    values: ja,
    defaultWidth: "wide"
  }),
  quarter: xt({
    values: La,
    defaultWidth: "wide",
    argumentCallback: (t) => Number(t) - 1
  }),
  month: xt({
    values: Fa,
    defaultWidth: "wide"
  }),
  day: xt({
    values: Ba,
    defaultWidth: "wide"
  }),
  dayPeriod: xt({
    values: $a,
    defaultWidth: "wide",
    formattingValues: Wa,
    defaultFormattingWidth: "wide"
  })
}, Va = /^(\d+)(º)?/i, qa = /\d+/i, Oa = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, Ga = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, Ka = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Xa = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ya = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, Qa = {
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
}, Ja = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, Za = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, es = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, ts = {
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
}, rs = {
  ordinalNumber: za({
    matchPattern: Va,
    parsePattern: qa,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: gt({
    matchPatterns: Oa,
    defaultMatchWidth: "wide",
    parsePatterns: Ga,
    defaultParseWidth: "any"
  }),
  quarter: gt({
    matchPatterns: Ka,
    defaultMatchWidth: "wide",
    parsePatterns: Xa,
    defaultParseWidth: "any",
    valueCallback: (t) => t + 1
  }),
  month: gt({
    matchPatterns: Ya,
    defaultMatchWidth: "wide",
    parsePatterns: Qa,
    defaultParseWidth: "any"
  }),
  day: gt({
    matchPatterns: Ja,
    defaultMatchWidth: "wide",
    parsePatterns: Za,
    defaultParseWidth: "any"
  }),
  dayPeriod: gt({
    matchPatterns: es,
    defaultMatchWidth: "any",
    parsePatterns: ts,
    defaultParseWidth: "any"
  })
}, Nr = {
  code: "es",
  formatDistance: Aa,
  formatLong: Da,
  formatRelative: Ra,
  localize: Ha,
  match: rs,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, ns = ({
  conversationId: t,
  sender: r,
  body: n,
  file: a
}) => {
  const s = `optimistic-${Date.now()}`, l = (/* @__PURE__ */ new Date()).toISOString(), o = Number(r.id), d = r.attributes || {}, u = d.name || d.username || "Usuario", c = d.avatar_url ?? d.avatar ?? null, h = {
    id: String(r.id),
    type: "user",
    attributes: {
      user_auth_id: d.user_auth_id ?? r.id,
      name: u,
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
      sender: h,
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
function as(t) {
  return t.slice(0, 10);
}
function kr(t, r) {
  if (r.attributes.sender_id == null) return t;
  const n = as(r.attributes.created_at || ""), a = t[0];
  return a && a.date === n ? a.messages.some((s) => s.id === r.id) ? t : [{ ...a, messages: [r, ...a.messages] }, ...t.slice(1)] : [{ date: n, messages: [r] }, ...t];
}
function ss(t, r) {
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
function Ot(t) {
  if (!t) return "Hoy";
  const r = t.trim().toLowerCase();
  if (r === "hoy" || r === "today") return "Hoy";
  if (r === "ayer" || r === "yesterday") return "Ayer";
  const n = cr(t);
  return qn(n) ? On(n) ? "Hoy" : Gn(n) ? "Ayer" : Kn(n, { weekStartsOn: 1 }) ? Et(n, "EEEE", { locale: Nr }) : Et(n, "d 'de' MMMM 'de' yyyy", { locale: Nr }) : t;
}
const Gt = async ({
  conversation: t,
  ...r
}) => await _e({
  url: `${Fe("messenger", "v1")}/conversations/${t}/messages`,
  method: "GET",
  params: r
}), is = (t, r) => _e({
  url: `${Fe("messenger", "v1")}/conversations/${t}/messages`,
  method: "POST",
  data: r
}), ls = (t, r) => {
  const n = new FormData();
  return n.append("file", r.file), n.append("sender_id", r.sender_id.toString()), r.caption && n.append("caption", r.caption), _e({
    url: `${Fe("messenger", "v1")}/conversations/${t}/file`,
    method: "POST",
    data: n,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
function os(t, r) {
  var o, d, u, c;
  if (!t) return;
  const n = ((o = t.data) == null ? void 0 : o.data) ?? [];
  if (!Array.isArray(n) || n.length === 0 || n.reduce(
    (h, f) => h + (Array.isArray(f == null ? void 0 : f.messages) ? f.messages.length : 0),
    0
  ) === 0)
    return;
  const s = (d = t.data) == null ? void 0 : d.meta;
  if ((s == null ? void 0 : s.has_more) === !1)
    return;
  let l = s == null ? void 0 : s.next_cursor;
  if (!l) {
    const h = (c = (u = t.data) == null ? void 0 : u.links) == null ? void 0 : c.next;
    if (h)
      try {
        const f = new URL(h, "http://localhost");
        l = f.searchParams.get("page[cursor]") || f.searchParams.get("cursor") || void 0;
      } catch {
      }
  }
  if (!(!l || l === "null" || l === "undefined" || l.trim() === "") && !r.includes(l))
    return l;
}
const cs = ({ params: t, enabled: r = !0 }) => {
  var R, E;
  const n = r && !!(t != null && t.conversation), [a, s] = k([]), [l, o] = k([]), [d, u] = k(n), [c, h] = k(n), [f, p] = k(!1), [m, b] = k({}), v = q(t);
  v.current = t;
  const g = q(!1), w = t == null ? void 0 : t.conversation, x = a[a.length - 1], C = os(x, l), z = !!C, L = Y(async () => {
    var _, T, I;
    if ((_ = v.current) != null && _.conversation) {
      u(!0), h(!0), g.current = !0, b({});
      try {
        const P = await Gt({
          ...v.current,
          page: {
            ...(T = v.current) == null ? void 0 : T.page
          }
        });
        s([P]), o([]);
      } catch (P) {
        b(((I = P == null ? void 0 : P.response) == null ? void 0 : I.data) ?? (P == null ? void 0 : P.data) ?? {});
      } finally {
        u(!1), h(!1), g.current = !1;
      }
    }
  }, []), S = Y(async () => {
    var _, T, I;
    if (!(!z || !C || g.current || !((_ = v.current) != null && _.conversation))) {
      p(!0), h(!0), g.current = !0;
      try {
        const P = await Gt({
          ...v.current,
          cursor: C,
          page: {
            ...(T = v.current) == null ? void 0 : T.page,
            cursor: C
          }
        });
        s((F) => [...F, P]), o((F) => [...F, C]);
      } catch (P) {
        b(((I = P == null ? void 0 : P.response) == null ? void 0 : I.data) ?? (P == null ? void 0 : P.data) ?? {});
      } finally {
        p(!1), h(!1), g.current = !1;
      }
    }
  }, [z, C]), M = Y((_) => {
    s((T) => {
      var U;
      if (!T || T.length === 0)
        return [
          {
            data: {
              data: kr([], _)
            }
          }
        ];
      const I = T[0], P = ((U = I.data) == null ? void 0 : U.data) ?? [], F = kr(P, _);
      return [
        {
          ...I,
          data: {
            ...I.data,
            data: F
          }
        },
        ...T.slice(1)
      ];
    });
  }, []);
  return Q(() => {
    if (!n || !w) {
      s([]), o([]), u(!1), h(!1);
      return;
    }
    let _ = !0;
    return (async () => {
      var I;
      u(!0), h(!0), g.current = !0, b({});
      try {
        const P = await Gt({
          ...t,
          page: {
            ...t == null ? void 0 : t.page
          }
        });
        _ && (s([P]), o([]));
      } catch (P) {
        _ && b(((I = P == null ? void 0 : P.response) == null ? void 0 : I.data) ?? (P == null ? void 0 : P.data) ?? {});
      } finally {
        _ && (u(!1), h(!1), g.current = !1);
      }
    })(), () => {
      _ = !1;
    };
  }, [w, n]), {
    data: ze(() => !a || a.length === 0 ? [] : a.reduce((_, T) => {
      var P;
      const I = ((P = T == null ? void 0 : T.data) == null ? void 0 : P.data) ?? [];
      return ss(_, I);
    }, []), [a]),
    rawPages: a,
    isLoading: d,
    isPending: d,
    isFetching: c,
    isFetchingNextPage: f,
    hasNextPage: z,
    fetchNextPage: S,
    errors: m,
    refetch: L,
    prependIncomingMessage: M,
    meta: (E = (R = a[0]) == null ? void 0 : R.data) == null ? void 0 : E.meta
  };
};
function Qe(t, r) {
  const [n, a] = k(void 0), [s, l] = k(null), [o, d] = k(!1), [u, c] = k(!1), [h, f] = k(!1), p = Y(() => {
    a(void 0), l(null), d(!1), c(!1), f(!1);
  }, []), m = Y(
    async (v) => {
      var g, w, x, C;
      d(!0), c(!1), f(!1), l(null);
      try {
        const z = await t(v);
        return a(z), c(!0), d(!1), await ((g = r == null ? void 0 : r.onSuccess) == null ? void 0 : g.call(r, z, v)), await ((w = r == null ? void 0 : r.onSettled) == null ? void 0 : w.call(r, z, null, v)), z;
      } catch (z) {
        const L = z;
        throw l(L), f(!0), d(!1), await ((x = r == null ? void 0 : r.onError) == null ? void 0 : x.call(r, L, v)), await ((C = r == null ? void 0 : r.onSettled) == null ? void 0 : C.call(r, void 0, L, v)), z;
      }
    },
    [t, r]
  ), b = Y(
    (v, g) => {
      m(v).then(async (w) => {
        var x, C;
        await ((x = g == null ? void 0 : g.onSuccess) == null ? void 0 : x.call(g, w, v)), await ((C = g == null ? void 0 : g.onSettled) == null ? void 0 : C.call(g, w, null, v));
      }).catch(async (w) => {
        var x, C;
        await ((x = g == null ? void 0 : g.onError) == null ? void 0 : x.call(g, w, v)), await ((C = g == null ? void 0 : g.onSettled) == null ? void 0 : C.call(g, void 0, w, v));
      });
    },
    [m]
  );
  return {
    data: n,
    error: s,
    isPending: o,
    isLoading: o,
    isSuccess: u,
    isError: h,
    reset: p,
    mutate: b,
    mutateAsync: m
  };
}
const ds = () => Qe(
  ({ conversationId: t, body: r, sender_id: n }) => is(t, { body: r, sender_id: n }).then(
    (a) => a.data.data
  )
), us = () => Qe(
  ({ conversationId: t, file: r, sender_id: n, caption: a }) => ls(t, { file: r, sender_id: n, caption: a }).then(
    (s) => s.data.data
  )
), qr = () => {
  const t = Y(async (r) => (await ia(r)).data.data, []);
  return Qe(
    t
  );
}, ms = () => Qe(
  (t) => la(t).then(() => {
  })
), hs = () => {
  const t = Y(async (r) => {
    const n = await jr(r);
    return yt(r), typeof window < "u" && window.dispatchEvent(
      new CustomEvent("messenger:conversation-closed", {
        detail: { conversationId: r }
      })
    ), n.data.data;
  }, []);
  return Qe(
    t
  );
};
function pr(t) {
  return t != null && typeof t == "object" && "attributes" in t;
}
function Le(t) {
  return t == null ? "" : String(t);
}
function fs(t) {
  if (t == null || typeof t != "object") return;
  if (pr(t)) return t;
  const r = t;
  return {
    id: Le(r.id),
    type: "user",
    attributes: {
      user_auth_id: Number(r.user_auth_id),
      name: Le(r.name),
      avatar_url: Le(r.avatar_url),
      created_at: Le(r.created_at),
      updated_at: Le(r.updated_at)
    },
    relationships: []
  };
}
function ps(t) {
  if (t == null || typeof t != "object") return;
  if (pr(t)) return t;
  const r = t;
  return {
    id: Le(r.id),
    type: "messageAttachment",
    attributes: {
      file_url: Le(r.file_url),
      file_name: Le(r.file_name),
      file_mime_type: Le(r.file_mime_type),
      file_size: Number(r.file_size),
      created_at: Le(r.created_at)
    },
    relationships: []
  };
}
function bs(t) {
  return typeof t == "string" ? { id: 0, name: t, icon: "" } : t != null && typeof t == "object" ? t : null;
}
function xs(t) {
  if (t == null || typeof t != "object")
    return {
      id: "",
      type: "message",
      attributes: {},
      relationships: { sender: void 0, attachments: [] }
    };
  if (pr(t)) return t;
  const r = t, n = Array.isArray(r.attachments) ? r.attachments.map(ps).filter((a) => a != null) : [];
  return {
    id: Le(r.id),
    type: "message",
    attributes: {
      conversation_id: Number(r.conversation_id),
      sender_id: Number(r.sender_id),
      body: Le(r.body),
      type: bs(r.type),
      metadata: r.metadata ?? void 0,
      created_at: Le(r.created_at),
      updated_at: Le(r.updated_at)
    },
    relationships: {
      sender: fs(r.sender),
      attachments: n
    }
  };
}
let ot = null, Cr = null;
function Or(t) {
  if (typeof window > "u")
    return null;
  const r = JSON.stringify(t);
  return ot && Cr !== r && (ot.disconnect(), ot = null), ot || (ot = new Xn(
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
  ), Cr = r), ot;
}
function Gr(t, r, n, a) {
  if (typeof window > "u")
    return () => {
    };
  const s = Or(t);
  if (!s) return () => {
  };
  const l = s.subscribe(`conversation.${r}`);
  if (l.bind("MessageSent", (o) => {
    var h;
    const d = xs(o), u = (h = d.attributes.metadata) == null ? void 0 : h.session_uuid, c = d.attributes.conversation_id || r;
    u && c && mr(c, String(u)), n(d);
  }), a) {
    const o = (d) => a(d);
    l.bind("UserTyping", o), l.bind("client-UserTyping", o);
  }
  return () => {
    l.unbind_all(), s.unsubscribe(`conversation.${r}`);
  };
}
function Kr(t, r, n, a) {
  if (typeof window > "u")
    return () => {
    };
  const s = Or(t);
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
let Sr = 0;
const gs = 1e3;
let ct = null;
function vs() {
  if (typeof window > "u") return null;
  try {
    const t = window.AudioContext || window.webkitAudioContext;
    return t ? ((!ct || ct.state === "closed") && (ct = new t()), ct.state === "suspended" && ct.resume(), ct) : null;
  } catch {
    return null;
  }
}
function vt(t, r, n, a, s) {
  const l = t.createOscillator(), o = t.createGain();
  l.type = "sine", l.frequency.setValueAtTime(r, n), o.gain.setValueAtTime(1e-4, n), o.gain.exponentialRampToValueAtTime(s, n + 0.015), o.gain.exponentialRampToValueAtTime(1e-4, n + a), l.connect(o), o.connect(t.destination), l.start(n), l.stop(n + a + 0.05);
}
function br(t = "focused", r = {}) {
  if (typeof window > "u") return !1;
  const n = r.throttleMs ?? gs, a = Date.now();
  if (!r.force && a - Sr < n)
    return !1;
  Sr = a;
  const s = vs();
  if (!s) return !1;
  const l = Math.max(0, Math.min(1, r.volume ?? 1));
  try {
    const o = s.currentTime;
    return t === "focused" ? (vt(s, 587.33, o, 0.08, 0.12 * l), vt(s, 880, o + 0.06, 0.14, 0.1 * l)) : (vt(s, 523.25, o, 0.1, 0.15 * l), vt(s, 659.25, o + 0.08, 0.1, 0.14 * l), vt(s, 783.99, o + 0.16, 0.22, 0.16 * l)), !0;
  } catch {
    return !1;
  }
}
const ws = (t, r) => {
  const { config: n, currentUser: a, currentUserId: s } = Ge(), l = ze(
    () => ({ conversation: t.id, page: { size: "20" } }),
    [t.id]
  ), {
    data: o,
    refetch: d,
    fetchNextPage: u,
    hasNextPage: c,
    isFetchingNextPage: h,
    isLoading: f,
    prependIncomingMessage: p
  } = cs({
    params: l,
    enabled: !!t.id
  }), { mutateAsync: m, isLoading: b } = ds(), { mutateAsync: v, isLoading: g } = us(), { mutateAsync: w } = qr(), { mutate: x } = ms(), { mutateAsync: C, isLoading: z } = hs(), [L, S] = k(""), [M, X] = k(null), R = !!t.attributes.closed_at, [E, _] = k([]), [T, I] = k(!0), [P, F] = k(0), [U, me] = k("Hoy"), [te, y] = k(null), A = q(null), J = q(!1), j = q(!1), H = q(0), V = q(0), W = q(!1), ge = q(c), pe = q(t.id), be = q(null), Te = q(null), he = q(null), Be = q(!1), De = q(x), Me = pt(t, s);
  Q(() => {
    De.current = x;
  }, [x]), Q(() => {
    W.current = h;
  }, [h]), Q(() => {
    ge.current = c;
  }, [c]);
  const Re = Y(() => {
    const N = A.current;
    N && (N.scrollTo({
      top: N.scrollHeight,
      behavior: "smooth"
    }), F(0), I(!0));
  }, []), $e = Y(() => {
    const N = A.current;
    if (!N) return;
    const Z = N.scrollHeight - N.scrollTop - N.clientHeight < 140;
    I(Z), Z && F(0);
    const ce = N.querySelectorAll("[data-message-date]");
    if (ce.length === 0) {
      me("Hoy");
      return;
    }
    const xe = N.getBoundingClientRect(), Ee = xe.top, Se = xe.bottom;
    let Xe = null;
    for (let et = 0; et < ce.length; et++) {
      const st = ce[et], it = st.getBoundingClientRect();
      if (it.bottom > Ee && it.top < Se) {
        Xe = st.getAttribute("data-message-date");
        break;
      }
    }
    me(Xe || ce[ce.length - 1].getAttribute("data-message-date") || "Hoy");
  }, []);
  Q(() => {
    pe.current !== t.id && (pe.current = t.id, J.current = !1, j.current = !1, H.current = 0, V.current = 0, _([]), I(!0), F(0), me("Hoy"));
  }, [t.id]), Q(() => {
    if (J.current || f || o.length === 0) return;
    const N = A.current;
    N && (N.scrollTop = N.scrollHeight, J.current = !0, I(!0), $e());
  }, [t.id, f, o.length, $e]), sn(() => {
    const N = A.current;
    if (N && H.current > 0) {
      const Z = N.scrollHeight - H.current;
      Z > 0 && (N.scrollTop = V.current + Z), H.current = 0, V.current = 0;
    }
  }, [o]), Q(() => {
    if (E.length > 0) {
      const N = A.current;
      if (N) {
        j.current = !0, N.scrollTo({
          top: N.scrollHeight,
          behavior: "smooth"
        });
        const O = setTimeout(() => {
          j.current = !1;
        }, 500);
        return () => clearTimeout(O);
      }
    }
  }, [E.length]), Q(() => {
    const N = A.current;
    if (!N) return;
    const O = () => {
      $e(), !(j.current || !J.current) && N.scrollTop < 80 && ge.current && !W.current && !f && (W.current = !0, H.current = N.scrollHeight, V.current = N.scrollTop, u().finally(() => {
        W.current = !1;
      }));
    };
    return N.addEventListener("scroll", O, { passive: !0 }), () => {
      N.removeEventListener("scroll", O);
    };
  }, [u, f, $e]);
  const se = Y(() => {
    !t.id || !s || (be.current && clearTimeout(be.current), be.current = setTimeout(() => {
      be.current = null, w({
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
  }, [t.id, s, w]);
  Q(() => () => {
    be.current && clearTimeout(be.current), Te.current && clearTimeout(Te.current), he.current && clearTimeout(he.current);
  }, [t.id]);
  const G = Y(
    (N) => {
      p(N);
      const O = A.current;
      O && (O.scrollHeight - O.scrollTop - O.clientHeight < 160 ? setTimeout(() => {
        O.scrollTo({
          top: O.scrollHeight,
          behavior: "smooth"
        });
      }, 50) : F((xe) => xe + 1)), s && String(N.attributes.sender_id) !== String(s) && br("focused"), se();
    },
    [s, p, se]
  ), We = Y(
    (N) => {
      if (String(N.user_id) !== String(s)) {
        if (Te.current && (clearTimeout(Te.current), Te.current = null), !N.is_typing) {
          y(null);
          return;
        }
        y(N.user.name), Te.current = setTimeout(() => {
          Te.current = null, y(null);
        }, 2e3);
      }
    },
    [s]
  ), ve = Y(
    (N) => {
      !t.id || !s || Be.current === N || (Be.current = N, De.current({
        conversationId: t.id,
        user_id: Number(s),
        is_typing: N
      }));
    },
    [t.id, s]
  ), Ue = Y(() => {
    he.current && clearTimeout(he.current), he.current = setTimeout(() => {
      he.current = null, ve(!1);
    }, 2500);
  }, [ve]), He = Y(
    (N) => {
      if (!R) {
        if (S(N), !N.trim()) {
          he.current && (clearTimeout(he.current), he.current = null), ve(!1);
          return;
        }
        ve(!0), Ue();
      }
    },
    [R, Ue, ve]
  );
  Q(() => () => {
    he.current && (clearTimeout(he.current), he.current = null), ve(!1);
  }, [t.id, ve]);
  const $ = () => {
    t.attributes.unread_count && se();
  };
  Q(() => {
    $();
  }, [t, o, se]), Q(() => {
    var N, O, Z;
    if (t.id) {
      if (R) {
        yt(t.id);
        return;
      }
      if (!Rr(t.id))
        for (let ce = o.length - 1; ce >= 0; ce--) {
          const xe = o[ce];
          if (Array.isArray(xe == null ? void 0 : xe.messages))
            for (let Ee = xe.messages.length - 1; Ee >= 0; Ee--) {
              const Se = (Z = (O = (N = xe.messages[Ee]) == null ? void 0 : N.attributes) == null ? void 0 : O.metadata) == null ? void 0 : Z.session_uuid;
              if (Se) {
                mr(t.id, String(Se));
                return;
              }
            }
        }
    }
  }, [t.id, R, o]), Q(() => {
    if (!t.id) return;
    const N = Gr(
      n.reverb,
      Number(t.id),
      G,
      We
    );
    return () => {
      N();
    };
  }, [n.reverb, t.id, G, We]);
  const ae = Y(
    (N) => {
      R || X(N);
    },
    [R]
  ), oe = async (N) => {
    if (R) return;
    const O = (typeof N == "string" ? N : L).trim();
    if (!O && !M || !a) return;
    const Z = typeof N == "string" ? null : M, ce = ns({
      conversationId: t.id,
      sender: a,
      body: O,
      file: Z
    }), xe = ce.id;
    _((Ee) => [...Ee, ce]), typeof N != "string" && S(""), he.current && (clearTimeout(he.current), he.current = null), ve(!1);
    try {
      const Ee = Z ? await v({
        conversationId: t.id,
        file: Z,
        sender_id: Number(a.id),
        caption: O || void 0
      }) : await m({
        body: O,
        conversationId: t.id,
        sender_id: a.id
      });
      X(null), await d(), _((Se) => Se.filter((Xe) => Xe.id !== xe)), se();
    } catch {
      _(
        (Ee) => Ee.map(
          (Se) => Se.id === xe ? { ...Se, local_status: "error" } : Se
        )
      );
    }
  }, ne = Y(async () => {
    var N, O, Z;
    try {
      await C(t.id), fe.success("Conversación cerrada exitosamente"), (N = r == null ? void 0 : r.onCloseSuccess) == null || N.call(r);
    } catch (ce) {
      const xe = ((Z = (O = ce == null ? void 0 : ce.response) == null ? void 0 : O.data) == null ? void 0 : Z.message) || (ce == null ? void 0 : ce.message) || "Error al cerrar la conversación";
      fe.error(xe);
    }
  }, [C, t.id, r]);
  return {
    messages: o,
    optimisticMessages: E,
    scrollRef: A,
    conversationName: Me,
    inputText: L,
    pendingFile: M,
    isClosed: R,
    isClosing: z,
    isSending: b,
    isUploading: g,
    isFetchingNextPage: h,
    hasNextPage: c,
    isLoading: f,
    isNearBottom: T,
    newMessagesCount: P,
    typingUser: te,
    visibleDate: U,
    currentUser: a,
    currentUserId: s,
    scrollToBottom: Re,
    setInputText: He,
    setPendingFile: X,
    handleSendMessage: oe,
    handleSelectFile: ae,
    handleCloseConversation: ne,
    refetchMessages: d
  };
}, ys = (t) => _e({
  url: `${Fe("helpdesk", "v1")}/requests/chat-support`,
  method: "POST",
  data: t
}), Ns = "https://preview-sdi-services-helpdeskservice-nshtoc-ijvejp.ganebyd.com/api/v1/chat-bot/escalate", ks = (t) => _e({
  url: Ns,
  method: "POST",
  data: t
}), Cs = "https://preview-sdi-services-helpdeskservice-nshtoc-ijvejp.ganebyd.com/api/v1/chat-bot/resolve", Ss = (t) => _e({
  url: Cs,
  method: "POST",
  data: t
}), zs = "https://preview-sdi-services-helpdeskservice-nshtoc-ijvejp.ganebyd.com/api/v1/chat-bot/queue-status", _s = (t) => _e({
  url: zs,
  method: "GET",
  params: {
    session_id: t
  }
}), As = "https://preview-sdi-services-helpdeskservice-nshtoc-ijvejp.ganebyd.com/api/v1/chat-bot/queue-to-ticket", Es = (t) => _e({
  url: As,
  method: "POST",
  params: {
    session_id: t.session_id
  },
  data: t
});
function Xr(t) {
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
const Ps = () => {
  const t = Y(async (r) => {
    var s;
    const n = await ks(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    if (typeof window < "u" && (a != null && a.conversation_id)) {
      const l = Xr(a);
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
  return Qe(
    t
  );
}, Ts = () => {
  const t = Y(async (r) => {
    var s;
    const n = await Ss(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    return typeof window < "u" && (window.dispatchEvent(new CustomEvent("messenger:conversation-closed")), window.dispatchEvent(new CustomEvent("messenger:conversation-updated"))), a;
  }, []);
  return Qe(t);
}, Ds = ({
  sessionId: t,
  enabled: r = !1,
  intervalMs: n = 5e3,
  onStatusUpdate: a,
  onAssigned: s,
  onError: l
} = {}) => {
  const [o, d] = k(null), [u, c] = k(!1), [h, f] = k(null), p = q(!1), m = q(a), b = q(s), v = q(l);
  m.current = a, b.current = s, v.current = l;
  const g = Y(async () => {
    var w, x, C, z;
    if (!t || p.current) return null;
    try {
      c(!0);
      const L = await _s(t), S = ((w = L.data) == null ? void 0 : w.data) ?? L.data;
      if (d(S), f(null), (x = m.current) == null || x.call(m, S), ((S == null ? void 0 : S.status) === "escalated_live" || (S == null ? void 0 : S.mode) === "live_chat" || !!(S != null && S.conversation_id)) && !p.current) {
        if (p.current = !0, typeof window < "u" && (S != null && S.conversation_id)) {
          const X = Xr(S);
          window.dispatchEvent(
            new CustomEvent("messenger:conversation-created", {
              detail: {
                conversationId: String(S.conversation_id),
                conversation: X,
                focus: !0
              }
            })
          );
        }
        (C = b.current) == null || C.call(b, S);
      }
      return S;
    } catch (L) {
      const S = L;
      return f(S), (z = v.current) == null || z.call(v, S), null;
    } finally {
      c(!1);
    }
  }, [t]);
  return Q(() => {
    p.current = !1;
  }, [t]), Q(() => {
    if (!r || !t)
      return;
    g();
    const w = setInterval(() => {
      if (p.current) {
        clearInterval(w);
        return;
      }
      g();
    }, n);
    return () => {
      clearInterval(w);
    };
  }, [g, r, n, t]), {
    data: o,
    isPolling: u,
    error: h,
    checkStatus: g,
    isAssigned: p.current
  };
}, Ms = () => {
  const t = Y(async (r) => {
    var s;
    const n = await Es(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    return typeof window < "u" && (window.dispatchEvent(new CustomEvent("messenger:conversation-closed")), window.dispatchEvent(new CustomEvent("messenger:conversation-updated"))), a;
  }, []);
  return Qe(t);
};
function Is(t, r, n = "OR") {
  const a = Array.isArray(r) ? r : [r];
  return a.length === 0 ? !0 : n === "AND" ? a.every((s) => t.includes(s)) : a.some((s) => t.includes(s));
}
function Ke({
  permission: t,
  operator: r = "OR"
}) {
  const n = Mr(), a = (n == null ? void 0 : n.permissions) ?? [];
  return Is(a, t, r);
}
function Rs({
  conversation: t,
  isClosed: r = !!t.attributes.closed_at,
  isClosing: n = !1,
  onCloseConversation: a,
  showResolvedBadge: s = !1,
  className: l,
  ...o
}) {
  const [d, u] = k(!1), { currentUserId: c } = Ge(), h = Ke({
    permission: ["messenger_chat_support.provide_support"]
  }), f = pt(t, c);
  return r && s ? /* @__PURE__ */ i(
    "div",
    {
      className: B(
        "inline-flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-700/80 bg-neutral-100/60 dark:bg-neutral-800/60 px-2.5 sm:px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400 select-none shadow-2xs",
        l
      ),
      children: [
        /* @__PURE__ */ e(rt, { className: "size-3.5 text-emerald-500" }),
        /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Resuelta" })
      ]
    }
  ) : r && !s || !h ? null : /* @__PURE__ */ i(Ce, { children: [
    /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        disabled: n,
        onClick: () => u(!0),
        title: "Cerrar y marcar conversación como resuelta",
        "aria-label": "Cerrar conversación",
        className: B(
          "group inline-flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-700/80 bg-white dark:bg-neutral-800/90 px-2.5 sm:px-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200 shadow-2xs transition-all hover:border-emerald-300 dark:hover:border-emerald-700/70 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 dark:hover:text-emerald-300 active:scale-[0.98] cursor-pointer disabled:pointer-events-none disabled:opacity-50",
          l
        ),
        ...o,
        children: n ? /* @__PURE__ */ i(Ce, { children: [
          /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin text-neutral-500" }),
          /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Cerrando..." })
        ] }) : /* @__PURE__ */ i(Ce, { children: [
          /* @__PURE__ */ e(rt, { className: "size-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover:scale-110" }),
          /* @__PURE__ */ e("span", { className: "hidden sm:inline-block tracking-tight", children: "Cerrar chat" })
        ] })
      }
    ),
    /* @__PURE__ */ e(ha, { open: d, onOpenChange: u, children: /* @__PURE__ */ i(fa, { className: "sm:max-w-md p-5", children: [
      /* @__PURE__ */ i(pa, { className: "gap-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ e("div", { className: "flex size-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20", children: /* @__PURE__ */ e(nt, { className: "size-4" }) }),
          /* @__PURE__ */ e(ba, { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "¿Cerrar conversación?" })
        ] }),
        /* @__PURE__ */ i(xa, { className: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: [
          "¿Estás seguro de que deseas marcar como resuelta y cerrar la conversación con",
          " ",
          /* @__PURE__ */ e("strong", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children: f }),
          "? Esta acción finalizará la atención en tiempo real."
        ] })
      ] }),
      /* @__PURE__ */ i(ga, { className: "gap-2 sm:gap-0 mt-3", children: [
        /* @__PURE__ */ e(
          va,
          {
            disabled: n,
            className: "text-xs h-8 cursor-pointer",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ e(
          wa,
          {
            disabled: n,
            onClick: () => {
              u(!1), a == null || a();
            },
            className: "text-xs h-8 bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer",
            children: "Sí, cerrar conversación"
          }
        )
      ] })
    ] }) })
  ] });
}
function js({
  conversation: t,
  isClosed: r,
  isClosing: n = !1,
  onCloseConversation: a,
  isContextPanelOpen: s = !0,
  onToggleContextPanel: l,
  onBack: o,
  alwaysShowBackButton: d = !1,
  renderOptions: u,
  onStartVoiceCall: c
}) {
  var v, g;
  const { currentUserId: h } = Ge(), f = Ct(t), p = pt(t, h), m = ft(t, h), b = Vr(t, h) || fr(m);
  return /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 p-2 sm:p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs min-w-0", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden", children: [
      o && /* @__PURE__ */ e(
        le,
        {
          variant: "ghost",
          size: "sm",
          onClick: o,
          title: "Volver a la lista de chats",
          "aria-label": "Volver a la lista de chats",
          className: B(
            "size-8 p-0 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
            d ? "flex" : "flex md:hidden"
          ),
          children: /* @__PURE__ */ e(Jt, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ e(
        Oe,
        {
          src: m == null ? void 0 : m.attributes.avatar_url,
          name: p,
          isGroup: f,
          isBot: b,
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
              title: p,
              children: p
            }
          ),
          b && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 rounded-full bg-violet-100 dark:bg-violet-950/70 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40 shrink-0 shadow-2xs", children: [
            /* @__PURE__ */ e(Zt, { className: "size-2.5 text-violet-600 dark:text-violet-400" }),
            /* @__PURE__ */ e("span", { children: "Asistente IA" })
          ] }),
          r && /* @__PURE__ */ i(
            Ze,
            {
              variant: "destructive",
              className: "inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium shrink-0 py-0 h-4.5 px-1.5",
              children: [
                /* @__PURE__ */ e(nt, { className: "size-2.5" }),
                /* @__PURE__ */ e("span", { children: "Cerrada" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 min-w-0", children: /* @__PURE__ */ e("span", { className: "truncate", children: f ? `${((g = (v = t.relationships) == null ? void 0 : v.users) == null ? void 0 : g.length) || 0} participantes` : b ? "Asistente virtual automatizado" : "Conversación individual" }) })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 shrink-0", children: [
      b && !r && c && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: c,
          title: "Llamar al Asistente de Voz (Interactivo)",
          "aria-label": "Llamar al Asistente de Voz",
          className: "group inline-flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200/90 dark:border-neutral-700/80 bg-white dark:bg-neutral-800/90 px-2.5 sm:px-3 text-xs font-semibold text-neutral-700 dark:text-neutral-200 shadow-2xs transition-all hover:border-emerald-300 dark:hover:border-emerald-700/70 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 dark:hover:text-emerald-300 active:scale-[0.98] cursor-pointer",
          children: [
            /* @__PURE__ */ e(cn, { className: "size-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-hover:scale-110" }),
            /* @__PURE__ */ e("span", { className: "tracking-tight", children: "Llamar" })
          ]
        }
      ),
      (u == null ? void 0 : u.customHeaderButtons) !== void 0 ? u.customHeaderButtons : /* @__PURE__ */ e(
        Rs,
        {
          conversation: t,
          isClosed: r,
          isClosing: n,
          onCloseConversation: a,
          showResolvedBadge: !1
        }
      ),
      l && /* @__PURE__ */ e(
        le,
        {
          variant: "outline",
          size: "icon",
          onClick: l,
          className: B(
            "size-8 p-0",
            s ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" : ""
          ),
          children: /* @__PURE__ */ e(dn, { className: "size-4" })
        }
      )
    ] })
  ] });
}
const Ls = /* @__PURE__ */ new Set(["http:", "https:", "mailto:"]);
function Yr(t) {
  const r = t.trim();
  if (!r) return null;
  try {
    const n = new URL(r);
    return Ls.has(n.protocol.toLowerCase()) ? n.href : null;
  } catch {
    return null;
  }
}
function tt(t) {
  return t ? t.replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&amp;/gi, "&") : "";
}
function Fs({
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
      className: B(
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
              children: a ? /* @__PURE__ */ i(Ce, { children: [
                /* @__PURE__ */ e(er, { className: "size-3 text-emerald-400" }),
                /* @__PURE__ */ e("span", { className: "text-emerald-400", children: "Copiado" })
              ] }) : /* @__PURE__ */ i(Ce, { children: [
                /* @__PURE__ */ e(mn, { className: "size-3" }),
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
function je(t) {
  if (!t) return [];
  const r = [];
  let n = t;
  const a = /^`([^`]+)`/, s = /^\*\*([^*]+)\*\*/, l = /^__([^_]+)__/, o = /^\*([^*]+)\*/, d = /^_([^_]+)_/, u = /^~~([^~]+)~~/, c = /^\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/, h = /^((?:https?:\/\/|mailto:)[^\s<]+[^<.,:;"')\]\s])/, f = /^<(?:b|strong)>([\s\S]*?)<\/(?:b|strong)>/i, p = /^<(?:i|em)>([\s\S]*?)<\/(?:i|em)>/i, m = /^<u>([\s\S]*?)<\/u>/i, b = /^<(?:s|strike|del)>([\s\S]*?)<\/(?:s|strike|del)>/i, v = /^<code>([\s\S]*?)<\/code>/i, g = /^<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/i, w = /^<br\s*\/?>/i;
  for (; n.length > 0; ) {
    let x = n.match(w);
    if (x) {
      r.push({ type: "br" }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(a), x) {
      r.push({ type: "inlineCode", value: x[1] }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(v), x) {
      r.push({ type: "inlineCode", value: tt(x[1]) }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(c), x) {
      r.push({
        type: "link",
        label: x[1],
        href: x[2]
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(g), x) {
      r.push({
        type: "link",
        href: x[1],
        label: tt(x[2].replace(/<[^>]*>/g, ""))
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(s) || n.match(l), x) {
      r.push({
        type: "bold",
        children: je(x[1])
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(f), x) {
      r.push({
        type: "bold",
        children: je(x[1])
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(o) || n.match(d), x) {
      r.push({
        type: "italic",
        children: je(x[1])
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(p), x) {
      r.push({
        type: "italic",
        children: je(x[1])
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(u), x) {
      r.push({
        type: "strike",
        children: je(x[1])
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(b), x) {
      r.push({
        type: "strike",
        children: je(x[1])
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(m), x) {
      r.push({
        type: "underline",
        children: je(x[1])
      }), n = n.slice(x[0].length);
      continue;
    }
    if (x = n.match(h), x) {
      r.push({
        type: "link",
        href: x[1],
        label: x[1],
        isAuto: !0
      }), n = n.slice(x[0].length);
      continue;
    }
    const C = n.search(/[`*~_\[<]|https?:\/\/|mailto:/);
    if (C === -1) {
      r.push({ type: "text", value: tt(n) });
      break;
    } else C === 0 ? (r.push({ type: "text", value: tt(n[0]) }), n = n.slice(1)) : (r.push({
      type: "text",
      value: tt(n.slice(0, C))
    }), n = n.slice(C));
  }
  return r;
}
function zr(t) {
  const r = t.trim();
  if (!r.includes("|")) return !1;
  const n = r.split("|").map((a) => a.trim()).filter((a) => a.length > 0);
  return n.length === 0 ? !1 : n.every((a) => /^:?-+:?$/.test(a));
}
function _r(t) {
  let r = t.trim();
  return r.startsWith("|") && (r = r.slice(1)), r.endsWith("|") && (r = r.slice(0, -1)), r.split("|").map((n) => n.trim());
}
function Bs(t) {
  if (!t) return [];
  const n = t.replace(/\r\n/g, `
`).replace(
    /<pre[^>]*>\s*<code(?:\s+class=["'][^"']*language-([a-zA-Z0-9_-]+)[^"']*["'])?[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (l, o, d) => {
      const u = tt(d.replace(/<br\s*\/?>/gi, `
`));
      return `
\`\`\`${o || ""}
${u}
\`\`\`
`;
    }
  ).replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (l, o) => `
\`\`\`
${tt(o.replace(/<br\s*\/?>/gi, `
`).replace(/<\/?code[^>]*>/gi, ""))}
\`\`\`
`).split(`
`), a = [];
  let s = 0;
  for (; s < n.length; ) {
    const l = n[s], o = l.match(/^```\s*([a-zA-Z0-9_-]*)/);
    if (o) {
      const p = o[1] || void 0, m = [];
      for (s++; s < n.length && !n[s].startsWith("```"); )
        m.push(n[s]), s++;
      s < n.length && n[s].startsWith("```") && s++, a.push({
        type: "code",
        language: p,
        code: m.join(`
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
      const p = d[1].length;
      a.push({
        type: "heading",
        level: p,
        children: je(d[2].trim())
      }), s++;
      continue;
    }
    if (/^>\s?/.test(l)) {
      const p = [];
      for (; s < n.length && /^>\s?/.test(n[s]); )
        p.push(n[s].replace(/^>\s?/, "")), s++;
      a.push({
        type: "quote",
        lines: p
      });
      continue;
    }
    if (l.trim().startsWith("|") && s + 1 < n.length && zr(n[s + 1])) {
      const m = _r(l).map((v) => je(v));
      s += 2;
      const b = [];
      for (; s < n.length && n[s].trim().includes("|"); ) {
        const v = _r(n[s]);
        b.push(v.map((g) => je(g))), s++;
      }
      a.push({
        type: "table",
        headers: m,
        rows: b
      });
      continue;
    }
    if (l.match(/^(\s*)([-*+])\s+(.+)$/)) {
      const p = [];
      for (; s < n.length; ) {
        const m = n[s].match(/^(\s*)([-*+])\s+(.+)$/);
        if (!m) break;
        p.push(je(m[3])), s++;
      }
      a.push({
        type: "list",
        ordered: !1,
        items: p
      });
      continue;
    }
    const c = l.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (c) {
      const p = parseInt(c[2], 10), m = [];
      for (; s < n.length; ) {
        const b = n[s].match(/^(\s*)(\d+)\.\s+(.+)$/);
        if (!b) break;
        m.push(je(b[3])), s++;
      }
      a.push({
        type: "list",
        ordered: !0,
        start: p,
        items: m
      });
      continue;
    }
    const h = [];
    for (; s < n.length && !n[s].startsWith("```") && !n[s].match(/^(#{1,6})\s+/) && !/^(?:-{3,}|\*{3,}|_{3,})$/.test(n[s].trim()) && !/^>\s?/.test(n[s]) && !(n[s].trim().startsWith("|") && s + 1 < n.length && zr(n[s + 1])) && !n[s].match(/^(\s*)(?:[-*+]|\d+\.)\s+/) && (h.push(n[s]), s++, h[h.length - 1].trim() !== ""); )
      ;
    const f = h.join(`
`).replace(/^\n+|\n+$/g, "");
    if (f) {
      const p = [];
      f.split(`
`).forEach((b, v) => {
        v > 0 && p.push({ type: "br" }), b && p.push(...je(b));
      }), a.push({
        type: "paragraph",
        children: p
      });
    }
  }
  return a;
}
function Ye(t, r, n = "inline") {
  return t.map((a, s) => {
    const l = `${n}-${s}`;
    switch (a.type) {
      case "text":
        return /* @__PURE__ */ e(nn.Fragment, { children: a.value }, l);
      case "br":
        return /* @__PURE__ */ e("br", {}, l);
      case "bold":
        return /* @__PURE__ */ e("strong", { className: "font-bold", children: Ye(a.children, r, l) }, l);
      case "italic":
        return /* @__PURE__ */ e("em", { className: "italic", children: Ye(a.children, r, l) }, l);
      case "underline":
        return /* @__PURE__ */ e("u", { className: "underline underline-offset-2", children: Ye(a.children, r, l) }, l);
      case "strike":
        return /* @__PURE__ */ e("del", { className: "line-through opacity-85", children: Ye(a.children, r, l) }, l);
      case "inlineCode":
        return /* @__PURE__ */ e(
          "code",
          {
            className: B(
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
            className: B(
              "inline-flex items-center gap-0.5 font-semibold underline underline-offset-2 transition-opacity hover:opacity-85 break-all",
              r ? "text-white decoration-blue-200" : "text-blue-600 dark:text-blue-400 decoration-blue-400/60"
            ),
            children: [
              /* @__PURE__ */ e("span", { children: a.label }),
              /* @__PURE__ */ e(un, { className: "size-3 shrink-0 inline" })
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
function $s(t, r) {
  return t.map((n, a) => {
    const s = `block-${a}`;
    switch (n.type) {
      case "code":
        return /* @__PURE__ */ e(
          Fs,
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
        }[n.level], children: Ye(n.children, r, s) }, s);
      case "quote":
        return /* @__PURE__ */ e(
          "blockquote",
          {
            className: B(
              "my-1.5 border-l-2 pl-3 italic",
              r ? "border-blue-200 text-blue-50" : "border-violet-400 dark:border-violet-500 text-neutral-600 dark:text-neutral-300"
            ),
            children: n.lines.map((l, o) => /* @__PURE__ */ e("div", { children: Ye(je(l), r, `${s}-${o}`) }, `${s}-line-${o}`))
          },
          s
        );
      case "list": {
        const l = n.ordered ? "ol" : "ul", o = n.ordered ? "my-1.5 list-decimal pl-5 space-y-1 marker:font-semibold" : "my-1.5 list-disc pl-5 space-y-1";
        return /* @__PURE__ */ e(l, { start: n.start, className: o, children: n.items.map((d, u) => /* @__PURE__ */ e("li", { className: "leading-relaxed", children: Ye(d, r, `${s}-${u}`) }, `${s}-item-${u}`)) }, s);
      }
      case "table":
        return /* @__PURE__ */ e(
          "div",
          {
            className: B(
              "my-2 overflow-x-auto rounded-xl border",
              r ? "border-blue-400/40 bg-blue-700/40" : "border-neutral-200 dark:border-neutral-700/80 bg-white/80 dark:bg-neutral-900/60"
            ),
            children: /* @__PURE__ */ i("table", { className: "w-full border-collapse text-left text-xs", children: [
              n.headers.length > 0 && /* @__PURE__ */ e(
                "thead",
                {
                  className: B(
                    "border-b font-semibold",
                    r ? "border-blue-400/40 bg-blue-800/50 text-white" : "border-neutral-200 dark:border-neutral-700/80 bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-100"
                  ),
                  children: /* @__PURE__ */ e("tr", { children: n.headers.map((l, o) => /* @__PURE__ */ e("th", { className: "px-2.5 py-1.5 font-semibold whitespace-nowrap", children: Ye(l, r, `${s}-th-${o}`) }, `${s}-th-${o}`)) })
                }
              ),
              /* @__PURE__ */ e("tbody", { className: "divide-y divide-neutral-200/60 dark:divide-neutral-800/60", children: n.rows.map((l, o) => /* @__PURE__ */ e(
                "tr",
                {
                  className: B(
                    "border-b last:border-b-0",
                    r ? "border-blue-400/30 hover:bg-blue-700/30" : "border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40"
                  ),
                  children: l.map((d, u) => /* @__PURE__ */ e("td", { className: "px-2.5 py-1.5 align-top", children: Ye(d, r, `${s}-td-${o}-${u}`) }, `${s}-td-${o}-${u}`))
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
            className: B(
              "my-2 border-t",
              r ? "border-blue-400/40" : "border-neutral-200 dark:border-neutral-700"
            )
          },
          s
        );
      case "paragraph":
      default:
        return /* @__PURE__ */ e("div", { className: "whitespace-pre-wrap break-words leading-relaxed", children: Ye(n.children, r, s) }, s);
    }
  });
}
function Rt({
  content: t,
  isOwnMessage: r = !1,
  className: n
}) {
  const a = Bs(t);
  return /* @__PURE__ */ e("div", { className: B("space-y-1 whitespace-pre-wrap break-words leading-relaxed", n), children: $s(a, r) });
}
function Ws(t) {
  if (!t) return "";
  try {
    const r = new Date(t);
    return isNaN(r.getTime()) ? "" : r.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: !1 });
  } catch {
    return "";
  }
}
function Ar({
  message: t,
  isOwnMessage: r,
  isGroup: n,
  conversationName: a,
  conversationAvatarUrl: s,
  isBot: l = !1,
  disableActions: o = !1,
  onActionClick: d
}) {
  var b, v, g, w, x, C, z, L, S, M, X, R;
  const u = !!l || Number((g = (v = (b = t.relationships) == null ? void 0 : b.sender) == null ? void 0 : v.attributes) == null ? void 0 : g.user_auth_id) === 0, c = ((x = (w = t.attributes) == null ? void 0 : w.metadata) == null ? void 0 : x.action_buttons) ?? [], h = Nt(((L = (z = (C = t.relationships) == null ? void 0 : C.sender) == null ? void 0 : z.attributes) == null ? void 0 : L.name) || a), f = ((X = (M = (S = t.relationships) == null ? void 0 : S.sender) == null ? void 0 : M.attributes) == null ? void 0 : X.avatar_url) || void 0, p = Ws(t.attributes.created_at), m = ((R = t.relationships) == null ? void 0 : R.attachments) ?? [];
  return /* @__PURE__ */ i(
    "div",
    {
      className: B(
        "flex items-start gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0",
        r && "ml-auto flex-row-reverse"
      ),
      children: [
        n && !r ? /* @__PURE__ */ e(
          Oe,
          {
            name: h,
            src: f,
            isBot: u,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ) : r ? null : /* @__PURE__ */ e(
          Oe,
          {
            name: a,
            src: s,
            isBot: u,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ i("div", { className: B("flex min-w-0 flex-col gap-1", r && "items-end"), children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: B(
                  "text-xs font-semibold truncate",
                  u && !r ? "text-violet-700 dark:text-violet-300 font-bold" : "text-neutral-800 dark:text-neutral-200"
                ),
                children: r ? "Tú" : h
              }
            ),
            u && !r && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-violet-100 dark:bg-violet-950/80 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/50 shadow-2xs", children: [
              /* @__PURE__ */ e(Zt, { className: "size-2.5 text-violet-600 dark:text-violet-400" }),
              /* @__PURE__ */ e("span", { children: "IA" })
            ] })
          ] }),
          /* @__PURE__ */ i(
            "div",
            {
              className: B(
                "rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words",
                r ? "rounded-tr-xs bg-blue-600 text-white shadow-xs" : u ? "rounded-tl-xs bg-gradient-to-b from-violet-50/70 to-white dark:from-neutral-800/90 dark:to-neutral-900/90 text-neutral-900 dark:text-neutral-100 border border-violet-200/70 dark:border-violet-800/50 shadow-xs ring-1 ring-violet-500/10" : "rounded-tl-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs"
              ),
              children: [
                m.map((E) => E.attributes.file_mime_type.startsWith("image/") ? /* @__PURE__ */ e(
                  "a",
                  {
                    href: E.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10",
                    children: /* @__PURE__ */ e(
                      "img",
                      {
                        src: E.attributes.file_url,
                        alt: E.attributes.file_name,
                        className: "max-h-64 max-w-full object-contain rounded-xl",
                        loading: "lazy"
                      }
                    )
                  },
                  E.id
                ) : /* @__PURE__ */ i(
                  "a",
                  {
                    href: E.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    download: E.attributes.file_name,
                    className: "mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                    children: [
                      /* @__PURE__ */ e(hn, { className: "size-4 shrink-0" }),
                      /* @__PURE__ */ e("span", { className: "min-w-0 flex-1 truncate font-medium", children: E.attributes.file_name }),
                      /* @__PURE__ */ e(fn, { className: "size-3.5 shrink-0" })
                    ]
                  },
                  E.id
                )),
                t.attributes.body && m.length === 0 && /* @__PURE__ */ e(
                  Rt,
                  {
                    content: t.attributes.body,
                    isOwnMessage: r,
                    isBot: u
                  }
                ),
                t.attributes.body && m.length > 0 && t.attributes.body !== "Archivo adjunto" && /* @__PURE__ */ e("div", { className: "mt-1", children: /* @__PURE__ */ e(
                  Rt,
                  {
                    content: t.attributes.body,
                    isOwnMessage: r,
                    isBot: u
                  }
                ) }),
                u && !r && c.length > 0 && /* @__PURE__ */ e("div", { className: "mt-2.5 pt-2 border-t border-violet-200/60 dark:border-violet-800/40 flex flex-wrap gap-1.5", children: c.map((E) => /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    disabled: o,
                    onClick: () => {
                      o || d == null || d(E);
                    },
                    className: B(
                      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold shadow-2xs transition-all",
                      o ? "border-neutral-200 dark:border-neutral-700/50 bg-neutral-100/80 dark:bg-neutral-800/50 text-neutral-400 dark:text-neutral-500 cursor-not-allowed opacity-60" : "border-violet-200 dark:border-violet-700/60 bg-white/95 dark:bg-neutral-800/90 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:border-violet-600 dark:hover:border-violet-600 text-violet-700 dark:text-violet-300 active:scale-95 cursor-pointer"
                    ),
                    children: /* @__PURE__ */ e("span", { children: E.label })
                  },
                  E.id
                )) }),
                /* @__PURE__ */ i("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none", children: [
                  /* @__PURE__ */ e(
                    "time",
                    {
                      dateTime: t.attributes.created_at,
                      className: r ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400",
                      children: p
                    }
                  ),
                  r && t.local_status === "sending" && /* @__PURE__ */ e(
                    at,
                    {
                      className: "size-3 text-blue-200 animate-spin",
                      "aria-label": "Pendiente de envío"
                    }
                  ),
                  r && t.local_status === "sent" && /* @__PURE__ */ e(pn, { className: "size-3 text-blue-200", "aria-label": "Enviado" }),
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
function Us({
  conversation: t,
  messages: r,
  optimisticMessages: n = [],
  scrollRef: a,
  isFetchingNextPage: s = !1,
  hasNextPage: l = !1,
  isLoading: o = !1,
  isNearBottom: d = !0,
  newMessagesCount: u = 0,
  visibleDate: c = "Hoy",
  disableActions: h = !1,
  onScrollToBottom: f,
  onActionClick: p
}) {
  var M, X, R, E;
  const { currentUserId: m } = Ge(), b = Ct(t), v = pt(t, m), g = ft(t, m), w = Vr(t, m) || fr(g), x = !!t.attributes.closed_at, C = new Set(
    r.flatMap((_) => _.messages.map((T) => T.id))
  ), z = n.filter(
    (_) => !C.has(_.id)
  ), L = z.length > 0 ? (M = z[z.length - 1]) == null ? void 0 : M.id : (E = (R = (X = r[0]) == null ? void 0 : X.messages) == null ? void 0 : R[0]) == null ? void 0 : E.id, S = c.toLowerCase() === "hoy" || c.toLowerCase() === "today" || Ot(c) === "Hoy";
  return /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 relative w-full overflow-hidden", children: /* @__PURE__ */ e(kt, { ref: a, className: "relative z-10 h-full w-full", children: /* @__PURE__ */ i("div", { className: "space-y-4 p-3 sm:p-4 text-sm w-full min-w-0", children: [
    s && /* @__PURE__ */ i("div", { className: "flex items-center justify-center py-2 gap-2 text-xs text-neutral-500 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin text-blue-600" }),
      /* @__PURE__ */ e("span", { children: "Cargando mensajes anteriores..." })
    ] }),
    !l && r.length > 0 && /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400", children: "Inicio de la conversación" }) }),
    o && r.length === 0 && /* @__PURE__ */ i("div", { className: "space-y-4 py-2 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ i("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ e(re, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(re, { className: "h-3 w-20 rounded" }),
          /* @__PURE__ */ e(re, { className: "h-12 w-48 sm:w-64 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ e(re, { className: "h-14 w-52 sm:w-64 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) }),
      /* @__PURE__ */ i("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ e(re, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(re, { className: "h-3 w-16 rounded" }),
          /* @__PURE__ */ e(re, { className: "h-16 w-56 sm:w-72 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ e(re, { className: "h-10 w-36 sm:w-44 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ e("div", { className: "sticky top-1 z-20 flex justify-center pointer-events-none mb-2 transition-all duration-200", children: /* @__PURE__ */ e("div", { className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs", children: /* @__PURE__ */ e("span", { children: S ? "Hoy" : Ot(c) }) }) }),
    [...r ?? []].reverse().map((_) => /* @__PURE__ */ i(
      "div",
      {
        "data-date-group": _.date,
        className: "space-y-4",
        children: [
          /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: Ot(_.date) }) }),
          [..._.messages].reverse().map((T) => {
            var F, U;
            const I = String((U = (F = T == null ? void 0 : T.relationships) == null ? void 0 : F.sender) == null ? void 0 : U.id) === String(m), P = T.id === L;
            return /* @__PURE__ */ e(
              "div",
              {
                "data-message-date": _.date,
                className: "w-full",
                children: /* @__PURE__ */ e(
                  Ar,
                  {
                    message: I ? { ...T, local_status: "sent" } : T,
                    isOwnMessage: I,
                    isGroup: b,
                    conversationName: v,
                    conversationAvatarUrl: (g == null ? void 0 : g.attributes.avatar_url) || void 0,
                    isBot: w,
                    disableActions: h || x || !P,
                    onActionClick: p
                  }
                )
              },
              T.id
            );
          })
        ]
      },
      _.date
    )),
    z.length > 0 && /* @__PURE__ */ i("div", { "data-date-group": "Hoy", className: "space-y-4", children: [
      /* @__PURE__ */ e("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: "Hoy" }) }),
      [...z].map((_) => {
        var I;
        const T = _.id === L;
        return /* @__PURE__ */ e(
          "div",
          {
            "data-message-date": ((I = _.attributes.created_at) == null ? void 0 : I.slice(0, 10)) || "Hoy",
            className: "w-full",
            children: /* @__PURE__ */ e(
              Ar,
              {
                message: _,
                isOwnMessage: !0,
                isGroup: b,
                conversationName: v,
                conversationAvatarUrl: (g == null ? void 0 : g.attributes.avatar_url) || void 0,
                isBot: w,
                disableActions: h || x || !T,
                onActionClick: p
              }
            )
          },
          _.id
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
          /* @__PURE__ */ e(Kt, { className: "size-4" }),
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
function Hs({
  inputText: t,
  setInputText: r,
  onSendMessage: n,
  onSelectFile: a,
  pendingFile: s,
  onRemoveFile: l,
  isSending: o,
  isUploading: d,
  conversationName: u,
  isClosed: c = !1,
  readOnly: h = !1,
  readOnlyMessage: f
}) {
  const p = q(null), [m, b] = k(!1), [v, g] = k(!1), [w, x] = k(!1), [C, z] = k("https://"), [L, S] = k(""), M = ze(
    () => s && s.type.startsWith("image/") ? URL.createObjectURL(s) : void 0,
    [s]
  );
  Q(() => () => {
    M && URL.revokeObjectURL(M);
  }, [M]);
  const X = Y(() => {
    const y = p.current;
    if (!y) return;
    y.style.height = "auto";
    const A = Math.min(Math.max(y.scrollHeight, 28), 120);
    y.style.height = `${A}px`;
  }, []);
  if (Q(() => {
    X();
  }, [t, X]), Q(() => {
    t.trim() || g(!1);
  }, [t]), c || h)
    return /* @__PURE__ */ e("div", { className: "shrink-0 px-3 pb-3 pt-1 text-center sm:px-4 sm:pb-4", children: /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-white/85 dark:border-neutral-800/80 dark:bg-neutral-900/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 shadow-xs dark:text-neutral-400", children: [
      /* @__PURE__ */ e(nt, { className: "size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" }),
      /* @__PURE__ */ e("span", { children: f || (c ? "Esta conversación ha sido finalizada y no admite nuevos mensajes." : "No se permite enviar mensajes en esta conversación.") })
    ] }) });
  const R = (y, A, J = "texto") => {
    const j = p.current;
    if (!j) return;
    const H = j.selectionStart ?? 0, V = j.selectionEnd ?? 0, W = t;
    if (H !== V) {
      const ge = W.substring(H, V), pe = `${y}${ge}${A}`, be = W.substring(0, H) + pe + W.substring(V);
      r(be), requestAnimationFrame(() => {
        j.focus(), j.setSelectionRange(H + y.length, V + y.length);
      });
    } else {
      const ge = `${y}${J}${A}`, pe = W.substring(0, H) + ge + W.substring(V);
      r(pe), requestAnimationFrame(() => {
        j.focus(), j.setSelectionRange(H + y.length, H + y.length + J.length);
      });
    }
  }, E = (y, A = !1) => {
    const J = p.current;
    if (!J) return;
    const j = J.selectionStart ?? 0, H = J.selectionEnd ?? 0, V = t, W = V.lastIndexOf(`
`, j - 1) + 1, ge = V.indexOf(`
`, H), pe = ge === -1 ? V.length : ge, he = V.substring(W, pe).split(`
`).map((De, Me) => {
      const Re = A ? `${Me + 1}. ` : y;
      return De.startsWith(Re) ? De.slice(Re.length) : `${Re}${De}`;
    }).join(`
`), Be = V.substring(0, W) + he + V.substring(pe);
    r(Be), requestAnimationFrame(() => {
      J.focus(), J.setSelectionRange(W, W + he.length);
    });
  }, _ = () => {
    const y = p.current;
    if (!y) return;
    const A = y.selectionStart ?? 0, J = y.selectionEnd ?? 0, j = t, H = j.substring(A, J);
    if (H.includes(`
`)) {
      const V = `\`\`\`
${H}
\`\`\``, W = j.substring(0, A) + V + j.substring(J);
      r(W), requestAnimationFrame(() => {
        y.focus(), y.setSelectionRange(A + 4, A + 4 + H.length);
      });
    } else
      R("`", "`", "código");
  }, T = () => {
    const y = p.current;
    if (y) {
      const A = y.selectionStart ?? 0, J = y.selectionEnd ?? 0, j = t.substring(A, J).trim();
      j && S(j);
    }
    z("https://"), b(!0), x((A) => !A);
  }, I = () => {
    const y = p.current, A = Yr(C);
    if (!A) return;
    const j = `[${(L || A).trim()}](${A})`;
    if (y) {
      const H = y.selectionStart ?? 0, V = y.selectionEnd ?? 0, W = t, ge = W.substring(0, H) + j + W.substring(V);
      r(ge), requestAnimationFrame(() => {
        y.focus();
        const pe = H + j.length;
        y.setSelectionRange(pe, pe);
      });
    } else
      r(t ? `${t} ${j}` : j);
    x(!1), z("https://"), S("");
  }, P = (y) => {
    const A = y.ctrlKey || y.metaKey;
    if (A && y.key.toLowerCase() === "b") {
      y.preventDefault(), R("**", "**", "negrita");
      return;
    }
    if (A && y.key.toLowerCase() === "i") {
      y.preventDefault(), R("*", "*", "cursiva");
      return;
    }
    if (A && y.key.toLowerCase() === "u") {
      y.preventDefault(), R("<u>", "</u>", "subrayado");
      return;
    }
    if (A && y.key.toLowerCase() === "k") {
      y.preventDefault(), T();
      return;
    }
    if (A && y.key.toLowerCase() === "e") {
      y.preventDefault(), _();
      return;
    }
    if (A && y.shiftKey && y.key.toLowerCase() === "x") {
      y.preventDefault(), R("~~", "~~", "tachado");
      return;
    }
    y.key === "Enter" && !y.shiftKey && (y.preventDefault(), (t.trim() || s) && (x(!1), g(!1), n()));
  }, F = (y) => {
    var J;
    const A = (J = y.target.files) == null ? void 0 : J[0];
    A && a(A), y.target.value = "";
  }, U = (y) => {
    var J;
    if (o || d) return;
    const A = (J = y.clipboardData) == null ? void 0 : J.items;
    if (A)
      for (let j = 0; j < A.length; j++) {
        const H = A[j];
        if (H.kind === "file" && H.type.startsWith("image/")) {
          const V = H.getAsFile();
          if (V) {
            y.preventDefault(), a(V);
            return;
          }
        }
      }
  }, me = !t.trim(), te = (y = !1) => B(
    "flex size-6.5 items-center justify-center rounded-lg transition-all cursor-pointer",
    y ? "bg-blue-100 text-blue-700 ring-1 ring-blue-500/30 shadow-2xs dark:bg-blue-950/90 dark:text-blue-300 dark:ring-blue-400/40" : "hover:bg-neutral-100 dark:hover:bg-neutral-700/70 hover:text-neutral-900 dark:hover:text-white"
  );
  return /* @__PURE__ */ e("div", { className: "shrink-0 px-3 pb-3 pt-1 sm:px-4 sm:pb-4", children: /* @__PURE__ */ i("div", { className: "relative", children: [
    s && /* @__PURE__ */ i("div", { className: "mb-2 flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xs dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      s.type.startsWith("image/") ? /* @__PURE__ */ e(
        "img",
        {
          src: M || "",
          alt: "Archivo seleccionado",
          className: "size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
        }
      ) : /* @__PURE__ */ e("div", { className: "flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ e(vr, { className: "size-5" }) }),
      /* @__PURE__ */ e("span", { className: "min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-300 font-medium", children: s.name || "Archivo listo para enviar" }),
      /* @__PURE__ */ e(
        le,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: l,
          className: "size-7 shrink-0 p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          "aria-label": "Quitar archivo",
          children: /* @__PURE__ */ e(qe, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "flex flex-col rounded-2xl border border-neutral-200/80 bg-white/95 backdrop-blur-md shadow-sm transition-all focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:shadow-md dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      m && /* @__PURE__ */ i("div", { className: "flex flex-col border-b border-neutral-200/70 dark:border-neutral-700/70", children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-between gap-1 px-2.5 py-1 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-0.5 overflow-x-auto scrollbar-none", children: [
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: () => R("**", "**", "negrita"),
              disabled: o || d,
              title: "Negrita (Ctrl+B)",
              "aria-label": "Negrita",
              className: te(),
              children: /* @__PURE__ */ e(bn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: () => R("*", "*", "cursiva"),
              disabled: o || d,
              title: "Cursiva (Ctrl+I)",
              "aria-label": "Cursiva",
              className: te(),
              children: /* @__PURE__ */ e(xn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: () => R("<u>", "</u>", "subrayado"),
              disabled: o || d,
              title: "Subrayado (Ctrl+U)",
              "aria-label": "Subrayado",
              className: te(),
              children: /* @__PURE__ */ e(gn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: () => R("~~", "~~", "tachado"),
              disabled: o || d,
              title: "Tachado (Ctrl+Shift+X)",
              "aria-label": "Tachado",
              className: te(),
              children: /* @__PURE__ */ e(vn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: () => E("- "),
              disabled: o || d,
              title: "Lista de viñetas",
              "aria-label": "Lista de viñetas",
              className: te(),
              children: /* @__PURE__ */ e(wn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: () => E("", !0),
              disabled: o || d,
              title: "Lista numerada",
              "aria-label": "Lista numerada",
              className: te(),
              children: /* @__PURE__ */ e(yn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: _,
              disabled: o || d,
              title: "Insertar código (Ctrl+E)",
              "aria-label": "Código",
              className: te(),
              children: /* @__PURE__ */ e(Nn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: T,
              disabled: o || d,
              "aria-pressed": w,
              title: "Insertar enlace Markdown (Ctrl+K)",
              "aria-label": "Insertar enlace",
              className: te(w),
              children: /* @__PURE__ */ e(kn, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ e("span", { className: "mx-0.5 h-3.5 w-px bg-neutral-200 dark:bg-neutral-700" }),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: () => g((y) => !y),
              disabled: me || o || d,
              "aria-pressed": v,
              title: v ? "Ocultar vista previa" : "Vista previa de Markdown",
              "aria-label": "Vista previa",
              className: te(v),
              children: v ? /* @__PURE__ */ e(Cn, { className: "size-3.5" }) : /* @__PURE__ */ e(Sn, { className: "size-3.5" })
            }
          )
        ] }) }),
        w && /* @__PURE__ */ i("div", { className: "flex flex-wrap items-center gap-1.5 border-t border-neutral-200/60 dark:border-neutral-700/60 bg-neutral-50/80 dark:bg-neutral-900/50 px-2.5 py-1.5", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: L,
              onChange: (y) => S(y.target.value),
              placeholder: "Texto del enlace",
              className: "h-6.5 w-28 sm:w-36 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 text-xs text-neutral-800 dark:text-neutral-100 outline-none focus:border-blue-500"
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "url",
              value: C,
              onChange: (y) => z(y.target.value),
              onKeyDown: (y) => {
                y.key === "Enter" && (y.preventDefault(), I());
              },
              placeholder: "https://...",
              className: "h-6.5 min-w-0 flex-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 text-xs text-neutral-800 dark:text-neutral-100 outline-none focus:border-blue-500"
            }
          ),
          /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: I,
              className: "inline-flex h-6.5 items-center gap-1 rounded-lg bg-blue-600 px-2 text-[11px] font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer",
              children: [
                /* @__PURE__ */ e(er, { className: "size-3" }),
                /* @__PURE__ */ e("span", { children: "Insertar" })
              ]
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onMouseDown: (y) => y.preventDefault(),
              onClick: () => x(!1),
              className: "inline-flex size-6.5 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              "aria-label": "Cancelar enlace",
              children: /* @__PURE__ */ e(qe, { className: "size-3.5" })
            }
          )
        ] })
      ] }),
      v && !me && /* @__PURE__ */ i("div", { className: "border-b border-neutral-200/70 dark:border-neutral-700/70 bg-neutral-50/70 dark:bg-neutral-900/40 px-3 py-2", children: [
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
        /* @__PURE__ */ e("div", { className: "max-h-28 overflow-y-auto text-xs", children: /* @__PURE__ */ e(Rt, { content: t }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-1 px-2.5 py-1.5", children: [
        /* @__PURE__ */ i(
          "label",
          {
            className: "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200",
            title: "Adjuntar archivo",
            children: [
              /* @__PURE__ */ e(vr, { className: "size-4" }),
              /* @__PURE__ */ e(
                "input",
                {
                  type: "file",
                  className: "sr-only",
                  onChange: F,
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
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => b((y) => !y),
            disabled: o || d,
            title: "Formato de texto enriquecido (Markdown)",
            "aria-label": "Formato de texto enriquecido",
            className: B(
              "relative flex size-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer",
              m ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
            ),
            children: /* @__PURE__ */ e(zn, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ e("div", { className: "relative min-w-0 flex-1", children: /* @__PURE__ */ e(
          "textarea",
          {
            ref: p,
            value: t,
            onChange: (y) => r(y.target.value),
            onKeyDown: P,
            onPaste: U,
            placeholder: `Responder a ${u}...`,
            disabled: o || d,
            rows: 1,
            "aria-label": `Responder a ${u}`,
            className: "max-h-30 min-h-7 w-full resize-none overflow-y-auto rounded-xl bg-transparent px-2 py-1 text-xs leading-5 text-neutral-800 outline-none placeholder:text-neutral-400 sm:text-sm dark:text-neutral-100 break-words"
          }
        ) }),
        /* @__PURE__ */ e(
          le,
          {
            size: "icon",
            variant: "primary",
            onClick: () => {
              x(!1), g(!1), n();
            },
            disabled: me && !s || o || d,
            className: "size-8 shrink-0 rounded-full p-0",
            "aria-label": "Enviar mensaje",
            title: "Enviar mensaje",
            children: /* @__PURE__ */ e(Ft, { className: "size-4" })
          }
        )
      ] })
    ] })
  ] }) });
}
function Vs({ className: t }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "aria-hidden": "true",
      className: B(
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
function qs({
  open: t,
  onOpenChange: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null,
  queueData: l = null,
  onActionSelect: o,
  isPollingQueue: d = !1,
  onConvertToTicket: u,
  isConvertingToTicket: c = !1
}) {
  const [h, f] = k(""), [p, m] = k(null), b = (w) => {
    !w && (a || c) || (w || (f(""), m(null)), r(w));
  }, v = async (w) => {
    w.preventDefault(), m(null);
    const x = h.trim();
    if (!x) {
      m("Por favor describe el motivo de tu solicitud.");
      return;
    }
    if (x.length < 5) {
      m("Por favor ingresa al menos 5 caracteres para mayor claridad.");
      return;
    }
    await n(x);
  }, g = (l == null ? void 0 : l.action_buttons) ?? [];
  return /* @__PURE__ */ e(Wt, { open: t, onOpenChange: b, children: /* @__PURE__ */ e(Ut, { className: "sm:max-w-md p-0 overflow-hidden", children: l ? /* @__PURE__ */ i("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ e(Pt, { className: "p-4.5 pb-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(at, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(Tt, { className: "text-sm font-bold text-white", children: "En fila de espera" }),
        /* @__PURE__ */ e(Dt, { className: "text-[11px] text-amber-100 mt-0.5", children: "Todos nuestros técnicos se encuentran ocupados en este momento" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-3.5 bg-white dark:bg-neutral-900", children: [
      (l.queue_position != null || l.estimated_wait_minutes != null) && /* @__PURE__ */ i("div", { className: "grid grid-cols-2 gap-2", children: [
        l.queue_position != null && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 px-3 py-2", children: [
          /* @__PURE__ */ e(Lt, { className: "size-4 text-amber-600 dark:text-amber-400 shrink-0" }),
          /* @__PURE__ */ i("div", { children: [
            /* @__PURE__ */ e("p", { className: "text-[10px] text-neutral-500 dark:text-neutral-400 leading-none", children: "Posición en fila" }),
            /* @__PURE__ */ i("p", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5", children: [
              "#",
              l.queue_position
            ] })
          ] })
        ] }),
        l.estimated_wait_minutes != null && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/30 px-3 py-2", children: [
          /* @__PURE__ */ e(at, { className: "size-4 text-amber-600 dark:text-amber-400 shrink-0" }),
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
      l.message && /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/50 p-3 text-xs leading-relaxed text-neutral-700 dark:text-neutral-200", children: /* @__PURE__ */ e(Rt, { content: l.message }) }),
      d && /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-[11px] font-medium text-amber-700 dark:text-amber-300", children: [
        /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin text-amber-600 dark:text-amber-400 shrink-0" }),
        /* @__PURE__ */ e("span", { children: "Esperando en vivo... verificando disponibilidad cada 5s" })
      ] }),
      g.length > 0 ? /* @__PURE__ */ i("div", { className: "space-y-2 pt-1", children: [
        /* @__PURE__ */ e("p", { className: "text-[11px] font-semibold text-neutral-600 dark:text-neutral-400", children: "Selecciona una opción para continuar:" }),
        /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: g.map((w) => {
          var C;
          const x = w.action === "convert_ticket" || w.id === "convert_ticket" || ((C = w.label) == null ? void 0 : C.toLowerCase().includes("crear ticket"));
          return /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              disabled: c,
              onClick: () => {
                if (x && u) {
                  u();
                  return;
                }
                f(""), m(null), o == null || o(w);
              },
              className: "flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 dark:border-violet-800/70 bg-violet-50/60 dark:bg-violet-950/40 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:border-violet-600 px-3.5 py-2.5 text-xs font-semibold text-violet-700 dark:text-violet-300 shadow-2xs transition-all active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
              children: x && c ? /* @__PURE__ */ i(Ce, { children: [
                /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin" }),
                /* @__PURE__ */ e("span", { children: "Creando ticket y cerrando..." })
              ] }) : /* @__PURE__ */ e("span", { children: w.label })
            },
            w.id
          );
        }) })
      ] }) : u ? /* @__PURE__ */ e("div", { className: "pt-1", children: /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          disabled: c,
          onClick: () => {
            u();
          },
          className: "flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 px-3.5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 shadow-2xs transition-all active:scale-98 cursor-pointer disabled:opacity-50",
          children: c ? /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Creando ticket..." })
          ] }) : /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e("span", { children: "📝 Dejar como ticket y cerrar chat" }),
            /* @__PURE__ */ e(_n, { className: "size-3.5" })
          ] })
        }
      ) }) : null
    ] }),
    /* @__PURE__ */ i(Mt, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between", children: [
      /* @__PURE__ */ e("span", { className: "text-[10px] text-neutral-400", children: d ? "Sondeo activo" : "Cola de atención" }),
      /* @__PURE__ */ e(
        le,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          disabled: c,
          onClick: () => b(!1),
          className: "text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer",
          children: "Cerrar"
        }
      )
    ] })
  ] }) : /* @__PURE__ */ i("form", { onSubmit: v, className: "flex flex-col", children: [
    /* @__PURE__ */ e(Pt, { className: "p-4.5 pb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(An, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(Tt, { className: "text-sm font-bold text-white", children: "Hablar con un técnico" }),
        /* @__PURE__ */ e(Dt, { className: "text-[11px] text-blue-100 mt-0.5", children: "Indica el motivo por el cual requieres asistencia especializada" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-3 bg-white dark:bg-neutral-900", children: [
      (p || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/40 p-2.5 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(tr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ e("span", { className: "leading-snug", children: p || s })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200", children: [
          "Motivo de la solicitud ",
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 focus-within:bg-white dark:bg-neutral-900 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ e(
            $t,
            {
              value: h,
              onChange: (w) => {
                f(w.target.value), p && m(null);
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
              h.length,
              "/500"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i(Mt, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ e(
        le,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => b(!1),
          disabled: a,
          className: "text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        le,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || !h.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50",
          children: a ? /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Escalando..." })
          ] }) : /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e("span", { children: "Solicitar técnico" }),
            /* @__PURE__ */ e(Ft, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const Os = {
  1: "Muy insatisfecho",
  2: "Insatisfecho",
  3: "Neutral",
  4: "Satisfecho",
  5: "¡Excelente atención!"
};
function Gs({
  open: t,
  onOpenChange: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null
}) {
  const [l, o] = k(5), [d, u] = k(0), [c, h] = k(""), [f, p] = k(null), m = (g) => {
    !g && !a && (o(5), u(0), h(""), p(null)), r(g);
  }, b = async (g) => {
    if (g.preventDefault(), p(null), l < 1 || l > 5) {
      p("Por favor selecciona una calificación de 1 a 5 estrellas.");
      return;
    }
    await n({
      rating: l,
      comment: c.trim(),
      helpful: !0
    });
  }, v = d || l;
  return /* @__PURE__ */ e(Wt, { open: t, onOpenChange: m, children: /* @__PURE__ */ e(Ut, { className: "sm:max-w-md p-0 overflow-hidden", children: /* @__PURE__ */ i("form", { onSubmit: b, className: "flex flex-col", children: [
    /* @__PURE__ */ e(Pt, { className: "p-4.5 pb-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-white", children: /* @__PURE__ */ e(rt, { className: "size-5" }) }),
      /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e(Tt, { className: "text-sm font-bold text-white", children: "¡Nos alegra haberte ayudado!" }),
        /* @__PURE__ */ e(Dt, { className: "text-[11px] text-emerald-100 mt-0.5", children: "Califica la solución entregada por el asistente para finalizar el caso" })
      ] })
    ] }) }),
    /* @__PURE__ */ i("div", { className: "p-4 space-y-4 bg-white dark:bg-neutral-900", children: [
      (f || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/40 p-2.5 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(tr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ e("span", { className: "leading-snug", children: f || s })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-col items-center justify-center rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 p-3.5 space-y-2", children: [
        /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-neutral-700 dark:text-neutral-200", children: "¿Qué tan útil fue la solución?" }),
        /* @__PURE__ */ e(
          "div",
          {
            className: "flex items-center gap-1.5",
            onMouseLeave: () => u(0),
            children: [1, 2, 3, 4, 5].map((g) => {
              const w = g <= v;
              return /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  disabled: a,
                  onMouseEnter: () => u(g),
                  onClick: () => {
                    o(g), f && p(null);
                  },
                  "aria-label": `Calificar con ${g} ${g === 1 ? "estrella" : "estrellas"}`,
                  className: "p-1 rounded-lg transition-transform hover:scale-110 active:scale-95 focus:outline-none cursor-pointer disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ e(
                    En,
                    {
                      className: B(
                        "size-7 transition-colors",
                        w ? "fill-amber-400 text-amber-400 drop-shadow-2xs" : "fill-transparent text-neutral-300 dark:text-neutral-600"
                      )
                    }
                  )
                },
                g
              );
            })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[11px] font-medium text-amber-600 dark:text-amber-400 min-h-4", children: Os[v] || "" })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200", children: [
          "Comentarios adicionales ",
          /* @__PURE__ */ e("span", { className: "text-neutral-400 font-normal", children: "(opcional)" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 focus-within:bg-white dark:bg-neutral-900 dark:focus-within:bg-neutral-900 focus-within:border-emerald-500 transition-colors", children: [
          /* @__PURE__ */ e(
            $t,
            {
              value: c,
              onChange: (g) => h(g.target.value),
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
    /* @__PURE__ */ i(Mt, { className: "p-3 bg-neutral-50/70 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ e(
        le,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => m(!1),
          disabled: a,
          className: "text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        le,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || l < 1,
          className: "gap-2 h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50",
          children: a ? /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Finalizando..." })
          ] }) : /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e("span", { children: "Enviar y resolver" }),
            /* @__PURE__ */ e(Ft, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
function Ks({
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
  let c = "";
  if (t != null && t.trim()) {
    const p = t.trim().replace(/\/+$/, "");
    p.startsWith("http://") ? c = `ws://${p.slice(7)}` : p.startsWith("https://") ? c = `wss://${p.slice(8)}` : p.startsWith("ws://") || p.startsWith("wss://") ? c = p : c = `${typeof window < "u" && window.location.protocol === "https:" ? "wss://" : "ws://"}${p}`;
  } else if (r != null && r.trim())
    c = `${r.trim().replace(/\/+$/, "").replace(/^https:\/\//i, "wss://").replace(/^http:\/\//i, "ws://")}/messenger_voice/ws/voice/call`;
  else {
    const m = typeof window < "u" && window.location.protocol === "https:" ? "wss:" : "ws:", v = `:${a || 8095}`, g = n.replace(/^https?:\/\//i, "").replace(/^wss?:\/\//i, "").replace(/\/+$/, "");
    c = `${m}//${g}${v}/ws/voice/call`;
  }
  const h = new URLSearchParams();
  s && h.set("session_id", String(s)), o != null && String(o) !== "" && h.set("user_auth_id", String(o)), d != null && String(d) !== "" && h.set("conversation_id", String(d)), l != null && String(l) !== "" && h.set("user_id", String(l)), u != null && String(u) !== "" && h.set("sender_messenger_id", String(u));
  const f = h.toString();
  return f ? `${c}?${f}` : c;
}
const Xs = `
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
function Ys() {
  const t = new Blob([Xs], {
    type: "application/javascript; charset=utf-8"
  });
  return URL.createObjectURL(t);
}
class Qs {
  constructor(r = {}) {
    Ne(this, "inputAudioCtx", null);
    Ne(this, "outputAudioCtx", null);
    Ne(this, "mediaStream", null);
    Ne(this, "analyserNode", null);
    Ne(this, "workletNode", null);
    Ne(this, "scriptProcessor", null);
    Ne(this, "silentGain", null);
    Ne(this, "activeSources", /* @__PURE__ */ new Set());
    Ne(this, "nextPlayTime", 0);
    Ne(this, "isDisposed", !1);
    Ne(this, "isMuted", !1);
    Ne(this, "isDrainingFarewell", !1);
    Ne(this, "latestUserRms", 0);
    Ne(this, "latestBotRms", 0);
    this.options = r;
  }
  getAnalyserNode() {
    return this.analyserNode;
  }
  getLevelsAndDecay() {
    const r = this.isMuted ? 0 : this.latestUserRms, n = this.latestBotRms;
    return this.latestUserRms *= 0.85, this.latestBotRms *= 0.85, { userRms: r, botRms: n };
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
    this.outputAudioCtx && (this.nextPlayTime = this.outputAudioCtx.currentTime);
  }
  /**
   * Inicializa la captura del micrófono a 16,000 Hz Mono Int16 con AnalyserNode para el ecualizador.
   */
  async initMicrophone() {
    var d, u, c;
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
      a.getTracks().forEach((h) => h.stop()), this.mediaStream = null;
      return;
    }
    this.mediaStream = a, a.getAudioTracks().forEach((h) => {
      h.enabled = !this.isMuted;
    });
    const s = this.inputAudioCtx.createMediaStreamSource(this.mediaStream), l = this.inputAudioCtx.createAnalyser();
    l.fftSize = 64, l.smoothingTimeConstant = 0.65, s.connect(l), this.analyserNode = l, (c = (u = this.options).onAnalyserReady) == null || c.call(u, l), this.silentGain = this.inputAudioCtx.createGain(), this.silentGain.gain.value = 0, this.silentGain.connect(this.inputAudioCtx.destination);
    let o = null;
    try {
      if (o = Ys(), await this.inputAudioCtx.audioWorklet.addModule(o), URL.revokeObjectURL(o), o = null, this.isDisposed || !this.inputAudioCtx || this.inputAudioCtx.state === "closed")
        return;
      this.workletNode = new AudioWorkletNode(this.inputAudioCtx, "pcm-capture-processor"), this.workletNode.port.onmessage = (h) => {
        var f, p, m;
        if (((f = h.data) == null ? void 0 : f.type) === "pcm_chunk") {
          const b = h.data.rms || 0, v = Math.min(1, b / 4e3);
          this.latestUserRms = this.isMuted ? 0 : v, !this.isMuted && !this.isDrainingFarewell && ((m = (p = this.options).onPcmChunk) == null || m.call(p, h.data.buffer, v));
        }
      }, s.connect(this.workletNode), this.workletNode.connect(this.silentGain);
    } catch (h) {
      if (o && URL.revokeObjectURL(o), this.isDisposed || !this.inputAudioCtx || this.inputAudioCtx.state === "closed")
        return;
      console.warn("[VoiceAudioEngine] AudioWorklet falló, usando ScriptProcessor fallback:", h), this.initScriptProcessorFallback(s);
    }
  }
  initScriptProcessorFallback(r) {
    if (!this.inputAudioCtx || !this.silentGain) return;
    const n = 4096;
    this.scriptProcessor = this.inputAudioCtx.createScriptProcessor(n, 1, 1);
    const l = this.inputAudioCtx.sampleRate / 16e3, o = 1600, d = new Int16Array(o);
    let u = 0;
    this.scriptProcessor.onaudioprocess = (c) => {
      var p, m;
      const h = c.inputBuffer.getChannelData(0), f = Math.floor(h.length / l);
      for (let b = 0; b < f; b++) {
        const v = h[Math.floor(b * l)], g = Math.max(-1, Math.min(1, v)), w = g < 0 ? g * 32768 : g * 32767;
        if (d[u++] = w, u >= o) {
          let x = 0;
          for (let z = 0; z < o; z++)
            x += d[z] * d[z];
          const C = Math.min(1, Math.sqrt(x / o) / 4e3);
          if (this.latestUserRms = this.isMuted ? 0 : C, !this.isMuted && !this.isDrainingFarewell) {
            const z = new Int16Array(d);
            (m = (p = this.options).onPcmChunk) == null || m.call(p, z.buffer, C);
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
    for (let c = 0; c < n.length; c++)
      a += n[c] * n[c];
    this.latestBotRms = Math.min(1, Math.sqrt(a / n.length) / 8e3);
    const s = new Float32Array(n.length);
    for (let c = 0; c < n.length; c++)
      s[c] = n[c] / 32768;
    const l = this.outputAudioCtx.createBuffer(1, s.length, 24e3);
    l.copyToChannel(s, 0);
    const o = this.outputAudioCtx.createBufferSource();
    o.buffer = l, o.connect(this.outputAudioCtx.destination);
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
    this.inputAudioCtx && this.inputAudioCtx.state !== "closed" && (this.inputAudioCtx.close().catch(() => {
    }), this.inputAudioCtx = null), this.outputAudioCtx && this.outputAudioCtx.state !== "closed" && (this.outputAudioCtx.close().catch(() => {
    }), this.outputAudioCtx = null);
  }
}
class Js {
  constructor(r, n = {}, a = {}) {
    Ne(this, "ws", null);
    Ne(this, "audioEngine");
    Ne(this, "connected", !1);
    Ne(this, "isDisposed", !1);
    Ne(this, "levelIntervalId", null);
    Ne(this, "heartbeatIntervalId", null);
    this.config = r, this.callbacks = n, this.audioEngine = new Qs({
      onAnalyserReady: a.onAnalyserReady,
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
  async start() {
    var l, o, d, u, c, h;
    this.isDisposed = !1;
    const r = Ks(this.config);
    if (await this.audioEngine.initOutput(), this.isDisposed) {
      this.cleanup();
      return;
    }
    try {
      await this.audioEngine.initMicrophone(), (o = (l = this.callbacks).onPermissionChange) == null || o.call(l, !0);
    } catch (f) {
      if (this.isDisposed) return;
      const p = f == null ? void 0 : f.name, b = p === "NotAllowedError" || p === "PermissionDeniedError" ? "Permiso de micrófono denegado. Por favor habilita el acceso al micrófono en tu navegador." : `Error al acceder al micrófono: ${f instanceof Error ? f.message : String(f)}`;
      (u = (d = this.callbacks).onPermissionChange) == null || u.call(d, !1, b), (h = (c = this.callbacks).onError) == null || h.call(c, new Error(b));
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
          var p;
          this.connected && ((p = this.ws) == null ? void 0 : p.readyState) === WebSocket.OPEN && this.ws.send(JSON.stringify({ type: "ping" }));
        }, 2e4);
      }, f.onmessage = (p) => {
        if (typeof p.data == "string")
          try {
            const m = JSON.parse(p.data);
            this.handleJsonEvent(m);
          } catch (m) {
            console.warn("[VoiceCallClient] Error parseando evento JSON:", m);
          }
        else p.data instanceof ArrayBuffer && this.audioEngine.playAudioChunk(p.data);
      }, f.onerror = () => {
        var p, m, b, v;
        if (!this.connected && n < a && !this.isDisposed) {
          n++, (m = (p = this.callbacks).onReconnecting) == null || m.call(p, {
            message: `Reintentando conexión con el gateway de voz (intento ${n}/${a})...`
          }), setTimeout(() => {
            !this.isDisposed && !this.connected && s();
          }, 1500);
          return;
        }
        (v = (b = this.callbacks).onError) == null || v.call(b, new Error("Error de conexión con el servidor de voz."));
      }, f.onclose = () => {
        var p, m;
        !this.connected && n < a && !this.isDisposed || (this.connected = !1, this.cleanup(), (m = (p = this.callbacks).onClose) == null || m.call(p));
      };
    };
    s(), this.levelIntervalId = setInterval(() => {
      var m, b;
      const { userRms: f, botRms: p } = this.audioEngine.getLevelsAndDecay();
      (b = (m = this.callbacks).onLevels) == null || b.call(m, f, p);
    }, 33);
  }
  handleJsonEvent(r) {
    var a, s, l, o, d, u, c, h, f, p, m, b, v, g, w, x, C, z, L, S, M, X, R, E, _, T, I, P, F, U, me, te, y, A, J, j, H, V;
    switch (r.type) {
      case "session.ready":
        (s = (a = this.callbacks).onReady) == null || s.call(a, r), r.caller_context && ((o = (l = this.callbacks).onCallerContext) == null || o.call(l, r.caller_context));
        break;
      case "transcript.user":
        (u = (d = this.callbacks).onTranscriptUser) == null || u.call(d, r.text || "", r.is_final);
        break;
      case "transcript.bot":
        (h = (c = this.callbacks).onTranscriptBot) == null || h.call(c, r.text || "", r.is_final);
        break;
      case "assistant.transcript":
        r.role === "user" ? (p = (f = this.callbacks).onTranscriptUser) == null || p.call(f, r.text || "", r.is_final) : (b = (m = this.callbacks).onTranscriptBot) == null || b.call(m, r.text || "", r.is_final);
        break;
      case "assistant.speaking":
        (g = (v = this.callbacks).onAssistantSpeaking) == null || g.call(v);
        break;
      case "assistant.turn_complete":
        (x = (w = this.callbacks).onTurnComplete) == null || x.call(w);
        break;
      case "article.matched":
        (z = (C = this.callbacks).onArticleMatched) == null || z.call(C, r.article || null);
        break;
      case "tool.state":
        (S = (L = this.callbacks).onToolState) == null || S.call(L, r);
        break;
      case "assistant.image_received":
        (X = (M = this.callbacks).onImageReceived) == null || X.call(M, r);
        break;
      case "guide.sent":
        (E = (R = this.callbacks).onGuideSent) == null || E.call(R, r);
        break;
      case "barge_in":
      case "assistant.interrupted":
        this.audioEngine.stopPlaybackImmediately(), (T = (_ = this.callbacks).onBargeIn) == null || T.call(_);
        break;
      case "call.outcome":
        (P = (I = this.callbacks).onOutcome) == null || P.call(I, r);
        break;
      case "session.reconnecting":
        (U = (F = this.callbacks).onReconnecting) == null || U.call(F, r);
        break;
      case "session.reconnected":
        (te = (me = this.callbacks).onReconnected) == null || te.call(me, r);
        break;
      case "call.closing":
        (A = (y = this.callbacks).onClosing) == null || A.call(y, r), this.audioEngine.waitForAudioPlaybackDrain().then(() => {
          var W;
          if (((W = this.ws) == null ? void 0 : W.readyState) === WebSocket.OPEN)
            return this.hangup({ autoHangup: !0 });
        }).catch((W) => {
          console.warn("[VoiceCallClient] Error en drenado de audio de cierre:", W);
        });
        break;
      case "call.finalized":
        (j = (J = this.callbacks).onFinalized) == null || j.call(J, r);
        break;
      case "call.timeout":
      case "call.idle_timeout":
        (V = (H = this.callbacks).onError) == null || V.call(
          H,
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
  cleanup() {
    this.isDisposed = !0, this.connected = !1, this.levelIntervalId && (clearInterval(this.levelIntervalId), this.levelIntervalId = null), this.heartbeatIntervalId && (clearInterval(this.heartbeatIntervalId), this.heartbeatIntervalId = null), this.audioEngine.dispose(), this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) && (this.ws.close(), this.ws = null);
  }
}
function Zs({
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
  var we, Je;
  const c = Mr(), [h, f] = k("idle"), [p, m] = k("Conectando con el Asistente de Voz..."), [b, v] = k(!1), [g, w] = k(!1), [x, C] = k(0), [z, L] = k(null), [S, M] = k(null), [X, R] = k(null), [E, _] = k(0), [T, I] = k(0), [P, F] = k([]), [U, me] = k(null), [te, y] = k(null), [A, J] = k(null), [j, H] = k(null), [V, W] = k(null), [ge, pe] = k("completed"), [be, Te] = k(null), [he, Be] = k(!1), [De, Me] = k(""), [Re, $e] = k(0), se = q(null), G = q("idle"), We = q(null), ve = q(null), Ue = q(!1), He = q("completed"), $ = q(null), ae = q(d), oe = q(u);
  Q(() => {
    G.current = h;
  }, [h]), Q(() => {
    ae.current = d, oe.current = u, He.current = ge, $.current = V;
  });
  const ne = ze(() => t ? `${r || "call"}_${Date.now()}` : r || "call", [t, r, Re]), N = Y((K, ie = 4500) => {
    H(K), ve.current && clearTimeout(ve.current), ve.current = setTimeout(() => {
      H(null);
    }, ie);
  }, []), O = Y(() => {
    We.current && (clearInterval(We.current), We.current = null);
  }, []), Z = Y(
    (K, ie) => {
      var D, ue, ke;
      if (Ue.current) return;
      Ue.current = !0, O(), (D = se.current) == null || D.cleanup(), se.current = null;
      const ee = K || He.current || "completed", ye = ie !== void 0 ? ie : $.current;
      (ue = oe.current) == null || ue.call(oe, {
        outcome: ee,
        data: ye
      }), (ke = ae.current) == null || ke.call(ae, !1);
    },
    [O]
  );
  Q(() => {
    var ie, ee, ye;
    if (!t) {
      (ie = se.current) == null || ie.cleanup(), se.current = null, O(), f("idle"), w(!1), R(null), _(0), I(0);
      return;
    }
    Ue.current = !1, f("connecting"), G.current = "connecting", m("Conectando con el Asistente de Voz..."), C(0), F([]), me(null), y(null), J(null), H(null), W(null), $.current = null, pe("completed"), He.current = "completed", Te(null), Be(!1), v(!1), w(!1), L(null), M(null);
    const K = new Js(
      {
        wsUrl: o || ((ee = c == null ? void 0 : c.config) == null ? void 0 : ee.voiceWsUrl),
        apiBaseUrl: (ye = c == null ? void 0 : c.config) == null ? void 0 : ye.apiBaseUrl,
        sessionId: ne,
        conversationId: n,
        userId: a,
        userAuthId: s,
        senderMessengerId: l
      },
      {
        onReady: (D) => {
          f("listening"), G.current = "listening", m("Te escucho... Habla con naturalidad."), D.caller_context && me(D.caller_context), O(), We.current = setInterval(() => {
            C((ue) => ue + 1);
          }, 1e3);
        },
        onCallerContext: (D) => {
          me(D);
        },
        onPermissionChange: (D, ue) => {
          L(D), M(D ? null : ue || "Permiso de micrófono no otorgado");
        },
        onTranscriptUser: (D, ue) => {
          G.current !== "escalating" && G.current !== "resolved" && (f("thinking"), G.current = "thinking", m("Procesando consulta..."));
          const ke = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          F((Ae) => {
            if (Ae.length > 0 && Ae[Ae.length - 1].sender === "user") {
              const Ie = [...Ae];
              return Ie[Ie.length - 1] = {
                ...Ie[Ie.length - 1],
                text: D,
                isFinal: ue ?? !0
              }, Ie;
            }
            return [
              ...Ae,
              {
                id: `user-${Date.now()}`,
                sender: "user",
                text: D,
                timestamp: ke,
                isFinal: ue ?? !0
              }
            ];
          });
        },
        onTranscriptBot: (D, ue) => {
          G.current !== "escalating" && G.current !== "resolved" && (f("speaking"), G.current = "speaking", m("Asistente respondiendo..."));
          const ke = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          F((Ae) => {
            if (Ae.length > 0 && Ae[Ae.length - 1].sender === "assistant" && Ae[Ae.length - 1].isFinal !== !0) {
              const Ie = [...Ae];
              return Ie[Ie.length - 1] = {
                ...Ie[Ie.length - 1],
                text: Ie[Ie.length - 1].text + D,
                isFinal: !!ue
              }, Ie;
            }
            return [
              ...Ae,
              {
                id: `bot-${Date.now()}`,
                sender: "assistant",
                text: D,
                timestamp: ke,
                isFinal: !!ue
              }
            ];
          });
        },
        onAssistantSpeaking: () => {
          G.current !== "escalating" && G.current !== "resolved" && (f("speaking"), G.current = "speaking", m("Asistente respondiendo..."));
        },
        onTurnComplete: () => {
          F((D) => {
            if (D.length === 0) return D;
            const ue = D[D.length - 1];
            if (ue.sender === "assistant" && !ue.isFinal) {
              const ke = [...D];
              return ke[ke.length - 1] = { ...ue, isFinal: !0 }, ke;
            }
            return D;
          }), G.current !== "ended" && G.current !== "escalating" && G.current !== "resolved" && (f("listening"), G.current = "listening", m("Te escucho..."));
        },
        onArticleMatched: (D) => {
          y(D);
        },
        onToolState: (D) => {
          J(D.status === "running" ? D : null), D.status === "running" ? D.tool === "search_knowledge_base" ? m("Consultando Base de Conocimiento...") : D.tool === "send_steps_to_chat" ? m("Enviando guía visual al chat...") : D.tool === "append_ticket_note" ? m("Actualizando nota en ticket...") : D.tool === "escalate_to_human" ? (f("escalating"), G.current = "escalating", m("Registrando expediente y escalando a técnico...")) : D.tool === "resolve_voice_session" && (f("resolved"), G.current = "resolved", m("Registrando solución exitosa...")) : D.status === "done" && G.current !== "escalating" && G.current !== "resolved" && (f("speaking"), G.current = "speaking", m("Asistente respondiendo..."));
        },
        onImageReceived: (D) => {
          N(D.message || "Captura analizada por el asistente");
        },
        onGuideSent: () => {
          N("Guía con pasos enviada al chat de Messenger", 5e3);
        },
        onBargeIn: () => {
          f("listening"), G.current = "listening", m("Te escucho...");
        },
        onOutcome: (D) => {
          pe(D.outcome), He.current = D.outcome, D.data && (W(D.data), $.current = D.data), D.outcome.startsWith("escalated") ? (f("escalating"), G.current = "escalating", m("Solicitud transferida. El asistente se está despidiendo...")) : D.outcome === "resolved" && (f("resolved"), G.current = "resolved", m("¡Problema resuelto! El asistente se está despidiendo..."));
        },
        onClosing: () => {
          m("Despidiéndose y finalizando llamada...");
        },
        onReconnecting: (D) => {
          G.current !== "ended" && (f("reconnecting"), G.current = "reconnecting", m((D == null ? void 0 : D.message) || "Estabilizando conexión..."));
        },
        onReconnected: (D) => {
          G.current !== "ended" && (f("listening"), G.current = "listening", m((D == null ? void 0 : D.message) || "Conexión restablecida. Puedes continuar."));
        },
        onFinalized: (D) => {
          O(), Te(D), D.outcome && (pe(D.outcome), He.current = D.outcome), D.finalize && (W(D.finalize), $.current = D.finalize), f("ended"), G.current = "ended", w(!1), m(D.message || "Llamada finalizada.");
        },
        onError: (D) => {
          G.current !== "ended" && (m(D.message), G.current === "connecting" && (f("error"), G.current = "error"));
        },
        onClose: () => {
          G.current !== "ended" && (O(), f("ended"), G.current = "ended", w(!1), m("Llamada terminada"));
        },
        onLevels: (D, ue) => {
          _(D), I(ue);
        }
      },
      {
        onAnalyserReady: (D) => R(D)
      }
    );
    return se.current = K, K.start().catch((D) => {
      se.current === K && (console.error("[useVoiceCall] Error al iniciar cliente:", D), m("No se pudo iniciar la llamada. Verifica el micrófono y la conexión."));
    }), () => {
      K.cleanup(), se.current === K && (se.current = null), O(), ve.current && clearTimeout(ve.current);
    };
  }, [
    t,
    ne,
    n,
    a,
    s,
    l,
    o,
    (we = c == null ? void 0 : c.config) == null ? void 0 : we.voiceWsUrl,
    (Je = c == null ? void 0 : c.config) == null ? void 0 : Je.apiBaseUrl,
    O,
    N
  ]);
  const ce = Y(() => {
    var ie;
    const K = !b;
    v(K), (ie = se.current) == null || ie.setMuted(K);
  }, [b]), xe = Y(() => {
    $e((K) => K + 1);
  }, []), Ee = Y(() => {
    if (z === !1) {
      xe();
      return;
    }
    ce();
  }, [z, xe, ce]), Se = Y(async () => {
    if (Ue.current) return;
    if (G.current === "ended") {
      Z();
      return;
    }
    O(), f("ended"), G.current = "ended", w(!1), m("Llamada finalizada");
    const K = se.current;
    se.current = null;
    try {
      K && await K.hangup({ autoHangup: !1 });
    } catch (ie) {
      console.warn("[useVoiceCall] Error durante hangup:", ie);
    }
  }, [Z, O]), Xe = Y(() => {
    Z();
  }, [Z]);
  Q(() => {
    if (h === "ended") {
      const K = setTimeout(() => {
        Z();
      }, 4500);
      return () => clearTimeout(K);
    }
  }, [h, Z]);
  const et = Y(
    (K) => {
      if (!K) {
        if (G.current === "ended") {
          Z();
          return;
        }
        if (G.current === "connecting" || G.current === "error") {
          Z();
          return;
        }
        w(!0);
        return;
      }
      d(K);
    },
    [Z, d]
  ), st = Y(
    (K) => {
      K == null || K.preventDefault();
      const ie = De.trim();
      if (!ie || !se.current) return;
      se.current.sendTextPrompt(ie);
      const ee = (/* @__PURE__ */ new Date()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      F((ye) => [
        ...ye,
        {
          id: `user-txt-${Date.now()}`,
          sender: "user",
          text: ie,
          timestamp: ee,
          isFinal: !0
        }
      ]), Me("");
    },
    [De]
  ), it = Y(async () => {
    if (!(he || !se.current))
      try {
        Be(!0);
        const K = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: "always" },
          audio: !1
        }), ie = K.getVideoTracks()[0], ee = document.createElement("video");
        ee.srcObject = K, await ee.play();
        const ye = document.createElement("canvas"), D = 1024;
        let ue = ee.videoWidth || 1280, ke = ee.videoHeight || 720;
        if (ue > D || ke > D) {
          const _t = Math.min(D / ue, D / ke);
          ue = Math.round(ue * _t), ke = Math.round(ke * _t);
        }
        ye.width = ue, ye.height = ke;
        const Ae = ye.getContext("2d");
        Ae == null || Ae.drawImage(ee, 0, 0, ue, ke);
        const Ie = ye.toDataURL("image/jpeg", 0.82);
        ie.stop(), K.getTracks().forEach((_t) => _t.stop()), se.current.sendImage(Ie, "image/jpeg"), N("Captura de pantalla enviada al asistente");
      } catch (K) {
        (K == null ? void 0 : K.name) !== "NotAllowedError" && console.warn("[useVoiceCall] Error en captura de pantalla:", K);
      } finally {
        Be(!1);
      }
  }, [he, N]), Ht = Y(
    (K) => {
      var ye;
      const ie = (ye = K.target.files) == null ? void 0 : ye[0];
      if (!ie || !se.current) return;
      const ee = new FileReader();
      ee.onload = (D) => {
        var ke;
        const ue = (ke = D.target) == null ? void 0 : ke.result;
        ue && se.current && (se.current.sendImage(ue, ie.type || "image/jpeg"), N("Foto enviada al asistente"));
      }, ee.readAsDataURL(ie), K.target.value = "";
    },
    [N]
  ), St = ze(() => {
    const K = Math.floor(x / 60), ie = x % 60;
    return `${String(K).padStart(2, "0")}:${String(ie).padStart(2, "0")}`;
  }, [x]), zt = ze(() => {
    var ie, ee, ye, D;
    const K = ((ie = V == null ? void 0 : V.ticket) == null ? void 0 : ie.number) || (V == null ? void 0 : V.ticket_number) || ((ee = be == null ? void 0 : be.finalize) == null ? void 0 : ee.ticket_number) || (U == null ? void 0 : U.ticket_number) || null;
    return {
      sessionId: ne,
      terminalId: (U == null ? void 0 : U.terminal_id) || null,
      ticketNumber: K,
      serviceName: (U == null ? void 0 : U.service_name) || null,
      posLocation: ((ye = U == null ? void 0 : U.user) == null ? void 0 : ye.place_name) || null,
      openTicketsCount: ((D = U == null ? void 0 : U.recent_open_tickets) == null ? void 0 : D.length) || 0
    };
  }, [ne, U, V, be]), lt = h === "ended", de = h === "connecting" || h === "requesting_permission" || h === "idle", Ve = ze(() => b || de || lt || z === !1 ? 0 : E < 0.02 ? 1 : Math.min(8, Math.max(1, Math.round(E * 10) + 1)), [b, de, lt, z, E]);
  return {
    callState: h,
    statusText: p,
    isMuted: b,
    isMinimized: g,
    setIsMinimized: w,
    isEnded: lt,
    isConnecting: de,
    durationSeconds: x,
    formattedDuration: St,
    hasPermission: z,
    micError: S,
    analyserNode: X,
    userRms: E,
    botRms: T,
    activeVUSegments: Ve,
    transcripts: P,
    contextBadges: zt,
    callerContext: U,
    matchedArticle: te,
    activeTool: A,
    noticeBanner: j,
    outcomeType: ge,
    outcomeData: V,
    finalizedData: be,
    isCapturingScreen: he,
    textInput: De,
    setTextInput: Me,
    handleToggleMute: ce,
    handleHeroMicClick: Ee,
    handleHangup: Se,
    handleDismissEndedCall: Xe,
    handleDialogCloseAttempt: et,
    handleSendTextPrompt: st,
    handleCaptureScreen: it,
    handlePhotoUpload: Ht,
    requestMicrophone: xe
  };
}
function ei({
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
        /* @__PURE__ */ e(Oe, { name: "Asistente de Voz SDi", isBot: !0, size: "md" }),
        /* @__PURE__ */ e(
          "span",
          {
            className: B(
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
            /* @__PURE__ */ e(Pe, { className: "size-2.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "CONECTANDO..." })
          ] }) : l ? /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80", children: [
            /* @__PURE__ */ e(Pe, { className: "size-2.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "RECONECTANDO..." })
          ] }) : /* @__PURE__ */ e("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/80", children: "EN VIVO" }),
          s.ticketNumber && !r && !n && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80", children: [
            /* @__PURE__ */ e(rr, { className: "size-2.5 text-amber-500" }),
            /* @__PURE__ */ i("span", { children: [
              "Ticket #",
              s.ticketNumber
            ] })
          ] }),
          s.posLocation && !r && !n && /* @__PURE__ */ i("span", { className: "hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200/80 max-w-44 truncate", children: [
            /* @__PURE__ */ e(Pn, { className: "size-2.5 text-blue-500 shrink-0" }),
            /* @__PURE__ */ e("span", { className: "truncate", children: s.posLocation })
          ] })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-xs text-neutral-400 mt-0.5 truncate", children: n ? "Resumen de atención completada" : r ? "Estableciendo canal telefónico interactivo..." : "Canal telefónico full-duplex de baja latencia" })
      ] })
    ] }),
    !r && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 shrink-0", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-neutral-50/80 px-3 py-1.5 text-xs font-mono font-semibold text-neutral-700 shadow-2xs", children: [
      /* @__PURE__ */ e(at, { className: "size-3.5 text-neutral-500" }),
      /* @__PURE__ */ e("span", { children: a })
    ] }) })
  ] });
}
function ti({
  state: t,
  isMuted: r = !1,
  className: n = "",
  height: a = 72,
  analyserNode: s = null,
  botRms: l = 0,
  hasPermission: o = null
}) {
  const d = q(null), u = q(null), c = q(0), h = q(null), f = q(null), p = q(l);
  Q(() => {
    p.current = l;
  }, [l]), Q(() => {
    const b = d.current;
    if (!b) return;
    const v = b.getContext("2d");
    if (!v) return;
    const g = window.devicePixelRatio || 1, w = b.getBoundingClientRect();
    b.width = w.width * g, b.height = w.height * g, v.scale(g, g);
    const x = w.width, C = w.height, z = C / 2, L = 38, S = 2.5, M = 3, X = L * S + (L - 1) * M, R = Math.max(0, (x - X) / 2);
    (!f.current || f.current.length !== L) && (f.current = new Float32Array(L), f.current.fill(2.5));
    const E = (T, I, P, F) => {
      v.fillStyle = F, v.beginPath(), typeof v.roundRect == "function" ? v.roundRect(T, I, S, P, S / 2) : v.rect(T, I, S, P), v.fill();
    }, _ = () => {
      v.clearRect(0, 0, x, C);
      const T = f.current;
      if (t === "muted" || r || o === !1) {
        const I = "rgba(209, 213, 219, 0.65)";
        for (let P = 0; P < L; P++) {
          T[P] = 2.5;
          const F = R + P * (S + M);
          E(F, z - 1.25, 2.5, I);
        }
      } else if (t === "speaking") {
        const I = p.current;
        c.current += 0.08 + I * 0.1;
        const P = Math.max(4, I * 26), F = I > 0.03 ? "rgba(16, 185, 129, 0.95)" : "rgba(16, 185, 129, 0.55)";
        for (let U = 0; U < L; U++) {
          const me = R + U * (S + M), te = U / (L - 1) * 2 - 1, y = Math.max(0.18, 1 - Math.pow(te, 2)), A = Math.sin(U * 0.42 + c.current) * 0.45 + Math.cos(U * 0.28 - c.current * 0.65) * 0.35 + 0.4, J = Math.max(2.5, P * y * Math.abs(A) * 1.4);
          T[U] += (J - T[U]) * 0.35;
          const j = Math.max(2.5, Math.min(C - 4, T[U]));
          E(me, z - j / 2, j, F);
        }
      } else if ((t === "listening" || t === "connected") && s) {
        (!h.current || h.current.length !== s.frequencyBinCount) && (h.current = new Uint8Array(s.frequencyBinCount));
        const I = h.current;
        s.getByteFrequencyData(I);
        let P = 0;
        for (let te = 0; te < I.length; te++)
          P += I[te];
        const F = P / (I.length * 255), U = F > 0.025, me = U ? "rgba(16, 185, 129, 0.95)" : "rgba(16, 185, 129, 0.45)";
        for (let te = 0; te < L; te++) {
          const y = R + te * (S + M), A = te / (L - 1) * 2 - 1, J = Math.max(0.18, 1 - Math.pow(A, 2)), j = Math.abs(A), H = Math.min(
            I.length - 1,
            Math.floor((1 - j * 0.75) * (I.length * 0.6))
          ), V = I[H] / 255, W = U ? Math.max(2.5, (V * 26 + F * 10) * J * 1.6) : 2.5;
          T[te] += (W - T[te]) * 0.35;
          const ge = Math.max(2.5, Math.min(C - 4, T[te]));
          E(y, z - ge / 2, ge, me);
        }
      } else {
        const I = t === "connecting" || t === "thinking" || t === "reconnecting" ? "rgba(16, 185, 129, 0.4)" : "rgba(209, 213, 219, 0.65)";
        for (let P = 0; P < L; P++) {
          T[P] = 2.5;
          const F = R + P * (S + M);
          E(F, z - 1.25, 2.5, I);
        }
      }
      u.current = requestAnimationFrame(_);
    };
    return _(), () => {
      u.current && cancelAnimationFrame(u.current);
    };
  }, [t, r, s, o]);
  const m = typeof a == "number" ? `${a}px` : a;
  return /* @__PURE__ */ e(
    "canvas",
    {
      ref: d,
      className: `w-full block pointer-events-none ${n}`,
      style: { width: "100%", height: m }
    }
  );
}
function ri({
  callState: t,
  statusText: r,
  isMuted: n,
  hasPermission: a,
  analyserNode: s,
  userRms: l,
  botRms: o,
  activeVUSegments: d,
  activeTool: u,
  onRequestMicrophone: c
}) {
  const h = a === !1, f = t === "speaking", p = t === "thinking" || t === "escalating" || t === "resolved" || (u == null ? void 0 : u.status) === "running", m = h ? "Micrófono bloqueado" : n ? "Micrófono en silencio" : f ? "Asistente hablando..." : p ? "Procesando solicitud..." : l > 0.08 ? "Escuchando tu voz..." : "Te escucho...", b = h ? "Permiso requerido" : n ? "Pulsa para reactivar" : f || p ? r : l > 0.08 ? "Voz detectada en vivo" : "Habla con naturalidad";
  return /* @__PURE__ */ i("div", { className: "mx-5 mt-3 rounded-2xl border border-neutral-200/80 bg-white p-3.5 shadow-2xs flex items-center justify-between gap-3", children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: B("flex flex-col max-w-[145px] sm:max-w-[175px] shrink-0", h && "cursor-pointer"),
        onClick: h ? c : void 0,
        title: h ? "Haz clic para permitir acceso al micrófono" : void 0,
        children: [
          /* @__PURE__ */ e("span", { className: "text-sm font-bold truncate text-neutral-900", children: m }),
          /* @__PURE__ */ e("span", { className: "text-xs text-neutral-500 truncate", children: b })
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 max-w-[180px] sm:max-w-[240px] h-10 flex items-center justify-center", children: /* @__PURE__ */ e(
      ti,
      {
        state: t,
        isMuted: n,
        height: 36,
        analyserNode: s,
        botRms: o,
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
            /* @__PURE__ */ e(nr, { className: "size-3 text-amber-600" }),
            /* @__PURE__ */ e("span", { children: "Sin permiso" })
          ]
        }
      ) : /* @__PURE__ */ i("div", { className: "flex items-center gap-1 text-[11px] font-semibold text-emerald-600", children: [
        /* @__PURE__ */ e(ar, { className: "size-3" }),
        /* @__PURE__ */ e("span", { children: n ? "Micrófono silenciado" : "Micrófono activo" })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-0.5", children: [...Array(8)].map((v, g) => /* @__PURE__ */ e(
        "span",
        {
          className: B(
            "w-1.5 h-2.5 rounded-xs transition-colors duration-75",
            !h && !n && g < d ? "bg-emerald-500" : "bg-neutral-200"
          )
        },
        g
      )) })
    ] })
  ] });
}
function ni({
  transcripts: t,
  matchedArticle: r,
  noticeBanner: n
}) {
  const a = q(null), s = q(!0), l = q(0), [o, d] = k(!0), [u, c] = k(0), h = Y((p = "smooth") => {
    const m = a.current;
    m && (m.scrollTo({
      top: m.scrollHeight,
      behavior: p
    }), s.current = !0, d(!0), c(0));
  }, []), f = Y(() => {
    const p = a.current;
    if (!p) return;
    const b = p.scrollHeight - p.scrollTop - p.clientHeight < 40;
    s.current = b, d(b), b && c(0);
  }, []);
  return Q(() => {
    const p = l.current, m = t.length;
    if (l.current = m, m === 0) {
      c(0), s.current = !0, d(!0);
      return;
    }
    if (s.current) {
      const b = a.current;
      b && (b.scrollTop = b.scrollHeight);
    } else if (m > p)
      c((b) => b + (m - p));
    else {
      const b = t[m - 1];
      b && !b.isFinal && c((v) => v === 0 ? 1 : v);
    }
  }, [t, r, n]), /* @__PURE__ */ i("div", { className: "flex flex-col flex-1 min-h-0", children: [
    (r || n) && /* @__PURE__ */ i("div", { className: "mx-5 mt-2.5 space-y-1.5 shrink-0", children: [
      r && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-3 py-2 text-xs text-blue-900", children: [
        /* @__PURE__ */ e(Tn, { className: "size-3.5 text-blue-600 shrink-0" }),
        /* @__PURE__ */ i("span", { className: "truncate", children: [
          /* @__PURE__ */ e("strong", { className: "font-semibold", children: "Guía aplicada:" }),
          " ",
          r.title
        ] })
      ] }),
      n && /* @__PURE__ */ i("div", { className: "flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-xs text-emerald-800 animate-in fade-in duration-200", children: [
        /* @__PURE__ */ e(rt, { className: "size-3.5 text-emerald-600 shrink-0" }),
        /* @__PURE__ */ e("span", { className: "truncate font-medium", children: n })
      ] })
    ] }),
    t.length > 0 && /* @__PURE__ */ i("div", { className: "relative mx-5 my-3 flex items-center justify-center shrink-0", children: [
      /* @__PURE__ */ e("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ e("div", { className: "w-full border-t border-neutral-100" }) }),
      /* @__PURE__ */ e("span", { className: "relative bg-white px-3 text-[11px] font-medium text-neutral-400", children: "Hoy" })
    ] }),
    /* @__PURE__ */ i("div", { className: "relative flex-1 min-h-[160px] max-h-[250px] flex flex-col", children: [
      /* @__PURE__ */ e(
        "div",
        {
          ref: a,
          onScroll: f,
          className: "flex-1 overflow-y-auto px-5 pb-3 space-y-3 font-sans scroll-smooth",
          children: t.length === 0 ? /* @__PURE__ */ i("div", { className: "flex flex-col items-center justify-center h-full min-h-[150px] text-center py-4 text-neutral-400", children: [
            /* @__PURE__ */ e("p", { className: "text-xs font-medium text-neutral-500", children: "Habla normalmente al micrófono..." }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-400 mt-1 max-w-xs", children: "“Hola, la impresora POS tiene luz roja y no imprime el recibo”" })
          ] }) : t.map((p) => {
            const m = p.sender === "assistant";
            return /* @__PURE__ */ i(
              "div",
              {
                className: m ? "flex items-start gap-2.5 max-w-[90%] animate-in fade-in slide-in-from-bottom-1 duration-200" : "flex items-start justify-end gap-2.5 ml-auto max-w-[85%] animate-in fade-in slide-in-from-bottom-1 duration-200",
                children: [
                  m && /* @__PURE__ */ e(
                    Oe,
                    {
                      name: "Asistente SDi",
                      isBot: !0,
                      size: "sm",
                      className: "mt-0.5 shrink-0"
                    }
                  ),
                  /* @__PURE__ */ i("div", { className: m ? "flex min-w-0 flex-col gap-1" : "flex min-w-0 flex-col gap-1 items-end", children: [
                    /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: m ? "text-xs font-bold text-violet-700 truncate" : "text-xs font-semibold text-neutral-800 truncate",
                          children: m ? "Asistente SDi" : "Tú"
                        }
                      ),
                      m && /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-0.5 rounded-full bg-violet-100 px-1.5 py-0.2 text-[9.5px] font-semibold text-violet-700 border border-violet-200/60 shadow-2xs", children: [
                        /* @__PURE__ */ e(Zt, { className: "size-2.5 text-violet-600" }),
                        /* @__PURE__ */ e("span", { children: "IA" })
                      ] })
                    ] }),
                    /* @__PURE__ */ i(
                      "div",
                      {
                        className: m ? "rounded-2xl rounded-tl-xs bg-gradient-to-b from-violet-50/70 to-white px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed text-neutral-900 border border-violet-200/70 shadow-xs ring-1 ring-violet-500/10" : "rounded-2xl rounded-tr-xs bg-blue-600 px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed text-white shadow-xs",
                        children: [
                          /* @__PURE__ */ e("p", { className: "whitespace-pre-wrap break-words", children: p.text }),
                          /* @__PURE__ */ e(
                            "div",
                            {
                              className: m ? "mt-1 flex items-center justify-end text-[10px] leading-none text-neutral-400" : "mt-1 flex items-center justify-end text-[10px] leading-none text-blue-100/80",
                              children: /* @__PURE__ */ e("span", { children: p.timestamp })
                            }
                          )
                        ]
                      }
                    )
                  ] })
                ]
              },
              p.id
            );
          })
        }
      ),
      !o && t.length > 0 && /* @__PURE__ */ e("div", { className: "pointer-events-none absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-bottom-2 duration-200", children: u > 0 ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => h("smooth"),
          "aria-label": `${u} mensaje${u > 1 ? "s" : ""} nuevo${u > 1 ? "s" : ""}, ir al final`,
          className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-[11px] font-semibold shadow-lg ring-2 ring-white transition-all active:scale-95 cursor-pointer",
          children: [
            /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-emerald-300 animate-ping" }),
            /* @__PURE__ */ e("span", { children: u === 1 ? "Nuevo mensaje" : `${u > 99 ? "99+" : u} mensajes nuevos` }),
            /* @__PURE__ */ e(Kt, { className: "size-3.5 animate-bounce" })
          ]
        }
      ) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => h("smooth"),
          title: "Ir a los mensajes recientes",
          "aria-label": "Ir a los mensajes recientes",
          className: "pointer-events-auto flex items-center gap-1 rounded-full bg-white/95 hover:bg-neutral-50 text-blue-600 border border-blue-200/80 px-3 py-1.5 text-[11px] font-semibold shadow-md backdrop-blur-xs transition-all active:scale-95 cursor-pointer",
          children: [
            /* @__PURE__ */ e(Kt, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Bajar" })
          ]
        }
      ) })
    ] })
  ] });
}
function ai({
  isMuted: t,
  hasPermission: r,
  userRms: n,
  textInput: a,
  isCapturingScreen: s = !1,
  onTextInputChange: l,
  onSendTextPrompt: o,
  onCaptureScreen: d,
  onPhotoUpload: u,
  onHeroMicClick: c,
  onMinimize: h,
  onHangup: f
}) {
  const p = q(null), m = r === !1;
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
                var b;
                return (b = p.current) == null ? void 0 : b.click();
              },
              title: "Subir foto de la terminal o error",
              "aria-label": "Subir foto",
              className: "flex size-8 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100 hover:text-violet-600 transition-colors shrink-0 cursor-pointer",
              children: /* @__PURE__ */ e(Dn, { className: "size-4" })
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
              children: s ? /* @__PURE__ */ e(Pe, { className: "size-4 animate-spin text-violet-600" }) : /* @__PURE__ */ e(Mn, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              ref: p,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: u
            }
          ),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: a,
              onChange: (b) => l(b.target.value),
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
            onClick: h,
            title: "Minimizar llamada",
            "aria-label": "Minimizar llamada",
            className: "flex size-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer active:scale-95",
            children: /* @__PURE__ */ e(Rn, { className: "size-4.5" })
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
            title: m ? "Permiso de micrófono no otorgado. Haz clic para solicitar permiso" : t ? "Micrófono silenciado (clic para activar)" : "Micrófono activo (clic para silenciar)",
            "aria-label": m ? "Sin permiso" : t ? "Micrófono silenciado" : "Micrófono activo",
            className: B(
              "flex size-13 items-center justify-center rounded-full border transition-all cursor-pointer active:scale-95",
              m ? "bg-neutral-100 text-amber-600 border-amber-200 hover:bg-neutral-200/60" : t ? "bg-neutral-100 text-neutral-400 border-neutral-200 hover:bg-neutral-200/70 hover:text-neutral-600" : n > 0.08 ? "bg-neutral-900 text-white border-neutral-900 scale-[1.03]" : "bg-neutral-800 text-white border-neutral-800 hover:bg-neutral-900"
            ),
            children: m || t ? /* @__PURE__ */ e(nr, { className: "size-5.5" }) : /* @__PURE__ */ e(ar, { className: "size-5.5" })
          }
        ),
        /* @__PURE__ */ e(
          "span",
          {
            className: B(
              "text-[10px] font-medium leading-none",
              m ? "text-amber-600" : t ? "text-neutral-400" : "text-neutral-600"
            ),
            children: m ? "Sin permiso" : t ? "Silenciado" : "Activo"
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
            children: /* @__PURE__ */ e(sr, { className: "size-4.5" })
          }
        ),
        /* @__PURE__ */ e("span", { className: "text-[10px] font-medium leading-none text-neutral-400", children: "Finalizar" })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "pb-3.5 pt-0.5 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium", children: [
      /* @__PURE__ */ e(Bt, { className: "size-3.5 text-neutral-400" }),
      /* @__PURE__ */ e("span", { children: "Conversación segura y encriptada" })
    ] })
  ] });
}
function si({ statusText: t, onCancel: r }) {
  return /* @__PURE__ */ i("div", { className: "flex flex-col flex-1", children: [
    /* @__PURE__ */ i("div", { className: "flex flex-1 flex-col items-center justify-center text-center p-8 min-h-[300px]", children: [
      /* @__PURE__ */ i("div", { className: "relative mb-5", children: [
        /* @__PURE__ */ e(Oe, { name: "Asistente SDi", isBot: !0, size: "xl", className: "shadow-xl" }),
        /* @__PURE__ */ e("span", { className: "absolute inset-0 rounded-full bg-blue-500/15 animate-ping" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2 text-sm font-bold text-neutral-800", children: [
        /* @__PURE__ */ e(Pe, { className: "size-4 animate-spin text-blue-600" }),
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
          /* @__PURE__ */ e(sr, { className: "size-3.5" }),
          /* @__PURE__ */ e("span", { children: "Cancelar llamada" })
        ]
      }
    ) })
  ] });
}
function ii({
  formattedDuration: t,
  transcriptsCount: r,
  outcomeType: n,
  contextBadges: a,
  onClose: s
}) {
  const l = n.startsWith("escalated");
  return /* @__PURE__ */ i("div", { className: "flex flex-1 flex-col items-center justify-center text-center p-8 min-h-[350px] animate-in fade-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ i("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ e("div", { className: "flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-md", children: /* @__PURE__ */ e(rt, { className: "size-8 text-emerald-600" }) }),
      /* @__PURE__ */ e("span", { className: "absolute inset-0 rounded-full bg-emerald-500/15 animate-ping" })
    ] }),
    /* @__PURE__ */ e("h3", { className: "text-lg font-bold text-neutral-900", children: "Llamada finalizada" }),
    /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed", children: l ? "Tu caso ha sido escalado con un especialista. La transcripción y el ticket han quedado registrados." : n === "resolved" ? "¡Caso resuelto con éxito! La atención con el Asistente Virtual SDi ha concluido." : "Gracias por comunicarte. La atención con el Asistente Virtual SDi ha concluido con éxito." }),
    /* @__PURE__ */ i("div", { className: "mt-5 flex items-center justify-center gap-2 flex-wrap max-w-sm", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-neutral-700 shadow-2xs font-medium", children: [
        /* @__PURE__ */ e(at, { className: "size-3.5 text-neutral-500" }),
        /* @__PURE__ */ i("span", { children: [
          "Duración: ",
          /* @__PURE__ */ e("strong", { className: "font-mono text-neutral-900", children: t })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-1.5 text-xs text-neutral-700 shadow-2xs font-medium", children: [
        /* @__PURE__ */ e(Qt, { className: "size-3.5 text-violet-600" }),
        /* @__PURE__ */ i("span", { children: [
          /* @__PURE__ */ e("strong", { className: "text-neutral-900", children: r }),
          " intervenciones"
        ] })
      ] }),
      a.ticketNumber && /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-1.5 text-xs text-amber-700 shadow-2xs font-medium", children: [
        /* @__PURE__ */ e(rr, { className: "size-3.5 text-amber-600" }),
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
      le,
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
function li({
  visible: t,
  callState: r,
  formattedDuration: n,
  isMuted: a,
  hasPermission: s,
  onToggleMute: l,
  onMaximize: o,
  onHangup: d
}) {
  return !t || typeof window > "u" ? null : or(
    /* @__PURE__ */ i("div", { className: "sdi-messenger-root fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2 pl-3 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-w-[95vw]", children: [
      /* @__PURE__ */ i("div", { className: "relative shrink-0", children: [
        /* @__PURE__ */ e(Oe, { name: "Asistente de Voz SDi", isBot: !0, size: "sm" }),
        /* @__PURE__ */ e(
          "span",
          {
            className: B(
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
            className: B(
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
            onClick: l,
            title: a ? "Activar micrófono" : "Silenciar micrófono",
            className: B(
              "size-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs",
              a ? "bg-amber-500 text-white" : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
            ),
            children: a ? /* @__PURE__ */ e(nr, { className: "size-3.5" }) : /* @__PURE__ */ e(ar, { className: "size-3.5" })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: o,
            title: "Maximizar llamada",
            className: "size-8 rounded-full flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all cursor-pointer shadow-2xs",
            children: /* @__PURE__ */ e(jn, { className: "size-3.5" })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            type: "button",
            onClick: d,
            title: "Finalizar llamada",
            className: "size-8 rounded-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white shadow-xs cursor-pointer active:scale-95 transition-all",
            children: /* @__PURE__ */ e(sr, { className: "size-3.5" })
          }
        )
      ] })
    ] }),
    document.body
  );
}
function oi({
  open: t,
  onOpenChange: r,
  sessionId: n,
  conversationId: a,
  userId: s,
  userAuthId: l,
  senderMessengerId: o,
  wsUrl: d,
  onCallEnded: u
}) {
  const c = Zs({
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
  return t ? /* @__PURE__ */ i(Ce, { children: [
    /* @__PURE__ */ e(Wt, { open: t && !c.isMinimized, onOpenChange: c.handleDialogCloseAttempt, children: /* @__PURE__ */ i(
      Ut,
      {
        showClose: !1,
        className: "sm:max-w-xl w-full p-0 flex flex-col overflow-hidden bg-white text-neutral-900 border border-neutral-200 shadow-2xl rounded-3xl",
        children: [
          /* @__PURE__ */ e(
            ei,
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
            ii,
            {
              formattedDuration: c.formattedDuration,
              transcriptsCount: c.transcripts.length,
              outcomeType: c.outcomeType,
              contextBadges: c.contextBadges,
              onClose: c.handleDismissEndedCall
            }
          ) : c.isConnecting ? /* @__PURE__ */ e(
            si,
            {
              statusText: c.statusText,
              onCancel: c.handleHangup
            }
          ) : /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e(
              ri,
              {
                callState: c.callState,
                statusText: c.statusText,
                isMuted: c.isMuted,
                hasPermission: c.hasPermission,
                analyserNode: c.analyserNode,
                userRms: c.userRms,
                botRms: c.botRms,
                activeVUSegments: c.activeVUSegments,
                activeTool: c.activeTool,
                onRequestMicrophone: c.requestMicrophone
              }
            ),
            /* @__PURE__ */ e(
              ni,
              {
                transcripts: c.transcripts,
                matchedArticle: c.matchedArticle,
                noticeBanner: c.noticeBanner
              }
            ),
            /* @__PURE__ */ e(
              ai,
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
      li,
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
function ci({
  conversation: t,
  onToggleContextPanel: r,
  isContextPanelOpen: n = !0,
  onBack: a,
  alwaysShowBackButton: s = !1,
  onCloseSuccess: l,
  onEscalateSuccess: o,
  onResolveSuccess: d,
  showHeader: u = !0,
  showWallpaper: c = !0,
  readOnly: h = !1,
  readOnlyMessage: f,
  showComposer: p = !0,
  renderOptions: m
}) {
  var se, G, We, ve, Ue, He;
  const [b, v] = k(!1), [g, w] = k(!1), [x, C] = k(!1), [z, L] = k(null), [S, M] = k(!1), [X, R] = k(!1), {
    mutateAsync: E,
    isLoading: _,
    error: T
  } = Ps(), {
    mutateAsync: I,
    isLoading: P,
    error: F
  } = Ts(), {
    mutateAsync: U,
    isLoading: me
  } = Ms(), te = () => {
    var ae, oe, ne;
    let $ = Rr(t.id);
    if (!$)
      for (let N = A.messages.length - 1; N >= 0; N--) {
        const O = A.messages[N];
        if (Array.isArray(O == null ? void 0 : O.messages)) {
          for (let Z = O.messages.length - 1; Z >= 0; Z--) {
            const ce = (ne = (oe = (ae = O.messages[Z]) == null ? void 0 : ae.attributes) == null ? void 0 : oe.metadata) == null ? void 0 : ne.session_uuid;
            if (ce) {
              $ = String(ce);
              break;
            }
          }
          if ($) break;
        }
      }
    return $ || "";
  }, y = ze(() => b && S ? String((z == null ? void 0 : z.session_uuid) || te()) : null, [b, S, z == null ? void 0 : z.session_uuid]);
  Ds({
    sessionId: y,
    enabled: !!y,
    intervalMs: 5e3,
    onStatusUpdate: ($) => {
      L((ae) => ({
        ...ae,
        ...$
      }));
    },
    onAssigned: ($) => {
      M(!1), v(!1), L(null), fe.success(
        $.message || ($.technician ? `Asignado con ${$.technician.name}` : "Asignación completada")
      ), o == null || o($);
    }
  });
  const A = ws(t, {
    onCloseSuccess: () => {
      l == null || l(), a == null || a();
    }
  });
  Q(() => {
    C(!1);
  }, [t.id]);
  const [J, j] = k(!1), H = q(0), V = A.isClosed || x, W = h || V || A.isSending || A.isUploading, ge = ($) => {
    if ($.preventDefault(), $.stopPropagation(), W) return;
    $.dataTransfer.types && Array.from($.dataTransfer.types).includes("Files") && (H.current += 1, j(!0));
  }, pe = ($) => {
    $.preventDefault(), $.stopPropagation(), !W && ($.dataTransfer.dropEffect = "copy");
  }, be = ($) => {
    $.preventDefault(), $.stopPropagation(), H.current -= 1, H.current <= 0 && (H.current = 0, j(!1));
  }, Te = ($) => {
    if ($.preventDefault(), $.stopPropagation(), H.current = 0, j(!1), W) return;
    const ae = $.dataTransfer.files;
    if (ae && ae.length > 0) {
      const oe = ae[0];
      oe.type.startsWith("image/") && A.handleSelectFile(oe);
    }
  }, he = ($) => {
    var oe;
    if (W) return;
    const ae = (oe = $.clipboardData) == null ? void 0 : oe.items;
    if (ae)
      for (let ne = 0; ne < ae.length; ne++) {
        const N = ae[ne];
        if (N.kind === "file" && N.type.startsWith("image/")) {
          const O = N.getAsFile();
          if (O) {
            $.preventDefault(), A.handleSelectFile(O);
            return;
          }
        }
      }
  }, Be = ze(
    () => ({
      conversation: t,
      isClosed: V,
      isClosing: A.isClosing,
      handleCloseConversation: A.handleCloseConversation
    }),
    [t, V, A.isClosing, A.handleCloseConversation]
  );
  Q(() => (ut.set(t), () => {
    ut.set(null);
  }), [t]);
  const De = ($) => {
    if ($.action === "escalate" || $.id === "escalate") {
      L(null), M(!1), v(!0);
      return;
    }
    if ($.action === "poll_queue" || $.id === "poll_queue") {
      M(!0), fe.info("Consultando disponibilidad en vivo cada 5 segundos...");
      return;
    }
    if ($.action === "convert_ticket" || $.id === "convert_ticket") {
      Re();
      return;
    }
    const ae = ($.label || "").toLowerCase();
    if ($.action === "resolve" || $.id === "resolve" || $.action === "resolved" || $.id === "resolved" || $.action === "confirm_solution" || $.id === "confirm_solution" || ae.includes("solucionó mi problema") || ae.includes("soluciono mi problema")) {
      w(!0);
      return;
    }
    A.handleSendMessage($.label || $.action);
  }, Me = async ($) => {
    var ae, oe;
    try {
      const ne = te(), N = await E({
        session_id: ne,
        reason: $
      });
      N != null && N.session_uuid && mr(t.id, String(N.session_uuid)), N != null && N.conversation_id ? (v(!1), L(null), M(!1), fe.success(
        N.message || (N.technician ? `Asistencia iniciada con ${N.technician.name}` : "Conversación con técnico iniciada"),
        N.ticket ? {
          description: `Ticket #${N.ticket.number || N.ticket.id}`
        } : void 0
      )) : (N == null ? void 0 : N.status) === "in_queue" || N != null && N.message && !(N != null && N.ticket) ? (L(N), M(!0)) : (v(!1), L(null), M(!1), N != null && N.ticket && fe.info(N.message || "Ticket de soporte registrado", {
        description: `Ticket #${N.ticket.number || N.ticket.id}`
      })), o == null || o(N);
    } catch (ne) {
      const N = ((oe = (ae = ne == null ? void 0 : ne.response) == null ? void 0 : ae.data) == null ? void 0 : oe.message) || (ne == null ? void 0 : ne.message) || "Error al procesar la solicitud con el técnico";
      fe.error(N);
    }
  }, Re = async () => {
    var $, ae;
    try {
      const oe = te(), ne = await U({
        session_id: oe
      });
      yt(t.id), v(!1), L(null), M(!1), C(!0), fe.success(
        (ne == null ? void 0 : ne.message) || "Se ha creado el ticket de soporte y se ha cerrado el chat.",
        ne != null && ne.ticket ? {
          description: `Ticket #${ne.ticket.number || ne.ticket.id}`
        } : void 0
      );
    } catch (oe) {
      const ne = ((ae = ($ = oe == null ? void 0 : oe.response) == null ? void 0 : $.data) == null ? void 0 : ae.message) || (oe == null ? void 0 : oe.message) || "Error al convertir en ticket";
      fe.error(ne);
    }
  }, $e = async ({
    rating: $,
    comment: ae,
    helpful: oe
  }) => {
    var ne, N;
    try {
      const O = te(), Z = await I({
        session_id: O,
        helpful: oe,
        comment: ae,
        rating: $
      });
      yt(t.id), w(!1), C(!0), fe.success(
        (Z == null ? void 0 : Z.message) || "¡Gracias por tu calificación! El caso ha sido marcado como resuelto.",
        Z != null && Z.ticket ? {
          description: `Ticket #${Z.ticket.number || Z.ticket.id}`
        } : void 0
      ), d == null || d(Z);
    } catch (O) {
      const Z = ((N = (ne = O == null ? void 0 : O.response) == null ? void 0 : ne.data) == null ? void 0 : N.message) || (O == null ? void 0 : O.message) || "Error al finalizar y calificar la atención";
      fe.error(Z);
    }
  };
  return /* @__PURE__ */ i(oa, { value: Be, children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: "sdi-messenger-root relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        onDragEnter: ge,
        onDragOver: pe,
        onDragLeave: be,
        onDrop: Te,
        onPaste: he,
        children: [
          u && /* @__PURE__ */ e(
            js,
            {
              conversation: t,
              isClosed: V,
              isClosing: A.isClosing,
              onCloseConversation: A.handleCloseConversation,
              isContextPanelOpen: n,
              onToggleContextPanel: r,
              onBack: a,
              alwaysShowBackButton: s,
              renderOptions: m,
              onStartVoiceCall: () => R(!0)
            }
          ),
          /* @__PURE__ */ i("div", { className: "relative flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[#f4f6f8]/70 dark:bg-[#0a0f1d]", children: [
            c && /* @__PURE__ */ e(Vs, {}),
            J && /* @__PURE__ */ e("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xs border-2 border-dashed border-blue-500/70 dark:border-blue-400/70 rounded-2xl m-2 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95", children: /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-xl border border-blue-500/20 text-center max-w-xs mx-4", children: [
              /* @__PURE__ */ e("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-inner", children: /* @__PURE__ */ e(Ln, { className: "size-7 animate-bounce" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("p", { className: "text-sm font-semibold text-neutral-800 dark:text-neutral-100", children: "Suelta tu imagen aquí" }),
                /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Se adjuntará para que puedas enviarla" })
              ] })
            ] }) }),
            /* @__PURE__ */ e(
              Us,
              {
                conversation: t,
                messages: A.messages,
                optimisticMessages: A.optimisticMessages,
                scrollRef: A.scrollRef,
                isFetchingNextPage: A.isFetchingNextPage,
                hasNextPage: A.hasNextPage,
                isLoading: A.isLoading,
                isNearBottom: A.isNearBottom,
                newMessagesCount: A.newMessagesCount,
                visibleDate: A.visibleDate,
                disableActions: W || _ || P,
                onScrollToBottom: A.scrollToBottom,
                onActionClick: De
              }
            ),
            A.typingUser && !h && /* @__PURE__ */ i("div", { className: "relative z-10 flex shrink-0 items-center gap-1.5 px-4 py-1 text-xs text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-150", children: [
              /* @__PURE__ */ i("span", { className: "font-medium", children: [
                A.typingUser,
                " está escribiendo"
              ] }),
              /* @__PURE__ */ i("span", { className: "inline-flex gap-0.5", "aria-hidden": "true", children: [
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse" }),
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-75" }),
                /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-150" })
              ] })
            ] }),
            p && /* @__PURE__ */ e("div", { className: "relative z-10 w-full", children: /* @__PURE__ */ e(
              Hs,
              {
                inputText: A.inputText,
                setInputText: A.setInputText,
                onSendMessage: A.handleSendMessage,
                onSelectFile: A.handleSelectFile,
                pendingFile: A.pendingFile,
                onRemoveFile: () => A.setPendingFile(null),
                isSending: A.isSending,
                isUploading: A.isUploading,
                conversationName: A.conversationName,
                isClosed: V,
                readOnly: h,
                readOnlyMessage: f
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ e(
      qs,
      {
        open: b,
        onOpenChange: ($) => {
          v($), $ || (L(null), M(!1));
        },
        onSubmit: Me,
        isSubmitting: _,
        queueData: z,
        isPollingQueue: S,
        onConvertToTicket: Re,
        isConvertingToTicket: me,
        onActionSelect: ($) => {
          v(!1), L(null), De($);
        },
        error: ((G = (se = T == null ? void 0 : T.response) == null ? void 0 : se.data) == null ? void 0 : G.message) || (T == null ? void 0 : T.message)
      }
    ),
    /* @__PURE__ */ e(
      Gs,
      {
        open: g,
        onOpenChange: w,
        onSubmit: $e,
        isSubmitting: P,
        error: ((ve = (We = F == null ? void 0 : F.response) == null ? void 0 : We.data) == null ? void 0 : ve.message) || (F == null ? void 0 : F.message)
      }
    ),
    /* @__PURE__ */ e(
      oi,
      {
        open: X,
        onOpenChange: R,
        sessionId: `${t.id}`,
        conversationId: t.id,
        userId: A.currentUserId || "",
        userAuthId: ((He = (Ue = A.currentUser) == null ? void 0 : Ue.attributes) == null ? void 0 : He.user_auth_id) || "",
        senderMessengerId: A.currentUserId || "",
        onCallEnded: ($) => {
          var ae;
          $.outcome === "escalated_live" && ((ae = $.data) != null && ae.conversation_id) && fe.success("Tu llamada ha sido transferida a un técnico de soporte."), A.refetchMessages();
        }
      }
    )
  ] });
}
function di({
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
        /* @__PURE__ */ e(Bt, { className: "size-4 text-emerald-600 dark:text-emerald-400" }),
        /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-800 dark:text-neutral-200", children: "Solicitud Registrada" })
      ] }),
      s && /* @__PURE__ */ e(
        le,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: s,
          className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          children: /* @__PURE__ */ e(qe, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4", children: [
      /* @__PURE__ */ i("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ e("div", { className: "size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(at, { className: "size-7" }) }),
        /* @__PURE__ */ e("div", { className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ e(rt, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "Ticket de Soporte Creado" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed", children: t })
      ] }),
      r && /* @__PURE__ */ i("div", { className: "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200", children: [
            /* @__PURE__ */ e(rr, { className: "size-3.5 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ i("span", { children: [
              "Ticket #",
              o
            ] })
          ] }),
          /* @__PURE__ */ e(Ze, { variant: "outline", className: "text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", children: r.status === "created" ? "Registrado" : r.status })
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
        le,
        {
          type: "button",
          variant: "secondary",
          size: "sm",
          onClick: n,
          className: "flex-1 gap-1.5 text-xs font-medium cursor-pointer",
          children: [
            /* @__PURE__ */ e(Fn, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Nueva Consulta" })
          ]
        }
      ),
      l && a && /* @__PURE__ */ i(
        le,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: a,
          className: "flex-1 gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
          children: [
            /* @__PURE__ */ e(ir, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Ver mis chats" })
          ]
        }
      )
    ] })
  ] });
}
function Qr(t, r = 300) {
  const [n, a] = k(t);
  return Q(() => {
    const s = setTimeout(() => {
      a(t);
    }, r);
    return () => {
      clearTimeout(s);
    };
  }, [t, r]), n;
}
function xr(t) {
  var T;
  const {
    queryKey: r,
    queryFn: n,
    enabled: a = !0,
    initialData: s,
    placeholderData: l,
    keepPreviousData: o = !1,
    onSuccess: d,
    onError: u
  } = t, [c, h] = k(() => s !== void 0 ? s : typeof l == "function" ? l(void 0) : l), [f, p] = k(null), [m, b] = k(() => a && c === void 0), [v, g] = k(() => c !== void 0), [w, x] = k(!1), C = q(n);
  C.current = n;
  const z = q(d);
  z.current = d;
  const L = q(u);
  L.current = u;
  const S = q(0), M = q(!0), X = JSON.stringify(r), R = Y(async () => {
    var P, F;
    const I = ++S.current;
    b(!0), x(!1), p(null);
    try {
      const U = await C.current();
      return I === S.current && (h(U), g(!0), x(!1), p(null), b(!1), (P = z.current) == null || P.call(z, U)), U;
    } catch (U) {
      if (I === S.current) {
        const me = U;
        p(me), x(!0), g(!1), b(!1), (F = L.current) == null || F.call(L, me);
      }
      return;
    }
  }, []);
  Q(() => {
    if (!a) {
      b(!1);
      return;
    }
    M.current || (l !== void 0 ? h(
      typeof l == "function" ? (I) => l(I) : l
    ) : o || h(void 0)), M.current = !1, R();
  }, [a, X, o]);
  const E = ((T = f == null ? void 0 : f.response) == null ? void 0 : T.data) ?? (f == null ? void 0 : f.data) ?? {}, _ = a && m && c === void 0;
  return {
    data: c,
    error: f,
    errors: E,
    isLoading: _,
    isPending: _,
    isFetching: m,
    isSuccess: v,
    isError: w,
    refetch: R,
    setData: h
  };
}
const ui = (t) => {
  var a, s, l, o, d;
  const r = (t == null ? void 0 : t.params) ?? {}, n = xr({
    queryKey: ["list-chat-users", r],
    queryFn: () => Jn(r),
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
}, Jr = () => {
  const t = Y(async (r) => {
    var s;
    const n = await aa(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    return typeof window < "u" && a && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversation: a }
      })
    ), a;
  }, []);
  return Qe(
    t
  );
};
function mi({
  open: t,
  onOpenChange: r,
  onSuccess: n
}) {
  const { currentUserId: a } = Ge(), [s, l] = k("direct"), [o, d] = k(""), u = Qr(o, 300), [c, h] = k(null), [f, p] = k([]), [m, b] = k(""), { data: v, isLoading: g } = ui({
    enable: t,
    params: {
      sort: "name",
      paginate: "false",
      ...u.trim() ? { filter: { name: u.trim() } } : {}
    }
  }), { mutateAsync: w, isLoading: x } = Jr(), C = ze(() => (v || []).filter((E) => String(E.id) !== String(a)), [v, a]), z = (E) => {
    p((_) => _.some((I) => I.id === E.id) ? _.filter((I) => I.id !== E.id) : [..._, E]);
  }, L = (E) => {
    p((_) => _.filter((T) => T.id !== E));
  }, S = () => {
    h(null), p([]), b(""), d(""), l("direct");
  }, M = (E) => {
    E || S(), r(E);
  }, X = async (E) => {
    var _, T, I, P;
    if (E.preventDefault(), s === "direct") {
      if (!c) {
        fe.warning("Por favor, selecciona un usuario para iniciar la conversación.");
        return;
      }
      try {
        const F = await w({
          type: "direct",
          user_id: Number(c),
          sender_id: Number(a)
        });
        fe.success("Conversación iniciada correctamente"), M(!1), n && F && n(F);
      } catch (F) {
        const U = ((T = (_ = F == null ? void 0 : F.response) == null ? void 0 : _.data) == null ? void 0 : T.message) || (F == null ? void 0 : F.message) || "Error al iniciar la conversación";
        fe.error(U);
      }
    } else {
      if (!m.trim()) {
        fe.warning("Por favor, ingresa el nombre del grupo.");
        return;
      }
      if (f.length === 0) {
        fe.warning("Por favor, selecciona al menos un participante para el grupo.");
        return;
      }
      try {
        const F = await w({
          type: "group",
          name: m.trim(),
          user_ids: f.map((U) => Number(U.id)),
          sender_id: Number(a)
        });
        fe.success("Grupo creado correctamente"), M(!1), n && F && n(F);
      } catch (F) {
        const U = ((P = (I = F == null ? void 0 : F.response) == null ? void 0 : I.data) == null ? void 0 : P.message) || (F == null ? void 0 : F.message) || "Error al crear el grupo";
        fe.error(U);
      }
    }
  }, R = x || s === "direct" && !c || s === "group" && (!m.trim() || f.length === 0);
  return /* @__PURE__ */ e(Wt, { open: t, onOpenChange: M, children: /* @__PURE__ */ e(Ut, { className: "sm:max-w-[480px]", children: /* @__PURE__ */ i("form", { onSubmit: X, className: "flex flex-col", children: [
    /* @__PURE__ */ i(Pt, { children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ e(wt, { className: "size-5" }) }),
        /* @__PURE__ */ i("div", { className: "text-left pr-6", children: [
          /* @__PURE__ */ e(Tt, { children: "Nueva Conversación" }),
          /* @__PURE__ */ e(Dt, { children: "Inicia un chat directo o crea un grupo de conversación" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3.5", children: /* @__PURE__ */ e(
        Ur,
        {
          value: s,
          onValueChange: (E) => l(E),
          className: "w-full",
          children: /* @__PURE__ */ i(Hr, { className: "w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ i(
              It,
              {
                value: "direct",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ e(At, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Directo (1 a 1)" })
                ]
              }
            ),
            /* @__PURE__ */ i(
              It,
              {
                value: "group",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ e(Lt, { className: "size-3.5" }),
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
          hr,
          {
            placeholder: "Ej. Soporte Técnico L2, Equipo Infraestructura...",
            value: m,
            onChange: (E) => b(E.target.value),
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
              onClick: () => p([]),
              className: "text-[10px] text-red-500 hover:underline cursor-pointer",
              children: "Quitar todos"
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800", children: f.map((E) => {
          const _ = Nt(E.attributes.name);
          return /* @__PURE__ */ i(
            Ze,
            {
              variant: "secondary",
              className: "gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
              children: [
                /* @__PURE__ */ e(
                  Oe,
                  {
                    name: _,
                    src: E.attributes.avatar_url,
                    size: "xs"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "max-w-28 truncate font-medium capitalize", children: _ }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: () => L(E.id),
                    className: "rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
                    children: /* @__PURE__ */ e(qe, { className: "size-3" })
                  }
                )
              ]
            },
            E.id
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
          /* @__PURE__ */ e(Tr, { className: "size-3.5 shrink-0 text-neutral-400" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              placeholder: "Buscar por nombre...",
              value: o,
              onChange: (E) => d(E.target.value),
              className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
            }
          ),
          o && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => d(""),
              className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer",
              children: /* @__PURE__ */ e(qe, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden", children: /* @__PURE__ */ e(kt, { className: "h-56 sm:h-64 w-full", children: g ? /* @__PURE__ */ i("div", { className: "flex h-56 items-center justify-center gap-2 text-xs text-neutral-500", children: [
        /* @__PURE__ */ e(Pe, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ e("span", { children: "Cargando usuarios..." })
      ] }) : C.length === 0 ? /* @__PURE__ */ i("div", { className: "flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500", children: [
        /* @__PURE__ */ e("p", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: "No se encontraron usuarios" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] mt-1", children: "Prueba con otro término de búsqueda" })
      ] }) : /* @__PURE__ */ e("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5", children: C.map((E) => {
        const _ = c === E.id, T = f.some((F) => F.id === E.id), I = s === "direct" ? _ : T, P = Nt(E.attributes.name);
        return /* @__PURE__ */ i(
          "div",
          {
            onClick: () => {
              s === "direct" ? h(E.id) : z(E);
            },
            className: B(
              "flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors",
              I ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium" : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200"
            ),
            children: [
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
                /* @__PURE__ */ e(
                  Oe,
                  {
                    name: P,
                    src: E.attributes.avatar_url,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ e("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ e("p", { className: "truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize", children: P }) })
              ] }),
              /* @__PURE__ */ e("div", { className: "shrink-0 pl-1", children: /* @__PURE__ */ e(
                "div",
                {
                  className: B(
                    "flex size-5 items-center justify-center rounded-full border transition-all",
                    I ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent"
                  ),
                  children: /* @__PURE__ */ e(er, { className: "size-3 stroke-[2.5]" })
                }
              ) })
            ]
          },
          E.id
        );
      }) }) }) })
    ] }),
    /* @__PURE__ */ i(Mt, { children: [
      /* @__PURE__ */ e(
        le,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => M(!1),
          disabled: x,
          className: "text-xs h-8 px-3.5 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        le,
        {
          type: "submit",
          size: "sm",
          variant: "primary",
          disabled: R,
          className: "text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer",
          children: x ? /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Creando..." })
          ] }) : /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e(wt, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: s === "direct" ? "Iniciar Chat" : "Crear Grupo" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const hi = (t) => {
  var a, s, l, o;
  const r = (t == null ? void 0 : t.params) ?? {}, n = xr({
    queryKey: ["list-conversations", r],
    queryFn: () => na(r),
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
    refetch: n.refetch
  };
}, fi = ({
  showToastOnUnread: t = !0,
  isActive: r = !0
} = {}) => {
  const { config: n, currentUser: a, currentUserId: s } = Ge(), { mutateAsync: l } = qr(), o = Ke({
    permission: ["messenger_chat.read"]
  }), [d, u] = k("0"), [c, h] = k("all"), [f, p] = k(""), m = Qr(f, 300), b = ze(() => {
    const j = {
      closed: d
    };
    return c !== "all" && (j.type = c), m.trim() && (j.name = m.trim()), {
      user_id: s,
      paginate: "false",
      ...Object.keys(j).length > 0 ? { filter: j } : {}
    };
  }, [d, c, m, s]), {
    data: v,
    isLoading: g,
    isFetching: w,
    errors: x,
    refetch: C
  } = hi({
    params: b,
    enable: !!s && o
  }), [z, L] = k(""), [S, M] = k(null), [X, R] = k(!1), [E, _] = k(!1), [T, I] = k(!1), P = ze(() => {
    let j = v;
    return S && !v.some((H) => String(H.id) === String(S.id)) && (j = [S, ...v]), !r || !z ? j : j.map((H) => String(H.id) === String(z) && H.attributes.unread_count > 0 ? {
      ...H,
      attributes: {
        ...H.attributes,
        unread_count: 0
      }
    } : H);
  }, [S, r, v, z]), F = Y(
    (j) => {
      const H = s && String(j.message.sender_id) !== String(s), V = r && String(j.conversation_id) === String(z);
      H && br(V ? "focused" : "unfocused"), t && !V && fe.info("Nuevo mensaje", {
        id: `conversation-message-${j.message.id}`,
        description: j.message.body || "Tienes un mensaje nuevo",
        action: {
          label: "Abrir",
          onClick: () => {
            L(String(j.conversation_id)), _(!0);
          }
        }
      }), C();
    },
    [s, r, C, z, t]
  ), U = Y(() => {
    C();
  }, [C]);
  Q(() => {
    if (typeof window > "u") return;
    const j = () => {
      C();
    }, H = (V) => {
      const W = V.detail;
      if (W != null && W.conversationId) {
        const ge = String(W.conversationId);
        W.conversation && M(W.conversation), u("0"), h((pe) => pe === "all" || pe === "direct" ? pe : "all"), p(""), L(ge), _(!0);
      }
      C();
    };
    return window.addEventListener("messenger:conversation-read", j), window.addEventListener("messenger:conversation-closed", j), window.addEventListener("messenger:conversation-created", H), window.addEventListener("messenger:conversation-updated", j), () => {
      window.removeEventListener("messenger:conversation-read", j), window.removeEventListener("messenger:conversation-closed", j), window.removeEventListener("messenger:conversation-created", H), window.removeEventListener("messenger:conversation-updated", j);
    };
  }, [C]), Q(() => {
    if (s)
      return Kr(
        n.reverb,
        s,
        F,
        U
      );
  }, [n.reverb, U, F, s]);
  const me = ze(
    () => P.find((j) => String(j.id) === String(z)) ?? (S && String(S.id) === String(z) ? S : void 0),
    [P, S, z]
  ), te = Y(
    (j) => {
      const H = String(j);
      L(H), _(!0), H && s && l({
        conversationId: H,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: s
      }).then(() => {
        C();
      }).catch(console.error);
    },
    [s, l, C]
  );
  return {
    conversations: P,
    selectedId: z,
    setSelectedId: L,
    selectedConversation: me,
    closedFilter: d,
    setClosedFilter: u,
    typeFilter: c,
    setTypeFilter: h,
    searchQuery: f,
    setSearchQuery: p,
    isContextPanelOpen: X,
    isMobileChatOpen: E,
    isNewConversationOpen: T,
    isLoading: g,
    isFetching: w,
    errors: x,
    hasReadPermission: o,
    currentUser: a,
    currentUserId: s,
    selectConversation: te,
    unselectConversation: () => {
      L(""), _(!1);
    },
    setIsContextPanelOpen: R,
    setIsNewConversationOpen: I,
    goBackToConversationList: () => _(!1),
    handleConversationCreated: (j) => {
      M(j), L(String(j.id)), _(!0), I(!1), C();
    }
  };
}, pi = () => {
  const t = Y(async (r) => {
    var s;
    const n = await ys(r), a = ((s = n.data) == null ? void 0 : s.data) ?? n.data;
    return typeof window < "u" && (a != null && a.conversation_id) && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversationId: a.conversation_id }
      })
    ), a;
  }, []);
  return Qe(
    t
  );
}, Zr = ["/messenger"];
function Er(t, r) {
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
function bi({
  hiddenPaths: t = Zr,
  showOnlyPaths: r,
  hideCondition: n,
  hidden: a = !1,
  currentPath: s
}) {
  const [l, o] = k(() => s !== void 0 ? s : typeof window < "u" ? window.location.pathname : "");
  return Q(() => {
    if (s !== void 0) {
      o(s);
      return;
    }
    if (typeof window > "u") return;
    const u = () => {
      const h = window.location.pathname;
      o((f) => f !== h ? h : f);
    };
    u(), window.addEventListener("popstate", u), window.addEventListener("pushstate", u), window.addEventListener("replacestate", u), window.addEventListener("locationchange", u);
    const c = window.setInterval(u, 150);
    return () => {
      window.removeEventListener("popstate", u), window.removeEventListener("pushstate", u), window.removeEventListener("replacestate", u), window.removeEventListener("locationchange", u), window.clearInterval(c);
    };
  }, [s]), { shouldHide: ze(() => a ? !0 : l ? !!(n && n(l) || r && r.length > 0 && !r.some((c) => Er(l, c)) || t && t.length > 0 && t.some((c) => Er(l, c))) : !1, [l, a, n, r, t]), pathname: l };
}
const Pr = "sdi_floating_chat_corner";
function xi(t = "bottom-right") {
  const r = q(null), [n, a] = k(t), [s, l] = k(!1), [o, d] = k(null), u = q({ startX: 0, startY: 0, rect: new DOMRect(), moved: !1 }), c = q(!1), h = q(null);
  Q(() => {
    try {
      const w = localStorage.getItem(Pr);
      w && ["bottom-right", "bottom-left", "top-right", "top-left"].includes(w) && a(w);
    } catch {
    }
  }, []);
  const f = (w) => {
    a(w);
    try {
      localStorage.setItem(Pr, w);
    } catch {
    }
  }, p = (w) => {
    if (w.button !== 0 && w.pointerType === "mouse") return;
    const x = r.current;
    if (!x) return;
    const C = x.getBoundingClientRect();
    u.current = {
      startX: w.clientX,
      startY: w.clientY,
      rect: C,
      moved: !1
    };
    const z = w.clientX - C.left, L = w.clientY - C.top, S = (X) => {
      Math.hypot(
        X.clientX - u.current.startX,
        X.clientY - u.current.startY
      ) > 5 && (u.current.moved || (u.current.moved = !0, l(!0)), h.current && cancelAnimationFrame(h.current), h.current = requestAnimationFrame(() => {
        const E = Math.max(
          12,
          Math.min(window.innerWidth - C.width - 12, X.clientX - z)
        ), _ = Math.max(
          12,
          Math.min(window.innerHeight - C.height - 12, X.clientY - L)
        );
        d({ x: E, y: _ });
      }));
    }, M = (X) => {
      if (window.removeEventListener("pointermove", S), window.removeEventListener("pointerup", M), window.removeEventListener("pointercancel", M), h.current && cancelAnimationFrame(h.current), u.current.moved) {
        c.current = !0, setTimeout(() => {
          c.current = !1;
        }, 100);
        const R = X.clientX > window.innerWidth / 2, _ = X.clientY > window.innerHeight / 2 ? R ? "bottom-right" : "bottom-left" : R ? "top-right" : "top-left";
        f(_), l(!1), d(null);
      }
    };
    window.addEventListener("pointermove", S), window.addEventListener("pointerup", M), window.addEventListener("pointercancel", M);
  }, m = n.startsWith("top"), b = n.endsWith("left");
  return {
    containerRef: r,
    corner: n,
    isDragging: s,
    dragPos: o,
    wasDraggedRef: c,
    isTop: m,
    isLeft: b,
    cornerContainerClass: m ? b ? "top-6 left-6 items-start flex-col-reverse" : "top-6 right-6 items-end flex-col-reverse" : b ? "bottom-6 left-6 items-start flex-col" : "bottom-6 right-6 items-end flex-col",
    cardOriginClass: m ? b ? "origin-top-left" : "origin-top-right" : b ? "origin-bottom-left" : "origin-bottom-right",
    startDrag: p,
    changeCorner: f
  };
}
function gi({
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
            className: B(
              "flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40",
              d()
            ),
            "aria-label": u(),
            title: u(),
            children: t ? /* @__PURE__ */ e(qe, { className: "size-6 transition-transform duration-200 text-white" }) : s ? /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center animate-in zoom-in-75 duration-200", children: /* @__PURE__ */ e(lr, { className: "size-6 transition-transform duration-200 text-white" }) }) : a ? /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ e(Pe, { className: "size-6 animate-spin text-white" }) }) : /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ e(Bn, { className: "size-6 transition-transform duration-200" }) })
          }
        ),
        !t && s && /* @__PURE__ */ i(
          "span",
          {
            className: B(
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
            className: B(
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
const vi = "1.4.0", wi = {
  version: vi
}, en = wi.version;
function gr({
  onNewConversation: t,
  showNewButton: r = !0,
  className: n
}) {
  var c, h;
  const { currentUser: a, isLoadingUser: s, hasError: l } = Ge(), o = Ke({
    permission: ["messenger_chat_support.provide_support"]
  }), d = Nt((c = a == null ? void 0 : a.attributes) == null ? void 0 : c.name) || "Usuario", u = ((h = a == null ? void 0 : a.attributes) == null ? void 0 : h.email) || "Mi cuenta";
  return l ? /* @__PURE__ */ i(
    "div",
    {
      className: B(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        n
      ),
      children: [
        /* @__PURE__ */ e($n, { className: "size-3.5 shrink-0 text-red-500" }),
        /* @__PURE__ */ e("span", { className: "truncate text-[11px] font-medium", children: "Sin conexión • No disponible" })
      ]
    }
  ) : s ? /* @__PURE__ */ i(
    "div",
    {
      className: B(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(re, { className: "size-8 rounded-full" }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
            /* @__PURE__ */ e(re, { className: "h-3 w-20" }),
            /* @__PURE__ */ e(re, { className: "h-2.5 w-32" })
          ] })
        ] }),
        r && /* @__PURE__ */ e(re, { className: "size-8 rounded-lg shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      className: B(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(Oe, { src: a == null ? void 0 : a.attributes.avatar_url, name: d, size: "sm" }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("p", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: d }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400 mt-0.5", children: [
              /* @__PURE__ */ e("span", { className: "truncate", children: u }),
              /* @__PURE__ */ e("span", { className: "text-neutral-300 dark:text-neutral-700 select-none", children: "•" }),
              /* @__PURE__ */ i("span", { className: "font-mono text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0", children: [
                "v",
                en
              ] })
            ] })
          ] })
        ] }),
        r && t && o && /* @__PURE__ */ e(
          le,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: t,
            className: "h-8 gap-1.5 px-3 text-xs font-semibold shrink-0 shadow-xs cursor-pointer",
            title: "Iniciar nueva conversación",
            children: /* @__PURE__ */ e(wt, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function yi({
  title: t,
  canRequestSupport: r,
  canViewChatList: n,
  supportWithBot: a = !0,
  isStartingBot: s = !1,
  totalUnreadCount: l,
  conversationsCount: o,
  onRequestSupport: d,
  onViewChatList: u,
  onClose: c,
  onNewConversation: h,
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
              /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md", children: /* @__PURE__ */ e(Xt, { className: "size-5 text-white" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("h3", { className: "text-sm font-bold leading-none text-white", children: t }),
                /* @__PURE__ */ i("p", { className: "text-[11px] text-blue-100 mt-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }),
                  "Soporte técnico SDI"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e(
              le,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: c,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ e(qe, { className: "size-4" })
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
              /* @__PURE__ */ e("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: s ? /* @__PURE__ */ e(Pe, { className: "size-5 animate-spin" }) : /* @__PURE__ */ e(Xt, { className: "size-5" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Solicitar Asistencia" }),
                /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: s ? "Iniciando conversación..." : a ? "Inicia atención inmediata con nuestro asistente" : "Ingresa asunto y mensaje para iniciar soporte" })
              ] })
            ] }),
            /* @__PURE__ */ e(wr, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
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
                /* @__PURE__ */ e(ir, { className: "size-5" }),
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
            /* @__PURE__ */ e(wr, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ i("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30 p-3 mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs", children: [
            /* @__PURE__ */ e(Bt, { className: "size-3.5 text-emerald-600" }),
            /* @__PURE__ */ e("span", { children: "Mesa de Ayuda SDI" })
          ] }),
          /* @__PURE__ */ i("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500", children: [
            "v",
            en
          ] })
        ] }),
        /* @__PURE__ */ e("p", { className: "leading-relaxed", children: "Tus solicitudes quedan registradas con trazabilidad y número de ticket en la plataforma de Helpdesk." })
      ] })
    ] }),
    /* @__PURE__ */ e(gr, { onNewConversation: h })
  ] });
}
function Ni({
  userId: t,
  userName: r,
  onSubmit: n,
  isSubmitting: a = !1,
  error: s = null,
  onCancel: l
}) {
  const [o, d] = k(""), [u, c] = k(""), [h, f] = k(null);
  return /* @__PURE__ */ i("form", { onSubmit: (m) => {
    m.preventDefault(), f(null);
    const b = o.trim(), v = u.trim();
    if (!b) {
      f("Por favor ingresa el asunto de tu solicitud.");
      return;
    }
    if (!v) {
      f("Por favor describe el detalle de tu consulta.");
      return;
    }
    if (!t) {
      f("No se pudo identificar el usuario actual para la solicitud.");
      return;
    }
    n({
      subject: b,
      message: v,
      user_id: t
    });
  }, className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ i("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100", children: [
      /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/90 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 p-3.5 shadow-2xs space-y-2", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ e(Xt, { className: "size-4.5" }) }),
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
      (h || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(tr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ i("div", { className: "flex-1 leading-snug", children: [
          /* @__PURE__ */ e("span", { className: "font-medium", children: "Error en el formulario:" }),
          " ",
          h || s
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ e(Wn, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ e("span", { children: "Asunto de la consulta" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ e("div", { className: "relative", children: /* @__PURE__ */ e(
          hr,
          {
            value: o,
            onChange: (m) => {
              d(m.target.value), h && f(null);
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
          /* @__PURE__ */ e(Un, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ e("span", { children: "Detalle o descripción" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ e(
            $t,
            {
              value: u,
              onChange: (m) => {
                c(m.target.value), h && f(null);
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
        /* @__PURE__ */ e(Bt, { className: "size-4 shrink-0 text-neutral-400 mt-0.5" }),
        /* @__PURE__ */ e("span", { children: "Tu solicitud creará automáticamente una conversación y se notificará al equipo de asistencia." })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900/80 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e("div", { children: l && /* @__PURE__ */ e(
        le,
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
        le,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: a || !o.trim() || !u.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          children: a ? /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e(Pe, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Enviando solicitud..." })
          ] }) : /* @__PURE__ */ i(Ce, { children: [
            /* @__PURE__ */ e("span", { children: "Iniciar soporte" }),
            /* @__PURE__ */ e(Ft, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] });
}
function ki({
  userId: t,
  userName: r,
  canViewChatList: n,
  totalUnreadCount: a,
  isSubmitting: s,
  error: l,
  onHome: o,
  onViewChats: d,
  onClose: u,
  onSubmit: c,
  onNewConversation: h,
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
              le,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: o,
                className: "h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ e(Jt, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Inicio" })
                ]
              }
            ),
            /* @__PURE__ */ e("span", { className: "text-xs font-bold text-white", children: "Solicitar Asistencia" })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
            n && /* @__PURE__ */ i(
              le,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: d,
                title: "Ver mis chats",
                className: "relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1",
                children: [
                  /* @__PURE__ */ e(ir, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { className: "hidden sm:inline text-[11px] font-medium", children: "Mis chats" }),
                  a > 0 && /* @__PURE__ */ e("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs", children: a > 99 ? "99+" : a })
                ]
              }
            ),
            /* @__PURE__ */ e(
              le,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: u,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ e(qe, { className: "size-4" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-hidden flex flex-col", children: t && /* @__PURE__ */ e(
      Ni,
      {
        userId: t,
        userName: r,
        onSubmit: c,
        isSubmitting: s,
        error: l,
        onCancel: o
      }
    ) }),
    /* @__PURE__ */ e(gr, { onNewConversation: h })
  ] });
}
const Ci = [
  { id: "all", label: "Todos", icon: null },
  { id: "direct", label: "Directos", icon: At },
  { id: "group", label: "Grupos", icon: Lt },
  { id: "bot", label: "Bots", icon: Qt }
], Si = () => /* @__PURE__ */ i("div", { className: "flex w-full min-w-0 items-center gap-2.5 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-800/20", children: [
  /* @__PURE__ */ e(re, { className: "size-9.5 rounded-full shrink-0" }),
  /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 space-y-2", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e(re, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ e(re, { className: "h-2.5 w-10" })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e(re, { className: "h-2.5 w-36" }),
      /* @__PURE__ */ e(re, { className: "h-3.5 w-6 rounded-full" })
    ] })
  ] })
] }), zi = ({
  conversation: t,
  selectedId: r,
  currentUserId: n,
  onSelectConversation: a
}) => {
  var m, b, v, g;
  const s = Ct(t), l = ft(t, n), o = t.type === "bot" || ((m = t.attributes) == null ? void 0 : m.type) === "bot" || Number((b = l == null ? void 0 : l.attributes) == null ? void 0 : b.user_auth_id) === 0, d = !!t.attributes.closed_at, u = pt(t, n), c = ((g = (v = t.relationships) == null ? void 0 : v.users) == null ? void 0 : g.length) || 0, h = s ? "Grupo" : o ? "Bot de Asistencia" : "Conversación directa";
  let f = "";
  try {
    f = Et(
      cr(t.attributes.updated_at || t.attributes.created_at),
      "dd/MM HH:mm"
    );
  } catch {
    f = "";
  }
  const p = String(r) === String(t.id);
  return /* @__PURE__ */ e(
    "div",
    {
      onClick: () => a(String(t.id)),
      "aria-current": p ? "true" : void 0,
      className: B(
        "group relative flex w-full min-w-0 cursor-pointer select-none flex-col gap-1.5 overflow-hidden rounded-xl p-3 transition-all",
        p ? "bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900" : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent"
      ),
      children: /* @__PURE__ */ i("div", { className: "flex items-start gap-2.5 min-w-0", children: [
        /* @__PURE__ */ e(
          Oe,
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
                c,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ e("span", { className: "shrink-0 text-[10px] text-neutral-400 font-mono", children: f })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("p", { className: "truncate text-[11px] text-neutral-500 dark:text-neutral-400", children: h }),
              d && /* @__PURE__ */ i(
                Ze,
                {
                  variant: "outline",
                  className: "h-4 px-1 text-[9px] gap-0.5 border-amber-300 text-amber-700 dark:text-amber-400 font-medium",
                  children: [
                    /* @__PURE__ */ e(nt, { className: "size-2" }),
                    /* @__PURE__ */ e("span", { children: "Cerrado" })
                  ]
                }
              )
            ] }),
            t.attributes.unread_count > 0 && /* @__PURE__ */ e(Ze, { className: "bg-blue-700", children: t.attributes.unread_count })
          ] })
        ] })
      ] })
    }
  );
};
function _i({
  conversations: t,
  selectedId: r,
  onSelectConversation: n,
  searchQuery: a,
  onSearchChange: s,
  closedFilter: l,
  onClosedFilterChange: o,
  typeFilter: d,
  onTypeFilterChange: u,
  onNewConversation: c,
  isLoading: h = !1
}) {
  const { currentUser: f, currentUserId: p, isLoadingUser: m, hasError: b, error: v } = Ge(), g = Ke({
    permission: ["messenger_chat.read"]
  }), w = h || m;
  return /* @__PURE__ */ i("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ i("div", { className: "flex shrink-0 flex-col gap-2.5 border-b border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900", children: [
      /* @__PURE__ */ i("div", { className: "group/search relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
        /* @__PURE__ */ e(Tr, { className: "size-3.5 shrink-0 text-neutral-400 transition-colors group-focus-within/search:text-blue-600" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Buscar por nombre...",
            value: a,
            onChange: (x) => s(x.target.value),
            className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          }
        ),
        a ? /* @__PURE__ */ e(
          le,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => s(""),
            className: "size-5 shrink-0 rounded-full p-0 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
            children: /* @__PURE__ */ e(qe, { className: "size-3" })
          }
        ) : /* @__PURE__ */ e("span", { className: "hidden shrink-0 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-400 sm:inline-block", children: "Buscar" })
      ] }),
      /* @__PURE__ */ e(
        Ur,
        {
          value: l,
          onValueChange: (x) => o(x),
          className: "w-full",
          children: /* @__PURE__ */ i(Hr, { className: "h-8 w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ e(It, { value: "0", className: "text-[11px] font-medium", children: "Activos" }),
            /* @__PURE__ */ e(It, { value: "1", className: "text-[11px] font-medium", children: "Cerrados" })
          ] })
        }
      ),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none", children: Ci.map((x) => {
        const C = d === x.id, z = x.icon;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => u(x.id),
            className: B(
              "flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              C ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 border border-transparent"
            ),
            children: [
              z && /* @__PURE__ */ e(z, { className: "size-3" }),
              /* @__PURE__ */ e("span", { children: x.label })
            ]
          },
          x.id
        );
      }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ e(kt, { className: "h-full w-full", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 p-1.5 w-full min-w-0", children: b ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(lr, { className: "size-6" }) }),
      /* @__PURE__ */ i("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Error al cargar chats" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: (v == null ? void 0 : v.message) || "No se pudo conectar al servidor de mensajería." })
      ] }),
      /* @__PURE__ */ i(
        le,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: () => window.location.reload(),
          className: "h-7.5 gap-1.5 px-3 text-xs font-semibold cursor-pointer",
          children: [
            /* @__PURE__ */ e(Dr, { className: "size-3" }),
            /* @__PURE__ */ e("span", { children: "Reintentar" })
          ]
        }
      )
    ] }) : !g && !m ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(nt, { className: "size-6" }) }),
      /* @__PURE__ */ i("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Sin permiso de lectura" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: "No tienes permisos para ver el listado de conversaciones." })
      ] })
    ] }) : w ? /* @__PURE__ */ e("div", { className: "space-y-1.5 p-1", children: Array.from({ length: 5 }).map((x, C) => /* @__PURE__ */ e(Si, {}, C)) }) : t.length === 0 ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ e("div", { className: "mb-3 flex size-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400", children: /* @__PURE__ */ e(Hn, { className: "size-5 stroke-[1.5]" }) }),
      /* @__PURE__ */ e("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100", children: a ? "No se encontraron resultados" : l === "1" ? "No hay conversaciones cerradas" : "No hay conversaciones activas" }),
      /* @__PURE__ */ e("p", { className: "mt-1 max-w-48 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400", children: a ? "Intenta con otro término de búsqueda o cambia los filtros." : "Las conversaciones iniciadas aparecerán aquí." }),
      l !== "0" && /* @__PURE__ */ e(
        le,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => o("0"),
          className: "mt-3 text-[11px] h-7 text-blue-600 dark:text-blue-400 cursor-pointer",
          children: "Ver activas"
        }
      )
    ] }) : t.map((x) => /* @__PURE__ */ e(
      zi,
      {
        conversation: x,
        selectedId: r,
        currentUserId: p,
        onSelectConversation: n
      },
      x.id
    )) }) }) }),
    /* @__PURE__ */ e(gr, { onNewConversation: c })
  ] });
}
function Ai({
  conversations: t,
  selectedId: r,
  searchQuery: n,
  closedFilter: a,
  typeFilter: s,
  isLoading: l,
  onHome: o,
  onClose: d,
  onSelectConversation: u,
  onSearchChange: c,
  onClosedFilterChange: h,
  onTypeFilterChange: f,
  onNewConversation: p,
  onDragStart: m
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: [
    /* @__PURE__ */ i(
      "div",
      {
        onPointerDown: m,
        className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900 cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ i(
            le,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (b) => b.stopPropagation(),
              onClick: o,
              className: "h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100",
              children: [
                /* @__PURE__ */ e(Jt, { className: "size-3.5" }),
                /* @__PURE__ */ e("span", { children: "Inicio" })
              ]
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Mis Conversaciones" }),
          /* @__PURE__ */ e(
            le,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (b) => b.stopPropagation(),
              onClick: d,
              className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ e(qe, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ e(
      _i,
      {
        conversations: t,
        selectedId: r,
        onSelectConversation: u,
        searchQuery: n,
        onSearchChange: c,
        closedFilter: a,
        onClosedFilterChange: h,
        typeFilter: s,
        onTypeFilterChange: f,
        onNewConversation: p,
        isLoading: l
      }
    ) })
  ] });
}
function Ei({
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
              /* @__PURE__ */ e(re, { className: "size-9 rounded-xl bg-white/20" }),
              /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ e(re, { className: "h-3.5 w-32 bg-white/30" }),
                /* @__PURE__ */ e(re, { className: "h-2.5 w-24 bg-white/20" })
              ] })
            ] }),
            /* @__PURE__ */ e(re, { className: "size-7 rounded-full bg-white/20" })
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-4 space-y-1.5", children: [
            /* @__PURE__ */ e(re, { className: "h-3 w-48 bg-white/30" }),
            /* @__PURE__ */ e(re, { className: "h-2.5 w-64 bg-white/20" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      /* @__PURE__ */ i("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e(re, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ e(re, { className: "h-3.5 w-28" }),
            /* @__PURE__ */ e(re, { className: "h-2.5 w-44" })
          ] })
        ] }),
        /* @__PURE__ */ e(re, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e(re, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ e(re, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ e(re, { className: "h-2.5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ e(re, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ i("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(re, { className: "size-3.5 rounded-full" }),
          /* @__PURE__ */ e(re, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ e(re, { className: "h-2.5 w-full" }),
        /* @__PURE__ */ e(re, { className: "h-2.5 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ e(re, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(re, { className: "h-3 w-24" }),
          /* @__PURE__ */ e(re, { className: "h-2.5 w-36" })
        ] })
      ] }),
      /* @__PURE__ */ e(re, { className: "size-8 rounded-lg" })
    ] })
  ] });
}
function Hi({
  canViewChatList: t = !0,
  canRequestSupport: r = !0,
  supportWithBot: n,
  defaultView: a = "home",
  defaultCorner: s = "bottom-right",
  initialConversation: l,
  title: o = "Centro de Ayuda SDI",
  hiddenPaths: d = Zr,
  showOnlyPaths: u,
  hideCondition: c,
  hidden: h = !1,
  currentPath: f,
  showToastOnUnread: p = !1,
  renderOptions: m,
  onActiveConversationChange: b
}) {
  var St, zt, lt;
  const v = Ke({
    permission: ["messenger_chat.read"]
  }), g = Ke({
    permission: ["messenger_chat_support.request_support"]
  });
  Ke({
    permission: ["messenger_chat_support.provide_support"]
  });
  const w = Ke({
    permission: [
      "messenger_chat.read",
      "messenger_chat_support.request_support",
      "messenger_chat_support.provide_support"
    ],
    operator: "OR"
  }), { currentUser: x, isLoadingUser: C, hasError: z, error: L, config: S } = Ge(), M = x == null ? void 0 : x.id, X = ((St = x == null ? void 0 : x.attributes) == null ? void 0 : St.name) || "Usuario", R = t && v, E = r && g, _ = n ?? S.supportWithBot ?? !0, { shouldHide: T } = bi({
    hiddenPaths: d,
    showOnlyPaths: u,
    hideCondition: c,
    hidden: h,
    currentPath: f
  }), {
    containerRef: I,
    isDragging: P,
    dragPos: F,
    wasDraggedRef: U,
    isTop: me,
    isLeft: te,
    cornerContainerClass: y,
    cardOriginClass: A,
    startDrag: J
  } = xi(s), [j, H] = k(!1), [V, W] = k(() => !R && !E ? "chat" : a === "list" && !R || a === "support-form" && (!E || _) ? "home" : a), {
    mutateAsync: ge,
    isLoading: pe,
    error: be
  } = pi(), {
    mutateAsync: Te,
    isLoading: he
  } = Jr(), Be = async () => {
    var de, Ve;
    try {
      const we = await Te({
        type: "bot",
        sender_id: M ? Number(M) : void 0,
        user_id: M ? Number(M) : void 0
      });
      we && (se(we), xe(we), fe.success("Conversación iniciada con el Asistente Virtual"), W("chat"));
    } catch (we) {
      const Je = ((Ve = (de = we == null ? void 0 : we.response) == null ? void 0 : de.data) == null ? void 0 : Ve.message) || (we == null ? void 0 : we.message) || "Error al iniciar conversación con el bot";
      fe.error(Je);
    }
  }, De = () => {
    _ ? Be() : W("support-form");
  }, [Me, Re] = k(null), [$e, se] = k(
    null
  ), {
    conversations: G,
    selectedId: We,
    selectedConversation: ve,
    closedFilter: Ue,
    setClosedFilter: He,
    typeFilter: $,
    setTypeFilter: ae,
    searchQuery: oe,
    setSearchQuery: ne,
    isNewConversationOpen: N,
    isLoading: O,
    selectConversation: Z,
    setIsNewConversationOpen: ce,
    handleConversationCreated: xe
  } = fi({
    showToastOnUnread: p,
    isActive: j && V === "chat"
  }), Ee = ze(() => !G || !Array.isArray(G) ? 0 : G.reduce((de, Ve) => {
    var we;
    return de + (((we = Ve.attributes) == null ? void 0 : we.unread_count) || 0);
  }, 0), [G]), Se = ($e ? ve && String(ve.id) === String($e.id) ? ve : $e : null) || l || ve || null, Xe = j && V === "chat" ? Se : null;
  Q(() => {
    ut.set(Xe), b == null || b(Xe);
  }, [Xe, b]), Q(() => () => {
    ut.set(null);
  }, []), Q(() => {
    V === "chat" && !Se && W(R ? "list" : "home");
  }, [V, Se, R]);
  const et = () => {
    U.current || P || (j ? H(!1) : (H(!0), W(
      a === "list" && !R ? E && !_ ? "support-form" : "home" : a === "support-form" && (!E || _) ? R ? "list" : "home" : a || "home"
    )));
  };
  if (T || !C && !z && !w)
    return null;
  const st = (de) => {
    se(null), Z(de), W("chat");
  }, it = async (de) => {
    var Ve, we, Je, K, ie;
    try {
      const ee = await ge({ ...de, direct_technician: !1 });
      if (ee != null && ee.conversation_id && (ee != null && ee.technician)) {
        const ye = String(ee.conversation_id), D = {
          id: String(ee.technician.id),
          type: "user",
          attributes: {
            user_auth_id: Number(ee.technician.user_auth_id),
            name: ee.technician.name,
            avatar_url: null,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: []
        }, ue = {
          id: ye,
          type: "conversation",
          attributes: {
            is_group: !1,
            name: ee.technician.name || ((Ve = ee.ticket) == null ? void 0 : Ve.subject) || "Soporte SDI",
            closed_at: null,
            unread_count: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: {
            users: [D]
          }
        };
        se(ue), xe(ue), fe.success(`Asistencia iniciada con ${ee.technician.name}`, {
          description: `Ticket #${((we = ee.ticket) == null ? void 0 : we.number) || ((Je = ee.ticket) == null ? void 0 : Je.id)}`
        }), W("chat");
      } else
        Re(ee), W("no-technician");
    } catch (ee) {
      const ye = ((ie = (K = ee == null ? void 0 : ee.response) == null ? void 0 : K.data) == null ? void 0 : ie.message) || (ee == null ? void 0 : ee.message) || "Error al procesar la solicitud de asistencia";
      fe.error(ye);
    }
  }, Ht = (de) => {
    var Ve, we;
    if (de != null && de.conversation_id) {
      const Je = String(de.conversation_id), K = de.technician ? {
        id: String(de.technician.id),
        type: "user",
        attributes: {
          user_auth_id: Number(de.technician.user_auth_id ?? de.technician.id ?? 1),
          name: de.technician.name,
          avatar_url: null,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        relationships: []
      } : void 0, ie = {
        id: Je,
        type: "conversation",
        attributes: {
          is_group: !1,
          name: ((Ve = de.technician) == null ? void 0 : Ve.name) || ((we = de.ticket) == null ? void 0 : we.subject) || "Soporte SDI",
          closed_at: null,
          unread_count: 0,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        },
        relationships: {
          users: K ? [K] : []
        }
      };
      se(ie), xe(ie), W("chat");
    } else de != null && de.ticket && (Re(de), W("no-technician"));
  };
  if (T)
    return null;
  if (!z)
    return /* @__PURE__ */ i(
      "div",
      {
        ref: I,
        style: P && F ? {
          position: "fixed",
          left: `${F.x}px`,
          top: `${F.y}px`,
          bottom: "auto",
          right: "auto",
          zIndex: 50,
          touchAction: "none",
          transition: "none"
        } : void 0,
        className: B(
          "sdi-messenger-root z-50 flex pointer-events-none select-none",
          P ? "fixed cursor-grabbing" : B("fixed duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all", y)
        ),
        children: [
          j && /* @__PURE__ */ e(
            ka,
            {
              className: B(
                "pointer-events-auto h-[590px] max-h-[calc(100vh-120px)] w-[385px] sm:w-[425px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-2xl transition-all duration-300 flex flex-col",
                me ? "mt-3.5" : "mb-3.5",
                A
              ),
              children: C ? /* @__PURE__ */ e(Ei, { onDragStart: J }) : /* @__PURE__ */ i(Ce, { children: [
                V === "home" && /* @__PURE__ */ e(
                  yi,
                  {
                    title: o,
                    canRequestSupport: E,
                    canViewChatList: R,
                    supportWithBot: _,
                    isStartingBot: he,
                    totalUnreadCount: Ee,
                    conversationsCount: G.length,
                    onRequestSupport: De,
                    onViewChatList: () => W("list"),
                    onClose: () => H(!1),
                    onNewConversation: () => ce(!0),
                    onDragStart: J
                  }
                ),
                V === "support-form" && /* @__PURE__ */ e(
                  ki,
                  {
                    userId: M,
                    userName: X,
                    canViewChatList: R,
                    totalUnreadCount: Ee,
                    isSubmitting: pe,
                    error: ((lt = (zt = be == null ? void 0 : be.response) == null ? void 0 : zt.data) == null ? void 0 : lt.message) || (be == null ? void 0 : be.message),
                    onHome: () => W("home"),
                    onViewChats: () => W("list"),
                    onClose: () => H(!1),
                    onSubmit: it,
                    onNewConversation: () => ce(!0),
                    onDragStart: J
                  }
                ),
                V === "no-technician" && /* @__PURE__ */ e(
                  di,
                  {
                    message: Me == null ? void 0 : Me.message,
                    ticket: Me == null ? void 0 : Me.ticket,
                    onNewRequest: () => {
                      Re(null), _ ? (W("home"), Be()) : W("support-form");
                    },
                    onViewChats: () => W("list"),
                    onClose: () => H(!1),
                    canViewChatList: R
                  }
                ),
                V === "list" && /* @__PURE__ */ e(
                  Ai,
                  {
                    conversations: G,
                    selectedId: We,
                    searchQuery: oe,
                    closedFilter: Ue,
                    typeFilter: $,
                    isLoading: O,
                    onHome: () => W("home"),
                    onClose: () => H(!1),
                    onSelectConversation: st,
                    onSearchChange: ne,
                    onClosedFilterChange: He,
                    onTypeFilterChange: ae,
                    onNewConversation: () => ce(!0),
                    onDragStart: J
                  }
                ),
                V === "chat" && Se && /* @__PURE__ */ e("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: /* @__PURE__ */ e(
                  ci,
                  {
                    conversation: Se,
                    isContextPanelOpen: !1,
                    alwaysShowBackButton: !0,
                    renderOptions: m,
                    onEscalateSuccess: Ht,
                    onCloseSuccess: () => {
                      se(null), W(R ? "list" : "home");
                    },
                    onBack: () => {
                      se(null), W(R ? "list" : "home");
                    }
                  }
                ) })
              ] })
            }
          ),
          /* @__PURE__ */ e(
            gi,
            {
              isOpen: j,
              totalUnreadCount: Ee,
              isLeft: te,
              isLoading: C,
              hasError: z,
              onToggleOpen: et,
              onPointerDown: J
            }
          ),
          /* @__PURE__ */ e(
            mi,
            {
              open: N,
              onOpenChange: ce,
              onSuccess: (de) => {
                se(de), xe(de), W("chat");
              }
            }
          )
        ]
      }
    );
}
function Vi({ onNewConversation: t }) {
  const { hasError: r, error: n, isLoadingUser: a } = Ge(), s = Ke({
    permission: ["messenger_chat.read"]
  }), l = Ke({
    permission: ["messenger_chat_support.provide_support"]
  });
  return r ? /* @__PURE__ */ i("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ e("div", { className: "absolute inset-x-0 top-0 h-1 bg-red-500/30" }),
    /* @__PURE__ */ i("div", { className: "flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200", children: [
      /* @__PURE__ */ e("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs", children: /* @__PURE__ */ e(lr, { className: "size-8" }) }),
      /* @__PURE__ */ e("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400", children: "Servicio no disponible" }),
      /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Error de conexión" }),
      /* @__PURE__ */ e("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: (n == null ? void 0 : n.message) || "No fue posible conectar con el servidor de chat. Las funciones de mensajería están temporalmente deshabilitadas." }),
      /* @__PURE__ */ i(
        le,
        {
          type: "button",
          variant: "primary",
          className: "mt-6 gap-1.5 cursor-pointer shadow-xs",
          onClick: () => window.location.reload(),
          children: [
            /* @__PURE__ */ e(Dr, { className: "size-4" }),
            "Reintentar conexión"
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ e("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0f1d] shadow-xs", children: /* @__PURE__ */ i("div", { className: "relative z-10 flex max-w-md flex-col items-center px-6 text-center", children: [
    /* @__PURE__ */ e("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs", children: /* @__PURE__ */ e(wt, { className: "size-8" }) }),
    /* @__PURE__ */ e("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400", children: "Bandeja de conversaciones" }),
    /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Selecciona una conversación" }),
    /* @__PURE__ */ e("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: s ? "Elige una conversación del panel lateral para ver sus mensajes o inicia una nueva cuando estés listo." : "No cuentas con permisos para ver la lista de conversaciones." }),
    t && !a && l && /* @__PURE__ */ i(
      le,
      {
        type: "button",
        variant: "outline",
        className: "mt-6 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors",
        onClick: t,
        children: [
          /* @__PURE__ */ e(wt, { className: "size-4" }),
          "Nueva conversación"
        ]
      }
    )
  ] }) });
}
function qi({
  conversation: t,
  onClose: r,
  className: n
}) {
  var f, p, m;
  const { currentUserId: a } = Ge(), s = Ct(t), l = ft(t, a), o = Number((f = l == null ? void 0 : l.attributes) == null ? void 0 : f.user_auth_id) === 0 || t.type === "bot", d = pt(t, a), u = ((m = (p = t.relationships) == null ? void 0 : p.users) == null ? void 0 : m.length) || 0, c = !!t.attributes.closed_at, h = (b) => {
    if (!b) return "-";
    try {
      return Et(cr(b), "dd/MM/yyyy HH:mm");
    } catch {
      return b;
    }
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: B(
        "sdi-messenger-root flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-3 px-4 bg-white dark:bg-neutral-900", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(At, { className: "size-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ e("h3", { className: "text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100", children: "Información de Contacto" })
          ] }),
          r && /* @__PURE__ */ e(
            le,
            {
              variant: "ghost",
              size: "icon",
              onClick: r,
              className: " p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              children: /* @__PURE__ */ e(qe, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(kt, { className: "h-full", children: /* @__PURE__ */ i("div", { className: "space-y-4 p-4", children: [
          /* @__PURE__ */ i("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ e("div", { className: "relative mb-2", children: /* @__PURE__ */ e(
              Oe,
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
              /* @__PURE__ */ e(Ze, { variant: o ? "default" : "secondary", className: B("text-[10px]", o && "bg-violet-600 text-white"), children: s ? "Grupo" : o ? "Asistente IA" : "Usuario" }),
              c ? /* @__PURE__ */ i(
                Ze,
                {
                  variant: "outline",
                  className: "text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ e(nt, { className: "size-2.5" }),
                    /* @__PURE__ */ e("span", { children: "Cerrada" })
                  ]
                }
              ) : /* @__PURE__ */ i(
                Ze,
                {
                  variant: "outline",
                  className: "text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ e(rt, { className: "size-2.5" }),
                    /* @__PURE__ */ e("span", { children: "Activa" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ e(Na, {}),
          /* @__PURE__ */ i("div", { className: "space-y-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(At, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ e("span", { className: "truncate text-neutral-900 dark:text-neutral-100 font-medium", children: s ? `${u} participantes` : d })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(Vn, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Creada: ",
                h(t.attributes.created_at)
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(at, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Actualizada: ",
                h(t.attributes.updated_at)
              ] })
            ] }),
            t.attributes.closed_at && /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(nt, { className: "size-3.5 shrink-0 text-amber-500" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Cerrada: ",
                h(t.attributes.closed_at)
              ] })
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
}
const Pi = ({ conversationId: t, enabled: r = !0 } = {}) => {
  var s, l;
  const a = xr({
    queryKey: ["conversation", t],
    queryFn: () => sa(t),
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
}, Oi = (t, r) => {
  const n = typeof t == "object" && t !== null ? t : { conversationId: t, ...r }, {
    conversationId: a,
    enabled: s = !0,
    showToastOnUnread: l = !1,
    onMessage: o,
    onUnread: d
  } = n, { config: u, currentUser: c, currentUserId: h } = Ge(), f = Ke({
    permission: ["messenger_chat.read"]
  }), p = a != null ? String(a) : void 0, m = a != null ? Number(a) : void 0, b = s && !!p && f, {
    data: v,
    isLoading: g,
    isError: w,
    errors: x,
    refetch: C
  } = Pi({
    conversationId: p,
    enabled: b
  }), z = Y(
    (S) => {
      if (h && String(S.attributes.sender_id) !== String(h)) {
        const X = typeof document < "u" && document.hasFocus() && !document.hidden;
        br(X ? "focused" : "unfocused");
      }
      C(), o == null || o(S);
    },
    [h, o, C]
  ), L = Y(
    (S) => {
      l && String(S.conversation_id) !== p && fe.info("Nuevo mensaje", {
        id: `conversation-message-${S.message.id}`,
        description: S.message.body || "Tienes un mensaje nuevo"
      }), String(S.conversation_id) === p && C(), d == null || d(S);
    },
    [p, d, C, l]
  );
  return Q(() => {
    if (!(!m || !b))
      return Gr(
        u.reverb,
        m,
        z
      );
  }, [u.reverb, m, z, b]), Q(() => {
    if (!(!h || !b))
      return Kr(
        u.reverb,
        h,
        L
      );
  }, [u.reverb, h, L, b]), Q(() => {
    if (typeof window > "u") return;
    const S = () => {
      C();
    };
    return window.addEventListener("messenger:conversation-closed", S), window.addEventListener("messenger:conversation-updated", S), () => {
      window.removeEventListener("messenger:conversation-closed", S), window.removeEventListener("messenger:conversation-updated", S);
    };
  }, [C]), {
    conversation: v ?? null,
    isLoading: g,
    isError: w,
    errors: x,
    refetch: C,
    hasReadPermission: f,
    currentUser: c,
    currentUserId: h
  };
};
function Gi({
  enabled: t = !0,
  isMuted: r = !1,
  fftSize: n = 64,
  levelUpdateInterval: a = 50
} = {}) {
  const [s, l] = k(null), [o, d] = k(0), [u, c] = k(!1), [h, f] = k(null), [p, m] = k(null), b = q(null), v = q(null), g = q(null), w = q(null), x = q(null), C = q(0), z = Y(() => {
    if (x.current && (clearInterval(x.current), x.current = null), w.current) {
      try {
        w.current.disconnect();
      } catch {
      }
      w.current = null;
    }
    if (b.current && (b.current.getTracks().forEach((S) => {
      try {
        S.stop();
      } catch {
      }
    }), b.current = null), v.current && v.current.state !== "closed") {
      try {
        v.current.close().catch(() => {
        });
      } catch {
      }
      v.current = null;
    }
    g.current = null, l(null), c(!1), d(0), C.current = 0;
  }, []), L = Y(async () => {
    var S;
    if (!(typeof window > "u") && !(b.current && b.current.active && g.current)) {
      if (!((S = navigator.mediaDevices) != null && S.getUserMedia)) {
        m("La API de micrófono no está disponible en este navegador o entorno"), f(!1);
        return;
      }
      try {
        const M = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: !0,
            noiseSuppression: !0,
            autoGainControl: !0
          }
        });
        b.current = M;
        const X = window.AudioContext || window.webkitAudioContext, R = new X();
        v.current = R, R.state === "suspended" && await R.resume();
        const E = R.createMediaStreamSource(M);
        w.current = E;
        const _ = R.createAnalyser();
        _.fftSize = n, _.smoothingTimeConstant = 0.65, g.current = _, E.connect(_), M.getAudioTracks().forEach((I) => {
          I.enabled = !r;
        }), l(_), c(!0), f(!0), m(null);
        const T = new Uint8Array(_.frequencyBinCount);
        x.current && clearInterval(x.current), x.current = setInterval(() => {
          if (!g.current || r) {
            C.current = 0, d(0);
            return;
          }
          g.current.getByteFrequencyData(T);
          let I = 0;
          for (let U = 0; U < T.length; U++)
            I += T[U];
          const P = I / (T.length || 1), F = Math.min(1, Math.max(0, P / 128));
          C.current = C.current * 0.7 + F * 0.3, d(Number(C.current.toFixed(3)));
        }, a);
      } catch (M) {
        const R = (M == null ? void 0 : M.name) === "NotAllowedError" || (M == null ? void 0 : M.name) === "PermissionDeniedError" ? "El acceso al micrófono fue denegado en el navegador. Por favor habilita los permisos para continuar." : M instanceof Error ? M.message : "Error al acceder al micrófono";
        m(R), f(!1), z();
      }
    }
  }, [n, r, a, z]);
  return Q(() => {
    var S;
    if (!(typeof window > "u" || !((S = navigator.permissions) != null && S.query)))
      try {
        navigator.permissions.query({ name: "microphone" }).then((M) => {
          M.state === "denied" ? (f(!1), m("El acceso al micrófono fue denegado en el navegador")) : M.state === "granted" && f(!0), M.onchange = () => {
            M.state === "denied" ? (f(!1), m("El acceso al micrófono fue denegado en el navegador")) : M.state === "granted" && (f(!0), m(null));
          };
        }).catch(() => {
        });
      } catch {
      }
  }, []), Q(() => {
    b.current && b.current.getAudioTracks().forEach((S) => {
      S.enabled = !r;
    }), r && (C.current = 0, d(0));
  }, [r]), Q(() => (t ? L() : z(), () => {
    z();
  }), [t, L, z]), {
    analyserNode: s,
    audioLevel: o,
    isRecording: u,
    hasPermission: h,
    error: p,
    start: L,
    stop: z
  };
}
export {
  oa as ActiveConversationProvider,
  Wi as ChatProvider,
  js as ConversationChatHeader,
  ci as ConversationChatPanel,
  qi as ConversationContextPanel,
  Vi as ConversationEmptyState,
  _i as ConversationsSidebarList,
  qs as EscalateSupportDialog,
  Hi as FloatingChat,
  en as LIB_VERSION,
  Rt as MessageRichText,
  mi as NewConversationDialog,
  Ni as RequestSupportForm,
  Gs as ResolveSupportDialog,
  Qs as VoiceAudioEngine,
  ri as VoiceAudioVisualizerCard,
  Js as VoiceCallClient,
  si as VoiceCallConnecting,
  ai as VoiceCallControls,
  oi as VoiceCallDialog,
  ii as VoiceCallEndedSummary,
  ei as VoiceCallHeader,
  li as VoiceMinimizedIsland,
  ni as VoiceTranscriptList,
  ti as VoiceWaveformCanvas,
  ut as activeConversationStore,
  Ks as buildVoiceWebSocketUrl,
  _s as chatBotQueueStatusService,
  Es as chatBotQueueToTicketService,
  jr as closeConversationService,
  ks as escalateChatSupportService,
  Rr as getConversationSessionId,
  Is as hasMessengerPermission,
  br as playNotificationSound,
  yt as removeConversationSessionId,
  ys as requestChatSupportService,
  Ss as resolveChatSupportService,
  Yr as sanitizeUrl,
  mr as saveConversationSessionId,
  ca as useActiveConversation,
  Ds as useChatBotQueuePolling,
  Ms as useChatBotQueueToTicket,
  Ge as useChatContext,
  Ke as useCheckHasPermissionMessenger,
  hs as useCloseConversation,
  ws as useConversationChat,
  fi as useConversationsPage,
  Ps as useEscalateChatSupport,
  Mr as useOptionalChatContext,
  Ui as useRequiredActiveConversation,
  Ts as useResolveChatSupport,
  Oi as useShowConversation,
  Zs as useVoiceCall,
  Gi as useVoiceMicrophone
};
//# sourceMappingURL=index.js.map
