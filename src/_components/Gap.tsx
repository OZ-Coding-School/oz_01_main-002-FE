'use client';

import { useRef } from "react";
import { useScrollEvent } from "../_hooks/useScrollEvent";

const Gap = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  useScrollEvent(targetRef, '79px', '0px');
  return (
    <div ref={targetRef}></div>
  )
}

export default Gap