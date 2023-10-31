export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <svg
        className="absolute inset-x-0 top-0 -z-10 hidden h-[64rem] w-full stroke-gray-300/75 [mask-image:radial-gradient(800px_800px_at_center,white,transparent)] sm:block"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width={240}
            height={240}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 240V.5H240" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
        />
      </svg>
      {children}
    </div>
  );
}
