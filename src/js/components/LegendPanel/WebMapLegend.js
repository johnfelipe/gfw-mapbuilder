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

  apiItemMapper(items, type, language) {
    console.log(items, type, language);
    switch(type) {
      case 'choropleth':
        return items.map((item, i) => {
          const { name, color, outlineColor } = item;
          console.log(outlineColor);
            return (
              <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                <div style={{
                  backgroundColor: color,
                  border: `1px solid ${outlineColor}`,
                  opacity: this.state.opacity
                }} className='legend-icon'></div>
                <div className='legend-label'>{name[language]}</div>
              </div>
            );
          }
        );

      case 'gradient':
        const background = `linear-gradient(180deg,${items.map(item => item.color)}`;
        return (
          <div>
            <div className='gradient-legend' style={{height: `${18 * items.length}px`, background}}></div>
              {items.map((item, i) => {
                const name = item.name;
                return (
                  <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                    <div className='legend-label'>{name[language]}</div>
                  </div>
                );
              })}
            </div>
          );

      case 'line':
        return items.map((item, i) => {
          const { name, color, lineType, width } = item;
          return (
            <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
              <div className='legend-icon line'>
                <div style={{
                  borderColor: color,
                  borderWidth: `${width / 2}px`,
                  borderStyle: lineType,
                  marginTop: `-${width}px`,
                  opacity: this.state.opacity
                }} className='legend-line'></div>
              </div>
              <div className='legend-label'>{name[language]}</div>
            </div>
          );
        });

      case 'point':
        return items.map((item, i) => {
          const { name, color, outlineColor, size } = item;
          return (
            <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
              <div className='legend-icon centered'>
                <div style={{
                  backgroundColor: color,
                  borderColor: outlineColor,
                  height: `${size}px`,
                  width: `${size}px`,
                  marginTop: `-${size / 2 - 2}px`,
                  opacity: this.state.opacity
                }} className='legend-point'></div>
              </div>
              <div className='legend-label'>{name[language]}</div>
            </div>
          );
        });

      // note: as configured, "basic" is essentially the same as "choropleth"
      case 'basic':
        return items.map((item, i) => {
          const { name, color, outlineColor } = item;
            return (
              <div className='legend-row' key={`webmap-legend-row-${name[language]}-${i}`}>
                <div style={{
                  backgroundColor: color,
                  border: `1px solid ${outlineColor}`,
                  opacity: this.state.opacity
                }} className='legend-icon'></div>
                <div className='legend-label'>{name[language]}</div>
              </div>
            );
          }
        );
    }
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
    const { labels: label, metadata, language } = this.props;
    metadata.legendConfig = {
      dataMaxZoom: 12, //control zoom level
      threshold: 30, // optional - loss specific tag to show TCD threshold
      color: '#dc6c9a',
      name: {
        en: 'Tree cover loss',
        fr: 'Tree cover loss',
        es: 'Tree cover loss',
        pt: 'Tree cover loss',
        id: 'Tree cover loss',
        zh: 'Tree cover loss',
        ka: 'Tree cover loss'
      },
      source: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)', // optional
      notes: [                                                                                                             // optional
        'Displaying loss with {thresh} canopy density.',
        'Tree cover loss is not always deforestation.'
      ],
      type: 'basic',
      items: [{
        color: '#ffffb2',
        outlineColor: "#000000",
        name: {
          en: '<300',
          fr: '<300',
          es: '<300',
          pt: '<300',
          id: '<300',
          zh: '<300',
          ka: '<300'
        }
        }, {
        color: '#fecc5c',
        outlineColor: "#000000",
        name: {
          en: '<325',
          fr: '<325',
          es: '<325',
          pt: '<325',
          id: '<325',
          zh: '<325',
          ka: '<325'
        }
        }, {
        color: '#fd8d3c',
        outlineColor: "#000000",
        name: {
          en: '<350',
          fr: '<350',
          es: '<350',
          pt: '<350',
          id: '<350',
          zh: '<350',
          ka: '<350'
        }
        }, {
        color: '#f03b20',
        outlineColor: "#000000",
        name: {
          en: '<375',
          fr: '<375',
          es: '<375',
          pt: '<375',
          id: '<375',
          zh: '<375',
          ka: '<375'
        }
        }, {
        color: '#bd0026',
        outlineColor: "#000000",
        name: {
          en: '<505',
          fr: '<505',
          es: '<505',
          pt: '<505',
          id: '<505',
          zh: '<505',
          ka: '<505'
        }
      }
    ],
    };

    metadata.legendConfig = {
      type: 'group',
      items: [{
        name: {
          en: 'Cereals',
          fr: 'Cereals',
          es: 'Cereals',
          pt: 'Cereals',
          id: 'Cereals',
          zh: 'Cereals',
          ka: 'Cereals'
        },
        subgroup: {
          type: 'choropleth',
          items: [{
            name: {
              en: 'Barley',
              fr: 'Barley',
              es: 'Barley',
              pt: 'Barley',
              id: 'Barley',
              zh: 'Barley',
              ka: 'Barley'
            },
            color: '#531332',
            outlineColor: '#aaaaaa'
          }, {
            name: {
              en: 'Wheat',
              fr: 'Wheat',
              es: 'Wheat',
              pt: 'Wheat',
              id: 'Wheat',
              zh: 'Wheat',
              ka: 'Wheat'
            },
            color: '#c3ff00',
            outlineColor: '#aaaaaa'
          },
      ]}}, {
      name: {
        en: 'Pulses and legumes',
        fr: 'Pulses and legumes',
        es: 'Pulses and legumes',
        pt: 'Pulses and legumes',
        id: 'Pulses and legumes',
        zh: 'Pulses and legumes',
        ka: 'Pulses and legumes'
      },
      subgroup: {
        type: 'choropleth',
        items: [{
          name: {
            en: 'Soybeans',
            fr: 'Soybeans',
            es: 'Soybeans',
            pt: 'Soybeans',
            id: 'Soybeans',
            zh: 'Soybeans',
            ka: 'Soybeans'
          },
          color: '#42f4f4',
          outlineColor: '#aaaaaa'
          }, {
            name: {
              en: 'Peas',
              fr: 'Peas',
              es: 'Peas',
              pt: 'Peas',
              id: 'Peas',
              zh: 'Peas',
              ka: 'Peas'
            },
            color: '#f44141',
            outlineColor: '#aaaaaa'
          },
        ]
      }
    }]
  };

  // metadata.legendConfig = {
  //   "type": "line",
  //   "name": {
  //     en: 'Line Legend',
  //     fr: 'Line Legend',
  //     es: 'Line Legend',
  //     pt: 'Line Legend',
  //     id: 'Line Legend',
  //     zh: 'Line Legend',
  //     ka: 'Line Legend'
  //   },
  //   "items": [{
  //     "name": {
  //       en: 'H5',
  //       fr: 'H5',
  //       es: 'H5',
  //       pt: 'H5',
  //       id: 'H5',
  //       zh: 'H5',
  //       ka: 'H5'
  //     },
  //     "color": "#6A1ED2",
  //     "width": "3",
  //     "lineType": "double"
  //     }, {
  //     "name": {
  //       en: 'H4',
  //       fr: 'H4',
  //       es: 'H4',
  //       pt: 'H4',
  //       id: 'H4',
  //       zh: 'H4',
  //       ka: 'H4'
  //     },
  //     "color": "#DC14DC",
  //     "width": "2",
  //     "lineType": "dashed"
  //    }]
  //   };

    // metadata.legendConfig = {
    //   "type": "point",
    //   "name": {
    //     en: 'Point Legend',
    //     fr: 'Point Legend',
    //     es: 'Point Legend',
    //     pt: 'Point Legend',
    //     id: 'Point Legend',
    //     zh: 'Point Legend',
    //     ka: 'Point Legend'
    //   },
    //   "items": [{
    //     "name": {
    //       en: 'Active Fire',
    //       fr: 'Active Fire',
    //       es: 'Active Fire',
    //       pt: 'Active Fire',
    //       id: 'Active Fire',
    //       zh: 'Active Fire',
    //       ka: 'Active Fire'
    //     },
    //     "color": "#ff0000",
    //     "outlineColor": "#000000",
    //     "size": 12,
    //     }, {
    //     "name": {
    //       en: 'Probable Fire',
    //       fr: 'Probable Fire',
    //       es: 'Probable Fire',
    //       pt: 'Probable Fire',
    //       id: 'Probable Fire',
    //       zh: 'Probable Fire',
    //       ka: 'Probable Fire'
    //     },
    //     "color": "#ffff00",
    //     "outlineColor": "#000000",
    //     "size": 7
    //    }]
    //   };

    if (metadata && metadata.legendConfig) {
      const { name, type, items } = metadata.legendConfig;

      if (type === 'group') {
        return (
          <div>
            {items.map((category, i) => {
              const { name: categoryName, subgroup } = category;
              return (
                <div className={`parent-legend-container ${visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${i}`}>
                  <div className='label-container'>
                    <strong>{categoryName[language]}</strong>
                  </div>
                  <div className='legend-container'>
                    {subgroup.items.length &&
                      <div className='crowdsource-legend'>
                        {this.apiItemMapper(subgroup.items, subgroup.type, language)}
                      </div>}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      else {
        return (
          <div className={`parent-legend-container ${visible && 'hidden'}`} ref='myRef' key={`webmap-legend-${name[language]}`}>
            <div className='label-container'>
              <strong>{name[language]}</strong>
            </div>
            <div className='legend-container'>
              {items.length &&
                <div className='crowdsource-legend'>
                  {this.apiItemMapper(items, type, language)}
                </div>}
            </div>
          </div>
        );
      }
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
