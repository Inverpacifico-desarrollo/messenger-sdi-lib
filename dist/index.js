"use client";
import { jsx as t, jsxs as s, Fragment as pe } from "react/jsx-runtime";
import { createContext as He, useMemo as se, useState as C, useEffect as H, useContext as We, forwardRef as rt, useRef as B, useCallback as W, useLayoutEffect as It } from "react";
import rr from "axios";
import { twMerge as ar } from "tailwind-merge";
import { Users as ht, X as oe, CheckCircle2 as Je, Loader2 as je, Lock as ye, ArrowLeft as ft, Info as nr, FileText as sr, Download as ir, Clock as bt, CheckCheck as lr, ChevronsDown as or, Paperclip as Et, SendHorizontal as Rt, UploadCloud as dr, ShieldCheck as xt, Ticket as cr, RotateCcw as ur, MessagesSquare as pt, MessageSquarePlus as Be, User as Ze, Search as Bt, Check as mr, AlertTriangle as gt, MessageCircleMore as hr, WifiOff as fr, LifeBuoy as mt, ChevronRight as Dt, AlertCircle as br, Tag as xr, MessageSquare as pr, Bot as gr, RefreshCw as Ut, Inbox as vr, CalendarDays as wr } from "lucide-react";
import { createPortal as Ht } from "react-dom";
import { toast as re } from "sonner";
import { parseISO as vt, isValid as Nr, isToday as yr, isYesterday as kr, isThisWeek as Cr, format as et } from "date-fns";
import zr from "pusher-js";
typeof globalThis < "u" && typeof globalThis.self > "u" && (globalThis.self = globalThis);
let Pe = null;
const Sr = (e) => {
  Pe = e;
}, _r = (e) => Object.entries(e).reduce((r, [a, n]) => (r[a] = typeof n == "boolean" ? Number(n) : n, r), {}), J = (e, r) => {
  if (!Pe)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  return `${Pe.apiBaseUrl.replace(/\/+$/, "")}/${e}/api/${r}`;
}, Z = async ({
  data: e,
  url: r,
  params: a,
  method: n,
  headers: i,
  ...l
}) => {
  if (!Pe)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const o = {
    ...l,
    url: r,
    method: n,
    data: e,
    params: a ? _r(a) : void 0,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...Pe.authToken ? { Authorization: `Bearer ${Pe.authToken}` } : {},
      ...i
    }
  };
  return rr.request(o);
}, Er = (e) => Z({
  url: `${J("messenger", "v1")}/users`,
  method: "GET",
  params: e
}), Dr = (e) => Z({
  url: `${J("messenger", "v1")}/users/${e}/user`,
  method: "GET"
}), Pr = ({
  applicationId: e,
  userId: r
}) => Z({
  url: `${J("auth", "v1")}/users/${r}/permissions`,
  method: "GET",
  params: {
    application_id: e
  }
}), jr = () => Z({
  url: `${J("auth", "v1")}/me`,
  method: "GET"
}), wt = He(null);
function Tr(e) {
  var a, n, i, l;
  const r = [];
  return (a = e.apiBaseUrl) != null && a.trim() || r.push("apiBaseUrl"), (e.applicationId === void 0 || e.applicationId === null) && r.push("applicationId"), e.reverb ? ((n = e.reverb.key) != null && n.trim() || r.push("reverb.key"), (i = e.reverb.host) != null && i.trim() || r.push("reverb.host"), (!Number.isFinite(e.reverb.port) || e.reverb.port <= 0) && r.push("reverb.port"), (l = e.reverb.wsPath) != null && l.trim() || r.push("reverb.wsPath"), e.reverb.scheme !== "http" && e.reverb.scheme !== "https" && r.push("reverb.scheme")) : r.push("reverb"), r.length > 0 ? new Error(`Configuración incompleta del chat: ${r.join(", ")}`) : null;
}
function qn({ config: e, children: r }) {
  const { authToken: a, apiBaseUrl: n, applicationId: i, reverb: l } = e, o = se(
    () => Tr(e),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      n,
      i,
      l == null ? void 0 : l.key,
      l == null ? void 0 : l.host,
      l == null ? void 0 : l.port,
      l == null ? void 0 : l.wsPath,
      l == null ? void 0 : l.scheme
    ]
  ), [c, u] = C(null), [h, m] = C([]), [d, w] = C(null), [N, v] = C(null), [g, x] = C(null), S = JSON.stringify([n, i, a]);
  H(() => {
    o && console.error(`[Chat] ${o.message}`);
  }, [o]), H(() => {
    let F = !0;
    return o || !a ? () => {
      F = !1;
    } : (Sr({
      apiBaseUrl: n,
      authToken: a
    }), (async () => {
      var E;
      try {
        const T = await jr(), p = (await Dr(T.data.data.id)).data.data;
        if (!(p != null && p.id))
          throw new Error("La respuesta no contiene un usuario válido para el chat");
        const $ = ((E = (await Pr({
          userId: p.attributes.user_auth_id,
          applicationId: i
        })).data.data) == null ? void 0 : E.map((ee) => ee.attributes.name)) ?? [];
        F && (u(p), m($), w(S), v(null), x(null));
      } catch (T) {
        F && (console.error("Error al cargar el usuario en ChatProvider:", T), v(T instanceof Error ? T : new Error("Error al inicializar el chat")), x(S));
      }
    })(), () => {
      F = !1;
    });
  }, [o, a, n, i, S]);
  const f = (F) => {
    u(F);
  }, b = se(() => c != null && c.id ? String(c.id) : "", [c]), _ = !!(c != null && c.id) && d === S, y = g === S && N !== null, R = {
    currentUser: c,
    currentUserId: b,
    permissions: h,
    isLoadingUser: !o && !!a && !_ && !y,
    hasError: !!o || y,
    error: o ?? (y ? N : null),
    config: e,
    setCurrentUser: f
  };
  return /* @__PURE__ */ t(wt.Provider, { value: R, children: r });
}
function Vn() {
  return We(wt);
}
function ae() {
  const e = We(wt);
  if (!e)
    throw new Error("useChatContext debe usarse dentro de un ChatProvider");
  return e;
}
function D(...e) {
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
  return e.forEach(a), ar(r.join(" "));
}
const U = rt(
  ({ className: e, variant: r = "default", size: a = "default", type: n = "button", disabled: i, children: l, ...o }, c) => {
    const u = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer", h = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-xs",
      primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-xs",
      outline: "border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300",
      secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-xs",
      success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
    }, m = {
      default: "h-9 px-4 py-2 text-sm rounded-lg gap-2",
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      lg: "h-10 px-6 text-base rounded-xl gap-2.5",
      icon: "size-9 p-0 rounded-lg",
      "icon-sm": "size-8 p-0 rounded-lg"
    };
    return /* @__PURE__ */ t(
      "button",
      {
        ref: c,
        type: n,
        disabled: i,
        className: D(u, h[r], m[a], e),
        ...o,
        children: l
      }
    );
  }
);
U.displayName = "ChatButton";
const Nt = rt(
  ({ className: e, type: r = "text", disabled: a, ...n }, i) => /* @__PURE__ */ t(
    "input",
    {
      ref: i,
      type: r,
      disabled: a,
      className: D(
        "flex h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        e
      ),
      ...n
    }
  )
);
Nt.displayName = "ChatInput";
const yt = rt(
  ({ className: e, disabled: r, ...a }, n) => /* @__PURE__ */ t(
    "textarea",
    {
      ref: n,
      disabled: r,
      className: D(
        "flex min-h-15 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        e
      ),
      ...a
    }
  )
);
yt.displayName = "ChatTextarea";
function me({ className: e, variant: r = "default", children: a, ...n }) {
  return /* @__PURE__ */ t("span", { className: D("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
  }[r], e), ...n, children: a });
}
function Ar(e) {
  if (!e) return "?";
  const r = e.trim().split(/\s+/);
  return r.length === 1 ? r[0].substring(0, 2).toUpperCase() : (r[0][0] + r[r.length - 1][0]).toUpperCase();
}
const Pt = [
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
function Mr(e) {
  if (!e) return "#62748e";
  let r = 0;
  for (let a = 0; a < (e || "").length; a++)
    r = (r << 5) - r + (e || "").charCodeAt(a), r |= 0;
  return Pt[Math.abs(r) % Pt.length];
}
function ge({
  src: e,
  name: r = "",
  size: a = "md",
  isGroup: n = !1,
  status: i,
  className: l,
  ...o
}) {
  const [c, u] = C(!1), h = {
    xs: { box: "size-6", text: "text-[10px]", icon: "size-3", statusDot: "size-1.5" },
    sm: { box: "size-8", text: "text-xs", icon: "size-3.5", statusDot: "size-2" },
    md: { box: "size-10", text: "text-sm", icon: "size-5", statusDot: "size-2.5" },
    lg: { box: "size-12", text: "text-base", icon: "size-6", statusDot: "size-3" },
    xl: { box: "size-16", text: "text-xl", icon: "size-8", statusDot: "size-3.5" }
  }, { box: m, text: d, icon: w, statusDot: N } = h[a], v = Ar(r), g = se(() => Mr(r), [r]), x = !!e && !c;
  return /* @__PURE__ */ s("div", { className: D("relative inline-block shrink-0", m, l), ...o, children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: D(
          "flex size-full items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          !x && (n ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "font-semibold text-xs")
        ),
        style: !x && !n ? {
          backgroundColor: `${g}33`,
          color: `${g}FF`,
          fontWeight: "bold"
        } : void 0,
        children: x ? /* @__PURE__ */ t(
          "img",
          {
            src: e,
            alt: r || "Avatar",
            onError: () => u(!0),
            className: "size-full object-cover",
            loading: "lazy"
          }
        ) : n ? /* @__PURE__ */ t(ht, { className: w }) : /* @__PURE__ */ t("span", { className: D("font-bold tracking-tight", d), children: v })
      }
    ),
    i && /* @__PURE__ */ t(
      "span",
      {
        className: D(
          "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-900",
          N,
          i === "online" && "bg-emerald-500",
          i === "offline" && "bg-neutral-400",
          i === "busy" && "bg-amber-500"
        )
      }
    )
  ] });
}
const Wt = He(null);
function Lr() {
  const e = We(Wt);
  if (!e)
    throw new Error("Los subcomponentes de Dialog deben usarse dentro de <Dialog>");
  return e;
}
function Fr({ open: e, onOpenChange: r, children: a }) {
  return H(() => {
    if (!e) return;
    const n = (l) => {
      l.key === "Escape" && r(!1);
    }, i = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = i, window.removeEventListener("keydown", n);
    };
  }, [e, r]), /* @__PURE__ */ t(Wt.Provider, { value: { open: e, onOpenChange: r }, children: a });
}
function Ir({ className: e, children: r, showClose: a = !0, ...n }) {
  const { open: i, onOpenChange: l } = Lr(), o = B(null);
  return !i || typeof window > "u" ? null : Ht(
    /* @__PURE__ */ t(
      "div",
      {
        ref: o,
        onClick: (u) => {
          u.target === o.current && l(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ s(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            className: D(
              "relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden transition-all animate-in zoom-in-95 duration-150 text-neutral-900 dark:text-neutral-100",
              e
            ),
            ...n,
            children: [
              a && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => l(!1),
                  "aria-label": "Cerrar",
                  className: "absolute right-3.5 top-3.5 z-20 rounded-lg p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                  children: /* @__PURE__ */ t(oe, { className: "size-4" })
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
function Rr({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: D("flex flex-col gap-1.5 text-left p-5 pb-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", e), ...r });
}
function Br({ className: e, ...r }) {
  return /* @__PURE__ */ t("h3", { className: D("text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100", e), ...r });
}
function Ur({ className: e, ...r }) {
  return /* @__PURE__ */ t("p", { className: D("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", e), ...r });
}
function Hr({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: D("flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", e), ...r });
}
const $t = He(null);
function qt() {
  const e = We($t);
  if (!e)
    throw new Error("Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>");
  return e;
}
function Wr({ open: e, onOpenChange: r, children: a }) {
  return H(() => {
    if (!e) return;
    const n = (l) => {
      l.key === "Escape" && r(!1);
    }, i = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = i, window.removeEventListener("keydown", n);
    };
  }, [e, r]), /* @__PURE__ */ t($t.Provider, { value: { open: e, onOpenChange: r }, children: a });
}
function $r({ className: e, children: r, ...a }) {
  const { open: n, onOpenChange: i } = qt(), l = B(null);
  return !n || typeof window > "u" ? null : Ht(
    /* @__PURE__ */ t(
      "div",
      {
        ref: l,
        onClick: (c) => {
          c.target === l.current && i(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ t(
          "div",
          {
            role: "alertdialog",
            "aria-modal": "true",
            className: D(
              "relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-5 text-neutral-900 dark:text-neutral-100 transition-all animate-in zoom-in-95 duration-150",
              e
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
function qr({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: D("flex flex-col gap-2 text-left", e), ...r });
}
function Vr({ className: e, ...r }) {
  return /* @__PURE__ */ t("h3", { className: D("text-sm font-bold text-neutral-900 dark:text-neutral-100", e), ...r });
}
function Or({ className: e, ...r }) {
  return /* @__PURE__ */ t("p", { className: D("text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", e), ...r });
}
function Gr({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: D("flex items-center justify-end gap-2 mt-4", e), ...r });
}
function Kr({
  className: e,
  onClick: r,
  children: a,
  ...n
}) {
  const { onOpenChange: i } = qt();
  return /* @__PURE__ */ t(
    U,
    {
      variant: "outline",
      size: "sm",
      onClick: (l) => {
        i(!1), r == null || r(l);
      },
      className: D("text-xs", e),
      ...n,
      children: a || "Cancelar"
    }
  );
}
function Xr({
  className: e,
  variant: r = "danger",
  size: a = "sm",
  ...n
}) {
  return /* @__PURE__ */ t(U, { variant: r, size: a, className: D("text-xs font-semibold", e), ...n });
}
He(null);
const Vt = He(null);
function Yr() {
  const e = We(Vt);
  if (!e)
    throw new Error("Los subcomponentes de Tabs deben usarse dentro de <Tabs>");
  return e;
}
function Ot({
  value: e,
  defaultValue: r = "",
  onValueChange: a,
  className: n,
  children: i,
  ...l
}) {
  const [o, c] = C(r), u = e !== void 0, h = u ? e : o, m = u ? a : c;
  return /* @__PURE__ */ t(Vt.Provider, { value: { value: h, onValueChange: m }, children: /* @__PURE__ */ t("div", { className: D("flex flex-col gap-2 w-full", n), ...l, children: i }) });
}
function Gt({ className: e, children: r, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: D(
        "flex w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 text-neutral-500 dark:text-neutral-400 gap-1",
        e
      ),
      ...a,
      children: r
    }
  );
}
function tt({ value: e, className: r, children: a, ...n }) {
  const { value: i, onValueChange: l } = Yr(), o = i === e;
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": o,
      onClick: () => l(e),
      className: D(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none cursor-pointer",
        o ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5",
        r
      ),
      ...n,
      children: a
    }
  );
}
const $e = rt(
  ({ className: e, children: r, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: D(
        "relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]",
        e
      ),
      ...a,
      children: r
    }
  )
);
$e.displayName = "ChatScrollArea";
function Qr({
  orientation: e = "horizontal",
  className: r,
  ...a
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "separator",
      "aria-orientation": e,
      className: D(
        "shrink-0 bg-neutral-200 dark:bg-neutral-800",
        e === "horizontal" ? "h-px w-full" : "h-full w-px",
        r
      ),
      ...a
    }
  );
}
function Jr({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: D(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100",
        e
      ),
      ...r
    }
  );
}
function L({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: D(
        "animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80",
        e
      ),
      ...r
    }
  );
}
const Ue = (e) => e ? e.toLowerCase().split(" ").filter(Boolean).map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ") : "", qe = (e) => !!e.attributes.is_group, Ve = (e, r) => {
  var i;
  const a = ((i = e.relationships) == null ? void 0 : i.users) || [];
  if (!r)
    return a[0];
  const n = String(r);
  return a.find((l) => String(l.id) !== n) || a[0];
}, Te = (e, r) => {
  var i;
  if (qe(e))
    return e.attributes.name || "Grupo";
  const a = Ve(e, r), n = ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i.name) || e.attributes.name || "Usuario";
  return Ue(n);
};
function dt(e) {
  return (r = {}) => {
    const a = r.width ? String(r.width) : e.defaultWidth;
    return e.formats[a] || e.formats[e.defaultWidth];
  };
}
function Fe(e) {
  return (r, a) => {
    const n = a != null && a.context ? String(a.context) : "standalone";
    let i;
    if (n === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, c = a != null && a.width ? String(a.width) : o;
      i = e.formattingValues[c] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, c = a != null && a.width ? String(a.width) : e.defaultWidth;
      i = e.values[c] || e.values[o];
    }
    const l = e.argumentCallback ? e.argumentCallback(r) : r;
    return i[l];
  };
}
function Ie(e) {
  return (r, a = {}) => {
    const n = a.width, i = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], l = r.match(i);
    if (!l)
      return null;
    const o = l[0], c = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], u = Array.isArray(c) ? ea(c, (d) => d.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      Zr(c, (d) => d.test(o))
    );
    let h;
    h = e.valueCallback ? e.valueCallback(u) : u, h = a.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      a.valueCallback(h)
    ) : h;
    const m = r.slice(o.length);
    return { value: h, rest: m };
  };
}
function Zr(e, r) {
  for (const a in e)
    if (Object.prototype.hasOwnProperty.call(e, a) && r(e[a]))
      return a;
}
function ea(e, r) {
  for (let a = 0; a < e.length; a++)
    if (r(e[a]))
      return a;
}
function ta(e) {
  return (r, a = {}) => {
    const n = r.match(e.matchPattern);
    if (!n) return null;
    const i = n[0], l = r.match(e.parsePattern);
    if (!l) return null;
    let o = e.valueCallback ? e.valueCallback(l[0]) : l[0];
    o = a.valueCallback ? a.valueCallback(o) : o;
    const c = r.slice(i.length);
    return { value: o, rest: c };
  };
}
const ra = {
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
}, aa = (e, r, a) => {
  let n;
  const i = ra[e];
  return typeof i == "string" ? n = i : r === 1 ? n = i.one : n = i.other.replace("{{count}}", r.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "en " + n : "hace " + n : n;
}, na = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, sa = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, ia = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, la = {
  date: dt({
    formats: na,
    defaultWidth: "full"
  }),
  time: dt({
    formats: sa,
    defaultWidth: "full"
  }),
  dateTime: dt({
    formats: ia,
    defaultWidth: "full"
  })
}, oa = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, da = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, ca = (e, r, a, n) => r.getHours() !== 1 ? da[e] : oa[e], ua = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, ma = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, ha = {
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
}, fa = {
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
}, ba = {
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
}, xa = {
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
}, pa = (e, r) => Number(e) + "º", ga = {
  ordinalNumber: pa,
  era: Fe({
    values: ua,
    defaultWidth: "wide"
  }),
  quarter: Fe({
    values: ma,
    defaultWidth: "wide",
    argumentCallback: (e) => Number(e) - 1
  }),
  month: Fe({
    values: ha,
    defaultWidth: "wide"
  }),
  day: Fe({
    values: fa,
    defaultWidth: "wide"
  }),
  dayPeriod: Fe({
    values: ba,
    defaultWidth: "wide",
    formattingValues: xa,
    defaultFormattingWidth: "wide"
  })
}, va = /^(\d+)(º)?/i, wa = /\d+/i, Na = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, ya = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, ka = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Ca = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, za = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, Sa = {
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
}, _a = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, Ea = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, Da = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, Pa = {
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
  ordinalNumber: ta({
    matchPattern: va,
    parsePattern: wa,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: Ie({
    matchPatterns: Na,
    defaultMatchWidth: "wide",
    parsePatterns: ya,
    defaultParseWidth: "any"
  }),
  quarter: Ie({
    matchPatterns: ka,
    defaultMatchWidth: "wide",
    parsePatterns: Ca,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ie({
    matchPatterns: za,
    defaultMatchWidth: "wide",
    parsePatterns: Sa,
    defaultParseWidth: "any"
  }),
  day: Ie({
    matchPatterns: _a,
    defaultMatchWidth: "wide",
    parsePatterns: Ea,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ie({
    matchPatterns: Da,
    defaultMatchWidth: "any",
    parsePatterns: Pa,
    defaultParseWidth: "any"
  })
}, jt = {
  code: "es",
  formatDistance: aa,
  formatLong: la,
  formatRelative: ca,
  localize: ga,
  match: ja,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, Ta = ({
  conversationId: e,
  sender: r,
  body: a,
  file: n
}) => {
  const i = `optimistic-${Date.now()}`, l = (/* @__PURE__ */ new Date()).toISOString(), o = Number(r.id), c = r.attributes || {}, u = c.name || c.username || "Usuario", h = c.avatar_url ?? c.avatar ?? null, m = {
    id: String(r.id),
    type: "user",
    attributes: {
      user_auth_id: c.user_auth_id ?? r.id,
      name: u,
      avatar_url: h,
      created_at: l,
      updated_at: l
    },
    relationships: []
  };
  return {
    id: i,
    type: "message",
    attributes: {
      conversation_id: Number(e),
      created_at: l,
      sender_id: o,
      body: a || "Archivo adjunto",
      type: { id: 0, name: "message", icon: "" }
    },
    relationships: {
      sender: m,
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
function Aa(e) {
  return e.slice(0, 10);
}
function Ma(e, r) {
  if (r.attributes.sender_id == null) return e;
  const a = Aa(r.attributes.created_at || ""), n = e[0];
  return n && n.date === a ? n.messages.some((i) => i.id === r.id) ? e : [{ ...n, messages: [r, ...n.messages] }, ...e.slice(1)] : [{ date: a, messages: [r] }, ...e];
}
function La(e, r) {
  if (e.length === 0) return r;
  if (r.length === 0) return e;
  const a = e[e.length - 1], n = r[0];
  if (n.date === a.date) {
    const i = new Set(a.messages.map((o) => o.id)), l = n.messages.filter((o) => !i.has(o.id));
    return [
      ...e.slice(0, -1),
      { date: a.date, messages: [...a.messages, ...l] },
      ...r.slice(1)
    ];
  }
  return [...e, ...r];
}
function ct(e) {
  if (!e) return "Hoy";
  const r = e.trim().toLowerCase();
  if (r === "hoy" || r === "today") return "Hoy";
  if (r === "ayer" || r === "yesterday") return "Ayer";
  const a = vt(e);
  return Nr(a) ? yr(a) ? "Hoy" : kr(a) ? "Ayer" : Cr(a, { weekStartsOn: 1 }) ? et(a, "EEEE", { locale: jt }) : et(a, "d 'de' MMMM 'de' yyyy", { locale: jt }) : e;
}
const ut = async ({
  conversation: e,
  ...r
}) => await Z({
  url: `${J("messenger", "v1")}/conversations/${e}/messages`,
  method: "GET",
  params: r
}), Fa = (e, r) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}/messages`,
  method: "POST",
  data: r
}), Ia = (e, r) => {
  const a = new FormData();
  return a.append("file", r.file), a.append("sender_id", r.sender_id.toString()), r.caption && a.append("caption", r.caption), Z({
    url: `${J("messenger", "v1")}/conversations/${e}/file`,
    method: "POST",
    data: a,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
function Ra(e, r) {
  var o, c, u, h;
  if (!e) return;
  const a = ((o = e.data) == null ? void 0 : o.data) ?? [];
  if (!Array.isArray(a) || a.length === 0 || a.reduce(
    (m, d) => m + (Array.isArray(d == null ? void 0 : d.messages) ? d.messages.length : 0),
    0
  ) === 0)
    return;
  const i = (c = e.data) == null ? void 0 : c.meta;
  if ((i == null ? void 0 : i.has_more) === !1)
    return;
  let l = i == null ? void 0 : i.next_cursor;
  if (!l) {
    const m = (h = (u = e.data) == null ? void 0 : u.links) == null ? void 0 : h.next;
    if (m)
      try {
        const d = new URL(m, "http://localhost");
        l = d.searchParams.get("page[cursor]") || d.searchParams.get("cursor") || void 0;
      } catch {
      }
  }
  if (!(!l || l === "null" || l === "undefined" || l.trim() === "") && !r.includes(l))
    return l;
}
const Ba = ({ params: e, enabled: r = !0 }) => {
  var F, z;
  const a = r && !!(e != null && e.conversation), [n, i] = C([]), [l, o] = C([]), [c, u] = C(a), [h, m] = C(a), [d, w] = C(!1), [N, v] = C({}), g = B(e);
  g.current = e;
  const x = B(!1), S = e == null ? void 0 : e.conversation, f = n[n.length - 1], b = Ra(f, l), _ = !!b, y = W(async () => {
    var E, T, j;
    if ((E = g.current) != null && E.conversation) {
      u(!0), m(!0), x.current = !0, v({});
      try {
        const p = await ut({
          ...g.current,
          page: {
            ...(T = g.current) == null ? void 0 : T.page
          }
        });
        i([p]), o([]);
      } catch (p) {
        v(((j = p == null ? void 0 : p.response) == null ? void 0 : j.data) ?? (p == null ? void 0 : p.data) ?? {});
      } finally {
        u(!1), m(!1), x.current = !1;
      }
    }
  }, []), P = W(async () => {
    var E, T, j;
    if (!(!_ || !b || x.current || !((E = g.current) != null && E.conversation))) {
      w(!0), m(!0), x.current = !0;
      try {
        const p = await ut({
          ...g.current,
          cursor: b,
          page: {
            ...(T = g.current) == null ? void 0 : T.page,
            cursor: b
          }
        });
        i((A) => [...A, p]), o((A) => [...A, b]);
      } catch (p) {
        v(((j = p == null ? void 0 : p.response) == null ? void 0 : j.data) ?? (p == null ? void 0 : p.data) ?? {});
      } finally {
        w(!1), m(!1), x.current = !1;
      }
    }
  }, [_, b]), I = W((E) => {
    i((T) => {
      var $;
      if (!T || T.length === 0) return T;
      const j = T[0], p = (($ = j.data) == null ? void 0 : $.data) ?? [], A = Ma(p, E);
      return [
        {
          ...j,
          data: {
            ...j.data,
            data: A
          }
        },
        ...T.slice(1)
      ];
    });
  }, []);
  return H(() => {
    if (!a || !S) {
      i([]), o([]), u(!1), m(!1);
      return;
    }
    let E = !0;
    return (async () => {
      var j;
      u(!0), m(!0), x.current = !0, v({});
      try {
        const p = await ut({
          ...e,
          page: {
            ...e == null ? void 0 : e.page
          }
        });
        E && (i([p]), o([]));
      } catch (p) {
        E && v(((j = p == null ? void 0 : p.response) == null ? void 0 : j.data) ?? (p == null ? void 0 : p.data) ?? {});
      } finally {
        E && (u(!1), m(!1), x.current = !1);
      }
    })(), () => {
      E = !1;
    };
  }, [S, a]), {
    data: se(() => !n || n.length === 0 ? [] : n.reduce((E, T) => {
      var p;
      const j = ((p = T == null ? void 0 : T.data) == null ? void 0 : p.data) ?? [];
      return La(E, j);
    }, []), [n]),
    rawPages: n,
    isLoading: c,
    isPending: c,
    isFetching: h,
    isFetchingNextPage: d,
    hasNextPage: _,
    fetchNextPage: P,
    errors: N,
    refetch: y,
    prependIncomingMessage: I,
    meta: (z = (F = n[0]) == null ? void 0 : F.data) == null ? void 0 : z.meta
  };
};
function ke(e, r) {
  const [a, n] = C(void 0), [i, l] = C(null), [o, c] = C(!1), [u, h] = C(!1), [m, d] = C(!1), w = W(() => {
    n(void 0), l(null), c(!1), h(!1), d(!1);
  }, []), N = W(
    async (g) => {
      var x, S, f, b;
      c(!0), h(!1), d(!1), l(null);
      try {
        const _ = await e(g);
        return n(_), h(!0), c(!1), await ((x = r == null ? void 0 : r.onSuccess) == null ? void 0 : x.call(r, _, g)), await ((S = r == null ? void 0 : r.onSettled) == null ? void 0 : S.call(r, _, null, g)), _;
      } catch (_) {
        const y = _;
        throw l(y), d(!0), c(!1), await ((f = r == null ? void 0 : r.onError) == null ? void 0 : f.call(r, y, g)), await ((b = r == null ? void 0 : r.onSettled) == null ? void 0 : b.call(r, void 0, y, g)), _;
      }
    },
    [e, r]
  ), v = W(
    (g, x) => {
      N(g).then(async (S) => {
        var f, b;
        await ((f = x == null ? void 0 : x.onSuccess) == null ? void 0 : f.call(x, S, g)), await ((b = x == null ? void 0 : x.onSettled) == null ? void 0 : b.call(x, S, null, g));
      }).catch(async (S) => {
        var f, b;
        await ((f = x == null ? void 0 : x.onError) == null ? void 0 : f.call(x, S, g)), await ((b = x == null ? void 0 : x.onSettled) == null ? void 0 : b.call(x, void 0, S, g));
      });
    },
    [N]
  );
  return {
    data: a,
    error: i,
    isPending: o,
    isLoading: o,
    isSuccess: u,
    isError: m,
    reset: w,
    mutate: v,
    mutateAsync: N
  };
}
const Ua = () => ke(
  ({ conversationId: e, body: r, sender_id: a }) => Fa(e, { body: r, sender_id: a }).then(
    (n) => n.data.data
  )
), Ha = () => ke(
  ({ conversationId: e, file: r, sender_id: a, caption: n }) => Ia(e, { file: r, sender_id: a, caption: n }).then(
    (i) => i.data.data
  )
), Wa = (e) => Z({
  url: `${J("messenger", "v1")}/conversations`,
  method: "GET",
  params: e
}), $a = (e) => Z({
  url: `${J("messenger", "v1")}/conversations`,
  method: "POST",
  data: e
}), qa = (e) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}`,
  method: "GET"
}), Va = ({
  conversationId: e,
  read_until: r,
  user_id: a
}) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}/read`,
  method: "POST",
  data: { read_until: r, user_id: a }
}), Oa = ({
  conversationId: e,
  user_id: r,
  is_typing: a
}) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}/typing`,
  method: "POST",
  data: { user_id: r, is_typing: a }
}), Ga = (e) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}/close`,
  method: "POST"
}), Kt = () => {
  const e = W(async (r) => (await Va(r)).data.data, []);
  return ke(
    e
  );
}, Ka = () => ke(
  (e) => Oa(e).then(() => {
  })
), Xa = () => {
  const e = W(async (r) => {
    const a = await Ga(r);
    return typeof window < "u" && window.dispatchEvent(
      new CustomEvent("messenger:conversation-closed", {
        detail: { conversationId: r }
      })
    ), a.data.data;
  }, []);
  return ke(
    e
  );
};
function kt(e) {
  return e != null && typeof e == "object" && "attributes" in e;
}
function Q(e) {
  return e == null ? "" : String(e);
}
function Ya(e) {
  if (e == null || typeof e != "object") return;
  if (kt(e)) return e;
  const r = e;
  return {
    id: Q(r.id),
    type: "user",
    attributes: {
      user_auth_id: Number(r.user_auth_id),
      name: Q(r.name),
      avatar_url: Q(r.avatar_url),
      created_at: Q(r.created_at),
      updated_at: Q(r.updated_at)
    },
    relationships: []
  };
}
function Qa(e) {
  if (e == null || typeof e != "object") return;
  if (kt(e)) return e;
  const r = e;
  return {
    id: Q(r.id),
    type: "messageAttachment",
    attributes: {
      file_url: Q(r.file_url),
      file_name: Q(r.file_name),
      file_mime_type: Q(r.file_mime_type),
      file_size: Number(r.file_size),
      created_at: Q(r.created_at)
    },
    relationships: []
  };
}
function Ja(e) {
  return typeof e == "string" ? { id: 0, name: e, icon: "" } : e != null && typeof e == "object" ? e : null;
}
function Za(e) {
  if (e == null || typeof e != "object")
    return {
      id: "",
      type: "message",
      attributes: {},
      relationships: { sender: void 0, attachments: [] }
    };
  if (kt(e)) return e;
  const r = e, a = Array.isArray(r.attachments) ? r.attachments.map(Qa).filter((n) => n != null) : [];
  return {
    id: Q(r.id),
    type: "message",
    attributes: {
      conversation_id: Number(r.conversation_id),
      sender_id: Number(r.sender_id),
      body: Q(r.body),
      type: Ja(r.type),
      created_at: Q(r.created_at),
      updated_at: Q(r.updated_at)
    },
    relationships: {
      sender: Ya(r.sender),
      attachments: a
    }
  };
}
let Ee = null, Tt = null;
function Xt(e) {
  if (typeof window > "u")
    return null;
  const r = JSON.stringify(e);
  return Ee && Tt !== r && (Ee.disconnect(), Ee = null), Ee || (Ee = new zr(
    e.key,
    {
      wsHost: e.host,
      wsPort: e.port,
      wssPort: e.port,
      wsPath: e.wsPath,
      forceTLS: e.scheme === "https",
      enabledTransports: ["ws", "wss"],
      cluster: "mt1"
    }
  ), Tt = r), Ee;
}
function Yt(e, r, a, n) {
  if (typeof window > "u")
    return () => {
    };
  const i = Xt(e);
  if (!i) return () => {
  };
  const l = i.subscribe(`conversation.${r}`);
  if (l.bind("MessageSent", (o) => {
    a(Za(o));
  }), n) {
    const o = (c) => n(c);
    l.bind("UserTyping", o), l.bind("client-UserTyping", o);
  }
  return () => {
    l.unbind_all(), i.unsubscribe(`conversation.${r}`);
  };
}
function Qt(e, r, a, n) {
  if (typeof window > "u")
    return () => {
    };
  const i = Xt(e);
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
let At = 0;
const en = 1e3;
let De = null;
function tn() {
  if (typeof window > "u") return null;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    return e ? ((!De || De.state === "closed") && (De = new e()), De.state === "suspended" && De.resume(), De) : null;
  } catch {
    return null;
  }
}
function Re(e, r, a, n, i) {
  const l = e.createOscillator(), o = e.createGain();
  l.type = "sine", l.frequency.setValueAtTime(r, a), o.gain.setValueAtTime(1e-4, a), o.gain.exponentialRampToValueAtTime(i, a + 0.015), o.gain.exponentialRampToValueAtTime(1e-4, a + n), l.connect(o), o.connect(e.destination), l.start(a), l.stop(a + n + 0.05);
}
function Ct(e = "focused", r = {}) {
  if (typeof window > "u") return !1;
  const a = r.throttleMs ?? en, n = Date.now();
  if (!r.force && n - At < a)
    return !1;
  At = n;
  const i = tn();
  if (!i) return !1;
  const l = Math.max(0, Math.min(1, r.volume ?? 1));
  try {
    const o = i.currentTime;
    return e === "focused" ? (Re(i, 587.33, o, 0.08, 0.12 * l), Re(i, 880, o + 0.06, 0.14, 0.1 * l)) : (Re(i, 523.25, o, 0.1, 0.15 * l), Re(i, 659.25, o + 0.08, 0.1, 0.14 * l), Re(i, 783.99, o + 0.16, 0.22, 0.16 * l)), !0;
  } catch {
    return !1;
  }
}
const rn = (e, r) => {
  const { config: a, currentUser: n, currentUserId: i } = ae(), l = se(
    () => ({ conversation: e.id, page: { size: "20" } }),
    [e.id]
  ), {
    data: o,
    refetch: c,
    fetchNextPage: u,
    hasNextPage: h,
    isFetchingNextPage: m,
    isLoading: d,
    prependIncomingMessage: w
  } = Ba({
    params: l,
    enabled: !!e.id
  }), { mutateAsync: N, isLoading: v } = Ua(), { mutateAsync: g, isLoading: x } = Ha(), { mutateAsync: S } = Kt(), { mutate: f } = Ka(), { mutateAsync: b, isLoading: _ } = Xa(), [y, P] = C(""), [I, R] = C(null), F = !!e.attributes.closed_at, [z, E] = C([]), [T, j] = C(!0), [p, A] = C(0), [$, ee] = C("Hoy"), [at, Ce] = C(null), M = B(null), he = B(!1), ce = B(!1), ne = B(0), ie = B(0), ve = B(!1), Oe = B(h), fe = B(e.id), te = B(null), ue = B(null), G = B(null), Ge = B(!1), Ke = B(f), nt = Te(e, i);
  H(() => {
    Ke.current = f;
  }, [f]), H(() => {
    ve.current = m;
  }, [m]), H(() => {
    Oe.current = h;
  }, [h]);
  const st = W(() => {
    const k = M.current;
    k && (k.scrollTo({
      top: k.scrollHeight,
      behavior: "smooth"
    }), A(0), j(!0));
  }, []), ze = W(() => {
    const k = M.current;
    if (!k) return;
    const X = k.scrollHeight - k.scrollTop - k.clientHeight < 140;
    j(X), X && A(0);
    const O = k.querySelectorAll("[data-message-date]");
    if (O.length === 0) {
      ee("Hoy");
      return;
    }
    const Y = k.getBoundingClientRect(), K = Y.top, be = Y.bottom;
    let xe = null;
    for (let _e = 0; _e < O.length; _e++) {
      const Me = O[_e], Le = Me.getBoundingClientRect();
      if (Le.bottom > K && Le.top < be) {
        xe = Me.getAttribute("data-message-date");
        break;
      }
    }
    ee(xe || O[O.length - 1].getAttribute("data-message-date") || "Hoy");
  }, []);
  H(() => {
    fe.current !== e.id && (fe.current = e.id, he.current = !1, ce.current = !1, ne.current = 0, ie.current = 0, E([]), j(!0), A(0), ee("Hoy"));
  }, [e.id]), H(() => {
    if (he.current || d || o.length === 0) return;
    const k = M.current;
    k && (k.scrollTop = k.scrollHeight, he.current = !0, j(!0), ze());
  }, [e.id, d, o.length, ze]), It(() => {
    const k = M.current;
    if (k && ne.current > 0) {
      const X = k.scrollHeight - ne.current;
      X > 0 && (k.scrollTop = ie.current + X), ne.current = 0, ie.current = 0;
    }
  }, [o]), H(() => {
    if (z.length > 0) {
      const k = M.current;
      if (k) {
        ce.current = !0, k.scrollTo({
          top: k.scrollHeight,
          behavior: "smooth"
        });
        const q = setTimeout(() => {
          ce.current = !1;
        }, 500);
        return () => clearTimeout(q);
      }
    }
  }, [z.length]), H(() => {
    const k = M.current;
    if (!k) return;
    const q = () => {
      ze(), !(ce.current || !he.current) && k.scrollTop < 80 && Oe.current && !ve.current && !d && (ve.current = !0, ne.current = k.scrollHeight, ie.current = k.scrollTop, u().finally(() => {
        ve.current = !1;
      }));
    };
    return k.addEventListener("scroll", q, { passive: !0 }), () => {
      k.removeEventListener("scroll", q);
    };
  }, [u, d, ze]);
  const we = W(() => {
    !e.id || !i || (te.current && clearTimeout(te.current), te.current = setTimeout(() => {
      te.current = null, S({
        conversationId: e.id,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: i
      }).then(() => {
        typeof window < "u" && window.dispatchEvent(
          new CustomEvent("messenger:conversation-read", {
            detail: { conversationId: e.id }
          })
        );
      }).catch(console.error);
    }, 200));
  }, [e.id, i, S]);
  H(() => () => {
    te.current && clearTimeout(te.current), ue.current && clearTimeout(ue.current), G.current && clearTimeout(G.current);
  }, [e.id]);
  const Xe = W(
    (k) => {
      w(k);
      const q = M.current;
      q && (q.scrollHeight - q.scrollTop - q.clientHeight < 160 ? setTimeout(() => {
        q.scrollTo({
          top: q.scrollHeight,
          behavior: "smooth"
        });
      }, 50) : A((Y) => Y + 1)), i && String(k.attributes.sender_id) !== String(i) && Ct("focused"), we();
    },
    [i, w, we]
  ), Ye = W(
    (k) => {
      if (String(k.user_id) !== String(i)) {
        if (ue.current && (clearTimeout(ue.current), ue.current = null), !k.is_typing) {
          Ce(null);
          return;
        }
        Ce(k.user.name), ue.current = setTimeout(() => {
          ue.current = null, Ce(null);
        }, 2e3);
      }
    },
    [i]
  ), de = W(
    (k) => {
      !e.id || !i || Ge.current === k || (Ge.current = k, Ke.current({
        conversationId: e.id,
        user_id: Number(i),
        is_typing: k
      }));
    },
    [e.id, i]
  ), Ne = W(() => {
    G.current && clearTimeout(G.current), G.current = setTimeout(() => {
      G.current = null, de(!1);
    }, 2500);
  }, [de]), Qe = W(
    (k) => {
      if (!F) {
        if (P(k), !k.trim()) {
          G.current && (clearTimeout(G.current), G.current = null), de(!1);
          return;
        }
        de(!0), Ne();
      }
    },
    [F, Ne, de]
  );
  H(() => () => {
    G.current && (clearTimeout(G.current), G.current = null), de(!1);
  }, [e.id, de]);
  const Ae = () => {
    e.attributes.unread_count && we();
  };
  H(() => {
    Ae();
  }, [e, o, we]), H(() => {
    if (!e.id) return;
    const k = Yt(
      a.reverb,
      Number(e.id),
      Xe,
      Ye
    );
    return () => {
      k();
    };
  }, [a.reverb, e.id, Xe, Ye]);
  const Se = W(
    (k) => {
      F || R(k);
    },
    [F]
  ), it = async () => {
    if (F) return;
    const k = y.trim();
    if (!k && !I || !n) return;
    const q = I, X = Ta({
      conversationId: e.id,
      sender: n,
      body: k,
      file: q
    }), O = X.id;
    E((Y) => [...Y, X]), P(""), G.current && (clearTimeout(G.current), G.current = null), de(!1);
    try {
      const Y = q ? await g({
        conversationId: e.id,
        file: q,
        sender_id: Number(n.id),
        caption: k || void 0
      }) : await N({
        body: k,
        conversationId: e.id,
        sender_id: n.id
      });
      R(null), await c(), E((K) => K.filter((be) => be.id !== O)), we();
    } catch {
      E(
        (Y) => Y.map(
          (K) => K.id === O ? { ...K, local_status: "error" } : K
        )
      );
    }
  }, lt = W(async () => {
    var k, q, X;
    try {
      await b(e.id), re.success("Conversación cerrada exitosamente"), (k = r == null ? void 0 : r.onCloseSuccess) == null || k.call(r);
    } catch (O) {
      const Y = ((X = (q = O == null ? void 0 : O.response) == null ? void 0 : q.data) == null ? void 0 : X.message) || (O == null ? void 0 : O.message) || "Error al cerrar la conversación";
      re.error(Y);
    }
  }, [b, e.id, r]);
  return {
    messages: o,
    optimisticMessages: z,
    scrollRef: M,
    conversationName: nt,
    inputText: y,
    pendingFile: I,
    isClosed: F,
    isClosing: _,
    isSending: v,
    isUploading: x,
    isFetchingNextPage: m,
    hasNextPage: h,
    isLoading: d,
    isNearBottom: T,
    newMessagesCount: p,
    typingUser: at,
    visibleDate: $,
    currentUser: n,
    currentUserId: i,
    scrollToBottom: st,
    setInputText: Qe,
    setPendingFile: R,
    handleSendMessage: it,
    handleSelectFile: Se,
    handleCloseConversation: lt
  };
};
function an(e, r, a = "OR") {
  return a === "AND" ? r.every((n) => e.includes(n)) : r.some((n) => e.includes(n));
}
function le({
  permission: e,
  operator: r = "OR"
}) {
  const { permissions: a } = ae();
  return an(a, e, r);
}
function nn({
  conversation: e,
  isClosed: r = !!e.attributes.closed_at,
  isClosing: a = !1,
  onCloseConversation: n,
  showResolvedBadge: i = !1,
  className: l,
  ...o
}) {
  const [c, u] = C(!1), { currentUserId: h } = ae(), m = le({
    permission: ["messenger_chat_support.provide_support"]
  }), d = Te(e, h);
  return r && i ? /* @__PURE__ */ s(
    me,
    {
      variant: "outline",
      className: D(
        "h-8 px-2.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100/60 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-800 gap-1 select-none",
        l
      ),
      children: [
        /* @__PURE__ */ t(Je, { className: "size-3.5 text-emerald-500" }),
        /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Resuelta" })
      ]
    }
  ) : r && !i || !m ? null : /* @__PURE__ */ s(pe, { children: [
    /* @__PURE__ */ t(
      U,
      {
        variant: "success",
        size: "sm",
        disabled: a,
        onClick: () => u(!0),
        className: D(
          "h-8 gap-1 px-2 sm:px-3 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs",
          l
        ),
        ...o,
        children: a ? /* @__PURE__ */ s(pe, { children: [
          /* @__PURE__ */ t(je, { className: "size-3.5 animate-spin" }),
          /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Cerrando..." })
        ] }) : /* @__PURE__ */ s(pe, { children: [
          /* @__PURE__ */ t(Je, { className: "size-3.5" }),
          /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Cerrar chat" })
        ] })
      }
    ),
    /* @__PURE__ */ t(Wr, { open: c, onOpenChange: u, children: /* @__PURE__ */ s($r, { className: "sm:max-w-md p-5", children: [
      /* @__PURE__ */ s(qr, { className: "gap-2", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ t("div", { className: "flex size-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20", children: /* @__PURE__ */ t(ye, { className: "size-4" }) }),
          /* @__PURE__ */ t(Vr, { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "¿Cerrar conversación?" })
        ] }),
        /* @__PURE__ */ s(Or, { className: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: [
          "¿Estás seguro de que deseas marcar como resuelta y cerrar la conversación con",
          " ",
          /* @__PURE__ */ t("strong", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children: d }),
          "? Esta acción finalizará la atención en tiempo real."
        ] })
      ] }),
      /* @__PURE__ */ s(Gr, { className: "gap-2 sm:gap-0 mt-3", children: [
        /* @__PURE__ */ t(
          Kr,
          {
            disabled: a,
            className: "text-xs h-8 cursor-pointer",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ t(
          Xr,
          {
            disabled: a,
            onClick: () => {
              u(!1), n == null || n();
            },
            className: "text-xs h-8 bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer",
            children: "Sí, cerrar conversación"
          }
        )
      ] })
    ] }) })
  ] });
}
function sn({
  conversation: e,
  isClosed: r,
  isClosing: a = !1,
  onCloseConversation: n,
  isContextPanelOpen: i = !0,
  onToggleContextPanel: l,
  onBack: o,
  alwaysShowBackButton: c = !1
}) {
  var w, N;
  const { currentUserId: u } = ae(), h = qe(e), m = Te(e, u), d = Ve(e, u);
  return /* @__PURE__ */ s("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 p-2 sm:p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs min-w-0", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden", children: [
      o && /* @__PURE__ */ t(
        U,
        {
          variant: "ghost",
          size: "sm",
          onClick: o,
          title: "Volver a la lista de chats",
          "aria-label": "Volver a la lista de chats",
          className: D(
            "size-8 p-0 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
            c ? "flex" : "flex md:hidden"
          ),
          children: /* @__PURE__ */ t(ft, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ t(
        ge,
        {
          src: d == null ? void 0 : d.attributes.avatar_url,
          name: m,
          isGroup: h,
          size: "md",
          className: "shrink-0"
        }
      ),
      /* @__PURE__ */ s("div", { className: "min-w-0 flex-1 overflow-hidden", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 min-w-0", children: [
          /* @__PURE__ */ t(
            "h3",
            {
              className: "truncate text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 min-w-0",
              title: m,
              children: m
            }
          ),
          r && /* @__PURE__ */ s(
            me,
            {
              variant: "destructive",
              className: "inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium shrink-0 py-0 h-4.5 px-1.5",
              children: [
                /* @__PURE__ */ t(ye, { className: "size-2.5" }),
                /* @__PURE__ */ t("span", { children: "Cerrada" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 min-w-0", children: /* @__PURE__ */ t("span", { className: "truncate", children: h ? `${((N = (w = e.relationships) == null ? void 0 : w.users) == null ? void 0 : N.length) || 0} participantes` : "Conversación individual" }) })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-1 shrink-0", children: [
      /* @__PURE__ */ t(
        nn,
        {
          conversation: e,
          isClosed: r,
          isClosing: a,
          onCloseConversation: n,
          showResolvedBadge: !1
        }
      ),
      l && /* @__PURE__ */ t(
        U,
        {
          variant: "outline",
          size: "icon",
          onClick: l,
          className: D(
            "size-8 p-0",
            i ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" : ""
          ),
          children: /* @__PURE__ */ t(nr, { className: "size-4" })
        }
      )
    ] })
  ] });
}
function ln(e) {
  if (!e) return "";
  try {
    const r = new Date(e);
    return isNaN(r.getTime()) ? "" : r.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: !1 });
  } catch {
    return "";
  }
}
function Mt({
  message: e,
  isOwnMessage: r,
  isGroup: a,
  conversationName: n,
  conversationAvatarUrl: i
}) {
  var h, m, d, w, N, v, g;
  const l = Ue(((d = (m = (h = e.relationships) == null ? void 0 : h.sender) == null ? void 0 : m.attributes) == null ? void 0 : d.name) || n), o = ((v = (N = (w = e.relationships) == null ? void 0 : w.sender) == null ? void 0 : N.attributes) == null ? void 0 : v.avatar_url) || void 0, c = ln(e.attributes.created_at), u = ((g = e.relationships) == null ? void 0 : g.attachments) ?? [];
  return /* @__PURE__ */ s(
    "div",
    {
      className: D(
        "flex items-start gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0",
        r && "ml-auto flex-row-reverse"
      ),
      children: [
        a && !r ? /* @__PURE__ */ t(
          ge,
          {
            name: l,
            src: o,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ) : r ? null : /* @__PURE__ */ t(
          ge,
          {
            name: n,
            src: i,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ s("div", { className: D("flex min-w-0 flex-col gap-1", r && "items-end"), children: [
          /* @__PURE__ */ t("span", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate", children: r ? "Tú" : l }),
          /* @__PURE__ */ s(
            "div",
            {
              className: D(
                "rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words",
                r ? "rounded-tr-xs bg-blue-600 text-white shadow-xs" : "rounded-tl-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs"
              ),
              children: [
                u.map((x) => x.attributes.file_mime_type.startsWith("image/") ? /* @__PURE__ */ t(
                  "a",
                  {
                    href: x.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10",
                    children: /* @__PURE__ */ t(
                      "img",
                      {
                        src: x.attributes.file_url,
                        alt: x.attributes.file_name,
                        className: "max-h-64 max-w-full object-contain rounded-xl",
                        loading: "lazy"
                      }
                    )
                  },
                  x.id
                ) : /* @__PURE__ */ s(
                  "a",
                  {
                    href: x.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    download: x.attributes.file_name,
                    className: "mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                    children: [
                      /* @__PURE__ */ t(sr, { className: "size-4 shrink-0" }),
                      /* @__PURE__ */ t("span", { className: "min-w-0 flex-1 truncate font-medium", children: x.attributes.file_name }),
                      /* @__PURE__ */ t(ir, { className: "size-3.5 shrink-0" })
                    ]
                  },
                  x.id
                )),
                e.attributes.body && u.length === 0 && /* @__PURE__ */ t("p", { className: "whitespace-pre-wrap break-words", children: e.attributes.body }),
                e.attributes.body && u.length > 0 && e.attributes.body !== "Archivo adjunto" && /* @__PURE__ */ t("p", { className: "whitespace-pre-wrap break-words mt-1", children: e.attributes.body }),
                /* @__PURE__ */ s("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none", children: [
                  /* @__PURE__ */ t(
                    "time",
                    {
                      dateTime: e.attributes.created_at,
                      className: r ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400",
                      children: c
                    }
                  ),
                  r && e.local_status === "sending" && /* @__PURE__ */ t(
                    bt,
                    {
                      className: "size-3 text-blue-200 animate-spin",
                      "aria-label": "Pendiente de envío"
                    }
                  ),
                  r && e.local_status === "sent" && /* @__PURE__ */ t(lr, { className: "size-3 text-blue-200", "aria-label": "Enviado" }),
                  r && e.local_status === "error" && /* @__PURE__ */ t("span", { className: "text-red-200 font-medium", children: "No enviado" })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function on({
  conversation: e,
  messages: r,
  optimisticMessages: a = [],
  scrollRef: n,
  isFetchingNextPage: i = !1,
  hasNextPage: l = !1,
  isLoading: o = !1,
  isNearBottom: c = !0,
  newMessagesCount: u = 0,
  visibleDate: h = "Hoy",
  onScrollToBottom: m
}) {
  const { currentUserId: d } = ae(), w = qe(e), N = Te(e, d), v = Ve(e, d), g = new Set(
    r.flatMap((f) => f.messages.map((b) => b.id))
  ), x = a.filter(
    (f) => !g.has(f.id)
  ), S = h.toLowerCase() === "hoy" || h.toLowerCase() === "today" || ct(h) === "Hoy";
  return /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 relative w-full overflow-hidden", children: /* @__PURE__ */ t($e, { ref: n, className: "relative z-10 h-full w-full", children: /* @__PURE__ */ s("div", { className: "space-y-4 p-3 sm:p-4 text-sm w-full min-w-0", children: [
    i && /* @__PURE__ */ s("div", { className: "flex items-center justify-center py-2 gap-2 text-xs text-neutral-500 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ t(je, { className: "size-3.5 animate-spin text-blue-600" }),
      /* @__PURE__ */ t("span", { children: "Cargando mensajes anteriores..." })
    ] }),
    !l && r.length > 0 && /* @__PURE__ */ t("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400", children: "Inicio de la conversación" }) }),
    o && r.length === 0 && /* @__PURE__ */ s("div", { className: "space-y-4 py-2 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ s("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ t(L, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(L, { className: "h-3 w-20 rounded" }),
          /* @__PURE__ */ t(L, { className: "h-12 w-48 sm:w-64 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ t(L, { className: "h-14 w-52 sm:w-64 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) }),
      /* @__PURE__ */ s("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ t(L, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(L, { className: "h-3 w-16 rounded" }),
          /* @__PURE__ */ t(L, { className: "h-16 w-56 sm:w-72 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ t(L, { className: "h-10 w-36 sm:w-44 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ t("div", { className: "sticky top-1 z-20 flex justify-center pointer-events-none mb-2 transition-all duration-200", children: /* @__PURE__ */ t("div", { className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs", children: /* @__PURE__ */ t("span", { children: S ? "Hoy" : ct(h) }) }) }),
    [...r ?? []].reverse().map((f) => /* @__PURE__ */ s(
      "div",
      {
        "data-date-group": f.date,
        className: "space-y-4",
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: ct(f.date) }) }),
          [...f.messages].reverse().map((b) => {
            var y, P;
            const _ = String((P = (y = b == null ? void 0 : b.relationships) == null ? void 0 : y.sender) == null ? void 0 : P.id) === String(d);
            return /* @__PURE__ */ t(
              "div",
              {
                "data-message-date": f.date,
                className: "w-full",
                children: /* @__PURE__ */ t(
                  Mt,
                  {
                    message: _ ? { ...b, local_status: "sent" } : b,
                    isOwnMessage: _,
                    isGroup: w,
                    conversationName: N,
                    conversationAvatarUrl: (v == null ? void 0 : v.attributes.avatar_url) || void 0
                  }
                )
              },
              b.id
            );
          })
        ]
      },
      f.date
    )),
    x.length > 0 && /* @__PURE__ */ s("div", { "data-date-group": "Hoy", className: "space-y-4", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: "Hoy" }) }),
      [...x].map((f) => {
        var b;
        return /* @__PURE__ */ t(
          "div",
          {
            "data-message-date": ((b = f.attributes.created_at) == null ? void 0 : b.slice(0, 10)) || "Hoy",
            className: "w-full",
            children: /* @__PURE__ */ t(
              Mt,
              {
                message: f,
                isOwnMessage: !0,
                isGroup: w,
                conversationName: N,
                conversationAvatarUrl: (v == null ? void 0 : v.attributes.avatar_url) || void 0
              }
            )
          },
          f.id
        );
      })
    ] }),
    !c && m && /* @__PURE__ */ t("div", { className: "sticky bottom-2 z-30 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200", children: /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: m,
        className: "pointer-events-auto relative flex size-9 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95 cursor-pointer",
        "aria-label": "Desplazar a mensajes recientes",
        title: "Desplazar a mensajes recientes",
        children: [
          /* @__PURE__ */ t(or, { className: "size-4" }),
          u > 0 && /* @__PURE__ */ t(
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
function dn({
  inputText: e,
  setInputText: r,
  onSendMessage: a,
  onSelectFile: n,
  pendingFile: i,
  onRemoveFile: l,
  isSending: o,
  isUploading: c,
  conversationName: u,
  isClosed: h = !1,
  readOnly: m = !1,
  readOnlyMessage: d
}) {
  const w = B(null), N = 120, v = se(
    () => i && i.type.startsWith("image/") ? URL.createObjectURL(i) : void 0,
    [i]
  );
  if (H(() => () => {
    v && URL.revokeObjectURL(v);
  }, [v]), It(() => {
    const f = w.current;
    if (!f) return;
    f.style.height = "auto";
    const b = Math.min(f.scrollHeight, N);
    f.style.height = `${b}px`, f.style.overflowY = f.scrollHeight > N ? "auto" : "hidden";
  }, [e]), h || m)
    return /* @__PURE__ */ t("div", { className: "shrink-0 px-3 pb-3 pt-1 text-center sm:px-4 sm:pb-4", children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-white/85 dark:border-neutral-800/80 dark:bg-neutral-900/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 shadow-xs dark:text-neutral-400", children: [
      /* @__PURE__ */ t(ye, { className: "size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" }),
      /* @__PURE__ */ t("span", { children: d || (h ? "Esta conversación ha sido finalizada y no admite nuevos mensajes." : "No se permite enviar mensajes en esta conversación.") })
    ] }) });
  const g = (f) => {
    f.key === "Enter" && !f.shiftKey && (f.preventDefault(), a());
  }, x = (f) => {
    var _;
    const b = (_ = f.target.files) == null ? void 0 : _[0];
    b && n(b), f.target.value = "";
  }, S = (f) => {
    var _;
    if (o || c) return;
    const b = (_ = f.clipboardData) == null ? void 0 : _.items;
    if (b)
      for (let y = 0; y < b.length; y++) {
        const P = b[y];
        if (P.kind === "file" && P.type.startsWith("image/")) {
          const I = P.getAsFile();
          if (I) {
            f.preventDefault(), n(I);
            return;
          }
        }
      }
  };
  return /* @__PURE__ */ t("div", { className: "shrink-0 px-3 pb-3 pt-1 sm:px-4 sm:pb-4", children: /* @__PURE__ */ s("div", { className: "relative", children: [
    i && /* @__PURE__ */ s("div", { className: "mb-2 flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xs dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      i.type.startsWith("image/") ? /* @__PURE__ */ t(
        "img",
        {
          src: v || "",
          alt: "Archivo seleccionado",
          className: "size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
        }
      ) : /* @__PURE__ */ t("div", { className: "flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ t(Et, { className: "size-5" }) }),
      /* @__PURE__ */ t("span", { className: "min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-300 font-medium", children: i.name || "Archivo listo para enviar" }),
      /* @__PURE__ */ t(
        U,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: l,
          className: "size-7 shrink-0 p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          "aria-label": "Quitar archivo",
          children: /* @__PURE__ */ t(oe, { className: "size-3.5" })
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
            /* @__PURE__ */ t(Et, { className: "size-4" }),
            /* @__PURE__ */ t(
              "input",
              {
                type: "file",
                className: "sr-only",
                onChange: x,
                disabled: o || c
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ t(
        yt,
        {
          ref: w,
          value: e,
          onChange: (f) => r(f.target.value),
          onKeyDown: g,
          onPaste: S,
          placeholder: `Responder a ${u}...`,
          rows: 1,
          className: "!min-h-0 !border-transparent max-h-30 flex-1 resize-none overflow-y-hidden rounded-xl bg-transparent px-2 py-1 text-xs leading-5 shadow-none !outline-none focus:!border-transparent focus:!outline-none focus-visible:!border-transparent focus-visible:!ring-0 focus-visible:!outline-none sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400"
        }
      ),
      /* @__PURE__ */ t(
        U,
        {
          size: "icon",
          variant: "primary",
          onClick: a,
          disabled: !e.trim() && !i || o || c,
          className: "size-8 shrink-0 rounded-full p-0",
          "aria-label": "Enviar mensaje",
          title: "Enviar mensaje",
          children: /* @__PURE__ */ t(Rt, { className: "size-4" })
        }
      )
    ] })
  ] }) });
}
function cn({ className: e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "aria-hidden": "true",
      className: D(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        e
      ),
      children: /* @__PURE__ */ s(
        "svg",
        {
          className: "absolute inset-0 h-full w-full opacity-[0.055] dark:opacity-[0.04] text-slate-800 dark:text-slate-100",
          xmlns: "http://www.w3.org/2000/svg",
          width: "100%",
          height: "100%",
          children: [
            /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t(
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
                        /* @__PURE__ */ t("rect", { x: "0", y: "0", width: "44", height: "20", rx: "5", strokeWidth: "1.2" }),
                        /* @__PURE__ */ t(
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
                      /* @__PURE__ */ t("g", { transform: "translate(120, 26)", children: /* @__PURE__ */ t("path", { d: "M0 0l22 11-22 11 5-10 11-1-11-1z" }) }),
                      /* @__PURE__ */ s("g", { transform: "translate(210, 24)", children: [
                        /* @__PURE__ */ t("path", { d: "M10 0s-7 2-10 3v8c0 6 7 11 10 13 3-2 10-7 10-13V3c-3-1-10-3-10-3z" }),
                        /* @__PURE__ */ t("path", { d: "M6 11l3 3 6-6", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(294, 28)", children: [
                        /* @__PURE__ */ t("rect", { x: "0", y: "0", width: "28", height: "19", rx: "4" }),
                        /* @__PURE__ */ t("path", { d: "M6 9l3 3-3 3M14 15h6" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(30, 96)", children: [
                        /* @__PURE__ */ t("path", { d: "M0 0h24a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-12l-6 5v-5h-2a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" }),
                        /* @__PURE__ */ t("path", { d: "M6 6h12M6 10h8" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(126, 96)", children: [
                        /* @__PURE__ */ t("circle", { cx: "11", cy: "11", r: "10" }),
                        /* @__PURE__ */ t("circle", { cx: "11", cy: "11", r: "4.5" }),
                        /* @__PURE__ */ t("path", { d: "M4 4l3.5 3.5M14.5 14.5l3.5 3.5M18 4l-3.5 3.5M7.5 14.5L4 18" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(214, 96)", children: [
                        /* @__PURE__ */ t("circle", { cx: "12", cy: "12", r: "12", strokeWidth: "1.2", strokeDasharray: "2 2" }),
                        /* @__PURE__ */ t(
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
                        /* @__PURE__ */ t("ellipse", { cx: "10", cy: "4", rx: "9", ry: "3" }),
                        /* @__PURE__ */ t("path", { d: "M1 4v5c0 1.66 4.03 3 9 3s9-1.34 9-3V4" }),
                        /* @__PURE__ */ t("path", { d: "M1 9v5c0 1.66 4.03 3 9 3s9-1.34 9-3V9" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(32, 172)", children: [
                        /* @__PURE__ */ t("path", { d: "M0 6l4 4 9-9" }),
                        /* @__PURE__ */ t("path", { d: "M7 6l4 4 9-9" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(124, 168)", children: [
                        /* @__PURE__ */ t("rect", { x: "0", y: "7", width: "18", height: "13", rx: "3" }),
                        /* @__PURE__ */ t("path", { d: "M4 7V4a5 5 0 0 1 10 0v3" }),
                        /* @__PURE__ */ t("circle", { cx: "9", cy: "13.5", r: "1.5", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ t("g", { transform: "translate(210, 174)", children: /* @__PURE__ */ t("path", { d: "M0 6h6l3-6 5 12 4-8 3 4h7" }) }),
                      /* @__PURE__ */ s("g", { transform: "translate(298, 168)", children: [
                        /* @__PURE__ */ t("path", { d: "M0 0h13l6 6v13a3 3 0 0 1-3 3H0a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ t("path", { d: "M13 0v6h6" }),
                        /* @__PURE__ */ t("path", { d: "M4 12l2.5 2.5 5-5", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(28, 244)", children: [
                        /* @__PURE__ */ t("circle", { cx: "4", cy: "4", r: "3" }),
                        /* @__PURE__ */ t("circle", { cx: "20", cy: "4", r: "3" }),
                        /* @__PURE__ */ t("circle", { cx: "12", cy: "18", r: "3" }),
                        /* @__PURE__ */ t("path", { d: "M6.5 5.5l3.5 10M17.5 5.5l-3.5 10M7 4h10" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(114, 246)", children: [
                        /* @__PURE__ */ t("rect", { x: "0", y: "0", width: "38", height: "18", rx: "4", strokeWidth: "1" }),
                        /* @__PURE__ */ t(
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
                      /* @__PURE__ */ t("g", { transform: "translate(218, 244)", children: /* @__PURE__ */ t("path", { d: "M7 0L0 11h7l-2 9 10-12h-7l2-8z" }) }),
                      /* @__PURE__ */ s("g", { transform: "translate(300, 246)", children: [
                        /* @__PURE__ */ t("circle", { cx: "10", cy: "10", r: "9" }),
                        /* @__PURE__ */ t("path", { d: "M10 5v5l3.5 2" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(30, 316)", children: [
                        /* @__PURE__ */ t("path", { d: "M0 0h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6l-5 4v-4h-2a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ t("circle", { cx: "5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "9.5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "14", cy: "7", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ s("g", { transform: "translate(128, 320)", children: [
                        /* @__PURE__ */ t("circle", { cx: "2", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "10", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "18", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "2", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "10", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "18", cy: "10", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ t("g", { transform: "translate(216, 318)", children: /* @__PURE__ */ t("path", { d: "M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5z" }) }),
                      /* @__PURE__ */ s("g", { transform: "translate(292, 318)", children: [
                        /* @__PURE__ */ t("rect", { x: "0", y: "0", width: "36", height: "16", rx: "3", strokeWidth: "1" }),
                        /* @__PURE__ */ t(
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
            /* @__PURE__ */ t("rect", { width: "100%", height: "100%", fill: "url(#sdi-enterprise-chat-pattern)" })
          ]
        }
      )
    }
  );
}
function un({
  conversation: e,
  onToggleContextPanel: r,
  isContextPanelOpen: a = !0,
  onBack: n,
  alwaysShowBackButton: i = !1,
  onCloseSuccess: l,
  showHeader: o = !0,
  showWallpaper: c = !0,
  readOnly: u = !1,
  readOnlyMessage: h,
  showComposer: m = !0
}) {
  const d = rn(e, {
    onCloseSuccess: () => {
      l == null || l(), n == null || n();
    }
  }), [w, N] = C(!1), v = B(0), g = u || d.isClosed || d.isSending || d.isUploading;
  return /* @__PURE__ */ s(
    "div",
    {
      className: "sdi-messenger-root relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
      onDragEnter: (y) => {
        if (y.preventDefault(), y.stopPropagation(), g) return;
        y.dataTransfer.types && Array.from(y.dataTransfer.types).includes("Files") && (v.current += 1, N(!0));
      },
      onDragOver: (y) => {
        y.preventDefault(), y.stopPropagation(), !g && (y.dataTransfer.dropEffect = "copy");
      },
      onDragLeave: (y) => {
        y.preventDefault(), y.stopPropagation(), v.current -= 1, v.current <= 0 && (v.current = 0, N(!1));
      },
      onDrop: (y) => {
        if (y.preventDefault(), y.stopPropagation(), v.current = 0, N(!1), g) return;
        const P = y.dataTransfer.files;
        if (P && P.length > 0) {
          const I = P[0];
          I.type.startsWith("image/") && d.handleSelectFile(I);
        }
      },
      onPaste: (y) => {
        var I;
        if (g) return;
        const P = (I = y.clipboardData) == null ? void 0 : I.items;
        if (P)
          for (let R = 0; R < P.length; R++) {
            const F = P[R];
            if (F.kind === "file" && F.type.startsWith("image/")) {
              const z = F.getAsFile();
              if (z) {
                y.preventDefault(), d.handleSelectFile(z);
                return;
              }
            }
          }
      },
      children: [
        o && /* @__PURE__ */ t(
          sn,
          {
            conversation: e,
            isClosed: d.isClosed,
            isClosing: d.isClosing,
            onCloseConversation: d.handleCloseConversation,
            isContextPanelOpen: a,
            onToggleContextPanel: r,
            onBack: n,
            alwaysShowBackButton: i
          }
        ),
        /* @__PURE__ */ s("div", { className: "relative flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[#f4f6f8]/70 dark:bg-[#0a0f1d]", children: [
          c && /* @__PURE__ */ t(cn, {}),
          w && /* @__PURE__ */ t("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xs border-2 border-dashed border-blue-500/70 dark:border-blue-400/70 rounded-2xl m-2 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95", children: /* @__PURE__ */ s("div", { className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-xl border border-blue-500/20 text-center max-w-xs mx-4", children: [
            /* @__PURE__ */ t("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-inner", children: /* @__PURE__ */ t(dr, { className: "size-7 animate-bounce" }) }),
            /* @__PURE__ */ s("div", { children: [
              /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-neutral-800 dark:text-neutral-100", children: "Suelta tu imagen aquí" }),
              /* @__PURE__ */ t("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Se adjuntará para que puedas enviarla" })
            ] })
          ] }) }),
          /* @__PURE__ */ t(
            on,
            {
              conversation: e,
              messages: d.messages,
              optimisticMessages: d.optimisticMessages,
              scrollRef: d.scrollRef,
              isFetchingNextPage: d.isFetchingNextPage,
              hasNextPage: d.hasNextPage,
              isLoading: d.isLoading,
              isNearBottom: d.isNearBottom,
              newMessagesCount: d.newMessagesCount,
              visibleDate: d.visibleDate,
              onScrollToBottom: d.scrollToBottom
            }
          ),
          d.typingUser && !u && /* @__PURE__ */ s("div", { className: "relative z-10 flex shrink-0 items-center gap-1.5 px-4 py-1 text-xs text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-150", children: [
            /* @__PURE__ */ s("span", { className: "font-medium", children: [
              d.typingUser,
              " está escribiendo"
            ] }),
            /* @__PURE__ */ s("span", { className: "inline-flex gap-0.5", "aria-hidden": "true", children: [
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse" }),
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-75" }),
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-150" })
            ] })
          ] }),
          m && /* @__PURE__ */ t("div", { className: "relative z-10 w-full", children: /* @__PURE__ */ t(
            dn,
            {
              inputText: d.inputText,
              setInputText: d.setInputText,
              onSendMessage: d.handleSendMessage,
              onSelectFile: d.handleSelectFile,
              pendingFile: d.pendingFile,
              onRemoveFile: () => d.setPendingFile(null),
              isSending: d.isSending,
              isUploading: d.isUploading,
              conversationName: d.conversationName,
              isClosed: d.isClosed,
              readOnly: u,
              readOnlyMessage: h
            }
          ) })
        ] })
      ]
    }
  );
}
function mn({
  message: e = "Tu solicitud de soporte ha sido registrada exitosamente. En este momento no hay técnicos disponibles en línea; un técnico atenderá tu requerimiento a la brevedad.",
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
        /* @__PURE__ */ t(xt, { className: "size-4 text-emerald-600 dark:text-emerald-400" }),
        /* @__PURE__ */ t("span", { className: "text-xs font-bold text-neutral-800 dark:text-neutral-200", children: "Solicitud Registrada" })
      ] }),
      i && /* @__PURE__ */ t(
        U,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: i,
          className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          children: /* @__PURE__ */ t(oe, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4", children: [
      /* @__PURE__ */ s("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ t("div", { className: "size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(bt, { className: "size-7" }) }),
        /* @__PURE__ */ t("div", { className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ t(Je, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "Ticket de Soporte Creado" }),
        /* @__PURE__ */ t("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed", children: e })
      ] }),
      r && /* @__PURE__ */ s("div", { className: "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200", children: [
            /* @__PURE__ */ t(cr, { className: "size-3.5 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ s("span", { children: [
              "Ticket #",
              o
            ] })
          ] }),
          /* @__PURE__ */ t(me, { variant: "outline", className: "text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", children: r.status === "created" ? "Registrado" : r.status })
        ] }),
        r.subject && /* @__PURE__ */ s("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[10.5px] font-medium text-neutral-400", children: "Asunto:" }),
          /* @__PURE__ */ t("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2", children: r.subject })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between text-[11px] text-neutral-500 pt-1", children: [
          /* @__PURE__ */ s("span", { children: [
            "Canal: ",
            /* @__PURE__ */ t("strong", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: r.request_source || "Chat" })
          ] }),
          /* @__PURE__ */ s("span", { className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-medium", children: [
            /* @__PURE__ */ t("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            "En cola de atención"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-2.5 text-[11px] text-blue-900/80 dark:text-blue-300/80 text-left w-full", children: /* @__PURE__ */ t("p", { children: "Te notificaremos en cuanto un técnico tome tu ticket. Puedes consultar el estado en cualquier momento." }) })
    ] }),
    /* @__PURE__ */ s("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900 flex items-center gap-2", children: [
      /* @__PURE__ */ s(
        U,
        {
          type: "button",
          variant: "secondary",
          size: "sm",
          onClick: a,
          className: "flex-1 gap-1.5 text-xs font-medium cursor-pointer",
          children: [
            /* @__PURE__ */ t(ur, { className: "size-3.5" }),
            /* @__PURE__ */ t("span", { children: "Nueva Consulta" })
          ]
        }
      ),
      l && n && /* @__PURE__ */ s(
        U,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: n,
          className: "flex-1 gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
          children: [
            /* @__PURE__ */ t(pt, { className: "size-3.5" }),
            /* @__PURE__ */ t("span", { children: "Ver mis chats" })
          ]
        }
      )
    ] })
  ] });
}
function Jt(e, r = 300) {
  const [a, n] = C(e);
  return H(() => {
    const i = setTimeout(() => {
      n(e);
    }, r);
    return () => {
      clearTimeout(i);
    };
  }, [e, r]), a;
}
function zt(e) {
  var T;
  const {
    queryKey: r,
    queryFn: a,
    enabled: n = !0,
    initialData: i,
    placeholderData: l,
    keepPreviousData: o = !1,
    onSuccess: c,
    onError: u
  } = e, [h, m] = C(() => i !== void 0 ? i : typeof l == "function" ? l(void 0) : l), [d, w] = C(null), [N, v] = C(() => n && h === void 0), [g, x] = C(() => h !== void 0), [S, f] = C(!1), b = B(a);
  b.current = a;
  const _ = B(c);
  _.current = c;
  const y = B(u);
  y.current = u;
  const P = B(0), I = B(!0), R = JSON.stringify(r), F = W(async () => {
    var p, A;
    const j = ++P.current;
    v(!0), f(!1), w(null);
    try {
      const $ = await b.current();
      return j === P.current && (m($), x(!0), f(!1), w(null), v(!1), (p = _.current) == null || p.call(_, $)), $;
    } catch ($) {
      if (j === P.current) {
        const ee = $;
        w(ee), f(!0), x(!1), v(!1), (A = y.current) == null || A.call(y, ee);
      }
      return;
    }
  }, []);
  H(() => {
    if (!n) {
      v(!1);
      return;
    }
    I.current || (l !== void 0 ? m(
      typeof l == "function" ? (j) => l(j) : l
    ) : o || m(void 0)), I.current = !1, F();
  }, [n, R, o]);
  const z = ((T = d == null ? void 0 : d.response) == null ? void 0 : T.data) ?? (d == null ? void 0 : d.data) ?? {}, E = n && N && h === void 0;
  return {
    data: h,
    error: d,
    errors: z,
    isLoading: E,
    isPending: E,
    isFetching: N,
    isSuccess: g,
    isError: S,
    refetch: F,
    setData: m
  };
}
const hn = (e) => {
  var n, i, l, o, c;
  const r = (e == null ? void 0 : e.params) ?? {}, a = zt({
    queryKey: ["list-chat-users", r],
    queryFn: () => Er(r),
    enabled: (e == null ? void 0 : e.enable) !== !1,
    keepPreviousData: !0
  });
  return {
    data: ((n = a.data) == null ? void 0 : n.data.data) ?? [],
    meta: (l = (i = a.data) == null ? void 0 : i.data) == null ? void 0 : l.meta,
    links: (c = (o = a.data) == null ? void 0 : o.data) == null ? void 0 : c.links,
    isLoading: a.isLoading,
    isFetching: a.isFetching,
    errors: a.errors,
    refetch: a.refetch
  };
}, fn = () => {
  const e = W(async (r) => {
    const a = await $a(r);
    return typeof window < "u" && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversation: a.data.data }
      })
    ), a.data.data;
  }, []);
  return ke(
    e
  );
};
function bn({
  open: e,
  onOpenChange: r,
  onSuccess: a
}) {
  const { currentUserId: n } = ae(), [i, l] = C("direct"), [o, c] = C(""), u = Jt(o, 300), [h, m] = C(null), [d, w] = C([]), [N, v] = C(""), { data: g, isLoading: x } = hn({
    enable: e,
    params: {
      sort: "name",
      paginate: "false",
      ...u.trim() ? { filter: { name: u.trim() } } : {}
    }
  }), { mutateAsync: S, isLoading: f } = fn(), b = se(() => (g || []).filter((z) => String(z.id) !== String(n)), [g, n]), _ = (z) => {
    w((E) => E.some((j) => j.id === z.id) ? E.filter((j) => j.id !== z.id) : [...E, z]);
  }, y = (z) => {
    w((E) => E.filter((T) => T.id !== z));
  }, P = () => {
    m(null), w([]), v(""), c(""), l("direct");
  }, I = (z) => {
    z || P(), r(z);
  }, R = async (z) => {
    var E, T, j, p;
    if (z.preventDefault(), i === "direct") {
      if (!h) {
        re.warning("Por favor, selecciona un usuario para iniciar la conversación.");
        return;
      }
      try {
        const A = await S({
          type: "direct",
          user_id: Number(h),
          sender_id: Number(n)
        });
        re.success("Conversación iniciada correctamente"), I(!1), a && A && a(A);
      } catch (A) {
        const $ = ((T = (E = A == null ? void 0 : A.response) == null ? void 0 : E.data) == null ? void 0 : T.message) || (A == null ? void 0 : A.message) || "Error al iniciar la conversación";
        re.error($);
      }
    } else {
      if (!N.trim()) {
        re.warning("Por favor, ingresa el nombre del grupo.");
        return;
      }
      if (d.length === 0) {
        re.warning("Por favor, selecciona al menos un participante para el grupo.");
        return;
      }
      try {
        const A = await S({
          type: "group",
          name: N.trim(),
          user_ids: d.map(($) => Number($.id)),
          sender_id: Number(n)
        });
        re.success("Grupo creado correctamente"), I(!1), a && A && a(A);
      } catch (A) {
        const $ = ((p = (j = A == null ? void 0 : A.response) == null ? void 0 : j.data) == null ? void 0 : p.message) || (A == null ? void 0 : A.message) || "Error al crear el grupo";
        re.error($);
      }
    }
  }, F = f || i === "direct" && !h || i === "group" && (!N.trim() || d.length === 0);
  return /* @__PURE__ */ t(Fr, { open: e, onOpenChange: I, children: /* @__PURE__ */ t(Ir, { className: "sm:max-w-[480px]", children: /* @__PURE__ */ s("form", { onSubmit: R, className: "flex flex-col", children: [
    /* @__PURE__ */ s(Rr, { children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ t("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ t(Be, { className: "size-5" }) }),
        /* @__PURE__ */ s("div", { className: "text-left pr-6", children: [
          /* @__PURE__ */ t(Br, { children: "Nueva Conversación" }),
          /* @__PURE__ */ t(Ur, { children: "Inicia un chat directo o crea un grupo de conversación" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-3.5", children: /* @__PURE__ */ t(
        Ot,
        {
          value: i,
          onValueChange: (z) => l(z),
          className: "w-full",
          children: /* @__PURE__ */ s(Gt, { className: "w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ s(
              tt,
              {
                value: "direct",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ t(Ze, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { children: "Directo (1 a 1)" })
                ]
              }
            ),
            /* @__PURE__ */ s(
              tt,
              {
                value: "group",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ t(ht, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { children: "Grupo" })
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
          /* @__PURE__ */ t("span", { children: "Nombre del Grupo" }),
          /* @__PURE__ */ t("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ t(
          Nt,
          {
            placeholder: "Ej. Soporte Técnico L2, Equipo Infraestructura...",
            value: N,
            onChange: (z) => v(z.target.value),
            className: "h-9 text-xs",
            required: !0
          }
        )
      ] }),
      i === "group" && d.length > 0 && /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400", children: [
          /* @__PURE__ */ s("span", { children: [
            "Participantes seleccionados (",
            d.length,
            ")"
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => w([]),
              className: "text-[10px] text-red-500 hover:underline cursor-pointer",
              children: "Quitar todos"
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800", children: d.map((z) => {
          const E = Ue(z.attributes.name);
          return /* @__PURE__ */ s(
            me,
            {
              variant: "secondary",
              className: "gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
              children: [
                /* @__PURE__ */ t(
                  ge,
                  {
                    name: E,
                    src: z.attributes.avatar_url,
                    size: "xs"
                  }
                ),
                /* @__PURE__ */ t("span", { className: "max-w-28 truncate font-medium capitalize", children: E }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: () => y(z.id),
                    className: "rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
                    children: /* @__PURE__ */ t(oe, { className: "size-3" })
                  }
                )
              ]
            },
            z.id
          );
        }) })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between", children: [
          /* @__PURE__ */ t("span", { children: i === "direct" ? "Selecciona un usuario" : "Añadir participantes" }),
          /* @__PURE__ */ s("span", { className: "text-[10px] font-normal text-neutral-400", children: [
            b.length,
            " disponibles"
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
          /* @__PURE__ */ t(Bt, { className: "size-3.5 shrink-0 text-neutral-400" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              placeholder: "Buscar por nombre...",
              value: o,
              onChange: (z) => c(z.target.value),
              className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
            }
          ),
          o && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => c(""),
              className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer",
              children: /* @__PURE__ */ t(oe, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden", children: /* @__PURE__ */ t($e, { className: "h-56 sm:h-64 w-full", children: x ? /* @__PURE__ */ s("div", { className: "flex h-56 items-center justify-center gap-2 text-xs text-neutral-500", children: [
        /* @__PURE__ */ t(je, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ t("span", { children: "Cargando usuarios..." })
      ] }) : b.length === 0 ? /* @__PURE__ */ s("div", { className: "flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500", children: [
        /* @__PURE__ */ t("p", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: "No se encontraron usuarios" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] mt-1", children: "Prueba con otro término de búsqueda" })
      ] }) : /* @__PURE__ */ t("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5", children: b.map((z) => {
        const E = h === z.id, T = d.some((A) => A.id === z.id), j = i === "direct" ? E : T, p = Ue(z.attributes.name);
        return /* @__PURE__ */ s(
          "div",
          {
            onClick: () => {
              i === "direct" ? m(z.id) : _(z);
            },
            className: D(
              "flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors",
              j ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium" : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200"
            ),
            children: [
              /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
                /* @__PURE__ */ t(
                  ge,
                  {
                    name: p,
                    src: z.attributes.avatar_url,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t("p", { className: "truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize", children: p }) })
              ] }),
              /* @__PURE__ */ t("div", { className: "shrink-0 pl-1", children: /* @__PURE__ */ t(
                "div",
                {
                  className: D(
                    "flex size-5 items-center justify-center rounded-full border transition-all",
                    j ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent"
                  ),
                  children: /* @__PURE__ */ t(mr, { className: "size-3 stroke-[2.5]" })
                }
              ) })
            ]
          },
          z.id
        );
      }) }) }) })
    ] }),
    /* @__PURE__ */ s(Hr, { children: [
      /* @__PURE__ */ t(
        U,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => I(!1),
          disabled: f,
          className: "text-xs h-8 px-3.5 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ t(
        U,
        {
          type: "submit",
          size: "sm",
          variant: "primary",
          disabled: F,
          className: "text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer",
          children: f ? /* @__PURE__ */ s(pe, { children: [
            /* @__PURE__ */ t(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ t("span", { children: "Creando..." })
          ] }) : /* @__PURE__ */ s(pe, { children: [
            /* @__PURE__ */ t(Be, { className: "size-3.5" }),
            /* @__PURE__ */ t("span", { children: i === "direct" ? "Iniciar Chat" : "Crear Grupo" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const xn = (e) => {
  var n, i, l, o;
  const r = (e == null ? void 0 : e.params) ?? {}, a = zt({
    queryKey: ["list-conversations", r],
    queryFn: () => Wa(r),
    enabled: (e == null ? void 0 : e.enable) !== !1,
    keepPreviousData: !0
  });
  return {
    data: ((n = a.data) == null ? void 0 : n.data.data) ?? [],
    meta: (l = (i = a.data) == null ? void 0 : i.data) == null ? void 0 : l.meta,
    links: (o = a.data) == null ? void 0 : o.data.links,
    isLoading: a.isLoading,
    isFetching: a.isFetching,
    errors: a.errors,
    refetch: a.refetch
  };
}, pn = ({
  showToastOnUnread: e = !0,
  isActive: r = !0
} = {}) => {
  const { config: a, currentUser: n, currentUserId: i } = ae(), { mutateAsync: l } = Kt(), o = le({
    permission: ["messenger_chat.read"]
  }), [c, u] = C("0"), [h, m] = C("all"), [d, w] = C(""), N = Jt(d, 300), v = se(() => {
    const M = {
      closed: c
    };
    return h !== "all" && (M.type = h), N.trim() && (M.name = N.trim()), {
      user_id: i,
      paginate: "false",
      ...Object.keys(M).length > 0 ? { filter: M } : {}
    };
  }, [c, h, N, i]), {
    data: g,
    isLoading: x,
    isFetching: S,
    errors: f,
    refetch: b
  } = xn({
    params: v,
    enable: !!i && o
  }), [_, y] = C(""), [P, I] = C(!1), [R, F] = C(!1), [z, E] = C(!1), T = se(() => !r || !_ ? g : g.map((M) => M.id === _ && M.attributes.unread_count > 0 ? {
    ...M,
    attributes: {
      ...M.attributes,
      unread_count: 0
    }
  } : M), [r, g, _]), j = W(
    (M) => {
      const he = i && String(M.message.sender_id) !== String(i), ce = r && String(M.conversation_id) === _;
      he && Ct(ce ? "focused" : "unfocused"), e && !ce && re.info("Nuevo mensaje", {
        id: `conversation-message-${M.message.id}`,
        description: M.message.body || "Tienes un mensaje nuevo",
        action: {
          label: "Abrir",
          onClick: () => {
            y(String(M.conversation_id)), F(!0);
          }
        }
      }), b();
    },
    [i, r, b, _, e]
  ), p = W(() => {
    b();
  }, [b]);
  H(() => {
    if (typeof window > "u") return;
    const M = () => {
      b();
    };
    return window.addEventListener("messenger:conversation-read", M), window.addEventListener("messenger:conversation-closed", M), window.addEventListener("messenger:conversation-created", M), window.addEventListener("messenger:conversation-updated", M), () => {
      window.removeEventListener("messenger:conversation-read", M), window.removeEventListener("messenger:conversation-closed", M), window.removeEventListener("messenger:conversation-created", M), window.removeEventListener("messenger:conversation-updated", M);
    };
  }, [b]), H(() => {
    if (i)
      return Qt(
        a.reverb,
        i,
        j,
        p
      );
  }, [a.reverb, p, j, i]);
  const A = se(
    () => T.find((M) => M.id === _),
    [T, _]
  ), $ = W(
    (M) => {
      y(M), F(!0), M && i && l({
        conversationId: M,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: i
      }).then(() => {
        b();
      }).catch(console.error);
    },
    [i, l, b]
  );
  return {
    conversations: T,
    selectedId: _,
    setSelectedId: y,
    selectedConversation: A,
    closedFilter: c,
    setClosedFilter: u,
    typeFilter: h,
    setTypeFilter: m,
    searchQuery: d,
    setSearchQuery: w,
    isContextPanelOpen: P,
    isMobileChatOpen: R,
    isNewConversationOpen: z,
    isLoading: x,
    isFetching: S,
    errors: f,
    hasReadPermission: o,
    currentUser: n,
    currentUserId: i,
    selectConversation: $,
    unselectConversation: () => {
      y(""), F(!1);
    },
    setIsContextPanelOpen: I,
    setIsNewConversationOpen: E,
    goBackToConversationList: () => F(!1),
    handleConversationCreated: (M) => {
      y(M.id), F(!0), E(!1), b();
    }
  };
}, gn = (e) => Z({
  url: `${J("helpdesk", "v1")}/requests/chat-support`,
  method: "POST",
  data: e
}), vn = () => {
  const e = W(async (r) => {
    var i;
    const a = await gn(r), n = ((i = a.data) == null ? void 0 : i.data) ?? a.data;
    return typeof window < "u" && (n != null && n.conversation_id) && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversationId: n.conversation_id }
      })
    ), n;
  }, []);
  return ke(
    e
  );
}, Zt = ["/messenger"];
function Lt(e, r) {
  if (!e || !r) return !1;
  const a = (e.startsWith("/") ? e : `/${e}`).toLowerCase().replace(/\/+$/, "") || "/", n = (r.startsWith("/") ? r : `/${r}`).toLowerCase().trim();
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
  const e = window;
  if (!e.__sdi_messenger_history_patched__) {
    e.__sdi_messenger_history_patched__ = !0;
    const r = window.history.pushState;
    window.history.pushState = function(...n) {
      const i = r.apply(this, n);
      return window.setTimeout(() => {
        window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange"));
      }, 0), i;
    };
    const a = window.history.replaceState;
    window.history.replaceState = function(...n) {
      const i = a.apply(this, n);
      return window.setTimeout(() => {
        window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange"));
      }, 0), i;
    };
  }
}
function wn({
  hiddenPaths: e = Zt,
  showOnlyPaths: r,
  hideCondition: a,
  hidden: n = !1,
  currentPath: i
}) {
  const [l, o] = C(() => i !== void 0 ? i : typeof window < "u" ? window.location.pathname : "");
  return H(() => {
    if (i !== void 0) {
      o(i);
      return;
    }
    if (typeof window > "u") return;
    const u = () => {
      const m = window.location.pathname;
      o((d) => d !== m ? m : d);
    };
    u(), window.addEventListener("popstate", u), window.addEventListener("pushstate", u), window.addEventListener("replacestate", u), window.addEventListener("locationchange", u);
    const h = window.setInterval(u, 150);
    return () => {
      window.removeEventListener("popstate", u), window.removeEventListener("pushstate", u), window.removeEventListener("replacestate", u), window.removeEventListener("locationchange", u), window.clearInterval(h);
    };
  }, [i]), { shouldHide: se(() => n ? !0 : l ? !!(a && a(l) || r && r.length > 0 && !r.some((h) => Lt(l, h)) || e && e.length > 0 && e.some((h) => Lt(l, h))) : !1, [l, n, a, r, e]), pathname: l };
}
const Ft = "sdi_floating_chat_corner";
function Nn(e = "bottom-right") {
  const r = B(null), [a, n] = C(e), [i, l] = C(!1), [o, c] = C(null), u = B({ startX: 0, startY: 0, rect: new DOMRect(), moved: !1 }), h = B(!1), m = B(null);
  H(() => {
    try {
      const S = localStorage.getItem(Ft);
      S && ["bottom-right", "bottom-left", "top-right", "top-left"].includes(S) && n(S);
    } catch {
    }
  }, []);
  const d = (S) => {
    n(S);
    try {
      localStorage.setItem(Ft, S);
    } catch {
    }
  }, w = (S) => {
    if (S.button !== 0 && S.pointerType === "mouse") return;
    const f = r.current;
    if (!f) return;
    const b = f.getBoundingClientRect();
    u.current = {
      startX: S.clientX,
      startY: S.clientY,
      rect: b,
      moved: !1
    };
    const _ = S.clientX - b.left, y = S.clientY - b.top, P = (R) => {
      Math.hypot(
        R.clientX - u.current.startX,
        R.clientY - u.current.startY
      ) > 5 && (u.current.moved || (u.current.moved = !0, l(!0)), m.current && cancelAnimationFrame(m.current), m.current = requestAnimationFrame(() => {
        const z = Math.max(
          12,
          Math.min(window.innerWidth - b.width - 12, R.clientX - _)
        ), E = Math.max(
          12,
          Math.min(window.innerHeight - b.height - 12, R.clientY - y)
        );
        c({ x: z, y: E });
      }));
    }, I = (R) => {
      if (window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", I), window.removeEventListener("pointercancel", I), m.current && cancelAnimationFrame(m.current), u.current.moved) {
        h.current = !0, setTimeout(() => {
          h.current = !1;
        }, 100);
        const F = R.clientX > window.innerWidth / 2, E = R.clientY > window.innerHeight / 2 ? F ? "bottom-right" : "bottom-left" : F ? "top-right" : "top-left";
        d(E), l(!1), c(null);
      }
    };
    window.addEventListener("pointermove", P), window.addEventListener("pointerup", I), window.addEventListener("pointercancel", I);
  }, N = a.startsWith("top"), v = a.endsWith("left");
  return {
    containerRef: r,
    corner: a,
    isDragging: i,
    dragPos: o,
    wasDraggedRef: h,
    isTop: N,
    isLeft: v,
    cornerContainerClass: N ? v ? "top-6 left-6 items-start flex-col-reverse" : "top-6 right-6 items-end flex-col-reverse" : v ? "bottom-6 left-6 items-start flex-col" : "bottom-6 right-6 items-end flex-col",
    cardOriginClass: N ? v ? "origin-top-left" : "origin-top-right" : v ? "origin-bottom-left" : "origin-bottom-right",
    startDrag: w,
    changeCorner: d
  };
}
function yn({
  isOpen: e,
  totalUnreadCount: r,
  isLeft: a,
  isLoading: n = !1,
  hasError: i = !1,
  onToggleOpen: l,
  onPointerDown: o
}) {
  const c = () => e ? "bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rotate-90 shadow-2xl" : i ? "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/40 shadow-rose-500/30" : n ? "bg-blue-600/90 text-white" : "bg-blue-600 hover:bg-blue-700 text-white", u = () => e ? "Cerrar chat de soporte" : i ? "Error de conexión en el chat (Haz clic para ver detalles o reintentar)" : n ? "Conectando al chat de soporte..." : r > 0 ? `Abrir chat de soporte (${r} mensaje${r === 1 ? "" : "s"} sin leer)` : "Abrir chat de soporte";
  return /* @__PURE__ */ s(
    "div",
    {
      onPointerDown: o,
      className: "pointer-events-auto relative touch-none",
      children: [
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: l,
            className: D(
              "flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40",
              c()
            ),
            "aria-label": u(),
            title: u(),
            children: e ? /* @__PURE__ */ t(oe, { className: "size-6 transition-transform duration-200 text-white" }) : i ? /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center animate-in zoom-in-75 duration-200", children: /* @__PURE__ */ t(gt, { className: "size-6 transition-transform duration-200 text-white" }) }) : n ? /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ t(je, { className: "size-6 animate-spin text-white" }) }) : /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ t(hr, { className: "size-6 transition-transform duration-200" }) })
          }
        ),
        !e && i && /* @__PURE__ */ s(
          "span",
          {
            className: D(
              "absolute -top-1 flex size-5 items-center justify-center rounded-full bg-rose-700 text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200",
              a ? "-left-1" : "-right-1"
            ),
            title: "Error de conexión",
            children: [
              /* @__PURE__ */ t("span", { className: "absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-rose-500/50 animate-ping pointer-events-none" }),
              /* @__PURE__ */ t("span", { className: "text-[10px] font-bold", children: "!" })
            ]
          }
        ),
        !e && !i && r > 0 && /* @__PURE__ */ s(
          "span",
          {
            className: D(
              "absolute -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200",
              a ? "-left-1" : "-right-1"
            ),
            title: `${r} mensaje${r === 1 ? "" : "s"} sin leer`,
            children: [
              /* @__PURE__ */ t("span", { className: "absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-red-500/40 animate-ping pointer-events-none" }),
              /* @__PURE__ */ t("span", { className: "relative z-10", children: r > 99 ? "99+" : r })
            ]
          }
        )
      ]
    }
  );
}
const kn = "1.2.2", Cn = {
  version: kn
}, er = Cn.version;
function St({
  onNewConversation: e,
  showNewButton: r = !0,
  className: a
}) {
  var h, m;
  const { currentUser: n, isLoadingUser: i, hasError: l } = ae(), o = le({
    permission: ["messenger_chat_support.provide_support"]
  }), c = Ue((h = n == null ? void 0 : n.attributes) == null ? void 0 : h.name) || "Usuario", u = ((m = n == null ? void 0 : n.attributes) == null ? void 0 : m.email) || "Mi cuenta";
  return l ? /* @__PURE__ */ s(
    "div",
    {
      className: D(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        a
      ),
      children: [
        /* @__PURE__ */ t(fr, { className: "size-3.5 shrink-0 text-red-500" }),
        /* @__PURE__ */ t("span", { className: "truncate text-[11px] font-medium", children: "Sin conexión • No disponible" })
      ]
    }
  ) : i ? /* @__PURE__ */ s(
    "div",
    {
      className: D(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ t(L, { className: "size-8 rounded-full" }),
          /* @__PURE__ */ s("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
            /* @__PURE__ */ t(L, { className: "h-3 w-20" }),
            /* @__PURE__ */ t(L, { className: "h-2.5 w-32" })
          ] })
        ] }),
        r && /* @__PURE__ */ t(L, { className: "size-8 rounded-lg shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ s(
    "div",
    {
      className: D(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ t(ge, { src: n == null ? void 0 : n.attributes.avatar_url, name: c, size: "sm" }),
          /* @__PURE__ */ s("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ t("p", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: c }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400 mt-0.5", children: [
              /* @__PURE__ */ t("span", { className: "truncate", children: u }),
              /* @__PURE__ */ t("span", { className: "text-neutral-300 dark:text-neutral-700 select-none", children: "•" }),
              /* @__PURE__ */ s("span", { className: "font-mono text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0", children: [
                "v",
                er
              ] })
            ] })
          ] })
        ] }),
        r && e && o && /* @__PURE__ */ t(
          U,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: e,
            className: "h-8 gap-1.5 px-3 text-xs font-semibold shrink-0 shadow-xs cursor-pointer",
            title: "Iniciar nueva conversación",
            children: /* @__PURE__ */ t(Be, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function zn({
  title: e,
  canRequestSupport: r,
  canViewChatList: a,
  totalUnreadCount: n,
  conversationsCount: i,
  onRequestSupport: l,
  onViewChatList: o,
  onClose: c,
  onNewConversation: u,
  onDragStart: h
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ s(
      "div",
      {
        onPointerDown: h,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ t("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md", children: /* @__PURE__ */ t(mt, { className: "size-5 text-white" }) }),
              /* @__PURE__ */ s("div", { children: [
                /* @__PURE__ */ t("h3", { className: "text-sm font-bold leading-none text-white", children: e }),
                /* @__PURE__ */ s("p", { className: "text-[11px] text-blue-100 mt-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ t("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }),
                  "Soporte técnico SDI"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ t(
              U,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (m) => m.stopPropagation(),
                onClick: c,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ t(oe, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ s("div", { className: "mt-4", children: [
            /* @__PURE__ */ t("p", { className: "text-xs font-semibold text-white", children: "¿En qué podemos ayudarte hoy?" }),
            /* @__PURE__ */ t("p", { className: "text-[11px] text-blue-100/90 mt-0.5", children: "Selecciona una opción para iniciar asistencia o revisar tu historial." })
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
              /* @__PURE__ */ t("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: /* @__PURE__ */ t(mt, { className: "size-5" }) }),
              /* @__PURE__ */ s("div", { children: [
                /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Solicitar Asistencia" }),
                /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Ingresa asunto y mensaje para iniciar soporte" })
              ] })
            ] }),
            /* @__PURE__ */ t(Dt, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
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
                /* @__PURE__ */ t(pt, { className: "size-5" }),
                n > 0 && /* @__PURE__ */ t("span", { className: "absolute -top-1 -right-1 size-3 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" })
              ] }),
              /* @__PURE__ */ s("div", { children: [
                /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Ver mis chats" }),
                  n > 0 ? /* @__PURE__ */ s("span", { className: "rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs animate-pulse", children: [
                    n > 99 ? "99+" : n,
                    " ",
                    "sin leer"
                  ] }) : i > 0 ? /* @__PURE__ */ t("span", { className: "rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-blue-600 dark:text-blue-400", children: i }) : null
                ] }),
                /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Revisa tus conversaciones y requerimientos" })
              ] })
            ] }),
            /* @__PURE__ */ t(Dt, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ s("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30 p-3 mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs", children: [
            /* @__PURE__ */ t(xt, { className: "size-3.5 text-emerald-600" }),
            /* @__PURE__ */ t("span", { children: "Mesa de Ayuda SDI" })
          ] }),
          /* @__PURE__ */ s("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500", children: [
            "v",
            er
          ] })
        ] }),
        /* @__PURE__ */ t("p", { className: "leading-relaxed", children: "Tus solicitudes quedan registradas con trazabilidad y número de ticket en la plataforma de Helpdesk." })
      ] })
    ] }),
    /* @__PURE__ */ t(St, { onNewConversation: u })
  ] });
}
function Sn({
  userId: e,
  userName: r,
  onSubmit: a,
  isSubmitting: n = !1,
  error: i = null,
  onCancel: l
}) {
  const [o, c] = C(""), [u, h] = C(""), [m, d] = C(null);
  return /* @__PURE__ */ s("form", { onSubmit: (N) => {
    N.preventDefault(), d(null);
    const v = o.trim(), g = u.trim();
    if (!v) {
      d("Por favor ingresa el asunto de tu solicitud.");
      return;
    }
    if (!g) {
      d("Por favor describe el detalle de tu consulta.");
      return;
    }
    if (!e) {
      d("No se pudo identificar el usuario actual para la solicitud.");
      return;
    }
    a({
      subject: v,
      message: g,
      user_id: e
    });
  }, className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100", children: [
      /* @__PURE__ */ t("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/90 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 p-3.5 shadow-2xs space-y-2", children: /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ t(mt, { className: "size-4.5" }) }),
        /* @__PURE__ */ s("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ t("h4", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate", children: r ? `Hola, ${r}` : "Nueva solicitud de soporte" }),
            /* @__PURE__ */ s("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40", children: [
              /* @__PURE__ */ t("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
              "En línea"
            ] })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug", children: "Completa los datos para asignarte un técnico de soporte." })
        ] })
      ] }) }),
      (m || i) && /* @__PURE__ */ s("div", { className: "flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ t(br, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ s("div", { className: "flex-1 leading-snug", children: [
          /* @__PURE__ */ t("span", { className: "font-medium", children: "Error en el formulario:" }),
          " ",
          m || i
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ t(xr, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ t("span", { children: "Asunto de la consulta" }),
          /* @__PURE__ */ t("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ t("div", { className: "relative", children: /* @__PURE__ */ t(
          Nt,
          {
            value: o,
            onChange: (N) => {
              c(N.target.value), m && d(null);
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
          /* @__PURE__ */ t(pr, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ t("span", { children: "Detalle o descripción" }),
          /* @__PURE__ */ t("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ s("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ t(
            yt,
            {
              value: u,
              onChange: (N) => {
                h(N.target.value), m && d(null);
              },
              placeholder: "Describe lo más claro posible tu duda o problema...",
              rows: 4,
              disabled: n,
              maxLength: 1e3,
              className: "min-h-24 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none"
            }
          ),
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between px-3 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400 dark:text-neutral-500", children: [
            /* @__PURE__ */ t("span", { children: "Proporciona detalles específicos" }),
            /* @__PURE__ */ s("span", { className: "font-mono", children: [
              u.length,
              "/1000"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "flex items-start gap-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 p-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: [
        /* @__PURE__ */ t(xt, { className: "size-4 shrink-0 text-neutral-400 mt-0.5" }),
        /* @__PURE__ */ t("span", { children: "Tu solicitud creará automáticamente una conversación y se notificará al equipo de asistencia." })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900/80 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t("div", { children: l && /* @__PURE__ */ t(
        U,
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
      /* @__PURE__ */ t(
        U,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: n || !o.trim() || !u.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          children: n ? /* @__PURE__ */ s(pe, { children: [
            /* @__PURE__ */ t(je, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ t("span", { children: "Enviando solicitud..." })
          ] }) : /* @__PURE__ */ s(pe, { children: [
            /* @__PURE__ */ t("span", { children: "Iniciar soporte" }),
            /* @__PURE__ */ t(Rt, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] });
}
function _n({
  userId: e,
  userName: r,
  canViewChatList: a,
  totalUnreadCount: n,
  isSubmitting: i,
  error: l,
  onHome: o,
  onViewChats: c,
  onClose: u,
  onSubmit: h,
  onNewConversation: m,
  onDragStart: d
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ t(
      "div",
      {
        onPointerDown: d,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-3.5 py-4 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ s(
              U,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (w) => w.stopPropagation(),
                onClick: o,
                className: "h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ t(ft, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { children: "Inicio" })
                ]
              }
            ),
            /* @__PURE__ */ t("span", { className: "text-xs font-bold text-white", children: "Solicitar Asistencia" })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1", children: [
            a && /* @__PURE__ */ s(
              U,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (w) => w.stopPropagation(),
                onClick: c,
                title: "Ver mis chats",
                className: "relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1",
                children: [
                  /* @__PURE__ */ t(pt, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { className: "hidden sm:inline text-[11px] font-medium", children: "Mis chats" }),
                  n > 0 && /* @__PURE__ */ t("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs", children: n > 99 ? "99+" : n })
                ]
              }
            ),
            /* @__PURE__ */ t(
              U,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (w) => w.stopPropagation(),
                onClick: u,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ t(oe, { className: "size-4" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 overflow-hidden flex flex-col", children: e && /* @__PURE__ */ t(
      Sn,
      {
        userId: e,
        userName: r,
        onSubmit: h,
        isSubmitting: i,
        error: l,
        onCancel: o
      }
    ) }),
    /* @__PURE__ */ t(St, { onNewConversation: m })
  ] });
}
const En = [
  { id: "all", label: "Todos", icon: null },
  { id: "direct", label: "Directos", icon: Ze },
  { id: "group", label: "Grupos", icon: ht },
  { id: "bot", label: "Bots", icon: gr }
], Dn = () => /* @__PURE__ */ s("div", { className: "flex w-full min-w-0 items-center gap-2.5 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-800/20", children: [
  /* @__PURE__ */ t(L, { className: "size-9.5 rounded-full shrink-0" }),
  /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 space-y-2", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t(L, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ t(L, { className: "h-2.5 w-10" })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t(L, { className: "h-2.5 w-36" }),
      /* @__PURE__ */ t(L, { className: "h-3.5 w-6 rounded-full" })
    ] })
  ] })
] }), Pn = ({
  conversation: e,
  selectedId: r,
  currentUserId: a,
  onSelectConversation: n
}) => {
  var N, v, g;
  const i = qe(e), l = e.type === "bot" || ((N = e.attributes) == null ? void 0 : N.type) === "bot", o = !!e.attributes.closed_at, c = Ve(e, a), u = Te(e, a), h = ((g = (v = e.relationships) == null ? void 0 : v.users) == null ? void 0 : g.length) || 0, m = i ? "Grupo" : l ? "Bot de Asistencia" : "Conversación directa";
  let d = "";
  try {
    d = et(
      vt(e.attributes.updated_at || e.attributes.created_at),
      "dd/MM HH:mm"
    );
  } catch {
    d = "";
  }
  const w = r === e.id;
  return /* @__PURE__ */ t(
    "div",
    {
      onClick: () => n(e.id),
      "aria-current": w ? "true" : void 0,
      className: D(
        "group relative flex w-full min-w-0 cursor-pointer select-none flex-col gap-1.5 overflow-hidden rounded-xl p-3 transition-all",
        w ? "bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900" : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent"
      ),
      children: /* @__PURE__ */ s("div", { className: "flex items-start gap-2.5 min-w-0", children: [
        /* @__PURE__ */ t(
          ge,
          {
            src: c == null ? void 0 : c.attributes.avatar_url,
            name: u,
            isGroup: i,
            size: "md",
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("h4", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: u }),
              i && /* @__PURE__ */ s("span", { className: "text-[10px] text-neutral-400 font-normal shrink-0", children: [
                "(",
                h,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ t("span", { className: "shrink-0 text-[10px] text-neutral-400 font-mono", children: d })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("p", { className: "truncate text-[11px] text-neutral-500 dark:text-neutral-400", children: m }),
              o && /* @__PURE__ */ s(
                me,
                {
                  variant: "outline",
                  className: "h-4 px-1 text-[9px] gap-0.5 border-amber-300 text-amber-700 dark:text-amber-400 font-medium",
                  children: [
                    /* @__PURE__ */ t(ye, { className: "size-2" }),
                    /* @__PURE__ */ t("span", { children: "Cerrado" })
                  ]
                }
              )
            ] }),
            e.attributes.unread_count > 0 && /* @__PURE__ */ t(me, { className: "bg-blue-700", children: e.attributes.unread_count })
          ] })
        ] })
      ] })
    }
  );
};
function jn({
  conversations: e,
  selectedId: r,
  onSelectConversation: a,
  searchQuery: n,
  onSearchChange: i,
  closedFilter: l,
  onClosedFilterChange: o,
  typeFilter: c,
  onTypeFilterChange: u,
  onNewConversation: h,
  isLoading: m = !1
}) {
  const { currentUser: d, currentUserId: w, isLoadingUser: N, hasError: v, error: g } = ae(), x = le({
    permission: ["messenger_chat.read"]
  }), S = m || N;
  return /* @__PURE__ */ s("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ s("div", { className: "flex shrink-0 flex-col gap-2.5 border-b border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900", children: [
      /* @__PURE__ */ s("div", { className: "group/search relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
        /* @__PURE__ */ t(Bt, { className: "size-3.5 shrink-0 text-neutral-400 transition-colors group-focus-within/search:text-blue-600" }),
        /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            placeholder: "Buscar por nombre...",
            value: n,
            onChange: (f) => i(f.target.value),
            className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          }
        ),
        n ? /* @__PURE__ */ t(
          U,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => i(""),
            className: "size-5 shrink-0 rounded-full p-0 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
            children: /* @__PURE__ */ t(oe, { className: "size-3" })
          }
        ) : /* @__PURE__ */ t("span", { className: "hidden shrink-0 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-400 sm:inline-block", children: "Buscar" })
      ] }),
      /* @__PURE__ */ t(
        Ot,
        {
          value: l,
          onValueChange: (f) => o(f),
          className: "w-full",
          children: /* @__PURE__ */ s(Gt, { className: "h-8 w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ t(tt, { value: "0", className: "text-[11px] font-medium", children: "Activos" }),
            /* @__PURE__ */ t(tt, { value: "1", className: "text-[11px] font-medium", children: "Cerrados" })
          ] })
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none", children: En.map((f) => {
        const b = c === f.id, _ = f.icon;
        return /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => u(f.id),
            className: D(
              "flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              b ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 border border-transparent"
            ),
            children: [
              _ && /* @__PURE__ */ t(_, { className: "size-3" }),
              /* @__PURE__ */ t("span", { children: f.label })
            ]
          },
          f.id
        );
      }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ t($e, { className: "h-full w-full", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 p-1.5 w-full min-w-0", children: v ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ t("div", { className: "size-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(gt, { className: "size-6" }) }),
      /* @__PURE__ */ s("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Error al cargar chats" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: (g == null ? void 0 : g.message) || "No se pudo conectar al servidor de mensajería." })
      ] }),
      /* @__PURE__ */ s(
        U,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: () => window.location.reload(),
          className: "h-7.5 gap-1.5 px-3 text-xs font-semibold cursor-pointer",
          children: [
            /* @__PURE__ */ t(Ut, { className: "size-3" }),
            /* @__PURE__ */ t("span", { children: "Reintentar" })
          ]
        }
      )
    ] }) : !x && !N ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ t("div", { className: "size-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(ye, { className: "size-6" }) }),
      /* @__PURE__ */ s("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Sin permiso de lectura" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: "No tienes permisos para ver el listado de conversaciones." })
      ] })
    ] }) : S ? /* @__PURE__ */ t("div", { className: "space-y-1.5 p-1", children: Array.from({ length: 5 }).map((f, b) => /* @__PURE__ */ t(Dn, {}, b)) }) : e.length === 0 ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ t("div", { className: "mb-3 flex size-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400", children: /* @__PURE__ */ t(vr, { className: "size-5 stroke-[1.5]" }) }),
      /* @__PURE__ */ t("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100", children: n ? "No se encontraron resultados" : l === "1" ? "No hay conversaciones cerradas" : "No hay conversaciones activas" }),
      /* @__PURE__ */ t("p", { className: "mt-1 max-w-48 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400", children: n ? "Intenta con otro término de búsqueda o cambia los filtros." : "Las conversaciones iniciadas aparecerán aquí." }),
      l !== "0" && /* @__PURE__ */ t(
        U,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => o("0"),
          className: "mt-3 text-[11px] h-7 text-blue-600 dark:text-blue-400 cursor-pointer",
          children: "Ver activas"
        }
      )
    ] }) : e.map((f) => /* @__PURE__ */ t(
      Pn,
      {
        conversation: f,
        selectedId: r,
        currentUserId: w,
        onSelectConversation: a
      },
      f.id
    )) }) }) }),
    /* @__PURE__ */ t(St, { onNewConversation: h })
  ] });
}
function Tn({
  conversations: e,
  selectedId: r,
  searchQuery: a,
  closedFilter: n,
  typeFilter: i,
  isLoading: l,
  onHome: o,
  onClose: c,
  onSelectConversation: u,
  onSearchChange: h,
  onClosedFilterChange: m,
  onTypeFilterChange: d,
  onNewConversation: w,
  onDragStart: N
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: [
    /* @__PURE__ */ s(
      "div",
      {
        onPointerDown: N,
        className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900 cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ s(
            U,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (v) => v.stopPropagation(),
              onClick: o,
              className: "h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100",
              children: [
                /* @__PURE__ */ t(ft, { className: "size-3.5" }),
                /* @__PURE__ */ t("span", { children: "Inicio" })
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Mis Conversaciones" }),
          /* @__PURE__ */ t(
            U,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (v) => v.stopPropagation(),
              onClick: c,
              className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ t(oe, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ t(
      jn,
      {
        conversations: e,
        selectedId: r,
        onSelectConversation: u,
        searchQuery: a,
        onSearchChange: h,
        closedFilter: n,
        onClosedFilterChange: m,
        typeFilter: i,
        onTypeFilterChange: d,
        onNewConversation: w,
        isLoading: l
      }
    ) })
  ] });
}
function An({
  onDragStart: e
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ s(
      "div",
      {
        onPointerDown: e,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ t(L, { className: "size-9 rounded-xl bg-white/20" }),
              /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ t(L, { className: "h-3.5 w-32 bg-white/30" }),
                /* @__PURE__ */ t(L, { className: "h-2.5 w-24 bg-white/20" })
              ] })
            ] }),
            /* @__PURE__ */ t(L, { className: "size-7 rounded-full bg-white/20" })
          ] }),
          /* @__PURE__ */ s("div", { className: "mt-4 space-y-1.5", children: [
            /* @__PURE__ */ t(L, { className: "h-3 w-48 bg-white/30" }),
            /* @__PURE__ */ t(L, { className: "h-2.5 w-64 bg-white/20" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      /* @__PURE__ */ s("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(L, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ t(L, { className: "h-3.5 w-28" }),
            /* @__PURE__ */ t(L, { className: "h-2.5 w-44" })
          ] })
        ] }),
        /* @__PURE__ */ t(L, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ s("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(L, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ t(L, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ t(L, { className: "h-2.5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ t(L, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ s("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(L, { className: "size-3.5 rounded-full" }),
          /* @__PURE__ */ t(L, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ t(L, { className: "h-2.5 w-full" }),
        /* @__PURE__ */ t(L, { className: "h-2.5 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ t(L, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(L, { className: "h-3 w-24" }),
          /* @__PURE__ */ t(L, { className: "h-2.5 w-36" })
        ] })
      ] }),
      /* @__PURE__ */ t(L, { className: "size-8 rounded-lg" })
    ] })
  ] });
}
function On({
  canViewChatList: e = !0,
  canRequestSupport: r = !0,
  defaultView: a = "home",
  defaultCorner: n = "bottom-right",
  initialConversation: i,
  title: l = "Centro de Ayuda SDI",
  hiddenPaths: o = Zt,
  showOnlyPaths: c,
  hideCondition: u,
  hidden: h = !1,
  currentPath: m,
  showToastOnUnread: d = !1
}) {
  var q, X, O, Y;
  const w = le({
    permission: ["messenger_chat.read"]
  }), N = le({
    permission: ["messenger_chat_support.request_support"]
  });
  le({
    permission: ["messenger_chat_support.provide_support"]
  });
  const v = le({
    permission: [
      "messenger_chat.read",
      "messenger_chat_support.request_support",
      "messenger_chat_support.provide_support"
    ],
    operator: "OR"
  }), g = e && w, x = r && N, { shouldHide: S } = wn({
    hiddenPaths: o,
    showOnlyPaths: c,
    hideCondition: u,
    hidden: h,
    currentPath: m
  }), {
    containerRef: f,
    isDragging: b,
    dragPos: _,
    wasDraggedRef: y,
    isTop: P,
    isLeft: I,
    cornerContainerClass: R,
    cardOriginClass: F,
    startDrag: z
  } = Nn(n), [E, T] = C(!1), [j, p] = C(() => !g && !x ? "chat" : a === "list" && !g || a === "support-form" && !x ? "home" : a), { currentUser: A, isLoadingUser: $, hasError: ee, error: at } = ae(), Ce = (q = A == null ? void 0 : A.attributes) == null ? void 0 : q.user_auth_id, M = ((X = A == null ? void 0 : A.attributes) == null ? void 0 : X.name) || "Usuario", {
    mutateAsync: he,
    isLoading: ce,
    error: ne
  } = vn(), [ie, ve] = C(null), [Oe, fe] = C(
    null
  ), {
    conversations: te,
    selectedId: ue,
    selectedConversation: G,
    closedFilter: Ge,
    setClosedFilter: Ke,
    typeFilter: nt,
    setTypeFilter: st,
    searchQuery: ze,
    setSearchQuery: we,
    isNewConversationOpen: Xe,
    isLoading: Ye,
    selectConversation: de,
    setIsNewConversationOpen: Ne,
    handleConversationCreated: Qe
  } = pn({
    showToastOnUnread: d,
    isActive: E && j === "chat"
  }), Ae = se(() => !te || !Array.isArray(te) ? 0 : te.reduce((K, be) => {
    var xe;
    return K + (((xe = be.attributes) == null ? void 0 : xe.unread_count) || 0);
  }, 0), [te]), Se = Oe || i || G || null;
  H(() => {
    j === "chat" && !Se && p(g ? "list" : "home");
  }, [j, Se, g]);
  const it = () => {
    y.current || b || (E ? T(!1) : (T(!0), p(a === "list" && !g ? x ? "support-form" : "home" : a === "support-form" && !x ? g ? "list" : "home" : a || "home")));
  };
  if (S || !$ && !ee && !v)
    return null;
  const lt = (K) => {
    fe(null), de(K), p("chat");
  }, k = async (K) => {
    var be, xe, _e, Me, Le;
    try {
      const V = await he(K);
      if (V != null && V.conversation_id && (V != null && V.technician)) {
        const ot = String(V.conversation_id), tr = {
          id: String(V.technician.id),
          type: "user",
          attributes: {
            user_auth_id: Number(V.technician.user_auth_id),
            name: V.technician.name,
            avatar_url: null,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: []
        }, _t = {
          id: ot,
          type: "conversation",
          attributes: {
            is_group: !1,
            name: V.technician.name || ((be = V.ticket) == null ? void 0 : be.subject) || "Soporte SDI",
            closed_at: null,
            unread_count: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: {
            users: [tr]
          }
        };
        fe(_t), Qe(_t), re.success(`Asistencia iniciada con ${V.technician.name}`, {
          description: `Ticket #${((xe = V.ticket) == null ? void 0 : xe.number) || ((_e = V.ticket) == null ? void 0 : _e.id)}`
        }), p("chat");
      } else
        ve(V), p("no-technician");
    } catch (V) {
      const ot = ((Le = (Me = V == null ? void 0 : V.response) == null ? void 0 : Me.data) == null ? void 0 : Le.message) || (V == null ? void 0 : V.message) || "Error al procesar la solicitud de asistencia";
      re.error(ot);
    }
  };
  if (S)
    return null;
  if (!ee)
    return /* @__PURE__ */ s(
      "div",
      {
        ref: f,
        style: b && _ ? {
          position: "fixed",
          left: `${_.x}px`,
          top: `${_.y}px`,
          bottom: "auto",
          right: "auto",
          zIndex: 50,
          touchAction: "none",
          transition: "none"
        } : void 0,
        className: D(
          "sdi-messenger-root z-50 flex pointer-events-none select-none",
          b ? "fixed cursor-grabbing" : D("fixed duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all", R)
        ),
        children: [
          E && /* @__PURE__ */ t(
            Jr,
            {
              className: D(
                "pointer-events-auto h-[590px] max-h-[calc(100vh-120px)] w-[385px] sm:w-[425px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-2xl transition-all duration-300 flex flex-col",
                P ? "mt-3.5" : "mb-3.5",
                F
              ),
              children: $ ? /* @__PURE__ */ t(An, { onDragStart: z }) : /* @__PURE__ */ s(pe, { children: [
                j === "home" && /* @__PURE__ */ t(
                  zn,
                  {
                    title: l,
                    canRequestSupport: x,
                    canViewChatList: g,
                    totalUnreadCount: Ae,
                    conversationsCount: te.length,
                    onRequestSupport: () => p("support-form"),
                    onViewChatList: () => p("list"),
                    onClose: () => T(!1),
                    onNewConversation: () => Ne(!0),
                    onDragStart: z
                  }
                ),
                j === "support-form" && /* @__PURE__ */ t(
                  _n,
                  {
                    userId: Ce,
                    userName: M,
                    canViewChatList: g,
                    totalUnreadCount: Ae,
                    isSubmitting: ce,
                    error: ((Y = (O = ne == null ? void 0 : ne.response) == null ? void 0 : O.data) == null ? void 0 : Y.message) || (ne == null ? void 0 : ne.message),
                    onHome: () => p("home"),
                    onViewChats: () => p("list"),
                    onClose: () => T(!1),
                    onSubmit: k,
                    onNewConversation: () => Ne(!0),
                    onDragStart: z
                  }
                ),
                j === "no-technician" && /* @__PURE__ */ t(
                  mn,
                  {
                    message: ie == null ? void 0 : ie.message,
                    ticket: ie == null ? void 0 : ie.ticket,
                    onNewRequest: () => {
                      ve(null), p("support-form");
                    },
                    onViewChats: () => p("list"),
                    onClose: () => T(!1),
                    canViewChatList: g
                  }
                ),
                j === "list" && /* @__PURE__ */ t(
                  Tn,
                  {
                    conversations: te,
                    selectedId: ue,
                    searchQuery: ze,
                    closedFilter: Ge,
                    typeFilter: nt,
                    isLoading: Ye,
                    onHome: () => p("home"),
                    onClose: () => T(!1),
                    onSelectConversation: lt,
                    onSearchChange: we,
                    onClosedFilterChange: Ke,
                    onTypeFilterChange: st,
                    onNewConversation: () => Ne(!0),
                    onDragStart: z
                  }
                ),
                j === "chat" && Se && /* @__PURE__ */ t("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: /* @__PURE__ */ t(
                  un,
                  {
                    conversation: Se,
                    isContextPanelOpen: !1,
                    alwaysShowBackButton: !0,
                    onCloseSuccess: () => {
                      fe(null), p(g ? "list" : "home");
                    },
                    onBack: () => {
                      fe(null), p(g ? "list" : "home");
                    }
                  }
                ) })
              ] })
            }
          ),
          /* @__PURE__ */ t(
            yn,
            {
              isOpen: E,
              totalUnreadCount: Ae,
              isLeft: I,
              isLoading: $,
              hasError: ee,
              onToggleOpen: it,
              onPointerDown: z
            }
          ),
          /* @__PURE__ */ t(
            bn,
            {
              open: Xe,
              onOpenChange: Ne,
              onSuccess: (K) => {
                fe(K), Qe(K), p("chat");
              }
            }
          )
        ]
      }
    );
}
function Gn({ onNewConversation: e }) {
  const { hasError: r, error: a, isLoadingUser: n } = ae(), i = le({
    permission: ["messenger_chat.read"]
  }), l = le({
    permission: ["messenger_chat_support.provide_support"]
  });
  return r ? /* @__PURE__ */ s("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-x-0 top-0 h-1 bg-red-500/30" }),
    /* @__PURE__ */ s("div", { className: "flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200", children: [
      /* @__PURE__ */ t("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs", children: /* @__PURE__ */ t(gt, { className: "size-8" }) }),
      /* @__PURE__ */ t("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400", children: "Servicio no disponible" }),
      /* @__PURE__ */ t("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Error de conexión" }),
      /* @__PURE__ */ t("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: (a == null ? void 0 : a.message) || "No fue posible conectar con el servidor de chat. Las funciones de mensajería están temporalmente deshabilitadas." }),
      /* @__PURE__ */ s(
        U,
        {
          type: "button",
          variant: "primary",
          className: "mt-6 gap-1.5 cursor-pointer shadow-xs",
          onClick: () => window.location.reload(),
          children: [
            /* @__PURE__ */ t(Ut, { className: "size-4" }),
            "Reintentar conexión"
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ t("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0f1d] shadow-xs", children: /* @__PURE__ */ s("div", { className: "relative z-10 flex max-w-md flex-col items-center px-6 text-center", children: [
    /* @__PURE__ */ t("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs", children: /* @__PURE__ */ t(Be, { className: "size-8" }) }),
    /* @__PURE__ */ t("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400", children: "Bandeja de conversaciones" }),
    /* @__PURE__ */ t("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Selecciona una conversación" }),
    /* @__PURE__ */ t("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: i ? "Elige una conversación del panel lateral para ver sus mensajes o inicia una nueva cuando estés listo." : "No cuentas con permisos para ver la lista de conversaciones." }),
    e && !n && l && /* @__PURE__ */ s(
      U,
      {
        type: "button",
        variant: "outline",
        className: "mt-6 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors",
        onClick: e,
        children: [
          /* @__PURE__ */ t(Be, { className: "size-4" }),
          "Nueva conversación"
        ]
      }
    )
  ] }) });
}
function Kn({
  conversation: e,
  onClose: r,
  className: a
}) {
  var m, d;
  const { currentUserId: n } = ae(), i = qe(e), l = Ve(e, n), o = Te(e, n), c = ((d = (m = e.relationships) == null ? void 0 : m.users) == null ? void 0 : d.length) || 0, u = !!e.attributes.closed_at, h = (w) => {
    if (!w) return "-";
    try {
      return et(vt(w), "dd/MM/yyyy HH:mm");
    } catch {
      return w;
    }
  };
  return /* @__PURE__ */ s(
    "div",
    {
      className: D(
        "sdi-messenger-root flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-3 px-4 bg-white dark:bg-neutral-900", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(Ze, { className: "size-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ t("h3", { className: "text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100", children: "Información de Contacto" })
          ] }),
          r && /* @__PURE__ */ t(
            U,
            {
              variant: "ghost",
              size: "icon",
              onClick: r,
              className: " p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              children: /* @__PURE__ */ t(oe, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ t($e, { className: "h-full", children: /* @__PURE__ */ s("div", { className: "space-y-4 p-4", children: [
          /* @__PURE__ */ s("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ t("div", { className: "relative mb-2", children: /* @__PURE__ */ t(
              ge,
              {
                src: l == null ? void 0 : l.attributes.avatar_url,
                name: o,
                isGroup: i,
                size: "xl",
                status: !i && l ? "online" : void 0
              }
            ) }),
            /* @__PURE__ */ t("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: o }),
            /* @__PURE__ */ t("p", { className: "text-xs font-medium text-neutral-500 dark:text-neutral-400", children: i ? `${c} participantes` : "Conversación individual" }),
            /* @__PURE__ */ s("div", { className: "flex items-center justify-center gap-1.5 mt-2", children: [
              /* @__PURE__ */ t(me, { variant: "secondary", className: "text-[10px]", children: i ? "Grupo" : "Usuario" }),
              u ? /* @__PURE__ */ s(
                me,
                {
                  variant: "outline",
                  className: "text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ t(ye, { className: "size-2.5" }),
                    /* @__PURE__ */ t("span", { children: "Cerrada" })
                  ]
                }
              ) : /* @__PURE__ */ s(
                me,
                {
                  variant: "outline",
                  className: "text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ t(Je, { className: "size-2.5" }),
                    /* @__PURE__ */ t("span", { children: "Activa" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t(Qr, {}),
          /* @__PURE__ */ s("div", { className: "space-y-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(Ze, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ t("span", { className: "truncate text-neutral-900 dark:text-neutral-100 font-medium", children: i ? `${c} participantes` : o })
            ] }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(wr, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Creada: ",
                h(e.attributes.created_at)
              ] })
            ] }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(bt, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Actualizada: ",
                h(e.attributes.updated_at)
              ] })
            ] }),
            e.attributes.closed_at && /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(ye, { className: "size-3.5 shrink-0 text-amber-500" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Cerrada: ",
                h(e.attributes.closed_at)
              ] })
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
}
const Mn = ({ conversationId: e, enabled: r = !0 } = {}) => {
  var i, l;
  const n = zt({
    queryKey: ["conversation", e],
    queryFn: () => qa(e),
    enabled: r && !!e,
    keepPreviousData: !0
  });
  return {
    data: ((l = (i = n.data) == null ? void 0 : i.data) == null ? void 0 : l.data) ?? null,
    isLoading: n.isLoading,
    isFetching: n.isFetching,
    isError: n.isError,
    errors: n.errors,
    refetch: n.refetch
  };
}, Xn = (e, r) => {
  const a = typeof e == "object" && e !== null ? e : { conversationId: e, ...r }, {
    conversationId: n,
    enabled: i = !0,
    showToastOnUnread: l = !1,
    onMessage: o,
    onUnread: c
  } = a, { config: u, currentUser: h, currentUserId: m } = ae(), d = le({
    permission: ["messenger_chat.read"]
  }), w = n != null ? String(n) : void 0, N = n != null ? Number(n) : void 0, v = i && !!w && d, {
    data: g,
    isLoading: x,
    isError: S,
    errors: f,
    refetch: b
  } = Mn({
    conversationId: w,
    enabled: v
  }), _ = W(
    (P) => {
      if (m && String(P.attributes.sender_id) !== String(m)) {
        const R = typeof document < "u" && document.hasFocus() && !document.hidden;
        Ct(R ? "focused" : "unfocused");
      }
      b(), o == null || o(P);
    },
    [m, o, b]
  ), y = W(
    (P) => {
      l && String(P.conversation_id) !== w && re.info("Nuevo mensaje", {
        id: `conversation-message-${P.message.id}`,
        description: P.message.body || "Tienes un mensaje nuevo"
      }), String(P.conversation_id) === w && b(), c == null || c(P);
    },
    [w, c, b, l]
  );
  return H(() => {
    if (!(!N || !v))
      return Yt(
        u.reverb,
        N,
        _
      );
  }, [u.reverb, N, _, v]), H(() => {
    if (!(!m || !v))
      return Qt(
        u.reverb,
        m,
        y
      );
  }, [u.reverb, m, y, v]), H(() => {
    if (typeof window > "u") return;
    const P = () => {
      b();
    };
    return window.addEventListener("messenger:conversation-closed", P), window.addEventListener("messenger:conversation-updated", P), () => {
      window.removeEventListener("messenger:conversation-closed", P), window.removeEventListener("messenger:conversation-updated", P);
    };
  }, [b]), {
    conversation: g ?? null,
    isLoading: x,
    isError: S,
    errors: f,
    refetch: b,
    hasReadPermission: d,
    currentUser: h,
    currentUserId: m
  };
};
export {
  qn as ChatProvider,
  un as ConversationChatPanel,
  Kn as ConversationContextPanel,
  Gn as ConversationEmptyState,
  jn as ConversationsSidebarList,
  On as FloatingChat,
  er as LIB_VERSION,
  bn as NewConversationDialog,
  Sn as RequestSupportForm,
  Ct as playNotificationSound,
  ae as useChatContext,
  rn as useConversationChat,
  pn as useConversationsPage,
  Vn as useOptionalChatContext,
  Xn as useShowConversation
};
//# sourceMappingURL=index.js.map
