'use client'

import React from 'react'
import { cn } from '../ui'

interface ChatWallpaperProps {
  className?: string
}

export function ChatWallpaper({ className }: ChatWallpaperProps) {
  return (
    <div
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden select-none',
        className
      )}
    >
      <svg
        className='absolute inset-0 h-full w-full opacity-[0.055] dark:opacity-[0.04] text-slate-800 dark:text-slate-100'
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
      >
        <defs>
          <pattern
            id='sdi-enterprise-chat-pattern'
            width='360'
            height='360'
            patternUnits='userSpaceOnUse'
          >
            <g
              fill='none'
              stroke='currentColor'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              {/* 1. Badge Corporativo SDI (Principal) */}
              <g transform='translate(24, 24)'>
                <rect x='0' y='0' width='44' height='20' rx='5' strokeWidth='1.2' />
                <text
                  x='22'
                  y='14'
                  textAnchor='middle'
                  fill='currentColor'
                  stroke='none'
                  fontSize='10.5'
                  fontWeight='800'
                  letterSpacing='1.2'
                  fontFamily='system-ui, -apple-system, sans-serif'
                >
                  SDI
                </text>
              </g>

              {/* 2. Avión de papel / Mensaje Enviado */}
              <g transform='translate(120, 26)'>
                <path d='M0 0l22 11-22 11 5-10 11-1-11-1z' />
              </g>

              {/* 3. Escudo de Seguridad / Helpdesk */}
              <g transform='translate(210, 24)'>
                <path d='M10 0s-7 2-10 3v8c0 6 7 11 10 13 3-2 10-7 10-13V3c-3-1-10-3-10-3z' />
                <path d='M6 11l3 3 6-6' strokeWidth='1.1' />
              </g>

              {/* 4. Terminal / Código < / > */}
              <g transform='translate(294, 28)'>
                <rect x='0' y='0' width='28' height='19' rx='4' />
                <path d='M6 9l3 3-3 3M14 15h6' />
              </g>

              {/* 5. Burbuja de Conversación con Líneas de Texto */}
              <g transform='translate(30, 96)'>
                <path d='M0 0h24a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-12l-6 5v-5h-2a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z' />
                <path d='M6 6h12M6 10h8' />
              </g>

              {/* 6. Salvavidas / Mesa de Ayuda Técnica */}
              <g transform='translate(126, 96)'>
                <circle cx='11' cy='11' r='10' />
                <circle cx='11' cy='11' r='4.5' />
                <path d='M4 4l3.5 3.5M14.5 14.5l3.5 3.5M18 4l-3.5 3.5M7.5 14.5L4 18' />
              </g>

              {/* 7. Monograma Circular SDI */}
              <g transform='translate(214, 96)'>
                <circle cx='12' cy='12' r='12' strokeWidth='1.2' strokeDasharray='2 2' />
                <text
                  x='12'
                  y='15.5'
                  textAnchor='middle'
                  fill='currentColor'
                  stroke='none'
                  fontSize='8.5'
                  fontWeight='800'
                  letterSpacing='0.8'
                  fontFamily='system-ui, -apple-system, sans-serif'
                >
                  SDI
                </text>
              </g>

              {/* 8. Servidor / Base de Datos */}
              <g transform='translate(298, 98)'>
                <ellipse cx='10' cy='4' rx='9' ry='3' />
                <path d='M1 4v5c0 1.66 4.03 3 9 3s9-1.34 9-3V4' />
                <path d='M1 9v5c0 1.66 4.03 3 9 3s9-1.34 9-3V9' />
              </g>

              {/* 9. Doble Check de Confirmación (Entregado / Leído) */}
              <g transform='translate(32, 172)'>
                <path d='M0 6l4 4 9-9' />
                <path d='M7 6l4 4 9-9' />
              </g>

              {/* 10. Candado de Seguridad / Cifrado */}
              <g transform='translate(124, 168)'>
                <rect x='0' y='7' width='18' height='13' rx='3' />
                <path d='M4 7V4a5 5 0 0 1 10 0v3' />
                <circle cx='9' cy='13.5' r='1.5' fill='currentColor' />
              </g>

              {/* 11. Pulso de Actividad / SLA */}
              <g transform='translate(210, 174)'>
                <path d='M0 6h6l3-6 5 12 4-8 3 4h7' />
              </g>

              {/* 12. Documento con Check (Ticket Resuelto) */}
              <g transform='translate(298, 168)'>
                <path d='M0 0h13l6 6v13a3 3 0 0 1-3 3H0a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z' />
                <path d='M13 0v6h6' />
                <path d='M4 12l2.5 2.5 5-5' strokeWidth='1.1' />
              </g>

              {/* 13. Nodos de Red / Conectividad */}
              <g transform='translate(28, 244)'>
                <circle cx='4' cy='4' r='3' />
                <circle cx='20' cy='4' r='3' />
                <circle cx='12' cy='18' r='3' />
                <path d='M6.5 5.5l3.5 10M17.5 5.5l-3.5 10M7 4h10' />
              </g>

              {/* 14. Insignia SDI Tecnologías */}
              <g transform='translate(114, 246)'>
                <rect x='0' y='0' width='38' height='18' rx='4' strokeWidth='1' />
                <text
                  x='19'
                  y='12.5'
                  textAnchor='middle'
                  fill='currentColor'
                  stroke='none'
                  fontSize='9'
                  fontWeight='800'
                  letterSpacing='1'
                  fontFamily='system-ui, -apple-system, sans-serif'
                >
                  SDI
                </text>
              </g>

              {/* 15. Rayo de Respuesta Rápida */}
              <g transform='translate(218, 244)'>
                <path d='M7 0L0 11h7l-2 9 10-12h-7l2-8z' />
              </g>

              {/* 16. Reloj de Tiempo de Respuesta */}
              <g transform='translate(300, 246)'>
                <circle cx='10' cy='10' r='9' />
                <path d='M10 5v5l3.5 2' />
              </g>

              {/* 17. Diálogo de Soporte Multiusuario */}
              <g transform='translate(30, 316)'>
                <path d='M0 0h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6l-5 4v-4h-2a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z' />
                <circle cx='5' cy='7' r='1' fill='currentColor' />
                <circle cx='9.5' cy='7' r='1' fill='currentColor' />
                <circle cx='14' cy='7' r='1' fill='currentColor' />
              </g>

              {/* 18. Micro-puntos de Cuadrícula Tecnológica */}
              <g transform='translate(128, 320)'>
                <circle cx='2' cy='2' r='1' fill='currentColor' />
                <circle cx='10' cy='2' r='1' fill='currentColor' />
                <circle cx='18' cy='2' r='1' fill='currentColor' />
                <circle cx='2' cy='10' r='1' fill='currentColor' />
                <circle cx='10' cy='10' r='1' fill='currentColor' />
                <circle cx='18' cy='10' r='1' fill='currentColor' />
              </g>

              {/* 19. Destello de Notificación / Precisión */}
              <g transform='translate(216, 318)'>
                <path d='M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5z' />
              </g>

              {/* 20. Monograma SDI con Borde Redondeado */}
              <g transform='translate(292, 318)'>
                <rect x='0' y='0' width='36' height='16' rx='3' strokeWidth='1' />
                <text
                  x='18'
                  y='11.5'
                  textAnchor='middle'
                  fill='currentColor'
                  stroke='none'
                  fontSize='8.5'
                  fontWeight='800'
                  letterSpacing='1'
                  fontFamily='system-ui, -apple-system, sans-serif'
                >
                  SDI
                </text>
              </g>
            </g>
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#sdi-enterprise-chat-pattern)' />
      </svg>
    </div>
  )
}

