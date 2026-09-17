"use client";
var ai = (e) => {
  throw TypeError(e);
};
var Es = (e, t, r) => t.has(e) || ai("Cannot " + r);
var v = (e, t, r) => (Es(e, t, "read from private field"), r ? r.call(e) : t.get(e)), V = (e, t, r) => t.has(e) ? ai("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), F = (e, t, r, n) => (Es(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), se = (e, t, r) => (Es(e, t, "access private method"), r);
var Vn = (e, t, r, n) => ({
  set _(s) {
    F(e, t, s, r);
  },
  get _() {
    return v(e, t, n);
  }
});
import { jsx as u, jsxs as x, Fragment as nr } from "react/jsx-runtime";
import * as Ye from "react";
import gn, { createContext as nn, useState as ae, useEffect as Fe, useMemo as zt, useContext as sn, forwardRef as an, createElement as qs, useRef as je, useCallback as Je, useLayoutEffect as po } from "react";
import { createPortal as go } from "react-dom";
typeof globalThis < "u" && typeof globalThis.self > "u" && (globalThis.self = globalThis);
const bo = Ye.createContext(void 0), ir = (e) => {
  const t = Ye.useContext(bo);
  if (!t) throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return t;
}, ld = ({ client: e, children: t }) => (Ye.useEffect(() => (e.mount(), () => {
  e.unmount();
}), [e]), /* @__PURE__ */ u(bo.Provider, {
  value: e,
  children: t
})), cd = {
  setTimeout: (e, t) => setTimeout(e, t),
  clearTimeout: (e) => clearTimeout(e),
  setInterval: (e, t) => setInterval(e, t),
  clearInterval: (e) => clearInterval(e)
};
var Tt, br, no, ud = (no = class {
  constructor() {
    V(this, Tt, cd);
    V(this, br, !1);
  }
  /**
  * `setTimeoutProvider` can be used to set a custom implementation of the
  * `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` functions,
  * called a `TimeoutProvider`.
  *
  * This may be useful if you notice event loop performance issues with
  * thousands of queries. A custom TimeoutProvider could also support timer
  * delays longer than the global `setTimeout` maximum delay value of about
  * 24 days.
  *
  * It is important to call `setTimeoutProvider` before creating a
  * QueryClient or queries, so that the same provider is used consistently
  * for all timers in the application, since different TimeoutProviders
  * cannot cancel each others' timers.
  *
  * @example
  * ```ts
  * import { timeoutManager, QueryClient } from '@tanstack/query-core'
  * import { CustomTimeoutProvider } from './CustomTimeoutProvider'
  *
  * timeoutManager.setTimeoutProvider(new CustomTimeoutProvider())
  *
  * export const queryClient = new QueryClient()
  * ```
  */
  setTimeoutProvider(e) {
    process.env.NODE_ENV !== "production" && v(this, br) && e !== v(this, Tt) && console.error("[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.", {
      previous: v(this, Tt),
      provider: e
    }), F(this, Tt, e), process.env.NODE_ENV !== "production" && F(this, br, !1);
  }
  /**
  * `setTimeout` schedules a callback to run after approximately `delay`
  * milliseconds, like the global `setTimeout` function. The callback can be
  * canceled with `clearTimeout`.
  *
  * It returns a timer ID, which may be a number or an object that can be
  * coerced to a number via `Symbol.toPrimitive`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const timeoutId = timeoutManager.setTimeout(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * const timeoutIdNumber: number = Number(timeoutId)
  * ```
  */
  setTimeout(e, t) {
    return process.env.NODE_ENV !== "production" && F(this, br, !0), v(this, Tt).setTimeout(e, t);
  }
  /**
  * `clearTimeout` cancels a timeout callback scheduled with `setTimeout`,
  * like the global `clearTimeout` function. It should be called with a
  * timer ID returned by `setTimeout`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const timeoutId = timeoutManager.setTimeout(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * timeoutManager.clearTimeout(timeoutId)
  * ```
  */
  clearTimeout(e) {
    v(this, Tt).clearTimeout(e);
  }
  /**
  * `setInterval` schedules a callback to be called approximately every
  * `delay` milliseconds, like the global `setInterval` function.
  *
  * Like `setTimeout`, it returns a timer ID, which may be a number or an
  * object that can be coerced to a number via `Symbol.toPrimitive`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const intervalId = timeoutManager.setInterval(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  * ```
  */
  setInterval(e, t) {
    return process.env.NODE_ENV !== "production" && F(this, br, !0), v(this, Tt).setInterval(e, t);
  }
  /**
  * `clearInterval` can be used to cancel an interval, like the global
  * `clearInterval` function. It should be called with an interval ID
  * returned by `setInterval`.
  *
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const intervalId = timeoutManager.setInterval(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * timeoutManager.clearInterval(intervalId)
  * ```
  */
  clearInterval(e) {
    v(this, Tt).clearInterval(e);
  }
}, Tt = new WeakMap(), br = new WeakMap(), no);
const pr = new ud();
function dd(e) {
  setTimeout(e, 0);
}
const hd = typeof window > "u" || "Deno" in globalThis;
function nt() {
}
function fd(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function yo(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function xo(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Ee(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ii(e, t) {
  const { type: r = "all", exact: n, fetchStatus: s, predicate: i, queryKey: o, stale: d } = e;
  if (o) {
    if (n) {
      if (t.queryHash !== ca(o, t.options)) return !1;
    } else if (!tn(t.queryKey, o)) return !1;
  }
  if (r !== "all") {
    const h = t.isActive();
    if (r === "active" && !h || r === "inactive" && h) return !1;
  }
  return !(typeof d == "boolean" && t.isStale() !== d || s && s !== t.state.fetchStatus || i && !i(t));
}
function oi(e, t) {
  const { exact: r, status: n, predicate: s, mutationKey: i } = e;
  if (i) {
    if (!t.options.mutationKey) return !1;
    if (r) {
      if (Pr(t.options.mutationKey) !== Pr(i)) return !1;
    } else if (!tn(t.options.mutationKey, i)) return !1;
  }
  return !(n && t.state.status !== n || s && !s(t));
}
function ca(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || Pr)(e);
}
function Pr(e) {
  return JSON.stringify(e, (t, r) => Bs(r) ? Object.keys(r).sort().reduce((n, s) => (n[s] = r[s], n), {}) : r);
}
function tn(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (Array.isArray(e) && Array.isArray(t)) {
      if (t.length > e.length) return !1;
      for (let n = 0; n < t.length; n++) if (!tn(e[n], t[n])) return !1;
      return !0;
    }
    const r = Object.keys(t);
    for (const n of r) if (!tn(e[n], t[n])) return !1;
    return !0;
  }
  return !1;
}
const md = Object.prototype.hasOwnProperty;
function Hs(e, t, r = 0) {
  if (e === t) return e;
  if (r > 500) return t;
  const n = li(e) && li(t);
  if (!n && !(Bs(e) && Bs(t))) return t;
  const s = (n ? e : Object.keys(e)).length, i = n ? t : Object.keys(t), o = i.length, d = n ? new Array(o) : {};
  let h = 0;
  for (let f = 0; f < o; f++) {
    const p = n ? f : i[f], g = e[p], y = t[p];
    if (g === y) {
      d[p] = g, (n ? f < s : md.call(e, p)) && h++;
      continue;
    }
    if (g === null || y === null || typeof g != "object" || typeof y != "object") {
      d[p] = y;
      continue;
    }
    const C = Hs(g, y, r + 1);
    d[p] = C, C === g && h++;
  }
  return s === o && h === s ? e : d;
}
function Jn(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const r in e) if (e[r] !== t[r]) return !1;
  return !0;
}
function li(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Bs(e) {
  if (!ci(e)) return !1;
  const t = Object.getPrototypeOf(e), r = t == null ? void 0 : t.constructor;
  if (r === void 0) return !0;
  if (typeof r != "function") return !1;
  const n = r.prototype;
  return !(!ci(n) || !n.hasOwnProperty("isPrototypeOf") || t !== Object.prototype);
}
function ci(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function pd(e) {
  return new Promise((t) => {
    pr.setTimeout(t, e);
  });
}
function $s(e, t, r) {
  if (typeof r.structuralSharing == "function") return r.structuralSharing(e, t);
  if (r.structuralSharing !== !1) {
    if (process.env.NODE_ENV !== "production") try {
      return Hs(e, t);
    } catch (n) {
      throw console.error(`Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${r.queryHash}]: ${n}`), n;
    }
    return Hs(e, t);
  }
  return t;
}
function vo(e) {
  return e;
}
function gd(e, t, r = 0) {
  const n = [...e, t];
  return r && n.length > r ? n.slice(1) : n;
}
function bd(e, t, r = 0) {
  const n = [t, ...e];
  return r && n.length > r ? n.slice(0, -1) : n;
}
const ns = Symbol();
function wo(e, t) {
  return process.env.NODE_ENV !== "production" && e.queryFn === ns && console.error(`Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${e.queryHash}'`), !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === ns ? () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn;
}
function ua(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
function yd(e, t, r) {
  let n = !1, s;
  return Object.defineProperty(e, "signal", {
    enumerable: !0,
    get: () => (s ?? (s = t()), n || (n = !0, s.aborted ? r() : s.addEventListener("abort", r, { once: !0 })), s)
  }), e;
}
let xd = () => hd;
const da = () => xd();
var on = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(e) {
    return this.listeners.add(e), this.onSubscribe(), () => {
      this.listeners.delete(e), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, yr, Xt, Hr, so, vd = (so = class extends on {
  constructor() {
    super();
    V(this, yr);
    V(this, Xt);
    V(this, Hr);
    F(this, Hr, (t) => {
      if (typeof window < "u" && window.addEventListener) {
        const r = () => t();
        return window.addEventListener("visibilitychange", r, !1), () => {
          window.removeEventListener("visibilitychange", r);
        };
      }
    });
  }
  onSubscribe() {
    v(this, Xt) || this.setEventListener(v(this, Hr));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = v(this, Xt)) == null || t.call(this), F(this, Xt, void 0));
  }
  /**
  * `setEventListener` can be used to set a custom event listener that will
  * be used to determine the focus state. The provided `setup` function
  * receives a `setFocused` callback: call it with a `boolean` to manually
  * set the focus state, or with no arguments to re-evaluate the current
  * focus state and notify subscribers.
  *
  * @example
  * ```ts
  * import { focusManager } from '@tanstack/query-core'
  *
  * focusManager.setEventListener((handleFocus) => {
  *   const listener = () => handleFocus()
  *   // Listen to visibilitychange
  *   if (typeof window !== 'undefined' && window.addEventListener) {
  *     window.addEventListener('visibilitychange', listener, false)
  *   }
  *
  *   return () => {
  *     // Be sure to unsubscribe if a new handler is set
  *     window.removeEventListener('visibilitychange', listener)
  *   }
  * })
  * ```
  */
  setEventListener(t) {
    var r;
    F(this, Hr, t), (r = v(this, Xt)) == null || r.call(this), F(this, Xt, t((n) => {
      typeof n == "boolean" ? this.setFocused(n) : this.onFocus();
    }));
  }
  /**
  * `setFocused` can be used to manually set the focus state. Set `undefined`
  * to fall back to the default focus check.
  *
  * @example
  * ```ts
  * import { focusManager } from '@tanstack/query-core'
  *
  * // Set focused
  * focusManager.setFocused(true)
  *
  * // Set unfocused
  * focusManager.setFocused(false)
  *
  * // Fallback to the default focus check
  * focusManager.setFocused(undefined)
  * ```
  */
  setFocused(t) {
    v(this, yr) !== t && (F(this, yr, t), this.onFocus());
  }
  /**
  * `onFocus` notifies all subscribed listeners with the current focus state.
  */
  onFocus() {
    const t = this.isFocused();
    this.listeners.forEach((r) => {
      r(t);
    });
  }
  /**
  * `isFocused` can be used to get the current focus state.
  */
  isFocused() {
    var t;
    return typeof v(this, yr) == "boolean" ? v(this, yr) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden";
  }
}, yr = new WeakMap(), Xt = new WeakMap(), Hr = new WeakMap(), so);
const ha = new vd(), wd = dd;
function kd() {
  let e = [], t = 0, r = (d) => {
    d();
  }, n = (d) => {
    d();
  }, s = wd;
  const i = (d) => {
    t ? e.push(d) : s(() => {
      r(d);
    });
  }, o = () => {
    const d = e;
    e = [], d.length && s(() => {
      n(() => {
        d.forEach((h) => {
          r(h);
        });
      });
    });
  };
  return {
    /**
    * Batches all updates scheduled inside the passed callback.
    * This is mainly used internally to optimize query client updating.
    * Batches can be nested; the queue is only flushed once the outermost `batch` call finishes.
    * The return value of `callback` is passed through.
    */
    batch: (d) => {
      let h;
      t++;
      try {
        h = d();
      } finally {
        t--, t || o();
      }
      return h;
    },
    /**
    * All calls to the wrapped function will be batched.
    */
    batchCalls: (d) => (...h) => {
      i(() => {
        d(...h);
      });
    },
    /**
    * Schedules a function to be run on the next batch.
    * By default, the batch is run with a `setTimeout`, but this can be configured via `setScheduler`.
    */
    schedule: i,
    /**
    * Use this method to set a custom notify function.
    * This can be used to for example wrap notifications with `React.act` while running tests.
    */
    setNotifyFunction: (d) => {
      r = d;
    },
    /**
    * Use this method to set a custom function to batch notifications together into a single tick.
    * Framework adapters use this to plug in their own batching primitive, so that a single query
    * update only triggers one re-render instead of one per subscriber.
    *
    * @example
    * ```ts
    * import { notifyManager } from '@tanstack/query-core'
    * import { batch } from 'solid-js'
    *
    * notifyManager.setBatchNotifyFunction(batch)
    * ```
    */
    setBatchNotifyFunction: (d) => {
      n = d;
    },
    /**
    * Configures a custom callback that schedules when the next batch runs.
    * The default behavior is `setTimeout(callback, 0)`.
    *
    * @example
    * ```ts
    * import { notifyManager } from '@tanstack/query-core'
    *
    * // Schedule batches in the next microtask
    * notifyManager.setScheduler(queueMicrotask)
    *
    * // Schedule batches before the next frame is rendered
    * notifyManager.setScheduler(requestAnimationFrame)
    *
    * // Schedule batches some time in the future
    * notifyManager.setScheduler((cb) => setTimeout(cb, 10))
    * ```
    */
    setScheduler: (d) => {
      s = d;
    }
  };
}
const He = kd();
var Br, Kt, $r, ao, Sd = (ao = class extends on {
  constructor() {
    super();
    V(this, Br, !0);
    V(this, Kt);
    V(this, $r);
    F(this, $r, (t) => {
      if (typeof window < "u" && window.addEventListener) {
        const r = () => t(!0), n = () => t(!1);
        return window.addEventListener("online", r, !1), window.addEventListener("offline", n, !1), () => {
          window.removeEventListener("online", r), window.removeEventListener("offline", n);
        };
      }
    });
  }
  onSubscribe() {
    v(this, Kt) || this.setEventListener(v(this, $r));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = v(this, Kt)) == null || t.call(this), F(this, Kt, void 0));
  }
  /**
  * `setEventListener` can be used to set a custom event listener that will
  * be used to determine the online state. The provided `setup` function
  * receives a `setOnline` callback that should be called with a `boolean`
  * whenever the online state changes.
  *
  * @example
  * ```ts
  * import NetInfo from '@react-native-community/netinfo'
  * import { onlineManager } from '@tanstack/query-core'
  *
  * onlineManager.setEventListener((setOnline) => {
  *   return NetInfo.addEventListener((state) => {
  *     setOnline(!!state.isConnected)
  *   })
  * })
  * ```
  */
  setEventListener(t) {
    var r;
    F(this, $r, t), (r = v(this, Kt)) == null || r.call(this), F(this, Kt, t(this.setOnline.bind(this)));
  }
  /**
  * `setOnline` can be used to manually set the online state.
  *
  * @example
  * ```ts
  * import { onlineManager } from '@tanstack/query-core'
  *
  * // Set to online
  * onlineManager.setOnline(true)
  *
  * // Set to offline
  * onlineManager.setOnline(false)
  * ```
  */
  setOnline(t) {
    v(this, Br) !== t && (F(this, Br, t), this.listeners.forEach((r) => {
      r(t);
    }));
  }
  /**
  * `isOnline` can be used to get the current online state.
  */
  isOnline() {
    return v(this, Br);
  }
}, Br = new WeakMap(), Kt = new WeakMap(), $r = new WeakMap(), ao);
const ss = new Sd();
function Nd(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function ko(e) {
  return (e ?? "online") === "online" ? ss.isOnline() : !0;
}
var Ws = class extends Error {
  constructor(e) {
    super("CancelledError"), this.revert = e == null ? void 0 : e.revert, this.silent = e == null ? void 0 : e.silent;
  }
};
function So(e) {
  let t = !1, r = 0, n, s = "pending", i, o;
  const d = new Promise((w, k) => {
    i = w, o = k;
  });
  d.catch(nt);
  const h = () => s !== "pending", f = (w) => {
    var k;
    if (!h()) {
      const _ = new Ws(w);
      P(_), (k = e.onCancel) == null || k.call(e, _);
    }
  }, p = () => {
    t = !0;
  }, g = () => {
    t = !1;
  }, y = () => ha.isFocused() && (e.networkMode === "always" || ss.isOnline()) && e.canRun(), C = () => ko(e.networkMode) && e.canRun(), T = (w) => {
    h() || (n == null || n(), s = "resolved", i(w));
  }, P = (w) => {
    h() || (n == null || n(), s = "rejected", o(w));
  }, A = () => new Promise((w) => {
    var k;
    n = (_) => {
      (h() || y()) && w(_);
    }, (k = e.onPause) == null || k.call(e);
  }).then(() => {
    var w;
    n = void 0, h() || (w = e.onContinue) == null || w.call(e);
  }), N = () => {
    if (h()) return;
    let w;
    const k = r === 0 ? e.initialPromise : void 0;
    try {
      w = k ?? e.fn();
    } catch (_) {
      w = Promise.reject(_);
    }
    Promise.resolve(w).then(T).catch((_) => {
      var M;
      if (h()) return;
      const E = e.retry ?? (da() ? 0 : 3), z = e.retryDelay ?? Nd, D = typeof z == "function" ? z(r, _) : z, O = E === !0 || typeof E == "number" && r < E || typeof E == "function" && E(r, _);
      if (t || !O) {
        P(_);
        return;
      }
      r++, (M = e.onFail) == null || M.call(e, r, _), pd(D).then(() => y() ? void 0 : A()).then(() => {
        t ? P(_) : N();
      });
    });
  };
  return {
    promise: d,
    status: () => s,
    cancel: f,
    continue: () => (n == null || n(), d),
    cancelRetry: p,
    continueRetry: g,
    canStart: C,
    start: () => (C() ? N() : A().then(N), d)
  };
}
var xr, io, No = (io = class {
  constructor() {
    V(this, xr);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), yo(this.gcTime) && F(this, xr, pr.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(e) {
    this.gcTime = Math.max(this.gcTime || 0, e ?? (da() ? 1 / 0 : 3e5));
  }
  clearGcTimeout() {
    v(this, xr) !== void 0 && (pr.clearTimeout(v(this, xr)), F(this, xr, void 0));
  }
}, xr = new WeakMap(), io);
function Cd(e) {
  return { onFetch: (t, r) => {
    var p, g, y, C, T;
    const n = t.options, s = (y = (g = (p = t.fetchOptions) == null ? void 0 : p.meta) == null ? void 0 : g.fetchMore) == null ? void 0 : y.direction, i = ((C = t.state.data) == null ? void 0 : C.pages) || [], o = ((T = t.state.data) == null ? void 0 : T.pageParams) || [];
    let d = {
      pages: [],
      pageParams: []
    }, h = 0;
    const f = async () => {
      let P = !1;
      const A = (k) => {
        yd(k, () => t.signal, () => P = !0);
      }, N = wo(t.options, t.fetchOptions), w = async (k, _, E) => {
        if (P) return Promise.reject(t.signal.reason);
        if (_ == null && k.pages.length) return Promise.resolve(k);
        const D = (() => {
          const B = {
            client: t.client,
            queryKey: t.queryKey,
            pageParam: _,
            direction: E ? "backward" : "forward",
            meta: t.options.meta
          };
          return A(B), B;
        })(), O = await N(D), { maxPages: M } = t.options, L = E ? bd : gd;
        return {
          pages: L(k.pages, O, M),
          pageParams: L(k.pageParams, _, M)
        };
      };
      if (s && i.length) {
        const k = s === "backward", _ = k ? Co : Vs, E = {
          pages: i,
          pageParams: o
        };
        d = await w(E, _(n, E), k);
      } else {
        const k = e ?? i.length;
        do {
          const _ = h === 0 ? o[0] ?? n.initialPageParam : Vs(n, d);
          if (h > 0 && _ == null) break;
          d = await w(d, _), h++;
        } while (h < k);
      }
      return d;
    };
    t.options.persister ? t.fetchFn = () => {
      var P, A;
      return (A = (P = t.options).persister) == null ? void 0 : A.call(P, f, {
        client: t.client,
        queryKey: t.queryKey,
        meta: t.options.meta,
        signal: t.signal
      }, r);
    } : t.fetchFn = f;
  } };
}
function Vs(e, { pages: t, pageParams: r }) {
  const n = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[n], t, r[n], r) : void 0;
}
function Co(e, { pages: t, pageParams: r }) {
  var n;
  return t.length > 0 ? (n = e.getPreviousPageParam) == null ? void 0 : n.call(e, t[0], t, r[0], r) : void 0;
}
function _d(e, t) {
  return t ? Vs(e, t) != null : !1;
}
function Td(e, t) {
  return !t || !e.getPreviousPageParam ? !1 : Co(e, t) != null;
}
var Wr, vr, Vr, yt, wr, qe, Pn, kr, Nt, Ut, oo, Pd = (oo = class extends No {
  constructor(t) {
    super();
    V(this, Nt);
    V(this, Wr);
    V(this, vr);
    V(this, Vr);
    V(this, yt);
    V(this, wr);
    V(this, qe);
    V(this, Pn);
    V(this, kr);
    F(this, kr, !1), F(this, Pn, t.defaultOptions), this.setOptions(t.options), this.observers = [], F(this, wr, t.client), F(this, yt, v(this, wr).getQueryCache()), this.queryKey = t.queryKey, this.queryHash = t.queryHash, F(this, vr, di(this.options)), this.state = t.state ?? v(this, vr), this.scheduleGc();
  }
  /**
  * The `meta` object passed in the query's options, if any.
  */
  get meta() {
    return this.options.meta;
  }
  /** @internal */
  get queryType() {
    return v(this, Wr);
  }
  /**
  * The promise for the currently in-flight fetch, if the query is fetching.
  * `undefined` when the query is not fetching.
  */
  get promise() {
    var t;
    return (t = v(this, qe)) == null ? void 0 : t.promise;
  }
  /** @internal */
  setOptions(t) {
    if (this.options = {
      ...v(this, Pn),
      ...t
    }, t != null && t._type && F(this, Wr, t._type), this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const r = di(this.options);
      r.data !== void 0 && (this.setState(ui(r.data, r.dataUpdatedAt)), F(this, vr, r));
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && v(this, yt).remove(this);
  }
  /** @internal */
  setData(t, r) {
    const n = $s(this.state.data, t, this.options);
    return se(this, Nt, Ut).call(this, {
      data: n,
      type: "success",
      dataUpdatedAt: r == null ? void 0 : r.updatedAt,
      manual: r == null ? void 0 : r.manual
    }), n;
  }
  /**
  * Merges the given partial state directly into this query's state, notifying observers. Used
  * by persistence and broadcast plugins to restore a state snapshot, and by devtools to let a
  * user manually trigger a loading/error state or edit the cached data.
  */
  setState(t) {
    se(this, Nt, Ut).call(this, {
      type: "setState",
      state: t
    });
  }
  /**
  * Cancels the query's currently in-flight fetch, if any.
  * - Returns a promise that resolves once the cancellation has settled.
  * - If no fetch is in progress, resolves immediately.
  *
  * @example
  * ```ts
  * await query.cancel()
  * ```
  */
  cancel(t) {
    var n, s;
    const r = (n = v(this, qe)) == null ? void 0 : n.promise;
    return (s = v(this, qe)) == null || s.cancel(t), r ? r.then(nt).catch(nt) : Promise.resolve();
  }
  /**
  * Clears the query's garbage collection timeout and silently cancels any
  * in-flight fetch. Called by `QueryCache` when the query is removed from
  * the cache.
  *
  * @see {@link Query#cancel}
  */
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  /** @internal */
  get resetState() {
    return v(this, vr);
  }
  /**
  * Resets the query back to its initial state (the state it had when it was
  * first created, e.g. any `initialData`), destroying it first to cancel any
  * in-flight fetch.
  */
  reset() {
    this.destroy(), this.setState(this.resetState);
  }
  /**
  * Returns `true` if the query has at least one observer for which `enabled`
  * does not resolve to `false`.
  */
  isActive() {
    return this.observers.some((t) => Ee(t.options.enabled, this) !== !1);
  }
  /**
  * Returns `true` if the query is disabled, meaning it will not fetch
  * automatically.
  * - If the query has observers, it is disabled when none of them are active
  *   (see `isActive`).
  * - If the query has no observers, it is disabled when its `queryFn` is
  *   `skipToken` or it has never been fetched.
  */
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === ns || !this.isFetched();
  }
  /**
  * Returns `true` if the query has been fetched, i.e. it has resolved with
  * either data or an error at least once.
  */
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  /**
  * Returns `true` if the query has at least one observer configured with
  * `staleTime: 'static'`, meaning it is treated as never stale.
  */
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some((t) => Ee(t.options.staleTime, this) === "static") : !1;
  }
  /**
  * Returns `true` if the query is stale.
  * - If the query has observers, defers to whether any observer's current
  *   result reports `isStale` (which accounts for each observer's own
  *   `staleTime` and `enabled` state).
  * - If the query has no observers, it is considered stale when it has no
  *   data or has been invalidated.
  *
  * @see {@link Query#isStaleByTime}
  * @example
  * ```ts
  * if (query.isStale()) {
  *   // refetch or otherwise treat the cached data as outdated
  * }
  * ```
  */
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some((t) => t.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated;
  }
  /**
  * Returns `true` if the query's data is stale relative to the given
  * `staleTime` (defaults to `0`).
  * - A query with no data is always stale.
  * - `staleTime: 'static'` is never stale.
  * - An invalidated query is always stale.
  * - Otherwise, staleness is based on elapsed time since `dataUpdatedAt`.
  *
  * @see {@link Query#isStale}
  * @example
  * ```ts
  * const isStale = query.isStaleByTime(1000 * 60)
  * ```
  */
  isStaleByTime(t = 0) {
    return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !xo(this.state.dataUpdatedAt, t);
  }
  /** @internal */
  onFocus() {
    var t, r;
    (t = this.observers.find((n) => n.shouldFetchOnWindowFocus())) == null || t.refetch({ cancelRefetch: !1 }), (r = v(this, qe)) == null || r.continue();
  }
  /** @internal */
  onOnline() {
    var t, r;
    (t = this.observers.find((n) => n.shouldFetchOnReconnect())) == null || t.refetch({ cancelRefetch: !1 }), (r = v(this, qe)) == null || r.continue();
  }
  /** @internal */
  addObserver(t) {
    this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), v(this, yt).notify({
      type: "observerAdded",
      query: this,
      observer: t
    }));
  }
  /** @internal */
  removeObserver(t) {
    const r = this.observers.indexOf(t);
    r !== -1 && (this.observers.splice(r, 1), this.observers.length || (v(this, qe) && (v(this, kr) || this.state.fetchStatus === "paused" && this.state.status === "pending" ? v(this, qe).cancel({ revert: !0 }) : v(this, qe).cancelRetry()), this.scheduleGc()), v(this, yt).notify({
      type: "observerRemoved",
      query: this,
      observer: t
    }));
  }
  /**
  * Returns the number of observers currently subscribed to this query.
  *
  * @example
  * ```ts
  * if (query.getObserversCount() === 0) {
  *   // no component is currently watching this query
  * }
  * ```
  */
  getObserversCount() {
    return this.observers.length;
  }
  /**
  * Marks the query as invalidated, unless it is already invalidated. This
  * updates `state.isInvalidated` and notifies observers, but does not by
  * itself trigger a refetch.
  *
  * @example
  * ```ts
  * query.invalidate()
  * ```
  */
  invalidate() {
    this.state.isInvalidated || se(this, Nt, Ut).call(this, { type: "invalidate" });
  }
  /**
  * Fetches the query, i.e. runs its `queryFn` (through any configured
  * retryer/behavior) and updates the query's state with the result.
  * - If a fetch is already in flight, returns its promise instead of
  *   starting a new one, unless `fetchOptions.cancelRefetch` is set and the
  *   query already has data, in which case the current fetch is silently
  *   cancelled first.
  * - If `options` is passed, it replaces the query's current options
  *   before fetching.
  */
  async fetch(t, r) {
    var f, p, g, y, C, T, P, A, N, w, k, _;
    if (this.state.fetchStatus !== "idle" && ((f = v(this, qe)) == null ? void 0 : f.status()) !== "rejected") {
      if (this.state.data !== void 0 && (r != null && r.cancelRefetch)) this.cancel({ silent: !0 });
      else if (v(this, qe))
        return v(this, qe).continueRetry(), v(this, qe).promise;
    }
    if (t && this.setOptions(t), !this.options.queryFn) {
      const E = this.observers.find((z) => z.options.queryFn);
      E && this.setOptions(E.options);
    }
    process.env.NODE_ENV !== "production" && (Array.isArray(this.options.queryKey) || console.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']"));
    const n = new AbortController(), s = (E) => {
      Object.defineProperty(E, "signal", {
        enumerable: !0,
        get: () => (F(this, kr, !0), n.signal)
      });
    }, i = () => {
      const E = wo(this.options, r), D = (() => {
        const O = {
          client: v(this, wr),
          queryKey: this.queryKey,
          meta: this.meta
        };
        return s(O), O;
      })();
      return F(this, kr, !1), this.options.persister ? this.options.persister(E, D, this) : E(D);
    }, d = (() => {
      const E = {
        fetchOptions: r,
        options: this.options,
        queryKey: this.queryKey,
        client: v(this, wr),
        state: this.state,
        fetchFn: i
      };
      return s(E), E;
    })();
    (p = v(this, Wr) === "infinite" ? Cd(this.options.pages) : this.options.behavior) == null || p.onFetch(d, this), F(this, Vr, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((g = d.fetchOptions) == null ? void 0 : g.meta)) && se(this, Nt, Ut).call(this, {
      type: "fetch",
      meta: (y = d.fetchOptions) == null ? void 0 : y.meta
    });
    const h = F(this, qe, So({
      initialPromise: r == null ? void 0 : r.initialPromise,
      fn: d.fetchFn,
      onCancel: (E) => {
        E instanceof Ws && E.revert && this.setState({
          ...v(this, Vr),
          fetchStatus: "idle"
        }), n.abort();
      },
      onFail: (E, z) => {
        se(this, Nt, Ut).call(this, {
          type: "failed",
          failureCount: E,
          error: z
        });
      },
      onPause: () => {
        se(this, Nt, Ut).call(this, { type: "pause" });
      },
      onContinue: () => {
        se(this, Nt, Ut).call(this, { type: "continue" });
      },
      retry: d.options.retry,
      retryDelay: d.options.retryDelay,
      networkMode: d.options.networkMode,
      canRun: () => !0
    }));
    try {
      const E = await h.start();
      if (E === void 0)
        throw process.env.NODE_ENV !== "production" && console.error(`Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`), new Error(`${this.queryHash} data is undefined`);
      return this.setData(E), (T = (C = v(this, yt).config).onSuccess) == null || T.call(C, E, this), (A = (P = v(this, yt).config).onSettled) == null || A.call(P, E, this.state.error, this), E;
    } catch (E) {
      if (E instanceof Ws) {
        if (E.silent) return v(this, qe).promise;
        if (E.revert) {
          if (this.state.data === void 0) throw E;
          return this.state.data;
        }
      }
      throw se(this, Nt, Ut).call(this, {
        type: "error",
        error: E
      }), (w = (N = v(this, yt).config).onError) == null || w.call(N, E, this), (_ = (k = v(this, yt).config).onSettled) == null || _.call(k, this.state.data, E, this), E;
    } finally {
      v(this, qe) === h && F(this, qe, void 0), this.scheduleGc();
    }
  }
}, Wr = new WeakMap(), vr = new WeakMap(), Vr = new WeakMap(), yt = new WeakMap(), wr = new WeakMap(), qe = new WeakMap(), Pn = new WeakMap(), kr = new WeakMap(), Nt = new WeakSet(), Ut = function(t) {
  const r = (n) => {
    switch (t.type) {
      case "failed":
        return {
          ...n,
          fetchFailureCount: t.failureCount,
          fetchFailureReason: t.error
        };
      case "pause":
        return {
          ...n,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...n,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...n,
          ..._o(n.data, this.options),
          fetchMeta: t.meta ?? null
        };
      case "success":
        const s = {
          ...n,
          ...ui(t.data, t.dataUpdatedAt),
          dataUpdateCount: n.dataUpdateCount + 1,
          ...!t.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
        return F(this, Vr, t.manual ? s : void 0), s;
      case "error":
        const i = t.error;
        return {
          ...n,
          error: i,
          errorUpdateCount: n.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: n.fetchFailureCount + 1,
          fetchFailureReason: i,
          fetchStatus: "idle",
          status: "error",
          isInvalidated: !0
        };
      case "invalidate":
        return {
          ...n,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...n,
          ...t.state
        };
    }
  };
  this.state = r(this.state), He.batch(() => {
    this.observers.slice().forEach((n) => {
      n.onQueryUpdate();
    }), v(this, yt).notify({
      query: this,
      type: "updated",
      action: t
    });
  });
}, oo);
function _o(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: ko(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function ui(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function di(e) {
  const t = typeof e.initialData == "function" ? e.initialData() : e.initialData, r = t !== void 0, n = r ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: r ? n ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: r ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var tt, ue, En, rt, Sr, Qr, qt, On, Yr, Gr, Nr, Cr, Jt, Xr, be, kn, Qs, Ys, Gs, Xs, Ks, Js, Zs, ea, lo, To = (lo = class extends on {
  constructor(t, r) {
    super();
    V(this, be);
    V(this, tt);
    V(this, ue);
    V(this, En);
    V(this, rt);
    V(this, Sr);
    V(this, Qr);
    V(this, qt);
    V(this, On);
    V(this, Yr);
    V(this, Gr);
    V(this, Nr);
    V(this, Cr);
    V(this, Jt);
    V(this, Xr, /* @__PURE__ */ new Set());
    this.options = r, F(this, tt, t), F(this, qt, null), this.bindMethods(), this.setOptions(r);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (v(this, ue).addObserver(this), hi(v(this, ue), this.options) ? se(this, be, kn).call(this) : this.updateResult(), se(this, be, Ks).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  /**
  * Returns whether the observed query is currently stale and configured
  * (via the `refetchOnReconnect` option) to refetch when the network
  * reconnects.
  */
  shouldFetchOnReconnect() {
    return ta(v(this, ue), this.options, this.options.refetchOnReconnect);
  }
  /**
  * Returns whether the observed query is currently stale and configured
  * (via the `refetchOnWindowFocus` option) to refetch when the window
  * regains focus.
  */
  shouldFetchOnWindowFocus() {
    return ta(v(this, ue), this.options, this.options.refetchOnWindowFocus);
  }
  /**
  * Stops observing the current query: clears all listeners, cancels the
  * stale and refetch-interval timers, and removes this observer from the
  * query it was observing.
  */
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), se(this, be, Js).call(this), se(this, be, Zs).call(this), v(this, ue).removeObserver(this);
  }
  /**
  * Updates the observer's options. This will re-resolve the query being
  * observed (switching to a different query if the `queryKey` changed),
  * trigger a fetch if the new options require one and the observer has
  * subscribers, recompute the current result, and reschedule the stale and
  * refetch-interval timers as needed.
  *
  * @example
  * ```ts
  * observer.setOptions({ queryKey: ['posts', 1], queryFn: () => fetchPost(1) })
  * // later: switch to a different query, reusing the same observer
  * observer.setOptions({ queryKey: ['posts', 2], queryFn: () => fetchPost(2) })
  * ```
  */
  setOptions(t) {
    const r = this.options, n = v(this, ue);
    if (this.options = v(this, tt).defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof Ee(this.options.enabled, v(this, ue)) != "boolean") throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
    se(this, be, ea).call(this), v(this, ue).setOptions(this.options), r._defaulted && !Jn(this.options, r) && v(this, tt).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: v(this, ue),
      observer: this
    });
    const s = this.hasListeners();
    s && fi(v(this, ue), n, this.options, r) && se(this, be, kn).call(this), this.updateResult(), s && (v(this, ue) !== n || Ee(this.options.enabled, v(this, ue)) !== Ee(r.enabled, v(this, ue)) || Ee(this.options.staleTime, v(this, ue)) !== Ee(r.staleTime, v(this, ue))) && se(this, be, Ys).call(this);
    const i = se(this, be, Gs).call(this);
    s && (v(this, ue) !== n || Ee(this.options.enabled, v(this, ue)) !== Ee(r.enabled, v(this, ue)) || i !== v(this, Jt)) && se(this, be, Xs).call(this, i);
  }
  /**
  * Computes the result the observer would produce for the given (already-defaulted) options
  * right now, building the underlying `Query` if it doesn't exist yet, without waiting for a
  * subscription callback. Called by framework adapters on every render (e.g. `useQuery`) so the
  * returned value is available synchronously, ahead of `setOptions` triggering an actual fetch.
  */
  getOptimisticResult(t) {
    const r = v(this, tt).getQueryCache().build(v(this, tt), t), n = this.createResult(r, t);
    return Jn(this.getCurrentResult(), n) || (F(this, rt, n), F(this, Qr, this.options), F(this, Sr, v(this, ue).state)), n;
  }
  /**
  * Returns the most recently computed `QueryObserverResult` for the
  * observed query. This is a point-in-time read; to be notified of updates
  * as they happen, subscribe to the observer instead (its inherited
  * `subscribe` method).
  *
  * @example
  * ```ts
  * const result = observer.getCurrentResult()
  * console.log(result.status, result.data)
  * ```
  */
  getCurrentResult() {
    return v(this, rt);
  }
  /**
  * Wraps a `QueryObserverResult` in a `Proxy` that records which properties are read, via
  * {@link QueryObserver#trackProp} (and an optional `onPropTracked` callback). Used by framework
  * adapters when `notifyOnChangeProps` is not set, to implement its default "only re-render on
  * properties you actually read" behavior.
  */
  trackResult(t, r) {
    return new Proxy(t, { get: (n, s) => (this.trackProp(s), r == null || r(s), Reflect.get(n, s)) });
  }
  /**
  * Records that the given `QueryObserverResult` property was read, so a subsequent update only
  * notifies this observer if a tracked property actually changed. Normally called indirectly via
  * {@link QueryObserver#trackResult}'s proxy; exposed directly for adapters that track property
  * access themselves (e.g. through their own reactivity system) instead of via the proxy.
  */
  trackProp(t) {
    v(this, Xr).add(t);
  }
  /**
  * Returns the `Query` instance this observer is currently observing.
  */
  getCurrentQuery() {
    return v(this, ue);
  }
  /**
  * Refetches the observed query and returns a promise that resolves with
  * the resulting `QueryObserverResult`.
  *
  * @example
  * ```ts
  * const result = await observer.refetch({ cancelRefetch: false })
  * console.log(result.data)
  * ```
  */
  refetch({ ...t } = {}) {
    return this.fetch({ ...t });
  }
  /**
  * Fetches a query defined by the given options without affecting this
  * observer's own tracked query or result, and returns a promise that
  * resolves with the `QueryObserverResult` for that fetch. This is useful
  * for prefetching data that another observer (e.g. a query about to be
  * navigated to) will need, ahead of time.
  *
  * @example
  * ```ts
  * const result = await observer.fetchOptimistic({
  *   queryKey: ['posts', 2],
  *   queryFn: () => fetchPost(2),
  * })
  * console.log(result.data)
  * ```
  */
  fetchOptimistic(t) {
    const r = v(this, tt).defaultQueryOptions(t), n = v(this, tt).getQueryCache().build(v(this, tt), r);
    let s = () => {
    }, i;
    const o = new Promise((d) => {
      i = d, s = v(this, tt).getQueryCache().subscribe((h) => {
        h.type === "updated" && h.query.queryHash === n.queryHash && n.state.data !== void 0 && (s(), d(this.createResult(n, r)));
      });
    });
    return Promise.race([n.fetch().then(() => {
      const d = this.createResult(n, r);
      return i == null || i(d), d;
    }).finally(() => {
      s();
    }), o]);
  }
  fetch(t) {
    return se(this, be, kn).call(this, {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), v(this, rt)));
  }
  createResult(t, r) {
    var z;
    const n = v(this, ue), s = this.options, i = v(this, rt), o = v(this, Sr), d = v(this, Qr), h = t !== n ? t.state : v(this, En), { state: f } = t;
    let p = { ...f }, g = !1, y;
    if (r._optimisticResults) {
      const D = this.hasListeners(), O = !D && hi(t, r), M = D && fi(t, n, r, s);
      (O || M) && (p = {
        ...p,
        ..._o(f.data, t.options)
      }), r._optimisticResults === "isRestoring" && (p.fetchStatus = "idle");
    }
    let { error: C, errorUpdatedAt: T, status: P } = p;
    y = p.data;
    let A = !1;
    if (r.placeholderData !== void 0 && y === void 0 && P === "pending") {
      let D;
      i != null && i.isPlaceholderData && r.placeholderData === (d == null ? void 0 : d.placeholderData) ? (D = i.data, A = !0) : D = typeof r.placeholderData == "function" ? r.placeholderData((z = v(this, Gr)) == null ? void 0 : z.state.data, v(this, Gr)) : r.placeholderData, D !== void 0 && (P = "success", y = $s(i == null ? void 0 : i.data, D, r), g = !0);
    }
    if (r.select && y !== void 0 && !A)
      if (i && y === (o == null ? void 0 : o.data) && r.select === v(this, On)) y = v(this, Yr);
      else try {
        F(this, On, r.select), y = r.select(y), y = $s(i == null ? void 0 : i.data, y, r), F(this, Yr, y), F(this, qt, null);
      } catch (D) {
        F(this, qt, D);
      }
    else y === void 0 && F(this, qt, null);
    v(this, qt) && (C = v(this, qt), y = v(this, Yr), T = Date.now(), P = "error", g = !1);
    const N = p.fetchStatus === "fetching", w = P === "pending", k = P === "error", _ = w && N, E = y !== void 0;
    return {
      status: P,
      fetchStatus: p.fetchStatus,
      isPending: w,
      isSuccess: P === "success",
      isError: k,
      isInitialLoading: _,
      isLoading: _,
      data: y,
      dataUpdatedAt: p.dataUpdatedAt,
      error: C,
      errorUpdatedAt: T,
      failureCount: p.fetchFailureCount,
      failureReason: p.fetchFailureReason,
      errorUpdateCount: p.errorUpdateCount,
      isFetched: t.isFetched(),
      isFetchedAfterMount: p.dataUpdateCount > h.dataUpdateCount || p.errorUpdateCount > h.errorUpdateCount,
      isFetching: N,
      isRefetching: N && !w,
      isLoadingError: k && !E,
      isPaused: p.fetchStatus === "paused",
      isPlaceholderData: g,
      isRefetchError: k && E,
      isStale: fa(t, r),
      refetch: this.refetch,
      isEnabled: Ee(r.enabled, t) !== !1
    };
  }
  /**
  * Recomputes and stores the current result from the current query/options, notifying listeners
  * if it changed. Framework adapters call this right after subscribing to make sure no query
  * update was missed in the gap between creating the observer and subscribing to it.
  */
  updateResult() {
    const t = v(this, rt), r = this.createResult(v(this, ue), this.options);
    if (F(this, Sr, v(this, ue).state), F(this, Qr, this.options), v(this, Sr).data !== void 0 && F(this, Gr, v(this, ue)), Jn(r, t)) return;
    F(this, rt, r);
    const s = (() => {
      if (!t) return !0;
      const { notifyOnChangeProps: i } = this.options, o = typeof i == "function" ? i() : i;
      if (o === "all" || !o && !v(this, Xr).size) return !0;
      const d = new Set(o ?? v(this, Xr));
      return this.options.throwOnError && d.add("error"), Object.keys(v(this, rt)).some((h) => {
        const f = h;
        return v(this, rt)[f] !== t[f] && d.has(f);
      });
    })();
    He.batch(() => {
      s && this.listeners.forEach((i) => {
        i(v(this, rt));
      }), v(this, tt).getQueryCache().notify({
        query: v(this, ue),
        type: "observerResultsUpdated"
      });
    });
  }
  /** @internal */
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && se(this, be, Ks).call(this);
  }
}, tt = new WeakMap(), ue = new WeakMap(), En = new WeakMap(), rt = new WeakMap(), Sr = new WeakMap(), Qr = new WeakMap(), qt = new WeakMap(), On = new WeakMap(), Yr = new WeakMap(), Gr = new WeakMap(), Nr = new WeakMap(), Cr = new WeakMap(), Jt = new WeakMap(), Xr = new WeakMap(), be = new WeakSet(), kn = function(t) {
  se(this, be, ea).call(this);
  let r = v(this, ue).fetch(this.options, t);
  return t != null && t.throwOnError || (r = r.catch(nt)), r;
}, Qs = function(t) {
  return !da() && Ee(this.options.enabled, v(this, ue)) !== !1 && yo(t);
}, Ys = function() {
  se(this, be, Js).call(this);
  const t = Ee(this.options.staleTime, v(this, ue));
  if (v(this, rt).isStale || !se(this, be, Qs).call(this, t)) return;
  const r = xo(v(this, rt).dataUpdatedAt, t) + 1;
  F(this, Nr, pr.setTimeout(() => {
    v(this, rt).isStale || this.updateResult();
  }, r));
}, Gs = function() {
  return Ee(this.options.refetchInterval, v(this, ue)) ?? !1;
}, Xs = function(t) {
  se(this, be, Zs).call(this), F(this, Jt, t), !(v(this, Jt) === 0 || !se(this, be, Qs).call(this, v(this, Jt))) && F(this, Cr, pr.setInterval(() => {
    (this.options.refetchIntervalInBackground || ha.isFocused()) && se(this, be, kn).call(this);
  }, v(this, Jt)));
}, Ks = function() {
  se(this, be, Ys).call(this), se(this, be, Xs).call(this, se(this, be, Gs).call(this));
}, Js = function() {
  v(this, Nr) !== void 0 && (pr.clearTimeout(v(this, Nr)), F(this, Nr, void 0));
}, Zs = function() {
  v(this, Cr) !== void 0 && (pr.clearInterval(v(this, Cr)), F(this, Cr, void 0));
}, ea = function() {
  const t = v(this, tt).getQueryCache().build(v(this, tt), this.options);
  if (t === v(this, ue)) return;
  const r = v(this, ue);
  F(this, ue, t), F(this, En, t.state), this.hasListeners() && (r == null || r.removeObserver(this), t.addObserver(this));
}, lo);
function Ed(e, t) {
  return Ee(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && Ee(t.retryOnMount, e) === !1);
}
function hi(e, t) {
  return Ed(e, t) || e.state.data !== void 0 && ta(e, t, t.refetchOnMount);
}
function ta(e, t, r) {
  if (Ee(t.enabled, e) !== !1 && Ee(t.staleTime, e) !== "static") {
    const n = Ee(r, e);
    return n === "always" || n !== !1 && fa(e, t);
  }
  return !1;
}
function fi(e, t, r, n) {
  return (e !== t || Ee(n.enabled, e) === !1) && (!r.suspense || e.state.status !== "error") && fa(e, r);
}
function fa(e, t) {
  return Ee(t.enabled, e) !== !1 && e.isStaleByTime(Ee(t.staleTime, e));
}
var Od = class extends To {
  constructor(e, t) {
    super(e, t);
  }
  bindMethods() {
    super.bindMethods(), this.fetchNextPage = this.fetchNextPage.bind(this), this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
  }
  /**
  * Updates the observer's options. Behaves the same as
  * `QueryObserver.setOptions`, additionally marking the options as
  * belonging to an infinite query before delegating to the base
  * implementation.
  */
  setOptions(e) {
    e._type = "infinite", super.setOptions(e);
  }
  /**
  * The infinite-query counterpart of {@link QueryObserver#getOptimisticResult}, marking the
  * options as an infinite query before delegating to it. Called by framework adapters (e.g.
  * `useInfiniteQuery`) ahead of subscribing, to compute the current `InfiniteQueryObserverResult`
  * synchronously.
  */
  getOptimisticResult(e) {
    return e._type = "infinite", super.getOptimisticResult(e);
  }
  /**
  * Fetches the next page of the infinite query and returns a promise that
  * resolves with the resulting `InfiniteQueryObserverResult`. The page
  * param used for the fetch is determined by `getNextPageParam`, which
  * receives the current pages/page params and whose result also determines
  * `hasNextPage`.
  *
  * @example
  * ```ts
  * const { hasNextPage } = observer.getCurrentResult()
  *
  * if (hasNextPage) {
  *   await observer.fetchNextPage()
  * }
  * ```
  *
  * @see {@link InfiniteQueryObserver#fetchPreviousPage}
  */
  fetchNextPage(e) {
    return this.fetch({
      ...e,
      meta: { fetchMore: { direction: "forward" } }
    });
  }
  /**
  * Fetches the previous page of the infinite query and returns a promise
  * that resolves with the resulting `InfiniteQueryObserverResult`. The page
  * param used for the fetch is determined by `getPreviousPageParam`, which
  * receives the current pages/page params and whose result also determines
  * `hasPreviousPage`.
  *
  * @example
  * ```ts
  * const { hasPreviousPage } = observer.getCurrentResult()
  *
  * if (hasPreviousPage) {
  *   await observer.fetchPreviousPage()
  * }
  * ```
  *
  * @see {@link InfiniteQueryObserver#fetchNextPage}
  */
  fetchPreviousPage(e) {
    return this.fetch({
      ...e,
      meta: { fetchMore: { direction: "backward" } }
    });
  }
  createResult(e, t) {
    var C, T;
    const { state: r } = e, n = super.createResult(e, t), { isFetching: s, isRefetching: i, isError: o, isRefetchError: d } = n, h = (T = (C = r.fetchMeta) == null ? void 0 : C.fetchMore) == null ? void 0 : T.direction, f = o && h === "forward", p = s && h === "forward", g = o && h === "backward", y = s && h === "backward";
    return {
      ...n,
      fetchNextPage: this.fetchNextPage,
      fetchPreviousPage: this.fetchPreviousPage,
      hasNextPage: _d(t, r.data),
      hasPreviousPage: Td(t, r.data),
      isFetchNextPageError: f,
      isFetchingNextPage: p,
      isFetchPreviousPageError: g,
      isFetchingPreviousPage: y,
      isRefetchError: d && !f && !g,
      isRefetching: i && !p && !y
    };
  }
}, Rn, Pt, Xe, _r, Et, Gt, co, Rd = (co = class extends No {
  constructor(t) {
    super();
    V(this, Et);
    V(this, Rn);
    V(this, Pt);
    V(this, Xe);
    V(this, _r);
    F(this, Rn, t.client), this.mutationId = t.mutationId, F(this, Xe, t.mutationCache), F(this, Pt, []), this.state = t.state || Po(), this.setOptions(t.options), this.scheduleGc();
  }
  /** @internal */
  setOptions(t) {
    this.options = t, this.updateGcTime(this.options.gcTime);
  }
  /**
  * The `meta` object passed in the mutation's options, if any.
  */
  get meta() {
    return this.options.meta;
  }
  /** @internal */
  addObserver(t) {
    v(this, Pt).includes(t) || (v(this, Pt).push(t), this.clearGcTimeout(), v(this, Xe).notify({
      type: "observerAdded",
      mutation: this,
      observer: t
    }));
  }
  /** @internal */
  removeObserver(t) {
    F(this, Pt, v(this, Pt).filter((r) => r !== t)), this.scheduleGc(), v(this, Xe).notify({
      type: "observerRemoved",
      mutation: this,
      observer: t
    });
  }
  optionalRemove() {
    v(this, Pt).length || (this.state.status === "pending" ? this.scheduleGc() : v(this, Xe).remove(this));
  }
  /**
  * Resumes a mutation that is currently paused or was restored from a
  * dehydrated, still-`pending` state.
  *
  * - If this mutation has an active retryer (it paused mid-attempt, e.g. due
  *   to the network mode or scope-based queuing), its retryer is resumed.
  * - Otherwise, if the mutation's status is still `pending` (e.g. it was
  *   dehydrated while an attempt was in flight and never got a retryer in
  *   this instance), `execute` is called again with the last known variables.
  * - Otherwise the mutation has already settled and this resolves immediately
  *   without running anything again.
  *
  * @example
  * ```ts
  * // typically driven by reconnect handling, e.g. queryClient.resumePausedMutations()
  * const mutation = mutationCache.find({ mutationKey: ['addPost'] })
  * await mutation?.continue()
  * ```
  *
  * @see {@link Mutation#execute}
  */
  continue() {
    var t;
    return ((t = v(this, _r)) == null ? void 0 : t.continue()) ?? (this.state.status === "pending" ? this.execute(this.state.variables) : Promise.resolve());
  }
  /**
  * Runs the mutation function for the given variables through a retryer, and
  * drives the mutation's state and lifecycle callbacks through to settlement.
  *
  * If this mutation's state is already `pending` when `execute` is called
  * (i.e. it was restored, still in-flight, from a dehydrated state), the
  * `onMutate` step is skipped and a `continue` action is dispatched to
  * unpause it; otherwise a `pending` action is dispatched first, then the
  * mutation cache's `onMutate` and the mutation's own `onMutate` option are
  * awaited in that order, and the resulting context is stored.
  *
  * The mutation function is then run (subject to `retry`/`retryDelay`/
  * `networkMode`, and to the mutation cache's scope-based serialization).
  * On success, the cache's `onSuccess`/`onSettled` callbacks run before the
  * mutation's own `onSuccess`/`onSettled` options, a `success` action is
  * dispatched, and the resolved data is returned. On failure, the same
  * cache-then-option ordering is used for `onError`/`onSettled`, but each of
  * those four callbacks is individually caught so that a throwing callback
  * cannot mask the original error; an `error` action is then dispatched and
  * the original error is re-thrown.
  *
  * @example
  * ```ts
  * // Called internally by `MutationObserver.mutate` and `Mutation.continue` —
  * // applications normally trigger mutations through those, not this method.
  * const data = await mutation.execute(variables)
  * ```
  *
  * @see {@link Mutation#continue}
  */
  async execute(t) {
    var d, h, f, p, g, y, C, T, P, A, N, w, k, _, E, z, D, O;
    const r = () => {
      se(this, Et, Gt).call(this, { type: "continue" });
    }, n = {
      client: v(this, Rn),
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    }, s = F(this, _r, So({
      fn: () => this.options.mutationFn ? this.options.mutationFn(t, n) : Promise.reject(/* @__PURE__ */ new Error("No mutationFn found")),
      onFail: (M, L) => {
        se(this, Et, Gt).call(this, {
          type: "failed",
          failureCount: M,
          error: L
        });
      },
      onPause: () => {
        se(this, Et, Gt).call(this, { type: "pause" });
      },
      onContinue: r,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => v(this, Xe).canRun(this)
    })), i = this.state.status === "pending", o = !s.canStart();
    try {
      if (i) r();
      else {
        se(this, Et, Gt).call(this, {
          type: "pending",
          variables: t,
          isPaused: o
        }), v(this, Xe).config.onMutate && await v(this, Xe).config.onMutate(t, this, n);
        const L = await ((h = (d = this.options).onMutate) == null ? void 0 : h.call(d, t, n));
        L !== this.state.context && se(this, Et, Gt).call(this, {
          type: "pending",
          context: L,
          variables: t,
          isPaused: o
        });
      }
      const M = await s.start();
      return await ((p = (f = v(this, Xe).config).onSuccess) == null ? void 0 : p.call(f, M, t, this.state.context, this, n)), await ((y = (g = this.options).onSuccess) == null ? void 0 : y.call(g, M, t, this.state.context, n)), await ((T = (C = v(this, Xe).config).onSettled) == null ? void 0 : T.call(C, M, null, this.state.variables, this.state.context, this, n)), await ((A = (P = this.options).onSettled) == null ? void 0 : A.call(P, M, null, t, this.state.context, n)), se(this, Et, Gt).call(this, {
        type: "success",
        data: M
      }), M;
    } catch (M) {
      try {
        await ((w = (N = v(this, Xe).config).onError) == null ? void 0 : w.call(N, M, t, this.state.context, this, n));
      } catch (L) {
        Promise.reject(L);
      }
      try {
        await ((_ = (k = this.options).onError) == null ? void 0 : _.call(k, M, t, this.state.context, n));
      } catch (L) {
        Promise.reject(L);
      }
      try {
        await ((z = (E = v(this, Xe).config).onSettled) == null ? void 0 : z.call(E, void 0, M, this.state.variables, this.state.context, this, n));
      } catch (L) {
        Promise.reject(L);
      }
      try {
        await ((O = (D = this.options).onSettled) == null ? void 0 : O.call(D, void 0, M, t, this.state.context, n));
      } catch (L) {
        Promise.reject(L);
      }
      throw se(this, Et, Gt).call(this, {
        type: "error",
        error: M
      }), M;
    } finally {
      v(this, _r) === s && F(this, _r, void 0), v(this, Xe).runNext(this);
    }
  }
}, Rn = new WeakMap(), Pt = new WeakMap(), Xe = new WeakMap(), _r = new WeakMap(), Et = new WeakSet(), Gt = function(t) {
  const r = (n) => {
    switch (t.type) {
      case "failed":
        return {
          ...n,
          failureCount: t.failureCount,
          failureReason: t.error
        };
      case "pause":
        return {
          ...n,
          isPaused: !0
        };
      case "continue":
        return {
          ...n,
          isPaused: !1
        };
      case "pending":
        return {
          ...n,
          context: t.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: t.isPaused,
          status: "pending",
          variables: t.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...n,
          data: t.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...n,
          data: void 0,
          error: t.error,
          failureCount: n.failureCount + 1,
          failureReason: t.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = r(this.state), He.batch(() => {
    v(this, Pt).forEach((n) => {
      n.onMutationUpdate(t);
    }), v(this, Xe).notify({
      mutation: this,
      type: "updated",
      action: t
    });
  });
}, co);
function Po() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var Ht, Ct, An, uo, Ad = (uo = class extends on {
  constructor(t = {}) {
    super();
    V(this, Ht);
    V(this, Ct);
    V(this, An);
    this.config = t, F(this, Ht, /* @__PURE__ */ new Set()), F(this, Ct, /* @__PURE__ */ new Map()), F(this, An, 0);
  }
  /** @internal */
  build(t, r, n) {
    const s = new Rd({
      client: t,
      mutationCache: this,
      mutationId: ++Vn(this, An)._,
      options: t.defaultMutationOptions(r),
      state: n
    });
    return this.add(s), s;
  }
  /** @internal */
  add(t) {
    v(this, Ht).add(t);
    const r = Qn(t);
    if (typeof r == "string") {
      const n = v(this, Ct).get(r);
      n ? n.push(t) : v(this, Ct).set(r, [t]);
    }
    this.notify({
      type: "added",
      mutation: t
    });
  }
  /** @internal */
  remove(t) {
    if (v(this, Ht).delete(t)) {
      const r = Qn(t);
      if (typeof r == "string") {
        const n = v(this, Ct).get(r);
        if (n)
          if (n.length > 1) {
            const s = n.indexOf(t);
            s !== -1 && n.splice(s, 1);
          } else n[0] === t && v(this, Ct).delete(r);
      }
    }
    this.notify({
      type: "removed",
      mutation: t
    });
  }
  /** @internal */
  canRun(t) {
    var n;
    const r = Qn(t);
    if (typeof r == "string") {
      const s = (n = v(this, Ct).get(r)) == null ? void 0 : n.find((i) => i.state.status === "pending");
      return !s || s === t;
    } else return !0;
  }
  /** @internal */
  runNext(t) {
    var n, s;
    const r = Qn(t);
    return typeof r == "string" ? ((s = (n = v(this, Ct).get(r)) == null ? void 0 : n.find((i) => i !== t && i.state.isPaused)) == null ? void 0 : s.continue()) ?? Promise.resolve() : Promise.resolve();
  }
  /**
  * Removes all mutations from the cache.
  *
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * mutationCache.clear()
  * ```
  */
  clear() {
    He.batch(() => {
      v(this, Ht).forEach((t) => {
        this.notify({
          type: "removed",
          mutation: t
        });
      }), v(this, Ht).clear(), v(this, Ct).clear();
    });
  }
  /**
  * Returns all mutations within the cache.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a mutation in rare scenarios.
  *
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutations = mutationCache.getAll()
  * ```
  */
  getAll() {
    return Array.from(v(this, Ht));
  }
  /**
  * A slightly more advanced method that can be used to get an existing mutation instance from
  * the cache. If the mutation does not exist, `undefined` is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a mutation in rare scenarios.
  *
  * @see {@link MutationCache#findAll}
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutation = mutationCache.find({ mutationKey: ['addPost'] })
  * ```
  */
  find(t) {
    const r = {
      exact: !0,
      ...t
    };
    return this.getAll().find((n) => oi(r, n));
  }
  /**
  * An even more advanced method that can be used to get existing mutation instances from the
  * cache that match the given filters. If no mutations match, an empty array is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about mutations in rare scenarios.
  *
  * @see {@link MutationCache#find}
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutations = mutationCache.findAll({ mutationKey: ['addPost'] })
  * ```
  */
  findAll(t = {}) {
    return this.getAll().filter((r) => oi(t, r));
  }
  /** @internal */
  notify(t) {
    He.batch(() => {
      this.listeners.forEach((r) => {
        r(t);
      });
    });
  }
  /** @internal */
  resumePausedMutations() {
    const t = this.getAll().filter((r) => r.state.isPaused);
    return He.batch(() => Promise.all(t.map((r) => r.continue().catch(nt))));
  }
}, Ht = new WeakMap(), Ct = new WeakMap(), An = new WeakMap(), uo);
function Qn(e) {
  var t;
  return (t = e.options.scope) == null ? void 0 : t.id;
}
var Bt, Zt, Ke, $t, Mt, Sn, ra, ho, Dd = (ho = class extends on {
  constructor(t, r) {
    super();
    V(this, Mt);
    V(this, Bt);
    V(this, Zt);
    V(this, Ke);
    V(this, $t);
    F(this, Bt, t), this.setOptions(r), this.bindMethods(), se(this, Mt, Sn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this);
  }
  /**
  * Updates the observer's options.
  *
  * If the new `mutationKey` differs from the previous one (and both were
  * defined), the observer is reset, detaching it from the mutation it was
  * observing. Otherwise, if the currently observed mutation is still
  * `pending`, its options are updated in place as well.
  *
  * @example
  * ```ts
  * observer.setOptions({
  *   mutationFn: (variables: { title: string }) => addPost(variables),
  *   onSuccess: (data) => console.log(data),
  * })
  * ```
  */
  setOptions(t) {
    var n;
    const r = this.options;
    this.options = v(this, Bt).defaultMutationOptions(t), Jn(this.options, r) || v(this, Bt).getMutationCache().notify({
      type: "observerOptionsUpdated",
      mutation: v(this, Ke),
      observer: this
    }), r != null && r.mutationKey && this.options.mutationKey && Pr(r.mutationKey) !== Pr(this.options.mutationKey) ? this.reset() : ((n = v(this, Ke)) == null ? void 0 : n.state.status) === "pending" && v(this, Ke).setOptions(this.options);
  }
  onSubscribe() {
    this.listeners.size === 1 && v(this, Ke) && (v(this, Ke).addObserver(this), se(this, Mt, Sn).call(this));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || (t = v(this, Ke)) == null || t.removeObserver(this);
  }
  /** @internal */
  onMutationUpdate(t) {
    se(this, Mt, Sn).call(this), se(this, Mt, ra).call(this, t);
  }
  /**
  * Returns the observer's current result, derived from the observed
  * mutation's state (or the default, `idle` state if no mutation has been
  * built yet, e.g. before the first `mutate()` call or after `reset()`).
  */
  getCurrentResult() {
    return v(this, Zt);
  }
  /**
  * Detaches the observer from the mutation it is currently observing (if
  * any) and resets the observed result back to its default, `idle` state.
  *
  * This does not cancel an in-flight mutation; the mutation itself keeps
  * running to completion and its own callbacks still fire, but this
  * observer stops reflecting its state and a subsequent `mutate()` call
  * will build a brand new mutation.
  *
  * @example
  * ```ts
  * observer.reset()
  * ```
  *
  * @see {@link MutationObserver#mutate}
  */
  reset() {
    var t;
    (t = v(this, Ke)) == null || t.removeObserver(this), F(this, Ke, void 0), se(this, Mt, Sn).call(this), se(this, Mt, ra).call(this);
  }
  /**
  * Builds a new `Mutation` in the `MutationCache` using the observer's
  * current options, detaches this observer from any previously observed
  * mutation, attaches it to the new one, and executes it with the given
  * variables.
  *
  * The optional per-call `options` (`onSuccess`/`onError`/`onSettled`) are
  * invoked once the mutation settles, in addition to any callbacks defined
  * on the observer's own options.
  *
  * @example
  * ```ts
  * await observer.mutate(
  *   { title: 'New post' },
  *   { onSuccess: (data) => console.log(data) },
  * )
  * ```
  */
  mutate(t, r) {
    var n;
    return F(this, $t, r), (n = v(this, Ke)) == null || n.removeObserver(this), F(this, Ke, v(this, Bt).getMutationCache().build(v(this, Bt), this.options)), v(this, Ke).addObserver(this), v(this, Ke).execute(t);
  }
}, Bt = new WeakMap(), Zt = new WeakMap(), Ke = new WeakMap(), $t = new WeakMap(), Mt = new WeakSet(), Sn = function() {
  var r;
  const t = ((r = v(this, Ke)) == null ? void 0 : r.state) ?? Po();
  F(this, Zt, {
    ...t,
    isPending: t.status === "pending",
    isSuccess: t.status === "success",
    isError: t.status === "error",
    isIdle: t.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, ra = function(t) {
  He.batch(() => {
    var r, n, s, i, o, d, h, f;
    if (v(this, $t) && this.hasListeners()) {
      const p = v(this, Zt).variables, g = v(this, Zt).context, y = {
        client: v(this, Bt),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((t == null ? void 0 : t.type) === "success") {
        try {
          (n = (r = v(this, $t)).onSuccess) == null || n.call(r, t.data, p, g, y);
        } catch (C) {
          Promise.reject(C);
        }
        try {
          (i = (s = v(this, $t)).onSettled) == null || i.call(s, t.data, null, p, g, y);
        } catch (C) {
          Promise.reject(C);
        }
      } else if ((t == null ? void 0 : t.type) === "error") {
        try {
          (d = (o = v(this, $t)).onError) == null || d.call(o, t.error, p, g, y);
        } catch (C) {
          Promise.reject(C);
        }
        try {
          (f = (h = v(this, $t)).onSettled) == null || f.call(h, void 0, t.error, p, g, y);
        } catch (C) {
          Promise.reject(C);
        }
      }
    }
    this.listeners.forEach((p) => {
      p(v(this, Zt));
    });
  });
}, ho), Ot, fo, Md = (fo = class extends on {
  constructor(t = {}) {
    super();
    V(this, Ot);
    this.config = t, F(this, Ot, /* @__PURE__ */ new Map());
  }
  /**
  * Returns the existing `Query` instance for the given options' `queryKey`/`queryHash`, or
  * builds and adds a new one to the cache if none exists yet. Used by framework adapters and
  * plugins (e.g. broadcast/persistence) that need to get-or-create a `Query` directly, bypassing
  * the reactive `QueryObserver` machinery.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const query = queryCache.build(queryClient, {
  *   queryKey: ['posts'],
  *   queryFn: fetchPosts,
  * })
  * ```
  */
  build(t, r, n) {
    const s = r.queryKey, i = r.queryHash ?? ca(s, r);
    let o = this.get(i);
    return o || (o = new Pd({
      client: t,
      queryKey: s,
      queryHash: i,
      options: t.defaultQueryOptions(r),
      state: n,
      defaultOptions: t.getQueryDefaults(s)
    }), this.add(o)), o;
  }
  /** @internal */
  add(t) {
    v(this, Ot).has(t.queryHash) || (v(this, Ot).set(t.queryHash, t), this.notify({
      type: "added",
      query: t
    }));
  }
  /**
  * Destroys the given `Query` and removes it from the cache, notifying subscribers with a
  * `'removed'` event. A no-op if the query is no longer the one currently stored under its hash
  * (e.g. it was already replaced). Used by plugins (e.g. the broadcast client) that mirror
  * removals across `QueryCache` instances.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  * const query = queryCache.find({ queryKey: ['posts'] })
  *
  * if (query) {
  *   queryCache.remove(query)
  * }
  * ```
  */
  remove(t) {
    const r = v(this, Ot).get(t.queryHash);
    r && (t.destroy(), r === t && v(this, Ot).delete(t.queryHash), this.notify({
      type: "removed",
      query: t
    }));
  }
  /**
  * Removes all queries from the cache.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * queryCache.clear()
  * ```
  */
  clear() {
    He.batch(() => {
      this.getAll().forEach((t) => {
        this.remove(t);
      });
    });
  }
  /**
  * Returns the `Query` instance stored under the given `queryHash`, or `undefined` if none
  * exists. Unlike {@link QueryCache#find}, this looks up by the already-computed hash rather
  * than by `QueryFilters`. Used by plugins (e.g. broadcast/hydration) that already have a hash
  * to look up directly.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  * const queryHash = hashKey(['posts'])
  *
  * const query = queryCache.get(queryHash)
  * ```
  */
  get(t) {
    return v(this, Ot).get(t);
  }
  /**
  * Returns all queries within the cache.
  *
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const queries = queryCache.getAll()
  * ```
  */
  getAll() {
    return [...v(this, Ot).values()];
  }
  /**
  * A slightly more advanced method that can be used to get an existing query instance from the
  * cache. This instance not only contains all the state for the query, but all of the instances,
  * and underlying guts of the query as well. If the query does not exist, `undefined` is
  * returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a query in rare scenarios (e.g. looking at `query.state.dataUpdatedAt` to
  * decide whether a query is fresh enough to be used as an initial value).
  *
  * @see {@link QueryCache#findAll}
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const query = queryCache.find({ queryKey: ['posts'] })
  * ```
  */
  find(t) {
    const r = {
      exact: !0,
      ...t
    };
    return this.getAll().find((n) => ii(r, n));
  }
  /**
  * An even more advanced method that can be used to get existing query instances from the cache
  * that partially match a query key. If no queries match, an empty array is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about queries in rare scenarios.
  *
  * @see {@link QueryCache#find}
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const queries = queryCache.findAll({ queryKey: ['posts'] })
  * ```
  */
  findAll(t = {}) {
    const r = this.getAll();
    return Object.keys(t).length > 0 ? r.filter((n) => ii(t, n)) : r;
  }
  /** @internal */
  notify(t) {
    He.batch(() => {
      this.listeners.forEach((r) => {
        r(t);
      });
    });
  }
  /** @internal */
  onFocus() {
    He.batch(() => {
      this.getAll().forEach((t) => {
        t.onFocus();
      });
    });
  }
  /** @internal */
  onOnline() {
    He.batch(() => {
      this.getAll().forEach((t) => {
        t.onOnline();
      });
    });
  }
}, Ot = new WeakMap(), fo), Oe, er, tr, Kr, Jr, rr, Zr, en, mo, zd = (mo = class {
  constructor(e = {}) {
    V(this, Oe);
    V(this, er);
    V(this, tr);
    V(this, Kr);
    V(this, Jr);
    V(this, rr);
    V(this, Zr);
    V(this, en);
    F(this, Oe, e.queryCache || new Md()), F(this, er, e.mutationCache || new Ad()), F(this, tr, e.defaultOptions || {}), F(this, Kr, /* @__PURE__ */ new Map()), F(this, Jr, /* @__PURE__ */ new Map()), F(this, rr, 0);
  }
  /**
  * Called by a framework adapter's `QueryClientProvider`-equivalent when it mounts, to start
  * listening for focus/online events and resume paused mutations. Ref-counted via an internal
  * mount count, so nested or multiple providers sharing the same `QueryClient` don't tear down
  * the shared listeners until the last one unmounts.
  */
  mount() {
    Vn(this, rr)._++, v(this, rr) === 1 && (F(this, Zr, ha.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), v(this, Oe).onFocus());
    })), F(this, en, ss.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), v(this, Oe).onOnline());
    })));
  }
  /**
  * The inverse of {@link QueryClient#mount} — called by a framework adapter's
  * `QueryClientProvider`-equivalent when it unmounts. Only tears down the focus/online
  * listeners once the mount count returns to `0`.
  */
  unmount() {
    var e, t;
    Vn(this, rr)._--, v(this, rr) === 0 && ((e = v(this, Zr)) == null || e.call(this), F(this, Zr, void 0), (t = v(this, en)) == null || t.call(this), F(this, en, void 0));
  }
  /**
  * Returns the number of queries in the cache that are currently fetching, optionally
  * matching a set of filters. This includes background-fetching, loading new pages, and
  * loading more infinite query results.
  *
  * @example
  * ```ts
  * if (queryClient.isFetching()) {
  *   console.log('At least one query is fetching!')
  * }
  * ```
  */
  isFetching(e) {
    return v(this, Oe).findAll({
      ...e,
      fetchStatus: "fetching"
    }).length;
  }
  /**
  * Returns the number of mutations in the cache that are currently pending, optionally
  * matching a set of filters.
  *
  * @example
  * ```ts
  * if (queryClient.isMutating()) {
  *   console.log('At least one mutation is pending!')
  * }
  * ```
  */
  isMutating(e) {
    return v(this, er).findAll({
      ...e,
      status: "pending"
    }).length;
  }
  /**
  * Imperative (non-reactive) way to retrieve data for a QueryKey.
  * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
  *
  * Hint: Do not use this function inside a component, because it won't receive updates.
  * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
  *
  * @see {@link QueryClient#getQueriesData}
  */
  getQueryData(e) {
    var r;
    const t = this.defaultQueryOptions({ queryKey: e });
    return (r = v(this, Oe).get(t.queryHash)) == null ? void 0 : r.state.data;
  }
  /**
  * @deprecated Use queryClient.query({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
  */
  ensureQueryData(e) {
    const t = this.defaultQueryOptions(e), r = v(this, Oe).build(this, t), n = r.state.data;
    return n === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && r.isStaleByTime(Ee(t.staleTime, r)) && this.prefetchQuery(t), Promise.resolve(n));
  }
  /**
  * Imperative (non-reactive) way to retrieve the cached data of multiple queries at once.
  * Only queries matching the given filters are returned; if none match, an empty array is
  * returned.
  *
  * Because the matched queries can hold data of different shapes (e.g. a broad filter can match
  * queries with unrelated data types), the `TQueryFnData` generic defaults to `unknown` rather
  * than being inferred. Passing a more specific type is a convenience for call sites that know
  * every matched query holds the same shape — it is not checked against the actual cache
  * contents.
  *
  * @see {@link QueryClient#getQueryData}
  * @example
  * ```ts
  * const data = queryClient.getQueriesData({ queryKey: ['posts'] })
  * ```
  */
  getQueriesData(e) {
    return v(this, Oe).findAll(e).map(({ queryKey: t, state: r }) => [t, r.data]);
  }
  /**
  * Synchronous way to immediately update a query's cached data. If the updater (or the value
  * passed) resolves to `undefined`, the cache is left untouched and no query is created;
  * otherwise, if the query does not exist yet, it will be created. To update multiple queries
  * at once by partially matching query keys, use {@link QueryClient#setQueriesData} instead.
  *
  * Updates must be performed immutably: do not mutate `oldData`, or data previously retrieved
  * via {@link QueryClient#getQueryData}, in place.
  *
  * @param queryKey - The query key to set data for.
  * @param updater - Either the new data, or a function that receives the current data (which
  * may be `undefined`) and returns the new data.
  *
  * @example
  * ```ts
  * queryClient.setQueryData(['posts'], newPosts)
  *
  * // Or, using an updater function that receives the current data:
  * queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
  * ```
  */
  setQueryData(e, t, r) {
    var o;
    const n = this.defaultQueryOptions({ queryKey: e }), s = (o = v(this, Oe).get(n.queryHash)) == null ? void 0 : o.state.data, i = fd(t, s);
    if (i !== void 0)
      return v(this, Oe).build(this, n).setData(i, {
        ...r,
        manual: !0
      });
  }
  /**
  * Synchronous way to immediately update the cached data of multiple queries at once, using
  * filters or partial query key matching. Only queries that already exist and match the given
  * filters are updated; no new cache entries are created. Internally this calls
  * {@link QueryClient#setQueryData} for each matching query.
  *
  * @example
  * ```ts
  * queryClient.setQueriesData({ queryKey: ['posts'] }, (oldPosts) =>
  *   oldPosts ? oldPosts.filter((post) => post.id !== deletedId) : oldPosts,
  * )
  * ```
  */
  setQueriesData(e, t, r) {
    return He.batch(() => v(this, Oe).findAll(e).map(({ queryKey: n }) => [n, this.setQueryData(n, t, r)]));
  }
  /**
  * Imperative (non-reactive) way to retrieve an existing query's state. If the query does not
  * exist, `undefined` is returned.
  *
  * @example
  * ```ts
  * const state = queryClient.getQueryState(['posts'])
  * console.log(state?.dataUpdatedAt)
  * ```
  */
  getQueryState(e) {
    var r;
    const t = this.defaultQueryOptions({ queryKey: e });
    return (r = v(this, Oe).get(t.queryHash)) == null ? void 0 : r.state;
  }
  /**
  * Removes queries from the cache that match the given filters. Unlike
  * {@link QueryClient#invalidateQueries} or {@link QueryClient#refetchQueries}, this removes
  * matching queries from the cache instead of refetching them. Without filters, every query in
  * the cache is removed.
  *
  * @example
  * ```ts
  * queryClient.removeQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  removeQueries(e) {
    const t = v(this, Oe);
    He.batch(() => {
      t.findAll(e).forEach((r) => {
        t.remove(r);
      });
    });
  }
  /**
  * Resets queries matching the given filters back to their initial state (e.g. any
  * `initialData`), notifying subscribers rather than removing them. Active queries among the
  * matched set are then refetched, and the returned promise resolves once that refetch settles.
  *
  * @example
  * ```ts
  * await queryClient.resetQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  resetQueries(e, t) {
    const r = v(this, Oe);
    return He.batch(() => {
      const n = r.findAll(e), s = new Set(n);
      return n.forEach((i) => {
        i.reset();
      }), this.refetchQueries({
        type: "active",
        predicate: (i) => s.has(i)
      }, t);
    });
  }
  /**
  * Cancels outgoing fetches for queries matching the given filters. Most useful when performing
  * optimistic updates, since any outgoing refetch that resolves afterwards would otherwise
  * overwrite the optimistic update. By default (`revert: true`), a cancelled query's data is
  * reverted to its state before the outgoing fetch started.
  *
  * The returned promise never rejects, even if individual cancellations fail.
  *
  * @example
  * ```ts
  * await queryClient.cancelQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  cancelQueries(e, t = {}) {
    const r = {
      revert: !0,
      ...t
    }, n = He.batch(() => v(this, Oe).findAll(e).map((s) => s.cancel(r)));
    return Promise.all(n).then(nt).catch(nt);
  }
  /**
  * Marks queries matching the given filters as invalidated. Unlike
  * {@link QueryClient#removeQueries}, invalidated queries stay in the cache.
  *
  * Unless `filters.refetchType` is `'none'`, matching queries are then refetched via
  * {@link QueryClient#refetchQueries}, using `filters.refetchType` if set, otherwise
  * `filters.type`, otherwise `'active'`.
  *
  * @example
  * ```ts
  * await queryClient.invalidateQueries({ queryKey: ['posts'], refetchType: 'active' })
  * ```
  */
  invalidateQueries(e, t = {}) {
    return He.batch(() => (v(this, Oe).findAll(e).forEach((r) => {
      r.invalidate();
    }), (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries({
      ...e,
      type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
    }, t)));
  }
  /**
  * Refetches queries matching the given filters, regardless of whether they are stale. Without
  * filters, every query in the cache is refetched. Queries that are disabled, or static (only
  * have observers with a static `staleTime`), are never refetched.
  *
  * By default (`cancelRefetch: true`), a currently running fetch is cancelled before the new
  * one starts. The returned promise resolves once all matching queries have settled; it does
  * not reject on individual query failures unless `throwOnError` is set.
  *
  * @example
  * ```ts
  * // refetch all active queries partially matching a query key:
  * await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
  * ```
  */
  refetchQueries(e, t = {}) {
    const r = {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }, n = He.batch(() => v(this, Oe).findAll(e).filter((s) => !s.isDisabled() && !s.isStatic()).map((s) => {
      let i = s.fetch(void 0, r);
      return r.throwOnError || (i = i.catch(nt)), s.state.fetchStatus === "paused" ? Promise.resolve() : i;
    }));
    return Promise.all(n).then(nt);
  }
  /**
  * Asynchronous method to fetch and cache a query, resolving with the data or throwing with
  * the error.
  *
  * If the query already exists in the cache and its data is not stale (per the given
  * `staleTime`), the cached data is returned without fetching. Otherwise, the query is fetched
  * and the promise resolves once the fetch settles. If a `select` function is provided, it is
  * applied to the data in both cases (cached or freshly fetched) before it is returned.
  *
  * Unlike a reactive observer, retries are disabled by default here (`retry: false`) unless
  * explicitly configured, since there is no component to catch a thrown error and retry through
  * re-render.
  *
  * The accepted options are `QueryObserverOptions` minus the fields that only make sense for a
  * reactive observer — `enabled`, `refetchInterval`, `refetchIntervalInBackground`,
  * `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchOnMount`, `retryOnMount`,
  * `notifyOnChangeProps`, `throwOnError`, `suspense`, and `placeholderData` are not part of this
  * method's options.
  *
  * This method replaces the deprecated `fetchQuery`, and — combined with
  * `{ staleTime: 'static' }` — the deprecated `ensureQueryData`.
  *
  * @example
  * ```ts
  * try {
  *   const data = await queryClient.query({ queryKey, queryFn, staleTime: 10000 })
  * } catch (error) {
  *   console.log(error)
  * }
  * ```
  */
  async query(e) {
    const t = this.defaultQueryOptions(e);
    t.retry === void 0 && (t.retry = !1);
    const r = v(this, Oe).build(this, t), n = r.isStaleByTime(Ee(t.staleTime, r)) ? await r.fetch(t) : r.state.data, s = t.select;
    return s ? s(n) : n;
  }
  /**
  * @deprecated Use queryClient.query(options) instead. This method will be removed in the next major version.
  */
  fetchQuery(e) {
    const t = this.defaultQueryOptions(e);
    t.retry === void 0 && (t.retry = !1);
    const r = v(this, Oe).build(this, t);
    return r.isStaleByTime(Ee(t.staleTime, r)) ? r.fetch(t) : Promise.resolve(r.state.data);
  }
  /**
  * @deprecated Use queryClient.query(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
  */
  prefetchQuery(e) {
    return this.fetchQuery(e).then(nt).catch(nt);
  }
  /**
  * Asynchronous method to fetch and cache an infinite query, resolving with an
  * {@link InfiniteData} object or throwing with the error.
  *
  * Behaves like {@link QueryClient#query}, accepting the same options (minus
  * `initialPageParam`), plus the required `initialPageParam`, and an optional `pages` /
  * `getNextPageParam` pair used to refetch a fixed number of pages from the start.
  *
  * This method replaces the deprecated `fetchInfiniteQuery`, and — combined with
  * `{ staleTime: 'static' }` — the deprecated `ensureInfiniteQueryData`.
  *
  * @example
  * ```ts
  * try {
  *   const data = await queryClient.infiniteQuery({ queryKey, queryFn, initialPageParam: 0 })
  *   console.log(data.pages)
  * } catch (error) {
  *   console.log(error)
  * }
  * ```
  */
  infiniteQuery(e) {
    return e._type = "infinite", this.query(e);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery(options) instead. This method will be removed in the next major version.
  */
  fetchInfiniteQuery(e) {
    return e._type = "infinite", this.fetchQuery(e);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
  */
  prefetchInfiniteQuery(e) {
    return this.fetchInfiniteQuery(e).then(nt).catch(nt);
  }
  /**
  * @deprecated Use queryClient.infiniteQuery({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
  */
  ensureInfiniteQueryData(e) {
    return e._type = "infinite", this.ensureQueryData(e);
  }
  /**
  * Resumes mutations that were paused because there was no network connection. Does nothing
  * (resolving immediately) if the client is currently offline.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * await queryClient.resumePausedMutations()
  * ```
  */
  resumePausedMutations() {
    return ss.isOnline() ? v(this, er).resumePausedMutations() : Promise.resolve();
  }
  /**
  * Returns the query cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const queryCache = queryClient.getQueryCache()
  * const queries = queryCache.findAll({ queryKey: ['posts'] })
  * ```
  */
  getQueryCache() {
    return v(this, Oe);
  }
  /**
  * Returns the mutation cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const mutationCache = queryClient.getMutationCache()
  * const mutations = mutationCache.findAll({ status: 'pending' })
  * ```
  */
  getMutationCache() {
    return v(this, er);
  }
  /**
  * Returns the default options that were set when creating the client, or via
  * {@link QueryClient#setDefaultOptions}.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const defaultOptions = queryClient.getDefaultOptions()
  * ```
  */
  getDefaultOptions() {
    return v(this, tr);
  }
  /**
  * Dynamically sets the default options for this client, overwriting any previously defined
  * default options.
  *
  * @see {@link QueryClient#getDefaultOptions}
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * queryClient.setDefaultOptions({
  *   queries: {
  *     staleTime: Infinity,
  *   },
  * })
  * ```
  */
  setDefaultOptions(e) {
    F(this, tr, e);
  }
  /**
  * Sets default options for queries whose query key partially matches the given `queryKey`.
  *
  * If several registered query defaults match a given query key, they are merged together in
  * registration order by {@link QueryClient#getQueryDefaults}, so register defaults from the
  * most generic key to the least generic one — more specific defaults should be registered
  * after more generic ones so they take precedence.
  *
  * @example
  * ```ts
  * queryClient.setQueryDefaults(['posts'], { queryFn: fetchPosts })
  *
  * await queryClient.query({ queryKey: ['posts'] })
  * ```
  */
  setQueryDefaults(e, t) {
    v(this, Kr).set(Pr(e), {
      queryKey: e,
      defaultOptions: t
    });
  }
  /**
  * Returns the default options registered for queries whose query key partially matches the
  * given `queryKey`, via {@link QueryClient#setQueryDefaults}. If multiple registered defaults
  * match, they are merged together in registration order.
  *
  * @example
  * ```ts
  * const defaultOptions = queryClient.getQueryDefaults(['posts'])
  * ```
  */
  getQueryDefaults(e) {
    const t = [...v(this, Kr).values()], r = {};
    return t.forEach((n) => {
      tn(e, n.queryKey) && Object.assign(r, n.defaultOptions);
    }), r;
  }
  /**
  * Sets default options for mutations whose mutation key partially matches the given
  * `mutationKey`. As with {@link QueryClient#setQueryDefaults}, the order of registration
  * matters when several registered defaults match the same mutation key.
  *
  * @see {@link QueryClient#getMutationDefaults}
  * @example
  * ```ts
  * queryClient.setMutationDefaults(['addPost'], { mutationFn: addPost })
  * ```
  */
  setMutationDefaults(e, t) {
    v(this, Jr).set(Pr(e), {
      mutationKey: e,
      defaultOptions: t
    });
  }
  /**
  * Returns the default options registered for mutations whose mutation key partially matches
  * the given `mutationKey`, via {@link QueryClient#setMutationDefaults}. If multiple registered
  * defaults match, they are merged together in registration order.
  *
  * @example
  * ```ts
  * const defaultOptions = queryClient.getMutationDefaults(['addPost'])
  * ```
  */
  getMutationDefaults(e) {
    const t = [...v(this, Jr).values()], r = {};
    return t.forEach((n) => {
      tn(e, n.mutationKey) && Object.assign(r, n.defaultOptions);
    }), r;
  }
  /**
  * Called by framework adapters (e.g. inside `useQuery`) to resolve the options passed by the
  * caller into their final, defaulted form: merging `queryClient.setQueryDefaults` for the
  * given `queryKey`, then the client's own `defaultOptions.queries`, then the caller's options
  * on top. A no-op if the options are already defaulted (`_defaulted: true`).
  */
  defaultQueryOptions(e) {
    if (e._defaulted) return e;
    const t = {
      ...v(this, tr).queries,
      ...this.getQueryDefaults(e.queryKey),
      ...e,
      _defaulted: !0
    };
    return t.queryHash || (t.queryHash = ca(t.queryKey, t)), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === ns && (t.enabled = !1), t;
  }
  /**
  * The mutation counterpart of {@link QueryClient#defaultQueryOptions}. Called by framework
  * adapters (e.g. inside `useMutation`) to merge `queryClient.setMutationDefaults` for the
  * given `mutationKey`, then the client's `defaultOptions.mutations`, then the caller's options
  * on top. A no-op if the options are already defaulted (`_defaulted: true`).
  */
  defaultMutationOptions(e) {
    return e != null && e._defaulted ? e : {
      ...v(this, tr).mutations,
      ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
      ...e,
      _defaulted: !0
    };
  }
  /**
  * Clears both the query cache and the mutation cache this client is connected to.
  *
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * queryClient.clear()
  * ```
  */
  clear() {
    v(this, Oe).clear(), v(this, er).clear();
  }
}, Oe = new WeakMap(), er = new WeakMap(), tr = new WeakMap(), Kr = new WeakMap(), Jr = new WeakMap(), rr = new WeakMap(), Zr = new WeakMap(), en = new WeakMap(), mo);
const Eo = Ye.createContext(!1), Ld = () => Ye.useContext(Eo);
Eo.Provider;
function jd() {
  let e = !1;
  return {
    /**
    * Clears the reset state, so queries know not to try again until the boundary is reset again.
    */
    clearReset: () => {
      e = !1;
    },
    /**
    * Resets any query errors within the boundary, so queries know they can try again.
    */
    reset: () => {
      e = !0;
    },
    /**
    * Returns whether the boundary has been reset and not yet cleared.
    */
    isReset: () => e
  };
}
const Fd = Ye.createContext(jd()), Id = () => Ye.useContext(Fd), Ud = (e, t, r) => {
  const n = r != null && r.state.error && typeof e.throwOnError == "function" ? ua(e.throwOnError, [r.state.error, r]) : e.throwOnError;
  (e.suspense || n) && (t.isReset() || (e.retryOnMount = !1));
}, qd = (e) => {
  Ye.useEffect(() => {
    e.clearReset();
  }, [e]);
}, Hd = ({ result: e, errorResetBoundary: t, throwOnError: r, query: n, suspense: s }) => e.isError && !t.isReset() && !e.isFetching && n && (s && e.data === void 0 || ua(r, [e.error, n])), Bd = (e) => {
  if (e.suspense) {
    const r = (s) => s === "static" ? s : Math.max(s ?? 1e3, 1e3), n = e.staleTime;
    e.staleTime = typeof n == "function" ? (...s) => r(n(...s)) : r(n), typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3));
  }
}, $d = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending, Wd = (e, t, r) => t.fetchOptimistic(e).catch(() => {
  r.clearReset();
});
function Oo(e, t, r) {
  if (process.env.NODE_ENV !== "production" && (typeof e != "object" || Array.isArray(e)))
    throw new Error('Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object');
  const n = Ld(), s = Id(), i = ir(), o = i.defaultQueryOptions(e), d = i.getQueryCache().get(o.queryHash);
  process.env.NODE_ENV !== "production" && (o.queryFn || console.error(`[${o.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`));
  const h = e.subscribed !== !1;
  o._optimisticResults = n ? "isRestoring" : h ? "optimistic" : void 0, Bd(o), Ud(o, s, d), qd(s);
  const [f] = Ye.useState(() => new t(i, o)), p = f.getOptimisticResult(o), g = !n && h;
  if (Ye.useSyncExternalStore(Ye.useCallback((y) => {
    const C = g ? f.subscribe(He.batchCalls(y)) : nt;
    return f.updateResult(), C;
  }, [f, g]), () => f.getCurrentResult(), () => f.getCurrentResult()), Ye.useEffect(() => {
    f.setOptions(o);
  }, [o, f]), $d(o, p)) throw Wd(o, f, s);
  if (Hd({
    result: p,
    errorResetBoundary: s,
    throwOnError: o.throwOnError,
    query: d,
    suspense: o.suspense
  })) throw p.error;
  return o.notifyOnChangeProps ? p : f.trackResult(p);
}
function Ro(e, t) {
  return Oo(e, To);
}
function Vd(e, t) {
  const r = ir(), [n] = Ye.useState(() => new Dd(r, e));
  Ye.useEffect(() => {
    n.setOptions(e);
  }, [n, e]);
  const s = Ye.useSyncExternalStore(Ye.useCallback((o) => n.subscribe(He.batchCalls(o)), [n]), () => n.getCurrentResult(), () => n.getCurrentResult()), i = Ye.useCallback((...o) => {
    n.mutate(o[0], o[1]).catch(nt);
  }, [n]);
  if (s.error && ua(n.options.throwOnError, [s.error])) throw s.error;
  return {
    ...s,
    mutate: i,
    mutateAsync: s.mutate
  };
}
function Qd(e, t) {
  return Oo(e, Od);
}
function Ao(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Yd } = Object.prototype, { getPrototypeOf: sr } = Object, { iterator: Dn, toStringTag: Do } = Symbol, Nn = (({ hasOwnProperty: e }) => (t, r) => e.call(t, r))(Object.prototype), Mo = (e) => typeof e == "string" && (e === "__proto__" || e === "constructor" || e === "prototype"), zo = (e, t, r) => e === Object.prototype || !r && t === null, Gd = (e) => {
  if (!Object.isExtensible(e))
    return !1;
  const t = Object.getOwnPropertyNames(e);
  return Object.getOwnPropertySymbols && t.push(...Object.getOwnPropertySymbols(e)), t.every((r) => {
    if (Mo(r))
      return !1;
    const n = Object.getOwnPropertyDescriptor(e, r);
    return !!n && n.configurable && n.writable === !0;
  });
}, Cn = (e, t) => {
  let r = e;
  const n = [];
  for (; r != null; ) {
    if (n.indexOf(r) !== -1)
      return !1;
    n.push(r);
    const s = sr(r);
    if (zo(r, s, r === e))
      return !1;
    if (Nn(r, t))
      return !0;
    r = s;
  }
  return !1;
}, Xd = (e, t) => e != null && Cn(e, t) ? e[t] : void 0, Kd = (e) => {
  if (e == null || typeof e != "object" && typeof e != "function")
    return e;
  const t = sr(e);
  if (t === null && Gd(e))
    return e;
  const r = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), s = [];
  let i = e;
  for (; i != null && s.indexOf(i) === -1; ) {
    s.push(i);
    const o = i === e ? t : sr(i);
    if (zo(i, o, i === e))
      break;
    const d = Object.getOwnPropertyNames(i);
    Object.getOwnPropertySymbols && d.push(...Object.getOwnPropertySymbols(i));
    for (const h of d)
      Mo(h) || Nn(n, h) || (r[h] = e[h], n[h] = !0);
    i = o;
  }
  return r;
}, ma = /* @__PURE__ */ ((e) => (t) => {
  const r = Yd.call(t);
  return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), wt = (e) => (e = e.toLowerCase(), (t) => ma(t) === e), ms = (e) => (t) => typeof t === e, { isArray: Er } = Array, Or = ms("undefined");
function ln(e) {
  return e !== null && !Or(e) && e.constructor !== null && !Or(e.constructor) && it(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Lo = wt("ArrayBuffer");
function Jd(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Lo(e.buffer), t;
}
const Zd = ms("string"), it = ms("function"), jo = ms("number"), cn = (e) => e !== null && typeof e == "object", eh = (e) => e === !0 || e === !1, Zn = (e) => {
  if (!cn(e))
    return !1;
  const t = sr(e);
  return (t === null || t === Object.prototype || sr(t) === null) && // Treat safe own/inherited Symbol.toStringTag or Symbol.iterator members as
  // evidence the value is tagged/iterable, while ignoring members reachable
  // only through shared or terminal prototype boundaries.
  !Cn(e, Do) && !Cn(e, Dn);
}, th = (e) => {
  if (!cn(e) || ln(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, rh = wt("Date"), nh = wt("File"), sh = (e) => !!(e && typeof e.uri < "u"), ah = (e) => e && typeof e.getParts < "u", ih = wt("Blob"), oh = wt("FileList"), lh = wt("Set"), ch = (e) => cn(e) && it(e.pipe);
function uh() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const mi = uh(), pi = typeof mi.FormData < "u" ? mi.FormData : void 0, dh = (e) => {
  if (!e) return !1;
  if (pi && e instanceof pi) return !0;
  const t = sr(e);
  if (!t || t === Object.prototype || !it(e.append)) return !1;
  const r = ma(e);
  return r === "formdata" || // detect form-data instance
  r === "object" && it(e.toString) && e.toString() === "[object FormData]";
}, hh = wt("URLSearchParams"), [fh, mh, ph, gh] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(wt), bh = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Mn(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let n, s;
  if (typeof e != "object" && (e = [e]), Er(e))
    for (n = 0, s = e.length; n < s; n++)
      t.call(null, e[n], n, e);
  else {
    if (ln(e))
      return;
    const i = r ? Object.getOwnPropertyNames(e) : Object.keys(e), o = i.length;
    let d;
    for (n = 0; n < o; n++)
      d = i[n], t.call(null, e[d], d, e);
  }
}
function Fo(e, t) {
  if (ln(e))
    return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length, s;
  for (; n-- > 0; )
    if (s = r[n], t === s.toLowerCase())
      return s;
  return null;
}
const gr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Io = (e) => !Or(e) && e !== gr;
function na(...e) {
  const { caseless: t, skipUndefined: r } = Io(this) && this || {}, n = {}, s = (i, o) => {
    if (o === "__proto__" || o === "constructor" || o === "prototype")
      return;
    const d = t && typeof o == "string" && Fo(n, o) || o, h = Nn(n, d) ? n[d] : void 0;
    Zn(h) && Zn(i) ? n[d] = na(h, i) : Zn(i) ? n[d] = na({}, i) : Er(i) ? n[d] = i.slice() : (!r || !Or(i)) && (n[d] = i);
  };
  for (let i = 0, o = e.length; i < o; i++) {
    const d = e[i];
    if (!d || ln(d) || (Mn(d, s), typeof d != "object" || Er(d)))
      continue;
    const h = Object.getOwnPropertySymbols(d);
    for (let f = 0; f < h.length; f++) {
      const p = h[f];
      Eh.call(d, p) && s(d[p], p);
    }
  }
  return n;
}
const yh = (e, t, r, { allOwnKeys: n } = {}) => (Mn(
  t,
  (s, i) => {
    r && it(s) ? Object.defineProperty(e, i, {
      // Null-proto descriptor so a polluted Object.prototype.get cannot
      // hijack defineProperty's accessor-vs-data resolution.
      __proto__: null,
      value: Ao(s, r),
      writable: !0,
      enumerable: !0,
      configurable: !0
    }) : Object.defineProperty(e, i, {
      __proto__: null,
      value: s,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  },
  { allOwnKeys: n }
), e), xh = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), vh = (e, t, r, n) => {
  e.prototype = Object.create(t.prototype, n), Object.defineProperty(e.prototype, "constructor", {
    __proto__: null,
    value: e,
    writable: !0,
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(e, "super", {
    __proto__: null,
    value: t.prototype
  }), r && Object.assign(e.prototype, r);
}, wh = (e, t, r, n) => {
  let s, i, o;
  const d = {};
  if (t = t || {}, e == null) return t;
  do {
    for (s = Object.getOwnPropertyNames(e), i = s.length; i-- > 0; )
      o = s[i], (!n || n(o, e, t)) && !d[o] && (t[o] = e[o], d[o] = !0);
    e = r !== !1 && sr(e);
  } while (e && (!r || r(e, t)) && e !== Object.prototype);
  return t;
}, kh = (e, t, r) => {
  e = String(e), (r === void 0 || r > e.length) && (r = e.length), r -= t.length;
  const n = e.indexOf(t, r);
  return n !== -1 && n === r;
}, Sh = (e) => {
  if (!e) return null;
  if (Er(e)) return e;
  let t = e.length;
  if (!jo(t)) return null;
  const r = new Array(t);
  for (; t-- > 0; )
    r[t] = e[t];
  return r;
}, Nh = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && sr(Uint8Array)), Ch = (e, t) => {
  const n = (e && e[Dn]).call(e);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const i = s.value;
    t.call(e, i[0], i[1]);
  }
}, _h = (e, t) => {
  let r;
  const n = [];
  for (; (r = e.exec(t)) !== null; )
    n.push(r);
  return n;
}, Th = wt("HTMLFormElement"), Ph = (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(r, n, s) {
  return n.toUpperCase() + s;
}), { propertyIsEnumerable: Eh } = Object.prototype, Oh = wt("RegExp"), Uo = (e, t) => {
  const r = Object.getOwnPropertyDescriptors(e), n = {};
  Mn(r, (s, i) => {
    let o;
    (o = t(s, i, e)) !== !1 && (n[i] = o || s);
  }), Object.defineProperties(e, n);
}, Rh = (e) => {
  Uo(e, (t, r) => {
    if (it(e) && ["arguments", "caller", "callee"].includes(r))
      return !1;
    const n = e[r];
    if (it(n)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, Ah = (e, t) => {
  const r = {}, n = (s) => {
    s.forEach((i) => {
      r[i] = !0;
    });
  };
  return Er(e) ? n(e) : n(String(e).split(t)), r;
}, Dh = () => {
}, Mh = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function zh(e) {
  return !!(e && it(e.append) && e[Do] === "FormData" && e[Dn]);
}
const Lh = (e) => {
  const t = /* @__PURE__ */ new WeakSet(), r = (n) => {
    if (cn(n)) {
      if (t.has(n))
        return;
      if (ln(n))
        return n;
      if (!("toJSON" in n)) {
        t.add(n);
        let s;
        if (lh(n)) {
          s = [];
          for (const i of n) {
            const o = r(i);
            !Or(o) && s.push(o);
          }
        } else
          s = Er(n) ? [] : {}, Mn(n, (i, o) => {
            const d = r(i);
            !Or(d) && (s[o] = d);
          });
        return t.delete(n), s;
      }
    }
    return n;
  };
  return r(e);
}, jh = wt("AsyncFunction"), Fh = (e) => e && (cn(e) || it(e)) && it(e.then) && it(e.catch), qo = ((e, t) => e ? setImmediate : t ? ((r, n) => (gr.addEventListener(
  "message",
  ({ source: s, data: i }) => {
    s === gr && i === r && n.length && n.shift()();
  },
  !1
), (s) => {
  n.push(s), gr.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(typeof setImmediate == "function", it(gr.postMessage)), Ih = typeof queueMicrotask < "u" ? queueMicrotask.bind(gr) : typeof process < "u" && process.nextTick || qo, Ho = (e) => e != null && it(e[Dn]), Uh = (e) => e != null && Cn(e, Dn) && Ho(e), S = {
  isArray: Er,
  isArrayBuffer: Lo,
  isBuffer: ln,
  isFormData: dh,
  isArrayBufferView: Jd,
  isString: Zd,
  isNumber: jo,
  isBoolean: eh,
  isObject: cn,
  isPlainObject: Zn,
  isEmptyObject: th,
  isReadableStream: fh,
  isRequest: mh,
  isResponse: ph,
  isHeaders: gh,
  isUndefined: Or,
  isDate: rh,
  isFile: nh,
  isReactNativeBlob: sh,
  isReactNative: ah,
  isBlob: ih,
  isRegExp: Oh,
  isFunction: it,
  isStream: ch,
  isURLSearchParams: hh,
  isTypedArray: Nh,
  isFileList: oh,
  forEach: Mn,
  merge: na,
  extend: yh,
  trim: bh,
  stripBOM: xh,
  inherits: vh,
  toFlatObject: wh,
  kindOf: ma,
  kindOfTest: wt,
  endsWith: kh,
  toArray: Sh,
  forEachEntry: Ch,
  matchAll: _h,
  isHTMLForm: Th,
  hasOwnProperty: Nn,
  hasOwnProp: Nn,
  // an alias to avoid ESLint no-prototype-builtins detection
  hasOwnInPrototypeChain: Cn,
  getSafeProp: Xd,
  toSafeFlatObject: Kd,
  reduceDescriptors: Uo,
  freezeMethods: Rh,
  toObjectSet: Ah,
  toCamelCase: Ph,
  noop: Dh,
  toFiniteNumber: Mh,
  findKey: Fo,
  global: gr,
  isContextDefined: Io,
  isSpecCompliantForm: zh,
  toJSONObject: Lh,
  isAsyncFn: jh,
  isThenable: Fh,
  setImmediate: qo,
  asap: Ih,
  isIterable: Ho,
  isSafeIterable: Uh
}, qh = S.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Hh = (e) => {
  const t = {};
  let r, n, s;
  return e && e.split(`
`).forEach(function(o) {
    s = o.indexOf(":"), r = o.substring(0, s).trim().toLowerCase(), n = o.substring(s + 1).trim();
    const d = S.hasOwnProp(t, r);
    !r || d && S.hasOwnProp(qh, r) || (r === "set-cookie" ? d ? t[r].push(n) : t[r] = [n] : t[r] = d ? t[r] + ", " + n : n);
  }), t;
};
function Bh(e) {
  let t = 0, r = e.length;
  for (; t < r; ) {
    const n = e.charCodeAt(t);
    if (n !== 9 && n !== 32)
      break;
    t += 1;
  }
  for (; r > t; ) {
    const n = e.charCodeAt(r - 1);
    if (n !== 9 && n !== 32)
      break;
    r -= 1;
  }
  return t === 0 && r === e.length ? e : e.slice(t, r);
}
const $h = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), Wh = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function pa(e, t) {
  return S.isArray(e) ? e.map((r) => pa(r, t)) : Bh(String(e).replace(t, ""));
}
const Vh = (e) => pa(e, $h), Qh = (e) => pa(e, Wh);
function Bo(e) {
  const t = /* @__PURE__ */ Object.create(null);
  return S.forEach(e.toJSON(), (r, n) => {
    t[n] = Qh(r);
  }), t;
}
const gi = Symbol("internals");
function bn(e) {
  return e && String(e).trim().toLowerCase();
}
function es(e) {
  return e === !1 || e == null ? e : S.isArray(e) ? e.map(es) : Vh(String(e));
}
function Yh(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(e); )
    t[n[1]] = n[2];
  return t;
}
const Gh = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function Os(e) {
  let t = 0, r = e.length;
  for (; t < r; ) {
    const n = e.charCodeAt(t);
    if (n !== 9 && n !== 32)
      break;
    t += 1;
  }
  for (; r > t; ) {
    const n = e.charCodeAt(r - 1);
    if (n !== 9 && n !== 32)
      break;
    r -= 1;
  }
  return t === 0 && r === e.length ? e : e.slice(t, r);
}
function Xh(e) {
  const t = e.length - 1;
  if (t < 1 || e.charCodeAt(0) !== 34 || e.charCodeAt(t) !== 34)
    return e;
  let r = "";
  for (let n = 1; n < t; n++) {
    const s = e.charCodeAt(n);
    if (s === 34 || s === 92 && (n += 1, n >= t))
      return e;
    r += e[n];
  }
  return r;
}
function Kh(e) {
  const t = /* @__PURE__ */ Object.create(null), r = String(e);
  let n = 0, s = !1, i = !1;
  function o(d) {
    const h = Os(r.slice(n, d)), f = h.indexOf("=");
    if (f < 1)
      return;
    const p = Os(h.slice(0, f));
    if (!Gh.test(p))
      return;
    const g = p.toLowerCase();
    if (g === "__proto__" || g === "constructor" || g === "prototype")
      return;
    const y = Os(h.slice(f + 1));
    t[g] = Xh(y);
  }
  for (let d = 0; d < r.length; d++) {
    const h = r.charCodeAt(d);
    s ? i ? i = !1 : h === 92 ? i = !0 : h === 34 && (s = !1) : h === 34 ? s = !0 : (h === 44 || h === 59) && (o(d), n = d + 1);
  }
  return o(r.length), t;
}
const Jh = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Rs(e, t, r, n, s) {
  if (S.isFunction(n))
    return n.call(this, t, r);
  if (s && (t = r), !!S.isString(t)) {
    if (S.isString(n))
      return t.indexOf(n) !== -1;
    if (S.isRegExp(n))
      return n.test(t);
  }
}
function Zh(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function ef(e, t) {
  const r = S.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: function(s, i, o) {
        return this[n].call(this, t, s, i, o);
      },
      configurable: !0
    });
  });
}
let Ze = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const s = this;
    function i(d, h, f) {
      const p = bn(h);
      if (!p)
        return;
      const g = S.findKey(s, p);
      (!g || s[g] === void 0 || f === !0 || f === void 0 && s[g] !== !1) && (s[g || h] = es(d));
    }
    const o = (d, h) => S.forEach(d, (f, p) => i(f, p, h));
    if (S.isPlainObject(t) || t instanceof this.constructor)
      o(t, r);
    else if (S.isString(t) && (t = t.trim()) && !Jh(t))
      o(Hh(t), r);
    else if (S.isObject(t) && S.isSafeIterable(t)) {
      let d = /* @__PURE__ */ Object.create(null), h, f;
      for (const p of t) {
        if (!S.isArray(p))
          throw new TypeError("Object iterator must return a key-value pair");
        f = p[0], S.hasOwnProp(d, f) ? (h = d[f], d[f] = S.isArray(h) ? [...h, p[1]] : [h, p[1]]) : d[f] = p[1];
      }
      o(d, r);
    } else
      t != null && i(r, t, n);
    return this;
  }
  get(t, r) {
    if (t = bn(t), t) {
      const n = S.findKey(this, t);
      if (n) {
        const s = this[n];
        if (!r)
          return s;
        if (r === !0)
          return Yh(s);
        if (S.isFunction(r))
          return r.call(this, s, n);
        if (S.isRegExp(r))
          return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (t = bn(t), t) {
      const n = S.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || Rs(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let s = !1;
    function i(o) {
      if (o = bn(o), o) {
        const d = S.findKey(n, o);
        d && (!r || Rs(n, n[d], d, r)) && (delete n[d], s = !0);
      }
    }
    return S.isArray(t) ? t.forEach(i) : i(t), s;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length, s = !1;
    for (; n--; ) {
      const i = r[n];
      (!t || Rs(this, this[i], i, t, !0)) && (delete this[i], s = !0);
    }
    return s;
  }
  normalize(t) {
    const r = this, n = {};
    return S.forEach(this, (s, i) => {
      const o = S.findKey(n, i);
      if (o) {
        r[o] = es(s), delete r[i];
        return;
      }
      const d = t ? Zh(i) : String(i).trim();
      d !== i && delete r[i], r[d] = es(s), n[d] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return S.forEach(this, (n, s) => {
      n != null && n !== !1 && (r[s] = t && S.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    const t = this.get("set-cookie");
    return S.isArray(t) ? t : t == null || t === !1 ? [] : [t];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static parseParameters(t) {
    return Kh(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((s) => n.set(s)), n;
  }
  static accessor(t) {
    const n = (this[gi] = this[gi] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function i(o) {
      const d = bn(o);
      n[d] || (ef(s, o), n[d] = !0);
    }
    return S.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
Ze.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
S.reduceDescriptors(Ze.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    }
  };
});
S.freezeMethods(Ze);
const as = "[REDACTED ****]";
function tf(e) {
  if (S.hasOwnProp(e, "toJSON"))
    return !0;
  let t = Object.getPrototypeOf(e);
  for (; t && t !== Object.prototype; ) {
    if (S.hasOwnProp(t, "toJSON"))
      return !0;
    t = Object.getPrototypeOf(t);
  }
  return !1;
}
function rf(e, t) {
  const r = new Set(t.map((i) => String(i).toLowerCase())), n = [], s = (i) => {
    if (i === null || typeof i != "object" || S.isBuffer(i)) return i;
    if (n.indexOf(i) !== -1) return;
    i instanceof Ze && (i = i.toJSON()), n.push(i);
    let o;
    if (S.isArray(i))
      o = [], i.forEach((d, h) => {
        const f = s(d);
        S.isUndefined(f) || (o[h] = f);
      });
    else {
      if (!S.isPlainObject(i) && tf(i))
        return n.pop(), i;
      o = /* @__PURE__ */ Object.create(null);
      for (const [d, h] of Object.entries(i)) {
        const f = r.has(d.toLowerCase()) ? as : s(h);
        S.isUndefined(f) || (o[d] = f);
      }
    }
    return n.pop(), o;
  };
  return s(e);
}
function bi(e) {
  try {
    return String(e);
  } catch {
    return "";
  }
}
function nf(e) {
  return e.errors.map((r) => {
    try {
      return r && r.message ? bi(r.message) : bi(r);
    } catch {
      return "";
    }
  }).filter(Boolean).join("; ") || e.name || "AggregateError";
}
let I = class $o extends Error {
  static from(t, r, n, s, i, o) {
    let d = t.message;
    !d && S.isArray(t.errors) && t.errors.length && (d = nf(t));
    const h = new $o(d, r || t.code, n, s, i);
    return Object.defineProperty(h, "cause", {
      __proto__: null,
      value: t,
      writable: !0,
      enumerable: !1,
      configurable: !0
    }), h.name = t.name, t.status != null && h.status == null && (h.status = t.status), o && Object.assign(h, o), h;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(t, r, n, s, i) {
    super(t), Object.defineProperty(this, "message", {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: t,
      enumerable: !0,
      writable: !0,
      configurable: !0
    }), this.name = "AxiosError", this.isAxiosError = !0, r && (this.code = r), n && (this.config = n), s && (this.request = s), i && (this.response = i, this.status = i.status);
  }
  toJSON() {
    const t = this.config, r = t && S.hasOwnProp(t, "redact") ? t.redact : void 0, n = S.isArray(r) && r.length > 0 ? rf(t, r) : S.toJSONObject(t);
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: n,
      code: this.code,
      status: this.status
    };
  }
};
I.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
I.ERR_BAD_OPTION = "ERR_BAD_OPTION";
I.ECONNABORTED = "ECONNABORTED";
I.ETIMEDOUT = "ETIMEDOUT";
I.ECONNREFUSED = "ECONNREFUSED";
I.ERR_NETWORK = "ERR_NETWORK";
I.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
I.ERR_DEPRECATED = "ERR_DEPRECATED";
I.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
I.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
I.ERR_CANCELED = "ERR_CANCELED";
I.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
I.ERR_INVALID_URL = "ERR_INVALID_URL";
I.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const sf = null, Wo = 100;
function sa(e) {
  return S.isPlainObject(e) || S.isArray(e);
}
function Vo(e) {
  return S.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function As(e, t, r) {
  return e ? e.concat(t).map(function(s, i) {
    return s = Vo(s), !r && i ? "[" + s + "]" : s;
  }).join(r ? "." : "") : t;
}
function af(e) {
  return S.isArray(e) && !e.some(sa);
}
const of = S.toFlatObject(S, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ps(e, t, r) {
  if (!S.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData();
  const n = (w, k) => {
    const _ = S.getSafeProp(r, w);
    return S.isUndefined(_) ? k : _;
  }, s = n("metaTokens", !0), i = n("visitor") || P, o = n("dots", !1), d = n("indexes", !1), h = n("Blob") || typeof Blob < "u" && Blob, f = n("maxDepth", Wo), p = h && S.isSpecCompliantForm(t), g = [];
  if (!S.isFunction(i))
    throw new TypeError("visitor must be a function");
  function y(w) {
    if (w === null) return "";
    if (S.isDate(w))
      return w.toISOString();
    if (S.isBoolean(w))
      return w.toString();
    if (!p && S.isBlob(w))
      throw new I("Blob is not supported. Use a Buffer instead.");
    if (S.isArrayBuffer(w) || S.isTypedArray(w)) {
      if (p && typeof h == "function")
        return new h([w]);
      throw new I(
        "Blob is not supported. Use a Buffer instead.",
        I.ERR_NOT_SUPPORT
      );
    }
    return w;
  }
  function C(w) {
    if (w > f)
      throw new I(
        "Object is too deeply nested (" + w + " levels). Max depth: " + f,
        I.ERR_FORM_DATA_DEPTH_EXCEEDED
      );
  }
  function T(w, k) {
    if (f === 1 / 0)
      return JSON.stringify(w);
    const _ = [];
    return JSON.stringify(w, function(z, D) {
      if (!S.isObject(D))
        return D;
      for (; _.length && _[_.length - 1] !== this; )
        _.pop();
      return _.push(D), C(k + _.length - 1), D;
    });
  }
  function P(w, k, _) {
    let E = w;
    if (S.isReactNative(t) && S.isReactNativeBlob(w))
      return t.append(As(_, k, o), y(w)), !1;
    if (w && !_ && typeof w == "object") {
      if (S.endsWith(k, "{}"))
        k = s ? k : k.slice(0, -2), w = T(w, 1);
      else if (S.isArray(w) && af(w) || (S.isFileList(w) || S.endsWith(k, "[]")) && (E = S.toArray(w)))
        return k = Vo(k), E.forEach(function(D, O) {
          !(S.isUndefined(D) || D === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            d === !0 ? As([k], O, o) : d === null ? k : k + "[]",
            y(D)
          );
        }), !1;
    }
    return sa(w) ? !0 : (t.append(As(_, k, o), y(w)), !1);
  }
  const A = Object.assign(of, {
    defaultVisitor: P,
    convertValue: y,
    isVisitable: sa
  });
  function N(w, k, _ = 0) {
    if (!S.isUndefined(w)) {
      if (C(_), g.indexOf(w) !== -1)
        throw new Error("Circular reference detected in " + k.join("."));
      g.push(w), S.forEach(w, function(z, D) {
        (!(S.isUndefined(z) || z === null) && i.call(t, z, S.isString(D) ? D.trim() : D, k, A)) === !0 && N(z, k ? k.concat(D) : [D], _ + 1);
      }), g.pop();
    }
  }
  if (!S.isObject(e))
    throw new TypeError("data must be an object");
  return N(e), t;
}
function yi(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20/g, function(n) {
    return t[n];
  });
}
function ga(e, t) {
  this._pairs = [], e && ps(e, this, t);
}
const Qo = ga.prototype;
Qo.append = function(t, r) {
  this._pairs.push([t, r]);
};
Qo.toString = function(t) {
  const r = t ? (n) => t.call(this, n, yi) : yi;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function lf(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Yo(e, t, r) {
  if (!t)
    return e;
  e = e || "";
  const n = S.isFunction(r) ? {
    serialize: r
  } : r, s = S.getSafeProp(n, "encode") || lf, i = S.getSafeProp(n, "serialize");
  let o;
  if (i ? o = i(t, n) : o = S.isURLSearchParams(t) ? t.toString() : new ga(t, n).toString(s), o) {
    const d = e.indexOf("#");
    d !== -1 && (e = e.slice(0, d)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
const yn = Symbol("internals");
function Go(e) {
  return e ? e.length : 0;
}
function xi(e) {
  if (e)
    for (; e.length && e[e.length - 1] === null; )
      e.pop();
}
function xn(e, t) {
  const r = e.handlers, n = Go(r);
  r !== t.handlersRef ? (t.handlersRef = r, t.handlerEntries.clear()) : n !== t.handlersLength && (n ? t.handlerEntries.forEach(function(i, o) {
    r[i.index] !== i.handler && t.handlerEntries.delete(o);
  }) : t.handlerEntries.clear()), t.handlersLength = n;
}
class vi {
  constructor() {
    this.handlers = [], this[yn] = {
      handlersRef: this.handlers,
      handlersLength: this.handlers.length,
      handlerEntries: /* @__PURE__ */ new Map(),
      iterationDepth: 0,
      nextId: 0
    };
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    const s = {
      fulfilled: t,
      rejected: r,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }, i = this[yn];
    this.handlers == null && (this.handlers = []), xn(this, i);
    const o = i.nextId++;
    return this.handlers.push(s), i.handlerEntries.set(o, {
      handler: s,
      index: this.handlers.length - 1
    }), i.handlersLength = this.handlers.length, o;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    const r = this[yn];
    xn(this, r);
    const n = r.handlerEntries.get(t);
    if (n) {
      if (r.handlerEntries.delete(t), this.handlers[n.index] !== n.handler)
        return;
      this.handlers[n.index] = null, r.iterationDepth || (xi(this.handlers), r.handlersLength = this.handlers.length);
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = [], xn(this, this[yn]));
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    const r = this[yn];
    xn(this, r), r.iterationDepth++;
    try {
      S.forEach(this.handlers, function(s) {
        s !== null && t(s);
      });
    } finally {
      --r.iterationDepth || (xn(this, r), xi(this.handlers), r.handlersLength = Go(this.handlers));
    }
  }
}
const ba = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1,
  legacyInterceptorReqResOrdering: !0,
  advertiseZstdAcceptEncoding: !1,
  validateStatusUndefinedResolves: !0
}, cf = typeof URLSearchParams < "u" ? URLSearchParams : ga, uf = typeof FormData < "u" ? FormData : null, df = typeof Blob < "u" ? Blob : null, hf = {
  isBrowser: !0,
  classes: {
    URLSearchParams: cf,
    FormData: uf,
    Blob: df
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, ya = typeof window < "u" && typeof document < "u", aa = typeof navigator == "object" && navigator || void 0, ff = ya && (!aa || ["ReactNative", "NativeScript", "NS"].indexOf(aa.product) < 0), mf = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", pf = ya && window.location.href || "http://localhost", gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: ya,
  hasStandardBrowserEnv: ff,
  hasStandardBrowserWebWorkerEnv: mf,
  navigator: aa,
  origin: pf
}, Symbol.toStringTag, { value: "Module" })), Be = {
  ...gf,
  ...hf
};
function bf(e, t) {
  return ps(e, new Be.classes.URLSearchParams(), {
    visitor: function(r, n, s, i) {
      return Be.isNode && S.isBuffer(r) ? (this.append(n, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
const wi = Wo;
function Xo(e) {
  if (e > wi)
    throw new I(
      "FormData field is too deeply nested (" + e + " levels). Max depth: " + wi,
      I.ERR_FORM_DATA_DEPTH_EXCEEDED
    );
}
function yf(e) {
  const t = [], r = /[^.[\]]+|\[([^.[\]]*)]/g;
  let n;
  for (; (n = r.exec(e)) !== null; )
    Xo(t.length), t.push(n[0] === "[]" ? "" : n[1] || n[0]);
  return t;
}
function xf(e) {
  const t = {}, r = Object.keys(e);
  let n;
  const s = r.length;
  let i;
  for (n = 0; n < s; n++)
    i = r[n], t[i] = e[i];
  return t;
}
function Ko(e) {
  function t(r, n, s, i) {
    Xo(i);
    let o = r[i++];
    if (o === "__proto__") return !0;
    const d = Number.isFinite(+o), h = i >= r.length;
    return o = !o && S.isArray(s) ? s.length : o, h ? (S.hasOwnProp(s, o) ? s[o] = S.isArray(s[o]) ? s[o].concat(n) : [s[o], n] : s[o] = n, !d) : ((!S.hasOwnProp(s, o) || !S.isObject(s[o])) && (s[o] = []), t(r, n, s[o], i) && S.isArray(s[o]) && (s[o] = xf(s[o])), !d);
  }
  if (S.isFormData(e) && S.isFunction(e.entries)) {
    const r = {};
    return S.forEachEntry(e, (n, s) => {
      t(yf(n), s, r, 0);
    }), r;
  }
  return null;
}
const Jo = Object.freeze([
  "get",
  "delete",
  "head",
  "options",
  "post",
  "put",
  "patch",
  "purge",
  "link",
  "unlink",
  "query"
]), jr = (e, t) => e != null && S.hasOwnProp(e, t) ? e[t] : void 0;
function vf(e, t, r) {
  if (S.isString(e))
    try {
      return (t || JSON.parse)(e), S.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (r || JSON.stringify)(e);
}
const zn = {
  transitional: ba,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function(t, r) {
      const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, i = S.isObject(t);
      if (i && S.isHTMLForm(t) && (t = new FormData(t)), S.isFormData(t))
        return s ? JSON.stringify(Ko(t)) : t;
      if (S.isArrayBuffer(t) || S.isBuffer(t) || S.isStream(t) || S.isFile(t) || S.isBlob(t) || S.isReadableStream(t))
        return t;
      if (S.isArrayBufferView(t))
        return t.buffer;
      if (S.isURLSearchParams(t))
        return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
      let d;
      if (i) {
        const h = jr(this, "formSerializer");
        if (n.indexOf("application/x-www-form-urlencoded") > -1)
          return bf(t, h).toString();
        if ((d = S.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
          const f = jr(this, "env"), p = f && f.FormData;
          return ps(
            d ? { "files[]": t } : t,
            p && new p(),
            h
          );
        }
      }
      return i || s ? (r.setContentType("application/json", !1), vf(t)) : t;
    }
  ],
  transformResponse: [
    function(t) {
      const r = jr(this, "transitional") || zn.transitional, n = r && r.forcedJSONParsing, s = jr(this, "responseType"), i = s === "json";
      if (S.isResponse(t) || S.isReadableStream(t))
        return t;
      if (t && S.isString(t) && (n && !s || i)) {
        const d = !(r && r.silentJSONParsing) && i;
        try {
          return JSON.parse(t, jr(this, "parseReviver"));
        } catch (h) {
          if (d)
            throw h.name === "SyntaxError" ? I.from(h, I.ERR_BAD_RESPONSE, this, null, jr(this, "response")) : h;
        }
      }
      return t;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Be.classes.FormData,
    Blob: Be.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
S.forEach(Jo, (e) => {
  zn.headers[e] = {};
});
function Ds(e, t) {
  const r = this || zn, n = t || r, s = Ze.from(n.headers);
  let i = n.data;
  return S.forEach(e, function(d) {
    i = d.call(r, i, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), i;
}
function Zo(e) {
  return !!(e && e.__CANCEL__);
}
let Ln = class extends I {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(t, r, n) {
    super(t ?? "canceled", I.ERR_CANCELED, r, n), this.name = "CanceledError", this.__CANCEL__ = !0;
  }
};
function el(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? e(r) : t(new I(
    "Request failed with status code " + r.status,
    r.status >= 400 && r.status < 500 ? I.ERR_BAD_REQUEST : I.ERR_BAD_RESPONSE,
    r.config,
    r.request,
    r
  ));
}
const wf = /[\t\n\r]/g;
function tl(e) {
  if (typeof e != "string")
    return e;
  let t = 0;
  for (; t < e.length && e.charCodeAt(t) <= 32; )
    t++;
  return e.slice(t).replace(wf, "");
}
function Ms(e) {
  const t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
  return t && t[1] || "";
}
function kf(e, t) {
  e = e || 10;
  const r = new Array(e), n = new Array(e);
  let s = 0, i = 0, o;
  return t = t !== void 0 ? t : 1e3, function(h) {
    const f = Date.now(), p = n[i];
    o || (o = f), r[s] = h, n[s] = f;
    let g = i, y = 0;
    for (; g !== s; )
      y += r[g++], g = g % e;
    if (s = (s + 1) % e, s === i && (i = (i + 1) % e), f - o < t)
      return;
    const C = p && f - p;
    return C ? Math.round(y * 1e3 / C) : void 0;
  };
}
function Sf(e, t) {
  let r = 0, n = 1e3 / t, s, i;
  const o = (p, g = Date.now()) => {
    r = g, s = null, i && (clearTimeout(i), i = null), e(...p);
  };
  return [(...p) => {
    const g = Date.now(), y = g - r;
    y >= n ? o(p, g) : (s = p, i || (i = setTimeout(() => {
      i = null, o(s);
    }, n - y)));
  }, () => s && o(s), (...p) => o(p)];
}
const is = (e, t, r = 3) => {
  let n = 0;
  const s = kf(50, 250);
  return Sf((i) => {
    if (!i || !S.isNumber(i.loaded))
      return;
    const o = i.loaded, d = i.lengthComputable ? i.total : void 0, h = Math.max(0, d != null ? Math.min(o, d) : o), f = Math.max(0, h - n), p = s(f);
    n = Math.max(n, h);
    const g = {
      loaded: h,
      total: d,
      progress: d ? h / d : void 0,
      bytes: f,
      rate: p || void 0,
      estimated: p && d ? (d - h) / p : void 0,
      event: i,
      lengthComputable: d != null,
      [t ? "download" : "upload"]: !0
    };
    e(g);
  }, r);
}, ki = (e, t) => {
  const r = e != null;
  return [
    (n) => t[0]({
      lengthComputable: r,
      total: e,
      loaded: n
    }),
    t[1]
  ];
}, Si = (e, t = S.asap) => (...r) => t(() => e(...r)), Nf = Be.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (r) => (r = new URL(r, Be.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port)))(
  new URL(Be.origin),
  Be.navigator && /(msie|trident)/i.test(Be.navigator.userAgent)
) : () => !0, Cf = Be.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, r, n, s, i, o) {
      if (typeof document > "u") return;
      const d = [`${e}=${encodeURIComponent(t)}`];
      S.isNumber(r) && d.push(`expires=${new Date(r).toUTCString()}`), S.isString(n) && d.push(`path=${n}`), S.isString(s) && d.push(`domain=${s}`), i === !0 && d.push("secure"), S.isString(o) && d.push(`SameSite=${o}`), document.cookie = d.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.split(";");
      for (let r = 0; r < t.length; r++) {
        const n = t[r].replace(/^\s+/, ""), s = n.indexOf("=");
        if (s !== -1 && n.slice(0, s) === e)
          try {
            return decodeURIComponent(n.slice(s + 1));
          } catch {
            return n.slice(s + 1);
          }
      }
      return null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function _f(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Tf(e, t) {
  if (!t)
    return e;
  let r = e.length;
  for (; r > 0 && e.charCodeAt(r - 1) === 47; )
    r--;
  return e.slice(0, r) + "/" + t.replace(/^\/+/, "");
}
const Pf = /^https?:(?!\/\/)/i;
function Ef(e) {
  return e && e.replace(/(^|&)([^=&]*=)?[^&]+/g, (t, r, n = "") => `${r}${n}${as}`);
}
function Of(e) {
  const t = e.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${as}@`), r = t.indexOf("#"), s = (r === -1 ? t : t.slice(0, r)).replace(
    /([?&][^=&#]*=)[^&#]*/g,
    `$1${as}`
  );
  return r === -1 ? s : `${s}#${Ef(t.slice(r + 1))}`;
}
function Ni(e, t) {
  if (typeof e == "string") {
    const r = tl(e);
    if (Pf.test(r))
      throw new I(
        `Invalid URL ${JSON.stringify(Of(r))}: missing "//" after protocol`,
        I.ERR_INVALID_URL,
        t
      );
  }
}
function rl(e, t, r, n) {
  Ni(t, n);
  let s = !_f(t);
  return e && (s || r === !1) ? (Ni(e, n), Tf(e, t)) : t;
}
const Ci = (e) => e instanceof Ze ? { ...e } : e, Rf = (e) => Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor ? Object.keys(e).concat(
  Object.getOwnPropertySymbols(e).filter(
    (t) => Object.getOwnPropertyDescriptor(e, t).enumerable
  )
) : Object.keys(e);
function Rr(e, t) {
  e = e || {}, t = t || {};
  const r = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(r, "hasOwnProperty", {
    // Null-proto descriptor so a polluted Object.prototype.get cannot turn
    // this data descriptor into an accessor descriptor on the way in.
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
  function n(p, g, y, C) {
    return S.isPlainObject(p) && S.isPlainObject(g) ? S.merge.call({ caseless: C }, p, g) : S.isPlainObject(g) ? S.merge({}, g) : S.isArray(g) ? g.slice() : g;
  }
  function s(p, g, y, C) {
    if (S.isUndefined(g)) {
      if (!S.isUndefined(p))
        return n(void 0, p, y, C);
    } else return n(p, g, y, C);
  }
  function i(p, g) {
    if (!S.isUndefined(g))
      return n(void 0, g);
  }
  function o(p, g) {
    if (S.isUndefined(g)) {
      if (!S.isUndefined(p))
        return n(void 0, p);
    } else return n(void 0, g);
  }
  function d(p) {
    const g = S.hasOwnProp(t, "transitional") ? t.transitional : void 0;
    if (!S.isUndefined(g))
      if (S.isPlainObject(g)) {
        if (S.hasOwnProp(g, p))
          return g[p];
      } else
        return;
    const y = S.hasOwnProp(e, "transitional") ? e.transitional : void 0;
    if (S.isPlainObject(y) && S.hasOwnProp(y, p))
      return y[p];
  }
  function h(p, g, y) {
    if (S.hasOwnProp(t, y))
      return n(p, g);
    if (S.hasOwnProp(e, y))
      return n(void 0, p);
  }
  const f = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutErrorMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    allowedSocketPaths: o,
    responseEncoding: o,
    validateStatus: h,
    headers: (p, g, y) => s(Ci(p), Ci(g), y, !0)
  };
  return S.forEach(Rf({ ...e, ...t }), function(g) {
    if (g === "__proto__" || g === "constructor" || g === "prototype") return;
    const y = S.hasOwnProp(f, g) ? f[g] : s, C = S.hasOwnProp(e, g) ? e[g] : void 0, T = S.hasOwnProp(t, g) ? t[g] : void 0, P = y(C, T, g);
    S.isUndefined(P) && y !== h || (r[g] = P);
  }), S.hasOwnProp(t, "validateStatus") && S.isUndefined(t.validateStatus) && d("validateStatusUndefinedResolves") === !1 && (S.hasOwnProp(e, "validateStatus") ? r.validateStatus = n(void 0, e.validateStatus) : delete r.validateStatus), r;
}
const Af = ["content-type", "content-length"];
function Df(e, t, r) {
  if (r !== "content-only") {
    e.set(t);
    return;
  }
  Object.entries(t || {}).forEach(([n, s]) => {
    Af.includes(n.toLowerCase()) && e.set(n, s);
  });
}
const Mf = (e) => encodeURIComponent(e).replace(
  /%([0-9A-F]{2})/gi,
  (t, r) => String.fromCharCode(parseInt(r, 16))
);
function nl(e) {
  const t = Rr({}, e), r = (y) => S.hasOwnProp(t, y) ? t[y] : void 0, n = r("data");
  let s = r("withXSRFToken");
  const i = r("xsrfHeaderName"), o = r("xsrfCookieName");
  let d = r("headers");
  const h = r("auth"), f = r("baseURL"), p = r("allowAbsoluteUrls"), g = r("url");
  if (t.headers = d = Ze.from(d), t.url = Yo(
    rl(f, g, p, t),
    r("params"),
    r("paramsSerializer")
  ), h) {
    const y = S.getSafeProp(h, "username") || "", C = S.getSafeProp(h, "password") || "";
    try {
      d.set(
        "Authorization",
        "Basic " + btoa(y + ":" + (C ? Mf(C) : ""))
      );
    } catch (T) {
      throw I.from(T, I.ERR_BAD_OPTION_VALUE, e);
    }
  }
  if (S.isFormData(n)) {
    const y = S.getSafeProp(n, "getHeaders");
    Be.hasStandardBrowserEnv || Be.hasStandardBrowserWebWorkerEnv || S.isReactNative(n) ? d.setContentType(void 0) : S.isFunction(y) && Df(d, y.call(n), r("formDataHeaderPolicy"));
  }
  if (Be.hasStandardBrowserEnv && (S.isFunction(s) && (s = s(t)), s === !0 || s == null && Nf(t.url))) {
    const C = i && o && Cf.read(o);
    C && d.set(i, C);
  }
  return t;
}
const zf = typeof XMLHttpRequest < "u", Lf = zf && function(e) {
  return new Promise(function(r, n) {
    const s = nl(e);
    let i = s.data;
    const o = Ze.from(s.headers).normalize();
    let { responseType: d, onUploadProgress: h, onDownloadProgress: f } = s, p, g, y, C, T, P;
    function A() {
      C && C(), T && T(), s.cancelToken && s.cancelToken.unsubscribe(p), s.signal && s.signal.removeEventListener("abort", p);
    }
    let N = new XMLHttpRequest();
    N.open(s.method.toUpperCase(), s.url, !0), N.timeout = s.timeout;
    function w(_) {
      if (!N)
        return;
      if (N.status === 0 && (Ms(tl(s.url)) || Ms(Be.origin)) !== "file" && !(N.responseURL && N.responseURL.startsWith("file:"))) {
        n(new I("Request aborted", I.ECONNABORTED, e, N)), A(), N = null;
        return;
      }
      try {
        _ ? P && P(_) : T && T();
      } catch (O) {
        setTimeout(() => {
          throw O;
        });
      }
      if (!N)
        return;
      const E = Ze.from(
        "getAllResponseHeaders" in N && N.getAllResponseHeaders()
      ), D = {
        data: !d || d === "text" || d === "json" ? N.responseText : N.response,
        status: N.status,
        statusText: N.statusText,
        headers: E,
        config: e,
        request: N
      };
      el(
        function(M) {
          r(M), A();
        },
        function(M) {
          n(M), A();
        },
        D
      ), N = null;
    }
    "onloadend" in N ? N.onloadend = w : N.onreadystatechange = function() {
      !N || N.readyState !== 4 || N.status === 0 && !(N.responseURL && N.responseURL.startsWith("file:")) || setTimeout(w);
    }, N.onabort = function() {
      N && (n(new I("Request aborted", I.ECONNABORTED, e, N)), A(), N = null);
    }, N.onerror = function(E) {
      const z = E && E.message ? E.message : "Network Error", D = new I(z, I.ERR_NETWORK, e, N);
      D.event = E || null, n(D), A(), N = null;
    }, N.ontimeout = function() {
      let E = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const z = s.transitional || ba;
      s.timeoutErrorMessage && (E = s.timeoutErrorMessage), n(
        new I(
          E,
          z.clarifyTimeoutError ? I.ETIMEDOUT : I.ECONNABORTED,
          e,
          N
        )
      ), A(), N = null;
    }, i === void 0 && o.setContentType(null), "setRequestHeader" in N && S.forEach(Bo(o), function(E, z) {
      N.setRequestHeader(z, E);
    }), S.isUndefined(s.withCredentials) || (N.withCredentials = !!s.withCredentials), d && d !== "json" && (N.responseType = s.responseType), f && ([y, T, P] = is(
      f,
      !0
    ), N.addEventListener("progress", y)), h && N.upload && ([g, C] = is(h), N.upload.addEventListener("progress", g), N.upload.addEventListener("loadend", C)), (s.cancelToken || s.signal) && (p = (_) => {
      N && (n(!_ || _.type ? new Ln(null, e, N) : _), N.abort(), A(), N = null);
    }, s.cancelToken && s.cancelToken.subscribe(p), s.signal && (s.signal.aborted ? p() : s.signal.addEventListener("abort", p)));
    const k = Ms(s.url);
    if (k && !Be.protocols.includes(k)) {
      n(
        new I(
          "Unsupported protocol " + k + ":",
          I.ERR_BAD_REQUEST,
          e
        )
      ), A();
      return;
    }
    N.send(i || null);
  });
}, jf = (e, t) => {
  if (e = e ? e.filter(Boolean) : [], !t && !e.length)
    return;
  const r = new AbortController();
  let n = !1;
  const s = function(h) {
    if (!n) {
      n = !0, o();
      const f = h instanceof Error ? h : this.reason;
      r.abort(
        f instanceof I ? f : new Ln(f instanceof Error ? f.message : f)
      );
    }
  };
  let i = t && setTimeout(() => {
    i = null, s(new I(`timeout of ${t}ms exceeded`, I.ETIMEDOUT));
  }, t);
  const o = () => {
    e && (i && clearTimeout(i), i = null, e.forEach((h) => {
      h.unsubscribe ? h.unsubscribe(s) : h.removeEventListener("abort", s);
    }), e = null);
  };
  e.forEach((h) => {
    if (!n) {
      if (h.aborted) {
        s.call(h);
        return;
      }
      h.addEventListener("abort", s, { once: !0 });
    }
  });
  const { signal: d } = r;
  return d.unsubscribe = () => S.asap(o), d;
}, Ff = function* (e, t) {
  let r = e.byteLength;
  if (r < t) {
    yield e;
    return;
  }
  let n = 0, s;
  for (; n < r; )
    s = n + t, yield e.slice(n, s), n = s;
}, If = async function* (e, t) {
  for await (const r of Uf(e))
    yield* Ff(r, t);
}, Uf = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await t.read();
      if (r)
        break;
      yield n;
    }
  } finally {
    await t.cancel();
  }
}, _i = (e, t, r, n) => {
  const s = If(e, t);
  let i = 0, o, d = (h) => {
    o || (o = !0, n && n(h));
  };
  return new ReadableStream(
    {
      async pull(h) {
        try {
          const { done: f, value: p } = await s.next();
          if (f) {
            d(), h.close();
            return;
          }
          let g = p.byteLength;
          if (r) {
            let y = i += g;
            r(y);
          }
          h.enqueue(new Uint8Array(p));
        } catch (f) {
          throw d(f), f;
        }
      },
      cancel(h) {
        return d(h), s.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
}, Ti = (e) => e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102, sl = (e, t, r) => t + 2 < r && Ti(e.charCodeAt(t + 1)) && Ti(e.charCodeAt(t + 2)), Pi = (e) => e <= 57 ? e - 48 : (e & 223) - 55, qf = (e) => e >= 65 && e <= 90 || // A-Z
e >= 97 && e <= 122 || // a-z
e >= 48 && e <= 57 || // 0-9
e === 43 || // +
e === 47 || // /
e === 45 || // - (base64url)
e === 95, Hf = (e) => e === 9 || e === 10 || e === 12 || e === 13 || e === 32, Bf = (e) => {
  const t = Math.floor(e / 4), r = e % 4;
  return t * 3 + (r === 2 ? 1 : r === 3 ? 2 : 0);
}, $f = (e) => {
  const t = e.length;
  let r = 0;
  return t > 0 && e.charCodeAt(t - 1) === 61 && (r++, t > 1 && e.charCodeAt(t - 2) === 61 && r++), Math.floor((t - r) * 3 / 4);
}, Wf = (e) => {
  const t = e.length;
  let r = 0, n = 0, s = !1;
  for (let i = 0; i < t; i++) {
    let o = e.charCodeAt(i);
    if (o === 37 && sl(e, i, t) && (o = Pi(e.charCodeAt(i + 1)) * 16 + Pi(e.charCodeAt(i + 2)), i += 2), !Hf(o)) {
      if (o === 61) {
        n++;
        continue;
      }
      if (!qf(o) || n > 0) {
        s = !0;
        continue;
      }
      r++;
    }
  }
  return s || n > 2 || n > 0 && (r + n) % 4 !== 0 || r % 4 === 1 ? $f(e) : Bf(r);
}, Vf = (e, t) => {
  if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
  const r = e.indexOf(",");
  if (r < 0) return 0;
  const n = e.slice(5, r), s = e.slice(r + 1);
  if (/;base64/i.test(n))
    return t(s);
  let o = 0;
  for (let d = 0, h = s.length; d < h; d++) {
    const f = s.charCodeAt(d);
    if (f === 37 && sl(s, d, h))
      o += 1, d += 2;
    else if (f < 128)
      o += 1;
    else if (f < 2048)
      o += 2;
    else if (f >= 55296 && f <= 56319 && d + 1 < h) {
      const p = s.charCodeAt(d + 1);
      p >= 56320 && p <= 57343 ? (o += 4, d++) : o += 3;
    } else
      o += 3;
  }
  return o;
};
function Qf(e) {
  const t = typeof e == "string" ? e.indexOf("#") : -1;
  return Vf(
    t === -1 ? e : e.slice(0, t),
    Wf
  );
}
const xa = "1.20.0", Ei = 64 * 1024, Yf = {
  cache: "default",
  redirect: "follow",
  referrer: "about:client",
  referrerPolicy: "",
  mode: "cors",
  integrity: "",
  keepalive: !1,
  priority: "auto",
  window: null
}, { isFunction: Yn } = S, Gf = (e) => encodeURIComponent(e).replace(
  /%([0-9A-F]{2})/gi,
  (t, r) => String.fromCharCode(parseInt(r, 16))
), Oi = (e) => {
  if (!S.isString(e))
    return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}, Ri = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Xf = (e) => {
  const t = e.indexOf("://");
  let r = e;
  return t !== -1 && (r = r.slice(t + 3)), r.includes("@") || r.includes(":");
}, Kf = (e) => {
  const t = S.global !== void 0 && S.global !== null ? S.global : globalThis, { ReadableStream: r, TextEncoder: n } = t;
  e = S.merge.call(
    {
      skipUndefined: !0
    },
    {
      Request: t.Request,
      Response: t.Response
    },
    e
  );
  const { fetch: s, Request: i, Response: o } = e, d = s ? Yn(s) : typeof fetch == "function", h = Yn(i), f = Yn(o);
  if (!d)
    return !1;
  const p = d && Yn(r), g = d && (typeof n == "function" ? /* @__PURE__ */ ((N) => (w) => N.encode(w))(new n()) : async (N) => new Uint8Array(await new i(N).arrayBuffer())), y = h && p && Ri(() => {
    let N = !1;
    const w = new i(Be.origin, {
      body: new r(),
      method: "POST",
      get duplex() {
        return N = !0, "half";
      }
    }), k = w.headers.has("Content-Type");
    return w.body != null && w.body.cancel(), N && !k;
  }), C = f && p && Ri(() => S.isReadableStream(new o("").body)), T = {
    stream: C && ((N) => N.body)
  };
  d && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((N) => {
    !T[N] && (T[N] = (w, k) => {
      let _ = w && w[N];
      if (_)
        return _.call(w);
      throw new I(
        `Response type '${N}' is not supported`,
        I.ERR_NOT_SUPPORT,
        k
      );
    });
  });
  const P = async (N) => {
    if (N == null)
      return 0;
    if (S.isBlob(N))
      return N.size;
    if (S.isSpecCompliantForm(N))
      return (await new i(Be.origin, {
        method: "POST",
        body: N
      }).arrayBuffer()).byteLength;
    if (S.isArrayBufferView(N) || S.isArrayBuffer(N))
      return N.byteLength;
    if (S.isURLSearchParams(N) && (N = N + ""), S.isString(N))
      return (await g(N)).byteLength;
  }, A = async (N, w) => {
    const k = S.toFiniteNumber(N.getContentLength());
    return k ?? P(w);
  };
  return async (N) => {
    let {
      url: w,
      method: k,
      data: _,
      signal: E,
      cancelToken: z,
      timeout: D,
      onDownloadProgress: O,
      onUploadProgress: M,
      responseType: L,
      headers: B,
      withCredentials: te = "same-origin",
      fetchOptions: Q,
      maxContentLength: me,
      maxBodyLength: Z,
      maxRedirects: K
    } = nl(N);
    const Te = S.isNumber(me) && me > -1, ct = S.isNumber(Z) && Z > -1, ut = (ee) => S.hasOwnProp(N, ee) ? N[ee] : void 0;
    let U = s || fetch;
    L = L ? (L + "").toLowerCase() : "text";
    let De = jf(
      [E, z && z.toAbortSignal()],
      D
    ), de = null;
    const Ce = De && De.unsubscribe && (() => {
      De.unsubscribe();
    });
    let Me, xe = null;
    const ce = () => new I(
      "Request body larger than maxBodyLength limit",
      I.ERR_BAD_REQUEST,
      N,
      de
    );
    try {
      let ee;
      const _e = ut("auth");
      if (_e) {
        const G = S.getSafeProp(_e, "username") || "", fe = S.getSafeProp(_e, "password") || "";
        ee = {
          username: G,
          password: fe
        };
      }
      if (Xf(w)) {
        const G = new URL(w, Be.origin);
        if (!ee && (G.username || G.password)) {
          const fe = Oi(G.username), Ve = Oi(G.password);
          ee = {
            username: fe,
            password: Ve
          };
        }
        (G.username || G.password) && (G.username = "", G.password = "", w = G.href);
      }
      if (ee && (B.delete("authorization"), B.set(
        "Authorization",
        "Basic " + btoa(Gf((ee.username || "") + ":" + (ee.password || "")))
      )), Te && typeof w == "string" && w.startsWith("data:") && Qf(w) > me)
        throw new I(
          "maxContentLength size of " + me + " exceeded",
          I.ERR_BAD_RESPONSE,
          N,
          de
        );
      if (ct && k !== "get" && k !== "head") {
        const G = await P(_);
        if (typeof G == "number" && isFinite(G) && (Me = G, G > Z))
          throw ce();
      }
      const Y = ct && (S.isReadableStream(_) || S.isStream(_)), le = (G, fe, Ve) => _i(
        G,
        Ei,
        (et) => {
          if (ct && et > Z)
            throw xe = ce();
          fe && fe(et);
        },
        Ve
      );
      if (y && k !== "get" && k !== "head" && (M || Y)) {
        if (Me = Me ?? await A(B, _), Me !== 0 || Y) {
          let G = new i(w, {
            method: "POST",
            body: _,
            duplex: "half"
          }), fe;
          if (S.isFormData(_) && (fe = G.headers.get("content-type")) && B.setContentType(fe), G.body) {
            const [Ve, et] = M && ki(
              Me,
              is(Si(M))
            ) || [];
            _ = le(G.body, Ve, et);
          }
        }
      } else if (Y && !h && p && k !== "get" && k !== "head")
        _ = le(_);
      else if (Y && h && !y && k !== "get" && k !== "head")
        throw new I(
          "Stream request bodies are not supported by the current fetch implementation",
          I.ERR_NOT_SUPPORT,
          N,
          de
        );
      S.isString(te) || (te = te ? "include" : "omit");
      const dt = h && "credentials" in i.prototype;
      if (S.isFormData(_)) {
        const G = B.getContentType();
        G && /^multipart\/form-data/i.test(G) && !/boundary=/i.test(G) && B.delete("content-type");
      }
      B.set("User-Agent", "axios/" + xa, !1);
      const Pe = Q == null ? Q : Object.assign(/* @__PURE__ */ Object.create(null), Q);
      Pe && (delete Pe.body, delete Pe.headers, delete Pe.method, delete Pe.signal, delete Pe.duplex, delete Pe.credentials);
      const Ne = Object.assign(/* @__PURE__ */ Object.create(null), Pe, {
        signal: De,
        method: k.toUpperCase(),
        headers: Bo(B.normalize()),
        body: _,
        duplex: "half",
        credentials: dt ? te : void 0
      });
      h && (S.forEach(Yf, (G, fe) => {
        Ne[fe] === void 0 && (Ne[fe] = G);
      }), Ne.signal === void 0 && (Ne.signal = null), Ne.body === void 0 && (Ne.body = null)), K === 0 && (Ne.redirect = "manual", Pe && (Pe.redirect = "manual")), de = h && new i(w, Ne);
      let Re = await (h ? U(de, Pe) : U(w, Ne));
      const Lt = Ze.from(Re.headers);
      if (Te) {
        const G = S.toFiniteNumber(Lt.getContentLength());
        if (G != null && G > me)
          throw new I(
            "maxContentLength size of " + me + " exceeded",
            I.ERR_BAD_RESPONSE,
            N,
            de
          );
      }
      const $e = C && (L === "stream" || L === "response");
      if (C && Re.body && (O || Te || $e && Ce)) {
        const G = {};
        ["status", "statusText", "headers"].forEach((St) => {
          G[St] = Re[St];
        });
        const fe = S.toFiniteNumber(Lt.getContentLength()), [Ve, et] = O && ki(
          fe,
          is(Si(O), !0)
        ) || [];
        let gt = 0;
        const lr = (St) => {
          if (Te && (gt = St, gt > me))
            throw new I(
              "maxContentLength size of " + me + " exceeded",
              I.ERR_BAD_RESPONSE,
              N,
              de
            );
          Ve && Ve(St);
        };
        Re = new o(
          _i(Re.body, Ei, lr, () => {
            et && et(), Ce && Ce();
          }),
          G
        );
      }
      L = L || "text";
      let We = await T[S.findKey(T, L) || "text"](
        Re,
        N
      );
      if (Te && !C && !$e) {
        let G;
        if (We != null && (typeof We.byteLength == "number" ? G = We.byteLength : typeof We.size == "number" ? G = We.size : typeof We == "string" && (G = typeof n == "function" ? new n().encode(We).byteLength : We.length)), typeof G == "number" && G > me)
          throw new I(
            "maxContentLength size of " + me + " exceeded",
            I.ERR_BAD_RESPONSE,
            N,
            de
          );
      }
      return !$e && Ce && Ce(), await new Promise((G, fe) => {
        el(G, fe, {
          data: We,
          headers: Ze.from(Re.headers),
          status: Re.status,
          statusText: Re.statusText,
          config: N,
          request: de
        });
      });
    } catch (ee) {
      if (Ce && Ce(), De && De.aborted && De.reason instanceof I) {
        const _e = De.reason;
        throw _e.config = N, de && (_e.request = de), ee !== _e && Object.defineProperty(_e, "cause", {
          __proto__: null,
          value: ee,
          writable: !0,
          enumerable: !1,
          configurable: !0
        }), _e;
      }
      if (xe)
        throw de && !xe.request && (xe.request = de), xe;
      if (ee instanceof I)
        throw de && !ee.request && (ee.request = de), ee;
      if (ee && ee.name === "TypeError" && /Load failed|fetch/i.test(ee.message)) {
        const _e = new I(
          "Network Error",
          I.ERR_NETWORK,
          N,
          de,
          ee && ee.response
        );
        throw Object.defineProperty(_e, "cause", {
          __proto__: null,
          value: ee.cause || ee,
          writable: !0,
          enumerable: !1,
          configurable: !0
        }), _e;
      }
      throw I.from(ee, ee && ee.code, N, de, ee && ee.response);
    }
  };
}, Jf = /* @__PURE__ */ new Map(), al = (e) => {
  let t = e && e.env || {};
  const { fetch: r, Request: n, Response: s } = t, i = [n, s, r];
  let o = i.length, d = o, h, f, p = Jf;
  for (; d--; )
    h = i[d], f = p.get(h), f === void 0 && p.set(h, f = d ? /* @__PURE__ */ new Map() : Kf(t)), p = f;
  return f;
};
al();
const va = {
  http: sf,
  xhr: Lf,
  fetch: {
    get: al
  }
};
S.forEach(va, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { __proto__: null, value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { __proto__: null, value: t });
  }
});
const Ai = (e) => `- ${e}`, Zf = (e) => S.isFunction(e) || e === null || e === !1;
function em(e, t) {
  e = S.isArray(e) ? e : [e];
  const { length: r } = e;
  let n, s;
  const i = {};
  for (let o = 0; o < r; o++) {
    n = e[o];
    let d;
    if (s = n, !Zf(n) && (s = va[(d = String(n)).toLowerCase()], s === void 0))
      throw new I(`Unknown adapter '${d}'`);
    if (s && (S.isFunction(s) || (s = s.get(t))))
      break;
    i[d || "#" + o] = s;
  }
  if (!s) {
    const o = Object.entries(i).map(
      ([h, f]) => `adapter ${h} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let d = r ? o.length > 1 ? `since :
` + o.map(Ai).join(`
`) : " " + Ai(o[0]) : "as no adapter specified";
    throw new I(
      "There is no suitable adapter to dispatch the request " + d,
      I.ERR_NOT_SUPPORT
    );
  }
  return s;
}
const il = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: em,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: va
};
function zs(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Ln(null, e);
}
function Ls(e) {
  const t = S.toSafeFlatObject(e);
  return zs(t), t.headers = Ze.from(S.getSafeProp(t, "headers")), t.data = Ds.call(t, t.transformRequest), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), il.getAdapter(t.adapter || zn.adapter, t)(t).then(
    function(s) {
      zs(t), t.response = s;
      try {
        s.data = Ds.call(t, t.transformResponse, s);
      } finally {
        delete t.response;
      }
      return s.headers = Ze.from(s.headers), s;
    },
    function(s) {
      if (!Zo(s) && (zs(t), s && s.response)) {
        t.response = s.response;
        try {
          s.response.data = Ds.call(
            t,
            t.transformResponse,
            s.response
          );
        } finally {
          delete t.response;
        }
        s.response.headers = Ze.from(s.response.headers);
      }
      return Promise.reject(s);
    }
  );
}
const gs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  gs[e] = function(n) {
    return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Di = {};
gs.transitional = function(t, r, n) {
  function s(i, o) {
    return "[Axios v" + xa + "] Transitional option '" + i + "'" + o + (n ? ". " + n : "");
  }
  return (i, o, d) => {
    if (t === !1)
      throw new I(
        s(o, " has been removed" + (r ? " in " + r : "")),
        I.ERR_DEPRECATED
      );
    return r && !Di[o] && (Di[o] = !0, console.warn(
      s(
        o,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), t ? t(i, o, d) : !0;
  };
};
gs.spelling = function(t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function tm(e, t, r) {
  if (typeof e != "object" || e === null)
    throw new I("options must be an object", I.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let s = n.length;
  for (; s-- > 0; ) {
    const i = n[s], o = Object.prototype.hasOwnProperty.call(t, i) ? t[i] : void 0;
    if (o) {
      const d = e[i], h = d === void 0 || o(d, i, e);
      if (h !== !0)
        throw new I(
          "option " + i + " must be " + h,
          I.ERR_BAD_OPTION_VALUE
        );
      continue;
    }
    if (r !== !0)
      throw new I("Unknown option " + i, I.ERR_BAD_OPTION);
  }
}
const ts = {
  assertOptions: tm,
  validators: gs
}, Ge = ts.validators;
let Tr = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new vi(),
      response: new vi()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error)
        try {
          let s = {};
          Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
          const i = s.stack;
          let o = "";
          if (typeof i == "string") {
            const d = i.indexOf(`
`);
            o = d === -1 ? "" : i.slice(d + 1);
          }
          if (!n.stack)
            n.stack = o;
          else if (o) {
            const d = o.indexOf(`
`), h = d === -1 ? -1 : o.indexOf(`
`, d + 1), f = h === -1 ? "" : o.slice(h + 1);
            String(n.stack).endsWith(f) || (n.stack += `
` + o);
          }
        } catch {
        }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? (r = r || {}, r.url = t) : r = t || {}, r = Rr(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: i } = r;
    n !== void 0 && ts.assertOptions(
      n,
      {
        silentJSONParsing: Ge.transitional(Ge.boolean),
        forcedJSONParsing: Ge.transitional(Ge.boolean),
        clarifyTimeoutError: Ge.transitional(Ge.boolean),
        legacyInterceptorReqResOrdering: Ge.transitional(Ge.boolean),
        advertiseZstdAcceptEncoding: Ge.transitional(Ge.boolean),
        validateStatusUndefinedResolves: Ge.transitional(Ge.boolean)
      },
      !1
    ), s != null && (S.isFunction(s) ? r.paramsSerializer = {
      serialize: s
    } : ts.assertOptions(
      s,
      {
        encode: Ge.function,
        serialize: Ge.function
      },
      !0
    )), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = !0), ts.assertOptions(
      r,
      {
        baseUrl: Ge.spelling("baseURL"),
        withXsrfToken: Ge.spelling("withXSRFToken")
      },
      !0
    ), r.method = (S.getSafeProp(r, "method") || S.getSafeProp(this.defaults, "method") || "get").toLowerCase();
    let o = i && S.merge(i.common, i[r.method]);
    i && S.forEach(Jo.concat("common"), (T) => {
      delete i[T];
    }), r.headers = Ze.concat(o, i);
    const d = [];
    let h = !0;
    this.interceptors.request.forEach(function(P) {
      if (typeof P.runWhen == "function" && P.runWhen(r) === !1)
        return;
      h = h && P.synchronous;
      const A = r.transitional || ba;
      A && A.legacyInterceptorReqResOrdering ? d.unshift(P.fulfilled, P.rejected) : d.push(P.fulfilled, P.rejected);
    });
    const f = [];
    this.interceptors.response.forEach(function(P) {
      f.push(P.fulfilled, P.rejected);
    });
    let p, g = 0, y;
    if (!h) {
      const T = [Ls.bind(this), void 0];
      for (T.unshift(...d), T.push(...f), y = T.length, p = Promise.resolve(r); g < y; )
        p = p.then(T[g++], T[g++]);
      return p;
    }
    y = d.length;
    let C = r;
    for (; g < y; ) {
      const T = d[g++], P = d[g++];
      try {
        C = T ? T(C) : C;
      } catch (A) {
        if (!P) {
          p = Promise.reject(A);
          break;
        }
        try {
          const N = P.call(this, A);
          S.isThenable(N) && (p = Promise.resolve(N).then(
            () => Ls.call(this, C)
          ));
        } catch (N) {
          p = Promise.reject(N);
        }
        break;
      }
    }
    if (!p)
      try {
        p = Ls.call(this, C);
      } catch (T) {
        p = Promise.reject(T);
      }
    for (g = 0, y = f.length; g < y; )
      p = p.then(f[g++], f[g++]);
    return p;
  }
  getUri(t) {
    t = Rr(this.defaults, t);
    const r = rl(t.baseURL, t.url, t.allowAbsoluteUrls, t);
    return Yo(r, t.params, t.paramsSerializer);
  }
};
S.forEach(["delete", "get", "head", "options"], function(t) {
  Tr.prototype[t] = function(r, n) {
    return this.request(
      Rr(n || {}, {
        method: t,
        url: r,
        data: n && S.hasOwnProp(n, "data") ? n.data : void 0
      })
    );
  };
});
S.forEach(["post", "put", "patch", "query"], function(t) {
  function r(n) {
    return function(i, o, d) {
      return this.request(
        Rr(d || {}, {
          method: t,
          headers: n ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: i,
          data: o
        })
      );
    };
  }
  Tr.prototype[t] = r(), t !== "query" && (Tr.prototype[t + "Form"] = r(!0));
});
let rm = class ol {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let i = n._listeners.length;
      for (; i-- > 0; )
        n._listeners[i](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let i;
      const o = new Promise((d) => {
        n.subscribe(d), i = d;
      }).then(s);
      return o.cancel = function() {
        n.unsubscribe(i);
      }, o;
    }, t(function(i, o, d) {
      n.reason || (n.reason = new Ln(i, o, d), r(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), r = (n) => {
      t.abort(n);
    };
    return this.subscribe(r), t.signal.unsubscribe = () => this.unsubscribe(r), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new ol(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
};
function nm(e) {
  return function(r) {
    return e.apply(null, r);
  };
}
function sm(e) {
  return S.isObject(e) && e.isAxiosError === !0;
}
const rs = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  /**
   * @deprecated Use `ContentTooLarge` instead.
   */
  PayloadTooLarge: 413,
  ContentTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  /**
   * @deprecated Use `UnprocessableContent` instead.
   */
  UnprocessableEntity: 422,
  UnprocessableContent: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerReturnsAnUnknownError: 520,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(rs).forEach(([e, t]) => {
  rs[t] === void 0 && (rs[t] = e);
});
function ll(e) {
  const t = new Tr(e), r = Ao(Tr.prototype.request, t);
  return S.extend(r, Tr.prototype, t, { allOwnKeys: !0 }), S.extend(r, t, null, { allOwnKeys: !0 }), r.create = function(s) {
    return ll(Rr(e, s));
  }, r;
}
const Ae = ll(zn);
Ae.Axios = Tr;
Ae.CanceledError = Ln;
Ae.CancelToken = rm;
Ae.isCancel = Zo;
Ae.VERSION = xa;
Ae.toFormData = ps;
Ae.AxiosError = I;
Ae.Cancel = Ae.CanceledError;
Ae.all = function(t) {
  return Promise.all(t);
};
Ae.spread = nm;
Ae.isAxiosError = sm;
Ae.mergeConfig = Rr;
Ae.AxiosHeaders = Ze;
Ae.formToJSON = (e) => Ko(S.isHTMLForm(e) ? new FormData(e) : e);
Ae.getAdapter = il.getAdapter;
Ae.HttpStatusCode = rs;
Ae.default = Ae;
const {
  Axios: py,
  AxiosError: gy,
  CanceledError: by,
  isCancel: yy,
  CancelToken: xy,
  VERSION: vy,
  all: wy,
  Cancel: ky,
  isAxiosError: Sy,
  spread: Ny,
  toFormData: Cy,
  AxiosHeaders: _y,
  HttpStatusCode: Ty,
  formToJSON: Py,
  getAdapter: Ey,
  mergeConfig: Oy,
  create: Ry
} = Ae;
let Ur = null;
const am = (e) => {
  Ur = e;
}, im = (e) => Object.entries(e).reduce((t, [r, n]) => (t[r] = typeof n == "boolean" ? Number(n) : n, t), {}), mt = (e, t) => {
  if (!Ur)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  return `${Ur.apiBaseUrl.replace(/\/+$/, "")}/${e}/api/${t}`;
}, pt = async ({
  data: e,
  url: t,
  params: r,
  method: n,
  headers: s,
  ...i
}) => {
  if (!Ur)
    throw new Error("El cliente HTTP del chat no ha sido configurado");
  const o = {
    ...i,
    url: t,
    method: n,
    data: e,
    params: r ? im(r) : void 0,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
      ...Ur.authToken ? { Authorization: `Bearer ${Ur.authToken}` } : {},
      ...s
    }
  };
  return Ae.request(o);
}, om = (e) => pt({
  url: `${mt("messenger", "v1")}/users`,
  method: "GET",
  params: e
}), lm = (e) => pt({
  url: `${mt("messenger", "v1")}/users/${e}/user`,
  method: "GET"
}), cm = ({
  applicationId: e,
  userId: t
}) => pt({
  url: `${mt("auth", "v1")}/users/${t}/permissions`,
  method: "GET",
  params: {
    application_id: e
  }
}), um = () => pt({
  url: `${mt("auth", "v1")}/me`,
  method: "GET"
}), wa = nn(null);
function dm(e) {
  var r, n, s, i, o;
  const t = [];
  if ((r = e.apiBaseUrl) != null && r.trim() || t.push("apiBaseUrl"), (n = e.authToken) != null && n.trim() || t.push("authToken"), (e.applicationId === void 0 || e.applicationId === null) && t.push("applicationId"), e.reverb ? ((s = e.reverb.key) != null && s.trim() || t.push("reverb.key"), (i = e.reverb.host) != null && i.trim() || t.push("reverb.host"), (!Number.isFinite(e.reverb.port) || e.reverb.port <= 0) && t.push("reverb.port"), (o = e.reverb.wsPath) != null && o.trim() || t.push("reverb.wsPath"), e.reverb.scheme !== "http" && e.reverb.scheme !== "https" && t.push("reverb.scheme")) : t.push("reverb"), t.length > 0)
    throw new Error(`Configuración incompleta del chat: ${t.join(", ")}`);
}
function Ay({ config: e, children: t }) {
  dm(e);
  const [r] = ae(
    () => new zd({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: !1,
          retry: 1,
          staleTime: 1e3 * 60 * 2
        }
      }
    })
  ), { authToken: n } = e, [s, i] = ae(null), [o, d] = ae([]), [h, f] = ae(null), [p, g] = ae(null), [y, C] = ae(null), T = JSON.stringify([e.apiBaseUrl, e.applicationId, n]);
  Fe(() => {
    let E = !0;
    return n ? (am({
      apiBaseUrl: e.apiBaseUrl,
      authToken: n
    }), (async () => {
      var D;
      try {
        const O = await um(), L = (await lm(O.data.data.id)).data.data, te = ((D = (await cm({
          userId: L.attributes.user_auth_id,
          applicationId: e.applicationId
        })).data.data) == null ? void 0 : D.map((Q) => Q.attributes.name)) ?? [];
        if (!(L != null && L.id))
          throw new Error("La respuesta no contiene un usuario válido para el chat");
        E && (i(L), d(te), f(T), g(null), C(null));
      } catch (O) {
        E && (console.error("Error al cargar el usuario en ChatProvider:", O), g(O instanceof Error ? O : new Error("Error al inicializar el chat")), C(T));
      }
    })(), () => {
      E = !1;
    }) : () => {
      E = !1;
    };
  }, [n, e.apiBaseUrl, e.applicationId, T]);
  const P = (E) => {
    i(E);
  }, A = zt(() => s != null && s.id ? String(s.id) : "", [s]), N = !!(s != null && s.id) && h === T, w = y === T && p !== null, _ = {
    currentUser: s,
    currentUserId: A,
    permissions: o,
    isLoadingUser: !!n && !N && !w,
    hasError: w,
    error: w ? p : null,
    config: e,
    setCurrentUser: P
  };
  return /* @__PURE__ */ u(ld, { client: r, children: /* @__PURE__ */ u(wa.Provider, { value: _, children: t }) });
}
function Dy() {
  return sn(wa);
}
function kt() {
  const e = sn(wa);
  if (!e)
    throw new Error("useChatContext debe usarse dentro de un ChatProvider con un usuario válido");
  return e;
}
const hm = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, fm = (e, t) => ({
  classGroupId: e,
  validator: t
}), cl = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), os = "-", Mi = [], mm = "arbitrary..", pm = (e) => {
  const t = bm(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (o) => {
      if (o.startsWith("[") && o.endsWith("]"))
        return gm(o);
      const d = o.split(os), h = d[0] === "" && d.length > 1 ? 1 : 0;
      return ul(d, h, t);
    },
    getConflictingClassGroupIds: (o, d) => {
      if (d) {
        const h = n[o], f = r[o];
        return h ? f ? hm(f, h) : h : f || Mi;
      }
      return r[o] || Mi;
    }
  };
}, ul = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const s = e[t], i = r.nextPart.get(s);
  if (i) {
    const f = ul(e, t + 1, i);
    if (f) return f;
  }
  const o = r.validators;
  if (o === null)
    return;
  const d = t === 0 ? e.join(os) : e.slice(t).join(os), h = o.length;
  for (let f = 0; f < h; f++) {
    const p = o[f];
    if (p.validator(d))
      return p.classGroupId;
  }
}, gm = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? mm + n : void 0;
})(), bm = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return ym(r, t);
}, ym = (e, t) => {
  const r = cl();
  for (const n in e) {
    const s = e[n];
    ka(s, r, n, t);
  }
  return r;
}, ka = (e, t, r, n) => {
  const s = e.length;
  for (let i = 0; i < s; i++) {
    const o = e[i];
    xm(o, t, r, n);
  }
}, xm = (e, t, r, n) => {
  if (typeof e == "string") {
    vm(e, t, r);
    return;
  }
  if (typeof e == "function") {
    wm(e, t, r, n);
    return;
  }
  km(e, t, r, n);
}, vm = (e, t, r) => {
  const n = e === "" ? t : dl(t, e);
  n.classGroupId = r;
}, wm = (e, t, r, n) => {
  if (Sm(e)) {
    ka(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(fm(r, e));
}, km = (e, t, r, n) => {
  const s = Object.entries(e), i = s.length;
  for (let o = 0; o < i; o++) {
    const [d, h] = s[o];
    ka(h, dl(t, d), r, n);
  }
}, dl = (e, t) => {
  let r = e;
  const n = t.split(os), s = n.length;
  for (let i = 0; i < s; i++) {
    const o = n[i];
    let d = r.nextPart.get(o);
    d || (d = cl(), r.nextPart.set(o, d)), r = d;
  }
  return r;
}, Sm = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Nm = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
  const s = (i, o) => {
    r[i] = o, t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(i) {
      let o = r[i];
      if (o !== void 0)
        return o;
      if ((o = n[i]) !== void 0)
        return s(i, o), o;
    },
    set(i, o) {
      i in r ? r[i] = o : s(i, o);
    }
  };
}, ia = "!", zi = ":", Cm = [], Li = (e, t, r, n, s) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: s
}), _m = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (s) => {
    const i = [];
    let o = 0, d = 0, h = 0, f;
    const p = s.length;
    for (let P = 0; P < p; P++) {
      const A = s[P];
      if (o === 0 && d === 0) {
        if (A === zi) {
          i.push(s.slice(h, P)), h = P + 1;
          continue;
        }
        if (A === "/") {
          f = P;
          continue;
        }
      }
      A === "[" ? o++ : A === "]" ? o-- : A === "(" ? d++ : A === ")" && d--;
    }
    const g = i.length === 0 ? s : s.slice(h);
    let y = g, C = !1;
    g.endsWith(ia) ? (y = g.slice(0, -1), C = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      g.startsWith(ia) && (y = g.slice(1), C = !0)
    );
    const T = f && f > h ? f - h : void 0;
    return Li(i, C, y, T);
  };
  if (t) {
    const s = t + zi, i = n;
    n = (o) => o.startsWith(s) ? i(o.slice(s.length)) : Li(Cm, !1, o, void 0, !0);
  }
  if (r) {
    const s = n;
    n = (i) => r({
      className: i,
      parseClassName: s
    });
  }
  return n;
}, Tm = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, n) => {
    t.set(r, 1e6 + n);
  }), (r) => {
    const n = [];
    let s = [];
    for (let i = 0; i < r.length; i++) {
      const o = r[i], d = o[0] === "[", h = t.has(o);
      d || h ? (s.length > 0 && (s.sort(), n.push(...s), s = []), n.push(o)) : s.push(o);
    }
    return s.length > 0 && (s.sort(), n.push(...s)), n;
  };
}, Pm = (e) => ({
  cache: Nm(e.cacheSize),
  parseClassName: _m(e),
  sortModifiers: Tm(e),
  postfixLookupClassGroupIds: Em(e),
  ...pm(e)
}), Em = (e) => {
  const t = /* @__PURE__ */ Object.create(null), r = e.postfixLookupClassGroups;
  if (r)
    for (let n = 0; n < r.length; n++)
      t[r[n]] = !0;
  return t;
}, Om = /\s+/, Rm = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: s,
    sortModifiers: i,
    postfixLookupClassGroupIds: o
  } = t, d = [], h = e.trim().split(Om);
  let f = "";
  for (let p = h.length - 1; p >= 0; p -= 1) {
    const g = h[p], {
      isExternal: y,
      modifiers: C,
      hasImportantModifier: T,
      baseClassName: P,
      maybePostfixModifierPosition: A
    } = r(g);
    if (y) {
      f = g + (f.length > 0 ? " " + f : f);
      continue;
    }
    let N = !!A, w;
    if (N) {
      const D = P.substring(0, A);
      w = n(D);
      const O = w && o[w] ? n(P) : void 0;
      O && O !== w && (w = O, N = !1);
    } else
      w = n(P);
    if (!w) {
      if (!N) {
        f = g + (f.length > 0 ? " " + f : f);
        continue;
      }
      if (w = n(P), !w) {
        f = g + (f.length > 0 ? " " + f : f);
        continue;
      }
      N = !1;
    }
    const k = C.length === 0 ? "" : C.length === 1 ? C[0] : i(C).join(":"), _ = T ? k + ia : k, E = _ + w;
    if (d.indexOf(E) > -1)
      continue;
    d.push(E);
    const z = s(w, N);
    for (let D = 0; D < z.length; ++D) {
      const O = z[D];
      d.push(_ + O);
    }
    f = g + (f.length > 0 ? " " + f : f);
  }
  return f;
}, Am = (...e) => {
  let t = 0, r, n, s = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = hl(r)) && (s && (s += " "), s += n);
  return s;
}, hl = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = hl(e[n])) && (r && (r += " "), r += t);
  return r;
}, Dm = (e, ...t) => {
  let r, n, s, i;
  const o = (h) => {
    const f = t.reduce((p, g) => g(p), e());
    return r = Pm(f), n = r.cache.get, s = r.cache.set, i = d, d(h);
  }, d = (h) => {
    const f = n(h);
    if (f)
      return f;
    const p = Rm(h, r);
    return s(h, p), p;
  };
  return i = o, (...h) => i(Am(...h));
}, Mm = [], Ue = (e) => {
  const t = (r) => r[e] || Mm;
  return t.isThemeGetter = !0, t.themeKey = e, t;
}, fl = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ml = /^\((?:(\w[\w-]*):)?(.+)\)$/i, zm = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Lm = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, jm = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Fm = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Im = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Um = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Qt = (e) => zm.test(e), ie = (e) => !!e && !Number.isNaN(Number(e)), _t = (e) => !!e && Number.isInteger(Number(e)), js = (e) => e.endsWith("%") && ie(e.slice(0, -1)), It = (e) => Lm.test(e), pl = () => !0, qm = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  jm.test(e) && !Fm.test(e)
), Sa = () => !1, Hm = (e) => Im.test(e), Bm = (e) => Um.test(e), $m = (e) => !q(e) && !H(e), Wm = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Vm = (e) => or(e, yl, Sa), q = (e) => fl.test(e), hr = (e) => or(e, xl, qm), ji = (e) => or(e, ep, ie), Qm = (e) => or(e, wl, pl), Ym = (e) => or(e, vl, Sa), Fi = (e) => or(e, gl, Sa), Gm = (e) => or(e, bl, Bm), Gn = (e) => or(e, kl, Hm), H = (e) => ml.test(e), vn = (e) => Mr(e, xl), Xm = (e) => Mr(e, vl), Ii = (e) => Mr(e, gl), Km = (e) => Mr(e, yl), Jm = (e) => Mr(e, bl), Xn = (e) => Mr(e, kl, !0), Zm = (e) => Mr(e, wl, !0), or = (e, t, r) => {
  const n = fl.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Mr = (e, t, r = !1) => {
  const n = ml.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, gl = (e) => e === "position" || e === "percentage", bl = (e) => e === "image" || e === "url", yl = (e) => e === "length" || e === "size" || e === "bg-size", xl = (e) => e === "length", ep = (e) => e === "number", vl = (e) => e === "family-name", wl = (e) => e === "number" || e === "weight", kl = (e) => e === "shadow", tp = () => {
  const e = Ue("color"), t = Ue("font"), r = Ue("text"), n = Ue("font-weight"), s = Ue("tracking"), i = Ue("leading"), o = Ue("breakpoint"), d = Ue("container"), h = Ue("spacing"), f = Ue("radius"), p = Ue("shadow"), g = Ue("inset-shadow"), y = Ue("text-shadow"), C = Ue("drop-shadow"), T = Ue("blur"), P = Ue("perspective"), A = Ue("aspect"), N = Ue("ease"), w = Ue("animate"), k = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], _ = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], E = () => [..._(), H, q], z = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], O = () => [H, q, h], M = () => [Qt, "full", "auto", ...O()], L = () => [_t, "none", "subgrid", H, q], B = () => ["auto", {
    span: ["full", _t, H, q]
  }, _t, H, q], te = () => [_t, "auto", H, q], Q = () => ["auto", "min", "max", "fr", H, q], me = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], Z = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], K = () => ["auto", ...O()], Te = () => [Qt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...O()], ct = () => [d, Qt, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...O()], ut = () => [Qt, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...O()], U = () => [e, H, q], De = () => [..._(), Ii, Fi, {
    position: [H, q]
  }], de = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Ce = () => ["auto", "cover", "contain", Km, Vm, {
    size: [H, q]
  }], Me = () => [js, vn, hr], xe = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    f,
    H,
    q
  ], ce = () => ["", ie, vn, hr], ee = () => ["solid", "dashed", "dotted", "double"], _e = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => [ie, js, Ii, Fi], le = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    T,
    H,
    q
  ], dt = () => ["none", ie, H, q], Pe = () => ["none", ie, H, q], Ne = () => [ie, H, q], Re = () => [Qt, "full", ...O()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [It],
      breakpoint: [It],
      color: [pl],
      container: [It],
      "drop-shadow": [It],
      ease: ["in", "out", "in-out"],
      font: [$m],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [It],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [It],
      shadow: [It],
      spacing: ["px", ie],
      text: [It],
      "text-shadow": [It],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Qt, q, H, A]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", H, q]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [Wm],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ie, "auto", q, H, d]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": k()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": k()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: E()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: z()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": z()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": z()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: D()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": D()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": D()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: M()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": M()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": M()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": M(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: M()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": M(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: M()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": M()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": M()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: M()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: M()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: M()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: M()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [_t, "auto", H, q]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Qt, "full", "auto", d, ...O()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [ie, Qt, "auto", "initial", "none", q]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ie, H, q]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ie, H, q]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [_t, "first", "last", "none", H, q]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": L()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: B()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": te()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": te()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": L()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: B()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": te()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": te()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": Q()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Q()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: O()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": O()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": O()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...me(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...Z(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...Z()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...me()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...Z(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": me()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...Z(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...Z()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: O()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: O()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: O()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: O()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: O()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: O()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: O()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: O()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: O()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: O()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: O()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: K()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: K()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: K()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: K()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: K()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: K()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: K()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: K()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: K()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: K()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: K()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": O()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": O()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: Te()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...ct()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...ct()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...ct()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...ut()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...ut()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...ut()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [d, "screen", ...Te()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          d,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...Te()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          d,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [o]
          },
          ...Te()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...Te()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...Te()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...Te()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, vn, hr]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [n, Zm, Qm]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", js, q]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Xm, Ym, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [q]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [s, H, q]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ie, "none", H, ji]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...O()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", H, q]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", H, q]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: U()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: U()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...ee(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ie, "from-font", "auto", H, hr]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: U()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ie, "auto", H, q]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: O()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [_t, H, q]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", H, q]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", H, q]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: De()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: de()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Ce()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, _t, H, q],
          radial: ["", H, q],
          conic: ["", _t, H, q]
        }, Jm, Gm]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: U()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Me()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Me()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Me()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: U()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: U()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: U()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: xe()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": xe()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": xe()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": xe()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": xe()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": xe()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": xe()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": xe()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": xe()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": xe()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": xe()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": xe()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": xe()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": xe()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": xe()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ce()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ce()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ce()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ce()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ce()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": ce()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": ce()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ce()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ce()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ce()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ce()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ce()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": ce()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...ee(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ee(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: U()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": U()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": U()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": U()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": U()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": U()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": U()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": U()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": U()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": U()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": U()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: U()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ee(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ie, H, q]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ie, vn, hr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: U()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          // Deprecated since Tailwind CSS v4.0.0
          "inner",
          "none",
          p,
          Xn,
          Gn
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: U()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", g, Xn, Gn]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": U()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ce()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: U()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ie, hr]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": U()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ce()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": U()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", y, Xn, Gn]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": U()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ie, H, q]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [..._e(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": _e()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [ie]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": Y()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": Y()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": U()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": U()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": Y()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": Y()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": U()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": U()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": Y()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": Y()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": U()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": U()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": Y()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": Y()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": U()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": U()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": Y()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": Y()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": U()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": U()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": Y()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": Y()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": U()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": U()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": Y()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": Y()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": U()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": U()
      }],
      "mask-image-radial": [{
        "mask-radial": [H, q]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": Y()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": Y()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": U()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": U()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": _()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ie]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": Y()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": Y()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": U()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": U()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: De()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: de()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Ce()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", H, q]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          H,
          q
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: le()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ie, H, q]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ie, H, q]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          C,
          Xn,
          Gn
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": U()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ie, H, q]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ie, H, q]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ie, H, q]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ie, H, q]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ie, H, q]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          H,
          q
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": le()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ie, H, q]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ie, H, q]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ie, H, q]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ie, H, q]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ie, H, q]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ie, H, q]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ie, H, q]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ie, H, q]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": O()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": O()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": O()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", H, q]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [ie, "initial", H, q]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", N, H, q]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ie, H, q]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", w, H, q]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [P, H, q]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": E()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: dt()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": dt()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": dt()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": dt()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Pe()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Pe()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Pe()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Pe()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: Ne()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ne()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ne()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [H, q, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: E()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Re()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Re()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Re()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Re()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [_t, H, q]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: U()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: U()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", H, q]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": U()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": U()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": O()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": O()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": O()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": O()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": O()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": O()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": O()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": O()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": O()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": O()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": O()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": O()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": O()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": O()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": O()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": O()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": O()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": O()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": O()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": O()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": O()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": O()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", H, q]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...U()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ie, vn, hr, ji]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...U()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["start", "end", "right", "left"],
      "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["ps", "pe", "pr", "pl"],
      py: ["pbs", "pbe", "pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["ms", "me", "mr", "ml"],
      my: ["mbs", "mbe", "mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
      "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
      "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, rp = /* @__PURE__ */ Dm(tp);
function X(...e) {
  const t = [], r = (n) => {
    if (n) {
      if (typeof n == "string" || typeof n == "number")
        t.push(String(n));
      else if (Array.isArray(n))
        n.forEach(r);
      else if (typeof n == "object")
        for (const [s, i] of Object.entries(n))
          i && t.push(s);
    }
  };
  return e.forEach(r), rp(t.join(" "));
}
const ye = an(
  ({ className: e, variant: t = "default", size: r = "default", type: n = "button", disabled: s, children: i, ...o }, d) => {
    const h = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer", f = {
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
    return /* @__PURE__ */ u(
      "button",
      {
        ref: d,
        type: n,
        disabled: s,
        className: X(h, f[t], p[r], e),
        ...o,
        children: i
      }
    );
  }
);
ye.displayName = "ChatButton";
const Na = an(
  ({ className: e, type: t = "text", disabled: r, ...n }, s) => /* @__PURE__ */ u(
    "input",
    {
      ref: s,
      type: t,
      disabled: r,
      className: X(
        "flex h-9 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        e
      ),
      ...n
    }
  )
);
Na.displayName = "ChatInput";
const Ca = an(
  ({ className: e, disabled: t, ...r }, n) => /* @__PURE__ */ u(
    "textarea",
    {
      ref: n,
      disabled: t,
      className: X(
        "flex min-h-15 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        e
      ),
      ...r
    }
  )
);
Ca.displayName = "ChatTextarea";
function Wt({ className: e, variant: t = "default", children: r, ...n }) {
  return /* @__PURE__ */ u("span", { className: X("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200",
    outline: "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300",
    destructive: "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
  }[t], e), ...n, children: r });
}
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const np = (e) => e == null ? void 0 : e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function sp(e, t, r = []) {
  if (t == null)
    throw new Error("[lucide]: iconNode is required when icon name is used");
  return {
    name: np(e),
    size: 24,
    node: t,
    ...r.length > 0 ? { aliases: r } : {}
  };
}
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ap = (e) => {
  let t = "", r = !1;
  for (const n of e) {
    if (n === "-" || n === "_" || n <= " ") {
      r = t.length > 0;
      continue;
    }
    t.length === 0 ? t += n.toLowerCase() : t += r ? n.toUpperCase() : n, r = !1;
  }
  return t;
};
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ip = (e) => {
  const t = ap(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oa = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim();
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fr = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function Fs(e) {
  return e != null;
}
function op(e, t = {}) {
  var y, C;
  const r = t.attributeNames ?? {}, n = (T) => r[T] ?? T, s = e.size ?? e.width ?? fr.width, i = e.size ?? e.height ?? fr.height, o = ((y = e.aliases) == null ? void 0 : y.filter((T) => typeof T == "string" && T.trim() !== "").map((T) => `lucide-${T}`)) ?? [], d = [...e.name ? [`lucide-${e.name}`] : [], ...o], h = ((C = t.className) == null ? void 0 : C.split(" ").filter(Boolean)) ?? [], f = t.includeDefaultClasses === !1 ? oa(...h) : oa("lucide", ...d, ...h), p = t.absoluteStrokeWidth ? Number(t.strokeWidth ?? fr["stroke-width"]) * Number(e.size ?? e.width ?? fr.width) / Number(t.size ?? t.width ?? fr.width) : t.strokeWidth ?? fr["stroke-width"];
  return [
    "svg",
    {
      ...Object.entries(fr).reduce((T, [P, A]) => (T[n(P)] = A, T), {}),
      ..."color" in t && t.color && {
        [n("stroke")]: t.color
      },
      ..."size" in t && Fs(t.size) && {
        [n("width")]: t.size,
        [n("height")]: t.size
      },
      ..."width" in t && Fs(t.width) && {
        [n("width")]: t.width
      },
      ..."height" in t && Fs(t.height) && {
        [n("height")]: t.height
      },
      [n("stroke-width")]: p,
      ...f && {
        [n("class")]: f
      },
      [n("viewBox")]: `0 0 ${s} ${i}`,
      ...t.hasA11yProp === !1 ? {
        [n("aria-hidden")]: "true"
      } : {},
      ..."attributes" in t && t.attributes
    },
    e.node.map((T) => {
      const [P, A, N] = T, w = t.nonScalingStroke ? { [n("vector-effect")]: "non-scaling-stroke", ...A } : A;
      return N ? [P, w, N] : [P, w];
    })
  ];
}
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function lp(e, t = {}) {
  return op(e, {
    ...t,
    attributeNames: {
      ...t.attributeNames,
      class: "className",
      "stroke-width": "strokeWidth",
      "stroke-linecap": "strokeLinecap",
      "stroke-linejoin": "strokeLinejoin",
      "vector-effect": "vectorEffect"
    }
  });
}
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cp = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, up = nn({}), dp = () => sn(up), hp = an(
  ({
    color: e,
    size: t,
    width: r,
    height: n,
    strokeWidth: s,
    absoluteStrokeWidth: i,
    nonScalingStroke: o,
    className: d = "",
    children: h,
    iconNode: f = [],
    icon: p = {
      node: f,
      aliases: [],
      size: 24
    },
    ...g
  }, y) => {
    const {
      size: C = 24,
      strokeWidth: T = 2,
      absoluteStrokeWidth: P = !1,
      nonScalingStroke: A = !1,
      color: N = "currentColor",
      className: w = ""
    } = dp() ?? {}, k = !!h || cp(g), [_, E, z = []] = lp(p, {
      color: e ?? N,
      width: r ?? t ?? C,
      height: n ?? t ?? C,
      strokeWidth: s ?? T,
      absoluteStrokeWidth: i ?? P,
      nonScalingStroke: o ?? A,
      className: oa(w, d),
      hasA11yProp: k,
      attributes: g
    });
    return qs(
      _,
      {
        ref: y,
        ...E
      },
      [
        ...z.map(([D, O]) => qs(D, O)),
        ...Array.isArray(h) ? h : [h]
      ]
    );
  }
);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
function he(e, t = [], r = []) {
  const n = typeof e == "string" ? sp(e, t, r) : e, s = an(
    ({ className: i, ...o }, d) => qs(hp, {
      ref: d,
      icon: n,
      className: i,
      ...o
    })
  );
  return n.name && (s.displayName = ip(n.name)), s;
}
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sl = {
  name: "arrow-left",
  size: 24,
  node: [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ]
};
Sl.node;
const _a = he(Sl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nl = {
  name: "bot",
  size: 24,
  node: [
    ["path", { d: "M12 8V4H8", key: "hb8ula" }],
    ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
    ["path", { d: "M2 14h2", key: "vft8re" }],
    ["path", { d: "M20 14h2", key: "4cs60a" }],
    ["path", { d: "M15 13v2", key: "1xurst" }],
    ["path", { d: "M9 13v2", key: "rq6x2g" }]
  ]
};
Nl.node;
const fp = he(Nl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cl = {
  name: "calendar-days",
  size: 24,
  node: [
    ["path", { d: "M8 2v3", key: "1ioesn" }],
    ["path", { d: "M16 2v3", key: "otl347" }],
    ["rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", key: "h1oib" }],
    ["path", { d: "M3 9h18", key: "1pudct" }],
    ["path", { d: "M8 13h.01", key: "1sbv64" }],
    ["path", { d: "M12 13h.01", key: "y0uutt" }],
    ["path", { d: "M16 13h.01", key: "wip0gl" }],
    ["path", { d: "M8 17h.01", key: "p3bg7i" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }],
    ["path", { d: "M16 17h.01", key: "ql8jdd" }]
  ]
};
Cl.node;
const mp = he(Cl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _l = {
  name: "check-check",
  size: 24,
  node: [
    ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
    ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
  ]
};
_l.node;
const pp = he(_l);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tl = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
Tl.node;
const gp = he(Tl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pl = {
  name: "chevron-right",
  size: 24,
  node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]
};
Pl.node;
const Ui = he(Pl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const El = {
  name: "chevrons-down",
  size: 24,
  node: [
    ["path", { d: "m7 6 5 5 5-5", key: "1lc07p" }],
    ["path", { d: "m7 13 5 5 5-5", key: "1d48rs" }]
  ]
};
El.node;
const bp = he(El);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ol = {
  name: "circle-alert",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
  ],
  aliases: ["alert-circle"]
};
Ol.node;
const yp = he(Ol);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rl = {
  name: "circle-check",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m16 9-5.5 5.5L8 12", key: "xofnsj" }]
  ],
  aliases: ["check-circle-2"]
};
Rl.node;
const ls = he(Rl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Al = {
  name: "clock",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
  ]
};
Al.node;
const Ta = he(Al);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dl = {
  name: "download",
  size: 24,
  node: [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ]
};
Dl.node;
const xp = he(Dl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ml = {
  name: "file-text",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ]
};
Ml.node;
const vp = he(Ml);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zl = {
  name: "inbox",
  size: 24,
  node: [
    ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
    [
      "path",
      {
        d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
        key: "oot6mr"
      }
    ]
  ]
};
zl.node;
const wp = he(zl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ll = {
  name: "info",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ]
};
Ll.node;
const kp = he(Ll);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jl = {
  name: "life-buoy",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m4.93 4.93 4.24 4.24", key: "1ymg45" }],
    ["path", { d: "m14.83 9.17 4.24-4.24", key: "1cb5xl" }],
    ["path", { d: "m14.83 14.83 4.24 4.24", key: "q42g0n" }],
    ["path", { d: "m9.17 14.83-4.24 4.24", key: "bqpfvv" }],
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]
  ]
};
jl.node;
const la = he(jl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fl = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
Fl.node;
const rn = he(Fl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Il = {
  name: "lock",
  size: 24,
  node: [
    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
  ]
};
Il.node;
const Ar = he(Il);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ul = {
  name: "message-circle",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
        key: "1sd12s"
      }
    ]
  ]
};
Ul.node;
const Sp = he(Ul);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ql = {
  name: "message-square-plus",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ],
    ["path", { d: "M12 8v6", key: "1ib9pf" }],
    ["path", { d: "M9 11h6", key: "1fldmi" }]
  ]
};
ql.node;
const _n = he(ql);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hl = {
  name: "message-square",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ]
  ]
};
Hl.node;
const Np = he(Hl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bl = {
  name: "messages-square",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
        key: "1n2ejm"
      }
    ],
    [
      "path",
      {
        d: "M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1",
        key: "1qfcsi"
      }
    ]
  ]
};
Bl.node;
const Pa = he(Bl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $l = {
  name: "paperclip",
  size: 24,
  node: [
    [
      "path",
      {
        d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
        key: "1miecu"
      }
    ]
  ]
};
$l.node;
const qi = he($l);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wl = {
  name: "refresh-cw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
    ["path", { d: "M8 16H3v5", key: "1cv678" }]
  ]
};
Wl.node;
const Ea = he(Wl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vl = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
Vl.node;
const Cp = he(Vl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ql = {
  name: "search",
  size: 24,
  node: [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ]
};
Ql.node;
const Yl = he(Ql);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gl = {
  name: "send-horizontal",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
        key: "117uat"
      }
    ],
    ["path", { d: "M6 12h16", key: "s4cdu5" }]
  ],
  aliases: ["send-horizonal"]
};
Gl.node;
const Xl = he(Gl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kl = {
  name: "shield-check",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ]
};
Kl.node;
const Oa = he(Kl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jl = {
  name: "tag",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
        key: "vktsd0"
      }
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
  ]
};
Jl.node;
const _p = he(Jl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zl = {
  name: "ticket",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
        key: "qn84l0"
      }
    ],
    ["path", { d: "M13 5v2", key: "dyzc3o" }],
    ["path", { d: "M13 17v2", key: "1ont0d" }],
    ["path", { d: "M13 11v2", key: "1wjjxi" }]
  ]
};
Zl.node;
const Tp = he(Zl);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ec = {
  name: "triangle-alert",
  size: 24,
  node: [
    [
      "path",
      {
        d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
        key: "wmoenq"
      }
    ],
    ["path", { d: "M12 9v4", key: "juzpu7" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ],
  aliases: ["alert-triangle"]
};
ec.node;
const bs = he(ec);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tc = {
  name: "user",
  size: 24,
  node: [
    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
  ]
};
tc.node;
const cs = he(tc);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rc = {
  name: "users",
  size: 24,
  node: [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
  ]
};
rc.node;
const Ra = he(rc);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nc = {
  name: "wifi-off",
  size: 24,
  node: [
    ["path", { d: "M12 20h.01", key: "zekei9" }],
    ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
    ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
    ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
    ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
    ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }]
  ]
};
nc.node;
const sc = he(nc);
/**
 * @license lucide-react v1.46.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ac = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
ac.node;
const vt = he(ac);
function Pp(e) {
  if (!e) return "?";
  const t = e.trim().split(/\s+/);
  return t.length === 1 ? t[0].substring(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
}
const Hi = [
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
function Ep(e) {
  if (!e) return "#62748e";
  let t = 0;
  for (let r = 0; r < (e || "").length; r++)
    t = (t << 5) - t + (e || "").charCodeAt(r), t |= 0;
  return Hi[Math.abs(t) % Hi.length];
}
function ar({
  src: e,
  name: t = "",
  size: r = "md",
  isGroup: n = !1,
  status: s,
  className: i,
  ...o
}) {
  const [d, h] = ae(!1), f = {
    xs: { box: "size-6", text: "text-[10px]", icon: "size-3", statusDot: "size-1.5" },
    sm: { box: "size-8", text: "text-xs", icon: "size-3.5", statusDot: "size-2" },
    md: { box: "size-10", text: "text-sm", icon: "size-5", statusDot: "size-2.5" },
    lg: { box: "size-12", text: "text-base", icon: "size-6", statusDot: "size-3" },
    xl: { box: "size-16", text: "text-xl", icon: "size-8", statusDot: "size-3.5" }
  }, { box: p, text: g, icon: y, statusDot: C } = f[r], T = Pp(t), P = zt(() => Ep(t), [t]), A = !!e && !d;
  return /* @__PURE__ */ x("div", { className: X("relative inline-block shrink-0", p, i), ...o, children: [
    /* @__PURE__ */ u(
      "div",
      {
        className: X(
          "flex size-full items-center justify-center overflow-hidden rounded-full font-semibold shadow-xs select-none",
          !A && (n ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300" : "font-semibold text-xs")
        ),
        style: !A && !n ? {
          backgroundColor: `${P}33`,
          color: `${P}FF`,
          fontWeight: "bold"
        } : void 0,
        children: A ? /* @__PURE__ */ u(
          "img",
          {
            src: e,
            alt: t || "Avatar",
            onError: () => h(!0),
            className: "size-full object-cover",
            loading: "lazy"
          }
        ) : n ? /* @__PURE__ */ u(Ra, { className: y }) : /* @__PURE__ */ u("span", { className: X("font-bold tracking-tight", g), children: T })
      }
    ),
    s && /* @__PURE__ */ u(
      "span",
      {
        className: X(
          "absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-neutral-900",
          C,
          s === "online" && "bg-emerald-500",
          s === "offline" && "bg-neutral-400",
          s === "busy" && "bg-amber-500"
        )
      }
    )
  ] });
}
const ic = nn(null);
function Op() {
  const e = sn(ic);
  if (!e)
    throw new Error("Los subcomponentes de Dialog deben usarse dentro de <Dialog>");
  return e;
}
function Rp({ open: e, onOpenChange: t, children: r }) {
  return Fe(() => {
    if (!e) return;
    const n = (i) => {
      i.key === "Escape" && t(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", n);
    };
  }, [e, t]), /* @__PURE__ */ u(ic.Provider, { value: { open: e, onOpenChange: t }, children: r });
}
function Ap({ className: e, children: t, showClose: r = !0, ...n }) {
  const { open: s, onOpenChange: i } = Op(), o = je(null);
  return !s || typeof window > "u" ? null : go(
    /* @__PURE__ */ u(
      "div",
      {
        ref: o,
        onClick: (h) => {
          h.target === o.current && i(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ x(
          "div",
          {
            role: "dialog",
            "aria-modal": "true",
            className: X(
              "relative w-full max-w-lg rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden transition-all animate-in zoom-in-95 duration-150 text-neutral-900 dark:text-neutral-100",
              e
            ),
            ...n,
            children: [
              r && /* @__PURE__ */ u(
                "button",
                {
                  type: "button",
                  onClick: () => i(!1),
                  "aria-label": "Cerrar",
                  className: "absolute right-3.5 top-3.5 z-20 rounded-lg p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer",
                  children: /* @__PURE__ */ u(vt, { className: "size-4" })
                }
              ),
              t
            ]
          }
        )
      }
    ),
    document.body
  );
}
function Dp({ className: e, ...t }) {
  return /* @__PURE__ */ u("div", { className: X("flex flex-col gap-1.5 text-left p-5 pb-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", e), ...t });
}
function Mp({ className: e, ...t }) {
  return /* @__PURE__ */ u("h3", { className: X("text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100", e), ...t });
}
function zp({ className: e, ...t }) {
  return /* @__PURE__ */ u("p", { className: X("text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", e), ...t });
}
function Lp({ className: e, ...t }) {
  return /* @__PURE__ */ u("div", { className: X("flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70", e), ...t });
}
const oc = nn(null);
function lc() {
  const e = sn(oc);
  if (!e)
    throw new Error("Los subcomponentes de AlertDialog deben usarse dentro de <AlertDialog>");
  return e;
}
function jp({ open: e, onOpenChange: t, children: r }) {
  return Fe(() => {
    if (!e) return;
    const n = (i) => {
      i.key === "Escape" && t(!1);
    }, s = document.body.style.overflow;
    return document.body.style.overflow = "hidden", window.addEventListener("keydown", n), () => {
      document.body.style.overflow = s, window.removeEventListener("keydown", n);
    };
  }, [e, t]), /* @__PURE__ */ u(oc.Provider, { value: { open: e, onOpenChange: t }, children: r });
}
function Fp({ className: e, children: t, ...r }) {
  const { open: n, onOpenChange: s } = lc(), i = je(null);
  return !n || typeof window > "u" ? null : go(
    /* @__PURE__ */ u(
      "div",
      {
        ref: i,
        onClick: (d) => {
          d.target === i.current && s(!1);
        },
        className: "sdi-messenger-root fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150",
        children: /* @__PURE__ */ u(
          "div",
          {
            role: "alertdialog",
            "aria-modal": "true",
            className: X(
              "relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl p-5 text-neutral-900 dark:text-neutral-100 transition-all animate-in zoom-in-95 duration-150",
              e
            ),
            ...r,
            children: t
          }
        )
      }
    ),
    document.body
  );
}
function Ip({ className: e, ...t }) {
  return /* @__PURE__ */ u("div", { className: X("flex flex-col gap-2 text-left", e), ...t });
}
function Up({ className: e, ...t }) {
  return /* @__PURE__ */ u("h3", { className: X("text-sm font-bold text-neutral-900 dark:text-neutral-100", e), ...t });
}
function qp({ className: e, ...t }) {
  return /* @__PURE__ */ u("p", { className: X("text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", e), ...t });
}
function Hp({ className: e, ...t }) {
  return /* @__PURE__ */ u("div", { className: X("flex items-center justify-end gap-2 mt-4", e), ...t });
}
function Bp({
  className: e,
  onClick: t,
  children: r,
  ...n
}) {
  const { onOpenChange: s } = lc();
  return /* @__PURE__ */ u(
    ye,
    {
      variant: "outline",
      size: "sm",
      onClick: (i) => {
        s(!1), t == null || t(i);
      },
      className: X("text-xs", e),
      ...n,
      children: r || "Cancelar"
    }
  );
}
function $p({
  className: e,
  variant: t = "danger",
  size: r = "sm",
  ...n
}) {
  return /* @__PURE__ */ u(ye, { variant: t, size: r, className: X("text-xs font-semibold", e), ...n });
}
nn(null);
const cc = nn(null);
function Wp() {
  const e = sn(cc);
  if (!e)
    throw new Error("Los subcomponentes de Tabs deben usarse dentro de <Tabs>");
  return e;
}
function uc({
  value: e,
  defaultValue: t = "",
  onValueChange: r,
  className: n,
  children: s,
  ...i
}) {
  const [o, d] = ae(t), h = e !== void 0, f = h ? e : o, p = h ? r : d;
  return /* @__PURE__ */ u(cc.Provider, { value: { value: f, onValueChange: p }, children: /* @__PURE__ */ u("div", { className: X("flex flex-col gap-2 w-full", n), ...i, children: s }) });
}
function dc({ className: e, children: t, ...r }) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: X(
        "flex w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 text-neutral-500 dark:text-neutral-400 gap-1",
        e
      ),
      ...r,
      children: t
    }
  );
}
function us({ value: e, className: t, children: r, ...n }) {
  const { value: s, onValueChange: i } = Wp(), o = s === e;
  return /* @__PURE__ */ u(
    "button",
    {
      type: "button",
      role: "tab",
      "aria-selected": o,
      onClick: () => i(e),
      className: X(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none cursor-pointer",
        o ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/5",
        t
      ),
      ...n,
      children: r
    }
  );
}
const jn = an(
  ({ className: e, children: t, ...r }, n) => /* @__PURE__ */ u(
    "div",
    {
      ref: n,
      className: X(
        "relative overflow-y-auto overflow-x-hidden [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0)_transparent] [transition:scrollbar-color_200ms_ease] hover:[scrollbar-color:rgba(156,163,175,0.7)_transparent]",
        e
      ),
      ...r,
      children: t
    }
  )
);
jn.displayName = "ChatScrollArea";
function Vp({
  orientation: e = "horizontal",
  className: t,
  ...r
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      role: "separator",
      "aria-orientation": e,
      className: X(
        "shrink-0 bg-neutral-200 dark:bg-neutral-800",
        e === "horizontal" ? "h-px w-full" : "h-full w-px",
        t
      ),
      ...r
    }
  );
}
function Qp({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: X(
        "rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100",
        e
      ),
      ...t
    }
  );
}
function oe({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: X(
        "animate-pulse rounded-lg bg-neutral-200/80 dark:bg-neutral-800/80",
        e
      ),
      ...t
    }
  );
}
function Yp(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], r = document.createElement("style");
  r.type = "text/css", t.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e));
}
Array(12).fill(0);
let Gp = 1;
const Xp = 100, Bi = (e) => {
  var t;
  return typeof (e == null ? void 0 : e.id) == "number" || (e == null || (t = e.id) == null ? void 0 : t.length) > 0 ? e.id : Gp++;
};
class Kp {
  constructor() {
    this.subscribe = (t) => (this.subscribers.push(t), this.getActiveToasts().forEach((r) => t(r)), () => {
      const r = this.subscribers.indexOf(t);
      this.subscribers.splice(r, 1);
    }), this.publish = (t) => {
      this.subscribers.forEach((r) => r(t));
    }, this.addToast = (t) => {
      this.publish(t), this.toasts = [
        ...this.toasts,
        t
      ], this.trimHistory();
    }, this.trimHistory = () => {
      let t = this.toasts.length - Xp;
      t <= 0 || (this.toasts = this.toasts.filter((r) => t > 0 && this.dismissedToasts.has(r.id) ? (this.dismissedToasts.delete(r.id), t--, !1) : !0));
    }, this.create = (t) => {
      const { message: r, ...n } = t, s = Bi(t), i = this.pendingDismissals.get(s);
      i !== void 0 && (cancelAnimationFrame(i), this.pendingDismissals.delete(s), this.dismissedToasts.delete(s));
      const o = this.dismissedToasts.has(s), d = t.dismissible === void 0 ? !0 : t.dismissible;
      return o && (this.dismissedToasts.delete(s), this.toasts = this.toasts.filter((f) => f.id !== s)), (o ? void 0 : this.toasts.find((f) => f.id === s)) ? this.toasts = this.toasts.map((f) => f.id === s ? (this.publish({
        ...f,
        ...t,
        id: s,
        title: r
      }), {
        ...f,
        ...t,
        id: s,
        dismissible: d,
        title: r
      }) : f) : this.addToast({
        title: r,
        ...n,
        dismissible: d,
        id: s
      }), s;
    }, this.dismiss = (t) => {
      if (t == null)
        return this.getActiveToasts().forEach((n) => {
          this.dismissedToasts.add(n.id), this.subscribers.forEach((s) => s({
            id: n.id,
            dismiss: !0
          }));
        }), t;
      this.dismissedToasts.add(t);
      const r = this.pendingDismissals.get(t);
      return r !== void 0 && cancelAnimationFrame(r), this.pendingDismissals.set(t, requestAnimationFrame(() => {
        this.pendingDismissals.delete(t), this.subscribers.forEach((n) => n({
          id: t,
          dismiss: !0
        }));
      })), t;
    }, this.message = (t, r) => this.create({
      ...r,
      message: t,
      type: void 0
    }), this.error = (t, r) => this.create({
      ...r,
      message: t,
      type: "error"
    }), this.success = (t, r) => this.create({
      ...r,
      type: "success",
      message: t
    }), this.info = (t, r) => this.create({
      ...r,
      type: "info",
      message: t
    }), this.warning = (t, r) => this.create({
      ...r,
      type: "warning",
      message: t
    }), this.loading = (t, r) => this.create({
      ...r,
      type: "loading",
      message: t
    }), this.promise = (t, r) => {
      if (!r)
        return;
      let n;
      r.loading !== void 0 && (n = this.create({
        ...r,
        promise: t,
        type: "loading",
        message: r.loading,
        description: typeof r.description != "function" ? r.description : void 0
      }));
      const s = Promise.resolve(t instanceof Function ? t() : t);
      let i = n !== void 0, o;
      const d = s.then(async (f) => {
        if (o = [
          "resolve",
          f
        ], gn.isValidElement(f))
          i = !1, this.create({
            id: n,
            type: "default",
            message: f
          });
        else if (Zp(f) && !f.ok) {
          i = !1;
          const g = typeof r.error == "function" ? await r.error(`HTTP error! status: ${f.status}`) : r.error, y = typeof r.description == "function" ? await r.description(`HTTP error! status: ${f.status}`) : r.description, T = typeof g == "object" && !gn.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: n,
            type: "error",
            description: y,
            ...T
          });
        } else if (f instanceof Error) {
          i = !1;
          const g = typeof r.error == "function" ? await r.error(f) : r.error, y = typeof r.description == "function" ? await r.description(f) : r.description, T = typeof g == "object" && !gn.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: n,
            type: "error",
            description: y,
            ...T
          });
        } else if (r.success !== void 0) {
          i = !1;
          const g = typeof r.success == "function" ? await r.success(f) : r.success, y = typeof r.description == "function" ? await r.description(f) : r.description, T = typeof g == "object" && !gn.isValidElement(g) ? g : {
            message: g
          };
          this.create({
            id: n,
            type: "success",
            description: y,
            ...T
          });
        }
      }).catch(async (f) => {
        if (o = [
          "reject",
          f
        ], r.error !== void 0) {
          i = !1;
          const p = typeof r.error == "function" ? await r.error(f) : r.error, g = typeof r.description == "function" ? await r.description(f) : r.description, C = typeof p == "object" && !gn.isValidElement(p) ? p : {
            message: p
          };
          this.create({
            id: n,
            type: "error",
            description: g,
            ...C
          });
        }
      }).finally(() => {
        i && (this.dismiss(n), n = void 0), r.finally == null || r.finally.call(r);
      }), h = () => new Promise((f, p) => d.then(() => o[0] === "reject" ? p(o[1]) : f(o[1])).catch(p));
      return typeof n != "string" && typeof n != "number" ? {
        unwrap: h
      } : Object.assign(n, {
        unwrap: h
      });
    }, this.custom = (t, r) => {
      const n = Bi(r);
      return this.create({
        ...r,
        jsx: t(n),
        id: n,
        type: void 0
      }), n;
    }, this.getActiveToasts = () => this.toasts.filter((t) => !this.dismissedToasts.has(t.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set(), this.pendingDismissals = /* @__PURE__ */ new Map();
  }
}
const bt = new Kp(), Jp = (e, t) => bt.message(e, t), Zp = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", e0 = Jp, t0 = () => bt.toasts, r0 = () => bt.getActiveToasts(), xt = Object.assign(e0, {
  success: bt.success,
  info: bt.info,
  warning: bt.warning,
  error: bt.error,
  custom: bt.custom,
  message: bt.message,
  promise: bt.promise,
  dismiss: bt.dismiss,
  loading: bt.loading
}, {
  getHistory: t0,
  getToasts: r0
});
Yp("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
const Tn = (e) => e ? e.toLowerCase().split(" ").filter(Boolean).map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ") : "", Fn = (e) => !!e.attributes.is_group, In = (e, t) => {
  var s;
  const r = ((s = e.relationships) == null ? void 0 : s.users) || [];
  if (!t)
    return r[0];
  const n = String(t);
  return r.find((i) => String(i.id) !== n) || r[0];
}, un = (e, t) => {
  var s;
  if (Fn(e))
    return e.attributes.name || "Grupo";
  const r = In(e, t), n = ((s = r == null ? void 0 : r.attributes) == null ? void 0 : s.name) || e.attributes.name || "Usuario";
  return Tn(n);
}, hc = 6048e5, n0 = 864e5, fc = 6e4, mc = 36e5, $i = Symbol.for("constructDateFrom");
function ot(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && $i in e ? e[$i](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function lt(e, t) {
  return ot(t || e, e);
}
function s0(e, t, r) {
  const n = lt(e, r == null ? void 0 : r.in);
  return isNaN(t) ? ot(e, NaN) : (n.setDate(n.getDate() + t), n);
}
let a0 = {};
function ys() {
  return a0;
}
function Dr(e, t) {
  var d, h, f, p;
  const r = ys(), n = (t == null ? void 0 : t.weekStartsOn) ?? ((h = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : h.weekStartsOn) ?? r.weekStartsOn ?? ((p = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : p.weekStartsOn) ?? 0, s = lt(e, t == null ? void 0 : t.in), i = s.getDay(), o = (i < n ? 7 : 0) + i - n;
  return s.setDate(s.getDate() - o), s.setHours(0, 0, 0, 0), s;
}
function ds(e, t) {
  return Dr(e, { ...t, weekStartsOn: 1 });
}
function pc(e, t) {
  const r = lt(e, t == null ? void 0 : t.in), n = r.getFullYear(), s = ot(r, 0);
  s.setFullYear(n + 1, 0, 4), s.setHours(0, 0, 0, 0);
  const i = ds(s), o = ot(r, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const d = ds(o);
  return r.getTime() >= i.getTime() ? n + 1 : r.getTime() >= d.getTime() ? n : n - 1;
}
function Wi(e) {
  const t = lt(e), r = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return r.setUTCFullYear(t.getFullYear()), +e - +r;
}
function Aa(e, ...t) {
  const r = ot.bind(
    null,
    e || t.find((n) => typeof n == "object")
  );
  return t.map(r);
}
function hs(e, t) {
  const r = lt(e, t == null ? void 0 : t.in);
  return r.setHours(0, 0, 0, 0), r;
}
function i0(e, t, r) {
  const [n, s] = Aa(
    r == null ? void 0 : r.in,
    e,
    t
  ), i = hs(n), o = hs(s), d = +i - Wi(i), h = +o - Wi(o);
  return Math.round((d - h) / n0);
}
function o0(e, t) {
  const r = pc(e, t), n = ot(e, 0);
  return n.setFullYear(r, 0, 4), n.setHours(0, 0, 0, 0), ds(n);
}
function Da(e) {
  return ot(e, Date.now());
}
function gc(e, t, r) {
  const [n, s] = Aa(
    r == null ? void 0 : r.in,
    e,
    t
  );
  return +hs(n) == +hs(s);
}
function l0(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function bc(e) {
  return !(!l0(e) && typeof e != "number" || isNaN(+lt(e)));
}
function c0(e, t) {
  const r = lt(e, t == null ? void 0 : t.in);
  return r.setFullYear(r.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r;
}
const u0 = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, d0 = (e, t, r) => {
  let n;
  const s = u0[e];
  return typeof s == "string" ? n = s : t === 1 ? n = s.one : n = s.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "in " + n : n + " ago" : n;
};
function qr(e) {
  return (t = {}) => {
    const r = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[r] || e.formats[e.defaultWidth];
  };
}
const h0 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, f0 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, m0 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, p0 = {
  date: qr({
    formats: h0,
    defaultWidth: "full"
  }),
  time: qr({
    formats: f0,
    defaultWidth: "full"
  }),
  dateTime: qr({
    formats: m0,
    defaultWidth: "full"
  })
}, g0 = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, b0 = (e, t, r, n) => g0[e];
function Rt(e) {
  return (t, r) => {
    const n = r != null && r.context ? String(r.context) : "standalone";
    let s;
    if (n === "formatting" && e.formattingValues) {
      const o = e.defaultFormattingWidth || e.defaultWidth, d = r != null && r.width ? String(r.width) : o;
      s = e.formattingValues[d] || e.formattingValues[o];
    } else {
      const o = e.defaultWidth, d = r != null && r.width ? String(r.width) : e.defaultWidth;
      s = e.values[d] || e.values[o];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return s[i];
  };
}
const y0 = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, x0 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, v0 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, w0 = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, k0 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, S0 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, N0 = (e, t) => {
  const r = Number(e), n = r % 100;
  if (n > 20 || n < 10)
    switch (n % 10) {
      case 1:
        return r + "st";
      case 2:
        return r + "nd";
      case 3:
        return r + "rd";
    }
  return r + "th";
}, C0 = {
  ordinalNumber: N0,
  era: Rt({
    values: y0,
    defaultWidth: "wide"
  }),
  quarter: Rt({
    values: x0,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Rt({
    values: v0,
    defaultWidth: "wide"
  }),
  day: Rt({
    values: w0,
    defaultWidth: "wide"
  }),
  dayPeriod: Rt({
    values: k0,
    defaultWidth: "wide",
    formattingValues: S0,
    defaultFormattingWidth: "wide"
  })
};
function At(e) {
  return (t, r = {}) => {
    const n = r.width, s = n && e.matchPatterns[n] || e.matchPatterns[e.defaultMatchWidth], i = t.match(s);
    if (!i)
      return null;
    const o = i[0], d = n && e.parsePatterns[n] || e.parsePatterns[e.defaultParseWidth], h = Array.isArray(d) ? T0(d, (g) => g.test(o)) : (
      // [TODO] -- I challenge you to fix the type
      _0(d, (g) => g.test(o))
    );
    let f;
    f = e.valueCallback ? e.valueCallback(h) : h, f = r.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      r.valueCallback(f)
    ) : f;
    const p = t.slice(o.length);
    return { value: f, rest: p };
  };
}
function _0(e, t) {
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r) && t(e[r]))
      return r;
}
function T0(e, t) {
  for (let r = 0; r < e.length; r++)
    if (t(e[r]))
      return r;
}
function yc(e) {
  return (t, r = {}) => {
    const n = t.match(e.matchPattern);
    if (!n) return null;
    const s = n[0], i = t.match(e.parsePattern);
    if (!i) return null;
    let o = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    o = r.valueCallback ? r.valueCallback(o) : o;
    const d = t.slice(s.length);
    return { value: o, rest: d };
  };
}
const P0 = /^(\d+)(th|st|nd|rd)?/i, E0 = /\d+/i, O0 = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, R0 = {
  any: [/^b/i, /^(a|c)/i]
}, A0 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, D0 = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, M0 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, z0 = {
  narrow: [
    /^j/i,
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
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, L0 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, j0 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, F0 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, I0 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, U0 = {
  ordinalNumber: yc({
    matchPattern: P0,
    parsePattern: E0,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: At({
    matchPatterns: O0,
    defaultMatchWidth: "wide",
    parsePatterns: R0,
    defaultParseWidth: "any"
  }),
  quarter: At({
    matchPatterns: A0,
    defaultMatchWidth: "wide",
    parsePatterns: D0,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: At({
    matchPatterns: M0,
    defaultMatchWidth: "wide",
    parsePatterns: z0,
    defaultParseWidth: "any"
  }),
  day: At({
    matchPatterns: L0,
    defaultMatchWidth: "wide",
    parsePatterns: j0,
    defaultParseWidth: "any"
  }),
  dayPeriod: At({
    matchPatterns: F0,
    defaultMatchWidth: "any",
    parsePatterns: I0,
    defaultParseWidth: "any"
  })
}, q0 = {
  code: "en-US",
  formatDistance: d0,
  formatLong: p0,
  formatRelative: b0,
  localize: C0,
  match: U0,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function H0(e, t) {
  const r = lt(e, t == null ? void 0 : t.in);
  return i0(r, c0(r)) + 1;
}
function B0(e, t) {
  const r = lt(e, t == null ? void 0 : t.in), n = +ds(r) - +o0(r);
  return Math.round(n / hc) + 1;
}
function xc(e, t) {
  var p, g, y, C;
  const r = lt(e, t == null ? void 0 : t.in), n = r.getFullYear(), s = ys(), i = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((g = (p = t == null ? void 0 : t.locale) == null ? void 0 : p.options) == null ? void 0 : g.firstWeekContainsDate) ?? s.firstWeekContainsDate ?? ((C = (y = s.locale) == null ? void 0 : y.options) == null ? void 0 : C.firstWeekContainsDate) ?? 1, o = ot((t == null ? void 0 : t.in) || e, 0);
  o.setFullYear(n + 1, 0, i), o.setHours(0, 0, 0, 0);
  const d = Dr(o, t), h = ot((t == null ? void 0 : t.in) || e, 0);
  h.setFullYear(n, 0, i), h.setHours(0, 0, 0, 0);
  const f = Dr(h, t);
  return +r >= +d ? n + 1 : +r >= +f ? n : n - 1;
}
function $0(e, t) {
  var d, h, f, p;
  const r = ys(), n = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((h = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : h.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((p = (f = r.locale) == null ? void 0 : f.options) == null ? void 0 : p.firstWeekContainsDate) ?? 1, s = xc(e, t), i = ot((t == null ? void 0 : t.in) || e, 0);
  return i.setFullYear(s, 0, n), i.setHours(0, 0, 0, 0), Dr(i, t);
}
function W0(e, t) {
  const r = lt(e, t == null ? void 0 : t.in), n = +Dr(r, t) - +$0(r, t);
  return Math.round(n / hc) + 1;
}
function ke(e, t) {
  const r = e < 0 ? "-" : "", n = Math.abs(e).toString().padStart(t, "0");
  return r + n;
}
const Yt = {
  // Year
  y(e, t) {
    const r = e.getFullYear(), n = r > 0 ? r : 1 - r;
    return ke(t === "yy" ? n % 100 : n, t.length);
  },
  // Month
  M(e, t) {
    const r = e.getMonth();
    return t === "M" ? String(r + 1) : ke(r + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ke(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const r = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return r.toUpperCase();
      case "aaa":
        return r;
      case "aaaaa":
        return r[0];
      case "aaaa":
      default:
        return r === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return ke(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ke(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ke(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ke(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const r = t.length, n = e.getMilliseconds(), s = Math.trunc(
      n * Math.pow(10, r - 3)
    );
    return ke(s, t.length);
  }
}, Fr = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Vi = {
  // Era
  G: function(e, t, r) {
    const n = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return r.era(n, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return r.era(n, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return r.era(n, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, r) {
    if (t === "yo") {
      const n = e.getFullYear(), s = n > 0 ? n : 1 - n;
      return r.ordinalNumber(s, { unit: "year" });
    }
    return Yt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, r, n) {
    const s = xc(e, n), i = s > 0 ? s : 1 - s;
    if (t === "YY") {
      const o = i % 100;
      return ke(o, 2);
    }
    return t === "Yo" ? r.ordinalNumber(i, { unit: "year" }) : ke(i, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const r = pc(e);
    return ke(r, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const r = e.getFullYear();
    return ke(r, t.length);
  },
  // Quarter
  Q: function(e, t, r) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "Q":
        return String(n);
      // 01, 02, 03, 04
      case "QQ":
        return ke(n, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return r.ordinalNumber(n, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return r.quarter(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return r.quarter(n, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return r.quarter(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, r) {
    const n = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      // 1, 2, 3, 4
      case "q":
        return String(n);
      // 01, 02, 03, 04
      case "qq":
        return ke(n, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return r.ordinalNumber(n, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return r.quarter(n, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return r.quarter(n, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return r.quarter(n, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, r) {
    const n = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return Yt.M(e, t);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return r.ordinalNumber(n + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return r.month(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return r.month(n, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return r.month(n, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, r) {
    const n = e.getMonth();
    switch (t) {
      // 1, 2, ..., 12
      case "L":
        return String(n + 1);
      // 01, 02, ..., 12
      case "LL":
        return ke(n + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return r.ordinalNumber(n + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return r.month(n, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return r.month(n, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return r.month(n, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, r, n) {
    const s = W0(e, n);
    return t === "wo" ? r.ordinalNumber(s, { unit: "week" }) : ke(s, t.length);
  },
  // ISO week of year
  I: function(e, t, r) {
    const n = B0(e);
    return t === "Io" ? r.ordinalNumber(n, { unit: "week" }) : ke(n, t.length);
  },
  // Day of the month
  d: function(e, t, r) {
    return t === "do" ? r.ordinalNumber(e.getDate(), { unit: "date" }) : Yt.d(e, t);
  },
  // Day of year
  D: function(e, t, r) {
    const n = H0(e);
    return t === "Do" ? r.ordinalNumber(n, { unit: "dayOfYear" }) : ke(n, t.length);
  },
  // Day of week
  E: function(e, t, r) {
    const n = e.getDay();
    switch (t) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return r.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return r.day(n, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return r.day(n, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return r.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, r, n) {
    const s = e.getDay(), i = (s - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(i);
      // Padded numerical value
      case "ee":
        return ke(i, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return r.ordinalNumber(i, { unit: "day" });
      case "eee":
        return r.day(s, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return r.day(s, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return r.day(s, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return r.day(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, r, n) {
    const s = e.getDay(), i = (s - n.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      // Numerical value (same as in `e`)
      case "c":
        return String(i);
      // Padded numerical value
      case "cc":
        return ke(i, t.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return r.ordinalNumber(i, { unit: "day" });
      case "ccc":
        return r.day(s, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return r.day(s, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return r.day(s, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return r.day(s, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, r) {
    const n = e.getDay(), s = n === 0 ? 7 : n;
    switch (t) {
      // 2
      case "i":
        return String(s);
      // 02
      case "ii":
        return ke(s, t.length);
      // 2nd
      case "io":
        return r.ordinalNumber(s, { unit: "day" });
      // Tue
      case "iii":
        return r.day(n, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return r.day(n, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return r.day(n, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return r.day(n, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, r) {
    const s = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return r.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return r.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return r.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return r.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, r) {
    const n = e.getHours();
    let s;
    switch (n === 12 ? s = Fr.noon : n === 0 ? s = Fr.midnight : s = n / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return r.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return r.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return r.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return r.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, r) {
    const n = e.getHours();
    let s;
    switch (n >= 17 ? s = Fr.evening : n >= 12 ? s = Fr.afternoon : n >= 4 ? s = Fr.morning : s = Fr.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return r.dayPeriod(s, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return r.dayPeriod(s, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return r.dayPeriod(s, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, r) {
    if (t === "ho") {
      let n = e.getHours() % 12;
      return n === 0 && (n = 12), r.ordinalNumber(n, { unit: "hour" });
    }
    return Yt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, r) {
    return t === "Ho" ? r.ordinalNumber(e.getHours(), { unit: "hour" }) : Yt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, r) {
    const n = e.getHours() % 12;
    return t === "Ko" ? r.ordinalNumber(n, { unit: "hour" }) : ke(n, t.length);
  },
  // Hour [1-24]
  k: function(e, t, r) {
    let n = e.getHours();
    return n === 0 && (n = 24), t === "ko" ? r.ordinalNumber(n, { unit: "hour" }) : ke(n, t.length);
  },
  // Minute
  m: function(e, t, r) {
    return t === "mo" ? r.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Yt.m(e, t);
  },
  // Second
  s: function(e, t, r) {
    return t === "so" ? r.ordinalNumber(e.getSeconds(), { unit: "second" }) : Yt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return Yt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, r) {
    const n = e.getTimezoneOffset();
    if (n === 0)
      return "Z";
    switch (t) {
      // Hours and optional minutes
      case "X":
        return Yi(n);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return mr(n);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return mr(n, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      // Hours and optional minutes
      case "x":
        return Yi(n);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return mr(n);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return mr(n, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Qi(n, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + mr(n, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, r) {
    const n = e.getTimezoneOffset();
    switch (t) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Qi(n, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + mr(n, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, r) {
    const n = Math.trunc(+e / 1e3);
    return ke(n, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, r) {
    return ke(+e, t.length);
  }
};
function Qi(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), s = Math.trunc(n / 60), i = n % 60;
  return i === 0 ? r + String(s) : r + String(s) + t + ke(i, 2);
}
function Yi(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ke(Math.abs(e) / 60, 2) : mr(e, t);
}
function mr(e, t = "") {
  const r = e > 0 ? "-" : "+", n = Math.abs(e), s = ke(Math.trunc(n / 60), 2), i = ke(n % 60, 2);
  return r + s + t + i;
}
const Gi = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, vc = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, V0 = (e, t) => {
  const r = e.match(/(P+)(p+)?/) || [], n = r[1], s = r[2];
  if (!s)
    return Gi(e, t);
  let i;
  switch (n) {
    case "P":
      i = t.dateTime({ width: "short" });
      break;
    case "PP":
      i = t.dateTime({ width: "medium" });
      break;
    case "PPP":
      i = t.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      i = t.dateTime({ width: "full" });
      break;
  }
  return i.replace("{{date}}", Gi(n, t)).replace("{{time}}", vc(s, t));
}, Q0 = {
  p: vc,
  P: V0
}, Y0 = /^D+$/, G0 = /^Y+$/, X0 = ["D", "DD", "YY", "YYYY"];
function K0(e) {
  return Y0.test(e);
}
function J0(e) {
  return G0.test(e);
}
function Z0(e, t, r) {
  const n = eg(e, t, r);
  if (console.warn(n), X0.includes(e)) throw new RangeError(n);
}
function eg(e, t, r) {
  const n = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${n} to the input \`${r}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const tg = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, rg = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, ng = /^'([^]*?)'?$/, sg = /''/g, ag = /[a-zA-Z]/;
function fs(e, t, r) {
  var p, g, y, C, T, P, A, N;
  const n = ys(), s = (r == null ? void 0 : r.locale) ?? n.locale ?? q0, i = (r == null ? void 0 : r.firstWeekContainsDate) ?? ((g = (p = r == null ? void 0 : r.locale) == null ? void 0 : p.options) == null ? void 0 : g.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((C = (y = n.locale) == null ? void 0 : y.options) == null ? void 0 : C.firstWeekContainsDate) ?? 1, o = (r == null ? void 0 : r.weekStartsOn) ?? ((P = (T = r == null ? void 0 : r.locale) == null ? void 0 : T.options) == null ? void 0 : P.weekStartsOn) ?? n.weekStartsOn ?? ((N = (A = n.locale) == null ? void 0 : A.options) == null ? void 0 : N.weekStartsOn) ?? 0, d = lt(e, r == null ? void 0 : r.in);
  if (!bc(d))
    throw new RangeError("Invalid time value");
  let h = t.match(rg).map((w) => {
    const k = w[0];
    if (k === "p" || k === "P") {
      const _ = Q0[k];
      return _(w, s.formatLong);
    }
    return w;
  }).join("").match(tg).map((w) => {
    if (w === "''")
      return { isToken: !1, value: "'" };
    const k = w[0];
    if (k === "'")
      return { isToken: !1, value: ig(w) };
    if (Vi[k])
      return { isToken: !0, value: w };
    if (k.match(ag))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + k + "`"
      );
    return { isToken: !1, value: w };
  });
  s.localize.preprocessor && (h = s.localize.preprocessor(d, h));
  const f = {
    firstWeekContainsDate: i,
    weekStartsOn: o,
    locale: s
  };
  return h.map((w) => {
    if (!w.isToken) return w.value;
    const k = w.value;
    (!(r != null && r.useAdditionalWeekYearTokens) && J0(k) || !(r != null && r.useAdditionalDayOfYearTokens) && K0(k)) && Z0(k, t, String(e));
    const _ = Vi[k[0]];
    return _(d, k, s.localize, f);
  }).join("");
}
function ig(e) {
  const t = e.match(ng);
  return t ? t[1].replace(sg, "'") : e;
}
function og(e, t, r) {
  const [n, s] = Aa(
    r == null ? void 0 : r.in,
    e,
    t
  );
  return +Dr(n, r) == +Dr(s, r);
}
function lg(e, t) {
  return og(
    ot((t == null ? void 0 : t.in) || e, e),
    Da((t == null ? void 0 : t.in) || e),
    t
  );
}
function cg(e, t) {
  return gc(
    ot(e, e),
    Da(e)
  );
}
function ug(e, t, r) {
  return s0(e, -1, r);
}
function dg(e, t) {
  return gc(
    ot(e, e),
    ug(Da(e))
  );
}
function Ma(e, t) {
  const r = () => ot(t == null ? void 0 : t.in, NaN), s = pg(e);
  let i;
  if (s.date) {
    const f = gg(s.date, 2);
    i = bg(f.restDateString, f.year);
  }
  if (!i || isNaN(+i)) return r();
  const o = +i;
  let d = 0, h;
  if (s.time && (d = yg(s.time), isNaN(d)))
    return r();
  if (s.timezone) {
    if (h = xg(s.timezone), isNaN(h)) return r();
  } else {
    const f = new Date(o + d), p = lt(0, t == null ? void 0 : t.in);
    return p.setFullYear(
      f.getUTCFullYear(),
      f.getUTCMonth(),
      f.getUTCDate()
    ), p.setHours(
      f.getUTCHours(),
      f.getUTCMinutes(),
      f.getUTCSeconds(),
      f.getUTCMilliseconds()
    ), p;
  }
  return lt(o + d + h, t == null ? void 0 : t.in);
}
const Kn = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
}, hg = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/, fg = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/, mg = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function pg(e) {
  const t = {}, r = e.split(Kn.dateTimeDelimiter);
  let n;
  if (r.length > 2)
    return t;
  if (/:/.test(r[0]) ? n = r[0] : (t.date = r[0], n = r[1], Kn.timeZoneDelimiter.test(t.date) && (t.date = e.split(Kn.timeZoneDelimiter)[0], n = e.substr(
    t.date.length,
    e.length
  ))), n) {
    const s = Kn.timezone.exec(n);
    s ? (t.time = n.replace(s[1], ""), t.timezone = s[1]) : t.time = n;
  }
  return t;
}
function gg(e, t) {
  const r = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" + (4 + t) + "})|(\\d{2}|[+-]\\d{" + (2 + t) + "})$)"
  ), n = e.match(r);
  if (!n) return { year: NaN, restDateString: "" };
  const s = n[1] ? parseInt(n[1]) : null, i = n[2] ? parseInt(n[2]) : null;
  return {
    year: i === null ? s : i * 100,
    restDateString: e.slice((n[1] || n[2]).length)
  };
}
function bg(e, t) {
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  const r = e.match(hg);
  if (!r) return /* @__PURE__ */ new Date(NaN);
  const n = !!r[4], s = wn(r[1]), i = wn(r[2]) - 1, o = wn(r[3]), d = wn(r[4]), h = wn(r[5]) - 1;
  if (n)
    return Ng(t, d, h) ? vg(t, d, h) : /* @__PURE__ */ new Date(NaN);
  {
    const f = /* @__PURE__ */ new Date(0);
    return !kg(t, i, o) || !Sg(t, s) ? /* @__PURE__ */ new Date(NaN) : (f.setUTCFullYear(t, i, Math.max(s, o)), f);
  }
}
function wn(e) {
  return e ? parseInt(e) : 1;
}
function yg(e) {
  const t = e.match(fg);
  if (!t) return NaN;
  const r = Is(t[1]), n = Is(t[2]), s = Is(t[3]);
  return Cg(r, n, s) ? r * mc + n * fc + s * 1e3 : NaN;
}
function Is(e) {
  return e && parseFloat(e.replace(",", ".")) || 0;
}
function xg(e) {
  if (e === "Z") return 0;
  const t = e.match(mg);
  if (!t) return 0;
  const r = t[1] === "+" ? -1 : 1, n = parseInt(t[2]), s = t[3] && parseInt(t[3]) || 0;
  return _g(n, s) ? r * (n * mc + s * fc) : NaN;
}
function vg(e, t, r) {
  const n = /* @__PURE__ */ new Date(0);
  n.setUTCFullYear(e, 0, 4);
  const s = n.getUTCDay() || 7, i = (t - 1) * 7 + r + 1 - s;
  return n.setUTCDate(n.getUTCDate() + i), n;
}
const wg = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function wc(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function kg(e, t, r) {
  return t >= 0 && t <= 11 && r >= 1 && r <= (wg[t] || (wc(e) ? 29 : 28));
}
function Sg(e, t) {
  return t >= 1 && t <= (wc(e) ? 366 : 365);
}
function Ng(e, t, r) {
  return t >= 1 && t <= 53 && r >= 0 && r <= 6;
}
function Cg(e, t, r) {
  return e === 24 ? t === 0 && r === 0 : r >= 0 && r < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function _g(e, t) {
  return t >= 0 && t <= 59;
}
const Tg = {
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
}, Pg = (e, t, r) => {
  let n;
  const s = Tg[e];
  return typeof s == "string" ? n = s : t === 1 ? n = s.one : n = s.other.replace("{{count}}", t.toString()), r != null && r.addSuffix ? r.comparison && r.comparison > 0 ? "en " + n : "hace " + n : n;
}, Eg = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
}, Og = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
}, Rg = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Ag = {
  date: qr({
    formats: Eg,
    defaultWidth: "full"
  }),
  time: qr({
    formats: Og,
    defaultWidth: "full"
  }),
  dateTime: qr({
    formats: Rg,
    defaultWidth: "full"
  })
}, Dg = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
}, Mg = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
}, zg = (e, t, r, n) => t.getHours() !== 1 ? Mg[e] : Dg[e], Lg = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
}, jg = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
}, Fg = {
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
}, Ig = {
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
}, Ug = {
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
}, qg = {
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
}, Hg = (e, t) => Number(e) + "º", Bg = {
  ordinalNumber: Hg,
  era: Rt({
    values: Lg,
    defaultWidth: "wide"
  }),
  quarter: Rt({
    values: jg,
    defaultWidth: "wide",
    argumentCallback: (e) => Number(e) - 1
  }),
  month: Rt({
    values: Fg,
    defaultWidth: "wide"
  }),
  day: Rt({
    values: Ig,
    defaultWidth: "wide"
  }),
  dayPeriod: Rt({
    values: Ug,
    defaultWidth: "wide",
    formattingValues: qg,
    defaultFormattingWidth: "wide"
  })
}, $g = /^(\d+)(º)?/i, Wg = /\d+/i, Vg = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
}, Qg = {
  any: [/^ac/i, /^dc/i],
  wide: [
    /^(antes de cristo|antes de la era com[uú]n)/i,
    /^(despu[eé]s de cristo|era com[uú]n)/i
  ]
}, Yg = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
}, Gg = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Xg = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
}, Kg = {
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
}, Jg = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
}, Zg = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
}, eb = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
}, tb = {
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
}, rb = {
  ordinalNumber: yc({
    matchPattern: $g,
    parsePattern: Wg,
    valueCallback: function(e) {
      return parseInt(e, 10);
    }
  }),
  era: At({
    matchPatterns: Vg,
    defaultMatchWidth: "wide",
    parsePatterns: Qg,
    defaultParseWidth: "any"
  }),
  quarter: At({
    matchPatterns: Yg,
    defaultMatchWidth: "wide",
    parsePatterns: Gg,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: At({
    matchPatterns: Xg,
    defaultMatchWidth: "wide",
    parsePatterns: Kg,
    defaultParseWidth: "any"
  }),
  day: At({
    matchPatterns: Jg,
    defaultMatchWidth: "wide",
    parsePatterns: Zg,
    defaultParseWidth: "any"
  }),
  dayPeriod: At({
    matchPatterns: eb,
    defaultMatchWidth: "any",
    parsePatterns: tb,
    defaultParseWidth: "any"
  })
}, Xi = {
  code: "es",
  formatDistance: Pg,
  formatLong: Ag,
  formatRelative: zg,
  localize: Bg,
  match: rb,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, nb = ({
  conversationId: e,
  sender: t,
  body: r,
  file: n
}) => {
  const s = `optimistic-${Date.now()}`, i = (/* @__PURE__ */ new Date()).toISOString(), o = Number(t.id), d = t.attributes || {}, h = d.name || d.username || "Usuario", f = d.avatar_url ?? d.avatar ?? null, p = {
    id: String(t.id),
    type: "user",
    attributes: {
      user_auth_id: d.user_auth_id ?? t.id,
      name: h,
      avatar_url: f,
      created_at: i,
      updated_at: i
    },
    relationships: []
  };
  return {
    id: s,
    type: "message",
    attributes: {
      conversation_id: Number(e),
      created_at: i,
      sender_id: o,
      body: r || "Archivo adjunto",
      type: { id: 0, name: "message", icon: "" }
    },
    relationships: {
      sender: p,
      attachments: n ? [
        {
          id: `${s}-attachment`,
          type: "messageAttachment",
          attributes: {
            file_url: URL.createObjectURL(n),
            file_name: n.name,
            file_mime_type: n.type,
            file_size: n.size,
            created_at: i
          },
          relationships: []
        }
      ] : []
    },
    local_status: "sending"
  };
};
function sb(e) {
  return e.slice(0, 10);
}
function ab(e, t) {
  if (t.attributes.sender_id == null) return e;
  const r = sb(t.attributes.created_at || ""), n = e[0];
  return n && n.date === r ? n.messages.some((s) => s.id === t.id) ? e : [{ ...n, messages: [t, ...n.messages] }, ...e.slice(1)] : [{ date: r, messages: [t] }, ...e];
}
function kc(e, t) {
  if (e.length === 0) return t;
  if (t.length === 0) return e;
  const r = e[e.length - 1], n = t[0];
  if (n.date === r.date) {
    const s = new Set(r.messages.map((o) => o.id)), i = n.messages.filter((o) => !s.has(o.id));
    return [
      ...e.slice(0, -1),
      { date: r.date, messages: [...r.messages, ...i] },
      ...t.slice(1)
    ];
  }
  return [...e, ...t];
}
function Ki(e) {
  if (!e) return "Hoy";
  const t = e.trim().toLowerCase();
  if (t === "hoy" || t === "today") return "Hoy";
  if (t === "ayer" || t === "yesterday") return "Ayer";
  const r = Ma(e);
  return bc(r) ? cg(r) ? "Hoy" : dg(r) ? "Ayer" : lg(r, { weekStartsOn: 1 }) ? fs(r, "EEEE", { locale: Xi }) : fs(r, "d 'de' MMMM 'de' yyyy", { locale: Xi }) : e;
}
const ib = async ({
  conversation: e,
  ...t
}) => await pt({
  url: `${mt("messenger", "v1")}/conversations/${e}/messages`,
  method: "GET",
  params: t
}), ob = (e, t) => pt({
  url: `${mt("messenger", "v1")}/conversations/${e}/messages`,
  method: "POST",
  data: t
}), lb = (e, t) => {
  const r = new FormData();
  return r.append("file", t.file), r.append("sender_id", t.sender_id.toString()), t.caption && r.append("caption", t.caption), pt({
    url: `${mt("messenger", "v1")}/conversations/${e}/file`,
    method: "POST",
    data: r,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}, cb = ({ params: e, enabled: t = !0 }) => {
  var i, o, d, h, f, p, g;
  const r = Qd({
    queryKey: ["list-messages", e],
    queryFn: ({ pageParam: y }) => {
      const C = y && y !== "null" && y !== "undefined" && y.trim() !== "" ? y : void 0;
      return ib({
        ...e,
        ...C ? { cursor: C } : {},
        page: {
          ...e == null ? void 0 : e.page,
          ...C ? { cursor: C } : {}
        }
      });
    },
    initialPageParam: "",
    getNextPageParam: (y, C, T, P) => {
      var _, E, z, D;
      const A = ((_ = y == null ? void 0 : y.data) == null ? void 0 : _.data) ?? [];
      if (!Array.isArray(A) || A.length === 0 || A.reduce(
        (O, M) => O + (Array.isArray(M == null ? void 0 : M.messages) ? M.messages.length : 0),
        0
      ) === 0)
        return;
      const w = (E = y == null ? void 0 : y.data) == null ? void 0 : E.meta;
      if ((w == null ? void 0 : w.has_more) === !1)
        return;
      let k = w == null ? void 0 : w.next_cursor;
      if (!k) {
        const O = (D = (z = y == null ? void 0 : y.data) == null ? void 0 : z.links) == null ? void 0 : D.next;
        if (O)
          try {
            const M = new URL(O, "http://localhost");
            k = M.searchParams.get("page[cursor]") || M.searchParams.get("cursor") || void 0;
          } catch {
          }
      }
      if (!(!k || k === "null" || k === "undefined" || k.trim() === "") && !(T && k === T) && !(P && P.includes(k)))
        return k;
    },
    enabled: t && !!(e != null && e.conversation),
    refetchOnWindowFocus: !1
  }), n = (i = r.data) == null ? void 0 : i.pages;
  return {
    data: zt(() => n ? n.reduce((y, C) => {
      var P;
      const T = ((P = C == null ? void 0 : C.data) == null ? void 0 : P.data) ?? [];
      return kc(y, T);
    }, []) : [], [n]),
    rawPages: (o = r.data) == null ? void 0 : o.pages,
    isLoading: r.isLoading,
    isPending: r.isPending,
    isFetching: r.isFetching,
    isFetchingNextPage: r.isFetchingNextPage,
    hasNextPage: !!r.hasNextPage,
    fetchNextPage: r.fetchNextPage,
    errors: ((d = r.error) == null ? void 0 : d.data) ?? {},
    refetch: r.refetch,
    meta: (g = (p = (f = (h = r.data) == null ? void 0 : h.pages) == null ? void 0 : f[0]) == null ? void 0 : p.data) == null ? void 0 : g.meta
  };
};
function zr(e, t) {
  const r = Vd({
    mutationFn: e,
    ...t
  });
  return {
    ...r,
    isLoading: r.isPending
  };
}
const ub = () => zr(
  ({ conversationId: e, body: t, sender_id: r }) => ob(e, { body: t, sender_id: r }).then(
    (n) => n.data.data
  )
), db = () => zr(
  ({ conversationId: e, file: t, sender_id: r, caption: n }) => lb(e, { file: t, sender_id: r, caption: n }).then(
    (s) => s.data.data
  )
), hb = (e) => pt({
  url: `${mt("messenger", "v1")}/conversations`,
  method: "GET",
  params: e
}), fb = (e) => pt({
  url: `${mt("messenger", "v1")}/conversations`,
  method: "POST",
  data: e
}), mb = ({
  conversationId: e,
  read_until: t,
  user_id: r
}) => pt({
  url: `${mt("messenger", "v1")}/conversations/${e}/read`,
  method: "POST",
  data: { read_until: t, user_id: r }
}), pb = ({
  conversationId: e,
  user_id: t,
  is_typing: r
}) => pt({
  url: `${mt("messenger", "v1")}/conversations/${e}/typing`,
  method: "POST",
  data: { user_id: t, is_typing: r }
}), gb = (e) => pt({
  url: `${mt("messenger", "v1")}/conversations/${e}/close`,
  method: "POST"
}), bb = () => {
  const e = ir(), t = Je(async (r) => {
    const n = await mb(r);
    return await e.invalidateQueries({ queryKey: ["list-conversations"] }), await e.invalidateQueries({ queryKey: ["conversation", r.conversationId] }), n.data.data;
  }, [e]);
  return zr(
    t
  );
}, yb = () => zr(
  (e) => pb(e).then(() => {
  })
), xb = () => {
  const e = ir(), t = Je(async (r) => {
    const n = await gb(r);
    return await e.invalidateQueries({ queryKey: ["list-conversations"] }), await e.invalidateQueries({ queryKey: ["conversation", r] }), n.data.data;
  }, [e]);
  return zr(
    t
  );
};
function vb(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Us = { exports: {} };
/*!
 * Pusher JavaScript Library v8.6.0
 * https://pusher.com/
 *
 * Copyright 2020, Pusher
 * Released under the MIT licence.
 */
var Ji;
function wb() {
  return Ji || (Ji = 1, (function(e, t) {
    (function(n, s) {
      e.exports = s();
    })(self, () => (
      /******/
      (() => {
        var r = {
          /***/
          594(o, d) {
            var h = this && this.__extends || /* @__PURE__ */ (function() {
              var w = function(k, _) {
                return w = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(E, z) {
                  E.__proto__ = z;
                } || function(E, z) {
                  for (var D in z) z.hasOwnProperty(D) && (E[D] = z[D]);
                }, w(k, _);
              };
              return function(k, _) {
                w(k, _);
                function E() {
                  this.constructor = k;
                }
                k.prototype = _ === null ? Object.create(_) : (E.prototype = _.prototype, new E());
              };
            })();
            Object.defineProperty(d, "__esModule", { value: !0 });
            var f = 256, p = (
              /** @class */
              (function() {
                function w(k) {
                  k === void 0 && (k = "="), this._paddingCharacter = k;
                }
                return w.prototype.encodedLength = function(k) {
                  return this._paddingCharacter ? (k + 2) / 3 * 4 | 0 : (k * 8 + 5) / 6 | 0;
                }, w.prototype.encode = function(k) {
                  for (var _ = "", E = 0; E < k.length - 2; E += 3) {
                    var z = k[E] << 16 | k[E + 1] << 8 | k[E + 2];
                    _ += this._encodeByte(z >>> 18 & 63), _ += this._encodeByte(z >>> 12 & 63), _ += this._encodeByte(z >>> 6 & 63), _ += this._encodeByte(z >>> 0 & 63);
                  }
                  var D = k.length - E;
                  if (D > 0) {
                    var z = k[E] << 16 | (D === 2 ? k[E + 1] << 8 : 0);
                    _ += this._encodeByte(z >>> 18 & 63), _ += this._encodeByte(z >>> 12 & 63), D === 2 ? _ += this._encodeByte(z >>> 6 & 63) : _ += this._paddingCharacter || "", _ += this._paddingCharacter || "";
                  }
                  return _;
                }, w.prototype.maxDecodedLength = function(k) {
                  return this._paddingCharacter ? k / 4 * 3 | 0 : (k * 6 + 7) / 8 | 0;
                }, w.prototype.decodedLength = function(k) {
                  return this.maxDecodedLength(k.length - this._getPaddingLength(k));
                }, w.prototype.decode = function(k) {
                  if (k.length === 0)
                    return new Uint8Array(0);
                  for (var _ = this._getPaddingLength(k), E = k.length - _, z = new Uint8Array(this.maxDecodedLength(E)), D = 0, O = 0, M = 0, L = 0, B = 0, te = 0, Q = 0; O < E - 4; O += 4)
                    L = this._decodeChar(k.charCodeAt(O + 0)), B = this._decodeChar(k.charCodeAt(O + 1)), te = this._decodeChar(k.charCodeAt(O + 2)), Q = this._decodeChar(k.charCodeAt(O + 3)), z[D++] = L << 2 | B >>> 4, z[D++] = B << 4 | te >>> 2, z[D++] = te << 6 | Q, M |= L & f, M |= B & f, M |= te & f, M |= Q & f;
                  if (O < E - 1 && (L = this._decodeChar(k.charCodeAt(O)), B = this._decodeChar(k.charCodeAt(O + 1)), z[D++] = L << 2 | B >>> 4, M |= L & f, M |= B & f), O < E - 2 && (te = this._decodeChar(k.charCodeAt(O + 2)), z[D++] = B << 4 | te >>> 2, M |= te & f), O < E - 3 && (Q = this._decodeChar(k.charCodeAt(O + 3)), z[D++] = te << 6 | Q, M |= Q & f), M !== 0)
                    throw new Error("Base64Coder: incorrect characters for decoding");
                  return z;
                }, w.prototype._encodeByte = function(k) {
                  var _ = k;
                  return _ += 65, _ += 25 - k >>> 8 & 6, _ += 51 - k >>> 8 & -75, _ += 61 - k >>> 8 & -15, _ += 62 - k >>> 8 & 3, String.fromCharCode(_);
                }, w.prototype._decodeChar = function(k) {
                  var _ = f;
                  return _ += (42 - k & k - 44) >>> 8 & -f + k - 43 + 62, _ += (46 - k & k - 48) >>> 8 & -f + k - 47 + 63, _ += (47 - k & k - 58) >>> 8 & -f + k - 48 + 52, _ += (64 - k & k - 91) >>> 8 & -f + k - 65 + 0, _ += (96 - k & k - 123) >>> 8 & -f + k - 97 + 26, _;
                }, w.prototype._getPaddingLength = function(k) {
                  var _ = 0;
                  if (this._paddingCharacter) {
                    for (var E = k.length - 1; E >= 0 && k[E] === this._paddingCharacter; E--)
                      _++;
                    if (k.length < 4 || _ > 2)
                      throw new Error("Base64Coder: incorrect padding");
                  }
                  return _;
                }, w;
              })()
            );
            d.Coder = p;
            var g = new p();
            function y(w) {
              return g.encode(w);
            }
            d.encode = y;
            function C(w) {
              return g.decode(w);
            }
            d.decode = C;
            var T = (
              /** @class */
              (function(w) {
                h(k, w);
                function k() {
                  return w !== null && w.apply(this, arguments) || this;
                }
                return k.prototype._encodeByte = function(_) {
                  var E = _;
                  return E += 65, E += 25 - _ >>> 8 & 6, E += 51 - _ >>> 8 & -75, E += 61 - _ >>> 8 & -13, E += 62 - _ >>> 8 & 49, String.fromCharCode(E);
                }, k.prototype._decodeChar = function(_) {
                  var E = f;
                  return E += (44 - _ & _ - 46) >>> 8 & -f + _ - 45 + 62, E += (94 - _ & _ - 96) >>> 8 & -f + _ - 95 + 63, E += (47 - _ & _ - 58) >>> 8 & -f + _ - 48 + 52, E += (64 - _ & _ - 91) >>> 8 & -f + _ - 65 + 0, E += (96 - _ & _ - 123) >>> 8 & -f + _ - 97 + 26, E;
                }, k;
              })(p)
            );
            d.URLSafeCoder = T;
            var P = new T();
            function A(w) {
              return P.encode(w);
            }
            d.encodeURLSafe = A;
            function N(w) {
              return P.decode(w);
            }
            d.decodeURLSafe = N, d.encodedLength = function(w) {
              return g.encodedLength(w);
            }, d.maxDecodedLength = function(w) {
              return g.maxDecodedLength(w);
            }, d.decodedLength = function(w) {
              return g.decodedLength(w);
            };
          },
          /***/
          978(o, d) {
            var h = "utf8: invalid source encoding";
            function f(p) {
              for (var g = [], y = 0; y < p.length; y++) {
                var C = p[y];
                if (C & 128) {
                  var T = void 0;
                  if (C < 224) {
                    if (y >= p.length)
                      throw new Error(h);
                    var P = p[++y];
                    if ((P & 192) !== 128)
                      throw new Error(h);
                    C = (C & 31) << 6 | P & 63, T = 128;
                  } else if (C < 240) {
                    if (y >= p.length - 1)
                      throw new Error(h);
                    var P = p[++y], A = p[++y];
                    if ((P & 192) !== 128 || (A & 192) !== 128)
                      throw new Error(h);
                    C = (C & 15) << 12 | (P & 63) << 6 | A & 63, T = 2048;
                  } else if (C < 248) {
                    if (y >= p.length - 2)
                      throw new Error(h);
                    var P = p[++y], A = p[++y], N = p[++y];
                    if ((P & 192) !== 128 || (A & 192) !== 128 || (N & 192) !== 128)
                      throw new Error(h);
                    C = (C & 15) << 18 | (P & 63) << 12 | (A & 63) << 6 | N & 63, T = 65536;
                  } else
                    throw new Error(h);
                  if (C < T || C >= 55296 && C <= 57343)
                    throw new Error(h);
                  if (C >= 65536) {
                    if (C > 1114111)
                      throw new Error(h);
                    C -= 65536, g.push(String.fromCharCode(55296 | C >> 10)), C = 56320 | C & 1023;
                  }
                }
                g.push(String.fromCharCode(C));
              }
              return g.join("");
            }
            d.D4 = f;
          },
          /***/
          721(o, d, h) {
            o.exports = h(207).default;
          },
          /***/
          207(o, d, h) {
            h.d(d, {
              default: () => (
                /* binding */
                $n
              )
            });
            class f {
              constructor(a, l) {
                this.lastId = 0, this.prefix = a, this.name = l;
              }
              create(a) {
                this.lastId++;
                var l = this.lastId, m = this.prefix + l, b = this.name + "[" + l + "]", R = !1, j = function() {
                  R || (a.apply(null, arguments), R = !0);
                };
                return this[l] = j, { number: l, id: m, name: b, callback: j };
              }
              remove(a) {
                delete this[a.number];
              }
            }
            var p = new f("_pusher_script_", "Pusher.ScriptReceivers"), g = {
              VERSION: "8.6.0",
              PROTOCOL: 7,
              wsPort: 80,
              wssPort: 443,
              wsPath: "",
              httpHost: "sockjs.pusher.com",
              httpPort: 80,
              httpsPort: 443,
              httpPath: "/pusher",
              stats_host: "stats.pusher.com",
              authEndpoint: "/pusher/auth",
              authTransport: "ajax",
              activityTimeout: 12e4,
              pongTimeout: 3e4,
              unavailableTimeout: 1e4,
              userAuthentication: {
                endpoint: "/pusher/user-auth",
                transport: "ajax"
              },
              channelAuthorization: {
                endpoint: "/pusher/auth",
                transport: "ajax"
              },
              cdn_http: "http://js.pusher.com",
              cdn_https: "https://js.pusher.com",
              dependency_suffix: ""
            };
            const y = g;
            class C {
              constructor(a) {
                this.options = a, this.receivers = a.receivers || p, this.loading = {};
              }
              load(a, l, m) {
                var b = this;
                if (b.loading[a] && b.loading[a].length > 0)
                  b.loading[a].push(m);
                else {
                  b.loading[a] = [m];
                  var R = ne.createScriptRequest(b.getPath(a, l)), j = b.receivers.create(function($) {
                    if (b.receivers.remove(j), b.loading[a]) {
                      var re = b.loading[a];
                      delete b.loading[a];
                      for (var pe = function(Le) {
                        Le || R.cleanup();
                      }, we = 0; we < re.length; we++)
                        re[we]($, pe);
                    }
                  });
                  R.send(j);
                }
              }
              getRoot(a) {
                var l, m = ne.getDocument().location.protocol;
                return a && a.useTLS || m === "https:" ? l = this.options.cdn_https : l = this.options.cdn_http, l.replace(/\/*$/, "") + "/" + this.options.version;
              }
              getPath(a, l) {
                return this.getRoot(l) + "/" + a + this.options.suffix + ".js";
              }
            }
            var T = new f("_pusher_dependencies", "Pusher.DependenciesReceivers"), P = new C({
              cdn_http: y.cdn_http,
              cdn_https: y.cdn_https,
              version: y.VERSION,
              suffix: y.dependency_suffix,
              receivers: T
            });
            const A = {
              baseUrl: "https://pusher.com",
              urls: {
                authenticationEndpoint: {
                  path: "/docs/channels/server_api/authenticating_users"
                },
                authorizationEndpoint: {
                  path: "/docs/channels/server_api/authorizing-users/"
                },
                javascriptQuickStart: {
                  path: "/docs/javascript_quick_start"
                },
                triggeringClientEvents: {
                  path: "/docs/client_api_guide/client_events#trigger-events"
                },
                encryptedChannelSupport: {
                  fullUrl: "https://github.com/pusher/pusher-js/tree/cc491015371a4bde5743d1c87a0fbac0feb53195#encrypted-channel-support"
                }
              }
            }, w = { buildLogSuffix: function(c) {
              const a = "See:", l = A.urls[c];
              if (!l)
                return "";
              let m;
              return l.fullUrl ? m = l.fullUrl : l.path && (m = A.baseUrl + l.path), m ? `${a} ${m}` : "";
            } };
            var k;
            (function(c) {
              c.UserAuthentication = "user-authentication", c.ChannelAuthorization = "channel-authorization";
            })(k || (k = {}));
            class _ extends Error {
              constructor(a) {
                super(a), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class E extends Error {
              constructor(a) {
                super(a), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class z extends Error {
              constructor(a) {
                super(a), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class D extends Error {
              constructor(a) {
                super(a), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class O extends Error {
              constructor(a) {
                super(a), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class M extends Error {
              constructor(a) {
                super(a), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class L extends Error {
              constructor(a) {
                super(a), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class B extends Error {
              constructor(a) {
                super(a), Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            class te extends Error {
              constructor(a, l) {
                super(l), this.status = a, Object.setPrototypeOf(this, new.target.prototype);
              }
            }
            const me = function(c, a, l, m, b) {
              const R = ne.createXHR();
              R.open("POST", l.endpoint, !0), R.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              for (var j in l.headers)
                R.setRequestHeader(j, l.headers[j]);
              if (l.headersProvider != null) {
                let $ = l.headersProvider();
                for (var j in $)
                  R.setRequestHeader(j, $[j]);
              }
              return R.onreadystatechange = function() {
                if (R.readyState === 4)
                  if (R.status === 200) {
                    let $, re = !1;
                    try {
                      $ = JSON.parse(R.responseText), re = !0;
                    } catch {
                      b(new te(200, `JSON returned from ${m.toString()} endpoint was invalid, yet status code was 200. Data was: ${R.responseText}`), null);
                    }
                    re && b(null, $);
                  } else {
                    let $ = "";
                    switch (m) {
                      case k.UserAuthentication:
                        $ = w.buildLogSuffix("authenticationEndpoint");
                        break;
                      case k.ChannelAuthorization:
                        $ = `Clients must be authorized to join private or presence channels. ${w.buildLogSuffix("authorizationEndpoint")}`;
                        break;
                    }
                    b(new te(R.status, `Unable to retrieve auth string from ${m.toString()} endpoint - received status: ${R.status} from ${l.endpoint}. ${$}`), null);
                  }
              }, R.send(a), R;
            };
            function Z(c) {
              return De(ut(c));
            }
            var K = String.fromCharCode, Te = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ct = function(c) {
              var a = c.charCodeAt(0);
              return a < 128 ? c : a < 2048 ? K(192 | a >>> 6) + K(128 | a & 63) : K(224 | a >>> 12 & 15) + K(128 | a >>> 6 & 63) + K(128 | a & 63);
            }, ut = function(c) {
              return c.replace(/[^\x00-\x7F]/g, ct);
            }, U = function(c) {
              var a = [0, 2, 1][c.length % 3], l = c.charCodeAt(0) << 16 | (c.length > 1 ? c.charCodeAt(1) : 0) << 8 | (c.length > 2 ? c.charCodeAt(2) : 0), m = [
                Te.charAt(l >>> 18),
                Te.charAt(l >>> 12 & 63),
                a >= 2 ? "=" : Te.charAt(l >>> 6 & 63),
                a >= 1 ? "=" : Te.charAt(l & 63)
              ];
              return m.join("");
            }, De = typeof window < "u" && window.btoa || function(c) {
              return c.replace(/[\s\S]{1,3}/g, U);
            };
            class de {
              constructor(a, l, m, b) {
                this.clear = l, this.timer = a(() => {
                  this.timer && (this.timer = b(this.timer));
                }, m);
              }
              isRunning() {
                return this.timer !== null;
              }
              ensureAborted() {
                this.timer && (this.clear(this.timer), this.timer = null);
              }
            }
            const Ce = de;
            function Me(c) {
              window.clearTimeout(c);
            }
            function xe(c) {
              window.clearInterval(c);
            }
            class ce extends Ce {
              constructor(a, l) {
                super(setTimeout, Me, a, function(m) {
                  return l(), null;
                });
              }
            }
            class ee extends Ce {
              constructor(a, l) {
                super(setInterval, xe, a, function(m) {
                  return l(), m;
                });
              }
            }
            var _e = {
              now() {
                return Date.now ? Date.now() : (/* @__PURE__ */ new Date()).valueOf();
              },
              defer(c) {
                return new ce(0, c);
              },
              method(c, ...a) {
                var l = Array.prototype.slice.call(arguments, 1);
                return function(m) {
                  return m[c].apply(m, l.concat(arguments));
                };
              }
            };
            const Y = _e;
            function le(c, ...a) {
              for (var l = 0; l < a.length; l++) {
                var m = a[l];
                for (var b in m)
                  b === "__proto__" || b === "constructor" || b === "prototype" || (m[b] && m[b].constructor && m[b].constructor === Object ? c[b] = le(c[b] || {}, m[b]) : c[b] = m[b]);
              }
              return c;
            }
            function dt() {
              for (var c = ["Pusher"], a = 0; a < arguments.length; a++)
                typeof arguments[a] == "string" ? c.push(arguments[a]) : c.push(Se(arguments[a]));
              return c.join(" : ");
            }
            function Pe(c, a) {
              var l = Array.prototype.indexOf;
              if (c === null)
                return -1;
              if (l && c.indexOf === l)
                return c.indexOf(a);
              for (var m = 0, b = c.length; m < b; m++)
                if (c[m] === a)
                  return m;
              return -1;
            }
            function Ne(c, a) {
              for (var l in c)
                Object.prototype.hasOwnProperty.call(c, l) && a(c[l], l, c);
            }
            function Re(c) {
              var a = [];
              return Ne(c, function(l, m) {
                a.push(m);
              }), a;
            }
            function Lt(c) {
              var a = [];
              return Ne(c, function(l) {
                a.push(l);
              }), a;
            }
            function $e(c, a, l) {
              for (var m = 0; m < c.length; m++)
                a.call(l || window, c[m], m, c);
            }
            function We(c, a) {
              for (var l = [], m = 0; m < c.length; m++)
                l.push(a(c[m], m, c, l));
              return l;
            }
            function G(c, a) {
              var l = {};
              return Ne(c, function(m, b) {
                l[b] = a(m);
              }), l;
            }
            function fe(c, a) {
              a = a || function(b) {
                return !!b;
              };
              for (var l = [], m = 0; m < c.length; m++)
                a(c[m], m, c, l) && l.push(c[m]);
              return l;
            }
            function Ve(c, a) {
              var l = {};
              return Ne(c, function(m, b) {
                (a && a(m, b, c, l) || m) && (l[b] = m);
              }), l;
            }
            function et(c) {
              var a = [];
              return Ne(c, function(l, m) {
                a.push([m, l]);
              }), a;
            }
            function gt(c, a) {
              for (var l = 0; l < c.length; l++)
                if (a(c[l], l, c))
                  return !0;
              return !1;
            }
            function lr(c, a) {
              for (var l = 0; l < c.length; l++)
                if (!a(c[l], l, c))
                  return !1;
              return !0;
            }
            function St(c) {
              return G(c, function(a) {
                return a === null ? "" : (typeof a == "object" && (a = Se(a)), encodeURIComponent(Z(a.toString())));
              });
            }
            function dn(c) {
              var a = Ve(c, function(m) {
                return m !== void 0;
              }), l = We(et(St(a)), Y.method("join", "=")).join("&");
              return l;
            }
            function W(c) {
              var a = [], l = [];
              return (function m(b, R) {
                var j, $, re;
                switch (typeof b) {
                  case "object":
                    if (!b)
                      return null;
                    for (j = 0; j < a.length; j += 1)
                      if (a[j] === b)
                        return { $ref: l[j] };
                    if (a.push(b), l.push(R), Object.prototype.toString.apply(b) === "[object Array]")
                      for (re = [], j = 0; j < b.length; j += 1)
                        re[j] = m(b[j], R + "[" + j + "]");
                    else {
                      re = {};
                      for ($ in b)
                        Object.prototype.hasOwnProperty.call(b, $) && (re[$] = m(b[$], R + "[" + JSON.stringify($) + "]"));
                    }
                    return re;
                  case "number":
                  case "string":
                  case "boolean":
                    return b;
                }
              })(c, "$");
            }
            function Se(c) {
              try {
                return JSON.stringify(c);
              } catch {
                return JSON.stringify(W(c));
              }
            }
            class ve {
              constructor() {
                this.globalLog = (a) => {
                  window.console && window.console.log && window.console.log(a);
                };
              }
              debug(...a) {
                this.log(this.globalLog, a);
              }
              warn(...a) {
                this.log(this.globalLogWarn, a);
              }
              error(...a) {
                this.log(this.globalLogError, a);
              }
              globalLogWarn(a) {
                window.console && window.console.warn ? window.console.warn(a) : this.globalLog(a);
              }
              globalLogError(a) {
                window.console && window.console.error ? window.console.error(a) : this.globalLogWarn(a);
              }
              log(a, ...l) {
                var m = dt.apply(this, arguments);
                $n.log ? $n.log(m) : $n.logToConsole && a.bind(this)(m);
              }
            }
            const J = new ve();
            var Ie = function(c, a, l, m, b) {
              (l.headers !== void 0 || l.headersProvider != null) && J.warn(`To send headers with the ${m.toString()} request, you must use AJAX, rather than JSONP.`);
              var R = c.nextAuthCallbackID.toString();
              c.nextAuthCallbackID++;
              var j = c.getDocument(), $ = j.createElement("script");
              c.auth_callbacks[R] = function(we) {
                b(null, we);
              };
              var re = "Pusher.auth_callbacks['" + R + "']";
              $.src = l.endpoint + "?callback=" + encodeURIComponent(re) + "&" + a;
              var pe = j.getElementsByTagName("head")[0] || j.documentElement;
              pe.insertBefore($, pe.firstChild);
            };
            const st = Ie;
            class ze {
              constructor(a) {
                this.src = a;
              }
              send(a) {
                var l = this, m = "Error loading " + l.src;
                l.script = document.createElement("script"), l.script.id = a.id, l.script.src = l.src, l.script.type = "text/javascript", l.script.charset = "UTF-8", l.script.addEventListener ? (l.script.onerror = function() {
                  a.callback(m);
                }, l.script.onload = function() {
                  a.callback(null);
                }) : l.script.onreadystatechange = function() {
                  (l.script.readyState === "loaded" || l.script.readyState === "complete") && a.callback(null);
                }, l.script.async === void 0 && document.attachEvent && /opera/i.test(navigator.userAgent) ? (l.errorScript = document.createElement("script"), l.errorScript.id = a.id + "_error", l.errorScript.text = a.name + "('" + m + "');", l.script.async = l.errorScript.async = !1) : l.script.async = !0;
                var b = document.getElementsByTagName("head")[0];
                b.insertBefore(l.script, b.firstChild), l.errorScript && b.insertBefore(l.errorScript, l.script.nextSibling);
              }
              cleanup() {
                this.script && (this.script.onload = this.script.onerror = null, this.script.onreadystatechange = null), this.script && this.script.parentNode && this.script.parentNode.removeChild(this.script), this.errorScript && this.errorScript.parentNode && this.errorScript.parentNode.removeChild(this.errorScript), this.script = null, this.errorScript = null;
              }
            }
            class ht {
              constructor(a, l) {
                this.url = a, this.data = l;
              }
              send(a) {
                if (!this.request) {
                  var l = dn(this.data), m = this.url + "/" + a.number + "?" + l;
                  this.request = ne.createScriptRequest(m), this.request.send(a);
                }
              }
              cleanup() {
                this.request && this.request.cleanup();
              }
            }
            var hn = function(c, a) {
              return function(l, m) {
                var b = "http" + (a ? "s" : "") + "://", R = b + (c.host || c.options.host) + c.options.path, j = ne.createJSONPRequest(R, l), $ = ne.ScriptReceivers.create(function(re, pe) {
                  p.remove($), j.cleanup(), pe && pe.host && (c.host = pe.host), m && m(re, pe);
                });
                j.send($);
              };
            }, fn = {
              name: "jsonp",
              getAgent: hn
            };
            const ge = fn;
            function ft(c, a, l) {
              var m = c + (a.useTLS ? "s" : ""), b = a.useTLS ? a.hostTLS : a.hostNonTLS;
              return m + "://" + b + l;
            }
            function Vt(c, a) {
              var l = "/app/" + c, m = "?protocol=" + y.PROTOCOL + "&client=js&version=" + y.VERSION + (a ? "&" + a : "");
              return l + m;
            }
            var Un = {
              getInitial: function(c, a) {
                var l = (a.httpPath || "") + Vt(c, "flash=false");
                return ft("ws", a, l);
              }
            }, Tc = {
              getInitial: function(c, a) {
                var l = (a.httpPath || "/pusher") + Vt(c);
                return ft("http", a, l);
              }
            }, Pc = {
              getInitial: function(c, a) {
                return ft("http", a, a.httpPath || "/pusher");
              },
              getPath: function(c, a) {
                return Vt(c);
              }
            };
            class Ec {
              constructor() {
                this._callbacks = {};
              }
              get(a) {
                return this._callbacks[xs(a)];
              }
              add(a, l, m) {
                var b = xs(a);
                this._callbacks[b] = this._callbacks[b] || [], this._callbacks[b].push({
                  fn: l,
                  context: m
                });
              }
              remove(a, l, m) {
                if (!a && !l && !m) {
                  this._callbacks = {};
                  return;
                }
                var b = a ? [xs(a)] : Re(this._callbacks);
                l || m ? this.removeCallback(b, l, m) : this.removeAllCallbacks(b);
              }
              removeCallback(a, l, m) {
                $e(a, function(b) {
                  this._callbacks[b] = fe(this._callbacks[b] || [], function(R) {
                    return l && l !== R.fn || m && m !== R.context;
                  }), this._callbacks[b].length === 0 && delete this._callbacks[b];
                }, this);
              }
              removeAllCallbacks(a) {
                $e(a, function(l) {
                  delete this._callbacks[l];
                }, this);
              }
            }
            function xs(c) {
              return "_" + c;
            }
            class jt {
              constructor(a) {
                this.callbacks = new Ec(), this.global_callbacks = [], this.failThrough = a;
              }
              bind(a, l, m) {
                return this.callbacks.add(a, l, m), this;
              }
              bind_global(a) {
                return this.global_callbacks.push(a), this;
              }
              unbind(a, l, m) {
                return this.callbacks.remove(a, l, m), this;
              }
              unbind_global(a) {
                return a ? (this.global_callbacks = fe(this.global_callbacks || [], (l) => l !== a), this) : (this.global_callbacks = [], this);
              }
              unbind_all() {
                return this.unbind(), this.unbind_global(), this;
              }
              emit(a, l, m) {
                for (var b = 0; b < this.global_callbacks.length; b++)
                  this.global_callbacks[b](a, l);
                var R = this.callbacks.get(a), j = [];
                if (m ? j.push(l, m) : l && j.push(l), R && R.length > 0)
                  for (var b = 0; b < R.length; b++)
                    R[b].fn.apply(R[b].context || window, j);
                else this.failThrough && this.failThrough(a, l);
                return this;
              }
            }
            class Oc extends jt {
              constructor(a, l, m, b, R) {
                super(), this.initialize = ne.transportConnectionInitializer, this.hooks = a, this.name = l, this.priority = m, this.key = b, this.options = R, this.state = "new", this.timeline = R.timeline, this.activityTimeout = R.activityTimeout, this.id = this.timeline.generateUniqueID();
              }
              handlesActivityChecks() {
                return !!this.hooks.handlesActivityChecks;
              }
              supportsPing() {
                return !!this.hooks.supportsPing;
              }
              connect() {
                if (this.socket || this.state !== "initialized")
                  return !1;
                var a = this.hooks.urls.getInitial(this.key, this.options);
                try {
                  this.socket = this.hooks.getSocket(a, this.options);
                } catch (l) {
                  return Y.defer(() => {
                    this.onError(l), this.changeState("closed");
                  }), !1;
                }
                return this.bindListeners(), J.debug("Connecting", { transport: this.name, url: a }), this.changeState("connecting"), !0;
              }
              close() {
                return this.socket ? (this.socket.close(), !0) : !1;
              }
              send(a) {
                return this.state === "open" ? (Y.defer(() => {
                  this.socket && this.socket.send(a);
                }), !0) : !1;
              }
              ping() {
                this.state === "open" && this.supportsPing() && this.socket.ping();
              }
              onOpen() {
                this.hooks.beforeOpen && this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options)), this.changeState("open"), this.socket.onopen = void 0;
              }
              onError(a) {
                this.emit("error", { type: "WebSocketError", error: a }), this.timeline.error(this.buildTimelineMessage({ error: a.toString() }));
              }
              onClose(a) {
                a ? this.changeState("closed", {
                  code: a.code,
                  reason: a.reason,
                  wasClean: a.wasClean
                }) : this.changeState("closed"), this.unbindListeners(), this.socket = void 0;
              }
              onMessage(a) {
                this.emit("message", a);
              }
              onActivity() {
                this.emit("activity");
              }
              bindListeners() {
                this.socket.onopen = () => {
                  this.onOpen();
                }, this.socket.onerror = (a) => {
                  this.onError(a);
                }, this.socket.onclose = (a) => {
                  this.onClose(a);
                }, this.socket.onmessage = (a) => {
                  this.onMessage(a);
                }, this.supportsPing() && (this.socket.onactivity = () => {
                  this.onActivity();
                });
              }
              unbindListeners() {
                this.socket && (this.socket.onopen = void 0, this.socket.onerror = void 0, this.socket.onclose = void 0, this.socket.onmessage = void 0, this.supportsPing() && (this.socket.onactivity = void 0));
              }
              changeState(a, l) {
                this.state = a, this.timeline.info(this.buildTimelineMessage({
                  state: a,
                  params: l
                })), this.emit(a, l);
              }
              buildTimelineMessage(a) {
                return le({ cid: this.id }, a);
              }
            }
            class Lr {
              constructor(a) {
                this.hooks = a;
              }
              isSupported(a) {
                return this.hooks.isSupported(a);
              }
              createConnection(a, l, m, b) {
                return new Oc(this.hooks, a, l, m, b);
              }
            }
            var Rc = new Lr({
              urls: Un,
              handlesActivityChecks: !1,
              supportsPing: !1,
              isInitialized: function() {
                return !!ne.getWebSocketAPI();
              },
              isSupported: function() {
                return !!ne.getWebSocketAPI();
              },
              getSocket: function(c) {
                return ne.createWebSocket(c);
              }
            }), ja = {
              urls: Tc,
              handlesActivityChecks: !1,
              supportsPing: !0,
              isInitialized: function() {
                return !0;
              }
            }, Fa = le({
              getSocket: function(c) {
                return ne.HTTPFactory.createStreamingSocket(c);
              }
            }, ja), Ia = le({
              getSocket: function(c) {
                return ne.HTTPFactory.createPollingSocket(c);
              }
            }, ja), Ua = {
              isSupported: function() {
                return ne.isXHRSupported();
              }
            }, Ac = new Lr(le({}, Fa, Ua)), Dc = new Lr(le({}, Ia, Ua)), Mc = {
              ws: Rc,
              xhr_streaming: Ac,
              xhr_polling: Dc
            };
            const qn = Mc;
            var zc = new Lr({
              file: "sockjs",
              urls: Pc,
              handlesActivityChecks: !0,
              supportsPing: !1,
              isSupported: function() {
                return !0;
              },
              isInitialized: function() {
                return window.SockJS !== void 0;
              },
              getSocket: function(c, a) {
                return new window.SockJS(c, null, {
                  js_path: P.getPath("sockjs", {
                    useTLS: a.useTLS
                  }),
                  ignore_null_origin: a.ignoreNullOrigin
                });
              },
              beforeOpen: function(c, a) {
                c.send(JSON.stringify({
                  path: a
                }));
              }
            }), qa = {
              isSupported: function(c) {
                var a = ne.isXDRSupported(c.useTLS);
                return a;
              }
            }, Lc = new Lr(le({}, Fa, qa)), jc = new Lr(le({}, Ia, qa));
            qn.xdr_streaming = Lc, qn.xdr_polling = jc, qn.sockjs = zc;
            const Fc = qn;
            class Ic extends jt {
              constructor() {
                super();
                var a = this;
                typeof window < "u" && window.addEventListener !== void 0 && (window.addEventListener("online", function() {
                  a.emit("online");
                }, !1), window.addEventListener("offline", function() {
                  a.emit("offline");
                }, !1));
              }
              isOnline() {
                return window.navigator.onLine === void 0 ? !0 : window.navigator.onLine;
              }
            }
            var Uc = new Ic();
            class qc {
              constructor(a, l, m) {
                this.manager = a, this.transport = l, this.minPingDelay = m.minPingDelay, this.maxPingDelay = m.maxPingDelay, this.pingDelay = void 0;
              }
              createConnection(a, l, m, b) {
                b = le({}, b, {
                  activityTimeout: this.pingDelay
                });
                var R = this.transport.createConnection(a, l, m, b), j = null, $ = function() {
                  R.unbind("open", $), R.bind("closed", re), j = Y.now();
                }, re = (pe) => {
                  if (R.unbind("closed", re), pe.code === 1002 || pe.code === 1003)
                    this.manager.reportDeath();
                  else if (!pe.wasClean && j) {
                    var we = Y.now() - j;
                    we < 2 * this.maxPingDelay && (this.manager.reportDeath(), this.pingDelay = Math.max(we / 2, this.minPingDelay));
                  }
                };
                return R.bind("open", $), R;
              }
              isSupported(a) {
                return this.manager.isAlive() && this.transport.isSupported(a);
              }
            }
            const Ha = {
              decodeMessage: function(c) {
                try {
                  var a = JSON.parse(c.data), l = a.data;
                  if (typeof l == "string")
                    try {
                      l = JSON.parse(a.data);
                    } catch {
                    }
                  var m = {
                    event: a.event,
                    channel: a.channel,
                    data: l
                  };
                  return a.user_id && (m.user_id = a.user_id), m;
                } catch (b) {
                  throw { type: "MessageParseError", error: b, data: c.data };
                }
              },
              encodeMessage: function(c) {
                return JSON.stringify(c);
              },
              processHandshake: function(c) {
                var a = Ha.decodeMessage(c);
                if (a.event === "pusher:connection_established") {
                  if (!a.data.activity_timeout)
                    throw "No activity timeout specified in handshake";
                  return {
                    action: "connected",
                    id: a.data.socket_id,
                    activityTimeout: a.data.activity_timeout * 1e3
                  };
                } else {
                  if (a.event === "pusher:error")
                    return {
                      action: this.getCloseAction(a.data),
                      error: this.getCloseError(a.data)
                    };
                  throw "Invalid handshake";
                }
              },
              getCloseAction: function(c) {
                return c.code < 4e3 ? c.code >= 1002 && c.code <= 1004 ? "backoff" : null : c.code === 4e3 ? "tls_only" : c.code < 4100 ? "refused" : c.code < 4200 ? "backoff" : c.code < 4300 ? "retry" : "refused";
              },
              getCloseError: function(c) {
                return c.code !== 1e3 && c.code !== 1001 ? {
                  type: "PusherError",
                  data: {
                    code: c.code,
                    message: c.reason || c.message
                  }
                } : null;
              }
            }, cr = Ha;
            class Hc extends jt {
              constructor(a, l) {
                super(), this.id = a, this.transport = l, this.activityTimeout = l.activityTimeout, this.bindListeners();
              }
              handlesActivityChecks() {
                return this.transport.handlesActivityChecks();
              }
              send(a) {
                return this.transport.send(a);
              }
              send_event(a, l, m) {
                var b = { event: a, data: l };
                return m && (b.channel = m), J.debug("Event sent", b), this.send(cr.encodeMessage(b));
              }
              ping() {
                this.transport.supportsPing() ? this.transport.ping() : this.send_event("pusher:ping", {});
              }
              close() {
                this.transport.close();
              }
              bindListeners() {
                var a = {
                  message: (m) => {
                    var b;
                    try {
                      b = cr.decodeMessage(m);
                    } catch (R) {
                      this.emit("error", {
                        type: "MessageParseError",
                        error: R,
                        data: m.data
                      });
                    }
                    if (b !== void 0) {
                      switch (J.debug("Event recd", b), b.event) {
                        case "pusher:error":
                          this.emit("error", {
                            type: "PusherError",
                            data: b.data
                          });
                          break;
                        case "pusher:ping":
                          this.emit("ping");
                          break;
                        case "pusher:pong":
                          this.emit("pong");
                          break;
                      }
                      this.emit("message", b);
                    }
                  },
                  activity: () => {
                    this.emit("activity");
                  },
                  error: (m) => {
                    this.emit("error", m);
                  },
                  closed: (m) => {
                    l(), m && m.code && this.handleCloseEvent(m), this.transport = null, this.emit("closed");
                  }
                }, l = () => {
                  Ne(a, (m, b) => {
                    this.transport.unbind(b, m);
                  });
                };
                Ne(a, (m, b) => {
                  this.transport.bind(b, m);
                });
              }
              handleCloseEvent(a) {
                var l = cr.getCloseAction(a), m = cr.getCloseError(a);
                m && this.emit("error", m), l && this.emit(l, { action: l, error: m });
              }
            }
            class Bc {
              constructor(a, l) {
                this.transport = a, this.callback = l, this.bindListeners();
              }
              close() {
                this.unbindListeners(), this.transport.close();
              }
              bindListeners() {
                this.onMessage = (a) => {
                  this.unbindListeners();
                  var l;
                  try {
                    l = cr.processHandshake(a);
                  } catch (m) {
                    this.finish("error", { error: m }), this.transport.close();
                    return;
                  }
                  l.action === "connected" ? this.finish("connected", {
                    connection: new Hc(l.id, this.transport),
                    activityTimeout: l.activityTimeout
                  }) : (this.finish(l.action, { error: l.error }), this.transport.close());
                }, this.onClosed = (a) => {
                  this.unbindListeners();
                  var l = cr.getCloseAction(a) || "backoff", m = cr.getCloseError(a);
                  this.finish(l, { error: m });
                }, this.transport.bind("message", this.onMessage), this.transport.bind("closed", this.onClosed);
              }
              unbindListeners() {
                this.transport.unbind("message", this.onMessage), this.transport.unbind("closed", this.onClosed);
              }
              finish(a, l) {
                this.callback(le({ transport: this.transport, action: a }, l));
              }
            }
            class $c {
              constructor(a, l) {
                this.timeline = a, this.options = l || {};
              }
              send(a, l) {
                this.timeline.isEmpty() || this.timeline.send(ne.TimelineTransport.getAgent(this, a), l);
              }
            }
            class vs extends jt {
              constructor(a, l) {
                super(function(m, b) {
                  J.debug("No callbacks on " + a + " for " + m);
                }), this.name = a, this.pusher = l, this.subscribed = !1, this.subscriptionPending = !1, this.subscriptionCancelled = !1;
              }
              authorize(a, l) {
                return l(null, { auth: "" });
              }
              trigger(a, l) {
                if (a.indexOf("client-") !== 0)
                  throw new _("Event '" + a + "' does not start with 'client-'");
                if (!this.subscribed) {
                  var m = w.buildLogSuffix("triggeringClientEvents");
                  J.warn(`Client event triggered before channel 'subscription_succeeded' event . ${m}`);
                }
                return this.pusher.send_event(a, l, this.name);
              }
              disconnect() {
                this.subscribed = !1, this.subscriptionPending = !1;
              }
              handleEvent(a) {
                var l = a.event, m = a.data;
                if (l === "pusher_internal:subscription_succeeded")
                  this.handleSubscriptionSucceededEvent(a);
                else if (l === "pusher_internal:subscription_count")
                  this.handleSubscriptionCountEvent(a);
                else if (l.indexOf("pusher_internal:") !== 0) {
                  var b = {};
                  this.emit(l, m, b);
                }
              }
              handleSubscriptionSucceededEvent(a) {
                this.subscriptionPending = !1, this.subscribed = !0, this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : this.emit("pusher:subscription_succeeded", a.data);
              }
              handleSubscriptionCountEvent(a) {
                a.data.subscription_count && (this.subscriptionCount = a.data.subscription_count), this.emit("pusher:subscription_count", a.data);
              }
              subscribe() {
                this.subscribed || (this.subscriptionPending = !0, this.subscriptionCancelled = !1, this.authorize(this.pusher.connection.socket_id, (a, l) => {
                  a ? (this.subscriptionPending = !1, J.error(a.toString()), this.emit("pusher:subscription_error", Object.assign({}, {
                    type: "AuthError",
                    error: a.message
                  }, a instanceof te ? { status: a.status } : {}))) : this.pusher.send_event("pusher:subscribe", {
                    auth: l.auth,
                    channel_data: l.channel_data,
                    channel: this.name
                  });
                }));
              }
              unsubscribe() {
                this.subscribed = !1, this.pusher.send_event("pusher:unsubscribe", {
                  channel: this.name
                });
              }
              cancelSubscription() {
                this.subscriptionCancelled = !0;
              }
              reinstateSubscription() {
                this.subscriptionCancelled = !1;
              }
            }
            class ws extends vs {
              authorize(a, l) {
                return this.pusher.config.channelAuthorizer({
                  channelName: this.name,
                  socketId: a
                }, l);
              }
            }
            class Wc {
              constructor() {
                this.reset();
              }
              get(a) {
                return Object.prototype.hasOwnProperty.call(this.members, a) ? {
                  id: a,
                  info: this.members[a]
                } : null;
              }
              each(a) {
                Ne(this.members, (l, m) => {
                  a(this.get(m));
                });
              }
              setMyID(a) {
                this.myID = a;
              }
              onSubscription(a) {
                this.members = a.presence.hash, this.count = a.presence.count, this.me = this.get(this.myID);
              }
              addMember(a) {
                return this.get(a.user_id) === null && this.count++, this.members[a.user_id] = a.user_info, this.get(a.user_id);
              }
              removeMember(a) {
                var l = this.get(a.user_id);
                return l && (delete this.members[a.user_id], this.count--), l;
              }
              reset() {
                this.members = {}, this.count = 0, this.myID = null, this.me = null;
              }
            }
            var Vc = function(c, a, l, m) {
              function b(R) {
                return R instanceof l ? R : new l(function(j) {
                  j(R);
                });
              }
              return new (l || (l = Promise))(function(R, j) {
                function $(we) {
                  try {
                    pe(m.next(we));
                  } catch (Le) {
                    j(Le);
                  }
                }
                function re(we) {
                  try {
                    pe(m.throw(we));
                  } catch (Le) {
                    j(Le);
                  }
                }
                function pe(we) {
                  we.done ? R(we.value) : b(we.value).then($, re);
                }
                pe((m = m.apply(c, a || [])).next());
              });
            };
            class Qc extends ws {
              constructor(a, l) {
                super(a, l), this.members = new Wc();
              }
              authorize(a, l) {
                super.authorize(a, (m, b) => Vc(this, void 0, void 0, function* () {
                  if (!m)
                    if (b = b, b.channel_data != null) {
                      var R = JSON.parse(b.channel_data);
                      this.members.setMyID(R.user_id);
                    } else if (yield this.pusher.user.signinDonePromise, this.pusher.user.user_data != null)
                      this.members.setMyID(this.pusher.user.user_data.id);
                    else {
                      let j = w.buildLogSuffix("authorizationEndpoint");
                      J.error(`Invalid auth response for channel '${this.name}', expected 'channel_data' field. ${j}, or the user should be signed in.`), l("Invalid auth response");
                      return;
                    }
                  l(m, b);
                }));
              }
              handleEvent(a) {
                var l = a.event;
                if (l.indexOf("pusher_internal:") === 0)
                  this.handleInternalEvent(a);
                else {
                  var m = a.data, b = {};
                  a.user_id && (b.user_id = a.user_id), this.emit(l, m, b);
                }
              }
              handleInternalEvent(a) {
                var l = a.event, m = a.data;
                switch (l) {
                  case "pusher_internal:subscription_succeeded":
                    this.handleSubscriptionSucceededEvent(a);
                    break;
                  case "pusher_internal:subscription_count":
                    this.handleSubscriptionCountEvent(a);
                    break;
                  case "pusher_internal:member_added":
                    var b = this.members.addMember(m);
                    this.emit("pusher:member_added", b);
                    break;
                  case "pusher_internal:member_removed":
                    var R = this.members.removeMember(m);
                    R && this.emit("pusher:member_removed", R);
                    break;
                }
              }
              handleSubscriptionSucceededEvent(a) {
                this.subscriptionPending = !1, this.subscribed = !0, this.subscriptionCancelled ? this.pusher.unsubscribe(this.name) : (this.members.onSubscription(a.data), this.emit("pusher:subscription_succeeded", this.members));
              }
              disconnect() {
                this.members.reset(), super.disconnect();
              }
            }
            var Yc = h(978), ks = h(594);
            class Gc extends ws {
              constructor(a, l, m) {
                super(a, l), this.key = null, this.nacl = m;
              }
              authorize(a, l) {
                super.authorize(a, (m, b) => {
                  if (m) {
                    l(m, b);
                    return;
                  }
                  let R = b.shared_secret;
                  if (!R) {
                    l(new Error(`No shared_secret key in auth payload for encrypted channel: ${this.name}`), null);
                    return;
                  }
                  this.key = (0, ks.decode)(R), delete b.shared_secret, l(null, b);
                });
              }
              trigger(a, l) {
                throw new M("Client events are not currently supported for encrypted channels");
              }
              handleEvent(a) {
                var l = a.event, m = a.data;
                if (l.indexOf("pusher_internal:") === 0 || l.indexOf("pusher:") === 0) {
                  super.handleEvent(a);
                  return;
                }
                this.handleEncryptedEvent(l, m);
              }
              handleEncryptedEvent(a, l) {
                if (!this.key) {
                  J.debug("Received encrypted event before key has been retrieved from the authEndpoint");
                  return;
                }
                if (!l.ciphertext || !l.nonce) {
                  J.error("Unexpected format for encrypted event, expected object with `ciphertext` and `nonce` fields, got: " + l);
                  return;
                }
                let m = (0, ks.decode)(l.ciphertext);
                if (m.length < this.nacl.secretbox.overheadLength) {
                  J.error(`Expected encrypted event ciphertext length to be ${this.nacl.secretbox.overheadLength}, got: ${m.length}`);
                  return;
                }
                let b = (0, ks.decode)(l.nonce);
                if (b.length < this.nacl.secretbox.nonceLength) {
                  J.error(`Expected encrypted event nonce length to be ${this.nacl.secretbox.nonceLength}, got: ${b.length}`);
                  return;
                }
                let R = this.nacl.secretbox.open(m, b, this.key);
                if (R === null) {
                  J.debug("Failed to decrypt an event, probably because it was encrypted with a different key. Fetching a new key from the authEndpoint..."), this.authorize(this.pusher.connection.socket_id, (j, $) => {
                    if (j) {
                      J.error(`Failed to make a request to the authEndpoint: ${$}. Unable to fetch new key, so dropping encrypted event`);
                      return;
                    }
                    if (R = this.nacl.secretbox.open(m, b, this.key), R === null) {
                      J.error("Failed to decrypt event with new key. Dropping encrypted event");
                      return;
                    }
                    this.emit(a, this.getDataToEmit(R));
                  });
                  return;
                }
                this.emit(a, this.getDataToEmit(R));
              }
              getDataToEmit(a) {
                let l = (0, Yc.D4)(a);
                try {
                  return JSON.parse(l);
                } catch {
                  return l;
                }
              }
            }
            class Xc extends jt {
              constructor(a, l) {
                super(), this.state = "initialized", this.connection = null, this.key = a, this.options = l, this.timeline = this.options.timeline, this.usingTLS = this.options.useTLS, this.errorCallbacks = this.buildErrorCallbacks(), this.connectionCallbacks = this.buildConnectionCallbacks(this.errorCallbacks), this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);
                var m = ne.getNetwork();
                m.bind("online", () => {
                  this.timeline.info({ netinfo: "online" }), (this.state === "connecting" || this.state === "unavailable") && this.retryIn(0);
                }), m.bind("offline", () => {
                  this.timeline.info({ netinfo: "offline" }), this.connection && this.sendActivityCheck();
                }), this.updateStrategy();
              }
              switchCluster(a) {
                this.key = a, this.updateStrategy(), this.retryIn(0);
              }
              connect() {
                if (!(this.connection || this.runner)) {
                  if (!this.strategy.isSupported()) {
                    this.updateState("failed");
                    return;
                  }
                  this.updateState("connecting"), this.startConnecting(), this.setUnavailableTimer();
                }
              }
              send(a) {
                return this.connection ? this.connection.send(a) : !1;
              }
              send_event(a, l, m) {
                return this.connection ? this.connection.send_event(a, l, m) : !1;
              }
              disconnect() {
                this.disconnectInternally(), this.updateState("disconnected");
              }
              isUsingTLS() {
                return this.usingTLS;
              }
              startConnecting() {
                var a = (l, m) => {
                  l ? this.runner = this.strategy.connect(0, a) : m.action === "error" ? (this.emit("error", {
                    type: "HandshakeError",
                    error: m.error
                  }), this.timeline.error({ handshakeError: m.error })) : (this.abortConnecting(), this.handshakeCallbacks[m.action](m));
                };
                this.runner = this.strategy.connect(0, a);
              }
              abortConnecting() {
                this.runner && (this.runner.abort(), this.runner = null);
              }
              disconnectInternally() {
                if (this.abortConnecting(), this.clearRetryTimer(), this.clearUnavailableTimer(), this.connection) {
                  var a = this.abandonConnection();
                  a.close();
                }
              }
              updateStrategy() {
                this.strategy = this.options.getStrategy({
                  key: this.key,
                  timeline: this.timeline,
                  useTLS: this.usingTLS
                });
              }
              retryIn(a) {
                this.timeline.info({ action: "retry", delay: a }), a > 0 && this.emit("connecting_in", Math.round(a / 1e3)), this.retryTimer = new ce(a || 0, () => {
                  this.disconnectInternally(), this.connect();
                });
              }
              clearRetryTimer() {
                this.retryTimer && (this.retryTimer.ensureAborted(), this.retryTimer = null);
              }
              setUnavailableTimer() {
                this.unavailableTimer = new ce(this.options.unavailableTimeout, () => {
                  this.updateState("unavailable");
                });
              }
              clearUnavailableTimer() {
                this.unavailableTimer && this.unavailableTimer.ensureAborted();
              }
              sendActivityCheck() {
                this.stopActivityCheck(), this.connection.ping(), this.activityTimer = new ce(this.options.pongTimeout, () => {
                  this.timeline.error({ pong_timed_out: this.options.pongTimeout }), this.retryIn(0);
                });
              }
              resetActivityCheck() {
                this.stopActivityCheck(), this.connection && !this.connection.handlesActivityChecks() && (this.activityTimer = new ce(this.activityTimeout, () => {
                  this.sendActivityCheck();
                }));
              }
              stopActivityCheck() {
                this.activityTimer && this.activityTimer.ensureAborted();
              }
              buildConnectionCallbacks(a) {
                return le({}, a, {
                  message: (l) => {
                    this.resetActivityCheck(), this.emit("message", l);
                  },
                  ping: () => {
                    this.send_event("pusher:pong", {});
                  },
                  activity: () => {
                    this.resetActivityCheck();
                  },
                  error: (l) => {
                    this.emit("error", l);
                  },
                  closed: () => {
                    this.abandonConnection(), this.shouldRetry() && this.retryIn(1e3);
                  }
                });
              }
              buildHandshakeCallbacks(a) {
                return le({}, a, {
                  connected: (l) => {
                    this.activityTimeout = Math.min(this.options.activityTimeout, l.activityTimeout, l.connection.activityTimeout || 1 / 0), this.clearUnavailableTimer(), this.setConnection(l.connection), this.socket_id = this.connection.id, this.updateState("connected", { socket_id: this.socket_id });
                  }
                });
              }
              buildErrorCallbacks() {
                let a = (l) => (m) => {
                  m.error && this.emit("error", { type: "WebSocketError", error: m.error }), l(m);
                };
                return {
                  tls_only: a(() => {
                    this.usingTLS = !0, this.updateStrategy(), this.retryIn(0);
                  }),
                  refused: a(() => {
                    this.disconnect();
                  }),
                  backoff: a(() => {
                    this.retryIn(1e3);
                  }),
                  retry: a(() => {
                    this.retryIn(0);
                  })
                };
              }
              setConnection(a) {
                this.connection = a;
                for (var l in this.connectionCallbacks)
                  this.connection.bind(l, this.connectionCallbacks[l]);
                this.resetActivityCheck();
              }
              abandonConnection() {
                if (this.connection) {
                  this.stopActivityCheck();
                  for (var a in this.connectionCallbacks)
                    this.connection.unbind(a, this.connectionCallbacks[a]);
                  var l = this.connection;
                  return this.connection = null, l;
                }
              }
              updateState(a, l) {
                var m = this.state;
                if (this.state = a, m !== a) {
                  var b = a;
                  b === "connected" && (b += " with new socket ID " + l.socket_id), J.debug("State changed", m + " -> " + b), this.timeline.info({ state: a, params: l }), this.emit("state_change", { previous: m, current: a }), this.emit(a, l);
                }
              }
              shouldRetry() {
                return this.state === "connecting" || this.state === "connected";
              }
            }
            class Kc {
              constructor() {
                this.channels = {};
              }
              add(a, l) {
                return this.channels[a] || (this.channels[a] = Jc(a, l)), this.channels[a];
              }
              all() {
                return Lt(this.channels);
              }
              find(a) {
                return this.channels[a];
              }
              remove(a) {
                var l = this.channels[a];
                return delete this.channels[a], l;
              }
              disconnect() {
                Ne(this.channels, function(a) {
                  a.disconnect();
                });
              }
            }
            function Jc(c, a) {
              if (c.indexOf("private-encrypted-") === 0) {
                if (a.config.nacl)
                  return Ft.createEncryptedChannel(c, a, a.config.nacl);
                let l = "Tried to subscribe to a private-encrypted- channel but no nacl implementation available", m = w.buildLogSuffix("encryptedChannelSupport");
                throw new M(`${l}. ${m}`);
              } else {
                if (c.indexOf("private-") === 0)
                  return Ft.createPrivateChannel(c, a);
                if (c.indexOf("presence-") === 0)
                  return Ft.createPresenceChannel(c, a);
                if (c.indexOf("#") === 0)
                  throw new E('Cannot create a channel with name "' + c + '".');
                return Ft.createChannel(c, a);
              }
            }
            var Zc = {
              createChannels() {
                return new Kc();
              },
              createConnectionManager(c, a) {
                return new Xc(c, a);
              },
              createChannel(c, a) {
                return new vs(c, a);
              },
              createPrivateChannel(c, a) {
                return new ws(c, a);
              },
              createPresenceChannel(c, a) {
                return new Qc(c, a);
              },
              createEncryptedChannel(c, a, l) {
                return new Gc(c, a, l);
              },
              createTimelineSender(c, a) {
                return new $c(c, a);
              },
              createHandshake(c, a) {
                return new Bc(c, a);
              },
              createAssistantToTheTransportManager(c, a, l) {
                return new qc(c, a, l);
              }
            };
            const Ft = Zc;
            class Ba {
              constructor(a) {
                this.options = a || {}, this.livesLeft = this.options.lives || 1 / 0;
              }
              getAssistant(a) {
                return Ft.createAssistantToTheTransportManager(this, a, {
                  minPingDelay: this.options.minPingDelay,
                  maxPingDelay: this.options.maxPingDelay
                });
              }
              isAlive() {
                return this.livesLeft > 0;
              }
              reportDeath() {
                this.livesLeft -= 1;
              }
            }
            class ur {
              constructor(a, l) {
                this.strategies = a, this.loop = !!l.loop, this.failFast = !!l.failFast, this.timeout = l.timeout, this.timeoutLimit = l.timeoutLimit;
              }
              isSupported() {
                return gt(this.strategies, Y.method("isSupported"));
              }
              connect(a, l) {
                var m = this.strategies, b = 0, R = this.timeout, j = null, $ = (re, pe) => {
                  pe ? l(null, pe) : (b = b + 1, this.loop && (b = b % m.length), b < m.length ? (R && (R = R * 2, this.timeoutLimit && (R = Math.min(R, this.timeoutLimit))), j = this.tryStrategy(m[b], a, { timeout: R, failFast: this.failFast }, $)) : l(!0));
                };
                return j = this.tryStrategy(m[b], a, { timeout: R, failFast: this.failFast }, $), {
                  abort: function() {
                    j.abort();
                  },
                  forceMinPriority: function(re) {
                    a = re, j && j.forceMinPriority(re);
                  }
                };
              }
              tryStrategy(a, l, m, b) {
                var R = null, j = null;
                return m.timeout > 0 && (R = new ce(m.timeout, function() {
                  j.abort(), b(!0);
                })), j = a.connect(l, function($, re) {
                  $ && R && R.isRunning() && !m.failFast || (R && R.ensureAborted(), b($, re));
                }), {
                  abort: function() {
                    R && R.ensureAborted(), j.abort();
                  },
                  forceMinPriority: function($) {
                    j.forceMinPriority($);
                  }
                };
              }
            }
            class Ss {
              constructor(a) {
                this.strategies = a;
              }
              isSupported() {
                return gt(this.strategies, Y.method("isSupported"));
              }
              connect(a, l) {
                return eu(this.strategies, a, function(m, b) {
                  return function(R, j) {
                    if (b[m].error = R, R) {
                      tu(b) && l(!0);
                      return;
                    }
                    $e(b, function($) {
                      $.forceMinPriority(j.transport.priority);
                    }), l(null, j);
                  };
                });
              }
            }
            function eu(c, a, l) {
              var m = We(c, function(b, R, j, $) {
                return b.connect(a, l(R, $));
              });
              return {
                abort: function() {
                  $e(m, ru);
                },
                forceMinPriority: function(b) {
                  $e(m, function(R) {
                    R.forceMinPriority(b);
                  });
                }
              };
            }
            function tu(c) {
              return lr(c, function(a) {
                return !!a.error;
              });
            }
            function ru(c) {
              !c.error && !c.aborted && (c.abort(), c.aborted = !0);
            }
            class nu {
              constructor(a, l, m) {
                this.strategy = a, this.transports = l, this.ttl = m.ttl || 18e5, this.usingTLS = m.useTLS, this.timeline = m.timeline;
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(a, l) {
                var m = this.usingTLS, b = su(m), R = b && b.cacheSkipCount ? b.cacheSkipCount : 0, j = [this.strategy];
                if (b && b.timestamp + this.ttl >= Y.now()) {
                  var $ = this.transports[b.transport];
                  $ && (["ws", "wss"].includes(b.transport) || R > 3 ? (this.timeline.info({
                    cached: !0,
                    transport: b.transport,
                    latency: b.latency
                  }), j.push(new ur([$], {
                    timeout: b.latency * 2 + 1e3,
                    failFast: !0
                  }))) : R++);
                }
                var re = Y.now(), pe = j.pop().connect(a, function we(Le, Wn) {
                  Le ? ($a(m), j.length > 0 ? (re = Y.now(), pe = j.pop().connect(a, we)) : l(Le)) : (au(m, Wn.transport.name, Y.now() - re, R), l(null, Wn));
                });
                return {
                  abort: function() {
                    pe.abort();
                  },
                  forceMinPriority: function(we) {
                    a = we, pe && pe.forceMinPriority(we);
                  }
                };
              }
            }
            function Ns(c) {
              return "pusherTransport" + (c ? "TLS" : "NonTLS");
            }
            function su(c) {
              var a = ne.getLocalStorage();
              if (a)
                try {
                  var l = a[Ns(c)];
                  if (l)
                    return JSON.parse(l);
                } catch {
                  $a(c);
                }
              return null;
            }
            function au(c, a, l, m) {
              var b = ne.getLocalStorage();
              if (b)
                try {
                  b[Ns(c)] = Se({
                    timestamp: Y.now(),
                    transport: a,
                    latency: l,
                    cacheSkipCount: m
                  });
                } catch {
                }
            }
            function $a(c) {
              var a = ne.getLocalStorage();
              if (a)
                try {
                  delete a[Ns(c)];
                } catch {
                }
            }
            class Hn {
              constructor(a, { delay: l }) {
                this.strategy = a, this.options = { delay: l };
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(a, l) {
                var m = this.strategy, b, R = new ce(this.options.delay, function() {
                  b = m.connect(a, l);
                });
                return {
                  abort: function() {
                    R.ensureAborted(), b && b.abort();
                  },
                  forceMinPriority: function(j) {
                    a = j, b && b.forceMinPriority(j);
                  }
                };
              }
            }
            class mn {
              constructor(a, l, m) {
                this.test = a, this.trueBranch = l, this.falseBranch = m;
              }
              isSupported() {
                var a = this.test() ? this.trueBranch : this.falseBranch;
                return a.isSupported();
              }
              connect(a, l) {
                var m = this.test() ? this.trueBranch : this.falseBranch;
                return m.connect(a, l);
              }
            }
            class iu {
              constructor(a) {
                this.strategy = a;
              }
              isSupported() {
                return this.strategy.isSupported();
              }
              connect(a, l) {
                var m = this.strategy.connect(a, function(b, R) {
                  R && m.abort(), l(b, R);
                });
                return m;
              }
            }
            function pn(c) {
              return function() {
                return c.isSupported();
              };
            }
            var ou = function(c, a, l) {
              var m = {};
              function b(ni, sd, ad, id, od) {
                var si = l(c, ni, sd, ad, id, od);
                return m[ni] = si, si;
              }
              var R = Object.assign({}, a, {
                hostNonTLS: c.wsHost + ":" + c.wsPort,
                hostTLS: c.wsHost + ":" + c.wssPort,
                httpPath: c.wsPath
              }), j = Object.assign({}, R, {
                useTLS: !0
              }), $ = Object.assign({}, a, {
                hostNonTLS: c.httpHost + ":" + c.httpPort,
                hostTLS: c.httpHost + ":" + c.httpsPort,
                httpPath: c.httpPath
              }), re = {
                loop: !0,
                timeout: 15e3,
                timeoutLimit: 6e4
              }, pe = new Ba({
                minPingDelay: 1e4,
                maxPingDelay: c.activityTimeout
              }), we = new Ba({
                lives: 2,
                minPingDelay: 1e4,
                maxPingDelay: c.activityTimeout
              }), Le = b("ws", "ws", 3, R, pe), Wn = b("wss", "ws", 3, j, pe), Zu = b("sockjs", "sockjs", 1, $), Ka = b("xhr_streaming", "xhr_streaming", 1, $, we), ed = b("xdr_streaming", "xdr_streaming", 1, $, we), Ja = b("xhr_polling", "xhr_polling", 1, $), td = b("xdr_polling", "xdr_polling", 1, $), Za = new ur([Le], re), rd = new ur([Wn], re), nd = new ur([Zu], re), ei = new ur([
                new mn(pn(Ka), Ka, ed)
              ], re), ti = new ur([
                new mn(pn(Ja), Ja, td)
              ], re), ri = new ur([
                new mn(pn(ei), new Ss([
                  ei,
                  new Hn(ti, { delay: 4e3 })
                ]), ti)
              ], re), Ts = new mn(pn(ri), ri, nd), Ps;
              return a.useTLS ? Ps = new Ss([
                Za,
                new Hn(Ts, { delay: 2e3 })
              ]) : Ps = new Ss([
                Za,
                new Hn(rd, { delay: 2e3 }),
                new Hn(Ts, { delay: 5e3 })
              ]), new nu(new iu(new mn(pn(Le), Ps, Ts)), m, {
                ttl: 18e5,
                timeline: a.timeline,
                useTLS: a.useTLS
              });
            };
            const lu = ou;
            function cu() {
              var c = this;
              c.timeline.info(c.buildTimelineMessage({
                transport: c.name + (c.options.useTLS ? "s" : "")
              })), c.hooks.isInitialized() ? c.changeState("initialized") : c.hooks.file ? (c.changeState("initializing"), P.load(c.hooks.file, { useTLS: c.options.useTLS }, function(a, l) {
                c.hooks.isInitialized() ? (c.changeState("initialized"), l(!0)) : (a && c.onError(a), c.onClose(), l(!1));
              })) : c.onClose();
            }
            var uu = {
              getRequest: function(c) {
                var a = new window.XDomainRequest();
                return a.ontimeout = function() {
                  c.emit("error", new z()), c.close();
                }, a.onerror = function(l) {
                  c.emit("error", l), c.close();
                }, a.onprogress = function() {
                  a.responseText && a.responseText.length > 0 && c.onChunk(200, a.responseText);
                }, a.onload = function() {
                  a.responseText && a.responseText.length > 0 && c.onChunk(200, a.responseText), c.emit("finished", 200), c.close();
                }, a;
              },
              abortRequest: function(c) {
                c.ontimeout = c.onerror = c.onprogress = c.onload = null, c.abort();
              }
            };
            const du = uu, hu = 256 * 1024;
            class fu extends jt {
              constructor(a, l, m) {
                super(), this.hooks = a, this.method = l, this.url = m;
              }
              start(a) {
                this.position = 0, this.xhr = this.hooks.getRequest(this), this.unloader = () => {
                  this.close();
                }, ne.addUnloadListener(this.unloader), this.xhr.open(this.method, this.url, !0), this.xhr.setRequestHeader && this.xhr.setRequestHeader("Content-Type", "application/json"), this.xhr.send(a);
              }
              close() {
                this.unloader && (ne.removeUnloadListener(this.unloader), this.unloader = null), this.xhr && (this.hooks.abortRequest(this.xhr), this.xhr = null);
              }
              onChunk(a, l) {
                for (; ; ) {
                  var m = this.advanceBuffer(l);
                  if (m)
                    this.emit("chunk", { status: a, data: m });
                  else
                    break;
                }
                this.isBufferTooLong(l) && this.emit("buffer_too_long");
              }
              advanceBuffer(a) {
                var l = a.slice(this.position), m = l.indexOf(`
`);
                return m !== -1 ? (this.position += m + 1, l.slice(0, m)) : null;
              }
              isBufferTooLong(a) {
                return this.position === a.length && a.length > hu;
              }
            }
            var Cs;
            (function(c) {
              c[c.CONNECTING = 0] = "CONNECTING", c[c.OPEN = 1] = "OPEN", c[c.CLOSED = 3] = "CLOSED";
            })(Cs || (Cs = {}));
            const dr = Cs;
            var mu = 1;
            class pu {
              constructor(a, l) {
                this.hooks = a, this.session = Va(1e3) + "/" + xu(8), this.location = gu(l), this.readyState = dr.CONNECTING, this.openStream();
              }
              send(a) {
                return this.sendRaw(JSON.stringify([a]));
              }
              ping() {
                this.hooks.sendHeartbeat(this);
              }
              close(a, l) {
                this.onClose(a, l, !0);
              }
              sendRaw(a) {
                if (this.readyState === dr.OPEN)
                  try {
                    return ne.createSocketRequest("POST", Wa(bu(this.location, this.session))).start(a), !0;
                  } catch {
                    return !1;
                  }
                else
                  return !1;
              }
              reconnect() {
                this.closeStream(), this.openStream();
              }
              onClose(a, l, m) {
                this.closeStream(), this.readyState = dr.CLOSED, this.onclose && this.onclose({
                  code: a,
                  reason: l,
                  wasClean: m
                });
              }
              onChunk(a) {
                if (a.status === 200) {
                  this.readyState === dr.OPEN && this.onActivity();
                  var l, m = a.data.slice(0, 1);
                  switch (m) {
                    case "o":
                      l = JSON.parse(a.data.slice(1) || "{}"), this.onOpen(l);
                      break;
                    case "a":
                      l = JSON.parse(a.data.slice(1) || "[]");
                      for (var b = 0; b < l.length; b++)
                        this.onEvent(l[b]);
                      break;
                    case "m":
                      l = JSON.parse(a.data.slice(1) || "null"), this.onEvent(l);
                      break;
                    case "h":
                      this.hooks.onHeartbeat(this);
                      break;
                    case "c":
                      l = JSON.parse(a.data.slice(1) || "[]"), this.onClose(l[0], l[1], !0);
                      break;
                  }
                }
              }
              onOpen(a) {
                this.readyState === dr.CONNECTING ? (a && a.hostname && (this.location.base = yu(this.location.base, a.hostname)), this.readyState = dr.OPEN, this.onopen && this.onopen()) : this.onClose(1006, "Server lost session", !0);
              }
              onEvent(a) {
                this.readyState === dr.OPEN && this.onmessage && this.onmessage({ data: a });
              }
              onActivity() {
                this.onactivity && this.onactivity();
              }
              onError(a) {
                this.onerror && this.onerror(a);
              }
              openStream() {
                this.stream = ne.createSocketRequest("POST", Wa(this.hooks.getReceiveURL(this.location, this.session))), this.stream.bind("chunk", (a) => {
                  this.onChunk(a);
                }), this.stream.bind("finished", (a) => {
                  this.hooks.onFinished(this, a);
                }), this.stream.bind("buffer_too_long", () => {
                  this.reconnect();
                });
                try {
                  this.stream.start();
                } catch (a) {
                  Y.defer(() => {
                    this.onError(a), this.onClose(1006, "Could not start streaming", !1);
                  });
                }
              }
              closeStream() {
                this.stream && (this.stream.unbind_all(), this.stream.close(), this.stream = null);
              }
            }
            function gu(c) {
              var a = /([^\?]*)\/*(\??.*)/.exec(c);
              return {
                base: a[1],
                queryString: a[2]
              };
            }
            function bu(c, a) {
              return c.base + "/" + a + "/xhr_send";
            }
            function Wa(c) {
              var a = c.indexOf("?") === -1 ? "?" : "&";
              return c + a + "t=" + +/* @__PURE__ */ new Date() + "&n=" + mu++;
            }
            function yu(c, a) {
              var l = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(c);
              return l[1] + a + l[3];
            }
            function Va(c) {
              return ne.randomInt(c);
            }
            function xu(c) {
              for (var a = [], l = 0; l < c; l++)
                a.push(Va(32).toString(32));
              return a.join("");
            }
            const vu = pu;
            var wu = {
              getReceiveURL: function(c, a) {
                return c.base + "/" + a + "/xhr_streaming" + c.queryString;
              },
              onHeartbeat: function(c) {
                c.sendRaw("[]");
              },
              sendHeartbeat: function(c) {
                c.sendRaw("[]");
              },
              onFinished: function(c, a) {
                c.onClose(1006, "Connection interrupted (" + a + ")", !1);
              }
            };
            const ku = wu;
            var Su = {
              getReceiveURL: function(c, a) {
                return c.base + "/" + a + "/xhr" + c.queryString;
              },
              onHeartbeat: function() {
              },
              sendHeartbeat: function(c) {
                c.sendRaw("[]");
              },
              onFinished: function(c, a) {
                a === 200 ? c.reconnect() : c.onClose(1006, "Connection interrupted (" + a + ")", !1);
              }
            };
            const Nu = Su;
            var Cu = {
              getRequest: function(c) {
                var a = ne.getXHRAPI(), l = new a();
                return l.onreadystatechange = l.onprogress = function() {
                  switch (l.readyState) {
                    case 3:
                      l.responseText && l.responseText.length > 0 && c.onChunk(l.status, l.responseText);
                      break;
                    case 4:
                      l.responseText && l.responseText.length > 0 && c.onChunk(l.status, l.responseText), c.emit("finished", l.status), c.close();
                      break;
                  }
                }, l;
              },
              abortRequest: function(c) {
                c.onreadystatechange = null, c.abort();
              }
            };
            const _u = Cu;
            var Tu = {
              createStreamingSocket(c) {
                return this.createSocket(ku, c);
              },
              createPollingSocket(c) {
                return this.createSocket(Nu, c);
              },
              createSocket(c, a) {
                return new vu(c, a);
              },
              createXHR(c, a) {
                return this.createRequest(_u, c, a);
              },
              createRequest(c, a, l) {
                return new fu(c, a, l);
              }
            };
            const Qa = Tu;
            Qa.createXDR = function(c, a) {
              return this.createRequest(du, c, a);
            };
            var Pu = {
              nextAuthCallbackID: 1,
              auth_callbacks: {},
              ScriptReceivers: p,
              DependenciesReceivers: T,
              getDefaultStrategy: lu,
              Transports: Fc,
              transportConnectionInitializer: cu,
              HTTPFactory: Qa,
              TimelineTransport: ge,
              getXHRAPI() {
                return window.XMLHttpRequest;
              },
              getWebSocketAPI() {
                return window.WebSocket || window.MozWebSocket;
              },
              setup(c) {
                if (typeof window < "u") {
                  window.Pusher = c;
                  var a = () => {
                    this.onDocumentBody(c.ready);
                  };
                  window.JSON ? a() : P.load("json2", {}, a);
                }
              },
              getDocument() {
                return document;
              },
              getProtocol() {
                return this.getDocument().location.protocol;
              },
              getAuthorizers() {
                return { ajax: me, jsonp: st };
              },
              onDocumentBody(c) {
                document.body ? c() : setTimeout(() => {
                  this.onDocumentBody(c);
                }, 0);
              },
              createJSONPRequest(c, a) {
                return new ht(c, a);
              },
              createScriptRequest(c) {
                return new ze(c);
              },
              getLocalStorage() {
                try {
                  return window.localStorage;
                } catch {
                  return;
                }
              },
              createXHR() {
                return this.getXHRAPI() ? this.createXMLHttpRequest() : this.createMicrosoftXHR();
              },
              createXMLHttpRequest() {
                var c = this.getXHRAPI();
                return new c();
              },
              createMicrosoftXHR() {
                return new ActiveXObject("Microsoft.XMLHTTP");
              },
              getNetwork() {
                return Uc;
              },
              createWebSocket(c) {
                var a = this.getWebSocketAPI();
                return new a(c);
              },
              createSocketRequest(c, a) {
                if (this.isXHRSupported())
                  return this.HTTPFactory.createXHR(c, a);
                if (this.isXDRSupported(a.indexOf("https:") === 0))
                  return this.HTTPFactory.createXDR(c, a);
                throw "Cross-origin HTTP requests are not supported";
              },
              isXHRSupported() {
                var c = this.getXHRAPI();
                return !!c && new c().withCredentials !== void 0;
              },
              isXDRSupported(c) {
                var a = c ? "https:" : "http:", l = this.getProtocol();
                return !!window.XDomainRequest && l === a;
              },
              addUnloadListener(c) {
                window.addEventListener !== void 0 ? window.addEventListener("pagehide", c, !1) : window.attachEvent !== void 0 && window.attachEvent("onunload", c);
              },
              removeUnloadListener(c) {
                window.addEventListener !== void 0 ? window.removeEventListener("pagehide", c, !1) : window.detachEvent !== void 0 && window.detachEvent("onunload", c);
              },
              randomInt(c) {
                const a = window.crypto || window.msCrypto, l = Math.floor(Math.pow(2, 32) / c) * c;
                let m;
                do
                  m = a.getRandomValues(new Uint32Array(1))[0];
                while (m >= l);
                return m % c;
              }
            };
            const ne = Pu;
            var _s;
            (function(c) {
              c[c.ERROR = 3] = "ERROR", c[c.INFO = 6] = "INFO", c[c.DEBUG = 7] = "DEBUG";
            })(_s || (_s = {}));
            const Bn = _s;
            class Eu {
              constructor(a, l, m) {
                this.key = a, this.session = l, this.events = [], this.options = m || {}, this.sent = 0, this.uniqueID = 0;
              }
              log(a, l) {
                a <= this.options.level && (this.events.push(le({}, l, { timestamp: Y.now() })), this.options.limit && this.events.length > this.options.limit && this.events.shift());
              }
              error(a) {
                this.log(Bn.ERROR, a);
              }
              info(a) {
                this.log(Bn.INFO, a);
              }
              debug(a) {
                this.log(Bn.DEBUG, a);
              }
              isEmpty() {
                return this.events.length === 0;
              }
              send(a, l) {
                var m = le({
                  session: this.session,
                  bundle: this.sent + 1,
                  key: this.key,
                  lib: "js",
                  version: this.options.version,
                  cluster: this.options.cluster,
                  features: this.options.features,
                  timeline: this.events
                }, this.options.params);
                return this.events = [], a(m, (b, R) => {
                  b || this.sent++, l && l(b, R);
                }), !0;
              }
              generateUniqueID() {
                return this.uniqueID++, this.uniqueID;
              }
            }
            class Ou {
              constructor(a, l, m, b) {
                this.name = a, this.priority = l, this.transport = m, this.options = b || {};
              }
              isSupported() {
                return this.transport.isSupported({
                  useTLS: this.options.useTLS
                });
              }
              connect(a, l) {
                if (this.isSupported()) {
                  if (this.priority < a)
                    return Ya(new D(), l);
                } else return Ya(new B(), l);
                var m = !1, b = this.transport.createConnection(this.name, this.priority, this.options.key, this.options), R = null, j = function() {
                  b.unbind("initialized", j), b.connect();
                }, $ = function() {
                  R = Ft.createHandshake(b, function(Le) {
                    m = !0, we(), l(null, Le);
                  });
                }, re = function(Le) {
                  we(), l(Le);
                }, pe = function() {
                  we();
                  var Le;
                  Le = Se(b), l(new O(Le));
                }, we = function() {
                  b.unbind("initialized", j), b.unbind("open", $), b.unbind("error", re), b.unbind("closed", pe);
                };
                return b.bind("initialized", j), b.bind("open", $), b.bind("error", re), b.bind("closed", pe), b.initialize(), {
                  abort: () => {
                    m || (we(), R ? R.close() : b.close());
                  },
                  forceMinPriority: (Le) => {
                    m || this.priority < Le && (R ? R.close() : b.close());
                  }
                };
              }
            }
            function Ya(c, a) {
              return Y.defer(function() {
                a(c);
              }), {
                abort: function() {
                },
                forceMinPriority: function() {
                }
              };
            }
            const { Transports: Ru } = ne;
            var Au = function(c, a, l, m, b, R) {
              var j = Ru[l];
              if (!j)
                throw new L(l);
              var $ = (!c.enabledTransports || Pe(c.enabledTransports, a) !== -1) && (!c.disabledTransports || Pe(c.disabledTransports, a) === -1), re;
              return $ ? (b = Object.assign({ ignoreNullOrigin: c.ignoreNullOrigin }, b), re = new Ou(a, m, R ? R.getAssistant(j) : j, b)) : re = Du, re;
            }, Du = {
              isSupported: function() {
                return !1;
              },
              connect: function(c, a) {
                var l = Y.defer(function() {
                  a(new B());
                });
                return {
                  abort: function() {
                    l.ensureAborted();
                  },
                  forceMinPriority: function() {
                  }
                };
              }
            };
            function Mu(c) {
              if (c == null)
                throw "You must pass an options object";
              if (c.cluster == null)
                throw "Options object must provide a cluster";
              "disableStats" in c && J.warn("The disableStats option is deprecated in favor of enableStats");
            }
            const zu = (c, a) => {
              var l = "socket_id=" + encodeURIComponent(c.socketId);
              for (var m in a.params)
                l += "&" + encodeURIComponent(m) + "=" + encodeURIComponent(a.params[m]);
              if (a.paramsProvider != null) {
                let b = a.paramsProvider();
                for (var m in b)
                  l += "&" + encodeURIComponent(m) + "=" + encodeURIComponent(b[m]);
              }
              return l;
            }, Lu = (c) => {
              if (typeof ne.getAuthorizers()[c.transport] > "u")
                throw `'${c.transport}' is not a recognized auth transport`;
              return (a, l) => {
                const m = zu(a, c);
                ne.getAuthorizers()[c.transport](ne, m, c, k.UserAuthentication, l);
              };
            }, ju = (c, a) => {
              var l = "socket_id=" + encodeURIComponent(c.socketId);
              l += "&channel_name=" + encodeURIComponent(c.channelName);
              for (var m in a.params)
                l += "&" + encodeURIComponent(m) + "=" + encodeURIComponent(a.params[m]);
              if (a.paramsProvider != null) {
                let b = a.paramsProvider();
                for (var m in b)
                  l += "&" + encodeURIComponent(m) + "=" + encodeURIComponent(b[m]);
              }
              return l;
            }, Fu = (c) => {
              if (typeof ne.getAuthorizers()[c.transport] > "u")
                throw `'${c.transport}' is not a recognized auth transport`;
              return (a, l) => {
                const m = ju(a, c);
                ne.getAuthorizers()[c.transport](ne, m, c, k.ChannelAuthorization, l);
              };
            }, Iu = (c, a, l) => {
              const m = {
                authTransport: a.transport,
                authEndpoint: a.endpoint,
                auth: {
                  params: a.params,
                  headers: a.headers
                }
              };
              return (b, R) => {
                const j = c.channel(b.channelName);
                l(j, m).authorize(b.socketId, R);
              };
            };
            function Ga(c, a) {
              let l = {
                activityTimeout: c.activityTimeout || y.activityTimeout,
                cluster: c.cluster,
                httpPath: c.httpPath || y.httpPath,
                httpPort: c.httpPort || y.httpPort,
                httpsPort: c.httpsPort || y.httpsPort,
                pongTimeout: c.pongTimeout || y.pongTimeout,
                statsHost: c.statsHost || y.stats_host,
                unavailableTimeout: c.unavailableTimeout || y.unavailableTimeout,
                wsPath: c.wsPath || y.wsPath,
                wsPort: c.wsPort || y.wsPort,
                wssPort: c.wssPort || y.wssPort,
                enableStats: $u(c),
                httpHost: Uu(c),
                useTLS: Bu(c),
                wsHost: qu(c),
                userAuthenticator: Wu(c),
                channelAuthorizer: Qu(c, a)
              };
              return "disabledTransports" in c && (l.disabledTransports = c.disabledTransports), "enabledTransports" in c && (l.enabledTransports = c.enabledTransports), "ignoreNullOrigin" in c && (l.ignoreNullOrigin = c.ignoreNullOrigin), "timelineParams" in c && (l.timelineParams = c.timelineParams), "nacl" in c && (l.nacl = c.nacl), l;
            }
            function Uu(c) {
              return c.httpHost ? c.httpHost : c.cluster ? `sockjs-${c.cluster}.pusher.com` : y.httpHost;
            }
            function qu(c) {
              return c.wsHost ? c.wsHost : Hu(c.cluster);
            }
            function Hu(c) {
              return `ws-${c}.pusher.com`;
            }
            function Bu(c) {
              return ne.getProtocol() === "https:" ? !0 : c.forceTLS !== !1;
            }
            function $u(c) {
              return "enableStats" in c ? c.enableStats : "disableStats" in c ? !c.disableStats : !1;
            }
            const Xa = (c) => "customHandler" in c && c.customHandler != null;
            function Wu(c) {
              const a = Object.assign(Object.assign({}, y.userAuthentication), c.userAuthentication);
              return Xa(a) ? a.customHandler : Lu(a);
            }
            function Vu(c, a) {
              let l;
              return "channelAuthorization" in c ? l = Object.assign(Object.assign({}, y.channelAuthorization), c.channelAuthorization) : (l = {
                transport: c.authTransport || y.authTransport,
                endpoint: c.authEndpoint || y.authEndpoint
              }, "auth" in c && ("params" in c.auth && (l.params = c.auth.params), "headers" in c.auth && (l.headers = c.auth.headers)), "authorizer" in c && (l.customHandler = Iu(a, l, c.authorizer))), l;
            }
            function Qu(c, a) {
              const l = Vu(c, a);
              return Xa(l) ? l.customHandler : Fu(l);
            }
            class Yu extends jt {
              constructor(a) {
                super(function(l, m) {
                  J.debug(`No callbacks on watchlist events for ${l}`);
                }), this.pusher = a, this.bindWatchlistInternalEvent();
              }
              handleEvent(a) {
                a.data.events.forEach((l) => {
                  this.emit(l.name, l);
                });
              }
              bindWatchlistInternalEvent() {
                this.pusher.connection.bind("message", (a) => {
                  var l = a.event;
                  l === "pusher_internal:watchlist_events" && this.handleEvent(a);
                });
              }
            }
            function Gu() {
              let c, a;
              return { promise: new Promise((m, b) => {
                c = m, a = b;
              }), resolve: c, reject: a };
            }
            const Xu = Gu;
            class Ku extends jt {
              constructor(a) {
                super(function(l, m) {
                  J.debug("No callbacks on user for " + l);
                }), this.signin_requested = !1, this.user_data = null, this.serverToUserChannel = null, this.signinDonePromise = null, this._signinDoneResolve = null, this._onAuthorize = (l, m) => {
                  if (l) {
                    J.warn(`Error during signin: ${l}`), this.emit("pusher:signin_error", Object.assign({}, {
                      type: "AuthError",
                      error: l.message
                    }, l instanceof te ? { status: l.status } : {})), this._cleanup();
                    return;
                  }
                  this.pusher.send_event("pusher:signin", {
                    auth: m.auth,
                    user_data: m.user_data
                  });
                }, this.pusher = a, this.pusher.connection.bind("state_change", ({ previous: l, current: m }) => {
                  l !== "connected" && m === "connected" && this._signin(), l === "connected" && m !== "connected" && (this._cleanup(), this._newSigninPromiseIfNeeded());
                }), this.watchlist = new Yu(a), this.pusher.connection.bind("message", (l) => {
                  var m = l.event;
                  m === "pusher:signin_success" && this._onSigninSuccess(l.data), this.serverToUserChannel && this.serverToUserChannel.name === l.channel && this.serverToUserChannel.handleEvent(l);
                });
              }
              signin() {
                this.signin_requested || (this.signin_requested = !0, this._signin());
              }
              _signin() {
                this.signin_requested && (this._newSigninPromiseIfNeeded(), this.pusher.connection.state === "connected" && this.pusher.config.userAuthenticator({
                  socketId: this.pusher.connection.socket_id
                }, this._onAuthorize));
              }
              _onSigninSuccess(a) {
                try {
                  this.user_data = JSON.parse(a.user_data);
                } catch {
                  J.error(`Failed parsing user data after signin: ${a.user_data}`), this._cleanup();
                  return;
                }
                if (typeof this.user_data.id != "string" || this.user_data.id === "") {
                  J.error(`user_data doesn't contain an id. user_data: ${this.user_data}`), this._cleanup();
                  return;
                }
                this._signinDoneResolve(), this._subscribeChannels();
              }
              _subscribeChannels() {
                const a = (l) => {
                  l.subscriptionPending && l.subscriptionCancelled ? l.reinstateSubscription() : !l.subscriptionPending && this.pusher.connection.state === "connected" && l.subscribe();
                };
                this.serverToUserChannel = new vs(`#server-to-user-${this.user_data.id}`, this.pusher), this.serverToUserChannel.bind_global((l, m) => {
                  l.indexOf("pusher_internal:") === 0 || l.indexOf("pusher:") === 0 || this.emit(l, m);
                }), a(this.serverToUserChannel);
              }
              _cleanup() {
                this.user_data = null, this.serverToUserChannel && (this.serverToUserChannel.unbind_all(), this.serverToUserChannel.disconnect(), this.serverToUserChannel = null), this.signin_requested && this._signinDoneResolve();
              }
              _newSigninPromiseIfNeeded() {
                if (!this.signin_requested || this.signinDonePromise && !this.signinDonePromise.done)
                  return;
                const { promise: a, resolve: l } = Xu();
                a.done = !1;
                const m = () => {
                  a.done = !0;
                };
                a.then(m).catch(m), this.signinDonePromise = a, this._signinDoneResolve = l;
              }
            }
            class Qe {
              static ready() {
                Qe.isReady = !0;
                for (var a = 0, l = Qe.instances.length; a < l; a++)
                  Qe.instances[a].connect();
              }
              static getClientFeatures() {
                return Re(Ve({ ws: ne.Transports.ws }, function(a) {
                  return a.isSupported({});
                }));
              }
              constructor(a, l) {
                Ju(a), Mu(l), this.key = a, this.options = l, this.config = Ga(this.options, this), this.channels = Ft.createChannels(), this.global_emitter = new jt(), this.sessionID = ne.randomInt(1e9), this.timeline = new Eu(this.key, this.sessionID, {
                  cluster: this.config.cluster,
                  features: Qe.getClientFeatures(),
                  params: this.config.timelineParams || {},
                  limit: 50,
                  level: Bn.INFO,
                  version: y.VERSION
                }), this.config.enableStats && (this.timelineSender = Ft.createTimelineSender(this.timeline, {
                  host: this.config.statsHost,
                  path: "/timeline/v2/" + ne.TimelineTransport.name
                }));
                var m = (b) => ne.getDefaultStrategy(this.config, b, Au);
                this.connection = Ft.createConnectionManager(this.key, {
                  getStrategy: m,
                  timeline: this.timeline,
                  activityTimeout: this.config.activityTimeout,
                  pongTimeout: this.config.pongTimeout,
                  unavailableTimeout: this.config.unavailableTimeout,
                  useTLS: !!this.config.useTLS
                }), this.connection.bind("connected", () => {
                  this.subscribeAll(), this.timelineSender && this.timelineSender.send(this.connection.isUsingTLS());
                }), this.connection.bind("message", (b) => {
                  var R = b.event, j = R.indexOf("pusher_internal:") === 0;
                  if (b.channel) {
                    var $ = this.channel(b.channel);
                    $ && $.handleEvent(b);
                  }
                  j || this.global_emitter.emit(b.event, b.data);
                }), this.connection.bind("connecting", () => {
                  this.channels.disconnect();
                }), this.connection.bind("disconnected", () => {
                  this.channels.disconnect();
                }), this.connection.bind("error", (b) => {
                  J.warn(b);
                }), Qe.instances.push(this), this.timeline.info({ instances: Qe.instances.length }), this.user = new Ku(this), Qe.isReady && this.connect();
              }
              switchCluster(a) {
                const { appKey: l, cluster: m } = a;
                this.key = l, this.options = Object.assign(Object.assign({}, this.options), { cluster: m }), this.config = Ga(this.options, this), this.connection.switchCluster(this.key);
              }
              channel(a) {
                return this.channels.find(a);
              }
              allChannels() {
                return this.channels.all();
              }
              connect() {
                if (this.connection.connect(), this.timelineSender && !this.timelineSenderTimer) {
                  var a = this.connection.isUsingTLS(), l = this.timelineSender;
                  this.timelineSenderTimer = new ee(6e4, function() {
                    l.send(a);
                  });
                }
              }
              disconnect() {
                this.connection.disconnect(), this.timelineSenderTimer && (this.timelineSenderTimer.ensureAborted(), this.timelineSenderTimer = null);
              }
              bind(a, l, m) {
                return this.global_emitter.bind(a, l, m), this;
              }
              unbind(a, l, m) {
                return this.global_emitter.unbind(a, l, m), this;
              }
              bind_global(a) {
                return this.global_emitter.bind_global(a), this;
              }
              unbind_global(a) {
                return this.global_emitter.unbind_global(a), this;
              }
              unbind_all(a) {
                return this.global_emitter.unbind_all(), this;
              }
              subscribeAll() {
                var a;
                for (a in this.channels.channels)
                  this.channels.channels.hasOwnProperty(a) && this.subscribe(a);
              }
              subscribe(a) {
                var l = this.channels.add(a, this);
                return l.subscriptionPending && l.subscriptionCancelled ? l.reinstateSubscription() : !l.subscriptionPending && this.connection.state === "connected" && l.subscribe(), l;
              }
              unsubscribe(a) {
                var l = this.channels.find(a);
                l && l.subscriptionPending ? l.cancelSubscription() : (l = this.channels.remove(a), l && l.subscribed && l.unsubscribe());
              }
              send_event(a, l, m) {
                return this.connection.send_event(a, l, m);
              }
              shouldUseTLS() {
                return this.config.useTLS;
              }
              signin() {
                this.user.signin();
              }
            }
            Qe.instances = [], Qe.isReady = !1, Qe.logToConsole = !1, Qe.Runtime = ne, Qe.ScriptReceivers = ne.ScriptReceivers, Qe.DependenciesReceivers = ne.DependenciesReceivers, Qe.auth_callbacks = ne.auth_callbacks;
            const $n = Qe;
            function Ju(c) {
              if (c == null)
                throw "You must pass your app key when you instantiate Pusher.";
            }
            ne.setup(Qe);
          }
          /******/
        }, n = {};
        function s(o) {
          var d = n[o];
          if (d !== void 0)
            return d.exports;
          var h = n[o] = {
            /******/
            // no module.id needed
            /******/
            // no module.loaded needed
            /******/
            exports: {}
            /******/
          };
          return r[o].call(h.exports, h, h.exports, s), h.exports;
        }
        s.d = (o, d) => {
          for (var h in d)
            s.o(d, h) && !s.o(o, h) && Object.defineProperty(o, h, { enumerable: !0, get: d[h] });
        }, s.o = (o, d) => Object.prototype.hasOwnProperty.call(o, d);
        var i = s(721);
        return i;
      })()
    ));
  })(Us)), Us.exports;
}
var kb = wb();
const Sb = /* @__PURE__ */ vb(kb);
function za(e) {
  return e != null && typeof e == "object" && "attributes" in e;
}
function at(e) {
  return e == null ? "" : String(e);
}
function Nb(e) {
  if (e == null || typeof e != "object") return;
  if (za(e)) return e;
  const t = e;
  return {
    id: at(t.id),
    type: "user",
    attributes: {
      user_auth_id: Number(t.user_auth_id),
      name: at(t.name),
      avatar_url: at(t.avatar_url),
      created_at: at(t.created_at),
      updated_at: at(t.updated_at)
    },
    relationships: []
  };
}
function Cb(e) {
  if (e == null || typeof e != "object") return;
  if (za(e)) return e;
  const t = e;
  return {
    id: at(t.id),
    type: "messageAttachment",
    attributes: {
      file_url: at(t.file_url),
      file_name: at(t.file_name),
      file_mime_type: at(t.file_mime_type),
      file_size: Number(t.file_size),
      created_at: at(t.created_at)
    },
    relationships: []
  };
}
function _b(e) {
  return typeof e == "string" ? { id: 0, name: e, icon: "" } : e != null && typeof e == "object" ? e : null;
}
function Tb(e) {
  if (e == null || typeof e != "object")
    return {
      id: "",
      type: "message",
      attributes: {},
      relationships: { sender: void 0, attachments: [] }
    };
  if (za(e)) return e;
  const t = e, r = Array.isArray(t.attachments) ? t.attachments.map(Cb).filter((n) => n != null) : [];
  return {
    id: at(t.id),
    type: "message",
    attributes: {
      conversation_id: Number(t.conversation_id),
      sender_id: Number(t.sender_id),
      body: at(t.body),
      type: _b(t.type),
      created_at: at(t.created_at),
      updated_at: at(t.updated_at)
    },
    relationships: {
      sender: Nb(t.sender),
      attachments: r
    }
  };
}
let Ir = null, Zi = null;
function Sc(e) {
  if (typeof window > "u")
    return null;
  const t = JSON.stringify(e);
  return Ir && Zi !== t && (Ir.disconnect(), Ir = null), Ir || (Ir = new Sb(
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
  ), Zi = t), Ir;
}
function Pb(e, t, r, n) {
  if (typeof window > "u")
    return () => {
    };
  const s = Sc(e);
  if (!s) return () => {
  };
  const i = s.subscribe(`conversation.${t}`);
  if (i.bind("MessageSent", (o) => {
    r(Tb(o));
  }), n) {
    const o = (d) => n(d);
    i.bind("UserTyping", o), i.bind("client-UserTyping", o);
  }
  return () => {
    i.unbind_all(), s.unsubscribe(`conversation.${t}`);
  };
}
function Eb(e, t, r, n) {
  if (typeof window > "u")
    return () => {
    };
  const s = Sc(e);
  if (!s) return () => {
  };
  const i = s.subscribe(`user.${t}`);
  return i.bind("ConversationUnreadUpdated", (o) => {
    r(o);
  }), n && (i.bind("ConversationCreated", (o) => {
    n(o);
  }), i.bind("conversation.created", (o) => {
    n(o);
  }), i.bind("NewConversation", (o) => {
    n(o);
  })), () => {
    i.unbind_all(), s.unsubscribe(`user.${t}`);
  };
}
const Ob = (e, t) => {
  const r = ir(), { config: n, currentUser: s, currentUserId: i } = kt(), o = zt(
    () => ({ conversation: e.id, page: { size: "20" } }),
    [e.id]
  ), {
    data: d,
    refetch: h,
    fetchNextPage: f,
    hasNextPage: p,
    isFetchingNextPage: g,
    isLoading: y
  } = cb({
    params: o,
    enabled: !!e.id
  }), { mutateAsync: C, isLoading: T } = ub(), { mutateAsync: P, isLoading: A } = db(), { mutateAsync: N } = bb(), { mutate: w } = yb(), { mutateAsync: k, isLoading: _ } = xb(), [E, z] = ae(""), [D, O] = ae(null), M = !!e.attributes.closed_at, [L, B] = ae([]), [te, Q] = ae(!0), [me, Z] = ae(0), [K, Te] = ae("Hoy"), [ct, ut] = ae(null), U = je(null), De = je(!1), de = je(!1), Ce = je(0), Me = je(0), xe = je(!1), ce = je(p), ee = je(e.id), _e = je(null), Y = je(null), le = je(null), dt = je(!1), Pe = je(w), Ne = un(e, i);
  Fe(() => {
    Pe.current = w;
  }, [w]), Fe(() => {
    xe.current = g;
  }, [g]), Fe(() => {
    ce.current = p;
  }, [p]);
  const Re = Je(() => {
    const W = U.current;
    W && (W.scrollTo({
      top: W.scrollHeight,
      behavior: "smooth"
    }), Z(0), Q(!0));
  }, []), Lt = Je(() => {
    const W = U.current;
    if (!W) return;
    const ve = W.scrollHeight - W.scrollTop - W.clientHeight < 140;
    if (Q(ve), ve) {
      Z(0), Te("Hoy");
      return;
    }
    const J = W.querySelectorAll("[data-date-group]");
    if (J.length === 0) {
      Te("Hoy");
      return;
    }
    const Ie = W.scrollTop;
    let st = "";
    for (let ze = 0; ze < J.length; ze++) {
      const ht = J[ze];
      if (ht.offsetTop + ht.offsetHeight >= Ie + 30) {
        st = ht.getAttribute("data-date-group") || "";
        break;
      }
    }
    Te(st || "Hoy");
  }, []);
  Fe(() => {
    ee.current !== e.id && (ee.current = e.id, De.current = !1, de.current = !1, Ce.current = 0, Me.current = 0, B([]), Q(!0), Z(0), Te("Hoy"));
  }, [e.id]), Fe(() => {
    if (De.current || y || d.length === 0) return;
    const W = U.current;
    W && (W.scrollTop = W.scrollHeight, De.current = !0, Q(!0));
  }, [e.id, y, d.length]), po(() => {
    const W = U.current;
    if (W && Ce.current > 0) {
      const ve = W.scrollHeight - Ce.current;
      ve > 0 && (W.scrollTop = Me.current + ve), Ce.current = 0, Me.current = 0;
    }
  }, [d]), Fe(() => {
    if (L.length > 0) {
      const W = U.current;
      if (W) {
        de.current = !0, W.scrollTo({
          top: W.scrollHeight,
          behavior: "smooth"
        });
        const Se = setTimeout(() => {
          de.current = !1;
        }, 500);
        return () => clearTimeout(Se);
      }
    }
  }, [L.length]), Fe(() => {
    const W = U.current;
    if (!W) return;
    const Se = () => {
      Lt(), !(de.current || !De.current) && W.scrollTop < 80 && ce.current && !xe.current && !y && (xe.current = !0, Ce.current = W.scrollHeight, Me.current = W.scrollTop, f().then((ve) => {
        ve != null && ve.hasNextPage || (ce.current = !1);
      }).finally(() => {
        xe.current = !1;
      }));
    };
    return W.addEventListener("scroll", Se, { passive: !0 }), () => {
      W.removeEventListener("scroll", Se);
    };
  }, [f, y, Lt]);
  const $e = Je(() => {
    !e.id || !i || (_e.current && clearTimeout(_e.current), _e.current = setTimeout(() => {
      _e.current = null, N({
        conversationId: e.id,
        read_until: (/* @__PURE__ */ new Date()).toISOString(),
        user_id: i
      }).catch(console.error);
    }, 600));
  }, [e.id, i, N]);
  Fe(() => () => {
    _e.current && clearTimeout(_e.current), Y.current && clearTimeout(Y.current), le.current && clearTimeout(le.current);
  }, [e.id]);
  const We = Je(
    (W) => {
      r.setQueryData(["list-messages", o], (ve) => {
        var ze;
        if (!(ve != null && ve.pages) || ve.pages.length === 0) return ve;
        const J = ve.pages[0], Ie = ((ze = J.data) == null ? void 0 : ze.data) ?? [], st = ab(Ie, W);
        return {
          ...ve,
          pages: [
            {
              ...J,
              data: {
                ...J.data,
                data: st
              }
            },
            ...ve.pages.slice(1)
          ]
        };
      });
      const Se = U.current;
      Se && (Se.scrollHeight - Se.scrollTop - Se.clientHeight < 160 ? setTimeout(() => {
        Se.scrollTo({
          top: Se.scrollHeight,
          behavior: "smooth"
        });
      }, 50) : Z((J) => J + 1)), $e();
    },
    [o, r, $e]
  ), G = Je(
    (W) => {
      if (String(W.user_id) !== String(i)) {
        if (Y.current && (clearTimeout(Y.current), Y.current = null), !W.is_typing) {
          ut(null);
          return;
        }
        ut(W.user.name), Y.current = setTimeout(() => {
          Y.current = null, ut(null);
        }, 2e3);
      }
    },
    [i]
  ), fe = Je(
    (W) => {
      !e.id || !i || dt.current === W || (dt.current = W, Pe.current({
        conversationId: e.id,
        user_id: Number(i),
        is_typing: W
      }));
    },
    [e.id, i]
  ), Ve = Je(() => {
    le.current && clearTimeout(le.current), le.current = setTimeout(() => {
      le.current = null, fe(!1);
    }, 2500);
  }, [fe]), et = Je(
    (W) => {
      if (!M) {
        if (z(W), !W.trim()) {
          le.current && (clearTimeout(le.current), le.current = null), fe(!1);
          return;
        }
        fe(!0), Ve();
      }
    },
    [M, Ve, fe]
  );
  Fe(() => () => {
    le.current && (clearTimeout(le.current), le.current = null), fe(!1);
  }, [e.id, fe]);
  const gt = () => {
    e.attributes.unread_count && $e();
  };
  Fe(() => {
    gt();
  }, [e, d, $e]), Fe(() => {
    if (!e.id) return;
    const W = Pb(
      n.reverb,
      Number(e.id),
      We,
      G
    );
    return () => {
      W();
    };
  }, [n.reverb, e.id, We, G]);
  const lr = Je(
    (W) => {
      M || O(W);
    },
    [M]
  ), St = async () => {
    var Ie, st;
    if (M) return;
    const W = E.trim();
    if (!W && !D || !s) return;
    const Se = D, ve = nb({
      conversationId: e.id,
      sender: s,
      body: W,
      file: Se
    }), J = ve.id;
    B((ze) => [...ze, ve]), z(""), le.current && (clearTimeout(le.current), le.current = null), fe(!1);
    try {
      const ze = Se ? await P({
        conversationId: e.id,
        file: Se,
        sender_id: Number(s.id),
        caption: W || void 0
      }) : await C({
        body: W,
        conversationId: e.id,
        sender_id: s.id
      });
      O(null), (((st = (Ie = (await h()).data) == null ? void 0 : Ie.pages) == null ? void 0 : st.reduce(
        (ge, ft) => {
          var Vt;
          return kc(ge, ((Vt = ft.data) == null ? void 0 : Vt.data) ?? []);
        },
        []
      )) ?? []).some(
        (ge) => ge.messages.some((ft) => ft.id === ze.id)
      ) && B((ge) => ge.filter((ft) => ft.id !== J)), $e();
    } catch {
      B(
        (ze) => ze.map(
          (ht) => ht.id === J ? { ...ht, local_status: "error" } : ht
        )
      );
    }
  }, dn = Je(async () => {
    var W, Se, ve;
    try {
      await k(e.id), xt.success("Conversación cerrada exitosamente"), (W = t == null ? void 0 : t.onCloseSuccess) == null || W.call(t);
    } catch (J) {
      const Ie = ((ve = (Se = J == null ? void 0 : J.response) == null ? void 0 : Se.data) == null ? void 0 : ve.message) || (J == null ? void 0 : J.message) || "Error al cerrar la conversación";
      xt.error(Ie);
    }
  }, [k, e.id, t]);
  return {
    messages: d,
    optimisticMessages: L,
    scrollRef: U,
    conversationName: Ne,
    inputText: E,
    pendingFile: D,
    isClosed: M,
    isClosing: _,
    isSending: T,
    isUploading: A,
    isFetchingNextPage: g,
    hasNextPage: p,
    isLoading: y,
    isNearBottom: te,
    newMessagesCount: me,
    typingUser: ct,
    visibleDate: K,
    currentUser: s,
    currentUserId: i,
    scrollToBottom: Re,
    setInputText: et,
    setPendingFile: O,
    handleSendMessage: St,
    handleSelectFile: lr,
    handleCloseConversation: dn
  };
};
function Rb(e, t, r = "OR") {
  return r === "AND" ? t.every((n) => e.includes(n)) : t.some((n) => e.includes(n));
}
function Dt({
  permission: e,
  operator: t = "OR"
}) {
  const { permissions: r } = kt();
  return Rb(r, e, t);
}
function Ab({
  conversation: e,
  isClosed: t = !!e.attributes.closed_at,
  isClosing: r = !1,
  onCloseConversation: n,
  showResolvedBadge: s = !1,
  className: i,
  ...o
}) {
  const [d, h] = ae(!1), { currentUserId: f } = kt(), p = Dt({
    permission: ["messenger_chat_support.provide_support"]
  }), g = un(e, f);
  return t && s ? /* @__PURE__ */ x(
    Wt,
    {
      variant: "outline",
      className: X(
        "h-8 px-2.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100/60 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-800 gap-1 select-none",
        i
      ),
      children: [
        /* @__PURE__ */ u(ls, { className: "size-3.5 text-emerald-500" }),
        /* @__PURE__ */ u("span", { className: "hidden sm:inline-block", children: "Resuelta" })
      ]
    }
  ) : t && !s || !p ? null : /* @__PURE__ */ x(nr, { children: [
    /* @__PURE__ */ u(
      ye,
      {
        variant: "success",
        size: "sm",
        disabled: r,
        onClick: () => h(!0),
        className: X(
          "h-8 gap-1 px-2 sm:px-3 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs",
          i
        ),
        ...o,
        children: r ? /* @__PURE__ */ x(nr, { children: [
          /* @__PURE__ */ u(rn, { className: "size-3.5 animate-spin" }),
          /* @__PURE__ */ u("span", { className: "hidden sm:inline-block", children: "Cerrando..." })
        ] }) : /* @__PURE__ */ x(nr, { children: [
          /* @__PURE__ */ u(ls, { className: "size-3.5" }),
          /* @__PURE__ */ u("span", { className: "hidden sm:inline-block", children: "Cerrar chat" })
        ] })
      }
    ),
    /* @__PURE__ */ u(jp, { open: d, onOpenChange: h, children: /* @__PURE__ */ x(Fp, { className: "sm:max-w-md p-5", children: [
      /* @__PURE__ */ x(Ip, { className: "gap-2", children: [
        /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 text-amber-600 dark:text-amber-400", children: [
          /* @__PURE__ */ u("div", { className: "flex size-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20", children: /* @__PURE__ */ u(Ar, { className: "size-4" }) }),
          /* @__PURE__ */ u(Up, { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "¿Cerrar conversación?" })
        ] }),
        /* @__PURE__ */ x(qp, { className: "text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: [
          "¿Estás seguro de que deseas marcar como resuelta y cerrar la conversación con",
          " ",
          /* @__PURE__ */ u("strong", { className: "font-semibold text-neutral-900 dark:text-neutral-100", children: g }),
          "? Esta acción finalizará la atención en tiempo real."
        ] })
      ] }),
      /* @__PURE__ */ x(Hp, { className: "gap-2 sm:gap-0 mt-3", children: [
        /* @__PURE__ */ u(
          Bp,
          {
            disabled: r,
            className: "text-xs h-8 cursor-pointer",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ u(
          $p,
          {
            disabled: r,
            onClick: () => {
              h(!1), n == null || n();
            },
            className: "text-xs h-8 bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer",
            children: "Sí, cerrar conversación"
          }
        )
      ] })
    ] }) })
  ] });
}
function Db({
  conversation: e,
  isClosed: t,
  isClosing: r = !1,
  onCloseConversation: n,
  isContextPanelOpen: s = !0,
  onToggleContextPanel: i,
  onBack: o,
  alwaysShowBackButton: d = !1
}) {
  var y, C;
  const { currentUserId: h } = kt(), f = Fn(e), p = un(e, h), g = In(e, h);
  return /* @__PURE__ */ x("div", { className: "flex shrink-0 items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 p-2 sm:p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xs min-w-0", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1 overflow-hidden", children: [
      o && /* @__PURE__ */ u(
        ye,
        {
          variant: "ghost",
          size: "sm",
          onClick: o,
          title: "Volver a la lista de chats",
          "aria-label": "Volver a la lista de chats",
          className: X(
            "size-8 p-0 shrink-0 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 cursor-pointer",
            d ? "flex" : "flex md:hidden"
          ),
          children: /* @__PURE__ */ u(_a, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ u(
        ar,
        {
          src: g == null ? void 0 : g.attributes.avatar_url,
          name: p,
          isGroup: f,
          size: "md",
          className: "shrink-0"
        }
      ),
      /* @__PURE__ */ x("div", { className: "min-w-0 flex-1 overflow-hidden", children: [
        /* @__PURE__ */ x("div", { className: "flex items-center gap-1.5 min-w-0", children: [
          /* @__PURE__ */ u(
            "h3",
            {
              className: "truncate text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 min-w-0",
              title: p,
              children: p
            }
          ),
          t && /* @__PURE__ */ x(
            Wt,
            {
              variant: "destructive",
              className: "inline-flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium shrink-0 py-0 h-4.5 px-1.5",
              children: [
                /* @__PURE__ */ u(Ar, { className: "size-2.5" }),
                /* @__PURE__ */ u("span", { children: "Cerrada" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ u("div", { className: "flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 min-w-0", children: /* @__PURE__ */ u("span", { className: "truncate", children: f ? `${((C = (y = e.relationships) == null ? void 0 : y.users) == null ? void 0 : C.length) || 0} participantes` : "Conversación individual" }) })
      ] })
    ] }),
    /* @__PURE__ */ x("div", { className: "flex items-center gap-1 shrink-0", children: [
      /* @__PURE__ */ u(
        Ab,
        {
          conversation: e,
          isClosed: t,
          isClosing: r,
          onCloseConversation: n,
          showResolvedBadge: !1
        }
      ),
      i && /* @__PURE__ */ u(
        ye,
        {
          variant: "outline",
          size: "icon",
          onClick: i,
          className: X(
            "size-8 p-0",
            s ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" : ""
          ),
          children: /* @__PURE__ */ u(kp, { className: "size-4" })
        }
      )
    ] })
  ] });
}
function Mb(e) {
  if (!e) return "";
  try {
    const t = new Date(e);
    return isNaN(t.getTime()) ? "" : t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: !1 });
  } catch {
    return "";
  }
}
function eo({
  message: e,
  isOwnMessage: t,
  isGroup: r,
  conversationName: n,
  conversationAvatarUrl: s
}) {
  var f, p, g, y, C, T, P;
  const i = Tn(((g = (p = (f = e.relationships) == null ? void 0 : f.sender) == null ? void 0 : p.attributes) == null ? void 0 : g.name) || n), o = ((T = (C = (y = e.relationships) == null ? void 0 : y.sender) == null ? void 0 : C.attributes) == null ? void 0 : T.avatar_url) || void 0, d = Mb(e.attributes.created_at), h = ((P = e.relationships) == null ? void 0 : P.attachments) ?? [];
  return /* @__PURE__ */ x(
    "div",
    {
      className: X(
        "flex items-start gap-2 sm:gap-2.5 max-w-[90%] sm:max-w-[75%] min-w-0",
        t && "ml-auto flex-row-reverse"
      ),
      children: [
        r && !t ? /* @__PURE__ */ u(
          ar,
          {
            name: i,
            src: o,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ) : t ? null : /* @__PURE__ */ u(
          ar,
          {
            name: n,
            src: s,
            size: "sm",
            className: "mt-0.5 shrink-0"
          }
        ),
        /* @__PURE__ */ x("div", { className: X("flex min-w-0 flex-col gap-1", t && "items-end"), children: [
          /* @__PURE__ */ u("span", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate", children: t ? "Tú" : i }),
          /* @__PURE__ */ x(
            "div",
            {
              className: X(
                "rounded-2xl px-3.5 py-2.5 shadow-xs text-xs sm:text-sm leading-relaxed break-words",
                t ? "rounded-tr-xs bg-blue-600 text-white shadow-xs" : "rounded-tl-xs bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs"
              ),
              children: [
                h.map((A) => A.attributes.file_mime_type.startsWith("image/") ? /* @__PURE__ */ u(
                  "a",
                  {
                    href: A.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mb-2 block overflow-hidden rounded-xl border border-black/10 dark:border-white/10",
                    children: /* @__PURE__ */ u(
                      "img",
                      {
                        src: A.attributes.file_url,
                        alt: A.attributes.file_name,
                        className: "max-h-64 max-w-full object-contain rounded-xl",
                        loading: "lazy"
                      }
                    )
                  },
                  A.id
                ) : /* @__PURE__ */ x(
                  "a",
                  {
                    href: A.attributes.file_url,
                    target: "_blank",
                    rel: "noreferrer",
                    download: A.attributes.file_name,
                    className: "mb-2 flex items-center gap-2 rounded-lg border border-current/20 px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                    children: [
                      /* @__PURE__ */ u(vp, { className: "size-4 shrink-0" }),
                      /* @__PURE__ */ u("span", { className: "min-w-0 flex-1 truncate font-medium", children: A.attributes.file_name }),
                      /* @__PURE__ */ u(xp, { className: "size-3.5 shrink-0" })
                    ]
                  },
                  A.id
                )),
                e.attributes.body && h.length === 0 && /* @__PURE__ */ u("p", { className: "whitespace-pre-wrap break-words", children: e.attributes.body }),
                e.attributes.body && h.length > 0 && e.attributes.body !== "Archivo adjunto" && /* @__PURE__ */ u("p", { className: "whitespace-pre-wrap break-words mt-1", children: e.attributes.body }),
                /* @__PURE__ */ x("div", { className: "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none", children: [
                  /* @__PURE__ */ u(
                    "time",
                    {
                      dateTime: e.attributes.created_at,
                      className: t ? "text-blue-100" : "text-neutral-500 dark:text-neutral-400",
                      children: d
                    }
                  ),
                  t && e.local_status === "sending" && /* @__PURE__ */ u(
                    Ta,
                    {
                      className: "size-3 text-blue-200 animate-spin",
                      "aria-label": "Pendiente de envío"
                    }
                  ),
                  t && e.local_status === "sent" && /* @__PURE__ */ u(pp, { className: "size-3 text-blue-200", "aria-label": "Enviado" }),
                  t && e.local_status === "error" && /* @__PURE__ */ u("span", { className: "text-red-200 font-medium", children: "No enviado" })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Nc({ className: e }) {
  return /* @__PURE__ */ u(
    "div",
    {
      "aria-hidden": "true",
      className: X(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        e
      ),
      children: /* @__PURE__ */ x(
        "svg",
        {
          className: "absolute inset-0 h-full w-full opacity-[0.055] dark:opacity-[0.04] text-slate-800 dark:text-slate-100",
          xmlns: "http://www.w3.org/2000/svg",
          width: "100%",
          height: "100%",
          children: [
            /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ u(
              "pattern",
              {
                id: "sdi-enterprise-chat-pattern",
                width: "360",
                height: "360",
                patternUnits: "userSpaceOnUse",
                children: /* @__PURE__ */ x(
                  "g",
                  {
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "1.2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      /* @__PURE__ */ x("g", { transform: "translate(24, 24)", children: [
                        /* @__PURE__ */ u("rect", { x: "0", y: "0", width: "44", height: "20", rx: "5", strokeWidth: "1.2" }),
                        /* @__PURE__ */ u(
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
                      /* @__PURE__ */ u("g", { transform: "translate(120, 26)", children: /* @__PURE__ */ u("path", { d: "M0 0l22 11-22 11 5-10 11-1-11-1z" }) }),
                      /* @__PURE__ */ x("g", { transform: "translate(210, 24)", children: [
                        /* @__PURE__ */ u("path", { d: "M10 0s-7 2-10 3v8c0 6 7 11 10 13 3-2 10-7 10-13V3c-3-1-10-3-10-3z" }),
                        /* @__PURE__ */ u("path", { d: "M6 11l3 3 6-6", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(294, 28)", children: [
                        /* @__PURE__ */ u("rect", { x: "0", y: "0", width: "28", height: "19", rx: "4" }),
                        /* @__PURE__ */ u("path", { d: "M6 9l3 3-3 3M14 15h6" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(30, 96)", children: [
                        /* @__PURE__ */ u("path", { d: "M0 0h24a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-12l-6 5v-5h-2a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" }),
                        /* @__PURE__ */ u("path", { d: "M6 6h12M6 10h8" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(126, 96)", children: [
                        /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "10" }),
                        /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "4.5" }),
                        /* @__PURE__ */ u("path", { d: "M4 4l3.5 3.5M14.5 14.5l3.5 3.5M18 4l-3.5 3.5M7.5 14.5L4 18" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(214, 96)", children: [
                        /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "12", strokeWidth: "1.2", strokeDasharray: "2 2" }),
                        /* @__PURE__ */ u(
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
                      /* @__PURE__ */ x("g", { transform: "translate(298, 98)", children: [
                        /* @__PURE__ */ u("ellipse", { cx: "10", cy: "4", rx: "9", ry: "3" }),
                        /* @__PURE__ */ u("path", { d: "M1 4v5c0 1.66 4.03 3 9 3s9-1.34 9-3V4" }),
                        /* @__PURE__ */ u("path", { d: "M1 9v5c0 1.66 4.03 3 9 3s9-1.34 9-3V9" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(32, 172)", children: [
                        /* @__PURE__ */ u("path", { d: "M0 6l4 4 9-9" }),
                        /* @__PURE__ */ u("path", { d: "M7 6l4 4 9-9" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(124, 168)", children: [
                        /* @__PURE__ */ u("rect", { x: "0", y: "7", width: "18", height: "13", rx: "3" }),
                        /* @__PURE__ */ u("path", { d: "M4 7V4a5 5 0 0 1 10 0v3" }),
                        /* @__PURE__ */ u("circle", { cx: "9", cy: "13.5", r: "1.5", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ u("g", { transform: "translate(210, 174)", children: /* @__PURE__ */ u("path", { d: "M0 6h6l3-6 5 12 4-8 3 4h7" }) }),
                      /* @__PURE__ */ x("g", { transform: "translate(298, 168)", children: [
                        /* @__PURE__ */ u("path", { d: "M0 0h13l6 6v13a3 3 0 0 1-3 3H0a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ u("path", { d: "M13 0v6h6" }),
                        /* @__PURE__ */ u("path", { d: "M4 12l2.5 2.5 5-5", strokeWidth: "1.1" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(28, 244)", children: [
                        /* @__PURE__ */ u("circle", { cx: "4", cy: "4", r: "3" }),
                        /* @__PURE__ */ u("circle", { cx: "20", cy: "4", r: "3" }),
                        /* @__PURE__ */ u("circle", { cx: "12", cy: "18", r: "3" }),
                        /* @__PURE__ */ u("path", { d: "M6.5 5.5l3.5 10M17.5 5.5l-3.5 10M7 4h10" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(114, 246)", children: [
                        /* @__PURE__ */ u("rect", { x: "0", y: "0", width: "38", height: "18", rx: "4", strokeWidth: "1" }),
                        /* @__PURE__ */ u(
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
                      /* @__PURE__ */ u("g", { transform: "translate(218, 244)", children: /* @__PURE__ */ u("path", { d: "M7 0L0 11h7l-2 9 10-12h-7l2-8z" }) }),
                      /* @__PURE__ */ x("g", { transform: "translate(300, 246)", children: [
                        /* @__PURE__ */ u("circle", { cx: "10", cy: "10", r: "9" }),
                        /* @__PURE__ */ u("path", { d: "M10 5v5l3.5 2" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(30, 316)", children: [
                        /* @__PURE__ */ u("path", { d: "M0 0h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6l-5 4v-4h-2a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z" }),
                        /* @__PURE__ */ u("circle", { cx: "5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ u("circle", { cx: "9.5", cy: "7", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ u("circle", { cx: "14", cy: "7", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ x("g", { transform: "translate(128, 320)", children: [
                        /* @__PURE__ */ u("circle", { cx: "2", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ u("circle", { cx: "10", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ u("circle", { cx: "18", cy: "2", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ u("circle", { cx: "2", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ u("circle", { cx: "10", cy: "10", r: "1", fill: "currentColor" }),
                        /* @__PURE__ */ u("circle", { cx: "18", cy: "10", r: "1", fill: "currentColor" })
                      ] }),
                      /* @__PURE__ */ u("g", { transform: "translate(216, 318)", children: /* @__PURE__ */ u("path", { d: "M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5z" }) }),
                      /* @__PURE__ */ x("g", { transform: "translate(292, 318)", children: [
                        /* @__PURE__ */ u("rect", { x: "0", y: "0", width: "36", height: "16", rx: "3", strokeWidth: "1" }),
                        /* @__PURE__ */ u(
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
            /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: "url(#sdi-enterprise-chat-pattern)" })
          ]
        }
      )
    }
  );
}
function zb({
  conversation: e,
  messages: t,
  optimisticMessages: r = [],
  scrollRef: n,
  isFetchingNextPage: s = !1,
  hasNextPage: i = !1,
  isLoading: o = !1,
  isNearBottom: d = !0,
  newMessagesCount: h = 0,
  visibleDate: f = "Hoy",
  onScrollToBottom: p
}) {
  const { currentUserId: g } = kt(), y = Fn(e), C = un(e, g), T = In(e, g), P = new Set(
    t.flatMap((w) => w.messages.map((k) => k.id))
  ), A = r.filter(
    (w) => !P.has(w.id)
  ), N = f.toLowerCase() === "hoy" || f.toLowerCase() === "today" || Ki(f) === "Hoy";
  return /* @__PURE__ */ x("div", { className: "flex-1 min-h-0 relative bg-[#f4f6f8]/70 dark:bg-[#0a0f1d] w-full overflow-hidden", children: [
    /* @__PURE__ */ u(Nc, {}),
    /* @__PURE__ */ u(jn, { ref: n, className: "relative z-10 h-full w-full", children: /* @__PURE__ */ x("div", { className: "space-y-4 p-3 sm:p-4 text-sm w-full min-w-0", children: [
      s && /* @__PURE__ */ x("div", { className: "flex items-center justify-center py-2 gap-2 text-xs text-neutral-500 animate-in fade-in duration-200", children: [
        /* @__PURE__ */ u(rn, { className: "size-3.5 animate-spin text-blue-600" }),
        /* @__PURE__ */ u("span", { children: "Cargando mensajes anteriores..." })
      ] }),
      !i && t.length > 0 && /* @__PURE__ */ u("div", { className: "flex items-center justify-center py-1", children: /* @__PURE__ */ u("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400", children: "Inicio de la conversación" }) }),
      o && t.length === 0 && /* @__PURE__ */ x("div", { className: "space-y-4 py-2 animate-in fade-in duration-300", children: [
        /* @__PURE__ */ x("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
          /* @__PURE__ */ u(oe, { className: "size-8 rounded-full shrink-0" }),
          /* @__PURE__ */ x("div", { className: "space-y-1.5 flex-1", children: [
            /* @__PURE__ */ u(oe, { className: "h-3 w-20 rounded" }),
            /* @__PURE__ */ u(oe, { className: "h-12 w-48 sm:w-64 rounded-2xl rounded-bl-none" })
          ] })
        ] }),
        /* @__PURE__ */ u("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ u("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ u(oe, { className: "h-14 w-52 sm:w-64 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) }),
        /* @__PURE__ */ x("div", { className: "flex items-end gap-2.5 max-w-[75%]", children: [
          /* @__PURE__ */ u(oe, { className: "size-8 rounded-full shrink-0" }),
          /* @__PURE__ */ x("div", { className: "space-y-1.5 flex-1", children: [
            /* @__PURE__ */ u(oe, { className: "h-3 w-16 rounded" }),
            /* @__PURE__ */ u(oe, { className: "h-16 w-56 sm:w-72 rounded-2xl rounded-bl-none" })
          ] })
        ] }),
        /* @__PURE__ */ u("div", { className: "flex items-end justify-end gap-2.5 ml-auto max-w-[75%]", children: /* @__PURE__ */ u("div", { className: "space-y-1.5 flex flex-col items-end flex-1", children: /* @__PURE__ */ u(oe, { className: "h-10 w-36 sm:w-44 rounded-2xl rounded-br-none bg-blue-100/70 dark:bg-blue-950/40" }) }) })
      ] }),
      t.length > 0 && /* @__PURE__ */ u("div", { className: "sticky top-1 z-20 flex justify-center pointer-events-none mb-2 transition-all duration-200", children: /* @__PURE__ */ u("div", { className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 shadow-xs", children: /* @__PURE__ */ u("span", { children: N ? "Hoy" : Ki(f) }) }) }),
      [...t ?? []].reverse().map((w) => /* @__PURE__ */ u(
        "div",
        {
          "data-date-group": w.date,
          className: "space-y-4",
          children: [...w.messages].reverse().map((k) => {
            var E, z;
            const _ = String((z = (E = k == null ? void 0 : k.relationships) == null ? void 0 : E.sender) == null ? void 0 : z.id) === String(g);
            return /* @__PURE__ */ u(
              eo,
              {
                message: _ ? { ...k, local_status: "sent" } : k,
                isOwnMessage: _,
                isGroup: y,
                conversationName: C,
                conversationAvatarUrl: (T == null ? void 0 : T.attributes.avatar_url) || void 0
              },
              k.id
            );
          })
        },
        w.date
      )),
      A.length > 0 && /* @__PURE__ */ x("div", { "data-date-group": "Hoy", className: "space-y-4", children: [
        /* @__PURE__ */ u("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ u("span", { className: "rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shadow-xs", children: "Hoy" }) }),
        [...A].map((w) => /* @__PURE__ */ u(
          eo,
          {
            message: w,
            isOwnMessage: !0,
            isGroup: y,
            conversationName: C,
            conversationAvatarUrl: (T == null ? void 0 : T.attributes.avatar_url) || void 0
          },
          w.id
        ))
      ] }),
      !d && p && /* @__PURE__ */ u("div", { className: "sticky bottom-2 z-30 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-200", children: /* @__PURE__ */ x(
        "button",
        {
          type: "button",
          onClick: p,
          className: "pointer-events-auto relative flex size-9 items-center justify-center rounded-full border border-blue-500/20 bg-blue-600 text-white shadow-md transition-colors hover:bg-blue-700 active:scale-95 cursor-pointer",
          "aria-label": "Desplazar a mensajes recientes",
          title: "Desplazar a mensajes recientes",
          children: [
            /* @__PURE__ */ u(bp, { className: "size-4" }),
            h > 0 && /* @__PURE__ */ u(
              "span",
              {
                className: "absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-4 text-white",
                "aria-label": `${h} mensajes nuevos`,
                children: h > 99 ? "99+" : h
              }
            )
          ]
        }
      ) })
    ] }) })
  ] });
}
function Lb({
  inputText: e,
  setInputText: t,
  onSendMessage: r,
  onSelectFile: n,
  pendingFile: s,
  onRemoveFile: i,
  isSending: o,
  isUploading: d,
  conversationName: h,
  isClosed: f = !1
}) {
  const p = je(null), g = 120, y = zt(
    () => s && s.type.startsWith("image/") ? URL.createObjectURL(s) : void 0,
    [s]
  );
  if (Fe(() => () => {
    y && URL.revokeObjectURL(y);
  }, [y]), po(() => {
    const P = p.current;
    if (!P) return;
    P.style.height = "auto";
    const A = Math.min(P.scrollHeight, g);
    P.style.height = `${A}px`, P.style.overflowY = P.scrollHeight > g ? "auto" : "hidden";
  }, [e]), f)
    return /* @__PURE__ */ u("div", { className: "shrink-0 border-t border-neutral-200/80 bg-neutral-50/90 p-3 text-center dark:border-neutral-800 dark:bg-neutral-950/80", children: /* @__PURE__ */ x("div", { className: "flex items-center justify-center gap-2 rounded-xl border border-neutral-200/60 bg-white/70 px-4 py-2 text-xs font-medium text-neutral-500 shadow-2xs dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-400", children: [
      /* @__PURE__ */ u(Ar, { className: "size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" }),
      /* @__PURE__ */ u("span", { children: "Esta conversación ha sido finalizada y no admite nuevos mensajes." })
    ] }) });
  const C = (P) => {
    P.key === "Enter" && !P.shiftKey && (P.preventDefault(), r());
  }, T = (P) => {
    var N;
    const A = (N = P.target.files) == null ? void 0 : N[0];
    A && n(A), P.target.value = "";
  };
  return /* @__PURE__ */ u("div", { className: "shrink-0  p-2 dark:border-neutral-800 dark:bg-neutral-900", children: /* @__PURE__ */ x("div", { className: "relative", children: [
    s && /* @__PURE__ */ x("div", { className: "mb-2 flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-800/40", children: [
      s.type.startsWith("image/") ? /* @__PURE__ */ u(
        "img",
        {
          src: y || "",
          alt: "Archivo seleccionado",
          className: "size-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
        }
      ) : /* @__PURE__ */ u("div", { className: "flex size-12 items-center justify-center rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300", children: /* @__PURE__ */ u(qi, { className: "size-5" }) }),
      /* @__PURE__ */ u("span", { className: "min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-300 font-medium", children: s.name || "Archivo listo para enviar" }),
      /* @__PURE__ */ u(
        ye,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: i,
          className: "size-7 shrink-0 p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          "aria-label": "Quitar archivo",
          children: /* @__PURE__ */ u(vt, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "flex items-center gap-1 rounded-2xl border border-neutral-200 bg-white px-2 py-1 shadow-xs dark:border-neutral-700 dark:bg-neutral-800", children: [
      /* @__PURE__ */ x(
        "label",
        {
          className: "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200",
          title: "Adjuntar archivo",
          children: [
            /* @__PURE__ */ u(qi, { className: "size-3.5" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "file",
                className: "sr-only",
                onChange: T,
                disabled: o || d
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ u(
        Ca,
        {
          ref: p,
          value: e,
          onChange: (P) => t(P.target.value),
          onKeyDown: C,
          placeholder: `Responder a ${h}...`,
          rows: 1,
          className: "!min-h-0 !border-transparent max-h-30 flex-1 resize-none overflow-y-hidden rounded-xl bg-transparent px-2 py-1 text-xs leading-5 shadow-none !outline-none focus:!border-transparent focus:!outline-none focus-visible:!border-transparent focus-visible:!ring-0 focus-visible:!outline-none sm:text-sm"
        }
      ),
      /* @__PURE__ */ u(
        ye,
        {
          size: "icon",
          variant: "primary",
          onClick: r,
          disabled: !e.trim() && !s || o || d,
          className: "size-8 shrink-0 rounded-full p-0",
          "aria-label": "Enviar mensaje",
          title: "Enviar mensaje",
          children: /* @__PURE__ */ u(Xl, { className: "size-4" })
        }
      )
    ] })
  ] }) });
}
function jb({
  conversation: e,
  onToggleContextPanel: t,
  isContextPanelOpen: r = !0,
  onBack: n,
  alwaysShowBackButton: s = !1,
  onCloseSuccess: i
}) {
  const o = Ob(e, {
    onCloseSuccess: () => {
      i == null || i(), n == null || n();
    }
  });
  return /* @__PURE__ */ x("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ u(
      Db,
      {
        conversation: e,
        isClosed: o.isClosed,
        isClosing: o.isClosing,
        onCloseConversation: o.handleCloseConversation,
        isContextPanelOpen: r,
        onToggleContextPanel: t,
        onBack: n,
        alwaysShowBackButton: s
      }
    ),
    /* @__PURE__ */ u(
      zb,
      {
        conversation: e,
        messages: o.messages,
        optimisticMessages: o.optimisticMessages,
        scrollRef: o.scrollRef,
        isFetchingNextPage: o.isFetchingNextPage,
        hasNextPage: o.hasNextPage,
        isLoading: o.isLoading,
        isNearBottom: o.isNearBottom,
        newMessagesCount: o.newMessagesCount,
        visibleDate: o.visibleDate,
        onScrollToBottom: o.scrollToBottom
      }
    ),
    o.typingUser && /* @__PURE__ */ x("div", { className: "flex shrink-0 items-center gap-1.5 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50 dark:bg-neutral-950 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
      /* @__PURE__ */ x("span", { children: [
        o.typingUser,
        " está escribiendo"
      ] }),
      /* @__PURE__ */ x("span", { className: "inline-flex gap-0.5", "aria-hidden": "true", children: [
        /* @__PURE__ */ u("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse" }),
        /* @__PURE__ */ u("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-75" }),
        /* @__PURE__ */ u("span", { className: "size-1 rounded-full bg-neutral-400 animate-pulse delay-150" })
      ] })
    ] }),
    /* @__PURE__ */ u(
      Lb,
      {
        inputText: o.inputText,
        setInputText: o.setInputText,
        onSendMessage: o.handleSendMessage,
        onSelectFile: o.handleSelectFile,
        pendingFile: o.pendingFile,
        onRemoveFile: () => o.setPendingFile(null),
        isSending: o.isSending,
        isUploading: o.isUploading,
        conversationName: o.conversationName,
        isClosed: o.isClosed
      }
    )
  ] });
}
function Fb({
  message: e = "Tu solicitud de soporte ha sido registrada exitosamente. En este momento no hay técnicos disponibles en línea; un técnico atenderá tu requerimiento a la brevedad.",
  ticket: t,
  onNewRequest: r,
  onViewChats: n,
  onClose: s,
  canViewChatList: i = !1
}) {
  const o = (t == null ? void 0 : t.number) ?? (t == null ? void 0 : t.id) ?? "N/A";
  return /* @__PURE__ */ x("div", { className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 bg-neutral-50/70 dark:bg-neutral-900", children: [
      /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ u(Oa, { className: "size-4 text-emerald-600 dark:text-emerald-400" }),
        /* @__PURE__ */ u("span", { className: "text-xs font-bold text-neutral-800 dark:text-neutral-200", children: "Solicitud Registrada" })
      ] }),
      s && /* @__PURE__ */ u(
        ye,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: s,
          className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
          children: /* @__PURE__ */ u(vt, { className: "size-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 flex flex-col justify-center items-center text-center space-y-4", children: [
      /* @__PURE__ */ x("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ u("div", { className: "size-14 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ u(Ta, { className: "size-7" }) }),
        /* @__PURE__ */ u("div", { className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm", children: /* @__PURE__ */ u(ls, { className: "size-3.5" }) })
      ] }),
      /* @__PURE__ */ x("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ u("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "Ticket de Soporte Creado" }),
        /* @__PURE__ */ u("p", { className: "text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed", children: e })
      ] }),
      t && /* @__PURE__ */ x("div", { className: "w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-800/40 p-3 text-left space-y-2.5 text-xs shadow-2xs", children: [
        /* @__PURE__ */ x("div", { className: "flex items-center justify-between border-b border-neutral-200/70 dark:border-neutral-700/50 pb-2", children: [
          /* @__PURE__ */ x("div", { className: "flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200", children: [
            /* @__PURE__ */ u(Tp, { className: "size-3.5 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ x("span", { children: [
              "Ticket #",
              o
            ] })
          ] }),
          /* @__PURE__ */ u(Wt, { variant: "outline", className: "text-[10px] uppercase font-semibold px-1.5 py-0 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300", children: t.status === "created" ? "Registrado" : t.status })
        ] }),
        t.subject && /* @__PURE__ */ x("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ u("span", { className: "text-[10.5px] font-medium text-neutral-400", children: "Asunto:" }),
          /* @__PURE__ */ u("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2", children: t.subject })
        ] }),
        /* @__PURE__ */ x("div", { className: "flex items-center justify-between text-[11px] text-neutral-500 pt-1", children: [
          /* @__PURE__ */ x("span", { children: [
            "Canal: ",
            /* @__PURE__ */ u("strong", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: t.request_source || "Chat" })
          ] }),
          /* @__PURE__ */ x("span", { className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10.5px] font-medium", children: [
            /* @__PURE__ */ u("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            "En cola de atención"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u("div", { className: "rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 p-2.5 text-[11px] text-blue-900/80 dark:text-blue-300/80 text-left w-full", children: /* @__PURE__ */ u("p", { children: "Te notificaremos en cuanto un técnico tome tu ticket. Puedes consultar el estado en cualquier momento." }) })
    ] }),
    /* @__PURE__ */ x("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900 flex items-center gap-2", children: [
      /* @__PURE__ */ x(
        ye,
        {
          type: "button",
          variant: "secondary",
          size: "sm",
          onClick: r,
          className: "flex-1 gap-1.5 text-xs font-medium cursor-pointer",
          children: [
            /* @__PURE__ */ u(Cp, { className: "size-3.5" }),
            /* @__PURE__ */ u("span", { children: "Nueva Consulta" })
          ]
        }
      ),
      i && n && /* @__PURE__ */ x(
        ye,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: n,
          className: "flex-1 gap-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white cursor-pointer",
          children: [
            /* @__PURE__ */ u(Pa, { className: "size-3.5" }),
            /* @__PURE__ */ u("span", { children: "Ver mis chats" })
          ]
        }
      )
    ] })
  ] });
}
function Cc(e, t = 300) {
  const [r, n] = ae(e);
  return Fe(() => {
    const s = setTimeout(() => {
      n(e);
    }, t);
    return () => {
      clearTimeout(s);
    };
  }, [e, t]), r;
}
const Ib = (e) => {
  var n, s, i, o, d, h;
  const t = (e == null ? void 0 : e.params) ?? {}, r = Ro({
    queryKey: ["list-chat-users", t],
    queryFn: () => om(t),
    placeholderData: vo,
    refetchOnWindowFocus: !1,
    enabled: (e == null ? void 0 : e.enable) !== !1
  });
  return {
    data: ((n = r.data) == null ? void 0 : n.data.data) ?? [],
    meta: (i = (s = r.data) == null ? void 0 : s.data) == null ? void 0 : i.meta,
    links: (d = (o = r.data) == null ? void 0 : o.data) == null ? void 0 : d.links,
    isLoading: r.isPending,
    errors: ((h = r.error) == null ? void 0 : h.data) ?? {},
    refetch: r.refetch
  };
}, Ub = () => {
  const e = ir(), t = Je(async (r) => {
    const n = await fb(r);
    return await e.invalidateQueries({ queryKey: ["list-conversations"] }), n.data.data;
  }, [e]);
  return zr(
    t
  );
};
function qb({
  open: e,
  onOpenChange: t,
  onSuccess: r
}) {
  const { currentUserId: n } = kt(), [s, i] = ae("direct"), [o, d] = ae(""), h = Cc(o, 300), [f, p] = ae(null), [g, y] = ae([]), [C, T] = ae(""), { data: P, isLoading: A } = Ib({
    enable: e,
    params: {
      sort: "name",
      paginate: "false",
      ...h.trim() ? { filter: { name: h.trim() } } : {}
    }
  }), { mutateAsync: N, isLoading: w } = Ub(), k = zt(() => (P || []).filter((L) => String(L.id) !== String(n)), [P, n]), _ = (L) => {
    y((B) => B.some((Q) => Q.id === L.id) ? B.filter((Q) => Q.id !== L.id) : [...B, L]);
  }, E = (L) => {
    y((B) => B.filter((te) => te.id !== L));
  }, z = () => {
    p(null), y([]), T(""), d(""), i("direct");
  }, D = (L) => {
    L || z(), t(L);
  }, O = async (L) => {
    var B, te, Q, me;
    if (L.preventDefault(), s === "direct") {
      if (!f) {
        xt.warning("Por favor, selecciona un usuario para iniciar la conversación.");
        return;
      }
      try {
        const Z = await N({
          type: "direct",
          user_id: Number(f),
          sender_id: Number(n)
        });
        xt.success("Conversación iniciada correctamente"), D(!1), r && Z && r(Z);
      } catch (Z) {
        const K = ((te = (B = Z == null ? void 0 : Z.response) == null ? void 0 : B.data) == null ? void 0 : te.message) || (Z == null ? void 0 : Z.message) || "Error al iniciar la conversación";
        xt.error(K);
      }
    } else {
      if (!C.trim()) {
        xt.warning("Por favor, ingresa el nombre del grupo.");
        return;
      }
      if (g.length === 0) {
        xt.warning("Por favor, selecciona al menos un participante para el grupo.");
        return;
      }
      try {
        const Z = await N({
          type: "group",
          name: C.trim(),
          user_ids: g.map((K) => Number(K.id)),
          sender_id: Number(n)
        });
        xt.success("Grupo creado correctamente"), D(!1), r && Z && r(Z);
      } catch (Z) {
        const K = ((me = (Q = Z == null ? void 0 : Z.response) == null ? void 0 : Q.data) == null ? void 0 : me.message) || (Z == null ? void 0 : Z.message) || "Error al crear el grupo";
        xt.error(K);
      }
    }
  }, M = w || s === "direct" && !f || s === "group" && (!C.trim() || g.length === 0);
  return /* @__PURE__ */ u(Rp, { open: e, onOpenChange: D, children: /* @__PURE__ */ u(Ap, { className: "sm:max-w-[480px]", children: /* @__PURE__ */ x("form", { onSubmit: O, className: "flex flex-col", children: [
    /* @__PURE__ */ x(Dp, { children: [
      /* @__PURE__ */ x("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ u("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20", children: /* @__PURE__ */ u(_n, { className: "size-5" }) }),
        /* @__PURE__ */ x("div", { className: "text-left pr-6", children: [
          /* @__PURE__ */ u(Mp, { children: "Nueva Conversación" }),
          /* @__PURE__ */ u(zp, { children: "Inicia un chat directo o crea un grupo de conversación" })
        ] })
      ] }),
      /* @__PURE__ */ u("div", { className: "mt-3.5", children: /* @__PURE__ */ u(
        uc,
        {
          value: s,
          onValueChange: (L) => i(L),
          className: "w-full",
          children: /* @__PURE__ */ x(dc, { className: "w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ x(
              us,
              {
                value: "direct",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ u(cs, { className: "size-3.5" }),
                  /* @__PURE__ */ u("span", { children: "Directo (1 a 1)" })
                ]
              }
            ),
            /* @__PURE__ */ x(
              us,
              {
                value: "group",
                type: "button",
                className: "gap-1.5 text-xs font-medium",
                children: [
                  /* @__PURE__ */ u(Ra, { className: "size-3.5" }),
                  /* @__PURE__ */ u("span", { children: "Grupo" })
                ]
              }
            )
          ] })
        }
      ) })
    ] }),
    /* @__PURE__ */ x("div", { className: "p-5 space-y-4", children: [
      s === "group" && /* @__PURE__ */ x("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ x("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5", children: [
          /* @__PURE__ */ u("span", { children: "Nombre del Grupo" }),
          /* @__PURE__ */ u("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ u(
          Na,
          {
            placeholder: "Ej. Soporte Técnico L2, Equipo Infraestructura...",
            value: C,
            onChange: (L) => T(L.target.value),
            className: "h-9 text-xs",
            required: !0
          }
        )
      ] }),
      s === "group" && g.length > 0 && /* @__PURE__ */ x("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ x("div", { className: "flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400", children: [
          /* @__PURE__ */ x("span", { children: [
            "Participantes seleccionados (",
            g.length,
            ")"
          ] }),
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => y([]),
              className: "text-[10px] text-red-500 hover:underline cursor-pointer",
              children: "Quitar todos"
            }
          )
        ] }),
        /* @__PURE__ */ u("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800", children: g.map((L) => {
          const B = Tn(L.attributes.name);
          return /* @__PURE__ */ x(
            Wt,
            {
              variant: "secondary",
              className: "gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
              children: [
                /* @__PURE__ */ u(
                  ar,
                  {
                    name: B,
                    src: L.attributes.avatar_url,
                    size: "xs"
                  }
                ),
                /* @__PURE__ */ u("span", { className: "max-w-28 truncate font-medium capitalize", children: B }),
                /* @__PURE__ */ u(
                  "button",
                  {
                    type: "button",
                    onClick: () => E(L.id),
                    className: "rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
                    children: /* @__PURE__ */ u(vt, { className: "size-3" })
                  }
                )
              ]
            },
            L.id
          );
        }) })
      ] }),
      /* @__PURE__ */ x("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ x("label", { className: "text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between", children: [
          /* @__PURE__ */ u("span", { children: s === "direct" ? "Selecciona un usuario" : "Añadir participantes" }),
          /* @__PURE__ */ x("span", { className: "text-[10px] font-normal text-neutral-400", children: [
            k.length,
            " disponibles"
          ] })
        ] }),
        /* @__PURE__ */ x("div", { className: "relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
          /* @__PURE__ */ u(Yl, { className: "size-3.5 shrink-0 text-neutral-400" }),
          /* @__PURE__ */ u(
            "input",
            {
              type: "text",
              placeholder: "Buscar por nombre...",
              value: o,
              onChange: (L) => d(L.target.value),
              className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
            }
          ),
          o && /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => d(""),
              className: "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer",
              children: /* @__PURE__ */ u(vt, { className: "size-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ u("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden", children: /* @__PURE__ */ u(jn, { className: "h-56 sm:h-64 w-full", children: A ? /* @__PURE__ */ x("div", { className: "flex h-56 items-center justify-center gap-2 text-xs text-neutral-500", children: [
        /* @__PURE__ */ u(rn, { className: "size-4 animate-spin text-blue-600" }),
        /* @__PURE__ */ u("span", { children: "Cargando usuarios..." })
      ] }) : k.length === 0 ? /* @__PURE__ */ x("div", { className: "flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500", children: [
        /* @__PURE__ */ u("p", { className: "font-medium text-neutral-700 dark:text-neutral-300", children: "No se encontraron usuarios" }),
        /* @__PURE__ */ u("p", { className: "text-[11px] mt-1", children: "Prueba con otro término de búsqueda" })
      ] }) : /* @__PURE__ */ u("div", { className: "divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5", children: k.map((L) => {
        const B = f === L.id, te = g.some((Z) => Z.id === L.id), Q = s === "direct" ? B : te, me = Tn(L.attributes.name);
        return /* @__PURE__ */ x(
          "div",
          {
            onClick: () => {
              s === "direct" ? p(L.id) : _(L);
            },
            className: X(
              "flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors",
              Q ? "bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium" : "hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200"
            ),
            children: [
              /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
                /* @__PURE__ */ u(
                  ar,
                  {
                    name: me,
                    src: L.attributes.avatar_url,
                    size: "sm"
                  }
                ),
                /* @__PURE__ */ u("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ u("p", { className: "truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize", children: me }) })
              ] }),
              /* @__PURE__ */ u("div", { className: "shrink-0 pl-1", children: /* @__PURE__ */ u(
                "div",
                {
                  className: X(
                    "flex size-5 items-center justify-center rounded-full border transition-all",
                    Q ? "border-blue-600 bg-blue-600 text-white" : "border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent"
                  ),
                  children: /* @__PURE__ */ u(gp, { className: "size-3 stroke-[2.5]" })
                }
              ) })
            ]
          },
          L.id
        );
      }) }) }) })
    ] }),
    /* @__PURE__ */ x(Lp, { children: [
      /* @__PURE__ */ u(
        ye,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => D(!1),
          disabled: w,
          className: "text-xs h-8 px-3.5 cursor-pointer",
          children: "Cancelar"
        }
      ),
      /* @__PURE__ */ u(
        ye,
        {
          type: "submit",
          size: "sm",
          variant: "primary",
          disabled: M,
          className: "text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer",
          children: w ? /* @__PURE__ */ x(nr, { children: [
            /* @__PURE__ */ u(rn, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ u("span", { children: "Creando..." })
          ] }) : /* @__PURE__ */ x(nr, { children: [
            /* @__PURE__ */ u(_n, { className: "size-3.5" }),
            /* @__PURE__ */ u("span", { children: s === "direct" ? "Iniciar Chat" : "Crear Grupo" })
          ] })
        }
      )
    ] })
  ] }) }) });
}
const Hb = (e) => {
  var n, s, i, o, d;
  const t = (e == null ? void 0 : e.params) ?? {}, r = Ro({
    queryKey: ["list-conversations", t],
    queryFn: () => hb(t),
    placeholderData: vo,
    refetchOnWindowFocus: !1,
    enabled: (e == null ? void 0 : e.enable) !== !1
  });
  return {
    data: ((n = r.data) == null ? void 0 : n.data.data) ?? [],
    meta: (i = (s = r.data) == null ? void 0 : s.data) == null ? void 0 : i.meta,
    links: (o = r.data) == null ? void 0 : o.data.links,
    isLoading: r.isPending,
    errors: ((d = r.error) == null ? void 0 : d.data) ?? {},
    refetch: r.refetch
  };
}, Bb = () => {
  const e = ir(), { config: t, currentUser: r, currentUserId: n } = kt(), s = Dt({
    permission: ["messenger_chat.read"]
  }), [i, o] = ae("0"), [d, h] = ae("all"), [f, p] = ae(""), g = Cc(f, 300), y = zt(() => {
    const K = {
      closed: i
    };
    return d !== "all" && (K.type = d), g.trim() && (K.name = g.trim()), {
      user_id: n,
      paginate: "false",
      ...Object.keys(K).length > 0 ? { filter: K } : {}
    };
  }, [i, d, g, n]), {
    data: C,
    isLoading: T,
    errors: P,
    refetch: A
  } = Hb({
    params: y,
    enable: !!n && s
  }), [N, w] = ae(""), [k, _] = ae(!1), [E, z] = ae(!1), [D, O] = ae(!1), M = Je(
    (K) => {
      String(K.conversation_id) !== N && xt.info("Nuevo mensaje", {
        id: `conversation-message-${K.message.id}`,
        description: K.message.body || "Tienes un mensaje nuevo",
        action: {
          label: "Abrir",
          onClick: () => {
            w(String(K.conversation_id)), z(!0);
          }
        }
      }), e.invalidateQueries({ queryKey: ["list-conversations"] }), A();
    },
    [e, A, N]
  ), L = Je(() => {
    e.invalidateQueries({ queryKey: ["list-conversations"] }), A();
  }, [e, A]);
  Fe(() => {
    if (n)
      return Eb(
        t.reverb,
        n,
        M,
        L
      );
  }, [t.reverb, L, M, n]);
  const B = zt(
    () => C.find((K) => K.id === N),
    [C, N]
  );
  return {
    conversations: C,
    selectedId: N,
    setSelectedId: w,
    selectedConversation: B,
    closedFilter: i,
    setClosedFilter: o,
    typeFilter: d,
    setTypeFilter: h,
    searchQuery: f,
    setSearchQuery: p,
    isContextPanelOpen: k,
    isMobileChatOpen: E,
    isNewConversationOpen: D,
    isLoading: T,
    errors: P,
    hasReadPermission: s,
    currentUser: r,
    currentUserId: n,
    selectConversation: (K) => {
      w(K), z(!0);
    },
    unselectConversation: () => {
      w(""), z(!1);
    },
    setIsContextPanelOpen: _,
    setIsNewConversationOpen: O,
    goBackToConversationList: () => z(!1),
    handleConversationCreated: (K) => {
      w(K.id), z(!0), O(!1), e.invalidateQueries({ queryKey: ["list-conversations"] }), A();
    }
  };
}, $b = (e) => pt({
  url: `${mt("helpdesk", "v1")}/requests/chat-support`,
  method: "POST",
  data: e
}), Wb = () => {
  const e = ir(), t = Je(async (r) => {
    var i;
    const n = await $b(r), s = ((i = n.data) == null ? void 0 : i.data) ?? n.data;
    return s != null && s.conversation_id && await e.invalidateQueries({ queryKey: ["list-conversations"] }), s;
  }, [e]);
  return zr(
    t
  );
}, _c = ["/messenger"];
function to(e, t) {
  if (!e || !t) return !1;
  const r = (e.startsWith("/") ? e : `/${e}`).toLowerCase().replace(/\/+$/, "") || "/", n = (t.startsWith("/") ? t : `/${t}`).toLowerCase().trim();
  if (n.endsWith("/*")) {
    const i = n.slice(0, -2).replace(/\/+$/, "") || "/";
    return r === i || r.startsWith(i === "/" ? "/" : `${i}/`);
  }
  if (n.endsWith("*")) {
    const i = n.slice(0, -1).replace(/\/+$/, "") || "/";
    return r === i || r.startsWith(i);
  }
  const s = n.replace(/\/+$/, "") || "/";
  return r === s || r.startsWith(`${s}/`);
}
if (typeof window < "u") {
  const e = window;
  if (!e.__sdi_messenger_history_patched__) {
    e.__sdi_messenger_history_patched__ = !0;
    const t = window.history.pushState;
    window.history.pushState = function(...n) {
      const s = t.apply(this, n);
      return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchange")), s;
    };
    const r = window.history.replaceState;
    window.history.replaceState = function(...n) {
      const s = r.apply(this, n);
      return window.dispatchEvent(new Event("replacestate")), window.dispatchEvent(new Event("locationchange")), s;
    };
  }
}
function Vb({
  hiddenPaths: e = _c,
  showOnlyPaths: t,
  hideCondition: r,
  hidden: n = !1,
  currentPath: s
}) {
  const [i, o] = ae(() => s !== void 0 ? s : typeof window < "u" ? window.location.pathname : "");
  return Fe(() => {
    if (s !== void 0) {
      o(s);
      return;
    }
    if (typeof window > "u") return;
    const h = () => {
      const p = window.location.pathname;
      o((g) => g !== p ? p : g);
    };
    h(), window.addEventListener("popstate", h), window.addEventListener("pushstate", h), window.addEventListener("replacestate", h), window.addEventListener("locationchange", h);
    const f = window.setInterval(h, 150);
    return () => {
      window.removeEventListener("popstate", h), window.removeEventListener("pushstate", h), window.removeEventListener("replacestate", h), window.removeEventListener("locationchange", h), window.clearInterval(f);
    };
  }, [s]), { shouldHide: zt(() => n ? !0 : i ? !!(r && r(i) || t && t.length > 0 && !t.some((f) => to(i, f)) || e && e.length > 0 && e.some((f) => to(i, f))) : !1, [i, n, r, t, e]), pathname: i };
}
const ro = "sdi_floating_chat_corner";
function Qb(e = "bottom-right") {
  const t = je(null), [r, n] = ae(e), [s, i] = ae(!1), [o, d] = ae(null), h = je({ startX: 0, startY: 0, rect: new DOMRect(), moved: !1 }), f = je(!1), p = je(null);
  Fe(() => {
    try {
      const N = localStorage.getItem(ro);
      N && ["bottom-right", "bottom-left", "top-right", "top-left"].includes(N) && n(N);
    } catch {
    }
  }, []);
  const g = (N) => {
    n(N);
    try {
      localStorage.setItem(ro, N);
    } catch {
    }
  }, y = (N) => {
    if (N.button !== 0 && N.pointerType === "mouse") return;
    const w = t.current;
    if (!w) return;
    const k = w.getBoundingClientRect();
    h.current = {
      startX: N.clientX,
      startY: N.clientY,
      rect: k,
      moved: !1
    };
    const _ = N.clientX - k.left, E = N.clientY - k.top, z = (O) => {
      Math.hypot(
        O.clientX - h.current.startX,
        O.clientY - h.current.startY
      ) > 5 && (h.current.moved || (h.current.moved = !0, i(!0)), p.current && cancelAnimationFrame(p.current), p.current = requestAnimationFrame(() => {
        const L = Math.max(
          12,
          Math.min(window.innerWidth - k.width - 12, O.clientX - _)
        ), B = Math.max(
          12,
          Math.min(window.innerHeight - k.height - 12, O.clientY - E)
        );
        d({ x: L, y: B });
      }));
    }, D = (O) => {
      if (window.removeEventListener("pointermove", z), window.removeEventListener("pointerup", D), window.removeEventListener("pointercancel", D), p.current && cancelAnimationFrame(p.current), h.current.moved) {
        f.current = !0, setTimeout(() => {
          f.current = !1;
        }, 100);
        const M = O.clientX > window.innerWidth / 2, B = O.clientY > window.innerHeight / 2 ? M ? "bottom-right" : "bottom-left" : M ? "top-right" : "top-left";
        g(B), i(!1), d(null);
      }
    };
    window.addEventListener("pointermove", z), window.addEventListener("pointerup", D), window.addEventListener("pointercancel", D);
  }, C = r.startsWith("top"), T = r.endsWith("left");
  return {
    containerRef: t,
    corner: r,
    isDragging: s,
    dragPos: o,
    wasDraggedRef: f,
    isTop: C,
    isLeft: T,
    cornerContainerClass: C ? T ? "top-6 left-6 items-start flex-col-reverse" : "top-6 right-6 items-end flex-col-reverse" : T ? "bottom-6 left-6 items-start flex-col" : "bottom-6 right-6 items-end flex-col",
    cardOriginClass: C ? T ? "origin-top-left" : "origin-top-right" : T ? "origin-bottom-left" : "origin-bottom-right",
    startDrag: y,
    changeCorner: g
  };
}
function Yb({
  isOpen: e,
  totalUnreadCount: t,
  isLeft: r,
  isLoading: n = !1,
  hasError: s = !1,
  onToggleOpen: i,
  onPointerDown: o
}) {
  const d = () => e ? "bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 rotate-90 shadow-2xl" : s ? "bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400/40 shadow-rose-500/30" : n ? "bg-blue-600/90 text-white" : "bg-blue-600 hover:bg-blue-700 text-white", h = () => e ? "Cerrar chat de soporte" : s ? "Error de conexión en el chat (Haz clic para ver detalles o reintentar)" : n ? "Conectando al chat de soporte..." : t > 0 ? `Abrir chat de soporte (${t} mensaje${t === 1 ? "" : "s"} sin leer)` : "Abrir chat de soporte";
  return /* @__PURE__ */ x(
    "div",
    {
      onPointerDown: o,
      className: "pointer-events-auto relative touch-none",
      children: [
        /* @__PURE__ */ u(
          "button",
          {
            type: "button",
            onClick: i,
            className: X(
              "flex h-14 w-14 items-center justify-center rounded-full cursor-grab active:cursor-grabbing shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/40",
              d()
            ),
            "aria-label": h(),
            title: h(),
            children: e ? /* @__PURE__ */ u(vt, { className: "size-6 transition-transform duration-200 text-white" }) : s ? /* @__PURE__ */ u("div", { className: "relative flex items-center justify-center animate-in zoom-in-75 duration-200", children: /* @__PURE__ */ u(bs, { className: "size-6 transition-transform duration-200 text-white" }) }) : n ? /* @__PURE__ */ u("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ u(rn, { className: "size-6 animate-spin text-white" }) }) : /* @__PURE__ */ u("div", { className: "relative flex items-center justify-center", children: /* @__PURE__ */ u(Sp, { className: "size-6 transition-transform duration-200" }) })
          }
        ),
        !e && s && /* @__PURE__ */ x(
          "span",
          {
            className: X(
              "absolute -top-1 flex size-5 items-center justify-center rounded-full bg-rose-700 text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200",
              r ? "-left-1" : "-right-1"
            ),
            title: "Error de conexión",
            children: [
              /* @__PURE__ */ u("span", { className: "absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-rose-500/50 animate-ping pointer-events-none" }),
              /* @__PURE__ */ u("span", { className: "text-[10px] font-bold", children: "!" })
            ]
          }
        ),
        !e && !s && t > 0 && /* @__PURE__ */ x(
          "span",
          {
            className: X(
              "absolute -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[11px] font-bold text-white shadow-lg ring-2 ring-white dark:ring-neutral-900 pointer-events-none animate-in zoom-in duration-200",
              r ? "-left-1" : "-right-1"
            ),
            title: `${t} mensaje${t === 1 ? "" : "s"} sin leer`,
            children: [
              /* @__PURE__ */ u("span", { className: "absolute -top-0.5 -right-0.5 -bottom-0.5 -left-0.5 rounded-full bg-red-500/40 animate-ping pointer-events-none" }),
              /* @__PURE__ */ u("span", { className: "relative z-10", children: t > 99 ? "99+" : t })
            ]
          }
        )
      ]
    }
  );
}
function La({
  onNewConversation: e,
  showNewButton: t = !0,
  className: r
}) {
  var f, p;
  const { currentUser: n, isLoadingUser: s, hasError: i } = kt(), o = Dt({
    permission: ["messenger_chat_support.provide_support"]
  }), d = Tn((f = n == null ? void 0 : n.attributes) == null ? void 0 : f.name) || "Usuario", h = ((p = n == null ? void 0 : n.attributes) == null ? void 0 : p.email) || "Mi cuenta";
  return i ? /* @__PURE__ */ x(
    "div",
    {
      className: X(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/80 dark:bg-neutral-900/80 flex items-center gap-2 text-neutral-500 dark:text-neutral-400",
        r
      ),
      children: [
        /* @__PURE__ */ u(sc, { className: "size-3.5 shrink-0 text-red-500" }),
        /* @__PURE__ */ u("span", { className: "truncate text-[11px] font-medium", children: "Sin conexión • No disponible" })
      ]
    }
  ) : s ? /* @__PURE__ */ x(
    "div",
    {
      className: X(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        r
      ),
      children: [
        /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ u(oe, { className: "size-8 rounded-full" }),
          /* @__PURE__ */ x("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
            /* @__PURE__ */ u(oe, { className: "h-3 w-20" }),
            /* @__PURE__ */ u(oe, { className: "h-2.5 w-32" })
          ] })
        ] }),
        t && /* @__PURE__ */ u(oe, { className: "size-8 rounded-lg shrink-0" })
      ]
    }
  ) : /* @__PURE__ */ x(
    "div",
    {
      className: X(
        "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5",
        r
      ),
      children: [
        /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 min-w-0 flex-1", children: [
          /* @__PURE__ */ u(ar, { src: n == null ? void 0 : n.attributes.avatar_url, name: d, size: "sm" }),
          /* @__PURE__ */ x("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ u("p", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: d }),
            /* @__PURE__ */ u("p", { className: "truncate text-[10px] text-neutral-500 dark:text-neutral-400", children: h })
          ] })
        ] }),
        t && e && o && /* @__PURE__ */ u(
          ye,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: e,
            className: "h-8 gap-1.5 px-3 text-xs font-semibold shrink-0 shadow-xs cursor-pointer",
            title: "Iniciar nueva conversación",
            children: /* @__PURE__ */ u(_n, { className: "size-3.5" })
          }
        )
      ]
    }
  );
}
function Gb({
  title: e,
  canRequestSupport: t,
  canViewChatList: r,
  totalUnreadCount: n,
  conversationsCount: s,
  onRequestSupport: i,
  onViewChatList: o,
  onClose: d,
  onNewConversation: h,
  onDragStart: f
}) {
  return /* @__PURE__ */ x("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ x(
      "div",
      {
        onPointerDown: f,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ x("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ u("div", { className: "flex size-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md", children: /* @__PURE__ */ u(la, { className: "size-5 text-white" }) }),
              /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ u("h3", { className: "text-sm font-bold leading-none text-white", children: e }),
                /* @__PURE__ */ x("p", { className: "text-[11px] text-blue-100 mt-1 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ u("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }),
                  "Soporte técnico SDI"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ u(
              ye,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (p) => p.stopPropagation(),
                onClick: d,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ u(vt, { className: "size-4" })
              }
            )
          ] }),
          /* @__PURE__ */ x("div", { className: "mt-4", children: [
            /* @__PURE__ */ u("p", { className: "text-xs font-semibold text-white", children: "¿En qué podemos ayudarte hoy?" }),
            /* @__PURE__ */ u("p", { className: "text-[11px] text-blue-100/90 mt-0.5", children: "Selecciona una opción para iniciar asistencia o revisar tu historial." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ x("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      t && /* @__PURE__ */ x(
        "button",
        {
          type: "button",
          onClick: i,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer",
          children: [
            /* @__PURE__ */ x("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ u("div", { className: "flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: /* @__PURE__ */ u(la, { className: "size-5" }) }),
              /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ u("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Solicitar Asistencia" }),
                /* @__PURE__ */ u("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Ingresa asunto y mensaje para iniciar soporte" })
              ] })
            ] }),
            /* @__PURE__ */ u(Ui, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      r && /* @__PURE__ */ x(
        "button",
        {
          type: "button",
          onClick: o,
          className: "group flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40 p-3.5 text-left shadow-xs transition-all hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-neutral-800 cursor-pointer",
          children: [
            /* @__PURE__ */ x("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ x("div", { className: "relative flex size-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors group-hover:bg-blue-600 group-hover:text-white", children: [
                /* @__PURE__ */ u(Pa, { className: "size-5" }),
                n > 0 && /* @__PURE__ */ u("span", { className: "absolute -top-1 -right-1 size-3 rounded-full bg-red-500 ring-2 ring-white dark:ring-neutral-900" })
              ] }),
              /* @__PURE__ */ x("div", { children: [
                /* @__PURE__ */ x("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ u("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors", children: "Ver mis chats" }),
                  n > 0 ? /* @__PURE__ */ x("span", { className: "rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs animate-pulse", children: [
                    n > 99 ? "99+" : n,
                    " ",
                    "sin leer"
                  ] }) : s > 0 ? /* @__PURE__ */ u("span", { className: "rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-blue-600 dark:text-blue-400", children: s }) : null
                ] }),
                /* @__PURE__ */ u("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5", children: "Revisa tus conversaciones y requerimientos" })
              ] })
            ] }),
            /* @__PURE__ */ u(Ui, { className: "size-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" })
          ]
        }
      ),
      /* @__PURE__ */ x("div", { className: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-800/30 p-3 mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5", children: [
        /* @__PURE__ */ x("div", { className: "flex items-center gap-1.5 font-semibold text-neutral-800 dark:text-neutral-200 text-xs", children: [
          /* @__PURE__ */ u(Oa, { className: "size-3.5 text-emerald-600" }),
          /* @__PURE__ */ u("span", { children: "Mesa de Ayuda SDI" })
        ] }),
        /* @__PURE__ */ u("p", { className: "leading-relaxed", children: "Tus solicitudes quedan registradas con trazabilidad y número de ticket en la plataforma de Helpdesk." })
      ] })
    ] }),
    /* @__PURE__ */ u(La, { onNewConversation: h })
  ] });
}
function Xb({
  userId: e,
  userName: t,
  onSubmit: r,
  isSubmitting: n = !1,
  error: s = null,
  onCancel: i
}) {
  const [o, d] = ae(""), [h, f] = ae(""), [p, g] = ae(null);
  return /* @__PURE__ */ x("form", { onSubmit: (C) => {
    C.preventDefault(), g(null);
    const T = o.trim(), P = h.trim();
    if (!T) {
      g("Por favor ingresa el asunto de tu solicitud.");
      return;
    }
    if (!P) {
      g("Por favor describe el detalle de tu consulta.");
      return;
    }
    if (!e) {
      g("No se pudo identificar el usuario actual para la solicitud.");
      return;
    }
    r({
      subject: T,
      message: P,
      user_id: e
    });
  }, className: "sdi-messenger-root flex flex-col h-full w-full bg-white dark:bg-neutral-900", children: [
    /* @__PURE__ */ x("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 text-neutral-800 dark:text-neutral-100", children: [
      /* @__PURE__ */ u("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-neutral-50/90 to-white dark:from-neutral-800/50 dark:to-neutral-900/50 p-3.5 shadow-2xs space-y-2", children: /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ u("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400", children: /* @__PURE__ */ u(la, { className: "size-4.5" }) }),
        /* @__PURE__ */ x("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ x("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ u("h4", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate", children: t ? `Hola, ${t}` : "Nueva solicitud de soporte" }),
            /* @__PURE__ */ x("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40", children: [
              /* @__PURE__ */ u("span", { className: "size-1.5 rounded-full bg-emerald-500 animate-pulse" }),
              "En línea"
            ] })
          ] }),
          /* @__PURE__ */ u("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug", children: "Completa los datos para asignarte un técnico de soporte." })
        ] })
      ] }) }),
      (p || s) && /* @__PURE__ */ x("div", { className: "flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 shadow-2xs", children: [
        /* @__PURE__ */ u(yp, { className: "size-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" }),
        /* @__PURE__ */ x("div", { className: "flex-1 leading-snug", children: [
          /* @__PURE__ */ u("span", { className: "font-medium", children: "Error en el formulario:" }),
          " ",
          p || s
        ] })
      ] }),
      /* @__PURE__ */ x("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ x("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ u(_p, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ u("span", { children: "Asunto de la consulta" }),
          /* @__PURE__ */ u("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ u("div", { className: "relative", children: /* @__PURE__ */ u(
          Na,
          {
            value: o,
            onChange: (C) => {
              d(C.target.value), p && g(null);
            },
            placeholder: "Ej: Consulta sobre configuración o reporte de falla",
            disabled: n,
            maxLength: 150,
            className: "h-9.5 bg-neutral-50/60 hover:bg-white focus:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus:border-blue-500 rounded-lg text-xs transition-colors"
          }
        ) })
      ] }),
      /* @__PURE__ */ x("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ x("label", { className: "flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300", children: [
          /* @__PURE__ */ u(Np, { className: "size-3.5 text-neutral-400" }),
          /* @__PURE__ */ u("span", { children: "Detalle o descripción" }),
          /* @__PURE__ */ u("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ x("div", { className: "relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 hover:bg-white focus-within:bg-white dark:bg-neutral-900 dark:hover:bg-neutral-900/80 dark:focus-within:bg-neutral-900 focus-within:border-blue-500 transition-colors", children: [
          /* @__PURE__ */ u(
            Ca,
            {
              value: h,
              onChange: (C) => {
                f(C.target.value), p && g(null);
              },
              placeholder: "Describe lo más claro posible tu duda o problema...",
              rows: 4,
              disabled: n,
              maxLength: 1e3,
              className: "min-h-24 w-full border-0 bg-transparent p-3 text-xs focus:ring-0 focus-visible:ring-0 shadow-none resize-none"
            }
          ),
          /* @__PURE__ */ x("div", { className: "flex items-center justify-between px-3 pb-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/60 text-[10px] text-neutral-400 dark:text-neutral-500", children: [
            /* @__PURE__ */ u("span", { children: "Proporciona detalles específicos" }),
            /* @__PURE__ */ x("span", { className: "font-mono", children: [
              h.length,
              "/1000"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ x("div", { className: "flex items-start gap-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 p-2.5 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: [
        /* @__PURE__ */ u(Oa, { className: "size-4 shrink-0 text-neutral-400 mt-0.5" }),
        /* @__PURE__ */ u("span", { children: "Tu solicitud creará automáticamente una conversación y se notificará al equipo de asistencia." })
      ] })
    ] }),
    /* @__PURE__ */ x("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-3 bg-neutral-50/70 dark:bg-neutral-900/80 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ u("div", { children: i && /* @__PURE__ */ u(
        ye,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: i,
          disabled: n,
          className: "text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800 cursor-pointer",
          children: "Cancelar"
        }
      ) }),
      /* @__PURE__ */ u(
        ye,
        {
          type: "submit",
          variant: "primary",
          size: "sm",
          disabled: n || !o.trim() || !h.trim(),
          className: "gap-2 h-9 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-medium text-xs rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          children: n ? /* @__PURE__ */ x(nr, { children: [
            /* @__PURE__ */ u(rn, { className: "size-3.5 animate-spin" }),
            /* @__PURE__ */ u("span", { children: "Enviando solicitud..." })
          ] }) : /* @__PURE__ */ x(nr, { children: [
            /* @__PURE__ */ u("span", { children: "Iniciar soporte" }),
            /* @__PURE__ */ u(Xl, { className: "size-3.5" })
          ] })
        }
      )
    ] })
  ] });
}
function Kb({
  userId: e,
  userName: t,
  canViewChatList: r,
  totalUnreadCount: n,
  isSubmitting: s,
  error: i,
  onHome: o,
  onViewChats: d,
  onClose: h,
  onSubmit: f,
  onNewConversation: p,
  onDragStart: g
}) {
  return /* @__PURE__ */ x("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ u(
      "div",
      {
        onPointerDown: g,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-3.5 py-4 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: /* @__PURE__ */ x("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ x(
              ye,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (y) => y.stopPropagation(),
                onClick: o,
                className: "h-7 gap-1 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ u(_a, { className: "size-3.5" }),
                  /* @__PURE__ */ u("span", { children: "Inicio" })
                ]
              }
            ),
            /* @__PURE__ */ u("span", { className: "text-xs font-bold text-white", children: "Solicitar Asistencia" })
          ] }),
          /* @__PURE__ */ x("div", { className: "flex items-center gap-1", children: [
            r && /* @__PURE__ */ x(
              ye,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (y) => y.stopPropagation(),
                onClick: d,
                title: "Ver mis chats",
                className: "relative h-7 px-2 rounded-lg text-white/90 hover:bg-white/15 hover:text-white text-xs cursor-pointer gap-1",
                children: [
                  /* @__PURE__ */ u(Pa, { className: "size-3.5" }),
                  /* @__PURE__ */ u("span", { className: "hidden sm:inline text-[11px] font-medium", children: "Mis chats" }),
                  n > 0 && /* @__PURE__ */ u("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-xs", children: n > 99 ? "99+" : n })
                ]
              }
            ),
            /* @__PURE__ */ u(
              ye,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onPointerDown: (y) => y.stopPropagation(),
                onClick: h,
                className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/15 hover:text-white cursor-pointer",
                children: /* @__PURE__ */ u(vt, { className: "size-4" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ u("div", { className: "flex-1 min-h-0 overflow-hidden flex flex-col", children: e && /* @__PURE__ */ u(
      Xb,
      {
        userId: e,
        userName: t,
        onSubmit: f,
        isSubmitting: s,
        error: i,
        onCancel: o
      }
    ) }),
    /* @__PURE__ */ u(La, { onNewConversation: p })
  ] });
}
const Jb = [
  { id: "all", label: "Todos", icon: null },
  { id: "direct", label: "Directos", icon: cs },
  { id: "group", label: "Grupos", icon: Ra },
  { id: "bot", label: "Bots", icon: fp }
], Zb = () => /* @__PURE__ */ x("div", { className: "flex w-full min-w-0 items-center gap-2.5 rounded-xl p-3 border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-800/20", children: [
  /* @__PURE__ */ u(oe, { className: "size-9.5 rounded-full shrink-0" }),
  /* @__PURE__ */ x("div", { className: "flex-1 min-w-0 space-y-2", children: [
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ u(oe, { className: "h-3.5 w-28" }),
      /* @__PURE__ */ u(oe, { className: "h-2.5 w-10" })
    ] }),
    /* @__PURE__ */ x("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ u(oe, { className: "h-2.5 w-36" }),
      /* @__PURE__ */ u(oe, { className: "h-3.5 w-6 rounded-full" })
    ] })
  ] })
] }), ey = ({
  conversation: e,
  selectedId: t,
  currentUserId: r,
  onSelectConversation: n
}) => {
  var C, T, P;
  const s = Fn(e), i = e.type === "bot" || ((C = e.attributes) == null ? void 0 : C.type) === "bot", o = !!e.attributes.closed_at, d = In(e, r), h = un(e, r), f = ((P = (T = e.relationships) == null ? void 0 : T.users) == null ? void 0 : P.length) || 0, p = s ? "Grupo" : i ? "Bot de Asistencia" : "Conversación directa";
  let g = "";
  try {
    g = fs(
      Ma(e.attributes.updated_at || e.attributes.created_at),
      "dd/MM HH:mm"
    );
  } catch {
    g = "";
  }
  const y = t === e.id;
  return /* @__PURE__ */ u(
    "div",
    {
      onClick: () => n(e.id),
      "aria-current": y ? "true" : void 0,
      className: X(
        "group relative flex w-full min-w-0 cursor-pointer select-none flex-col gap-1.5 overflow-hidden rounded-xl p-3 transition-all",
        y ? "bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900" : "hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 border border-transparent"
      ),
      children: /* @__PURE__ */ x("div", { className: "flex items-start gap-2.5 min-w-0", children: [
        /* @__PURE__ */ u(
          ar,
          {
            src: d == null ? void 0 : d.attributes.avatar_url,
            name: h,
            isGroup: s,
            size: "md",
            className: "shrink-0"
          }
        ),
        /* @__PURE__ */ x("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ x("div", { className: "flex items-center justify-between gap-1", children: [
            /* @__PURE__ */ x("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ u("h4", { className: "truncate text-xs font-bold text-neutral-900 dark:text-neutral-100", children: h }),
              s && /* @__PURE__ */ x("span", { className: "text-[10px] text-neutral-400 font-normal shrink-0", children: [
                "(",
                f,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ u("span", { className: "shrink-0 text-[10px] text-neutral-400 font-mono", children: g })
          ] }),
          /* @__PURE__ */ x("div", { className: "flex items-center justify-between gap-2 mt-1", children: [
            /* @__PURE__ */ x("div", { className: "flex items-center gap-1.5 min-w-0", children: [
              /* @__PURE__ */ u("p", { className: "truncate text-[11px] text-neutral-500 dark:text-neutral-400", children: p }),
              o && /* @__PURE__ */ x(
                Wt,
                {
                  variant: "outline",
                  className: "h-4 px-1 text-[9px] gap-0.5 border-amber-300 text-amber-700 dark:text-amber-400 font-medium",
                  children: [
                    /* @__PURE__ */ u(Ar, { className: "size-2" }),
                    /* @__PURE__ */ u("span", { children: "Cerrado" })
                  ]
                }
              )
            ] }),
            e.attributes.unread_count > 0 && /* @__PURE__ */ u(Wt, { className: "bg-blue-700", children: e.attributes.unread_count })
          ] })
        ] })
      ] })
    }
  );
};
function ty({
  conversations: e,
  selectedId: t,
  onSelectConversation: r,
  searchQuery: n,
  onSearchChange: s,
  closedFilter: i,
  onClosedFilterChange: o,
  typeFilter: d,
  onTypeFilterChange: h,
  onNewConversation: f,
  isLoading: p = !1
}) {
  const { currentUser: g, currentUserId: y, isLoadingUser: C, hasError: T, error: P } = kt(), A = Dt({
    permission: ["messenger_chat.read"]
  }), N = p || C;
  return /* @__PURE__ */ x("div", { className: "sdi-messenger-root flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ x("div", { className: "flex shrink-0 flex-col gap-2.5 border-b border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900", children: [
      /* @__PURE__ */ x("div", { className: "group/search relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-all duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20", children: [
        /* @__PURE__ */ u(Yl, { className: "size-3.5 shrink-0 text-neutral-400 transition-colors group-focus-within/search:text-blue-600" }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "text",
            placeholder: "Buscar por nombre...",
            value: n,
            onChange: (w) => s(w.target.value),
            className: "w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none"
          }
        ),
        n ? /* @__PURE__ */ u(
          ye,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: () => s(""),
            className: "size-5 shrink-0 rounded-full p-0 text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
            children: /* @__PURE__ */ u(vt, { className: "size-3" })
          }
        ) : /* @__PURE__ */ u("span", { className: "hidden shrink-0 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 font-mono text-[9px] font-medium text-neutral-400 sm:inline-block", children: "Buscar" })
      ] }),
      /* @__PURE__ */ u(
        uc,
        {
          value: i,
          onValueChange: (w) => o(w),
          className: "w-full",
          children: /* @__PURE__ */ x(dc, { className: "h-8 w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 p-0.5 text-xs", children: [
            /* @__PURE__ */ u(us, { value: "0", className: "text-[11px] font-medium", children: "Activos" }),
            /* @__PURE__ */ u(us, { value: "1", className: "text-[11px] font-medium", children: "Cerrados" })
          ] })
        }
      ),
      /* @__PURE__ */ u("div", { className: "flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none", children: Jb.map((w) => {
        const k = d === w.id, _ = w.icon;
        return /* @__PURE__ */ x(
          "button",
          {
            type: "button",
            onClick: () => h(w.id),
            className: X(
              "flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors cursor-pointer",
              k ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-semibold" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-200 border border-transparent"
            ),
            children: [
              _ && /* @__PURE__ */ u(_, { className: "size-3" }),
              /* @__PURE__ */ u("span", { children: w.label })
            ]
          },
          w.id
        );
      }) })
    ] }),
    /* @__PURE__ */ u("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ u(jn, { className: "h-full w-full", children: /* @__PURE__ */ u("div", { className: "space-y-1.5 p-1.5 w-full min-w-0", children: T ? /* @__PURE__ */ x("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ u("div", { className: "size-12 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ u(bs, { className: "size-6" }) }),
      /* @__PURE__ */ x("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ u("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Error al cargar chats" }),
        /* @__PURE__ */ u("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: (P == null ? void 0 : P.message) || "No se pudo conectar al servidor de mensajería." })
      ] }),
      /* @__PURE__ */ x(
        ye,
        {
          type: "button",
          variant: "primary",
          size: "sm",
          onClick: () => window.location.reload(),
          className: "h-7.5 gap-1.5 px-3 text-xs font-semibold cursor-pointer",
          children: [
            /* @__PURE__ */ u(Ea, { className: "size-3" }),
            /* @__PURE__ */ u("span", { children: "Reintentar" })
          ]
        }
      )
    ] }) : !A && !C ? /* @__PURE__ */ x("div", { className: "flex min-h-56 flex-col items-center justify-center p-6 text-center space-y-3", children: [
      /* @__PURE__ */ u("div", { className: "size-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ u(Ar, { className: "size-6" }) }),
      /* @__PURE__ */ x("div", { className: "space-y-1 max-w-xs", children: [
        /* @__PURE__ */ u("h4", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Sin permiso de lectura" }),
        /* @__PURE__ */ u("p", { className: "text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed", children: "No tienes permisos para ver el listado de conversaciones." })
      ] })
    ] }) : N ? /* @__PURE__ */ u("div", { className: "space-y-1.5 p-1", children: Array.from({ length: 5 }).map((w, k) => /* @__PURE__ */ u(Zb, {}, k)) }) : e.length === 0 ? /* @__PURE__ */ x("div", { className: "flex min-h-56 flex-col items-center justify-center px-4 py-12 text-center", children: [
      /* @__PURE__ */ u("div", { className: "mb-3 flex size-11 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400", children: /* @__PURE__ */ u(wp, { className: "size-5 stroke-[1.5]" }) }),
      /* @__PURE__ */ u("p", { className: "text-xs font-semibold text-neutral-900 dark:text-neutral-100", children: n ? "No se encontraron resultados" : i === "1" ? "No hay conversaciones cerradas" : "No hay conversaciones activas" }),
      /* @__PURE__ */ u("p", { className: "mt-1 max-w-48 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400", children: n ? "Intenta con otro término de búsqueda o cambia los filtros." : "Las conversaciones iniciadas aparecerán aquí." }),
      i !== "0" && /* @__PURE__ */ u(
        ye,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: () => o("0"),
          className: "mt-3 text-[11px] h-7 text-blue-600 dark:text-blue-400 cursor-pointer",
          children: "Ver activas"
        }
      )
    ] }) : e.map((w) => /* @__PURE__ */ u(
      ey,
      {
        conversation: w,
        selectedId: t,
        currentUserId: y,
        onSelectConversation: r
      },
      w.id
    )) }) }) }),
    /* @__PURE__ */ u(La, { onNewConversation: f })
  ] });
}
function ry({
  conversations: e,
  selectedId: t,
  searchQuery: r,
  closedFilter: n,
  typeFilter: s,
  isLoading: i,
  onHome: o,
  onClose: d,
  onSelectConversation: h,
  onSearchChange: f,
  onClosedFilterChange: p,
  onTypeFilterChange: g,
  onNewConversation: y,
  onDragStart: C
}) {
  return /* @__PURE__ */ x("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: [
    /* @__PURE__ */ x(
      "div",
      {
        onPointerDown: C,
        className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900 cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ x(
            ye,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (T) => T.stopPropagation(),
              onClick: o,
              className: "h-7 gap-1 px-2 text-xs font-medium cursor-pointer text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100",
              children: [
                /* @__PURE__ */ u(_a, { className: "size-3.5" }),
                /* @__PURE__ */ u("span", { children: "Inicio" })
              ]
            }
          ),
          /* @__PURE__ */ u("span", { className: "text-xs font-bold text-neutral-900 dark:text-neutral-100", children: "Mis Conversaciones" }),
          /* @__PURE__ */ u(
            ye,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (T) => T.stopPropagation(),
              onClick: d,
              className: "size-7 p-0 cursor-pointer text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ u(vt, { className: "size-3.5" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ u("div", { className: "flex-1 min-h-0 w-full overflow-hidden", children: /* @__PURE__ */ u(
      ty,
      {
        conversations: e,
        selectedId: t,
        onSelectConversation: h,
        searchQuery: r,
        onSearchChange: f,
        closedFilter: n,
        onClosedFilterChange: p,
        typeFilter: s,
        onTypeFilterChange: g,
        onNewConversation: y,
        isLoading: i
      }
    ) })
  ] });
}
function ny({
  onDragStart: e
}) {
  return /* @__PURE__ */ x("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ x(
      "div",
      {
        onPointerDown: e,
        className: "relative shrink-0 overflow-hidden bg-blue-600 px-4.5 py-6 text-white cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ x("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ u(oe, { className: "size-9 rounded-xl bg-white/20" }),
              /* @__PURE__ */ x("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ u(oe, { className: "h-3.5 w-32 bg-white/30" }),
                /* @__PURE__ */ u(oe, { className: "h-2.5 w-24 bg-white/20" })
              ] })
            ] }),
            /* @__PURE__ */ u(oe, { className: "size-7 rounded-full bg-white/20" })
          ] }),
          /* @__PURE__ */ x("div", { className: "mt-4 space-y-1.5", children: [
            /* @__PURE__ */ u(oe, { className: "h-3 w-48 bg-white/30" }),
            /* @__PURE__ */ u(oe, { className: "h-2.5 w-64 bg-white/20" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ x("div", { className: "flex-1 min-h-0 overflow-y-auto p-4 space-y-3", children: [
      /* @__PURE__ */ x("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ x("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ u(oe, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ x("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ u(oe, { className: "h-3.5 w-28" }),
            /* @__PURE__ */ u(oe, { className: "h-2.5 w-44" })
          ] })
        ] }),
        /* @__PURE__ */ u(oe, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ x("div", { className: "flex w-full items-center justify-between rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/30 p-3.5", children: [
        /* @__PURE__ */ x("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ u(oe, { className: "size-10 rounded-xl" }),
          /* @__PURE__ */ x("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ u(oe, { className: "h-3.5 w-24" }),
            /* @__PURE__ */ u(oe, { className: "h-2.5 w-48" })
          ] })
        ] }),
        /* @__PURE__ */ u(oe, { className: "size-4 rounded-md" })
      ] }),
      /* @__PURE__ */ x("div", { className: "rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-neutral-800/20 p-3 mt-4 space-y-2", children: [
        /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ u(oe, { className: "size-3.5 rounded-full" }),
          /* @__PURE__ */ u(oe, { className: "h-3 w-32" })
        ] }),
        /* @__PURE__ */ u(oe, { className: "h-2.5 w-full" }),
        /* @__PURE__ */ u(oe, { className: "h-2.5 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ x("div", { className: "shrink-0 border-t border-neutral-200 dark:border-neutral-800 p-2.5 px-3 bg-neutral-50/70 dark:bg-neutral-900/70 flex items-center justify-between gap-2.5", children: [
      /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 flex-1", children: [
        /* @__PURE__ */ u(oe, { className: "size-8 rounded-full" }),
        /* @__PURE__ */ x("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ u(oe, { className: "h-3 w-24" }),
          /* @__PURE__ */ u(oe, { className: "h-2.5 w-36" })
        ] })
      ] }),
      /* @__PURE__ */ u(oe, { className: "size-8 rounded-lg" })
    ] })
  ] });
}
function sy({
  error: e,
  onRetry: t,
  onClose: r,
  onDragStart: n
}) {
  const s = (e == null ? void 0 : e.message) || "No se pudo inicializar la conexión con el servidor de chat.";
  return /* @__PURE__ */ x("div", { className: "flex h-full w-full flex-col bg-white dark:bg-neutral-900 overflow-hidden", children: [
    /* @__PURE__ */ x(
      "div",
      {
        onPointerDown: n,
        className: "relative shrink-0 overflow-hidden bg-red-600 px-4 py-4 text-white flex items-center justify-between cursor-grab active:cursor-grabbing touch-none select-none",
        children: [
          /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ u(bs, { className: "size-5" }),
            /* @__PURE__ */ u("span", { className: "text-xs font-bold", children: "Error de Conexión" })
          ] }),
          r && /* @__PURE__ */ u(
            ye,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onPointerDown: (i) => i.stopPropagation(),
              onClick: r,
              className: "size-7 rounded-full p-0 text-white/80 hover:bg-white/20 hover:text-white cursor-pointer",
              children: /* @__PURE__ */ u(vt, { className: "size-4" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ x("div", { className: "flex-1 min-h-0 p-6 flex flex-col items-center justify-center text-center space-y-4", children: [
      /* @__PURE__ */ u("div", { className: "size-14 rounded-2xl bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center shadow-xs", children: /* @__PURE__ */ u(sc, { className: "size-7" }) }),
      /* @__PURE__ */ x("div", { className: "space-y-1.5 max-w-xs", children: [
        /* @__PURE__ */ u("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: "No se pudo conectar al Chat" }),
        /* @__PURE__ */ u("p", { className: "text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed", children: s })
      ] }),
      /* @__PURE__ */ x("div", { className: "pt-2 flex items-center gap-2", children: [
        /* @__PURE__ */ x(
          ye,
          {
            type: "button",
            variant: "primary",
            size: "sm",
            onClick: () => {
              t ? t() : window.location.reload();
            },
            className: "h-8 gap-1.5 px-3.5 text-xs font-semibold cursor-pointer",
            children: [
              /* @__PURE__ */ u(Ea, { className: "size-3.5" }),
              /* @__PURE__ */ u("span", { children: "Reintentar conexión" })
            ]
          }
        ),
        r && /* @__PURE__ */ u(
          ye,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: r,
            className: "h-8 px-3 text-xs cursor-pointer",
            children: /* @__PURE__ */ u("span", { children: "Cerrar" })
          }
        )
      ] })
    ] })
  ] });
}
function My({
  canViewChatList: e = !0,
  canRequestSupport: t = !0,
  defaultView: r = "home",
  defaultCorner: n = "bottom-right",
  initialConversation: s,
  title: i = "Centro de Ayuda SDI",
  hiddenPaths: o = _c,
  showOnlyPaths: d,
  hideCondition: h,
  hidden: f = !1,
  currentPath: p
}) {
  var W, Se, ve, J;
  const g = Dt({
    permission: ["messenger_chat.read"]
  }), y = Dt({
    permission: ["messenger_chat_support.request_support"]
  });
  Dt({
    permission: ["messenger_chat_support.provide_support"]
  });
  const C = Dt({
    permission: [
      "messenger_chat.read",
      "messenger_chat_support.request_support",
      "messenger_chat_support.provide_support"
    ],
    operator: "OR"
  }), T = e && g, P = t && y, { shouldHide: A } = Vb({
    hiddenPaths: o,
    showOnlyPaths: d,
    hideCondition: h,
    hidden: f,
    currentPath: p
  }), {
    containerRef: N,
    isDragging: w,
    dragPos: k,
    wasDraggedRef: _,
    isTop: E,
    isLeft: z,
    cornerContainerClass: D,
    cardOriginClass: O,
    startDrag: M
  } = Qb(n), [L, B] = ae(!1), [te, Q] = ae(() => !T && !P ? "chat" : r === "list" && !T || r === "support-form" && !P ? "home" : r), { currentUser: me, isLoadingUser: Z, hasError: K, error: Te } = kt(), ct = (W = me == null ? void 0 : me.attributes) == null ? void 0 : W.user_auth_id, ut = ((Se = me == null ? void 0 : me.attributes) == null ? void 0 : Se.name) || "Usuario", {
    mutateAsync: U,
    isLoading: De,
    error: de
  } = Wb(), [Ce, Me] = ae(null), [xe, ce] = ae(
    null
  ), {
    conversations: ee,
    selectedId: _e,
    selectedConversation: Y,
    closedFilter: le,
    setClosedFilter: dt,
    typeFilter: Pe,
    setTypeFilter: Ne,
    searchQuery: Re,
    setSearchQuery: Lt,
    isNewConversationOpen: $e,
    isLoading: We,
    selectConversation: G,
    setIsNewConversationOpen: fe,
    handleConversationCreated: Ve
  } = Bb(), et = zt(() => !ee || !Array.isArray(ee) ? 0 : ee.reduce((Ie, st) => {
    var ze;
    return Ie + (((ze = st.attributes) == null ? void 0 : ze.unread_count) || 0);
  }, 0), [ee]), gt = xe || s || Y || null;
  Fe(() => {
    te === "chat" && !gt && Q(T ? "list" : "home");
  }, [te, gt, T]);
  const lr = () => {
    _.current || w || (L ? B(!1) : (B(!0), Q(r === "list" && !T ? P ? "support-form" : "home" : r === "support-form" && !P ? T ? "list" : "home" : r || "home")));
  };
  if (A || !Z && !K && !C)
    return null;
  const St = (Ie) => {
    ce(null), G(Ie), Q("chat");
  }, dn = async (Ie) => {
    var st, ze, ht, hn, fn;
    try {
      const ge = await U(Ie);
      if (ge != null && ge.conversation_id && (ge != null && ge.technician)) {
        const ft = String(ge.conversation_id), Vt = {
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
        }, Un = {
          id: ft,
          type: "conversation",
          attributes: {
            is_group: !1,
            name: ge.technician.name || ((st = ge.ticket) == null ? void 0 : st.subject) || "Soporte SDI",
            closed_at: null,
            unread_count: 0,
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          relationships: {
            users: [Vt]
          }
        };
        ce(Un), Ve(Un), xt.success(`Asistencia iniciada con ${ge.technician.name}`, {
          description: `Ticket #${((ze = ge.ticket) == null ? void 0 : ze.number) || ((ht = ge.ticket) == null ? void 0 : ht.id)}`
        }), Q("chat");
      } else
        Me(ge), Q("no-technician");
    } catch (ge) {
      const ft = ((fn = (hn = ge == null ? void 0 : ge.response) == null ? void 0 : hn.data) == null ? void 0 : fn.message) || (ge == null ? void 0 : ge.message) || "Error al procesar la solicitud de asistencia";
      xt.error(ft);
    }
  };
  return A ? null : /* @__PURE__ */ x(
    "div",
    {
      ref: N,
      style: w && k ? {
        position: "fixed",
        left: `${k.x}px`,
        top: `${k.y}px`,
        bottom: "auto",
        right: "auto",
        zIndex: 50,
        touchAction: "none",
        transition: "none"
      } : void 0,
      className: X(
        "sdi-messenger-root z-50 flex pointer-events-none select-none",
        w ? "fixed cursor-grabbing" : X("fixed duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transition-all", D)
      ),
      children: [
        L && /* @__PURE__ */ u(
          Qp,
          {
            className: X(
              "pointer-events-auto h-[590px] max-h-[calc(100vh-120px)] w-[385px] sm:w-[425px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-2xl transition-all duration-300 flex flex-col",
              E ? "mt-3.5" : "mb-3.5",
              O
            ),
            children: K ? /* @__PURE__ */ u(
              sy,
              {
                error: Te,
                onClose: () => B(!1),
                onDragStart: M
              }
            ) : Z ? /* @__PURE__ */ u(ny, { onDragStart: M }) : /* @__PURE__ */ x(nr, { children: [
              te === "home" && /* @__PURE__ */ u(
                Gb,
                {
                  title: i,
                  canRequestSupport: P,
                  canViewChatList: T,
                  totalUnreadCount: et,
                  conversationsCount: ee.length,
                  onRequestSupport: () => Q("support-form"),
                  onViewChatList: () => Q("list"),
                  onClose: () => B(!1),
                  onNewConversation: () => fe(!0),
                  onDragStart: M
                }
              ),
              te === "support-form" && /* @__PURE__ */ u(
                Kb,
                {
                  userId: ct,
                  userName: ut,
                  canViewChatList: T,
                  totalUnreadCount: et,
                  isSubmitting: De,
                  error: ((J = (ve = de == null ? void 0 : de.response) == null ? void 0 : ve.data) == null ? void 0 : J.message) || (de == null ? void 0 : de.message),
                  onHome: () => Q("home"),
                  onViewChats: () => Q("list"),
                  onClose: () => B(!1),
                  onSubmit: dn,
                  onNewConversation: () => fe(!0),
                  onDragStart: M
                }
              ),
              te === "no-technician" && /* @__PURE__ */ u(
                Fb,
                {
                  message: Ce == null ? void 0 : Ce.message,
                  ticket: Ce == null ? void 0 : Ce.ticket,
                  onNewRequest: () => {
                    Me(null), Q("support-form");
                  },
                  onViewChats: () => Q("list"),
                  onClose: () => B(!1),
                  canViewChatList: T
                }
              ),
              te === "list" && /* @__PURE__ */ u(
                ry,
                {
                  conversations: ee,
                  selectedId: _e,
                  searchQuery: Re,
                  closedFilter: le,
                  typeFilter: Pe,
                  isLoading: We,
                  onHome: () => Q("home"),
                  onClose: () => B(!1),
                  onSelectConversation: St,
                  onSearchChange: Lt,
                  onClosedFilterChange: dt,
                  onTypeFilterChange: Ne,
                  onNewConversation: () => fe(!0),
                  onDragStart: M
                }
              ),
              te === "chat" && gt && /* @__PURE__ */ u("div", { className: "flex h-full w-full flex-col min-w-0 overflow-hidden", children: /* @__PURE__ */ u(
                jb,
                {
                  conversation: gt,
                  isContextPanelOpen: !1,
                  alwaysShowBackButton: !0,
                  onCloseSuccess: () => {
                    ce(null), Q(T ? "list" : "home");
                  },
                  onBack: () => {
                    ce(null), Q(T ? "list" : "home");
                  }
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ u(
          Yb,
          {
            isOpen: L,
            totalUnreadCount: et,
            isLeft: z,
            isLoading: Z,
            hasError: K,
            onToggleOpen: lr,
            onPointerDown: M
          }
        ),
        /* @__PURE__ */ u(
          qb,
          {
            open: $e,
            onOpenChange: fe,
            onSuccess: (Ie) => {
              ce(Ie), Ve(Ie), Q("chat");
            }
          }
        )
      ]
    }
  );
}
function zy({ onNewConversation: e }) {
  const { hasError: t, error: r, isLoadingUser: n } = kt(), s = Dt({
    permission: ["messenger_chat.read"]
  }), i = Dt({
    permission: ["messenger_chat_support.provide_support"]
  });
  return t ? /* @__PURE__ */ x("div", { className: "relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs", children: [
    /* @__PURE__ */ u("div", { className: "absolute inset-x-0 top-0 h-1 bg-red-500/30" }),
    /* @__PURE__ */ x("div", { className: "flex max-w-md flex-col items-center px-6 text-center animate-in fade-in duration-200", children: [
      /* @__PURE__ */ u("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400 shadow-xs", children: /* @__PURE__ */ u(bs, { className: "size-8" }) }),
      /* @__PURE__ */ u("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-red-600 dark:text-red-400", children: "Servicio no disponible" }),
      /* @__PURE__ */ u("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Error de conexión" }),
      /* @__PURE__ */ u("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: (r == null ? void 0 : r.message) || "No fue posible conectar con el servidor de chat. Las funciones de mensajería están temporalmente deshabilitadas." }),
      /* @__PURE__ */ x(
        ye,
        {
          type: "button",
          variant: "primary",
          className: "mt-6 gap-1.5 cursor-pointer shadow-xs",
          onClick: () => window.location.reload(),
          children: [
            /* @__PURE__ */ u(Ea, { className: "size-4" }),
            "Reintentar conexión"
          ]
        }
      )
    ] })
  ] }) : /* @__PURE__ */ x("div", { className: "relative flex h-full w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#f4f6f8]/50 dark:bg-[#0a0f1d] shadow-xs", children: [
    /* @__PURE__ */ u(Nc, {}),
    /* @__PURE__ */ u("div", { className: "absolute inset-x-0 top-0 h-1 bg-blue-500/30 z-10" }),
    /* @__PURE__ */ x("div", { className: "relative z-10 flex max-w-md flex-col items-center px-6 text-center", children: [
      /* @__PURE__ */ u("div", { className: "mb-5 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-xs", children: /* @__PURE__ */ u(_n, { className: "size-8" }) }),
      /* @__PURE__ */ u("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400", children: "Bandeja de conversaciones" }),
      /* @__PURE__ */ u("h2", { className: "text-base font-bold text-neutral-900 dark:text-neutral-100", children: "Selecciona una conversación" }),
      /* @__PURE__ */ u("p", { className: "mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400", children: s ? "Elige una conversación del panel lateral para ver sus mensajes o inicia una nueva cuando estés listo." : "No cuentas con permisos para ver la lista de conversaciones." }),
      e && !n && i && /* @__PURE__ */ x(
        ye,
        {
          type: "button",
          variant: "outline",
          className: "mt-6 gap-1.5 cursor-pointer hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:hover:border-blue-800 transition-colors",
          onClick: e,
          children: [
            /* @__PURE__ */ u(_n, { className: "size-4" }),
            "Nueva conversación"
          ]
        }
      )
    ] })
  ] });
}
function Ly({
  conversation: e,
  onClose: t,
  className: r
}) {
  var p, g;
  const { currentUserId: n } = kt(), s = Fn(e), i = In(e, n), o = un(e, n), d = ((g = (p = e.relationships) == null ? void 0 : p.users) == null ? void 0 : g.length) || 0, h = !!e.attributes.closed_at, f = (y) => {
    if (!y) return "-";
    try {
      return fs(Ma(y), "dd/MM/yyyy HH:mm");
    } catch {
      return y;
    }
  };
  return /* @__PURE__ */ x(
    "div",
    {
      className: X(
        "sdi-messenger-root flex h-full w-80 shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs",
        r
      ),
      children: [
        /* @__PURE__ */ x("div", { className: "flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 p-3 px-4 bg-white dark:bg-neutral-900", children: [
          /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ u(cs, { className: "size-4 text-blue-600 dark:text-blue-400" }),
            /* @__PURE__ */ u("h3", { className: "text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100", children: "Información de Contacto" })
          ] }),
          t && /* @__PURE__ */ u(
            ye,
            {
              variant: "ghost",
              size: "icon",
              onClick: t,
              className: " p-0 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer",
              children: /* @__PURE__ */ u(vt, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ u("div", { className: "flex-1 min-h-0", children: /* @__PURE__ */ u(jn, { className: "h-full", children: /* @__PURE__ */ x("div", { className: "space-y-4 p-4", children: [
          /* @__PURE__ */ x("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ u("div", { className: "relative mb-2", children: /* @__PURE__ */ u(
              ar,
              {
                src: i == null ? void 0 : i.attributes.avatar_url,
                name: o,
                isGroup: s,
                size: "xl",
                status: !s && i ? "online" : void 0
              }
            ) }),
            /* @__PURE__ */ u("h4", { className: "text-sm font-bold text-neutral-900 dark:text-neutral-100", children: o }),
            /* @__PURE__ */ u("p", { className: "text-xs font-medium text-neutral-500 dark:text-neutral-400", children: s ? `${d} participantes` : "Conversación individual" }),
            /* @__PURE__ */ x("div", { className: "flex items-center justify-center gap-1.5 mt-2", children: [
              /* @__PURE__ */ u(Wt, { variant: "secondary", className: "text-[10px]", children: s ? "Grupo" : "Usuario" }),
              h ? /* @__PURE__ */ x(
                Wt,
                {
                  variant: "outline",
                  className: "text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ u(Ar, { className: "size-2.5" }),
                    /* @__PURE__ */ u("span", { children: "Cerrada" })
                  ]
                }
              ) : /* @__PURE__ */ x(
                Wt,
                {
                  variant: "outline",
                  className: "text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1",
                  children: [
                    /* @__PURE__ */ u(ls, { className: "size-2.5" }),
                    /* @__PURE__ */ u("span", { children: "Activa" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ u(Vp, {}),
          /* @__PURE__ */ x("div", { className: "space-y-1", children: [
            /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ u(cs, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ u("span", { className: "truncate text-neutral-900 dark:text-neutral-100 font-medium", children: s ? `${d} participantes` : o })
            ] }),
            /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ u(mp, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ x("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Creada: ",
                f(e.attributes.created_at)
              ] })
            ] }),
            /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ u(Ta, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ x("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Actualizada: ",
                f(e.attributes.updated_at)
              ] })
            ] }),
            e.attributes.closed_at && /* @__PURE__ */ x("div", { className: "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400", children: [
              /* @__PURE__ */ u(Ar, { className: "size-3.5 shrink-0 text-amber-500" }),
              /* @__PURE__ */ x("span", { className: "text-neutral-800 dark:text-neutral-200", children: [
                "Cerrada: ",
                f(e.attributes.closed_at)
              ] })
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
}
export {
  Ay as ChatProvider,
  jb as ConversationChatPanel,
  Ly as ConversationContextPanel,
  zy as ConversationEmptyState,
  ty as ConversationsSidebarList,
  My as FloatingChat,
  qb as NewConversationDialog,
  Xb as RequestSupportForm,
  kt as useChatContext,
  Ob as useConversationChat,
  Bb as useConversationsPage,
  Dy as useOptionalChatContext
};
//# sourceMappingURL=index.js.map
