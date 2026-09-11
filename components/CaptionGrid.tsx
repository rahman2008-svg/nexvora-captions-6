import type { Caption } from '@/types/caption';
import { CaptionCard } from './CaptionCard';
import { EmptyState } from './EmptyState';

export function CaptionGrid({ captions }: { captions: Caption[] }) {
  if (captions.length === 0) {
    return (
      <EmptyState
        title="No captions found."
        description="Try another search or clear your filters."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {captions.map((caption) => (
        <CaptionCard key={caption.id} caption={caption} />
      ))}
    </div>
  );
}
