//- These charts have a dependency of highcharts
import React, {PropTypes, Component} from 'react';
import charts from 'utils/charts';

export default class CompositionPieChart extends Component {

  constructor(props) {
    super(props);
    this.state = { isEmpty: false };
  }

  componentDidMount() {
    const {labels, colors, counts, name} = this.props;
    if(counts.length === 0) {
      this.setState({ isEmpty: true });
    } else {
      const series = charts.formatCompositionAnalysis({
        labels: labels,
        colors: colors,
        counts: counts,
        name: name
      });
      this.setState({ isEmpty: false });
      charts.makeCompositionPieChart(this.refs.chart, series);
    }

  }

  render () {
    return (
      <div>
        <div ref='chart' className='analysis__chart-container'></div>
        <div id='chartError' className={`chart-error ${this.state.isEmpty ? '' : ' hidden'}`}>No data available.</div>
      </div>
    );
  }
}

CompositionPieChart.propTypes = {
  counts: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
