import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../actions/SidepanelActions';
import './Sidepanel.css';

class Sidepanel extends React.Component {
    handleFilterChange = (filter) => {
        this.props.setFilter(filter);
    };

    render() {
        return (
            <div className="Sidepanel">
                <button onClick={() => this.handleFilterChange('active')}>Active Items</button>
                <button onClick={() => this.handleFilterChange('deleted')}>Deleted Items</button>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setFilter,
};

export default connect(null, mapDispatchToProps)(Sidepanel);
