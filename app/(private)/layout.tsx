export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      <div className="w-1/6 mobile:w-1/12 tablet:w-1/6 ">Left</div>
      <div className="w-5/6 mobile:w-11/12 tablet:w-5/6">{children}</div>
    </div>
  );
}
