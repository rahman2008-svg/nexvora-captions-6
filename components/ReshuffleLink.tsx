'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function ReshuffleLink({ basePath, label }: { basePath: string; label: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('t', Date.now().toString());
    router.push(`${basePath}?${params.toString()}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-pill bg-moss-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-moss-700"
    >
      {label}
    </button>
  );
}
