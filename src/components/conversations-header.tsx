'use client'

import React from 'react'
import { MessageSquare } from 'lucide-react'

export function ConversationsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          <MessageSquare className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-2xl">
            Gestión de Conversaciones
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
            Bandeja centralizada de chat en vivo, solicitudes en tiempo real y asistencia técnica
          </p>
        </div>
      </div>
    </div>
  )
}
