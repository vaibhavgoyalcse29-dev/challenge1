import { lazy, Suspense } from 'react';

const StoryScrapbook = lazy(() => import('./StoryScrapbook'));

export default function StoryChapters(props) {
  return (
    <Suspense fallback={<div className="archive-loading" role="status">Loading story chapters…</div>}>
      <StoryScrapbook {...props} />
    </Suspense>
  );
}
