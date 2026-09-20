import { lazy, Suspense } from 'react';

const ConstellationGraph = lazy(() => import('./ConstellationGraph'));

export default function ConstellationMap(props) {
  return (
    <Suspense fallback={<div className="archive-loading" role="status">Loading connection map…</div>}>
      <ConstellationGraph {...props} />
    </Suspense>
  );
}
