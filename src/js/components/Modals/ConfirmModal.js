import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import mapActions from 'actions/MapActions';
import text from 'js/languages';

import React, {Component, PropTypes} from 'react';


export default class ConfirmModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  delete = () => {
    if (this.props.subscriptionToDelete.id) {
      fetch(
        `https://production-api.globalforestwatch.org/v1/subscriptions/${this.props.subscriptionToDelete.id}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      ).then(response => {
        let hasError = false;
        if (response.status !== 200) {
          hasError = true;
        }

        response.json().then(json => {
          if (hasError) {
            console.error(json);
            return;
          }
          const remainingSubscriptions = this.props.userSubscriptions.filter(subsc => subsc.id !== json.data.id);
          mapActions.setUserSubscriptions(remainingSubscriptions);
          mapActions.toggleConfirmModal({ visible: false });
          mapActions.deleteSubscription({});
        });
      });
    }
  }

  cancelDeletion = () => {
    mapActions.toggleConfirmModal({ visible: false });
  }

  close = () => {
    mapActions.toggleConfirmModal({ visible: false });
  };

  render () {
    const {language} = this.context;
    const {subscriptionToDelete} = this.props;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <h2 className='delete-header'>{text[language].SUBSCRIBE_DELETE_TITLE}</h2>
        {subscriptionToDelete.attributes ? <h3 className='delete-header'>{subscriptionToDelete.attributes.name}</h3> : null}

        <p>{text[language].SUBSCRIBE_DELETE_DESC}</p>

        <div className='subscription-sub-buttons'>
          <button className='fa-button gold' onClick={this.delete}>{text[language].SUBSCRIBE_DELETE_CONFIRM}</button>
          <button className='fa-button gold' onClick={this.cancelDeletion}>{text[language].SUBSCRIBE_DELETE_CANCEL}</button>
        </div>

      </ControlledModalWrapper>
    );
  }

}
