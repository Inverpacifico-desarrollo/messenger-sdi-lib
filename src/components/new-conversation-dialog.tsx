'use client'

import React, { useMemo, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  ScrollArea,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  Avatar,
  cn
} from '../ui'
import {
  MessageSquarePlus,
  Users,
  User,
  Search,
  Check,
  Loader2,
  X
} from 'lucide-react'
import { toast } from 'sonner'
import useDebounce from '../hooks/use-debounce'
import useListUsers from '../hooks/api/users/use-list-users'
import useCreateConversation from '../hooks/api/conversations/use-create-conversation'
import { Conversation, ConversationType } from '../types/conversation.types'
import { UserChat } from '../types/user-chat.types'
import { capitalizeWords } from '../utils/conversation.util'
import { useChatContext } from '../context/chat-context'

interface NewConversationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: (conversation: Conversation) => void
}

export function NewConversationDialog({
  open,
  onOpenChange,
  onSuccess
}: NewConversationDialogProps) {
  const { currentUserId } = useChatContext()
  const [conversationType, setConversationType] = useState<ConversationType>('direct')
  const [searchUser, setSearchUser] = useState('')
  const debouncedSearch = useDebounce(searchUser, 300)

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedGroupUsers, setSelectedGroupUsers] = useState<UserChat[]>([])
  const [groupName, setGroupName] = useState('')

  const { data: users, isLoading: isLoadingUsers } = useListUsers({
    enable: open,
    params: {
      sort: 'name',
      paginate: 'false',
      ...(debouncedSearch.trim() ? { filter: { name: debouncedSearch.trim() } } : {})
    }
  })
  const { mutateAsync: createConversation, isLoading: isCreating } = useCreateConversation()

  // Excluir al usuario en sesión
  const availableUsers = useMemo(() => {
    return (users || []).filter((u) => String(u.id) !== String(currentUserId))
  }, [users, currentUserId])

  const handleToggleGroupUser = (user: UserChat) => {
    setSelectedGroupUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id)
      if (exists) {
        return prev.filter((u) => u.id !== user.id)
      }
      return [...prev, user]
    })
  }

  const handleRemoveGroupUser = (userId: string) => {
    setSelectedGroupUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  const resetForm = () => {
    setSelectedUserId(null)
    setSelectedGroupUsers([])
    setGroupName('')
    setSearchUser('')
    setConversationType('direct')
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm()
    }
    onOpenChange(isOpen)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (conversationType === 'direct') {
      if (!selectedUserId) {
        toast.warning('Por favor, selecciona un usuario para iniciar la conversación.')
        return
      }

      try {
        const newConversation = await createConversation({
          type: 'direct',
          user_id: Number(selectedUserId),
          sender_id: Number(currentUserId)
        })

        toast.success('Conversación iniciada correctamente')
        handleClose(false)
        if (onSuccess && newConversation) {
          onSuccess(newConversation)
        }
      } catch (err: any) {
        const errorMsg =
          err?.response?.data?.message || err?.message || 'Error al iniciar la conversación'
        toast.error(errorMsg)
      }
    } else {
      if (!groupName.trim()) {
        toast.warning('Por favor, ingresa el nombre del grupo.')
        return
      }

      if (selectedGroupUsers.length === 0) {
        toast.warning('Por favor, selecciona al menos un participante para el grupo.')
        return
      }

      try {
        const newConversation = await createConversation({
          type: 'group',
          name: groupName.trim(),
          user_ids: selectedGroupUsers.map((u) => Number(u.id)),
          sender_id: Number(currentUserId)
        })

        toast.success('Grupo creado correctamente')
        handleClose(false)
        if (onSuccess && newConversation) {
          onSuccess(newConversation)
        }
      } catch (err: any) {
        const errorMsg =
          err?.response?.data?.message || err?.message || 'Error al crear el grupo'
        toast.error(errorMsg)
      }
    }
  }

  const isSubmitDisabled =
    isCreating ||
    (conversationType === 'direct' && !selectedUserId) ||
    (conversationType === 'group' && (!groupName.trim() || selectedGroupUsers.length === 0))

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[480px]'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          {/* Encabezado */}
          <DialogHeader>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'>
                <MessageSquarePlus className='size-5' />
              </div>
              <div className='text-left pr-6'>
                <DialogTitle>Nueva Conversación</DialogTitle>
                <DialogDescription>
                  Inicia un chat directo o crea un grupo de conversación
                </DialogDescription>
              </div>
            </div>

            {/* Selector de Tipo de Conversación */}
            <div className='mt-3.5'>
              <Tabs
                value={conversationType}
                onValueChange={(val) => setConversationType(val as ConversationType)}
                className='w-full'
              >
                <TabsList className='w-full h-9 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 p-0.5 text-xs'>
                  <TabsTrigger
                    value='direct'
                    type='button'
                    className='gap-1.5 text-xs font-medium'
                  >
                    <User className='size-3.5' />
                    <span>Directo (1 a 1)</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value='group'
                    type='button'
                    className='gap-1.5 text-xs font-medium'
                  >
                    <Users className='size-3.5' />
                    <span>Grupo</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </DialogHeader>

          {/* Cuerpo del formulario */}
          <div className='p-5 space-y-4'>
            {/* Campo de Nombre del Grupo (solo para grupos) */}
            {conversationType === 'group' && (
              <div className='space-y-1.5'>
                <label className='text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5'>
                  <span>Nombre del Grupo</span>
                  <span className='text-red-500'>*</span>
                </label>
                <Input
                  placeholder='Ej. Soporte Técnico L2, Equipo Infraestructura...'
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className='h-9 text-xs'
                  required
                />
              </div>
            )}

            {/* Chips de usuarios seleccionados en grupo */}
            {conversationType === 'group' && selectedGroupUsers.length > 0 && (
              <div className='space-y-1.5'>
                <div className='flex items-center justify-between text-[11px] font-medium text-neutral-500 dark:text-neutral-400'>
                  <span>Participantes seleccionados ({selectedGroupUsers.length})</span>
                  <button
                    type='button'
                    onClick={() => setSelectedGroupUsers([])}
                    className='text-[10px] text-red-500 hover:underline cursor-pointer'
                  >
                    Quitar todos
                  </button>
                </div>
                <div className='flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl bg-neutral-100/60 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800'>
                  {selectedGroupUsers.map((user) => {
                    const formattedName = capitalizeWords(user.attributes.name)
                    return (
                      <Badge
                        key={user.id}
                        variant='secondary'
                        className='gap-1.5 pl-1.5 pr-1 py-0.5 text-[11px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'
                      >
                        <Avatar
                          name={formattedName}
                          src={user.attributes.avatar_url}
                          size='xs'
                        />
                        <span className='max-w-28 truncate font-medium capitalize'>
                          {formattedName}
                        </span>
                        <button
                          type='button'
                          onClick={() => handleRemoveGroupUser(user.id)}
                          className='rounded-full p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer'
                        >
                          <X className='size-3' />
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Buscador de Usuarios */}
            <div className='space-y-1.5'>
              <label className='text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-between'>
                <span>
                  {conversationType === 'direct'
                    ? 'Selecciona un usuario'
                    : 'Añadir participantes'}
                </span>
                <span className='text-[10px] font-normal text-neutral-400'>
                  {availableUsers.length} disponibles
                </span>
              </label>

              <div className='relative flex h-9 w-full items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 px-2.5 transition-colors focus-within:border-blue-500 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500/20'>
                <Search className='size-3.5 shrink-0 text-neutral-400' />
                <input
                  type='text'
                  placeholder='Buscar por nombre...'
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className='w-full bg-transparent text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none'
                />
                {searchUser && (
                  <button
                    type='button'
                    onClick={() => setSearchUser('')}
                    className='text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5 cursor-pointer'
                  >
                    <X className='size-3' />
                  </button>
                )}
              </div>
            </div>

            {/* Lista de Usuarios con altura cómoda */}
            <div className='rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 overflow-hidden'>
              <ScrollArea className='h-56 sm:h-64 w-full'>
                {isLoadingUsers ? (
                  <div className='flex h-56 items-center justify-center gap-2 text-xs text-neutral-500'>
                    <Loader2 className='size-4 animate-spin text-blue-600' />
                    <span>Cargando usuarios...</span>
                  </div>
                ) : availableUsers.length === 0 ? (
                  <div className='flex h-56 flex-col items-center justify-center p-6 text-center text-xs text-neutral-500'>
                    <p className='font-medium text-neutral-700 dark:text-neutral-300'>No se encontraron usuarios</p>
                    <p className='text-[11px] mt-1'>Prueba con otro término de búsqueda</p>
                  </div>
                ) : (
                  <div className='divide-y divide-neutral-100 dark:divide-neutral-800/60 p-1.5'>
                    {availableUsers.map((user) => {
                      const isDirectSelected = selectedUserId === user.id
                      const isGroupSelected = selectedGroupUsers.some((u) => u.id === user.id)
                      const isSelected =
                        conversationType === 'direct' ? isDirectSelected : isGroupSelected
                      const formattedName = capitalizeWords(user.attributes.name)

                      return (
                        <div
                          key={user.id}
                          onClick={() => {
                            if (conversationType === 'direct') {
                              setSelectedUserId(user.id)
                            } else {
                              handleToggleGroupUser(user)
                            }
                          }}
                          className={cn(
                            'flex items-center justify-between gap-2.5 p-2 rounded-xl cursor-pointer transition-colors',
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-medium'
                              : 'hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200'
                          )}
                        >
                          <div className='flex items-center gap-2.5 min-w-0 flex-1'>
                            <Avatar
                              name={formattedName}
                              src={user.attributes.avatar_url}
                              size='sm'
                            />
                            <div className='min-w-0 flex-1'>
                              <p className='truncate text-xs font-medium text-neutral-900 dark:text-neutral-100 capitalize'>
                                {formattedName}
                              </p>
                            </div>
                          </div>

                          <div className='shrink-0 pl-1'>
                            <div
                              className={cn(
                                'flex size-5 items-center justify-center rounded-full border transition-all',
                                isSelected
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : 'border-neutral-300 dark:border-neutral-700 bg-transparent text-transparent'
                              )}
                            >
                              <Check className='size-3 stroke-[2.5]' />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          {/* Pie del modal */}
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => handleClose(false)}
              disabled={isCreating}
              className='text-xs h-8 px-3.5 cursor-pointer'
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              size='sm'
              variant='primary'
              disabled={isSubmitDisabled}
              className='text-xs font-semibold gap-1.5 h-8 px-3.5 cursor-pointer'
            >
              {isCreating ? (
                <>
                  <Loader2 className='size-3.5 animate-spin' />
                  <span>Creando...</span>
                </>
              ) : (
                <>
                  <MessageSquarePlus className='size-3.5' />
                  <span>
                    {conversationType === 'direct' ? 'Iniciar Chat' : 'Crear Grupo'}
                  </span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
