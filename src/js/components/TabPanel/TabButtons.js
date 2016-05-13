import tabKeys from 'constants/TabViewConstants';
import mapActions from 'actions/MapActions';
import text from 'js/languages';
import React, {Component, PropTypes} from 'react';

//- Parse Keys for easier access
const {
  DOCUMENTS,
  LAYERS,
  ANALYSIS,
  INFO_WINDOW,
  NARRATIVE,
  MORE
} = tabKeys;

const documentsSvg = '<use xlink:href="#icon-documents" />';
const dataSvg = '<use xlink:href="#icon-data" />';
const layersSvg = '<use xlink:href="#icon-basemap" />';
const narrativeSvg = '<use xlink:href="#shape-info" />';
const analysisSvg = '<use xlink:href="#icon-analysis" />';
const menuSvg = '<use xlink:href="#icon-menu" />';

let currentFeature, initialTabSet = false;

export default class TabButtons extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      notifiers: []
    };
  }

  componentWillReceiveProps() {
    const {map, settings, language} = this.context;
    const feature = map.infoWindow && map.infoWindow.getSelectedFeature();
    /**
    * Set the default tab for the container once the map is ready and settings are here
    */
    if (!initialTabSet && map.loaded) {
      const narrative = settings.labels && settings.labels[language] && settings.labels[language].narrative || '';
      const activeTab = window && window.innerWidth > 950 ? (narrative ? NARRATIVE : LAYERS) : '';
      mapActions.changeActiveTab.defer(activeTab);
      initialTabSet = true;
    }
    /**
    * If a feature is selected, and it is not the same feature that is already selected
    * add some animation here, otherwise, set the currentFeature to undefined so it can animate
    * when the next feature is selected
    */
    if (feature) {
      if (currentFeature === feature) { return; }
      currentFeature = feature;
      //- Update the state so we can add some animations to bring awareness to the buttons
      this.setState({ notifiers: [ANALYSIS, DOCUMENTS] });
    } else {
      currentFeature = undefined;
    }
  }

  changeTab = (evt) => {
    const {currentTarget} = evt;
    const {activeTab} = this.props;
    let id = currentTarget.getAttribute('data-value');
    //- If they clicked the already active tab, set activeTab to '' which will hide the contents
    if (id === activeTab) { id = ''; }
    mapActions.changeActiveTab(id);
    //- If this tab is a notifier, remove it
    const {notifiers} = this.state;
    if (notifiers.indexOf(id) > -1) {
      // Remove this element from the array by keeping everything that is not this
      this.setState({
        notifiers: notifiers.filter(notif => notif !== id)
      });
    }
  };

  getClassName = (id) => {
    const {activeTab} = this.props;
    return `tab-buttons__tab pointer relative${activeTab === id ? ' active' : ''}`;
  };

  getAnimateClassName = (id) => {
    const {notifiers} = this.state;
    const {activeTab} = this.props;
    const isAnimating = notifiers.indexOf(id) > -1;
    return `${isAnimating && activeTab !== id ? ' animate-pulse' : ''}`;
  };

  render () {
    const {settings, language} = this.context;
    const {tableOfContentsVisible} = this.props;
    const narrative = settings.labels && settings.labels[language] && settings.labels[language].narrative || '';

    return (
      <nav className={`tab-buttons map-component ${tableOfContentsVisible ? '' : 'hidden'}`}>
        <ul className='tab-buttons__header'>
          {!narrative ? null :
            <li className={this.getClassName(NARRATIVE)} data-value={NARRATIVE} onClick={this.changeTab}>
              <svg className='svg-icon tab-icon-narrative' dangerouslySetInnerHTML={{ __html: narrativeSvg }}/>
              <span className='tab-tooltip'>{text[language].NARRATIVE}</span>
              <span className='tab-buttons__tab-label mobile-show'>
                {text[language].NARRATIVE}
              </span>
            </li>
          }
          <li className={this.getClassName(LAYERS)} data-value={LAYERS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: layersSvg }}/>
            <span className='tab-tooltip'>{text[language].LAYERS}</span>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].LAYERS}
            </span>
          </li>
          <li className={this.getClassName(INFO_WINDOW)} data-value={INFO_WINDOW} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: dataSvg }}/>
            <span className='tab-tooltip'>{text[language].DATA}</span>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].DATA}
            </span>
          </li>
          <li className={`${this.getClassName(ANALYSIS)}${this.getAnimateClassName(ANALYSIS)}`} data-value={ANALYSIS} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
            <span className='tab-tooltip'>{text[language].ANALYZE}</span>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].ANALYZE}
            </span>
          </li>
          {!settings.includeDocumentsTab ? null :
            <li className={`${this.getClassName(DOCUMENTS)}${this.getAnimateClassName(DOCUMENTS)}`} data-value={DOCUMENTS} onClick={this.changeTab}>
              <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: documentsSvg }}/>
              <span className='tab-tooltip'>{text[language].DOCUMENTS}</span>
              <span className='tab-buttons__tab-label mobile-show'>
                {text[language].DOCS}
              </span>
            </li>
          }
          <li className={`${this.getClassName(MORE)} mobile-show`} data-value={MORE} onClick={this.changeTab}>
            <svg className='svg-icon' dangerouslySetInnerHTML={{ __html: menuSvg }}/>
            <span className='tab-buttons__tab-label mobile-show'>
              {text[language].MORE}
            </span>
          </li>
        </ul>
      </nav>
    );
  }

}

TabButtons.propTypes = {
  activeTab: React.PropTypes.string.isRequired
};
