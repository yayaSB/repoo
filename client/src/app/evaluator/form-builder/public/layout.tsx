import { defaultBackgroundColor } from "@/constants/form-builder";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="w-full min-h-screen "
      style={{
        backgroundColor: defaultBackgroundColor,
      }}
    >
      {children}
    </main>
  );
}
