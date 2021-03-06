import LayersHelper from 'helpers/LayersHelper';
import React, {PropTypes} from 'react';
import text from 'js/languages';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

let startCount = 0;

let endCount = 0;
export default class FiresControls extends React.Component {

  static contextTypes = {
    language: PropTypes.string.isRequired,
    map: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.min = props.layer.id === 'VIIRS_ACTIVE_FIRES' ? moment(new Date('2016', 0, 8)) : moment(new Date('2012', 0, 1));
    const max = new Date();
    this.max = moment(max);
  }

  componentDidUpdate(prevProps, prevState, prevContext) {

    if (prevProps.startDate !== this.props.startDate || prevProps.endDate !== this.props.endDate) {
      LayersHelper.updateFiresLayerDefinitions(this.props.startDate, this.props.endDate, this.props.layer);
    }

    // Anytime the map changes to a new map, update that here
    const {map} = this.context;
    if (prevContext.map !== map && prevContext.map.loaded) {
      const signal = map.on('update-end', () => {
        signal.remove();
        LayersHelper.updateFiresLayerDefinitions(this.props.startDate, this.props.endDate, this.props.layer);
      });
    }
  }

  handleStartChange = (startDate) => {
    this.props.updateStartDate(startDate);
  }

  handleEndChange = (endDate) => {
    this.props.updateEndDate(endDate);
  }

  render () {
    const { startDate, endDate } = this.props;
    const {language} = this.context;

    return (
      <div className='fires'>
        <div className='glad-controls__calendars'>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_START}</label>
            <DatePicker
              customInput={<StartButton />}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={this.min}
              maxDate={moment(endDate)}
              selected={moment(startDate)}
              onChange={this.handleStartChange}
            />
          </div>
          <div className='glad-controls__calendars--row'>
            <label>{text[language].TIMELINE_END}</label>
            <DatePicker
              customInput={<EndButton />}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              todayButton='Jump to today'
              minDate={moment(startDate)}
              maxDate={this.max}
              selected={moment(endDate)}
              onChange={this.handleEndChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const StartButton = ({ onClick, value }) => (
  <button
    className='fa-button sml white pointer'
    onClick={onClick}
  >
    {value}
  </button>
);

const EndButton = ({ onClick, value }) => (
  <button
    className='fa-button sml white pointer'
    onClick={onClick}
  >
    {value}
  </button>
);
