export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-hidden editor-light">
      {children}
    </div>
  );
}
