import { lazy, Suspense } from 'react';

const LifeAuditor = lazy(() => import('./LifeAuditor'));

export default function AiSynthesizerModal(props) {
  return (
    <Suspense fallback={<div className="archive-loading" role="status">Calculating local insights…</div>}>
      <LifeAuditor {...props} />
    </Suspense>
  );
}
