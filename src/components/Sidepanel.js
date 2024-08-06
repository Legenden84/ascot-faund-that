import React from 'react';
import './Sidepanel.css';

class Sidepanel extends React.Component {
    handleFilterChange = (filter) => {
        this.props.setFilter(filter);
    };

    render() {
        return (
            <div className="Sidepanel">
                <button onClick={() => { this.handleFilterChange('active'); this.props.setSelectedRows([]); }}>
                    Active Items
                </button>
                <button onClick={() => { this.handleFilterChange('deleted'); this.props.setSelectedRows([]); }}>
                    Deleted Items
                </button>
            </div>
        );
    }
}

export default Sidepanel;