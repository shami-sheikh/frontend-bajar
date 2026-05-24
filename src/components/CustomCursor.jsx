'use client';
import React, { useEffect, useRef } from 'react';
import { useMouse } from '../utils/Usemouse';

export default function CustomCursor() {
  const [pos] = useMouse();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const coords = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const prev = document.body.style.cursor;
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = prev || '';
    };
  }, []);

  useEffect(() => {
    const lerp = (a, b, n) => a + (b - a) * n;

    const update = () => {
      if (pos.x !== null && pos.y !== null) {
        coords.current.x = lerp(coords.current.x, pos.x - window.scrollX, 0.18);
        coords.current.y = lerp(coords.current.y, pos.y - window.scrollY, 0.18);

        const x = Math.round(coords.current.x);
        const y = Math.round(coords.current.y);

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

          // detect interactive elements under cursor
          const el = document.elementFromPoint(pos.x - window.scrollX, pos.y - window.scrollY) || document.elementFromPoint(pos.x, pos.y);
          let interactive = false;
          if (el) {
            const tag = el.tagName && el.tagName.toLowerCase();
            const role = el.getAttribute && el.getAttribute('role');
            if (
              tag === 'a' ||
              tag === 'button' ||
              ['input', 'textarea', 'select', 'label'].includes(tag) ||
              role === 'button' ||
              el.closest && el.closest('a,button,input,textarea,select,[role="button"]')
            ) {
              interactive = true;
            }
          }

          if (interactive) {
            ringRef.current.style.width = '44px';
            ringRef.current.style.height = '44px';
            ringRef.current.style.marginLeft = '-22px';
            ringRef.current.style.marginTop = '-22px';
            ringRef.current.style.background = 'rgba(201,151,63,0.12)';
          } else {
            ringRef.current.style.width = '36px';
            ringRef.current.style.height = '36px';
            ringRef.current.style.marginLeft = '-18px';
            ringRef.current.style.marginTop = '-18px';
            ringRef.current.style.background = 'rgba(0,0,0,0.04)';
          }
        }
      }
      raf.current = requestAnimationFrame(update);
    };

    raf.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf.current);
  }, [pos]);

  if (typeof window === 'undefined') return null;
  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 120ms linear, height 120ms linear, background 120ms linear, transform 120ms linear',
          transform: 'translate3d(-9999px,-9999px,0)',
          willChange: 'transform',
          boxShadow: '0 6px 18px rgba(15,13,11,0.06)',
        }}
      />

      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          borderRadius: '50%',
          background: '#0f0d0b',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate3d(-9999px,-9999px,0)',
          transition: 'transform 120ms linear',
          willChange: 'transform',
        }}
      />
    </>
  );
}
