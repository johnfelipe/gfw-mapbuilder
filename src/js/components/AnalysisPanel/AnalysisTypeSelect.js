import analysisKeys from 'constants/AnalysisConstants';
import layerKeys from 'constants/LayerConstants';
import mapActions from 'actions/MapActions';
import appUtils from 'utils/AppUtils';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class AnalysisTypeSelect extends Component {

  static contextTypes = {
    settings: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired
  };

  constructor (props, context) {
    super(props);

    const {language, settings} = context;
    this.options = text[language].ANALYSIS_SELECT_TYPE_OPTIONS;
    const layers = settings.layers[language];
    //- Remove options not included based on settings
    //- Also, remove Tree Cover Options if those layers are not in the settings.layers.config
    this.options = this.options.filter((option) => {
      switch (option.value) {
        case analysisKeys.SLOPE:
          return settings.restorationModule;
        case analysisKeys.INTACT_LOSS:
          return settings.intactForests;
        case analysisKeys.BIO_LOSS:
          return settings.aboveGroundBiomass;
        case analysisKeys.LC_LOSS:
          return settings.landCover;
        case analysisKeys.LCC:
          return settings.landCover;
        case analysisKeys.FIRES:
          return settings.activeFires;
        case analysisKeys.TC_LOSS:
          return appUtils.containsObject(layers, 'id', layerKeys.TREE_COVER_LOSS);
        case analysisKeys.TC_LOSS_GAIN:
          return appUtils.containsObject(layers, 'id', layerKeys.TREE_COVER_GAIN);
        default:
          return true;
      }
    });

    //- Merge in the restoration options if the module is enabled
    if (settings.restorationModule) {
      const options = settings.labels[language].restorationOptions;
      options.forEach((restorationOption) => {
        this.options.unshift({
          value: restorationOption.id,
          label: restorationOption.label,
          group: analysisKeys.ANALYSIS_GROUP_RESTORATION
        });
      });
    }

    // Set the default analysis type
    mapActions.setAnalysisType.defer({
      target: { value: this.options[0].value }
    });
  }

  renderOption = (group) => {
    return (option, index) => {
      // If this option is not a member of the correct group, dont render it
      if (option.group !== group) { return null; }
      return <option key={index} value={option.value}>{option.label}</option>;
    };
  };

  renderGroup = (groupKey) => {
    const {language} = this.context;
    return (
      <optgroup key={groupKey} label={text[language][groupKey]}>
        {this.options.map(this.renderOption(groupKey))}
      </optgroup>
    );
  };

  render () {
    const {activeAnalysisType} = this.props;
    let groupKeys = [];
    const groups = {};
    let activeOption;
    let options;
    //- Get a unique list of groups so I can render groups if necessary
    this.options.forEach((option) => { groups[option.group] = true; });
    groupKeys = Object.keys(groups);
    //- Get the selected option
    activeOption = this.options.filter((option) => option.value === activeAnalysisType)[0];

    if (groupKeys.length === 1) {
      options = this.options.map(this.renderOption(groupKeys[0]));
    } else {
      options = groupKeys.map(this.renderGroup);
    }

    return (
      <div className='relative'>
        <select
          value={activeAnalysisType}
          className='analysis-results__select pointer'
          onChange={mapActions.setAnalysisType}>
          {options}
        </select>
        <div className='analysis-results__select-style'>
          {activeOption && activeOption.label || ''}
        </div>
      </div>
    );
  }

}
