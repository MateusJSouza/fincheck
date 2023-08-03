export interface UserMenuProps {
  userName: string;
}

export function UserMenu({ userName }: UserMenuProps) {
  return (
    <div className="bg-teal-50 rounded-full w-12 h-12 p-3.5 flex items-center justify-center border border-teal-100">
      <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">{userName}</span>
    </div>
  )
}
