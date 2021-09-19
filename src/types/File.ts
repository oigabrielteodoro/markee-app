export type File = {
  id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
  is_saved: boolean
  is_saving: boolean
  is_saving_completed: boolean
  is_auto_focus: boolean
}
