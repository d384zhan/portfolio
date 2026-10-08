"use client";

// Parked: the agent-editing version of the page. To bring the agents back,
// render this from Canvas.tsx instead of the static Composition. Its fit check
// was written for the old full-width plate and needs a pass for the column.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useReducedMotion } from "framer-motion";
import Composition from "./Composition";
import { DEFAULT_DESIGN, type Design, type TextKey } from "./design";
import AgentLayer from "./AgentLayer";
import { sleep } from "./engine";

export type CanvasApi = {
  root: () => HTMLDivElement | null;
  design: () => Design;
  // Applies an edit; reverts it if the page would no longer fit one screen.
  edit: (next: Design, fade?: TextKey) => Promise<boolean>;
  setLive: (prop: "--crop" | "--name-scale" | "--ar", value: string) => void;
  fitsLive: () => boolean;
};

// The grid quietly squashes the photo when space runs out, so overflow never
// shows on the container. Add up each row's natural height instead.
function fits(el: HTMLElement | null) {
  if (!el) return false;
  const cs = getComputedStyle(el);
  const h = (sel: string) => el.querySelector(sel)?.getBoundingClientRect().height ?? 0;
  const fig = el.querySelector(".b-image");
  const ratio = fig ? parseFloat(getComputedStyle(fig).aspectRatio) || 4.2 : 4.2;
  const photo = fig ? fig.getBoundingClientRect().width / ratio : 0;
  const lists = Math.max(h(".b-prev"), h(".b-proj"), h(".b-else"));
  const rows = [h(".b-name"), h(".b-bio"), photo, lists, h(".b-foot")];
  const need = rows.reduce((a, b) => a + b, 0) + parseFloat(cs.rowGap) * (rows.length - 1);
  const room = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  return need <= room + 1 && el.scrollWidth <= el.clientWidth + 1;
}

export default function AgentCanvas() {
  const reduced = useReducedMotion();
  const [design, setDesign] = useState<Design>(DEFAULT_DESIGN);
  const [fading, setFading] = useState<TextKey | null>(null);
  const [agentsOn, setAgentsOn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const designRef = useRef(design);

  useEffect(() => {
    designRef.current = design;
  }, [design]);

  useEffect(() => {
    const handheld = window.matchMedia("(max-width: 899px), (pointer: coarse)").matches;
    const off = new URLSearchParams(window.location.search).get("agents") === "off";
    setAgentsOn(!handheld && !off);
  }, []);

  const apply = useCallback((next: Design) => {
    flushSync(() => setDesign(next));
    designRef.current = next;
  }, []);

  const api: CanvasApi = useMemo(
    () => ({
      root: () => rootRef.current,
      design: () => designRef.current,
      edit: async (next, fade) => {
        const before = designRef.current;
        if (fade) {
          setFading(fade);
          await sleep(170);
        }
        apply(next);
        const ok = fits(rootRef.current);
        if (!ok) apply(before);
        if (fade) {
          requestAnimationFrame(() => setFading(null));
          await sleep(200);
        }
        return ok;
      },
      setLive: (prop, value) => rootRef.current?.style.setProperty(prop, value),
      fitsLive: () => fits(rootRef.current),
    }),
    [apply],
  );

  const reset = () => {
    setAgentsOn(false);
    for (const p of ["--crop", "--name-scale", "--ar"]) rootRef.current?.style.removeProperty(p);
    apply(DEFAULT_DESIGN);
  };

  const footer = (
    <>
      <button type="button" className="agent-ui" onClick={() => setAgentsOn((v) => !v)}>
        {agentsOn ? "pause agents" : "let agents edit"}
      </button>
      <button type="button" className="agent-ui" onClick={reset}>
        reset
      </button>
      <a href="https://v1.dawang.tech">v1</a>
    </>
  );

  return (
    <>
      <Composition ref={rootRef} design={design} fading={fading} footer={footer} />
      {!reduced && <AgentLayer api={api} enabled={agentsOn} />}
    </>
  );
}
