export default function GridOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] px-8 md:px-16 w-full mix-blend-difference">
      <div className="grid grid-cols-4 w-full h-full border-x border-white/10 gap-0">
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full hidden md:block" />
        <div className="border-r border-white/10 h-full hidden md:block" />
        <div className="h-full hidden md:block" />
      </div>
    </div>
  )
}
