export default function PostLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {modal}
      <main>{children}</main>
    </div>
  );
}
