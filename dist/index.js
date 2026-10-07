"use client";
import { jsx as t, jsxs as s, Fragment as be } from "react/jsx-runtime";
import { createContext as $e, useState as S, useMemo as de, useEffect as B, useContext as Ve, forwardRef as it, useRef as O, useCallback as V, useLayoutEffect as It } from "react";
import { QueryClient as ar, QueryClientProvider as nr, useInfiniteQuery as sr, useMutation as ir, useQueryClient as Ce, useQuery as ft, keepPreviousData as Rt } from "@tanstack/react-query";
import lr from "axios";
import { twMerge as or } from "tailwind-merge";
import { Users as pt, X as ce, CheckCircle2 as tt, Loader2 as Le, Lock as ke, ArrowLeft as bt, Info as dr, FileText as cr, Download as ur, Clock as xt, CheckCheck as mr, ChevronsDown as hr, Paperclip as jt, SendHorizontal as Ut, UploadCloud as fr, ShieldCheck as gt, Ticket as pr, RotateCcw as br, MessagesSquare as vt, MessageSquarePlus as qe, User as rt, Search as Wt, Check as xr, AlertTriangle as wt, MessageCircleMore as gr, WifiOff as vr, LifeBuoy as ht, ChevronRight as Tt, AlertCircle as wr, Tag as Nr, MessageSquare as yr, Bot as kr, RefreshCw as Ht, Inbox as Cr, CalendarDays as zr } from "lucide-react";
import { createPortal as Bt } from "react-dom";
import { toast as ae } from "sonner";
import { parseISO as Nt, isValid as _r, isToday as Sr, isYesterday as jr, isThisWeek as Tr, format as at } from "date-fns";
import Dr from "pusher-js";
typeof globalThis < "u" && typeof globalThis.self > "u" && (globalThis.self = globalThis);
let Me = null;
const Pr = (e) => {
  Me = e;
}, Ar = (e) => Object.entries(e).reduce((r, [a, n]) => (r[a] = typeof n == "boolean" ? Number(n) : n, r), {}), Z = (e, r) => {
  if (!Me)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  return `${Me.apiBaseUrl.replace(/\/+$/, "")}/${e}/api/${r}`;
}, ee = async ({
  data: e,
  url: r,
  params: a,
  method: n,
  headers: i,
  ...l
}) => {
  if (!Me)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const o = {
    ...l,
    url: r,
    method: n,
    data: e,
    params: a ? Ar(a) : void 0,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...Me.authToken ? { Authorization: `Bearer ${Me.authToken}` } : {},
      ...i
    }
  };
  return lr.request(o);
}, Er = (e) => ee({
  url: `${Z("messenger", "v1")}/users`,
  method: "GET",
  params: e
}), Mr = (e) => ee({
  url: `${Z("messenger", "v1")}/users/${e}/user`,
  method: "GET"
}), Lr = ({
  applicationId: e,
  userId: r
}) => ee({
  url: `${Z("auth", "v1")}/users/${r}/permissions`,
  method: "GET",
  params: {
    application_id: e
  }
}), Fr = () => ee({
  url: `${Z("auth", "v1")}/me`,
  method: "GET"
}), yt = $e(null);
function Ir(e) {
  var a, n, i, l;
  const r = [];
  return (a = e.apiBaseUrl) != null && a.trim() || r.push("apiBaseUrl"), (e.applicationId === void 0 || e.applicationId === null) && r.push("applicationId"), e.reverb ? ((n = e.reverb.key) != null && n.trim() || r.push("reverb.key"), (i = e.reverb.host) != null && i.trim() || r.push("reverb.host"), (!Number.isFinite(e.reverb.port) || e.reverb.port <= 0) && r.push("reverb.port"), (l = e.reverb.wsPath) != null && l.trim() || r.push("reverb.wsPath"), e.reverb.scheme !== "http" && e.reverb.scheme !== "https" && r.push("reverb.scheme")) : r.push("reverb"), r.length > 0 ? new Error(`Configuración incompleta del chat: ${r.join(", ")}`) : null;
}
function Xn({ config: e, children: r }) {
  const [a] = S(
    () => new ar({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: !1,
          retry: 1,
          staleTime: 12e4
        }
      }
    })
  ), { authToken: n, apiBaseUrl: i, applicationId: l, reverb: o } = e, u = de(
    () => Ir(e),
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
  ), [d, m] = S(null), [f, c] = S([]), [p, b] = S(null), [x, v] = S(null), [z, _] = S(null), h = JSON.stringify([i, l, n]);
  B(() => {
    u && console.error(`[Chat] ${u.message}`);
  }, [u]), B(() => {
    let w = !0;
    return u || !n ? () => {
      w = !1;
    } : (Pr({
      apiBaseUrl: i,
      authToken: n
    }), (async () => {
      var q;
      try {
        const L = await Fr(), j = (await Mr(L.data.data.id)).data.data;
        if (!(j != null && j.id))
          throw new Error("La respuesta no contiene un usuario válido para el chat");
        const W = ((q = (await Lr({
          userId: j.attributes.user_auth_id,
          applicationId: l
        })).data.data) == null ? void 0 : q.map((Ie) => Ie.attributes.name)) ?? [];
        w && (m(j), c(W), b(h), v(null), _(null));
      } catch (L) {
        w && (console.error("Error al cargar el usuario en ChatProvider:", L), v(L instanceof Error ? L : new Error("Error al inicializar el chat")), _(h));
      }
    })(), () => {
      w = !1;
    });
  }, [u, n, i, l, h]);
  const g = (w) => {
    m(w);
  }, P = de(() => d != null && d.id ? String(d.id) : "", [d]), k = !!(d != null && d.id) && p === h, D = z === h && x !== null, A = {
    currentUser: d,
    currentUserId: P,
    permissions: f,
    isLoadingUser: !u && !!n && !k && !D,
    hasError: !!u || D,
    error: u ?? (D ? x : null),
    config: e,
    setCurrentUser: g
  };
  return /* @__PURE__ */ t(nr, { client: a, children: /* @__PURE__ */ t(yt.Provider, { value: A, children: r }) });
}
function Yn() {
  return Ve(yt);
}
function ne() {
  const e = Ve(yt);
  if (!e)
    throw new Error("useChatContext debe usarse dentro de un ChatProvider");
  return e;
}
function y(...e) {
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
  return e.forEach(a), or(r.join(" "));
}
const U = it(
  ({ className: e, variant: r = "default", size: a = "default", type: n = "button", disabled: i, children: l, ...o }, u) => {
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
    return /* @__PURE__ */ t(
      "button",
      {
        ref: u,
        type: n,
        disabled: i,
        className: y(d, m[r], f[a], e),
        ...o,
        children: l
      }
    );
  }
);
U.displayName = "ChatButton";
const kt = it(
  ({ className: e, type: r = "text", disabled: a, ...n }, i) => /* @__PURE__ */ t(
    "input",
    {
      ref: i,
      type: r,
      disabled: a,
      className: y(
        "flex h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        e
      ),
      ...n
    }
  )
);
kt.displayName = "ChatInput";
const Ct = it(
  ({ className: e, disabled: r, ...a }, n) => /* @__PURE__ */ t(
    "textarea",
    {
      ref: n,
      disabled: r,
      className: y(
        "flex min-h-15 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        e
      ),
      ...a
    }
  )
);
Ct.displayName = "ChatTextarea";
function fe({ className: e, variant: r = "default", children: a, ...n }) {
  return /* @__PURE__ */ t("span", { className: y("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
  }[r], e), ...n, children: a });
}
function Rr(e) {
  if (!e) return "?";
  const r = e.trim().split(/\s+/);
  return r.length === 1 ? r[0].substring(0, 2).toUpperCase() : (r[0][0] + r[r.length - 1][0]).toUpperCase();
}
const Dt = [
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
function Ur(e) {
  if (!e) return "#62748e";
  let r = 0;
  for (let a = 0; a < (e || "").length; a++)
    r = (r << 5) - r + (e || "").charCodeAt(a), r |= 0;
  return Dt[Math.abs(r) % Dt.length];
}
function xe({
  src: e,
  name: r = "",
  size: a = "md",
  isGroup: n = !1,
  status: i,
  className: l,
  ...o
}) {
  const [u, d] = S(!1), m = {
    xs: { box: "size-6", text: "text-[10px]", icon: "size-3", statusDot: "size-1.5" },
    sm: { box: "size-8", text: "text-xs", icon: "size-3.5", statusDot: "size-2" },
    md: { box: "size-10", text: "text-sm", icon: "size-5", statusDot: "size-2.5" },
    lg: { box: "size-12", text: "text-base", icon: "size-6", statusDot: "size-3" },
    xl: { box: "size-16", text: "text-xl", icon: "size-8", statusDot: "size-3.5" }
  }, { box: f, text: c, icon: p, statusDot: b } = m[a], x = Rr(r), v = de(() => Ur(r), [r]), z = !!e && !u;
  return /* @__PURE__ */ s("div", { className: y("relative inline-block shrink-0", f, l), ...o, children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: y(
          "flex size-full items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          !z && (n ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "font-semibold text-xs")
        ),
        style: !z && !n ? {
          backgroundColor: `${v}33`,
          color: `${v}FF`,
          fontWeight: "bold"
        } : void 0,
        children: z ? /* @__PURE__ */ t(
          "img",
          {
            src: e,
            alt: r || "Avatar",
            onError: () => d(!0),
            className: "size-full object-cover",
            loading: "lazy"
          }
        ) : n ? /* @__PURE__ */ t(pt, { className: p }) : /* @__PURE__ */ t("span", { className: y("font-bold tracking-tight", c), children: x })
      }
    ),
    i && /* @__PURE__ */ t(
      "span",
      {
        className: y(
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
const qt = $e(null);
function Wr() {
  const e = Ve(qt);
  if (!e)
    throw new Error("Los subcomponentes de Dialog deben usarse dentro de <Dialog>");
  return e;
}
function Hr({ open: e, onOpenChange: r, children: a }) {
  return B(() => {
    if (!e) return;
    const n = (l) => {
      l.key === "Escape" && r(!1);
    }, i = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = i, window.removeEventListener("keydown", n);
    };
  }, [e, r]), /* @__PURE__ */ t(qt.Provider, { value: { open: e, onOpenChange: r }, children: a });
}
function Br({ className: e, children: r, showClose: a = !0, ...n }) {
  const { open: i, onOpenChange: l } = Wr(), o = O(null);
  return !i || typeof window > "u" ? null : Bt(
    /* @__PURE__ */ t(
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
            className: y(
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
                  children: /* @__PURE__ */ t(ce, { className: "size-4" })
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
function qr({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: y("flex flex-col gap-1.5 text-left p-5 pb-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", e), ...r });
}
function Or({ className: e, ...r }) {
  return /* @__PURE__ */ t("h3", { className: y("text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100", e), ...r });
}
function $r({ className: e, ...r }) {
  return /* @__PURE__ */ t("p", { className: y("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", e), ...r });
}
function Vr({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: y("flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", e), ...r });
}
const Ot = $e(null);
function $t() {
  const e = Ve(Ot);
  if (!e)
    throw new Error("Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>");
  return e;
}
function Kr({ open: e, onOpenChange: r, children: a }) {
  return B(() => {
    if (!e) return;
    const n = (l) => {
      l.key === "Escape" && r(!1);
    }, i = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = i, window.removeEventListener("keydown", n);
    };
  }, [e, r]), /* @__PURE__ */ t(Ot.Provider, { value: { open: e, onOpenChange: r }, children: a });
}
function Gr({ className: e, children: r, ...a }) {
  const { open: n, onOpenChange: i } = $t(), l = O(null);
  return !n || typeof window > "u" ? null : Bt(
    /* @__PURE__ */ t(
      "div",
      {
        ref: l,
        onClick: (u) => {
          u.target === l.current && i(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ t(
          "div",
          {
            role: "alertdialog",
            "aria-modal": "true",
            className: y(
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
function Qr({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: y("flex flex-col gap-2 text-left", e), ...r });
}
function Xr({ className: e, ...r }) {
  return /* @__PURE__ */ t("h3", { className: y("text-sm font-bold text-neutral-900 dark:text-neutral-100", e), ...r });
}
function Yr({ className: e, ...r }) {
  return /* @__PURE__ */ t("p", { className: y("text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", e), ...r });
}
function Jr({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: y("flex items-center justify-end gap-2 mt-4", e), ...r });
}
function Zr({
  className: e,
  onClick: r,
  children: a,
  ...n
}) {
  const { onOpenChange: i } = $t();
  return /* @__PURE__ */ t(
    U,
    {
      variant: "outline",
      size: "sm",
      onClick: (l) => {
        i(!1), r == null || r(l);
      },
      className: y("text-xs", e),
      ...n,
      children: a || "Cancelar"
    }
  );
}
function ea({
  className: e,
  variant: r = "danger",
  size: a = "sm",
  ...n
}) {
  return /* @__PURE__ */ t(U, { variant: r, size: a, className: y("text-xs font-semibold", e), ...n });
}
$e(null);
const Vt = $e(null);
function ta() {
  const e = Ve(Vt);
  if (!e)
    throw new Error("Los subcomponentes de Tabs deben usarse dentro de <Tabs>");
  return e;
}
function Kt({
  value: e,
  defaultValue: r = "",
  onValueChange: a,
  className: n,
  children: i,
  ...l
}) {
  const [o, u] = S(r), d = e !== void 0, m = d ? e : o, f = d ? a : u;
  return /* @__PURE__ */ t(Vt.Provider, { value: { value: m, onValueChange: f }, children: /* @__PURE__ */ t("div", { className: y("flex flex-col gap-2 w-full", n), ...l, children: i }) });
}
function Gt({ className: e, children: r, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: y(
        "flex w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 text-neutral-500 dark:text-neutral-400 gap-1",
        e
      ),
      ...a,
      children: r
    }
  );
}
function nt({ value: e, className: r, children: a, ...n }) {
  const { value: i, onValueChange: l } = ta(), o = i === e;
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": o,
      onClick: () => l(e),
      className: y(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none cursor-pointer",
        o ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5",
        r
      ),
      ...n,
      children: a
    }
  );
}
const Ke = it(
  ({ className: e, children: r, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: y(
        "relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]",
        e
      ),
      ...a,
      children: r
    }
  )
);
Ke.displayName = "ChatScrollArea";
function ra({
  orientation: e = "horizontal",
  className: r,
  ...a
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "separator",
      "aria-orientation": e,
      className: y(
        "shrink-0 bg-neutral-200 dark:bg-neutral-800",
        e === "horizontal" ? "h-px w-full" : "h-full w-px",
        r
      ),
      ...a
    }
  );
}
function aa({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: y(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100",
        e
      ),
      ...r
    }
  );
}
function T({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: y(
        "animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80",
        e
      ),
      ...r
    }
  );
}
const Oe = (e) => e ? e.toLowerCase().split(" ").filter(Boolean).map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ") : "", Ge = (e) => !!e.attributes.is_group, Qe = (e, r) => {
  var i;
  const a = ((i = e.relationships) == null ? void 0 : i.users) || [];
  if (!r)
    return a[0];
  const n = String(r);
  return a.find((l) => String(l.id) !== n) || a[0];
}, Fe = (e, r) => {
  var i;
  if (Ge(e))
    return e.attributes.name || "Grupo";
  const a = Qe(e, r), n = ((i = a == null ? void 0 : a.attributes) == null ? void 0 : i.name) || e.attributes.name || "Usuario";
  return Oe(n);
};
function ut(e) {
  return (r = {}) => {
    const a = r.width ? String(r.width) : e.defaultWidth;
    return e.formats[a] || e.formats[e.defaultWidth];
  };
}
function We(e) {
  return (r, a) => {
    const n = a != null && a.context ? String(a.context) : "standalone";
    let i;
    if (n === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, u = a != null && a.width ? String(a.width) : o;
      i = e.formattingValues[u] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, u = a != null && a.width ? String(a.width) : e.defaultWidth;
      i = e.values[u] || e.values[o];
    }
    const l = e.argumentCallback ? e.argumentCallback(r) : r;
    return i[l];
  };
}
function He(e) {
  return (r, a = {}) => {
    const n = a.width, i = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], l = r.match(i);
    if (!l)
      return null;
    const o = l[0], u = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], d = Array.isArray(u) ? sa(u, (c) => c.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      na(u, (c) => c.test(o))
    );
    let m;
    m = e.valueCallback ? e.valueCallback(d) : d, m = a.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      a.valueCallback(m)
    ) : m;
    const f = r.slice(o.length);
    return { value: m, rest: f };
  };
}
function na(e, r) {
  for (const a in e)
    if (Object.prototype.hasOwnProperty.call(e, a) && r(e[a]))
      return a;
}
function sa(e, r) {
  for (let a = 0; a < e.length; a++)
    if (r(e[a]))
      return a;
}
function ia(e) {
  return (r, a = {}) => {
    const n = r.match(e.matchPattern);
    if (!n) return null;
    const i = n[0], l = r.match(e.parsePattern);
    if (!l) return null;
    let o = e.valueCallback ? e.valueCallback(l[0]) : l[0];
    o = a.valueCallback ? a.valueCallback(o) : o;
    const u = r.slice(i.length);
    return { value: o, rest: u };
  };
}
const la = {
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
}, oa = (e, r, a) => {
  let n;
  const i = la[e];
  return typeof i == "string" ? n = i : r === 1 ? n = i.one : n = i.other.replace("{{count}}", r.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "en " + n : "hace " + n : n;
}, da = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, ca = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, ua = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ma = {
  date: ut({
    formats: da,
    defaultWidth: "full"
  }),
  time: ut({
    formats: ca,
    defaultWidth: "full"
  }),
  dateTime: ut({
    formats: ua,
    defaultWidth: "full"
  })
}, ha = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, fa = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, pa = (e, r, a, n) => r.getHours() !== 1 ? fa[e] : ha[e], ba = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, xa = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, ga = {
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
}, va = {
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
}, wa = {
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
}, Na = {
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
}, ya = (e, r) => Number(e) + "º", ka = {
  ordinalNumber: ya,
  era: We({
    values: ba,
    defaultWidth: "wide"
  }),
  quarter: We({
    values: xa,
    defaultWidth: "wide",
    argumentCallback: (e) => Number(e) - 1
  }),
  month: We({
    values: ga,
    defaultWidth: "wide"
  }),
  day: We({
    values: va,
    defaultWidth: "wide"
  }),
  dayPeriod: We({
    values: wa,
    defaultWidth: "wide",
    formattingValues: Na,
    defaultFormattingWidth: "wide"
  })
}, Ca = /^(\d+)(º)?/i, za = /\d+/i, _a = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, Sa = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, ja = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Ta = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Da = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, Pa = {
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
}, Aa = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, Ea = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, Ma = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, La = {
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
}, Fa = {
  ordinalNumber: ia({
    matchPattern: Ca,
    parsePattern: za,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: He({
    matchPatterns: _a,
    defaultMatchWidth: "wide",
    parsePatterns: Sa,
    defaultParseWidth: "any"
  }),
  quarter: He({
    matchPatterns: ja,
    defaultMatchWidth: "wide",
    parsePatterns: Ta,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: He({
    matchPatterns: Da,
    defaultMatchWidth: "wide",
    parsePatterns: Pa,
    defaultParseWidth: "any"
  }),
  day: He({
    matchPatterns: Aa,
    defaultMatchWidth: "wide",
    parsePatterns: Ea,
    defaultParseWidth: "any"
  }),
  dayPeriod: He({
    matchPatterns: Ma,
    defaultMatchWidth: "any",
    parsePatterns: La,
    defaultParseWidth: "any"
  })
}, Pt = {
  code: "es",
  formatDistance: oa,
  formatLong: ma,
  formatRelative: pa,
  localize: ka,
  match: Fa,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, Ia = ({
  conversationId: e,
  sender: r,
  body: a,
  file: n
}) => {
  const i = `optimistic-${Date.now()}`, l = (/* @__PURE__ */ new Date()).toISOString(), o = Number(r.id), u = r.attributes || {}, d = u.name || u.username || "Usuario", m = u.avatar_url ?? u.avatar ?? null, f = {
    id: String(r.id),
    type: "user",
    attributes: {
      user_auth_id: u.user_auth_id ?? r.id,
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
      conversation_id: Number(e),
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
function Ra(e) {
  return e.slice(0, 10);
}
function Ua(e, r) {
  if (r.attributes.sender_id == null) return e;
  const a = Ra(r.attributes.created_at || ""), n = e[0];
  return n && n.date === a ? n.messages.some((i) => i.id === r.id) ? e : [{ ...n, messages: [r, ...n.messages] }, ...e.slice(1)] : [{ date: a, messages: [r] }, ...e];
}
function Qt(e, r) {
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
function mt(e) {
  if (!e) return "Hoy";
  const r = e.trim().toLowerCase();
  if (r === "hoy" || r === "today") return "Hoy";
  if (r === "ayer" || r === "yesterday") return "Ayer";
  const a = Nt(e);
  return _r(a) ? Sr(a) ? "Hoy" : jr(a) ? "Ayer" : Tr(a, { weekStartsOn: 1 }) ? at(a, "EEEE", { locale: Pt }) : at(a, "d 'de' MMMM 'de' yyyy", { locale: Pt }) : e;
}
const Wa = async ({
  conversation: e,
  ...r
}) => await ee({
  url: `${Z("messenger", "v1")}/conversations/${e}/messages`,
  method: "GET",
  params: r
}), Ha = (e, r) => ee({
  url: `${Z("messenger", "v1")}/conversations/${e}/messages`,
  method: "POST",
  data: r
}), Ba = (e, r) => {
  const a = new FormData();
  return a.append("file", r.file), a.append("sender_id", r.sender_id.toString()), r.caption && a.append("caption", r.caption), ee({
    url: `${Z("messenger", "v1")}/conversations/${e}/file`,
    method: "POST",
    data: a,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}, qa = ({ params: e, enabled: r = !0 }) => {
  var l, o, u, d, m, f, c;
  const a = sr({
    queryKey: ["list-messages", e],
    queryFn: ({ pageParam: p }) => {
      const b = p && p !== "null" && p !== "undefined" && p.trim() !== "" ? p : void 0;
      return Wa({
        ...e,
        ...b ? { cursor: b } : {},
        page: {
          ...e == null ? void 0 : e.page,
          ...b ? { cursor: b } : {}
        }
      });
    },
    initialPageParam: "",
    getNextPageParam: (p, b, x, v) => {
      var P, k, D, C;
      const z = ((P = p == null ? void 0 : p.data) == null ? void 0 : P.data) ?? [];
      if (!Array.isArray(z) || z.length === 0 || z.reduce(
        (I, A) => I + (Array.isArray(A == null ? void 0 : A.messages) ? A.messages.length : 0),
        0
      ) === 0)
        return;
      const h = (k = p == null ? void 0 : p.data) == null ? void 0 : k.meta;
      if ((h == null ? void 0 : h.has_more) === !1)
        return;
      let g = h == null ? void 0 : h.next_cursor;
      if (!g) {
        const I = (C = (D = p == null ? void 0 : p.data) == null ? void 0 : D.links) == null ? void 0 : C.next;
        if (I)
          try {
            const A = new URL(I, "http://localhost");
            g = A.searchParams.get("page[cursor]") || A.searchParams.get("cursor") || void 0;
          } catch {
          }
      }
      if (!(!g || g === "null" || g === "undefined" || g.trim() === "") && !(x && g === x) && !(v && v.includes(g)))
        return g;
    },
    enabled: r && !!(e != null && e.conversation),
    refetchOnWindowFocus: !1
  }), n = (l = a.data) == null ? void 0 : l.pages;
  return {
    data: de(() => n ? n.reduce((p, b) => {
      var v;
      const x = ((v = b == null ? void 0 : b.data) == null ? void 0 : v.data) ?? [];
      return Qt(p, x);
    }, []) : [], [n]),
    rawPages: (o = a.data) == null ? void 0 : o.pages,
    isLoading: a.isLoading,
    isPending: a.isPending,
    isFetching: a.isFetching,
    isFetchingNextPage: a.isFetchingNextPage,
    hasNextPage: !!a.hasNextPage,
    fetchNextPage: a.fetchNextPage,
    errors: ((u = a.error) == null ? void 0 : u.data) ?? {},
    refetch: a.refetch,
    meta: (c = (f = (m = (d = a.data) == null ? void 0 : d.pages) == null ? void 0 : m[0]) == null ? void 0 : f.data) == null ? void 0 : c.meta
  };
};
function ze(e, r) {
  const a = ir({
    mutationFn: e,
    ...r
  });
  return {
    ...a,
    isLoading: a.isPending
  };
}
const Oa = () => ze(
  ({ conversationId: e, body: r, sender_id: a }) => Ha(e, { body: r, sender_id: a }).then(
    (n) => n.data.data
  )
), $a = () => ze(
  ({ conversationId: e, file: r, sender_id: a, caption: n }) => Ba(e, { file: r, sender_id: a, caption: n }).then(
    (i) => i.data.data
  )
), Va = (e) => ee({
  url: `${Z("messenger", "v1")}/conversations`,
  method: "GET",
  params: e
}), Ka = (e) => ee({
  url: `${Z("messenger", "v1")}/conversations`,
  method: "POST",
  data: e
}), Ga = (e) => ee({
  url: `${Z("messenger", "v1")}/conversations/${e}`,
  method: "GET"
}), Qa = ({
  conversationId: e,
  read_until: r,
  user_id: a
}) => ee({
  url: `${Z("messenger", "v1")}/conversations/${e}/read`,
  method: "POST",
  data: { read_until: r, user_id: a }
}), Xa = ({
  conversationId: e,
  user_id: r,
  is_typing: a
}) => ee({
  url: `${Z("messenger", "v1")}/conversations/${e}/typing`,
  method: "POST",
  data: { user_id: r, is_typing: a }
}), Ya = (e) => ee({
  url: `${Z("messenger", "v1")}/conversations/${e}/close`,
  method: "POST"
}), Ja = () => {
  const e = Ce(), r = V(async (a) => {
    const n = await Qa(a);
    return await e.invalidateQueries({ queryKey: ["list-conversations"] }), await e.invalidateQueries({ queryKey: ["conversation", a.conversationId] }), n.data.data;
  }, [e]);
  return ze(
    r
  );
}, Za = () => ze(
  (e) => Xa(e).then(() => {
  })
), en = () => {
  const e = Ce(), r = V(async (a) => {
    const n = await Ya(a);
    return await e.invalidateQueries({ queryKey: ["list-conversations"] }), await e.invalidateQueries({ queryKey: ["conversation", a] }), n.data.data;
  }, [e]);
  return ze(
    r
  );
};
function zt(e) {
  return e != null && typeof e == "object" && "attributes" in e;
}
function J(e) {
  return e == null ? "" : String(e);
}
function tn(e) {
  if (e == null || typeof e != "object") return;
  if (zt(e)) return e;
  const r = e;
  return {
    id: J(r.id),
    type: "user",
    attributes: {
      user_auth_id: Number(r.user_auth_id),
      name: J(r.name),
      avatar_url: J(r.avatar_url),
      created_at: J(r.created_at),
      updated_at: J(r.updated_at)
    },
    relationships: []
  };
}
function rn(e) {
  if (e == null || typeof e != "object") return;
  if (zt(e)) return e;
  const r = e;
  return {
    id: J(r.id),
    type: "messageAttachment",
    attributes: {
      file_url: J(r.file_url),
      file_name: J(r.file_name),
      file_mime_type: J(r.file_mime_type),
      file_size: Number(r.file_size),
      created_at: J(r.created_at)
    },
    relationships: []
  };
}
function an(e) {
  return typeof e == "string" ? { id: 0, name: e, icon: "" } : e != null && typeof e == "object" ? e : null;
}
function nn(e) {
  if (e == null || typeof e != "object")
    return {
      id: "",
      type: "message",
      attributes: {},
      relationships: { sender: void 0, attachments: [] }
    };
  if (zt(e)) return e;
  const r = e, a = Array.isArray(r.attachments) ? r.attachments.map(rn).filter((n) => n != null) : [];
  return {
    id: J(r.id),
    type: "message",
    attributes: {
      conversation_id: Number(r.conversation_id),
      sender_id: Number(r.sender_id),
      body: J(r.body),
      type: an(r.type),
      created_at: J(r.created_at),
      updated_at: J(r.updated_at)
    },
    relationships: {
      sender: tn(r.sender),
      attachments: a
    }
  };
}
let Ae = null, At = null;
function Xt(e) {
  if (typeof window > "u")
    return null;
  const r = JSON.stringify(e);
  return Ae && At !== r && (Ae.disconnect(), Ae = null), Ae || (Ae = new Dr(
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
  ), At = r), Ae;
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
    a(nn(o));
  }), n) {
    const o = (u) => n(u);
    l.bind("UserTyping", o), l.bind("client-UserTyping", o);
  }
  return () => {
    l.unbind_all(), i.unsubscribe(`conversation.${r}`);
  };
}
function Jt(e, r, a, n) {
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
let Et = 0;
const sn = 1e3;
let Ee = null;
function ln() {
  if (typeof window > "u") return null;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    return e ? ((!Ee || Ee.state === "closed") && (Ee = new e()), Ee.state === "suspended" && Ee.resume(), Ee) : null;
  } catch {
    return null;
  }
}
function Be(e, r, a, n, i) {
  const l = e.createOscillator(), o = e.createGain();
  l.type = "sine", l.frequency.setValueAtTime(r, a), o.gain.setValueAtTime(1e-4, a), o.gain.exponentialRampToValueAtTime(i, a + 0.015), o.gain.exponentialRampToValueAtTime(1e-4, a + n), l.connect(o), o.connect(e.destination), l.start(a), l.stop(a + n + 0.05);
}
function st(e = "focused", r = {}) {
  if (typeof window > "u") return !1;
  const a = r.throttleMs ?? sn, n = Date.now();
  if (!r.force && n - Et < a)
    return !1;
  Et = n;
  const i = ln();
  if (!i) return !1;
  const l = Math.max(0, Math.min(1, r.volume ?? 1));
  try {
    const o = i.currentTime;
    return e === "focused" ? (Be(i, 587.33, o, 0.08, 0.12 * l), Be(i, 880, o + 0.06, 0.14, 0.1 * l)) : (Be(i, 523.25, o, 0.1, 0.15 * l), Be(i, 659.25, o + 0.08, 0.1, 0.14 * l), Be(i, 783.99, o + 0.16, 0.22, 0.16 * l)), !0;
  } catch {
    return !1;
  }
}
const on = (e, r) => {
  const a = Ce(), { config: n, currentUser: i, currentUserId: l } = ne(), o = de(
    () => ({ conversation: e.id, page: { size: "20" } }),
    [e.id]
  ), {
    data: u,
    refetch: d,
    fetchNextPage: m,
    hasNextPage: f,
    isFetchingNextPage: c,
    isLoading: p
  } = qa({
    params: o,
    enabled: !!e.id
  }), { mutateAsync: b, isLoading: x } = Oa(), { mutateAsync: v, isLoading: z } = $a(), { mutateAsync: _ } = Ja(), { mutate: h } = Za(), { mutateAsync: g, isLoading: P } = en(), [k, D] = S(""), [C, I] = S(null), A = !!e.attributes.closed_at, [w, M] = S([]), [q, L] = S(!0), [E, j] = S(0), [te, W] = S("Hoy"), [Ie, ge] = S(null), ue = O(null), _e = O(!1), Se = O(!1), se = O(0), ie = O(0), ve = O(!1), Re = O(f), pe = O(e.id), re = O(null), he = O(null), K = O(null), Xe = O(!1), Ye = O(h), lt = Fe(e, l);
  B(() => {
    Ye.current = h;
  }, [h]), B(() => {
    ve.current = c;
  }, [c]), B(() => {
    Re.current = f;
  }, [f]);
  const ot = V(() => {
    const N = ue.current;
    N && (N.scrollTo({
      top: N.scrollHeight,
      behavior: "smooth"
    }), j(0), L(!0));
  }, []), je = V(() => {
    const N = ue.current;
    if (!N) return;
    const $ = N.scrollHeight - N.scrollTop - N.clientHeight < 140;
    L($), $ && j(0);
    const R = N.querySelectorAll("[data-message-date]");
    if (R.length === 0) {
      W("Hoy");
      return;
    }
    const G = N.getBoundingClientRect(), X = G.top, Y = G.bottom;
    let Q = null;
    for (let ye = 0; ye < R.length; ye++) {
      const De = R[ye], le = De.getBoundingClientRect();
      if (le.bottom > X && le.top < Y) {
        Q = De.getAttribute("data-message-date");
        break;
      }
    }
    W(Q || R[R.length - 1].getAttribute("data-message-date") || "Hoy");
  }, []);
  B(() => {
    pe.current !== e.id && (pe.current = e.id, _e.current = !1, Se.current = !1, se.current = 0, ie.current = 0, M([]), L(!0), j(0), W("Hoy"));
  }, [e.id]), B(() => {
    if (_e.current || p || u.length === 0) return;
    const N = ue.current;
    N && (N.scrollTop = N.scrollHeight, _e.current = !0, L(!0), je());
  }, [e.id, p, u.length, je]), It(() => {
    const N = ue.current;
    if (N && se.current > 0) {
      const $ = N.scrollHeight - se.current;
      $ > 0 && (N.scrollTop = ie.current + $), se.current = 0, ie.current = 0;
    }
  }, [u]), B(() => {
    if (w.length > 0) {
      const N = ue.current;
      if (N) {
        Se.current = !0, N.scrollTo({
          top: N.scrollHeight,
          behavior: "smooth"
        });
        const H = setTimeout(() => {
          Se.current = !1;
        }, 500);
        return () => clearTimeout(H);
      }
    }
  }, [w.length]), B(() => {
    const N = ue.current;
    if (!N) return;
    const H = () => {
      je(), !(Se.current || !_e.current) && N.scrollTop < 80 && Re.current && !ve.current && !p && (ve.current = !0, se.current = N.scrollHeight, ie.current = N.scrollTop, m().then(($) => {
        $ != null && $.hasNextPage || (Re.current = !1);
      }).finally(() => {
        ve.current = !1;
      }));
    };
    return N.addEventListener("scroll", H, { passive: !0 }), () => {
      N.removeEventListener("scroll", H);
    };
  }, [m, p, je]);
  const we = V(() => {
    !e.id || !l || (re.current && clearTimeout(re.current), re.current = setTimeout(() => {
      re.current = null, _({
        conversationId: e.id,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: l
      }).catch(console.error);
    }, 600));
  }, [e.id, l, _]);
  B(() => () => {
    re.current && clearTimeout(re.current), he.current && clearTimeout(he.current), K.current && clearTimeout(K.current);
  }, [e.id]);
  const Je = V(
    (N) => {
      a.setQueryData(["list-messages", o], (R) => {
        var Q;
        if (!(R != null && R.pages) || R.pages.length === 0) return R;
        console.log("EJECUTADO");
        const G = R.pages[0], X = ((Q = G.data) == null ? void 0 : Q.data) ?? [], Y = Ua(X, N);
        return {
          ...R,
          pages: [
            {
              ...G,
              data: {
                ...G.data,
                data: Y
              }
            },
            ...R.pages.slice(1)
          ]
        };
      });
      const H = ue.current;
      H && (H.scrollHeight - H.scrollTop - H.clientHeight < 160 ? setTimeout(() => {
        H.scrollTo({
          top: H.scrollHeight,
          behavior: "smooth"
        });
      }, 50) : j((G) => G + 1)), l && String(N.attributes.sender_id) !== String(l) && st("focused"), we();
    },
    [l, o, a, we]
  ), Ze = V(
    (N) => {
      if (String(N.user_id) !== String(l)) {
        if (he.current && (clearTimeout(he.current), he.current = null), !N.is_typing) {
          ge(null);
          return;
        }
        ge(N.user.name), he.current = setTimeout(() => {
          he.current = null, ge(null);
        }, 2e3);
      }
    },
    [l]
  ), me = V(
    (N) => {
      !e.id || !l || Xe.current === N || (Xe.current = N, Ye.current({
        conversationId: e.id,
        user_id: Number(l),
        is_typing: N
      }));
    },
    [e.id, l]
  ), Ne = V(() => {
    K.current && clearTimeout(K.current), K.current = setTimeout(() => {
      K.current = null, me(!1);
    }, 2500);
  }, [me]), et = V(
    (N) => {
      if (!A) {
        if (D(N), !N.trim()) {
          K.current && (clearTimeout(K.current), K.current = null), me(!1);
          return;
        }
        me(!0), Ne();
      }
    },
    [A, Ne, me]
  );
  B(() => () => {
    K.current && (clearTimeout(K.current), K.current = null), me(!1);
  }, [e.id, me]);
  const Ue = () => {
    e.attributes.unread_count && we();
  };
  B(() => {
    Ue();
  }, [e, u, we]), B(() => {
    if (!e.id) return;
    const N = Yt(
      n.reverb,
      Number(e.id),
      Je,
      Ze
    );
    return () => {
      N();
    };
  }, [n.reverb, e.id, Je, Ze]);
  const Te = V(
    (N) => {
      A || I(N);
    },
    [A]
  ), dt = async () => {
    var G, X;
    if (A) return;
    const N = k.trim();
    if (!N && !C || !i) return;
    const H = C, $ = Ia({
      conversationId: e.id,
      sender: i,
      body: N,
      file: H
    }), R = $.id;
    M((Y) => [...Y, $]), D(""), K.current && (clearTimeout(K.current), K.current = null), me(!1);
    try {
      const Y = H ? await v({
        conversationId: e.id,
        file: H,
        sender_id: Number(i.id),
        caption: N || void 0
      }) : await b({
        body: N,
        conversationId: e.id,
        sender_id: i.id
      });
      I(null), (((X = (G = (await d()).data) == null ? void 0 : G.pages) == null ? void 0 : X.reduce(
        (le, F) => {
          var Pe;
          return Qt(le, ((Pe = F.data) == null ? void 0 : Pe.data) ?? []);
        },
        []
      )) ?? []).some(
        (le) => le.messages.some((F) => F.id === Y.id)
      ) && M((le) => le.filter((F) => F.id !== R)), we();
    } catch {
      M(
        (Y) => Y.map(
          (Q) => Q.id === R ? { ...Q, local_status: "error" } : Q
        )
      );
    }
  }, ct = V(async () => {
    var N, H, $;
    try {
      await g(e.id), ae.success("Conversación cerrada exitosamente"), (N = r == null ? void 0 : r.onCloseSuccess) == null || N.call(r);
    } catch (R) {
      const G = (($ = (H = R == null ? void 0 : R.response) == null ? void 0 : H.data) == null ? void 0 : $.message) || (R == null ? void 0 : R.message) || "Error al cerrar la conversación";
      ae.error(G);
    }
  }, [g, e.id, r]);
  return {
    messages: u,
    optimisticMessages: w,
    scrollRef: ue,
    conversationName: lt,
    inputText: k,
    pendingFile: C,
    isClosed: A,
    isClosing: P,
    isSending: x,
    isUploading: z,
    isFetchingNextPage: c,
    hasNextPage: f,
    isLoading: p,
    isNearBottom: q,
    newMessagesCount: E,
    typingUser: Ie,
    visibleDate: te,
    currentUser: i,
    currentUserId: l,
    scrollToBottom: ot,
    setInputText: et,
    setPendingFile: I,
    handleSendMessage: dt,
    handleSelectFile: Te,
    handleCloseConversation: ct
  };
};
function dn(e, r, a = "OR") {
  return a === "AND" ? r.every((n) => e.includes(n)) : r.some((n) => e.includes(n));
}
function oe({
  permission: e,
  operator: r = "OR"
}) {
  const { permissions: a } = ne();
  return dn(a, e, r);
}
function cn({
  conversation: e,
  isClosed: r = !!e.attributes.closed_at,
  isClosing: a = !1,
  onCloseConversation: n,
  showResolvedBadge: i = !1,
  className: l,
  ...o
}) {
  const [u, d] = S(!1), { currentUserId: m } = ne(), f = oe({
    permission: ["messenger_chat_support.provide_support"]
  }), c = Fe(e, m);
  return r && i ? /* @__PURE__ */ s(
    fe,
    {
      variant: "outline",
      className: y(
        "h-8 px-2.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100/60 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-800 gap-1 select-none",
        l
      ),
      children: [
        /* @__PURE__ */ t(tt, { className: "size-3.5 text-emerald-500" }),
        /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Resuelta" })
      ]
    }
  ) : r && !i || !f ? null : /* @__PURE__ */ s(be, { children: [
    /* @__PURE__ */ t(
      U,
      {
        variant: "success",
        size: "sm",
        disabled: a,
        onClick: () => d(!0),
        className: y(
          "h-8 gap-1 px-2 sm:px-3 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs",
          l
        ),
        ...o,
        children: a ? /* @__PURE__ */ s(be, { children: [
          /* @__PURE__ */ t(Le, { className: "size-3.5 animate-spin" }),
          /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Cerrando..." })
        ] }) : /* @__PURE__ */ s(be, { children: [
          /* @__PURE__ */ t(tt, { className: "size-3.5" }),
          /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Cerrar chat" })
        ] })
      }
    ),
    /* @__PURE__ */ t(Kr, { open: u, onOpenChange: d, children: /* @__PURE__ */ s(Gr, { className: "sm:max-w-md p-5", children: [
      /* @__PURE__ */ s(Qr, { className: "gap-2", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ t("div", { className: "flex size-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20", children: /* @__PURE__ */ t(ke, { className: "size-4" }) }),
          /* @__PURE__ */ t(Xr, { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "¿Cerrar conversación?" })
        ] }),
        /* @__PURE__ */ s(Yr, { className: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: [
          "¿Estás seguro de que deseas marcar como resuelta y cerrar la conversación con",
          " ",
          /* @__PURE__ */ t("strong", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children: c }),
          "? Esta acción finalizará la atención en tiempo real."
        ] })
      ] }),
      /* @__PURE__ */ s(Jr, { className: "gap-2 sm:gap-0 mt-3", children: [
        /* @__PURE__ */ t(
          Zr,
          {
            disabled: a,
            className: "text-xs h-8 cursor-pointer",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ t(
          ea,
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
function un({
  conversation: e,
  isClosed: r,
  isClosing: a = !1,
  onCloseConversation: n,
  isContextPanelOpen: i = !0,
  onToggleContextPanel: l,
  onBack: o,
  alwaysShowBackButton: u = !1
}) {
  var p, b;
  const { currentUserId: d } = ne(), m = Ge(e), f = Fe(e, d), c = Qe(e, d);
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
          className: y(
            "size-8 p-0 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
            u ? "flex" : "flex md:hidden"
          ),
          children: /* @__PURE__ */ t(bt, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ t(
        xe,
        {
          src: c == null ? void 0 : c.attributes.avatar_url,
          name: f,
          isGroup: m,
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
                /* @__PURE__ */ t(ke, { className: "size-2.5" }),
                /* @__PURE__ */ t("span", { children: "Cerrada" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 min-w-0", children: /* @__PURE__ */ t("span", { className: "truncate", children: m ? `${((b = (p = e.relationships) == null ? void 0 : p.users) == null ? void 0 : b.length) || 0} participantes` : "Conversación individual" }) })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center gap-1 shrink-0", children: [
      /* @__PURE__ */ t(
        cn,
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
          className: y(
            "size-8 p-0",
            i ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" : ""
          ),
          children: /* @__PURE__ */ t(dr, { className: "size-4" })
        }
      )
    ] })
  ] });
}
function mn(e) {
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
  var m, f, c, p, b, x, v;
  const l = Oe(((c = (f = (m = e.relationships) == null ? void 0 : m.sender) == null ? void 0 : f.attributes) == null ? void 0 : c.name) || n), o = ((x = (b = (p = e.relationships) == null ? void 0 : p.sender) == null ? void 0 : b.attributes) == null ? void 0 : x.avatar_url) || void 0, u = mn(e.attributes.created_at), d = ((v = e.relationships) == null ? void 0 : v.attachments) ?? [];
  return /* @__PURE__ */ s(
    "div",
    {
      className: y(
        "flex items-start gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0",
        r && "ml-auto flex-row-reverse"
      ),
      children: [
        a && !r ? /* @__PURE__ */ t(
          xe,
          {
            name: l,
            src: o,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ) : r ? null : /* @__PURE__ */ t(
          xe,
          {
            name: n,
            src: i,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ s("div", { className: y("flex min-w-0 flex-col gap-1", r && "items-end"), children: [
          /* @__PURE__ */ t("span", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate", children: r ? "Tú" : l }),
          /* @__PURE__ */ s(
            "div",
            {
              className: y(
                "rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words",
                r ? "rounded-tr-xs bg-blue-600 text-white shadow-xs" : "rounded-tl-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs"
              ),
              children: [
                d.map((z) => z.attributes.file_mime_type.startsWith("image/") ? /* @__PURE__ */ t(
                  "a",
                  {
                    href: z.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10",
                    children: /* @__PURE__ */ t(
                      "img",
                      {
                        src: z.attributes.file_url,
                        alt: z.attributes.file_name,
                        className: "max-h-64 max-w-full object-contain rounded-xl",
                        loading: "lazy"
                      }
                    )
                  },
                  z.id
                ) : /* @__PURE__ */ s(
                  "a",
                  {
                    href: z.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    download: z.attributes.file_name,
                    className: "mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                    children: [
                      /* @__PURE__ */ t(cr, { className: "size-4 shrink-0" }),
                      /* @__PURE__ */ t("span", { className: "min-w-0 flex-1 truncate font-medium", children: z.attributes.file_name }),
                      /* @__PURE__ */ t(ur, { className: "size-3.5 shrink-0" })
                    ]
                  },
                  z.id
                )),
                e.attributes.body && d.length === 0 && /* @__PURE__ */ t("p", { className: "whitespace-pre-wrap break-words", children: e.attributes.body }),
                e.attributes.body && d.length > 0 && e.attributes.body !== "Archivo adjunto" && /* @__PURE__ */ t("p", { className: "whitespace-pre-wrap break-words mt-1", children: e.attributes.body }),
                /* @__PURE__ */ s("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none", children: [
                  /* @__PURE__ */ t(
                    "time",
                    {
                      dateTime: e.attributes.created_at,
                      className: r ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400",
                      children: u
                    }
                  ),
                  r && e.local_status === "sending" && /* @__PURE__ */ t(
                    xt,
                    {
                      className: "size-3 text-blue-200 animate-spin",
                      "aria-label": "Pendiente de envío"
                    }
                  ),
                  r && e.local_status === "sent" && /* @__PURE__ */ t(mr, { className: "size-3 text-blue-200", "aria-label": "Enviado" }),
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
function hn({
  conversation: e,
  messages: r,
  optimisticMessages: a = [],
  scrollRef: n,
  isFetchingNextPage: i = !1,
  hasNextPage: l = !1,
  isLoading: o = !1,
  isNearBottom: u = !0,
  newMessagesCount: d = 0,
  visibleDate: m = "Hoy",
  onScrollToBottom: f
}) {
  const { currentUserId: c } = ne(), p = Ge(e), b = Fe(e, c), x = Qe(e, c), v = new Set(
    r.flatMap((h) => h.messages.map((g) => g.id))
  ), z = a.filter(
    (h) => !v.has(h.id)
  ), _ = m.toLowerCase() === "hoy" || m.toLowerCase() === "today" || mt(m) === "Hoy";
  return /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 relative w-full overflow-hidden", children: /* @__PURE__ */ t(Ke, { ref: n, className: "relative z-10 h-full w-full", children: /* @__PURE__ */ s("div", { className: "space-y-4 p-3 sm:p-4 text-sm w-full min-w-0", children: [
    i && /* @__PURE__ */ s("div", { className: "flex items-center justify-center py-2 gap-2 text-xs text-neutral-500 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ t(Le, { className: "size-3.5 animate-spin text-blue-600" }),
      /* @__PURE__ */ t("span", { children: "Cargando mensajes anteriores..." })
    ] }),
    !l && r.length > 0 && /* @__PURE__ */ t("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400", children: "Inicio de la conversación" }) }),
    o && r.length === 0 && /* @__PURE__ */ s("div", { className: "space-y-4 py-2 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ s("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ t(T, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(T, { className: "h-3 w-20 rounded" }),
          /* @__PURE__ */ t(T, { className: "h-12 w-48 sm:w-64 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ t(T, { className: "h-14 w-52 sm:w-64 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) }),
      /* @__PURE__ */ s("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ t(T, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(T, { className: "h-3 w-16 rounded" }),
          /* @__PURE__ */ t(T, { className: "h-16 w-56 sm:w-72 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ t(T, { className: "h-10 w-36 sm:w-44 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ t("div", { className: "sticky top-1 z-20 flex justify-center pointer-events-none mb-2 transition-all duration-200", children: /* @__PURE__ */ t("div", { className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs", children: /* @__PURE__ */ t("span", { children: _ ? "Hoy" : mt(m) }) }) }),
    [...r ?? []].reverse().map((h) => /* @__PURE__ */ s(
      "div",
      {
        "data-date-group": h.date,
        className: "space-y-4",
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: mt(h.date) }) }),
          [...h.messages].reverse().map((g) => {
            var k, D;
            const P = String((D = (k = g == null ? void 0 : g.relationships) == null ? void 0 : k.sender) == null ? void 0 : D.id) === String(c);
            return /* @__PURE__ */ t(
              "div",
              {
                "data-message-date": h.date,
                className: "w-full",
                children: /* @__PURE__ */ t(
                  Mt,
                  {
                    message: P ? { ...g, local_status: "sent" } : g,
                    isOwnMessage: P,
                    isGroup: p,
                    conversationName: b,
                    conversationAvatarUrl: (x == null ? void 0 : x.attributes.avatar_url) || void 0
                  }
                )
              },
              g.id
            );
          })
        ]
      },
      h.date
    )),
    z.length > 0 && /* @__PURE__ */ s("div", { "data-date-group": "Hoy", className: "space-y-4", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: "Hoy" }) }),
      [...z].map((h) => {
        var g;
        return /* @__PURE__ */ t(
          "div",
          {
            "data-message-date": ((g = h.attributes.created_at) == null ? void 0 : g.slice(0, 10)) || "Hoy",
            className: "w-full",
            children: /* @__PURE__ */ t(
              Mt,
              {
                message: h,
                isOwnMessage: !0,
                isGroup: p,
                conversationName: b,
                conversationAvatarUrl: (x == null ? void 0 : x.attributes.avatar_url) || void 0
              }
            )
          },
          h.id
        );
      })
    ] }),
    !u && f && /* @__PURE__ */ t("div", { className: "sticky bottom-2 z-30 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200", children: /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        onClick: f,
        className: "pointer-events-auto relative flex size-9 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95 cursor-pointer",
        "aria-label": "Desplazar a mensajes recientes",
        title: "Desplazar a mensajes recientes",
        children: [
          /* @__PURE__ */ t(hr, { className: "size-4" }),
          d > 0 && /* @__PURE__ */ t(
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
function fn({
  inputText: e,
  setInputText: r,
  onSendMessage: a,
  onSelectFile: n,
  pendingFile: i,
  onRemoveFile: l,
  isSending: o,
  isUploading: u,
  conversationName: d,
  isClosed: m = !1,
  readOnly: f = !1,
  readOnlyMessage: c
}) {
  const p = O(null), b = 120, x = de(
    () => i && i.type.startsWith("image/") ? URL.createObjectURL(i) : void 0,
    [i]
  );
  if (B(() => () => {
    x && URL.revokeObjectURL(x);
  }, [x]), It(() => {
    const h = p.current;
    if (!h) return;
    h.style.height = "auto";
    const g = Math.min(h.scrollHeight, b);
    h.style.height = `${g}px`, h.style.overflowY = h.scrollHeight > b ? "auto" : "hidden";
  }, [e]), m || f)
    return /* @__PURE__ */ t("div", { className: "shrink-0 px-3 pb-3 pt-1 text-center sm:px-4 sm:pb-4", children: /* @__PURE__ */ s("div", { className: "flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-white/85 dark:border-neutral-800/80 dark:bg-neutral-900/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 shadow-xs dark:text-neutral-400", children: [
      /* @__PURE__ */ t(ke, { className: "size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" }),
      /* @__PURE__ */ t("span", { children: c || (m ? "Esta conversación ha sido finalizada y no admite nuevos mensajes." : "No se permite enviar mensajes en esta conversación.") })
    ] }) });
  const v = (h) => {
    h.key === "Enter" && !h.shiftKey && (h.preventDefault(), a());
  }, z = (h) => {
    var P;
    const g = (P = h.target.files) == null ? void 0 : P[0];
    g && n(g), h.target.value = "";
  }, _ = (h) => {
    var P;
    if (o || u) return;
    const g = (P = h.clipboardData) == null ? void 0 : P.items;
    if (g)
      for (let k = 0; k < g.length; k++) {
        const D = g[k];
        if (D.kind === "file" && D.type.startsWith("image/")) {
          const C = D.getAsFile();
          if (C) {
            h.preventDefault(), n(C);
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
          src: x || "",
          alt: "Archivo seleccionado",
          className: "size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
        }
      ) : /* @__PURE__ */ t("div", { className: "flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ t(jt, { className: "size-5" }) }),
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
          children: /* @__PURE__ */ t(ce, { className: "size-3.5" })
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
            /* @__PURE__ */ t(jt, { className: "size-4" }),
            /* @__PURE__ */ t(
              "input",
              {
                type: "file",
                className: "sr-only",
                onChange: z,
                disabled: o || u
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ t(
        Ct,
        {
          ref: p,
          value: e,
          onChange: (h) => r(h.target.value),
          onKeyDown: v,
          onPaste: _,
          placeholder: `Responder a ${d}...`,
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
          disabled: !e.trim() && !i || o || u,
          className: "size-8 shrink-0 rounded-full p-0",
          "aria-label": "Enviar mensaje",
          title: "Enviar mensaje",
          children: /* @__PURE__ */ t(Ut, { className: "size-4" })
        }
      )
    ] })
  ] }) });
}
function pn({ className: e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "aria-hidden": "true",
      className: y(
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
function bn({
  conversation: e,
  onToggleContextPanel: r,
  isContextPanelOpen: a = !0,
  onBack: n,
  alwaysShowBackButton: i = !1,
  onCloseSuccess: l,
  showHeader: o = !0,
  showWallpaper: u = !0,
  readOnly: d = !1,
  readOnlyMessage: m,
  showComposer: f = !0
}) {
  const c = on(e, {
    onCloseSuccess: () => {
      l == null || l(), n == null || n();
    }
  }), [p, b] = S(!1), x = O(0), v = d || c.isClosed || c.isSending || c.isUploading;
  return /* @__PURE__ */ s(
    "div",
    {
      className: "sdi-messenger-root relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
      onDragEnter: (k) => {
        if (k.preventDefault(), k.stopPropagation(), v) return;
        k.dataTransfer.types && Array.from(k.dataTransfer.types).includes("Files") && (x.current += 1, b(!0));
      },
      onDragOver: (k) => {
        k.preventDefault(), k.stopPropagation(), !v && (k.dataTransfer.dropEffect = "copy");
      },
      onDragLeave: (k) => {
        k.preventDefault(), k.stopPropagation(), x.current -= 1, x.current <= 0 && (x.current = 0, b(!1));
      },
      onDrop: (k) => {
        if (k.preventDefault(), k.stopPropagation(), x.current = 0, b(!1), v) return;
        const D = k.dataTransfer.files;
        if (D && D.length > 0) {
          const C = D[0];
          C.type.startsWith("image/") && c.handleSelectFile(C);
        }
      },
      onPaste: (k) => {
        var C;
        if (v) return;
        const D = (C = k.clipboardData) == null ? void 0 : C.items;
        if (D)
          for (let I = 0; I < D.length; I++) {
            const A = D[I];
            if (A.kind === "file" && A.type.startsWith("image/")) {
              const w = A.getAsFile();
              if (w) {
                k.preventDefault(), c.handleSelectFile(w);
                return;
              }
            }
          }
      },
      children: [
        o && /* @__PURE__ */ t(
          un,
          {
            conversation: e,
            isClosed: c.isClosed,
            isClosing: c.isClosing,
            onCloseConversation: c.handleCloseConversation,
            isContextPanelOpen: a,
            onToggleContextPanel: r,
            onBack: n,
            alwaysShowBackButton: i
          }
        ),
        /* @__PURE__ */ s("div", { className: "relative flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[#f4f6f8]/70 dark:bg-[#0a0f1d]", children: [
          u && /* @__PURE__ */ t(pn, {}),
          p && /* @__PURE__ */ t("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xs border-2 border-dashed border-blue-500/70 dark:border-blue-400/70 rounded-2xl m-2 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95", children: /* @__PURE__ */ s("div", { className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-xl border border-blue-500/20 text-center max-w-xs mx-4", children: [
            /* @__PURE__ */ t("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-inner", children: /* @__PURE__ */ t(fr, { className: "size-7 animate-bounce" }) }),
            /* @__PURE__ */ s("div", { children: [
              /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-neutral-800 dark:text-neutral-100", children: "Suelta tu imagen aquí" }),
              /* @__PURE__ */ t("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Se adjuntará para que puedas enviarla" })
            ] })
          ] }) }),
          /* @__PURE__ */ t(
            hn,
            {
              conversation: e,
              messages: c.messages,
              optimisticMessages: c.optimisticMessages,
              scrollRef: c.scrollRef,
              isFetchingNextPage: c.isFetchingNextPage,
              hasNextPage: c.hasNextPage,
              isLoading: c.isLoading,
              isNearBottom: c.isNearBottom,
              newMessagesCount: c.newMessagesCount,
              visibleDate: c.visibleDate,
              onScrollToBottom: c.scrollToBottom
            }
          ),
          c.typingUser && !d && /* @__PURE__ */ s("div", { className: "relative z-10 flex shrink-0 items-center gap-1.5 px-4 py-1 text-xs text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-150", children: [
            /* @__PURE__ */ s("span", { className: "font-medium", children: [
              c.typingUser,
              " está escribiendo"
            ] }),
            /* @__PURE__ */ s("span", { className: "inline-flex gap-0.5", "aria-hidden": "true", children: [
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse" }),
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-75" }),
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-150" })
            ] })
          ] }),
          f && /* @__PURE__ */ t("div", { className: "relative z-10 w-full", children: /* @__PURE__ */ t(
            fn,
            {
              inputText: c.inputText,
              setInputText: c.setInputText,
              onSendMessage: c.handleSendMessage,
              onSelectFile: c.handleSelectFile,
              pendingFile: c.pendingFile,
              onRemoveFile: () => c.setPendingFile(null),
              isSending: c.isSending,
              isUploading: c.isUploading,
              conversationName: c.conversationName,
              isClosed: c.isClosed,
              readOnly: d,
              readOnlyMessage: m
            }
          ) })
        ] })
      ]
    }
  );
}
function xn({
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
        /* @__PURE__ */ t(gt, { className: "size-4 text-emerald-600 dark:text-emerald-400" }),
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
          children: /* @__PURE__ */ t(ce, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4", children: [
      /* @__PURE__ */ s("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ t("div", { className: "size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(xt, { className: "size-7" }) }),
        /* @__PURE__ */ t("div", { className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ t(tt, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "Ticket de Soporte Creado" }),
        /* @__PURE__ */ t("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed", children: e })
      ] }),
      r && /* @__PURE__ */ s("div", { className: "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200", children: [
            /* @__PURE__ */ t(pr, { className: "size-3.5 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ s("span", { children: [
              "Ticket #",
              o
            ] })
          ] }),
          /* @__PURE__ */ t(fe, { variant: "outline", className: "text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", children: r.status === "created" ? "Registrado" : r.status })
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
            /* @__PURE__ */ t(br, { className: "size-3.5" }),
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
            /* @__PURE__ */ t(vt, { className: "size-3.5" }),
            /* @__PURE__ */ t("span", { children: "Ver mis chats" })
          ]
        }
      )
    ] })
  ] });
}
function Zt(e, r = 300) {
  const [a, n] = S(e);
  return B(() => {
    const i = setTimeout(() => {
      n(e);
    }, r);
    return () => {
      clearTimeout(i);
    };
  }, [e, r]), a;
}
const gn = (e) => {
  var n, i, l, o, u, d;
  const r = (e == null ? void 0 : e.params) ?? {}, a = ft({
    queryKey: ["list-chat-users", r],
    queryFn: () => Er(r),
    placeholderData: Rt,
    refetchOnWindowFocus: !1,
    enabled: (e == null ? void 0 : e.enable) !== !1
  });
  return {
    data: ((n = a.data) == null ? void 0 : n.data.data) ?? [],
    meta: (l = (i = a.data) == null ? void 0 : i.data) == null ? void 0 : l.meta,
    links: (u = (o = a.data) == null ? void 0 : o.data) == null ? void 0 : u.links,
    isLoading: a.isPending,
    errors: ((d = a.error) == null ? void 0 : d.data) ?? {},
    refetch: a.refetch
  };
}, vn = () => {
  const e = Ce(), r = V(async (a) => {
    const n = await Ka(a);
    return await e.invalidateQueries({ queryKey: ["list-conversations"] }), n.data.data;
  }, [e]);
  return ze(
    r
  );
};
function wn({
  open: e,
  onOpenChange: r,
  onSuccess: a
}) {
  const { currentUserId: n } = ne(), [i, l] = S("direct"), [o, u] = S(""), d = Zt(o, 300), [m, f] = S(null), [c, p] = S([]), [b, x] = S(""), { data: v, isLoading: z } = gn({
    enable: e,
    params: {
      sort: "name",
      paginate: "false",
      ...d.trim() ? { filter: { name: d.trim() } } : {}
    }
  }), { mutateAsync: _, isLoading: h } = vn(), g = de(() => (v || []).filter((w) => String(w.id) !== String(n)), [v, n]), P = (w) => {
    p((M) => M.some((L) => L.id === w.id) ? M.filter((L) => L.id !== w.id) : [...M, w]);
  }, k = (w) => {
    p((M) => M.filter((q) => q.id !== w));
  }, D = () => {
    f(null), p([]), x(""), u(""), l("direct");
  }, C = (w) => {
    w || D(), r(w);
  }, I = async (w) => {
    var M, q, L, E;
    if (w.preventDefault(), i === "direct") {
      if (!m) {
        ae.warning("Por favor, selecciona un usuario para iniciar la conversación.");
        return;
      }
      try {
        const j = await _({
          type: "direct",
          user_id: Number(m),
          sender_id: Number(n)
        });
        ae.success("Conversación iniciada correctamente"), C(!1), a && j && a(j);
      } catch (j) {
        const te = ((q = (M = j == null ? void 0 : j.response) == null ? void 0 : M.data) == null ? void 0 : q.message) || (j == null ? void 0 : j.message) || "Error al iniciar la conversación";
        ae.error(te);
      }
    } else {
      if (!b.trim()) {
        ae.warning("Por favor, ingresa el nombre del grupo.");
        return;
      }
      if (c.length === 0) {
        ae.warning("Por favor, selecciona al menos un participante para el grupo.");
        return;
      }
      try {
        const j = await _({
          type: "group",
          name: b.trim(),
          user_ids: c.map((te) => Number(te.id)),
          sender_id: Number(n)
        });
        ae.success("Grupo creado correctamente"), C(!1), a && j && a(j);
      } catch (j) {
        const te = ((E = (L = j == null ? void 0 : j.response) == null ? void 0 : L.data) == null ? void 0 : E.message) || (j == null ? void 0 : j.message) || "Error al crear el grupo";
        ae.error(te);
      }
    }
  }, A = h || i === "direct" && !m || i === "group" && (!b.trim() || c.length === 0);
  return /* @__PURE__ */ t(Hr, { open: e, onOpenChange: C, children: /* @__PURE__ */ t(Br, { className: "sm:max-w-[480px]", children: /* @__PURE__ */ s("form", { onSubmit: I, className: "flex flex-col", children: [
    /* @__PURE__ */ s(qr, { children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ t("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ t(qe, { className: "size-5" }) }),
        /* @__PURE__ */ s("div", { className: "text-left pr-6", children: [
          /* @__PURE__ */ t(Or, { children: "Nueva Conversación" }),
          /* @__PURE__ */ t($r, { children: "Inicia un chat directo o crea un grupo de conversación" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-3.5", children: /* @__PURE__ */ t(
        Kt,
        {
          value: i,
          onValueChange: (w) => l(w),
          className: "w-full",
          children: /* @__PURE__ */ s(Gt, { className: "w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ s(
              nt,
              {
                value: "direct",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ t(rt, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { children: "Directo (1 a 1)" })
                ]
              }
            ),
            /* @__PURE__ */ s(
              nt,
              {
                value: "group",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ t(pt, { className: "size-3.5" }),
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
          kt,
          {
            placeholder: "Ej. Soporte Técnico L2, Equipo Infraestructura...",
            value: b,
            onChange: (w) => x(w.target.value),
            className: "h-9 text-xs",
            required: !0
          }
        )
      ] }),
      i === "group" && c.length > 0 && /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400", children: [
          /* @__PURE__ */ s("span", { children: [
            "Participantes seleccionados (",
            c.length,
            ")"
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => p([]),
              className: "text-[10px] text-red-500 hover:underline cursor-pointer",
              children: "Quitar todos"
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800", children: c.map((w) => {
          const M = Oe(w.attributes.name);
          return /* @__PURE__ */ s(
            fe,
            {
              variant: "secondary",
              className: "gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
              children: [
                /* @__PURE__ */ t(
                  xe,
                  {
                    name: M,
                    src: w.attributes.avatar_url,
                    size: "xs"
                  }
                ),
                /* @__PURE__ */ t("span", { className: "max-w-28 truncate font-medium capitalize", children: M }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: () => k(w.id),
                    className: "rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
                    children: /* @__PURE__ */ t(ce, { className: "size-3" })
                  }
                )
              ]
            },
            w.id
          );
        }) })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between", children: [
          /* @__PURE__ */ t("span", { children: i === "direct" ? "Selecciona un usuario" : "Añadir participantes" }),
          /* @__PURE__ */ s("span", { className: "text-[10px] font-normal text-neutral-400", children: [
            g.length,
            " disponibles"
          ] })
        ] }),
        /* @__PURE__ */ s("div", { className: "relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
          /* @__PURE__ */ t(Wt, { className: "size-3.5 shrink-0 text-neutral-400" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              placeholder: "Buscar por nombre...",
              value: o,
              onChange: (w) => u(w.target.value),
              className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
            }
          ),
          o && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => u(""),
              className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer",
              children: /* @__PURE__ */ t(ce, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden", children: /* @__PURE__ */ t(Ke, { className: "h-56 sm:h-64 w-full", children: z ? /* @__PURE__ */ s("div", { className: "flex h-56 items-center justify-center gap-2 text-xs text-neutral-500", children: [
        /* @__PURE__ */ t(Le, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ t("span", { children: "Cargando usuarios..." })
      ] }) : g.length === 0 ? /* @__PURE__ */ s("div", { className: "flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500", children: [
        /* @__PURE__ */ t("p", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: "No se encontraron usuarios" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] mt-1", children: "Prueba con otro término de búsqueda" })
      ] }) : /* @__PURE__ */ t("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5", children: g.map((w) => {
        const M = m === w.id, q = c.some((j) => j.id === w.id), L = i === "direct" ? M : q, E = Oe(w.attributes.name);
        return /* @__PURE__ */ s(
          "div",
          {
            onClick: () => {
              i === "direct" ? f(w.id) : P(w);
            },
            className: y(
              "flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors",
              L ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium" : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200"
            ),
            children: [
              /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
                /* @__PURE__ */ t(
                  xe,
                  {
                    name: E,
                    src: w.attributes.avatar_url,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t("p", { className: "truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize", children: E }) })
              ] }),
              /* @__PURE__ */ t("div", { className: "shrink-0 pl-1", children: /* @__PURE__ */ t(
                "div",
                {
                  className: y(
                    "flex size-5 items-center justify-center rounded-full border transition-all",
                    L ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent"
                  ),
                  children: /* @__PURE__ */ t(xr, { className: "size-3 stroke-[2.5]" })
                }
              ) })
            ]
          },
          w.id
        );
      }) }) }) })
    ] }),
    /* @__PURE__ */ s(Vr, { children: [
      /* @__PURE__ */ t(
        U,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => C(!1),
          disabled: h,
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
          disabled: A,
          className: "text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer",
          children: h ? /* @__PURE__ */ s(be, { children: [
            /* @__PURE__ */ t(Le, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ t("span", { children: "Creando..." })
          ] }) : /* @__PURE__ */ s(be, { children: [
            /* @__PURE__ */ t(qe, { className: "size-3.5" }),
            /* @__PURE__ */ t("span", { children: i === "direct" ? "Iniciar Chat" : "Crear Grupo" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const Nn = (e) => {
  var n, i, l, o, u;
  const r = (e == null ? void 0 : e.params) ?? {}, a = ft({
    queryKey: ["list-conversations", r],
    queryFn: () => Va(r),
    placeholderData: Rt,
    refetchOnWindowFocus: !1,
    enabled: (e == null ? void 0 : e.enable) !== !1
  });
  return {
    data: ((n = a.data) == null ? void 0 : n.data.data) ?? [],
    meta: (l = (i = a.data) == null ? void 0 : i.data) == null ? void 0 : l.meta,
    links: (o = a.data) == null ? void 0 : o.data.links,
    isLoading: a.isPending,
    errors: ((u = a.error) == null ? void 0 : u.data) ?? {},
    refetch: a.refetch
  };
}, yn = ({
  showToastOnUnread: e = !0
} = {}) => {
  const r = Ce(), { config: a, currentUser: n, currentUserId: i } = ne(), l = oe({
    permission: ["messenger_chat.read"]
  }), [o, u] = S("0"), [d, m] = S("all"), [f, c] = S(""), p = Zt(f, 300), b = de(() => {
    const W = {
      closed: o
    };
    return d !== "all" && (W.type = d), p.trim() && (W.name = p.trim()), {
      user_id: i,
      paginate: "false",
      ...Object.keys(W).length > 0 ? { filter: W } : {}
    };
  }, [o, d, p, i]), {
    data: x,
    isLoading: v,
    errors: z,
    refetch: _
  } = Nn({
    params: b,
    enable: !!i && l
  }), [h, g] = S(""), [P, k] = S(!1), [D, C] = S(!1), [I, A] = S(!1), w = V(
    (W) => {
      if (i && String(W.message.sender_id) !== String(i)) {
        const ge = String(W.conversation_id) === h;
        st(ge ? "focused" : "unfocused");
      }
      e && String(W.conversation_id) !== h && (ae.info("Nuevo mensaje", {
        id: `conversation-message-${W.message.id}`,
        description: W.message.body || "Tienes un mensaje nuevo",
        action: {
          label: "Abrir",
          onClick: () => {
            g(String(W.conversation_id)), C(!0);
          }
        }
      }), st("unfocused")), r.invalidateQueries({ queryKey: ["list-conversations"] }), _();
    },
    [i, r, _, h, e]
  ), M = V(() => {
    r.invalidateQueries({ queryKey: ["list-conversations"] }), _();
  }, [r, _]);
  B(() => {
    if (i)
      return Jt(
        a.reverb,
        i,
        w,
        M
      );
  }, [a.reverb, M, w, i]);
  const q = de(
    () => x.find((W) => W.id === h),
    [x, h]
  );
  return {
    conversations: x,
    selectedId: h,
    setSelectedId: g,
    selectedConversation: q,
    closedFilter: o,
    setClosedFilter: u,
    typeFilter: d,
    setTypeFilter: m,
    searchQuery: f,
    setSearchQuery: c,
    isContextPanelOpen: P,
    isMobileChatOpen: D,
    isNewConversationOpen: I,
    isLoading: v,
    errors: z,
    hasReadPermission: l,
    currentUser: n,
    currentUserId: i,
    selectConversation: (W) => {
      g(W), C(!0);
    },
    unselectConversation: () => {
      g(""), C(!1);
    },
    setIsContextPanelOpen: k,
    setIsNewConversationOpen: A,
    goBackToConversationList: () => C(!1),
    handleConversationCreated: (W) => {
      g(W.id), C(!0), A(!1), r.invalidateQueries({ queryKey: ["list-conversations"] }), _();
    }
  };
}, kn = (e) => ee({
  url: `${Z("helpdesk", "v1")}/requests/chat-support`,
  method: "POST",
  data: e
}), Cn = () => {
  const e = Ce(), r = V(async (a) => {
    var l;
    const n = await kn(a), i = ((l = n.data) == null ? void 0 : l.data) ?? n.data;
    return i != null && i.conversation_id && await e.invalidateQueries({ queryKey: ["list-conversations"] }), i;
  }, [e]);
  return ze(
    r
  );
}, er = ["/messenger"];
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
function zn({
  hiddenPaths: e = er,
  showOnlyPaths: r,
  hideCondition: a,
  hidden: n = !1,
  currentPath: i
}) {
  const [l, o] = S(() => i !== void 0 ? i : typeof window < "u" ? window.location.pathname : "");
  return B(() => {
    if (i !== void 0) {
      o(i);
      return;
    }
    if (typeof window > "u") return;
    const d = () => {
      const f = window.location.pathname;
      o((c) => c !== f ? f : c);
    };
    d(), window.addEventListener("popstate", d), window.addEventListener("pushstate", d), window.addEventListener("replacestate", d), window.addEventListener("locationchange", d);
    const m = window.setInterval(d, 150);
    return () => {
      window.removeEventListener("popstate", d), window.removeEventListener("pushstate", d), window.removeEventListener("replacestate", d), window.removeEventListener("locationchange", d), window.clearInterval(m);
    };
  }, [i]), { shouldHide: de(() => n ? !0 : l ? !!(a && a(l) || r && r.length > 0 && !r.some((m) => Lt(l, m)) || e && e.length > 0 && e.some((m) => Lt(l, m))) : !1, [l, n, a, r, e]), pathname: l };
}
const Ft = "sdi_floating_chat_corner";
function _n(e = "bottom-right") {
  const r = O(null), [a, n] = S(e), [i, l] = S(!1), [o, u] = S(null), d = O({ startX: 0, startY: 0, rect: new DOMRect(), moved: !1 }), m = O(!1), f = O(null);
  B(() => {
    try {
      const _ = localStorage.getItem(Ft);
      _ && ["bottom-right", "bottom-left", "top-right", "top-left"].includes(_) && n(_);
    } catch {
    }
  }, []);
  const c = (_) => {
    n(_);
    try {
      localStorage.setItem(Ft, _);
    } catch {
    }
  }, p = (_) => {
    if (_.button !== 0 && _.pointerType === "mouse") return;
    const h = r.current;
    if (!h) return;
    const g = h.getBoundingClientRect();
    d.current = {
      startX: _.clientX,
      startY: _.clientY,
      rect: g,
      moved: !1
    };
    const P = _.clientX - g.left, k = _.clientY - g.top, D = (I) => {
      Math.hypot(
        I.clientX - d.current.startX,
        I.clientY - d.current.startY
      ) > 5 && (d.current.moved || (d.current.moved = !0, l(!0)), f.current && cancelAnimationFrame(f.current), f.current = requestAnimationFrame(() => {
        const w = Math.max(
          12,
          Math.min(window.innerWidth - g.width - 12, I.clientX - P)
        ), M = Math.max(
          12,
          Math.min(window.innerHeight - g.height - 12, I.clientY - k)
        );
        u({ x: w, y: M });
      }));
    }, C = (I) => {
      if (window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", C), window.removeEventListener("pointercancel", C), f.current && cancelAnimationFrame(f.current), d.current.moved) {
        m.current = !0, setTimeout(() => {
          m.current = !1;
        }, 100);
        const A = I.clientX > window.innerWidth / 2, M = I.clientY > window.innerHeight / 2 ? A ? "bottom-right" : "bottom-left" : A ? "top-right" : "top-left";
        c(M), l(!1), u(null);
      }
    };
    window.addEventListener("pointermove", D), window.addEventListener("pointerup", C), window.addEventListener("pointercancel", C);
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
    changeCorner: c
  };
}
function Sn({
  isOpen: e,
  totalUnreadCount: r,
  isLeft: a,
  isLoading: n = !1,
  hasError: i = !1,
  onToggleOpen: l,
  onPointerDown: o
}) {
  const u = () => e ? "bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rotate-90 shadow-2xl" : i ? "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/40 shadow-rose-500/30" : n ? "bg-blue-600/90 text-white" : "bg-blue-600 hover:bg-blue-700 text-white", d = () => e ? "Cerrar chat de soporte" : i ? "Error de conexión en el chat (Haz clic para ver detalles o reintentar)" : n ? "Conectando al chat de soporte..." : r > 0 ? `Abrir chat de soporte (${r} mensaje${r === 1 ? "" : "s"} sin leer)` : "Abrir chat de soporte";
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
            className: y(
              "flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40",
              u()
            ),
            "aria-label": d(),
            title: d(),
            children: e ? /* @__PURE__ */ t(ce, { className: "size-6 transition-transform duration-200 text-white" }) : i ? /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center animate-in zoom-in-75 duration-200", children: /* @__PURE__ */ t(wt, { className: "size-6 transition-transform duration-200 text-white" }) }) : n ? /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ t(Le, { className: "size-6 animate-spin text-white" }) }) : /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ t(gr, { className: "size-6 transition-transform duration-200" }) })
          }
        ),
        !e && i && /* @__PURE__ */ s(
          "span",
          {
            className: y(
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
            className: y(
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
const jn = "1.2.1", Tn = {
  version: jn
}, tr = Tn.version;
function _t({
  onNewConversation: e,
  showNewButton: r = !0,
  className: a
}) {
  var m, f;
  const { currentUser: n, isLoadingUser: i, hasError: l } = ne(), o = oe({
    permission: ["messenger_chat_support.provide_support"]
  }), u = Oe((m = n == null ? void 0 : n.attributes) == null ? void 0 : m.name) || "Usuario", d = ((f = n == null ? void 0 : n.attributes) == null ? void 0 : f.email) || "Mi cuenta";
  return l ? /* @__PURE__ */ s(
    "div",
    {
      className: y(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        a
      ),
      children: [
        /* @__PURE__ */ t(vr, { className: "size-3.5 shrink-0 text-red-500" }),
        /* @__PURE__ */ t("span", { className: "truncate text-[11px] font-medium", children: "Sin conexión • No disponible" })
      ]
    }
  ) : i ? /* @__PURE__ */ s(
    "div",
    {
      className: y(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ t(T, { className: "size-8 rounded-full" }),
          /* @__PURE__ */ s("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
            /* @__PURE__ */ t(T, { className: "h-3 w-20" }),
            /* @__PURE__ */ t(T, { className: "h-2.5 w-32" })
          ] })
        ] }),
        r && /* @__PURE__ */ t(T, { className: "size-8 rounded-lg shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ s(
    "div",
    {
      className: y(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ t(xe, { src: n == null ? void 0 : n.attributes.avatar_url, name: u, size: "sm" }),
          /* @__PURE__ */ s("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ t("p", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: u }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400 mt-0.5", children: [
              /* @__PURE__ */ t("span", { className: "truncate", children: d }),
              /* @__PURE__ */ t("span", { className: "text-neutral-300 dark:text-neutral-700 select-none", children: "•" }),
              /* @__PURE__ */ s("span", { className: "font-mono text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0", children: [
                "v",
                tr
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
            children: /* @__PURE__ */ t(qe, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function Dn({
  title: e,
  canRequestSupport: r,
  canViewChatList: a,
  totalUnreadCount: n,
  conversationsCount: i,
  onRequestSupport: l,
  onViewChatList: o,
  onClose: u,
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
              /* @__PURE__ */ t("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md", children: /* @__PURE__ */ t(ht, { className: "size-5 text-white" }) }),
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
                onPointerDown: (f) => f.stopPropagation(),
                onClick: u,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ t(ce, { className: "size-4" })
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
              /* @__PURE__ */ t("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: /* @__PURE__ */ t(ht, { className: "size-5" }) }),
              /* @__PURE__ */ s("div", { children: [
                /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Solicitar Asistencia" }),
                /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Ingresa asunto y mensaje para iniciar soporte" })
              ] })
            ] }),
            /* @__PURE__ */ t(Tt, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
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
                /* @__PURE__ */ t(vt, { className: "size-5" }),
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
            /* @__PURE__ */ t(Tt, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ s("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30 p-3 mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs", children: [
            /* @__PURE__ */ t(gt, { className: "size-3.5 text-emerald-600" }),
            /* @__PURE__ */ t("span", { children: "Mesa de Ayuda SDI" })
          ] }),
          /* @__PURE__ */ s("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500", children: [
            "v",
            tr
          ] })
        ] }),
        /* @__PURE__ */ t("p", { className: "leading-relaxed", children: "Tus solicitudes quedan registradas con trazabilidad y número de ticket en la plataforma de Helpdesk." })
      ] })
    ] }),
    /* @__PURE__ */ t(_t, { onNewConversation: d })
  ] });
}
function Pn({
  userId: e,
  userName: r,
  onSubmit: a,
  isSubmitting: n = !1,
  error: i = null,
  onCancel: l
}) {
  const [o, u] = S(""), [d, m] = S(""), [f, c] = S(null);
  return /* @__PURE__ */ s("form", { onSubmit: (b) => {
    b.preventDefault(), c(null);
    const x = o.trim(), v = d.trim();
    if (!x) {
      c("Por favor ingresa el asunto de tu solicitud.");
      return;
    }
    if (!v) {
      c("Por favor describe el detalle de tu consulta.");
      return;
    }
    if (!e) {
      c("No se pudo identificar el usuario actual para la solicitud.");
      return;
    }
    a({
      subject: x,
      message: v,
      user_id: e
    });
  }, className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ s("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100", children: [
      /* @__PURE__ */ t("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/90 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 p-3.5 shadow-2xs space-y-2", children: /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ t(ht, { className: "size-4.5" }) }),
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
      (f || i) && /* @__PURE__ */ s("div", { className: "flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ t(wr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ s("div", { className: "flex-1 leading-snug", children: [
          /* @__PURE__ */ t("span", { className: "font-medium", children: "Error en el formulario:" }),
          " ",
          f || i
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ s("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ t(Nr, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ t("span", { children: "Asunto de la consulta" }),
          /* @__PURE__ */ t("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ t("div", { className: "relative", children: /* @__PURE__ */ t(
          kt,
          {
            value: o,
            onChange: (b) => {
              u(b.target.value), f && c(null);
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
          /* @__PURE__ */ t(yr, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ t("span", { children: "Detalle o descripción" }),
          /* @__PURE__ */ t("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ s("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ t(
            Ct,
            {
              value: d,
              onChange: (b) => {
                m(b.target.value), f && c(null);
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
              d.length,
              "/1000"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "flex items-start gap-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 p-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: [
        /* @__PURE__ */ t(gt, { className: "size-4 shrink-0 text-neutral-400 mt-0.5" }),
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
          disabled: n || !o.trim() || !d.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          children: n ? /* @__PURE__ */ s(be, { children: [
            /* @__PURE__ */ t(Le, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ t("span", { children: "Enviando solicitud..." })
          ] }) : /* @__PURE__ */ s(be, { children: [
            /* @__PURE__ */ t("span", { children: "Iniciar soporte" }),
            /* @__PURE__ */ t(Ut, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] });
}
function An({
  userId: e,
  userName: r,
  canViewChatList: a,
  totalUnreadCount: n,
  isSubmitting: i,
  error: l,
  onHome: o,
  onViewChats: u,
  onClose: d,
  onSubmit: m,
  onNewConversation: f,
  onDragStart: c
}) {
  return /* @__PURE__ */ s("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ t(
      "div",
      {
        onPointerDown: c,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-3.5 py-4 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: /* @__PURE__ */ s("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ s(
              U,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: o,
                className: "h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ t(bt, { className: "size-3.5" }),
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
                onPointerDown: (p) => p.stopPropagation(),
                onClick: u,
                title: "Ver mis chats",
                className: "relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1",
                children: [
                  /* @__PURE__ */ t(vt, { className: "size-3.5" }),
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
                onPointerDown: (p) => p.stopPropagation(),
                onClick: d,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ t(ce, { className: "size-4" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 overflow-hidden flex flex-col", children: e && /* @__PURE__ */ t(
      Pn,
      {
        userId: e,
        userName: r,
        onSubmit: m,
        isSubmitting: i,
        error: l,
        onCancel: o
      }
    ) }),
    /* @__PURE__ */ t(_t, { onNewConversation: f })
  ] });
}
const En = [
  { id: "all", label: "Todos", icon: null },
  { id: "direct", label: "Directos", icon: rt },
  { id: "group", label: "Grupos", icon: pt },
  { id: "bot", label: "Bots", icon: kr }
], Mn = () => /* @__PURE__ */ s("div", { className: "flex w-full min-w-0 items-center gap-2.5 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-800/20", children: [
  /* @__PURE__ */ t(T, { className: "size-9.5 rounded-full shrink-0" }),
  /* @__PURE__ */ s("div", { className: "flex-1 min-w-0 space-y-2", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t(T, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ t(T, { className: "h-2.5 w-10" })
    ] }),
    /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t(T, { className: "h-2.5 w-36" }),
      /* @__PURE__ */ t(T, { className: "h-3.5 w-6 rounded-full" })
    ] })
  ] })
] }), Ln = ({
  conversation: e,
  selectedId: r,
  currentUserId: a,
  onSelectConversation: n
}) => {
  var b, x, v;
  const i = Ge(e), l = e.type === "bot" || ((b = e.attributes) == null ? void 0 : b.type) === "bot", o = !!e.attributes.closed_at, u = Qe(e, a), d = Fe(e, a), m = ((v = (x = e.relationships) == null ? void 0 : x.users) == null ? void 0 : v.length) || 0, f = i ? "Grupo" : l ? "Bot de Asistencia" : "Conversación directa";
  let c = "";
  try {
    c = at(
      Nt(e.attributes.updated_at || e.attributes.created_at),
      "dd/MM HH:mm"
    );
  } catch {
    c = "";
  }
  const p = r === e.id;
  return /* @__PURE__ */ t(
    "div",
    {
      onClick: () => n(e.id),
      "aria-current": p ? "true" : void 0,
      className: y(
        "group relative flex w-full min-w-0 cursor-pointer select-none flex-col gap-1.5 overflow-hidden rounded-xl p-3 transition-all",
        p ? "bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900" : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent"
      ),
      children: /* @__PURE__ */ s("div", { className: "flex items-start gap-2.5 min-w-0", children: [
        /* @__PURE__ */ t(
          xe,
          {
            src: u == null ? void 0 : u.attributes.avatar_url,
            name: d,
            isGroup: i,
            size: "md",
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ s("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("h4", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: d }),
              i && /* @__PURE__ */ s("span", { className: "text-[10px] text-neutral-400 font-normal shrink-0", children: [
                "(",
                m,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ t("span", { className: "shrink-0 text-[10px] text-neutral-400 font-mono", children: c })
          ] }),
          /* @__PURE__ */ s("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("p", { className: "truncate text-[11px] text-neutral-500 dark:text-neutral-400", children: f }),
              o && /* @__PURE__ */ s(
                fe,
                {
                  variant: "outline",
                  className: "h-4 px-1 text-[9px] gap-0.5 border-amber-300 text-amber-700 dark:text-amber-400 font-medium",
                  children: [
                    /* @__PURE__ */ t(ke, { className: "size-2" }),
                    /* @__PURE__ */ t("span", { children: "Cerrado" })
                  ]
                }
              )
            ] }),
            e.attributes.unread_count > 0 && /* @__PURE__ */ t(fe, { className: "bg-blue-700", children: e.attributes.unread_count })
          ] })
        ] })
      ] })
    }
  );
};
function Fn({
  conversations: e,
  selectedId: r,
  onSelectConversation: a,
  searchQuery: n,
  onSearchChange: i,
  closedFilter: l,
  onClosedFilterChange: o,
  typeFilter: u,
  onTypeFilterChange: d,
  onNewConversation: m,
  isLoading: f = !1
}) {
  const { currentUser: c, currentUserId: p, isLoadingUser: b, hasError: x, error: v } = ne(), z = oe({
    permission: ["messenger_chat.read"]
  }), _ = f || b;
  return /* @__PURE__ */ s("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ s("div", { className: "flex shrink-0 flex-col gap-2.5 border-b border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900", children: [
      /* @__PURE__ */ s("div", { className: "group/search relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
        /* @__PURE__ */ t(Wt, { className: "size-3.5 shrink-0 text-neutral-400 transition-colors group-focus-within/search:text-blue-600" }),
        /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            placeholder: "Buscar por nombre...",
            value: n,
            onChange: (h) => i(h.target.value),
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
            children: /* @__PURE__ */ t(ce, { className: "size-3" })
          }
        ) : /* @__PURE__ */ t("span", { className: "hidden shrink-0 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-400 sm:inline-block", children: "Buscar" })
      ] }),
      /* @__PURE__ */ t(
        Kt,
        {
          value: l,
          onValueChange: (h) => o(h),
          className: "w-full",
          children: /* @__PURE__ */ s(Gt, { className: "h-8 w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ t(nt, { value: "0", className: "text-[11px] font-medium", children: "Activos" }),
            /* @__PURE__ */ t(nt, { value: "1", className: "text-[11px] font-medium", children: "Cerrados" })
          ] })
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none", children: En.map((h) => {
        const g = u === h.id, P = h.icon;
        return /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            onClick: () => d(h.id),
            className: y(
              "flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              g ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 border border-transparent"
            ),
            children: [
              P && /* @__PURE__ */ t(P, { className: "size-3" }),
              /* @__PURE__ */ t("span", { children: h.label })
            ]
          },
          h.id
        );
      }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ t(Ke, { className: "h-full w-full", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 p-1.5 w-full min-w-0", children: x ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ t("div", { className: "size-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(wt, { className: "size-6" }) }),
      /* @__PURE__ */ s("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Error al cargar chats" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: (v == null ? void 0 : v.message) || "No se pudo conectar al servidor de mensajería." })
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
            /* @__PURE__ */ t(Ht, { className: "size-3" }),
            /* @__PURE__ */ t("span", { children: "Reintentar" })
          ]
        }
      )
    ] }) : !z && !b ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ t("div", { className: "size-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(ke, { className: "size-6" }) }),
      /* @__PURE__ */ s("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Sin permiso de lectura" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: "No tienes permisos para ver el listado de conversaciones." })
      ] })
    ] }) : _ ? /* @__PURE__ */ t("div", { className: "space-y-1.5 p-1", children: Array.from({ length: 5 }).map((h, g) => /* @__PURE__ */ t(Mn, {}, g)) }) : e.length === 0 ? /* @__PURE__ */ s("div", { className: "flex min-h-56 flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ t("div", { className: "mb-3 flex size-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400", children: /* @__PURE__ */ t(Cr, { className: "size-5 stroke-[1.5]" }) }),
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
    ] }) : e.map((h) => /* @__PURE__ */ t(
      Ln,
      {
        conversation: h,
        selectedId: r,
        currentUserId: p,
        onSelectConversation: a
      },
      h.id
    )) }) }) }),
    /* @__PURE__ */ t(_t, { onNewConversation: m })
  ] });
}
function In({
  conversations: e,
  selectedId: r,
  searchQuery: a,
  closedFilter: n,
  typeFilter: i,
  isLoading: l,
  onHome: o,
  onClose: u,
  onSelectConversation: d,
  onSearchChange: m,
  onClosedFilterChange: f,
  onTypeFilterChange: c,
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
            U,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (x) => x.stopPropagation(),
              onClick: o,
              className: "h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100",
              children: [
                /* @__PURE__ */ t(bt, { className: "size-3.5" }),
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
              onPointerDown: (x) => x.stopPropagation(),
              onClick: u,
              className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ t(ce, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ t(
      Fn,
      {
        conversations: e,
        selectedId: r,
        onSelectConversation: d,
        searchQuery: a,
        onSearchChange: m,
        closedFilter: n,
        onClosedFilterChange: f,
        typeFilter: i,
        onTypeFilterChange: c,
        onNewConversation: p,
        isLoading: l
      }
    ) })
  ] });
}
function Rn({
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
              /* @__PURE__ */ t(T, { className: "size-9 rounded-xl bg-white/20" }),
              /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ t(T, { className: "h-3.5 w-32 bg-white/30" }),
                /* @__PURE__ */ t(T, { className: "h-2.5 w-24 bg-white/20" })
              ] })
            ] }),
            /* @__PURE__ */ t(T, { className: "size-7 rounded-full bg-white/20" })
          ] }),
          /* @__PURE__ */ s("div", { className: "mt-4 space-y-1.5", children: [
            /* @__PURE__ */ t(T, { className: "h-3 w-48 bg-white/30" }),
            /* @__PURE__ */ t(T, { className: "h-2.5 w-64 bg-white/20" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      /* @__PURE__ */ s("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(T, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ t(T, { className: "h-3.5 w-28" }),
            /* @__PURE__ */ t(T, { className: "h-2.5 w-44" })
          ] })
        ] }),
        /* @__PURE__ */ t(T, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ s("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(T, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ s("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ t(T, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ t(T, { className: "h-2.5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ t(T, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ s("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2", children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(T, { className: "size-3.5 rounded-full" }),
          /* @__PURE__ */ t(T, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ t(T, { className: "h-2.5 w-full" }),
        /* @__PURE__ */ t(T, { className: "h-2.5 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5", children: [
      /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ t(T, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ s("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(T, { className: "h-3 w-24" }),
          /* @__PURE__ */ t(T, { className: "h-2.5 w-36" })
        ] })
      ] }),
      /* @__PURE__ */ t(T, { className: "size-8 rounded-lg" })
    ] })
  ] });
}
function Jn({
  canViewChatList: e = !0,
  canRequestSupport: r = !0,
  defaultView: a = "home",
  defaultCorner: n = "bottom-right",
  initialConversation: i,
  title: l = "Centro de Ayuda SDI",
  hiddenPaths: o = er,
  showOnlyPaths: u,
  hideCondition: d,
  hidden: m = !1,
  currentPath: f,
  showToastOnUnread: c = !1
}) {
  var H, $, R, G;
  const p = oe({
    permission: ["messenger_chat.read"]
  }), b = oe({
    permission: ["messenger_chat_support.request_support"]
  });
  oe({
    permission: ["messenger_chat_support.provide_support"]
  });
  const x = oe({
    permission: [
      "messenger_chat.read",
      "messenger_chat_support.request_support",
      "messenger_chat_support.provide_support"
    ],
    operator: "OR"
  }), v = e && p, z = r && b, { shouldHide: _ } = zn({
    hiddenPaths: o,
    showOnlyPaths: u,
    hideCondition: d,
    hidden: m,
    currentPath: f
  }), {
    containerRef: h,
    isDragging: g,
    dragPos: P,
    wasDraggedRef: k,
    isTop: D,
    isLeft: C,
    cornerContainerClass: I,
    cardOriginClass: A,
    startDrag: w
  } = _n(n), [M, q] = S(!1), [L, E] = S(() => !v && !z ? "chat" : a === "list" && !v || a === "support-form" && !z ? "home" : a), { currentUser: j, isLoadingUser: te, hasError: W, error: Ie } = ne(), ge = (H = j == null ? void 0 : j.attributes) == null ? void 0 : H.user_auth_id, ue = (($ = j == null ? void 0 : j.attributes) == null ? void 0 : $.name) || "Usuario", {
    mutateAsync: _e,
    isLoading: Se,
    error: se
  } = Cn(), [ie, ve] = S(null), [Re, pe] = S(
    null
  ), {
    conversations: re,
    selectedId: he,
    selectedConversation: K,
    closedFilter: Xe,
    setClosedFilter: Ye,
    typeFilter: lt,
    setTypeFilter: ot,
    searchQuery: je,
    setSearchQuery: we,
    isNewConversationOpen: Je,
    isLoading: Ze,
    selectConversation: me,
    setIsNewConversationOpen: Ne,
    handleConversationCreated: et
  } = yn({
    showToastOnUnread: c
  }), Ue = de(() => !re || !Array.isArray(re) ? 0 : re.reduce((X, Y) => {
    var Q;
    return X + (((Q = Y.attributes) == null ? void 0 : Q.unread_count) || 0);
  }, 0), [re]), Te = Re || i || K || null;
  B(() => {
    L === "chat" && !Te && E(v ? "list" : "home");
  }, [L, Te, v]);
  const dt = () => {
    k.current || g || (M ? q(!1) : (q(!0), E(a === "list" && !v ? z ? "support-form" : "home" : a === "support-form" && !z ? v ? "list" : "home" : a || "home")));
  };
  if (_ || !te && !W && !x)
    return null;
  const ct = (X) => {
    pe(null), me(X), E("chat");
  }, N = async (X) => {
    var Y, Q, ye, De, le;
    try {
      const F = await _e(X);
      if (F != null && F.conversation_id && (F != null && F.technician)) {
        const Pe = String(F.conversation_id), rr = {
          id: String(F.technician.id),
          type: "user",
          attributes: {
            user_auth_id: Number(F.technician.user_auth_id),
            name: F.technician.name,
            avatar_url: null,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: []
        }, St = {
          id: Pe,
          type: "conversation",
          attributes: {
            is_group: !1,
            name: F.technician.name || ((Y = F.ticket) == null ? void 0 : Y.subject) || "Soporte SDI",
            closed_at: null,
            unread_count: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: {
            users: [rr]
          }
        };
        pe(St), et(St), ae.success(`Asistencia iniciada con ${F.technician.name}`, {
          description: `Ticket #${((Q = F.ticket) == null ? void 0 : Q.number) || ((ye = F.ticket) == null ? void 0 : ye.id)}`
        }), E("chat");
      } else
        ve(F), E("no-technician");
    } catch (F) {
      const Pe = ((le = (De = F == null ? void 0 : F.response) == null ? void 0 : De.data) == null ? void 0 : le.message) || (F == null ? void 0 : F.message) || "Error al procesar la solicitud de asistencia";
      ae.error(Pe);
    }
  };
  if (_)
    return null;
  if (!W)
    return /* @__PURE__ */ s(
      "div",
      {
        ref: h,
        style: g && P ? {
          position: "fixed",
          left: `${P.x}px`,
          top: `${P.y}px`,
          bottom: "auto",
          right: "auto",
          zIndex: 50,
          touchAction: "none",
          transition: "none"
        } : void 0,
        className: y(
          "sdi-messenger-root z-50 flex pointer-events-none select-none",
          g ? "fixed cursor-grabbing" : y("fixed duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all", I)
        ),
        children: [
          M && /* @__PURE__ */ t(
            aa,
            {
              className: y(
                "pointer-events-auto h-[590px] max-h-[calc(100vh-120px)] w-[385px] sm:w-[425px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-2xl transition-all duration-300 flex flex-col",
                D ? "mt-3.5" : "mb-3.5",
                A
              ),
              children: te ? /* @__PURE__ */ t(Rn, { onDragStart: w }) : /* @__PURE__ */ s(be, { children: [
                L === "home" && /* @__PURE__ */ t(
                  Dn,
                  {
                    title: l,
                    canRequestSupport: z,
                    canViewChatList: v,
                    totalUnreadCount: Ue,
                    conversationsCount: re.length,
                    onRequestSupport: () => E("support-form"),
                    onViewChatList: () => E("list"),
                    onClose: () => q(!1),
                    onNewConversation: () => Ne(!0),
                    onDragStart: w
                  }
                ),
                L === "support-form" && /* @__PURE__ */ t(
                  An,
                  {
                    userId: ge,
                    userName: ue,
                    canViewChatList: v,
                    totalUnreadCount: Ue,
                    isSubmitting: Se,
                    error: ((G = (R = se == null ? void 0 : se.response) == null ? void 0 : R.data) == null ? void 0 : G.message) || (se == null ? void 0 : se.message),
                    onHome: () => E("home"),
                    onViewChats: () => E("list"),
                    onClose: () => q(!1),
                    onSubmit: N,
                    onNewConversation: () => Ne(!0),
                    onDragStart: w
                  }
                ),
                L === "no-technician" && /* @__PURE__ */ t(
                  xn,
                  {
                    message: ie == null ? void 0 : ie.message,
                    ticket: ie == null ? void 0 : ie.ticket,
                    onNewRequest: () => {
                      ve(null), E("support-form");
                    },
                    onViewChats: () => E("list"),
                    onClose: () => q(!1),
                    canViewChatList: v
                  }
                ),
                L === "list" && /* @__PURE__ */ t(
                  In,
                  {
                    conversations: re,
                    selectedId: he,
                    searchQuery: je,
                    closedFilter: Xe,
                    typeFilter: lt,
                    isLoading: Ze,
                    onHome: () => E("home"),
                    onClose: () => q(!1),
                    onSelectConversation: ct,
                    onSearchChange: we,
                    onClosedFilterChange: Ye,
                    onTypeFilterChange: ot,
                    onNewConversation: () => Ne(!0),
                    onDragStart: w
                  }
                ),
                L === "chat" && Te && /* @__PURE__ */ t("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: /* @__PURE__ */ t(
                  bn,
                  {
                    conversation: Te,
                    isContextPanelOpen: !1,
                    alwaysShowBackButton: !0,
                    onCloseSuccess: () => {
                      pe(null), E(v ? "list" : "home");
                    },
                    onBack: () => {
                      pe(null), E(v ? "list" : "home");
                    }
                  }
                ) })
              ] })
            }
          ),
          /* @__PURE__ */ t(
            Sn,
            {
              isOpen: M,
              totalUnreadCount: Ue,
              isLeft: C,
              isLoading: te,
              hasError: W,
              onToggleOpen: dt,
              onPointerDown: w
            }
          ),
          /* @__PURE__ */ t(
            wn,
            {
              open: Je,
              onOpenChange: Ne,
              onSuccess: (X) => {
                pe(X), et(X), E("chat");
              }
            }
          )
        ]
      }
    );
}
function Zn({ onNewConversation: e }) {
  const { hasError: r, error: a, isLoadingUser: n } = ne(), i = oe({
    permission: ["messenger_chat.read"]
  }), l = oe({
    permission: ["messenger_chat_support.provide_support"]
  });
  return r ? /* @__PURE__ */ s("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-x-0 top-0 h-1 bg-red-500/30" }),
    /* @__PURE__ */ s("div", { className: "flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200", children: [
      /* @__PURE__ */ t("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs", children: /* @__PURE__ */ t(wt, { className: "size-8" }) }),
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
            /* @__PURE__ */ t(Ht, { className: "size-4" }),
            "Reintentar conexión"
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ t("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0f1d] shadow-xs", children: /* @__PURE__ */ s("div", { className: "relative z-10 flex max-w-md flex-col items-center px-6 text-center", children: [
    /* @__PURE__ */ t("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs", children: /* @__PURE__ */ t(qe, { className: "size-8" }) }),
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
          /* @__PURE__ */ t(qe, { className: "size-4" }),
          "Nueva conversación"
        ]
      }
    )
  ] }) });
}
function es({
  conversation: e,
  onClose: r,
  className: a
}) {
  var f, c;
  const { currentUserId: n } = ne(), i = Ge(e), l = Qe(e, n), o = Fe(e, n), u = ((c = (f = e.relationships) == null ? void 0 : f.users) == null ? void 0 : c.length) || 0, d = !!e.attributes.closed_at, m = (p) => {
    if (!p) return "-";
    try {
      return at(Nt(p), "dd/MM/yyyy HH:mm");
    } catch {
      return p;
    }
  };
  return /* @__PURE__ */ s(
    "div",
    {
      className: y(
        "sdi-messenger-root flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        a
      ),
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-3 px-4 bg-white dark:bg-neutral-900", children: [
          /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(rt, { className: "size-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ t("h3", { className: "text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100", children: "Información de Contacto" })
          ] }),
          r && /* @__PURE__ */ t(
            U,
            {
              variant: "ghost",
              size: "icon",
              onClick: r,
              className: " p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              children: /* @__PURE__ */ t(ce, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ t(Ke, { className: "h-full", children: /* @__PURE__ */ s("div", { className: "space-y-4 p-4", children: [
          /* @__PURE__ */ s("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ t("div", { className: "relative mb-2", children: /* @__PURE__ */ t(
              xe,
              {
                src: l == null ? void 0 : l.attributes.avatar_url,
                name: o,
                isGroup: i,
                size: "xl",
                status: !i && l ? "online" : void 0
              }
            ) }),
            /* @__PURE__ */ t("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: o }),
            /* @__PURE__ */ t("p", { className: "text-xs font-medium text-neutral-500 dark:text-neutral-400", children: i ? `${u} participantes` : "Conversación individual" }),
            /* @__PURE__ */ s("div", { className: "flex items-center justify-center gap-1.5 mt-2", children: [
              /* @__PURE__ */ t(fe, { variant: "secondary", className: "text-[10px]", children: i ? "Grupo" : "Usuario" }),
              d ? /* @__PURE__ */ s(
                fe,
                {
                  variant: "outline",
                  className: "text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ t(ke, { className: "size-2.5" }),
                    /* @__PURE__ */ t("span", { children: "Cerrada" })
                  ]
                }
              ) : /* @__PURE__ */ s(
                fe,
                {
                  variant: "outline",
                  className: "text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ t(tt, { className: "size-2.5" }),
                    /* @__PURE__ */ t("span", { children: "Activa" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t(ra, {}),
          /* @__PURE__ */ s("div", { className: "space-y-1", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(rt, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ t("span", { className: "truncate text-neutral-900 dark:text-neutral-100 font-medium", children: i ? `${u} participantes` : o })
            ] }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(zr, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Creada: ",
                m(e.attributes.created_at)
              ] })
            ] }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(xt, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Actualizada: ",
                m(e.attributes.updated_at)
              ] })
            ] }),
            e.attributes.closed_at && /* @__PURE__ */ s("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(ke, { className: "size-3.5 shrink-0 text-amber-500" }),
              /* @__PURE__ */ s("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Cerrada: ",
                m(e.attributes.closed_at)
              ] })
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
}
const Un = ({ conversationId: e, enabled: r = !0 } = {}) => {
  var n, i, l;
  const a = ft({
    queryKey: ["conversation", e],
    queryFn: () => Ga(e),
    enabled: r && !!e,
    refetchOnWindowFocus: !1
  });
  return {
    data: ((i = (n = a.data) == null ? void 0 : n.data) == null ? void 0 : i.data) ?? null,
    isLoading: a.isPending,
    isError: a.isError,
    errors: ((l = a.error) == null ? void 0 : l.data) ?? {},
    refetch: a.refetch
  };
}, ts = (e, r) => {
  const a = typeof e == "object" && e !== null ? e : { conversationId: e, ...r }, {
    conversationId: n,
    enabled: i = !0,
    showToastOnUnread: l = !1,
    onMessage: o,
    onUnread: u
  } = a, d = Ce(), { config: m, currentUser: f, currentUserId: c } = ne(), p = oe({
    permission: ["messenger_chat.read"]
  }), b = n != null ? String(n) : void 0, x = n != null ? Number(n) : void 0, v = i && !!b && p, {
    data: z,
    isLoading: _,
    isError: h,
    errors: g,
    refetch: P
  } = Un({
    conversationId: b,
    enabled: v
  }), k = V(
    (C) => {
      if (c && String(C.attributes.sender_id) !== String(c)) {
        const A = typeof document < "u" && document.hasFocus() && !document.hidden;
        st(A ? "focused" : "unfocused");
      }
      d.invalidateQueries({ queryKey: ["conversation", b] }), d.invalidateQueries({ queryKey: ["list-conversations"] }), P(), o == null || o(C);
    },
    [b, c, o, d, P]
  ), D = V(
    (C) => {
      l && String(C.conversation_id) !== b && ae.info("Nuevo mensaje", {
        id: `conversation-message-${C.message.id}`,
        description: C.message.body || "Tienes un mensaje nuevo"
      }), String(C.conversation_id) === b && (d.invalidateQueries({ queryKey: ["conversation", b] }), P()), d.invalidateQueries({ queryKey: ["list-conversations"] }), u == null || u(C);
    },
    [b, u, d, P, l]
  );
  return B(() => {
    if (!(!x || !v))
      return Yt(
        m.reverb,
        x,
        k
      );
  }, [m.reverb, x, k, v]), B(() => {
    if (!(!c || !v))
      return Jt(
        m.reverb,
        c,
        D
      );
  }, [m.reverb, c, D, v]), {
    conversation: z ?? null,
    isLoading: _,
    isError: h,
    errors: g,
    refetch: P,
    hasReadPermission: p,
    currentUser: f,
    currentUserId: c
  };
};
export {
  Xn as ChatProvider,
  bn as ConversationChatPanel,
  es as ConversationContextPanel,
  Zn as ConversationEmptyState,
  Fn as ConversationsSidebarList,
  Jn as FloatingChat,
  tr as LIB_VERSION,
  wn as NewConversationDialog,
  Pn as RequestSupportForm,
  st as playNotificationSound,
  ne as useChatContext,
  on as useConversationChat,
  yn as useConversationsPage,
  Yn as useOptionalChatContext,
  ts as useShowConversation
};
//# sourceMappingURL=index.js.map
