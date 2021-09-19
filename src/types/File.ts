export type File = {
  id: string
  title: string
  content: string
  is_active: boolean
  is_auto_focus: boolean
  status: 'saved' | 'saving' | 'saving-completed'
}
