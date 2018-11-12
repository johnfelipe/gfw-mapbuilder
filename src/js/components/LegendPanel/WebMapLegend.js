import Request from 'utils/request';
import React from 'react';

export default class WebMapLegend extends React.Component {

  constructor (props) {
    super(props);
    this.state = { legendInfos: [], visible: props.visibility, opacity: props.defaultOpacity };

    this.apiItemMapper = this.apiItemMapper.bind(this);
  }

  componentDidUpdate(prevProps) {

    if (prevProps.visibility !== this.props.visibility) {
      this.setState(prevState => {
        return {
          visible: !prevState.visible
        };
      });
    }

    if (this.props.legendOpacity.layerId === this.props.layerId && this.props.legendOpacity.value !== prevProps.legendOpacity.value) {
      this.setState({ opacity: this.props.legendOpacity.value });
    }
  }

  componentDidMount() {
    const layerID = typeof this.props.layerSubIndex !== 'undefined' ? [this.props.layerSubIndex] : this.props.layerId;
    const url = this.props.url.replace(/\d+$/, '');
    Request.getLegendInfos(url, layerID).then(legendInfos => {
      if(this.refs.myRef) {
        this.setState({ legendInfos: legendInfos });
      }
    });

    this.props.initialLayerOpacities.forEach(opacity => {
      if (opacity.layerId === this.props.layerId) {
        this.setState({ opacity: opacity.value });
      }
    });
  }

  apiItemMapper(legendItems) {
    const test = legendItems.map((item, i) => {
      return (
        <div className='legend-row' key={`webmap-legend-row-${i}`}>
          <div style={{backgroundColor: item.color, opacity: this.state.opacity}} className='legend-icon'></div>
          <div className='legend-label'>{item.name}></div>
        </div>
      );
    });

    return test;
  }

  itemMapper = (item, idx) => {
    return (
      <div className='legend-row' key={String(item.url) + idx}>
        <img style={{'opacity': this.state.opacity}} className='legend-icon' title={item.label} src={`data:image/png;base64,${item.imageData}`} />
        <div className='legend-label'>{item.label}</div>
      </div>
    );
  }

  render () {
    const { visible, legendInfos } = this.state;
    const { labels: label, metadata } = this.props;
    if (metadata && metadata.legendConfig) {
      return (
        <div>
          {metadata.legendConfig.items.map((legend, i) => {
            return (
              <div className={`parent-legend-container ${visible ? '' : 'hidden'}`} ref='myRef' key={`webmap-legend-${i}`}>
                <div className='label-container'><strong>{legend.name}</strong></div>
                <div className='legend-container'>
                  {legend.categories.length === 0 ? '' :
                    <div className='crowdsource-legend'>
                      {this.apiItemMapper(legend.categories)}
                    </div>}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className={`parent-legend-container ${visible ? '' : 'hidden'}`} ref='myRef'>
        <div className='label-container'><strong>{label}</strong></div>
        <div className='legend-container'>
          {legendInfos.length === 0 ? '' :
            <div className='crowdsource-legend'>
              {legendInfos.map(this.itemMapper, this)}
            </div>
          }
        </div>
      </div>
    );
  }
}
