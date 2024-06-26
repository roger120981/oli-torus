import { SectionSlug } from 'data/types';
import { ServerError, makeRequest } from './common';

export type ActionSuccess = {
  result: 'success';
  commandResult: 'success';
  redirectTo: string;
  restartUrl?: string;
};

export type ActionFailure = {
  result: 'success';
  commandResult: 'failure';
  reason: string;
  redirectTo: string;
  restartUrl?: string;
};

export type ActionResult = ActionSuccess | ActionFailure;

export function finalizePageAttempt(
  sectionSlug: SectionSlug,
  revisionSlug: string,
  attemptGuid: string,
): Promise<ActionResult | ServerError> {
  const body = {
    action: 'finalize',
    section_slug: sectionSlug,
    revision_slug: revisionSlug,
    attempt_guid: attemptGuid,
  };
  const params = {
    method: 'POST',
    body: JSON.stringify(body),
    url: `/page_lifecycle`,
  };

  return makeRequest<ActionResult>(params);
}

export function finalizePageProgress(attemptGuid: string): Promise<ActionResult | ServerError> {
  const body = {
    action: 'mark_completed',
    attempt_guid: attemptGuid,
  };
  const params = {
    method: 'POST',
    body: JSON.stringify(body),
    url: `/page_lifecycle`,
  };

  return makeRequest<ActionResult>(params);
}
