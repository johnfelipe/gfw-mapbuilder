import ControlledModalWrapper from 'components/Modals/ControlledModalWrapper';
import layerKeys from 'constants/LayerConstants';
import rasterFuncs from 'utils/rasterFunctions';
import {modalText, assetUrls} from 'js/config';
import {loadJS, loadCSS} from 'utils/loaders';
import mapActions from 'actions/MapActions';
import mapStore from 'stores/MapStore';
import utils from 'utils/AppUtils';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

export default class CanopyModal extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired
  };

  componentDidMount() {
    loadJS(assetUrls.jQuery);
    loadJS(assetUrls.rangeSlider).then(() => {
      $('#tree-cover-slider').ionRangeSlider({
        type: 'double',
        values: modalText.canopy.slider,
        hide_min_max: true,
        grid_snap: true,
        to_fixed: true,
        from_min: 1,
        from_max: 7,
        grid: true,
        from: 5,
        onFinish: this.sliderChanged,
        prettify: value => (value + '%')
      });
    }, console.error);
    loadCSS(assetUrls.ionCSS);
    loadCSS(assetUrls.ionSkinCSS);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    //- Set the default canopy density when the map loads
    if (!prevContext.map.loaded && this.context.map.loaded) {
      const {canopyDensity} = mapStore.getState();
      this.updateTreeCoverDefinitions(canopyDensity);
      this.updateTreeCoverLossDefinitions(canopyDensity);
    }
  }

  updateTreeCoverDefinitions = (density) => {
    const {map, settings} = this.context;
    if (map.loaded) {
      //- Get the layer config, I am hardcoding en becuase I do not need anything language specific, just its config
      let layerConfig = utils.getObject(settings.layers.en, 'id', layerKeys.TREE_COVER);
      let renderingRule = rasterFuncs.getColormapRemap(layerConfig.colormap, [density, layerConfig.inputRange[1]], layerConfig.outputRange);
      let layer = map.getLayer(layerKeys.TREE_COVER);

      if (layer) {
        layer.setRenderingRule(renderingRule);
      }
    }
  };

  updateTreeCoverLossDefinitions = (density) => {
    const {lossFromSelectIndex, lossToSelectIndex, lossOptions} = mapStore.getState();
    const {map} = this.context;
    if (map.loaded && lossOptions.length) {
      let fromYear = lossOptions[lossFromSelectIndex].label;
      let toYear = lossOptions[lossToSelectIndex].label;
      let renderingRule = rasterFuncs.buildCanopyFunction(fromYear, toYear, density);
      let layer = map.getLayer(layerKeys.TREE_COVER_LOSS);
      if (layer) {
        layer.setRenderingRule(renderingRule);
      }
    }
  };

  sliderChanged = (data) => {
    mapActions.updateCanopyDensity(data.from_value);
    this.updateTreeCoverDefinitions(data.from_value);
    this.updateTreeCoverLossDefinitions(data.from_value);
  };

  close = () => {
    mapActions.toggleCanopyModal({ visible: false });
  };

  render() {
    const {language} = this.context;

    return (
      <ControlledModalWrapper onClose={this.close}>
        <div className='canopy-modal-title'>{text[language].CANOPY_MODAL_TEXT}</div>
        <div className='trees'>
          <div className='tree-icon' />
          <div className='forest-icon' />
        </div>
        <div className='slider-container'>
          <div id='tree-cover-slider' />
        </div>
      </ControlledModalWrapper>
    );
  }

}
