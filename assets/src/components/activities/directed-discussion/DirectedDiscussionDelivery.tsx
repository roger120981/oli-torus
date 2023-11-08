import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HintsDeliveryConnected } from 'components/activities/common/hints/delivery/HintsDeliveryConnected';
import { StemDeliveryConnected } from 'components/activities/common/stem/delivery/StemDelivery';
import { ActivityModelSchema } from 'components/activities/types';
import {
  ActivityDeliveryState,
  activityDeliverySlice,
  initializeState,
  listenForParentSurveyReset,
  listenForParentSurveySubmit,
  listenForReviewAttemptChange,
} from 'data/activities/DeliveryState';
import { initialPartInputs } from 'data/activities/utils';
import { configureStore } from 'state/store';
import { DeliveryElement, DeliveryElementProps } from '../DeliveryElement';
import { DeliveryElementProvider, useDeliveryElementContext } from '../DeliveryElementProvider';
import { castPartId } from '../common/utils';
import * as ActivityTypes from '../types';
import { DiscussionParticipation } from './discussion/DiscussionParticipation';
import { DiscussionThread } from './discussion/DiscussionThread';
import { useDiscussion } from './discussion/discussion-hook';
import { calculateParticipation } from './discussion/participation-util';
import { DirectedDiscussionActivitySchema } from './schema';

export const DirectedDiscussion: React.FC = () => {
  const {
    state: activityState,
    context,
    onSubmitActivity,
    onResetActivity,
    model,
  } = useDeliveryElementContext<DirectedDiscussionActivitySchema>();

  const uiState = useSelector((state: ActivityDeliveryState) => state);
  const dispatch = useDispatch();
  const { surveyId } = context;
  const { writerContext } = useDeliveryElementContext<ActivityModelSchema>();

  const { loaded, posts, addPost, currentUserId, deletePost } = useDiscussion(
    writerContext.sectionSlug,
    context.resourceId,
  );

  const currentParticipation = useMemo(
    () => calculateParticipation(model.participation, posts, currentUserId),
    [posts, currentUserId],
  );

  useEffect(() => {
    listenForParentSurveySubmit(surveyId, dispatch, onSubmitActivity);
    listenForParentSurveyReset(surveyId, dispatch, onResetActivity, {
      [activityState.parts[0].partId]: [],
    });

    listenForReviewAttemptChange(model, activityState.activityId as number, dispatch, context);
    dispatch(
      initializeState(activityState, initialPartInputs(model, activityState), model, context),
    );
  }, []);

  if (!loaded || !currentUserId) {
    return <div>Loading Discussion...</div>;
  }

  // First render initializes state
  if (!uiState.partState) {
    return null;
  }

  return (
    <div className="activity mc-activity">
      <div className="activity-content">
        <StemDeliveryConnected />
        <DiscussionParticipation
          requirements={model.participation}
          participation={currentParticipation}
          currentUserId={currentUserId}
        />
        <DiscussionThread
          canPost={currentParticipation.canPost}
          canReply={currentParticipation.canReply}
          posts={posts}
          onPost={addPost}
          currentUserId={currentUserId}
          onDeletePost={deletePost}
        />
        <HintsDeliveryConnected
          partId={castPartId(activityState.parts[0].partId)}
          resetPartInputs={{ [activityState.parts[0].partId]: [] }}
          shouldShow
        />
        {/* <EvaluationConnected /> */}
      </div>
    </div>
  );
};

// Defines the web component, a simple wrapper over our React component above
export class DirectedDiscussionDelivery extends DeliveryElement<DirectedDiscussionActivitySchema> {
  render(
    mountPoint: HTMLDivElement,
    props: DeliveryElementProps<DirectedDiscussionActivitySchema>,
  ) {
    const store = configureStore({}, activityDeliverySlice.reducer, {
      name: 'DirectedDiscussionDelivery',
    });

    ReactDOM.render(
      <Provider store={store}>
        <DeliveryElementProvider {...props}>
          <DirectedDiscussion />
        </DeliveryElementProvider>
      </Provider>,
      mountPoint,
    );
  }
}

// Register the web component:
// eslint-disable-next-line
const manifest = require('./manifest.json') as ActivityTypes.Manifest;
window.customElements.define(manifest.delivery.element, DirectedDiscussionDelivery);
