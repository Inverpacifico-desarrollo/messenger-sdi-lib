"use client";
import { jsx as t, jsxs as i, Fragment as pe } from "react/jsx-runtime";
import { createContext as Le, useMemo as re, useState as C, useEffect as H, useContext as Ie, useSyncExternalStore as cr, forwardRef as it, useRef as U, useCallback as $, useLayoutEffect as $t } from "react";
import ur from "axios";
import { twMerge as mr } from "tailwind-merge";
import { Users as xt, X as le, CheckCircle2 as rt, Loader2 as Ae, Lock as ke, ArrowLeft as pt, Info as hr, FileText as fr, Download as br, Clock as gt, CheckCheck as xr, ChevronsDown as pr, Paperclip as Mt, SendHorizontal as qt, UploadCloud as gr, ShieldCheck as vt, Ticket as vr, RotateCcw as wr, MessagesSquare as wt, MessageSquarePlus as Ve, User as at, Search as Vt, Check as Nr, AlertTriangle as Nt, MessageCircleMore as yr, WifiOff as kr, LifeBuoy as bt, ChevronRight as Lt, AlertCircle as Cr, Tag as zr, MessageSquare as Sr, Bot as _r, RefreshCw as Gt, Inbox as Er, CalendarDays as Dr } from "lucide-react";
import { createPortal as Ot } from "react-dom";
import { toast as te } from "sonner";
import { parseISO as yt, isValid as Pr, isToday as jr, isYesterday as Tr, isThisWeek as Ar, format as nt } from "date-fns";
import Mr from "pusher-js";
typeof globalThis < "u" && typeof globalThis.self > "u" && (globalThis.self = globalThis);
let Te = null;
const Lr = (e) => {
  Te = e;
}, Ir = (e) => Object.entries(e).reduce((r, [a, n]) => (r[a] = typeof n == "boolean" ? Number(n) : n, r), {}), J = (e, r) => {
  if (!Te)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  return `${Te.apiBaseUrl.replace(/\/+$/, "")}/${e}/api/${r}`;
}, Z = async ({
  data: e,
  url: r,
  params: a,
  method: n,
  headers: s,
  ...l
}) => {
  if (!Te)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const o = {
    ...l,
    url: r,
    method: n,
    data: e,
    params: a ? Ir(a) : void 0,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...Te.authToken ? { Authorization: `Bearer ${Te.authToken}` } : {},
      ...s
    }
  };
  return ur.request(o);
}, Fr = (e) => Z({
  url: `${J("messenger", "v1")}/users`,
  method: "GET",
  params: e
}), Rr = (e) => Z({
  url: `${J("messenger", "v1")}/users/${e}/user`,
  method: "GET"
}), Br = ({
  applicationId: e,
  userId: r
}) => Z({
  url: `${J("auth", "v1")}/users/${r}/permissions`,
  method: "GET",
  params: {
    application_id: e
  }
}), Hr = () => Z({
  url: `${J("auth", "v1")}/me`,
  method: "GET"
}), kt = Le(null);
function Ur(e) {
  var a, n, s, l;
  const r = [];
  return (a = e.apiBaseUrl) != null && a.trim() || r.push("apiBaseUrl"), (e.applicationId === void 0 || e.applicationId === null) && r.push("applicationId"), e.reverb ? ((n = e.reverb.key) != null && n.trim() || r.push("reverb.key"), (s = e.reverb.host) != null && s.trim() || r.push("reverb.host"), (!Number.isFinite(e.reverb.port) || e.reverb.port <= 0) && r.push("reverb.port"), (l = e.reverb.wsPath) != null && l.trim() || r.push("reverb.wsPath"), e.reverb.scheme !== "http" && e.reverb.scheme !== "https" && r.push("reverb.scheme")) : r.push("reverb"), r.length > 0 ? new Error(`Configuración incompleta del chat: ${r.join(", ")}`) : null;
}
function ts({ config: e, children: r }) {
  const { authToken: a, apiBaseUrl: n, applicationId: s, reverb: l } = e, o = re(
    () => Ur(e),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      n,
      s,
      l == null ? void 0 : l.key,
      l == null ? void 0 : l.host,
      l == null ? void 0 : l.port,
      l == null ? void 0 : l.wsPath,
      l == null ? void 0 : l.scheme
    ]
  ), [c, d] = C(null), [h, m] = C([]), [f, u] = C(null), [v, g] = C(null), [N, p] = C(null), w = JSON.stringify([n, s, a]);
  H(() => {
    o && console.error(`[Chat] ${o.message}`);
  }, [o]), H(() => {
    let F = !0;
    return o || !a ? () => {
      F = !1;
    } : (Lr({
      apiBaseUrl: n,
      authToken: a
    }), (async () => {
      var _;
      try {
        const D = await Hr(), k = (await Rr(D.data.data.id)).data.data;
        if (!(k != null && k.id))
          throw new Error("La respuesta no contiene un usuario válido para el chat");
        const I = ((_ = (await Br({
          userId: k.attributes.user_auth_id,
          applicationId: s
        })).data.data) == null ? void 0 : _.map((K) => K.attributes.name)) ?? [];
        F && (d(k), m(I), u(w), g(null), p(null));
      } catch (D) {
        F && (console.error("Error al cargar el usuario en ChatProvider:", D), g(D instanceof Error ? D : new Error("Error al inicializar el chat")), p(w));
      }
    })(), () => {
      F = !1;
    });
  }, [o, a, n, s, w]);
  const b = (F) => {
    d(F);
  }, x = re(() => c != null && c.id ? String(c.id) : "", [c]), z = !!(c != null && c.id) && f === w, A = N === w && v !== null, B = {
    currentUser: c,
    currentUserId: x,
    permissions: h,
    isLoadingUser: !o && !!a && !z && !A,
    hasError: !!o || A,
    error: o ?? (A ? v : null),
    config: e,
    setCurrentUser: b
  };
  return /* @__PURE__ */ t(kt.Provider, { value: B, children: r });
}
function Wr() {
  return Ie(kt);
}
function ne() {
  const e = Ie(kt);
  if (!e)
    throw new Error("useChatContext debe usarse dentro de un ChatProvider");
  return e;
}
const $r = (e) => Z({
  url: `${J("messenger", "v1")}/conversations`,
  method: "GET",
  params: e
}), qr = (e) => Z({
  url: `${J("messenger", "v1")}/conversations`,
  method: "POST",
  data: e
}), Vr = (e) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}`,
  method: "GET"
}), Gr = ({
  conversationId: e,
  read_until: r,
  user_id: a
}) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}/read`,
  method: "POST",
  data: { read_until: r, user_id: a }
}), Or = ({
  conversationId: e,
  user_id: r,
  is_typing: a
}) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}/typing`,
  method: "POST",
  data: { user_id: r, is_typing: a }
}), Kt = (e) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}/close`,
  method: "POST"
}), Xt = Le(null);
let Ue = null;
const ut = /* @__PURE__ */ new Set(), Me = {
  get: () => Ue,
  set: (e) => {
    (Ue == null ? void 0 : Ue.id) !== (e == null ? void 0 : e.id) && (Ue = e, ut.forEach((r) => r(e)));
  },
  subscribe: (e) => (ut.add(e), () => {
    ut.delete(e);
  })
};
function Kr({
  value: e,
  children: r
}) {
  return /* @__PURE__ */ t(Xt.Provider, { value: e, children: r });
}
function Xr() {
  var a;
  const e = Ie(Xt), r = cr(
    Me.subscribe,
    Me.get,
    () => null
  );
  return e || (r ? {
    conversation: r,
    isClosed: !!((a = r.attributes) != null && a.closed_at),
    isClosing: !1,
    handleCloseConversation: async () => {
      await Kt(r.id), typeof window < "u" && window.dispatchEvent(
        new CustomEvent("messenger:conversation-closed", {
          detail: { conversationId: r.id }
        })
      );
    }
  } : null);
}
function rs() {
  const e = Xr();
  if (!e)
    throw new Error("useRequiredActiveConversation debe utilizarse cuando haya una conversación activa");
  return e;
}
function E(...e) {
  const r = [], a = (n) => {
    if (n) {
      if (typeof n == "string" || typeof n == "number")
        r.push(String(n));
      else if (Array.isArray(n))
        n.forEach(a);
      else if (typeof n == "object")
        for (const [s, l] of Object.entries(n))
          l && r.push(s);
    }
  };
  return e.forEach(a), mr(r.join(" "));
}
const W = it(
  ({ className: e, variant: r = "default", size: a = "default", type: n = "button", disabled: s, children: l, ...o }, c) => {
    const d = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer", h = {
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
        disabled: s,
        className: E(d, h[r], m[a], e),
        ...o,
        children: l
      }
    );
  }
);
W.displayName = "ChatButton";
const Ct = it(
  ({ className: e, type: r = "text", disabled: a, ...n }, s) => /* @__PURE__ */ t(
    "input",
    {
      ref: s,
      type: r,
      disabled: a,
      className: E(
        "flex h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        e
      ),
      ...n
    }
  )
);
Ct.displayName = "ChatInput";
const zt = it(
  ({ className: e, disabled: r, ...a }, n) => /* @__PURE__ */ t(
    "textarea",
    {
      ref: n,
      disabled: r,
      className: E(
        "flex min-h-15 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        e
      ),
      ...a
    }
  )
);
zt.displayName = "ChatTextarea";
function me({ className: e, variant: r = "default", children: a, ...n }) {
  return /* @__PURE__ */ t("span", { className: E("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
  }[r], e), ...n, children: a });
}
function Yr(e) {
  if (!e) return "?";
  const r = e.trim().split(/\s+/);
  return r.length === 1 ? r[0].substring(0, 2).toUpperCase() : (r[0][0] + r[r.length - 1][0]).toUpperCase();
}
const It = [
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
function Qr(e) {
  if (!e) return "#62748e";
  let r = 0;
  for (let a = 0; a < (e || "").length; a++)
    r = (r << 5) - r + (e || "").charCodeAt(a), r |= 0;
  return It[Math.abs(r) % It.length];
}
function ge({
  src: e,
  name: r = "",
  size: a = "md",
  isGroup: n = !1,
  status: s,
  className: l,
  ...o
}) {
  const [c, d] = C(!1), h = {
    xs: { box: "size-6", text: "text-[10px]", icon: "size-3", statusDot: "size-1.5" },
    sm: { box: "size-8", text: "text-xs", icon: "size-3.5", statusDot: "size-2" },
    md: { box: "size-10", text: "text-sm", icon: "size-5", statusDot: "size-2.5" },
    lg: { box: "size-12", text: "text-base", icon: "size-6", statusDot: "size-3" },
    xl: { box: "size-16", text: "text-xl", icon: "size-8", statusDot: "size-3.5" }
  }, { box: m, text: f, icon: u, statusDot: v } = h[a], g = Yr(r), N = re(() => Qr(r), [r]), p = !!e && !c;
  return /* @__PURE__ */ i("div", { className: E("relative inline-block shrink-0", m, l), ...o, children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: E(
          "flex size-full items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          !p && (n ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "font-semibold text-xs")
        ),
        style: !p && !n ? {
          backgroundColor: `${N}33`,
          color: `${N}FF`,
          fontWeight: "bold"
        } : void 0,
        children: p ? /* @__PURE__ */ t(
          "img",
          {
            src: e,
            alt: r || "Avatar",
            onError: () => d(!0),
            className: "size-full object-cover",
            loading: "lazy"
          }
        ) : n ? /* @__PURE__ */ t(xt, { className: u }) : /* @__PURE__ */ t("span", { className: E("font-bold tracking-tight", f), children: g })
      }
    ),
    s && /* @__PURE__ */ t(
      "span",
      {
        className: E(
          "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-900",
          v,
          s === "online" && "bg-emerald-500",
          s === "offline" && "bg-neutral-400",
          s === "busy" && "bg-amber-500"
        )
      }
    )
  ] });
}
const Yt = Le(null);
function Jr() {
  const e = Ie(Yt);
  if (!e)
    throw new Error("Los subcomponentes de Dialog deben usarse dentro de <Dialog>");
  return e;
}
function Zr({ open: e, onOpenChange: r, children: a }) {
  return H(() => {
    if (!e) return;
    const n = (l) => {
      l.key === "Escape" && r(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", n);
    };
  }, [e, r]), /* @__PURE__ */ t(Yt.Provider, { value: { open: e, onOpenChange: r }, children: a });
}
function ea({ className: e, children: r, showClose: a = !0, ...n }) {
  const { open: s, onOpenChange: l } = Jr(), o = U(null);
  return !s || typeof window > "u" ? null : Ot(
    /* @__PURE__ */ t(
      "div",
      {
        ref: o,
        onClick: (d) => {
          d.target === o.current && l(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ i(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            className: E(
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
                  children: /* @__PURE__ */ t(le, { className: "size-4" })
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
function ta({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: E("flex flex-col gap-1.5 text-left p-5 pb-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", e), ...r });
}
function ra({ className: e, ...r }) {
  return /* @__PURE__ */ t("h3", { className: E("text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100", e), ...r });
}
function aa({ className: e, ...r }) {
  return /* @__PURE__ */ t("p", { className: E("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", e), ...r });
}
function na({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: E("flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", e), ...r });
}
const Qt = Le(null);
function Jt() {
  const e = Ie(Qt);
  if (!e)
    throw new Error("Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>");
  return e;
}
function sa({ open: e, onOpenChange: r, children: a }) {
  return H(() => {
    if (!e) return;
    const n = (l) => {
      l.key === "Escape" && r(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", n);
    };
  }, [e, r]), /* @__PURE__ */ t(Qt.Provider, { value: { open: e, onOpenChange: r }, children: a });
}
function ia({ className: e, children: r, ...a }) {
  const { open: n, onOpenChange: s } = Jt(), l = U(null);
  return !n || typeof window > "u" ? null : Ot(
    /* @__PURE__ */ t(
      "div",
      {
        ref: l,
        onClick: (c) => {
          c.target === l.current && s(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ t(
          "div",
          {
            role: "alertdialog",
            "aria-modal": "true",
            className: E(
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
function la({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: E("flex flex-col gap-2 text-left", e), ...r });
}
function oa({ className: e, ...r }) {
  return /* @__PURE__ */ t("h3", { className: E("text-sm font-bold text-neutral-900 dark:text-neutral-100", e), ...r });
}
function da({ className: e, ...r }) {
  return /* @__PURE__ */ t("p", { className: E("text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", e), ...r });
}
function ca({ className: e, ...r }) {
  return /* @__PURE__ */ t("div", { className: E("flex items-center justify-end gap-2 mt-4", e), ...r });
}
function ua({
  className: e,
  onClick: r,
  children: a,
  ...n
}) {
  const { onOpenChange: s } = Jt();
  return /* @__PURE__ */ t(
    W,
    {
      variant: "outline",
      size: "sm",
      onClick: (l) => {
        s(!1), r == null || r(l);
      },
      className: E("text-xs", e),
      ...n,
      children: a || "Cancelar"
    }
  );
}
function ma({
  className: e,
  variant: r = "danger",
  size: a = "sm",
  ...n
}) {
  return /* @__PURE__ */ t(W, { variant: r, size: a, className: E("text-xs font-semibold", e), ...n });
}
Le(null);
const Zt = Le(null);
function ha() {
  const e = Ie(Zt);
  if (!e)
    throw new Error("Los subcomponentes de Tabs deben usarse dentro de <Tabs>");
  return e;
}
function er({
  value: e,
  defaultValue: r = "",
  onValueChange: a,
  className: n,
  children: s,
  ...l
}) {
  const [o, c] = C(r), d = e !== void 0, h = d ? e : o, m = d ? a : c;
  return /* @__PURE__ */ t(Zt.Provider, { value: { value: h, onValueChange: m }, children: /* @__PURE__ */ t("div", { className: E("flex flex-col gap-2 w-full", n), ...l, children: s }) });
}
function tr({ className: e, children: r, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: E(
        "flex w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 text-neutral-500 dark:text-neutral-400 gap-1",
        e
      ),
      ...a,
      children: r
    }
  );
}
function st({ value: e, className: r, children: a, ...n }) {
  const { value: s, onValueChange: l } = ha(), o = s === e;
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": o,
      onClick: () => l(e),
      className: E(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none cursor-pointer",
        o ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5",
        r
      ),
      ...n,
      children: a
    }
  );
}
const Oe = it(
  ({ className: e, children: r, ...a }, n) => /* @__PURE__ */ t(
    "div",
    {
      ref: n,
      className: E(
        "relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]",
        e
      ),
      ...a,
      children: r
    }
  )
);
Oe.displayName = "ChatScrollArea";
function fa({
  orientation: e = "horizontal",
  className: r,
  ...a
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "separator",
      "aria-orientation": e,
      className: E(
        "shrink-0 bg-neutral-200 dark:bg-neutral-800",
        e === "horizontal" ? "h-px w-full" : "h-full w-px",
        r
      ),
      ...a
    }
  );
}
function ba({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: E(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100",
        e
      ),
      ...r
    }
  );
}
function R({ className: e, ...r }) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: E(
        "animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80",
        e
      ),
      ...r
    }
  );
}
const Ge = (e) => e ? e.toLowerCase().split(" ").filter(Boolean).map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(" ") : "", Ke = (e) => !!e.attributes.is_group, Xe = (e, r) => {
  var s;
  const a = ((s = e.relationships) == null ? void 0 : s.users) || [];
  if (!r)
    return a[0];
  const n = String(r);
  return a.find((l) => String(l.id) !== n) || a[0];
}, Fe = (e, r) => {
  var s;
  if (Ke(e))
    return e.attributes.name || "Grupo";
  const a = Xe(e, r), n = ((s = a == null ? void 0 : a.attributes) == null ? void 0 : s.name) || e.attributes.name || "Usuario";
  return Ge(n);
};
function mt(e) {
  return (r = {}) => {
    const a = r.width ? String(r.width) : e.defaultWidth;
    return e.formats[a] || e.formats[e.defaultWidth];
  };
}
function We(e) {
  return (r, a) => {
    const n = a != null && a.context ? String(a.context) : "standalone";
    let s;
    if (n === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, c = a != null && a.width ? String(a.width) : o;
      s = e.formattingValues[c] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, c = a != null && a.width ? String(a.width) : e.defaultWidth;
      s = e.values[c] || e.values[o];
    }
    const l = e.argumentCallback ? e.argumentCallback(r) : r;
    return s[l];
  };
}
function $e(e) {
  return (r, a = {}) => {
    const n = a.width, s = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], l = r.match(s);
    if (!l)
      return null;
    const o = l[0], c = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], d = Array.isArray(c) ? pa(c, (f) => f.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      xa(c, (f) => f.test(o))
    );
    let h;
    h = e.valueCallback ? e.valueCallback(d) : d, h = a.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      a.valueCallback(h)
    ) : h;
    const m = r.slice(o.length);
    return { value: h, rest: m };
  };
}
function xa(e, r) {
  for (const a in e)
    if (Object.prototype.hasOwnProperty.call(e, a) && r(e[a]))
      return a;
}
function pa(e, r) {
  for (let a = 0; a < e.length; a++)
    if (r(e[a]))
      return a;
}
function ga(e) {
  return (r, a = {}) => {
    const n = r.match(e.matchPattern);
    if (!n) return null;
    const s = n[0], l = r.match(e.parsePattern);
    if (!l) return null;
    let o = e.valueCallback ? e.valueCallback(l[0]) : l[0];
    o = a.valueCallback ? a.valueCallback(o) : o;
    const c = r.slice(s.length);
    return { value: o, rest: c };
  };
}
const va = {
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
}, wa = (e, r, a) => {
  let n;
  const s = va[e];
  return typeof s == "string" ? n = s : r === 1 ? n = s.one : n = s.other.replace("{{count}}", r.toString()), a != null && a.addSuffix ? a.comparison && a.comparison > 0 ? "en " + n : "hace " + n : n;
}, Na = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, ya = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, ka = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Ca = {
  date: mt({
    formats: Na,
    defaultWidth: "full"
  }),
  time: mt({
    formats: ya,
    defaultWidth: "full"
  }),
  dateTime: mt({
    formats: ka,
    defaultWidth: "full"
  })
}, za = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Sa = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, _a = (e, r, a, n) => r.getHours() !== 1 ? Sa[e] : za[e], Ea = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, Da = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, Pa = {
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
}, ja = {
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
}, Ta = {
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
}, Aa = {
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
}, Ma = (e, r) => Number(e) + "º", La = {
  ordinalNumber: Ma,
  era: We({
    values: Ea,
    defaultWidth: "wide"
  }),
  quarter: We({
    values: Da,
    defaultWidth: "wide",
    argumentCallback: (e) => Number(e) - 1
  }),
  month: We({
    values: Pa,
    defaultWidth: "wide"
  }),
  day: We({
    values: ja,
    defaultWidth: "wide"
  }),
  dayPeriod: We({
    values: Ta,
    defaultWidth: "wide",
    formattingValues: Aa,
    defaultFormattingWidth: "wide"
  })
}, Ia = /^(\d+)(º)?/i, Fa = /\d+/i, Ra = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, Ba = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, Ha = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Ua = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Wa = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, $a = {
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
}, qa = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, Va = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, Ga = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, Oa = {
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
}, Ka = {
  ordinalNumber: ga({
    matchPattern: Ia,
    parsePattern: Fa,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: $e({
    matchPatterns: Ra,
    defaultMatchWidth: "wide",
    parsePatterns: Ba,
    defaultParseWidth: "any"
  }),
  quarter: $e({
    matchPatterns: Ha,
    defaultMatchWidth: "wide",
    parsePatterns: Ua,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: $e({
    matchPatterns: Wa,
    defaultMatchWidth: "wide",
    parsePatterns: $a,
    defaultParseWidth: "any"
  }),
  day: $e({
    matchPatterns: qa,
    defaultMatchWidth: "wide",
    parsePatterns: Va,
    defaultParseWidth: "any"
  }),
  dayPeriod: $e({
    matchPatterns: Ga,
    defaultMatchWidth: "any",
    parsePatterns: Oa,
    defaultParseWidth: "any"
  })
}, Ft = {
  code: "es",
  formatDistance: wa,
  formatLong: Ca,
  formatRelative: _a,
  localize: La,
  match: Ka,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, Xa = ({
  conversationId: e,
  sender: r,
  body: a,
  file: n
}) => {
  const s = `optimistic-${Date.now()}`, l = (/* @__PURE__ */ new Date()).toISOString(), o = Number(r.id), c = r.attributes || {}, d = c.name || c.username || "Usuario", h = c.avatar_url ?? c.avatar ?? null, m = {
    id: String(r.id),
    type: "user",
    attributes: {
      user_auth_id: c.user_auth_id ?? r.id,
      name: d,
      avatar_url: h,
      created_at: l,
      updated_at: l
    },
    relationships: []
  };
  return {
    id: s,
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
          id: `${s}-attachment`,
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
function Ya(e) {
  return e.slice(0, 10);
}
function Qa(e, r) {
  if (r.attributes.sender_id == null) return e;
  const a = Ya(r.attributes.created_at || ""), n = e[0];
  return n && n.date === a ? n.messages.some((s) => s.id === r.id) ? e : [{ ...n, messages: [r, ...n.messages] }, ...e.slice(1)] : [{ date: a, messages: [r] }, ...e];
}
function Ja(e, r) {
  if (e.length === 0) return r;
  if (r.length === 0) return e;
  const a = e[e.length - 1], n = r[0];
  if (n.date === a.date) {
    const s = new Set(a.messages.map((o) => o.id)), l = n.messages.filter((o) => !s.has(o.id));
    return [
      ...e.slice(0, -1),
      { date: a.date, messages: [...a.messages, ...l] },
      ...r.slice(1)
    ];
  }
  return [...e, ...r];
}
function ht(e) {
  if (!e) return "Hoy";
  const r = e.trim().toLowerCase();
  if (r === "hoy" || r === "today") return "Hoy";
  if (r === "ayer" || r === "yesterday") return "Ayer";
  const a = yt(e);
  return Pr(a) ? jr(a) ? "Hoy" : Tr(a) ? "Ayer" : Ar(a, { weekStartsOn: 1 }) ? nt(a, "EEEE", { locale: Ft }) : nt(a, "d 'de' MMMM 'de' yyyy", { locale: Ft }) : e;
}
const ft = async ({
  conversation: e,
  ...r
}) => await Z({
  url: `${J("messenger", "v1")}/conversations/${e}/messages`,
  method: "GET",
  params: r
}), Za = (e, r) => Z({
  url: `${J("messenger", "v1")}/conversations/${e}/messages`,
  method: "POST",
  data: r
}), en = (e, r) => {
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
function tn(e, r) {
  var o, c, d, h;
  if (!e) return;
  const a = ((o = e.data) == null ? void 0 : o.data) ?? [];
  if (!Array.isArray(a) || a.length === 0 || a.reduce(
    (m, f) => m + (Array.isArray(f == null ? void 0 : f.messages) ? f.messages.length : 0),
    0
  ) === 0)
    return;
  const s = (c = e.data) == null ? void 0 : c.meta;
  if ((s == null ? void 0 : s.has_more) === !1)
    return;
  let l = s == null ? void 0 : s.next_cursor;
  if (!l) {
    const m = (h = (d = e.data) == null ? void 0 : d.links) == null ? void 0 : h.next;
    if (m)
      try {
        const f = new URL(m, "http://localhost");
        l = f.searchParams.get("page[cursor]") || f.searchParams.get("cursor") || void 0;
      } catch {
      }
  }
  if (!(!l || l === "null" || l === "undefined" || l.trim() === "") && !r.includes(l))
    return l;
}
const rn = ({ params: e, enabled: r = !0 }) => {
  var F, S;
  const a = r && !!(e != null && e.conversation), [n, s] = C([]), [l, o] = C([]), [c, d] = C(a), [h, m] = C(a), [f, u] = C(!1), [v, g] = C({}), N = U(e);
  N.current = e;
  const p = U(!1), w = e == null ? void 0 : e.conversation, b = n[n.length - 1], x = tn(b, l), z = !!x, A = $(async () => {
    var _, D, T;
    if ((_ = N.current) != null && _.conversation) {
      d(!0), m(!0), p.current = !0, g({});
      try {
        const k = await ft({
          ...N.current,
          page: {
            ...(D = N.current) == null ? void 0 : D.page
          }
        });
        s([k]), o([]);
      } catch (k) {
        g(((T = k == null ? void 0 : k.response) == null ? void 0 : T.data) ?? (k == null ? void 0 : k.data) ?? {});
      } finally {
        d(!1), m(!1), p.current = !1;
      }
    }
  }, []), M = $(async () => {
    var _, D, T;
    if (!(!z || !x || p.current || !((_ = N.current) != null && _.conversation))) {
      u(!0), m(!0), p.current = !0;
      try {
        const k = await ft({
          ...N.current,
          cursor: x,
          page: {
            ...(D = N.current) == null ? void 0 : D.page,
            cursor: x
          }
        });
        s((P) => [...P, k]), o((P) => [...P, x]);
      } catch (k) {
        g(((T = k == null ? void 0 : k.response) == null ? void 0 : T.data) ?? (k == null ? void 0 : k.data) ?? {});
      } finally {
        u(!1), m(!1), p.current = !1;
      }
    }
  }, [z, x]), j = $((_) => {
    s((D) => {
      var I;
      if (!D || D.length === 0) return D;
      const T = D[0], k = ((I = T.data) == null ? void 0 : I.data) ?? [], P = Qa(k, _);
      return [
        {
          ...T,
          data: {
            ...T.data,
            data: P
          }
        },
        ...D.slice(1)
      ];
    });
  }, []);
  return H(() => {
    if (!a || !w) {
      s([]), o([]), d(!1), m(!1);
      return;
    }
    let _ = !0;
    return (async () => {
      var T;
      d(!0), m(!0), p.current = !0, g({});
      try {
        const k = await ft({
          ...e,
          page: {
            ...e == null ? void 0 : e.page
          }
        });
        _ && (s([k]), o([]));
      } catch (k) {
        _ && g(((T = k == null ? void 0 : k.response) == null ? void 0 : T.data) ?? (k == null ? void 0 : k.data) ?? {});
      } finally {
        _ && (d(!1), m(!1), p.current = !1);
      }
    })(), () => {
      _ = !1;
    };
  }, [w, a]), {
    data: re(() => !n || n.length === 0 ? [] : n.reduce((_, D) => {
      var k;
      const T = ((k = D == null ? void 0 : D.data) == null ? void 0 : k.data) ?? [];
      return Ja(_, T);
    }, []), [n]),
    rawPages: n,
    isLoading: c,
    isPending: c,
    isFetching: h,
    isFetchingNextPage: f,
    hasNextPage: z,
    fetchNextPage: M,
    errors: v,
    refetch: A,
    prependIncomingMessage: j,
    meta: (S = (F = n[0]) == null ? void 0 : F.data) == null ? void 0 : S.meta
  };
};
function Ce(e, r) {
  const [a, n] = C(void 0), [s, l] = C(null), [o, c] = C(!1), [d, h] = C(!1), [m, f] = C(!1), u = $(() => {
    n(void 0), l(null), c(!1), h(!1), f(!1);
  }, []), v = $(
    async (N) => {
      var p, w, b, x;
      c(!0), h(!1), f(!1), l(null);
      try {
        const z = await e(N);
        return n(z), h(!0), c(!1), await ((p = r == null ? void 0 : r.onSuccess) == null ? void 0 : p.call(r, z, N)), await ((w = r == null ? void 0 : r.onSettled) == null ? void 0 : w.call(r, z, null, N)), z;
      } catch (z) {
        const A = z;
        throw l(A), f(!0), c(!1), await ((b = r == null ? void 0 : r.onError) == null ? void 0 : b.call(r, A, N)), await ((x = r == null ? void 0 : r.onSettled) == null ? void 0 : x.call(r, void 0, A, N)), z;
      }
    },
    [e, r]
  ), g = $(
    (N, p) => {
      v(N).then(async (w) => {
        var b, x;
        await ((b = p == null ? void 0 : p.onSuccess) == null ? void 0 : b.call(p, w, N)), await ((x = p == null ? void 0 : p.onSettled) == null ? void 0 : x.call(p, w, null, N));
      }).catch(async (w) => {
        var b, x;
        await ((b = p == null ? void 0 : p.onError) == null ? void 0 : b.call(p, w, N)), await ((x = p == null ? void 0 : p.onSettled) == null ? void 0 : x.call(p, void 0, w, N));
      });
    },
    [v]
  );
  return {
    data: a,
    error: s,
    isPending: o,
    isLoading: o,
    isSuccess: d,
    isError: m,
    reset: u,
    mutate: g,
    mutateAsync: v
  };
}
const an = () => Ce(
  ({ conversationId: e, body: r, sender_id: a }) => Za(e, { body: r, sender_id: a }).then(
    (n) => n.data.data
  )
), nn = () => Ce(
  ({ conversationId: e, file: r, sender_id: a, caption: n }) => en(e, { file: r, sender_id: a, caption: n }).then(
    (s) => s.data.data
  )
), rr = () => {
  const e = $(async (r) => (await Gr(r)).data.data, []);
  return Ce(
    e
  );
}, sn = () => Ce(
  (e) => Or(e).then(() => {
  })
), ln = () => {
  const e = $(async (r) => {
    const a = await Kt(r);
    return typeof window < "u" && window.dispatchEvent(
      new CustomEvent("messenger:conversation-closed", {
        detail: { conversationId: r }
      })
    ), a.data.data;
  }, []);
  return Ce(
    e
  );
};
function St(e) {
  return e != null && typeof e == "object" && "attributes" in e;
}
function Q(e) {
  return e == null ? "" : String(e);
}
function on(e) {
  if (e == null || typeof e != "object") return;
  if (St(e)) return e;
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
function dn(e) {
  if (e == null || typeof e != "object") return;
  if (St(e)) return e;
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
function cn(e) {
  return typeof e == "string" ? { id: 0, name: e, icon: "" } : e != null && typeof e == "object" ? e : null;
}
function un(e) {
  if (e == null || typeof e != "object")
    return {
      id: "",
      type: "message",
      attributes: {},
      relationships: { sender: void 0, attachments: [] }
    };
  if (St(e)) return e;
  const r = e, a = Array.isArray(r.attachments) ? r.attachments.map(dn).filter((n) => n != null) : [];
  return {
    id: Q(r.id),
    type: "message",
    attributes: {
      conversation_id: Number(r.conversation_id),
      sender_id: Number(r.sender_id),
      body: Q(r.body),
      type: cn(r.type),
      created_at: Q(r.created_at),
      updated_at: Q(r.updated_at)
    },
    relationships: {
      sender: on(r.sender),
      attachments: a
    }
  };
}
let Pe = null, Rt = null;
function ar(e) {
  if (typeof window > "u")
    return null;
  const r = JSON.stringify(e);
  return Pe && Rt !== r && (Pe.disconnect(), Pe = null), Pe || (Pe = new Mr(
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
  ), Rt = r), Pe;
}
function nr(e, r, a, n) {
  if (typeof window > "u")
    return () => {
    };
  const s = ar(e);
  if (!s) return () => {
  };
  const l = s.subscribe(`conversation.${r}`);
  if (l.bind("MessageSent", (o) => {
    a(un(o));
  }), n) {
    const o = (c) => n(c);
    l.bind("UserTyping", o), l.bind("client-UserTyping", o);
  }
  return () => {
    l.unbind_all(), s.unsubscribe(`conversation.${r}`);
  };
}
function sr(e, r, a, n) {
  if (typeof window > "u")
    return () => {
    };
  const s = ar(e);
  if (!s) return () => {
  };
  const l = s.subscribe(`user.${r}`);
  return l.bind("ConversationUnreadUpdated", (o) => {
    a(o);
  }), n && (l.bind("ConversationCreated", (o) => {
    n(o);
  }), l.bind("conversation.created", (o) => {
    n(o);
  }), l.bind("NewConversation", (o) => {
    n(o);
  })), () => {
    l.unbind_all(), s.unsubscribe(`user.${r}`);
  };
}
let Bt = 0;
const mn = 1e3;
let je = null;
function hn() {
  if (typeof window > "u") return null;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    return e ? ((!je || je.state === "closed") && (je = new e()), je.state === "suspended" && je.resume(), je) : null;
  } catch {
    return null;
  }
}
function qe(e, r, a, n, s) {
  const l = e.createOscillator(), o = e.createGain();
  l.type = "sine", l.frequency.setValueAtTime(r, a), o.gain.setValueAtTime(1e-4, a), o.gain.exponentialRampToValueAtTime(s, a + 0.015), o.gain.exponentialRampToValueAtTime(1e-4, a + n), l.connect(o), o.connect(e.destination), l.start(a), l.stop(a + n + 0.05);
}
function _t(e = "focused", r = {}) {
  if (typeof window > "u") return !1;
  const a = r.throttleMs ?? mn, n = Date.now();
  if (!r.force && n - Bt < a)
    return !1;
  Bt = n;
  const s = hn();
  if (!s) return !1;
  const l = Math.max(0, Math.min(1, r.volume ?? 1));
  try {
    const o = s.currentTime;
    return e === "focused" ? (qe(s, 587.33, o, 0.08, 0.12 * l), qe(s, 880, o + 0.06, 0.14, 0.1 * l)) : (qe(s, 523.25, o, 0.1, 0.15 * l), qe(s, 659.25, o + 0.08, 0.1, 0.14 * l), qe(s, 783.99, o + 0.16, 0.22, 0.16 * l)), !0;
  } catch {
    return !1;
  }
}
const fn = (e, r) => {
  const { config: a, currentUser: n, currentUserId: s } = ne(), l = re(
    () => ({ conversation: e.id, page: { size: "20" } }),
    [e.id]
  ), {
    data: o,
    refetch: c,
    fetchNextPage: d,
    hasNextPage: h,
    isFetchingNextPage: m,
    isLoading: f,
    prependIncomingMessage: u
  } = rn({
    params: l,
    enabled: !!e.id
  }), { mutateAsync: v, isLoading: g } = an(), { mutateAsync: N, isLoading: p } = nn(), { mutateAsync: w } = rr(), { mutate: b } = sn(), { mutateAsync: x, isLoading: z } = ln(), [A, M] = C(""), [j, B] = C(null), F = !!e.attributes.closed_at, [S, _] = C([]), [D, T] = C(!0), [k, P] = C(0), [I, K] = C("Hoy"), [ze, he] = C(null), L = U(null), fe = U(!1), ce = U(!1), ve = U(0), Se = U(0), se = U(!1), ue = U(h), Re = U(e.id), be = U(null), ee = U(null), V = U(null), Ye = U(!1), Qe = U(b), lt = Fe(e, s);
  H(() => {
    Qe.current = b;
  }, [b]), H(() => {
    se.current = m;
  }, [m]), H(() => {
    ue.current = h;
  }, [h]);
  const ot = $(() => {
    const y = L.current;
    y && (y.scrollTo({
      top: y.scrollHeight,
      behavior: "smooth"
    }), P(0), T(!0));
  }, []), _e = $(() => {
    const y = L.current;
    if (!y) return;
    const X = y.scrollHeight - y.scrollTop - y.clientHeight < 140;
    T(X), X && P(0);
    const O = y.querySelectorAll("[data-message-date]");
    if (O.length === 0) {
      K("Hoy");
      return;
    }
    const Y = y.getBoundingClientRect(), de = Y.top, De = Y.bottom;
    let He = null;
    for (let ae = 0; ae < O.length; ae++) {
      const ye = O[ae], xe = ye.getBoundingClientRect();
      if (xe.bottom > de && xe.top < De) {
        He = ye.getAttribute("data-message-date");
        break;
      }
    }
    K(He || O[O.length - 1].getAttribute("data-message-date") || "Hoy");
  }, []);
  H(() => {
    Re.current !== e.id && (Re.current = e.id, fe.current = !1, ce.current = !1, ve.current = 0, Se.current = 0, _([]), T(!0), P(0), K("Hoy"));
  }, [e.id]), H(() => {
    if (fe.current || f || o.length === 0) return;
    const y = L.current;
    y && (y.scrollTop = y.scrollHeight, fe.current = !0, T(!0), _e());
  }, [e.id, f, o.length, _e]), $t(() => {
    const y = L.current;
    if (y && ve.current > 0) {
      const X = y.scrollHeight - ve.current;
      X > 0 && (y.scrollTop = Se.current + X), ve.current = 0, Se.current = 0;
    }
  }, [o]), H(() => {
    if (S.length > 0) {
      const y = L.current;
      if (y) {
        ce.current = !0, y.scrollTo({
          top: y.scrollHeight,
          behavior: "smooth"
        });
        const G = setTimeout(() => {
          ce.current = !1;
        }, 500);
        return () => clearTimeout(G);
      }
    }
  }, [S.length]), H(() => {
    const y = L.current;
    if (!y) return;
    const G = () => {
      _e(), !(ce.current || !fe.current) && y.scrollTop < 80 && ue.current && !se.current && !f && (se.current = !0, ve.current = y.scrollHeight, Se.current = y.scrollTop, d().finally(() => {
        se.current = !1;
      }));
    };
    return y.addEventListener("scroll", G, { passive: !0 }), () => {
      y.removeEventListener("scroll", G);
    };
  }, [d, f, _e]);
  const we = $(() => {
    !e.id || !s || (be.current && clearTimeout(be.current), be.current = setTimeout(() => {
      be.current = null, w({
        conversationId: e.id,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: s
      }).then(() => {
        typeof window < "u" && window.dispatchEvent(
          new CustomEvent("messenger:conversation-read", {
            detail: { conversationId: e.id }
          })
        );
      }).catch(console.error);
    }, 200));
  }, [e.id, s, w]);
  H(() => () => {
    be.current && clearTimeout(be.current), ee.current && clearTimeout(ee.current), V.current && clearTimeout(V.current);
  }, [e.id]);
  const Je = $(
    (y) => {
      u(y);
      const G = L.current;
      G && (G.scrollHeight - G.scrollTop - G.clientHeight < 160 ? setTimeout(() => {
        G.scrollTo({
          top: G.scrollHeight,
          behavior: "smooth"
        });
      }, 50) : P((Y) => Y + 1)), s && String(y.attributes.sender_id) !== String(s) && _t("focused"), we();
    },
    [s, u, we]
  ), Ze = $(
    (y) => {
      if (String(y.user_id) !== String(s)) {
        if (ee.current && (clearTimeout(ee.current), ee.current = null), !y.is_typing) {
          he(null);
          return;
        }
        he(y.user.name), ee.current = setTimeout(() => {
          ee.current = null, he(null);
        }, 2e3);
      }
    },
    [s]
  ), oe = $(
    (y) => {
      !e.id || !s || Ye.current === y || (Ye.current = y, Qe.current({
        conversationId: e.id,
        user_id: Number(s),
        is_typing: y
      }));
    },
    [e.id, s]
  ), et = $(() => {
    V.current && clearTimeout(V.current), V.current = setTimeout(() => {
      V.current = null, oe(!1);
    }, 2500);
  }, [oe]), dt = $(
    (y) => {
      if (!F) {
        if (M(y), !y.trim()) {
          V.current && (clearTimeout(V.current), V.current = null), oe(!1);
          return;
        }
        oe(!0), et();
      }
    },
    [F, et, oe]
  );
  H(() => () => {
    V.current && (clearTimeout(V.current), V.current = null), oe(!1);
  }, [e.id, oe]);
  const Ee = () => {
    e.attributes.unread_count && we();
  };
  H(() => {
    Ee();
  }, [e, o, we]), H(() => {
    if (!e.id) return;
    const y = nr(
      a.reverb,
      Number(e.id),
      Je,
      Ze
    );
    return () => {
      y();
    };
  }, [a.reverb, e.id, Je, Ze]);
  const tt = $(
    (y) => {
      F || B(y);
    },
    [F]
  ), Be = async () => {
    if (F) return;
    const y = A.trim();
    if (!y && !j || !n) return;
    const G = j, X = Xa({
      conversationId: e.id,
      sender: n,
      body: y,
      file: G
    }), O = X.id;
    _((Y) => [...Y, X]), M(""), V.current && (clearTimeout(V.current), V.current = null), oe(!1);
    try {
      const Y = G ? await N({
        conversationId: e.id,
        file: G,
        sender_id: Number(n.id),
        caption: y || void 0
      }) : await v({
        body: y,
        conversationId: e.id,
        sender_id: n.id
      });
      B(null), await c(), _((de) => de.filter((De) => De.id !== O)), we();
    } catch {
      _(
        (Y) => Y.map(
          (de) => de.id === O ? { ...de, local_status: "error" } : de
        )
      );
    }
  }, Ne = $(async () => {
    var y, G, X;
    try {
      await x(e.id), te.success("Conversación cerrada exitosamente"), (y = r == null ? void 0 : r.onCloseSuccess) == null || y.call(r);
    } catch (O) {
      const Y = ((X = (G = O == null ? void 0 : O.response) == null ? void 0 : G.data) == null ? void 0 : X.message) || (O == null ? void 0 : O.message) || "Error al cerrar la conversación";
      te.error(Y);
    }
  }, [x, e.id, r]);
  return {
    messages: o,
    optimisticMessages: S,
    scrollRef: L,
    conversationName: lt,
    inputText: A,
    pendingFile: j,
    isClosed: F,
    isClosing: z,
    isSending: g,
    isUploading: p,
    isFetchingNextPage: m,
    hasNextPage: h,
    isLoading: f,
    isNearBottom: D,
    newMessagesCount: k,
    typingUser: ze,
    visibleDate: I,
    currentUser: n,
    currentUserId: s,
    scrollToBottom: ot,
    setInputText: dt,
    setPendingFile: B,
    handleSendMessage: Be,
    handleSelectFile: tt,
    handleCloseConversation: Ne
  };
};
function bn(e, r, a = "OR") {
  const n = Array.isArray(r) ? r : [r];
  return n.length === 0 ? !0 : a === "AND" ? n.every((s) => e.includes(s)) : n.some((s) => e.includes(s));
}
function ie({
  permission: e,
  operator: r = "OR"
}) {
  const a = Wr(), n = (a == null ? void 0 : a.permissions) ?? [];
  return bn(n, e, r);
}
function xn({
  conversation: e,
  isClosed: r = !!e.attributes.closed_at,
  isClosing: a = !1,
  onCloseConversation: n,
  showResolvedBadge: s = !1,
  className: l,
  ...o
}) {
  const [c, d] = C(!1), { currentUserId: h } = ne(), m = ie({
    permission: ["messenger_chat_support.provide_support"]
  }), f = Fe(e, h);
  return r && s ? /* @__PURE__ */ i(
    me,
    {
      variant: "outline",
      className: E(
        "h-8 px-2.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100/60 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-800 gap-1 select-none",
        l
      ),
      children: [
        /* @__PURE__ */ t(rt, { className: "size-3.5 text-emerald-500" }),
        /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Resuelta" })
      ]
    }
  ) : r && !s || !m ? null : /* @__PURE__ */ i(pe, { children: [
    /* @__PURE__ */ t(
      W,
      {
        variant: "success",
        size: "sm",
        disabled: a,
        onClick: () => d(!0),
        className: E(
          "h-8 gap-1 px-2 sm:px-3 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs",
          l
        ),
        ...o,
        children: a ? /* @__PURE__ */ i(pe, { children: [
          /* @__PURE__ */ t(Ae, { className: "size-3.5 animate-spin" }),
          /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Cerrando..." })
        ] }) : /* @__PURE__ */ i(pe, { children: [
          /* @__PURE__ */ t(rt, { className: "size-3.5" }),
          /* @__PURE__ */ t("span", { className: "hidden sm:inline-block", children: "Cerrar chat" })
        ] })
      }
    ),
    /* @__PURE__ */ t(sa, { open: c, onOpenChange: d, children: /* @__PURE__ */ i(ia, { className: "sm:max-w-md p-5", children: [
      /* @__PURE__ */ i(la, { className: "gap-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ t("div", { className: "flex size-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20", children: /* @__PURE__ */ t(ke, { className: "size-4" }) }),
          /* @__PURE__ */ t(oa, { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "¿Cerrar conversación?" })
        ] }),
        /* @__PURE__ */ i(da, { className: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: [
          "¿Estás seguro de que deseas marcar como resuelta y cerrar la conversación con",
          " ",
          /* @__PURE__ */ t("strong", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children: f }),
          "? Esta acción finalizará la atención en tiempo real."
        ] })
      ] }),
      /* @__PURE__ */ i(ca, { className: "gap-2 sm:gap-0 mt-3", children: [
        /* @__PURE__ */ t(
          ua,
          {
            disabled: a,
            className: "text-xs h-8 cursor-pointer",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ t(
          ma,
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
function pn({
  conversation: e,
  isClosed: r,
  isClosing: a = !1,
  onCloseConversation: n,
  isContextPanelOpen: s = !0,
  onToggleContextPanel: l,
  onBack: o,
  alwaysShowBackButton: c = !1,
  renderOptions: d
}) {
  var v, g;
  const { currentUserId: h } = ne(), m = Ke(e), f = Fe(e, h), u = Xe(e, h);
  return /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 p-2 sm:p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs min-w-0", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden", children: [
      o && /* @__PURE__ */ t(
        W,
        {
          variant: "ghost",
          size: "sm",
          onClick: o,
          title: "Volver a la lista de chats",
          "aria-label": "Volver a la lista de chats",
          className: E(
            "size-8 p-0 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
            c ? "flex" : "flex md:hidden"
          ),
          children: /* @__PURE__ */ t(pt, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ t(
        ge,
        {
          src: u == null ? void 0 : u.attributes.avatar_url,
          name: f,
          isGroup: m,
          size: "md",
          className: "shrink-0"
        }
      ),
      /* @__PURE__ */ i("div", { className: "min-w-0 flex-1 overflow-hidden", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
          /* @__PURE__ */ t(
            "h3",
            {
              className: "truncate text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 min-w-0",
              title: f,
              children: f
            }
          ),
          r && /* @__PURE__ */ i(
            me,
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
        /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 min-w-0", children: /* @__PURE__ */ t("span", { className: "truncate", children: m ? `${((g = (v = e.relationships) == null ? void 0 : v.users) == null ? void 0 : g.length) || 0} participantes` : "Conversación individual" }) })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-1 shrink-0", children: [
      (d == null ? void 0 : d.customHeaderButtons) !== void 0 ? d.customHeaderButtons : /* @__PURE__ */ t(
        xn,
        {
          conversation: e,
          isClosed: r,
          isClosing: a,
          onCloseConversation: n,
          showResolvedBadge: !1
        }
      ),
      l && /* @__PURE__ */ t(
        W,
        {
          variant: "outline",
          size: "icon",
          onClick: l,
          className: E(
            "size-8 p-0",
            s ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" : ""
          ),
          children: /* @__PURE__ */ t(hr, { className: "size-4" })
        }
      )
    ] })
  ] });
}
function gn(e) {
  if (!e) return "";
  try {
    const r = new Date(e);
    return isNaN(r.getTime()) ? "" : r.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: !1 });
  } catch {
    return "";
  }
}
function Ht({
  message: e,
  isOwnMessage: r,
  isGroup: a,
  conversationName: n,
  conversationAvatarUrl: s
}) {
  var h, m, f, u, v, g, N;
  const l = Ge(((f = (m = (h = e.relationships) == null ? void 0 : h.sender) == null ? void 0 : m.attributes) == null ? void 0 : f.name) || n), o = ((g = (v = (u = e.relationships) == null ? void 0 : u.sender) == null ? void 0 : v.attributes) == null ? void 0 : g.avatar_url) || void 0, c = gn(e.attributes.created_at), d = ((N = e.relationships) == null ? void 0 : N.attachments) ?? [];
  return /* @__PURE__ */ i(
    "div",
    {
      className: E(
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
            src: s,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ i("div", { className: E("flex min-w-0 flex-col gap-1", r && "items-end"), children: [
          /* @__PURE__ */ t("span", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate", children: r ? "Tú" : l }),
          /* @__PURE__ */ i(
            "div",
            {
              className: E(
                "rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words",
                r ? "rounded-tr-xs bg-blue-600 text-white shadow-xs" : "rounded-tl-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs"
              ),
              children: [
                d.map((p) => p.attributes.file_mime_type.startsWith("image/") ? /* @__PURE__ */ t(
                  "a",
                  {
                    href: p.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10",
                    children: /* @__PURE__ */ t(
                      "img",
                      {
                        src: p.attributes.file_url,
                        alt: p.attributes.file_name,
                        className: "max-h-64 max-w-full object-contain rounded-xl",
                        loading: "lazy"
                      }
                    )
                  },
                  p.id
                ) : /* @__PURE__ */ i(
                  "a",
                  {
                    href: p.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    download: p.attributes.file_name,
                    className: "mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                    children: [
                      /* @__PURE__ */ t(fr, { className: "size-4 shrink-0" }),
                      /* @__PURE__ */ t("span", { className: "min-w-0 flex-1 truncate font-medium", children: p.attributes.file_name }),
                      /* @__PURE__ */ t(br, { className: "size-3.5 shrink-0" })
                    ]
                  },
                  p.id
                )),
                e.attributes.body && d.length === 0 && /* @__PURE__ */ t("p", { className: "whitespace-pre-wrap break-words", children: e.attributes.body }),
                e.attributes.body && d.length > 0 && e.attributes.body !== "Archivo adjunto" && /* @__PURE__ */ t("p", { className: "whitespace-pre-wrap break-words mt-1", children: e.attributes.body }),
                /* @__PURE__ */ i("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none", children: [
                  /* @__PURE__ */ t(
                    "time",
                    {
                      dateTime: e.attributes.created_at,
                      className: r ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400",
                      children: c
                    }
                  ),
                  r && e.local_status === "sending" && /* @__PURE__ */ t(
                    gt,
                    {
                      className: "size-3 text-blue-200 animate-spin",
                      "aria-label": "Pendiente de envío"
                    }
                  ),
                  r && e.local_status === "sent" && /* @__PURE__ */ t(xr, { className: "size-3 text-blue-200", "aria-label": "Enviado" }),
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
function vn({
  conversation: e,
  messages: r,
  optimisticMessages: a = [],
  scrollRef: n,
  isFetchingNextPage: s = !1,
  hasNextPage: l = !1,
  isLoading: o = !1,
  isNearBottom: c = !0,
  newMessagesCount: d = 0,
  visibleDate: h = "Hoy",
  onScrollToBottom: m
}) {
  const { currentUserId: f } = ne(), u = Ke(e), v = Fe(e, f), g = Xe(e, f), N = new Set(
    r.flatMap((b) => b.messages.map((x) => x.id))
  ), p = a.filter(
    (b) => !N.has(b.id)
  ), w = h.toLowerCase() === "hoy" || h.toLowerCase() === "today" || ht(h) === "Hoy";
  return /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 relative w-full overflow-hidden", children: /* @__PURE__ */ t(Oe, { ref: n, className: "relative z-10 h-full w-full", children: /* @__PURE__ */ i("div", { className: "space-y-4 p-3 sm:p-4 text-sm w-full min-w-0", children: [
    s && /* @__PURE__ */ i("div", { className: "flex items-center justify-center py-2 gap-2 text-xs text-neutral-500 animate-in fade-in duration-200", children: [
      /* @__PURE__ */ t(Ae, { className: "size-3.5 animate-spin text-blue-600" }),
      /* @__PURE__ */ t("span", { children: "Cargando mensajes anteriores..." })
    ] }),
    !l && r.length > 0 && /* @__PURE__ */ t("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400", children: "Inicio de la conversación" }) }),
    o && r.length === 0 && /* @__PURE__ */ i("div", { className: "space-y-4 py-2 animate-in fade-in duration-300", children: [
      /* @__PURE__ */ i("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ t(R, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(R, { className: "h-3 w-20 rounded" }),
          /* @__PURE__ */ t(R, { className: "h-12 w-48 sm:w-64 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ t(R, { className: "h-14 w-52 sm:w-64 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) }),
      /* @__PURE__ */ i("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
        /* @__PURE__ */ t(R, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(R, { className: "h-3 w-16 rounded" }),
          /* @__PURE__ */ t(R, { className: "h-16 w-56 sm:w-72 rounded-2xl rounded-bl-none" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ t(R, { className: "h-10 w-36 sm:w-44 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) })
    ] }),
    r.length > 0 && /* @__PURE__ */ t("div", { className: "sticky top-1 z-20 flex justify-center pointer-events-none mb-2 transition-all duration-200", children: /* @__PURE__ */ t("div", { className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs", children: /* @__PURE__ */ t("span", { children: w ? "Hoy" : ht(h) }) }) }),
    [...r ?? []].reverse().map((b) => /* @__PURE__ */ i(
      "div",
      {
        "data-date-group": b.date,
        className: "space-y-4",
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: ht(b.date) }) }),
          [...b.messages].reverse().map((x) => {
            var A, M;
            const z = String((M = (A = x == null ? void 0 : x.relationships) == null ? void 0 : A.sender) == null ? void 0 : M.id) === String(f);
            return /* @__PURE__ */ t(
              "div",
              {
                "data-message-date": b.date,
                className: "w-full",
                children: /* @__PURE__ */ t(
                  Ht,
                  {
                    message: z ? { ...x, local_status: "sent" } : x,
                    isOwnMessage: z,
                    isGroup: u,
                    conversationName: v,
                    conversationAvatarUrl: (g == null ? void 0 : g.attributes.avatar_url) || void 0
                  }
                )
              },
              x.id
            );
          })
        ]
      },
      b.date
    )),
    p.length > 0 && /* @__PURE__ */ i("div", { "data-date-group": "Hoy", className: "space-y-4", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ t("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: "Hoy" }) }),
      [...p].map((b) => {
        var x;
        return /* @__PURE__ */ t(
          "div",
          {
            "data-message-date": ((x = b.attributes.created_at) == null ? void 0 : x.slice(0, 10)) || "Hoy",
            className: "w-full",
            children: /* @__PURE__ */ t(
              Ht,
              {
                message: b,
                isOwnMessage: !0,
                isGroup: u,
                conversationName: v,
                conversationAvatarUrl: (g == null ? void 0 : g.attributes.avatar_url) || void 0
              }
            )
          },
          b.id
        );
      })
    ] }),
    !c && m && /* @__PURE__ */ t("div", { className: "sticky bottom-2 z-30 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200", children: /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        onClick: m,
        className: "pointer-events-auto relative flex size-9 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95 cursor-pointer",
        "aria-label": "Desplazar a mensajes recientes",
        title: "Desplazar a mensajes recientes",
        children: [
          /* @__PURE__ */ t(pr, { className: "size-4" }),
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
function wn({
  inputText: e,
  setInputText: r,
  onSendMessage: a,
  onSelectFile: n,
  pendingFile: s,
  onRemoveFile: l,
  isSending: o,
  isUploading: c,
  conversationName: d,
  isClosed: h = !1,
  readOnly: m = !1,
  readOnlyMessage: f
}) {
  const u = U(null), v = 120, g = re(
    () => s && s.type.startsWith("image/") ? URL.createObjectURL(s) : void 0,
    [s]
  );
  if (H(() => () => {
    g && URL.revokeObjectURL(g);
  }, [g]), $t(() => {
    const b = u.current;
    if (!b) return;
    b.style.height = "auto";
    const x = Math.min(b.scrollHeight, v);
    b.style.height = `${x}px`, b.style.overflowY = b.scrollHeight > v ? "auto" : "hidden";
  }, [e]), h || m)
    return /* @__PURE__ */ t("div", { className: "shrink-0 px-3 pb-3 pt-1 text-center sm:px-4 sm:pb-4", children: /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-2 rounded-xl border border-neutral-200/80 bg-white/85 dark:border-neutral-800/80 dark:bg-neutral-900/85 backdrop-blur-md px-4 py-2 text-xs font-medium text-neutral-500 shadow-xs dark:text-neutral-400", children: [
      /* @__PURE__ */ t(ke, { className: "size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" }),
      /* @__PURE__ */ t("span", { children: f || (h ? "Esta conversación ha sido finalizada y no admite nuevos mensajes." : "No se permite enviar mensajes en esta conversación.") })
    ] }) });
  const N = (b) => {
    b.key === "Enter" && !b.shiftKey && (b.preventDefault(), a());
  }, p = (b) => {
    var z;
    const x = (z = b.target.files) == null ? void 0 : z[0];
    x && n(x), b.target.value = "";
  }, w = (b) => {
    var z;
    if (o || c) return;
    const x = (z = b.clipboardData) == null ? void 0 : z.items;
    if (x)
      for (let A = 0; A < x.length; A++) {
        const M = x[A];
        if (M.kind === "file" && M.type.startsWith("image/")) {
          const j = M.getAsFile();
          if (j) {
            b.preventDefault(), n(j);
            return;
          }
        }
      }
  };
  return /* @__PURE__ */ t("div", { className: "shrink-0 px-3 pb-3 pt-1 sm:px-4 sm:pb-4", children: /* @__PURE__ */ i("div", { className: "relative", children: [
    s && /* @__PURE__ */ i("div", { className: "mb-2 flex items-center gap-2 rounded-xl border border-neutral-200/80 bg-white/95 backdrop-blur-md p-2 shadow-xs dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      s.type.startsWith("image/") ? /* @__PURE__ */ t(
        "img",
        {
          src: g || "",
          alt: "Archivo seleccionado",
          className: "size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
        }
      ) : /* @__PURE__ */ t("div", { className: "flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ t(Mt, { className: "size-5" }) }),
      /* @__PURE__ */ t("span", { className: "min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-300 font-medium", children: s.name || "Archivo listo para enviar" }),
      /* @__PURE__ */ t(
        W,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: l,
          className: "size-7 shrink-0 p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          "aria-label": "Quitar archivo",
          children: /* @__PURE__ */ t(le, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 rounded-2xl border border-neutral-200/80 bg-white/95 backdrop-blur-md px-2.5 py-1.5 shadow-sm transition-all focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:shadow-md dark:border-neutral-700/80 dark:bg-neutral-800/95", children: [
      /* @__PURE__ */ i(
        "label",
        {
          className: "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200",
          title: "Adjuntar archivo",
          children: [
            /* @__PURE__ */ t(Mt, { className: "size-4" }),
            /* @__PURE__ */ t(
              "input",
              {
                type: "file",
                className: "sr-only",
                onChange: p,
                disabled: o || c
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ t(
        zt,
        {
          ref: u,
          value: e,
          onChange: (b) => r(b.target.value),
          onKeyDown: N,
          onPaste: w,
          placeholder: `Responder a ${d}...`,
          rows: 1,
          className: "!min-h-0 !border-transparent max-h-30 flex-1 resize-none overflow-y-hidden rounded-xl bg-transparent px-2 py-1 text-xs leading-5 shadow-none !outline-none focus:!border-transparent focus:!outline-none focus-visible:!border-transparent focus-visible:!ring-0 focus-visible:!outline-none sm:text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400"
        }
      ),
      /* @__PURE__ */ t(
        W,
        {
          size: "icon",
          variant: "primary",
          onClick: a,
          disabled: !e.trim() && !s || o || c,
          className: "size-8 shrink-0 rounded-full p-0",
          "aria-label": "Enviar mensaje",
          title: "Enviar mensaje",
          children: /* @__PURE__ */ t(qt, { className: "size-4" })
        }
      )
    ] })
  ] }) });
}
function Nn({ className: e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "aria-hidden": "true",
      className: E(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        e
      ),
      children: /* @__PURE__ */ i(
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
                      /* @__PURE__ */ i("g", { transform: "translate(210, 24)", children: [
                        /* @__PURE__ */ t("path", { d: "M10 0s-7 2-10 3v8c0 6 7 11 10 13 3-2 10-7 10-13V3c-3-1-10-3-10-3z" }),
                        /* @__PURE__ */ t("path", { d: "M6 11l3 3 6-6", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(294, 28)", children: [
                        /* @__PURE__ */ t("rect", { x: "0", y: "0", width: "28", height: "19", rx: "4" }),
                        /* @__PURE__ */ t("path", { d: "M6 9l3 3-3 3M14 15h6" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(30, 96)", children: [
                        /* @__PURE__ */ t("path", { d: "M0 0h24a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-12l-6 5v-5h-2a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" }),
                        /* @__PURE__ */ t("path", { d: "M6 6h12M6 10h8" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(126, 96)", children: [
                        /* @__PURE__ */ t("circle", { cx: "11", cy: "11", r: "10" }),
                        /* @__PURE__ */ t("circle", { cx: "11", cy: "11", r: "4.5" }),
                        /* @__PURE__ */ t("path", { d: "M4 4l3.5 3.5M14.5 14.5l3.5 3.5M18 4l-3.5 3.5M7.5 14.5L4 18" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(214, 96)", children: [
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
                      /* @__PURE__ */ i("g", { transform: "translate(298, 98)", children: [
                        /* @__PURE__ */ t("ellipse", { cx: "10", cy: "4", rx: "9", ry: "3" }),
                        /* @__PURE__ */ t("path", { d: "M1 4v5c0 1.66 4.03 3 9 3s9-1.34 9-3V4" }),
                        /* @__PURE__ */ t("path", { d: "M1 9v5c0 1.66 4.03 3 9 3s9-1.34 9-3V9" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(32, 172)", children: [
                        /* @__PURE__ */ t("path", { d: "M0 6l4 4 9-9" }),
                        /* @__PURE__ */ t("path", { d: "M7 6l4 4 9-9" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(124, 168)", children: [
                        /* @__PURE__ */ t("rect", { x: "0", y: "7", width: "18", height: "13", rx: "3" }),
                        /* @__PURE__ */ t("path", { d: "M4 7V4a5 5 0 0 1 10 0v3" }),
                        /* @__PURE__ */ t("circle", { cx: "9", cy: "13.5", r: "1.5", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ t("g", { transform: "translate(210, 174)", children: /* @__PURE__ */ t("path", { d: "M0 6h6l3-6 5 12 4-8 3 4h7" }) }),
                      /* @__PURE__ */ i("g", { transform: "translate(298, 168)", children: [
                        /* @__PURE__ */ t("path", { d: "M0 0h13l6 6v13a3 3 0 0 1-3 3H0a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ t("path", { d: "M13 0v6h6" }),
                        /* @__PURE__ */ t("path", { d: "M4 12l2.5 2.5 5-5", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(28, 244)", children: [
                        /* @__PURE__ */ t("circle", { cx: "4", cy: "4", r: "3" }),
                        /* @__PURE__ */ t("circle", { cx: "20", cy: "4", r: "3" }),
                        /* @__PURE__ */ t("circle", { cx: "12", cy: "18", r: "3" }),
                        /* @__PURE__ */ t("path", { d: "M6.5 5.5l3.5 10M17.5 5.5l-3.5 10M7 4h10" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(114, 246)", children: [
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
                      /* @__PURE__ */ i("g", { transform: "translate(300, 246)", children: [
                        /* @__PURE__ */ t("circle", { cx: "10", cy: "10", r: "9" }),
                        /* @__PURE__ */ t("path", { d: "M10 5v5l3.5 2" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(30, 316)", children: [
                        /* @__PURE__ */ t("path", { d: "M0 0h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6l-5 4v-4h-2a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ t("circle", { cx: "5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "9.5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "14", cy: "7", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ i("g", { transform: "translate(128, 320)", children: [
                        /* @__PURE__ */ t("circle", { cx: "2", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "10", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "18", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "2", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "10", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ t("circle", { cx: "18", cy: "10", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ t("g", { transform: "translate(216, 318)", children: /* @__PURE__ */ t("path", { d: "M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5z" }) }),
                      /* @__PURE__ */ i("g", { transform: "translate(292, 318)", children: [
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
function yn({
  conversation: e,
  onToggleContextPanel: r,
  isContextPanelOpen: a = !0,
  onBack: n,
  alwaysShowBackButton: s = !1,
  onCloseSuccess: l,
  showHeader: o = !0,
  showWallpaper: c = !0,
  readOnly: d = !1,
  readOnlyMessage: h,
  showComposer: m = !0,
  renderOptions: f
}) {
  const u = fn(e, {
    onCloseSuccess: () => {
      l == null || l(), n == null || n();
    }
  }), [v, g] = C(!1), N = U(0), p = d || u.isClosed || u.isSending || u.isUploading, w = (j) => {
    if (j.preventDefault(), j.stopPropagation(), p) return;
    j.dataTransfer.types && Array.from(j.dataTransfer.types).includes("Files") && (N.current += 1, g(!0));
  }, b = (j) => {
    j.preventDefault(), j.stopPropagation(), !p && (j.dataTransfer.dropEffect = "copy");
  }, x = (j) => {
    j.preventDefault(), j.stopPropagation(), N.current -= 1, N.current <= 0 && (N.current = 0, g(!1));
  }, z = (j) => {
    if (j.preventDefault(), j.stopPropagation(), N.current = 0, g(!1), p) return;
    const B = j.dataTransfer.files;
    if (B && B.length > 0) {
      const F = B[0];
      F.type.startsWith("image/") && u.handleSelectFile(F);
    }
  }, A = (j) => {
    var F;
    if (p) return;
    const B = (F = j.clipboardData) == null ? void 0 : F.items;
    if (B)
      for (let S = 0; S < B.length; S++) {
        const _ = B[S];
        if (_.kind === "file" && _.type.startsWith("image/")) {
          const D = _.getAsFile();
          if (D) {
            j.preventDefault(), u.handleSelectFile(D);
            return;
          }
        }
      }
  }, M = re(
    () => ({
      conversation: e,
      isClosed: u.isClosed,
      isClosing: u.isClosing,
      handleCloseConversation: u.handleCloseConversation
    }),
    [e, u.isClosed, u.isClosing, u.handleCloseConversation]
  );
  return H(() => (Me.set(e), () => {
    Me.set(null);
  }), [e]), /* @__PURE__ */ t(Kr, { value: M, children: /* @__PURE__ */ i(
    "div",
    {
      className: "sdi-messenger-root relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
      onDragEnter: w,
      onDragOver: b,
      onDragLeave: x,
      onDrop: z,
      onPaste: A,
      children: [
        o && /* @__PURE__ */ t(
          pn,
          {
            conversation: e,
            isClosed: u.isClosed,
            isClosing: u.isClosing,
            onCloseConversation: u.handleCloseConversation,
            isContextPanelOpen: a,
            onToggleContextPanel: r,
            onBack: n,
            alwaysShowBackButton: s,
            renderOptions: f
          }
        ),
        /* @__PURE__ */ i("div", { className: "relative flex flex-1 min-h-0 w-full flex-col overflow-hidden bg-[#f4f6f8]/70 dark:bg-[#0a0f1d]", children: [
          c && /* @__PURE__ */ t(Nn, {}),
          v && /* @__PURE__ */ t("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center bg-blue-500/10 dark:bg-blue-600/20 backdrop-blur-xs border-2 border-dashed border-blue-500/70 dark:border-blue-400/70 rounded-2xl m-2 pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95", children: /* @__PURE__ */ i("div", { className: "flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 dark:bg-neutral-900/95 shadow-xl border border-blue-500/20 text-center max-w-xs mx-4", children: [
            /* @__PURE__ */ t("div", { className: "flex size-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-inner", children: /* @__PURE__ */ t(gr, { className: "size-7 animate-bounce" }) }),
            /* @__PURE__ */ i("div", { children: [
              /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-neutral-800 dark:text-neutral-100", children: "Suelta tu imagen aquí" }),
              /* @__PURE__ */ t("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Se adjuntará para que puedas enviarla" })
            ] })
          ] }) }),
          /* @__PURE__ */ t(
            vn,
            {
              conversation: e,
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
          u.typingUser && !d && /* @__PURE__ */ i("div", { className: "relative z-10 flex shrink-0 items-center gap-1.5 px-4 py-1 text-xs text-neutral-500 dark:text-neutral-400 animate-in fade-in duration-150", children: [
            /* @__PURE__ */ i("span", { className: "font-medium", children: [
              u.typingUser,
              " está escribiendo"
            ] }),
            /* @__PURE__ */ i("span", { className: "inline-flex gap-0.5", "aria-hidden": "true", children: [
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse" }),
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-75" }),
              /* @__PURE__ */ t("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-150" })
            ] })
          ] }),
          m && /* @__PURE__ */ t("div", { className: "relative z-10 w-full", children: /* @__PURE__ */ t(
            wn,
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
              readOnlyMessage: h
            }
          ) })
        ] })
      ]
    }
  ) });
}
function kn({
  message: e = "Tu solicitud de soporte ha sido registrada exitosamente. En este momento no hay técnicos disponibles en línea; un técnico atenderá tu requerimiento a la brevedad.",
  ticket: r,
  onNewRequest: a,
  onViewChats: n,
  onClose: s,
  canViewChatList: l = !1
}) {
  const o = (r == null ? void 0 : r.number) ?? (r == null ? void 0 : r.id) ?? "N/A";
  return /* @__PURE__ */ i("div", { className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 bg-neutral-50/70 dark:bg-neutral-900", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(vt, { className: "size-4 text-emerald-600 dark:text-emerald-400" }),
        /* @__PURE__ */ t("span", { className: "text-xs font-bold text-neutral-800 dark:text-neutral-200", children: "Solicitud Registrada" })
      ] }),
      s && /* @__PURE__ */ t(
        W,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: s,
          className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          children: /* @__PURE__ */ t(le, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4", children: [
      /* @__PURE__ */ i("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ t("div", { className: "size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(gt, { className: "size-7" }) }),
        /* @__PURE__ */ t("div", { className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ t(rt, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "Ticket de Soporte Creado" }),
        /* @__PURE__ */ t("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed", children: e })
      ] }),
      r && /* @__PURE__ */ i("div", { className: "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200", children: [
            /* @__PURE__ */ t(vr, { className: "size-3.5 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ i("span", { children: [
              "Ticket #",
              o
            ] })
          ] }),
          /* @__PURE__ */ t(me, { variant: "outline", className: "text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", children: r.status === "created" ? "Registrado" : r.status })
        ] }),
        r.subject && /* @__PURE__ */ i("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ t("span", { className: "text-[10.5px] font-medium text-neutral-400", children: "Asunto:" }),
          /* @__PURE__ */ t("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2", children: r.subject })
        ] }),
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between text-[11px] text-neutral-500 pt-1", children: [
          /* @__PURE__ */ i("span", { children: [
            "Canal: ",
            /* @__PURE__ */ t("strong", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: r.request_source || "Chat" })
          ] }),
          /* @__PURE__ */ i("span", { className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-medium", children: [
            /* @__PURE__ */ t("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            "En cola de atención"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-2.5 text-[11px] text-blue-900/80 dark:text-blue-300/80 text-left w-full", children: /* @__PURE__ */ t("p", { children: "Te notificaremos en cuanto un técnico tome tu ticket. Puedes consultar el estado en cualquier momento." }) })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900 flex items-center gap-2", children: [
      /* @__PURE__ */ i(
        W,
        {
          type: "button",
          variant: "secondary",
          size: "sm",
          onClick: a,
          className: "flex-1 gap-1.5 text-xs font-medium cursor-pointer",
          children: [
            /* @__PURE__ */ t(wr, { className: "size-3.5" }),
            /* @__PURE__ */ t("span", { children: "Nueva Consulta" })
          ]
        }
      ),
      l && n && /* @__PURE__ */ i(
        W,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: n,
          className: "flex-1 gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
          children: [
            /* @__PURE__ */ t(wt, { className: "size-3.5" }),
            /* @__PURE__ */ t("span", { children: "Ver mis chats" })
          ]
        }
      )
    ] })
  ] });
}
function ir(e, r = 300) {
  const [a, n] = C(e);
  return H(() => {
    const s = setTimeout(() => {
      n(e);
    }, r);
    return () => {
      clearTimeout(s);
    };
  }, [e, r]), a;
}
function Et(e) {
  var D;
  const {
    queryKey: r,
    queryFn: a,
    enabled: n = !0,
    initialData: s,
    placeholderData: l,
    keepPreviousData: o = !1,
    onSuccess: c,
    onError: d
  } = e, [h, m] = C(() => s !== void 0 ? s : typeof l == "function" ? l(void 0) : l), [f, u] = C(null), [v, g] = C(() => n && h === void 0), [N, p] = C(() => h !== void 0), [w, b] = C(!1), x = U(a);
  x.current = a;
  const z = U(c);
  z.current = c;
  const A = U(d);
  A.current = d;
  const M = U(0), j = U(!0), B = JSON.stringify(r), F = $(async () => {
    var k, P;
    const T = ++M.current;
    g(!0), b(!1), u(null);
    try {
      const I = await x.current();
      return T === M.current && (m(I), p(!0), b(!1), u(null), g(!1), (k = z.current) == null || k.call(z, I)), I;
    } catch (I) {
      if (T === M.current) {
        const K = I;
        u(K), b(!0), p(!1), g(!1), (P = A.current) == null || P.call(A, K);
      }
      return;
    }
  }, []);
  H(() => {
    if (!n) {
      g(!1);
      return;
    }
    j.current || (l !== void 0 ? m(
      typeof l == "function" ? (T) => l(T) : l
    ) : o || m(void 0)), j.current = !1, F();
  }, [n, B, o]);
  const S = ((D = f == null ? void 0 : f.response) == null ? void 0 : D.data) ?? (f == null ? void 0 : f.data) ?? {}, _ = n && v && h === void 0;
  return {
    data: h,
    error: f,
    errors: S,
    isLoading: _,
    isPending: _,
    isFetching: v,
    isSuccess: N,
    isError: w,
    refetch: F,
    setData: m
  };
}
const Cn = (e) => {
  var n, s, l, o, c;
  const r = (e == null ? void 0 : e.params) ?? {}, a = Et({
    queryKey: ["list-chat-users", r],
    queryFn: () => Fr(r),
    enabled: (e == null ? void 0 : e.enable) !== !1,
    keepPreviousData: !0
  });
  return {
    data: ((n = a.data) == null ? void 0 : n.data.data) ?? [],
    meta: (l = (s = a.data) == null ? void 0 : s.data) == null ? void 0 : l.meta,
    links: (c = (o = a.data) == null ? void 0 : o.data) == null ? void 0 : c.links,
    isLoading: a.isLoading,
    isFetching: a.isFetching,
    errors: a.errors,
    refetch: a.refetch
  };
}, zn = () => {
  const e = $(async (r) => {
    const a = await qr(r);
    return typeof window < "u" && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversation: a.data.data }
      })
    ), a.data.data;
  }, []);
  return Ce(
    e
  );
};
function Sn({
  open: e,
  onOpenChange: r,
  onSuccess: a
}) {
  const { currentUserId: n } = ne(), [s, l] = C("direct"), [o, c] = C(""), d = ir(o, 300), [h, m] = C(null), [f, u] = C([]), [v, g] = C(""), { data: N, isLoading: p } = Cn({
    enable: e,
    params: {
      sort: "name",
      paginate: "false",
      ...d.trim() ? { filter: { name: d.trim() } } : {}
    }
  }), { mutateAsync: w, isLoading: b } = zn(), x = re(() => (N || []).filter((S) => String(S.id) !== String(n)), [N, n]), z = (S) => {
    u((_) => _.some((T) => T.id === S.id) ? _.filter((T) => T.id !== S.id) : [..._, S]);
  }, A = (S) => {
    u((_) => _.filter((D) => D.id !== S));
  }, M = () => {
    m(null), u([]), g(""), c(""), l("direct");
  }, j = (S) => {
    S || M(), r(S);
  }, B = async (S) => {
    var _, D, T, k;
    if (S.preventDefault(), s === "direct") {
      if (!h) {
        te.warning("Por favor, selecciona un usuario para iniciar la conversación.");
        return;
      }
      try {
        const P = await w({
          type: "direct",
          user_id: Number(h),
          sender_id: Number(n)
        });
        te.success("Conversación iniciada correctamente"), j(!1), a && P && a(P);
      } catch (P) {
        const I = ((D = (_ = P == null ? void 0 : P.response) == null ? void 0 : _.data) == null ? void 0 : D.message) || (P == null ? void 0 : P.message) || "Error al iniciar la conversación";
        te.error(I);
      }
    } else {
      if (!v.trim()) {
        te.warning("Por favor, ingresa el nombre del grupo.");
        return;
      }
      if (f.length === 0) {
        te.warning("Por favor, selecciona al menos un participante para el grupo.");
        return;
      }
      try {
        const P = await w({
          type: "group",
          name: v.trim(),
          user_ids: f.map((I) => Number(I.id)),
          sender_id: Number(n)
        });
        te.success("Grupo creado correctamente"), j(!1), a && P && a(P);
      } catch (P) {
        const I = ((k = (T = P == null ? void 0 : P.response) == null ? void 0 : T.data) == null ? void 0 : k.message) || (P == null ? void 0 : P.message) || "Error al crear el grupo";
        te.error(I);
      }
    }
  }, F = b || s === "direct" && !h || s === "group" && (!v.trim() || f.length === 0);
  return /* @__PURE__ */ t(Zr, { open: e, onOpenChange: j, children: /* @__PURE__ */ t(ea, { className: "sm:max-w-[480px]", children: /* @__PURE__ */ i("form", { onSubmit: B, className: "flex flex-col", children: [
    /* @__PURE__ */ i(ta, { children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ t("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ t(Ve, { className: "size-5" }) }),
        /* @__PURE__ */ i("div", { className: "text-left pr-6", children: [
          /* @__PURE__ */ t(ra, { children: "Nueva Conversación" }),
          /* @__PURE__ */ t(aa, { children: "Inicia un chat directo o crea un grupo de conversación" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "mt-3.5", children: /* @__PURE__ */ t(
        er,
        {
          value: s,
          onValueChange: (S) => l(S),
          className: "w-full",
          children: /* @__PURE__ */ i(tr, { className: "w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ i(
              st,
              {
                value: "direct",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ t(at, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { children: "Directo (1 a 1)" })
                ]
              }
            ),
            /* @__PURE__ */ i(
              st,
              {
                value: "group",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ t(xt, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { children: "Grupo" })
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
          /* @__PURE__ */ t("span", { children: "Nombre del Grupo" }),
          /* @__PURE__ */ t("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ t(
          Ct,
          {
            placeholder: "Ej. Soporte Técnico L2, Equipo Infraestructura...",
            value: v,
            onChange: (S) => g(S.target.value),
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
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => u([]),
              className: "text-[10px] text-red-500 hover:underline cursor-pointer",
              children: "Quitar todos"
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800", children: f.map((S) => {
          const _ = Ge(S.attributes.name);
          return /* @__PURE__ */ i(
            me,
            {
              variant: "secondary",
              className: "gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
              children: [
                /* @__PURE__ */ t(
                  ge,
                  {
                    name: _,
                    src: S.attributes.avatar_url,
                    size: "xs"
                  }
                ),
                /* @__PURE__ */ t("span", { className: "max-w-28 truncate font-medium capitalize", children: _ }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: () => A(S.id),
                    className: "rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
                    children: /* @__PURE__ */ t(le, { className: "size-3" })
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
          /* @__PURE__ */ t("span", { children: s === "direct" ? "Selecciona un usuario" : "Añadir participantes" }),
          /* @__PURE__ */ i("span", { className: "text-[10px] font-normal text-neutral-400", children: [
            x.length,
            " disponibles"
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
          /* @__PURE__ */ t(Vt, { className: "size-3.5 shrink-0 text-neutral-400" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "text",
              placeholder: "Buscar por nombre...",
              value: o,
              onChange: (S) => c(S.target.value),
              className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
            }
          ),
          o && /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => c(""),
              className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer",
              children: /* @__PURE__ */ t(le, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden", children: /* @__PURE__ */ t(Oe, { className: "h-56 sm:h-64 w-full", children: p ? /* @__PURE__ */ i("div", { className: "flex h-56 items-center justify-center gap-2 text-xs text-neutral-500", children: [
        /* @__PURE__ */ t(Ae, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ t("span", { children: "Cargando usuarios..." })
      ] }) : x.length === 0 ? /* @__PURE__ */ i("div", { className: "flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500", children: [
        /* @__PURE__ */ t("p", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: "No se encontraron usuarios" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] mt-1", children: "Prueba con otro término de búsqueda" })
      ] }) : /* @__PURE__ */ t("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5", children: x.map((S) => {
        const _ = h === S.id, D = f.some((P) => P.id === S.id), T = s === "direct" ? _ : D, k = Ge(S.attributes.name);
        return /* @__PURE__ */ i(
          "div",
          {
            onClick: () => {
              s === "direct" ? m(S.id) : z(S);
            },
            className: E(
              "flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors",
              T ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium" : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200"
            ),
            children: [
              /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
                /* @__PURE__ */ t(
                  ge,
                  {
                    name: k,
                    src: S.attributes.avatar_url,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ t("p", { className: "truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize", children: k }) })
              ] }),
              /* @__PURE__ */ t("div", { className: "shrink-0 pl-1", children: /* @__PURE__ */ t(
                "div",
                {
                  className: E(
                    "flex size-5 items-center justify-center rounded-full border transition-all",
                    T ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent"
                  ),
                  children: /* @__PURE__ */ t(Nr, { className: "size-3 stroke-[2.5]" })
                }
              ) })
            ]
          },
          S.id
        );
      }) }) }) })
    ] }),
    /* @__PURE__ */ i(na, { children: [
      /* @__PURE__ */ t(
        W,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => j(!1),
          disabled: b,
          className: "text-xs h-8 px-3.5 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ t(
        W,
        {
          type: "submit",
          size: "sm",
          variant: "primary",
          disabled: F,
          className: "text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer",
          children: b ? /* @__PURE__ */ i(pe, { children: [
            /* @__PURE__ */ t(Ae, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ t("span", { children: "Creando..." })
          ] }) : /* @__PURE__ */ i(pe, { children: [
            /* @__PURE__ */ t(Ve, { className: "size-3.5" }),
            /* @__PURE__ */ t("span", { children: s === "direct" ? "Iniciar Chat" : "Crear Grupo" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const _n = (e) => {
  var n, s, l, o;
  const r = (e == null ? void 0 : e.params) ?? {}, a = Et({
    queryKey: ["list-conversations", r],
    queryFn: () => $r(r),
    enabled: (e == null ? void 0 : e.enable) !== !1,
    keepPreviousData: !0
  });
  return {
    data: ((n = a.data) == null ? void 0 : n.data.data) ?? [],
    meta: (l = (s = a.data) == null ? void 0 : s.data) == null ? void 0 : l.meta,
    links: (o = a.data) == null ? void 0 : o.data.links,
    isLoading: a.isLoading,
    isFetching: a.isFetching,
    errors: a.errors,
    refetch: a.refetch
  };
}, En = ({
  showToastOnUnread: e = !0,
  isActive: r = !0
} = {}) => {
  const { config: a, currentUser: n, currentUserId: s } = ne(), { mutateAsync: l } = rr(), o = ie({
    permission: ["messenger_chat.read"]
  }), [c, d] = C("0"), [h, m] = C("all"), [f, u] = C(""), v = ir(f, 300), g = re(() => {
    const L = {
      closed: c
    };
    return h !== "all" && (L.type = h), v.trim() && (L.name = v.trim()), {
      user_id: s,
      paginate: "false",
      ...Object.keys(L).length > 0 ? { filter: L } : {}
    };
  }, [c, h, v, s]), {
    data: N,
    isLoading: p,
    isFetching: w,
    errors: b,
    refetch: x
  } = _n({
    params: g,
    enable: !!s && o
  }), [z, A] = C(""), [M, j] = C(!1), [B, F] = C(!1), [S, _] = C(!1), D = re(() => !r || !z ? N : N.map((L) => L.id === z && L.attributes.unread_count > 0 ? {
    ...L,
    attributes: {
      ...L.attributes,
      unread_count: 0
    }
  } : L), [r, N, z]), T = $(
    (L) => {
      const fe = s && String(L.message.sender_id) !== String(s), ce = r && String(L.conversation_id) === z;
      fe && _t(ce ? "focused" : "unfocused"), e && !ce && te.info("Nuevo mensaje", {
        id: `conversation-message-${L.message.id}`,
        description: L.message.body || "Tienes un mensaje nuevo",
        action: {
          label: "Abrir",
          onClick: () => {
            A(String(L.conversation_id)), F(!0);
          }
        }
      }), x();
    },
    [s, r, x, z, e]
  ), k = $(() => {
    x();
  }, [x]);
  H(() => {
    if (typeof window > "u") return;
    const L = () => {
      x();
    };
    return window.addEventListener("messenger:conversation-read", L), window.addEventListener("messenger:conversation-closed", L), window.addEventListener("messenger:conversation-created", L), window.addEventListener("messenger:conversation-updated", L), () => {
      window.removeEventListener("messenger:conversation-read", L), window.removeEventListener("messenger:conversation-closed", L), window.removeEventListener("messenger:conversation-created", L), window.removeEventListener("messenger:conversation-updated", L);
    };
  }, [x]), H(() => {
    if (s)
      return sr(
        a.reverb,
        s,
        T,
        k
      );
  }, [a.reverb, k, T, s]);
  const P = re(
    () => D.find((L) => L.id === z),
    [D, z]
  ), I = $(
    (L) => {
      A(L), F(!0), L && s && l({
        conversationId: L,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: s
      }).then(() => {
        x();
      }).catch(console.error);
    },
    [s, l, x]
  );
  return {
    conversations: D,
    selectedId: z,
    setSelectedId: A,
    selectedConversation: P,
    closedFilter: c,
    setClosedFilter: d,
    typeFilter: h,
    setTypeFilter: m,
    searchQuery: f,
    setSearchQuery: u,
    isContextPanelOpen: M,
    isMobileChatOpen: B,
    isNewConversationOpen: S,
    isLoading: p,
    isFetching: w,
    errors: b,
    hasReadPermission: o,
    currentUser: n,
    currentUserId: s,
    selectConversation: I,
    unselectConversation: () => {
      A(""), F(!1);
    },
    setIsContextPanelOpen: j,
    setIsNewConversationOpen: _,
    goBackToConversationList: () => F(!1),
    handleConversationCreated: (L) => {
      A(L.id), F(!0), _(!1), x();
    }
  };
}, Dn = (e) => Z({
  url: `${J("helpdesk", "v1")}/requests/chat-support`,
  method: "POST",
  data: e
}), Pn = () => {
  const e = $(async (r) => {
    var s;
    const a = await Dn(r), n = ((s = a.data) == null ? void 0 : s.data) ?? a.data;
    return typeof window < "u" && (n != null && n.conversation_id) && window.dispatchEvent(
      new CustomEvent("messenger:conversation-created", {
        detail: { conversationId: n.conversation_id }
      })
    ), n;
  }, []);
  return Ce(
    e
  );
}, lr = ["/messenger"];
function Ut(e, r) {
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
  const s = n.replace(/\/+$/, "") || "/";
  return a === s || a.startsWith(`${s}/`);
}
if (typeof window < "u") {
  const e = window;
  if (!e.__sdi_messenger_history_patched__) {
    e.__sdi_messenger_history_patched__ = !0;
    const r = window.history.pushState;
    window.history.pushState = function(...n) {
      const s = r.apply(this, n);
      return window.setTimeout(() => {
        window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange"));
      }, 0), s;
    };
    const a = window.history.replaceState;
    window.history.replaceState = function(...n) {
      const s = a.apply(this, n);
      return window.setTimeout(() => {
        window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange"));
      }, 0), s;
    };
  }
}
function jn({
  hiddenPaths: e = lr,
  showOnlyPaths: r,
  hideCondition: a,
  hidden: n = !1,
  currentPath: s
}) {
  const [l, o] = C(() => s !== void 0 ? s : typeof window < "u" ? window.location.pathname : "");
  return H(() => {
    if (s !== void 0) {
      o(s);
      return;
    }
    if (typeof window > "u") return;
    const d = () => {
      const m = window.location.pathname;
      o((f) => f !== m ? m : f);
    };
    d(), window.addEventListener("popstate", d), window.addEventListener("pushstate", d), window.addEventListener("replacestate", d), window.addEventListener("locationchange", d);
    const h = window.setInterval(d, 150);
    return () => {
      window.removeEventListener("popstate", d), window.removeEventListener("pushstate", d), window.removeEventListener("replacestate", d), window.removeEventListener("locationchange", d), window.clearInterval(h);
    };
  }, [s]), { shouldHide: re(() => n ? !0 : l ? !!(a && a(l) || r && r.length > 0 && !r.some((h) => Ut(l, h)) || e && e.length > 0 && e.some((h) => Ut(l, h))) : !1, [l, n, a, r, e]), pathname: l };
}
const Wt = "sdi_floating_chat_corner";
function Tn(e = "bottom-right") {
  const r = U(null), [a, n] = C(e), [s, l] = C(!1), [o, c] = C(null), d = U({ startX: 0, startY: 0, rect: new DOMRect(), moved: !1 }), h = U(!1), m = U(null);
  H(() => {
    try {
      const w = localStorage.getItem(Wt);
      w && ["bottom-right", "bottom-left", "top-right", "top-left"].includes(w) && n(w);
    } catch {
    }
  }, []);
  const f = (w) => {
    n(w);
    try {
      localStorage.setItem(Wt, w);
    } catch {
    }
  }, u = (w) => {
    if (w.button !== 0 && w.pointerType === "mouse") return;
    const b = r.current;
    if (!b) return;
    const x = b.getBoundingClientRect();
    d.current = {
      startX: w.clientX,
      startY: w.clientY,
      rect: x,
      moved: !1
    };
    const z = w.clientX - x.left, A = w.clientY - x.top, M = (B) => {
      Math.hypot(
        B.clientX - d.current.startX,
        B.clientY - d.current.startY
      ) > 5 && (d.current.moved || (d.current.moved = !0, l(!0)), m.current && cancelAnimationFrame(m.current), m.current = requestAnimationFrame(() => {
        const S = Math.max(
          12,
          Math.min(window.innerWidth - x.width - 12, B.clientX - z)
        ), _ = Math.max(
          12,
          Math.min(window.innerHeight - x.height - 12, B.clientY - A)
        );
        c({ x: S, y: _ });
      }));
    }, j = (B) => {
      if (window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", j), window.removeEventListener("pointercancel", j), m.current && cancelAnimationFrame(m.current), d.current.moved) {
        h.current = !0, setTimeout(() => {
          h.current = !1;
        }, 100);
        const F = B.clientX > window.innerWidth / 2, _ = B.clientY > window.innerHeight / 2 ? F ? "bottom-right" : "bottom-left" : F ? "top-right" : "top-left";
        f(_), l(!1), c(null);
      }
    };
    window.addEventListener("pointermove", M), window.addEventListener("pointerup", j), window.addEventListener("pointercancel", j);
  }, v = a.startsWith("top"), g = a.endsWith("left");
  return {
    containerRef: r,
    corner: a,
    isDragging: s,
    dragPos: o,
    wasDraggedRef: h,
    isTop: v,
    isLeft: g,
    cornerContainerClass: v ? g ? "top-6 left-6 items-start flex-col-reverse" : "top-6 right-6 items-end flex-col-reverse" : g ? "bottom-6 left-6 items-start flex-col" : "bottom-6 right-6 items-end flex-col",
    cardOriginClass: v ? g ? "origin-top-left" : "origin-top-right" : g ? "origin-bottom-left" : "origin-bottom-right",
    startDrag: u,
    changeCorner: f
  };
}
function An({
  isOpen: e,
  totalUnreadCount: r,
  isLeft: a,
  isLoading: n = !1,
  hasError: s = !1,
  onToggleOpen: l,
  onPointerDown: o
}) {
  const c = () => e ? "bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rotate-90 shadow-2xl" : s ? "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/40 shadow-rose-500/30" : n ? "bg-blue-600/90 text-white" : "bg-blue-600 hover:bg-blue-700 text-white", d = () => e ? "Cerrar chat de soporte" : s ? "Error de conexión en el chat (Haz clic para ver detalles o reintentar)" : n ? "Conectando al chat de soporte..." : r > 0 ? `Abrir chat de soporte (${r} mensaje${r === 1 ? "" : "s"} sin leer)` : "Abrir chat de soporte";
  return /* @__PURE__ */ i(
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
            className: E(
              "flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40",
              c()
            ),
            "aria-label": d(),
            title: d(),
            children: e ? /* @__PURE__ */ t(le, { className: "size-6 transition-transform duration-200 text-white" }) : s ? /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center animate-in zoom-in-75 duration-200", children: /* @__PURE__ */ t(Nt, { className: "size-6 transition-transform duration-200 text-white" }) }) : n ? /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ t(Ae, { className: "size-6 animate-spin text-white" }) }) : /* @__PURE__ */ t("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ t(yr, { className: "size-6 transition-transform duration-200" }) })
          }
        ),
        !e && s && /* @__PURE__ */ i(
          "span",
          {
            className: E(
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
        !e && !s && r > 0 && /* @__PURE__ */ i(
          "span",
          {
            className: E(
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
const Mn = "1.3.0", Ln = {
  version: Mn
}, or = Ln.version;
function Dt({
  onNewConversation: e,
  showNewButton: r = !0,
  className: a
}) {
  var h, m;
  const { currentUser: n, isLoadingUser: s, hasError: l } = ne(), o = ie({
    permission: ["messenger_chat_support.provide_support"]
  }), c = Ge((h = n == null ? void 0 : n.attributes) == null ? void 0 : h.name) || "Usuario", d = ((m = n == null ? void 0 : n.attributes) == null ? void 0 : m.email) || "Mi cuenta";
  return l ? /* @__PURE__ */ i(
    "div",
    {
      className: E(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        a
      ),
      children: [
        /* @__PURE__ */ t(kr, { className: "size-3.5 shrink-0 text-red-500" }),
        /* @__PURE__ */ t("span", { className: "truncate text-[11px] font-medium", children: "Sin conexión • No disponible" })
      ]
    }
  ) : s ? /* @__PURE__ */ i(
    "div",
    {
      className: E(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        a
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ t(R, { className: "size-8 rounded-full" }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
            /* @__PURE__ */ t(R, { className: "h-3 w-20" }),
            /* @__PURE__ */ t(R, { className: "h-2.5 w-32" })
          ] })
        ] }),
        r && /* @__PURE__ */ t(R, { className: "size-8 rounded-lg shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ i(
    "div",
    {
      className: E(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        a
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ t(ge, { src: n == null ? void 0 : n.attributes.avatar_url, name: c, size: "sm" }),
          /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ t("p", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: c }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 text-[10px] leading-tight text-neutral-500 dark:text-neutral-400 mt-0.5", children: [
              /* @__PURE__ */ t("span", { className: "truncate", children: d }),
              /* @__PURE__ */ t("span", { className: "text-neutral-300 dark:text-neutral-700 select-none", children: "•" }),
              /* @__PURE__ */ i("span", { className: "font-mono text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0", children: [
                "v",
                or
              ] })
            ] })
          ] })
        ] }),
        r && e && o && /* @__PURE__ */ t(
          W,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: e,
            className: "h-8 gap-1.5 px-3 text-xs font-semibold shrink-0 shadow-xs cursor-pointer",
            title: "Iniciar nueva conversación",
            children: /* @__PURE__ */ t(Ve, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function In({
  title: e,
  canRequestSupport: r,
  canViewChatList: a,
  totalUnreadCount: n,
  conversationsCount: s,
  onRequestSupport: l,
  onViewChatList: o,
  onClose: c,
  onNewConversation: d,
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
              /* @__PURE__ */ t("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md", children: /* @__PURE__ */ t(bt, { className: "size-5 text-white" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ t("h3", { className: "text-sm font-bold leading-none text-white", children: e }),
                /* @__PURE__ */ i("p", { className: "text-[11px] text-blue-100 mt-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ t("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }),
                  "Soporte técnico SDI"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ t(
              W,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (m) => m.stopPropagation(),
                onClick: c,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ t(le, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-4", children: [
            /* @__PURE__ */ t("p", { className: "text-xs font-semibold text-white", children: "¿En qué podemos ayudarte hoy?" }),
            /* @__PURE__ */ t("p", { className: "text-[11px] text-blue-100/90 mt-0.5", children: "Selecciona una opción para iniciar asistencia o revisar tu historial." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      r && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: l,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer",
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ t("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: /* @__PURE__ */ t(bt, { className: "size-5" }) }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Solicitar Asistencia" }),
                /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Ingresa asunto y mensaje para iniciar soporte" })
              ] })
            ] }),
            /* @__PURE__ */ t(Lt, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      a && /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: o,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer",
          children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ i("div", { className: "relative flex size-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: [
                /* @__PURE__ */ t(wt, { className: "size-5" }),
                n > 0 && /* @__PURE__ */ t("span", { className: "absolute -top-1 -right-1 size-3 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" })
              ] }),
              /* @__PURE__ */ i("div", { children: [
                /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Ver mis chats" }),
                  n > 0 ? /* @__PURE__ */ i("span", { className: "rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs animate-pulse", children: [
                    n > 99 ? "99+" : n,
                    " ",
                    "sin leer"
                  ] }) : s > 0 ? /* @__PURE__ */ t("span", { className: "rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-blue-600 dark:text-blue-400", children: s }) : null
                ] }),
                /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Revisa tus conversaciones y requerimientos" })
              ] })
            ] }),
            /* @__PURE__ */ t(Lt, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ i("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30 p-3 mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs", children: [
            /* @__PURE__ */ t(vt, { className: "size-3.5 text-emerald-600" }),
            /* @__PURE__ */ t("span", { children: "Mesa de Ayuda SDI" })
          ] }),
          /* @__PURE__ */ i("span", { className: "text-[10px] font-mono text-neutral-400 dark:text-neutral-500", children: [
            "v",
            or
          ] })
        ] }),
        /* @__PURE__ */ t("p", { className: "leading-relaxed", children: "Tus solicitudes quedan registradas con trazabilidad y número de ticket en la plataforma de Helpdesk." })
      ] })
    ] }),
    /* @__PURE__ */ t(Dt, { onNewConversation: d })
  ] });
}
function Fn({
  userId: e,
  userName: r,
  onSubmit: a,
  isSubmitting: n = !1,
  error: s = null,
  onCancel: l
}) {
  const [o, c] = C(""), [d, h] = C(""), [m, f] = C(null);
  return /* @__PURE__ */ i("form", { onSubmit: (v) => {
    v.preventDefault(), f(null);
    const g = o.trim(), N = d.trim();
    if (!g) {
      f("Por favor ingresa el asunto de tu solicitud.");
      return;
    }
    if (!N) {
      f("Por favor describe el detalle de tu consulta.");
      return;
    }
    if (!e) {
      f("No se pudo identificar el usuario actual para la solicitud.");
      return;
    }
    a({
      subject: g,
      message: N,
      user_id: e
    });
  }, className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ i("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100", children: [
      /* @__PURE__ */ t("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/90 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 p-3.5 shadow-2xs space-y-2", children: /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ t("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ t(bt, { className: "size-4.5" }) }),
        /* @__PURE__ */ i("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ t("h4", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate", children: r ? `Hola, ${r}` : "Nueva solicitud de soporte" }),
            /* @__PURE__ */ i("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40", children: [
              /* @__PURE__ */ t("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
              "En línea"
            ] })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug", children: "Completa los datos para asignarte un técnico de soporte." })
        ] })
      ] }) }),
      (m || s) && /* @__PURE__ */ i("div", { className: "flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ t(Cr, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ i("div", { className: "flex-1 leading-snug", children: [
          /* @__PURE__ */ t("span", { className: "font-medium", children: "Error en el formulario:" }),
          " ",
          m || s
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ t(zr, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ t("span", { children: "Asunto de la consulta" }),
          /* @__PURE__ */ t("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ t("div", { className: "relative", children: /* @__PURE__ */ t(
          Ct,
          {
            value: o,
            onChange: (v) => {
              c(v.target.value), m && f(null);
            },
            placeholder: "Ej: Consulta sobre configuración o reporte de falla",
            disabled: n,
            maxLength: 150,
            className: "h-9.5 bg-neutral-50/60 hover:bg-white focus:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus:border-blue-500 rounded-lg text-xs transition-colors"
          }
        ) })
      ] }),
      /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ i("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ t(Sr, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ t("span", { children: "Detalle o descripción" }),
          /* @__PURE__ */ t("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ i("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ t(
            zt,
            {
              value: d,
              onChange: (v) => {
                h(v.target.value), m && f(null);
              },
              placeholder: "Describe lo más claro posible tu duda o problema...",
              rows: 4,
              disabled: n,
              maxLength: 1e3,
              className: "min-h-24 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none"
            }
          ),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between px-3 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400 dark:text-neutral-500", children: [
            /* @__PURE__ */ t("span", { children: "Proporciona detalles específicos" }),
            /* @__PURE__ */ i("span", { className: "font-mono", children: [
              d.length,
              "/1000"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex items-start gap-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 p-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: [
        /* @__PURE__ */ t(vt, { className: "size-4 shrink-0 text-neutral-400 mt-0.5" }),
        /* @__PURE__ */ t("span", { children: "Tu solicitud creará automáticamente una conversación y se notificará al equipo de asistencia." })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900/80 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t("div", { children: l && /* @__PURE__ */ t(
        W,
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
        W,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: n || !o.trim() || !d.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          children: n ? /* @__PURE__ */ i(pe, { children: [
            /* @__PURE__ */ t(Ae, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ t("span", { children: "Enviando solicitud..." })
          ] }) : /* @__PURE__ */ i(pe, { children: [
            /* @__PURE__ */ t("span", { children: "Iniciar soporte" }),
            /* @__PURE__ */ t(qt, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] });
}
function Rn({
  userId: e,
  userName: r,
  canViewChatList: a,
  totalUnreadCount: n,
  isSubmitting: s,
  error: l,
  onHome: o,
  onViewChats: c,
  onClose: d,
  onSubmit: h,
  onNewConversation: m,
  onDragStart: f
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ t(
      "div",
      {
        onPointerDown: f,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-3.5 py-4 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ i(
              W,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (u) => u.stopPropagation(),
                onClick: o,
                className: "h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ t(pt, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { children: "Inicio" })
                ]
              }
            ),
            /* @__PURE__ */ t("span", { className: "text-xs font-bold text-white", children: "Solicitar Asistencia" })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center gap-1", children: [
            a && /* @__PURE__ */ i(
              W,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (u) => u.stopPropagation(),
                onClick: c,
                title: "Ver mis chats",
                className: "relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1",
                children: [
                  /* @__PURE__ */ t(wt, { className: "size-3.5" }),
                  /* @__PURE__ */ t("span", { className: "hidden sm:inline text-[11px] font-medium", children: "Mis chats" }),
                  n > 0 && /* @__PURE__ */ t("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs", children: n > 99 ? "99+" : n })
                ]
              }
            ),
            /* @__PURE__ */ t(
              W,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (u) => u.stopPropagation(),
                onClick: d,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ t(le, { className: "size-4" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 overflow-hidden flex flex-col", children: e && /* @__PURE__ */ t(
      Fn,
      {
        userId: e,
        userName: r,
        onSubmit: h,
        isSubmitting: s,
        error: l,
        onCancel: o
      }
    ) }),
    /* @__PURE__ */ t(Dt, { onNewConversation: m })
  ] });
}
const Bn = [
  { id: "all", label: "Todos", icon: null },
  { id: "direct", label: "Directos", icon: at },
  { id: "group", label: "Grupos", icon: xt },
  { id: "bot", label: "Bots", icon: _r }
], Hn = () => /* @__PURE__ */ i("div", { className: "flex w-full min-w-0 items-center gap-2.5 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-800/20", children: [
  /* @__PURE__ */ t(R, { className: "size-9.5 rounded-full shrink-0" }),
  /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 space-y-2", children: [
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t(R, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ t(R, { className: "h-2.5 w-10" })
    ] }),
    /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ t(R, { className: "h-2.5 w-36" }),
      /* @__PURE__ */ t(R, { className: "h-3.5 w-6 rounded-full" })
    ] })
  ] })
] }), Un = ({
  conversation: e,
  selectedId: r,
  currentUserId: a,
  onSelectConversation: n
}) => {
  var v, g, N;
  const s = Ke(e), l = e.type === "bot" || ((v = e.attributes) == null ? void 0 : v.type) === "bot", o = !!e.attributes.closed_at, c = Xe(e, a), d = Fe(e, a), h = ((N = (g = e.relationships) == null ? void 0 : g.users) == null ? void 0 : N.length) || 0, m = s ? "Grupo" : l ? "Bot de Asistencia" : "Conversación directa";
  let f = "";
  try {
    f = nt(
      yt(e.attributes.updated_at || e.attributes.created_at),
      "dd/MM HH:mm"
    );
  } catch {
    f = "";
  }
  const u = r === e.id;
  return /* @__PURE__ */ t(
    "div",
    {
      onClick: () => n(e.id),
      "aria-current": u ? "true" : void 0,
      className: E(
        "group relative flex w-full min-w-0 cursor-pointer select-none flex-col gap-1.5 overflow-hidden rounded-xl p-3 transition-all",
        u ? "bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900" : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent"
      ),
      children: /* @__PURE__ */ i("div", { className: "flex items-start gap-2.5 min-w-0", children: [
        /* @__PURE__ */ t(
          ge,
          {
            src: c == null ? void 0 : c.attributes.avatar_url,
            name: d,
            isGroup: s,
            size: "md",
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("h4", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: d }),
              s && /* @__PURE__ */ i("span", { className: "text-[10px] text-neutral-400 font-normal shrink-0", children: [
                "(",
                h,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ t("span", { className: "shrink-0 text-[10px] text-neutral-400 font-mono", children: f })
          ] }),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ t("p", { className: "truncate text-[11px] text-neutral-500 dark:text-neutral-400", children: m }),
              o && /* @__PURE__ */ i(
                me,
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
            e.attributes.unread_count > 0 && /* @__PURE__ */ t(me, { className: "bg-blue-700", children: e.attributes.unread_count })
          ] })
        ] })
      ] })
    }
  );
};
function Wn({
  conversations: e,
  selectedId: r,
  onSelectConversation: a,
  searchQuery: n,
  onSearchChange: s,
  closedFilter: l,
  onClosedFilterChange: o,
  typeFilter: c,
  onTypeFilterChange: d,
  onNewConversation: h,
  isLoading: m = !1
}) {
  const { currentUser: f, currentUserId: u, isLoadingUser: v, hasError: g, error: N } = ne(), p = ie({
    permission: ["messenger_chat.read"]
  }), w = m || v;
  return /* @__PURE__ */ i("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ i("div", { className: "flex shrink-0 flex-col gap-2.5 border-b border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900", children: [
      /* @__PURE__ */ i("div", { className: "group/search relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
        /* @__PURE__ */ t(Vt, { className: "size-3.5 shrink-0 text-neutral-400 transition-colors group-focus-within/search:text-blue-600" }),
        /* @__PURE__ */ t(
          "input",
          {
            type: "text",
            placeholder: "Buscar por nombre...",
            value: n,
            onChange: (b) => s(b.target.value),
            className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          }
        ),
        n ? /* @__PURE__ */ t(
          W,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => s(""),
            className: "size-5 shrink-0 rounded-full p-0 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
            children: /* @__PURE__ */ t(le, { className: "size-3" })
          }
        ) : /* @__PURE__ */ t("span", { className: "hidden shrink-0 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-400 sm:inline-block", children: "Buscar" })
      ] }),
      /* @__PURE__ */ t(
        er,
        {
          value: l,
          onValueChange: (b) => o(b),
          className: "w-full",
          children: /* @__PURE__ */ i(tr, { className: "h-8 w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ t(st, { value: "0", className: "text-[11px] font-medium", children: "Activos" }),
            /* @__PURE__ */ t(st, { value: "1", className: "text-[11px] font-medium", children: "Cerrados" })
          ] })
        }
      ),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none", children: Bn.map((b) => {
        const x = c === b.id, z = b.icon;
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            onClick: () => d(b.id),
            className: E(
              "flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              x ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 border border-transparent"
            ),
            children: [
              z && /* @__PURE__ */ t(z, { className: "size-3" }),
              /* @__PURE__ */ t("span", { children: b.label })
            ]
          },
          b.id
        );
      }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ t(Oe, { className: "h-full w-full", children: /* @__PURE__ */ t("div", { className: "space-y-1.5 p-1.5 w-full min-w-0", children: g ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ t("div", { className: "size-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(Nt, { className: "size-6" }) }),
      /* @__PURE__ */ i("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Error al cargar chats" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: (N == null ? void 0 : N.message) || "No se pudo conectar al servidor de mensajería." })
      ] }),
      /* @__PURE__ */ i(
        W,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: () => window.location.reload(),
          className: "h-7.5 gap-1.5 px-3 text-xs font-semibold cursor-pointer",
          children: [
            /* @__PURE__ */ t(Gt, { className: "size-3" }),
            /* @__PURE__ */ t("span", { children: "Reintentar" })
          ]
        }
      )
    ] }) : !p && !v ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ t("div", { className: "size-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ t(ke, { className: "size-6" }) }),
      /* @__PURE__ */ i("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ t("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Sin permiso de lectura" }),
        /* @__PURE__ */ t("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: "No tienes permisos para ver el listado de conversaciones." })
      ] })
    ] }) : w ? /* @__PURE__ */ t("div", { className: "space-y-1.5 p-1", children: Array.from({ length: 5 }).map((b, x) => /* @__PURE__ */ t(Hn, {}, x)) }) : e.length === 0 ? /* @__PURE__ */ i("div", { className: "flex min-h-56 flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ t("div", { className: "mb-3 flex size-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400", children: /* @__PURE__ */ t(Er, { className: "size-5 stroke-[1.5]" }) }),
      /* @__PURE__ */ t("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100", children: n ? "No se encontraron resultados" : l === "1" ? "No hay conversaciones cerradas" : "No hay conversaciones activas" }),
      /* @__PURE__ */ t("p", { className: "mt-1 max-w-48 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400", children: n ? "Intenta con otro término de búsqueda o cambia los filtros." : "Las conversaciones iniciadas aparecerán aquí." }),
      l !== "0" && /* @__PURE__ */ t(
        W,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => o("0"),
          className: "mt-3 text-[11px] h-7 text-blue-600 dark:text-blue-400 cursor-pointer",
          children: "Ver activas"
        }
      )
    ] }) : e.map((b) => /* @__PURE__ */ t(
      Un,
      {
        conversation: b,
        selectedId: r,
        currentUserId: u,
        onSelectConversation: a
      },
      b.id
    )) }) }) }),
    /* @__PURE__ */ t(Dt, { onNewConversation: h })
  ] });
}
function $n({
  conversations: e,
  selectedId: r,
  searchQuery: a,
  closedFilter: n,
  typeFilter: s,
  isLoading: l,
  onHome: o,
  onClose: c,
  onSelectConversation: d,
  onSearchChange: h,
  onClosedFilterChange: m,
  onTypeFilterChange: f,
  onNewConversation: u,
  onDragStart: v
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: [
    /* @__PURE__ */ i(
      "div",
      {
        onPointerDown: v,
        className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900 cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ i(
            W,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (g) => g.stopPropagation(),
              onClick: o,
              className: "h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100",
              children: [
                /* @__PURE__ */ t(pt, { className: "size-3.5" }),
                /* @__PURE__ */ t("span", { children: "Inicio" })
              ]
            }
          ),
          /* @__PURE__ */ t("span", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Mis Conversaciones" }),
          /* @__PURE__ */ t(
            W,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (g) => g.stopPropagation(),
              onClick: c,
              className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ t(le, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ t(
      Wn,
      {
        conversations: e,
        selectedId: r,
        onSelectConversation: d,
        searchQuery: a,
        onSearchChange: h,
        closedFilter: n,
        onClosedFilterChange: m,
        typeFilter: s,
        onTypeFilterChange: f,
        onNewConversation: u,
        isLoading: l
      }
    ) })
  ] });
}
function qn({
  onDragStart: e
}) {
  return /* @__PURE__ */ i("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ i(
      "div",
      {
        onPointerDown: e,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ i("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ t(R, { className: "size-9 rounded-xl bg-white/20" }),
              /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ t(R, { className: "h-3.5 w-32 bg-white/30" }),
                /* @__PURE__ */ t(R, { className: "h-2.5 w-24 bg-white/20" })
              ] })
            ] }),
            /* @__PURE__ */ t(R, { className: "size-7 rounded-full bg-white/20" })
          ] }),
          /* @__PURE__ */ i("div", { className: "mt-4 space-y-1.5", children: [
            /* @__PURE__ */ t(R, { className: "h-3 w-48 bg-white/30" }),
            /* @__PURE__ */ t(R, { className: "h-2.5 w-64 bg-white/20" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ i("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      /* @__PURE__ */ i("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(R, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ t(R, { className: "h-3.5 w-28" }),
            /* @__PURE__ */ t(R, { className: "h-2.5 w-44" })
          ] })
        ] }),
        /* @__PURE__ */ t(R, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ i("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(R, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ i("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ t(R, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ t(R, { className: "h-2.5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ t(R, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ i("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2", children: [
        /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ t(R, { className: "size-3.5 rounded-full" }),
          /* @__PURE__ */ t(R, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ t(R, { className: "h-2.5 w-full" }),
        /* @__PURE__ */ t(R, { className: "h-2.5 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5", children: [
      /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ t(R, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ i("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ t(R, { className: "h-3 w-24" }),
          /* @__PURE__ */ t(R, { className: "h-2.5 w-36" })
        ] })
      ] }),
      /* @__PURE__ */ t(R, { className: "size-8 rounded-lg" })
    ] })
  ] });
}
function as({
  canViewChatList: e = !0,
  canRequestSupport: r = !0,
  defaultView: a = "home",
  defaultCorner: n = "bottom-right",
  initialConversation: s,
  title: l = "Centro de Ayuda SDI",
  hiddenPaths: o = lr,
  showOnlyPaths: c,
  hideCondition: d,
  hidden: h = !1,
  currentPath: m,
  showToastOnUnread: f = !1,
  renderOptions: u,
  onActiveConversationChange: v
}) {
  var Y, de, De, He;
  const g = ie({
    permission: ["messenger_chat.read"]
  }), N = ie({
    permission: ["messenger_chat_support.request_support"]
  });
  ie({
    permission: ["messenger_chat_support.provide_support"]
  });
  const p = ie({
    permission: [
      "messenger_chat.read",
      "messenger_chat_support.request_support",
      "messenger_chat_support.provide_support"
    ],
    operator: "OR"
  }), w = e && g, b = r && N, { shouldHide: x } = jn({
    hiddenPaths: o,
    showOnlyPaths: c,
    hideCondition: d,
    hidden: h,
    currentPath: m
  }), {
    containerRef: z,
    isDragging: A,
    dragPos: M,
    wasDraggedRef: j,
    isTop: B,
    isLeft: F,
    cornerContainerClass: S,
    cardOriginClass: _,
    startDrag: D
  } = Tn(n), [T, k] = C(!1), [P, I] = C(() => !w && !b ? "chat" : a === "list" && !w || a === "support-form" && !b ? "home" : a), { currentUser: K, isLoadingUser: ze, hasError: he, error: L } = ne(), fe = (Y = K == null ? void 0 : K.attributes) == null ? void 0 : Y.user_auth_id, ce = ((de = K == null ? void 0 : K.attributes) == null ? void 0 : de.name) || "Usuario", {
    mutateAsync: ve,
    isLoading: Se,
    error: se
  } = Pn(), [ue, Re] = C(null), [be, ee] = C(
    null
  ), {
    conversations: V,
    selectedId: Ye,
    selectedConversation: Qe,
    closedFilter: lt,
    setClosedFilter: ot,
    typeFilter: _e,
    setTypeFilter: we,
    searchQuery: Je,
    setSearchQuery: Ze,
    isNewConversationOpen: oe,
    isLoading: et,
    selectConversation: dt,
    setIsNewConversationOpen: Ee,
    handleConversationCreated: tt
  } = En({
    showToastOnUnread: f,
    isActive: T && P === "chat"
  }), Be = re(() => !V || !Array.isArray(V) ? 0 : V.reduce((ae, ye) => {
    var xe;
    return ae + (((xe = ye.attributes) == null ? void 0 : xe.unread_count) || 0);
  }, 0), [V]), Ne = be || s || Qe || null, y = T && P === "chat" ? Ne : null;
  H(() => {
    Me.set(y), v == null || v(y);
  }, [y, v]), H(() => () => {
    Me.set(null);
  }, []), H(() => {
    P === "chat" && !Ne && I(w ? "list" : "home");
  }, [P, Ne, w]);
  const G = () => {
    j.current || A || (T ? k(!1) : (k(!0), I(a === "list" && !w ? b ? "support-form" : "home" : a === "support-form" && !b ? w ? "list" : "home" : a || "home")));
  };
  if (x || !ze && !he && !p)
    return null;
  const X = (ae) => {
    ee(null), dt(ae), I("chat");
  }, O = async (ae) => {
    var ye, xe, Pt, jt, Tt;
    try {
      const q = await ve(ae);
      if (q != null && q.conversation_id && (q != null && q.technician)) {
        const ct = String(q.conversation_id), dr = {
          id: String(q.technician.id),
          type: "user",
          attributes: {
            user_auth_id: Number(q.technician.user_auth_id),
            name: q.technician.name,
            avatar_url: null,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: []
        }, At = {
          id: ct,
          type: "conversation",
          attributes: {
            is_group: !1,
            name: q.technician.name || ((ye = q.ticket) == null ? void 0 : ye.subject) || "Soporte SDI",
            closed_at: null,
            unread_count: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: {
            users: [dr]
          }
        };
        ee(At), tt(At), te.success(`Asistencia iniciada con ${q.technician.name}`, {
          description: `Ticket #${((xe = q.ticket) == null ? void 0 : xe.number) || ((Pt = q.ticket) == null ? void 0 : Pt.id)}`
        }), I("chat");
      } else
        Re(q), I("no-technician");
    } catch (q) {
      const ct = ((Tt = (jt = q == null ? void 0 : q.response) == null ? void 0 : jt.data) == null ? void 0 : Tt.message) || (q == null ? void 0 : q.message) || "Error al procesar la solicitud de asistencia";
      te.error(ct);
    }
  };
  if (x)
    return null;
  if (!he)
    return /* @__PURE__ */ i(
      "div",
      {
        ref: z,
        style: A && M ? {
          position: "fixed",
          left: `${M.x}px`,
          top: `${M.y}px`,
          bottom: "auto",
          right: "auto",
          zIndex: 50,
          touchAction: "none",
          transition: "none"
        } : void 0,
        className: E(
          "sdi-messenger-root z-50 flex pointer-events-none select-none",
          A ? "fixed cursor-grabbing" : E("fixed duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all", S)
        ),
        children: [
          T && /* @__PURE__ */ t(
            ba,
            {
              className: E(
                "pointer-events-auto h-[590px] max-h-[calc(100vh-120px)] w-[385px] sm:w-[425px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-2xl transition-all duration-300 flex flex-col",
                B ? "mt-3.5" : "mb-3.5",
                _
              ),
              children: ze ? /* @__PURE__ */ t(qn, { onDragStart: D }) : /* @__PURE__ */ i(pe, { children: [
                P === "home" && /* @__PURE__ */ t(
                  In,
                  {
                    title: l,
                    canRequestSupport: b,
                    canViewChatList: w,
                    totalUnreadCount: Be,
                    conversationsCount: V.length,
                    onRequestSupport: () => I("support-form"),
                    onViewChatList: () => I("list"),
                    onClose: () => k(!1),
                    onNewConversation: () => Ee(!0),
                    onDragStart: D
                  }
                ),
                P === "support-form" && /* @__PURE__ */ t(
                  Rn,
                  {
                    userId: fe,
                    userName: ce,
                    canViewChatList: w,
                    totalUnreadCount: Be,
                    isSubmitting: Se,
                    error: ((He = (De = se == null ? void 0 : se.response) == null ? void 0 : De.data) == null ? void 0 : He.message) || (se == null ? void 0 : se.message),
                    onHome: () => I("home"),
                    onViewChats: () => I("list"),
                    onClose: () => k(!1),
                    onSubmit: O,
                    onNewConversation: () => Ee(!0),
                    onDragStart: D
                  }
                ),
                P === "no-technician" && /* @__PURE__ */ t(
                  kn,
                  {
                    message: ue == null ? void 0 : ue.message,
                    ticket: ue == null ? void 0 : ue.ticket,
                    onNewRequest: () => {
                      Re(null), I("support-form");
                    },
                    onViewChats: () => I("list"),
                    onClose: () => k(!1),
                    canViewChatList: w
                  }
                ),
                P === "list" && /* @__PURE__ */ t(
                  $n,
                  {
                    conversations: V,
                    selectedId: Ye,
                    searchQuery: Je,
                    closedFilter: lt,
                    typeFilter: _e,
                    isLoading: et,
                    onHome: () => I("home"),
                    onClose: () => k(!1),
                    onSelectConversation: X,
                    onSearchChange: Ze,
                    onClosedFilterChange: ot,
                    onTypeFilterChange: we,
                    onNewConversation: () => Ee(!0),
                    onDragStart: D
                  }
                ),
                P === "chat" && Ne && /* @__PURE__ */ t("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: /* @__PURE__ */ t(
                  yn,
                  {
                    conversation: Ne,
                    isContextPanelOpen: !1,
                    alwaysShowBackButton: !0,
                    renderOptions: u,
                    onCloseSuccess: () => {
                      ee(null), I(w ? "list" : "home");
                    },
                    onBack: () => {
                      ee(null), I(w ? "list" : "home");
                    }
                  }
                ) })
              ] })
            }
          ),
          /* @__PURE__ */ t(
            An,
            {
              isOpen: T,
              totalUnreadCount: Be,
              isLeft: F,
              isLoading: ze,
              hasError: he,
              onToggleOpen: G,
              onPointerDown: D
            }
          ),
          /* @__PURE__ */ t(
            Sn,
            {
              open: oe,
              onOpenChange: Ee,
              onSuccess: (ae) => {
                ee(ae), tt(ae), I("chat");
              }
            }
          )
        ]
      }
    );
}
function ns({ onNewConversation: e }) {
  const { hasError: r, error: a, isLoadingUser: n } = ne(), s = ie({
    permission: ["messenger_chat.read"]
  }), l = ie({
    permission: ["messenger_chat_support.provide_support"]
  });
  return r ? /* @__PURE__ */ i("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-x-0 top-0 h-1 bg-red-500/30" }),
    /* @__PURE__ */ i("div", { className: "flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200", children: [
      /* @__PURE__ */ t("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs", children: /* @__PURE__ */ t(Nt, { className: "size-8" }) }),
      /* @__PURE__ */ t("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400", children: "Servicio no disponible" }),
      /* @__PURE__ */ t("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Error de conexión" }),
      /* @__PURE__ */ t("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: (a == null ? void 0 : a.message) || "No fue posible conectar con el servidor de chat. Las funciones de mensajería están temporalmente deshabilitadas." }),
      /* @__PURE__ */ i(
        W,
        {
          type: "button",
          variant: "primary",
          className: "mt-6 gap-1.5 cursor-pointer shadow-xs",
          onClick: () => window.location.reload(),
          children: [
            /* @__PURE__ */ t(Gt, { className: "size-4" }),
            "Reintentar conexión"
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ t("div", { className: " sdi-messenger-root relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0a0f1d] shadow-xs", children: /* @__PURE__ */ i("div", { className: "relative z-10 flex max-w-md flex-col items-center px-6 text-center", children: [
    /* @__PURE__ */ t("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs", children: /* @__PURE__ */ t(Ve, { className: "size-8" }) }),
    /* @__PURE__ */ t("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400", children: "Bandeja de conversaciones" }),
    /* @__PURE__ */ t("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Selecciona una conversación" }),
    /* @__PURE__ */ t("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: s ? "Elige una conversación del panel lateral para ver sus mensajes o inicia una nueva cuando estés listo." : "No cuentas con permisos para ver la lista de conversaciones." }),
    e && !n && l && /* @__PURE__ */ i(
      W,
      {
        type: "button",
        variant: "outline",
        className: "mt-6 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors",
        onClick: e,
        children: [
          /* @__PURE__ */ t(Ve, { className: "size-4" }),
          "Nueva conversación"
        ]
      }
    )
  ] }) });
}
function ss({
  conversation: e,
  onClose: r,
  className: a
}) {
  var m, f;
  const { currentUserId: n } = ne(), s = Ke(e), l = Xe(e, n), o = Fe(e, n), c = ((f = (m = e.relationships) == null ? void 0 : m.users) == null ? void 0 : f.length) || 0, d = !!e.attributes.closed_at, h = (u) => {
    if (!u) return "-";
    try {
      return nt(yt(u), "dd/MM/yyyy HH:mm");
    } catch {
      return u;
    }
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: E(
        "sdi-messenger-root flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        a
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-3 px-4 bg-white dark:bg-neutral-900", children: [
          /* @__PURE__ */ i("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(at, { className: "size-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ t("h3", { className: "text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100", children: "Información de Contacto" })
          ] }),
          r && /* @__PURE__ */ t(
            W,
            {
              variant: "ghost",
              size: "icon",
              onClick: r,
              className: " p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              children: /* @__PURE__ */ t(le, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ t(Oe, { className: "h-full", children: /* @__PURE__ */ i("div", { className: "space-y-4 p-4", children: [
          /* @__PURE__ */ i("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ t("div", { className: "relative mb-2", children: /* @__PURE__ */ t(
              ge,
              {
                src: l == null ? void 0 : l.attributes.avatar_url,
                name: o,
                isGroup: s,
                size: "xl",
                status: !s && l ? "online" : void 0
              }
            ) }),
            /* @__PURE__ */ t("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: o }),
            /* @__PURE__ */ t("p", { className: "text-xs font-medium text-neutral-500 dark:text-neutral-400", children: s ? `${c} participantes` : "Conversación individual" }),
            /* @__PURE__ */ i("div", { className: "flex items-center justify-center gap-1.5 mt-2", children: [
              /* @__PURE__ */ t(me, { variant: "secondary", className: "text-[10px]", children: s ? "Grupo" : "Usuario" }),
              d ? /* @__PURE__ */ i(
                me,
                {
                  variant: "outline",
                  className: "text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ t(ke, { className: "size-2.5" }),
                    /* @__PURE__ */ t("span", { children: "Cerrada" })
                  ]
                }
              ) : /* @__PURE__ */ i(
                me,
                {
                  variant: "outline",
                  className: "text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ t(rt, { className: "size-2.5" }),
                    /* @__PURE__ */ t("span", { children: "Activa" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t(fa, {}),
          /* @__PURE__ */ i("div", { className: "space-y-1", children: [
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(at, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ t("span", { className: "truncate text-neutral-900 dark:text-neutral-100 font-medium", children: s ? `${c} participantes` : o })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(Dr, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Creada: ",
                h(e.attributes.created_at)
              ] })
            ] }),
            /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(gt, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Actualizada: ",
                h(e.attributes.updated_at)
              ] })
            ] }),
            e.attributes.closed_at && /* @__PURE__ */ i("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ t(ke, { className: "size-3.5 shrink-0 text-amber-500" }),
              /* @__PURE__ */ i("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
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
const Vn = ({ conversationId: e, enabled: r = !0 } = {}) => {
  var s, l;
  const n = Et({
    queryKey: ["conversation", e],
    queryFn: () => Vr(e),
    enabled: r && !!e,
    keepPreviousData: !0
  });
  return {
    data: ((l = (s = n.data) == null ? void 0 : s.data) == null ? void 0 : l.data) ?? null,
    isLoading: n.isLoading,
    isFetching: n.isFetching,
    isError: n.isError,
    errors: n.errors,
    refetch: n.refetch
  };
}, is = (e, r) => {
  const a = typeof e == "object" && e !== null ? e : { conversationId: e, ...r }, {
    conversationId: n,
    enabled: s = !0,
    showToastOnUnread: l = !1,
    onMessage: o,
    onUnread: c
  } = a, { config: d, currentUser: h, currentUserId: m } = ne(), f = ie({
    permission: ["messenger_chat.read"]
  }), u = n != null ? String(n) : void 0, v = n != null ? Number(n) : void 0, g = s && !!u && f, {
    data: N,
    isLoading: p,
    isError: w,
    errors: b,
    refetch: x
  } = Vn({
    conversationId: u,
    enabled: g
  }), z = $(
    (M) => {
      if (m && String(M.attributes.sender_id) !== String(m)) {
        const B = typeof document < "u" && document.hasFocus() && !document.hidden;
        _t(B ? "focused" : "unfocused");
      }
      x(), o == null || o(M);
    },
    [m, o, x]
  ), A = $(
    (M) => {
      l && String(M.conversation_id) !== u && te.info("Nuevo mensaje", {
        id: `conversation-message-${M.message.id}`,
        description: M.message.body || "Tienes un mensaje nuevo"
      }), String(M.conversation_id) === u && x(), c == null || c(M);
    },
    [u, c, x, l]
  );
  return H(() => {
    if (!(!v || !g))
      return nr(
        d.reverb,
        v,
        z
      );
  }, [d.reverb, v, z, g]), H(() => {
    if (!(!m || !g))
      return sr(
        d.reverb,
        m,
        A
      );
  }, [d.reverb, m, A, g]), H(() => {
    if (typeof window > "u") return;
    const M = () => {
      x();
    };
    return window.addEventListener("messenger:conversation-closed", M), window.addEventListener("messenger:conversation-updated", M), () => {
      window.removeEventListener("messenger:conversation-closed", M), window.removeEventListener("messenger:conversation-updated", M);
    };
  }, [x]), {
    conversation: N ?? null,
    isLoading: p,
    isError: w,
    errors: b,
    refetch: x,
    hasReadPermission: f,
    currentUser: h,
    currentUserId: m
  };
};
export {
  Kr as ActiveConversationProvider,
  ts as ChatProvider,
  pn as ConversationChatHeader,
  yn as ConversationChatPanel,
  ss as ConversationContextPanel,
  ns as ConversationEmptyState,
  Wn as ConversationsSidebarList,
  as as FloatingChat,
  or as LIB_VERSION,
  Sn as NewConversationDialog,
  Fn as RequestSupportForm,
  Me as activeConversationStore,
  Kt as closeConversationService,
  bn as hasMessengerPermission,
  _t as playNotificationSound,
  Xr as useActiveConversation,
  ne as useChatContext,
  ie as useCheckHasPermissionMessenger,
  ln as useCloseConversation,
  fn as useConversationChat,
  En as useConversationsPage,
  Wr as useOptionalChatContext,
  rs as useRequiredActiveConversation,
  is as useShowConversation
};
//# sourceMappingURL=index.js.map
