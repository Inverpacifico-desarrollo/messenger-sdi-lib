"use client";
import { jsx as e, jsxs as s, Fragment as be } from "react/jsx-runtime";
import { createContext as He, useState as _, useMemo as le, useEffect as O, useContext as We, forwardRef as et, useRef as q, useCallback as Q, useLayoutEffect as Et } from "react";
import { QueryClient as Xt, QueryClientProvider as Yt, useInfiniteQuery as Jt, useMutation as Zt, useQueryClient as De, useQuery as At, keepPreviousData as Lt } from "@tanstack/react-query";
import er from "axios";
import { twMerge as tr } from "tailwind-merge";
import { Users as ut, X as ae, CheckCircle2 as Xe, Loader2 as je, Lock as Ne, ArrowLeft as mt, Info as rr, FileText as ar, Download as nr, Clock as ht, CheckCheck as sr, ChevronsDown as ir, Paperclip as Ct, SendHorizontal as Ft, UploadCloud as lr, ShieldCheck as ft, Ticket as or, RotateCcw as dr, MessagesSquare as pt, MessageSquarePlus as Ie, User as Ye, Search as It, Check as cr, AlertTriangle as tt, MessageCircleMore as ur, WifiOff as Rt, LifeBuoy as ct, ChevronRight as zt, AlertCircle as mr, Tag as hr, MessageSquare as fr, Bot as pr, RefreshCw as xt, Inbox as xr, CalendarDays as br } from "lucide-react";
import { createPortal as Ht } from "react-dom";
import { toast as re } from "sonner";
import { parseISO as bt, isValid as gr, isToday as vr, isYesterday as wr, isThisWeek as Nr, format as Je } from "date-fns";
import yr from "pusher-js";
typeof globalThis < "u" && typeof globalThis.self > "u" && (globalThis.self = globalThis);
let Se = null;
const kr = (t) => {
  Se = t;
}, Cr = (t) => Object.entries(t).reduce((r, [a, n]) => (r[a] = typeof n == "boolean" ? Number(n) : n, r), {}), J = (t, r) => {
  if (!Se)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  return `${Se.apiBaseUrl.replace(/\/+$/, "")}/${t}/api/${r}`;
}, Z = async ({
  data: t,
  url: r,
  params: a,
  method: n,
  headers: i,
  ...l
}) => {
  if (!Se)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const o = {
    ...l,
    url: r,
    method: n,
    data: t,
    params: a ? Cr(a) : void 0,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...Se.authToken ? { Authorization: `Bearer ${Se.authToken}` } : {},
      ...i
    }
  };
  return er.request(o);
}, zr = (t) => Z({
  url: `${J("messenger", "v1")}/users`,
  method: "GET",
  params: t
}), _r = (t) => Z({
  url: `${J("messenger", "v1")}/users/${t}/user`,
  method: "GET"
}), Sr = ({
  applicationId: t,
  userId: r
}) => Z({
  url: `${J("auth", "v1")}/users/${r}/permissions`,
  method: "GET",
  params: {
    application_id: t
  }
}), jr = () => Z({
  url: `${J("auth", "v1")}/me`,
  method: "GET"
}), gt = He(null);
function Dr(t) {
  var a, n, i, l;
  const r = [];
  return (a = t.apiBaseUrl) != null && a.trim() || r.push("apiBaseUrl"), (t.applicationId === void 0 || t.applicationId === null) && r.push("applicationId"), t.reverb ? ((n = t.reverb.key) != null && n.trim() || r.push("reverb.key"), (i = t.reverb.host) != null && i.trim() || r.push("reverb.host"), (!Number.isFinite(t.reverb.port) || t.reverb.port <= 0) && r.push("reverb.port"), (l = t.reverb.wsPath) != null && l.trim() || r.push("reverb.wsPath"), t.reverb.scheme !== "http" && t.reverb.scheme !== "https" && r.push("reverb.scheme")) : r.push("reverb"), r.length > 0 ? new Error(`Configuración incompleta del chat: ${r.join(", ")}`) : null;
}
function Hn({ config: t, children: r }) {
  const [a] = _(
    () => new Xt({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: !1,
          retry: 1,
          staleTime: 12e4
        }
      }
    })
  ), { authToken: n, apiBaseUrl: i, applicationId: l, reverb: o } = t, c = le(
    () => Dr(t),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      i,
      l,
      o == null ? void 0 : o.key,
      o == null ? void 0 : o.host,
      o == null ? void 0 : o.port,
      o == null ? void 0 : o.wsPath,
      o == null ? void 0 : o.scheme
    ]
  ), [d, m] = _(null), [f, u] = _([]), [p, b] = _(null), [x, y] = _(null), [C, S] = _(null), h = JSON.stringify([i, l, n]);
  O(() => {
    c && console.error(`[Chat] ${c.message}`);
  }, [c]), O(() => {
    let v = !0;
    return c || !n ? () => {
      v = !1;
    } : (kr({
      apiBaseUrl: i,
      authToken: n
    }), (async () => {
      var U;
      try {
        const k = await jr(), P = (await _r(k.data.data.id)).data.data;
        if (!(P != null && P.id))
          throw new Error("La respuesta no contiene un usuario válido para el chat");
        const pe = ((U = (await Sr({
          userId: P.attributes.user_auth_id,
          applicationId: l
        })).data.data) == null ? void 0 : U.map((Te) => Te.attributes.name)) ?? [];
        v && (m(P), u(pe), b(h), y(null), S(null));
      } catch (k) {
        v && (console.error("Error al cargar el usuario en ChatProvider:", k), y(k instanceof Error ? k : new Error("Error al inicializar el chat")), S(h));
      }
    })(), () => {
      v = !1;
    });
  }, [c, n, i, l, h]);
  const w = (v) => {
    m(v);
  }, H = le(() => d != null && d.id ? String(d.id) : "", [d]), z = !!(d != null && d.id) && p === h, D = C === h && x !== null, T = {
    currentUser: d,
    currentUserId: H,
    permissions: f,
    isLoadingUser: !c && !!n && !z && !D,
    hasError: !!c || D,
    error: c ?? (D ? x : null),
    config: t,
    setCurrentUser: w
  };
  return /* @__PURE__ */ e(Yt, { client: a, children: /* @__PURE__ */ e(gt.Provider, { value: T, children: r }) });
}
function Wn() {
  return We(gt);
}
function ne() {
  const t = We(gt);
  if (!t)
    throw new Error("useChatContext debe usarse dentro de un ChatProvider");
  return t;
}
function N(...t) {
  const r = [], a = (n) => {
    if (n) {
      if (typeof n == "string" || typeof n == "number")
        r.push(String(n));
      else if (Array.isArray(n))
        n.forEach(a);
      else if (typeof n == "object")
        for (const [i, l] of Object.entries(n))
          l && r.push(i);
    }
  };
  return t.forEach(a), tr(r.join(" "));
}
const E = et(
  ({ className: t, variant: r = "default", size: a = "default", type: n = "button", disabled: i, children: l, ...o }, c) => {
    const d = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer", m = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-xs",
      primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-xs",
      outline: "border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300",
      secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
    }, f = {
      default: "h-9 px-4 py-2 text-sm rounded-lg gap-2",
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      lg: "h-10 px-6 text-base rounded-xl gap-2.5",
      icon: "size-9 p-0 rounded-lg",
      "icon-sm": "size-8 p-0 rounded-lg"
    };
    return /* @__PURE__ */ e(
      "button",
      {
        ref: c,
        type: n,
        disabled: i,
        className: N(d, m[r], f[a], t),
        ...o,
        children: l
      }
    );
  }
);
E.displayName = "ChatButton";
const vt = et(
  ({ className: t, type: r = "text", disabled: a, ...n }, i) => /* @__PURE__ */ e(
    "input",
    {
      ref: i,
      type: r,
      disabled: a,
      className: N(
        "flex h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        t
      ),
      ...n
    }
  )
);
vt.displayName = "ChatInput";
const wt = et(
  ({ className: t, disabled: r, ...a }, n) => /* @__PURE__ */ e(
    "textarea",
    {
      ref: n,
      disabled: r,
      className: N(
        "flex min-h-15 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        t
      ),
      ...a
    }
  )
);
wt.displayName = "ChatTextarea";
function fe({ className: t, variant: r = "default", children: a, ...n }) {
  return /* @__PURE__ */ e("span", { className: N("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
  }[r], t), ...n, children: a });
}
function Pr(t) {
  if (!t) return "?";
  const r = t.trim().split(/\s+/);
  return r.length === 1 ? r[0].substring(0, 2).toUpperCase() : (r[0][0] + r[r.length - 1][0]).toUpperCase();
}
const _t = [
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
function Tr(t) {
  if (!t) return "#62748e";
  let r = 0;
  for (let a = 0; a < (t || "").length; a++)
    r = (r << 5) - r + (t || "").charCodeAt(a), r |= 0;
  return _t[Math.abs(r) % _t.length];
}
function ge({
  src: t,
  name: r = "",
  size: a = "md",
  isGroup: n = !1,
  status: i,
  className: l,
  ...o
}) {
  const [c, d] = _(!1), m = {
    xs: { box: "size-6", text: "text-[10px]", icon: "size-3", statusDot: "size-1.5" },
    sm: { box: "size-8", text: "text-xs", icon: "size-3.5", statusDot: "size-2" },
    md: { box: "size-10", text: "text-sm", icon: "size-5", statusDot: "size-2.5" },
    lg: { box: "size-12", text: "text-base", icon: "size-6", statusDot: "size-3" },
    xl: { box: "size-16", text: "text-xl", icon: "size-8", statusDot: "size-3.5" }
  }, { box: f, text: u, icon: p, statusDot: b } = m[a], x = Pr(r), y = le(() => Tr(r), [r]), C = !!t && !c;
  return /* @__PURE__ */ s("div", { className: N("relative inline-block shrink-0", f, l), ...o, children: [
    /* @__PURE__ */ e(
      "div",
      {
        className: N(
          "flex size-full items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          !C && (n ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "font-semibold text-xs")
        ),
        style: !C && !n ? {
          backgroundColor: `${y}33`,
          color: `${y}FF`,
          fontWeight: "bold"
        } : void 0,
        children: C ? /* @__PURE__ */ e(
          "img",
          {
            src: t,
            alt: r || "Avatar",
            onError: () => d(!0),
            className: "size-full object-cover",
            loading: "lazy"
          }
        ) : n ? /* @__PURE__ */ e(ut, { className: p }) : /* @__PURE__ */ e("span", { className: N("font-bold tracking-tight", u), children: x })
      }
    ),
    i && /* @__PURE__ */ e(
      "span",
      {
        className: N(
          "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-900",
          b,
          i === "online" && "bg-emerald-500",
          i === "offline" && "bg-neutral-400",
          i === "busy" && "bg-amber-500"
        )
      }
    )
  ] });
}
const Wt = He(null);
function Mr() {
  const t = We(Wt);
  if (!t)
    throw new Error("Los subcomponentes de Dialog deben usarse dentro de <Dialog>");
  return t;
}
function Er({ open: t, onOpenChange: r, children: a }) {
  return O(() => {
    if (!t) return;
    const n = (l) => {
      l.key === "Escape" && r(!1);
    }, i = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = i, window.removeEventListener("keydown", n);
    };
  }, [t, r]), /* @__PURE__ */ e(Wt.Provider, { value: { open: t, onOpenChange: r }, children: a });
}
function Ar({ className: t, children: r, showClose: a = !0, ...n }) {
  const { open: i, onOpenChange: l } = Mr(), o = q(null);
  return !i || typeof window > "u" ? null : Ht(
    /* @__PURE__ */ e(
      "div",
      {
        ref: o,
        onClick: (d) => {
          d.target === o.current && l(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ s(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            className: N(
              "relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden transition-all animate-in zoom-in-95 duration-150 text-neutral-900 dark:text-neutral-100",
              t
            ),
            ...n,
            children: [
              a && /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: () => l(!1),
                  "aria-label": "Cerrar",
                  className: "absolute right-3.5 top-3.5 z-20 rounded-lg p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                  children: /* @__PURE__ */ e(ae, { className: "size-4" })
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
function Lr({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: N("flex flex-col gap-1.5 text-left p-5 pb-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", t), ...r });
}
function Fr({ className: t, ...r }) {
  return /* @__PURE__ */ e("h3", { className: N("text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100", t), ...r });
}
function Ir({ className: t, ...r }) {
  return /* @__PURE__ */ e("p", { className: N("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", t), ...r });
}
function Rr({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: N("flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", t), ...r });
}
const Bt = He(null);
function Ut() {
  const t = We(Bt);
  if (!t)
    throw new Error("Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>");
  return t;
}
function Hr({ open: t, onOpenChange: r, children: a }) {
  return O(() => {
    if (!t) return;
    const n = (l) => {
      l.key === "Escape" && r(!1);
    }, i = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = i, window.removeEventListener("keydown", n);
    };
  }, [t, r]), /* @__PURE__ */ e(Bt.Provider, { value: { open: t, onOpenChange: r }, children: a });
}
function Wr({ className: t, children: r, ...a }) {
  const { open: n, onOpenChange: i } = Ut(), l = q(null);
  return !n || typeof window > "u" ? null : Ht(
    /* @__PURE__ */ e(
      "div",
      {
        ref: l,
        onClick: (c) => {
          c.target === l.current && i(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ e(
          "div",
          {
            role: "alertdialog",
            "aria-modal": "true",
            className: N(
              "relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-5 text-neutral-900 dark:text-neutral-100 transition-all animate-in zoom-in-95 duration-150",
              t
            ),
            ...a,
            children: r
          }
        )
      }
    ),
    document.body
  );
}
function Br({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: N("flex flex-col gap-2 text-left", t), ...r });
}
function Ur({ className: t, ...r }) {
  return /* @__PURE__ */ e("h3", { className: N("text-sm font-bold text-neutral-900 dark:text-neutral-100", t), ...r });
}
function qr({ className: t, ...r }) {
  return /* @__PURE__ */ e("p", { className: N("text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", t), ...r });
}
function Or({ className: t, ...r }) {
  return /* @__PURE__ */ e("div", { className: N("flex items-center justify-end gap-2 mt-4", t), ...r });
}
function $r({
  className: t,
  onClick: r,
  children: a,
  ...n
}) {
  const { onOpenChange: i } = Ut();
  return /* @__PURE__ */ e(
    E,
    {
      variant: "outline",
      size: "sm",
      onClick: (l) => {
        i(!1), r == null || r(l);
      },
      className: N("text-xs", t),
      ...n,
      children: a || "Cancelar"
    }
  );
}
function Vr({
  className: t,
  variant: r = "danger",
  size: a = "sm",
  ...n
}) {
  return /* @__PURE__ */ e(E, { variant: r, size: a, className: N("text-xs font-semibold", t), ...n });
}
He(null);
const qt = He(null);
function Gr() {
  const t = We(qt);
  if (!t)
    throw new Error("Los subcomponentes de Tabs deben usarse dentro de <Tabs>");
  return t;
}
function Ot({
  value: t,
  defaultValue: r = "",
  onValueChange: a,
  className: n,
  children: i,
  ...l
}) {
  const [o, c] = _(r), d = t !== void 0, m = d ? t : o, f = d ? a : c;
  return /* @__PURE__ */ e(qt.Provider, { value: { value: m, onValueChange: f }, children: /* @__PURE__ */ e("div", { className: N("flex flex-col gap-2 w-full", n), ...l, children: i }) });
}
function $t({ className: t, children: r, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: N(
        "flex w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 text-neutral-500 dark:text-neutral-400 gap-1",
        t
      ),
      ...a,
      children: r
    }
  );
}
function Ze({ value: t, className: r, children: a, ...n }) {
  const { value: i, onValueChange: l } = Gr(), o = i === t;
  return /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": o,
      onClick: () => l(t),
      className: N(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none cursor-pointer",
        o ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5",
        r
      ),
      ...n,
      children: a
    }
  );
}
const Be = et(
  ({ className: t, children: r, ...a }, n) => /* @__PURE__ */ e(
    "div",
    {
      ref: n,
      className: N(
        "relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]",
        t
      ),
      ...a,
      children: r
    }
  )
);
Be.displayName = "ChatScrollArea";
function Kr({
  orientation: t = "horizontal",
  className: r,
  ...a
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      role: "separator",
      "aria-orientation": t,
      className: N(
        "shrink-0 bg-neutral-200 dark:bg-neutral-800",
        t === "horizontal" ? "h-px w-full" : "h-full w-px",
        r
      ),
      ...a
    }
  );
}
function Qr({ className: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: N(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100",
        t
      ),
      ...r
    }
  );
}
function j({ className: t, ...r }) {
  return /* @__PURE__ */ e(
    "div",
    {
      className: N(
        "animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80",
        t
      ),
      ...r
    }
  );
}
const Re = (t) => t ? t.toLowerCase().split(" ").filter(Boolean).map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ") : "", Ue = (t) => !!t.attributes.is_group, qe = (t, r) => {
  var i;
  const a = ((i = t.relationships) == null ? void 0 : i.users) || [];
  if (!r)
    return a[0];
  const n = String(r);
  return a.find((l) => String(l.id) !== n) || a[0];
}, Pe = (t, r) => {
  var i;
  if (Ue(t))
    return t.attributes.name || "Grupo";
  const a = qe(t, r), n = ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i.name) || t.attributes.name || "Usuario";
  return Re(n);
};
function dt(t) {
  return (r = {}) => {
    const a = r.width ? String(r.width) : t.defaultWidth;
    return t.formats[a] || t.formats[t.defaultWidth];
  };
}
function Le(t) {
  return (r, a) => {
    const n = a != null && a.context ? String(a.context) : "standalone";
    let i;
    if (n === "formatting" && t.formattingValues) {
      const o = t.defaultFormattingWidth || t.defaultWidth, c = a != null && a.width ? String(a.width) : o;
      i = t.formattingValues[c] || t.formattingValues[o];
    } else {
      const o = t.defaultWidth, c = a != null && a.width ? String(a.width) : t.defaultWidth;
      i = t.values[c] || t.values[o];
    }
    const l = t.argumentCallback ? t.argumentCallback(r) : r;
    return i[l];
  };
}
function Fe(t) {
  return (r, a = {}) => {
    const n = a.width, i = n && t.matchPatterns[n] || t.matchPatterns[t.defaultMatchWidth], l = r.match(i);
    if (!l)
      return null;
    const o = l[0], c = n && t.parsePatterns[n] || t.parsePatterns[t.defaultParseWidth], d = Array.isArray(c) ? Yr(c, (u) => u.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      Xr(c, (u) => u.test(o))
    );
    let m;
    m = t.valueCallback ? t.valueCallback(d) : d, m = a.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      a.valueCallback(m)
    ) : m;
    const f = r.slice(o.length);
    return { value: m, rest: f };
  };
}
function Xr(t, r) {
  for (const a in t)
    if (Object.prototype.hasOwnProperty.call(t, a) && r(t[a]))
      return a;
}
function Yr(t, r) {
  for (let a = 0; a < t.length; a++)
    if (r(t[a]))
      return a;
}
function Jr(t) {
  return (r, a = {}) => {
    const n = r.match(t.matchPattern);
    if (!n) return null;
    const i = n[0], l = r.match(t.parsePattern);
    if (!l) return null;
    let o = t.valueCallback ? t.valueCallback(l[0]) : l[0];
    o = a.valueCallback ? a.valueCallback(o) : o;
    const c = r.slice(i.length);
    return { value: o, rest: c };
  };
}
const Zr = {
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
}, ea = (t, r, a) => {
  let n;
  const i = Zr[t];
  return typeof i == "string" ? n = i : r === 1 ? n = i.one : n = i.other.replace("{{count}}", r.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "en " + n : "hace " + n : n;
}, ta = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, ra = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, aa = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, na = {
  date: dt({
    formats: ta,
    defaultWidth: "full"
  }),
  time: dt({
    formats: ra,
    defaultWidth: "full"
  }),
  dateTime: dt({
    formats: aa,
    defaultWidth: "full"
  })
}, sa = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, ia = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, la = (t, r, a, n) => r.getHours() !== 1 ? ia[t] : sa[t], oa = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, da = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, ca = {
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
}, ua = {
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
}, ma = {
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
}, ha = {
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
}, fa = (t, r) => Number(t) + "º", pa = {
  ordinalNumber: fa,
  era: Le({
    values: oa,
    defaultWidth: "wide"
  }),
  quarter: Le({
    values: da,
    defaultWidth: "wide",
    argumentCallback: (t) => Number(t) - 1
  }),
  month: Le({
    values: ca,
    defaultWidth: "wide"
  }),
  day: Le({
    values: ua,
    defaultWidth: "wide"
  }),
  dayPeriod: Le({
    values: ma,
    defaultWidth: "wide",
    formattingValues: ha,
    defaultFormattingWidth: "wide"
  })
}, xa = /^(\d+)(º)?/i, ba = /\d+/i, ga = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, va = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, wa = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Na = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ya = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, ka = {
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
}, Ca = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, za = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, _a = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, Sa = {
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
}, ja = {
  ordinalNumber: Jr({
    matchPattern: xa,
    parsePattern: ba,
    valueCallback: function(t) {
      return parseInt(t, 10);
    }
  }),
  era: Fe({
    matchPatterns: ga,
    defaultMatchWidth: "wide",
    parsePatterns: va,
    defaultParseWidth: "any"
  }),
  quarter: Fe({
    matchPatterns: wa,
    defaultMatchWidth: "wide",
    parsePatterns: Na,
    defaultParseWidth: "any",
    valueCallback: (t) => t + 1
  }),
  month: Fe({
    matchPatterns: ya,
    defaultMatchWidth: "wide",
    parsePatterns: ka,
    defaultParseWidth: "any"
  }),
  day: Fe({
    matchPatterns: Ca,
    defaultMatchWidth: "wide",
    parsePatterns: za,
    defaultParseWidth: "any"
  }),
  dayPeriod: Fe({
    matchPatterns: _a,
    defaultMatchWidth: "any",
    parsePatterns: Sa,
    defaultParseWidth: "any"
  })
}, St = {
  code: "es",
  formatDistance: ea,
  formatLong: na,
  formatRelative: la,
  localize: pa,
  match: ja,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, Da = ({
  conversationId: t,
  sender: r,
  body: a,
  file: n
}) => {
  const i = `optimistic-${Date.now()}`, l = (/* @__PURE__ */ new Date()).toISOString(), o = Number(r.id), c = r.attributes || {}, d = c.name || c.username || "Usuario", m = c.avatar_url ?? c.avatar ?? null, f = {
    id: String(r.id),
    type: "user",
    attributes: {
      user_auth_id: c.user_auth_id ?? r.id,
      name: d,
      avatar_url: m,
      created_at: l,
      updated_at: l
    },
    relationships: []
  };
  return {
    id: i,
    type: "message",
    attributes: {
      conversation_id: Number(t),
      created_at: l,
      sender_id: o,
      body: a || "Archivo adjunto",
      type: { id: 0, name: "message", icon: "" }
    },
    relationships: {
      sender: f,
      attachments: n ? [
        {
          id: `${i}-attachment`,
          type: "messageAttachment",
          attributes: {
            file_url: URL.createObjectURL(n),
            file_name: n.name,
            file_mime_type: n.type,
            file_size: n.size,
            created_at: l
          },
          relationships: []
        }
      ] : []
    },
    local_status: "sending"
  };
};
function Pa(t) {
  return t.slice(0, 10);
}
function Ta(t, r) {
  if (r.attributes.sender_id == null) return t;
  const a = Pa(r.attributes.created_at || ""), n = t[0];
  return n && n.date === a ? n.messages.some((i) => i.id === r.id) ? t : [{ ...n, messages: [r, ...n.messages] }, ...t.slice(1)] : [{ date: a, messages: [r] }, ...t];
}
function Vt(t, r) {
  if (t.length === 0) return r;
  if (r.length === 0) return t;
  const a = t[t.length - 1], n = r[0];
  if (n.date === a.date) {
    const i = new Set(a.messages.map((o) => o.id)), l = n.messages.filter((o) => !i.has(o.id));
    return [
      ...t.slice(0, -1),
      { date: a.date, messages: [...a.messages, ...l] },
      ...r.slice(1)
    ];
  }
  return [...t, ...r];
}
function jt(t) {
  if (!t) return "Hoy";
  const r = t.trim().toLowerCase();
  if (r === "hoy" || r === "today") return "Hoy";
  if (r === "ayer" || r === "yesterday") return "Ayer";
  const a = bt(t);
  return gr(a) ? vr(a) ? "Hoy" : wr(a) ? "Ayer" : Nr(a, { weekStartsOn: 1 }) ? Je(a, "EEEE", { locale: St }) : Je(a, "d 'de' MMMM 'de' yyyy", { locale: St }) : t;
}
const Ma = async ({
  conversation: t,
  ...r
}) => await Z({
  url: `${J("messenger", "v1")}/conversations/${t}/messages`,
  method: "GET",
  params: r
}), Ea = (t, r) => Z({
  url: `${J("messenger", "v1")}/conversations/${t}/messages`,
  method: "POST",
  data: r
}), Aa = (t, r) => {
  const a = new FormData();
  return a.append("file", r.file), a.append("sender_id", r.sender_id.toString()), r.caption && a.append("caption", r.caption), Z({
    url: `${J("messenger", "v1")}/conversations/${t}/file`,
    method: "POST",
    data: a,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}, La = ({ params: t, enabled: r = !0 }) => {
  var l, o, c, d, m, f, u;
  const a = Jt({
    queryKey: ["list-messages", t],
    queryFn: ({ pageParam: p }) => {
      const b = p && p !== "null" && p !== "undefined" && p.trim() !== "" ? p : void 0;
      return Ma({
        ...t,
        ...b ? { cursor: b } : {},
        page: {
          ...t == null ? void 0 : t.page,
          ...b ? { cursor: b } : {}
        }
      });
    },
    initialPageParam: "",
    getNextPageParam: (p, b, x, y) => {
      var H, z, D, A;
      const C = ((H = p == null ? void 0 : p.data) == null ? void 0 : H.data) ?? [];
      if (!Array.isArray(C) || C.length === 0 || C.reduce(
        (F, T) => F + (Array.isArray(T == null ? void 0 : T.messages) ? T.messages.length : 0),
        0
      ) === 0)
        return;
      const h = (z = p == null ? void 0 : p.data) == null ? void 0 : z.meta;
      if ((h == null ? void 0 : h.has_more) === !1)
        return;
      let w = h == null ? void 0 : h.next_cursor;
      if (!w) {
        const F = (A = (D = p == null ? void 0 : p.data) == null ? void 0 : D.links) == null ? void 0 : A.next;
        if (F)
          try {
            const T = new URL(F, "http://localhost");
            w = T.searchParams.get("page[cursor]") || T.searchParams.get("cursor") || void 0;
          } catch {
          }
      }
      if (!(!w || w === "null" || w === "undefined" || w.trim() === "") && !(x && w === x) && !(y && y.includes(w)))
        return w;
    },
    enabled: r && !!(t != null && t.conversation),
    refetchOnWindowFocus: !1
  }), n = (l = a.data) == null ? void 0 : l.pages;
  return {
    data: le(() => n ? n.reduce((p, b) => {
      var y;
      const x = ((y = b == null ? void 0 : b.data) == null ? void 0 : y.data) ?? [];
      return Vt(p, x);
    }, []) : [], [n]),
    rawPages: (o = a.data) == null ? void 0 : o.pages,
    isLoading: a.isLoading,
    isPending: a.isPending,
    isFetching: a.isFetching,
    isFetchingNextPage: a.isFetchingNextPage,
    hasNextPage: !!a.hasNextPage,
    fetchNextPage: a.fetchNextPage,
    errors: ((c = a.error) == null ? void 0 : c.data) ?? {},
    refetch: a.refetch,
    meta: (u = (f = (m = (d = a.data) == null ? void 0 : d.pages) == null ? void 0 : m[0]) == null ? void 0 : f.data) == null ? void 0 : u.meta
  };
};
function ye(t, r) {
  const a = Zt({
    mutationFn: t,
    ...r
  });
  return {
    ...a,
    isLoading: a.isPending
  };
}
const Fa = () => ye(
  ({ conversationId: t, body: r, sender_id: a }) => Ea(t, { body: r, sender_id: a }).then(
    (n) => n.data.data
  )
), Ia = () => ye(
  ({ conversationId: t, file: r, sender_id: a, caption: n }) => Aa(t, { file: r, sender_id: a, caption: n }).then(
    (i) => i.data.data
  )
), Ra = (t) => Z({
  url: `${J("messenger", "v1")}/conversations`,
  method: "GET",
  params: t
}), Ha = (t) => Z({
  url: `${J("messenger", "v1")}/conversations`,
  method: "POST",
  data: t
}), Wa = ({
  conversationId: t,
  read_until: r,
  user_id: a
}) => Z({
  url: `${J("messenger", "v1")}/conversations/${t}/read`,
  method: "POST",
  data: { read_until: r, user_id: a }
}), Ba = ({
  conversationId: t,
  user_id: r,
  is_typing: a
}) => Z({
  url: `${J("messenger", "v1")}/conversations/${t}/typing`,
  method: "POST",
  data: { user_id: r, is_typing: a }
}), Ua = (t) => Z({
  url: `${J("messenger", "v1")}/conversations/${t}/close`,
  method: "POST"
}), qa = () => {
  const t = De(), r = Q(async (a) => {
    const n = await Wa(a);
    return await t.invalidateQueries({ queryKey: ["list-conversations"] }), await t.invalidateQueries({ queryKey: ["conversation", a.conversationId] }), n.data.data;
  }, [t]);
  return ye(
    r
  );
}, Oa = () => ye(
  (t) => Ba(t).then(() => {
  })
), $a = () => {
  const t = De(), r = Q(async (a) => {
    const n = await Ua(a);
    return await t.invalidateQueries({ queryKey: ["list-conversations"] }), await t.invalidateQueries({ queryKey: ["conversation", a] }), n.data.data;
  }, [t]);
  return ye(
    r
  );
};
function Nt(t) {
  return t != null && typeof t == "object" && "attributes" in t;
}
function X(t) {
  return t == null ? "" : String(t);
}
function Va(t) {
  if (t == null || typeof t != "object") return;
  if (Nt(t)) return t;
  const r = t;
  return {
    id: X(r.id),
    type: "user",
    attributes: {
      user_auth_id: Number(r.user_auth_id),
      name: X(r.name),
      avatar_url: X(r.avatar_url),
      created_at: X(r.created_at),
      updated_at: X(r.updated_at)
    },
    relationships: []
  };
}
function Ga(t) {
  if (t == null || typeof t != "object") return;
  if (Nt(t)) return t;
  const r = t;
  return {
    id: X(r.id),
    type: "messageAttachment",
    attributes: {
      file_url: X(r.file_url),
      file_name: X(r.file_name),
      file_mime_type: X(r.file_mime_type),
      file_size: Number(r.file_size),
      created_at: X(r.created_at)
    },
    relationships: []
  };
}
function Ka(t) {
  return typeof t == "string" ? { id: 0, name: t, icon: "" } : t != null && typeof t == "object" ? t : null;
}
function Qa(t) {
  if (t == null || typeof t != "object")
    return {
      id: "",
      type: "message",
      attributes: {},
      relationships: { sender: void 0, attachments: [] }
    };
  if (Nt(t)) return t;
  const r = t, a = Array.isArray(r.attachments) ? r.attachments.map(Ga).filter((n) => n != null) : [];
  return {
    id: X(r.id),
    type: "message",
    attributes: {
      conversation_id: Number(r.conversation_id),
      sender_id: Number(r.sender_id),
      body: X(r.body),
      type: Ka(r.type),
      created_at: X(r.created_at),
      updated_at: X(r.updated_at)
    },
    relationships: {
      sender: Va(r.sender),
      attachments: a
    }
  };
}
let _e = null, Dt = null;
function Gt(t) {
  if (typeof window > "u")
    return null;
  const r = JSON.stringify(t);
  return _e && Dt !== r && (_e.disconnect(), _e = null), _e || (_e = new yr(
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
  ), Dt = r), _e;
}
function Xa(t, r, a, n) {
  if (typeof window > "u")
    return () => {
    };
  const i = Gt(t);
  if (!i) return () => {
  };
  const l = i.subscribe(`conversation.${r}`);
  if (l.bind("MessageSent", (o) => {
    a(Qa(o));
  }), n) {
    const o = (c) => n(c);
    l.bind("UserTyping", o), l.bind("client-UserTyping", o);
  }
  return () => {
    l.unbind_all(), i.unsubscribe(`conversation.${r}`);
  };
}
function Ya(t, r, a, n) {
  if (typeof window > "u")
    return () => {
    };
  const i = Gt(t);
  if (!i) return () => {
  };
  const l = i.subscribe(`user.${r}`);
  return l.bind("ConversationUnreadUpdated", (o) => {
    a(o);
  }), n && (l.bind("ConversationCreated", (o) => {
    n(o);
  }), l.bind("conversation.created", (o) => {
    n(o);
  }), l.bind("NewConversation", (o) => {
    n(o);
  })), () => {
    l.unbind_all(), i.unsubscribe(`user.${r}`);
  };
}
const Ja = (t, r) => {
  const a = De(), { config: n, currentUser: i, currentUserId: l } = ne(), o = le(
    () => ({ conversation: t.id, page: { size: "20" } }),
    [t.id]
  ), {
    data: c,
    refetch: d,
    fetchNextPage: m,
    hasNextPage: f,
    isFetchingNextPage: u,
    isLoading: p
  } = La({
    params: o,
    enabled: !!t.id
  }), { mutateAsync: b, isLoading: x } = Fa(), { mutateAsync: y, isLoading: C } = Ia(), { mutateAsync: S } = qa(), { mutate: h } = Oa(), { mutateAsync: w, isLoading: H } = $a(), [z, D] = _(""), [A, F] = _(null), T = !!t.attributes.closed_at, [v, M] = _([]), [U, k] = _(!0), [K, P] = _(0), [I, pe] = _("Hoy"), [Te, Me] = _(null), oe = q(null), ke = q(!1), se = q(!1), ee = q(0), ve = q(0), Ce = q(!1), ce = q(f), ue = q(t.id), xe = q(null), me = q(null), V = q(null), Oe = q(!1), $e = q(h), rt = Pe(t, l);
  O(() => {
    $e.current = h;
  }, [h]), O(() => {
    Ce.current = u;
  }, [u]), O(() => {
    ce.current = f;
  }, [f]);
  const at = Q(() => {
    const g = oe.current;
    g && (g.scrollTo({
      top: g.scrollHeight,
      behavior: "smooth"
    }), P(0), k(!0));
  }, []), Ve = Q(() => {
    const g = oe.current;
    if (!g) return;
    const R = g.scrollHeight - g.scrollTop - g.clientHeight < 140;
    if (k(R), R) {
      P(0), pe("Hoy");
      return;
    }
    const B = g.querySelectorAll("[data-date-group]");
    if (B.length === 0) {
      pe("Hoy");
      return;
    }
    const G = g.scrollTop;
    let te = "";
    for (let $ = 0; $ < B.length; $++) {
      const ie = B[$];
      if (ie.offsetTop + ie.offsetHeight >= G + 30) {
        te = ie.getAttribute("data-date-group") || "";
        break;
      }
    }
    pe(te || "Hoy");
  }, []);
  O(() => {
    ue.current !== t.id && (ue.current = t.id, ke.current = !1, se.current = !1, ee.current = 0, ve.current = 0, M([]), k(!0), P(0), pe("Hoy"));
  }, [t.id]), O(() => {
    if (ke.current || p || c.length === 0) return;
    const g = oe.current;
    g && (g.scrollTop = g.scrollHeight, ke.current = !0, k(!0));
  }, [t.id, p, c.length]), Et(() => {
    const g = oe.current;
    if (g && ee.current > 0) {
      const R = g.scrollHeight - ee.current;
      R > 0 && (g.scrollTop = ve.current + R), ee.current = 0, ve.current = 0;
    }
  }, [c]), O(() => {
    if (v.length > 0) {
      const g = oe.current;
      if (g) {
        se.current = !0, g.scrollTo({
          top: g.scrollHeight,
          behavior: "smooth"
        });
        const W = setTimeout(() => {
          se.current = !1;
        }, 500);
        return () => clearTimeout(W);
      }
    }
  }, [v.length]), O(() => {
    const g = oe.current;
    if (!g) return;
    const W = () => {
      Ve(), !(se.current || !ke.current) && g.scrollTop < 80 && ce.current && !Ce.current && !p && (Ce.current = !0, ee.current = g.scrollHeight, ve.current = g.scrollTop, m().then((R) => {
        R != null && R.hasNextPage || (ce.current = !1);
      }).finally(() => {
        Ce.current = !1;
      }));
    };
    return g.addEventListener("scroll", W, { passive: !0 }), () => {
      g.removeEventListener("scroll", W);
    };
  }, [m, p, Ve]);
  const we = Q(() => {
    !t.id || !l || (xe.current && clearTimeout(xe.current), xe.current = setTimeout(() => {
      xe.current = null, S({
        conversationId: t.id,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: l
      }).catch(console.error);
    }, 600));
  }, [t.id, l, S]);
  O(() => () => {
    xe.current && clearTimeout(xe.current), me.current && clearTimeout(me.current), V.current && clearTimeout(V.current);
  }, [t.id]);
  const Ge = Q(
    (g) => {
      a.setQueryData(["list-messages", o], (R) => {
        var $;
        if (!(R != null && R.pages) || R.pages.length === 0) return R;
        const B = R.pages[0], G = (($ = B.data) == null ? void 0 : $.data) ?? [], te = Ta(G, g);
        return {
          ...R,
          pages: [
            {
              ...B,
              data: {
                ...B.data,
                data: te
              }
            },
            ...R.pages.slice(1)
          ]
        };
      });
      const W = oe.current;
      W && (W.scrollHeight - W.scrollTop - W.clientHeight < 160 ? setTimeout(() => {
        W.scrollTo({
          top: W.scrollHeight,
          behavior: "smooth"
        });
      }, 50) : P((B) => B + 1)), we();
    },
    [o, a, we]
  ), Ke = Q(
    (g) => {
      if (String(g.user_id) !== String(l)) {
        if (me.current && (clearTimeout(me.current), me.current = null), !g.is_typing) {
          Me(null);
          return;
        }
        Me(g.user.name), me.current = setTimeout(() => {
          me.current = null, Me(null);
        }, 2e3);
      }
    },
    [l]
  ), Y = Q(
    (g) => {
      !t.id || !l || Oe.current === g || (Oe.current = g, $e.current({
        conversationId: t.id,
        user_id: Number(l),
        is_typing: g
      }));
    },
    [t.id, l]
  ), Ee = Q(() => {
    V.current && clearTimeout(V.current), V.current = setTimeout(() => {
      V.current = null, Y(!1);
    }, 2500);
  }, [Y]), Ae = Q(
    (g) => {
      if (!T) {
        if (D(g), !g.trim()) {
          V.current && (clearTimeout(V.current), V.current = null), Y(!1);
          return;
        }
        Y(!0), Ee();
      }
    },
    [T, Ee, Y]
  );
  O(() => () => {
    V.current && (clearTimeout(V.current), V.current = null), Y(!1);
  }, [t.id, Y]);
  const ze = () => {
    t.attributes.unread_count && we();
  };
  O(() => {
    ze();
  }, [t, c, we]), O(() => {
    if (!t.id) return;
    const g = Xa(
      n.reverb,
      Number(t.id),
      Ge,
      Ke
    );
    return () => {
      g();
    };
  }, [n.reverb, t.id, Ge, Ke]);
  const nt = Q(
    (g) => {
      T || F(g);
    },
    [T]
  ), st = async () => {
    var G, te;
    if (T) return;
    const g = z.trim();
    if (!g && !A || !i) return;
    const W = A, R = Da({
      conversationId: t.id,
      sender: i,
      body: g,
      file: W
    }), B = R.id;
    M(($) => [...$, R]), D(""), V.current && (clearTimeout(V.current), V.current = null), Y(!1);
    try {
      const $ = W ? await y({
        conversationId: t.id,
        file: W,
        sender_id: Number(i.id),
        caption: g || void 0
      }) : await b({
        body: g,
        conversationId: t.id,
        sender_id: i.id
      });
      F(null), (((te = (G = (await d()).data) == null ? void 0 : G.pages) == null ? void 0 : te.reduce(
        (L, he) => {
          var Qe;
          return Vt(L, ((Qe = he.data) == null ? void 0 : Qe.data) ?? []);
        },
        []
      )) ?? []).some(
        (L) => L.messages.some((he) => he.id === $.id)
      ) && M((L) => L.filter((he) => he.id !== B)), we();
    } catch {
      M(
        ($) => $.map(
          (ie) => ie.id === B ? { ...ie, local_status: "error" } : ie
        )
      );
    }
  }, it = Q(async () => {
    var g, W, R;
    try {
      await w(t.id), re.success("Conversación cerrada exitosamente"), (g = r == null ? void 0 : r.onCloseSuccess) == null || g.call(r);
    } catch (B) {
      const G = ((R = (W = B == null ? void 0 : B.response) == null ? void 0 : W.data) == null ? void 0 : R.message) || (B == null ? void 0 : B.message) || "Error al cerrar la conversación";
      re.error(G);
    }
  }, [w, t.id, r]);
  return {
    messages: c,
    optimisticMessages: v,
    scrollRef: oe,
    conversationName: rt,
    inputText: z,
    pendingFile: A,
    isClosed: T,
    isClosing: H,
    isSending: x,
    isUploading: C,
    isFetchingNextPage: u,
    hasNextPage: f,
    isLoading: p,
    isNearBottom: U,
    newMessagesCount: K,
    typingUser: Te,
    visibleDate: I,
    currentUser: i,
    currentUserId: l,
    scrollToBottom: at,
    setInputText: Ae,
    setPendingFile: F,
    handleSendMessage: st,
    handleSelectFile: nt,
    handleCloseConversation: it
  };
};
function Za(t, r, a = "OR") {
  return a === "AND" ? r.every((n) => t.includes(n)) : r.some((n) => t.includes(n));
}
function de({
  permission: t,
  operator: r = "OR"
}) {
  const { permissions: a } = ne();
  return Za(a, t, r);
}
function en({
  conversation: t,
  isClosed: r = !!t.attributes.closed_at,
  isClosing: a = !1,
  onCloseConversation: n,
  showResolvedBadge: i = !1,
  className: l,
  ...o
}) {
  const [c, d] = _(!1), { currentUserId: m } = ne(), f = de({
    permission: ["messenger_chat_support.provide_support"]
  }), u = Pe(t, m);
  return r && i ? /* @__PURE__ */ s(
    fe,
    {
      variant: "outline",
      className: N(
        "h-8 px-2.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100/60 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-800 gap-1 select-none",
        l
      ),
      children: [
        /* @__PURE__ */ e(Xe, { className: "size-3.5 text-emerald-500" }),
        /* @__PURE__ */ e("span", { className: "hidden sm:inline-block", children: "Resuelta" })
      ]
    }
  ) : r && !i || !f ? null : /* @__PURE__ */ s(be, { children: [
    /* @__PURE__ */ e(
      E,
      {
        variant: "success",
        size: "sm",
        disabled: a,
        onClick: () => d(!0),
        className: N(
          "h-8 gap-1 px-2 sm:px-3 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs",
          l
        ),
        ...o,
        children: a ? /* @__PURE__ */ s(be, { children: [
          /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
          /* @__PURE__ */ e("span", { className: "hidden sm:inline-block", children: "Cerrando..." })
        ] }) : /* @__PURE__ */ s(be, { children: [
          /* @__PURE__ */ e(Xe, { className: "size-3.5" }),
          /* @__PURE__ */ e("span", { className: "hidden sm:inline-block", children: "Cerrar chat" })
        ] })
      }
    ),
    /* @__PURE__ */ e(Hr, { open: c, onOpenChange: d, children: /* @__PURE__ */ s(Wr, { className: "sm:max-w-md p-5", children: [
      /* @__PURE__ */ s(Br, { className: "gap-2", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ e("div", { className: "flex size-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20", children: /* @__PURE__ */ e(Ne, { className: "size-4" }) }),
          /* @__PURE__ */ e(Ur, { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "¿Cerrar conversación?" })
        ] }),
        /* @__PURE__ */ s(qr, { className: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: [
          "¿Estás seguro de que deseas marcar como resuelta y cerrar la conversación con",
          " ",
          /* @__PURE__ */ e("strong", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children: u }),
          "? Esta acción finalizará la atención en tiempo real."
        ] })
      ] }),
      /* @__PURE__ */ s(Or, { className: "gap-2 sm:gap-0 mt-3", children: [
        /* @__PURE__ */ e(
          $r,
          {
            disabled: a,
            className: "text-xs h-8 cursor-pointer",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ e(
          Vr,
          {
            disabled: a,
            onClick: () => {
              d(!1), n == null || n();
            },
            className: "text-xs h-8 bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer",
            children: "Sí, cerrar conversación"
          }
        )
      ] })
    ] }) })
  ] });
}
function tn({
  conversation: t,
  isClosed: r,
  isClosing: a = !1,
  onCloseConversation: n,
  isContextPanelOpen: i = !0,
  onToggleContextPanel: l,
  onBack: o,
  alwaysShowBackButton: c = !1
}) {
  var p, b;
  const { currentUserId: d } = ne(), m = Ue(t), f = Pe(t, d), u = qe(t, d);
  return /* @__PURE__ */ s("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 p-2 sm:p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs min-w-0", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden", children: [
      o && /* @__PURE__ */ e(
        E,
        {
          variant: "ghost",
          size: "sm",
          onClick: o,
          title: "Volver a la lista de chats",
          "aria-label": "Volver a la lista de chats",
          className: N(
            "size-8 p-0 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
            c ? "flex" : "flex md:hidden"
          ),
          children: /* @__PURE__ */ e(mt, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ e(
        ge,
        {
          src: u == null ? void 0 : u.attributes.avatar_url,
          name: f,
          isGroup: m,
          size: "md",
          className: "shrink-0"
        }
      ),
      /* @__PURE__ */ s("div", { className: "min-w-0 flex-1 overflow-hidden", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 min-w-0", children: [
          /* @__PURE__ */ e(
            "h3",
            {
              className: "truncate text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 min-w-0",
              title: f,
              children: f
            }
          ),
          r && /* @__PURE__ */ s(
            fe,
            {
              variant: "destructive",
              className: "inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium shrink-0 py-0 h-4.5 px-1.5",
              children: [
                /* @__PURE__ */ e(Ne, { className: "size-2.5" }),
                /* @__PURE__ */ e("span", { children: "Cerrada" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 min-w-0", children: /* @__PURE__ */ e("span", { className: "truncate", children: m ? `${((b = (p = t.relationships) == null ? void 0 : p.users) == null ? void 0 : b.length) || 0} participantes` : "Conversación individual" }) })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-1 shrink-0", children: [
      /* @__PURE__ */ e(
        en,
        {
          conversation: t,
          isClosed: r,
          isClosing: a,
          onCloseConversation: n,
          showResolvedBadge: !1
        }
      ),
      l && /* @__PURE__ */ e(
        E,
        {
          variant: "outline",
          size: "icon",
          onClick: l,
          className: N(
            "size-8 p-0",
            i ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" : ""
          ),
          children: /* @__PURE__ */ e(rr, { className: "size-4" })
        }
      )
    ] })
  ] });
}
function rn(t) {
  if (!t) return "";
  try {
    const r = new Date(t);
    return isNaN(r.getTime()) ? "" : r.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: !1 });
  } catch {
    return "";
  }
}
function Pt({
  message: t,
  isOwnMessage: r,
  isGroup: a,
  conversationName: n,
  conversationAvatarUrl: i
}) {
  var m, f, u, p, b, x, y;
  const l = Re(((u = (f = (m = t.relationships) == null ? void 0 : m.sender) == null ? void 0 : f.attributes) == null ? void 0 : u.name) || n), o = ((x = (b = (p = t.relationships) == null ? void 0 : p.sender) == null ? void 0 : b.attributes) == null ? void 0 : x.avatar_url) || void 0, c = rn(t.attributes.created_at), d = ((y = t.relationships) == null ? void 0 : y.attachments) ?? [];
  return /* @__PURE__ */ s(
    "div",
    {
      className: N(
        "flex items-start gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0",
        r && "ml-auto flex-row-reverse"
      ),
      children: [
        a && !r ? /* @__PURE__ */ e(
          ge,
          {
            name: l,
            src: o,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ) : r ? null : /* @__PURE__ */ e(
          ge,
          {
            name: n,
            src: i,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ s("div", { className: N("flex min-w-0 flex-col gap-1", r && "items-end"), children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate", children: r ? "Tú" : l }),
          /* @__PURE__ */ s(
            "div",
            {
              className: N(
                "rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words",
                r ? "rounded-tr-xs bg-blue-600 text-white shadow-xs" : "rounded-tl-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs"
              ),
              children: [
                d.map((C) => C.attributes.file_mime_type.startsWith("image/") ? /* @__PURE__ */ e(
                  "a",
                  {
                    href: C.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10",
                    children: /* @__PURE__ */ e(
                      "img",
                      {
                        src: C.attributes.file_url,
                        alt: C.attributes.file_name,
                        className: "max-h-64 max-w-full object-contain rounded-xl",
                        loading: "lazy"
                      }
                    )
                  },
                  C.id
                ) : /* @__PURE__ */ s(
                  "a",
                  {
                    href: C.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    download: C.attributes.file_name,
                    className: "mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                    children: [
                      /* @__PURE__ */ e(ar, { className: "size-4 shrink-0" }),
                      /* @__PURE__ */ e("span", { className: "min-w-0 flex-1 truncate font-medium", children: C.attributes.file_name }),
                      /* @__PURE__ */ e(nr, { className: "size-3.5 shrink-0" })
                    ]
                  },
                  C.id
                )),
                t.attributes.body && d.length === 0 && /* @__PURE__ */ e("p", { className: "whitespace-pre-wrap break-words", children: t.attributes.body }),
                t.attributes.body && d.length > 0 && t.attributes.body !== "Archivo adjunto" && /* @__PURE__ */ e("p", { className: "whitespace-pre-wrap break-words mt-1", children: t.attributes.body }),
                /* @__PURE__ */ s("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none", children: [
                  /* @__PURE__ */ e(
                    "time",
                    {
                      dateTime: t.attributes.created_at,
                      className: r ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400",
                      children: c
                    }
                  ),
                  r && t.local_status === "sending" && /* @__PURE__ */ e(
                    ht,
                    {
                      className: "size-3 text-blue-200 animate-spin",
                      "aria-label": "Pendiente de envío"
                    }
                  ),
                  r && t.local_status === "sent" && /* @__PURE__ */ e(sr, { className: "size-3 text-blue-200", "aria-label": "Enviado" }),
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
function an({
  conversation: t,
  messages: r,
  optimisticMessages: a = [],
  scrollRef: n,
  isFetchingNextPage: i = !1,
  hasNextPage: l = !1,
  isLoading: o = !1,
  isNearBottom: c = !0,
  newMessagesCount: d = 0,
  visibleDate: m = "Hoy",
  onScrollToBottom: f
}) {
  const { currentUserId: u } = ne(), p = Ue(t), b = Pe(t, u), x = qe(t, u), y = new Set(
    r.flatMap((h) => h.messages.map((w) => w.id))
  ), C = a.filter(
    (h) => !y.has(h.id)
  ), S = m.toLowerCase() === "hoy" || m.toLowerCase() === "today" || jt(m) === "Hoy";
  return /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 relative w-full overflow-hidden", children: /* @__PURE__ */ e(Be, { ref: n, className: "relative z-10 h-full w-full", children: /* @__PURE__ */ s("div", { className: "space-y-4 p-3 sm:p-4 text-sm w-full min-w-0", children: [
    i && /* @__PURE__ */ s("div", { className: "flex items-center justify-center py-2 gap-2 text-xs text-neutral-500 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin text-blue-600" }),
      /* @__PURE__ */ e("span", { children: "Cargando mensajes anteriores..." })
    ] }),
    !l && r.length > 0 && /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400", children: "Inicio de la conversación" }) }),
    o && r.length === 0 && /* @__PURE__ */ s("div", { className: "space-y-4 py-2 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ s("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ e(j, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(j, { className: "h-3 w-20 rounded" }),
          /* @__PURE__ */ e(j, { className: "h-12 w-48 sm:w-64 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ e(j, { className: "h-14 w-52 sm:w-64 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) }),
      /* @__PURE__ */ s("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ e(j, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(j, { className: "h-3 w-16 rounded" }),
          /* @__PURE__ */ e(j, { className: "h-16 w-56 sm:w-72 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ e(j, { className: "h-10 w-36 sm:w-44 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ e("div", { className: "sticky top-1 z-20 flex justify-center pointer-events-none mb-2 transition-all duration-200", children: /* @__PURE__ */ e("div", { className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs", children: /* @__PURE__ */ e("span", { children: S ? "Hoy" : jt(m) }) }) }),
    [...r ?? []].reverse().map((h) => /* @__PURE__ */ e(
      "div",
      {
        "data-date-group": h.date,
        className: "space-y-4",
        children: [...h.messages].reverse().map((w) => {
          var z, D;
          const H = String((D = (z = w == null ? void 0 : w.relationships) == null ? void 0 : z.sender) == null ? void 0 : D.id) === String(u);
          return /* @__PURE__ */ e(
            Pt,
            {
              message: H ? { ...w, local_status: "sent" } : w,
              isOwnMessage: H,
              isGroup: p,
              conversationName: b,
              conversationAvatarUrl: (x == null ? void 0 : x.attributes.avatar_url) || void 0
            },
            w.id
          );
        })
      },
      h.date
    )),
    C.length > 0 && /* @__PURE__ */ s("div", { "data-date-group": "Hoy", className: "space-y-4", children: [
      /* @__PURE__ */ e("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ e("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: "Hoy" }) }),
      [...C].map((h) => /* @__PURE__ */ e(
        Pt,
        {
          message: h,
          isOwnMessage: !0,
          isGroup: p,
          conversationName: b,
          conversationAvatarUrl: (x == null ? void 0 : x.attributes.avatar_url) || void 0
        },
        h.id
      ))
    ] }),
    !c && f && /* @__PURE__ */ e("div", { className: "sticky bottom-2 z-30 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200", children: /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: f,
        className: "pointer-events-auto relative flex size-9 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95 cursor-pointer",
        "aria-label": "Desplazar a mensajes recientes",
        title: "Desplazar a mensajes recientes",
        children: [
          /* @__PURE__ */ e(ir, { className: "size-4" }),
          d > 0 && /* @__PURE__ */ e(
            "span",
            {
              className: "absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-4 text-white",
              "aria-label": `${d} mensajes nuevos`,
              children: d > 99 ? "99+" : d
            }
          )
        ]
      }
    ) })
  ] }) }) });
}
function nn({
  inputText: t,
  setInputText: r,
  onSendMessage: a,
  onSelectFile: n,
  pendingFile: i,
  onRemoveFile: l,
  isSending: o,
  isUploading: c,
  conversationName: d,
  isClosed: m = !1,
  readOnly: f = !1,
  readOnlyMessage: u
}) {
  const p = q(null), b = 120, x = le(
    () => i && i.type.startsWith("image/") ? URL.createObjectURL(i) : void 0,
    [i]
  );
  if (O(() => () => {
    x && URL.revokeObjectURL(x);
  }, [x]), Et(() => {
    const h = p.current;
    if (!h) return;
    h.style.height = "auto";
    const w = Math.min(h.scrollHeight, b);
    h.style.height = `${w}px`, h.style.overflowY = h.scrollHeight > b ? "auto" : "hidden";
  }, [t]), m || f)
    return /* @__PURE__ */ e("div", { className: "shrink-0 px-3 pb-3 pt-1 text-center sm:px-4 sm:pb-4", children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-white/85 dark:border-neutral-800/80 dark:bg-neutral-900/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 shadow-xs dark:text-neutral-400", children: [
      /* @__PURE__ */ e(Ne, { className: "size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" }),
      /* @__PURE__ */ e("span", { children: u || (m ? "Esta conversación ha sido finalizada y no admite nuevos mensajes." : "No se permite enviar mensajes en esta conversación.") })
    ] }) });
  const y = (h) => {
    h.key === "Enter" && !h.shiftKey && (h.preventDefault(), a());
  }, C = (h) => {
    var H;
    const w = (H = h.target.files) == null ? void 0 : H[0];
    w && n(w), h.target.value = "";
  }, S = (h) => {
    var H;
    if (o || c) return;
    const w = (H = h.clipboardData) == null ? void 0 : H.items;
    if (w)
      for (let z = 0; z < w.length; z++) {
        const D = w[z];
        if (D.kind === "file" && D.type.startsWith("image/")) {
          const A = D.getAsFile();
          if (A) {
            h.preventDefault(), n(A);
            return;
          }
        }
      }
  };
  return /* @__PURE__ */ e("div", { className: "shrink-0 px-3 pb-3 pt-1 sm:px-4 sm:pb-4", children: /* @__PURE__ */ s("div", { className: "relative", children: [
    i && /* @__PURE__ */ s("div", { className: "mb-2 flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xs dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      i.type.startsWith("image/") ? /* @__PURE__ */ e(
        "img",
        {
          src: x || "",
          alt: "Archivo seleccionado",
          className: "size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
        }
      ) : /* @__PURE__ */ e("div", { className: "flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ e(Ct, { className: "size-5" }) }),
      /* @__PURE__ */ e("span", { className: "min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-300 font-medium", children: i.name || "Archivo listo para enviar" }),
      /* @__PURE__ */ e(
        E,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: l,
          className: "size-7 shrink-0 p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          "aria-label": "Quitar archivo",
          children: /* @__PURE__ */ e(ae, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 rounded-2xl border border-neutral-200/80 bg-white/95 backdrop-blur-md px-2.5 py-1.5 shadow-sm transition-all focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:shadow-md dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      /* @__PURE__ */ s(
        "label",
        {
          className: "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200",
          title: "Adjuntar archivo",
          children: [
            /* @__PURE__ */ e(Ct, { className: "size-4" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "file",
                className: "sr-only",
                onChange: C,
                disabled: o || c
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e(
        wt,
        {
          ref: p,
          value: t,
          onChange: (h) => r(h.target.value),
          onKeyDown: y,
          onPaste: S,
          placeholder: `Responder a ${d}...`,
          rows: 1,
          className: "!min-h-0 !border-transparent max-h-30 flex-1 resize-none overflow-y-hidden rounded-xl bg-transparent px-2 py-1 text-xs leading-5 shadow-none !outline-none focus:!border-transparent focus:!outline-none focus-visible:!border-transparent focus-visible:!ring-0 focus-visible:!outline-none sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400"
        }
      ),
      /* @__PURE__ */ e(
        E,
        {
          size: "icon",
          variant: "primary",
          onClick: a,
          disabled: !t.trim() && !i || o || c,
          className: "size-8 shrink-0 rounded-full p-0",
          "aria-label": "Enviar mensaje",
          title: "Enviar mensaje",
          children: /* @__PURE__ */ e(Ft, { className: "size-4" })
        }
      )
    ] })
  ] }) });
}
function sn({ className: t }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "aria-hidden": "true",
      className: N(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        t
      ),
      children: /* @__PURE__ */ s(
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
                children: /* @__PURE__ */ s(
                  "g",
                  {
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      /* @__PURE__ */ s("g", { transform: "translate(24, 24)", children: [
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
                      /* @__PURE__ */ s("g", { transform: "translate(210, 24)", children: [
                        /* @__PURE__ */ e("path", { d: "M10 0s-7 2-10 3v8c0 6 7 11 10 13 3-2 10-7 10-13V3c-3-1-10-3-10-3z" }),
                        /* @__PURE__ */ e("path", { d: "M6 11l3 3 6-6", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(294, 28)", children: [
                        /* @__PURE__ */ e("rect", { x: "0", y: "0", width: "28", height: "19", rx: "4" }),
                        /* @__PURE__ */ e("path", { d: "M6 9l3 3-3 3M14 15h6" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(30, 96)", children: [
                        /* @__PURE__ */ e("path", { d: "M0 0h24a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-12l-6 5v-5h-2a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" }),
                        /* @__PURE__ */ e("path", { d: "M6 6h12M6 10h8" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(126, 96)", children: [
                        /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "10" }),
                        /* @__PURE__ */ e("circle", { cx: "11", cy: "11", r: "4.5" }),
                        /* @__PURE__ */ e("path", { d: "M4 4l3.5 3.5M14.5 14.5l3.5 3.5M18 4l-3.5 3.5M7.5 14.5L4 18" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(214, 96)", children: [
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
                      /* @__PURE__ */ s("g", { transform: "translate(298, 98)", children: [
                        /* @__PURE__ */ e("ellipse", { cx: "10", cy: "4", rx: "9", ry: "3" }),
                        /* @__PURE__ */ e("path", { d: "M1 4v5c0 1.66 4.03 3 9 3s9-1.34 9-3V4" }),
                        /* @__PURE__ */ e("path", { d: "M1 9v5c0 1.66 4.03 3 9 3s9-1.34 9-3V9" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(32, 172)", children: [
                        /* @__PURE__ */ e("path", { d: "M0 6l4 4 9-9" }),
                        /* @__PURE__ */ e("path", { d: "M7 6l4 4 9-9" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(124, 168)", children: [
                        /* @__PURE__ */ e("rect", { x: "0", y: "7", width: "18", height: "13", rx: "3" }),
                        /* @__PURE__ */ e("path", { d: "M4 7V4a5 5 0 0 1 10 0v3" }),
                        /* @__PURE__ */ e("circle", { cx: "9", cy: "13.5", r: "1.5", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ e("g", { transform: "translate(210, 174)", children: /* @__PURE__ */ e("path", { d: "M0 6h6l3-6 5 12 4-8 3 4h7" }) }),
                      /* @__PURE__ */ s("g", { transform: "translate(298, 168)", children: [
                        /* @__PURE__ */ e("path", { d: "M0 0h13l6 6v13a3 3 0 0 1-3 3H0a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ e("path", { d: "M13 0v6h6" }),
                        /* @__PURE__ */ e("path", { d: "M4 12l2.5 2.5 5-5", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(28, 244)", children: [
                        /* @__PURE__ */ e("circle", { cx: "4", cy: "4", r: "3" }),
                        /* @__PURE__ */ e("circle", { cx: "20", cy: "4", r: "3" }),
                        /* @__PURE__ */ e("circle", { cx: "12", cy: "18", r: "3" }),
                        /* @__PURE__ */ e("path", { d: "M6.5 5.5l3.5 10M17.5 5.5l-3.5 10M7 4h10" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(114, 246)", children: [
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
                      /* @__PURE__ */ s("g", { transform: "translate(300, 246)", children: [
                        /* @__PURE__ */ e("circle", { cx: "10", cy: "10", r: "9" }),
                        /* @__PURE__ */ e("path", { d: "M10 5v5l3.5 2" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(30, 316)", children: [
                        /* @__PURE__ */ e("path", { d: "M0 0h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6l-5 4v-4h-2a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ e("circle", { cx: "5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "9.5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "14", cy: "7", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(128, 320)", children: [
                        /* @__PURE__ */ e("circle", { cx: "2", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "10", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "18", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "2", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "10", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ e("circle", { cx: "18", cy: "10", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ e("g", { transform: "translate(216, 318)", children: /* @__PURE__ */ e("path", { d: "M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5z" }) }),
                      /* @__PURE__ */ s("g", { transform: "translate(292, 318)", children: [
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
function ln({
  conversation: t,
  onToggleContextPanel: r,
  isContextPanelOpen: a = !0,
  onBack: n,
  alwaysShowBackButton: i = !1,
  onCloseSuccess: l,
  showHeader: o = !0,
  showWallpaper: c = !0,
  readOnly: d = !1,
  readOnlyMessage: m,
  showComposer: f = !0
}) {
  const u = Ja(t, {
    onCloseSuccess: () => {
      l == null || l(), n == null || n();
    }
  }), [p, b] = _(!1), x = q(0), y = d || u.isClosed || u.isSending || u.isUploading;
  return /* @__PURE__ */ s(
    "div",
    {
      className: "sdi-messenger-root relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
      onDragEnter: (z) => {
        if (z.preventDefault(), z.stopPropagation(), y) return;
        z.dataTransfer.types && Array.from(z.dataTransfer.types).includes("Files") && (x.current += 1, b(!0));
      },
      onDragOver: (z) => {
        z.preventDefault(), z.stopPropagation(), !y && (z.dataTransfer.dropEffect = "copy");
      },
      onDragLeave: (z) => {
        z.preventDefault(), z.stopPropagation(), x.current -= 1, x.current <= 0 && (x.current = 0, b(!1));
      },
      onDrop: (z) => {
        if (z.preventDefault(), z.stopPropagation(), x.current = 0, b(!1), y) return;
        const D = z.dataTransfer.files;
        if (D && D.length > 0) {
          const A = D[0];
          A.type.startsWith("image/") && u.handleSelectFile(A);
        }
      },
      onPaste: (z) => {
        var A;
        if (y) return;
        const D = (A = z.clipboardData) == null ? void 0 : A.items;
        if (D)
          for (let F = 0; F < D.length; F++) {
            const T = D[F];
            if (T.kind === "file" && T.type.startsWith("image/")) {
              const v = T.getAsFile();
              if (v) {
                z.preventDefault(), u.handleSelectFile(v);
                return;
              }
            }
          }
      },
      children: [
        o && /* @__PURE__ */ e(
          tn,
          {
            conversation: t,
            isClosed: u.isClosed,
            isClosing: u.isClosing,
            onCloseConversation: u.handleCloseConversation,
            isContextPanelOpen: a,
            onToggleContextPanel: r,
            onBack: n,
            alwaysShowBackButton: i
          }
        ),
        /* @__PURE__ */ s("div", { className: "relative flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[#f4f6f8]/70 dark:bg-[#0a0f1d]", children: [
          c && /* @__PURE__ */ e(sn, {}),
          p && /* @__PURE__ */ e("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xs border-2 border-dashed border-blue-500/70 dark:border-blue-400/70 rounded-2xl m-2 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95", children: /* @__PURE__ */ s("div", { className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-xl border border-blue-500/20 text-center max-w-xs mx-4", children: [
            /* @__PURE__ */ e("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-inner", children: /* @__PURE__ */ e(lr, { className: "size-7 animate-bounce" }) }),
            /* @__PURE__ */ s("div", { children: [
              /* @__PURE__ */ e("p", { className: "text-sm font-semibold text-neutral-800 dark:text-neutral-100", children: "Suelta tu imagen aquí" }),
              /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Se adjuntará para que puedas enviarla" })
            ] })
          ] }) }),
          /* @__PURE__ */ e(
            an,
            {
              conversation: t,
              messages: u.messages,
              optimisticMessages: u.optimisticMessages,
              scrollRef: u.scrollRef,
              isFetchingNextPage: u.isFetchingNextPage,
              hasNextPage: u.hasNextPage,
              isLoading: u.isLoading,
              isNearBottom: u.isNearBottom,
              newMessagesCount: u.newMessagesCount,
              visibleDate: u.visibleDate,
              onScrollToBottom: u.scrollToBottom
            }
          ),
          u.typingUser && !d && /* @__PURE__ */ s("div", { className: "relative z-10 flex shrink-0 items-center gap-1.5 px-4 py-1 text-xs text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-150", children: [
            /* @__PURE__ */ s("span", { className: "font-medium", children: [
              u.typingUser,
              " está escribiendo"
            ] }),
            /* @__PURE__ */ s("span", { className: "inline-flex gap-0.5", "aria-hidden": "true", children: [
              /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse" }),
              /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-75" }),
              /* @__PURE__ */ e("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-150" })
            ] })
          ] }),
          f && /* @__PURE__ */ e("div", { className: "relative z-10 w-full", children: /* @__PURE__ */ e(
            nn,
            {
              inputText: u.inputText,
              setInputText: u.setInputText,
              onSendMessage: u.handleSendMessage,
              onSelectFile: u.handleSelectFile,
              pendingFile: u.pendingFile,
              onRemoveFile: () => u.setPendingFile(null),
              isSending: u.isSending,
              isUploading: u.isUploading,
              conversationName: u.conversationName,
              isClosed: u.isClosed,
              readOnly: d,
              readOnlyMessage: m
            }
          ) })
        ] })
      ]
    }
  );
}
function on({
  message: t = "Tu solicitud de soporte ha sido registrada exitosamente. En este momento no hay técnicos disponibles en línea; un técnico atenderá tu requerimiento a la brevedad.",
  ticket: r,
  onNewRequest: a,
  onViewChats: n,
  onClose: i,
  canViewChatList: l = !1
}) {
  const o = (r == null ? void 0 : r.number) ?? (r == null ? void 0 : r.id) ?? "N/A";
  return /* @__PURE__ */ s("div", { className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 bg-neutral-50/70 dark:bg-neutral-900", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(ft, { className: "size-4 text-emerald-600 dark:text-emerald-400" }),
        /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-800 dark:text-neutral-200", children: "Solicitud Registrada" })
      ] }),
      i && /* @__PURE__ */ e(
        E,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: i,
          className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          children: /* @__PURE__ */ e(ae, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4", children: [
      /* @__PURE__ */ s("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ e("div", { className: "size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(ht, { className: "size-7" }) }),
        /* @__PURE__ */ e("div", { className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ e(Xe, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "Ticket de Soporte Creado" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed", children: t })
      ] }),
      r && /* @__PURE__ */ s("div", { className: "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200", children: [
            /* @__PURE__ */ e(or, { className: "size-3.5 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ s("span", { children: [
              "Ticket #",
              o
            ] })
          ] }),
          /* @__PURE__ */ e(fe, { variant: "outline", className: "text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", children: r.status === "created" ? "Registrado" : r.status })
        ] }),
        r.subject && /* @__PURE__ */ s("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ e("span", { className: "text-[10.5px] font-medium text-neutral-400", children: "Asunto:" }),
          /* @__PURE__ */ e("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2", children: r.subject })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between text-[11px] text-neutral-500 pt-1", children: [
          /* @__PURE__ */ s("span", { children: [
            "Canal: ",
            /* @__PURE__ */ e("strong", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: r.request_source || "Chat" })
          ] }),
          /* @__PURE__ */ s("span", { className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-medium", children: [
            /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            "En cola de atención"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-2.5 text-[11px] text-blue-900/80 dark:text-blue-300/80 text-left w-full", children: /* @__PURE__ */ e("p", { children: "Te notificaremos en cuanto un técnico tome tu ticket. Puedes consultar el estado en cualquier momento." }) })
    ] }),
    /* @__PURE__ */ s("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900 flex items-center gap-2", children: [
      /* @__PURE__ */ s(
        E,
        {
          type: "button",
          variant: "secondary",
          size: "sm",
          onClick: a,
          className: "flex-1 gap-1.5 text-xs font-medium cursor-pointer",
          children: [
            /* @__PURE__ */ e(dr, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Nueva Consulta" })
          ]
        }
      ),
      l && n && /* @__PURE__ */ s(
        E,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: n,
          className: "flex-1 gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
          children: [
            /* @__PURE__ */ e(pt, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: "Ver mis chats" })
          ]
        }
      )
    ] })
  ] });
}
function Kt(t, r = 300) {
  const [a, n] = _(t);
  return O(() => {
    const i = setTimeout(() => {
      n(t);
    }, r);
    return () => {
      clearTimeout(i);
    };
  }, [t, r]), a;
}
const dn = (t) => {
  var n, i, l, o, c, d;
  const r = (t == null ? void 0 : t.params) ?? {}, a = At({
    queryKey: ["list-chat-users", r],
    queryFn: () => zr(r),
    placeholderData: Lt,
    refetchOnWindowFocus: !1,
    enabled: (t == null ? void 0 : t.enable) !== !1
  });
  return {
    data: ((n = a.data) == null ? void 0 : n.data.data) ?? [],
    meta: (l = (i = a.data) == null ? void 0 : i.data) == null ? void 0 : l.meta,
    links: (c = (o = a.data) == null ? void 0 : o.data) == null ? void 0 : c.links,
    isLoading: a.isPending,
    errors: ((d = a.error) == null ? void 0 : d.data) ?? {},
    refetch: a.refetch
  };
}, cn = () => {
  const t = De(), r = Q(async (a) => {
    const n = await Ha(a);
    return await t.invalidateQueries({ queryKey: ["list-conversations"] }), n.data.data;
  }, [t]);
  return ye(
    r
  );
};
function un({
  open: t,
  onOpenChange: r,
  onSuccess: a
}) {
  const { currentUserId: n } = ne(), [i, l] = _("direct"), [o, c] = _(""), d = Kt(o, 300), [m, f] = _(null), [u, p] = _([]), [b, x] = _(""), { data: y, isLoading: C } = dn({
    enable: t,
    params: {
      sort: "name",
      paginate: "false",
      ...d.trim() ? { filter: { name: d.trim() } } : {}
    }
  }), { mutateAsync: S, isLoading: h } = cn(), w = le(() => (y || []).filter((v) => String(v.id) !== String(n)), [y, n]), H = (v) => {
    p((M) => M.some((k) => k.id === v.id) ? M.filter((k) => k.id !== v.id) : [...M, v]);
  }, z = (v) => {
    p((M) => M.filter((U) => U.id !== v));
  }, D = () => {
    f(null), p([]), x(""), c(""), l("direct");
  }, A = (v) => {
    v || D(), r(v);
  }, F = async (v) => {
    var M, U, k, K;
    if (v.preventDefault(), i === "direct") {
      if (!m) {
        re.warning("Por favor, selecciona un usuario para iniciar la conversación.");
        return;
      }
      try {
        const P = await S({
          type: "direct",
          user_id: Number(m),
          sender_id: Number(n)
        });
        re.success("Conversación iniciada correctamente"), A(!1), a && P && a(P);
      } catch (P) {
        const I = ((U = (M = P == null ? void 0 : P.response) == null ? void 0 : M.data) == null ? void 0 : U.message) || (P == null ? void 0 : P.message) || "Error al iniciar la conversación";
        re.error(I);
      }
    } else {
      if (!b.trim()) {
        re.warning("Por favor, ingresa el nombre del grupo.");
        return;
      }
      if (u.length === 0) {
        re.warning("Por favor, selecciona al menos un participante para el grupo.");
        return;
      }
      try {
        const P = await S({
          type: "group",
          name: b.trim(),
          user_ids: u.map((I) => Number(I.id)),
          sender_id: Number(n)
        });
        re.success("Grupo creado correctamente"), A(!1), a && P && a(P);
      } catch (P) {
        const I = ((K = (k = P == null ? void 0 : P.response) == null ? void 0 : k.data) == null ? void 0 : K.message) || (P == null ? void 0 : P.message) || "Error al crear el grupo";
        re.error(I);
      }
    }
  }, T = h || i === "direct" && !m || i === "group" && (!b.trim() || u.length === 0);
  return /* @__PURE__ */ e(Er, { open: t, onOpenChange: A, children: /* @__PURE__ */ e(Ar, { className: "sm:max-w-[480px]", children: /* @__PURE__ */ s("form", { onSubmit: F, className: "flex flex-col", children: [
    /* @__PURE__ */ s(Lr, { children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ e(Ie, { className: "size-5" }) }),
        /* @__PURE__ */ s("div", { className: "text-left pr-6", children: [
          /* @__PURE__ */ e(Fr, { children: "Nueva Conversación" }),
          /* @__PURE__ */ e(Ir, { children: "Inicia un chat directo o crea un grupo de conversación" })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "mt-3.5", children: /* @__PURE__ */ e(
        Ot,
        {
          value: i,
          onValueChange: (v) => l(v),
          className: "w-full",
          children: /* @__PURE__ */ s($t, { className: "w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ s(
              Ze,
              {
                value: "direct",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ e(Ye, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Directo (1 a 1)" })
                ]
              }
            ),
            /* @__PURE__ */ s(
              Ze,
              {
                value: "group",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ e(ut, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Grupo" })
                ]
              }
            )
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ s("div", { className: "p-5 space-y-4", children: [
      i === "group" && /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5", children: [
          /* @__PURE__ */ e("span", { children: "Nombre del Grupo" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ e(
          vt,
          {
            placeholder: "Ej. Soporte Técnico L2, Equipo Infraestructura...",
            value: b,
            onChange: (v) => x(v.target.value),
            className: "h-9 text-xs",
            required: !0
          }
        )
      ] }),
      i === "group" && u.length > 0 && /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400", children: [
          /* @__PURE__ */ s("span", { children: [
            "Participantes seleccionados (",
            u.length,
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
        /* @__PURE__ */ e("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800", children: u.map((v) => {
          const M = Re(v.attributes.name);
          return /* @__PURE__ */ s(
            fe,
            {
              variant: "secondary",
              className: "gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
              children: [
                /* @__PURE__ */ e(
                  ge,
                  {
                    name: M,
                    src: v.attributes.avatar_url,
                    size: "xs"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "max-w-28 truncate font-medium capitalize", children: M }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: () => z(v.id),
                    className: "rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
                    children: /* @__PURE__ */ e(ae, { className: "size-3" })
                  }
                )
              ]
            },
            v.id
          );
        }) })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between", children: [
          /* @__PURE__ */ e("span", { children: i === "direct" ? "Selecciona un usuario" : "Añadir participantes" }),
          /* @__PURE__ */ s("span", { className: "text-[10px] font-normal text-neutral-400", children: [
            w.length,
            " disponibles"
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
          /* @__PURE__ */ e(It, { className: "size-3.5 shrink-0 text-neutral-400" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              placeholder: "Buscar por nombre...",
              value: o,
              onChange: (v) => c(v.target.value),
              className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
            }
          ),
          o && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => c(""),
              className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer",
              children: /* @__PURE__ */ e(ae, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden", children: /* @__PURE__ */ e(Be, { className: "h-56 sm:h-64 w-full", children: C ? /* @__PURE__ */ s("div", { className: "flex h-56 items-center justify-center gap-2 text-xs text-neutral-500", children: [
        /* @__PURE__ */ e(je, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ e("span", { children: "Cargando usuarios..." })
      ] }) : w.length === 0 ? /* @__PURE__ */ s("div", { className: "flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500", children: [
        /* @__PURE__ */ e("p", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: "No se encontraron usuarios" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] mt-1", children: "Prueba con otro término de búsqueda" })
      ] }) : /* @__PURE__ */ e("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5", children: w.map((v) => {
        const M = m === v.id, U = u.some((P) => P.id === v.id), k = i === "direct" ? M : U, K = Re(v.attributes.name);
        return /* @__PURE__ */ s(
          "div",
          {
            onClick: () => {
              i === "direct" ? f(v.id) : H(v);
            },
            className: N(
              "flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors",
              k ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium" : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200"
            ),
            children: [
              /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
                /* @__PURE__ */ e(
                  ge,
                  {
                    name: K,
                    src: v.attributes.avatar_url,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ e("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ e("p", { className: "truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize", children: K }) })
              ] }),
              /* @__PURE__ */ e("div", { className: "shrink-0 pl-1", children: /* @__PURE__ */ e(
                "div",
                {
                  className: N(
                    "flex size-5 items-center justify-center rounded-full border transition-all",
                    k ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent"
                  ),
                  children: /* @__PURE__ */ e(cr, { className: "size-3 stroke-[2.5]" })
                }
              ) })
            ]
          },
          v.id
        );
      }) }) }) })
    ] }),
    /* @__PURE__ */ s(Rr, { children: [
      /* @__PURE__ */ e(
        E,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => A(!1),
          disabled: h,
          className: "text-xs h-8 px-3.5 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ e(
        E,
        {
          type: "submit",
          size: "sm",
          variant: "primary",
          disabled: T,
          className: "text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer",
          children: h ? /* @__PURE__ */ s(be, { children: [
            /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Creando..." })
          ] }) : /* @__PURE__ */ s(be, { children: [
            /* @__PURE__ */ e(Ie, { className: "size-3.5" }),
            /* @__PURE__ */ e("span", { children: i === "direct" ? "Iniciar Chat" : "Crear Grupo" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const mn = (t) => {
  var n, i, l, o, c;
  const r = (t == null ? void 0 : t.params) ?? {}, a = At({
    queryKey: ["list-conversations", r],
    queryFn: () => Ra(r),
    placeholderData: Lt,
    refetchOnWindowFocus: !1,
    enabled: (t == null ? void 0 : t.enable) !== !1
  });
  return {
    data: ((n = a.data) == null ? void 0 : n.data.data) ?? [],
    meta: (l = (i = a.data) == null ? void 0 : i.data) == null ? void 0 : l.meta,
    links: (o = a.data) == null ? void 0 : o.data.links,
    isLoading: a.isPending,
    errors: ((c = a.error) == null ? void 0 : c.data) ?? {},
    refetch: a.refetch
  };
}, hn = () => {
  const t = De(), { config: r, currentUser: a, currentUserId: n } = ne(), i = de({
    permission: ["messenger_chat.read"]
  }), [l, o] = _("0"), [c, d] = _("all"), [m, f] = _(""), u = Kt(m, 300), p = le(() => {
    const I = {
      closed: l
    };
    return c !== "all" && (I.type = c), u.trim() && (I.name = u.trim()), {
      user_id: n,
      paginate: "false",
      ...Object.keys(I).length > 0 ? { filter: I } : {}
    };
  }, [l, c, u, n]), {
    data: b,
    isLoading: x,
    errors: y,
    refetch: C
  } = mn({
    params: p,
    enable: !!n && i
  }), [S, h] = _(""), [w, H] = _(!1), [z, D] = _(!1), [A, F] = _(!1), T = Q(
    (I) => {
      String(I.conversation_id) !== S && re.info("Nuevo mensaje", {
        id: `conversation-message-${I.message.id}`,
        description: I.message.body || "Tienes un mensaje nuevo",
        action: {
          label: "Abrir",
          onClick: () => {
            h(String(I.conversation_id)), D(!0);
          }
        }
      }), t.invalidateQueries({ queryKey: ["list-conversations"] }), C();
    },
    [t, C, S]
  ), v = Q(() => {
    t.invalidateQueries({ queryKey: ["list-conversations"] }), C();
  }, [t, C]);
  O(() => {
    if (n)
      return Ya(
        r.reverb,
        n,
        T,
        v
      );
  }, [r.reverb, v, T, n]);
  const M = le(
    () => b.find((I) => I.id === S),
    [b, S]
  );
  return {
    conversations: b,
    selectedId: S,
    setSelectedId: h,
    selectedConversation: M,
    closedFilter: l,
    setClosedFilter: o,
    typeFilter: c,
    setTypeFilter: d,
    searchQuery: m,
    setSearchQuery: f,
    isContextPanelOpen: w,
    isMobileChatOpen: z,
    isNewConversationOpen: A,
    isLoading: x,
    errors: y,
    hasReadPermission: i,
    currentUser: a,
    currentUserId: n,
    selectConversation: (I) => {
      h(I), D(!0);
    },
    unselectConversation: () => {
      h(""), D(!1);
    },
    setIsContextPanelOpen: H,
    setIsNewConversationOpen: F,
    goBackToConversationList: () => D(!1),
    handleConversationCreated: (I) => {
      h(I.id), D(!0), F(!1), t.invalidateQueries({ queryKey: ["list-conversations"] }), C();
    }
  };
}, fn = (t) => Z({
  url: `${J("helpdesk", "v1")}/requests/chat-support`,
  method: "POST",
  data: t
}), pn = () => {
  const t = De(), r = Q(async (a) => {
    var l;
    const n = await fn(a), i = ((l = n.data) == null ? void 0 : l.data) ?? n.data;
    return i != null && i.conversation_id && await t.invalidateQueries({ queryKey: ["list-conversations"] }), i;
  }, [t]);
  return ye(
    r
  );
}, Qt = ["/messenger"];
function Tt(t, r) {
  if (!t || !r) return !1;
  const a = (t.startsWith("/") ? t : `/${t}`).toLowerCase().replace(/\/+$/, "") || "/", n = (r.startsWith("/") ? r : `/${r}`).toLowerCase().trim();
  if (n.endsWith("/*")) {
    const l = n.slice(0, -2).replace(/\/+$/, "") || "/";
    return a === l || a.startsWith(l === "/" ? "/" : `${l}/`);
  }
  if (n.endsWith("*")) {
    const l = n.slice(0, -1).replace(/\/+$/, "") || "/";
    return a === l || a.startsWith(l);
  }
  const i = n.replace(/\/+$/, "") || "/";
  return a === i || a.startsWith(`${i}/`);
}
if (typeof window < "u") {
  const t = window;
  if (!t.__sdi_messenger_history_patched__) {
    t.__sdi_messenger_history_patched__ = !0;
    const r = window.history.pushState;
    window.history.pushState = function(...n) {
      const i = r.apply(this, n);
      return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange")), i;
    };
    const a = window.history.replaceState;
    window.history.replaceState = function(...n) {
      const i = a.apply(this, n);
      return window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange")), i;
    };
  }
}
function xn({
  hiddenPaths: t = Qt,
  showOnlyPaths: r,
  hideCondition: a,
  hidden: n = !1,
  currentPath: i
}) {
  const [l, o] = _(() => i !== void 0 ? i : typeof window < "u" ? window.location.pathname : "");
  return O(() => {
    if (i !== void 0) {
      o(i);
      return;
    }
    if (typeof window > "u") return;
    const d = () => {
      const f = window.location.pathname;
      o((u) => u !== f ? f : u);
    };
    d(), window.addEventListener("popstate", d), window.addEventListener("pushstate", d), window.addEventListener("replacestate", d), window.addEventListener("locationchange", d);
    const m = window.setInterval(d, 150);
    return () => {
      window.removeEventListener("popstate", d), window.removeEventListener("pushstate", d), window.removeEventListener("replacestate", d), window.removeEventListener("locationchange", d), window.clearInterval(m);
    };
  }, [i]), { shouldHide: le(() => n ? !0 : l ? !!(a && a(l) || r && r.length > 0 && !r.some((m) => Tt(l, m)) || t && t.length > 0 && t.some((m) => Tt(l, m))) : !1, [l, n, a, r, t]), pathname: l };
}
const Mt = "sdi_floating_chat_corner";
function bn(t = "bottom-right") {
  const r = q(null), [a, n] = _(t), [i, l] = _(!1), [o, c] = _(null), d = q({ startX: 0, startY: 0, rect: new DOMRect(), moved: !1 }), m = q(!1), f = q(null);
  O(() => {
    try {
      const S = localStorage.getItem(Mt);
      S && ["bottom-right", "bottom-left", "top-right", "top-left"].includes(S) && n(S);
    } catch {
    }
  }, []);
  const u = (S) => {
    n(S);
    try {
      localStorage.setItem(Mt, S);
    } catch {
    }
  }, p = (S) => {
    if (S.button !== 0 && S.pointerType === "mouse") return;
    const h = r.current;
    if (!h) return;
    const w = h.getBoundingClientRect();
    d.current = {
      startX: S.clientX,
      startY: S.clientY,
      rect: w,
      moved: !1
    };
    const H = S.clientX - w.left, z = S.clientY - w.top, D = (F) => {
      Math.hypot(
        F.clientX - d.current.startX,
        F.clientY - d.current.startY
      ) > 5 && (d.current.moved || (d.current.moved = !0, l(!0)), f.current && cancelAnimationFrame(f.current), f.current = requestAnimationFrame(() => {
        const v = Math.max(
          12,
          Math.min(window.innerWidth - w.width - 12, F.clientX - H)
        ), M = Math.max(
          12,
          Math.min(window.innerHeight - w.height - 12, F.clientY - z)
        );
        c({ x: v, y: M });
      }));
    }, A = (F) => {
      if (window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", A), window.removeEventListener("pointercancel", A), f.current && cancelAnimationFrame(f.current), d.current.moved) {
        m.current = !0, setTimeout(() => {
          m.current = !1;
        }, 100);
        const T = F.clientX > window.innerWidth / 2, M = F.clientY > window.innerHeight / 2 ? T ? "bottom-right" : "bottom-left" : T ? "top-right" : "top-left";
        u(M), l(!1), c(null);
      }
    };
    window.addEventListener("pointermove", D), window.addEventListener("pointerup", A), window.addEventListener("pointercancel", A);
  }, b = a.startsWith("top"), x = a.endsWith("left");
  return {
    containerRef: r,
    corner: a,
    isDragging: i,
    dragPos: o,
    wasDraggedRef: m,
    isTop: b,
    isLeft: x,
    cornerContainerClass: b ? x ? "top-6 left-6 items-start flex-col-reverse" : "top-6 right-6 items-end flex-col-reverse" : x ? "bottom-6 left-6 items-start flex-col" : "bottom-6 right-6 items-end flex-col",
    cardOriginClass: b ? x ? "origin-top-left" : "origin-top-right" : x ? "origin-bottom-left" : "origin-bottom-right",
    startDrag: p,
    changeCorner: u
  };
}
function gn({
  isOpen: t,
  totalUnreadCount: r,
  isLeft: a,
  isLoading: n = !1,
  hasError: i = !1,
  onToggleOpen: l,
  onPointerDown: o
}) {
  const c = () => t ? "bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rotate-90 shadow-2xl" : i ? "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/40 shadow-rose-500/30" : n ? "bg-blue-600/90 text-white" : "bg-blue-600 hover:bg-blue-700 text-white", d = () => t ? "Cerrar chat de soporte" : i ? "Error de conexión en el chat (Haz clic para ver detalles o reintentar)" : n ? "Conectando al chat de soporte..." : r > 0 ? `Abrir chat de soporte (${r} mensaje${r === 1 ? "" : "s"} sin leer)` : "Abrir chat de soporte";
  return /* @__PURE__ */ s(
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
            className: N(
              "flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40",
              c()
            ),
            "aria-label": d(),
            title: d(),
            children: t ? /* @__PURE__ */ e(ae, { className: "size-6 transition-transform duration-200 text-white" }) : i ? /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center animate-in zoom-in-75 duration-200", children: /* @__PURE__ */ e(tt, { className: "size-6 transition-transform duration-200 text-white" }) }) : n ? /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ e(je, { className: "size-6 animate-spin text-white" }) }) : /* @__PURE__ */ e("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ e(ur, { className: "size-6 transition-transform duration-200" }) })
          }
        ),
        !t && i && /* @__PURE__ */ s(
          "span",
          {
            className: N(
              "absolute -top-1 flex size-5 items-center justify-center rounded-full bg-rose-700 text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200",
              a ? "-left-1" : "-right-1"
            ),
            title: "Error de conexión",
            children: [
              /* @__PURE__ */ e("span", { className: "absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-rose-500/50 animate-ping pointer-events-none" }),
              /* @__PURE__ */ e("span", { className: "text-[10px] font-bold", children: "!" })
            ]
          }
        ),
        !t && !i && r > 0 && /* @__PURE__ */ s(
          "span",
          {
            className: N(
              "absolute -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200",
              a ? "-left-1" : "-right-1"
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
function yt({
  onNewConversation: t,
  showNewButton: r = !0,
  className: a
}) {
  var m, f;
  const { currentUser: n, isLoadingUser: i, hasError: l } = ne(), o = de({
    permission: ["messenger_chat_support.provide_support"]
  }), c = Re((m = n == null ? void 0 : n.attributes) == null ? void 0 : m.name) || "Usuario", d = ((f = n == null ? void 0 : n.attributes) == null ? void 0 : f.email) || "Mi cuenta";
  return l ? /* @__PURE__ */ s(
    "div",
    {
      className: N(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        a
      ),
      children: [
        /* @__PURE__ */ e(Rt, { className: "size-3.5 shrink-0 text-red-500" }),
        /* @__PURE__ */ e("span", { className: "truncate text-[11px] font-medium", children: "Sin conexión • No disponible" })
      ]
    }
  ) : i ? /* @__PURE__ */ s(
    "div",
    {
      className: N(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(j, { className: "size-8 rounded-full" }),
          /* @__PURE__ */ s("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
            /* @__PURE__ */ e(j, { className: "h-3 w-20" }),
            /* @__PURE__ */ e(j, { className: "h-2.5 w-32" })
          ] })
        ] }),
        r && /* @__PURE__ */ e(j, { className: "size-8 rounded-lg shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ s(
    "div",
    {
      className: N(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ e(ge, { src: n == null ? void 0 : n.attributes.avatar_url, name: c, size: "sm" }),
          /* @__PURE__ */ s("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ e("p", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: c }),
            /* @__PURE__ */ e("p", { className: "truncate text-[10px] text-neutral-500 dark:text-neutral-400", children: d })
          ] })
        ] }),
        r && t && o && /* @__PURE__ */ e(
          E,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: t,
            className: "h-8 gap-1.5 px-3 text-xs font-semibold shrink-0 shadow-xs cursor-pointer",
            title: "Iniciar nueva conversación",
            children: /* @__PURE__ */ e(Ie, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function vn({
  title: t,
  canRequestSupport: r,
  canViewChatList: a,
  totalUnreadCount: n,
  conversationsCount: i,
  onRequestSupport: l,
  onViewChatList: o,
  onClose: c,
  onNewConversation: d,
  onDragStart: m
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ s(
      "div",
      {
        onPointerDown: m,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ e("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md", children: /* @__PURE__ */ e(ct, { className: "size-5 text-white" }) }),
              /* @__PURE__ */ s("div", { children: [
                /* @__PURE__ */ e("h3", { className: "text-sm font-bold leading-none text-white", children: t }),
                /* @__PURE__ */ s("p", { className: "text-[11px] text-blue-100 mt-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }),
                  "Soporte técnico SDI"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ e(
              E,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (f) => f.stopPropagation(),
                onClick: c,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ e(ae, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ s("div", { className: "mt-4", children: [
            /* @__PURE__ */ e("p", { className: "text-xs font-semibold text-white", children: "¿En qué podemos ayudarte hoy?" }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-blue-100/90 mt-0.5", children: "Selecciona una opción para iniciar asistencia o revisar tu historial." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      r && /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: l,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer",
          children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ e("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: /* @__PURE__ */ e(ct, { className: "size-5" }) }),
              /* @__PURE__ */ s("div", { children: [
                /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Solicitar Asistencia" }),
                /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Ingresa asunto y mensaje para iniciar soporte" })
              ] })
            ] }),
            /* @__PURE__ */ e(zt, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      a && /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: o,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer",
          children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ s("div", { className: "relative flex size-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: [
                /* @__PURE__ */ e(pt, { className: "size-5" }),
                n > 0 && /* @__PURE__ */ e("span", { className: "absolute -top-1 -right-1 size-3 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" })
              ] }),
              /* @__PURE__ */ s("div", { children: [
                /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Ver mis chats" }),
                  n > 0 ? /* @__PURE__ */ s("span", { className: "rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs animate-pulse", children: [
                    n > 99 ? "99+" : n,
                    " ",
                    "sin leer"
                  ] }) : i > 0 ? /* @__PURE__ */ e("span", { className: "rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-blue-600 dark:text-blue-400", children: i }) : null
                ] }),
                /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Revisa tus conversaciones y requerimientos" })
              ] })
            ] }),
            /* @__PURE__ */ e(zt, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ s("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30 p-3 mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs", children: [
          /* @__PURE__ */ e(ft, { className: "size-3.5 text-emerald-600" }),
          /* @__PURE__ */ e("span", { children: "Mesa de Ayuda SDI" })
        ] }),
        /* @__PURE__ */ e("p", { className: "leading-relaxed", children: "Tus solicitudes quedan registradas con trazabilidad y número de ticket en la plataforma de Helpdesk." })
      ] })
    ] }),
    /* @__PURE__ */ e(yt, { onNewConversation: d })
  ] });
}
function wn({
  userId: t,
  userName: r,
  onSubmit: a,
  isSubmitting: n = !1,
  error: i = null,
  onCancel: l
}) {
  const [o, c] = _(""), [d, m] = _(""), [f, u] = _(null);
  return /* @__PURE__ */ s("form", { onSubmit: (b) => {
    b.preventDefault(), u(null);
    const x = o.trim(), y = d.trim();
    if (!x) {
      u("Por favor ingresa el asunto de tu solicitud.");
      return;
    }
    if (!y) {
      u("Por favor describe el detalle de tu consulta.");
      return;
    }
    if (!t) {
      u("No se pudo identificar el usuario actual para la solicitud.");
      return;
    }
    a({
      subject: x,
      message: y,
      user_id: t
    });
  }, className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100", children: [
      /* @__PURE__ */ e("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/90 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 p-3.5 shadow-2xs space-y-2", children: /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ e(ct, { className: "size-4.5" }) }),
        /* @__PURE__ */ s("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ e("h4", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate", children: r ? `Hola, ${r}` : "Nueva solicitud de soporte" }),
            /* @__PURE__ */ s("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40", children: [
              /* @__PURE__ */ e("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
              "En línea"
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug", children: "Completa los datos para asignarte un técnico de soporte." })
        ] })
      ] }) }),
      (f || i) && /* @__PURE__ */ s("div", { className: "flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ e(mr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ s("div", { className: "flex-1 leading-snug", children: [
          /* @__PURE__ */ e("span", { className: "font-medium", children: "Error en el formulario:" }),
          " ",
          f || i
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ e(hr, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ e("span", { children: "Asunto de la consulta" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ e("div", { className: "relative", children: /* @__PURE__ */ e(
          vt,
          {
            value: o,
            onChange: (b) => {
              c(b.target.value), f && u(null);
            },
            placeholder: "Ej: Consulta sobre configuración o reporte de falla",
            disabled: n,
            maxLength: 150,
            className: "h-9.5 bg-neutral-50/60 hover:bg-white focus:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus:border-blue-500 rounded-lg text-xs transition-colors"
          }
        ) })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ e(fr, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ e("span", { children: "Detalle o descripción" }),
          /* @__PURE__ */ e("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ s("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ e(
            wt,
            {
              value: d,
              onChange: (b) => {
                m(b.target.value), f && u(null);
              },
              placeholder: "Describe lo más claro posible tu duda o problema...",
              rows: 4,
              disabled: n,
              maxLength: 1e3,
              className: "min-h-24 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none"
            }
          ),
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between px-3 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400 dark:text-neutral-500", children: [
            /* @__PURE__ */ e("span", { children: "Proporciona detalles específicos" }),
            /* @__PURE__ */ s("span", { className: "font-mono", children: [
              d.length,
              "/1000"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "flex items-start gap-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 p-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: [
        /* @__PURE__ */ e(ft, { className: "size-4 shrink-0 text-neutral-400 mt-0.5" }),
        /* @__PURE__ */ e("span", { children: "Tu solicitud creará automáticamente una conversación y se notificará al equipo de asistencia." })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900/80 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e("div", { children: l && /* @__PURE__ */ e(
        E,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: l,
          disabled: n,
          className: "text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 cursor-pointer",
          children: "Cancelar"
        }
      ) }),
      /* @__PURE__ */ e(
        E,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: n || !o.trim() || !d.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          children: n ? /* @__PURE__ */ s(be, { children: [
            /* @__PURE__ */ e(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ e("span", { children: "Enviando solicitud..." })
          ] }) : /* @__PURE__ */ s(be, { children: [
            /* @__PURE__ */ e("span", { children: "Iniciar soporte" }),
            /* @__PURE__ */ e(Ft, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] });
}
function Nn({
  userId: t,
  userName: r,
  canViewChatList: a,
  totalUnreadCount: n,
  isSubmitting: i,
  error: l,
  onHome: o,
  onViewChats: c,
  onClose: d,
  onSubmit: m,
  onNewConversation: f,
  onDragStart: u
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ e(
      "div",
      {
        onPointerDown: u,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-3.5 py-4 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ s(
              E,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: o,
                className: "h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ e(mt, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { children: "Inicio" })
                ]
              }
            ),
            /* @__PURE__ */ e("span", { className: "text-xs font-bold text-white", children: "Solicitar Asistencia" })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1", children: [
            a && /* @__PURE__ */ s(
              E,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: c,
                title: "Ver mis chats",
                className: "relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1",
                children: [
                  /* @__PURE__ */ e(pt, { className: "size-3.5" }),
                  /* @__PURE__ */ e("span", { className: "hidden sm:inline text-[11px] font-medium", children: "Mis chats" }),
                  n > 0 && /* @__PURE__ */ e("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs", children: n > 99 ? "99+" : n })
                ]
              }
            ),
            /* @__PURE__ */ e(
              E,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: d,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ e(ae, { className: "size-4" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-hidden flex flex-col", children: t && /* @__PURE__ */ e(
      wn,
      {
        userId: t,
        userName: r,
        onSubmit: m,
        isSubmitting: i,
        error: l,
        onCancel: o
      }
    ) }),
    /* @__PURE__ */ e(yt, { onNewConversation: f })
  ] });
}
const yn = [
  { id: "all", label: "Todos", icon: null },
  { id: "direct", label: "Directos", icon: Ye },
  { id: "group", label: "Grupos", icon: ut },
  { id: "bot", label: "Bots", icon: pr }
], kn = () => /* @__PURE__ */ s("div", { className: "flex w-full min-w-0 items-center gap-2.5 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-800/20", children: [
  /* @__PURE__ */ e(j, { className: "size-9.5 rounded-full shrink-0" }),
  /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 space-y-2", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e(j, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ e(j, { className: "h-2.5 w-10" })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ e(j, { className: "h-2.5 w-36" }),
      /* @__PURE__ */ e(j, { className: "h-3.5 w-6 rounded-full" })
    ] })
  ] })
] }), Cn = ({
  conversation: t,
  selectedId: r,
  currentUserId: a,
  onSelectConversation: n
}) => {
  var b, x, y;
  const i = Ue(t), l = t.type === "bot" || ((b = t.attributes) == null ? void 0 : b.type) === "bot", o = !!t.attributes.closed_at, c = qe(t, a), d = Pe(t, a), m = ((y = (x = t.relationships) == null ? void 0 : x.users) == null ? void 0 : y.length) || 0, f = i ? "Grupo" : l ? "Bot de Asistencia" : "Conversación directa";
  let u = "";
  try {
    u = Je(
      bt(t.attributes.updated_at || t.attributes.created_at),
      "dd/MM HH:mm"
    );
  } catch {
    u = "";
  }
  const p = r === t.id;
  return /* @__PURE__ */ e(
    "div",
    {
      onClick: () => n(t.id),
      "aria-current": p ? "true" : void 0,
      className: N(
        "group relative flex w-full min-w-0 cursor-pointer select-none flex-col gap-1.5 overflow-hidden rounded-xl p-3 transition-all",
        p ? "bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900" : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent"
      ),
      children: /* @__PURE__ */ s("div", { className: "flex items-start gap-2.5 min-w-0", children: [
        /* @__PURE__ */ e(
          ge,
          {
            src: c == null ? void 0 : c.attributes.avatar_url,
            name: d,
            isGroup: i,
            size: "md",
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("h4", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: d }),
              i && /* @__PURE__ */ s("span", { className: "text-[10px] text-neutral-400 font-normal shrink-0", children: [
                "(",
                m,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ e("span", { className: "shrink-0 text-[10px] text-neutral-400 font-mono", children: u })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ e("p", { className: "truncate text-[11px] text-neutral-500 dark:text-neutral-400", children: f }),
              o && /* @__PURE__ */ s(
                fe,
                {
                  variant: "outline",
                  className: "h-4 px-1 text-[9px] gap-0.5 border-amber-300 text-amber-700 dark:text-amber-400 font-medium",
                  children: [
                    /* @__PURE__ */ e(Ne, { className: "size-2" }),
                    /* @__PURE__ */ e("span", { children: "Cerrado" })
                  ]
                }
              )
            ] }),
            t.attributes.unread_count > 0 && /* @__PURE__ */ e(fe, { className: "bg-blue-700", children: t.attributes.unread_count })
          ] })
        ] })
      ] })
    }
  );
};
function zn({
  conversations: t,
  selectedId: r,
  onSelectConversation: a,
  searchQuery: n,
  onSearchChange: i,
  closedFilter: l,
  onClosedFilterChange: o,
  typeFilter: c,
  onTypeFilterChange: d,
  onNewConversation: m,
  isLoading: f = !1
}) {
  const { currentUser: u, currentUserId: p, isLoadingUser: b, hasError: x, error: y } = ne(), C = de({
    permission: ["messenger_chat.read"]
  }), S = f || b;
  return /* @__PURE__ */ s("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ s("div", { className: "flex shrink-0 flex-col gap-2.5 border-b border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900", children: [
      /* @__PURE__ */ s("div", { className: "group/search relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
        /* @__PURE__ */ e(It, { className: "size-3.5 shrink-0 text-neutral-400 transition-colors group-focus-within/search:text-blue-600" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            placeholder: "Buscar por nombre...",
            value: n,
            onChange: (h) => i(h.target.value),
            className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          }
        ),
        n ? /* @__PURE__ */ e(
          E,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => i(""),
            className: "size-5 shrink-0 rounded-full p-0 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
            children: /* @__PURE__ */ e(ae, { className: "size-3" })
          }
        ) : /* @__PURE__ */ e("span", { className: "hidden shrink-0 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-400 sm:inline-block", children: "Buscar" })
      ] }),
      /* @__PURE__ */ e(
        Ot,
        {
          value: l,
          onValueChange: (h) => o(h),
          className: "w-full",
          children: /* @__PURE__ */ s($t, { className: "h-8 w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ e(Ze, { value: "0", className: "text-[11px] font-medium", children: "Activos" }),
            /* @__PURE__ */ e(Ze, { value: "1", className: "text-[11px] font-medium", children: "Cerrados" })
          ] })
        }
      ),
      /* @__PURE__ */ e("div", { className: "flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none", children: yn.map((h) => {
        const w = c === h.id, H = h.icon;
        return /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => d(h.id),
            className: N(
              "flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              w ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 border border-transparent"
            ),
            children: [
              H && /* @__PURE__ */ e(H, { className: "size-3" }),
              /* @__PURE__ */ e("span", { children: h.label })
            ]
          },
          h.id
        );
      }) })
    ] }),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ e(Be, { className: "h-full w-full", children: /* @__PURE__ */ e("div", { className: "space-y-1.5 p-1.5 w-full min-w-0", children: x ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(tt, { className: "size-6" }) }),
      /* @__PURE__ */ s("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Error al cargar chats" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: (y == null ? void 0 : y.message) || "No se pudo conectar al servidor de mensajería." })
      ] }),
      /* @__PURE__ */ s(
        E,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: () => window.location.reload(),
          className: "h-7.5 gap-1.5 px-3 text-xs font-semibold cursor-pointer",
          children: [
            /* @__PURE__ */ e(xt, { className: "size-3" }),
            /* @__PURE__ */ e("span", { children: "Reintentar" })
          ]
        }
      )
    ] }) : !C && !b ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ e("div", { className: "size-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(Ne, { className: "size-6" }) }),
      /* @__PURE__ */ s("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Sin permiso de lectura" }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: "No tienes permisos para ver el listado de conversaciones." })
      ] })
    ] }) : S ? /* @__PURE__ */ e("div", { className: "space-y-1.5 p-1", children: Array.from({ length: 5 }).map((h, w) => /* @__PURE__ */ e(kn, {}, w)) }) : t.length === 0 ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ e("div", { className: "mb-3 flex size-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400", children: /* @__PURE__ */ e(xr, { className: "size-5 stroke-[1.5]" }) }),
      /* @__PURE__ */ e("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100", children: n ? "No se encontraron resultados" : l === "1" ? "No hay conversaciones cerradas" : "No hay conversaciones activas" }),
      /* @__PURE__ */ e("p", { className: "mt-1 max-w-48 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400", children: n ? "Intenta con otro término de búsqueda o cambia los filtros." : "Las conversaciones iniciadas aparecerán aquí." }),
      l !== "0" && /* @__PURE__ */ e(
        E,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => o("0"),
          className: "mt-3 text-[11px] h-7 text-blue-600 dark:text-blue-400 cursor-pointer",
          children: "Ver activas"
        }
      )
    ] }) : t.map((h) => /* @__PURE__ */ e(
      Cn,
      {
        conversation: h,
        selectedId: r,
        currentUserId: p,
        onSelectConversation: a
      },
      h.id
    )) }) }) }),
    /* @__PURE__ */ e(yt, { onNewConversation: m })
  ] });
}
function _n({
  conversations: t,
  selectedId: r,
  searchQuery: a,
  closedFilter: n,
  typeFilter: i,
  isLoading: l,
  onHome: o,
  onClose: c,
  onSelectConversation: d,
  onSearchChange: m,
  onClosedFilterChange: f,
  onTypeFilterChange: u,
  onNewConversation: p,
  onDragStart: b
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: [
    /* @__PURE__ */ s(
      "div",
      {
        onPointerDown: b,
        className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900 cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ s(
            E,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (x) => x.stopPropagation(),
              onClick: o,
              className: "h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100",
              children: [
                /* @__PURE__ */ e(mt, { className: "size-3.5" }),
                /* @__PURE__ */ e("span", { children: "Inicio" })
              ]
            }
          ),
          /* @__PURE__ */ e("span", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Mis Conversaciones" }),
          /* @__PURE__ */ e(
            E,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (x) => x.stopPropagation(),
              onClick: c,
              className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ e(ae, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ e(
      zn,
      {
        conversations: t,
        selectedId: r,
        onSelectConversation: d,
        searchQuery: a,
        onSearchChange: m,
        closedFilter: n,
        onClosedFilterChange: f,
        typeFilter: i,
        onTypeFilterChange: u,
        onNewConversation: p,
        isLoading: l
      }
    ) })
  ] });
}
function Sn({
  onDragStart: t
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ s(
      "div",
      {
        onPointerDown: t,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ e(j, { className: "size-9 rounded-xl bg-white/20" }),
              /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ e(j, { className: "h-3.5 w-32 bg-white/30" }),
                /* @__PURE__ */ e(j, { className: "h-2.5 w-24 bg-white/20" })
              ] })
            ] }),
            /* @__PURE__ */ e(j, { className: "size-7 rounded-full bg-white/20" })
          ] }),
          /* @__PURE__ */ s("div", { className: "mt-4 space-y-1.5", children: [
            /* @__PURE__ */ e(j, { className: "h-3 w-48 bg-white/30" }),
            /* @__PURE__ */ e(j, { className: "h-2.5 w-64 bg-white/20" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      /* @__PURE__ */ s("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e(j, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ e(j, { className: "h-3.5 w-28" }),
            /* @__PURE__ */ e(j, { className: "h-2.5 w-44" })
          ] })
        ] }),
        /* @__PURE__ */ e(j, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ s("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ e(j, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ e(j, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ e(j, { className: "h-2.5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ e(j, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ s("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(j, { className: "size-3.5 rounded-full" }),
          /* @__PURE__ */ e(j, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ e(j, { className: "h-2.5 w-full" }),
        /* @__PURE__ */ e(j, { className: "h-2.5 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ e(j, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ e(j, { className: "h-3 w-24" }),
          /* @__PURE__ */ e(j, { className: "h-2.5 w-36" })
        ] })
      ] }),
      /* @__PURE__ */ e(j, { className: "size-8 rounded-lg" })
    ] })
  ] });
}
function jn({
  error: t,
  onRetry: r,
  onClose: a,
  onDragStart: n
}) {
  const i = (t == null ? void 0 : t.message) || "No se pudo inicializar la conexión con el servidor de chat.";
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ s(
      "div",
      {
        onPointerDown: n,
        className: "relative shrink-0 overflow-hidden bg-red-600 px-4 py-4 text-white flex items-center justify-between cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(tt, { className: "size-5" }),
            /* @__PURE__ */ e("span", { className: "text-xs font-bold", children: "Error de Conexión" })
          ] }),
          a && /* @__PURE__ */ e(
            E,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (l) => l.stopPropagation(),
              onClick: a,
              className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/20 hover:text-white cursor-pointer",
              children: /* @__PURE__ */ e(ae, { className: "size-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex-1 min-h-0 p-6 flex flex-col items-center justify-center text-center space-y-4", children: [
      /* @__PURE__ */ e("div", { className: "size-14 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ e(Rt, { className: "size-7" }) }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "No se pudo conectar al Chat" }),
        /* @__PURE__ */ e("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", children: i })
      ] }),
      /* @__PURE__ */ s("div", { className: "pt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ s(
          E,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: () => {
              r ? r() : window.location.reload();
            },
            className: "h-8 gap-1.5 px-3.5 text-xs font-semibold cursor-pointer",
            children: [
              /* @__PURE__ */ e(xt, { className: "size-3.5" }),
              /* @__PURE__ */ e("span", { children: "Reintentar conexión" })
            ]
          }
        ),
        a && /* @__PURE__ */ e(
          E,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: a,
            className: "h-8 px-3 text-xs cursor-pointer",
            children: /* @__PURE__ */ e("span", { children: "Cerrar" })
          }
        )
      ] })
    ] })
  ] });
}
function Bn({
  canViewChatList: t = !0,
  canRequestSupport: r = !0,
  defaultView: a = "home",
  defaultCorner: n = "bottom-right",
  initialConversation: i,
  title: l = "Centro de Ayuda SDI",
  hiddenPaths: o = Qt,
  showOnlyPaths: c,
  hideCondition: d,
  hidden: m = !1,
  currentPath: f
}) {
  var g, W, R, B;
  const u = de({
    permission: ["messenger_chat.read"]
  }), p = de({
    permission: ["messenger_chat_support.request_support"]
  });
  de({
    permission: ["messenger_chat_support.provide_support"]
  });
  const b = de({
    permission: [
      "messenger_chat.read",
      "messenger_chat_support.request_support",
      "messenger_chat_support.provide_support"
    ],
    operator: "OR"
  }), x = t && u, y = r && p, { shouldHide: C } = xn({
    hiddenPaths: o,
    showOnlyPaths: c,
    hideCondition: d,
    hidden: m,
    currentPath: f
  }), {
    containerRef: S,
    isDragging: h,
    dragPos: w,
    wasDraggedRef: H,
    isTop: z,
    isLeft: D,
    cornerContainerClass: A,
    cardOriginClass: F,
    startDrag: T
  } = bn(n), [v, M] = _(!1), [U, k] = _(() => !x && !y ? "chat" : a === "list" && !x || a === "support-form" && !y ? "home" : a), { currentUser: K, isLoadingUser: P, hasError: I, error: pe } = ne(), Te = (g = K == null ? void 0 : K.attributes) == null ? void 0 : g.user_auth_id, Me = ((W = K == null ? void 0 : K.attributes) == null ? void 0 : W.name) || "Usuario", {
    mutateAsync: oe,
    isLoading: ke,
    error: se
  } = pn(), [ee, ve] = _(null), [Ce, ce] = _(
    null
  ), {
    conversations: ue,
    selectedId: xe,
    selectedConversation: me,
    closedFilter: V,
    setClosedFilter: Oe,
    typeFilter: $e,
    setTypeFilter: rt,
    searchQuery: at,
    setSearchQuery: Ve,
    isNewConversationOpen: we,
    isLoading: Ge,
    selectConversation: Ke,
    setIsNewConversationOpen: Y,
    handleConversationCreated: Ee
  } = hn(), Ae = le(() => !ue || !Array.isArray(ue) ? 0 : ue.reduce((G, te) => {
    var $;
    return G + ((($ = te.attributes) == null ? void 0 : $.unread_count) || 0);
  }, 0), [ue]), ze = Ce || i || me || null;
  O(() => {
    U === "chat" && !ze && k(x ? "list" : "home");
  }, [U, ze, x]);
  const nt = () => {
    H.current || h || (v ? M(!1) : (M(!0), k(a === "list" && !x ? y ? "support-form" : "home" : a === "support-form" && !y ? x ? "list" : "home" : a || "home")));
  };
  if (C || !P && !I && !b)
    return null;
  const st = (G) => {
    ce(null), Ke(G), k("chat");
  }, it = async (G) => {
    var te, $, ie, lt, ot;
    try {
      const L = await oe(G);
      if (L != null && L.conversation_id && (L != null && L.technician)) {
        const he = String(L.conversation_id), Qe = {
          id: String(L.technician.id),
          type: "user",
          attributes: {
            user_auth_id: Number(L.technician.user_auth_id),
            name: L.technician.name,
            avatar_url: null,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: []
        }, kt = {
          id: he,
          type: "conversation",
          attributes: {
            is_group: !1,
            name: L.technician.name || ((te = L.ticket) == null ? void 0 : te.subject) || "Soporte SDI",
            closed_at: null,
            unread_count: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: {
            users: [Qe]
          }
        };
        ce(kt), Ee(kt), re.success(`Asistencia iniciada con ${L.technician.name}`, {
          description: `Ticket #${(($ = L.ticket) == null ? void 0 : $.number) || ((ie = L.ticket) == null ? void 0 : ie.id)}`
        }), k("chat");
      } else
        ve(L), k("no-technician");
    } catch (L) {
      const he = ((ot = (lt = L == null ? void 0 : L.response) == null ? void 0 : lt.data) == null ? void 0 : ot.message) || (L == null ? void 0 : L.message) || "Error al procesar la solicitud de asistencia";
      re.error(he);
    }
  };
  return C ? null : /* @__PURE__ */ s(
    "div",
    {
      ref: S,
      style: h && w ? {
        position: "fixed",
        left: `${w.x}px`,
        top: `${w.y}px`,
        bottom: "auto",
        right: "auto",
        zIndex: 50,
        touchAction: "none",
        transition: "none"
      } : void 0,
      className: N(
        "sdi-messenger-root z-50 flex pointer-events-none select-none",
        h ? "fixed cursor-grabbing" : N("fixed duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all", A)
      ),
      children: [
        v && /* @__PURE__ */ e(
          Qr,
          {
            className: N(
              "pointer-events-auto h-[590px] max-h-[calc(100vh-120px)] w-[385px] sm:w-[425px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-2xl transition-all duration-300 flex flex-col",
              z ? "mt-3.5" : "mb-3.5",
              F
            ),
            children: I ? /* @__PURE__ */ e(
              jn,
              {
                error: pe,
                onClose: () => M(!1),
                onDragStart: T
              }
            ) : P ? /* @__PURE__ */ e(Sn, { onDragStart: T }) : /* @__PURE__ */ s(be, { children: [
              U === "home" && /* @__PURE__ */ e(
                vn,
                {
                  title: l,
                  canRequestSupport: y,
                  canViewChatList: x,
                  totalUnreadCount: Ae,
                  conversationsCount: ue.length,
                  onRequestSupport: () => k("support-form"),
                  onViewChatList: () => k("list"),
                  onClose: () => M(!1),
                  onNewConversation: () => Y(!0),
                  onDragStart: T
                }
              ),
              U === "support-form" && /* @__PURE__ */ e(
                Nn,
                {
                  userId: Te,
                  userName: Me,
                  canViewChatList: x,
                  totalUnreadCount: Ae,
                  isSubmitting: ke,
                  error: ((B = (R = se == null ? void 0 : se.response) == null ? void 0 : R.data) == null ? void 0 : B.message) || (se == null ? void 0 : se.message),
                  onHome: () => k("home"),
                  onViewChats: () => k("list"),
                  onClose: () => M(!1),
                  onSubmit: it,
                  onNewConversation: () => Y(!0),
                  onDragStart: T
                }
              ),
              U === "no-technician" && /* @__PURE__ */ e(
                on,
                {
                  message: ee == null ? void 0 : ee.message,
                  ticket: ee == null ? void 0 : ee.ticket,
                  onNewRequest: () => {
                    ve(null), k("support-form");
                  },
                  onViewChats: () => k("list"),
                  onClose: () => M(!1),
                  canViewChatList: x
                }
              ),
              U === "list" && /* @__PURE__ */ e(
                _n,
                {
                  conversations: ue,
                  selectedId: xe,
                  searchQuery: at,
                  closedFilter: V,
                  typeFilter: $e,
                  isLoading: Ge,
                  onHome: () => k("home"),
                  onClose: () => M(!1),
                  onSelectConversation: st,
                  onSearchChange: Ve,
                  onClosedFilterChange: Oe,
                  onTypeFilterChange: rt,
                  onNewConversation: () => Y(!0),
                  onDragStart: T
                }
              ),
              U === "chat" && ze && /* @__PURE__ */ e("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: /* @__PURE__ */ e(
                ln,
                {
                  conversation: ze,
                  isContextPanelOpen: !1,
                  alwaysShowBackButton: !0,
                  onCloseSuccess: () => {
                    ce(null), k(x ? "list" : "home");
                  },
                  onBack: () => {
                    ce(null), k(x ? "list" : "home");
                  }
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ e(
          gn,
          {
            isOpen: v,
            totalUnreadCount: Ae,
            isLeft: D,
            isLoading: P,
            hasError: I,
            onToggleOpen: nt,
            onPointerDown: T
          }
        ),
        /* @__PURE__ */ e(
          un,
          {
            open: we,
            onOpenChange: Y,
            onSuccess: (G) => {
              ce(G), Ee(G), k("chat");
            }
          }
        )
      ]
    }
  );
}
function Un({ onNewConversation: t }) {
  const { hasError: r, error: a, isLoadingUser: n } = ne(), i = de({
    permission: ["messenger_chat.read"]
  }), l = de({
    permission: ["messenger_chat_support.provide_support"]
  });
  return r ? /* @__PURE__ */ s("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ e("div", { className: "absolute inset-x-0 top-0 h-1 bg-red-500/30" }),
    /* @__PURE__ */ s("div", { className: "flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200", children: [
      /* @__PURE__ */ e("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs", children: /* @__PURE__ */ e(tt, { className: "size-8" }) }),
      /* @__PURE__ */ e("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400", children: "Servicio no disponible" }),
      /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Error de conexión" }),
      /* @__PURE__ */ e("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: (a == null ? void 0 : a.message) || "No fue posible conectar con el servidor de chat. Las funciones de mensajería están temporalmente deshabilitadas." }),
      /* @__PURE__ */ s(
        E,
        {
          type: "button",
          variant: "primary",
          className: "mt-6 gap-1.5 cursor-pointer shadow-xs",
          onClick: () => window.location.reload(),
          children: [
            /* @__PURE__ */ e(xt, { className: "size-4" }),
            "Reintentar conexión"
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ e("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#f4f6f8] dark:bg-[#0a0f1d] shadow-xs", children: /* @__PURE__ */ s("div", { className: "relative z-10 flex max-w-md flex-col items-center px-6 text-center", children: [
    /* @__PURE__ */ e("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs", children: /* @__PURE__ */ e(Ie, { className: "size-8" }) }),
    /* @__PURE__ */ e("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400", children: "Bandeja de conversaciones" }),
    /* @__PURE__ */ e("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Selecciona una conversación" }),
    /* @__PURE__ */ e("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: i ? "Elige una conversación del panel lateral para ver sus mensajes o inicia una nueva cuando estés listo." : "No cuentas con permisos para ver la lista de conversaciones." }),
    t && !n && l && /* @__PURE__ */ s(
      E,
      {
        type: "button",
        variant: "outline",
        className: "mt-6 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors",
        onClick: t,
        children: [
          /* @__PURE__ */ e(Ie, { className: "size-4" }),
          "Nueva conversación"
        ]
      }
    )
  ] }) });
}
function qn({
  conversation: t,
  onClose: r,
  className: a
}) {
  var f, u;
  const { currentUserId: n } = ne(), i = Ue(t), l = qe(t, n), o = Pe(t, n), c = ((u = (f = t.relationships) == null ? void 0 : f.users) == null ? void 0 : u.length) || 0, d = !!t.attributes.closed_at, m = (p) => {
    if (!p) return "-";
    try {
      return Je(bt(p), "dd/MM/yyyy HH:mm");
    } catch {
      return p;
    }
  };
  return /* @__PURE__ */ s(
    "div",
    {
      className: N(
        "sdi-messenger-root flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-3 px-4 bg-white dark:bg-neutral-900", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e(Ye, { className: "size-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ e("h3", { className: "text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100", children: "Información de Contacto" })
          ] }),
          r && /* @__PURE__ */ e(
            E,
            {
              variant: "ghost",
              size: "icon",
              onClick: r,
              className: " p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              children: /* @__PURE__ */ e(ae, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ e(Be, { className: "h-full", children: /* @__PURE__ */ s("div", { className: "space-y-4 p-4", children: [
          /* @__PURE__ */ s("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ e("div", { className: "relative mb-2", children: /* @__PURE__ */ e(
              ge,
              {
                src: l == null ? void 0 : l.attributes.avatar_url,
                name: o,
                isGroup: i,
                size: "xl",
                status: !i && l ? "online" : void 0
              }
            ) }),
            /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: o }),
            /* @__PURE__ */ e("p", { className: "text-xs font-medium text-neutral-500 dark:text-neutral-400", children: i ? `${c} participantes` : "Conversación individual" }),
            /* @__PURE__ */ s("div", { className: "flex items-center justify-center gap-1.5 mt-2", children: [
              /* @__PURE__ */ e(fe, { variant: "secondary", className: "text-[10px]", children: i ? "Grupo" : "Usuario" }),
              d ? /* @__PURE__ */ s(
                fe,
                {
                  variant: "outline",
                  className: "text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ e(Ne, { className: "size-2.5" }),
                    /* @__PURE__ */ e("span", { children: "Cerrada" })
                  ]
                }
              ) : /* @__PURE__ */ s(
                fe,
                {
                  variant: "outline",
                  className: "text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ e(Xe, { className: "size-2.5" }),
                    /* @__PURE__ */ e("span", { children: "Activa" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ e(Kr, {}),
          /* @__PURE__ */ s("div", { className: "space-y-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(Ye, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ e("span", { className: "truncate text-neutral-900 dark:text-neutral-100 font-medium", children: i ? `${c} participantes` : o })
            ] }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(br, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Creada: ",
                m(t.attributes.created_at)
              ] })
            ] }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(ht, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Actualizada: ",
                m(t.attributes.updated_at)
              ] })
            ] }),
            t.attributes.closed_at && /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ e(Ne, { className: "size-3.5 shrink-0 text-amber-500" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Cerrada: ",
                m(t.attributes.closed_at)
              ] })
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Hn as ChatProvider,
  ln as ConversationChatPanel,
  qn as ConversationContextPanel,
  Un as ConversationEmptyState,
  zn as ConversationsSidebarList,
  Bn as FloatingChat,
  un as NewConversationDialog,
  wn as RequestSupportForm,
  ne as useChatContext,
  Ja as useConversationChat,
  hn as useConversationsPage,
  Wn as useOptionalChatContext
};
//# sourceMappingURL=index.js.map
