import scaleUtils from 'esri/geometry/scaleUtils';
import geometryUtils from 'utils/geometryUtils';
import graphicsUtils from 'esri/graphicsUtils';
import mapActions from 'actions/MapActions';
import {uploadConfig} from 'js/config';
import Loader from 'components/Loader';
import request from 'utils/request';
import text from 'js/languages';
import React, {
  Component,
  PropTypes
} from 'react';

const TYPE = {
  ZIP: 'application/zip',
  JSON: 'application/json',
  SHAPEFILE: 'shapefile',
  GEOJSON: 'geojson'
};

export default class Upload extends Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      dndActive: false,
      isUploading: false
    };
  }

  //- DnD Functions
  prevent = (evt) => {
    evt.preventDefault();
    return false;
  };

  enter = (evt) => {
    this.prevent(evt);
    this.setState({ dndActive: true });
  };

  leave = (evt) => {
    this.prevent(evt);
    this.setState({ dndActive: false });
  };

  drop = (evt) => {
    evt.preventDefault();
    const {map} = this.context;
    const file = evt.dataTransfer &&
                 evt.dataTransfer.files &&
                 evt.dataTransfer.files[0];

    if (!file) {
      return;
    }

    //- Update the view
    this.setState({
      dndActive: false,
      isUploading: true
    });

    //- If the analysis modal is visible, hide it
    mapActions.toggleAnalysisModal({ visible: false });

    const extent = scaleUtils.getExtentForScale(map, 40000);
    // TODO: Try hardcoding type = shapefile for windows
    const type = file.type === TYPE.ZIP ? TYPE.SHAPEFILE : TYPE.GEOJSON;
    const params = uploadConfig.shapefileParams(file.name, map.spatialReference, extent.getWidth(), map.width);
    const content = uploadConfig.shapefileContent(JSON.stringify(params), type);

    // the upload input needs to have the file associated to it
    const input = this.refs.fileInput;
    input.files = evt.dataTransfer.files;

    request.upload(uploadConfig.portal, content, this.refs.upload).then((response) => {
      this.setState({ isUploading: false });
      if (response.featureCollection) {
        const graphics = geometryUtils.generatePolygonsFromUpload(response.featureCollection);
        const graphicsExtent = graphicsUtils.graphicsExtent(graphics);
        map.setExtent(graphicsExtent, true);
        graphics.forEach((graphic) => {
          map.graphics.add(graphic);
        });
      } else {
        console.error('No feature collection present in the file');
      }
    }, (error) => {
      this.setState({ isUploading: false });
      console.error(error);
    });

  };

  renderInstructionList = (instruction, index) => {
    return (
      <li key={index} dangerouslySetInnerHTML={{ __html: instruction }}></li>
    );
  };

  render () {
    const {embeddedInModal} = this.props;
    const {language} = this.context;
    let header;

    if (!embeddedInModal) {
      header = (
        <h4 className='analysis-instructions__header--additional'>
          <span dangerouslySetInnerHTML={{ __html: text[language].ANALYSIS_INSTRUCTION_ADDITIONAL}} />
        </h4>
      );
    }

    return (
      <div className='analysis-instructions__upload'>
        {header}
        <form
          className={`analysis-instructions__upload-container mobile-hide ${this.state.dndActive ? 'active' : ''}`}
          encType='multipart/form-data'
          onDragEnter={this.enter}
          onDragLeave={this.leave}
          onDragOver={this.prevent}
          onDrop={this.drop}
          name='upload'
          ref='upload'>
          <Loader active={this.state.isUploading} />
          <span className='analysis-instructions__upload-label'>
            {text[language].ANALYSIS_SHAPEFILE_UPLOAD}
          </span>
          <input type='file' name='file' ref='fileInput' />
          <input type='hidden' name='publishParameters' value='{}' />
					<input type='hidden' name='filetype' value='shapefile' />
					<input type='hidden' name='f' value='json' />
        </form>
      </div>
    );
  }

}

Upload.propTypes = {
  embeddedInModal: PropTypes.boolean
};
